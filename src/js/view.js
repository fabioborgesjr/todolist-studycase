import { isEnabled } from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
    if (isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    } else if (isEnabled('filter')) {
        return renderFiltersBelowItems(input, todoList);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderFiltersBelowItems(input, todoList) {
    const filter = [{
            id: 'all',
            description: 'Mostrar todos',
            checked: true
        },
        {
            id: 'done',
            description: 'Somente fechados',
            checked: false
        },
        {
            id: 'open',
            description: 'Somente abertos',
            checked: false
        }
    ]

    const filters = filter.map(renderRadioFilters).join('');
    return `<div id="app">
        ${input}
        ${todoList}
        ${filters}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function renderRadioFilters(filter) {
    return `<label><input class="radio-filters" id="${filter.id}" type="radio" name="filter" ${filter.checked ? 'checked' : ''}>${filter.description}</label>`
}