'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowCircleLeft } from 'react-icons/md';

const BackButton = () => {
	const router = useRouter();
	return (
		<div onClick={() => router.back()}>
			<MdArrowCircleLeft />
		</div>
	);
};

export default BackButton;
