import React from "react";

import styles from "./GroupCard.module.css";

const GroupCard = props => {
    const titleStyle = {
        color: `#${props.attributes.color}`
    }

    return (
        <div className={styles.card}>
            <h1 className={styles.cardTitle} style={titleStyle}>{props.attributes.title}</h1>
            {props.children}
        </div>
    );
}

export default GroupCard;