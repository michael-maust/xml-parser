import {DialPatternFormValues} from "../components/Forms/DialPatternForm";

type stringDigitPattern = {digitPattern?: string};

export const getDialPattern = (
  values: Omit<DialPatternFormValues, "digitPattern"> & stringDigitPattern
) => `<DigitmapFullTO>
	<notes>${values.notes}</notes>
	<deny>${values.deny}</deny>
	<digitpattern>${
    values.digitPattern ? values.digitPattern : "[Digit Pattern(s) Here]"
  }</digitpattern>
	<emergency_order>${values.emergencyOrder}</emergency_order>
	<maxdigits>${values.maxDigits}</maxdigits>
	<mindigits>${values.minDigits}</mindigits>
	<routingpolicyNames>${values.routingPolicyNames}</routingpolicyNames>
	<treatasemergency>${values.treatAsEmergency}</treatasemergency>
</DigitmapFullTO>`;

export const INGRESS_ADAPTATION_EXAMPLE = `<IngressadaptationFullTO>
	<notes></notes>
	<deletedigits>3</deletedigits>
	<insertdigits></insertdigits>
	<matchingpattern>197</matchingpattern>
	<maxdigits>9</maxdigits>
	<mindigits>9</mindigits>
	<phoneContext>cdp.udp</phoneContext>
	<addressToModify>destination</addressToModify>
</IngressadaptationFullTO>`;

export const EGRESS_ADAPTATION_EXAMPLE = `<EgressadaptationFullTO>
	<notes></notes>
	<deletedigits>3</deletedigits>
	<insertdigits></insertdigits>
	<matchingpattern>19747</matchingpattern>
	<maxdigits>9</maxdigits>
	<mindigits>9</mindigits>
	<phoneContext>cdp.udp</phoneContext>
	<addressToModify>both</addressToModify>
</EgressadaptationFullTO>`;
