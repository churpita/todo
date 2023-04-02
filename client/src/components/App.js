import React, { useState } from "react";

import Header from './Header';
import GroupList from "./GroupList";

import './App.css';

const App = () => {
    const [theme, setTheme] = useState("app-theme-dark");

    const themeToggler = () => {
        setTheme((curr) => (curr === "app-theme-dark" ? "app-theme-light" : "app-theme-dark"));
    }

    return (
        <div className={`app-container ${theme}`}>
            <Header toggleTheme={themeToggler} />
            <div className="body">
                <GroupList />
            </div>
        </div>
    );
}

export default App;