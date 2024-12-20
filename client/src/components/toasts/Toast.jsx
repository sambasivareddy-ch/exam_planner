import React from "react";

import styles from '../../styles/toasts.module.css';

const Toast = (props) => {
    const {message, messageType} = props;

    let classes = `${styles['toast-wrapper']}`;
    if (messageType === 'info') {
        classes += ` ${styles['info']}`;
    } else if (messageType === 'warning') {
        classes += ` ${styles['warning']}`;
    } else if (messageType === 'failure') {
        classes += ` ${styles['failure']}`;
    } else if (messageType === 'success') {
        classes += ` ${styles['success']}`;
    } else if (messageType === 'loading') {
        classes += ` ${styles['loading']}`;
    } else if (messageType === 'error') {
        classes += ` ${styles['error']}`;
    }

    return (
        <div className={classes}>
            <p className={styles['message']}>
                {message}
            </p>
        </div>
    )
}

export default Toast;