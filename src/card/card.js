import React, { useRef, useState } from 'react';
import { Col, Overlay, Row } from 'react-bootstrap';
import Aspect from '../aspect/aspect';
import Rarity from '../rarity/rarity';
import { useSelector } from 'react-redux';

export default function Card({ openPreview, defaultImagePath, count, defaultRarity, cardName, aspects, defaultCardNumber, nth, set, trilogy, limit }) {
    const target = useRef(null);
    const [show, setShow] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const collectionCount = useSelector((state) => state.collection.cards.filter(({ Set, CardNumber }) => set === Set && parseInt(defaultCardNumber) === parseInt(CardNumber))[0]?.Count || 0);

    const carStyle = {
        color: "black",
        backgroundColor: alreadyAdded? ((nth % 2) === 0 ? "#a8cf97" : "#deedd8"): ((nth % 2) === 0 ? "#C7C9CE" : "#E9EAEC")
    };

    return (
        <Row style={carStyle} className="pt-2 pb-2">
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
            <Col className="p-0" xs="1">
                <input class="form-check-input" type="checkbox" value={alreadyAdded} id="flexCheckDefault" onChange={() => setAlreadyAdded(!alreadyAdded)}></input>
            </Col>

            <Col className="p-0" onClick={() => openPreview(defaultImagePath, count, trilogy ? limit : collectionCount)} xs="1" style={{ color: collectionCount >= count || trilogy ? "black" : "red" }} ref={target} onMouseEnter={() => collectionCount < count && setShow(true)} onMouseLeave={() => collectionCount < count && setShow(false)}>{count}x</Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, count, trilogy ? limit : collectionCount)} xs="1"><Rarity rarityNumber={defaultRarity} /></Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, count, trilogy ? limit : collectionCount)} xs="2">#{defaultCardNumber}</Col>
            <Col className="p-0 text-start" onClick={() => openPreview(defaultImagePath, count, trilogy ? limit : collectionCount)} xs="6">{cardName}</Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, count, trilogy ? limit : collectionCount)} xs="1">{aspects.map((aspect, idx) => <Aspect key={idx} aspectNumber={aspect} />)}</Col>
        </Row>
    );
}
