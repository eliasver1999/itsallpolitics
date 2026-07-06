import React from "react";
import { useParams } from "react-router-dom";
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

const TagPage = () => {
  const { slug } = useParams();
  const { blogs } = useSelector((s: state) => s);

  const filtered = blogs.filter((b: blogType) =>
    (b.tags || []).some((t) => t.slug === slug)
  );

  // Display the tag's proper name (from the data) rather than the raw slug.
  const tagName =
    filtered
      .flatMap((b) => b.tags || [])
      .find((t) => t.slug === slug)?.name || slug;

  return (
    <div className="bg-slate-50 min-h-screen text-gray-700 overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#9544cf]/80">
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-8 rounded-full bg-[#9544cf]" />
          <h1 className="text-3xl font-bold text-gray-900">#{tagName}</h1>
          <span className="text-gray-400 text-lg">({filtered.length})</span>
        </div>

        {blogs.length > 0 ? (
          filtered.length > 0 ? (
            <Pagination itemsPerPage={9} items={filtered} />
          ) : (
            <p className="text-gray-500 text-lg mt-16 text-center">
              Δεν βρέθηκαν άρθρα με αυτή την ετικέτα.
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

export default TagPage;
