import { createStore } from './lib/state';
import { add, update, getAll } from './service';

const initialState = {
    todos: getAll()
}

function todoChangeHandler(state, change) {
    switch (change.type) {
        case 'ADD_TODO':
            const todo = {
                id: state.todos.length,
                text: change.text,
                done: false
            }
            state.todos.push(todo);
            add(todo);
            break;
        case 'TODO_TOGGLE_DONE':
            for (let todo of state.todos) {
                if (todo.id === change.id) {
                    todo.done = !todo.done;
                    update(todo)
                    break;
                }
            }
            break;
        case 'SEARCH':
            state.todos = change.payload
            break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);