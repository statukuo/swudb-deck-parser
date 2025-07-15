import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import Card from '../card/card';


export default function DeckData({ deckData, openPreview }) {
    if (!deckData) {
        return <></>;
    }
    const base = deckData.base;
    const leaders = [deckData.leader, deckData.secondLeader];

    function openCardPreview(imagePath, count, collectionCount) { openPreview(imagePath, count, collectionCount) };

    const defaultAccordionKeys = [
        "Base",
        "Leader",
        "Deck",
        "Sideboard"
    ]

    return (
        <Container className="p-0 pt-5 pb-5">

            <Accordion alwaysOpen defaultActiveKey={defaultAccordionKeys}>
                <Accordion.Item eventKey="Base">
                    <Accordion.Header><p className="h4">Base</p></Accordion.Header>
                    <Accordion.Body className='p-3'>
                        <Card
                            cardName={base.cardName}
                            defaultCardNumber={base.defaultCardNumber}
                            defaultImagePath={base.defaultImagePath}
                            aspects={base.aspects}
                            count={1}
                            openPreview={openCardPreview}
                            defaultRarity={base.defaultRarity}
                            key={0}
                            nth={0}
                            set={base.defaultExpansionAbbreviation}
                        ></Card>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Leader">
                    <Accordion.Header ><p className="h4">Leader</p></Accordion.Header>
                    <Accordion.Body className='p-3'>
                        {leaders.map((leader, idx) => {
                            if (!leader) {
                                return <div key={idx}></div>
                            }

                            return <Card
                                cardName={leader.cardName}
                                defaultCardNumber={leader.defaultCardNumber}
                                defaultImagePath={leader.defaultImagePath}
                                aspects={leader.aspects}
                                defaultRarity={leader.defaultRarity}
                                count={1}
                                openPreview={openCardPreview}
                                key={idx}
                                nth={idx}
                                set={leader.defaultExpansionAbbreviation}
                            ></Card>
                        })}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Deck">
                    <Accordion.Header ><p className="h4">Deck</p></Accordion.Header>
                    <Accordion.Body className='p-1'>
                        <Accordion alwaysOpen defaultActiveKey={Object.keys(deckData.deckSets).map((setId) => `Deck${setId}`)} flush>
                            {Object.keys(deckData.deckSets).map((setId, idx) => {
                                const setData = deckData?.deckSets[setId];
                                const id = `Deck${setId}`;

                                return <Accordion.Item eventKey={id} key={idx}>
                                    <Accordion.Header ><p className="h4">Deck {setId}</p></Accordion.Header>
                                    <Accordion.Body className='p-3'>
                                        {setData.map((card, idx) => {
                                            return <Card
                                                cardName={card.cardName}
                                                defaultCardNumber={card.defaultCardNumber}
                                                defaultImagePath={card.defaultImagePath}
                                                aspects={card.aspects}
                                                count={card.count}
                                                openPreview={openCardPreview}
                                                defaultRarity={card.defaultRarity}
                                                key={idx}
                                                nth={idx}
                                                set={setId}
                                            ></Card>
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>

                            })}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Sideboard">
                    <Accordion.Header ><p className="h4">Sideboard</p></Accordion.Header>
                    <Accordion.Body className='p-1'>
                        <Accordion alwaysOpen defaultActiveKey={Object.keys(deckData.deckSets).map((setId) => `Sideboard${setId}`)} flush>

                            {Object.keys(deckData.sideBoardSets).map((setId, idx) => {
                                const setData = deckData?.sideBoardSets[setId];
                                const id = `Sideboard${setId}`;

                                return <Accordion.Item eventKey={id} key={idx}>
                                    <Accordion.Header ><p className="h4">Sideboard {setId}</p></Accordion.Header>
                                    <Accordion.Body className='p-3'>
                                        {setData.map((card, idx) => {
                                            return <Card
                                                cardName={card.cardName}
                                                defaultCardNumber={card.defaultCardNumber}
                                                defaultImagePath={card.defaultImagePath}
                                                aspects={card.aspects}
                                                count={card.count}
                                                openPreview={openCardPreview}
                                                defaultRarity={card.defaultRarity}
                                                key={idx}
                                                nth={idx}
                                                set={setId}
                                            ></Card>
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            })}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>

    );
}
