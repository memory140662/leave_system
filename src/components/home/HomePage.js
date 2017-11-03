import React from 'react';
import LeavaForm from './LeaveForm';
import History from './History';
const HomePage = () => {
    let { id } = JSON.parse(sessionStorage.getItem('user'));
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-7 col-sm-7">
                    <LeavaForm user_id={parseInt(id)} />
                </div>
            </div>
            <hr />
            <History user_id={parseInt(id)} />
        </div>
    );
};

export default HomePage;