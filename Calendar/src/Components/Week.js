import React from 'react'
import Day from './Day';

const Week = ({ week, data, addTask, renderTasks, handleOpenModal }) => 
  data[week].map((day, dayNumber) => (
        <td className='cell' key={dayNumber} onClick={(event) => handleOpenModal(event, dayNumber)}>
            {data[week][dayNumber][0]}
          <Day 
            data={data} 
            week={week} 
            dayNumber={dayNumber} 
            handleOpenModal={handleOpenModal} 
            key={dayNumber}
          />
        </td>
      )
    )

export default Week