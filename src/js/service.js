import Axios from "axios";
import { todos } from "./state";

const url = 'http://localhost:3000'

export function getAll() {
    let items = []

    Axios.get(`${url}/todos`).then(res => {
        res.data.forEach(element => {
            items.push(element)
        });
        todos.dispatch({ type: 'SEARCH', payload: items })
    })

    return items
}

export function add(data) {
    return Axios.post(`${url}/todos`, data)
}

export function update(data) {
    return Axios.put(`${url}/todos/${data.id}`, data)
}