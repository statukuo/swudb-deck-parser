
import React from 'react';
import { Image, Modal } from 'react-bootstrap';

export default function CardPreview({ show, setShow, cardImage }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Card preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={cardImage} fluid />
      </Modal.Body>
    </Modal>
  );
}
