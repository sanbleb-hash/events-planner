'use server';

import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/db/firebase'; // Firebase storage import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const handleImageUpload = async (file: File): Promise<string> => {
	try {
		if (!file) {
			throw new Error('No file selected.');
		}

		// Check if the file is an image
		const validImageTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
		];
		if (!validImageTypes.includes(file.type)) {
			throw new Error('Invalid file type. Only images are allowed.');
		}

		// Generate a unique file name using uuidv4
		const fileName = `${uuidv4()}_${file.name}`;

		// Create a reference to the storage location
		const storageRef = ref(storage, `images/${fileName}`);

		// Upload the file to Firebase Storage
		const snapshot = await uploadBytes(storageRef, file);

		// Get the download URL after the upload
		const downloadURL = await getDownloadURL(snapshot.ref);

		console.log('File uploaded successfully, URL:', downloadURL);

		// Return the download URL
		return downloadURL;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error('Failed to upload the image. Please try again later.');
	}
};
