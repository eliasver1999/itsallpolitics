import React from "react";
import Navbar from "../components/navbar/Navbar";

import { Categories } from "../components/cards/Categories";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import { state } from "../types/initial";
import { blogType } from "../types/blog";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import ArticleSecond from "../components/cards/ArticleSecond";
import "./global.css";
import ModernNav from "../components/navbar/ModernNav";
import SimpleNav from "../components/navbar/SimpleNav";
import Contact from "../components/Contact/Contact";
import Newsletter from "../components/Newsletter/Newsletter";
import Slider from "react-slick";
import { ApiKind } from "../types/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatDate } from "../helpers/date";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
type Props = {};

const Home = (props: Props) => {
  const { blogs, category } = useSelector((state: state) => state);
  const navigate = useNavigate();
  console.log("category",category)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    fade: true,
    autoplaySpeed: 4000,

    pauseOnHover: true,
    cssEase: "linear",
    appendDots: (dots: any) => (
      <div
        className="absolute"
        style={{
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <ul
          style={{ margin: "0px" }}
          className="relative -top-12 flex justify-center "
        >
          {dots}
        </ul>
      </div>
    ),
  };
  return (
    <div className="bg-slate-50  z-0 text-gray-700 h-screen  overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#9544cf]/80">
      <ToastContainer />
      <div className="xl:hidden block">
        <PhoneNavbar />
        
      </div>
      <div className="xl:block hidden">
        {/* <Navbar /> */}
        <SimpleNav />
        <ModernNav />
      </div>
      <div></div>
      <section className="relative top-0 lg:-mt-24 mx-auto block ">
        <div className="lg:w-screen h-1/2 relative">
        <Slider {...settings}>
  {blogs.slice(0, 5).map((blog) => {
    return (
      <div
        key={blog.id}
        className="w-screen lg:h-screen h-[600px] flex justify-center items-center text-center"
      >
        <div className="relative w-full lg:h-screen h-[600px]">
          {blog.image ? (
            <div className="relative w-screen h-full aspect-w-16 aspect-h-9">
              <img
                src={ApiKind.IMAGE + blog.image.path}
                className="w-full h-full object-cover brightness-50"
              />
            </div>
          ) : null}
          <div className="absolute 2xl:bottom-48 bottom-16 2xl:left-56 md:left-32 space-y-4 md:w-1/2 w-full">
            <h4 className="cursor-pointer text-slate-50 2xl:text-3xl text-xl xl:border-b-2 md:text-start text-center py-2 border-[#9544cf]">
              <NavLink
                to={`/category/${blog.category.id}/article/${blog.id}`}
                onClick={() => console.log(blog)}
              >
                {blog.title}
              </NavLink>
            </h4>
            <div className="flex md:justify-start justify-center">
              {blog.creator.map((creator,index) => {
                return (
                  <h5 key={index|| creator.name} className="text-slate-50 xl:text-base text-sm">
                    {creator.name}-
                  </h5>
                );
              })}
               <h5 className="text-slate-50 xl:text-base text-sm">
              {formatDate(new Date(blog.created_at))} |{" "}
                    <NavLink
                      to={`/category/${blog.category.id}`}
                      onClick={() => console.log(blog)}
                    >
                      {blog.category.title}
                    </NavLink>
                </h5>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</Slider>

        </div>
        {/* <motion.img
          src="./assets/test.jpg"
          alt="hero"
          className="mx-auto block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        /> */}
        <div className=" gap-1 mt-12 md:px-64">
          <div className="h-full">
            <h3 className="text-center font-semibold font-sans text-2xl">
              Καλωσήλθατε
            </h3>
            <h4 className=" lg:text-start text-center text-[#3f3f3f] w-full mx-auto mt-4">
              Το It's All Politics είναι μια ιστοσελίδα αναλύσεων που συνδυάζει την ακαδημαϊκή προσέγγιση με τη σύγχρονη ματιά πάνω στην πολιτική, την οικονομία, την κοινωνία και την ιστορία. Δημιουργήθηκε από αποφοίτους του Τμήματος Πολιτικής Επιστήμης και Ιστορίας του Παντείου Πανεπιστημίου. Κύριο μέλημά είναι η παρουσίαση σύνθετων πολιτικών και κοινωνικοοικονομικών ζητημάτων με κατανοητό τρόπο και η ενίσχυση του διαλόγου γύρω από τα κρίσιμα θέματα της επικαιρότητας.
            </h4>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-4 mt-16 mb-16">
        {Array.isArray(category) && category.length > 0 && category.map((cat, i) => {
          return (
            <div key={cat.id}>
              {cat.image ? (
                <Categories
                  title={cat.title}
                  image={cat.image.path}
                  up={i % 2 === 0}
                  id={cat.id}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </section>
      <section className="mb-32">
        <h3 className="text-3xl font-semibold md:px-64 md:text-start text-center">
          Τελευταία άρθρα
        </h3>
        <div
          className={`${
            blogs.length > 0 ? "grid lg:grid-cols-3 grid-cols-1" : ""
          } justify-center items-center  gap-16 lg:px-12 px-0 mt-12`}
        >
          {blogs.length > 0 ? (
            blogs.slice(0, 6).map((blog: blogType) => {
              return (
                <div className="w-full">
                  <ArticleSecond blog={blog} small={false} />
                </div>
              );
            })
          ) : (
            <h3 className="text-xl font-semibold md:px-64 w-full">
              Δεν βρέθηκαν άρθρα.
            </h3>
          )}
        </div>
      </section>
      <section className="mb-12">
        <Newsletter />
      </section>
      <section className="flex flex-col justify-center mb-12">
        <Contact />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
