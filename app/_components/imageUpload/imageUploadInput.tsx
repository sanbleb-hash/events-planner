'use client';

import { getImgUrl } from '@/actions/getImageUrl';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
	evtImg?: string;
	eventId?: string | null;
};

const ImageUploadInput: React.FC<Props> = ({ evtImg, eventId }) => {
	const [image, setImage] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [editImgToggle, setIeditImgToggle] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const router = useRouter();

	// Function to handle image upload
	const handleUpload = async () => {
		if (!image) {
			alert('Please select an image first.');
			return;
		}

		try {
			setUploading(true);

			// Upload the image and get the URL
			const uploadedUrl = await getImgUrl(image);

			if (typeof uploadedUrl === 'string') {
				setImageUrl(uploadedUrl);
			} else {
				throw new Error('Uploaded URL is not a valid string');
			}

			console.log('Image uploaded successfully:', uploadedUrl);
		} catch (error) {
			console.error('Error uploading image:', error);
			alert('Failed to upload the image. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	// Redirect after successful image upload
	useEffect(() => {
		if (imageUrl) {
			const redirectTimer = setTimeout(() => {
				router.replace(`/create-event?imgUrl=${imageUrl}&eventId=${eventId}`);
			}, 2000);

			return () => clearTimeout(redirectTimer); // Cleanup timer
		}
	}, [imageUrl, router]);

	const handleToggleNewUpload = () => setIeditImgToggle((prev) => !prev);

	return (
		<div className='pt-16 space-y-7'>
			{/* If evtImg exists and editImgToggle is true */}
			{evtImg && !editImgToggle ? (
				<div>
					<Input type='text' disabled value={evtImg} className='w-full' />

					<Button
						variant='default'
						type='button'
						onClick={() => router.replace(`/create-event?imgUrl=${evtImg}`)}
						className='font-semibold mt-7'
					>
						Continue with Current Image
					</Button>
				</div>
			) : (
				<>
					<FormField
						name='imageUrl'
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel htmlFor='image' className='mb-4 capitalize'>
									Add an Image
								</FormLabel>
								<FormControl>
									<Input
										type='file'
										name='image'
										accept='image/*'
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											if (e.target.files && e.target.files[0]) {
												setImage(e.target.files[0]);
											}
										}}
									/>
								</FormControl>
								<FormMessage>{fieldState.error?.message}</FormMessage>
							</FormItem>
						)}
					/>

					<Button
						type='button'
						onClick={handleUpload}
						disabled={!image || uploading}
						className='mt-4 w-full'
					>
						{uploading ? 'Uploading...' : 'Upload Image'}
					</Button>
				</>
			)}
			{evtImg && (
				<div className='flex flex-col lg:flex-row gap-4 mt-4'>
					<Button
						variant='outline'
						onClick={handleToggleNewUpload}
						className='font-semibold text-muted-foreground'
					>
						{editImgToggle ? (
							<p className=' flex items-center gap-2'>
								use old image
								<MdArrowBack className=' text-xl ' />
							</p>
						) : (
							<p>Add New Image</p>
						)}
					</Button>
				</div>
			)}
		</div>
	);
};

export default ImageUploadInput;
