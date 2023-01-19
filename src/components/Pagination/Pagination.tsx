import React from "react";
import ReactPaginate from "react-paginate";
import { blogType } from "../../types/blog";
import Blogs from "../Blog/Blogs";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "./Pagination.css";
type Props = {
  itemsPerPage: number;
  items: blogType[];
  children?: React.ReactNode;
};

const Pagination = ({ itemsPerPage, items }: Props) => {
  const [itemOffset, setItemOffset] = React.useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Blogs items={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdNavigateNext size={22} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<MdNavigateBefore size={22} className="icon" />}
        className="flex flex-row justify-center text-xl items-center space-x-12 mt-4 mb-12  "
      />
    </>
  );
};

export default Pagination;
