import React, { Component } from 'react'
import ShowTodos from './components/ShowTodos'
import AddTodo from './components/AddTodo'
import axios from 'axios';

class TodoApp extends Component {
  state = {
    todo: '',
    todos: []
  }

  componentDidMount() {
    this.refresh()
  }

  clearInput = () => {
    this.setState({ todo: '' })
  }

  refresh = async () => {
    try {
      // 1. GET /todos to get all todos
      const response = await axios.get('/todos')
      // 2. Put todos in state
      const todos = response.data.data
      this.setState({ todos })
    } catch(e) {
      console.log(e)
    }
  }

  addTodo = async () => {
    try {
      await axios.post('/todos', {
        todo: this.state.todo
      })
      this.refresh()
    } catch(e) {
      console.log(e)
    }
    this.clearInput()
  }

  removeTodo = async index => {
    try {
      await axios.delete(`/todos/${index}`)
      this.refresh()
    } catch(e) {
      console.log(e)
    }
  }

  completeToDo = async id => {
    try {
      // Make a patch request to the /todos/:id/complete
      // which will set complete to true for the given ID
      await axios.patch(`/todos/${id}/complete`);
      
      // re-request all todos
      this.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    this.setState({
      todo: e.target.value
    })
  }

  render() {
    return (
      <div>
        <AddTodo
          handleChange={this.handleChange}
          addTodo={this.addTodo}
          todo={this.state.todo}
        />
        <ShowTodos 
          todos={this.state.todos} 
          removeTodo={this.removeTodo}  
          completeTodo={this.completeToDo}/>
      </div>
    )
  }
}

export default TodoApp