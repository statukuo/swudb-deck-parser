import React, { useRef, useState } from 'react';
import { Col, Overlay, Row } from 'react-bootstrap';
import Aspect from '../aspect/aspect';
import Rarity from '../rarity/rarity';
import { useSelector } from 'react-redux';

export default function Card({ openPreview, defaultImagePath, count, defaultRarity, cardName, aspects, defaultCardNumber, nth, set }) {
    const target = useRef(null);
    const [show, setShow] = useState(false);

    const collectionCount = useSelector((state) => state.collection.cards.filter(({ Set, CardNumber }) => set === Set && parseInt(defaultCardNumber) === parseInt(CardNumber))[0]?.Count);

    const carStyle = {
        color: "white",
        backgroundColor: (nth % 2) === 0 ? "#18181b" : "#09090b"
    };

    return (
        <Row onClick={() => openPreview(defaultImagePath)} style={carStyle} className="pt-2 pb-2">
            <Overlay target={target.current} show={show} placement="right">
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        You have {collectionCount} but you need {count}
                    </div>
                )}
            </Overlay>

            <Col xs="1" style={{ color: collectionCount >= count ? "white" : "red" }} ref={target} onMouseEnter={() => collectionCount < count && setShow(true)} onMouseLeave={() => collectionCount < count && setShow(false)}>{count}x</Col>
            <Col xs="2"><Rarity rarityNumber={defaultRarity} /></Col>
            <Col xs="6" className="text-start">{cardName}</Col>
            <Col xs="2">{aspects.map((aspect, idx) => <Aspect key={idx} aspectNumber={aspect} />)}</Col>
            <Col xs="1">#{defaultCardNumber}</Col>
        </Row>
    );
}
