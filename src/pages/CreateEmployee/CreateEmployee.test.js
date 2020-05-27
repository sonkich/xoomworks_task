import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import CreateEmployee from './CreateEmployee';
import * as request from '../../utils/request';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Create employee render properly', () => {
    const {getByText} = render(<CreateEmployee/>);

    const pageTitle = getByText(/Create employee/i);
    expect(pageTitle).toBeInTheDocument();
});

test('Send correct values on submit', () => {
    render(<CreateEmployee/>);

    const salaryInput = screen.getByLabelText('Salary');
    fireEvent.change(salaryInput, { target: { value: '2300' } });

    expect(salaryInput.value).toBe('2300');

    request.default = jest.fn();

    request.default.mockReturnValue(Promise.resolve(true));

    fireEvent.submit(salaryInput, {});

    expect(request.default).toHaveBeenCalledTimes(1);
    expect(request.default).toHaveBeenCalledWith({
        data: {
            employee_name: '',
            employee_age: '',
            employee_salary: '2300'
        },
        method: 'post',
        url: '/employee'
    });
});
