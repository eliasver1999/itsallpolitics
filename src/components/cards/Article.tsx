import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import { ApiKind } from "../../types/api";
import DOMPurify from "dompurify";
type Props = {
  id: number;
  date: string;
  category: string;
  description: string;
  title: string;
  image: string;
};

const Article = ({ image, date, category, title, description, id }: Props) => {
  const dateFormat = new Date(date);
  const cleanHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  border-2 border-gray-200 p-2 rounded-md ">
      <div
        style={{
          backgroundSize: "cover",
        }}
        className=" h-[330px] w-full hover:bg-gradient-to-r from-indigo-500 transition-all duration-500 cursor-pointer"
      >
        <img
          src={ApiKind.IMAGE + image}
          alt={image}
          className="hover:opacity-40 h-full w-full transition-all duration-500"
          onClick={() => navigate(`/category/politics/article/${id}`)}
        />
      </div>
      <div className="flex flex-col justify-end items-start mx-3 gap-8 mt-4">
        <div className="flex justify-items-start text-start">
          <h4 className="text-xl">{title}</h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
            {formatDate(dateFormat)} |{" "}
            <span className="cursor-pointer">{category}</span>
          </div>
          <div>
            {cleanHTML?.length > 200 ? (
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML?.substring(0, 210).concat("..."),
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
            {cleanHTML?.length > 200 && (
              <button
                className="underline"
                onClick={() => navigate(`/article/${id}`, { state: {} })}
              >
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
