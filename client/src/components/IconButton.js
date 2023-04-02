import React from "react";

import styles from './IconButton.module.css';

const IconButton = props => {
    return (
        <span className={styles.icon}>
            {props.children}
        </span>
    );
};

export default IconButton;