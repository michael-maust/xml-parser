"use client"

import { useState } from 'react'
import TablePreviewer from './TablePreviewer';
import { parseString, Builder, parseStringPromise } from 'xml2js';


/** TODO:
 * 1. Add a table to insert a mass amount of phone numbers
 * 2. Have a section that allows you to customize the other default parameters of the XML
 * 3. Automatically insert the new phone number records into the xml
 *
 * Adapations
 *
 * 1. Parse which tables and select which one you would like to modify
 *
 * CM R8 &
 *
 *  */




// Convert string/JSON to XML
function toXMLBlob(json: string) {

	const builder = new Builder();
	const xml = builder.buildObject(json);
	console.log('building xml')
	console.log(xml)

	console.log('creating to blob')
	const blob = new Blob([xml], { type: 'application/txt' });
	return blob;

}

function toJson(xml: string) {
	let value = {}
	parseString(xml, function (err, result) {
		console.dir(result);
		value = result
	});
	console.log(value)
	return value
}


export default function XmlReader() {
	const [xmlFile, setXmlFile] = useState<File>();
	const [xmlArray, setXmlArray] = useState<any[]>([]);
	const [xmlObject, setXmlObject] = useState<any>();
	const [fileDownloadUrl, setFileDownloadUrl] = useState<string>();

	function generateURL(blob: Blob) {
		const url = URL.createObjectURL(blob);
		setFileDownloadUrl(url);
	}


	console.log(xmlArray);


	const submit = () => {
		const file = xmlFile;
		const reader = new FileReader();

		reader.onload = async function (event) {
			const text = event.target?.result;
			if (typeof text !== 'string') return
			console.log('parsing text')
			console.log(text)
			const result = await toJson(text)
			const blob = toXMLBlob(JSON.stringify(result))
			console.log(blob)
			generateURL(blob)


		}

		if (file === undefined) return
		reader.readAsText(file);
	}

	return (
		<form id='xml-form'>
			<h1 className="">XML Parser</h1>
			<input
				type='file'
				accept='.xml'
				id='xmlFile'
				onChange={(event) => {
					if (event.target.files === null) return
					setXmlFile(event.target.files[0])
				}}
			>
			</input>
			<br />
			<button
				onClick={(e) => {
					e.preventDefault()
					if (xmlFile) submit()
				}}>
				Submit
			</button>
			<br />
			{fileDownloadUrl && <a href={fileDownloadUrl} className="">
				Download File
			</a>}






		</form>
	);

}
