import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import TextField from '../Inputs/Textfield'
import FormSelect from '../Inputs/FormSelect'

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
  maxDigits: '0',
  minDigits: '0',
  phoneContext: 'cdp.udp',
  addressToModify: 'both',
}


export default function AdaptationForm({ initialValues, onSubmit }: AdaptationFormProps) {

  const defaultValues = {
    notes: initialValues?.notes ?? '',
    deletedDigits: initialValues?.deletedDigits ?? '',
    insertedDigits: initialValues?.insertedDigits ?? '',
    maxDigits: initialValues?.maxDigits ?? '0',
    minDigits: initialValues?.minDigits ?? '0',
    phoneContext: initialValues?.phoneContext ?? '',
    addressToModify: initialValues?.addressToModify ?? 'both',
  } satisfies AdaptationFormValues

  const methods = useForm<AdaptationFormValues>({
    defaultValues,
    resolver: zodResolver(AdaptationSchema),
    mode: 'onChange',
  })

  const { handleSubmit, formState: { errors } } = methods

  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6'>

        <div className="grid md:grid-cols-2 gap-3">
          <TextField fieldName='notes' tw='flex-1' label='Notes' placeholder='Enter notes' />
          <TextField fieldName='deletedDigits' type='number' label='Deleted Digits' placeholder='Enter deleted digits' />
          <TextField fieldName='insertedDigits' type='number' label='Inserted Digits' placeholder='Enter inserted digits' />
          <TextField fieldName='maxDigits' type='number' max={36} min={0} label='Max Digits' placeholder='Enter max digits' />
          <TextField fieldName='minDigits' type='number' max={36} min={0} label='Min Digits' placeholder='Enter min digits' />
          <TextField fieldName='phoneContext' label='Phone Context' placeholder='Enter phone context' />
          <FormSelect fieldName='addressToModify' label='Address To Modify' placeholder='Enter address to modify' options={['destination', 'origination', 'both']} />
        </div>

        <button className="bg-blue-500 px-3 py-2 font-medium w-fit rounded-md hover:bg-blue-600" type='submit'>Update Template</button>
      </form>



    </FormProvider>
  )
}
