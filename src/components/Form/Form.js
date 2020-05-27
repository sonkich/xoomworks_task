import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.scss';

const Form = (props) => {
    const {config, data, save, change, buttonText, title} = props;

    const handleSubmit = (event) => {
      event.preventDefault();
      save(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {
                title ? <h2 className={styles.title}>{title}</h2> : null
            }
            {
                config.map(field => {
                    return <div className={styles.fieldWrapper} key={field.key}>
                        <label className={styles.label} htmlFor={field.key}>{field.title}</label>
                        <input
                            className={styles.input}
                            type={field.type}
                            name={field.key}
                            value={data[field.key]}
                            id={field.key}
                            disabled={!field.editable}
                            onChange={(event) => {
                                change(field.key, event.target.value);
                            }}
                        />
                    </div>;
                })
            }
            <div className={styles.buttonWrapper}>
                <button data-testid="form-submit-button" type="submit">{buttonText}</button>
            </div>
        </form>
    );
};

Form.propTypes = {
    config: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    buttonText: PropTypes.string,
    save: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    title: PropTypes.string
};

Form.defaultProps = {
    buttonText: 'Save',
    title: 'Form'
};

export default Form;