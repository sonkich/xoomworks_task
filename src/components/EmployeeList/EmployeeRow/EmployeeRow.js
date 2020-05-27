import React  from 'react';
import styles from './EmployeeRow.module.scss';
import PropTypes from 'prop-types';
import { EMPLOYEE_LIST_CONFIG } from '../../../utils/constants';
import { Link } from 'react-router-dom';

const EmployeeRow = (props) => {
    const { employee, deleteEmployee } = props;

    return (
        <div className={styles.rowWrapper}>
            {
                EMPLOYEE_LIST_CONFIG.map(column => {
                    return <div key={column.key} className={styles.cell}>
                        {employee[column.key]}
                    </div>
                })
            }
            <div className={styles.cell}>
                <button><Link to={`/employees/${employee.id}`}>Edit</Link></button>
                <button onClick={() => {deleteEmployee(employee.id)}}>Delete</button>
            </div>
        </div>
    );
};

EmployeeRow.propTypes = {
    employee: PropTypes.object.isRequired,
    deleteEmployee: PropTypes.func.isRequired
};

export default EmployeeRow;