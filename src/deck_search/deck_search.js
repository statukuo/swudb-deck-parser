import React, { useState } from 'react';
import { Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';
import { removeDeckData, clearDecks } from '../store/deckSlice';
import { DECK_COLORS } from '../utils/combineDecks';
import SWUDB from "../data/cardDB.json";


export default function DeckSearch({ saveDeckFunction, isMultiDeck = true }) {
    const [searchData, setSearchData] = useState('');
    const decks = useSelector((state) => state.deck.decks || []);

    const dispatch = useDispatch();

    function loadDeck(pastedData) {
        if (!pastedData || !pastedData.trim()) return;

        if (pastedData.includes("swudb.com/deck/")) {
            searchDeck(pastedData);
            return;
        }

        loadDeckFromJson(pastedData);
    }

    async function searchDeck(url) {
        dispatch(startLoading());

        try {
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

            const leaderCard = data.shuffledDeck?.find(c => c.card?.type === "Leader")?.card || data.leader;
            const baseCard = data.shuffledDeck?.find(c => c.card?.type === "Base")?.card || data.base;
            const deckName = data.metadata?.name || data.name || (leaderCard ? `${leaderCard.cardName}${baseCard ? ' / ' + baseCard.cardName : ''}` : `Deck ${url.split("/").at(-1)}`);
            const color = DECK_COLORS[decks.length % DECK_COLORS.length];

            dispatch(stopLoading());
            dispatch(saveDeckFunction({ ...data, name: deckName, color, deckSets, sideBoardSets }));
            setSearchData('');
        } catch (e) {
            dispatch(stopLoading());
            console.error("Error loading deck:", e);
        }
    }

    async function loadDeckFromJson(json) {
        dispatch(startLoading());

        try {
            const extractDataFromId = (set, number) => {
                const cardData = SWUDB[set][parseInt(number)];
                return {
                    cardName: cardData.cardName + (cardData.title ? ", " + cardData.title : ""),
                    defaultCardNumber: parseInt(number),
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

            const deckName = data.metadata?.name || data.name || `${leader.cardName}${base ? ' / ' + base.cardName : ''}`;
            const color = DECK_COLORS[decks.length % DECK_COLORS.length];

            dispatch(stopLoading());
            dispatch(saveDeckFunction({ name: deckName, color, base, leader, secondLeader, deckSets, sideBoardSets }));
            setSearchData('');
        } catch (e) {
            dispatch(stopLoading());
            console.error("Error parsing deck JSON:", e);
        }
    }

    const buttonStyle = {
        width: "25%"
    }

    return (
        <div>
            <Form onSubmit={(e) => { e.preventDefault(); loadDeck(searchData); }}>
                <InputGroup>
                    <Form.Control
                        type="search"
                        value={searchData}
                        placeholder="Paste SWUDB url OR JSON here"
                        onChange={(t) => setSearchData(t.target.value)}
                    />
                    <Button style={buttonStyle} variant="outline-secondary" onClick={() => loadDeck(searchData)}>
                        Add deck
                    </Button>
                </InputGroup>
            </Form>

            {isMultiDeck && decks && decks.length > 0 && (
                <div className="mt-3 p-3 bg-light rounded border text-start">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">Loaded Decks ({decks.length}):</span>
                        <Button variant="outline-danger" size="sm" onClick={() => dispatch(clearDecks())}>
                            Clear All Decks
                        </Button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                        {decks.map((deck, idx) => {
                            const color = DECK_COLORS[idx % DECK_COLORS.length];
                            return (
                                <Badge
                                    key={idx}
                                    className="px-3 py-2 d-flex align-items-center gap-2 fs-6 fw-normal rounded-pill"
                                    style={{ backgroundColor: color.bg, color: color.text }}
                                >
                                    <span>
                                        <strong>Deck {idx + 1}:</strong> {deck.name || (deck.leader ? deck.leader.cardName : `Deck ${idx + 1}`)}
                                    </span>
                                    <Button
                                        variant="link"
                                        className="p-0 ms-1 border-0 text-decoration-none lh-1 fw-bold"
                                        style={{ color: color.text, fontSize: '1.1rem' }}
                                        onClick={() => dispatch(removeDeckData(idx))}
                                        title="Remove deck"
                                    >
                                        &times;
                                    </Button>
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


