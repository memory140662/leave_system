import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Link , Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Head from './components/head/Head';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import ManagementPage from './components/management/ManagementPage';

let content = document.getElementById('react');
let history = createBrowserHistory();

const App = () => {
    
    let user = JSON.parse(sessionStorage.getItem('user'));
    let username ='';
    let admin = 'N';
    if (!!user) {
        username = user.username;
        admin = user.admin;
    }
    
    return (
        <Router history={history}>
            <div> 
                <div>
                    {(!!user) ? <Head username={username} admin={admin}/> : ''}
                    <Route exact path='/' render={() => {
                        return (user) ? <HomePage /> : <Redirect to='/login'/>
                    }}/>
                    <Route path='/login' render= {() => {
                        return (!user) ? <LoginPage /> : <Redirect to='/'/>
                    }} />
                    <Route path='/management' render= {() => {
                        return (admin === 'Y') ? <ManagementPage /> : <Redirect to='/'/>
                    }} />
                </div>
            </div>
        </Router>
    )
}

render(
    <App />,
    content
)

