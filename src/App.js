import React, {useEffect} from 'react';
import Board from './components/Board'
import {connect} from 'react-redux'
import {receiveTasks, dragTask} from './actions/tasksAction'
import {receiveList} from './actions/listsAction'
import {DragDropContext} from 'react-beautiful-dnd'
import AddTask from './components/AddTask';

function App({dispatch, tasks, list}) {
  
  useEffect(() => {

    const fetchInitialTask = async () => {
      try {
        const res = await fetch('./tasks.json')
        const data = await res.json()
        dispatch(receiveTasks(data.tasks))
        dispatch(receiveList(data.lists))
      } catch (error) {
        console.log(error)
      }
    }

    fetchInitialTask()
  }, [dispatch])

  const onDragEnd = (result) => {
    // check if card is dragged without destination
    if(!result.destination) return;

    // get the data from dragging event
    const dragId = Number(result.draggableId)
    const destinationKey = Number(Object.keys(list).find(key => list[key] === result.destination.droppableId));
    const destinationOrder = result.destination.index;
    const sourceKey = Number(Object.keys(list).find(key => list[key] === result.source.droppableId));
    const sourceOrder = result.source.index;
    
    // check if its just a reordering on the same list 
    if (destinationKey === sourceKey) {
      // get an array of task on same list and sort according to order
      const newArr = tasks.filter(card => card.status === sourceKey).sort((a, b) => a.order - b.order)

      const reorderTask = newArr.map(card => {
        if (destinationOrder > sourceOrder && card.id !== dragId) {
          card.order = card.order - 1;
        } else if (destinationOrder < sourceOrder && card.id !== dragId) {
          card.order = card.order + 1;
        } else if (card.id === dragId) {
          card.order = destinationOrder;
        } 
        return card
      })

      // get the other unaffected cards
      const tasksArr = tasks.filter(x => x.status !== sourceKey)
      // combine with the updated cards
      const updatedArr = [...tasksArr, ...reorderTask]
      // dispatch to redux store
      dispatch(dragTask(updatedArr))

    } else if (destinationKey !== sourceKey) {

      // check if task is dragged to another list 
      const updateTask = tasks.map(card => {
        if (card.id === Number(result.draggableId)) {
          card.status = destinationKey;
          card.order = destinationOrder;
        }
        return card
      })

      // get an array of task on the destination list where the card is dropped
      const newArr = tasks.filter(card => card.status === destinationKey).sort((a, b) => a.order - b.order)

      // reorder the card based on changes of order
      const reorderTask = newArr.map(card => {
        if (card.order === destinationOrder && card.id !== dragId) {
          card.order = card.order + 1
        } else if (card.order > destinationOrder && card.id !== dragId) {
          card.order = card.order + 1
        }
        return card
      })

      // get an array of task on previous list
      const previousList = tasks.filter(card => card.status === sourceKey)

      // update order for all cards on previous list
      const updatePreviousList = previousList.map(card => {
        card.order = card.order - 1
        return card
      })

      // get the other unaffected cards
      const tasksArr = tasks.filter(card => card.status !== destinationKey && card.status !== sourceKey)
      // combine with updated cards
      const updatedArr = [...tasksArr, ...reorderTask, ...updatePreviousList]
      //dispatch to redux
      dispatch(dragTask(updatedArr))
    }
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="App">
        <AddTask tasks={tasks}/>
        <Board tasks={tasks} list={list}/>
      </div>
    </DragDropContext>
  );
}


const mapStateToProps = (state) => {
  return {
      list: state.list,
      tasks:state.tasks
  }
}

export default connect(mapStateToProps)(App);
