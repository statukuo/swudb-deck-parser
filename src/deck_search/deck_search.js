import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';
import { loadDeckData } from '../store/deckSlice';
import SWUDB from "../data/cardDB.json";


export default function DeckSearch() {
    const [searchData, setSearchData] = useState('');

    const dispatch = useDispatch();

    function loadDeck(pastedData) {
        if (pastedData.includes("swudb.com/deck/")) {
            searchDeck(pastedData);
            return;
        }

        loadDeckFromJson(pastedData);
    }

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
                    count: current.sideboardCount
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

    async function loadDeckFromJson(json) {
        dispatch(startLoading());
        dispatch(loadDeckData(undefined));

        const extractDataFromId = (set, number) => {
            const cardData = SWUDB[set][parseInt(number)];
            return {
                cardName: cardData.cardName + (cardData.title ? ", " + cardData.title : ""),
                defaultCardNumber: parseInt(cardData.defaultCardNumber),
                defaultImagePath: cardData.defaultImagePath,
                aspects: cardData.aspects,
                defaultRarity: cardData.defaultRarity,
                defaultExpansionAbbreviation: set
            };
        }

        const data = await JSON.parse(json);

        const deckSets = {};
        const sideBoardSets = {};

        data.deck.reduce(async (acc, current) => {
            if (current.count > 0) {
                const [set, number] = current.id.split("_");
                if (!deckSets[set]) {
                    deckSets[set] = [];
                }

                deckSets[set].push({
                    ...extractDataFromId(set, number),
                    count: current.count
                });
            }

            return {};
        }, {});

        data.sideboard.reduce(async (acc, current) => {
            if (current.count > 0) {
                const [set, number] = current.id.split("_");
                if (!sideBoardSets[set]) {
                    sideBoardSets[set] = [];
                }

                sideBoardSets[set].push({
                    ...extractDataFromId(set, number),
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

        const base = {
            ...extractDataFromId(...data.base.id.split("_")),
            count: 1
        }

        const leader = {
            ...extractDataFromId(...data.leader.id.split("_")),
            count: 1
        }

        let secondLeader;
        if (data.secondleader?.count) {
            secondLeader = {
                ...extractDataFromId(...data.secondleader.id.split("_")),
                count: 1
            }
        }

        dispatch(stopLoading());
        dispatch(loadDeckData({ base, leader, secondLeader, deckSets, sideBoardSets }));
    }

    const buttonStyle = {
        width: "25%"
    }

    return (
        <Form>
            <InputGroup>
                <Form.Control type="search" placeholder="Paste SWUDB url OR JSON here" onChange={(t) => setSearchData(t.target.value)} />
                <Button style={buttonStyle} variant="outline-secondary" onClick={() => loadDeck(searchData)}>Load deck</Button>
            </InputGroup>
        </Form>
    );
}
