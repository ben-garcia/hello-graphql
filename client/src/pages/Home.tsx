import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";

import { GET_MOVIES } from "../queries";

function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <Header as="h1" textAlign="center">
        Movies
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Minutes</Table.HeaderCell>
            <Table.HeaderCell>Created By</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.movies.map((movie: any) => (
              <Table.Row key={movie.id}>
                <Table.Cell>{movie.id}</Table.Cell>
                <Table.Cell>{movie.title}</Table.Cell>
                <Table.Cell>{movie.minutes}</Table.Cell>
                <Table.Cell>{movie.user.email}</Table.Cell>
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

export default Home;

