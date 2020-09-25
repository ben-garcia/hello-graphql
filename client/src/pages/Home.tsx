import React, { useContext, useEffect } from "react";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";

import CreateMovieForm from "../components/CreateMovieForm";

import { useMoviesQuery } from "../generated/graphql";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

function Home() {
  const { movies } = useContext(StateContext);
  const dispatch = useContext<any>(DispatchContext);
  const { loading, error, data } = useMoviesQuery();
  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_MOVIES", payload: data.movies });
    }
  }, []);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <Header as="h1" textAlign="center">
        Movies
      </Header>
      <CreateMovieForm trigger={<Button primary>Add a movie</Button>} />
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
          {movies.length ? (
            movies.map((movie: any) => (
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
    </Container>
  );
}

export default Home;
