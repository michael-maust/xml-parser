import React from 'react'
import { DialPatternFormValues } from '../Forms/DialPatternForm';

import CodeBlock from '../General/CodeBlock';
import { ActiveTemplate } from '../pages/TemplateGenerator';
import { getAdaptation, getDialPattern } from '@/app/utils/templates';
import { AdaptationFormValues } from '../Forms/AdaptationsForm';


type DialPatternTemplateProps = {
	formValues?: DialPatternFormValues | AdaptationFormValues
	digitPatterns: string[]
	activeTemplate: ActiveTemplate
}

export default function DialPatternTemplate({ formValues, digitPatterns, activeTemplate }: DialPatternTemplateProps) {


	const isDialPattern = activeTemplate === ActiveTemplate.DialPattern
	const isEgress = activeTemplate === ActiveTemplate.EgressAdaptation
	const isAdaptation = activeTemplate === ActiveTemplate.EgressAdaptation || activeTemplate === ActiveTemplate.IngressAdaptation


	function getPattern(digitPattern: string) {
		if (!formValues) return null
		if (isDialPattern) return getDialPattern(formValues, digitPattern)
		if (isAdaptation) return getAdaptation(formValues, isEgress, digitPattern)

	}

	const combinedPatterns = digitPatterns.map((pattern) => getPattern(pattern)).join('\n')


	console.log(combinedPatterns)

	if (!combinedPatterns) return <></>

	return (
		<div className="w-4/5 max-h-[70vh] overflow-y-auto">
			<CodeBlock code={combinedPatterns} />
		</div>
	)
}
