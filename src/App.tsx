import Title from './components/Title';
import { usePostContext } from './context/postContext';
import './styles/global.css';
import Modal from './components/Modal';
import Post from './components/Post';

function App() {
  const {
    modalState: { shown, newPostModal, replyModal },
    posts,
    parentId,
  } = usePostContext();

  return (
    <>
      <article className="posts-wrapper">
        <Title />
        {shown && newPostModal ? <Modal mode="newPost" /> : null}
        {shown && replyModal ? (
          <Modal mode="reply" parentId={parentId} />
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
