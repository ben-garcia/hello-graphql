import { gql } from "@apollo/client";

// eslint-disable-next-line
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      password
      createdAt
      updatedAt
      movies {
        title
      }
    }
  }
`;
