import React from "react";

import GroupCard from "./GroupCard";

const GroupList = props => {
    const groups = props.data.groups;
    const allMembers = props.data.members;

    return (
        <div>
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