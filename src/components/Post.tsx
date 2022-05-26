import { useState } from 'react';
import type { PostType } from '../types';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

function usePost() {
  const [likes, setLikes] = useState(0);

  function likePost() {
    setLikes((prev) => prev + 1);
  }
  function dislikePost() {
    setLikes((prev) => prev - 1);
  }

  return {
    likes,
    likePost,
    dislikePost,
  };
}

export default function Post({ pseudonym, content }: PostType) {
  const { likes, likePost, dislikePost } = usePost();

  return (
    <div className="post">
      <div className="post__likes-wrapper">
        <button className="post__likes-button" onClick={likePost}>
          <span className="sr-only">like post</span>

          <MdOutlineExpandLess
            size="1.5em"
            aria-hidden="true"
            className="post__likes-button-arrow"
          />
        </button>
        <p className="post__likes-counter">{likes}</p>
        <button className="post__likes-button" onClick={dislikePost}>
          <span className="sr-only">dislike post</span>
          <MdOutlineExpandMore
            size="1.5em"
            aria-hidden="true"
            className="post__likes-button-arrow"
          />
        </button>
      </div>
      <div className="post__content-wrapper">
        <h3 className="post__content-pseudonym">{pseudonym}</h3>
        <p className="post__content-content">
          {content}
          <div className="post__reply-button-wrapper">
            <button className="post__reply-button">Reply</button>
          </div>
        </p>
      </div>
    </div>
  );
}
