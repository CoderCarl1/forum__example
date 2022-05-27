import { ReactNode } from 'react';

export type PostType = {
  id: string;
  parentId?: string;
  pseudonym: string;
  content: string;
  likes: number;
  replies?: PostType[];
};

// ONLY psuedonym & content
export type newPostType = Omit<PostType, 'id' | 'likes' | 'replies'>;
// TODO:
export type replyPostType = newPostType & {
  parentId: string;
};
//ONLY ID of the post + new likes data
export type updateLikesType = { likes: number } & Pick<PostType, 'id'>;

// export type Posts = {
//   posts: PostType[] | [];
// };
export type modalTypes = {
  mode: 'newPost' | 'reply';
  parentId?: string;
};

type modalStatus = {
  shown: boolean;
  newPostModal: Boolean;
  replyModal: Boolean;
};
export type PostContextTypes = {
  posts: PostType[];
  addPost: (data: newPostType) => void;
  addReply: (data: replyPostType) => void;
  modalState: modalStatus;
  updateLikes: (data: updateLikesType) => void;
  showModal: (mode: modalTypes) => void;
  closeModal: () => void;
  parentId: string;
};

export type PostProviderProps = {
  children: ReactNode;
};
