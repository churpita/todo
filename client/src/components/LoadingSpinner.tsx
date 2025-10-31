import { TailSpin } from "react-loader-spinner";

type Props = {
    color?: string;
    height: string;
    width: string;
};

export const LoadingSpinner = ({ color, width, height }: Props) => {
    return (
        <TailSpin
            width={width}
            height={height}
            color={color || "var(--theme-font-color)"}
        />
    );
};
