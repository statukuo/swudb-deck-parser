
import React from 'react';
import { Col, Image, Modal, Row } from 'react-bootstrap';

export default function CardPreview({ show, setShow, cardImage, collectionCount, count, trilogy, limit, isSideboard = false, mainDeckCount = 0, sideboardCount = 0 }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Card preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={cardImage} fluid />
        <Row className='pt-3'>
          <Col xs={12}>
            {trilogy &&
              <p className="text-center">You have {count} on all your decks but you can only have {limit}</p>
            }
            {!trilogy && count > collectionCount && (
              isSideboard && mainDeckCount > 0 ? (
                <p className="text-center">You need {count} total ({mainDeckCount} main + {sideboardCount} sideboard) but you have {collectionCount}</p>
              ) : (
                <p className="text-center">You need {count} for the deck but you have {collectionCount}</p>
              )
            )}
            {!trilogy && count <= collectionCount && (
              isSideboard && mainDeckCount > 0 ? (
                <p className="text-center">You need {count} total ({mainDeckCount} main + {sideboardCount} sideboard)</p>
              ) : (
                <p className="text-center">You need {count} for the deck</p>
              )
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

