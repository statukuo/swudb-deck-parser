import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { CsvToJson } from '../utils/csvToJson';
import { importCollection } from '../store/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';
import SWUDB from "../data/cardDB.json";

const COLLECTIONS = {
    DAVID_COLLECTION: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=715234036&single=true&output=csv",
    TANIA_COLLECTION: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=1932494147&single=true&output=csv",
    JORGE_COLLECTION: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=1505692655&single=true&output=csv",
    AITOR_COLLECTION: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=1416619649&single=true&output=csv",
    ISA_COLLECTION: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh2Fguu9bSVgrNiAU6z48wLvT9EhlR8Mj5-Bn2If_89gu29m6QpbfQwX2_BIPQZmA4gLW1bpFpRHtW/pub?gid=555896031&single=true&output=csv"
};

export default function Collection({ personal }) {
    const collectionCount = useSelector((state) => state.collection.cards.length)
    const dispatch = useDispatch()
    const [user, setUser] = useState("DAVID_COLLECTION");

    async function loadFromGoogle() {
        dispatch(startLoading());
        const response = await fetch(COLLECTIONS[user]);

        await parseFile(response);

        dispatch(stopLoading());
    }

    async function loadFromFile(file) {
        dispatch(startLoading());

        await parseFile(file);

        dispatch(stopLoading());
    }

    async function parseFile(file) {
        const loadedData = CsvToJson(await file.text());
        const filteredData = [];
        const proccessedAlts = {};

        Object.entries(SWUDB).forEach(([setKey, set]) => {
            Object.entries(set).forEach(([baseCardKey, baseCard]) => {
                let totalCount = 0;
                baseCard.alts.forEach(alt => {
                    totalCount += loadedData.reduce((acc, cur) => {
                        if (proccessedAlts[`${alt.expansionAbbreviation}-${alt.cardNumber}`]){
                            return acc;
                        }

                        if (cur.Set === alt.expansionAbbreviation && parseInt(cur.CardNumber) === parseInt(alt.cardNumber)) {
                            proccessedAlts[`${alt.expansionAbbreviation}-${alt.cardNumber}`] = true;;
                            return acc + parseInt(cur.Count);
                        }
                        return acc;
                    }, 0)
                });

                if (totalCount > 0) {
                    filteredData.push({Set: setKey, CardNumber: baseCardKey, Count: totalCount});
                }
            } )
        });

        dispatch(importCollection(filteredData))
    }

    const buttonStyle = {
        width: "50%"
    }


    return (
        <Form class="pt-2">
            {personal &&
                <InputGroup>
                    <Form.Select aria-label="Default select example" onChange={({ target }) => setUser(target.value)}>
                        <option value="DAVID_COLLECTION">David</option>
                        <option value="TANIA_COLLECTION">Tania</option>
                        <option value="JORGE_COLLECTION">Jorge</option>
                        <option value="AITOR_COLLECTION">Aitor</option>
                        <option value="ISA_COLLECTION">Isa</option>
                    </Form.Select>
                    {!!collectionCount &&
                        <Button style={buttonStyle} variant="outline-secondary" onClick={() => loadFromGoogle()}>Unique cards loaded [{collectionCount}]</Button>
                    }
                    {!collectionCount &&
                        <Button style={buttonStyle} variant="outline-secondary" onClick={() => loadFromGoogle()}>Load collection</Button>
                    }
                </InputGroup>
            }
            {!personal &&
                <Form.Control type="file" accept=".csv" onChange={e => loadFromFile(e.target.files.item(0))} />
            }
        </Form>
    );
}
