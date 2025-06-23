import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';


export default function DeckSearch({ searchDeck }) {
    const [searchUrl, setSearchUrl] = useState('');

    return (
        <Form>
            <InputGroup>
                <Form.Control type="search" placeholder="Paste SWUDB url here" onChange={(t) => setSearchUrl(t.target.value)} />
                <Button variant="outline-secondary" onClick={() => searchDeck(searchUrl)}>Load deck</Button>
            </InputGroup>
        </Form>
    );
}
