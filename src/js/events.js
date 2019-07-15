import { todos } from './state';
import { listen } from './lib/events';
import { addTodo, toggleTodoState } from './actions';

const filterOptions = {
    ALL: 'all',
    DONE: 'done',
    OPEN: 'open'
}

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

    listen('click', ".radio-filters-input", event => {
        showTodosByFilter(event.target.id)
    })
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

/**
 * Mostra os itens filtrados de acordo com o filtro selecionado
 * @param {filterOptions} option opção do filtro (ALL, DONE, OPEN)
 */
function showTodosByFilter(option) {
    const done = document.querySelectorAll('.todo__item--done');
    const open = document.querySelectorAll('.todo__item--open');

    filterTodos(done, option)
    filterTodos(open, option)
}

/**
 * Filtra um item de acordo com o filtro selecionado
 * @param {*} elm elemento da tarefa
 * @param {*} option filtro selecionado
 */
function filterTodos(elm, option) {
    elm.forEach(item => {
        if (item) {
            const isChecked = item.children[0].checked;

            switch (option) {

                case filterOptions.DONE:
                    if (isChecked) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    break;
                case filterOptions.OPEN:
                    if (isChecked) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = 'block';
                    }
                    break;
                case filterOptions.ALL:
                default:
                    item.style.display = 'block';
                    break;
            }
        }
    })
}