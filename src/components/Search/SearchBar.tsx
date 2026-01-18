import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { state } from "../../types/initial";
import { blogType } from "../../types/blog";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchBar = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<blogType[]>([]);
  const { blogs } = useSelector((state: state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.body.toLowerCase().includes(query.toLowerCase()) ||
          blog.category.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8)); // Limit to 8 results
    } else {
      setResults([]);
    }
  }, [query, blogs]);

  const handleResultClick = (blog: blogType) => {
    navigate(`/category/${blog.category.id}/article/${blog.id}`);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
        <div className="flex items-center p-4 border-b">
          <AiOutlineSearch className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Αναζήτηση άρθρων, κατηγοριών..."
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {query.length > 2 && (
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleResultClick(blog)}
                    className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg border-b last:border-b-0"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">{blog.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {blog.body.replace(/<[^>]*>/g, "").slice(0, 100)}...
                    </p>
                    <span className="text-xs text-[#9544cf] font-medium">
                      {blog.category.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Δεν βρέθηκαν αποτελέσματα για "{query}"
              </div>
            )}
          </div>
        )}

        {query.length <= 2 && query.length > 0 && (
          <div className="p-8 text-center text-gray-400">
            Πληκτρολογήστε τουλάχιστον 3 χαρακτήρες
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;