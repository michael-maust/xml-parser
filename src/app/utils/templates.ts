import { AdaptationFormValues } from '../components/Forms/AdaptationsForm'
import { DialPatternFormValues } from '../components/Forms/DialPatternForm'

export function getDialPattern(
  formValues: DialPatternFormValues,
  digitPattern?: string,
  isDisplay?: boolean
) {
  const digitPatternValue = Boolean(isDisplay)
    ? '[Digit Pattern(s) Here]'
    : digitPattern

  const policyNameArray = formValues.routingPolicyNames ?? []

  const mappedRoutingPolicyName = policyNameArray
    .map((policy) => `<routingpolicyNames>${policy}</routingpolicyNames>`)
    .join('\r\n\t')

  const routingPolicyNames =
    policyNameArray.length > 1
      ? mappedRoutingPolicyName
      : '<routingpolicyNames></routingpolicyNames>'

  return `<DigitmapFullTO>
	<notes>${formValues.notes}</notes>
	<deny>${formValues.deny}</deny>
	<digitpattern>${digitPatternValue}</digitpattern>
	<emergency_order>${formValues.emergencyOrder}</emergency_order>
	<maxdigits>${formValues.maxDigits}</maxdigits>
	<mindigits>${formValues.minDigits}</mindigits>
	${routingPolicyNames}
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

  if (!formValues.phoneContext)
    return `<${parentTag}>
	<notes>${formValues.notes}</notes>
	<deletedigits>${formValues.deletedDigits}</deletedigits>
	<insertdigits>${formValues.insertedDigits}</insertdigits>
	<matchingpattern>${digitPatternValue}</matchingpattern>
	<maxdigits>${formValues.maxDigits}</maxdigits>
	<mindigits>${formValues.minDigits}</mindigits>
    <addressToModify>${formValues.addressToModify}</addressToModify>
</${parentTag}>`

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
