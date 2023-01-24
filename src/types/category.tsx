interface image {
  path: string;
}
export interface categoryType {
  id: number;
  title: string;
  image: image;
}
export enum CategoryActionKind {
  GETALLCATEGORIES = "GETALLCATEGORIES",
  LOGOUT = "LOGOUT",
}
export interface CategoryAction {
  type: CategoryActionKind;
  payload?: any;
}
