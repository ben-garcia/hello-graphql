import React, { useContext } from "react";
import { Button, Image, Icon, Card as SCard } from "semantic-ui-react";
import { Link } from "react-router-dom";

import DispatchContext from "../contexts/DispatchContext";
import { useDeleteMovieMutation } from "../generated/graphql";
import ModifyMovieForm from "./ModifyMovieForm";

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt?: string;
  movies: Movie[];
}

interface Movie {
  id: number;
  title: string;
  url: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Props {
  movie: Movie;
  modifiable?: boolean;
}

function Card({ movie, modifiable = false }: Props) {
  const [deleteMovie] = useDeleteMovieMutation();
  const dispatch = useContext<any>(DispatchContext);

  if (!movie) return null;

  return (
    <Link to={`/movie/${movie.id}`}>
      <SCard style={{ maxWidth: "200px" }}>
        {movie.url && <Image size="mini" src={movie.url} wrapped ui={false} />}
        <SCard.Content>
          <SCard.Header>{movie.title}</SCard.Header>
          <SCard.Meta>
            {movie.minutes && <span>{`${movie.minutes} minutes`}</span>}
          </SCard.Meta>
        </SCard.Content>
        {modifiable && (
          <SCard.Content extra>
            <Button
              onClick={() => {
                deleteMovie({ variables: { id: movie.id } });
                dispatch({ type: "DELETE_MOVIE", payload: movie.id });
              }}
              title="Delete"
              className="transparent"
              icon
            >
              <Icon name="trash" />
            </Button>
            <ModifyMovieForm
              movie={movie}
              trigger={
                <Button title="Modify" className="transparent" icon>
                  <Icon name="edit" />
                </Button>
              }
            />
          </SCard.Content>
        )}
      </SCard>
    </Link>
  );
}

export default Card;
