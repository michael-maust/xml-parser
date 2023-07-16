import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import TextField from '../Inputs/Textfield'
import Toggle from '../Inputs/Toggle'
import BooleanSelector from '../Inputs/BooleanSelector'
import TextFieldArray from '../Inputs/TextFieldArray'
import CsvUploader from '../Inputs/CsvUploader'

const DialPatternSchema = z.object({
  notes: z.string().optional(),
  deny: z.boolean().optional(),
  digitPattern: z.string().array().optional(),
  emergencyOrder: z.string().optional(),
  maxDigits: z.string().optional(),
  minDigits: z.string().optional(),
  routingPolicyNames: z.string().optional(), // Change this to be an array of strings
  treatAsEmergency: z.boolean().optional(),
})

type DialPatternFormValues = z.infer<typeof DialPatternSchema>

const defaultValues = {
  notes: '',
  deny: false,
  digitPattern: [],
  emergencyOrder: '1',
  maxDigits: '',
  minDigits: '',
  routingPolicyNames: '',
  treatAsEmergency: false,
} satisfies DialPatternFormValues


export default function DialPatternForm() {

  const methods = useForm<DialPatternFormValues>({
    defaultValues,
    resolver: zodResolver(DialPatternSchema),
  })

  const { handleSubmit, formState: { errors } } = methods

  function onSubmit(data: DialPatternFormValues) {
    console.log(data)
  }

  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-full'>

        <section className="flex gap-3 w-full">

          <TextField fieldName='notes' tw='flex-1' label='Notes' placeholder='Enter note or leave empty' />
          <BooleanSelector fieldName='deny' label='Deny' />

        </section>
        <section className="flex gap-3 w-full">
          <CsvUploader fieldName='digitPattern' label='Digit Pattern(s)' />

          <TextField fieldName='emergencyOrder' label='Emergency Order' placeholder='Enter Emergency Order or leave empty' />
          <TextField fieldName='maxDigits' label='Max Digits' placeholder='Enter Max Digits or leave empty' />
        </section>

        <section className="flex gap-3 w-full">

          <TextField fieldName='minDigits' label='Min Digits' placeholder='Enter Min Digits or leave empty' />

          <TextField fieldName='routingPolicyNames' label='Routing Policy Names' placeholder='Enter Routing Policy Names or leave empty' />

          <BooleanSelector fieldName='treatAsEmergency' label='Treat As Emergency' />
        </section>

        <button className="" type='submit'>Save Template</button>
      </form>



    </FormProvider>
  )
}
