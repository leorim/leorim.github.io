import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RiInformationLine } from '@remixicon/react'

const Credits: React.FunctionComponent = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="link" onClick={handleShow}>
                <Stack direction="horizontal" gap={1}>
                    <RiInformationLine />
                    <span>About</span>
                </Stack>
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>About</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <dl>
                        <dt>Designed with</dt>
                        <dd><a href="https://www.sketch.com/" target="_blank">Sketch</a></dd>
                        <dt>Icons by</dt>
                        <dd><a href="https://remixicon.com/" target="_blank">Remix Icon</a></dd>
                        <dt>Built with</dt>
                        <dd>
                            <a href="https://astro.build/" target="_blank">Astro</a>,{' '}
                            <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>,{' '}
                            <a href="https://react-bootstrap.netlify.app/" target="_blank">React Bootstrap</a>
                        </dd>
                    </dl>
                </Offcanvas.Body>
              </Offcanvas>
        </React.Fragment>
    );
}

export default Credits;
