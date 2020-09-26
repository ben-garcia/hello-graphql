import React, { useContext, useEffect } from "react";
import { Button, Container, Header } from "semantic-ui-react";

import CreateMovieForm from "../components/CreateMovieForm";
import Table from "../components/Table";

import { useMoviesQuery } from "../generated/graphql";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

function Home() {
  const { movies } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { loading, error, data } = useMoviesQuery();
  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_MOVIES", payload: data.movies } as any);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <Header as="h1" textAlign="center">
        Movies
      </Header>
      <CreateMovieForm trigger={<Button primary>Add a movie</Button>} />
      <div className="scroll-wrapper">
        {data?.movies && (
          <Table
            labels={["id", "title", "minutes", "Created By"]}
            sources={movies as any}
            includeUsername
          />
        )}
      </div>
    </Container>
  );
}

export default Home;
