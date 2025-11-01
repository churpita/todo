import React from 'react';

import styles from './TaskCard.module.css';

import { CompleteTaskButton } from './CompleteTaskButton';
import { ModalTask } from './ModalTask';
import { ITask } from '../interfaces/ITask';

interface ITaskCardProps {
    member: ITask;
    updateHandler: (member: ITask) => void;
    toggleHandler: (member: ITask) => void;
    deleteHandler: (member: ITask) => void;
}

export const TaskCard = (props: ITaskCardProps): React.ReactElement => {
    const member = props.member;

    const memberCardDynamicStyle: React.CSSProperties = {
        opacity: member.is_completed == 1 ? `25%` : undefined,
    };

    return (
        <div className={styles.memberCard} style={memberCardDynamicStyle}>
            <div className={styles.memberCardTitleRow}>
                <div className={styles.memberCardTitle}>{member.title}</div>
                <div className={styles.memberCardButtonGroup}>
                    <CompleteTaskButton
                        onClick={() => props.toggleHandler(member)}
                        isCompleted={member.is_completed == 1 ? true : false}
                    />
                    <ModalTask
                        action="update"
                        attributes={member}
                        modalTitle="Update Task"
                        handler={props.updateHandler}
                    />
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
