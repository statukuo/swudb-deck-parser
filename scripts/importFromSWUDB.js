const fs = require('fs');
const _ = require("lodash");
const cards = require("../src/data/cardDB.json");
const forcedSets = ["LAW"];


async function importSet() {
    const importedCards = {};

    const allSets = await (await fetch("https://swudb.com/api/card/getAllSets")).json();

    const setsToFetch = allSets.map(set => {
        if (forcedSets.includes(set.expansionAbbreviation)) {
            return {...set, cardCount: set.previewedCount}
        }

        return set;
    }).filter(({ cardCount }) => cardCount);
    let cardIdx = 1;
    let setIdx = 0;


    while (setIdx < setsToFetch.length) {
        console.log("Started processing ", setsToFetch[setIdx].expansionAbbreviation, setsToFetch[setIdx].cardCount);
        cardIdx = 1;
        while (cardIdx <= setsToFetch[setIdx].cardCount) {
            const set = setsToFetch[setIdx].expansionAbbreviation;

            if (cards[set]?.[cardIdx]) {
                if (!importedCards[set]) {
                    importedCards[set] = {};
                }

                importedCards[set][cardIdx] = cards[set][cardIdx];
            } else {
                const response = await fetch("https://swudb.com/api/card/getPrintingInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cardNumber: String(cardIdx).padStart(3, "0"),
                        expansionAbbreviation: setsToFetch[setIdx].expansionAbbreviation,
                        language: ""
                    })
                });

                const data = await response.json();



                if (data.cardId) {
                    if (!importedCards[set]) {
                        importedCards[set] = {};
                    }

                    importedCards[set][cardIdx] = {
                        defaultExpansionAbbreviation: data.alternativePrintings.find(({expansionAbbreviation}) => expansionAbbreviation === set).expansionAbbreviation,
                        cardName: data.cardName,
                        title: data.title,
                        defaultCardNumber: data.alternativePrintings[0].cardNumber,
                        defaultImagePath: data.frontImagePath,
                        aspects: data.aspects,
                        defaultRarity: data.alternativePrintings[0].rarity,
                        alts: data.alternativePrintings.map(({cardNumber, expansionAbbreviation}) =>({cardNumber, expansionAbbreviation}) )
                    }

                    console.log("ADDED ", set, cardIdx, data.cardName);
                }
            }

            cardIdx++;
        };

        setIdx++;
    }

    fs.writeFile("src/data/cardDB.json", JSON.stringify(importedCards), function(err) {
        if (err) {
            console.log(err);
        }
        console.log("DONE");
    });
}




importSet()
