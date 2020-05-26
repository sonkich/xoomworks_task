import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.innerWrapper}>
                <p className={styles.headerTitle}>Xoomworks</p>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink to="/employees">Employees</NavLink>
                        </li>
                        <li>
                            <NavLink to="/create-employee">Create</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;