// importing modules to create component
import React, {Component} from 'react';

import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);

        // Creating variable to store departments data, variable that would show or hide modal.
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    // Function that refreshes departmens array
    refreshList(){
        // Get data from the Departments API
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            // When the data is avaiable we update department array(emps) using setState method
            this.setState({emps:data});
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
    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid, {
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {emps, empid, empname, depmt, photofilename, doj}=this.state;        

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>               
            <Table className="mt-4" stripped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>DateOfJoining</th>                        
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {emps.map(emp=>
                        <tr key={emp.EmployeeId}>
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateOfJoining}</td>                            
                            <td>
                                <ButtonToolbar>

                                    <div> 
                                        <Button className='mr-2' variant="info" onClick={()=>this.setState(
                                            {editModalShow:true,
                                             empid:emp.EmployeeId,
                                             empname:emp.EmployeeName,
                                             depmt:emp.DepartmentId,                                            
                                             doj:emp.DateOfJoining,
                                             photofilename:emp.PhotoFileName
                                            })}>
                                        Edit
                                    </Button>
                                    <EditEmpModal show={this.state.editModalShow} onHide={editModalClose}
                                     empid={empid}
                                     empname={empname}
                                     depmt={depmt}                                     
                                     doj={doj}
                                     photofilename={photofilename}
                                     />
                                    </div>
                                   
                                    <div>
                                    <Button className='mr-2' variant="danger" onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                        Delete
                                    </Button>
                                    </div>

                                </ButtonToolbar>
                            </td>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>

                <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>Add Employee</Button>

                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}></AddEmpModal>

            </ButtonToolbar>
            </div>
        )

    }
}