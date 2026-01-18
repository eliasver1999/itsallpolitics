export interface creator {
  name: string;
  email: string;
  id?: number;
}
interface category {
  id: string;
  title: string;
}
interface image {
  path: string;
}
export interface tag {
  id: number;
  name: string;
  slug: string;
}
export interface blogType {
  id: number;
  title: string;
  body: string;
  creator_id: number;
  creator: Array<creator>;
  category: category;
  image: image;
  tags?: Array<tag>;
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
