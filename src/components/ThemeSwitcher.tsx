import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

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
	
	const toggleTheme = () => {
		const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		applyTheme(newTheme);
		localStorage.setItem(THEME_STORAGE_KEY, newTheme);
	};
	
	return (
		<Button onClick={toggleTheme}>
			Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
		</Button>
	);
};

export default ThemeSwitcher;
