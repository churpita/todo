import React, { useState } from "react";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTaskGroup.module.css";

const ModalTaskGroup = props => {
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
                event.target.submitValue, // declares whether an update or delete is being performed
                event.target.groupTitle.value, 
                event.target.groupColor.value.substring(1)
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
                <Modal title={props.modalTitle} onClose={closeHandler} loadingState={loading} >
                    <form className={styles.modalForm} onSubmit={submitHandler} autoComplete="off">
                        <input 
                            name="groupTitle" 
                            type="text" 
                            placeholder="Group Name" 
                            defaultValue={props.attributes && props.attributes.title ? props.attributes.title : undefined}
                        />

                        <input 
                            name="groupColor" 
                            type="color" 
                            defaultValue={`#${props.attributes && props.attributes.color ? props.attributes.color : (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`}
                        />

                        {errorMessage && !loading && <div>{errorMessage}</div>}

                        <div className={styles.submitRow}>
                            {props.action === "add" && <input 
                                type="submit" 
                                value="Add" 
                                onClick={e => e.target.form.submitValue = e.target.value}
                                className={styles.goodSubmit}
                            />}

                            {props.action === "update" && <input 
                                type="submit" 
                                value="Save" 
                                onClick={e => e.target.form.submitValue = e.target.value}
                                className={styles.goodSubmit}
                            />}
                            {props.action === "update" && <input 
                                type="submit" 
                                value="Delete" 
                                onClick={e => e.target.form.submitValue = e.target.value}
                                className={styles.badSubmit} 
                            />}
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
                <IconButton style={{marginTop: "1rem"}}>
                    <MdAddCircleOutline size={"2rem"} onClick={e => setVisible(true)} />
                </IconButton>
            }

            {
                props.action === "update" &&
                <IconButton>
                    <MdEdit size="2rem" onClick={e => setVisible(true)} />
                </IconButton>
            }
        </>
    );
}

export default ModalTaskGroup;