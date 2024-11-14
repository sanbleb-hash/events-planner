import SectionWrapper from '@/app/_components/sectionWrapper';
import { Button } from '@/components/ui/button';
import { eventslist } from '@/libs/eventsList';
import Image from 'next/image';
import React from 'react';
import { MdShare } from 'react-icons/md';

type Props = { params: { id: string } };

const page = ({ params: { id } }: Props) => {
	const item = eventslist.find((x) => x.id === Number(id));
	const convertTimeToMinutes = (time: string) => {
		const timeHr = time.split(':')[0];

		if (Number(timeHr) >= 12) {
			return 'pm';
		} else {
			return 'am';
		}
	};

	return (
		<SectionWrapper>
			{item ? (
				<section className=' grid grid-cols-1 lg:grid-cols-3 gap-3 relative '>
					<article className=' col-span-3 lg:col-span-2 '>
						<h1 className=' text-start text-4xl lg:text-6xl capitalize text-gray-500 pb-5 '>
							{item.title}
						</h1>
						<figure className='w-full bg-slate-200 p-3 rounded-md overflow-hidden flex flex-col items-start justify-start'>
							<div className=' w-full overflow-hidden rounded-lg'>
								<Image
									src={item.imageUrl}
									alt='ivent image'
									height={250}
									width={360}
									className=' w-full object-cover'
								/>
							</div>

							<caption className=' w-full  rounded-lg flex flex-col items-start py-3'>
								<p className=' first-letter:capitalize text-lg'>
									organised by :{' '}
									<span className=' text-muted-foreground  pl-2'>
										{item.organizer}
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg'>
									happening on :
									<span className=' text-muted-foreground  pl-2'>
										{item.date} , {item.time} {convertTimeToMinutes(item.time)}
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg'>
									so far confirmed :{' '}
									<span className=' text-muted-foreground  pl-2'>
										{item.attends.length}attendees
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg'>
									venue :{' '}
									<span className=' text-muted-foreground  pl-2'>
										{item.venue}
									</span>
									,
									<span className=' text-muted-foreground  pl-2'>
										{item.city} ,{item.country}
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg'>
									Entrey :
									<span className=' text-muted-foreground  pl-2'>
										{item.priceType === 'Paid' ? item.price : item.priceType}
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg'>
									so far confirmed :{' '}
									<span className=' text-muted-foreground  pl-2'>
										{item.attends.length}attendees
									</span>
								</p>
								<p className=' first-letter:capitalize text-lg py-2 bg-slate-100 px-3 mt-4 rounded-md text-gray-500 text-start'>
									{item.description}
								</p>
								<div className=' flex items-center justify-end w-full  mt-10 gap-5'>
									{item.priceType !== 'Invite Only' && (
										<Button
											disabled={false}
											className=' hover:bg-rose-500
                      bg-red-400 disabled:bg-rose-200 text-white  '
										>
											book appointment
										</Button>
									)}

									<Button variant='ghost' className=' text-2xl '>
										<MdShare />
									</Button>
								</div>
							</caption>
						</figure>
					</article>
					<aside
						className=' hidden col-span-1 bg-slate-200 sticky top-0  lg:flex flex-col gap-3 justify-evenly
               '
					>
						<div className=' bg-slate-500 flex-1 rounded-md'>
							<h2>similar events in this area</h2>
						</div>
						<div className=' bg-slate-500 flex-1 rounded-md'>
							<h2>similar events</h2>
						</div>
						<div className=' bg-slate-500 flex-1 rounded-md'>
							<h2>similar events</h2>
						</div>
						<div className=' bg-slate-500 flex-1 rounded-md'>
							<h2>similar events</h2>
						</div>
					</aside>
				</section>
			) : (
				<p>no event found</p>
			)}
		</SectionWrapper>
	);
};

export default page;
