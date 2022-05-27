import { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

const id1 = uuidv4();
const id2 = uuidv4();

const postsData = [
  {
    content:
      'TIL, a^2+b^2=c^2. If only I had an easy way to type that equation online!',
    pseudonym: 'Pythagoras',
    id: id1,
    likes: 362,
    replies: [
      {
        content:
          'LIES! The radical left are trying to corrupt our beautiful right angles!',
        pseudonym: 'US President',
        id: uuidv4(),
        likes: -182,
        parentId: id1,
      },
      {
        content:
          'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow’s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper .',
        pseudonym: 'Holystone',
        id: uuidv4(),
        likes: 10,
        parentId: id1,
      },
    ],
  },
  {
    content:
      'Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.',
    pseudonym: 'Deadlights',
    id: id2,
    likes: 1978,
  },
];

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<PostType[]>(postsData);
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
    console.log('close modal run', modalState);
  }

  // TODO: set up recursive find method
  // function findPost(postArr: PostType[], id: string){
  //   let result = '';

  //   let parentId = postArr.find(post => post.id === id);
  //   for (const [key, value] in postArr) {
  //     // if post.id === id
  //     if (post.id !== id && post)
  //     findPost(post.replies, id);
  //   }
  //   if (parentId === undefined)
  // }

  function updateLikes(data: updateLikesType) {
    // TODO: Error handling -> throw new Error('post not found... something something darkside');
    // if (posts === null) return;
    const { id, likes } = data;

    // TODO: reference the findPost, find the post and then update the likes
    // console.log('is Array? => ', Array.isArray(posts));
    // console.log('backup typechecker => ', typeof posts);
    // const post = posts.find((post) => post.id === id);
  }

  function addPost(data: newPostType) {
    if (!data) return;

    const compiledData = { ...data, id: uuidv4() } as PostType;

    if (!posts) {
      setPosts([compiledData]);
    } else {
      setPosts([...posts, compiledData]);
    }
    closeModal();

    console.log('NEW POST added', { posts });
  }

  function addReply(data: replyPostType) {
    console.log('inside add Reply Func');
    const clonedPosts = [...posts];
    console.log('clonedPosts', { clonedPosts });
    // TODO: reference the findPost, find the post and then add a reply to it

    // const parentPost = find(clonedPosts, parentId);
    // console.log('parent is => ', { parentPost });
    console.log('reply added');
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
