import React from 'react';
import './search-input.css';
import ItemStatusFilter from "../item-status-filter/item-status-filter";

const SearchPanel = () => {
    return (
        <div className='d-flex mb-3'>
            <input className='search-input' placeholder='type to search'/>
            <ItemStatusFilter/>
        </div>);
};

export default SearchPanel;