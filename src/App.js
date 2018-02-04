import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      id: 1,
      isCompleted: false,
      newTodoDescription: ''
    };
    this.deleteTodo = this.deleteTodo.bind(this);
  }

handleChange(e) {
  this.setState({ newTodoDescription: e.target.value })
}

handleSubmit(e) {
  e.preventDefault();
  if (!this.state.newTodoDescription) { return }
  const newTodo = { id: this.state.id, description: this.state.newTodoDescription, isCompleted: this.state.isCompleted };
  this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '', id: this.state.id + 1 });
}

toggleComplete(index) {
  const todos = this.state.todos.slice();
  const todo = todos[index];
  todo.isCompleted = todo.isCompleted ? false : true;
  this.setState({ todos: todos });
}

deleteTodo(id) {
  const remainingToDos = this.state.todos.filter(todo => { return todo.id !== id; });
  this.setState({ todos: remainingToDos });
}

  render() {
    return (
      <div className="App">
        <h1>Add a ToDo!</h1>
        <form onSubmit={ (e) => this.handleSubmit(e)}>
          <input type="text"
            value={ this.state.newTodoDescription }
            onChange={ (e) => this.handleChange(e) }
            />
          <input type="submit" value="Add Todo" />
        </form>
        <ul>
          { this.state.todos.map( (todo, id) =>
            <ToDo key={ id }
                  id={ todo.id }
                  description={ todo.description }
                  isCompleted={ todo.isCompleted }
                  toggleComplete={ () => this.toggleComplete(id) }
                  onDelete={ this.deleteTodo }
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
