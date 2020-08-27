import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import React, {Component} from "react";
import './app.css';
import ItemAddForm from "../item-add-form/item-add-form";
import ItemStatusFilter from "../item-status-filter/item-status-filter";

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Build Awesome React App"),
            this.createTodoItem("Do not die")
        ],
        term: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    deletedItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            console.log(idx);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toggleProperty(todoData, id, 'important');
            return {
                todoData: newArray
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toggleProperty(todoData, id, 'done');
            return {
                todoData: newArray
            };
        });
    };

    toggleProperty(arr, id, propertyName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};

        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);
        return [...before, newItem, ...after];
    }

    onSearch = (text) => {
        this.setState({term: text});
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    render() {
        const {todoData, term} = this.state;
        const visibleItems = this.search(todoData, term);
        const doneCount = this.state.todoData.filter((el) => {
            return el.done;
        });
        const todoCount = this.state.todoData.length - doneCount.length;
        return (<div className='app-style'>
            <AppHeader toDo={todoCount} done={doneCount.length}/>
            <SearchPanel onSearch = {this.onSearch}/>
            <TodoList todos={visibleItems} onDeleted={this.deletedItem}
                      onToggleImportant={this.onToggleImportant}
                      onToggleDone={this.onToggleDone}/>
            <ItemAddForm onItemAdded={this.addItem}/>
        </div>);
    }
}
