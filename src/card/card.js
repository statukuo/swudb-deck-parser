import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Aspect from '../aspect/aspect';
import Rarity from '../rarity/rarity';

export default function Card(props) {
    const carStyle = {
        color: "white",
        backgroundColor: (props.nth % 2) === 0 ? "#18181b" : "#09090b"
    };


    return (
        <Row onClick={() => props.openPreview(props.defaultImagePath)} style={carStyle} className="pt-2 pb-2">
            <Col xs="1">{props.count}x</Col>
            <Col xs="1"><Rarity rarityNumber={props.defaultRarity}/></Col>
            <Col xs="6" className="text-start">{props.cardName}</Col>
            <Col xs="2">{props.aspects.map((aspect) => <Aspect aspectNumber={aspect}/>)}</Col>
            <Col xs="1">#{props.defaultCardNumber}</Col>
        </Row>
    );
}
