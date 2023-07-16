import React from 'react'
import { DialPatternFormValues } from '../Forms/DialPatternForm';
import { getDialPattern } from '@/app/constants/ExampleTemplates';
import CodeBlock from '../General/CodeBlock';


type DialPatternTemplateProps = {
	value?: DialPatternFormValues
}

export default function DialPatternTemplate({ value }: DialPatternTemplateProps) {


	// map through each digit pattern call getDialPattern and return all results as a single string
	const dialPattern = value?.digitPattern?.map((pattern) => getDialPattern({ ...value, digitPattern: pattern })).join('\n')


	console.log(dialPattern)

	if (!dialPattern) return null

	return (
		<div className="w-4/5 max-h-[70vh] overflow-y-auto">
			<CodeBlock code={dialPattern} />
		</div>
	)
}
