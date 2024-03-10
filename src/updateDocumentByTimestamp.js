import { collection, query, where, getDocs, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";
import { firestore } from './firebase'; // Ensure you've imported Firebase correctly

async function updateDocumentByTimestamp(timestamps, newName) {
  // Reference to the collection where the documents are stored
  const documentsRef = collection(firestore, "unavailable");

  for (const timestamp of timestamps) {
    const startOfDayTimestamp = Timestamp.fromMillis(timestamp);
    const q = query(documentsRef, where("start", "==", startOfDayTimestamp));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Assuming the combination of "start" and "end" is unique, there should only be one matching document
    if (!querySnapshot.empty) {
      const documentToBeUpdated = querySnapshot.docs[0];
      const documentRef = documentToBeUpdated.ref;
      console.log(documentRef);

      // Update the document with the new name
      await updateDoc(documentRef, {
        name: arrayUnion(newName)
      });

      console.log("Document updated successfully.");
    } else {
      console.log("No document found with the specified start and end timestamps.");
    }
  }
}

export default updateDocumentByTimestamp