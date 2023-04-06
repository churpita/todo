import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import Modal from "./Modal";
import IconButton from "./IconButton";

import styles from "./ModalTaskGroup.module.css";

const ModalTaskGroup = props => {
    const [visible, setVisible] = useState(false);

    const submitHandler = event => {
        event.preventDefault();

        const title = event.target.groupTitle.value;
        const color = event.target.groupColor.value;
        
        props.handler(title, color.substring(1));
        setVisible(false);
    }

    return (
        <>
            {
                visible &&
                <Modal title={props.modalTitle} onClose={e => setVisible(false)} >
                    <form className={styles.modalForm} onSubmit={submitHandler} autoComplete="off">
                        <input name="groupTitle" type="text" placeholder="Group Name"/>

                        <input name="groupColor" type="color" defaultValue={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`}/>

                        <div>
                            <input type="submit" value="Save"/>
                        </div>
                    </form>
                </Modal>
            }

            <IconButton>
                <MdAddCircleOutline size={"2em"} onClick={e => setVisible(true)} />
            </IconButton>
        </>
    );
}

export default ModalTaskGroup;