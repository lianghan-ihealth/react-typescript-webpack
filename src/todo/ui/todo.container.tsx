import * as React from "react";

import TodoComponent from './todo.component.tsx';

import * as TodoModel from './../todo.model.ts';
import * as TodoService from './../todo.service.ts';

import { Todo } from './../todo.interface.ts';

export default class TodoContainer extends React.Component<{}, TodoContainerState> {

    constructor(props) {
        super(props);
        this.state = this._buildState();
    }

    componentDidMount() { TodoModel.observable.addListener(this._onModelUpdate.bind(this)); }
    componentWillUnmount() { TodoModel.observable.removeListener(this._onModelUpdate.bind(this)); }

    _onModelUpdate() {
        this.setState(this._buildState());
    }

    _buildState() {
        return {
            todos: TodoModel.getTodos()
        }
    }

    addTodo(description: string) {
        TodoService.createTodo(description);
    }

    toggleTodo(id: string) {
        TodoService.toggleTodo(id);
    }

    editTodo(id: string, description: string) {
        TodoService.editTodo(id, description);
    }

    removeTodo(id: string) {
        TodoService.removeTodo(id);
    }

    removeDoneTodos() {
        TodoService.removeDoneTodos();
    }

    render() {
        return(
            <TodoComponent todos={this.state.todos} addTodo={this.addTodo.bind(this)}
                           toggleTodo={this.toggleTodo.bind(this)} editTodo={this.editTodo.bind(this)}
                           removeTodo={this.removeTodo.bind(this)} removeDoneTodos={this.removeDoneTodos.bind(this)} />
        );
    }

}

interface TodoContainerState {
    todos: Todo[]
}