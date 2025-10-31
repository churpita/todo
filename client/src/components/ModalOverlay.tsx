import { LoadingSpinner } from "./LoadingSpinner";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  children?: React.ReactNode;
  onClose?: React.MouseEventHandler;
  modalTitle?: string;
  loadingState?: boolean;
}

export const ModalOverlay = (props: IModalOverlayProps): React.ReactElement => {
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
