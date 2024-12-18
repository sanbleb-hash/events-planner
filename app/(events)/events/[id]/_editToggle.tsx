'use client';

import BookingPopover from '@/app/_components/popOver/bookingPopOver';
import { Dialog } from '@/components/ui/dialog';
import { auth, db } from '@/db/firebase';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@radix-ui/react-tooltip';

import { Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

type Props = {
	creatorId: string;
};

const EditToggle: React.FC<Props> = ({ creatorId }) => {
	const router = useRouter();
	const currentUser = auth.currentUser;
	const { id } = useParams();

	// Handle Edit Event
	const handleEdit = () => {
		if (id) {
			router.push(`/create-event?eventId=${id}`);
		}
	};

	// Handle Delete Event
	// const handleDelete = async () => {
	// 	if (!id) return;
	// 	try {
	// 		await deleteDoc(doc(db, 'events', id));
	// 		toast.success('Event successfully deleted.');
	// 		router.push('/events');
	// 	} catch (error) {
	// 		toast.error('Error deleting event. Please try again.');
	// 	}
	// };

	return (
		creatorId === currentUser?.uid && (
			<div className='flex items-center gap-3 text-muted-foreground py-5'>
				{/* Edit Event Button */}
				<ToolTip tip='Edit this event'>
					<Edit
						className='cursor-pointer hover:scale-110 transition-all'
						onClick={handleEdit}
					/>
				</ToolTip>

				{/* Delete Event Button */}
				<ToolTip tip=' delete this posting'>
					<Dialog>
						<DialogTrigger>
							<MdDelete className='text-red-300 cursor-pointer hover:scale-110 transition-all text-2xl' />
						</DialogTrigger>
						<DialogContent>
							<BookingPopover
								type='delete'
								title='Once deleted, it is gone. Are you sure you want to delete?'
							/>
						</DialogContent>
					</Dialog>
				</ToolTip>
			</div>
		)
	);
};

export default EditToggle;

const ToolTip: React.FC<{ children: React.ReactNode; tip: string }> = ({
	children,
	tip,
}) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger className='hover:border hover:border-gray-400'>
				{children}
			</TooltipTrigger>
			<TooltipContent>
				<p className='text-xs text-muted-foreground'>{tip}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);
