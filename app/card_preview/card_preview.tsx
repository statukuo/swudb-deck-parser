
import React, { useState, type JSX } from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';

interface CardPreviewProps {
    show: boolean
    setShow: (show: boolean) => void
    cardImage: string
}

export default function CardPreview(props: CardPreviewProps): JSX.Element {
    const handleClose = () => props.setShow(false);

    return (
        <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Card preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Image src={props.cardImage} fluid />
        </Modal.Body>
      </Modal>
    );
}
