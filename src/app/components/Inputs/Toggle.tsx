
import React, { InputHTMLAttributes } from "react";
import { useFormContext, useController } from "react-hook-form";
import { Switch } from '../General/Switch';

type ToggleProps = {
	fieldName: string;
	label: string;
}


function Toggle({ fieldName, label }: ToggleProps) {
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
		<div className="flex flex-col gap-1">
			<div className="flex gap-3">
				<label className="text-gray-300">{label}</label>
				<Switch value={value} onChange={onChange} />
			</div>
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
}

export default Toggle;
