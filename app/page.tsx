import React from 'react';
import Header from './_components/header';

const Home = () => {
	return (
		<div className=' min-h-screen w-[90dvw] lg:w-[80dvw]  bg-slate-50 mx-auto'>
			<header className=' mt-[9rem] lg:mt-[6rem]'>
				<Header />
			</header>
		</div>
	);
};

export default Home;
