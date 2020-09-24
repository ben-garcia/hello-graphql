import React, { createContext, useState } from "react";

interface UserState {
  id: number;
  setId?: React.Dispatch<React.SetStateAction<number>>;
  isLoggedIn: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  createdAt: string;
  setCreatedAt?: React.Dispatch<React.SetStateAction<string>>;
  updatedAt: string;
  setUpdatedAt?: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: UserState = {
  id: 0,
  isLoggedIn: false,
  email: "",
  createdAt: "",
  updatedAt: "",
};

export const UserContext = createContext<UserState>(initialState);

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const [id, setId] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        createdAt,
        setCreatedAt,
        updatedAt,
        setUpdatedAt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
