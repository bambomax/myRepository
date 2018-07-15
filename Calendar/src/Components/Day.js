import React from 'react'
import Task from './Task'

const Day = ({data, week, dayNumber, handleOpenModal}) => 
  data[week][dayNumber].map((currDay, taskNumber) => 
    (taskNumber > 0 && taskNumber < data[week][dayNumber].length) && 
      <Task 
        data={data} 
        week={week} 
        dayNumber={dayNumber} 
        taskNumber={taskNumber}
        handleOpenModal={handleOpenModal} 
        key={taskNumber}
      /> 
    )

export default Day