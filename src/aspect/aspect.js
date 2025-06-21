import React from 'react';
import { Image } from 'react-bootstrap';

export default function Aspect(props) {
    const aspectStyle = {
        maxWidth: "2rem",
        width: "50%"
    };

    return <Image src={"aspect" + props.aspectNumber + ".png"} style={aspectStyle} />;
}
