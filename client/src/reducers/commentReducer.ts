import { UserActionTypes } from "./userReducer";
import { MovieActionTypes } from "./movieReducer";

enum CommentActions {
  GET_COMMENTS = "GET_COMMENTS",
  ADD_COMMENT = "ADD_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  MODIFY_COMMENT = "MODIFY_COMMENT",
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CommentState = Comment[];

interface GetComments {
  type: typeof CommentActions.GET_COMMENTS;
  payload: Comment[];
}

interface AddComment {
  type: typeof CommentActions.ADD_COMMENT;
  payload: Comment;
}

interface DeleteComment {
  type: typeof CommentActions.DELETE_COMMENT;
  payload: string;
}

interface ModifyComment {
  type: typeof CommentActions.MODIFY_COMMENT;
  payload: {
    id: string;
    content: string;
  };
}

export type CommentActionTypes =
  | GetComments
  | AddComment
  | DeleteComment
  | ModifyComment;

export default function commentReducer(
  state: CommentState,
  action: CommentActionTypes | MovieActionTypes | UserActionTypes
): CommentState {
  switch (action.type) {
    case CommentActions.GET_COMMENTS:
      return [...action.payload];
    case CommentActions.ADD_COMMENT:
      return [...state, action.payload];
    case CommentActions.DELETE_COMMENT:
      return state.filter((c: Comment) => c.id !== action.payload);
    case CommentActions.MODIFY_COMMENT:
      // eslint-disable-next-line
			const newState = [...state];
      // eslint-disable-next-line
      const comment = newState.find((c: Comment) => c.id === action.payload.id);
      // eslint-disable-next-line
      const index = newState.findIndex(
        (c: Comment) => c.id === action.payload.id
      );
      // eslint-disable-next-line
      const newComment: any = { ...comment };
      newComment.content = action.payload.content;
      newState.splice(index, 1, newComment);
      return newState;
    default:
      return state;
  }
}
