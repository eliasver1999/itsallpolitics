import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { blogType, creator } from "../types/blog";
import { state } from "../types/initial";
import { useSelector } from "react-redux";
import { ApiKind } from "../types/api";
import DOMPurify from "dompurify";
import Social from "../components/social/Social";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArticleSecond from "../components/cards/ArticleSecond";
import ModernNav from "../components/navbar/ModernNav";
import SimpleNav from "../components/navbar/SimpleNav";
import PhoneNavbar from "../components/navbar/PhoneNavbar";

type Props = {};

const SingleArticle = (props: Props) => {
  let { id } = useParams();
  console.log("id" + id);
  const { blogs, category } = useSelector((state: state) => state);
  const navigate = useNavigate();
  const blog: any | blogType = blogs.find(
    (item: blogType) => item.id.toLocaleString() === id
  );
  console.log(blogs);
  console.log(blogs.find((item: blogType) => item.id.toLocaleString() === id));
  console.log("blog" + blog);

  const cleanHTML = DOMPurify.sanitize(blog.body, {
    USE_PROFILES: { html: true },
  });
  useEffect(() => {});
  return (
    <>
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        {/* <Navbar /> */}
        <SimpleNav />
        <ModernNav />
      </div>
      <div className="h-full 2xl:px-80 lg:px-32 px-4 lg:grid lg:grid-cols-3 mb-32 gap-12 ">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold tracking-wide mt-32">
            {blog.title}
          </h3>
          <h4 className="text-lg  tracking-wide font-thin ">
            Κατηγορία: {blog.category.title}
          </h4>
          <img
            src={ApiKind.IMAGE + blog.image.path}
            alt={blog.image}
            width={850}
            className="hover:opacity-40 w-full transition-all duration-500 rounded-lg"
          />

          <p
            className=" text-[#3f3f3f] tracking-wide mt-4 lg:block hidden max-w-full overflow-x-hidden"
            style={{ textIndent: "25px" }}
          >
            <p
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
              className="my-4"
            ></p>
          </p>
          <p
            className=" text-[#3f3f3f] tracking-wide mt-4 lg:hidden block"
            style={{ textIndent: "25px" }}
          >
            <p
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
              className="my-4"
            ></p>
          </p>
          <h4 className="mt-4 font-semibold text-lg">
            Συντάκτης:{" "}
            {blog?.creator.map((cr: creator, index: any) => (
              <span className="font-light">
                {cr.name}
                {index === blog.creator.length - 1 ? "" : ","}
              </span>
            ))}
          </h4>
          <Social blog={blog} />
        </div>
        <div>
          <div className="2xl:mt-32 mt-12 sticky w-[342px] overflow-hidden h-full">
            <span className="text-gray-800 font-semibold tracking-wider">
              {blogs.length > 0 ? "Πρόσφατα άρθρα" : ""}
            </span>
            <ul className="list-none space-y-4 text-[#333333] tracking-wide mt-4">
              {blogs.slice(0, 5).map((blog: blogType) => {
                return (
                  <li
                    className="border-b-2 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/category/${blog.category.title}/article/${blog.id}`,
                        {
                          state: {
                            image: blog.image.path,
                            title: blog.title,
                            date: blog.created_at,
                            category: blog.category.title,
                            description: blog.body,
                            id: blog.id,
                          },
                        }
                      )
                    }
                  >
                    <IoIosArrowForward className="inline-block " size={16} />
                    <span>{blog.title}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <span className="text-gray-800 font-semibold tracking-wider">
                ΚΑΤΗΓΟΡΙΕΣ
              </span>
              <ul className="list-none space-y-4 text-[#333333] tracking-wide mt-4">
                {category.map((cat) => {
                  return (
                    <li className="border-b-2">
                      <IoIosArrowForward className="inline-block " size={16} />
                      <NavLink to={"/category/" + cat.id}>{cat.title}</NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4 mt-4">
          <h4 className="text-xl font-thin">
            {blogs.length > 0 ? "Παρόμοια Άρθρα" : ""}
          </h4>
          <div className="lg:hidden block">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {blogs.map((blog: blogType) => {
                return (
                  <SwiperSlide>
                    <ArticleSecond blog={blog} small={true} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="lg:block hidden">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {blogs.map((blog: blogType) => {
                return (
                  <SwiperSlide>
                    <ArticleSecond blog={blog} small={true} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleArticle;
