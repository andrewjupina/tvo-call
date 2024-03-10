import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchEvents = async () => {
  try {
    const eventsRef = collection(firestore, 'unavailable');
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

      let titleName;
      if (Array.isArray(data.name)) {
        titleName = data.name.join(", ");
      } else {
        titleName = data.name || "Unnamed"; // Use data.name if it exists and is not an array, otherwise default
      }
      return {
        title: `Unavailable: \n${titleName}`,
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