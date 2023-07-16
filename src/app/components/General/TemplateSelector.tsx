import React, { Dispatch } from 'react';
import { ActiveTemplate } from '@/app/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

type TemplateSelectorProps = {
	activeTemplate: ActiveTemplate
	setActiveTemplate: (value: ActiveTemplate) => void
}

function TemplateSelector({ activeTemplate, setActiveTemplate }: TemplateSelectorProps) {
	return (
		<Tabs value={activeTemplate} onValueChange={(value) => setActiveTemplate(value as ActiveTemplate)} className="TabsRoot" defaultValue="tab1">
			<TabsList className="TabsList" aria-label="Manage your account">
				<TabsTrigger className="" value={ActiveTemplate.DialPattern}>
					{ActiveTemplate.DialPattern}
				</TabsTrigger>
				<TabsTrigger className="" value={ActiveTemplate.IngressAdaptation}>
					{ActiveTemplate.IngressAdaptation}
				</TabsTrigger>
				<TabsTrigger className="" value={ActiveTemplate.EgressAdaptation}>
					{ActiveTemplate.EgressAdaptation}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export default TemplateSelector;
