import React from 'react';
import { Fade } from 'react-bootstrap';

const fadeDropStyles = {
	entering: 'fade-drop-enter',
	entered: 'fade-drop-enter-active',
	exiting: 'show fade-drop-exit-active',
	exited: 'fade-drop-exit',
};

const FadeDrop = React.forwardRef((props, ref) => (
	<Fade
		{...props}
		ref={ref}
		className="fade-drop"
		transitionClasses={fadeDropStyles}
		timeout={250}
	/>
));

export default FadeDrop;