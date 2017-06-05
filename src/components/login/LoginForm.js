import React, { Component } from 'react';
import LoginInputGroup from './LoginInputGroup';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { database } from '../../../config/firebase_config';
import url from 'url';
let history = createBrowserHistory();

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            isEmpty: true
        }
    }

    componentDidMount() {

        let config = {username: 1234};


        document.cookie = 'username' + '=' + JSON.stringify(config);

        console.log(url.parse(location.href));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        this.setState({isEmpty: true});

        axios.post('/api/user/login', {username, password})
        .then(({data}) => {
            let {id, username, token, admin} = data;
            
            if (!!id) {
                sessionStorage.setItem('user', JSON.stringify(data));
                history.push('/');
                history.go();
            } else  {
                this.setState({
                    message: 'Username or Password is error!'
                })
            }
        })
        .catch(err => {

        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} method='POST' action='/api/user/login' className='form-horizontal col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
                <LoginInputGroup 
                    name='username'
                    label="Username"
                    doCheck={value => {
                        const { password } = this.state;
                        this.setState({
                            username: value,
                            isEmpty: password == 0 || value == 0
                        })
                    }}
                />
                <LoginInputGroup 
                    type='password'
                    name='password'
                    label="Password"
                    doCheck={value => {
                        const { username } = this.state;
                        this.setState({
                            password: value,
                            isEmpty: username == 0 || value == 0
                        })
                    }}
                />
                <div className='text-right'>
                    <input className='btn btn-primary ' type="submit" value="Login" disabled={this.state.isEmpty}/>
                </div>
                <div>
                    <font color='red'>{this.state.message}</font>
                </div>
            </form>
        )
    }
}


export default LoginForm;