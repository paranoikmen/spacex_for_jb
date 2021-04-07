import React from "react";
import "./Style.css"
import Cell from "./Cell";

function Row({inputData}) {
    return inputData.map((value) => (<Cell value={value}/>))
}

export default Row;
