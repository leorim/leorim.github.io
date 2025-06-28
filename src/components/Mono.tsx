import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';

interface MonoProps {
	children: React.ReactNode;
}

const Mono: React.FunctionComponent<MonoProps> = ({ children }) => {
	
	return (
		<Stack
			direction="horizontal"
			className="mono"
		>
			{children}
		</Stack>
	);
};

export default Mono;
