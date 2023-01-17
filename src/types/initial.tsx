import { blogType } from "./blog";
import { categoryType } from "./category";

export interface state {
  blogs: Array<blogType>;
  category: Array<categoryType>;
}
