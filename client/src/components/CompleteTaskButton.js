import React, { useState } from "react";

import { MdOutlineCircle, MdCheckCircleOutline } from "react-icons/md";

import styles from './CompleteTaskButton.module.css';

const CompleteTaskButton = props => {
    const [isHovering, setIsHovering] = useState(false);
    const mouseEnterHandler = e => setIsHovering(true);
    const mouseLeaveHandler = e => setIsHovering(false);

    return (
        <div className={styles.buttonContainer} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {!props.isCompleted && <MdCheckCircleOutline size={"2rem"} className={styles.fade} style={{ opacity: isHovering ? 1 : 0 }} />}
            {!props.isCompleted && <MdOutlineCircle size={"2rem"} className={styles.fade} />}

            {props.isCompleted && <MdCheckCircleOutline size={"2rem"} className={styles.fade} style={{ opacity: isHovering ? 0 : 1 }} />}
            {props.isCompleted && <MdOutlineCircle size={"2rem"} className={styles.fade} />}
        </div>
    )
}

export default CompleteTaskButton;