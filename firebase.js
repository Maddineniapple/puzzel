// Firebase Configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Utility functions for DB
const DB = {
    saveUser: async (userId, data) => {
        return db.ref('users/' + userId).set(data);
    },
    updateUser: async (userId, data) => {
        return db.ref('users/' + userId).update(data);
    },
    getUser: async (userId) => {
        const snapshot = await db.ref('users/' + userId).once('value');
        return snapshot.val();
    },
    getAllUsers: async () => {
        const snapshot = await db.ref('users').once('value');
        return snapshot.val();
    }
};
