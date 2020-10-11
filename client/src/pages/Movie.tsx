import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Icon,
  Button,
  Comment,
  Statistic,
  Container,
  Header,
  Grid,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import ModifyCommentForm from "../components/ModifyCommentForm";
import {
  useMovieQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../generated/graphql";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

interface Params {
  id?: string;
}

function Movie() {
  const [content, setContent] = useState<string>("");
  const { id }: Params = useParams();
  const dispatch = useContext(DispatchContext);
  const {
    comments,
    user: { email },
  } = useContext(StateContext);

  useEffect(() => {
    localStorage.setItem("movieId", String(id));
    localStorage.setItem("activeItem", "");

    return () => {
      localStorage.setItem("activeItem", "profile");
    };
  }, [id]);

  const { data } = useMovieQuery({
    variables: { id: id as string },
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_COMMENTS", payload: data.movie?.comments } as any);
    }
  }, [data, dispatch]);
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Movie
      </Header>
      <Grid>
        <Grid.Column width={6}>
          <Card movie={data?.movie as any} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>{data?.movie?.minutes}</Statistic.Value>
              <Statistic.Label>Minutes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {new Date(Number(data?.movie?.createdAt)).toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>Created At</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {new Date(Number(data?.movie?.updatedAt)).toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>Updated At</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{comments.length}</Statistic.Value>
              <Statistic.Label>
                {data?.movie?.comments.length === 1 ? "Comment" : "Comments"}
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={6}>
          <div className="scroll-wrapper">
            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              {comments.length &&
                comments.map((c: any) => (
                  <Comment key={c.id}>
                    <Comment.Content>
                      <Comment.Author>{c.user.email}</Comment.Author>
                      <Comment.Metadata>
                        <div>
                          {new Date(Number(c.createdAt)).toLocaleDateString()}
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>
                        {c.content}
                        <ModifyCommentForm
                          commentId={c.id}
                          content={c.content}
                          trigger={
                            <Button
                              title="Edit Comment"
                              className="transparent"
                              size="mini"
                              icon
                            >
                              <Icon name="edit" />
                            </Button>
                          }
                        />
                        <Button
                          title="Delete Comment"
                          onClick={async () => {
                            await deleteComment({ variables: { id: c.id } });
                            dispatch({
                              type: "DELETE_COMMENT",
                              payload: c.id,
                            } as any);
                          }}
                          size="mini"
                          className="transparent"
                          icon
                        >
                          <Icon name="trash" />
                        </Button>
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}
            </Comment.Group>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              try {
                if (content.trim() === "") {
                  return;
                }

                const response = await createComment({
                  variables: { content, movieId: data?.movie?.id as string },
                });

                if (response.data?.createComment.comment) {
                  setContent("");
                  dispatch({
                    type: "ADD_COMMENT",
                    payload: {
                      ...response.data?.createComment.comment,
                      user: { email },
                    },
                  } as any);
                }

                if (response.data?.createComment.errors) {
                  console.log(
                    "createComment error: ",
                    response.data?.createComment.errors
                  );
                }
              } catch (err) {
                console.log("err: ", err);
              }
            }}
          >
            <Form.TextArea
              onChange={(_, { value }) => {
                setContent(value as string);
              }}
              value={content}
            />
            <Button type="submit" content="Add Comment" primary />
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Movie;
