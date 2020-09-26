import { MiddlewareFn } from "type-graphql";
import { MyApolloContext } from "../types";

const isAuthenticated : MiddlewareFn<MyApolloContext> = ({ context: { req }  }, next) => {
  if (!req.session.userId) {
    throw new Error("unauthorized");
  }

  return next();
};

export default isAuthenticated;
