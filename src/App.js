import './App.css';
import DeckSearch from "./deck_search/deck_search";
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import CardPreview from "./card_preview/card_preview";
import DeckData from "./deck_data/deck_data";
import { useState } from 'react';

function App() {
  const [deckData, setDeckData] = useState(undefined);
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [cardPreview, setCardPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function searchDeck(url) {
    setIsLoading(true);
    setDeckData(undefined);

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

    setIsLoading(false);
    setDeckData({ ...data, deckSets, sideBoardSets });
  }

  function openPreview(imagePath) {
    setCardPreview("https://swudb.com/images" + imagePath.replace("~", ""));
    setShowCardPreview(true);
  }

  return <main className="container-fluid">
    <div className="text-center pt-5">
      <CardPreview show={showCardPreview} setShow={setShowCardPreview} cardImage={cardPreview} />
      <Stack gap={3}>
        <Container>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <DeckSearch searchDeck={searchDeck} />
            </Col>
          </Row>
        </Container>
        <DeckData deckData={deckData} openPreview={openPreview} />
        {isLoading &&
          <Container>
            <Row className="justify-content-lg-center">
              <Col xs lg="8">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
            </Row>
          </Container>
        }
      </Stack>
    </div>
  </main>
}


export default App;
