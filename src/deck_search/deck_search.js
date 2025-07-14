import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';
import { loadDeckData } from '../store/deckSlice';
import Collection from '../collection/collection';


export default function DeckSearch() {
    const [searchUrl, setSearchUrl] = useState('');

    const dispatch = useDispatch();

    async function searchDeck(url) {
        dispatch(startLoading());
        dispatch(loadDeckData(undefined));


        const response = await fetch("https://cors-anywhere.com/https://swudb.com/api/deck/" + url.split("/").at(-1));
        const data = await response.json();

        const deckSets = {};
        const sideBoardSets = {};

        data.shuffledDeck.reduce((acc, current) => {
            if (current.count > 0) {
                if (!deckSets[current.card.defaultExpansionAbbreviation]) {
                    deckSets[current.card.defaultExpansionAbbreviation] = [];
                }

                deckSets[current.card.defaultExpansionAbbreviation].push({
                    cardName: current.card.cardName + (current.card.title ? ", " + current.card.title : ""),
                    defaultCardNumber: parseInt(current.card.defaultCardNumber),
                    defaultImagePath: current.card.defaultImagePath,
                    aspects: current.card.aspects,
                    defaultRarity: current.card.defaultRarity,
                    count: current.count
                });
            }

            if (current.sideboardCount > 0) {
                if (!sideBoardSets[current.card.defaultExpansionAbbreviation]) {
                    sideBoardSets[current.card.defaultExpansionAbbreviation] = [];
                }

                sideBoardSets[current.card.defaultExpansionAbbreviation].push({
                    cardName: current.card.cardName + (current.card.title ? ", " + current.card.title : ""),
                    defaultCardNumber: parseInt(current.card.defaultCardNumber),
                    defaultImagePath: current.card.defaultImagePath,
                    aspects: current.card.aspects,
                    defaultRarity: current.card.defaultRarity,
                    count: current.count
                });
            }

            return {};
        }, {});

        Object.keys(deckSets).forEach(setId => {
            deckSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
        });

        Object.keys(sideBoardSets).forEach(setId => {
            sideBoardSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
        });

        dispatch(stopLoading());
        dispatch(loadDeckData({ ...data, deckSets, sideBoardSets }));
    }

    return (
        <Form>
            <InputGroup>
                <Form.Control type="search" placeholder="Paste SWUDB url here" onChange={(t) => setSearchUrl(t.target.value)} />
                <Button variant="outline-secondary" onClick={() => searchDeck(searchUrl)}>Load deck</Button>
                <Collection />
            </InputGroup>
        </Form>
    );
}
