import React from "react";
import { taskActions } from "./reducers/taskReducer";

import GroupMemberCard from "./GroupMemberCard";
import ModalTaskGroup from "./ModalTaskGroup";
import ModalTaskGroupMember from "./ModalTaskGroupMember";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const members = props.members;

    const titleStyle = {
        color: `#${props.attributes.color}`
    }

    const addTaskHandler = async (title, description) => {
        const newTaskKey = Math.max.apply(Math, props.taskData.content.members.map(member => member.task_key)) + 1;
        let newTaskSeq = Math.max.apply(Math, props.taskData.content.members.filter(member => member.task_group_key == props.attributes.task_group_key).map(member => member.sequence)) + 1;
        if (Math.abs(newTaskSeq) == Infinity) newTaskSeq = 1; // If adding the first task to a new group, -Infinity is the result of the Math.max query, so we want the sequence to be reset to 1

        const addTaskApiResponse = await fetch(`${process.env.REACT_APP_API_URL}/add-task`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_group_key: props.attributes.task_group_key,
                task_key: newTaskKey,
                sequence: newTaskSeq,
                title: title,
                description: description
            })
        })

        const addTaskApiJson = await addTaskApiResponse.json();

        if (addTaskApiJson.statusMessage) {
            throw new Error(addTaskApiJson.statusMessage);
        }
        else {
            props.taskDataDispatch({ 
                type: taskActions.ADD_GROUP_MEMBER, 
                payload: {
                    task_group_key: addTaskApiJson.content.newTask.task_group_key,
                    task_key: addTaskApiJson.content.newTask.task_key,
                    sequence: addTaskApiJson.content.newTask.sequence,
                    title: addTaskApiJson.content.newTask.title,
                    description: addTaskApiJson.content.newTask.description 
                } 
            });
        }
    }

    const updateGroupHandler = async (title, color) => {
        const updateGroupApiResponse = await fetch(`${process.env.REACT_APP_API_URL}/update-group`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_group_key: props.attributes.task_group_key,
                title: title,
                color: color
            })
        })

        const updateGroupApiJson = await updateGroupApiResponse.json();

        if (updateGroupApiJson.statusMessage) {
            throw new Error(updateGroupApiJson.statusMessage);
        }
        else {
            props.taskDataDispatch({ 
                type: taskActions.UPDATE_GROUP, 
                payload: {
                    task_group_key: updateGroupApiJson.content.updatedGroupObj.task_group_key,
                    title: updateGroupApiJson.content.updatedGroupObj.title,
                    color: updateGroupApiJson.content.updatedGroupObj.color 
                } 
            });
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
                <h1 className={styles.cardTitle} style={titleStyle}>{props.attributes.title}</h1>
                <ModalTaskGroup 
                    action="update"
                    attributes={props.attributes}
                    modalTitle="Update Group"
                    handler={updateGroupHandler} 
                />
            </div>
            <div className={styles.cardGroupMembers}>
                {members.map(member => {
                    return (
                        <GroupMemberCard key={member.sequence} member={member} />
                    );
                })}
                <ModalTaskGroupMember 
                    action="add"
                    modalTitle="Add New Task"
                    handler={addTaskHandler}
                />
            </div>
        </div>
    );
}

export default GroupCard;