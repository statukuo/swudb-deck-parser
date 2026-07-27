import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import Card from '../card/card';
import { combineDecks } from '../utils/combineDecks';


export default function DeckData({ decks, openPreview }) {
    if (!decks || decks.length === 0) {
        return <></>;
    }

    const combinedData = combineDecks(decks);
    if (!combinedData) {
        return <></>;
    }

    const { bases, leaders, deckSets, sideBoardSets, deckCount } = combinedData;

    function openCardPreview(imagePath, count, collectionCount, isSideboard, mainDeckCount, sideboardCount) {
        openPreview(imagePath, count, collectionCount, isSideboard, mainDeckCount, sideboardCount);
    }

    const defaultAccordionKeys = [
        "Base",
        "Leader",
        "Deck",
        "Sideboard"
    ];

    return (
        <Container className="p-0 pt-5 pb-5">
            {deckCount > 1 && (
                <div className="mb-3 text-start">
                    <span className="badge bg-primary fs-6">
                        Combined view across {deckCount} loaded decks
                    </span>
                </div>
            )}

            <Accordion alwaysOpen defaultActiveKey={defaultAccordionKeys}>
                <Accordion.Item eventKey="Base">
                    <Accordion.Header><p className="h4">Base {bases.length > 1 ? `(${bases.length})` : ''}</p></Accordion.Header>
                    <Accordion.Body className='p-3'>
                        {bases.map((base, idx) => (
                            <Card
                                cardName={base.cardName}
                                defaultCardNumber={base.defaultCardNumber}
                                defaultImagePath={base.defaultImagePath}
                                aspects={base.aspects}
                                count={base.count || 1}
                                openPreview={openCardPreview}
                                defaultRarity={base.defaultRarity}
                                key={idx}
                                nth={idx}
                                set={base.defaultExpansionAbbreviation}
                                deckSources={base.deckSources}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Leader">
                    <Accordion.Header><p className="h4">Leader {leaders.length > 1 ? `(${leaders.length})` : ''}</p></Accordion.Header>
                    <Accordion.Body className='p-3'>
                        {leaders.map((leader, idx) => (
                            <Card
                                cardName={leader.cardName}
                                defaultCardNumber={leader.defaultCardNumber}
                                defaultImagePath={leader.defaultImagePath}
                                aspects={leader.aspects}
                                defaultRarity={leader.defaultRarity}
                                count={leader.count || 1}
                                openPreview={openCardPreview}
                                key={idx}
                                nth={idx}
                                set={leader.defaultExpansionAbbreviation}
                                deckSources={leader.deckSources}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Deck">
                    <Accordion.Header><p className="h4">Deck</p></Accordion.Header>
                    <Accordion.Body className='p-1'>
                        <Accordion alwaysOpen defaultActiveKey={Object.keys(deckSets).map((setId) => `Deck${setId}`)} flush>
                            {Object.keys(deckSets).map((setId, idx) => {
                                const setData = deckSets[setId];
                                const id = `Deck${setId}`;

                                return (
                                    <Accordion.Item eventKey={id} key={idx}>
                                        <Accordion.Header><p className="h4">Deck {setId}</p></Accordion.Header>
                                        <Accordion.Body className='p-3'>
                                            {setData.map((card, cardIdx) => (
                                                <Card
                                                    cardName={card.cardName}
                                                    defaultCardNumber={card.defaultCardNumber}
                                                    defaultImagePath={card.defaultImagePath}
                                                    aspects={card.aspects}
                                                    count={card.count}
                                                    openPreview={openCardPreview}
                                                    defaultRarity={card.defaultRarity}
                                                    key={cardIdx}
                                                    nth={cardIdx}
                                                    set={setId}
                                                    deckSources={card.deckSources}
                                                />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Sideboard">
                    <Accordion.Header><p className="h4">Sideboard</p></Accordion.Header>
                    <Accordion.Body className='p-1'>
                        <Accordion alwaysOpen defaultActiveKey={Object.keys(sideBoardSets).map((setId) => `Sideboard${setId}`)} flush>
                            {Object.keys(sideBoardSets).map((setId, idx) => {
                                const setData = sideBoardSets[setId];
                                const id = `Sideboard${setId}`;

                                return (
                                    <Accordion.Item eventKey={id} key={idx}>
                                        <Accordion.Header><p className="h4">Sideboard {setId}</p></Accordion.Header>
                                        <Accordion.Body className='p-3'>
                                            {setData.map((card, cardIdx) => (
                                                <Card
                                                    cardName={card.cardName}
                                                    defaultCardNumber={card.defaultCardNumber}
                                                    defaultImagePath={card.defaultImagePath}
                                                    aspects={card.aspects}
                                                    count={card.count}
                                                    openPreview={openCardPreview}
                                                    defaultRarity={card.defaultRarity}
                                                    key={cardIdx}
                                                    nth={cardIdx}
                                                    set={setId}
                                                    deckSources={card.deckSources}
                                                    isSideboard={true}
                                                    mainDeckCount={card.mainDeckCount || 0}
                                                />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}



