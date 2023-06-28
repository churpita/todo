import React from "react";

import IconButton from "./IconButton";

import { MdDarkMode } from "react-icons/md";

import styles from "./Header.module.css";

type Props = {
    toggleTheme: React.MouseEventHandler;
};

export const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <IconButton>
                <MdDarkMode onClick={props.toggleTheme} size={"2em"} />
            </IconButton>
        </header>
    );
};

export default Header;
