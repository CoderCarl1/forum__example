import { useState } from 'react';
import { usePostContext } from '../context/postContext';
export default function Title() {
  const { showModal } = usePostContext();
  return (
    <div className="title-container">
      <h1 className="title-container__title">Maths For 'em</h1>
      <button
        onClick={() => showModal('newPost')}
        className="title-container__button"
      >
        New Post
      </button>
    </div>
  );
}
