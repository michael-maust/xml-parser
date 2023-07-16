import React, { InputHTMLAttributes } from "react";
import { useFormContext, useController } from "react-hook-form";

type TextFieldProps = {
	fieldName: string;
	label: string;
} & InputHTMLAttributes<HTMLInputElement>


function TextField({ fieldName, label, ...props }: TextFieldProps) {
	const { register, control } = useFormContext();

	const {
		fieldState: { error },
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	return (
		<div className="flex flex-col">
			<label className="text-tan pb-.5">{label}</label>
			<input
				className="py-1 px-2 truncate bg-lightblue focus:outline-none focus:ring-primary-400 focus:ring-2 rounded-lg w-full"
				{...register(fieldName, {
					required: true,
				})}
				{...props}
			/>
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
}

export default TextField;
