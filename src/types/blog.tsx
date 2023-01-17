interface creator {
  name: string;
  email: string;
}
interface category {
  id: string;
  title: string;
}
interface image {
  path: string;
}
export interface blogType {
  id: number;
  title: string;
  body: string;
  creator_id: number;
  creator: creator;
  category: category;
  image: image;
  created_at: string;
  update_at: string;
}
export enum BlogActionKind {
  GETALL = "GETALL",
}
export interface BlogAction {
  type: BlogActionKind;
  payload?: any;
}
