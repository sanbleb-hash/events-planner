import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAWzNGO8oxKOuCo--T2eEVJZqE23GZE7Pc',
	authDomain: 'eventsplanner-20b57.firebaseapp.com',
	projectId: 'eventsplanner-20b57',
	storageBucket: 'eventsplanner-20b57.firebasestorage.app',
	messagingSenderId: '233940207136',
	appId: '1:233940207136:web:04a6955137fddf084d9e45',
	measurementId: 'G-SZWDP9S5V9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);
