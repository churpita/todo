import React from "react";

import IconButton from "./IconButton";

import { MdDarkMode } from "react-icons/md";

import styles from "./Header.module.css";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <IconButton>
                <MdDarkMode onClick={props.toggleTheme} size={"2em"} />
            </IconButton>
        </header>
    );
};

export default Header;
