import React, { useContext, useEffect } from "react";
import { Card, Image, Placeholder, Grid, Header } from "semantic-ui-react";
import avatar from "../avatar.png";

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";
import Table from "../components/Table";
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
  }, []);

  return (
    <>
      <Header textAlign="center" as="h1">
        Your Profile
      </Header>
      <Grid centered>
        <Grid.Column width={4}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <Card>
              <Image src={avatar} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{email}</Card.Header>
                <Card.Description>
                  <p>
                    {`Created on ${new Date(
                      Number(createdAt)
                    ).toLocaleDateString()}`}
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
          )}
        </Grid.Column>
        <Grid.Column width={8}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image />
              <Placeholder.Image />
              <Placeholder.Image />
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <div className="scroll-wrapper">
              {movies && (
                <Table
                  labels={["Id", "Title", "Minutes", "CreatedAt"]}
                  sources={movies as any}
                  includeUsername={false}
                />
              )}
            </div>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Profile;
