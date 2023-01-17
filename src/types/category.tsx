export interface categoryType {
  id: number;
  title: string;
}
export enum CategoryActionKind {
  GETALLCATEGORIES = "GETALLCATEGORIES",
  LOGOUT = "LOGOUT",
}
export interface CategoryAction {
  type: CategoryActionKind;
  payload?: any;
}
