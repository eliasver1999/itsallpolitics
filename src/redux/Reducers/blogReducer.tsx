import { BlogAction, BlogActionKind, blogType } from "../../types/blog";

const initialState: Array<blogType> = [];
function blogReducer(state: blogType[] = initialState, action: BlogAction) {
  const { type, payload } = action;
  switch (type) {
    case BlogActionKind.GETALL:
      return payload;
    default:
      return state;
  }
}

export default blogReducer;
