import { createContext } from "react";

const UserContext = createContext({ isLoggedIn: false, email: "" });

export const UserProvider = UserContext.Provider;

export default UserContext;

