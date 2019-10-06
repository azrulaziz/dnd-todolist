
export default (state = [], action) => {
    switch(action.type) {

        case 'RECEIVE_TASKS':
            return action.payload
        
        case 'DRAG_TASK':
            return action.payload

        case 'ADD_TASK':
            return [...state, action.payload]

        default:
            return state
    }
}