import React, { useState, type JSX, type StyleHTMLAttributes } from 'react';
import { Container, Row, Stack } from 'react-bootstrap';
import Card, { type CardProps } from '~/card/card';


interface DeckDataProps {
    deckData?: {
        leader: CardProps,
        secondLeader?: CardProps,
        base: CardProps,
        deckSets: {},
        sideBoardSets: {}
    };
    openPreview: (image: string) => void
}



export default function DeckData(props: DeckDataProps): JSX.Element {
    if (!props.deckData) {
        return <></>;
    }
    const base = props.deckData.base;
    const leaders = [props.deckData.leader, props.deckData.secondLeader];

    function openCardPreview(imagePath: string) { props.openPreview(imagePath) };


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
            ></Card>
            <Row style={titleStyle}>
                <p className="h4">Leader</p>
            </Row>
            {leaders.map((leader: CardProps | undefined, idx: number) => {
                if (!leader) {
                    return <></>
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
                ></Card>
            })}
            {Object.keys(props.deckData.deckSets).map((setId) => {
                const setData = props.deckData?.deckSets[setId];
                return <>
                    <Row style={titleStyle}>
                        <p className="h4">Deck {setId}</p>
                    </Row>
                    {setData.map((card: CardProps, idx: number) => {
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
                        ></Card>
                    })}
                </>
            })}
            {Object.keys(props.deckData.sideBoardSets).map((setId) => {
                const setData = props.deckData?.sideBoardSets[setId];
                return <>
                    <Row style={titleStyle}>
                        <p className="h4">Sideboard {setId}</p>
                    </Row>
                    {setData.map((card: CardProps, idx: number) => {
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
                        ></Card>
                    })}
                </>
            })}
        </Container>

    );
}
