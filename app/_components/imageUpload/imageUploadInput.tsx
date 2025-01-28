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
import { MdArrowForward } from 'react-icons/md';
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
	const [isNewUpload, setIsNewUpload] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const router = useRouter();

	// Upload image and update image URL
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
				setImgUrl?.(uploadedUrl);

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
			const destination =
				uploadType === 'edit'
					? `/events/${eventId}/edit?imgUrl=${imageUrl}&step=info`
					: `/create-event?imgUrl=${imageUrl}&eventId=${eventId}`;
			router.replace(destination);
		}
	}, [imageUrl, router, uploadType]);

	// Sync `imageUrl` with local storage
	useEffect(() => {
		if (imageUrl) {
			localStorage.setItem('poster', imageUrl);
		} else {
			localStorage.removeItem('poster');
		}
	}, [imageUrl]);

	const handleNewUpload = () => setIsNewUpload(true);

	// Form Element for File Input
	const FormElement = () => (
		<FormField
			name='image'
			render={({ fieldState }) => (
				<FormItem>
					<FormLabel htmlFor='image' className='mb-4 capitalize'>
						Add an Image
					</FormLabel>
					<FormControl>
						<Input
							type='file'
							hidden
							name='image'
							accept='image/*'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								if (e.target.files?.[0]) {
									setImage(e.target.files[0]);
								}
							}}
						/>
					</FormControl>
					<FormMessage>{fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);

	return (
		<div className='pt-16 space-y-7'>
			{/* Current Image Display or File Upload */}
			{evtImg && !editImgToggle ? (
				<div>
					{isNewUpload ? (
						<div>
							<FormElement />
							{/* Upload Button */}
							<Button
								type='button'
								onClick={uploadImage}
								disabled={!image || uploading}
								className='mt-4 w-full'
							>
								{uploading ? 'Uploading...' : 'Upload Image'}
							</Button>
						</div>
					) : (
						<div className='space-y-4'>
							<Input
								type='text'
								value={evtImg}
								disabled
								name='imageUrl'
								className='w-full'
							/>
							<Button
								variant='default'
								type='button'
								onClick={() =>
									router.replace(
										`/events/${eventId}/edit?imgUrl=${evtImg}&step=info`
									)
								}
								className='text-sm'
							>
								Continue with Current Image{' '}
								<MdArrowForward className='text-sm text-white ' />
							</Button>
						</div>
					)}
				</div>
			) : (
				<div className=' w-full flex items-start flex-col'>
					<FormElement />
					{/* Upload Button */}
					<Button
						type='button'
						onClick={uploadImage}
						disabled={!image || uploading}
						className='mt-4 w-full'
					>
						{uploading ? 'Uploading...' : 'Upload Image'}
					</Button>
				</div>
			)}

			{/* Image Toggle Buttons */}
			{evtImg && (
				<div className='flex flex-col lg:flex-row gap-4 mt-4'>
					{isNewUpload ? (
						<span
							className='flex items-center gap-2 cursor-pointer'
							onClick={() => {
								setIsNewUpload(false);
								setEditImgToggle(false);
							}}
						>
							<Button
								variant='default'
								type='button'
								onClick={() =>
									router.replace(
										`/events/${eventId}/edit?imgUrl=${evtImg}&step=info`
									)
								}
								className='font-semibold flex items-center justify-center'
							>
								Continue with Same Image
								<MdArrowForward className='text-sm text-white ' />
							</Button>
						</span>
					) : (
						<Button
							type='button'
							variant='outline'
							className='font-semibold text-muted-foreground'
							onClick={handleNewUpload}
						>
							Add New Image
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default ImageUploadInput;
