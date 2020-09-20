import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    createUser(options: { email: $email, password: $password }) {
      id
      email
      password
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;
