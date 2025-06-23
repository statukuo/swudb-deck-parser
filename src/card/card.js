import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Aspect from '../aspect/aspect';
import Rarity from '../rarity/rarity';

export default function Card({ openPreview, defaultImagePath, count, defaultRarity, cardName, aspects, defaultCardNumber, nth }) {
    const carStyle = {
        color: "white",
        backgroundColor: (nth % 2) === 0 ? "#18181b" : "#09090b"
    };


    return (
        <Row onClick={() => openPreview(defaultImagePath)} style={carStyle} className="pt-2 pb-2">
            <Col xs="1">{count}x</Col>
            <Col xs="2"><Rarity rarityNumber={defaultRarity} /></Col>
            <Col xs="6" className="text-start">{cardName}</Col>
            <Col xs="2">{aspects.map((aspect) => <Aspect aspectNumber={aspect} />)}</Col>
            <Col xs="1">#{defaultCardNumber}</Col>
        </Row>
    );
}
