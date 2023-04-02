import React from "react";

import styles from "./GroupMemberCard.module.css";

const GroupMemberCard = props => {
    const member = props.member;

    return (
        <div className={styles.memberCard}>
            <div className={styles.memberCardTitle}>
                {member.title}
            </div>
            <div>
                {member.description}
            </div>
        </div>
    );
}

export default GroupMemberCard;