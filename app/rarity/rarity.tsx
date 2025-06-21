import React, { useState, type JSX } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

export interface RarityProps {
    rarityNumber: number
}

export default function Rarity(props: RarityProps): JSX.Element {

    const aspectStyle = {
        maxWidth: "2rem",
        width: "200%"
    };

    return <Image src={"/rarity" + props.rarityNumber + ".png"} style={aspectStyle} />;
}
