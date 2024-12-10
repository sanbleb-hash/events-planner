'use server';

import { db } from '@/db/firebase';
import { UserInfo } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type User = UserInfo;

export const registerUserToDB = async (userEntity: User) => {
	if (!userEntity.uid || !userEntity.email) {
		throw new Error('Invalid user data. UID and email are required.');
	}

	// Reference to the Firestore document
	const userRef = doc(db, 'users', userEntity.uid);

	try {
		// Check if the user already exists in Firestore
		const userDoc = await getDoc(userRef);

		if (userDoc.exists()) {
			return {
				success: true,
				message: 'Welcome back!',
				user: userDoc.data(),
			};
		}

		// Create a new user object
		const newUser = {
			userId: userEntity.uid,
			username: userEntity.displayName || 'Anonymous',
			email: userEntity.email,
			avatar: userEntity.photoURL || '',
		};

		// Add the new user to Firestore
		await setDoc(userRef, newUser);

		return {
			success: true,
			message: 'User successfully registered.',
			user: newUser,
		};
	} catch (error) {
		console.error('Error registering user to Firestore:', error);
		throw new Error('Failed to register or log in the user.');
	}
};
