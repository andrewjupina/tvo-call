const admin = require('firebase-admin');
const fs = require('fs');

const filepath = '/Users/andrewjupina/tvo-call/src/unavailableData.json'
// Initialize Firebase Admin SDK
const serviceAccount = require('./AdminSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const uploadJsonToFirestore = async (filePath, collectionName) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const data = JSON.parse(fileContent);

    for (const item of data) {
      if (item.start) {
        const parsedStartDate = new Date(item.start + "T00:00:00");
        item.start = admin.firestore.Timestamp.fromDate(parsedStartDate);

        // Assuming you also want to convert 'end' date to Firestore Timestamp
        const parsedEndDate = new Date(item.end + "T00:00:00");
        item.end = admin.firestore.Timestamp.fromDate(parsedEndDate);

      }

      const docRef = await db.collection(collectionName).add(item);
      console.log('Document written with ID: ', docRef.id);
    }
  } catch (error) {
    console.error('Error processing file or adding document: ', error);
  }
};

uploadJsonToFirestore(filepath, 'unavailable');
