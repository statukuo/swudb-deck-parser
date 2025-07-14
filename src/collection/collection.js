import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { CsvToJson } from '../utils/csvToJson';
import { importCollection } from '../store/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';

const DAVID_COLLECTION = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=715234036&single=true&output=csv";

export default function Collection() {
    const collectionCount = useSelector((state) => state.collection.cards.length)
    const dispatch = useDispatch()

    async function parseCSVFile() {
        dispatch(startLoading());
        const response = await fetch(DAVID_COLLECTION);

        dispatch(importCollection(CsvToJson(await response.text())))

        dispatch(stopLoading());
    }


    return (
        <Button variant="outline-secondary" onClick={() => parseCSVFile()}>Load collection [{collectionCount}]</Button>
    );
}
