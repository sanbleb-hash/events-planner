'use client';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

type Props = {};

const ImageUploadInput = (props: Props) => {
	const [image, setImage] = useState<File | null>(null);
	return (
		<>
			{/* Image URL */}
			<FormField
				name='imageUrl'
				render={({ field, fieldState }) => (
					<FormItem>
						<FormLabel htmlFor='image' className=' mb-4 capitalize'>
							add an image
						</FormLabel>
						<FormControl>
							<Input
								type='file'
								name='image'
								hidden
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.files !== null && e.target.files?.length > 0) {
										setImage(e.target.files[0]);
									}
								}}
							/>
						</FormControl>
						<FormMessage>{fieldState.error?.message}</FormMessage>
					</FormItem>
				)}
			/>
		</>
	);
};

export default ImageUploadInput;
