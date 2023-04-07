import React from "react";
import { tasksActions } from "./reducers/tasksReducer";

import GroupMemberCard from "./GroupMemberCard";
import ModalTaskGroup from "./ModalTaskGroup";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const members = props.members;

    const titleStyle = {
        color: `#${props.attributes.color}`
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
                type: tasksActions.UPDATE_GROUP, 
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
            {members.map(member => {
                return (
                    <GroupMemberCard key={member.sequence} member={member} />
                );
            })}
        </div>
    );
}

export default GroupCard;