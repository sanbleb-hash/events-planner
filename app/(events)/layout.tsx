import React from 'react';

const EventsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className=' pt-14 min-h-screen w-[90dvw] lg:w-[80dvw] bg-slate-50 mx-auto'>
			{children}
		</div>
	);
};

export default EventsLayout;
