import React from "react";

import styles from "./IconButton.module.css";

const IconButton = (props) => {
    return (
        <div
            className={styles.icon}
            style={{
                width: props.width,
                height: props.height,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
            }}
        >
            {props.children}
        </div>
    );
};

export default IconButton;
