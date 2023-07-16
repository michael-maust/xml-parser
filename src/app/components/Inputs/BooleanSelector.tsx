
import React, { InputHTMLAttributes } from "react";
import { useFormContext, useController } from "react-hook-form";
import { Switch } from '../General/Switch';
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

	return (
		<div className="flex flex-col gap-1 w-fit">
			<label className="text-gray-300 whitespace-nowrap">{label}</label>
			<Tabs value={value === true ? 'true' : 'false'} onValueChange={(value) => onChange(value === 'true')} className="bg-gray-" defaultValue="true">
				<TabsList className="bg-gray-800" aria-label="Manage your account">
					<TabsTrigger className="data-[state=active]:text-white" value='true'>
						True
					</TabsTrigger>
					<TabsTrigger className="data-[state=active]:text-white" value='false'>
						False
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
}

export default BooleanSelector;
