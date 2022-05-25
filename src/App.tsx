import Title from './components/Title';
import PostProvider, { usePostContext } from './context/postContext';
import './styles/global.css';
import Modal from './components/Modal';
function App() {
  const { modalState } = usePostContext();
  console.log({ modalState });
  // const { newPostModal, replyModal } = modalState;
  return (
    <>
      <PostProvider>
        <Title />
        <Modal mode={'newPost'} />
      </PostProvider>
    </>
  );
}

export default App;
