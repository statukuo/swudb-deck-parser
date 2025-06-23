import React from 'react';
import { Image } from 'react-bootstrap';
import aspect1 from './aspect1.png';
import aspect2 from './aspect2.png';
import aspect3 from './aspect3.png';
import aspect4 from './aspect4.png';
import aspect5 from './aspect5.png';
import aspect6 from './aspect6.png';

export default function Aspect({ aspectNumber }) {
    const aspectStyle = {
        maxWidth: "2rem",
        width: "50%"
    };

    const aspects = [
        aspect1,
        aspect2,
        aspect3,
        aspect4,
        aspect5,
        aspect6
    ]

    return <Image src={aspects[aspectNumber - 1]} style={aspectStyle} />;
}
