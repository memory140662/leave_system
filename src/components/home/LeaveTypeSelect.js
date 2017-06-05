import React, { Component } from 'react';
import axios from 'axios';
class LeaveTypeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
    }

    componentDidMount() {
        axios.get('/api/type')
        .then(({data}) => {
            this.setState({types: data});
        }, err => {});
    }

    render() {
        return (
            <div className="input-group">
                <label htmlFor="type" className='input-group-addon'>Type</label>
                <select name="type_id" className='form-control' id='type' onChange={e => {this.props.onChange(e);}}>
                    <option value=""></option>
                    {this.state.types.map(({_id, name}, key) => {
                        return (
                            <option key={key} value={_id} >{name}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

};

export default LeaveTypeSelect;