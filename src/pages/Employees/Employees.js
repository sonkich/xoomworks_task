import React, { useEffect, useState } from 'react';
import request from '../../utils/request';
import { EmployeeList, SearchInput } from '../../components';
import styles from './Employees.module.scss';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [originalEmployees, setOriginalEmployees] = useState([]);
    const [sortingKey, setSortingKey] = useState('');
    const [search, setSearch] = useState('');
    const [sortingAscending, setSortingAscending] = useState(true);

    const sortEmployees = key => {
        if (key !== sortingKey) {
            setSortingKey(key);
            setSortingAscending(true);
        } else {
            setSortingAscending(!sortingAscending);
        }
    };

    useEffect(() => {
        let newEmployees = [...originalEmployees];

        if (search) {
            newEmployees = newEmployees.filter(employee => {
                const name = employee.employee_name.toLocaleLowerCase();
                return name.includes(search.toLocaleLowerCase());
            });
        }

        newEmployees = newEmployees.sort((employee1, employee2) => {
            if (sortingAscending) {
                return employee1[sortingKey] - employee2[sortingKey];
            } else {
                return employee2[sortingKey] - employee1[sortingKey];
            }
        });

        setEmployees(newEmployees);
    }, [sortingKey, sortingAscending, originalEmployees, search]);

    useEffect(() => {
        getEmployeeList();
    }, []);

    const getEmployeeList = () => {
        request({
            url: '/employee'
        }).then(response => {
            setOriginalEmployees(response);
        }).catch(error => {
            console.error(error);
        })
    };

    const deleteEmployee = employeeId => {
        request({
            url: `/employee/${employeeId}`,
            method: 'delete'
        }).then(response => {
            getEmployeeList();
        }).catch(error => {
            console.error(error);
        })
    };

    const changeSearch = search => {
        setSearch(search);
    };

    return (
        <div>
            <div className={styles.searchWrapper}><SearchInput value={search} change={changeSearch} /></div>
            <EmployeeList deleteEmployee={deleteEmployee} employees={employees} sortingKey={sortingKey} sortingAscending={sortingAscending} sort={sortEmployees}/>
        </div>
    );
};

export default Employees;