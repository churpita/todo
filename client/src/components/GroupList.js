import React, { useState, useEffect, useReducer } from "react";
import { tasksReducer, tasksActions } from "./reducers/tasksReducer";

import { TailSpin } from 'react-loader-spinner';
import { MdAddCircleOutline } from "react-icons/md";

import IconButton from "./IconButton";
import GroupCard from "./GroupCard";
import AddGroupModal from "./AddGroupModal";

const GroupList = props => {
    console.log('Re-rendered group list');
    const [loading, setLoading] = useState(true);
    const [addGroupModalVisible, setAddGroupModalVisible] = useState(true);
    const [fetchErrorMessage, setFetchErrorMessage] = useState(null);
    const [taskData, taskDataDispatch] = useReducer(tasksReducer, {
        statusMessage: null,
        content: {
            groups: [],
            members: []
        }
    });

    const showGroupModal = () => setAddGroupModalVisible(true);
    const hideGroupModal = () => setAddGroupModalVisible(false);

    const addGroupHandler = async (title, color) => {
        const newTaskGroupKey = Math.max.apply(Math, taskData.content.groups.map(group => group.task_group_key)) + 1;
        try {
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
                setFetchErrorMessage(taskDataApiJson.statusMessage);
            }
            else {
                taskDataDispatch({ 
                    type: tasksActions.ADD_GROUP, 
                    payload: {
                        task_group_key: addGroupApiJson.content.newGroup.task_group_key,
                        title: addGroupApiJson.content.newGroup.title,
                        color: addGroupApiJson.content.newGroup.color 
                    } 
                });
            }
        }
        catch (err) {
            setFetchErrorMessage("An error occurred when adding the task group.");
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
                    <MdAddCircleOutline onClick={showGroupModal} size={"2em"} />
                </IconButton>

                {addGroupModalVisible && <AddGroupModal handler={addGroupHandler} onClose={hideGroupModal} />}
            </>
            }
        </>
    );
};

export default GroupList;