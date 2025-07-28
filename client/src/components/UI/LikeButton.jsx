import React, { useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import "../../styles/LikeButton.css";

export default function LikeButton({
  liked,
  likesCount,
  onToggle,
  isAuthenticated,
  onLoginPrompt,
  lastLikedUsers = [],
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      onLoginPrompt?.();
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
      {showTooltip && lastLikedUsers.length > 0 && (
        <div className="like-tooltip inline">
          {lastLikedUsers.map((user, index) => (
            <div className="avatar-circle" key={index}>
              {user}
            </div>
          ))}
        </div>
      )}

      {liked ? (
        <BsFillHeartFill className="heart liked" />
      ) : (
        <BsHeart className="heart" />
      )}

      <span className="count">{likesCount}</span>
    </div>
  );
}
