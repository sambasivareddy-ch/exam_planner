import React from 'react';

import styles from "../../styles/database.module.css";

const DatabaseHeader = ({buttonInfos, currentIndex}) => {
    return (
        <nav className={styles['database-header_nav']}>
            {buttonInfos.map((info, idx) => {
                return (
                    <button
                        onClick={() => {info.clickHandler()}}
                        key={Math.random()}
                        className={currentIndex === idx ? styles['btn-selected']: ""}
                    >
                        {info.name}
                    </button>
                )
            })}
        </nav>
    )
}

export default DatabaseHeader;