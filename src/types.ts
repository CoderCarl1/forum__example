import { ReactNode } from 'react';

export type Post = {
  content?: string;
  pseudonym?: string;
};

export type Posts = {
  posts?: Post[] | Post;
};
export type modalTypes = { mode: 'newPost' | 'reply' };

type modalStatus = {
  newPostModal: Boolean;
  replyModal: Boolean;
};
export type PostContextTypes = {
  addPost: (data: Post) => void;
  addReply: (data: Post) => void;
  modalState: modalStatus;
  showModal: (mode: modalTypes) => void;
  closeModal: () => void;
};

export type PostProviderProps = {
  children: ReactNode;
};
