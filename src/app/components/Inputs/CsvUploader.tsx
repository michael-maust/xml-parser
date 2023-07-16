import React, { useState } from 'react'
import { useFormContext, useController } from "react-hook-form";


type BadgeProps = {
	count: number
}

function Badge() {
	return <div className=""></div>
}


type CsvUploaderProps = {
	fieldName: string;
	label: string;
}

export default function CsvUploader({ fieldName, label }: CsvUploaderProps) {

	const { control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	const { value, onChange } = field



	const handleFile = (file: File) => {
		const reader = new FileReader();

		reader.onload = function (event) {
			const text = event.target?.result;
			if (typeof text !== 'string') return
			const numbers = text.split('\n').map((number) => number.replace('\r', ''));
			onChange(numbers)
		}

		if (file === undefined) return
		reader.readAsText(file);
	}



	return (
		<div className="flex flex-col gap-1 w-full">
			<label className="text-gray-300">{label}</ label>
			<input
				className='h-fit file:bg-gray-800 file:cursor-pointer file:hover:bg-gray-900 file:text-gray-300 file:py-2 file:px-3 file:rounded-md file:focus:ring-orange-400 file:border-none file:mr-2 text-gray-300'
				type='file'
				accept='.csv'
				id='csvFile'
				onChange={(event) => {
					if (event.target.files === null) return
					handleFile(event.target.files[0])
				}}
			/>
		</div>

	)
}
