import React, { Dispatch } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { ActiveTemplate } from '../pages/TemplateGenerator';

type TemplateSelectorProps = {
	activeTemplate: ActiveTemplate
	setActiveTemplate: (value: ActiveTemplate) => void
}

function TemplateSelector({ activeTemplate, setActiveTemplate }: TemplateSelectorProps) {
	return (
		<Tabs value={activeTemplate} onValueChange={(value) => setActiveTemplate(value as ActiveTemplate)} className="h-fit" defaultValue="tab1">
			<TabsList className='flex flex-wrap h-fit gap-3'>
				<TabsTrigger value={ActiveTemplate.DialPattern}>
					{ActiveTemplate.DialPattern}
				</TabsTrigger>
				<TabsTrigger value={ActiveTemplate.IngressAdaptation}>
					{ActiveTemplate.IngressAdaptation}
				</TabsTrigger>
				<TabsTrigger value={ActiveTemplate.EgressAdaptation}>
					{ActiveTemplate.EgressAdaptation}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export default TemplateSelector;
