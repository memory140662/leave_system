import React from 'react';
import { render } from 'react-dom';
// import { Router } from 'react-router';
import { Link, BrowserRouter as Router , Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Head from './components/head/Head';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import ManagementPage from './components/management/ManagementPage';
import { Provider } from 'react-redux';
import store from './store';

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
        <Provider store={store}>
            <Router>
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
        </Provider>
    )
}

render(
    <App />,
    content
)

