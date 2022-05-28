import { v4 as uuidv4 } from 'uuid';

const id1 = uuidv4();
const id2 = uuidv4();

export const testData = [
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
        replies: [],
      },
      {
        content:
          'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow’s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper .',
        pseudonym: 'Holystone',
        id: uuidv4(),
        likes: 10,
        parentId: id1,
        replies: [],
      },
    ],
  },
  {
    content:
      'Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.',
    pseudonym: 'Deadlights',
    id: id2,
    likes: 1978,
    replies: [],
  },
];
