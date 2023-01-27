import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import ModernNav from "../components/navbar/ModernNav";
import { motion } from "framer-motion";
import SimpleNav from "../components/navbar/SimpleNav";
import Pagination from "../components/Pagination/Pagination";
import { blogType } from "../types/blog";
import { state } from "../types/initial";
import { AiOutlineArrowDown } from "react-icons/ai";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import { ApiKind } from "../types/api";
import "./global.css";
type Props = {};

const Politics = (props: Props) => {
  const { category } = useParams();
  console.log(category);
  const blogs: blogType[] = useSelector((state: state) => state.blogs);
  const categories = useSelector((state: state) => state.category);
  //and then
  const cat: any = categories.filter(
    (item) => item.id.toLocaleString() === category
  );
  console.log(cat);
  const blog: any = blogs.filter(
    (item: blogType) => Number(item.category.id) === Number(category)
  );
  const myRef: any = React.useRef(null);
  const executeScroll = () => {
    if (myRef && myRef.current) {
      myRef.current.scrollIntoView();
    }
  };
  return (
    <div className="bg-gray-200  z-0 text-gray-700 h-screen  overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#9544cf]/80">
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>
      {/* <div>
        <SimpleNav />
        <ModernNav />
      </div> */}
      <div
        className="mt-8 mx-auto block h-screen lg:mb-48 mb-24"
        style={{ flex: "1 0 auto" }}
      >
        <div
          className="lg:h-full h-screen lg:-mt-[130px] w-full"
          style={{
            backgroundImage: `url(${ApiKind.IMAGE + cat[0]?.image.path})`,
            backgroundColor:
              "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) )",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className=" h-full w-full"
            style={{
              background:
                "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8) )",
            }}
          >
            <div className="  h-full flex justify-center items-center text-center relative">
              <h3 className="bg-[#9544cf]/70 p-4 rounded-lg text-slate-50 text-2xl">
                {cat[0].title}
              </h3>
              <motion.button
                initial={{
                  color: "#9544cf",
                }}
                whileHover={{
                  backgroundColor: "#9544cf",
                  color: "#363434",
                  y: 5,
                  transition: { duration: 0.5 },
                }}
                className="absolute bottom-12 border-2 border-[#9544cf] rounded-full p-1 "
                onClick={executeScroll}
              >
                <AiOutlineArrowDown size={32} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div id="articles" ref={myRef}>
        {blog?.length > 0 ? (
          <Pagination itemsPerPage={6} items={blog} />
        ) : (
          <div className="h-[310px] mt-16">
            <h3 className="text-xl font-semibold md:px-64 w-full mt-4">
              Δεν βρέθηκαν άρθρα
            </h3>
          </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default Politics;
