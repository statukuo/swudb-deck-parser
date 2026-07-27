import React, { useRef, useState } from 'react';
import { Col, Overlay, Row } from 'react-bootstrap';
import Aspect from '../aspect/aspect';
import Rarity from '../rarity/rarity';
import { useSelector } from 'react-redux';

export default function Card({ openPreview, defaultImagePath, count, defaultRarity, cardName, aspects, defaultCardNumber, nth, set, trilogy, limit, deckSources, isSideboard = false, mainDeckCount = 0 }) {
    const target = useRef(null);
    const [show, setShow] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const collectionCount = useSelector((state) => state.collection.cards.filter(({ Set, CardNumber }) => set === Set && parseInt(defaultCardNumber) === parseInt(CardNumber))[0]?.Count || 0);

    const totalNeeded = isSideboard ? (count + mainDeckCount) : count;
    const isMissing = collectionCount < totalNeeded;

    const carStyle = {
        color: "black",
        backgroundColor: alreadyAdded? ((nth % 2) === 0 ? "#a8cf97" : "#deedd8"): ((nth % 2) === 0 ? "#C7C9CE" : "#E9EAEC")
    };

    return (
        <Row style={carStyle} className="pt-2 pb-2 align-items-center">
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
                        {isSideboard && mainDeckCount > 0 ? (
                            `You have ${collectionCount} but you need ${totalNeeded} (${mainDeckCount} in main + ${count} in sideboard)`
                        ) : (
                            `You have ${collectionCount} but you need ${totalNeeded}`
                        )}
                    </div>
                )}
            </Overlay>
            <Col className="p-0" xs="1">
                <input class="form-check-input" type="checkbox" value={alreadyAdded} id="flexCheckDefault" onChange={() => setAlreadyAdded(!alreadyAdded)}></input>
            </Col>

            <Col className="p-0" onClick={() => openPreview(defaultImagePath, totalNeeded, trilogy ? limit : collectionCount, isSideboard, mainDeckCount, count)} xs="1" style={{ color: !isMissing || trilogy ? "black" : "red" }} ref={target} onMouseEnter={() => isMissing && !trilogy && setShow(true)} onMouseLeave={() => isMissing && !trilogy && setShow(false)}>
                {count}x {isSideboard ? `(${mainDeckCount})` : ''}
            </Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, totalNeeded, trilogy ? limit : collectionCount, isSideboard, mainDeckCount, count)} xs="1"><Rarity rarityNumber={defaultRarity} /></Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, totalNeeded, trilogy ? limit : collectionCount, isSideboard, mainDeckCount, count)} xs="1">#{defaultCardNumber}</Col>
            <Col className="p-0 text-start" onClick={() => openPreview(defaultImagePath, totalNeeded, trilogy ? limit : collectionCount, isSideboard, mainDeckCount, count)} xs="4">{cardName}</Col>
            <Col className="p-0 text-end d-flex align-items-center justify-content-end flex-wrap gap-1 pe-2" xs="3">
                {deckSources && deckSources.map((source, idx) => (
                    <span
                        key={idx}
                        className="badge rounded-pill"
                        style={{
                            backgroundColor: source.color.bg,
                            color: source.color.text,
                            fontSize: '0.72rem',
                            padding: '3px 8px'
                        }}
                        title={`${source.deckLabel}: ${source.count} copies`}
                    >
                        {deckSources.length > 1 ? `Deck ${source.deckIndex + 1} (${source.count}x)` : `Deck ${source.deckIndex + 1}`}
                    </span>
                ))}
            </Col>
            <Col className="p-0" onClick={() => openPreview(defaultImagePath, totalNeeded, trilogy ? limit : collectionCount, isSideboard, mainDeckCount, count)} xs="1">{aspects.map((aspect, idx) => <Aspect key={idx} aspectNumber={aspect} />)}</Col>
        </Row>
    );
}
