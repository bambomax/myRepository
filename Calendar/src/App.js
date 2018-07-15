import React, { Component } from 'react'
import './App.css'
import TableHeader from './Components/TableHeader'
import Week from './Components/Week'
import ModalWindow from './Components/ModalWindow'

class App extends Component {
  constructor (props) {
    super(props)
    this.dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    this.state = {
      week: 1,
      day: 0,
      taskNumber: 0, 
      data: JSON.parse(localStorage.getItem('data')) || 
               [[[1], [2], [3], [4], [5], [6], [7]], 
               [[8], [9], [10], [11], [12], [13], [14]], 
               [[15], [16], [17], [18], [19], [20], [21]]],
      showModal: false,
      taskName: '',
      taskDescr: ''
    }
  }

componentDidMount () {
  window.addEventListener('beforeunload', this.setStorage)
  localStorage.clear()
}

componentWillUnmount () {
  window.removeEventListener('beforeunload', this.setStorage)
}

setStorage = () => localStorage.setItem('data', JSON.stringify(this.state.data))

changeWeek (week) {
  (week >= 1 && week <= this.state.data.length) && this.setState ({week: week})
}

handleChange = (event) => {
  (event.target.name === 'name') 
  ? this.setState ({taskName: event.target.value}) 
  : this.setState ({taskDescr: event.target.value})
}

addTask = (week, day, taskNumber) => {
  if (taskNumber) { //----------------------------------------------------------------rewrite task
    const taskName = (this.state.taskName !== '' && this.state.taskName !== this.state.data[week][day][taskNumber].taskName) 
      ? this.state.taskName 
      : this.state.data[week][day][taskNumber].taskName
    const taskDescr = (this.state.taskDescr !== this.state.data[week][day][taskNumber].taskDescr) 
      ? this.state.taskDescr
      : this.state.data[week][day][taskNumber].taskDescr 
    const currTask = {taskName: taskName, taskDescr: taskDescr}
    this.setState({
      data: [
        ...this.state.data.slice(0, week), 
          [...this.state.data[week].slice(0, day), 
          [...this.state.data[week][day].slice(0, taskNumber), 
          currTask, 
          ...this.state.data[week][day].slice(taskNumber+1, ...this.state.data[week][day].length)], 
          ...this.state.data[week].slice(day+1, this.state.data[week].length)], 
        ...this.state.data.slice(week+1, this.state.data.length)], 
        showModal: false,
        taskNumber: 0,
        taskName: '',
        taskDescr: '',
    })
  } else if (this.state.taskName === '') {  
     alert('Не заполнено поле "Название:"')
    } else {
      const newTask = {taskName: this.state.taskName, taskDescr: this.state.taskDescr}
      this.setState({  //----------------------------------------------------------------add task
        data: [
          ...this.state.data.slice(0, week), 
          [...this.state.data[week].slice(0, day), 
          [...this.state.data[week][day], 
          newTask], 
          ...this.state.data[week].slice(day+1, this.state.data[week].length)], 
          ...this.state.data.slice(week+1, this.state.data.length)], 
        showModal: false,
        taskNumber: 0,
        taskName: '',
        taskDescr: '',
      })
    }
}

deleteTask = (week, day, taskNumber) => {
  this.setState({
    data: [
      ...this.state.data.slice(0, week), 
        [...this.state.data[week].slice(0, day), 
        [...this.state.data[week][day].slice(0, taskNumber), 
        ...this.state.data[week][day].slice(taskNumber+1, ...this.state.data[week][day].length)], 
        ...this.state.data[week].slice(day+1, this.state.data[week].length)], 
      ...this.state.data.slice(week+1, this.state.data.length)], 
    showModal: false,
    taskNumber: 0,
  })
}

handleOpenModal = (event, dayNumber, taskNumber) => {
  event.stopPropagation() 
  this.setState({ showModal: true, day: dayNumber, taskNumber: 0 })
  if (taskNumber) { this.setState({ taskNumber: taskNumber }) }
}

handleCloseModal = (event) => {
  event.stopPropagation()
  this.setState({ showModal: false, taskNumber: 0, taskName: '', taskDescr: '' })        
}

  render () {
    return (
      <div className='wrapper'>
        <ModalWindow 
          showModal={this.state.showModal} 
          handleCloseModal={this.handleCloseModal} 
          deleteTask={this.deleteTask} 
          addTask={this.addTask} 
          handleChange={this.handleChange} 
          data={this.state.data} 
          week={this.state.week-1} 
          day={this.state.day} 
          taskNumber={this.state.taskNumber} 
        />
        <div className='title'>
          <h3>Week: {this.state.week}</h3>
        </div>
        <div className='buttons'>
          <button name='prevWeek' onClick={() => this.changeWeek(this.state.week - 1)}>previous week</button>
          <button name='nextWeek' onClick={() => this.changeWeek(this.state.week + 1)}>next week</button>
        </div>
        <table className='table'>
          <tbody>
            <tr>
              <TableHeader dayName={this.dayName} />
            </tr>
            <tr>
              <Week 
                week={this.state.week-1} 
                data={this.state.data} 
                addTask={this.addTask} 
                handleOpenModal={this.handleOpenModal} 
              />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App