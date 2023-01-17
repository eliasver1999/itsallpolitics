import {
  CategoryAction,
  CategoryActionKind,
  categoryType,
} from "../../types/category";

const initialState: Array<categoryType> = [];
function categoryReducer(
  state: categoryType[] = initialState,
  action: CategoryAction
) {
  const { type, payload } = action;
  switch (type) {
    case CategoryActionKind.GETALLCATEGORIES:
      return payload;
    default:
      return state;
  }
}

export default categoryReducer;
