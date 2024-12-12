'use client';

import { auth, db } from '@/db/firebase';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { deleteDoc, doc } from 'firebase/firestore';
import { Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

type Props = {
	creatorId: string;
};

type TooltipProps = {
	children: React.ReactNode;
	tip: string;
};

const EditToggle: React.FC<Props> = ({ creatorId }) => {
	const router = useRouter();
	const currentUser = auth.currentUser;
	const { id }: { id: string } = useParams();

	const handleEdit = () => {
		if (id) {
			router.push(`/create-event?eventId=${id}`);
		}
	};

	const handleDelete = async (id: string) => {
		if (creatorId !== currentUser?.uid) return;

		const confirmDelete = window.confirm(
			'Are you sure you want to delete this event?'
		);
		if (!confirmDelete) return;

		try {
			// Ensure 'id' is passed and used correctly
			const eventToDeleteRef = doc(db, 'posts', id);
			await deleteDoc(eventToDeleteRef);
			toast.success('Event deleted successfully!');
		} catch (error) {
			console.error('Error deleting event:', error);
			toast.error('Failed to delete the event. Please try again.');
		}
	};

	return (
		<>
			{creatorId === currentUser?.uid && (
				<div className='flex items-center gap-3 text-muted-foreground py-5'>
					<ToolTip tip='Edit this event'>
						<Edit
							className='cursor-pointer hover:scale-110 transition-all'
							onClick={handleEdit}
						/>
					</ToolTip>
					<ToolTip tip='Delete this event'>
						<MdDelete
							className='text-red-300 cursor-pointer hover:scale-110 transition-all text-2xl'
							onClick={() => handleDelete(id)}
						/>
					</ToolTip>
				</div>
			)}
		</>
	);
};

export default EditToggle;

const ToolTip: React.FC<TooltipProps> = ({ children, tip }) => {
	return (
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
};
