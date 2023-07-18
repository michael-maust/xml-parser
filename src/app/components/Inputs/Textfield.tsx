import React, { InputHTMLAttributes } from "react";
import { useFormContext, useController } from "react-hook-form";

type TextFieldProps = {
	fieldName: string;
	label?: string;
	handleRemove?: () => void;
} & InputHTMLAttributes<HTMLInputElement>


function TextField({ fieldName, label, handleRemove, ...props }: TextFieldProps) {
	const { register, control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	return (
		<div className="flex flex-col gap-1 w-full max-w-[320px]">
			<label className="text-gray-300">{label}</label>
			<div className="flex gap-3">
				<input
					{...register(fieldName, {
						required: true,
					})}
					className="py-2 px-2 placeholder-text-gray-400 text-gray-300 truncate bg-gray-800 focus:outline-none focus:ring-orange-400 focus:ring-2 rounded-lg w-full"
					{...props}
				/>
			</div>
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
}

export default TextField;
