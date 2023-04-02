import React from "react";

import GroupMemberCard from "./GroupMemberCard";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const attrTitle = props.attributes.title;
    const attrColor = props.attributes.color;

    const members = props.members;

    const titleStyle = {
        color: `#${attrColor}`
    }

    return (
        <div className={styles.card}>
            <h1 className={styles.cardTitle} style={titleStyle}>{attrTitle}</h1>
            {members.map(member => {
                return (
                    <GroupMemberCard key={member.sequence} member={member} />
                );
            })}
        </div>
    );
}

export default GroupCard;