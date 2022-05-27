import Title from './components/Title';
import PostProvider, { usePostContext } from './context/postContext';
import './styles/global.css';
import Modal from './components/Modal';
import Post from './components/Post';
function App() {
  const { modalState } = usePostContext();
  console.log({ modalState });
  const postsData = [
    {
      content:
        'TIL, a^2+b^2=c^2. If only I had an easy way to type that equation online!',
      pseudonym: 'Pythagoras',
      id: '1',
      likes: 362,
      replies: [
        {
          content:
            'LIES! The radical left are trying to corrupt our beautiful right angles!',
          pseudonym: 'US President',
          id: '2',
          likes: -182,
        },
        {
          content:
            'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow’s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper .',
          pseudonym: 'Holystone',
          id: '3',
          likes: 10,
        },
      ],
    },
    {
      content:
        'Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.',
      pseudonym: 'Deadlights',
      id: '4',
      likes: 1978,
    },
  ];
  // const { newPostModal, replyModal } = modalState;
  return (
    <>
      <PostProvider>
        {/* <Modal mode={'newPost'} /> */}
        <article className="posts-wrapper">
          <Title />
          <h2 className="sr-only">Posts</h2>
          {postsData.map((post) => (
            <Post {...post} />
          ))}
        </article>
      </PostProvider>
    </>
  );
}

export default App;
