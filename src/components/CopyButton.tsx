import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import Button from 'react-bootstrap/Button';

enum ButtonStates {
    initial = 'Copy email',
    copied = 'Copied'
}

const CopyButton: React.FunctionComponent<Button.ButtonProps> = ({ ...props }) => {
    const [copiedText, copy] = useCopyToClipboard();
    const [buttonState, setButtonState] = useState<ButtonStates>(ButtonStates.initial);

    const handleCopy = () => {
        copy('leo@rimmer.co')
            .then(() => {
                setButtonState(ButtonStates.copied);
            })
            .catch(error => {
                console.error('Failed to copy!', error)
            })
    }

    useEffect(() => {
        if (buttonState === ButtonStates.copied) {
            const timer = setTimeout(() => {
                setButtonState(ButtonStates.initial);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    return (
        <Button
            {...props}
            disabled={buttonState === ButtonStates.copied}
            onClick={handleCopy}
        >
            {buttonState}
        </Button>
    );
}

export default CopyButton;
