import { gql } from "@apollo/client";

// eslint-disable-next-line
export const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $minutes: Int!, $user: Int!) {
    createMovie(options: { title: $title, minutes: $minutes, user: $user }) {
      id
      title
      minutes
    }
  }
`;

