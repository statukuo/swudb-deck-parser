import './App.css';
import DeckSearch from "./deck_search/deck_search";
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { loadFirstTrilogyData, loadSecondTrilogyData, loadThirdTrilogyData } from './store/deckSlice';
import TrilogyAnalysis from './trilogy_analysis/trilogy_analysis';
import { useState } from 'react';
import CardPreview from './card_preview/card_preview';

function App() {
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [cardPreview, setCardPreview] = useState("");
  const [cardPreviewCount, setCardPreviewCount] = useState(0);
  const [cardPreviewLimit, setCardPreviewLimit] = useState(0);

  const isLoading = useSelector((state) => state.loading.active);

  function openPreview(imagePath, count, limit) {
    setCardPreview("https://swudb.com/images" + imagePath.replace("~", ""));
    setCardPreviewCount(count);
    setCardPreviewLimit(limit);
    setShowCardPreview(true);
  }


  return <main className="container-fluid">
    <CardPreview show={showCardPreview} setShow={setShowCardPreview} cardImage={cardPreview} count={cardPreviewCount} limit={cardPreviewLimit} trilogy />
    <div className="text-center pt-5">
      <Stack gap={3}>
        <Container>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <DeckSearch saveDeckFunction={loadFirstTrilogyData} />
            </Col>
          </Row>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <DeckSearch saveDeckFunction={loadSecondTrilogyData} />
            </Col>
          </Row>
          <Row className="justify-content-lg-center">
            <Col xs lg="8">
              <DeckSearch saveDeckFunction={loadThirdTrilogyData} />
            </Col>
          </Row>
        </Container>
        <TrilogyAnalysis openPreview={openPreview} />
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
