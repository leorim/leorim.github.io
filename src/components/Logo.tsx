import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Mono from './Mono';
import logo from '../images/logo.svg?raw'

const Logo: React.FunctionComponent = () => {
	const words = [
		'You win!',
		'Nearly',
		'Almost',
		'Try again'
	];
	const [letters, setLetters] = useState<string[]>([]);
	const [typing, setTyping] = useState<boolean>(false);

	const delay = (ms: number) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async function delayedMap<T, U>(
		array: string[],
		callback: (item: T, index: number, array: T[]) => Promise<U> | U,
		delayMs: number
	): Promise<U[]> {
		const result: U[] = [];
		for (let i = 0; i < array.length; i++) {
			result.push(await callback(array[i], i, array));
			if (i < array.length - 1) await delay(delayMs);
		}
		return result;
	}
	
	const handleClick = () => {
		setTyping(true);
		const word = words[Math.floor(Math.random() * words.length)];
		const wordArray = word.split('');
		delayedMap(wordArray, async (letter) => {
			setLetters(prevLetters => [...prevLetters, letter]);
		}, 200).then(result => {
			setTimeout(() => {
				delayedMap(wordArray, async (letter) => {
					setLetters(prevLetters => prevLetters.slice(0, -1));
				}, 75).then(result => {
					setTyping(false);
				})
			}, 750)
		});
	}
	
	return (
		<Stack
			className="logo"
			direction="horizontal"
			gap={3}
		>
			<Button
				disabled={typing}
				onClick={handleClick}
				variant="link"
				dangerouslySetInnerHTML={{ __html: logo }}
			/>
			{letters.length > 0 && (
				<Mono>{letters}</Mono>
			)}
		</Stack>
	);
};

export default Logo;
