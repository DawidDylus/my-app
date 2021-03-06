// importing modules to create component
import React, {Component} from 'react';

import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component{

    constructor(props){
        super(props);

        // Creating variable to store departments data, variable that would show or hide modal.
        this.state={deps:[], addModalShow:false, editModalShow:false}
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

    // Method that calls delete api
    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'department/'+depid, {
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {deps, depid, depname}=this.state;        

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

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
                            <td>
                                <ButtonToolbar>

                                    <div> 
                                        <Button className='mr-2' variant="info" onClick={()=>this.setState({editModalShow:true, depid:dep.DepartmentId, depname:dep.DepartmentName})}>
                                        Edit
                                    </Button>
                                    <EditDepModal show={this.state.editModalShow} onHide={editModalClose} depid={depid} depname={depname}/>
                                    </div>
                                   
                                    <div>
                                    <Button className='mr-2' variant="danger" onClick={()=>this.deleteDep(dep.DepartmentId)}>
                                        Delete
                                    </Button>
                                    </div>

                                </ButtonToolbar>
                            </td>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>

                <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>Add Department</Button>

                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}></AddDepModal>

            </ButtonToolbar>
            </div>
        )

    }
}