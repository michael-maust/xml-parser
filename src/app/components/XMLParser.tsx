"use client"

import { useState } from 'react'
import TablePreviewer from './TablePreviewer';
import { parseString, Builder, parseStringPromise } from 'xml2js';
import { XMLParser, XMLBuilder, XMLValidator, XmlBuilderOptionsOptional, X2jOptionsOptional } from "fast-xml-parser";
import XMLEditor from './XMLEditor';

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



const builderOptions: XmlBuilderOptionsOptional = {
	format: true,
	preserveOrder: true,
	ignoreAttributes: false,
}


// Convert string/JSON to XML
function toXMLBlob(jsonObject: any) {
	const builder = new XMLBuilder(builderOptions);
	const xmlContent = builder.build(jsonObject);
	const blob = new Blob([xmlContent], { type: 'application/xml' });
	return blob;

}


const parsingOptions: X2jOptionsOptional = {
	preserveOrder: true,
	ignoreAttributes: false,
	alwaysCreateTextNode: false,
};

function toJson(xml: string) {

	const parser = new XMLParser(parsingOptions);
	let result = parser.parse(xml);
	return result
}


export default function XmlReader() {
	const [xmlFile, setXmlFile] = useState<File>();
	const [jsonObject, setJsonObject] = useState<any[]>([]);
	const [fileDownloadUrl, setFileDownloadUrl] = useState<string>();

	function generateURL(blob: Blob) {
		const url = URL.createObjectURL(blob);
		setFileDownloadUrl(url);
	}

	console.log(fileDownloadUrl)
	console.log(jsonObject);



	const submit = () => {
		const file = xmlFile;
		const reader = new FileReader();

		reader.onload = async function (event) {
			const text = event.target?.result;
			if (typeof text !== 'string') return
			const blob = toXMLBlob(jsonObject)
			generateURL(blob)


		}

		if (file === undefined) return
		reader.readAsText(file);
	}

	function handleFileUpload(file: File) {
		const reader = new FileReader();

		reader.onload = async function (event) {
			const text = event.target?.result;
			if (typeof text !== 'string') return
			const result = toJson(text)
			const blob = toXMLBlob(result)
			console.log(blob)
			setJsonObject(result)
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
					handleFileUpload(event.target.files[0])
				}}
			>
			</input>
			<br />
			<br />
			{fileDownloadUrl && <a href={fileDownloadUrl} onClick={() => setFileDownloadUrl(undefined)} download='file.xml' className="">
				Download File
			</a>}

			<XMLEditor jsonObject={jsonObject.slice(1, jsonObject.length)} />

			{/* {jsonObject.length > 0 && <TablePreviewer csvArray={jsonObject[1]} />} */}


		</form>
	);

}
