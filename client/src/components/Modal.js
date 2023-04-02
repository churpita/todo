import React from "react";
import ReactDOM from "react-dom";

import styles from './Modal.module.css';

const portalElement = document.getElementById('overlays');

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onClose} />
}

const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>{props.modalTitle}</h3>
            <div>
                {props.children}
            </div>
        </div>
    );
}

const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay modalTitle={props.title}>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    );
}

export default Modal;