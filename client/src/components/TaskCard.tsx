import React from "react";

import { MdDeleteOutline } from "react-icons/md";

import styles from "./TaskCard.module.css";

import CompleteTaskButton from "./CompleteTaskButton";
import IconButton from "./IconButton";
import ModalTask from "./ModalTask";

import { Task } from "./types/Task";

type Props = {
    member: Task;
    updateHandler: (member: Task) => {};
    toggleHandler: (member: Task) => {};
    deleteHandler: (member: Task) => {};
};

export const TaskCard = (props: Props) => {
    const member = props.member;

    const memberCardDynamicStyle: React.CSSProperties = {
        opacity: member.is_completed == 1 ? `25%` : undefined,
    };

    return (
        <div className={styles.memberCard} style={memberCardDynamicStyle}>
            <div className={styles.memberCardTitleRow}>
                <div className={styles.memberCardTitle}>{member.title}</div>
                <div className={styles.memberCardButtonGroup}>
                    <ModalTask
                        action="update"
                        attributes={member}
                        modalTitle="Update Task"
                        handler={props.updateHandler}
                    />
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
