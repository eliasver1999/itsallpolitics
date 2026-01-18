import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { state } from "../types/initial";
import { blogType, creator } from "../types/blog";
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
      // Decode URL parameter
      const decodedName = decodeURIComponent(authorName);
      
      // Find articles by this author
      const articles = blogs.filter(blog =>
        blog.creator.some(creator => creator.name === decodedName)
      );
      
      // Get author info from first article
      const author = articles.length > 0 
        ? articles[0].creator.find(c => c.name === decodedName)
        : null;
      
      setAuthorArticles(articles);
      setAuthorInfo(author || null);
      setLoading(false);
    }
  }, [authorName, blogs]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="xl:hidden block">
          <PhoneNavbar />
        </div>
        <div className="xl:block hidden">
          <SimpleNav />
          <ModernNav />
        </div>
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

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* Author Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-[#9544cf] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">
              {authorInfo?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {authorInfo?.name}
          </h1>
          <p className="text-gray-600 mb-4">Συντάκτης</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>{authorArticles.length} άρθρα</span>
            <span>Μέλος από {new Date(authorArticles[0]?.created_at || '').getFullYear()}</span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Άρθρα από {authorInfo?.name}
          </h2>
          
          {authorArticles.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {authorArticles.map((article) => (
                <div key={article.id}>
                  <ArticleSecond blog={article} small={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Δεν βρέθηκαν άρθρα για αυτόν τον συντάκτη.
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Στατιστικά</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9544cf]">
                {authorArticles.length}
              </div>
              <div className="text-sm text-gray-600">Άρθρα</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9544cf]">
                {new Set(authorArticles.map(a => a.category.id)).size}
              </div>
              <div className="text-sm text-gray-600">Κατηγορίες</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9544cf]">
                {authorArticles.reduce((total, article) => 
                  total + article.body.replace(/<[^>]*>/g, "").split(/\s+/).length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Λέξεις</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9544cf]">
                {Math.round(authorArticles.length / 
                  ((Date.now() - new Date(authorArticles[authorArticles.length - 1]?.created_at || '').getTime()) / 
                  (1000 * 60 * 60 * 24 * 30)) || 1)}
              </div>
              <div className="text-sm text-gray-600">Άρθρα/μήνα</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthorPage;