import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../General/Select'
import { useController, useFormContext } from 'react-hook-form';


type FormSelectProps = {
	fieldName: string;
	label?: string;
	options: string[];
	placeholder: string
}

export default function FormSelect({ fieldName, label, options, placeholder }: FormSelectProps) {
	const { control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	const { value, onChange } = field


	return (
		<div className="flex flex-col gap-1 w-full max-w-[320px]">
			<label className="text-gray-300 whitespace-nowrap">{label}</label>

			<Select value={value} onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue className='text-gray-300' placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

		</div>
	)
}
