import React, { useState, ChangeEvent, KeyboardEvent, InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type TagInputProps = {
	fieldName: string;
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>

export function TextFieldArray({ fieldName, label, ...props }: TagInputProps) {
	const [inputValue, setInputValue] = useState<string>('');

	const { control } = useFormContext();

	const {
		fieldState: { error }, field
	} = useController({
		name: fieldName,
		control,
		rules: { required: true },
	});

	const { value, onChange } = field

	const tags = value as string[]



	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	function addTag() {
		if (inputValue.trim() !== '') {
			onChange([...tags, inputValue.trim()]);
			setInputValue('');
		}
	}

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag()
		}
	};

	const removeTag = (tag: string) => {
		onChange(tags.filter((t) => t !== tag));
	};

	return (

		<div className='flex gap-1 flex-col'>
			<label className="text-gray-300">{label}</label>
			<div className="relative max-w-[320px]">
				<input
					type="text"
					className='py-2 pl-2 pr-24 placeholder-text-gray-400 text-gray-300 truncate bg-gray-800 focus:outline-none focus:ring-orange-400 focus:ring-2 rounded-lg w-full'
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					{...props}
				/>
				<div className='absolute top-0 right-2 h-10 text-center flex items-center align-middle my-auto'>
					<button onClick={addTag} className="py-[2px] px-2 bg-gray-700 hover:bg-slate-600 rounded-md">+ Add</button>


				</div>
			</div>
			{tags.length > 0 && <div className='flex gap-3 mt-1 flex-wrap'>
				{tags.map((tag, index) => (
					<button className='bg-gray-600 group hover:bg-red-800 flex gap-2 px-2 py-1 rounded-md items-center' key={index} onClick={() => removeTag(tag)}>

						<p className="">	{tag}</p>

						<span className='font-bold group-hover:text-red-400 leading-none pb-[2px]'>x</span>
					</button>
				))}
			</div>}
			<p className="text-red-600 pt-px">{error?.message}</p>
		</div>
	);
};
