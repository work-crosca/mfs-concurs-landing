import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import "../../styles/LikeButton.css";

export default function LikeButton({ liked, likesCount, onToggle }) {
  return (
    <div className="like-button" onClick={onToggle}>
      {liked ? (
        <BsFillHeartFill className="heart liked" />
      ) : (
        <BsHeart className="heart" />
      )}
      <span className="count">{likesCount}</span>
    </div>
  );
}