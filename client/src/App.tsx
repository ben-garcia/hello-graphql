import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Button, Form, Grid, Header, Icon, Table } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      minutes
      user {
        id
        firstName
        lastName
        age
      }
    }
  }
`;
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      age
      movies {
        id
        title
        minutes
      }
    }
  }
`;
const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String!, $age: Int!) {
    createUser(
      options: { firstName: $firstName, lastName: $lastName, age: $age }
    ) {
      id
      firstName
      lastName
      age
    }
  }
`;
const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $minutes: Int!, $user: Int!) {
    createMovie(options: { title: $title, minutes: $minutes, user: $user }) {
      id
      title
      minutes
    }
  }
`;
const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

function App() {
  const [title, setTitle] = React.useState("");
  const [minutes, setMinutes] = React.useState();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState();

  const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading || loading2) return <p>Loading...</p>;
  if (error || error2)
    return (
      <p>
        Error...
        {JSON.stringify(error || error2) || JSON.stringify(error2)}
      </p>
    );

  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h1" textAlign="center">
            Users
          </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>FirstName</Table.HeaderCell>
                <Table.HeaderCell>LastName</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data2.users.map((user: any) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell>{user.age}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        deleteUser({
                          variables: { id: user.id },
                        });
                      }}
                      color="red"
                      title="Delete"
                      icon
                    >
                      <Icon name="delete" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  name="firstName"
                  placeholder="First Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Age</label>
                <input
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  placeholder="Age"
                />
              </Form.Field>
              <Button
                primary
                onClick={(e) => {
                  e.preventDefault();
                  const a = Number(age);
                  addUser({ variables: { firstName, lastName, age: a } });
                  setFirstName("");
                  setLastName("");
                  setAge("");
                }}
                type="submit"
              >
                Add User
              </Button>
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1" textAlign="center">
            Movies
          </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Minutes</Table.HeaderCell>
                <Table.HeaderCell>User Id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.movies.map((movie: any) => (
                <Table.Row key={movie.id}>
                  <Table.Cell>{movie.id}</Table.Cell>
                  <Table.Cell>{movie.title}</Table.Cell>
                  <Table.Cell>{movie.minutes}</Table.Cell>
                  <Table.Cell>{movie.user.id}</Table.Cell>
                  <Table.Cell>
                    <Button color="red" title="Delete" icon>
                      <Icon name="delete" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Title</label>
                <input
                  value={title}
                  onChange={(e: any) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Title"
                />
              </Form.Field>
              <Form.Field>
                <label>Minutes</label>
                <input
                  value={minutes}
                  onChange={(e: any) => {
                    setMinutes(e.target.value);
                  }}
                  placeholder="Minutes"
                />
              </Form.Field>
              <Button
                primary
                onClick={(e: any) => {
                  e.preventDefault();
                  addMovie({
                    variables: { title, minutes: Number(minutes), user: 1 },
                  });
                  setTitle("");
                  setMinutes("");
                }}
                type="submit"
              >
                Add Movie
              </Button>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
