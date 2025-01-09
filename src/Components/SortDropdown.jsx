import React from 'react';

const SortDropdown = ({ onSortChange }) => {
    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        onSortChange(sortOption);
    };
    return (
        <select onChange={handleSortChange}>
            <option value=""> Sort cards by </option>
            <option value="likes_count">likes</option>
            <option value="id">ID</option>
            <option value="message">alphabetical order</option>
        </select>
    );
};
export default SortDropdown;