import React, { useEffect, useState } from "react";

import Header from './Header';
import GroupList from "./GroupList";

import './App.css';

const App = () => {
    const [theme, setTheme] = useState("app-theme-dark");

    const themeHandler = () => {
        setTheme((curr) => (curr === "app-theme-dark" ? "app-theme-light" : "app-theme-dark"));
    }

    const [loading, setLoading] = useState(true);
    const [fetchErrorMessage, setFetchErrorMessage] = useState(null);

    const [taskData, setTaskData] = useState({
        statusMessage: null,
        content: {
            groups: null,
            members: null
        }
    })

    async function fetchTaskData() {
        console.log('fetching');
        try {
            const taskDataApiResponse = await fetch(`${process.env.REACT_APP_API_URL}/groups`);
            const taskData = await taskDataApiResponse.json();

            if (taskData.statusMessage) {
                setFetchErrorMessage(taskData.statusMessage);
                setLoading(false);
            }
            else {
                setTaskData(taskData.content);
                setLoading(false);
            }
        }
        catch (err) {
            console.log(err);
            setFetchErrorMessage("An error occurred when fetching the task data.");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTaskData();
    }, []);

    return (
        <div className={`app-container ${theme}`}>
            <Header toggleTheme={themeHandler} />

            {/* Display error message */}
            {fetchErrorMessage && !loading && <div>{fetchErrorMessage}</div>}

            {/* Display loading screen */}
            {!fetchErrorMessage && loading && <div>Task data loading...</div>}

            {/* Display group list after data has been fetched */}
            {!fetchErrorMessage && !loading && <GroupList data={taskData} />}
        </div>
    );
}

export default App;