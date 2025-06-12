import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

enum ButtonStates {
    initial = 'Copy email',
    copied = 'Copied'
}

const CopyButton: React.FunctionComponent = () => {
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
        <button
            disabled={buttonState === ButtonStates.copied}
            onClick={handleCopy}
        >
            {buttonState}
        </button>
    );
}

export default CopyButton;
