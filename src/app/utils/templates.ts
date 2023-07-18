import { AdaptationFormValues } from '../components/Forms/AdaptationsForm'
import { DialPatternFormValues } from '../components/Forms/DialPatternForm'

export function getDialPattern(
  formValues: DialPatternFormValues,
  digitPattern?: string
) {
  const digitPatternValue = digitPattern
    ? digitPattern
    : '[Digit Pattern(s) Here]'

  return `<DigitmapFullTO>
	<notes>${formValues.notes}</notes>
	<deny>${formValues.deny}</deny>
	<digitpattern>${digitPatternValue}</digitpattern>
	<emergency_order>${formValues.emergencyOrder}</emergency_order>
	<maxdigits>${formValues.maxDigits}</maxdigits>
	<mindigits>${formValues.minDigits}</mindigits>
	<routingpolicyNames>${formValues.routingPolicyNames}</routingpolicyNames>
	<treatasemergency>${formValues.treatAsEmergency}</treatasemergency>
</DigitmapFullTO>`
}

export function getAdaptation(
  formValues: AdaptationFormValues,
  isEgress: boolean,
  digitPattern?: string
) {
  const parentTag = isEgress
    ? 'EgressadaptationFullTO'
    : 'IngressadaptationFullTO'

  const digitPatternValue = digitPattern
    ? digitPattern
    : '[Digit Pattern(s) Here]'

  return `<${parentTag}>
	<notes>${formValues.notes}</notes>
	<deletedigits>${formValues.deletedDigits}</deletedigits>
	<insertdigits>${formValues.insertedDigits}</insertdigits>
	<matchingpattern>${digitPatternValue}</matchingpattern>
	<maxdigits>${formValues.maxDigits}</maxdigits>
	<mindigits>${formValues.minDigits}</mindigits>
	<phoneContext>${formValues.phoneContext}</phoneContext>
	<addressToModify>${formValues.addressToModify}</addressToModify>
</${parentTag}>`
}
