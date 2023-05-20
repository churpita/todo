import React, { useState, useEffect, useReducer } from "react";
import { taskReducer, taskActions } from "./reducers/taskReducer";

import TaskGroupCard from "./TaskGroupCard";
import ModalTaskGroup from "./ModalTaskGroup";
import LoadingSpinner from "./LoadingSpinner";

const TaskGroupList = props => {
    console.log('Re-rendered group list');
    const [loading, setLoading] = useState(true);
    const [fetchErrorMessage, setFetchErrorMessage] = useState(null);

    const [taskData, taskDataDispatch] = useReducer(taskReducer, {
        statusMessage: null,
        content: {
            groups: [],
            members: []
        }
    });

    const addGroupHandler = async (action, title, color) => {
        // If adding a first group, -Infinity is the result of the Math.max query, so we want the key to be reset to 1 in that situation
        let newTaskGroupKey = Math.max.apply(Math, taskData.content.groups.map(group => group.task_group_key)) + 1;
        if (Math.abs(newTaskGroupKey) == Infinity) newTaskGroupKey = 1;

        const addGroupApiResponse = await fetch(`${process.env.REACT_APP_API_URL}/add-group`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_group_key: newTaskGroupKey,
                title: title,
                color: color
            })
        })

        const addGroupApiJson = await addGroupApiResponse.json();

        if (addGroupApiJson.statusMessage) {
            throw new Error(taskDataApiJson.statusMessage);
        }
        else {
            taskDataDispatch({ 
                type: taskActions.ADD_GROUP, 
                payload: {
                    task_group_key: addGroupApiJson.content.newGroup.task_group_key,
                    title: addGroupApiJson.content.newGroup.title,
                    color: addGroupApiJson.content.newGroup.color 
                } 
            });
        }
    }

    const fetchTaskData = async () =>  {
        console.log('Fetching tasks from API');
        try {
            const taskDataApiResponse = await fetch(`${process.env.REACT_APP_API_URL}/groups`);
            const taskDataApiJson = await taskDataApiResponse.json();

            if (taskDataApiJson.statusMessage) {
                setFetchErrorMessage(taskDataApiJson.statusMessage);
                setLoading(false);
            }
            else {
                taskDataDispatch({ 
                    type: taskActions.FETCH_GROUPS, 
                    payload: {
                        fetchedTaskData: taskDataApiJson 
                    } 
                });
                setLoading(false);
            }
        }
        catch (err) {
            setFetchErrorMessage("An error occurred when fetching the task data.");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTaskData();
        console.log('Data fetched');
    }, []);

    return (
        <>
            {/* Display error message */}
            {fetchErrorMessage && !loading && <div>{fetchErrorMessage}</div>}

            {/* Display loading screen */}
            {!fetchErrorMessage && loading && <LoadingSpinner width="3rem" height="3rem" />}

            {/* Display group list after data has been fetched */}
            {!fetchErrorMessage && !loading &&
            <>
                {taskData.content.groups.map(group => {
                    return (
                        <TaskGroupCard 
                            taskData={taskData}
                            taskDataDispatch={taskDataDispatch}
                            attributes={group} 
                            members={taskData.content.members.filter(m => m.task_group_key == group.task_group_key)} 
                            key={group.task_group_key} 
                        />
                    )
                })}

                <ModalTaskGroup 
                    action="add"
                    modalTitle="Create New Group"
                    handler={addGroupHandler} 
                />
            </>
            }
        </>
    );
};

export default TaskGroupList;