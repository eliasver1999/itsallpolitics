import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileText } from "react-icons/ai";
import { creator, blogType } from "../../types/blog";
import { ApiKind } from "../../types/api";

type Props = {
  creators: creator[];
  blogs: blogType[];
};

/**
 * Rich author card shown at the foot of an article: avatar, name, and a
 * link through to the author's page with a live count of their articles.
 */
const AuthorBio = ({ creators, blogs }: Props) => {
  if (!creators || creators.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
        Σχετικά με τον συντάκτη
      </h4>
      {creators.map((cr, i) => {
        const count = blogs.filter((b) =>
          b.creator?.some((c) => c.name === cr.name)
        ).length;

        return (
          <div
            key={cr.name + i}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
          >
            {cr.image?.path ? (
              <img
                src={ApiKind.IMAGE + cr.image.path}
                alt={cr.name}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#9544cf]/20 bg-white flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9544cf] to-[#6905ab] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">
                  {cr.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="min-w-0">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#9544cf]/10 text-[#9544cf] text-xs font-medium mb-1">
                Συντάκτης
              </span>
              <h5 className="text-lg font-semibold text-gray-900 truncate">
                {cr.name}
              </h5>
              <NavLink
                to={`/author/${encodeURIComponent(cr.name)}`}
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#9544cf] transition-colors"
              >
                <AiOutlineFileText size={14} />
                {count === 1 ? "1 άρθρο" : `${count} άρθρα`} · Δείτε όλα
              </NavLink>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuthorBio;
