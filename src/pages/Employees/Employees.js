import React, { useEffect, useState } from 'react';
import request from '../../utils/request';
import { EmployeeList } from '../../components';
import { isEqual } from 'lodash';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [sortingKey, setSortingKey] = useState('');
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
        const newEmployees = [...employees].sort((employee1, employee2) => {
            if (sortingAscending) {
                return employee1[sortingKey] - employee2[sortingKey];
            } else {
                return employee2[sortingKey] - employee1[sortingKey];
            }
        });

        if(!isEqual(employees, newEmployees)) {
            setEmployees(newEmployees);
        }
    }, [sortingKey, sortingAscending, employees]);

    useEffect(() => {
        getEmployeeList();
    }, []);

    const getEmployeeList = () => {
        request({
            url: '/employee'
        }).then(response => {
            setEmployees(response);
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

    return (
        <div>
            <EmployeeList deleteEmployee={deleteEmployee} employees={employees} sortingKey={sortingKey} sortingAscending={sortingAscending} sort={sortEmployees}/>
        </div>
    );
};

export default Employees;