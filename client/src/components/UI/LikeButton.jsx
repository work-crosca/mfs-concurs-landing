import React from "react";
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
  const handleClick = () => {
    if (!isAuthenticated) {
      onLoginPrompt?.();
      return;
    }
    onToggle?.();
  };

  const visibleUsers = lastLikedUsers.slice(0, 3);
  const remainingCount = likesCount - visibleUsers.length;

  return (
    <div className="like-button" onClick={handleClick}>
      {likesCount > 0 && (
        <div className="like-tooltip inline">
          {visibleUsers.map((user, index) => (
            <div className="avatar-circle" key={index}>
              {user}
            </div>
          ))}
           {remainingCount > 0 && lastLikedUsers.length > 0 && (
            <div className="avatar-circle more">{remainingCount}</div>
          )}
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