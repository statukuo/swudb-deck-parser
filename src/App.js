import './App.css';
import DeckSearch from "./deck_search/deck_search";
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import CardPreview from "./card_preview/card_preview";
import DeckData from "./deck_data/deck_data";
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [cardPreview, setCardPreview] = useState("");

  const isLoading = useSelector((state) => state.loading.active);
  const deckData = useSelector((state) => state.deck.data);

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
              <DeckSearch/>
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
