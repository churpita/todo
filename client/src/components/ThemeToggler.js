import React from "react";

import { MdDarkMode } from "react-icons/md";

import styles from './ThemeToggler.module.css';

const ThemeToggler = props => {
    return (
        <span className={styles.icon}>
            <MdDarkMode onClick={props.onClick} size={"2em"} />
        </span>
    );
};

export default ThemeToggler;