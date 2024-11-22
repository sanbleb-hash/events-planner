export type Attendee = {
	id: number;
	name: string;
	profileUrl: string;
};

export type EventSchema = {
	id: number;
	title: string;
	date: string;
	time: string;
	organizer: string;
	priceType: string;
	category: string;
	venue: string;
	address: string;
	city: string;
	price?: string;
	country: string;
	description: string;
	imageUrl: string;
	attends: Attendee[];
};
