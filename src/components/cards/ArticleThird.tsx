import DOMPurify from "dompurify";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import { ApiKind } from "../../types/api";
import { blogType } from "../../types/blog";
import "./ArticleThird.css";
type Props = {
  blog: blogType;
};

const ArticleThird = ({ blog }: Props) => {
  const navigate = useNavigate();
  const cleanHTML = DOMPurify.sanitize(blog.body, {
    USE_PROFILES: { html: true },
  });
  return (
    <div className="relative h-[700px] w-full">
      <img
        src={ApiKind.IMAGE + blog.image.path}
        alt={blog.image.path}
        className="w-full transition-all duration-500 min-h-[360px] max-h-[360px] rounded-lg"
        onClick={() =>
          navigate(`/category/${blog.category.title}/article/${blog.id}`)
        }
      />
      <div className="w-full flex justify-center">
        <div className="w-10/12 bg-amber-200 h-[400px]  mx-auto absolute bottom-0 box one flex justify-center items-center ">
          <div className="flex h-full relative px-4">
            <div className="absolute top-16">
              <div>
                <h3 className="font-semibold tracking-widest text-xl">
                  {blog.title}
                </h3>
              </div>
              <div>
                <h3 className=" tracking-widest">
                  {formatDate(new Date(blog.created_at))}| {blog.category.title}
                </h3>
              </div>
              <div>
                {cleanHTML?.length > 200 ? (
                  <div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: cleanHTML?.substring(0, 290).concat("..."),
                      }}
                      className="my-4 inline-block text-ellipsis"
                    ></p>
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                    className="my-4"
                  ></p>
                )}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleThird;
