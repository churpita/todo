import React from "react";

import ThemeToggler from "./ThemeToggler";

import styles from './Header.module.css';

const Header = props => {
    return (
        <header className={styles.header}>
            <ThemeToggler onClick={props.toggleTheme} />
        </header>
    );
}

export default Header;