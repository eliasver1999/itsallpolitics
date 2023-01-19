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
        url={"https://barbox.gr/"}
        quote={blog.title}
        hashtag={"#itsallpolitics"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round /> Facebookでshare
      </FacebookShareButton>
    </div>
  );
};

export default Social;
