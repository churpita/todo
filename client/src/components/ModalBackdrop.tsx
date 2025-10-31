import styles from "./ModalBackdrop.module.css";

interface IModalBackdropProps {
  onClose?: React.MouseEventHandler;
}

export const ModalBackdrop = (
  props: IModalBackdropProps,
): React.ReactElement => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};
