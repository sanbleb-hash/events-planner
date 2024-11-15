import React from 'react';

type Props = { children: React.ReactNode };

const SectionWrapper = ({ children }: Props) => {
	return (
		<section className=' flex flex-col p-5 min-h-[50dvh] w-full pt-20'>
			{children}
		</section>
	);
};

export default SectionWrapper;
