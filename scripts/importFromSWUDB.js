const fs = require('fs');
const _ = require("lodash");


async function importSet() {
    const importedCards = {};

    const allSets = await (await fetch("https://swudb.com/api/card/getAllSets")).json();

    const setsToFetch = allSets.filter(({ cardCount }) => cardCount);
    let cardIdx = 1;
    let setIdx = 0;

    while (setIdx < setsToFetch.length) {
        console.log("Started processing ", setsToFetch[setIdx].expansionAbbreviation, setsToFetch[setIdx].cardCount);
        cardIdx = 1;
        while (cardIdx <= setsToFetch[setIdx].cardCount) {
            const response = await fetch("https://swudb.com/api/card/getVariantInfo", {
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

                if (!importedCards[setsToFetch[setIdx].expansionAbbreviation]) {
                    importedCards[setsToFetch[setIdx].expansionAbbreviation] = {};
                }

                importedCards[setsToFetch[setIdx].expansionAbbreviation][cardIdx] = {
                    defaultExpansionAbbreviation: data.alternativeVariants[0].expansionAbbreviation,
                    cardName: data.cardName,
                    title: data.title,
                    defaultCardNumber: data.alternativeVariants[0].cardNumber,
                    defaultImagePath: data.frontImagePath,
                    aspects: data.aspects,
                    defaultRarity: data.alternativeVariants[0].rarity
                }

                console.log("ADDED ", setsToFetch[setIdx].expansionAbbreviation, cardIdx, data.cardName);
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
