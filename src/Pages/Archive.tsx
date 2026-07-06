import React, { useState } from "react";
import { useSelector } from "react-redux";
import { state } from "../types/initial";
import { blogType } from "../types/blog";
import SimpleNav from "../components/navbar/SimpleNav";
import ModernNav from "../components/navbar/ModernNav";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import Footer from "../components/footer/Footer";
import Pagination from "../components/Pagination/Pagination";
import { ArticleCardSkeleton } from "../components/Loading/LoadingStates";
import "./global.css";

const Archive = () => {
  const { blogs, category } = useSelector((s: state) => s);
  const [activeCat, setActiveCat] = useState<string>("all");

  const filtered =
    activeCat === "all"
      ? blogs
      : blogs.filter(
          (b: blogType) => String(b.category?.id) === String(activeCat)
        );

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

  const filterButton = (key: string, label: string) => (
    <button
      key={key}
      onClick={() => setActiveCat(key)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        activeCat === key
          ? "bg-[#9544cf] text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-slate-50 min-h-screen text-gray-700 overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#9544cf]/80">
      <Nav />

      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-8 rounded-full bg-[#9544cf]" />
          <h1 className="text-3xl font-bold text-gray-900">Όλα τα άρθρα</h1>
          <span className="text-gray-400 text-lg">({filtered.length})</span>
        </div>

        {Array.isArray(category) && category.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filterButton("all", "Όλες")}
            {category.map((cat) => filterButton(String(cat.id), cat.title))}
          </div>
        )}

        {blogs.length > 0 ? (
          filtered.length > 0 ? (
            <Pagination itemsPerPage={9} items={filtered} />
          ) : (
            <p className="text-gray-500 text-lg mt-16 text-center">
              Δεν βρέθηκαν άρθρα σε αυτή την κατηγορία.
            </p>
          )
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Archive;
