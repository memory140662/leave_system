import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
let initType = {name: '', description: ''};
class TypeCreateForm extends Component {

    constructor(p) {
        super(p);
        this.state = {
            type: initType
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/type', this.state.type)
        .then(
            ({data}) => {
                if (!!this.props.createDone) {
                    this.setState({type: initType});
                    this.props.createDone(data);
                }
            },
            err => {}
        );
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='h4'>Create Leave Type</div>
                <form onSubmit={this.handleSubmit.bind(this)} className='form-inline'>
                    <div className='form-group'>
                        <label htmlFor="name" className='' style={{padding: 5}}>種類</label>
                        <input 
                            type="text" 
                            id='name' 
                            value={this.state.type.name} 
                            className='form-control'
                            onChange={e => {this.setState({type: {...this.state.type, name: e.target.value}})}}
                            required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="desc" className='' style={{padding: 5}}>敘述</label>
                        <input 
                            type="text" 
                            id='desc' 
                            value={this.state.type.description} 
                            className='form-control'
                            onChange={e => {this.setState({type: {...this.state.type, description: e.target.value}})}}
                            required/>
                    </div>
                    <div className="btn-group">
                    <input type="submit" value='Create' className='btn btn-default btn-lg' style={{margin:10, padding: 5}}/>
                    </div>
                </form>
            </div>
        );
    }
};

TypeCreateForm.propTypes = {
    createDone: PropTypes.func
}

export default TypeCreateForm;