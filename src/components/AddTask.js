import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addTask} from '../actions/tasksAction'

const AddTask = ({dispatch, tasks}) => {

    const [newTask, setNewTask] = useState("")

    const handleAddNewTask = (e) => {
        e.preventDefault()

        const pendingTask = tasks.filter(task => task.status === 0);

        dispatch(addTask({
            "id": tasks.length,
            "text": newTask,
            "status" : 0,
            "order" : pendingTask.length
        }))

        setNewTask("")

    }

    return (
        <div className="addtask">
            <div className="addtask__form">
                <form onSubmit={handleAddNewTask}>
                    <label htmlFor="addtask" className="addtask__form-label">Add Task</label>
                    <input 
                        type="text"
                        id="addtask"
                        value={newTask}
                        className="addtask__form-input"
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </form>
            </div>
            <div className="addtask__quantity">
                <p>{tasks.length}</p>
                <span>Tasks</span>
            </div>
        </div>
    )
}

export default connect()(AddTask);