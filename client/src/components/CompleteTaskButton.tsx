import React from 'react';

import { MdOutlineCircle, MdCheckCircleOutline } from 'react-icons/md';

import styles from './CompleteTaskButton.module.css';

interface ICompleteTaskButtonProps {
    onClick: React.MouseEventHandler;
    isCompleted?: boolean;
}

export const CompleteTaskButton = (
    props: ICompleteTaskButtonProps
): React.ReactElement => {
    return (
        <div className={styles.buttonContainer} onClick={props.onClick}>
            {!props.isCompleted && (
                <MdOutlineCircle
                    size={'2rem'}
                    className={`${styles.fade} ${styles.topButton}`}
                />
            )}

            {!props.isCompleted && (
                <MdCheckCircleOutline
                    size={'2rem'}
                    className={`${styles.fade} ${styles.bottomButton}`}
                />
            )}

            {props.isCompleted && <MdCheckCircleOutline size={'2rem'} />}
        </div>
    );
};
