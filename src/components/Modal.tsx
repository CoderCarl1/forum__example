import { log } from 'console';
import { RefObject, useEffect, useRef, useState } from 'react';
import { usePostContext } from '../context/postContext';
import type { modalTypes, newPostType, replyPostType } from '../types';
import UseClickOutside from '../utils/useClickOutside';

function useModal() {
  const [error, setError] = useState({ msg: '', type: '' });
  const [pseudonym, setPseudonym] = useState('');
  const [content, setContent] = useState('');

  function validateContent() {
    let errorValues = {
      msg: '',
      type: '',
    };
    if (pseudonym === '') {
      errorValues = {
        msg: 'Please enter your Pseudonym',
        type: 'pseudonym',
      };
    }
    if (content === '') {
      errorValues = {
        msg: 'Your message cannot be empty',
        type: 'content',
      };
    }
    if (Object.values(errorValues).some(Boolean)) {
      setError(errorValues);
      return false;
    }
    return true;
  }

  return {
    error,
    pseudonym,
    setPseudonym,
    content,
    setContent,
    validateContent,
  };
}

export default function Modal({ mode, parentId }: modalTypes) {
  const {
    error,
    pseudonym,
    setPseudonym,
    content,
    setContent,
    validateContent,
  } = useModal();
  const { closeModal, addPost, addReply } = usePostContext();
  const modalRef = UseClickOutside(closeModal) as RefObject<HTMLDivElement>;
  const modalWrapper = useRef<HTMLDivElement | null>(null);

  const modeMap = {
    newPost: 'Write your post....',
    reply: 'Write your reply....',
  };
  useEffect(() => {
    console.log('parent ID is', parentId);
  }, []);

  function handleSubmit(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    console.log('handle Submit');
    if (!validateContent()) {
      console.log('errors', { error });
      return;
    }

    if (mode === 'newPost') {
      addPost({
        pseudonym,
        content,
      });
      return;
    }
    if (mode === 'reply') {
      console.log('inside the reply', parentId);

      // TODO: Add error here
      if (parentId === undefined) return;
      addReply({
        pseudonym,
        content,
        parentId,
      });
    }
    // data.
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
