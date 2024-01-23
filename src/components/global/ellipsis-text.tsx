import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const EllipsisText = ({ text }: { text: string }) => {
	const [containerWidth, setContainerWidth] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const handleResize = () => {
			setContainerWidth(containerRef.current!.offsetWidth);
		};

		// Initial setup
		setContainerWidth(containerRef.current!.offsetWidth);

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const adjustText = () => {
			const textElement = textRef.current!;
			const originalText = text;

			while (containerWidth !== 0 && textElement.offsetWidth > containerWidth) {
				console.log(textElement.offsetWidth, containerWidth);
				textElement.innerText = textElement.innerText.slice(0, -1);
			}

			textElement.innerText = textElement.innerText === originalText ? textElement.innerText : `${textElement.innerText}...`;

			// Optionally, store the original text in a data attribute
			textElement.setAttribute('data-original-text', originalText);
		};

		adjustText();
	}, [containerWidth, text]);

	return (
		<div ref={containerRef} className='w-[175px] text-left'>
			<div ref={textRef} className='inline-block whitespace-nowrap'>
				{text}
			</div>
		</div>
	);
};
