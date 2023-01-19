import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { blogType } from "../types/blog";
import { state } from "../types/initial";
import { useSelector } from "react-redux";
import { ApiKind } from "../types/api";
import DOMPurify from "dompurify";
import Social from "../components/social/Social";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArticleSecond from "../components/cards/ArticleSecond";

type Props = {};

const SingleArticle = (props: Props) => {
  let { id } = useParams();
  const blogs = useSelector((state: state) => state.blogs);

  const blog: any = blogs.find(
    (item: blogType) => item.id.toLocaleString() === id
  );
  const cleanHTML = DOMPurify.sanitize(blog.body, {
    USE_PROFILES: { html: true },
  });

  return (
    <>
      <Navbar />
      <div className="mt-4 h-full 2xl:px-80 px-32 grid grid-cols-3 mb-32 gap-12">
        <div className="col-span-2">
          <h3 className="text-xl font-semibold tracking-wide">{blog.title}</h3>
          <h4 className="text-lg  tracking-wide">
            Κατηγορία: {blog.category.title}
          </h4>
          <img
            src={ApiKind.IMAGE + blog.image.path}
            alt={blog.image}
            width={850}
            className="hover:opacity-40 w-full transition-all duration-500 rounded-lg"
          />

          <p
            className="text-justify text-[#3f3f3f] tracking-wide mt-4"
            style={{ fontSize: "16px" }}
          >
            <p
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
              className="my-4"
            ></p>
          </p>
          <h4 className="mt-4 font-semibold text-lg">
            Συντάκτης: <span className="font-light">{blog.creator.name}</span>
          </h4>
          <Social blog={blog} />
        </div>
        <div>
          <div className="2xl:mt-32 mt-12 sticky w-[342px] overflow-hidden h-full">
            <span className="text-gray-800 font-semibold tracking-wider">
              Πρόσφατα άρθρα
            </span>
            <ul className="list-none space-y-4 text-[#333333] tracking-wide mt-4">
              {blogs.slice(0, 5).map((blog: blogType) => {
                return (
                  <li className="border-b-2">
                    <IoIosArrowForward className="inline-block " size={16} />
                    <span>{blog.title}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-12">
              <span className="text-gray-800 font-semibold tracking-wider">
                ΚΑΤΗΓΟΡΙΕΣ
              </span>
              <ul className="list-none space-y-4 text-[#333333] tracking-wide mt-4">
                <li className="border-b-2">
                  <IoIosArrowForward className="inline-block " size={16} />
                  <span>ΔΙΕΘΝΗ</span>
                </li>
                <li className="border-b-2">
                  <IoIosArrowForward className="inline-block " size={16} />
                  <span>ΚΟΙΝΩΝΙΑ </span>
                </li>
                <li className="border-b-2">
                  <IoIosArrowForward className="inline-block " size={16} />
                  <span>ΟΙΚΟΝΟΜΙΑ</span>
                </li>
                <li className="border-b-2">
                  <IoIosArrowForward className="inline-block " size={16} />
                  <span>ΠΟΛΙΤΙΚΗ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-3 space-y-4">
          <h4 className="text-xl font-thin">Παρόμοια Άρθρα</h4>
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
      <Footer />
    </>
  );
};

export default SingleArticle;
