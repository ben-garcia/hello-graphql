import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";

import { GET_USERS } from "../queries";

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

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
            <Table.HeaderCell>firstName</Table.HeaderCell>
            <Table.HeaderCell>lastName</Table.HeaderCell>
            <Table.HeaderCell># of Movies</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.users.map((user: any) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.password}</Table.Cell>
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

