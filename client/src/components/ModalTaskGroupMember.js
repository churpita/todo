import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTaskGroupMember.module.css";

const ModalTaskGroupMember = props => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const closeHandler = e => {
        setVisible(false);
        setLoading(false);
        setErrorMessage(null);
    }

    const submitHandler = async event => {
        event.preventDefault();
        setErrorMessage(null);
        setLoading(true);
        try {
            await props.handler(
                event.target.taskTitle.value, 
                event.target.taskDescription.value
            );
            setLoading(false);
            setVisible(false);
        }
        catch (err) {
            // Vague error message for security purposes
            setLoading(false);
            setErrorMessage('An error occurred.');
        }
    }

    return (
        <>
            {
                visible &&
                <Modal title={props.modalTitle} onClose={closeHandler} loadingState={loading}>
                    <form className={styles.modalForm} onSubmit={submitHandler} autoComplete="off">
                        <input 
                            name="taskTitle" 
                            type="text" 
                            placeholder="Task Title" 
                        />

                        <textarea 
                            name="taskDescription"
                            placeholder="Task Description"
                            rows={4}
                        />

                        {errorMessage && !loading && <div>{errorMessage}</div>}

                        <div>
                            <input type="submit" value="Save"/>
                        </div>
                    </form>
                </Modal>
            }

            {/* 
                This modal is reused for both add and update, but triggered with different buttons.
                Instead of separating the buttons and the modal, this component handles both but uses portals to render the Modal.
                The main purpose: modal visibility state is handled within the component, and therefore reduces unnecessary refreshes of other components
            */}

            {
                props.action === "add" &&
                <IconButton>
                    <MdAdd size="2rem" onClick={e => setVisible(true)} />
                </IconButton>
            }
        </>
    );
}

export default ModalTaskGroupMember;