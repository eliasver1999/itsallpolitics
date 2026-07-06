import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";

import { IoIosArrowForward } from "react-icons/io";
import { blogType, creator } from "../types/blog";
import { state } from "../types/initial";
import { useSelector } from "react-redux";
import { ApiKind } from "../types/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArticleSecond from "../components/cards/ArticleSecond";
import ModernNav from "../components/navbar/ModernNav";
import SimpleNav from "../components/navbar/SimpleNav";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import { getBlogs } from "../helpers/getters";
import { getCategories } from "../helpers/category";
import { getRelatedArticles } from "../helpers/relatedArticles";
import TagList from "../components/Tags/TagList";

import "./article.css";

// ⭐ import Helmet
import { Helmet } from "react-helmet-async";
import ShareButtons from "../components/ShareButtons";
import { stripHtml, sanitizeArticleHtml } from "./util";
import ReadingProgress from "../components/ReadingProgress/ReadingProgress";
import AuthorBio from "../components/AuthorBio/AuthorBio";
import Newsletter from "../components/Newsletter/Newsletter";

type Props = {};

const SingleArticle = (props: Props) => {
  let { id } = useParams();
  const { blogs, category } = useSelector((state: state) => state);
  const [blog, setBlog] = React.useState<blogType>();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    getBlogs()
      .then()
      .catch((error) => {
        console.log(error);
      });
    getCategories()
      .then()
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setBlog(blogs.find((item: blogType) => item.id.toLocaleString() === id));
  }, [blogs, location.pathname]); // removed "blog" from deps

  const relatedArticles = blog ? getRelatedArticles(blog, blogs, 6) : [];

  // ⭐ Build canonical URL for share/meta
  const origin =
    typeof window !== "undefined" ? 'https://www.itsallpolitics.gr' : "https://www.itsallpolitics.gr";
  const articleUrl = `${origin}${location.pathname}`;
  console.log(articleUrl)
  // ⭐ Prepare meta data safely
  const metaTitle = blog?.title
    ? `${blog.title} | itsallpolitics`
    : "Άρθρο |  itsallpolitics";

  // basic fallback description if you don't have one in blog
  const metaDescription =
    blog?.body
      ? stripHtml(blog.body).slice(0, 150) + "..."
      : "Διαβάστε το άρθρο μας στο https://www.itsallpolitics.gr/.";

  const metaImage = blog?.image?.path
    ? ApiKind.IMAGE + blog.image.path
    : `${origin}/default-og-image.jpg`; // add a default image in public if you want

  return (
    <>
      {/* Client-side meta tags (browser tab + JS-aware apps). Crawlers that
          don't run JS read the server-rendered tags from /api/blog/share/{id}. */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={articleUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="itsallpolitics" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={articleUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>

      <ReadingProgress />

      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>
      <div className="h-full 2xl:px-80 lg:px-32 px-4 lg:grid lg:grid-cols-3 mb-32 gap-12 ">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold tracking-wide mt-32">
            {blog?.title}
          </h3>

          <h4 className="text-lg tracking-wide font-thin">
            Κατηγορία:{" "}
            <NavLink to={"/category/" + blog?.category.id}>
              {blog?.category.title}
            </NavLink>
          </h4>

          {/* Tags */}
          {blog?.tags && blog.tags.length > 0 && (
            <div className="mb-4">
              <TagList tags={blog.tags} size="md" />
            </div>
          )}

          <img
            src={ApiKind.IMAGE + blog?.image.path}
            width={850}
            className="hover:opacity-40 w-full transition-all duration-500 rounded-lg"
          />

          <div
            className="text-[#3f3f3f] tracking-wide mt-4 lg:block hidden max-w-full overflow-x-hidden text-justify prose prose-lg max-w-none"
            style={{ textIndent: "25px" }}
          >
            {blog?.body ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeArticleHtml(blog?.body),
                }}
                className="article-content"
              />
            ) : (
              ""
            )}
          </div>
          <div
            className="text-[#3f3f3f] tracking-wide mt-4 lg:hidden block text-justify prose prose-lg max-w-none"
            style={{ textIndent: "25px" }}
          >
            {blog?.body ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeArticleHtml(blog?.body),
                }}
                className="article-content"
              />
            ) : (
              ""
            )}
          </div>
          <h4 className="mt-4 font-semibold text-lg">
            Συντάκτης:{" "}
            {blog?.creator.map((cr: creator, index: number) => (
              <NavLink 
                key={cr.name + index}
                to={`/author/${encodeURIComponent(cr.name)}`}
                className="font-light hover:text-[#9544cf] transition-colors"
              >
                {cr.name}
                {index === blog.creator.length - 1 ? "" : ", "}
              </NavLink>
            ))}
          </h4>

          {blog && <ShareButtons blogId={blog.id} blogTitle={blog.title} />}

          {blog && <AuthorBio creators={blog.creator} blogs={blogs} />}

          <div className="mt-10 rounded-xl overflow-hidden">
            <Newsletter />
          </div>
        </div>

        {/* ... rest of your component unchanged ... */}

        <div>
          <div className="2xl:mt-32 mt-12 sticky w-[342px] overflow-hidden h-full">
            <span className="text-gray-800 font-semibold tracking-wider">
              {relatedArticles.length > 0 ? "Πρόσφατα άρθρα" : ""}
            </span>
            <ul className="list-none space-y-4 text-[#333333] tracking-wide mt-4">
              {relatedArticles.slice(0, 5).map((blog: blogType) => {
                return (
                  <li
                    key={blog.id}
                    className="border-b-2 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/category/${blog.category.id}/article/${blog.id}`
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
                    <li className="border-b-2" key={cat.id}>
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
            {relatedArticles.length > 0 ? "Σχετικά Άρθρα" : ""}
          </h4>
          <div className="lg:hidden block">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {relatedArticles.map((blog: blogType) => {
                return (
                  <SwiperSlide key={blog.id}>
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
            >
              {relatedArticles.map((blog: blogType) => {
                return (
                  <SwiperSlide key={blog.id}>
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
