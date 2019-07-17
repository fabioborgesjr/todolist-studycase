import React from 'react'

export default props => (
    <div className="todo__input row">
        <input type="text" id="todoInput" placeholder="Tarefa a ser adicionada" aria-label="Tarefa a ser adicionada" onKeyUp={props.onKeyUp} />
        <button id="addTodo" className="btn btn-outline-secondary" onClick={props.onClick}>Adicionar</button>
    </div>
)