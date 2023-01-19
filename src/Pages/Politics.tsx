import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Article from "../components/cards/Article";
import ArticleSecond from "../components/cards/ArticleSecond";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import Pagination from "../components/Pagination/Pagination";
import { blogType } from "../types/blog";
import { state } from "../types/initial";

type Props = {};

const Politics = (props: Props) => {
  const { category } = useParams();
  const blogs: blogType[] = useSelector((state: state) => state.blogs);

  const blog: any = blogs.filter(
    (item: blogType) => item.category.title === category
  );
  console.log(category);
  console.log(blog);
  return (
    <>
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <Navbar />
      </div>
      <div className="mt-8 mx-auto block h-full" style={{ flex: "1 0 auto" }}>
        <div className="mb-32">
          <h3 className="text-3xl font-semibold md:px-64 text-center bg-indigo-300 p-8 text-gray-50">
            {category}
          </h3>
          {blog?.length > 0 ? (
            <Pagination itemsPerPage={6} items={blog} />
          ) : (
            <div className="h-[310px] mt-16">
              <h3 className="text-xl font-semibold md:px-64 w-full mt-4">
                No articles Found
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </>
  );
};

export default Politics;
