import React from 'react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
let history = createBrowserHistory();

const Head = ({username, admin}) => {
    let management = '';
    let home = '';
    let logout = '';
    if (admin === 'Y') {
        management = (
            <a onClick={e => {
                history.push("/management");
                history.go();
            }}>Management</a>
        );
    }
    if (!!username) {
        logout = (
            <a onClick={e => {
                sessionStorage.clear();
                history.push("/login");
                history.go();
            }}>Logout</a>
        );
        home = (
            <a onClick={e => {
                history.push("/");
                history.go();
            }}>Home</a>
        )
    }
    return (
        <div className='navbar navbar-default'>
            <h1>Hello {username} !</h1>
            <div className="container-fluid">
                <div className="nav-pills nav-justified navbar-collapse">
                    <div className="nav navbar-brand">
                        {home}
                    </div>
                    <div className="nav navbar-brand">
                        {management}
                    </div>
                     <div className='nav navbar-brand navbar-right'>
                        {logout}
                    </div>
                </div>
            </div>
        </div>
    );
};

Head.propTypes = {
    username: PropTypes.string.isRequired,
    admin: PropTypes.string.isRequired
}

export default Head;
