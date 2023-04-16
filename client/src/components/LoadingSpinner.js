import React from "react";

import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner = props => {
    return (
        <TailSpin 
            width={props.width} 
            height={props.height}
            color={props.color || "var(--theme-font-color)"}
        />
    );
} 

export default LoadingSpinner;