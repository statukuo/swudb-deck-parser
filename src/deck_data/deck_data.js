import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Card from '../card/card';


export default function DeckData({ deckData, openPreview }) {
    if (!deckData) {
        return <></>;
    }
    const base = deckData.base;
    const leaders = [deckData.leader, deckData.secondLeader];

    function openCardPreview(imagePath) { openPreview(imagePath) };


    const titleStyle = {
        color: "white",
        backgroundColor: "#09090b",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        marginTop: "1rem",
        fontWeight: "800"
    };

    return (
        <Container className="p-5">
            <Row style={titleStyle}>
                <p className="h4">Base</p>
            </Row>
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
            <Row style={titleStyle}>
                <p className="h4">Leader</p>
            </Row>
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
            {Object.keys(deckData.deckSets).map((setId, idx) => {
                const setData = deckData?.deckSets[setId];
                return <div key={idx}>
                    <Row style={titleStyle}>
                        <p className="h4">Deck {setId}</p>
                    </Row>
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
                </div>
            })}
            {Object.keys(deckData.sideBoardSets).map((setId, idx) => {
                const setData = deckData?.sideBoardSets[setId];
                return <div key={idx}>
                    <Row style={titleStyle}>
                        <p className="h4">Sideboard {setId}</p>
                    </Row>
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
                </div>
            })}
        </Container>

    );
}
