import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Comment,
  Statistic,
  Container,
  Header,
  Grid,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import { useMovieQuery, useCreateCommentMutation } from "../generated/graphql";

interface Params {
  id?: string;
}

function Movie() {
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<any>([]);
  const { id }: Params = useParams();

  useEffect(() => {
    localStorage.setItem("movieId", String(id));
    localStorage.setItem("activeItem", "");

    return () => {
      localStorage.setItem("activeItem", "profile");
    };
  }, [id]);

  const { data } = useMovieQuery({
    variables: { id: Number(id) },
  });

  useEffect(() => {
    if (data) {
      setComments(data.movie?.comments as any);
    }
  }, [data]);
  const [createComment] = useCreateCommentMutation();

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
                    <Comment.Avatar src="/images/avatar/small/matt.jpg" />
                    <Comment.Content>
                      <Comment.Author>{c.user.email}</Comment.Author>
                      <Comment.Metadata>
                        <div>
                          {new Date(Number(c.createdAt)).toLocaleDateString()}
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>{c.content}</Comment.Text>
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
                const response = await createComment({
                  variables: { content, movieId: data?.movie?.id as number },
                });

                if (response.data?.createComment.comment) {
                  setContent("");
                  setComments([
                    ...comments,
                    response.data.createComment?.comment,
                  ]);
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
            <Button
              type="submit"
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Movie;
