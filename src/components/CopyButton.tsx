import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { RiFileCopyLine, RiCheckLine } from '@remixicon/react'

enum ButtonStates {
    initial = 'Copy email',
    copied = 'Copied'
}

const CopyButton: React.FunctionComponent<Button.ButtonProps> = ({ ...props }) => {
    const [copiedText, copy] = useCopyToClipboard();
    const [buttonState, setButtonState] = useState<ButtonStates>(ButtonStates.initial);
    const [showToast, setShowToast] = useState<boolean>(false);

    const handleCopy = () => {
        copy('leo@rimmer.co')
            .then(() => {
                setButtonState(ButtonStates.copied);
                setShowToast(true);
            })
            .catch(error => {
                console.error('Failed to copy!', error)
            })
    }

    useEffect(() => {
        if (buttonState === ButtonStates.copied) {
            const timer = setTimeout(() => {
                setButtonState(ButtonStates.initial);
                setShowToast(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    return (
        <React.Fragment>
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
            <ToastContainer
                containerPosition="fixed"
                position="top-end"
                className="p-3"
            >
                <Toast show={showToast}>
                    <Toast.Body>
                        <Stack direction="horizontal" gap={2}>
                            <RiCheckLine className="text-success" />
                            <span>Email address copied</span>
                        </Stack>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </React.Fragment>
    );
}

export default CopyButton;
