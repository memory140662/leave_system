import React, { Component } from  'react';
import PropTypes from 'prop-types';
class LoginInputGroup extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            value: '',
            isEmpty: false
        }
    }

    render() {
        const { type='text', name, label, doCheck} = this.props;
        return ( 
            <div className='form-group'>
                    <label htmlFor={name}>{label}</label>
                    <input 
                        className='form-control'
                        type={type} 
                        id={name} 
                        name={name} 
                        placeholder={label}
                        onChange={e => {
                            this.setState({
                                value: e.target.value,
                            });
                            doCheck(e.target.value);
                        }}
                        onBlur={
                            e => {
                                this.setState({
                                    isEmpty: e.target.value == 0
                                });
                                doCheck(e.target.value);
                            }
                        }
                        required
                    />
                    <div className="text-center">
                        <font color='red'>{!this.state.isEmpty ? '' : label + ' can\'t empty!' }</font>
                    </div>
            </div>
        );
    }
}

LoginInputGroup.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    doCheck: PropTypes.func.isRequired
}

export default LoginInputGroup;