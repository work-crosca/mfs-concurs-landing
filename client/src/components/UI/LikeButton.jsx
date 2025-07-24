import React, { useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import "../../styles/LikeButton.css";

export default function LikeButton({
  liked,
  likesCount,
  onToggle,
  isAuthenticated,
  onLoginPrompt,
  lastLikedUsers = []
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      if (onLoginPrompt) onLoginPrompt();
      return;
    }
    onToggle?.();
  };

  return (
    <div
      className="like-button"
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {liked ? (
        <BsFillHeartFill className="heart liked" />
      ) : (
        <BsHeart className="heart" />
      )}
      <span className="count">{likesCount}</span>

      {showTooltip && lastLikedUsers.length > 0 && (
        <div className="like-tooltip">
          {lastLikedUsers.map((user, index) => (
            <div key={index}>{user}</div>
          ))}
        </div>
      )}
    </div>
  );
}