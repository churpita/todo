import React from "react";

import { MdDarkMode } from "react-icons/md";

import { IconButton } from "./IconButton";

import styles from "./Header.module.css";

interface IHeaderProps {
  toggleTheme: React.MouseEventHandler;
}

export const Header = (props: IHeaderProps): React.ReactElement => {
  return (
    <header className={styles.header}>
      <IconButton>
        <MdDarkMode onClick={props.toggleTheme} size={"2em"} />
      </IconButton>
    </header>
  );
};
