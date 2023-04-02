import React from "react";

import Modal from "./Modal";

import styles from "./AddGroupModal.module.css";

const AddGroupModal = props => {
    const submitHandler = event => {
        event.preventDefault();

        const title = event.target.groupTitle.value;
        const color = event.target.groupColor.value;
        
        props.handler(title, color.substring(1));
        props.onClose();
    }

    return (
        <Modal title="Create New Group" onClose={props.onClose} >
            <form className={styles.modalForm} onSubmit={submitHandler} autoComplete="off">
                <input name="groupTitle" type="text" placeholder="Group Name"/>

                <input name="groupColor" type="color" defaultValue={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`}/>

                <div>
                    <input type="submit" value="Create"/>
                </div>
            </form>
        </Modal>
    );
}

export default AddGroupModal;