// importing modules to create component
import React, {Component} from 'react';

import {Table} from 'react-bootstrap';

export class Department extends Component{


    constructor(props){
        super(props);

        // Creating variable to store departments data
        this.state={deps:[]}
    }

    // Function that refreshes departmens array
    refreshList(){
        // Get data from the Departments API
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            // When the data is avaiable we update department array(deps) using setState method
            this.setState({deps:data});
        });
    }
    
    // calling refresh method when Life cycle method is called (componentDidMount - from my understanding this method is a Dispatch-receiver. Idk how to explain it better.) 
    // every time this component (Department) would be mounted there would be a broadcast which this function receive
    // and trigger all connected to it other methods refreshList in this example.
    componentDidMount()
    {
        this.refreshList();
    }

    // Life Cycle method
    // same as above but it triggers when the component is updated.
    componentDidUpdate(){
        this.refreshList();
    }

    render(){

        const {deps}=this.state;

        return(
            <div>               
            <Table className="mt-4" stripped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>Edit / Delete</td>

                        </tr>)}
                </tbody>
            </Table>
            </div>
        )

    }
}