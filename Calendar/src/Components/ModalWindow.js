import React from 'react'
import ReactModal from 'react-modal'

const ModalWindow = ({showModal, handleCloseModal, addTask, deleteTask, handleChange, data, week, day, taskNumber}) =>
  <ReactModal isOpen={showModal} className="modal" ariaHideApp={false}>
    <h2>План тренировки</h2>
    <label>Название:</label>
    <br/>
    <textarea name='name' style={{resize: 'none'}} onChange={handleChange} defaultValue={data[week][day][taskNumber].taskName}></textarea> 
    <br/>
    <label>Описание:</label>
    <br/>
    <textarea name='description' style={{resize: 'none'}} onChange={handleChange} defaultValue={data[week][day][taskNumber].taskDescr}></textarea>
    <br/>
    <button onClick={() => addTask(week, day, taskNumber)} >Сохранить</button>
    <button onClick={handleCloseModal}>Закрыть</button>
    {(taskNumber > 0) && <button onClick={() => deleteTask(week, day, taskNumber)}>Удалить</button>}
  </ReactModal>

export default ModalWindow