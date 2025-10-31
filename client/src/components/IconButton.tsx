import styles from './IconButton.module.css';

interface IIconButtonProps {
    children: React.ReactNode;
    height?: string;
    marginTop?: string;
    marginBottom?: string;
    width?: string;
}

export const IconButton = (props: IIconButtonProps): React.ReactElement => {
    return (
        <div
            className={styles.icon}
            style={{
                width: props.width,
                height: props.height,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
            }}
        >
            {props.children}
        </div>
    );
};
