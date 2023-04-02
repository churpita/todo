import React from "react";

import GroupCard from "./GroupCard";

import styles from "./GroupList.module.css";

const GroupList = props => {
    const groups = props.data.groups;
    const allMembers = props.data.members;

    return (
        <div className={styles.groupList}>
            {groups.map(group => {
                return (
                    <GroupCard 
                        attributes={group} 
                        members={allMembers.filter(m => m.task_group_key == group.task_group_key)} 
                        key={group.task_group_key} 
                    />
                )
            })}
        </div>
    );
};

export default GroupList;