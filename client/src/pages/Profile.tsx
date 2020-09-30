import React, { useContext, useEffect } from "react";
import {
  Card as SCard,
  Image,
  Placeholder,
  Grid,
  Header,
} from "semantic-ui-react";
import avatar from "../avatar.png";

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";
import Card from "../components/Card";
import { useMeQuery } from "../generated/graphql";

function Profile() {
  const {
    user: { email, createdAt },
    movies,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { loading, data } = useMeQuery();

  useEffect(() => {
    if (data?.me?.movies) {
      dispatch({
        type: "GET_MOVIES",
        payload: data.me.movies,
      } as any);
    }
  }, [data, dispatch]);

  return (
    <>
      <Header textAlign="center" as="h1">
        Your Profile
      </Header>
      <Grid>
        <Grid.Column width={5}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <SCard>
              <Image src={avatar} wrapped ui={false} />
              <SCard.Content>
                <SCard.Header>{email}</SCard.Header>
                <SCard.Description>
                  <p>
                    {`Created on ${new Date(
                      Number(createdAt)
                    ).toLocaleDateString()}`}
                  </p>
                </SCard.Description>
              </SCard.Content>
            </SCard>
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image />
              <Placeholder.Image />
              <Placeholder.Image />
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <div className="scroll-wrapper">
              <SCard.Group>
                {movies &&
                  movies.map((movie: any) => (
                    <Card key={movie.id} modifiable movie={movie} />
                  ))}
              </SCard.Group>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Profile;
