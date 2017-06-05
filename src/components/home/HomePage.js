import React from 'react';
import LeavaForm from './LeaveForm';
import LoginHistoryLayout from './LoginHistoryLayout';
import History from './History';
const HomePage = () => {
    let { id } = JSON.parse(sessionStorage.getItem('user'));
    console.log();
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-7 col-sm-7">
                    <LeavaForm user_id={parseInt(id)} />
                </div>
                <div className="col-md-5 col-sm-5">
                    <LoginHistoryLayout />
                </div>
            </div>
            <hr />
            <History user_id={parseInt(id)} />
        </div>
    );
};

export default HomePage;