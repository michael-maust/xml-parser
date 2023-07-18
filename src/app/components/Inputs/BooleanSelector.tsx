
import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from '../General/Tabs';

type BooleanSelectorProps = {
	fieldName: string;
	label: string;
}


function BooleanSelector({ fieldName, label }: BooleanSelectorProps) {
	const { control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	const { value, onChange } = field

	console.log(value)

	return (
		<div className="flex flex-col gap-1 w-fit">
			<label className="text-gray-300 whitespace-nowrap">{label}</label>
			<Tabs value={value} onValueChange={(newValue) => {
				console.log('newValue', newValue)
				onChange(newValue)
			}} className="bg-gray-" defaultValue="false">
				<TabsList className="bg-gray-800">
					<TabsTrigger value={'true'}>
						True
					</TabsTrigger>
					<TabsTrigger value={'false'}>
						False
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
}

export default BooleanSelector;
