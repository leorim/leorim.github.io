import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from "react-transition-group";
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import {
	RiArrowDropDownLine,
	RiCheckLine,
	RiContrastLine,
	RiMoonLine,
	RiSunLine
} from '@remixicon/react'

const THEME_STORAGE_KEY = 'theme-preference';

type Theme = 'light' | 'dark' | 'auto';

const ThemeSwitcher: React.FunctionComponent = () => {
	const [theme, setTheme] = useState<Theme>('auto');
	const [show, setShow] = useState<boolean>(false);
	const dropdownMenuRef = useRef<Dropdown.DropdownProps>(null);
	
	const applyTheme = (newTheme: Theme) => {
		let t = newTheme;
		if (newTheme === 'auto') {
			t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'black';
		}
		document.body.setAttribute('data-bs-theme', t);
	};
	
	useEffect(() => {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		
		if (!!storedTheme) {
			setTheme(storedTheme);
			applyTheme(storedTheme);
		} else {
			applyTheme('auto');
		}
	}, []);
	
	const toggleTheme = (selectedTheme: Theme) => {
		setTheme(selectedTheme);
		applyTheme(selectedTheme);
		localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
	};
	
	const renderIcon = (theme: Theme) => {
		if (theme === 'light') {
			return <RiSunLine />;
		}
		if (theme === 'dark') {
			return <RiMoonLine />;
		}
		return <RiContrastLine />;
	};
	
	return (
		<Dropdown show={show} onToggle={() => setShow(!show)}>
			<Dropdown.Toggle bsPrefix="lr" variant="link">
				<Stack direction="horizontal" gap={1}>
					{renderIcon(theme)}
					<RiArrowDropDownLine />
				</Stack>
			</Dropdown.Toggle>
			<CSSTransition
				in={show}
				timeout={250}
				classNames="dropdown-menu"
				unmountOnExit
				nodeRef={dropdownMenuRef}
			>
				<Dropdown.Menu
					className="show"
					ref={dropdownMenuRef}
					popperConfig={{
						modifiers: [
							{
								name: 'computeStyles',
								options: {
									gpuAcceleration: false
								}
							}
						]
					}}
				>
					<Dropdown.Header>Select theme</Dropdown.Header>
					{['light', 'dark', 'auto'].map((color, i) =>
						<Dropdown.Item
							key={i}
							onClick={() => toggleTheme(color)}
							active={color === theme}
						>
							<Stack direction="horizontal" gap={2}>
								{renderIcon(color)}
								<span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
								{color === theme && (
									<RiCheckLine className="ms-auto" />
								)}
							</Stack>
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</CSSTransition>
		</Dropdown>
	);
};

export default ThemeSwitcher;
