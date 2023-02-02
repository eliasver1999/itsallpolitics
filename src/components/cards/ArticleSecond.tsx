import DOMPurify from "dompurify";
import { ClientRequest } from "http";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import { ApiKind } from "../../types/api";
import { blogType } from "../../types/blog";
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
          ApiKind.IMAGE + blog.image.path
        }) `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[500px] rounded-xl flex justify-start items-end text-white relative w-full"
    >
      <div className="flex-row lg:px-12 px-0  space-y-2  absolute bottom-12">
        <div>
          <h3 className="font-semibold tracking-widest px-4">{blog.title}</h3>
        </div>
        <div>
          <h3 className="font-thin tracking-widest px-4">
            {formatDate(new Date(blog.created_at))}|
            {blog.category ? blog.category.title : ""}
          </h3>
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
