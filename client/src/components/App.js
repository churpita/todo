import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Header from './Header';

import './App.css';
import GroupCard from "./GroupCard";

const App = () => {
    const { mapName } = useParams();

    const [theme, setTheme] = useState("app-theme-dark");

    const themeHandler = () => {
        setTheme((curr) => (curr === "app-theme-dark" ? "app-theme-light" : "app-theme-dark"));
    }

    const staticContent = [
        {
            "task_group_key": 1,
            "title": "Work Tasks",
            "color": "2688B6"
        },
        {
            "task_group_key": 2,
            "title": "Personal Tasks",
            "color": "B62626"
        }
    ]

    return (
        <div className={`app-container ${theme}`}>
            <Header map={mapName} toggleTheme={themeHandler} />
            <div>
                {staticContent.map(group => {
                    return <GroupCard attributes={group} key={group.task_group_key}>Hello!</GroupCard>
                })}
            </div>
        </div>
    );
}

export default App;