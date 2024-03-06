import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchEvents = async () => {
  try {
    const eventsRef = collection(firestore, 'unavailableRequests');
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map(doc => {
      const data = doc.data();

      let startDate = new Date(data.start);
      let endDate = new Date(data.end);

      // Check if start and end are Firestore Timestamps
      if (data.start && typeof data.start.toDate === 'function') {
        startDate = data.start.toDate();
      }

      if (data.end && typeof data.end.toDate === 'function') {
        endDate = data.end.toDate();
      }

      return {
        title: "Unavailable: \n" + data.name,
        start: startDate,
        end: endDate,
        allDay: true,
      };
    });
    return events;
  } catch (error) {
    console.error("Error fetching unavailable:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export default fetchEvents;