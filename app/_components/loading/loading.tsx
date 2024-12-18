import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
	return (
		<span className=' pl-3'>
			<Loader2 className=' animate-spin text-lg text-rose-300' />
		</span>
	);
};

export default Loading;
