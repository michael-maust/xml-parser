import React, { useEffect } from "react";
import TextField from './Textfield';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';

type TextFieldArrayProps = {
	fieldName: string;
	label: string;
	placeholder?: string;
}

function TextFieldArray({ fieldName, label, placeholder }: TextFieldArrayProps) {
	const { control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	const { value, onChange } = field


	const { fields, append, remove } = useFieldArray({
		control,
		name: fieldName,
	});

	const verifiedValue = (index: any) => value.length > 0 ? { ...value[index] } : ['']
	// console.log('field', field)

	const controlledFields = fields.map((fieldData, index) => {
		console.log('fieldData', fieldData)
		return {
			...fieldData,
			...verifiedValue(index),
		};
	});


	// const nonEmptyBonusArray = value.filter((item: string) => item !== "");

	console.log('controlledFields', controlledFields, 'value', value)

	return (
		<>
			<div className="flex gap-3 items-center mt-3">
				<label className="text-gray-300">{label}</label>

				<button
					type="button"
					className="cursor-pointer focus:outline-none focus:ring-orange-400 focus:ring-2 bg-green-700 px-2 py-px w-fit rounded-lg text-tan font-bold hover:bg-green-400"
					onClick={() => append("")}
				>
					+ Add
				</button>


			</div>
			{controlledFields.map((_, index) => {
				return (
					<TextField
						key={index}
						fieldName={`${fieldName}.${index}`}
						placeholder={`${placeholder} -- ${index}`}
					/>
				);
			})}
		</>
	);
}

export default TextFieldArray;
