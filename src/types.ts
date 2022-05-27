import { ReactNode } from 'react';

export type PostType = {
  id: string;
  pseudonym: string;
  content: string;
  likes: number;
  replies?: PostType[];
};

export type newPostType = Omit<PostType, 'id' | 'likes' | 'replies'>;
export type replyPostType = Omit<PostType, 'id'>;
export type updateLikesType = { likes: number } & Pick<PostType, 'id'>;

export type Posts = {
  posts: PostType[] | null;
};
export type modalTypes = 'newPost' | 'reply';

type modalStatus = {
  newPostModal: Boolean;
  replyModal: Boolean;
};
export type PostContextTypes = {
  addPost: (data: newPostType) => void;
  addReply: (data: replyPostType) => void;
  modalState: modalStatus;
  updateLikes: (data: updateLikesType) => void;
  showModal: (mode: modalTypes) => void;
  closeModal: () => void;
};

export type PostProviderProps = {
  children: ReactNode;
};
