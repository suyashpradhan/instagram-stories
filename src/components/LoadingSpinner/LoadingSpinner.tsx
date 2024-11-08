import React from 'react';
// @ts-ignore
import styles from "./LoadingSpinner.module.css"

const LoadingSpinner: React.FC = () => {
    return <div className={styles.loader}>Loading...</div>;
};

export default LoadingSpinner;
