import { isEnabled } from './lib/feature';

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

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderIntro()
    );
}

function renderApp(input, todoList, intro) {
    if (isEnabled('renderBottom') && isEnabled('filter')) {
        return filterTop(input, todoList, intro)
    } else if (isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList, intro);
    } else if (isEnabled('filter')) {
        return renderFiltersBelowItems(input, todoList, intro);
    } else {
        return renderAddTodoAtTop(input, todoList, intro);
    }
}

function filterTop(input, todoList, intro) {
    const filters = filter.map(renderRadioFilters).join('');
    return `<div id="app">
        ${intro}
        <span>Opções</span>
        ${filters}
        ${todoList}
        ${input}
    </div>`;
}

function renderAddTodoAtTop(input, todoList, intro) {
    return `<div id="app">
        ${intro}
        ${input}
        ${todoList}
    </div>`;
}

function renderFiltersBelowItems(input, todoList, intro) {
    const filters = filter.map(renderRadioFilters).join('');
    return `<div id="app">
        ${intro}
        ${input}
        ${todoList}
        <span>Opções</span>
        ${filters}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList, intro) {
    return `<div id="app">
        ${intro}
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input row"><input type="text" id="todoInput" placeholder="Tarefa a ser adicionada" aria-label="Tarefa a ser adicionada"><button id="addTodo" class="btn btn-outline-secondary">Adicionar</button></div>`;
}

function renderIntro() {
    return `<div class="intro">
        <h1>TodoApp</h1>
        <h3>Um estudo de caso</h3>
    </div>`
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
    return `<div class="radio-filters"><input class="radio-filters-input" id="${filter.id}" type="radio" name="filter" ${filter.checked ? 'checked' : ''}><label>${filter.description}</label></div>`
}