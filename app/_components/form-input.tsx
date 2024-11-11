'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form'; // Import the correct form type
import { z } from 'zod';
import { searchSchema } from '@/types/searchSchema';

type Props = {
	type: 'event' | 'location'; // Define the accepted types
	placeholder: string;
	form: UseFormReturn<z.infer<typeof searchSchema>>; // Accept form as a prop
};

const SearchBox: React.FC<Props> = ({ type, form, placeholder }) => {
	return (
		<FormField
			control={form.control}
			name={type === 'event' ? 'searchTerm' : 'location'} // Conditionally use either 'searchTerm' or 'location'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Input
							{...field}
							placeholder={placeholder}
							type='text'
							className='outline-none focus:outline-none border-none focus:border-none bg-inherit focus:ring-0 focus:border-b focus:border-gray-600 text-slate-200 placeholder:text-slate-300 ring-0 shadow-none'
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};

export default SearchBox;
