import React from "react";
import { Placeholder, Container, Header } from "semantic-ui-react";

import Table from "../components/Table";
import { useUsersQuery } from "../generated/graphql";

function Users() {
  const { loading, data } = useUsersQuery();

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Users
      </Header>
      {loading ? (
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
        </Placeholder>
      ) : (
        <div className="scroll-wrapper">
          {data?.users && (
            <Table
              labels={["Id", "Email", "# of movies"]}
              sources={data?.users as any}
              includeUsername={false}
            />
          )}
        </div>
      )}
    </Container>
  );
}

export default Users;
