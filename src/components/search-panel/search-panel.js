import React, {Component} from 'react';
import './search-input.css';
import ItemStatusFilter from "../item-status-filter/item-status-filter";


export  default class SearchPanel extends Component{
    state = {
        label:''
    };

    onLabelChange = (e) =>{
        this.setState({label: e.target.value});
        this.props.onSearch(e.target.value);
    };

    render() {
        return (
            <div className='d-flex mb-3'>
                <input type="text" className='search-input form-control' placeholder='type to search'
                       value = {this.state.label}
                       onChange={this.onLabelChange}/>
                <ItemStatusFilter/>
            </div>);
    }
};

