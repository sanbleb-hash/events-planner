import { Card, CardHeader } from './card';
import { Skeleton } from './skeleton';

type Props = {
	type?: 'events' | 'event';
};

const EventLoader = () => (
	<div className=' w-full min-h-[80vh] flex items-center flex-col gap-3'>
		<div className=' w-full flex gap-2 h-4'>
			<Skeleton className=' w-10 ' />
			<Skeleton className=' flex-1' />
			<Skeleton className=' w-10 ' />
		</div>

		<Skeleton className=' w-full h-40  ' />

		<div className=' w-full flex flex-col gap-2 h-4'>
			<Skeleton className=' w-10 ' />
			<Skeleton className=' flex-1' />
			<Skeleton className=' w-10 ' />
		</div>
	</div>
);

export function SkeletonLoader({ type = 'events' }: Props) {
	return (
		<>
			{type !== 'event' ? (
				<div className=' w-full flex items-center space-x-4'>
					<Skeleton className='h-12 w-12 rounded-full' />
					<Card className='space-y-2'>
						<Skeleton className='h-[250px] w-[250px]'>
							<CardHeader></CardHeader>
						</Skeleton>
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[200px]' />
					</Card>
				</div>
			) : (
				<EventLoader />
			)}
		</>
	);
}
