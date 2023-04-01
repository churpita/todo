import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Header from './Header';

import './App.css';

const App = () => {
    const { mapName } = useParams();

    const [theme, setTheme] = useState("app-theme-dark");

    const themeHandler = () => {
        setTheme((curr) => (curr === "app-theme-dark" ? "app-theme-light" : "app-theme-dark"));
    }

    return (
        <div className={`app-container ${theme}`}>
            <Header map={mapName} toggleTheme={themeHandler} />
            <div>Hello world!</div>
        </div>
    );
}

export default App;