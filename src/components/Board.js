import React from 'react'
import Tasks from './Tasks'
import {Droppable} from 'react-beautiful-dnd'

const Board = ({list, tasks}) => {

    if (!list) return null;
    
    console.log(list)
    return (
        <div className="list">
            {Object.keys(list).map((el, i) => {
                return (
                    <Droppable droppableId={list[el]} key={i}>
                        {provided => (
                            <div className="list__each" {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="list__each-header">
                                    <p>{list[el]}</p>
                                    <div className="list__each-header-count">
                                        <p>{tasks.filter(board => board.status === i).length}</p>
                                        <span>Tasks</span>
                                    </div>
                                </div>
                                <Tasks taskStatus={i} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )
            })}
        </div>
    )
}


export default Board