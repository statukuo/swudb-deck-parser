
import React from 'react';
import { Image, Modal } from 'react-bootstrap';

export default function CardPreview(props)  {
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
