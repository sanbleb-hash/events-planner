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
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

type Props = {
	evtImg?: string;
	uploadType?: 'edit' | 'create';
	setImgUrl?: React.Dispatch<React.SetStateAction<string>>;
	eventId?: string | null;
};

const ImageUploadInput: React.FC<Props> = ({
	evtImg,
	eventId,
	uploadType,
	setImgUrl,
}) => {
	const [image, setImage] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [editImgToggle, setEditImgToggle] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>('');

	const router = useRouter();

	// Handle image upload
	const uploadImage = async () => {
		if (!image) {
			toast.error('Please select an image first.');
			return;
		}

		try {
			setUploading(true);
			const uploadedUrl = await getImgUrl(image);

			if (typeof uploadedUrl === 'string') {
				setImageUrl(uploadedUrl);
				setImgUrl?.(uploadedUrl); // If a setter function is passed, update the parent component state.
				toast.success('Image uploaded successfully!');
			} else {
				throw new Error('Invalid uploaded URL');
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			toast.error('Failed to upload the image. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	// Redirect after image upload
	useEffect(() => {
		if (imageUrl) {
			const redirectTimer = setTimeout(() => {
				const destination =
					uploadType === 'edit'
						? `/events/${eventId}/edit?imgUrl=${imageUrl}`
						: `/create-event?imgUrl=${imageUrl}&eventId=${eventId}`;
				router.replace(destination);
			}, 2000);

			return () => clearTimeout(redirectTimer); // Cleanup timer
		}
	}, [imageUrl, router, uploadType, eventId]);

	// Synchronize `imageUrl` with `localStorage`
	useEffect(() => {
		if (imageUrl) {
			localStorage.setItem('poster', imageUrl);
		} else {
			localStorage.removeItem('poster');
		}
	}, [imageUrl]);

	return (
		<div className='pt-16 space-y-7'>
			{evtImg && !editImgToggle ? (
				<div>
					<Input type='text' disabled value={evtImg} className='w-full' />
					<Button
						variant='default'
						type='button'
						onClick={() =>
							router.replace(
								`/events/${eventId}/edit?imgUrl=${imageUrl}&step=info`
							)
						}
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
						onClick={uploadImage}
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
						onClick={() => setEditImgToggle((prev) => !prev)}
						className='font-semibold text-muted-foreground'
					>
						{editImgToggle ? (
							<p className='flex items-center gap-2'>
								Use Old Image <MdArrowBack className='text-xl' />
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
