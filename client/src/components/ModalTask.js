import React, { useState } from "react";
import { MdAdd, MdEdit } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTask.module.css";

const ModalTask = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const closeHandler = (e) => {
        setVisible(false);
        setLoading(false);
        setErrorMessage(null);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setLoading(true);
        try {
            switch (props.action) {
                case "add":
                    await props.handler(
                        event.target.taskTitle.value,
                        event.target.taskDescription.value
                    );
                    break;
                case "update":
                    await props.handler(
                        props.attributes.task_key,
                        event.target.taskTitle.value,
                        event.target.taskDescription.value
                    );
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
