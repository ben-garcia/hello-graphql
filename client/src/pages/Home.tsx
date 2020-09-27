import React, { useContext, useEffect } from "react";
import { Button, Container, Placeholder, Header } from "semantic-ui-react";

import CreateMovieForm from "../components/CreateMovieForm";
import Table from "../components/Table";

import { useMoviesQuery } from "../generated/graphql";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

function Home() {
  const { movies } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { loading, data } = useMoviesQuery();
  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_MOVIES", payload: data.movies } as any);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Movies
      </Header>
      <CreateMovieForm trigger={<Button primary>Add a movie</Button>} />
      {loading ? (
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
        </Placeholder>
      ) : (
        <div className="scroll-wrapper">
          {data?.movies && (
            <Table
              labels={["Id", "Title", "Minutes", "Created By"]}
              sources={movies as any}
              includeUsername
            />
          )}
        </div>
      )}
    </Container>
  );
}

export default Home;
