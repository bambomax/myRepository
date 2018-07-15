import React from 'react'

const Task = ({data, week, dayNumber, taskNumber, handleOpenModal}) => 
  <div className='task' key={taskNumber}  onClick={(event) => handleOpenModal(event, dayNumber, taskNumber) }> 
    {data[week][dayNumber][taskNumber].taskName}
  </div>

export default Task