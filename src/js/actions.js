import Axios from "axios";

const url = 'http://localhost:3000'

export const addTodo = () => {

    return (dispatch, getState) => {
        const todoInput = document.getElementById('todoInput').value
        const todos = getState().todo.todos

        const todo = {
            id: todos.length,
            text: todoInput,
            done: false
        }

        Axios.post(`${url}/todos`, todo).then(resp => {
            getAll()(dispatch)
        })
    }
}

export const getAll = () => {
    return dispatch => {
        let items = []

        Axios.get(`${url}/todos`).then(res => {
                res.data.forEach(element => {
                    items.push(element)
                })
            })
            .then(resp => dispatch({
                type: 'UPDATE_TODOS',
                payload: items
            }))
    }
}

export const updateTodo = (id) => {
    return (dispatch, getState) => {
        const todos = getState().todo.todos
        for (let todo of todos) {
            if (todo.id === id) {
                todo.done = !todo.done;

                Axios.put(`${url}/todos/${id}`, todo).then(resp => {
                    dispatch({
                        type: 'UPDATE_TODOS',
                        payload: todos
                    })
                })

                break;
            }
        }
    }
}