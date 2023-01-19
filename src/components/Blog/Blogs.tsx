import React from "react";
import { blogType } from "../../types/blog";
import ArticleSecond from "../cards/ArticleSecond";

type Props = {
  items: blogType[];
};

const Blogs = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-3 mt-12 gap-4 px-20">
      {items?.map((blog: blogType) => {
        return <ArticleSecond blog={blog} small={false} />;
      })}
    </div>
  );
};

export default Blogs;
