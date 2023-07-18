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
import { TextFieldArray } from '../Inputs/TextFieldArray';

export enum ActiveTemplate {
	DialPattern = 'Dial Pattern',
	IngressAdaptation = 'Ingress Adaptation',
	EgressAdaptation = 'Egress Adaptation',
}

export function TemplateGenerator() {
	const [activeTemplate, setActiveTemplate] = useState<ActiveTemplate>(ActiveTemplate.DialPattern)

	const [digitPatterns, setDigitPatterns, removeDigitPatterns] = useLocalStorage<string[]>('digitPatterns', []);
	const [dialPatternForm, setDialPatternForm, removeDialPatternForm] = useLocalStorage<DialPatternFormValues>('dialPatternForm', emptyDialPatternValues);
	const [adaptationForm, setAdaptationForm, removeAdaptationsForm] = useLocalStorage<AdaptationFormValues>('adaptationForm', emptyAdaptationValues);

	const isDialPattern = activeTemplate === ActiveTemplate.DialPattern
	const isEgress = activeTemplate === ActiveTemplate.EgressAdaptation

	const outputFormValues = isDialPattern ? dialPatternForm : adaptationForm


	return (
		<main className="flex min-h-screen flex-col gap-8 items-center py-4 px-8 bg-slate-700 overflow-y-auto">

			<header className="flex flex-col md:flex-row justify-center shadow-md gap-3 items-center bg-gray-800 w-fit py-2 rounded-md px-8">
				<div className='flex flex-col md:flex-row gap-3 items-center h-fit'>
					<p className="text-lg font-medium text-orange-400">
						XML Template Generator
					</p>
					<hr className='h-6 w-[2px] bg-gray-500 rounded-full border-none hidden md:block' />
					<TemplateSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
				</div>
			</header>

			<div className="grid xl:grid-cols-2 gap-6 lg:gap-3 flex-1 w-full">

				<section className="flex w-full gap-6 flex-col flex-1">
					<div className="flex flex-col">
						<h1 className="text-xl font-medium text-orange-400">Upload Digit Patterns</h1>
						<p className="mb-3 text-gray-300">CSV file should contain a single column of digit patterns only</p>
						<CsvUploader onChange={(values) => setDigitPatterns(values)} />
					</div>

					<h1 className="text-xl font-medium text-orange-400">{activeTemplate} Data</h1>
					{isDialPattern && <DialPatternForm onSubmit={setDialPatternForm} initialValues={dialPatternForm} />}
					{!isDialPattern && <AdaptationForm onSubmit={setAdaptationForm} initialValues={adaptationForm} />}

					<h1 className="text-xl font-medium text-orange-400">Template Preview</h1>
					<div className="pr-16">
						{isDialPattern && dialPatternForm && <CodeBlock code={getDialPattern(dialPatternForm)} />}
						{!isDialPattern && adaptationForm && <CodeBlock code={getAdaptation(adaptationForm, isEgress)} />}
					</div>


				</section>
				<section className="flex flex-col gap-3 w-full h-fill ">

					<h1 className="text-xl font-medium text-orange-400">Generated Pattern</h1>
					<DialPatternTemplate formValues={outputFormValues} digitPatterns={digitPatterns ?? []} activeTemplate={activeTemplate} />
					{digitPatterns?.length === 0 && <p className="mb-3 text-gray-300">Upload a CSV file of digit patterns to generate template</p>}
				</section>

			</div>
		</main >
	)
}
