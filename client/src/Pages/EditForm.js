import React from 'react';



export default class EditForm extends React.Component {
    state = {
        task: undefined
    };

    handleFormSubmit = (event) => {
        const { onFormSubmitted, taskId } = this.props;

        event.preventDefault();


        fetch('http://localhost:9000/tasks/' + taskId, {
            method: 'PATCH',
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
                    <input placeholder="New task" name="newTask" onChange={this.handleInputChanged} />
                    <button type="submit">Edit</button>
                </form>
            </div>
        );
    }
}
