"use client"
import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import TemplateSelector from '../General/TemplateSelector';
import DialPatternForm from '../Forms/DialPatternForm';
import CodeBlock from '../General/CodeBlock';
import DialPatternTemplate from '../Templates/DialPatternOutput';
import { getDialPattern } from '@/app/constants/ExampleTemplates';

export enum ActiveTemplate {
	DialPattern = 'Dial Pattern',
	IngressAdaptation = 'Ingress Adaptation',
	EgressAdaptation = 'Egress Adaptation',
}

export function MainPage() {
	const [activeTemplate, setActiveTemplate] = useState<ActiveTemplate>(ActiveTemplate.DialPattern)
	const [value, setValue, remove] = useLocalStorage('dialPatternForm', {});

	console.log(value)

	return (
		<main className="flex min-h-screen flex-col gap-6 items-center py-4 px-8 bg-slate-700 overflow-y-auto">

			<header className="flex flex-row justify-center shadow-md gap-3 items-center bg-gray-800 w-fit py-2 rounded-md px-16">
				<p className="text-lg font-medium text-orange-300">
					XML Template Generator
				</p>
				<hr className='h-4 w-[2px] bg-gray-300 rounded-full border-none' />
				<TemplateSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
			</header>

			<div className="grid grid-cols-2 gap-3 flex-1 w-full">

				<section className="flex w-full gap-6 flex-col flex-1">
					<h1 className="text-xl font-medium text-orange-400">Template Data</h1>

					<DialPatternForm onSubmit={setValue} initialValues={value} />

					<h1 className="text-xl font-medium text-orange-400">Template Preview</h1>
					<div className="w-4/5">
						<CodeBlock code={getDialPattern({ ...value, digitPattern: undefined })} />
					</div>


				</section>
				<section className="flex flex-col gap-3 w-full h-fill ">

					<h1 className="text-xl font-medium text-orange-400">Output</h1>
					<DialPatternTemplate value={value} />
				</section>

			</div>
		</main>
	)
}
