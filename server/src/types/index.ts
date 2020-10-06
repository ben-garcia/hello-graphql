import { Request } from 'express';

export interface MyApolloContext {
  req: Request & { session: Express.Session & { userId: string } };
}
