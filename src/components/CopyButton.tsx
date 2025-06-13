import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import {
    RiFileCopyLine,
    RiCheckboxCircleLine,
    RiErrorWarningLine
} from '@remixicon/react'

enum ButtonStates {
    initial = 'Copy email',
    copied = 'Copied',
    failed = 'Failed to copy'
}

interface ToastProps {
    variant: 'success'|'danger',
    message: string
}

const CopyButton: React.FunctionComponent<Button.ButtonProps> = ({ ...props }) => {
    const [copiedText, copy] = useCopyToClipboard();
    const [buttonState, setButtonState] = useState<ButtonStates>(ButtonStates.initial);
    const [toast, setToast] = useState<ToastProps|null>(null);

    const handleCopy = () => {
        copy('leo@rimmer.co')
            .then(() => {
                setButtonState(ButtonStates.copied);
                setToast({
                    variant: 'success',
                    message: "Email address copied"
                });
            })
            .catch(error => {
                setButtonState(ButtonStates.failed);
                setToast({
                    variant: 'danger',
                    message: "Failed to copy email address"
                });
            })
    }

    useEffect(() => {
        if (buttonState !== ButtonStates.initial) {
            const timer = setTimeout(() => {
                setButtonState(ButtonStates.initial)
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
                        <RiCheckboxCircleLine />
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
                <Toast
                    show={buttonState !== ButtonStates.initial} 
                    onExited={() => setToast(null)}
                >
                    <Toast.Body>
                        <Stack direction="horizontal" gap={2}>
                            {toast?.variant === 'success' ? (
                                <RiCheckboxCircleLine className="text-success" />
                            ) : (
                                <RiErrorWarningLine className="text-danger" />
                            )}
                            <span>{toast?.message}</span>
                        </Stack>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </React.Fragment>
    );
}

export default CopyButton;
