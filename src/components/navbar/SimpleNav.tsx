import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "../Search/SearchBar";

type Props = {};

const SimpleNav = (props: Props) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="flex bg-slate-50 justify-between items-center h-full py-4 z-10 sticky top-0 px-8">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Αναζήτηση"
        >
          <AiOutlineSearch size={24} className="text-gray-600" />
        </button>
        <img 
          src="/assets/logo.png" 
          onClick={() => navigate('/')} 
          className="cursor-pointer" 
          alt="logo" 
          width={132} 
          height={128} 
        />
        <div></div>
      </div>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default SimpleNav;
