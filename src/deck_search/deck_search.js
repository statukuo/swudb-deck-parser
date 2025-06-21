import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';


export default function DeckSearch(props) {
    const [searchUrl, setSearchUrl] = useState('');

    return (
        <Form>
            <InputGroup>
                <Form.Control type="search" placeholder="Paste SWUDB url here" onChange={(t) => setSearchUrl(t.target.value)} />
                <Button variant="outline-secondary" onClick={() => props.searchDeck(searchUrl)}>Load deck</Button>
            </InputGroup>
        </Form>
    );
}
