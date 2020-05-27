import React from 'react';
import styles from './EmployeeList.module.scss';
import EmployeeRow from './EmployeeRow/EmployeeRow';
import PropTypes from 'prop-types';
import { EMPLOYEE_LIST_CONFIG } from '../../utils/constants';

const EmployeeList = (props) => {
    const handleHeaderClick = column => {
        if (column.sortable) {
            props.sort(column.key);
        }
    };

    const getSortSymbol = () => {
      if (props.sortingAscending) {
          return <>&#8595;</>;
      } else {
          return <>&#8593;</>;
      }
    };

    return (
        <div className={styles.employeeListWrapper}>
            <div className={styles.employeeListHeader}>
                {
                    EMPLOYEE_LIST_CONFIG.map(column => {
                        return <div className={styles.employeeListHeaderCell} key={column.key} onClick={() => {handleHeaderClick(column)}}>
                            {column.title}
                            {props.sortingKey === column.key ? <span>{getSortSymbol()}</span> : null}
                        </div>
                    })
                }
                <div className={styles.employeeListHeaderCell}>Actions</div>
            </div>
            <div className={styles.employeeListBody}>
                {
                    props.employees.map(employee => {
                        return <EmployeeRow deleteEmployee={props.deleteEmployee} employee={employee} key={employee.id} />
                    })
                }
            </div>
        </div>
    );
};

EmployeeList.propTypes = {
    employees: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired,
    sortingAscending: PropTypes.bool.isRequired,
    sortingKey: PropTypes.string.isRequired,
    deleteEmployee: PropTypes.func.isRequired
};

export default EmployeeList;