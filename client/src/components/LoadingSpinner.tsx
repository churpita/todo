import React from "react";

import { TailSpin } from "react-loader-spinner";

type Props = {
    color: string;
    height: number;
    width: number;
};

const LoadingSpinner = ({ color, width, height }: Props) => {
    return (
        <TailSpin
            width={width}
            height={height}
            color={color || "var(--theme-font-color)"}
        />
    );
};

export default LoadingSpinner;
