import React, { useState, type JSX } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

export interface AspectProps {
    aspectNumber: number
}

export default function Aspect(props: AspectProps): JSX.Element {

    const aspectStyle = {
        maxWidth: "2rem",
        width: "50%"
    };

    return <Image src={"/aspect" + props.aspectNumber + ".png"} style={aspectStyle} />;
}
