import React, { Component } from 'react';
import EmployeeUpdateForm from './EmployeeUpdateForm';
import EmployeeCreateForm from './EmployeeCreateForm';
import EmployeeList from './EmployeeList';
import PropTypes from 'prop-types';

class EmployeeLayout extends Component {

    componentDidMount() {
        this.props.getAllEmployee();
    }

    render() {
        const { 
            employees, 
            filter, 
            message,
            employeeSelected, 
            currentEmployee, 
            updateEmployee, 
            createEmployee,
            deleteEmployee,
            choiceUserAdmin
        } = this.props;
        return (
            <div>  
                <div className='input-group'>
                    <span className='input-group-addon'>Username Filter</span>
                    <input className='form-control' type="text" id='username' onChange={e => {this.props.textChange(e.target.value)}}/>
                </div>
                <hr/>
                <div className='row'>
                    <div style={{height:300, overflow: 'scroll'}} className='col-md-6 col-sm-6'>
                       <EmployeeList employees={employees} filter={filter} employeeSelected={employeeSelected}/>
                    </div>
                    <div className='col-md-6 col-sm-6'>
                        {(currentEmployee) ? 
                            <EmployeeUpdateForm 
                                user={currentEmployee}
                                message={message}
                                updateEmployee={updateEmployee} 
                                deleteEmployee={deleteEmployee}
                                choiceUserAdmin={choiceUserAdmin}
                            />
                        : ''}
                    </div>
                </div>
                <hr/>
                <EmployeeCreateForm createEmployee={createEmployee}/>
            </div>
        );
    }
};

EmployeeLayout.propTypes = {
    filter: PropTypes.string,
    message: PropTypes.string,
    employees:PropTypes.array,
    currentEmployee: PropTypes.object,
    textChange: PropTypes.func.isRequired,
    employeeSelected: PropTypes.func.isRequired,
    getAllEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    createEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    choiceUserAdmin: PropTypes.func.isRequired
}

export default EmployeeLayout;