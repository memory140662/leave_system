import React, {Component} from 'react'
import PropTypes from 'prop-types';

const EmployeeUpdateForm = ({user, changeUserAdmin, message, deleteEmployee, updateEmployee, disableDelete}) => (
    <div className='container-fluid'>
        <div className='h1'>
            Update
        </div>
        <form className='form-horizontal' onSubmit={e => {
            e.preventDefault();
            updateEmployee(user);
        }}>
            <div className='form-group'>
                    <label className="control-label" htmlFor='username'>Username</label>
                    <input className='form-control' id='username' value={user.username} readOnly />
            </div>
                <div className="form-group">
                <label className='control-label' htmlFor='admin'>Admin</label>
                <select 
                    className='form-control'
                    id="admin" 
                    value={user.admin} 
                    onChange={e => changeUserAdmin({...user, admin: e.target.value})}
                    >
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div className='form-group text-center' >
                <div className="btn-group" >
                    <input type="submit" value='Update' role="group" className='btn btn-default btn-lg'/>
                    <input 
                        disabled={user._id === JSON.parse(sessionStorage.getItem('user')).id}
                        type="button" 
                        value='Delete' 
                        className='btn btn-danger btn-lg' 
                        onClick={e => {
                                if (confirm('Are u sure to delete the employee ?')) {
                                    deleteEmployee(user);
                                }
                            }
                        }
                    />
                </div>
            </div>
            <div className='text-center'>
                <font className='alert' color='green'>{message}</font>
            </div>
        </form>
    </div>
);


EmployeeUpdateForm.propTypes = {
    user: PropTypes.object,
    message: PropTypes.string,
    updateDone: PropTypes.func,
    updateEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    changeUserAdmin: PropTypes.func.isRequired
}

export default EmployeeUpdateForm;