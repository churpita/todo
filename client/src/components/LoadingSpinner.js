import React from "react";

import { TailSpin } from 'react-loader-spinner';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
    return (
        <TailSpin wrapperClass={styles.loadingSpinner} />
    );
} 

export default LoadingSpinner;