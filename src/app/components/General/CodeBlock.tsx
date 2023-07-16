import React from 'react'
import { CopyBlock, dracula } from "react-code-blocks";

type CodeBlockProps = {
	code: string
}

export default function CodeBlock({ code }: CodeBlockProps) {
	return (
		<div className="h-fit">
			<CopyBlock
				className='w-full h-fit'
				text={code}
				language='html'
				showLineNumbers={true}
				wrapLines
				theme={{ mode: 'dark', ...dracula }}
				codeBlock={false}
				copied
				wrapLongLines
				onCopy={() => console.log('copied')}
			/>
		</div>
	)
}
