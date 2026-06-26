import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { state } from "../../types/initial";
import { blogType } from "../../types/blog";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// Strip Greek accents (tonos/dialytika) and lowercase so that
// "Παπαδόπουλος" matches "παπαδοπουλος" etc.
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, "");

// Field weights — a hit in the title matters more than one buried in the body.
const WEIGHT_TITLE = 8;
const WEIGHT_TAG = 4;
const WEIGHT_CATEGORY = 3;
const WEIGHT_BODY = 1;

const scoreBlog = (blog: blogType, terms: string[]): number => {
  const title = normalize(blog.title);
  const body = normalize(stripHtml(blog.body));
  const category = normalize(blog.category.title);
  const tags = (blog.tags ?? []).map((t) => normalize(t.name));

  let score = 0;
  for (const term of terms) {
    let matched = false;
    if (title.includes(term)) {
      score += WEIGHT_TITLE;
      // Bonus when the title starts with the term (likely most relevant).
      if (title.startsWith(term)) score += WEIGHT_TITLE;
      matched = true;
    }
    if (tags.some((tag) => tag.includes(term))) {
      score += WEIGHT_TAG;
      matched = true;
    }
    if (category.includes(term)) {
      score += WEIGHT_CATEGORY;
      matched = true;
    }
    if (body.includes(term)) {
      score += WEIGHT_BODY;
      matched = true;
    }
    // Every term must match somewhere (AND semantics) — otherwise drop it.
    if (!matched) return 0;
  }
  return score;
};

// Highlight occurrences of the query terms within a plain-text string,
// accent-insensitively, without mangling the original casing/accents.
const highlight = (text: string, terms: string[]): React.ReactNode => {
  if (terms.length === 0) return text;
  const normalized = normalize(text);
  // Mark every character that falls inside a matched term.
  const marks = new Array(text.length).fill(false);
  for (const term of terms) {
    if (!term) continue;
    let from = 0;
    let idx = normalized.indexOf(term, from);
    while (idx !== -1) {
      for (let i = idx; i < idx + term.length; i++) marks[i] = true;
      from = idx + term.length;
      idx = normalized.indexOf(term, from);
    }
  }
  const parts: React.ReactNode[] = [];
  let buffer = "";
  let bufferMarked = marks[0] ?? false;
  const flush = (key: number) => {
    if (!buffer) return;
    parts.push(
      bufferMarked ? (
        <mark key={key} className="bg-[#9544cf]/20 text-inherit rounded px-0.5">
          {buffer}
        </mark>
      ) : (
        <React.Fragment key={key}>{buffer}</React.Fragment>
      )
    );
    buffer = "";
  };
  for (let i = 0; i < text.length; i++) {
    if (marks[i] !== bufferMarked) {
      flush(i);
      bufferMarked = marks[i];
    }
    buffer += text[i];
  }
  flush(text.length);
  return parts;
};

const SearchBar = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { blogs } = useSelector((state: state) => state);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  // Debounce the query so we don't re-rank on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(id);
  }, [query]);

  const terms = useMemo(
    () =>
      normalize(debounced)
        .split(/\s+/)
        .filter((t) => t.length > 0),
    [debounced]
  );

  const results = useMemo(() => {
    if (debounced.trim().length <= 2) return [];
    return blogs
      .map((blog) => ({ blog, score: scoreBlog(blog, terms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.blog);
  }, [blogs, terms, debounced]);

  // Keep the highlighted result valid as the list changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  // Reset state whenever the panel is closed.
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setDebounced("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  const handleResultClick = (blog: blogType) => {
    navigate(`/category/${blog.category.id}/article/${blog.id}`);
    onClose();
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) handleResultClick(selected);
    }
  };

  // Scroll the active result into view during keyboard navigation.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isOpen) return null;

  const hasQuery = debounced.trim().length > 2;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-4 border-b">
          <AiOutlineSearch className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Αναζήτηση άρθρων, κατηγοριών..."
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {hasQuery && (
          <div ref={listRef} className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((blog, index) => (
                  <div
                    key={blog.id}
                    data-index={index}
                    onClick={() => handleResultClick(blog)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`p-3 cursor-pointer rounded-lg border-b last:border-b-0 ${
                      index === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {highlight(blog.title, terms)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {stripHtml(blog.body).slice(0, 100)}...
                    </p>
                    <span className="text-xs text-[#9544cf] font-medium">
                      {blog.category.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Δεν βρέθηκαν αποτελέσματα για "{debounced}"
              </div>
            )}
          </div>
        )}

        {!hasQuery && query.length > 0 && (
          <div className="p-8 text-center text-gray-400">
            Πληκτρολογήστε τουλάχιστον 3 χαρακτήρες
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
