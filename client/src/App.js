import React from 'react';
import './App.css';
import Form from './Pages/Form.js'
import EditForm from './Pages/EditForm.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';


class App extends React.Component {


  state = {
    apiResponse: undefined
  };

  callApi() {
    fetch("http://localhost:9000/tasks")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
  }

  handleFormSubmit = (res) => {
    this.setState({ apiResponse: res })
  }

  componentDidMount() {
    this.callApi();
  }

  renderTable() {

    if (this.state.apiResponse) {
      return this.state.apiResponse.tasks.map((task, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{task.task}</td>
            <td class="delete"><BsTrash onClick={() => this.deleteTask(task.id)} /></td>
            <td>{<EditForm taskId={task.id} onFormSubmitted={this.handleFormSubmit}></EditForm>}</td>
          </tr>
        )
      })
    }
    else {
      return (
        <tr>
          <td>...Loading</td>
          <td>...Loading</td>
        </tr>
      )
    }
  }

  deleteTask(taskId) {
    fetch("http://localhost:9000/tasks/" + taskId, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
  }


  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <Link to="/tasks">To do list</Link>
            </ul>
            <ul>
              <Link to="/about">About</Link>
            </ul>
          </nav>
          <Switch>
            <Route path="/tasks">
              <div>
                <h3>Here you can view, create and delete all of your tasks</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Task</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTable()}
                  </tbody>
                </table>
                <br></br>
                <Form onFormSubmitted={this.handleFormSubmit} />
              </div>
            </Route>
            <Route path="/about">
              <div>This is a webpage with a to do list</div>
            </Route>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
