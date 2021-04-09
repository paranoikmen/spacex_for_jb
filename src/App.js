import './App.css';
import {useEffect, useState} from "react";
import "./Component/Style.css"
import Row from "./Component/Row";
import {DateNowTimer} from "./Component/DateTimer"

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
