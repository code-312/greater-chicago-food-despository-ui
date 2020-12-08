//import from other reducers that deal with slices


export default function rootReducer(state, action) {
    return {
        reducer: {
            //this will contain reducer slices of state 
            //i.e. todos: todosReducer(state.todos, action)
        }
    }
}