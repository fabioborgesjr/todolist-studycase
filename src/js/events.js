import { todos } from './state';
import { listen } from './lib/events';
import { addTodo, toggleTodoState } from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        dispatchTodo();
        focus('todoInput');
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('keyup', '#todoInput', event => {
        if (event.key === 'Enter') {
            dispatchTodo();
            focus('todoInput');
        }
        event.stopPropagation();
    });
}

/**
 * Adiciona um item ao state da aplicação  
 */
function dispatchTodo() {
    const todoInput = document.getElementById('todoInput');
    todos.dispatch(addTodo(todoInput.value));
}

/**
 * Dá foco a um elemento da tela
 * @param {string} id id do elemento
 */
function focus(id) {
    const element = document.getElementById(id);
    element.focus();
}