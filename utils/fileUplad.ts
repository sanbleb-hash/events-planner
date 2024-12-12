'use server';

import { storage } from '@/db/firebase'; // Firebase storage import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const handImageUpolad = async (file: File) => {
	try {
		if (!file) {
			throw new Error('No file selected');
		}

		// Create a reference to the storage location
		const storageRef = ref(storage, `images/${file.name}`);

		// Upload file to Firebase Storage
		const snapshot = await uploadBytes(storageRef, file);

		// Get the download URL after upload
		const downloadURL = await getDownloadURL(snapshot.ref);

		console.log('File uploaded successfully, URL:', downloadURL);

		// Return the download URL to use elsewhere
		return downloadURL;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error('Failed to upload image. Please try again later.');
	}
};
