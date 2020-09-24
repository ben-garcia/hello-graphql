import React, { useContext, useState } from "react";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";

import CreateMovieForm from "../components/CreateMovieForm";

import { useMoviesQuery } from "../generated/graphql";
import { MovieContext } from "../contexts/MovieContext";

function Home() {
  const { list, setList } = useContext(MovieContext);
  const { loading, error, data } = useMoviesQuery();
  if (data) {
    setList!(data.movies as any);
  }
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
          {list.length ? (
            list.map((movie: any) => (
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
            ))
          ) : (
            <Header as="h2">There are no movies yet</Header>
          )}
        </Table.Body>
      </Table>
      <CreateMovieForm
        closeModal={setModalIsOpen}
        trigger={<Button primary>Add a movie</Button>}
      />
    </Container>
  );
}

export default Home;
