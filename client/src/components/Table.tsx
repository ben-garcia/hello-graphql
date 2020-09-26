import React from "react";
import { Button, Icon, Table as STable } from "semantic-ui-react";

interface Movie {
  id: number;
  title: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt?: string;
  };
}

interface Props {
  labels: string[];
  sources: Movie[];
  includeUsername: boolean;
}

function Table({ labels, sources, includeUsername }: Props) {
  return (
    <STable celled>
      <STable.Header>
        <STable.Row>
          {labels &&
            labels.map((s: string) => (
              <STable.HeaderCell>{s}</STable.HeaderCell>
            ))}
        </STable.Row>
      </STable.Header>
      <STable.Body>
        {sources.length
          ? sources.map((movie: Movie) => (
              <STable.Row key={movie.id}>
                <STable.Cell>{movie.id}</STable.Cell>
                <STable.Cell>{movie.title}</STable.Cell>
                <STable.Cell>{movie.minutes}</STable.Cell>
                {!includeUsername && (
                  <>
                    <STable.Cell>{movie.createdAt}</STable.Cell>
                    <STable.Cell>
                      <Button title="Delete" color="red" icon>
                        <Icon name="times" />
                      </Button>
                    </STable.Cell>
                  </>
                )}
                {includeUsername && (
                  <STable.Cell>{movie.user.email}</STable.Cell>
                )}
              </STable.Row>
            ))
          : null}
      </STable.Body>
    </STable>
  );
}

export default Table;
