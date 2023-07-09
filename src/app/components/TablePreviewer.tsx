import React from 'react';


type ValuePair = {
	[key: string]: string
}

type TablePreviewerProps = {
	csvArray: ValuePair[]
}

function TablePreviewer({ csvArray }: TablePreviewerProps) {
	const headers = Object.keys(csvArray[0]);
	const rows = csvArray.map((row) => {
		return Object.values(row);
	})

	return (
		<table>
			<thead className='bg-error-300'>
				<tr className='bg-error-300'>
					{headers.map((header, i) => {
						return <th key={i}>{header}</th>
					}
					)}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, i) => {
					return (
						<tr key={i}>
							{row.map((value, j) => {
								return <td key={j}>{value}</td>
							})}
						</tr>
					)
				}
				)}
			</tbody>
		</table >
	);
}

export default TablePreviewer;
