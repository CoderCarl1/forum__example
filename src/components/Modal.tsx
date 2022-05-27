import { RefObject, useEffect, useRef, useState } from 'react';
import { usePostContext } from '../context/postContext';
import type { modalTypes, newPostType, replyPostType } from '../types';
import UseClickOutside from '../utils/useClickOutside';

export default function Modal(mode: modalTypes = 'newPost') {
  const { closeModal, addPost, addReply } = usePostContext();
  const modalRef = UseClickOutside(closeModal) as RefObject<HTMLDivElement>;
  const modalWrapper = useRef<HTMLDivElement | null>(null);
  const [pseudonym, setPseudonym] = useState('');
  const [content, setContent] = useState('');

  const modeMap = {
    newPost: 'Write your post....',
    reply: 'Write your reply....',
  };

  function handleSubmit(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    const data = {
      pseudonym,
      content,
    };
    if (mode === 'newPost') {
      addPost(data);
      return;
    }
    addReply(data as replyPostType);
  }

  return (
    <div className="dialog-wrapper" ref={modalWrapper}>
      <div
        ref={modalRef}
        role="dialog"
        aria-description={modeMap[mode]}
        aria-label={`Write your ${mode}`}
        className="dialog"
      >
        <form action="">
          <div className="dialog__input">
            <label htmlFor="post-content" className="sr-only">
              {modeMap[mode]}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="post.content"
              id="post-content"
              placeholder={modeMap[mode]}
            />
          </div>
          <div className="dialog__input">
            <label htmlFor="post-pseudonym" className="sr-only">
              pseudonym
            </label>
            <input
              type="text"
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              name="post.pseudonym"
              id="post-pseudonym"
              placeholder="Enter your pseudonym"
            />
          </div>
          <button onClick={handleSubmit}>
            {mode === 'newPost' ? 'Post' : 'Reply'}
          </button>
        </form>
      </div>
    </div>
  );
}
