import { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  modalTypes,
  PostType,
  PostContextTypes,
  PostProviderProps,
  Posts,
  newPostType,
  replyPostType,
  updateLikesType,
} from '../types';
const PostContext = createContext({} as PostContextTypes);
PostContext.displayName = 'Post Context';

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Posts | null>(null);
  const [modalState, setModalState] = useState({
    newPostModal: false,
    replyModal: false,
  });

  function showModal(mode: modalTypes) {
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

  function updateLikes(data: updateLikesType) {
    // TODO: Error handling -> throw new Error('post not found... something something darkside');
    // if (posts === null) return;
    const { id, likes } = data;
    console.log({ id });
    console.log({ likes });
    // console.log('is Array? => ', Array.isArray(posts));
    // console.log('backup typechecker => ', typeof posts);
    // const post = posts.find((post) => post.id === id);
  }

  function addPost(data: newPostType) {
    // setPosts(data);
    const newData = { ...data, id: uuidv4() } as PostType;

    console.log('NEW POST added');
  }

  function addReply(data: replyPostType) {
    console.log('reply added');
  }

  const values = {
    addPost,
    addReply,
    modalState,
    updateLikes,
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
