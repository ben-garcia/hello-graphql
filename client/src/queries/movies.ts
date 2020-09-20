import { gql } from "@apollo/client";

// eslint-disable-next-line
export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      minutes
      user {
        id
      }
    }
  }
`;
