import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import StateContext from "../contexts/StateContext";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoutes({ children }: Props) {
  const {
    user: { isLoggedIn },
  } = useContext(StateContext);

  return <div>{isLoggedIn ? <>{children}</> : <Redirect to="/login" />}</div>;
}

export default ProtectedRoutes;
