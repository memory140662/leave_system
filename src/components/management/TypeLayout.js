import React, { Component } from 'react';
import TypeUpdateForm from './TypeUpdateForm';
import TypeCreateForm from './TypeCreateForm';
import axios from 'axios';

class TypeLayout extends Component {

    constructor(p) {
        super(p);
        this.state = {
            types: [],
            type: null
        }
    }

    componentDidMount() {
        axios.get('/api/type')
        .then(
            ({data}) => {
                this.setState({types: data});
            },
            err => {}
        )
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6 col-md-6' style={{overflow: 'scroll', height: 350}}>
                        <table className='table table-striped table-hover' >
                            <thead>
                                <tr>
                                    <th style={{width:'50%'}}>種類</th>
                                    <th>敘述</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.types.map((value, key) => {
                                    return (
                                        <tr key={key} onClick={e => {
                                            this.setState({type: value});
                                        }}>
                                            <td>{value.name}</td>
                                            <td>{value.description}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        {(!!this.state.type) ? <TypeUpdateForm type={this.state.type} updateDone={(types, type) => {
                            this.setState({types, type});
                        }} /> : ''}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <TypeCreateForm createDone={(types) => {
                        this.setState({types});
                    }}/>
                </div>
            </div>
        );
    }
};

export default TypeLayout;