import React, { useState } from "react";
import { MdAdd, MdEdit } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTask.module.css";
import { Task } from "./types/Task";

type Props = {
    action: string;
    attributes?: Task;
    modalTitle: string;
    handler: (member: Task) => {};
};

interface FormElements extends HTMLFormElement {
    taskTitle: HTMLInputElement;
    taskDescription: HTMLInputElement;
}

export const ModalTask = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const closeHandler = () => {
        setVisible(false);
        setLoading(false);
        setErrorMessage(undefined);
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(undefined);
        setLoading(true);
        try {
            switch (props.action) {
                case "add":
                    await props.handler({
                        task_key: undefined,
                        title: (event.target as FormElements).taskTitle.value,
                        description: (event.target as FormElements)
                            .taskDescription.value,
                    });
                    break;
                case "update":
                    await props.handler({
                        task_key: props.attributes!.task_key,
                        title: (event.target as FormElements).taskTitle.value,
                        description: (event.target as FormElements)
                            .taskDescription.value,
                    });
                    break;
            }
            setLoading(false);
            setVisible(false);
        } catch (err) {
            // Vague error message for security purposes
            setLoading(false);
            setErrorMessage("An error occurred.");
        }
    };

    return (
        <>
            {visible && (
                <Modal
                    title={props.modalTitle}
                    onClose={closeHandler}
                    loadingState={loading}
                >
                    <form
                        className={styles.modalForm}
                        onSubmit={submitHandler}
                        autoComplete="off"
                    >
                        <input
                            name="taskTitle"
                            type="text"
                            maxLength={128}
                            placeholder="Task Title"
                            defaultValue={
                                props.attributes && props.attributes.title
                                    ? props.attributes.title
                                    : undefined
                            }
                        />

                        <textarea
                            name="taskDescription"
                            maxLength={1024}
                            placeholder="Task Description"
                            rows={4}
                            defaultValue={
                                props.attributes && props.attributes.description
                                    ? props.attributes.description
                                    : undefined
                            }
                        />

                        {errorMessage && !loading && <div>{errorMessage}</div>}

                        <div>
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </Modal>
            )}

            {/* 
                This modal is reused for both add and update, but triggered with different buttons.
                Instead of separating the buttons and the modal, this component handles both but uses portals to render the Modal.
                The main purpose: modal visibility state is handled within the component, and therefore reduces unnecessary refreshes of other components
            */}

            {props.action === "add" && (
                <IconButton marginTop="1rem" marginBottom="0">
                    <MdAdd size="2rem" onClick={(e) => setVisible(true)} />
                </IconButton>
            )}

            {props.action === "update" && (
                <IconButton height="2rem">
                    <MdEdit size="2rem" onClick={(e) => setVisible(true)} />
                </IconButton>
            )}
        </>
    );
};

export default ModalTask;
