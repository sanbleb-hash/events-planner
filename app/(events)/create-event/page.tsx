'use client';

import React, { useEffect, useState } from 'react';
import SectionWrapper from '@/app/_components/sectionWrapper';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { eventSchema } from '@/schemas/eventSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CategoryEnum } from '@/schemas/categoryEnumType';
import { categories } from '@/libs/categoryList';

import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/authContext';
import { toast } from 'react-toastify';
import FormFieldInput from '@/app/_components/formField';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';

import ImageUploadInput from '@/app/_components/imageUpload/imageUploadInput';
import { getEventById } from '@/actions/getEventById';
import { editEvent } from '@/actions/editEvent';
import { createEvent } from '@/actions/createEvent';
import Loading from '@/app/_components/loading/loading';

enum PriceType {
	Free = 'Free',
	Paid = 'Paid',
	Donation = 'Donation',
	Invite = 'Invite Only',
}

const Create: React.FC = () => {
	const { user: currentUser } = useAuth();
	const [event, setEvent] = useState<DocumentData | undefined>(undefined);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [isImageUpload, setIsImageUpload] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const searchParams = useSearchParams();

	const imageUrl = searchParams.get('imgUrl');
	const eventId = searchParams.get('eventId');

	const [isEdit, setIsEdit] = useState<boolean>(!!eventId);

	useEffect(() => {
		const fetchEvent = async () => {
			if (!eventId) return;
			setFetchLoading(true);
			try {
				getEventById(eventId)
					.then((item) => setEvent(item))
					.catch((e: unknown) => toast.error(`thats did&apos;nt work`))
					.finally(() => {
						setFetchLoading(false);
					});
			} catch (error) {
				console.error('Error fetching event:', error);
			}
		};

		fetchEvent();
	}, [eventId, getEventById]);

	const initialState = {
		title: event?.title || '',
		date: event?.date || '',
		time: event?.time || '',
		organizer: '',
		priceType: PriceType.Free,
		category: CategoryEnum.Art,
		venue: '',
		address: '',
		city: '',
		price: '',
		country: '',
		description: '',
		attendants: [],
		imageUrl: imageUrl || '',
	};

	useEffect(() => {
		if (eventId) setIsEdit(true);
	}, [eventId]);

	const form = useForm<z.infer<typeof eventSchema>>({
		resolver: zodResolver(eventSchema),
		defaultValues: initialState,
	});

	const handleFormSubmit = async (data: z.infer<typeof eventSchema>) => {
		if (!currentUser) {
			toast.error('Please log in first!');
			return;
		}

		setIsSubmitting(true);
		try {
			if (isEdit && eventId) {
				await editEvent(data, eventId);
				toast.success('Event updated successfully');
			} else {
				const newEvent = await createEvent(data);
				toast.success('Event created successfully');
				router.push(`/events/${newEvent.id}`);
			}
		} catch (error) {
			toast.error('Error submitting event, please try again');
		} finally {
			setIsSubmitting(false);
		}
	};

	// Watch the value of priceType
	const priceType = useWatch({
		control: form.control,
		name: 'priceType',
	});
	useEffect(() => {
		if (imageUrl) setIsImageUpload(true);
	}, [imageUrl]);

	useEffect(() => {
		if (event) {
			try {
				form.reset({
					title: event?.title || '',
					date: event?.date || '',
					time: event?.time || '',
					organizer: event?.organizer || '',
					priceType: event?.priceType || PriceType.Free,
					category: event?.category || CategoryEnum.Art,
					venue: event?.venue || '',
					address: event?.address || '',
					city: event?.city || '',
					price: event?.price || '',
					country: event?.country || '',
					description: event?.description || '',
					attendants: event?.attendants || [],
					imageUrl: event?.imageUrl || '',
				});
			} catch (error) {
				toast.error('failed to load event');
			} finally {
				setFetchLoading(false);
			}
		}
	}, [eventId]);

	// Determine if the price input should be shown
	const togglePrice = priceType === PriceType.Paid;
	if (fetchLoading) {
		<p>loading ...</p>;
	}

	return (
		<SectionWrapper>
			<h1 className='text-center text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
				{isEdit ? 'Edit Event' : "Let's Get People to the Event "}
			</h1>
			<p className='first-letter:capitalize text-lg lg:text-xl text-muted-foreground text-center py-6'>
				{isImageUpload
					? 'Fill the following form with your event details to get people to the event'
					: 'Choose an image to make a poster'}
			</p>
			<div className=' py-5 flex items-center justify-center'>
				{imageUrl && (
					<Image
						src={imageUrl}
						alt='your proposed banner image'
						width={250}
						height={250}
						className=' object-cover rounded-md shadow-md aspect-video'
					/>
				)}
			</div>

			<section className='max-w-5xl mx-auto min-w-[340px] md:min-w-[640px] lg:min-w-[42rem]'>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className='w-full space-y-6 flex flex-col'
					>
						{isImageUpload ? (
							<>
								<FormFieldInput
									name='title'
									type='text'
									placeholder='Enter event title'
									title='Title'
								/>
								<div className='w-full flex flex-row space-2 gap-4 items-center'>
									<FormFieldInput
										name='date'
										type='date'
										placeholder='Select date'
										title='Date'
									/>
									<FormFieldInput
										name='time'
										type='time'
										placeholder='Select time'
										title='Time'
									/>
								</div>

								{/*selects*/}
								<div className=' flex flex-col gap-3 lg:flex-row w-full'>
									{/* Price Type */}
									<FormField
										name='priceType'
										render={({ field }) => (
											<FormItem className=' flex-1'>
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
															<SelectItem value={PriceType.Free}>
																Free
															</SelectItem>
															<SelectItem value={PriceType.Paid}>
																Paid
															</SelectItem>
															<SelectItem value={PriceType.Donation}>
																Donation
															</SelectItem>
															<SelectItem value={PriceType.Invite}>
																Invite Only
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
											<FormItem className=' flex-1'>
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
								</div>
								<FormFieldInput
									name='organizer'
									type='text'
									placeholder='Enter organizer name'
									title='Organizer'
								/>
								<FormFieldInput
									name='venue'
									type='text'
									placeholder='Enter venue'
									title='Venue'
								/>
								<FormFieldInput
									name='address'
									type='text'
									placeholder='Enter address'
									title='Address'
								/>
								<FormFieldInput
									name='city'
									type='text'
									placeholder='Enter city'
									title='City'
								/>
								<FormFieldInput
									name='country'
									type='text'
									placeholder='Enter country'
									title='Country'
								/>
								{togglePrice && (
									<FormFieldInput
										name='price'
										type='text'
										placeholder='e.g., 230'
										title='Price'
									/>
								)}

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
							<ImageUploadInput evtImg={event?.imageUrl} eventId={eventId} />
						)}
						{isImageUpload && (
							<button
								disabled={isSubmitting}
								type='submit'
								className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-200 transition'
							>
								{isSubmitting ? (
									<>
										{isEdit ? 'Editing' : 'Creating'}...{' '}
										<Loader2 className='inline-block animate-spin' />
									</>
								) : isEdit ? (
									'Edit Event'
								) : (
									'Create Event'
								)}
							</button>
						)}
					</form>
				</FormProvider>
			</section>
		</SectionWrapper>
	);
};

export default Create;
