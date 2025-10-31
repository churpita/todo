import React from "react";
import ReactDOM from "react-dom";

import { ModalBackdrop } from "./ModalBackdrop";
import { ModalOverlay } from "./ModalOverlay";

const portalElement = document.getElementById("overlays")!;

interface IModalProps {
  children: React.ReactNode;
  onClose: React.MouseEventHandler;
  title: string;
  loadingState?: boolean;
}

export const Modal = (props: IModalProps): React.ReactElement => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalBackdrop onClose={props.onClose} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          loadingState={props.loadingState}
          modalTitle={props.title}
        >
          {props.children}
        </ModalOverlay>,
        portalElement,
      )}
    </React.Fragment>
  );
};
