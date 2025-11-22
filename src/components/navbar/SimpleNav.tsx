import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const SimpleNav = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-slate-50 justify-center items-center h-full  py-4 z-10 sticky top-0">
      <img src="/assets/logo.png" onClick={()=>navigate('/')} className="cursor-pointer" alt="logo" width={132} height={128} />
    </div>
  );
};

export default SimpleNav;
