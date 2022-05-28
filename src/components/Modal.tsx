import { forwardRef, RefObject, useRef, useState } from 'react';
import { usePostContext } from '../context/postContext';
import type { modalTypes } from '../types';
// import UseClickOutside from '../utils/useClickOutside';

function useModal() {
  const [error, setError] = useState({ msg: '', type: '' });
  const [pseudonym, setPseudonym] = useState('');
  const [content, setContent] = useState('');
  const modeMap = {
    newPost: 'Write your post....',
    reply: 'Write your reply....',
  };
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
    modeMap,
    error,
    pseudonym,
    setPseudonym,
    content,
    setContent,
    validateContent,
  };
}

const Modal = forwardRef(({ mode, parentId }: modalTypes, ref) => {
  const {
    error,
    pseudonym,
    setPseudonym,
    content,
    setContent,
    validateContent,
    modeMap,
  } = useModal();

  const { addPost, addReply } = usePostContext();
  // const modalRef = UseClickOutside(closeModal) as RefObject<HTMLDivElement>;
  const modalWrapper = useRef<HTMLDivElement | null>(null);

  function handleSubmit(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    if (!validateContent()) {
      // TODO: add error handling
      console.warn('errors', { error });
      return;
    }
    const data = { pseudonym, content };
    if (mode === 'newPost') {
      addPost(data);
      return;
    }
    if (mode === 'reply') {
      // TODO: Add error here
      if (parentId === undefined) return;

      addReply({ reply: data, parentId });
    }
  }

  return (
    <div className="dialog-wrapper" ref={modalWrapper}>
      <div
        ref={ref as RefObject<HTMLDivElement>}
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
});

export default Modal;
