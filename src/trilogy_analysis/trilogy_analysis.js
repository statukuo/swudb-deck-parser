import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../card/card';
import { Container } from 'react-bootstrap';


export default function TrilogyAnalysis({ deckData, openPreview }) {
    const totalCardList = [];

    const addCardToTotal = (card, limit) => {
        const foundCardIdx = totalCardList.findIndex(({ set, defaultCardNumber }) => card.set === set && card.defaultCardNumber === defaultCardNumber);

        if (foundCardIdx < 0) {
            totalCardList.push({ ...card, limit, count: card.count || 1 });
        } else {
            totalCardList[foundCardIdx].count += (card.count || 1);
        }
    }

    const extractCardList = (cardList) => {
        addCardToTotal({ ...cardList.base, set: cardList.base.defaultExpansionAbbreviation }, 1);
        addCardToTotal({ ...cardList.leader, set: cardList.leader.defaultExpansionAbbreviation }, 1);

        Object.entries(cardList.deckSets).forEach(([setKey, set]) => {
            set.forEach((card) => {
                addCardToTotal({ ...card, set: setKey }, 3);
            })
        });
    }

    const invalidCardList = useSelector((state) => {
        if (!state.deck.firstTrilogy || !state.deck.secondTrilogy || !state.deck.thirdTrilogy) {
            return false;
        }


        extractCardList(state.deck.firstTrilogy);
        extractCardList(state.deck.secondTrilogy);
        extractCardList(state.deck.thirdTrilogy);

        return totalCardList.filter(card => card.count > card.limit);
    });


    if (!invalidCardList) {
        return <></>;
    }


    return (
        <Container className="p-0 pt-5 pb-5">
            {!!invalidCardList.length &&
                <>
                    <h1><span class="badge bg-danger">You have too many of these cards</span></h1>
                    {invalidCardList.map((card, idx) => {
                        return <Card
                            cardName={card.cardName}
                            defaultCardNumber={card.defaultCardNumber}
                            defaultImagePath={card.defaultImagePath}
                            aspects={card.aspects}
                            count={card.count}
                            defaultRarity={card.defaultRarity}
                            openPreview={openPreview}
                            key={idx}
                            nth={idx}
                            set={card.set}
                            limit={card.limit}
                            trilogy
                        ></Card>
                    })}
                </>
            }
            {!invalidCardList.length &&
                <h1><span class="badge bg-success">The 3 decks are valid for TRILOGY</span></h1>
            }


        </Container>)

}
