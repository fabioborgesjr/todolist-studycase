const initialState = { todos: [] }

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'UPDATE_TODOS':
            return {...state, todos: payload }
        default:
            return state
    }
}