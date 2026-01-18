import DOMPurify from "dompurify";
import { ClientRequest } from "http";
import React from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import { calculateReadingTime } from "../../helpers/readingTime";
import { ApiKind } from "../../types/api";
import { blogType } from "../../types/blog";
import TagList from "../Tags/TagList";
import "./Article.css";
type Props = {
  blog: blogType;
  small: boolean;
};

const ArticleSecond = ({ blog, small }: Props) => {
  const navigate = useNavigate();
  const cleanHTML = DOMPurify.sanitize(blog.body, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) ),url(${
          blog.image ? ApiKind.IMAGE + blog.image.path : null
        }) `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[500px] rounded-xl flex justify-start items-end text-white relative w-full"
    >
      <div className="flex-row lg:px-12 px-0  space-y-2  absolute bottom-12">
        <div>
          <h3 className="font-semibold tracking-widest px-4 cursor-pointer">
            <a href={`/category/${blog.category.id}/article/${blog.id}`}>
              {blog.title}
            </a>
          </h3>
        </div>
        <div>
          <h3 className="font-thin tracking-widest px-4 flex items-center gap-2 flex-wrap">
            {formatDate(new Date(blog.created_at))} | 
            <NavLink to={"/category/" + blog?.category.id}>
              {blog.category ? blog.category.title : ""}
            </NavLink>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {calculateReadingTime(blog.body)}
            </span>
          </h3>
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="px-4 mt-2">
              <TagList tags={blog.tags} size="sm" limit={3} />
            </div>
          )}
        </div>
        {small ? (
          ""
        ) : (
          <div className="bg-transparent">
            {cleanHTML?.length > 200 ? (
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML?.substring(0, 250).concat("..."),
                  }}
                  className="my-4 inline-block text-ellipsis pl-4 lg:px-0 [&>p]:bg-transparent [&>p>span]:bg-transparent"
                ></p>
              </div>
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
                className="my-4 pl-4"
              ></p>
            )}
          </div>
        )}
      </div>
      {small ? (
        ""
      ) : (
        <div className="w-full relative bottom-0 right-0 text-end  ">
          <button
            className=" py-1 px-2 rounded-tl-lg rounded-br-lg"
            style={{ backgroundColor: "rgba(149, 68, 207,.8)" }}
            onClick={() =>
              navigate(`/category/${blog.category.id}/article/${blog.id}`, {
                state: {
                  image: blog.image.path,
                  title: blog.title,
                  date: blog.created_at,
                  category: blog.category.title,
                  description: blog.body,
                  id: blog.id,
                  creator: blog.creator,
                },
              })
            }
          >
            Read More
          </button>
        </div>
      )}
      <div className=""></div>
    </div>
  );
};

export default ArticleSecond;
