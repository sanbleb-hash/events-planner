import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';

type Props = {
	children?: React.ReactNode;
	placeholder?: string;
	type: string;
	title: string;
	name: string;
};

const FormFieldInput = ({ placeholder, type, name, title }: Props) => {
	return (
		<div className=' w-full'>
			<FormField
				name={name}
				render={({ field, fieldState }: { field: any; fieldState: any }) => (
					<FormItem>
						<FormLabel htmlFor={name}>{title}</FormLabel>
						<FormControl>
							<Input {...field} type={type} placeholder={placeholder} />
						</FormControl>
						<FormMessage>{fieldState.error?.message}</FormMessage>
					</FormItem>
				)}
			/>
		</div>
	);
};

export default FormFieldInput;
