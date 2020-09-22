import React, { createContext, useState } from "react";

interface UserState {
  isLoggedIn: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: UserState = {
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  return (
    <UserContext.Provider
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          email,
          setEmail,
          createdAt,
          setCreatedAt,
          updatedAt,
          setUpdatedAt,
        } as any
      }
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
