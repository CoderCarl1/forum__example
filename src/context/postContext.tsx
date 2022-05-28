import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { testData } from './testData';
import type {
  modalTypes,
  PostType,
  PostContextTypes,
  PostProviderProps,
  newPostType,
  replyPostType,
  updateLikesType,
} from '../types';
const PostContext = createContext({} as PostContextTypes);
PostContext.displayName = 'Post Context';

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<PostType[]>(testData);
  const [parentId, setParentId] = useState('');

  const [modalState, setModalState] = useState({
    shown: false,
    newPostModal: false,
    replyModal: false,
  });

  function showModal({ mode, parentId }: modalTypes) {
    switch (true) {
      case mode === 'newPost': {
        setModalState({
          shown: true,
          newPostModal: true,
          replyModal: false,
        });
        break;
      }
      case mode === 'reply': {
        // TODO: add error when missing parentID
        if (!parentId) return;
        setParentId(parentId);
        setModalState({
          shown: true,
          newPostModal: false,
          replyModal: true,
        });

        break;
      }
      default: {
        // TODO: add error thrown when receiving dif type
        closeModal();
        break;
      }
    }
  }

  function closeModal() {
    setModalState({
      shown: false,
      newPostModal: false,
      replyModal: false,
    });
    setParentId('');
  }

  function findPost(postArr: PostType[], id: string): PostType | undefined {
    if (postArr.length === 0) return;
    let foundPost = postArr.find((post) => post.id === id);
    if (foundPost) return foundPost;

    for (let i = 0; i < postArr.length; i++) {
      return findPost(postArr[i].replies, id);
    }
  }

  function updateLikes(data: updateLikesType) {
    const { id, likes } = data;
    if (!id || !likes) return;

    const clonedPosts = [...posts];
    const post = findPost(clonedPosts, id);
    // TODO: Error handling -> throw new Error('post not found... something something darkside');
    if (!post) return;

    post.likes = likes;
    setPosts(clonedPosts);
  }

  function compilePost(data: newPostType): PostType {
    return {
      ...data,
      id: uuidv4(),
      likes: 0,
      replies: [],
    };
  }

  function addPost(data: newPostType) {
    if (!data) return;

    const compiledPost = compilePost(data);

    if (!posts) {
      setPosts([compiledPost]);
    } else {
      setPosts([...posts, compiledPost]);
    }
    closeModal();
  }

  function addReply(data: replyPostType) {
    const { reply, parentId } = data;

    const clonedPosts = [...posts];
    const post = findPost(clonedPosts, parentId);
    const compiledPost = compilePost(reply);
    if (!post) return;

    post.replies = [...post.replies, compiledPost];

    setPosts(clonedPosts);
    closeModal();
  }

  const values = {
    posts,
    addPost,
    addReply,
    modalState,
    updateLikes,
    showModal,
    closeModal,
    parentId,
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
