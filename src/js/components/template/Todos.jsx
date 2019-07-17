import React from 'react'

const Todos = props => {

        const renderTodoItem = () => {
            const todos = props.todos || []

            return todos.map((todo, index) => (
                <li key={index} className={`todo__item todo__item--${todo.done ? 'done' : 'open'}`}>
                    <input className="js_toggle_todo" type="checkbox" data-id={todo.id} defaultChecked={todo.done ? 'checked' : ''} onClick={props.onClick} />
                    {todo.text}
                </li>
            ))
        }

        return (
            <ul className="todo">
                {renderTodoItem()}
            </ul>
        )
}

export default Todos