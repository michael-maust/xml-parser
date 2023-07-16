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
  deny: z.string().optional(),
  digitPattern: z.string().array().optional(),
  emergencyOrder: z.string().optional(),
  maxDigits: z.string().optional(),
  minDigits: z.string().optional(),
  routingPolicyNames: z.string().optional(), // Change this to be an array of strings
  treatAsEmergency: z.string().optional(),
})

export type DialPatternFormValues = z.infer<typeof DialPatternSchema>




type DialPatternFormProps = {
  initialValues?: DialPatternFormValues
  onSubmit: (data: DialPatternFormValues) => void
}

export default function DialPatternForm({ initialValues, onSubmit }: DialPatternFormProps) {

  const defaultValues = {
    notes: initialValues?.notes ?? '',
    deny: initialValues?.deny ?? 'false',
    digitPattern: initialValues?.digitPattern ?? [],
    emergencyOrder: initialValues?.emergencyOrder ?? '1',
    maxDigits: initialValues?.maxDigits ?? '',
    minDigits: initialValues?.minDigits ?? '',
    routingPolicyNames: initialValues?.routingPolicyNames ?? '',
    treatAsEmergency: initialValues?.treatAsEmergency ?? 'false',
  } satisfies DialPatternFormValues



  const methods = useForm<DialPatternFormValues>({
    defaultValues,
    resolver: zodResolver(DialPatternSchema),
    mode: 'onChange',
  })

  const { handleSubmit, formState: { errors } } = methods

  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3 w-full'>



        <TextField fieldName='notes' tw='flex-1' label='Notes' placeholder='Enter note or leave empty' />
        <BooleanSelector fieldName='deny' label='Deny' />

        <CsvUploader fieldName='digitPattern' label='Digit Pattern(s)' />

        <TextField fieldName='emergencyOrder' label='Emergency Order' placeholder='Enter Emergency Order or leave empty' />
        <TextField fieldName='maxDigits' label='Max Digits' placeholder='Enter Max Digits or leave empty' />


        <TextField fieldName='minDigits' label='Min Digits' placeholder='Enter Min Digits or leave empty' />

        <TextField fieldName='routingPolicyNames' label='Routing Policy Names' placeholder='Enter Routing Policy Names or leave empty' />

        <BooleanSelector fieldName='treatAsEmergency' label='Treat As Emergency' />


        <button className="bg-blue-500 px-3 py-2 font-medium w-fit rounded-md hover:bg-blue-600" type='submit'>Update Template</button>
      </form>



    </FormProvider>
  )
}
