import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import TextField from '../Inputs/Textfield'
import BooleanSelector from '../Inputs/BooleanSelector'
import { TextFieldArray } from '../Inputs/TextFieldArray'


const DialPatternSchema = z.object({
  notes: z.string().optional(),
  deny: z.string().optional(),
  emergencyOrder: z.string().optional(),
  maxDigits: z.string().optional(),
  minDigits: z.string().optional(),
  routingPolicyNames: z.string().array().optional(), // Change this to be an array of strings
  treatAsEmergency: z.string().optional(),
})

export type DialPatternFormValues = z.infer<typeof DialPatternSchema>


export const emptyDialPatternValues = {
  notes: '',
  deny: 'false',
  emergencyOrder: '',
  maxDigits: '0',
  minDigits: '0',
  routingPolicyNames: [],
  treatAsEmergency: 'false',
}



type DialPatternFormProps = {
  initialValues?: DialPatternFormValues
  onSubmit: (data: DialPatternFormValues) => void
}

export default function DialPatternForm({ initialValues, onSubmit }: DialPatternFormProps) {

  const defaultValues = {
    notes: initialValues?.notes ?? '',
    deny: initialValues?.deny ?? 'false',
    emergencyOrder: initialValues?.emergencyOrder ?? '1',
    maxDigits: initialValues?.maxDigits ?? '0',
    minDigits: initialValues?.minDigits ?? '0',
    routingPolicyNames: initialValues?.routingPolicyNames ?? [],
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
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6'>

        <div className="grid md:grid-cols-2 gap-3">
          <TextField fieldName='notes' tw='flex-1' label='Notes' placeholder='Enter note' />
          <BooleanSelector fieldName='deny' label='Deny' />
          <TextField fieldName='emergencyOrder' label='Emergency Order' placeholder='Enter Emergency Order' />
          <TextField fieldName='maxDigits' max={36} min={0} type='number' label='Max Digits' placeholder='Enter Max Digits' />
          <TextField fieldName='minDigits' max={36} min={0} type='number' label='Min Digits' placeholder='Enter Min Digits' />
          <TextFieldArray fieldName='routingPolicyNames' label='Routing Policy Names' placeholder='Enter Routing Policy Names' />
          <BooleanSelector fieldName='treatAsEmergency' label='Treat As Emergency' />
        </div>

        <button className="bg-blue-500 px-3 py-2 font-medium w-fit rounded-md hover:bg-blue-600" type='submit'>Update Template</button>
      </form>



    </FormProvider>
  )
}
