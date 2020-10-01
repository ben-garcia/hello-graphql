import React, { useContext, useEffect } from "react";
import {
  Button,
  Container,
  Card as SCard,
  Placeholder,
  Header,
} from "semantic-ui-react";

import CreateMovieForm from "../components/CreateMovieForm";
import Card from "../components/Card";

import { useMoviesQuery } from "../generated/graphql";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

function Home() {
  const {
    movies,
    user: { isLoggedIn },
  } = useContext(StateContext);
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
      {isLoggedIn && (
        <CreateMovieForm trigger={<Button primary>Add a movie</Button>} />
      )}
      {loading ? (
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
          <Placeholder.Image />
        </Placeholder>
      ) : (
        <div className="scroll-wrapper">
          <SCard.Group>
            {movies &&
              movies.map((movie: any) => <Card key={movie.id} movie={movie} />)}
          </SCard.Group>
        </div>
      )}
    </Container>
  );
}

export default Home;
