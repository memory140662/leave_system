import React from 'react';
import PropTypes from 'prop-types';

const HistoryInfo = ({history}) => {
    return (
        <div className='list-group' >
            <div className='list-group-item'>
                <h3>From</h3>
                <div className="text-center">
                    {new Date(history.date_fr).toLocaleDateString()} ~
                    {new Date(history.date_to).toLocaleDateString()}   
                </div>
            </div>
            <div className='list-group-item'>
                <h3>Hours</h3>
                <div className="text-center">
                    {history.hours}
                </div>
            </div>
            <div className='list-group-item'>
                <h3>Allow</h3>
                <div className="text-center">
                    {history.his_allow}
                </div>
            </div>
        </div>
    );
};

HistoryInfo.propTypes = {
    history: PropTypes.object.isRequired
}

export default HistoryInfo;