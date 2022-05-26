import type { PostType } from '../types';

export default function Post({ pseudonym, content }: PostType) {
  return (
    <div className="post">
      <h3>{pseudonym}</h3>
      <p>{content}</p>
    </div>
  );
}
