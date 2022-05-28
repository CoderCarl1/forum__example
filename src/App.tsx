import Title from './components/Title';
import { usePostContext } from './context/postContext';
import './styles/global.css';
import Modal from './components/Modal';
import Post from './components/Post';
import { forwardRef, useEffect } from 'react';
import UseClickOutside from './utils/useClickOutside';

function App() {
  const {
    modalState: { shown, newPostModal, replyModal },
    posts,
    parentId,
    closeModal,
  } = usePostContext();
  const modalRef = UseClickOutside(closeModal);

  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;
    const firstEl = node.getelementById('post-content');
    node.getelementById('post-content')
    const lastEl = 
    if (!shown) {
      node.removeAttribute('tabindex');
      return;
    }

    node.tabIndex = -1;

    node.focus();

    // return () =>
  }, [shown]);

  return (
    <>
      {/* <Modal mode="newPost" /> */}
      <article className="posts-wrapper">
        <Title />
        {shown && newPostModal ? <Modal mode="newPost" ref={modalRef} /> : null}
        {shown && replyModal ? (
          <Modal mode="reply" parentId={parentId} ref={modalRef} />
        ) : null}
        <h2 className="sr-only">Posts</h2>
        {posts.map((post) => (
          <Post key={`post-${post.id}`} {...post} />
        ))}
      </article>
    </>
  );
}

export default App;
