"use client"

import { useState } from 'react'
import TablePreviewer from './TablePreviewer';


export default function CsvReader() {
	const [csvFile, setCsvFile] = useState<File>();
	const [csvArray, setCsvArray] = useState<any[]>([]);

	const processCSV = (string: string, delim = ',') => {
		const headers = string.slice(0, string.indexOf('\n')).split(delim);
		const rows = string.slice(string.indexOf('\n') + 1).split('\n');

		const newArray = rows.map(row => {
			const values = row.split(delim);
			const eachObject = headers.reduce((object: any, header, i) => {
				object[header] = values[i];
				return object;
			}, {})
			return eachObject;
		})

		setCsvArray(newArray)
	}

	console.log(csvArray);


	const submit = () => {
		const file = csvFile;
		const reader = new FileReader();

		reader.onload = function (event) {
			const text = event.target?.result;
			if (typeof text !== 'string') return
			console.log(text);
			processCSV(text);
		}

		if (file === undefined) return
		reader.readAsText(file);
	}

	return (
		<form id='csv-form'>
			<h1 className="">CSV Parser</h1>
			<input
				type='file'
				accept='.csv'
				id='csvFile'
				onChange={(event) => {
					if (event.target.files === null) return
					setCsvFile(event.target.files[0])
				}}
			>
			</input>
			<br />
			<button
				onClick={(e) => {
					e.preventDefault()
					if (csvFile) submit()
				}}>
				Submit
			</button>
			<br />
			{csvArray.length > 0 ?
				<TablePreviewer csvArray={csvArray} /> : null}


		</form>
	);

}
