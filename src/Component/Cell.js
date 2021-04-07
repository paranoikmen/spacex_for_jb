import React, {useEffect, useState} from "react";
import "./Style.css"
import { compareAsc } from "date-fns"

function Cell({value}) {

    const DateTimer = () => {
        const [dateMinutes, setMinutes] = useState()
        const [dateHours, setHours] = useState()
        const [dateDays, setDays] = useState()

        useEffect(() => {
            const timer = setInterval(() => setDays(
                (dateComp() == 1 ? ((new Date() - new Date(
                    value.launch.years == null ? 2042 : value.launch.years,
                    value.launch.months == null ? 11 : (value.launch.months-1),
                    value.launch.date == null ? 28 : value.launch.date,
                    value.launch.hours == null ? 23 : value.launch.hours,
                    value.launch.minutes == null ? 59 : value.launch.minutes
                    ))/(1000 * 60 * 60 * 24))
                    : ((new Date(
                        value.launch.years == null ? 2042 : value.launch.years,
                        value.launch.months == null ? 11 : (value.launch.months-1),
                        value.launch.date == null ? 28 : value.launch.date,
                        value.launch.hours == null ? 23 : value.launch.hours,
                        value.launch.minutes == null ? 59 : value.launch.minutes
                    ) - new Date())/(1000 * 60 * 60 * 24)))
            ), 1000)
            return () => { clearInterval(timer) }
        }, [])
        useEffect(() => {
            const timer = setInterval(() => setHours(
                (Math.abs((new Date() - new Date(
                    value.launch.years == null ? 2042 : value.launch.years,
                    value.launch.months == null ? 11 : (value.launch.months-1),
                    value.launch.date == null ? 28 : value.launch.date,
                    value.launch.hours == null ? 23 : value.launch.hours,
                    value.launch.minutes == null ? 59 : value.launch.minutes
                ))/(1000 * 60 * 60 * 24)) - Math.trunc(Math.abs((new Date() - new Date(
                    value.launch.years == null ? 2042 : value.launch.years,
                    value.launch.months == null ? 11 : (value.launch.months-1),
                    value.launch.date == null ? 28 : value.launch.date,
                    value.launch.hours == null ? 23 : value.launch.hours,
                    value.launch.minutes == null ? 59 : value.launch.minutes
                ))/(1000 * 60 * 60 * 24)))) * 24
            ), 1000)
            return () => { clearInterval(timer) }
        }, [])
        useEffect(() => {
            const timer = setInterval(() => setMinutes(
                (Math.abs((new Date() - new Date(
                    value.launch.years == null ? 2042 : value.launch.years,
                    value.launch.months == null ? 11 : (value.launch.months-1),
                    value.launch.date == null ? 28 : value.launch.date,
                    value.launch.hours == null ? 23 : value.launch.hours,
                    value.launch.minutes == null ? 59 : value.launch.minutes
                ))/(1000 * 60 * 60)) - Math.trunc(Math.abs((new Date() - new Date(
                    value.launch.years == null ? 2042 : value.launch.years,
                    value.launch.months == null ? 11 : (value.launch.months-1),
                    value.launch.date == null ? 28 : value.launch.date,
                    value.launch.hours == null ? 23 : value.launch.hours,
                    value.launch.minutes == null ? 59 : value.launch.minutes
                ))/(1000 * 60 * 60)))) * 60
            ), 100)
            return () => { clearInterval(timer) }
        }, [])

        return <div>
                <div>Дней: {Math.trunc(dateDays)}</div>
                <div>Часов: {Math.trunc(dateHours)}</div>
                <div>Минут: {Math.trunc(dateMinutes)}</div>
            </div>
    }

    const monthToString = (month) => {
        return month !== null ? new Date(`${month}`).toLocaleString('ru', {month: 'short'}) : null
    }

    const dateComp = () => {
        if(new Date() < new Date(
            value.launch.years == null ? 2042 : value.launch.years,
            value.launch.months == null ? 12 : value.launch.months-1,
            value.launch.date == null ? 28 : value.launch.date,
            value.launch.hours == null ? 23 : value.launch.hours,
            value.launch.minutes == null ? 59 : value.launch.minutes
        )) {
            return -1
        }
        else {
            return 1
        }
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
        <td>{dateComp() == -1 ? "До запуска:" : "После запуска:"}{DateTimer()}</td>
    </tr>

}

export default Cell;
