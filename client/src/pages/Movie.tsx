import React, { useEffect } from "react";
import { Statistic, Container, Header, Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import { useMovieQuery } from "../generated/graphql";

interface Params {
  id?: string;
}

function Movie() {
  const { id }: Params = useParams();

  useEffect(() => {
    localStorage.setItem("movieId", String(id));
    localStorage.setItem("activeItem", "");

    return () => {
      localStorage.setItem("activeItem", "profile");
    };
  }, [id]);

  const { data } = useMovieQuery({
    variables: { id: Number(id) },
  });

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Movie
      </Header>
      <Grid>
        <Grid.Column width={6}>
          <Card movie={data?.movie as any} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>{data?.movie?.minutes}</Statistic.Value>
              <Statistic.Label>Minutes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {new Date(Number(data?.movie?.createdAt)).toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>Created At</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {new Date(Number(data?.movie?.updatedAt)).toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>Updated At</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Movie;
