import React from "react";

import styles from "./IconButton.module.css";

type Props = {
    children: React.ReactNode;
    height?: string;
    marginTop?: string;
    marginBottom?: string;
    width?: string;
};

export const IconButton = (props: Props) => {
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
