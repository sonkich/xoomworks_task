import React from 'react';
import styles from './Header.module.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <p>Xoomworks</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/employees">Employees</Link>
                    </li>
                    <li>
                        <Link to="/create-employee">Create</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;