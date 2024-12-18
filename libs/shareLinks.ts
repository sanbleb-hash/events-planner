import { FaEnvelope, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { IoMdCopy } from 'react-icons/io';
import { MdFacebook } from 'react-icons/md';

export const socialShareLinks = [
	{
		name: 'Facebook',
		icon: MdFacebook, // Font Awesome icon class
		url: 'https://www.facebook.com/sharer/sharer.php?u=',
	},
	{
		name: 'Twitter',
		icon: FaX,
		url: 'https://twitter.com/intent/tweet?url=',
	},
	{
		name: 'LinkedIn',
		icon: FaLinkedinIn,
		url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
	},
	{
		name: 'WhatsApp',
		icon: FaWhatsapp,
		url: 'https://api.whatsapp.com/send?text=',
	},
	{
		name: 'Email',
		icon: FaEnvelope,
		url: 'mailto:?subject=Check%20this%20out!&body=',
	},
	{
		name: 'copy link',
		icon: IoMdCopy,
		url: '',
	},
];
