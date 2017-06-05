import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class TypeUpdateForm extends Component {

    constructor(p) {
        super(p);
        let { name, description } = p.type;
        this.state = {
            type: {...p.type, 
                name: (!!name) ? name: '', 
                description: (!!description) ? description : ''
            },
            message: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        let { description, name, _id } = nextProps.type;
        this.setState({
            type: {...nextProps.type, 
                description: (!!description) ? description: '',
                name: (!!name) ? name: ''
            }
        });
        if (_id != this.state.type._id) {
            this.setState({message: ''});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({message: ''});
        axios.put('/api/type/' + this.state.type._id, this.state.type)
        .then(
            ({data}) => {
                if (!!this.props.updateDone) {
                    this.props.updateDone(data, this.state.type);
                }
                this.setState({message: 'Success!'});
            },
            err => {}
        )
    }

    handleDelete(event) {
        event.preventDefault();
        let isDelete = confirm('Are u sure to delete this type?');
        if (!isDelete) return;
        axios.delete('/api/type/' + this.state.type._id)
        .then(
            ({data}) => {
                if (!!this.props.updateDone) {
                    this.props.updateDone(data, null);
                }
            },
            err => {}
        )
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='panel panel-default'>
                    <div className="panel-heading">
                        <div className='h3'>Update</div>
                    </div>
                    <div className='panel-body'>
                        <form onSubmit={this.handleSubmit.bind(this)} className='form-horizontal'>
                            <div className='input-group'>
                                <label htmlFor="name" className='input-group-addon'>種類</label>
                                <input type="text" id='name' value={this.state.type.name} className='form-control'
                                        onChange={e => {this.setState({type: {...this.state.type, name: e.target.value}});}}
                                />
                            </div>
                            <div className='input-group'>
                                <label htmlFor="description" className='input-group-addon'>敘述</label>
                                <input type="text" id='description' value={this.state.type.description}  className='form-control'
                                    onChange={e => {this.setState({type: {...this.state.type, description: e.target.value}});}}/>
                            </div>
                            <div className='btn-group btn-group-justified'>
                                <div className='btn-group'>
                                    <input type="submit" value='Update' className='btn btn-default'/>
                                </div>
                                <div className="btn-group">
                                    <input type="button" value='Delete' className='btn btn-danger' onClick={this.handleDelete.bind(this)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='alert text-center' style={{height: 50}}>
                        <font color='green'>{this.state.message}</font>
                    </div>
                </div>
            </div>
        );
    }
};

TypeUpdateForm.propTypes = {
    type: PropTypes.object.isRequired,
    updateDone: PropTypes.func
}
export default TypeUpdateForm;