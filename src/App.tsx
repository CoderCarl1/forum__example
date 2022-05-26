import Title from './components/Title';
import PostProvider, { usePostContext } from './context/postContext';
import './styles/global.css';
import Modal from './components/Modal';
import Post from './components/Post';
function App() {
  const { modalState } = usePostContext();
  console.log({ modalState });
  const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ab optio enim non nemo hic soluta porro. Pariatur in itaque fugit soluta maxime possimus dolore!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ab optio enim non nemo hic soluta porro. Pariatur in itaque fugit soluta maxime possimus dolore!';
  // const { newPostModal, replyModal } = modalState;
  return (
    <>
      <PostProvider>
        {/* <Modal mode={'newPost'} /> */}
        <article className="posts-wrapper">
          <Title />
          <h2 className="sr-only">Posts</h2>

          <Post pseudonym="Carl" content={lorem} />
        </article>
      </PostProvider>
    </>
  );
}

export default App;
