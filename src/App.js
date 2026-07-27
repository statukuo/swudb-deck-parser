import './App.css';
import DeckSearch from "./deck_search/deck_search";
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import CardPreview from "./card_preview/card_preview";
import DeckData from "./deck_data/deck_data";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Collection from './collection/collection';
import { addDeckData } from './store/deckSlice';

function App({ personal = false }) {
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [cardPreview, setCardPreview] = useState("");
  const [cardPreviewCount, setCardPreviewCount] = useState(0);
  const [cardPreviewCollectionCount, setCardPreviewCollectionCount] = useState(0);
  const [cardPreviewIsSideboard, setCardPreviewIsSideboard] = useState(false);
  const [cardPreviewMainDeckCount, setCardPreviewMainDeckCount] = useState(0);
  const [cardPreviewSideboardCount, setCardPreviewSideboardCount] = useState(0);

  const isLoading = useSelector((state) => state.loading.active);
  const decks = useSelector((state) => state.deck.decks || []);

  function openPreview(imagePath, count, collectionCount, isSideboard = false, mainDeckCount = 0, sideboardCount = 0) {
    setCardPreview("https://swudb.com/images" + imagePath.replace("~", ""));
    setCardPreviewCount(count);
    setCardPreviewCollectionCount(collectionCount);
    setCardPreviewIsSideboard(isSideboard);
    setCardPreviewMainDeckCount(mainDeckCount);
    setCardPreviewSideboardCount(sideboardCount);
    setShowCardPreview(true);
  }

  return <main className="container-fluid">
    <div className="text-center pt-5">
      <CardPreview
        show={showCardPreview}
        setShow={setShowCardPreview}
        cardImage={cardPreview}
        count={cardPreviewCount}
        collectionCount={cardPreviewCollectionCount}
        isSideboard={cardPreviewIsSideboard}
        mainDeckCount={cardPreviewMainDeckCount}
        sideboardCount={cardPreviewSideboardCount}
      />
      <Stack gap={3}>
        <Container>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <DeckSearch saveDeckFunction={addDeckData} />
            </Col>
          </Row>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <Collection personal={personal} />
            </Col>
          </Row>
        </Container>
        <DeckData decks={decks} openPreview={openPreview} />
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

