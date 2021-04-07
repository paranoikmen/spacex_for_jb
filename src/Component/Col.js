import React from "react";
import Row from "./Row";
import "./Style.css"

function Col({header, inputData, typeOfData}) {

    return <th>
        {header}
    </th>

}

export default Col;
