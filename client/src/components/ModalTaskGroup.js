import React, { useState } from "react";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTaskGroup.module.css";

const ModalTaskGroup = props => {
    const [visible, setVisible] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
        
        props.handler(
            event.target.groupTitle.value, 
            event.target.groupColor.value.substring(1)
        );
        
        setVisible(false);
    }

    return (
        <>
            {
                visible &&
                <Modal title={props.modalTitle} onClose={e => setVisible(false)} >
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
                    <MdAddCircleOutline size={"2em"} onClick={e => setVisible(true)} />
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