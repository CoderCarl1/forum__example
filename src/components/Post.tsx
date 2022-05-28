import { useEffect, useState } from 'react';
import type { PostType } from '../types';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import { usePostContext } from '../context/postContext';

function usePost() {
  const [likesState, setLikesState] = useState(0);

  function likePost() {
    setLikesState((prev) => prev + 1);
  }
  function dislikePost() {
    setLikesState((prev) => prev - 1);
  }

  return {
    likesState,
    setLikesState,
    likePost,
    dislikePost,
  };
}

export default function Post({
  pseudonym,
  content,
  id,
  likes,
  replies = [],
}: PostType) {
  const { likesState, setLikesState, likePost, dislikePost } = usePost();
  const { showModal, updateLikes } = usePostContext();
  useEffect(() => {
    if (likesState !== likes) {
      setLikesState(likes);
    }
  }, []);

  useEffect(() => {
    updateLikes({ id, likes: likesState });
  }, [likesState]);

  return (
    <>
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
          <p className="post__likes-counter">{likesState}</p>
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
            <span className="post__reply-button-wrapper">
              <button
                className="post__reply-button"
                data-id={id}
                onClick={() => showModal({ mode: 'reply', parentId: id })}
              >
                Reply
              </button>
            </span>
          </p>
        </div>
      </div>
      {replies.length > 0 ? (
        <div className="post__reply-wrapper">
          {replies.map((post) => (
            <Post key={`post-${post.id}`} {...post} />
          ))}
        </div>
      ) : null}
    </>
  );
}
