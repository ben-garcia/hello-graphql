import React from "react";
import { Table, Grid, Placeholder, Container, Header } from "semantic-ui-react";

import Card from "../components/Card";
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
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Joined On</Table.HeaderCell>
                <Table.HeaderCell># of Movies</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.users &&
                data?.users.map((user: any) => (
                  <Table.Row>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {`${new Date(
                        Number(user.createdAt)
                      ).toLocaleDateString()}`}
                    </Table.Cell>
                    <Table.Cell>{user.movies.length}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default Users;
