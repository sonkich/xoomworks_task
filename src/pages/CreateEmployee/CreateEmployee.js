import React, { useState } from 'react';
import request from '../../utils/request';
import { Form } from '../../components';
import { useHistory } from "react-router-dom";

const formConfig = [
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

const employeeTemplate = {
    employee_name: '',
    employee_age: '',
    employee_salary: ''
};

const CreateEmployee = () => {
    const [employee, setEmployee] = useState(employeeTemplate);
    const history = useHistory();

    const handleSubmit = (event) => {
        request({
            method: 'post',
            url: `/employee`,
            data: employee
        }).then(response => {
            history.push('/employees');
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
                employee ? <Form title="Create employee" change={handleChange} save={handleSubmit} data={employee} config={formConfig} buttonText={'Create'}/> : null
            }
        </div>
    );
};

export default CreateEmployee;