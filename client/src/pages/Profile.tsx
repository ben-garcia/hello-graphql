import React, { useContext } from "react";
import { Card, Image, Grid, Header } from "semantic-ui-react";
import avatar from "../avatar.png";

import StateContext from "../contexts/StateContext";
import Table from "../components/Table";
import { useMeQuery } from "../generated/graphql";

function Profile() {
  const {
    user: { email, createdAt },
  } = useContext(StateContext);
  const { data } = useMeQuery();

  return (
    <>
      <Header textAlign="center" as="h1">
        Your Profile
      </Header>
      <Grid centered>
        <Grid.Column width={4}>
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
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="scroll-wrapper">
            {data?.me?.movies && (
              <Table
                labels={["id", "title", "minutes", "createdAt"]}
                sources={data?.me?.movies as any}
                includeUsername={false}
              />
            )}
          </div>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Profile;
