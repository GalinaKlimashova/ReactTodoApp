import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

    constructor(props) {
        super(props);

        this.onClickHandler = () => {
            this.setState((state) => {
               return  {done: !state.done};
            });
        };

        this.state = {
            done: false
        };

        this.onMarkImportant = () => {
            this.setState((state) => {
               return  {important: !state.important};
            });
        }
    }

    render() {

        const {label, onDeleted} = this.props;
        const {done, important = false} = this.state;


        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
            <span onClick={this.onClickHandler} className='todo-list-item-label'>
                {label}
            </span>

            <button type='button' className='btn btn-outline-success btn-sm float-right'
                    onClick={this.onMarkImportant}>
                <i className='fa fa-exclamation'/>
            </button>
                <button type='button' className='btn btn-outline-danger btn-sm float-right'
                onClick={onDeleted}>
                <i className='fa fa-trash-o'/>
            </button>
        </span>
        );
    }
}
