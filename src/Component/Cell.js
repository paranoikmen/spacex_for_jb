import React from "react";
import "./Style.css"
import DateTimer from "./DateTimer";

function Cell({value}) {
    const monthToString = (month) => {
        return month !== null ? new Date(`${month}`).toLocaleString('ru', {month: 'short'}) : null
    }

    return <tr>
        <td>{value.mission}</td>
        <td>{value.vehicle}</td>
        <td>{value.location}</td>
        <td>
            {value.launch.date}
            {value.launch.date != null ? " " : null}
            {monthToString(value.launch.months)}
            {value.launch.months != null ? " " : null}
            {value.launch.years}</td>
        <td>

            {value.launch.hours}
            {value.launch.hours != null ? ":" : null}
            {value.launch.minutes}
        </td>
        <td>{value.launch.quarter}</td>
        <td><DateTimer value={value}/></td>
    </tr>

}

export default Cell;
