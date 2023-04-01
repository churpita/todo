import React, { useState } from "react";

import Header from './Header';
import GroupList from "./GroupList";

import './App.css';

const App = () => {
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
            <Header toggleTheme={themeHandler} />
            <GroupList data={staticContent} />
        </div>
    );
}

export default App;