import tasksReducer from '../reducers/tasksReducer'
import {dragTask} from '../actions/tasksAction'
import {tasks} from '../mock'

test('should setup default tasks array', () => {
    const state = tasksReducer(undefined, {type: '@@init'});
    expect(state).toEqual([])
})

// test('task should be sorted by order when user drag', () => {
// })
// should be able to change status of task when dragged to another list
// should be able to create new task and added to pending list