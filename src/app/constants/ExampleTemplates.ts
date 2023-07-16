export const DIAL_PATTERN_Example = `<DigitmapFullTO>
	<notes>Branson NPA/NXX Codes</notes>
	<deny>false</deny>
	<digitpattern>417213</digitpattern>
	<emergency_order>1</emergency_order>
	<maxdigits>10</maxdigits>
	<mindigits>10</mindigits>
	<routingpolicyNames>To_SBCE_Branson</routingpolicyNames>
	<treatasemergency>false</treatasemergency>
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
