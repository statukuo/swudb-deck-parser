export const DECK_COLORS = [
    { bg: "#0d6efd", text: "#ffffff", name: "Blue" },
    { bg: "#198754", text: "#ffffff", name: "Green" },
    { bg: "#6f42c1", text: "#ffffff", name: "Purple" },
    { bg: "#fd7e14", text: "#ffffff", name: "Orange" },
    { bg: "#0dcaf0", text: "#000000", name: "Cyan" },
    { bg: "#d63384", text: "#ffffff", name: "Pink" },
    { bg: "#20c997", text: "#ffffff", name: "Teal" },
    { bg: "#ffc107", text: "#000000", name: "Yellow" }
];

export function combineDecks(decks) {
    if (!decks || decks.length === 0) return null;

    const baseMap = new Map();
    const leaderMap = new Map();
    const deckSets = {};
    const sideBoardSets = {};

    decks.forEach((deck, deckIndex) => {
        if (!deck) return;

        const deckColor = DECK_COLORS[deckIndex % DECK_COLORS.length];
        const deckLabel = deck.name || `Deck ${deckIndex + 1}`;
        const deckInfo = {
            deckIndex,
            deckLabel,
            color: deckColor
        };

        const processCard = (cardMapOrObject, card, defaultCount = 1) => {
            const cardCount = card.count || defaultCount;
            const existingSource = cardMapOrObject.deckSources.find(s => s.deckIndex === deckIndex);
            if (existingSource) {
                existingSource.count += cardCount;
            } else {
                cardMapOrObject.deckSources.push({ ...deckInfo, count: cardCount });
            }
            cardMapOrObject.count += cardCount;
        };

        // Process Base
        if (deck.base) {
            const set = deck.base.defaultExpansionAbbreviation || 'Unknown';
            const key = `${set}_${deck.base.defaultCardNumber}`;
            if (!baseMap.has(key)) {
                baseMap.set(key, {
                    ...deck.base,
                    count: 0,
                    deckSources: []
                });
            }
            processCard(baseMap.get(key), deck.base, 1);
        }

        // Process Leaders
        const leaders = [deck.leader, deck.secondLeader].filter(Boolean);
        leaders.forEach((leader) => {
            const set = leader.defaultExpansionAbbreviation || 'Unknown';
            const key = `${set}_${leader.defaultCardNumber}`;
            if (!leaderMap.has(key)) {
                leaderMap.set(key, {
                    ...leader,
                    count: 0,
                    deckSources: []
                });
            }
            processCard(leaderMap.get(key), leader, 1);
        });

        // Process Main Deck Sets
        if (deck.deckSets) {
            Object.entries(deck.deckSets).forEach(([setId, cards]) => {
                if (!deckSets[setId]) deckSets[setId] = [];
                cards.forEach((card) => {
                    let existing = deckSets[setId].find((c) => c.defaultCardNumber === card.defaultCardNumber);
                    if (!existing) {
                        existing = { ...card, count: 0, deckSources: [] };
                        deckSets[setId].push(existing);
                    }
                    processCard(existing, card, card.count);
                });
            });
        }

        // Process Sideboard Sets
        if (deck.sideBoardSets) {
            Object.entries(deck.sideBoardSets).forEach(([setId, cards]) => {
                if (!sideBoardSets[setId]) sideBoardSets[setId] = [];
                cards.forEach((card) => {
                    let existing = sideBoardSets[setId].find((c) => c.defaultCardNumber === card.defaultCardNumber);
                    if (!existing) {
                        existing = { ...card, count: 0, deckSources: [] };
                        sideBoardSets[setId].push(existing);
                    }
                    processCard(existing, card, card.count);
                });
            });
        }
    });

    // Compute mainDeckCount for every sideboard card
    Object.keys(sideBoardSets).forEach((setId) => {
        const mainDeckCards = deckSets[setId] || [];
        sideBoardSets[setId].forEach((sideCard) => {
            const match = mainDeckCards.find((mc) => mc.defaultCardNumber === sideCard.defaultCardNumber);
            sideCard.mainDeckCount = match ? match.count : 0;
        });
    });

    // Sort sets by card number
    Object.keys(deckSets).forEach((setId) => {
        deckSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
    });
    Object.keys(sideBoardSets).forEach((setId) => {
        sideBoardSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
    });

    return {
        bases: Array.from(baseMap.values()),
        leaders: Array.from(leaderMap.values()),
        deckSets,
        sideBoardSets,
        deckCount: decks.length
    };
}
