import React from "react";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";

import { useUsersQuery } from "../generated/graphql";

function Users() {
  const { loading, error, data } = useUsersQuery();

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <Header as="h1" textAlign="center">
        Users
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>CreateAt</Table.HeaderCell>
            <Table.HeaderCell>UpdatedAt</Table.HeaderCell>
            <Table.HeaderCell># of Movies</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.users.map((user: any) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {new Date(Number(user.createdAt)).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(Number(user.updatedAt)).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{user.movies.length}</Table.Cell>
                <Table.Cell>
                  <Button color="red" title="Delete" icon>
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Users;
