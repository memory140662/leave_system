import React, { Component } from 'react';
import EmployeeLayout from './EmployeeLayout';
import LeaveLayout from './LeaveLayout';
import TypeLayout from './TypeLayout';

class ManagementPage extends Component {

    constructor(p) {
        super(p);
        this.state = {
            action: ''
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 col-sm-3'>
                        <ui>
                            <li><a className='h3' onClick={e => {this.setState({action: <EmployeeLayout />})}}>員工管理</a></li>
                            <li><a className='h3' onClick={e => {this.setState({action: <LeaveLayout />})}}>請假管理</a></li>
                            <li><a className='h3' onClick={e => {this.setState({action: <TypeLayout />})}}>假期種類</a></li>
                        </ui>
                    </div>
                    <div className='col-md-9 col-sm-9'>
                        {this.state.action}
                    </div>
                </div>
            </div>
        );
    }
};

export default ManagementPage;