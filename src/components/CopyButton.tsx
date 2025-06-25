import React, { useEffect, useRef, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Button, Stack, Toast, ToastContainer } from 'react-bootstrap';
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
    const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);
    const initialRef = useRef<HTMLDivElement>(null);
    const copiedRef = useRef<HTMLDivElement>(null);
    const currentRef = buttonState === ButtonStates.copied ? copiedRef : initialRef;

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
    
    useEffect(() => {
        if (initialRef.current) {
            setContentWidth(initialRef.current.offsetWidth);
        }
    }, []);

    return (
        <React.Fragment>
            <Button
                {...props}
                className="copy-button"
                variant={buttonState === ButtonStates.copied ? 'success' : 'primary'}
                disabled={buttonState === ButtonStates.copied}
                onClick={handleCopy}
            >
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={buttonState === ButtonStates.copied ? 'state2' : 'state1'}
                        timeout={250}
                        classNames="slide"
                        nodeRef={currentRef}
                    >
                        <Stack
                            ref={currentRef}
                            className="justify-content-center"
                            direction="horizontal"
                            gap={2}
                            style={{
                                width: contentWidth ? `${contentWidth}px` : 'auto'
                            }}
                        >
                            {buttonState === ButtonStates.copied ? (
                                <RiCheckboxCircleLine />
                            ) : (
                                <RiFileCopyLine />
                            )}
                            <span>{buttonState}</span>
                        </Stack>
                    </CSSTransition>
                </SwitchTransition>
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
