import React from 'react';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className=' flex flex-col p-5 min-h-[50dvh] w-full'>
			{children}
		</section>
	);
};

export default SectionWrapper;
