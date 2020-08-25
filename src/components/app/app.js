import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import React, {Component} from "react";
import './app.css';
import ItemAddForm from "../item-add-form/item-add-form";

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            {label: "Drink Coffee", important: false, id: 1},
            {label: "Build Awesome React App", important: true, id: 2},
            {label: "Do not die", important: false, id: 3},
        ]
    };

    deletedItem = (id) => {
        console.log(id);
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            console.log(idx);
            // todoData.splice(idx,1);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });
    };

    render() {
        return (<div className='app-style'>
            <AppHeader/>
            <SearchPanel/>
            <TodoList todos={this.state.todoData} onDeleted={this.deletedItem}/>
            <ItemAddForm onItemAdded={this.addItem}/>
        </div>);
    }
}
