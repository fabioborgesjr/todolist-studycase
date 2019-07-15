import { add, update, getAll } from './service';
import { createStore } from 'redux';

const initialState = {
    todos: getAll()
}

function todoChangeHandler(state = initialState, change) {
    switch (change.type) {
        case 'ADD_TODO':
            const todo = {
                id: state.todos.length,
                text: change.text,
                done: false
            }
            state.todos.push(todo);
            add(todo);
            return state;
        case 'TODO_TOGGLE_DONE':
            for (let todo of state.todos) {
                if (todo.id === change.id) {
                    todo.done = !todo.done;
                    update(todo)
                    break;
                }
            }
            return state;
        case 'SEARCH':
            state.todos = change.payload
            return state;
    }
}

export const todos = createStore(todoChangeHandler);