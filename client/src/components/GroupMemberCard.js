import React, { useState } from "react";

import styles from "./GroupMemberCard.module.css";
import CompleteTaskButton from "./CompleteTaskButton";

const GroupMemberCard = props => {
    const member = props.member;

    const memberCardDynamicStyle = {
        opacity: member.is_completed ? `25%` : null
    }

    console.log(member);

    return (
        <div className={styles.memberCard} style={memberCardDynamicStyle} >
            <div className={styles.memberCardTitleRow}>
                <div>{member.title}</div>
                <CompleteTaskButton onClick={e => props.toggleHandler(member)} isCompleted={member.is_completed == 1 ? true : false} />
            </div>
            <div>
                {member.description}
            </div>
        </div>
    );
}

export default GroupMemberCard;