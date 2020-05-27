import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import request from '../../utils/request';
import { Form } from '../../components';

const formConfig = [
    {
        title: 'ID',
        key: 'id',
        editable: false,
        type: 'text'
    },
    {
        title: 'Name',
        key: 'employee_name',
        editable: true,
        type: 'text'
    },
    {
        title: 'Age',
        key: 'employee_age',
        editable: true,
        type: 'number'
    },
    {
        title: 'Salary',
        key: 'employee_salary',
        editable: true,
        type: 'number'
    }
];

const Employee = (props) => {
    let {employeeId} = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        getEmployee(employeeId);
    }, [employeeId]);

    const getEmployee = (employeeId) => {
        request({
            url: `/employee/${employeeId}`
        }).then(response => {
            setEmployee(response);
        }).catch(error => {
            console.error(error);
        });
    };

    const handleSubmit = (event) => {
        request({
            method: 'put',
            url: `/employee/${employeeId}`,
            data: employee
        }).then(response => {
            alert('success');
        }).catch(error => {
            console.error(error);
        });
    };

    const handleChange = (key, value) => {
      const newEmployee = {...employee};

      newEmployee[key] = value;

      setEmployee(newEmployee);
    };

    return (
        <div>
            {
                employee ? <Form title="Edit employee" change={handleChange} save={handleSubmit} data={employee} config={formConfig}/> : null
            }
        </div>
    );
};

export default Employee;