import React from "react";

import { MdDeleteOutline } from "react-icons/md";

import styles from "./TaskCard.module.css";

import CompleteTaskButton from "./CompleteTaskButton";
import IconButton from "./IconButton";

const TaskCard = (props) => {
    const member = props.member;

    const memberCardDynamicStyle = {
        opacity: member.is_completed ? `25%` : null,
    };

    return (
        <div className={styles.memberCard} style={memberCardDynamicStyle}>
            <div className={styles.memberCardTitleRow}>
                <div>{member.title}</div>
                <div className={styles.memberCardButtonGroup}>
                    <CompleteTaskButton
                        onClick={(e) => props.toggleHandler(member)}
                        isCompleted={member.is_completed == 1 ? true : false}
                    />
                    <IconButton height="2rem" width="2rem">
                        <MdDeleteOutline
                            size={"2rem"}
                            onClick={(e) => props.deleteHandler(member)}
                        />
                    </IconButton>
                </div>
            </div>
            {member.description && (
                <div className={styles.memberCardDescriptionRow}>
                    {member.description}
                </div>
            )}
        </div>
    );
};

export default TaskCard;
