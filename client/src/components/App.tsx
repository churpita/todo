import { useState } from "react";

import { Header } from "./Header";
import { TaskGroupList } from "./TaskGroupList";

import "./App.css";

export const App = (): React.ReactElement => {
  if (!localStorage.getItem("theme"))
    localStorage.setItem("theme", "app-theme-dark");

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const themeToggler = () => {
    setTheme((curr) => {
      const newTheme =
        curr === "app-theme-dark" ? "app-theme-light" : "app-theme-dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <div className={`app-container ${theme}`}>
      <Header toggleTheme={themeToggler} />
      <div className="body">
        <TaskGroupList />
      </div>
    </div>
  );
};
