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
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';

import ImageUploadInput from '@/app/_components/imageUpload/imageUploadInput';
import { getEventById } from '@/actions/getEventById';
import { editEvent } from '@/actions/editEvent';

import Loading from '@/app/_components/loading/loading';
import { Button } from '@/components/ui/button';

enum PriceType {
	Free = 'Free',
	Paid = 'Paid',
	Donation = 'Donation',
	Invite = 'Invite Only',
}

const Edit: React.FC = () => {
	const { user: currentUser } = useAuth();
	const [event, setEvent] = useState<DocumentData | undefined>(undefined);
	const [pageLoading, setPageLoading] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [isImageUpload, setIsImageUpload] = useState(true);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const searchParams = useSearchParams();
	const [imgUrl, setImgUrl] = useState('');
	const imageUrl = searchParams.get('imgUrl');
	const cachedImg = localStorage.getItem('poster');
	const step: string | null = searchParams.get('step');
	const { id: eventId }: { id: string } = useParams();

	useEffect(() => {
		const fetchEvent = async () => {
			if (!eventId) return;

			try {
				const fetchedEvent = await getEventById(eventId);
				setEvent(fetchedEvent);
				form.reset({
					title: fetchedEvent?.title || '',
					date: fetchedEvent?.date || '',
					time: fetchedEvent?.time || '',
					organizer: fetchedEvent?.organizer || '',
					priceType: fetchedEvent?.priceType || PriceType.Free,
					category: fetchedEvent?.category || CategoryEnum.Art,
					venue: fetchedEvent?.venue || '',
					address: fetchedEvent?.address || '',
					city: fetchedEvent?.city || '',
					price: fetchedEvent?.price || '',
					country: fetchedEvent?.country || '',
					description: fetchedEvent?.description || '',
					attendants: fetchedEvent?.attendants || [],
					imageUrl: fetchedEvent?.imageUrl || '',
				});
				localStorage.setItem('poster', fetchedEvent?.imageUrl);
			} catch (error) {
				toast.error('Failed to fetch event data');
			} finally {
				setFetchLoading(false);
			}
		};

		fetchEvent();
	}, [eventId]);

	if (fetchLoading) {
		return <Loading />;
	}
	useEffect(() => {
		if (cachedImg) setImgUrl(cachedImg);
	}, []);

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
		attendants: [],
		imageUrl: imgUrl || '',
	};

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
			if (eventId) {
				await editEvent(data, eventId);
				toast.success('Event updated successfully');
				router.push(`/events/$${eventId}`);
			}
		} catch (error) {
			toast.error('Error submitting event, please try again');
		} finally {
			setIsSubmitting(false);
			localStorage.removeItem('poster');
		}
	};

	// Watch the value of priceType
	const priceType = useWatch({
		control: form.control,
		name: 'priceType',
	});
	useEffect(() => {
		if (imageUrl && step === 'info') setIsImageUpload(false);
	}, [imageUrl, step]);

	const onCancel = () => {
		setPageLoading(true);
		form.reset(initialState);
		setTimeout(() => {
			router.push(`/events/${eventId}`);
			setPageLoading(false);
		}, 2000);
	};

	// Determine if the price input should be shown
	const togglePrice = priceType === PriceType.Paid;
	if (fetchLoading || pageLoading) {
		<p>loading ...</p>;
	}

	return (
		<SectionWrapper>
			<h1 className='text-center text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
				Edit your Event
			</h1>
			<p className='first-letter:capitalize text-lg lg:text-xl text-muted-foreground text-center py-6'>
				{!isImageUpload
					? 'Fill the following form with your event details to get people to the event'
					: 'Choose an image to make a poster'}
			</p>
			<div className=' py-5 flex items-center justify-center'>
				{imgUrl && (
					<Image
						src={imgUrl}
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
						{!isImageUpload ? (
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
							<ImageUploadInput
								evtImg={event?.imageUrl}
								eventId={eventId}
								uploadType='edit'
							/>
						)}
						<div className=' w-full flex gap-5 flex-col md:flex-row'>
							{!isImageUpload && (
								<button
									className='flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg
								font-semibold hover:bg-blue-600 disabled:bg-blue-200 transition'
									type='submit'
								>
									{isSubmitting ? (
										<>
											Editing...{' '}
											<Loader2 className='inline-block animate-spin' />
										</>
									) : (
										'edit'
									)}
								</button>
							)}
							<Button
								onClick={onCancel}
								type='button'
								variant='outline'
								className=' '
							>
								cancel
							</Button>
						</div>
					</form>
				</FormProvider>
			</section>
		</SectionWrapper>
	);
};

export default Edit;
