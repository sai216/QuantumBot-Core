const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin once with default credentials
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    if (!data.text || !data.userId) {
      console.log("Required fields (text or userId) are missing");
      throw new functions.https.HttpsError("invalid-argument", "Missing required fields: text or userId");
    }

    const { text, userId } = data;

    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const messageRef = await admin.firestore()
      .collection("messages")
      .doc(userId)
      .collection("messages")
      .add(messageData);

    console.log("Message added successfully: ", messageRef.id);

    return { status: "success", messageId: messageRef.id };
  } catch (error) {
    console.error("Error adding message: ", error);
    throw new functions.https.HttpsError("internal", "Error adding message", error.message);
  }
});
