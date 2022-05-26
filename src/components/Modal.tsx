import { RefObject, useEffect, useRef } from 'react';
import { usePostContext } from '../context/postContext';
import type { modalTypes } from '../types';
import UseClickOutside from '../utils/useClickOutside';

export default function Modal({ mode = 'newPost' }: modalTypes) {
  const { closeModal } = usePostContext();
  const modalRef = UseClickOutside(closeModal) as RefObject<HTMLDivElement>;
  const modalWrapper = useRef<HTMLDivElement | null>(null);
  const modeMap = {
    newPost: 'Write your post....',
    reply: 'Write your reply....',
  };

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
              // type="text"
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
              name="post.pseudonym"
              id="post-pseudonym"
              placeholder="Enter your pseudonym"
            />
          </div>
          <button>{mode === 'newPost' ? 'Post' : 'Reply'}</button>
        </form>
      </div>
    </div>
  );
}
