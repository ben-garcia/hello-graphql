import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoutes({ children }: Props) {
  const { isLoggedIn } = useContext(UserContext);

  return <div>{isLoggedIn ? <>{children}</> : <Redirect to="/login" />}</div>;
}

export default ProtectedRoutes;
