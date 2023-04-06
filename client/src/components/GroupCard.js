import React from "react";
import { MdEdit } from "react-icons/md";

import GroupMemberCard from "./GroupMemberCard";

import styles from "./GroupCard.module.css";
import IconButton from "./IconButton";

const GroupCard = props => {
    const attrTitle = props.attributes.title;
    const attrColor = props.attributes.color;

    const members = props.members;

    const titleStyle = {
        color: `#${attrColor}`
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
                <h1 className={styles.cardTitle} style={titleStyle}>{attrTitle}</h1>
                <IconButton>
                    <MdEdit size="2rem" />
                </IconButton>
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