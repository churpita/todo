import React, { useState, useEffect, useReducer } from "react";
import { tasksReducer, tasksActions } from "./reducers/tasksReducer";

import { TailSpin } from 'react-loader-spinner';
import { MdAddCircleOutline } from "react-icons/md";

import IconButton from "./IconButton";
import GroupCard from "./GroupCard";

const GroupList = props => {
    const [loading, setLoading] = useState(true);
    const [fetchErrorMessage, setFetchErrorMessage] = useState(null);
    const [taskData, taskDataDispatch] = useReducer(tasksReducer, {
        statusMessage: null,
        content: {
            groups: [],
            members: []
        }
    });

    const addGroupHandler = (title, color) => {
        // Attempt to post the new group to the API
        //      If successful, update the state accordingly
        //      If unsuccessful, throw an error message and don't make any further changes
        const newTaskGroupKey = Math.max.apply(Math, taskData.content.groups.map(group => group.task_group_key)) + 1;

        taskDataDispatch({ 
            type: tasksActions.ADD_GROUP, 
            payload: {
                task_group_key: newTaskGroupKey,
                title: title,
                color: color 
            } 
        });
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
                    type: tasksActions.FETCH_GROUPS, 
                    payload: {
                        fetchedTaskData: taskDataApiJson 
                    } 
                });
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
        <>
            {/* Display error message */}
            {fetchErrorMessage && !loading && <div>{fetchErrorMessage}</div>}

            {/* Display loading screen */}
            {!fetchErrorMessage && loading && <TailSpin wrapperClass="loadingSpinner" />}

            {/* Display group list after data has been fetched */}
            {!fetchErrorMessage && !loading &&
            <>
                {taskData.content.groups.map(group => {
                    return (
                        <GroupCard 
                            attributes={group} 
                            members={taskData.content.members.filter(m => m.task_group_key == group.task_group_key)} 
                            key={group.task_group_key} 
                        />
                    )
                })}
                <IconButton>
                    <MdAddCircleOutline onClick={e => addGroupHandler("School Tasks", '2bb32b')} size={"2em"} />
                </IconButton>
            </>
            }
        </>
    );
};

export default GroupList;