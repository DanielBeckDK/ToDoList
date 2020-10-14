import React from 'react';



export default class Form extends React.Component {
    state = {
        task: undefined
    };

    handleFormSubmit = (event) => {
        const { onFormSubmitted } = this.props;

        event.preventDefault();

        fetch('http://localhost:9000/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => onFormSubmitted(res))
    }

    handleInputChanged = (event) => {

        this.setState({ task: event.target.value });

    };

    render() {
        return (
            <div>

                <form onSubmit={this.handleFormSubmit} >
                    <div>Create a new task</div>
                    <input placeholder="New task" name="newTask" onChange={this.handleInputChanged} />
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}
