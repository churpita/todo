import React from "react";

import GroupCard from "./GroupCard";

const GroupList = props => {
    const data = props.data;

    return (
        <div>
            {data.map(group => {
                return (
                    <GroupCard attributes={group} key={group.task_group_key} />
                )
            })}
        </div>
    );
};

export default GroupList;