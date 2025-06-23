import React from 'react';
import { Image } from 'react-bootstrap';
import rarity1 from './rarity1.png';
import rarity2 from './rarity2.png';
import rarity3 from './rarity3.png';
import rarity4 from './rarity4.png';
import rarity5 from './rarity5.png';

export default function Rarity({ rarityNumber }) {

    const aspectStyle = {
        maxWidth: "2rem",
        width: "200%"
    };


    const rarity = [
        rarity1,
        rarity2,
        rarity3,
        rarity4,
        rarity5
    ]

    return <Image src={rarity[rarityNumber - 1]} style={aspectStyle} />;
}
