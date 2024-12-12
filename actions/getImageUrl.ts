import { storage } from '@/db/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const getImgUrl = (file: File) => {
	return new Promise((resolve, reject) => {
		const imageName = Date.now() + file.name;

		const storageRef = ref(storage, 'images/' + imageName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				reject(error);
			},
			() => {
				// Handle successful uploads on complete
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
					resolve(downloadURL);
					console.log('File available at', downloadURL);
				});
			}
		);
	});
};
