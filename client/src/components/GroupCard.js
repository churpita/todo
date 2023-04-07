import React from "react";

import GroupMemberCard from "./GroupMemberCard";
import ModalTaskGroup from "./ModalTaskGroup";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const members = props.members;

    const titleStyle = {
        color: `#${props.attributes.color}`
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
                <h1 className={styles.cardTitle} style={titleStyle}>{props.attributes.title}</h1>
                <ModalTaskGroup 
                    action="update"
                    attributes={props.attributes}
                    modalTitle="Update Group"
                    handler={e => alert(1)} 
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