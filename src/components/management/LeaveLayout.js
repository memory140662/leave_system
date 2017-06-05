import React, { Component } from 'react';
import TypeCreateForm from './TypeCreateForm';
import axios from 'axios';
class LeaveLayout extends Component{

    constructor(p) {
        super(p);
        this.state = {
            histories: [],
            check: [],
        }
    }

    componentDidMount() {
        axios.get('/api/history')
        .then(
            ({data}) => {
                this.setState({histories: data});
            },
            err => {}
        )
    }

    render() {
        return (
            <div>
                <div className='h1'>
                    審核
                </div>
                <div style={{overflow: 'scroll', height: 300}}>
                      <table style={{width: '100%'}} className='table table-striped'>
                            <thead>
                                <tr>
                                    <td>Allow</td>
                                    <td>Username</td>
                                    <td>From</td>
                                    <td>To</td>
                                    <td>Type</td>
                                    <td>Hours</td>
                                </tr>
                            </thead>
                            <tbody className='table-striped'>
                                {this.state.histories.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><input type="checkbox" onClick={e => {
                                                let { check } = this.state;
                                                if (e.target.checked) {
                                                    check.push({...value, his_allow: 'Y'});
                                                } else {
                                                    check.splice(check.indexOf(value), 1);
                                                }
                                                this.setState({check});
                                            }}/></td>
                                            <td>{value.username}</td>
                                            <td>{new Date(value.date_fr).toLocaleDateString()}</td>
                                            <td>{new Date(value.date_to).toLocaleDateString()}</td>
                                            <td>{value.name}</td>
                                            <td>{value.hours}</td>
                                        </tr>
                                    ); 
                                })}
                            </tbody>
                        </table>
                </div>
                <div>
                    <button className='btn btn-default' onClick={e => {
                        if (this.state.check.length == 0) {
                            return;
                        }
                        axios.put('/api/history/allow/Y', this.state.check)
                        .then(
                            ({data}) => {
                                this.setState({histories: []});
                                this.setState({histories: data});
                            },
                            err => {}
                        )
                    }}>Allow</button>
                </div>
            </div>
        );
    }
};

export default LeaveLayout;