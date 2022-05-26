import { ReactNode } from 'react';

export type PostType = {
  content: string;
  pseudonym: string;
};

export type Posts = {
  posts?: PostType[] | PostType;
};
export type modalTypes = { mode: 'newPost' | 'reply' };

type modalStatus = {
  newPostModal: Boolean;
  replyModal: Boolean;
};
export type PostContextTypes = {
  addPost: (data: PostType) => void;
  addReply: (data: PostType) => void;
  modalState: modalStatus;
  showModal: (mode: modalTypes) => void;
  closeModal: () => void;
};

export type PostProviderProps = {
  children: ReactNode;
};
