import React from "react";
import Navbar from "../components/navbar/Navbar";
import {
  AiFillEye,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BsPencilFill, BsCheckAll } from "react-icons/bs";
import { Categories } from "../components/cards/Categories";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import { state } from "../types/initial";
import { blogType } from "../types/blog";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import ArticleSecond from "../components/cards/ArticleSecond";
import ArticleThird from "../components/cards/ArticleThird";
import ModernNav from "../components/navbar/ModernNav";
import SimpleNav from "../components/navbar/SimpleNav";
import { motion } from "framer-motion";
import Article from "../components/cards/Article";
import Contact from "../components/Contact/Contact";
type Props = {};

const Home = (props: Props) => {
  const { blogs, category } = useSelector((state: state) => state);
  return (
    <div className="bg-slate-100  z-0 text-gray-700 h-screen  overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#9544cf]/80">
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        {/* <Navbar /> */}
        <SimpleNav />
        <ModernNav />
      </div>
      <div></div>
      <section className="relative top-0 lg:-mt-[450px] mt-12 mx-auto block">
        <motion.img
          src="./assets/test.jpg"
          alt="hero"
          className="mx-auto block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className=" gap-1 mt-12 md:px-64">
          <div className="h-full">
            <h3 className="text-center font-semibold font-sans text-2xl">
              Καλωσήλθατε
            </h3>
            <h4 className=" lg:text-start text-center text-[#3f3f3f] w-full mx-auto mt-4">
              Το It's All Politics είναι ένα νεοσύστατο site που δημιουργήθηκε
              από φοιτητές του τμήματος Πολιτικής Επιστήμης & Ιστορίας του
              Παντείου Πανεπιστημίου. Κύριο μέλημα ειναι να παρουσιάζονται με
              κατανοητό τρόπο θέματα πολιτικά και κοινωνικοοικονομικά και να
              προωθηθεί το αίσθημα του διαλόγου στα φλέγοντα ζητήματα της
              επικαιρότητας.
            </h4>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-4 mt-16 mb-16">
        {category.map((cat, i) => {
          return (
            <div>
              <Categories
                title={cat.title}
                image={cat.image.path}
                up={i % 2 === 0}
              />
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
              No articles Found
            </h3>
          )}
        </div>
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
