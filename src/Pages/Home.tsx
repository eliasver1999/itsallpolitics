import React from "react";
import Navbar from "../components/navbar/Navbar";
import { AiFillEye, AiOutlineArrowLeft } from "react-icons/ai";
import { BsPencilFill, BsCheckAll } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { Categories } from "../components/cards/Categories";
import Article from "../components/cards/Article";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import { state } from "../types/initial";
import { blogType } from "../types/blog";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import ArticleSecond from "../components/cards/ArticleSecond";
import ArticleThird from "../components/cards/ArticleThird";
type Props = {};

const Home = (props: Props) => {
  const { blogs } = useSelector((state: state) => state);
  return (
    <>
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <Navbar />
      </div>
      <div className=" lg:-mt-48 mt-12 mx-auto block">
        <img src="./assets/hero.jpg" alt="hero" className="mx-auto block" />
        <div className=" gap-1 mt-12 md:px-64">
          <div className="h-full">
            <h3 className="text-center font-semibold font-sans text-2xl">
              Καλωσήλθατε
            </h3>
            <h4 className=" lg:text-start text-center text-[#3f3f3f] w-full mx-auto mt-4">
              Στόχος του WHAT POLITICS MEANS είναι να αποτελέσει ελεύθερο βήμα
              για όσους ενδιαφέρονται να αρθρογραφήσουν, να σχολιάσουν και να
              ερευνήσουν σε θέματα που άπτονται της πολιτικής, των διεθνών
              σχέσεων, της οικονομίας και της κοινωνίας.
            </h4>
          </div>
          <div className="grid lg:grid-cols-3 px-auto mt-24 items-center justify-center text-center gap-x-12 lg:space-y-0 space-y-4">
            <div className="grid ">
              <AiFillEye className="block mx-auto mb-4" size={40} />
              <p className="text-center">
                Οραματιζόμαστε η σελίδα να αποτελέσει πεδίο συνεργασίας και
                ανταλλαγής απόψεων με βασικό γνώμονα το σεβασμό στη διαφορετική
                άποψη και ερμηνεία μεταξύ των συντακτών.
              </p>
            </div>
            <div className="grid ">
              <BsPencilFill className="block mx-auto mb-4" size={32} />
              <p className="text-center h-full">
                H παραπληροφόρηση, ο λαϊκισμός, ο δογματισμός και ο λόγος που
                προωθεί το μίσος, τη βία και το ρατσισμό δεν αποτελούν συστατικά
                στοιχεία των κειμένων της ιστοσελίδας.
              </p>
            </div>
            <div className=" h-full">
              <BsCheckAll className="block mx-auto mb-4" size={40} />
              <p className="text-center h-full">
                Η ιστοσελίδα δεν λαμβάνει καμία πολιτική θέση, και οι απόψεις
                που αναλύονται εκφράζουν τον κάθε συντάκτη προσωπικά.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 mt-16 mb-16">
        <div>
          <Categories title="ΠΟΛΙΤΙΚΗ" image="politics.jpg" />
        </div>
        <div>
          <Categories title="ΔΙΕΘΝΗ" image="inter.jpeg" />
        </div>
        <div>
          <Categories title="ΟΙΚΟΝΟΜΙΑ" image="eco.jpg" />
        </div>
        <div>
          <Categories title="ΚΟΙΝΩΝΙΑ" image="soci.jpg" />
        </div>
      </div>
      <div className="mb-32">
        <h3 className="text-3xl font-semibold md:px-64 md:text-start text-center">
          Τελευταία άρθρα
        </h3>
        <div
          className={`${
            blogs.length > 0 ? "grid lg:grid-cols-3" : ""
          } justify-center items-center  gap-16 px-12 mt-12`}
        >
          {blogs.length > 0 ? (
            blogs.map((blog: blogType) => {
              return (
                <div>
                  <Article
                    id={blog.id}
                    image={blog.image.path}
                    title={blog.title}
                    date={blog.created_at}
                    category={blog.category.title}
                    description={blog.body}
                  />
                </div>
              );
            })
          ) : (
            <h3 className="text-xl font-semibold md:px-64 w-full">
              No articles Found
            </h3>
          )}
          {blogs.length > 0 ? (
            blogs.map((blog: blogType) => {
              return (
                <div>
                  <ArticleSecond blog={blog} small={false} />
                </div>
              );
            })
          ) : (
            <h3 className="text-xl font-semibold md:px-64 w-full">
              No articles Found
            </h3>
          )}
          {blogs.length > 0 ? (
            blogs.map((blog: blogType) => {
              return (
                <div>
                  <ArticleThird blog={blog} />
                </div>
              );
            })
          ) : (
            <h3 className="text-xl font-semibold md:px-64 w-full">
              No articles Found
            </h3>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
