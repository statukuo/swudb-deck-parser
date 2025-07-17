import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Trilogy from './Trilogy';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router';
import { Container, Nav, Navbar } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#/">SWUDB Deck Parser</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#/">Deck builder</Nav.Link>
                <Nav.Link href="#/trilogy">Trilogy</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route index element={<App />} />
          <Route path="/trilogy" element={<Trilogy />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
