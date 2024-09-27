import React from 'react';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

type Props = {
	type: string;
};

const SearchBox = (props: Props) => {
	return (
		<form>
			<Input
				placeholder='search event or location...'
				style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
				className='outline-none focus:outline-none border-none focus:border-none bg-inherit focus:ring-0 focus:border-b focus:border-gray-600 text-slate-200 placeholder:text-slate-300 ring-0 shadow-none'
			/>
		</form>
	);
};

export default SearchBox;
