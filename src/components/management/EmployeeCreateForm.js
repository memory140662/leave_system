import React, { Component } from 'react';
import PropTypes from 'prop-types';
class EmployeeCreateForm extends Component {

    constructor(p) {
        super(p);
        this.state = {
            username: '',
            password: '',
            admin: 'N'
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let { username, password, admin } = this.state; 
        this.props.createEmployee({
            username,
            password,
            admin
        })
    }

    render() {
        return (
            <div className='container-fluid'>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <div className='input-group'>
                        <label htmlFor="username" className='input-group-addon'>Username</label>
                        <input type="text" id='username' className='form-control' value={this.state.username} onChange={e => {this.setState({username: e.target.value})}} required/>
                        <label htmlFor="password" className='input-group-addon' >Password</label>
                        <input type="password" id='password' className='form-control' value={this.state.password} onChange={e => {this.setState({password: e.target.value})}} required/>
                        <label htmlFor="admin" className='input-group-addon'>Admin</label>
                        <select id='admin' defaultValue='N' className='form-control' style={{width: 70}} onChange={e => {this.setState({admin: e.target.value})}}>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </div>
                        <input type="submit" className='form-control btn btn-default' value='Create Employee'/>
                </form>
            </div>
        );
    }
};

EmployeeCreateForm.propTypes = {
    createEmployee: PropTypes.func.isRequired
}

export default EmployeeCreateForm;