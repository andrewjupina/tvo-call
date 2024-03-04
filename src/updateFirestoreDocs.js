import { firestore } from './firebase'; // Ensure you've imported Firebase correctly
import { Timestamp, collection, addDoc } from 'firebase/firestore';

const updateFirestoreDocuments = async (timestamps, userDisplayName) => {

  // Process each timestamp in the array
  for (const timestamp of timestamps) {
    // Convert the Unix timestamp (milliseconds) to a Firestore Timestamp
    // Assuming your timestamps represent the start of the day in UTC
    const startOfDayTimestamp = Timestamp.fromMillis(timestamp);
    const docRef = await addDoc(collection(firestore, "test"), {
      start: startOfDayTimestamp,
      end: startOfDayTimestamp,
      name: userDisplayName
    });
    console.log("Document wrriten with ID:", docRef.id);
  }
};

export default updateFirestoreDocuments;