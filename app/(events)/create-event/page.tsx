'use client';

import React, { useEffect, useState } from 'react';
import SectionWrapper from '@/app/_components/sectionWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { eventSchema } from '@/schemas/eventSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CategoryEnum } from '@/schemas/categoryEnumType';
import { categories } from '@/libs/categoryList';
import { MdArrowRight } from 'react-icons/md';
import ImageUploadInput from '@/app/_components/imageUploadInput';
import { useAuth } from '@/hooks/authContext';
import { useRouter } from 'next/navigation';
import { auth } from '@/db/firebase';

enum PriceType {
	Free = 'Free',
	Paid = 'Paid',
	Donation = 'Donation',
}

const Create: React.FC = () => {
	const router = useRouter();

	const currentUser = auth.currentUser;

	const initialState = {
		title: '',
		date: '',
		time: '',
		organizer: '',
		priceType: PriceType.Free,
		category: CategoryEnum.Art,
		venue: '',
		address: '',
		city: '',
		price: '',
		country: '',
		description: '',
		imageUrl: '',
	};

	const [isImageUpload, setIsImageUpload] = useState(false);

	const form = useForm<z.infer<typeof eventSchema>>({
		resolver: zodResolver(eventSchema),
		defaultValues: initialState,
	});

	const handleFormSubmit = (data: z.infer<typeof eventSchema>) => {
		console.log('Submitted Data:', data);
	};

	const submitToUploadImage = (data: z.infer<typeof eventSchema>) => {
		if (!data) {
			return;
		}
		setTimeout(() => setIsImageUpload(true), 3000);
	};

	useEffect(() => {
		if (!currentUser) router.push('/auth');
	}, []);

	return (
		<SectionWrapper>
			<h1 className='text-center text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
				hie {currentUser?.displayName} ,Let&apos;s Get People to the event
			</h1>
			<p className=' first-letter:capitalize text-lg lg:text-xl text-muted-foreground text-center py-6'>
				{isImageUpload
					? 'choose an image to make a poster'
					: 'fill the following form with your event details to get people to the event'}
			</p>

			<section className='max-w-5xl mx-auto  min-w-[340px] md:min-w-[640px] lg:min-w-[42rem]'>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className=' w-full space-y-6 flex flex-col'
					>
						{!isImageUpload ? (
							<>
								{/* Title */}
								<FormField
									name='title'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter event title' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Date */}
								<div className=' w-full flex flex-row space-2 gap-4 items-center'>
									<FormField
										name='date'
										render={({ field, fieldState }) => (
											<FormItem className=' flex-1 w-full'>
												<FormLabel>Date</FormLabel>
												<FormControl>
													<Input
														{...field}
														type='date'
														placeholder='Select date'
														className=' flex-1 w-full'
													/>
												</FormControl>
												<FormMessage>{fieldState.error?.message}</FormMessage>
											</FormItem>
										)}
									/>

									{/* Time */}
									<FormField
										name='time'
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel>Time</FormLabel>
												<FormControl className=' flex-1 w-full'>
													<Input
														{...field}
														type='time'
														placeholder='Select time'
														className=' flex-1 w-auto'
													/>
												</FormControl>
												<FormMessage>{fieldState.error?.message}</FormMessage>
											</FormItem>
										)}
									/>
								</div>

								{/* Organizer */}
								<FormField
									name='organizer'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Organizer</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter organizer name' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Price Type */}
								<FormField
									name='priceType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price Type</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select price type' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value={PriceType.Free}>Free</SelectItem>
														<SelectItem value={PriceType.Paid}>Paid</SelectItem>
														<SelectItem value={PriceType.Donation}>
															Donation
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>

								{/* Category */}
								<FormField
									name='category'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder='Choose category' />
													</SelectTrigger>
													<SelectContent>
														{categories.map((category) => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Venue */}
								<FormField
									name='venue'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Venue</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter venue' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Address */}
								<FormField
									name='address'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter address' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* City */}
								<FormField
									name='city'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter city' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Country */}
								<FormField
									name='country'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter country' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Price */}
								<FormField
									name='price'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													placeholder='Enter price'
												/>
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>

								{/* Description */}
								<FormField
									name='description'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder='Enter description' />
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
							</>
						) : (
							<ImageUploadInput />
						)}
						{/* Submit Button */}
						{!isImageUpload ? (
							<button
								type='button'
								onClick={form.handleSubmit(submitToUploadImage)}
								className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 flex items-center gap-4 justify-center'
							>
								continue <MdArrowRight className=' text-3xl' />
							</button>
						) : (
							<button
								type='submit'
								className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200'
							>
								Submit
							</button>
						)}
					</form>
				</FormProvider>
			</section>
		</SectionWrapper>
	);
};

export default Create;
