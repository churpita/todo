import React from "react";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const attrTitle = props.attributes.title;
    const attrColor = props.attributes.color;

    const titleStyle = {
        color: `#${attrColor}`
    }

    return (
        <div className={styles.card}>
            <h1 className={styles.cardTitle} style={titleStyle}>{attrTitle}</h1>
            {props.children}
        </div>
    );
}

export default GroupCard;