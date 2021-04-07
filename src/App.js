import './App.css';
import {useEffect, useState} from "react";
import "./Component/Style.css"
import Row from "./Component/Row";

function App() {
    const [data, setData] = useState([])
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        let reader = new FileReader();

        if (selectedFile != 0) {
            reader.readAsText(event.target.files[0])

            reader.onload = function () {
                reloadData(reader.result)
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    async function reloadData(dataFromFile) {
        if (dataFromFile.length == 0) {
            alert("файл не выбран или пустой")
        } else {
            localStorage.clear()
            let tmp = JSON.parse(dataFromFile)
            setData(tmp)
        }

    }

    const DateNowTimer = () => {
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

    async function loadDataFromSite() {
        const response = await fetch("https://raw.githubusercontent.com/denissokolov/tc-internship-task/master/launches.json")

        if(response.ok) {
            const newData = await response.json()
            setData([...newData])
        }
        else alert("Не получилось загрузить с сайта :(")
    }

    return (
        <div>
            <button onClick={loadDataFromSite}>Загрузить с сайта</button>
            <input type="file" onChange={changeHandler}/>
            <div>Текущее время:{DateNowTimer()}</div>
            <table>
                <tr>
                    <th>Миссия</th>
                    <th>Модель</th>
                    <th>Локация</th>
                    <th>Дата запуска</th>
                    <th>Время запуска</th>
                    <th>Квартал</th>
                    <th>Таймер</th>
                </tr>
                <Row inputData={data}/>
            </table>
        </div>
    );
}

export default App;
