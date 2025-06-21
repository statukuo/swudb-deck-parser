import React, { useState, type JSX } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';


interface DeckSearchProps {
    searchDeck: (url: string) => void;
}

export default function DeckSearch(props: DeckSearchProps): JSX.Element {
    const [searchUrl, setSearchUrl] = useState('');

    return (
        <Form>
            <InputGroup>
                <Form.Control type="email" placeholder="Paste SWUDB url here" onChange={(t) => setSearchUrl(t.target.value)} />
                <Button variant="outline-secondary" onClick={() => props.searchDeck(searchUrl)}>Load deck</Button>
            </InputGroup>
        </Form>
    );
}
