import React, {useEffect, useState} from "react";

const DateTimer = ({value}) => {
    const [dateMinutes, setMinutes] = useState()
    const [dateHours, setHours] = useState()
    const [dateDays, setDays] = useState()

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
        {dateComp() == -1 ? "До запуска:" : "После запуска:"}
        <div>Дней: {Math.trunc(dateDays)}</div>
        <div>Часов: {Math.trunc(dateHours)}</div>
        <div>Минут: {Math.trunc(dateMinutes)}</div>
    </div>
}

export const DateNowTimer = () => {
    const [dateSeconds, setSeconds] = useState()
    const [dateMinutes, setMinutes] = useState()
    const [dateHours, setHours] = useState()
    const [dateDays, setDays] = useState()
    const [dateMonths, setMonths] = useState()
    const [dateYears, setYears] = useState()

    useEffect(() => {
        const timer = setInterval(() => setSeconds(new Date().getSeconds()), 1000)
        return () => { clearInterval(timer) }
    }, [])
    useEffect(() => {
        const timer = setInterval(() => setMinutes(new Date().getMinutes()), 1000)
        return () => { clearInterval(timer) }
    }, [])
    useEffect(() => {
        const timer = setInterval(() => setHours(new Date().getHours()), 1000)
        return () => { clearInterval(timer) }
    }, [])
    useEffect(() => {
        const timer = setInterval(() => setDays(new Date().getDate()), 1000)
        return () => { clearInterval(timer) }
    }, [])
    useEffect(() => {
        const timer = setInterval(() => setMonths(new Date().getMonth()+1), 1000)
        return () => { clearInterval(timer) }
    }, [])
    useEffect(() => {
        const timer = setInterval(() => setYears(new Date().getFullYear()), 1000)
        return () => { clearInterval(timer) }
    }, [])

    return <div>
        <div>
            {dateHours}:{dateMinutes}:{dateSeconds}
        </div>
        <div>
            {dateDays}.{dateMonths}.{dateYears}
        </div>
    </div>
}

export default DateTimer;
