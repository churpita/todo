import React from "react";

import IconButton from "./IconButton";

import { MdAddCircleOutline, MdDarkMode } from "react-icons/md";

import styles from './Header.module.css';

const Header = props => {
    return (
        <header className={styles.header}>
            <IconButton>
                <MdAddCircleOutline onClick={e => props.addGroup("School Tasks", '2bb32b')} size={"2em"} />
            </IconButton>
            <IconButton>
                <MdDarkMode onClick={props.toggleTheme} size={"2em"} />
            </IconButton>
        </header>
    );
}

export default Header;