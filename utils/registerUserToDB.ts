'use server';

import { db } from '@/db/firebase';
import { UserInfo } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type User = UserInfo;

export const registerUserToDB = async (userEntity: User) => {
	const newUser = {
		userId: userEntity.uid,
		username: userEntity.displayName,
		email: userEntity.email,
		avator: userEntity.photoURL,
	};

	try {
		const docRef = await addDoc(collection(db, 'users'), newUser);
		return docRef;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};
