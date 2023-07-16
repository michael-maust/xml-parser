import { useState } from 'react';

type NodeProps = {
	jsonObject: any
	onClick: (key: any) => void
}

const Node = ({ jsonObject, onClick }: NodeProps) => {
	const handleClick = () => {
		onClick(jsonObject);
	};

	if (typeof jsonObject === 'object' && jsonObject !== null) {
		return (
			<div onClick={handleClick}>
				{Object.entries(jsonObject).map(([key, value]) => (
					<Node key={key} jsonObject={{ [key]: value }} onClick={onClick} />
				))}
			</div>
		);
	} else {
		return <span>{jsonObject?.toString()}</span>;
	}
};


type XMLEditorProps = {
	jsonObject: any
}

const XMLEditor = ({ jsonObject }: XMLEditorProps) => {
	const [path, setPath] = useState([]);

	// const handleClick = (key: any) => {
	// 	setPath((prevPath) => [...prevPath, key]);
	// };

	// const handleBackClick = () => {
	// 	setPath((prevPath) => prevPath.slice(0, -1));
	// };

	// const renderNode = (key, value) => {
	// 	return (
	// 		<div key={key} onClick={() => handleClick(key)}>
	// 			<span>{key}: </span>
	// 			<Node data={value} onClick={handleClick} />
	// 		</div>
	// 	);
	// };

	const renderBreadcrumbs = () => {
		return (
			<div className="breadcrumbs">
				{path.map((key, index) => (
					<span key={index} onClick={() => setPath(path.slice(0, index + 1))}>
						{key}
					</span>
				))}
			</div>
		);
	};

	return (
		<div>
			{renderBreadcrumbs()}
			{/* <button onClick={handleBackClick}>Back</button>
			{Object.entries(jsonObject).map(([key, value]) => renderNode(key, value))} */}
		</div>
	);
};


export default XMLEditor;
