import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlineFileText, AiOutlineAppstore, AiOutlineCalendar } from "react-icons/ai";
import { state } from "../types/initial";
import { blogType, creator } from "../types/blog";
import { ApiKind } from "../types/api";
import SimpleNav from "../components/navbar/SimpleNav";
import ModernNav from "../components/navbar/ModernNav";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import Footer from "../components/footer/Footer";
import ArticleSecond from "../components/cards/ArticleSecond";
import { ArticleCardSkeleton } from "../components/Loading/LoadingStates";

const AuthorPage = () => {
  const { authorName } = useParams<{ authorName: string }>();
  const { blogs } = useSelector((state: state) => state);
  const [authorArticles, setAuthorArticles] = useState<blogType[]>([]);
  const [authorInfo, setAuthorInfo] = useState<creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authorName && blogs.length > 0) {
      const decodedName = decodeURIComponent(authorName);
      const articles = blogs.filter((blog) =>
        blog.creator.some((creator) => creator.name === decodedName)
      );
      const author =
        articles.length > 0
          ? articles[0].creator.find((c) => c.name === decodedName)
          : null;

      setAuthorArticles(articles);
      setAuthorInfo(author || null);
      setLoading(false);
    }
  }, [authorName, blogs]);

  const Nav = () => (
    <>
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Nav />
        <div className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Derived stats
  const categoryCount = new Set(authorArticles.map((a) => a.category?.id)).size;
  const wordCount = authorArticles.reduce(
    (total, a) =>
      total + (a.body ? a.body.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length : 0),
    0
  );
  const years = authorArticles
    .map((a) => new Date(a.created_at).getFullYear())
    .filter((y) => !Number.isNaN(y));
  const memberSince = years.length ? Math.min(...years) : new Date().getFullYear();

  const stats = [
    { icon: <AiOutlineFileText />, value: authorArticles.length, label: "Άρθρα" },
    { icon: <AiOutlineAppstore />, value: categoryCount, label: "Κατηγορίες" },
    { icon: <AiOutlineFileText />, value: wordCount.toLocaleString("el-GR"), label: "Λέξεις" },
    { icon: <AiOutlineCalendar />, value: memberSince, label: "Μέλος από" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Hero */}
      <div className="relative">
        <div className="h-44 md:h-56 bg-gradient-to-r from-[#9544cf] via-[#7d34c0] to-[#6905ab]" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="-mt-20 md:-mt-24 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            {authorInfo?.image?.path ? (
              <img
                src={ApiKind.IMAGE + authorInfo.image.path}
                alt={authorInfo.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-white shadow-xl bg-white"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-white shadow-xl bg-gradient-to-br from-[#9544cf] to-[#6905ab] flex items-center justify-center">
                <span className="text-white text-5xl font-bold">
                  {authorInfo?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <h1 className="mt-5 text-3xl md:text-4xl font-bold text-gray-900">
              {authorInfo?.name}
            </h1>

            <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-[#9544cf]/10 text-[#9544cf] text-sm font-medium">
              Συντάκτης
            </span>

            {authorInfo?.email && (
              <a
                href={`mailto:${authorInfo.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#9544cf] transition-colors"
              >
                <AiOutlineMail size={16} />
                {authorInfo.email}
              </a>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center"
              >
                <div className="mx-auto mb-2 w-10 h-10 rounded-lg bg-[#9544cf]/10 text-[#9544cf] flex items-center justify-center text-xl">
                  {s.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-4 py-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#9544cf]" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Άρθρα από {authorInfo?.name}
          </h2>
        </div>

        {authorArticles.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {authorArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
              >
                <ArticleSecond blog={article} small={false} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
              <AiOutlineFileText />
            </div>
            <p className="text-gray-500 text-lg">
              Δεν βρέθηκαν άρθρα για αυτόν τον συντάκτη.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AuthorPage;
