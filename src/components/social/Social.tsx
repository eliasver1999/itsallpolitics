import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { blogType } from "../../types/blog";
type Props = {
  blog: blogType;
};

const Social = ({ blog }: Props) => {
  return (
    <div className="w-full bg-gray-400 mt-8 flex justify-end p-4 rounded-md">
      <FacebookShareButton
        url={"https://www.itsallpolitics.gr/category/24/article/10"}
        quote={blog.title}
        hashtag={"#itsallpolitics"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default Social;
