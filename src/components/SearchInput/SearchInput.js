import React, { useRef, useState } from "react";
import { debounce } from "lodash";
import PropTypes from 'prop-types';
import styles from './SearchInput.module.scss';

const SearchInput = (props) => {
    const { value, change } = props;
    const [search, setSearch] = useState(value);
    const handler = useRef(debounce(searchPhrase => { change(searchPhrase)}, 400)).current;

    const onChange = (event) => {
        setSearch(event.target.value);
        handler(event.target.value);
    };

    return (
        <div className={styles.searchWrapper}>
            <label htmlFor="search-input">Search</label>
            <input type="text" value={search} id="search-input" onChange={onChange}/>
        </div>
    );
};

SearchInput.propTypes = {
    value: PropTypes.string,
    change: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
    value: ''
};

export default SearchInput;