import React from 'react'
import {connect} from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'

const Tasks = ({tasks, taskStatus}) => {

    return (
        <div className="task">
            {tasks.filter((el) => el.status === taskStatus)
            .sort((a, b) => a.order - b.order)
            .map((card, i) => {
                return (
                    <Draggable draggableId={String(card.id)} index={i} key={i}>
                    {provided => (
                        <div className="task__each" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {card.text}
                        </div>
                    )}
                    </Draggable>
                )
            })}
        </div>
    )
} 

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}


export default connect(mapStateToProps)(Tasks);