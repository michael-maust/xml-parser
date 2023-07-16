"use client"

import Image from 'next/image'
import CsvReader from './components/CsvParser'
import XmlParser from './components/XMLParser'
import { useState } from 'react'
import TemplateSelector from './components/General/TemplateSelector'
import DialPatternTemplate from './components/Templates/DialPatternTemplate'
import CodeBlock from './components/General/CodeBlock'
import { DIAL_PATTERN_Example } from './constants/ExampleTemplates'

export enum ActiveTemplate {
  DialPattern = 'Dial Pattern',
  IngressAdaptation = 'Ingress Adaptation',
  EgressAdaptation = 'Egress Adaptation',
}

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState<ActiveTemplate>(ActiveTemplate.DialPattern)

  console.log(activeTemplate)

  return (
    <main className="flex min-h-screen flex-col gap-6 items-center py-4 px-8 bg-slate-700">

      <header className="flex flex-row justify-center shadow-md gap-3 items-center bg-gray-800 w-fit py-2 rounded-md px-16">
        <p className="text-lg font-medium text-orange-300">
          XML Template Generator
        </p>
        <hr className='h-4 w-[2px] bg-gray-300 rounded-full border-none' />
        <TemplateSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
      </header>

      <section className="grid grid-cols-2 gap-3 flex-1 w-full">

        <div className="flex w-full justify-center flex-1">

          <CodeBlock code={DIAL_PATTERN_Example} />



        </div>
        <div className="flex w-full flex-1 justify-center">

          <DialPatternTemplate />
        </div>

      </section>
    </main>
  )
}
