import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { RiFileCopyLine, RiCheckLine } from '@remixicon/react'

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
            variant={buttonState === ButtonStates.copied ? 'success' : 'primary'}
            disabled={buttonState === ButtonStates.copied}
            onClick={handleCopy}
        >
            <Stack direction="horizontal" gap={2}>
                {buttonState === ButtonStates.copied ? (
                    <RiCheckLine />
                ) : (
                    <RiFileCopyLine />
                )}
                <span>{buttonState}</span>
            </Stack>
        </Button>
    );
}

export default CopyButton;
