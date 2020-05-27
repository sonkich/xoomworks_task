import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import Form from './Form';

const change = jest.fn();
const save = jest.fn();
const defaultConfig = [];
const data = {};

test('Form render with default title', () => {
    const {getByText} = render(<Form change={change} save={save} config={defaultConfig} data={data}/>);

    const pageTitle = getByText(/form/i);
    expect(pageTitle).toBeInTheDocument();
});


test('Form render with custom title', () => {
    const {getByText} = render(<Form change={change} save={save} config={defaultConfig} data={data} title="Testing title"/>);

    const pageTitle = getByText(/Testing title/i);
    expect(pageTitle).toBeInTheDocument();
});

test('Form render with default button text', () => {
    const {getByText} = render(<Form change={change} save={save} config={defaultConfig} data={data}/>);

    const pageTitle = getByText(/save/i);
    expect(pageTitle).toBeInTheDocument();
});

test('Form render with custom button text', () => {
    const {getByText} = render(<Form change={change} save={save} config={defaultConfig} data={data} buttonText="testing button text"/>);

    const pageTitle = getByText(/testing button text/i);
    expect(pageTitle).toBeInTheDocument();
});

test('Render inputs properly', () => {
    const config = [
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
    ];
    const { container } = render(<Form change={change} save={save} config={config} data={data}/>);

    const inputCount = container.querySelectorAll('input').length;
    expect(inputCount).toBe(2);
});

test('Disable inputs properly', () => {
    const config = [
        {
            title: 'Name',
            key: 'employee_name',
            editable: false,
            type: 'text'
        },
        {
            title: 'Age',
            key: 'employee_age',
            editable: true,
            type: 'number'
        },
    ];
    render(<Form change={change} save={save} config={config} data={data}/>);

    const nameInput = screen.getByLabelText('Name');
    const ageInput = screen.getByLabelText('Age');

    expect(nameInput.disabled).toBe(true);
    expect(ageInput.disabled).toBe(false);
});

test('Invoke save function on submit', () => {
    render(<Form change={change} save={save} config={defaultConfig} data={data}/>);

    const submitButton = screen.getByTestId('form-submit-button');

    fireEvent.click(submitButton);

    expect(save).toHaveBeenCalledTimes(1);
});

test('Invoke change function on input change', () => {
    const config = [
        {
            title: 'Name',
            key: 'employee_name',
            editable: true,
            type: 'text'
        }
    ];

    render(<Form change={change} save={save} config={config} data={data}/>);

    const nameInput = screen.getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: 'Name change' } });

    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('employee_name', 'Name change');
});