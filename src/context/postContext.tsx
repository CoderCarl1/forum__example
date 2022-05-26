import { createContext, ReactNode, useContext, useState } from 'react';
import type {
  modalTypes,
  PostType,
  PostContextTypes,
  PostProviderProps,
  Posts,
} from '../types';
const PostContext = createContext({} as PostContextTypes);
PostContext.displayName = 'Post Context';

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Posts | null>();
  const [modalState, setModalState] = useState({
    newPostModal: false,
    replyModal: false,
  });

  function showModal({ mode }: modalTypes) {
    if (mode === 'newPost')
      setModalState({
        newPostModal: true,
        replyModal: false,
      });
    if (mode === 'reply')
      setModalState({
        newPostModal: false,
        replyModal: true,
      });
  }

  function closeModal() {
    setModalState({
      newPostModal: false,
      replyModal: false,
    });
  }
  function addPost(data: PostType) {
    /** TODO: add functionality to update posts */
    // setPosts(data);
    console.log('NEW POST added');
  }

  function addReply(data: PostType) {
    console.log('reply added');
  }

  const values = {
    addPost,
    addReply,
    modalState,
    showModal,
    closeModal,
  };
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a <PostProvider />');
  }
  return context;
}

export default PostProvider;
