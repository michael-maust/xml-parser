import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import TextField from '../Inputs/Textfield'

const AdaptationSchema = z.object({
  notes: z.string().optional(),
  deletedDigits: z.string().optional(),
  insertedDigits: z.string().optional(),
  maxDigits: z.string().optional(),
  minDigits: z.string().optional(),
  phoneContext: z.string().optional(),
  addressToModify: z.string().optional(),
})

export type AdaptationFormValues = z.infer<typeof AdaptationSchema>

type AdaptationFormProps = {
  initialValues?: AdaptationFormValues
  onSubmit: (data: AdaptationFormValues) => void
}

export const emptyAdaptationValues = {
  notes: '',
  deletedDigits: '',
  insertedDigits: '',
  maxDigits: '',
  minDigits: '',
  phoneContext: '',
  addressToModify: '',
}


export default function AdaptationForm({ initialValues, onSubmit }: AdaptationFormProps) {

  const defaultValues = {
    notes: initialValues?.notes ?? '',
    deletedDigits: initialValues?.deletedDigits ?? '',
    insertedDigits: initialValues?.insertedDigits ?? '',
    maxDigits: initialValues?.maxDigits ?? '',
    minDigits: initialValues?.minDigits ?? '',
    phoneContext: initialValues?.phoneContext ?? '',
    addressToModify: initialValues?.addressToModify ?? '',
  } satisfies AdaptationFormValues

  const methods = useForm<AdaptationFormValues>({
    defaultValues,
    resolver: zodResolver(AdaptationSchema),
    mode: 'onChange',
  })

  const { handleSubmit, formState: { errors } } = methods

  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3 w-full'>

        <TextField fieldName='notes' tw='flex-1' label='Notes' placeholder='Enter notes' />
        <TextField fieldName='deletedDigits' label='Deleted Digits' placeholder='Enter Emergency Order' />
        <TextField fieldName='insertedDigits' label='Inserted Digits' placeholder='Enter Emergency Order' />
        <TextField fieldName='maxDigits' label='Max Digits' placeholder='Enter Emergency Order' />
        <TextField fieldName='minDigits' label='Min Digits' placeholder='Enter Emergency Order' />
        <TextField fieldName='phoneContext' label='Phone Context' placeholder='Enter Emergency Order' />
        <TextField fieldName='addressToModify' label='Address To Modify' placeholder='Enter Emergency Order' />

        <button className="bg-blue-500 px-3 py-2 font-medium w-fit rounded-md hover:bg-blue-600" type='submit'>Update Template</button>
      </form>



    </FormProvider>
  )
}
