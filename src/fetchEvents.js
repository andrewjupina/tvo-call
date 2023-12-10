import { firestore } from './firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

const fetchEvents = async () => {
  const eventsRef = collection(firestore, 'weekendCall'); // Use your collection name
  const snapshot = await getDocs(eventsRef);
  const events = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      title: data.name,
      start: data.start.toDate(), // Convert Firestore Timestamp to JS Date
      end: data.end.toDate(),
      allDay: true
    };
  });
  console.log(events);
  return events;
};

export default fetchEvents;
