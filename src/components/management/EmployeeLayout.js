import React, { Component } from 'react';
import EmployeeUpdateForm from './EmployeeUpdateForm';
import EmployeeCreateForm from './EmployeeCreateForm';
import EmployeeList from './EmployeeList';
import PropTypes from 'prop-types';
import axios from 'axios';

class EmployeeLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            filter: '',
            message: '',
            employeeSelected: {},
            currentEmployee: undefined,
        }
    }
    _createEmployee(user) {
        axios.post('/api/user', user)
        .then(({data}) => this.setState({employees: data}))
        .catch(err => alert(err));
    }

    _updateEmployee(user) {
        axios.put(`/api/user/${user._id}`, user)
        .then(({data}) => this.setState({
            employees: [...this.state.employees.map(emp =>{
                if (emp._id != user._id) return emp;
                return user;
            })]
        }))
        .catch(err => alert(err));
    }
    _deleteEmployee(user) {
        axios.delete(`/api/user/${user._id}`)
        .then(({data}) => this.setState({
            employees: [...this.state.employees.filter(emp => emp._id != user._id)],
            currentEmployee: undefined
        }))
        .catch(err => alert(err));
    }

    _changeUserAdmin(user) {
        this.setState({currentEmployee: user});
    }

    componentDidMount() {
        axios.get('/api/user')
        .then(({data}) => {
            this.setState({
                employees: data
            });
        })
        .catch(err => {})
    }

    render() {
        return (
            <div>  
                <div className='input-group'>
                    <span className='input-group-addon'>Username Filter</span>
                    <input className='form-control' type="text" id='username' onChange={e => this.setState({filter: e.target.value})}/>
                </div>
                <hr/>
                <div className='row'>
                    <div style={{height:300, overflow: 'scroll'}} className='col-md-6 col-sm-6'>
                       <EmployeeList employees={this.state.employees} filter={this.state.filter} onEmployeeSelected={emp => this.setState({currentEmployee: emp})}/>
                    </div>
                    <div className='col-md-6 col-sm-6'>
                        {(this.state.currentEmployee) ? 
                            <EmployeeUpdateForm 
                                user={this.state.currentEmployee}
                                message={this.state.message}
                                updateEmployee={this._updateEmployee.bind(this)} 
                                deleteEmployee={this._deleteEmployee.bind(this)}
                                changeUserAdmin={this._changeUserAdmin.bind(this)}
                            />
                        : ''}
                    </div>
                </div>
                <hr/>
                <EmployeeCreateForm createEmployee={this._createEmployee.bind(this)}/>
            </div>
        );
    }
};

export default EmployeeLayout;