import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import {
	RiArrowDropDownLine,
	RiCheckLine,
	RiMoonLine,
	RiSunLine
} from '@remixicon/react'

const THEME_STORAGE_KEY = 'theme-preference';

type Theme = 'light' | 'dark';

const ThemeSwitcher: React.FunctionComponent = () => {
	const [theme, setTheme] = useState<Theme>('light');
	
	const applyTheme = (newTheme: Theme) => {
		document.body.setAttribute('data-bs-theme', newTheme);
	};
	
	useEffect(() => {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		
		if (storedTheme === 'light' || storedTheme === 'dark') {
			setTheme(storedTheme);
			applyTheme(storedTheme);
		} else {
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const defaultTheme: Theme = systemPrefersDark ? 'dark' : 'light';
			setTheme(defaultTheme);
			applyTheme(defaultTheme);
		}
	}, []);
	
	const toggleTheme = (selectedTheme: Theme) => {
		setTheme(selectedTheme);
		applyTheme(selectedTheme);
		localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
	};
	
	return (
		<Dropdown>
			<Dropdown.Toggle bsPrefix="lr">
				<Stack direction="horizontal" gap={1}>
					<span>Change theme</span>
					<RiArrowDropDownLine />
				</Stack>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{['light', 'dark'].map((color, i) =>
					<Dropdown.Item key={i} onClick={() => toggleTheme(color)}>
						<Stack direction="horizontal" gap={2}>
							{color === 'light' ? (
								<RiSunLine />
							) : (
								<RiMoonLine />
							)}
							<span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
							{color === theme && (
								<RiCheckLine className="text-success ms-auto" />
							)}
						</Stack>
					</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ThemeSwitcher;
