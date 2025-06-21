import React from 'react';
import { Image } from 'react-bootstrap';

export default function Rarity(props) {

    const aspectStyle = {
        maxWidth: "2rem",
        width: "200%"
    };

    return <Image src={"rarity" + props.rarityNumber + ".png"} style={aspectStyle} />;
}
