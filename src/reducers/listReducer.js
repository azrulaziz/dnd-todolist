export default (state = {}, action) => {
    switch(action.type) {

        case 'RECEIVE_LIST':
            return action.payload

        default:
            return state
    }
}