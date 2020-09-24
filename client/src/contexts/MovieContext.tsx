import React, { createContext, useState } from "react";

interface Movie {
  id: number;
  title: string;
  minutes: number;
  createdtdAt: string;
  updatedAt: string;
}

interface MovieState {
  list: Movie[];
  setList?: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const initialState: MovieState = {
  list: [],
};

export const MovieContext = createContext<MovieState>(initialState);

interface Props {
  children: React.ReactNode;
}

function MovieProvider({ children }: Props) {
  const [list, setList] = useState<Movie[]>([]);

  return (
    <MovieContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
