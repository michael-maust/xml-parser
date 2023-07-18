"use client"
import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import TemplateSelector from '../General/TemplateSelector';
import DialPatternForm, { DialPatternFormValues, emptyDialPatternValues } from '../Forms/DialPatternForm';
import CodeBlock from '../General/CodeBlock';
import DialPatternTemplate from '../Templates/DialPatternOutput';
import AdaptationForm, { AdaptationFormValues, emptyAdaptationValues } from '../Forms/AdaptationsForm';
import CsvUploader from '../Inputs/CsvUploader';
import { getAdaptation, getDialPattern } from '@/app/utils/templates';

export enum ActiveTemplate {
	DialPattern = 'Dial Pattern',
	IngressAdaptation = 'Ingress Adaptation',
	EgressAdaptation = 'Egress Adaptation',
}

export function TemplateGenerator() {
	const [activeTemplate, setActiveTemplate] = useState<ActiveTemplate>(ActiveTemplate.DialPattern)
	const [fileName, setFileName] = useState<string>('')

	const [digitPatterns, setDigitPatterns, removeDigitPatterns] = useLocalStorage<string[]>('digitPatterns', []);
	const [dialPatternForm, setDialPatternForm, removeDialPatternForm] = useLocalStorage<DialPatternFormValues>('dialPatternForm', emptyDialPatternValues);
	const [adaptationForm, setAdaptationForm, removeAdaptationsForm] = useLocalStorage<AdaptationFormValues>('adaptationForm', emptyAdaptationValues);

	const isDialPattern = activeTemplate === ActiveTemplate.DialPattern
	const isEgress = activeTemplate === ActiveTemplate.EgressAdaptation

	const outputFormValues = isDialPattern ? dialPatternForm : adaptationForm

	function handleReset() {
		removeDigitPatterns()
		removeDialPatternForm()
		removeAdaptationsForm()
	}

	return (
		<main className="flex min-h-screen flex-col gap-6 items-center py-4 px-8 bg-slate-700 overflow-y-auto">

			<header className="flex flex-row justify-between shadow-md gap-3 items-center bg-gray-800 w-3/4 py-2 rounded-md px-4">
				<div className='flex gap-3 items-center'>
					<p className="text-lg font-medium text-orange-300">
						XML Template Generator
					</p>
					<hr className='h-4 w-[2px] bg-gray-300 rounded-full border-none' />
					<TemplateSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
				</div>
				<button onClick={handleReset} className="px-3 py-1 bg-red-600 hover:bg-red-700 font-semibold rounded-md">Clear Data</button>
			</header>

			<div className="grid grid-cols-2 gap-3 flex-1 w-full">

				<section className="flex w-full gap-6 flex-col flex-1">
					<h1 className="text-xl font-medium text-orange-400">Upload Digit Patterns</h1>
					<CsvUploader onChange={(values) => setDigitPatterns(values)} />


					<h1 className="text-xl font-medium text-orange-400">Template Data</h1>

					{isDialPattern && <DialPatternForm onSubmit={setDialPatternForm} initialValues={dialPatternForm} />}
					{!isDialPattern && <AdaptationForm onSubmit={setAdaptationForm} initialValues={adaptationForm} />}

					<h1 className="text-xl font-medium text-orange-400">Template Preview</h1>
					<div className="w-4/5">
						{isDialPattern && dialPatternForm && <CodeBlock code={getDialPattern(dialPatternForm)} />}
						{!isDialPattern && adaptationForm && <CodeBlock code={getAdaptation(adaptationForm, isEgress)} />}
					</div>


				</section>
				<section className="flex flex-col gap-3 w-full h-fill ">

					<h1 className="text-xl font-medium text-orange-400">Output</h1>
					<DialPatternTemplate formValues={outputFormValues} digitPatterns={digitPatterns ?? []} activeTemplate={activeTemplate} />
				</section>

			</div>
		</main>
	)
}
