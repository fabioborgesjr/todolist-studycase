import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { isEnabled } from './lib/feature';

import { addTodo, updateTodo, getAll, refresh } from './actions';

import Intro from './components/template/Intro';
import Input from './components/template/Input';
import Options from './components/template/Options';
import Filters from './components/template/Filters';
import Todos from './components/template/Todos';

const filterOptions = {
    ALL: 'all',
    DONE: 'done',
    OPEN: 'open'
}

const url = 'http://localhost:3000'

export class Todo extends Component {

    constructor(props) {
        super(props)

        this.refresh()
    }

    keyHandler(e) {
        if (e.key === 'Enter') {
            this.add()
        }
    }

    refresh() {
        this.props.getAll()
    }

    add() {
        this.props.addTodo()
    }

    update(event) {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        this.props.updateTodo(id)
    }

    filterTop() {
        return (
            <div>
                <Intro />
                <Options />
                <Filters onClick={this.showTodosByFilter.bind(this)} />
                <Todos todos={this.props.todos} onClick={this.update.bind(this)}/>
                <Input onClick={this.add.bind(this)} onKeyUp={this.keyHandler.bind(this)} />
            </div>
        )
    }

    renderAddTodoAtTop() {

        return (
            <div>
                <Intro />
                <Input onClick={this.add.bind(this)} onKeyUp={this.keyHandler.bind(this)} />
                <Todos todos={this.props.todos} onClick={this.update.bind(this)}/>
            </div>
        )
    }

    renderFiltersBelowItems() {
        return (
            <div>
                <Intro />
                <Input onClick={this.add.bind(this)} onKeyUp={this.keyHandler.bind(this)} />
                <Todos todos={this.props.todos} onClick={this.update.bind(this)}/>
                <Options />
                <Filters onClick={this.showTodosByFilter.bind(this)} />
            </div>
        )
    }

    renderAddTodoAtBottom() {
        return (
            <div>
                <Intro />
                <Todos todos={this.props.todos} onClick={this.update.bind(this)}/>
                <Input onClick={this.add.bind(this)} onKeyUp={this.keyHandler.bind(this)} />
            </div>
        )
    }

    /**
     * Dá foco a um elemento da tela
     * @param {string} id id do elemento
     */
    focus(id) {
        const element = document.getElementById(id);
        element.focus();
    }

    showTodosByFilter(event) {
        const done = document.querySelectorAll('.todo__item--done');
        const open = document.querySelectorAll('.todo__item--open');

        this.filterTodos(done, event.target.id)
        this.filterTodos(open, event.target.id)
    }

    /**
     * Filtra um item de acordo com o filtro selecionado
     * @param {*} elm elemento da tarefa
     * @param {*} option filtro selecionado
     */
    filterTodos(elm, option) {
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

    render() {
        if (isEnabled('renderBottom') && isEnabled('filter')) {
            return this.filterTop()
        } else if (isEnabled('renderBottom')) {
            return this.renderAddTodoAtBottom();
        } else if (isEnabled('filter')) {
            return this.renderFiltersBelowItems();
        } else {
            return this.renderAddTodoAtTop();
        }
    }
}

const mapStateToProps = state => (
    { todos: state.todo.todos })
const mapDispatchToProps = dispatch =>
    bindActionCreators({ isEnabled, addTodo, updateTodo, getAll, refresh }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Todo)