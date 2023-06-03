import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import LoadingSpinner from "./LoadingSpinner.tsx";

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalTitleRow}>
                <h3>{props.modalTitle}</h3>
                {props.loadingState && (
                    <LoadingSpinner width="2rem" height="2rem" color="black" />
                )}
            </div>
            <div>{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    loadingState={props.loadingState}
                    modalTitle={props.title}
                >
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default Modal;
