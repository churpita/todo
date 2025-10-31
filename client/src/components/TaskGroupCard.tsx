import React from "react";
import { taskActions } from "./reducers/taskReducer";

import { TaskCard } from "./TaskCard";
import { ModalTaskGroup } from "./ModalTaskGroup";
import { ModalTask } from "./ModalTask";

import { Group } from "./types/Group";
import { Task } from "./types/Task";
import { TaskState, TaskAction } from "./reducers/taskReducer";

import styles from "./TaskGroupCard.module.css";

type Props = {
    members: Task[];
    attributes: Group;
    taskData: TaskState;
    taskDataDispatch: React.Dispatch<TaskAction>;
};

export const TaskGroupCard = (props: Props) => {
    const members = props.members;

    const totalTasks = props.members.length;
    const completedTasks = props.members.filter(
        (member) => member.is_completed == 1
    ).length;

    const titleStyle = {
        color: `#${props.attributes.color}`,
    };

    const addTaskHandler = async (member: Task) => {
        // If adding a first task/first task to a new group, -Infinity is the result of the Math.max query, so we want the sequence/key to be reset to 1 in those situations
        let newTaskKey =
            Math.max.apply(
                Math,
                props.taskData.content.members.map((member) => member.task_key!)
            ) + 1;
        if (Math.abs(newTaskKey) == Infinity) newTaskKey = 1;

        let newTaskSeq =
            Math.max.apply(
                Math,
                props.taskData.content.members
                    .filter(
                        (member) =>
                            member.task_group_key ==
                            props.attributes.task_group_key
                    )
                    .map((member) => member.sequence!)
            ) + 1;
        if (Math.abs(newTaskSeq) == Infinity) newTaskSeq = 1;

        const addTaskApiResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/add-task`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_group_key: props.attributes.task_group_key,
                    task_key: newTaskKey,
                    sequence: newTaskSeq,
                    title: member.title,
                    description: member.description,
                }),
            }
        );

        const addTaskApiJson = await addTaskApiResponse.json();

        if (addTaskApiJson.statusMessage) {
            throw new Error(addTaskApiJson.statusMessage);
        } else {
            props.taskDataDispatch({
                type: taskActions.ADD_GROUP_MEMBER,
                payload: {
                    task_group_key:
                        addTaskApiJson.content.newTask.task_group_key,
                    task_key: addTaskApiJson.content.newTask.task_key,
                    sequence: addTaskApiJson.content.newTask.sequence,
                    title: addTaskApiJson.content.newTask.title,
                    description: addTaskApiJson.content.newTask.description,
                },
            });
        }
    };

    const updateTaskHandler = async (member: Task) => {
        const updateTaskApiResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/update-task`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_key: member.task_key,
                    title: member.title,
                    description: member.description,
                }),
            }
        );

        const updateTaskApiJson = await updateTaskApiResponse.json();

        if (updateTaskApiJson.statusMessage) {
            throw new Error(updateTaskApiJson.statusMessage);
        } else {
            props.taskDataDispatch({
                type: taskActions.UPDATE_GROUP_MEMBER,
                payload: {
                    task_key: updateTaskApiJson.content.updatedTask.task_key,
                    title: updateTaskApiJson.content.updatedTask.title,
                    description:
                        updateTaskApiJson.content.updatedTask.description,
                },
            });
        }
    };

    const deleteTaskHandler = async (member: Task) => {
        const deleteTaskApiResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/delete-task`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_key: member.task_key,
                }),
            }
        );

        const deleteTaskApiJson = await deleteTaskApiResponse.json();

        if (deleteTaskApiJson.statusMessage)
            throw new Error(deleteTaskApiJson.statusMessage);
        else {
            props.taskDataDispatch({
                type: taskActions.DELETE_GROUP_MEMBER,
                payload: member,
            });
        }
    };

    const toggleTaskHandler = async (member: Task) => {
        const toggleTaskApiResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/toggle-task`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_key: member.task_key,
                }),
            }
        );

        const toggleTaskApiJson = await toggleTaskApiResponse.json();

        if (toggleTaskApiJson.statusMessage)
            throw new Error(toggleTaskApiJson.statusMessage);
        else {
            props.taskDataDispatch({
                type: taskActions.TOGGLE_GROUP_MEMBER,
                payload: member,
            });
        }
    };

    const updateGroupHandler = async (group: Group) => {
        if (group.action == "Save") {
            const updateGroupApiResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/update-group`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        task_group_key: props.attributes.task_group_key,
                        title: group.title,
                        color: group.color,
                    }),
                }
            );

            const updateGroupApiJson = await updateGroupApiResponse.json();

            if (updateGroupApiJson.statusMessage) {
                throw new Error(updateGroupApiJson.statusMessage);
            } else {
                props.taskDataDispatch({
                    type: taskActions.UPDATE_GROUP,
                    payload: {
                        task_group_key:
                            updateGroupApiJson.content.updatedGroupObj
                                .task_group_key,
                        title: updateGroupApiJson.content.updatedGroupObj.title,
                        color: updateGroupApiJson.content.updatedGroupObj.color,
                    },
                });
            }
        } else if (group.action == "Delete") {
            const deleteGroupApiResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/delete-group`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        task_group_key: props.attributes.task_group_key,
                    }),
                }
            );

            const deleteGroupApiJson = await deleteGroupApiResponse.json();

            if (deleteGroupApiJson.statusMessage) {
                throw new Error(deleteGroupApiJson.statusMessage);
            } else {
                props.taskDataDispatch({
                    type: taskActions.DELETE_GROUP,
                    payload: {
                        task_group_key: props.attributes.task_group_key,
                    },
                });
            }
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
                <h1 className={styles.cardTitle} style={titleStyle}>
                    {props.attributes.title}
                </h1>
                <div className={styles.groupCardTitleRightSide}>
                    <div>{`${completedTasks}/${totalTasks}`}</div>
                    <ModalTaskGroup
                        action="update"
                        attributes={props.attributes}
                        modalTitle="Update Group"
                        handler={updateGroupHandler}
                    />
                </div>
            </div>
            <div className={styles.cardGroupMembers}>
                {members.map((member) => {
                    return (
                        <TaskCard
                            key={member.sequence}
                            member={member}
                            toggleHandler={toggleTaskHandler}
                            updateHandler={updateTaskHandler}
                            deleteHandler={deleteTaskHandler}
                        />
                    );
                })}
                <ModalTask
                    action="add"
                    modalTitle="Add New Task"
                    handler={addTaskHandler}
                />
            </div>
        </div>
    );
};
