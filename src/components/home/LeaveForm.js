import React, { Component } from 'react';
import LeaveTypeSelect from './LeaveTypeSelect';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createBrowserHistory } from 'history';
class LeaveForm extends Component {

    constructor(props) {
        super(props);
        let date = new Date().toISOString().split(/T/)[0];
        this.state = {
            date_fr: date,
            date_to: date,
            hour_fr: 9,
            hour_to: 18,
            type: null,
            isEmpty: true
        };
    }

    calcHour({ date_fr, date_to, hour_fr, hour_to }) {
        let days = (new Date(date_to) - new Date(date_fr)) / (24 * 60 * 60 * 1000);
        let hours = (days * 8) + parseInt(hour_to) - parseInt(hour_fr) - 1;
        return hours;
    }

    handleSubmit(event) {
        event.preventDefault();
        let hours = this.calcHour(this.state);
        let { type, date_fr, date_to} = this.state;
        axios.post('/api/history', {
            'user_id': this.props.user_id,
            'type_id': parseInt(type),
            'date_fr': date_fr,
            'date_to': date_to,
            'hours': hours
        })
        .then(
            (value) => {
                this.setState({isEmpty: true});
                window.location.reload();
            },
            err => {console.log(err)}
        )

    }

    render() {
        return (
            <div className='container-fluid'>
                <form onSubmit={this.handleSubmit.bind(this)} className=''>
                    <div className='form-group'>
                        <div className="input-group">
                            <label htmlFor="fr" className='input-group-addon '>From</label>
                            <input 
                                type="date" 
                                id='fr' 
                                className='form-control '
                                value={this.state.date_fr}
                                style={{width: 200}}
                                onChange={e => {
                                    let { date_fr, date_to, hour_fr, hour_to, type} = this.state;
                                    this.setState({
                                        date_fr: e.target.value,
                                        isEmpty: !(!!e.target.value && !!date_to && !!hour_fr && !!hour_to && !!type)
                                    });
                                    
                                }}/>
                            <label htmlFor="to" className='input-group-addon'  >To</label>
                            <input 
                                type="date" 
                                id='to'
                                value={this.state.date_to}
                                className='form-control '
                                style={{width: 200}}
                                onChange={e => {
                                    let { date_fr, date_to, hour_fr, hour_to, type} = this.state;
                                    this.setState({
                                        date_to: e.target.value,
                                        isEmpty: !(!!date_fr && !!e.target.value && !!hour_fr && !!hour_to && !!type)
                                    });
                            }}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className="input-group">
                            <label htmlFor='hour_fr' className='input-group-addon ' >Hour</label>
                            <input 
                                min='8'
                                max='18'
                                type="number" 
                                id='hour_fr'  
                                className='form-control '
                                style={{width: 200}}
                                value={this.state.hour_fr}
                                onChange={e => {
                                    let { date_fr, date_to, hour_fr, hour_to, type} = this.state;
                                    this.setState({
                                        hour_fr: e.target.value,
                                        isEmpty: !(!!date_fr && !!date_to && !!e.target.value && !!hour_to && !!type)
                                    })
                                }}/>
                            <label htmlFor='hour_to' className='input-group-addon '  >~</label>
                            <input 
                                min='8'
                                max='18'
                                type="number" 
                                id='hour_to' 
                                className='form-control '
                                style={{width: 200}}
                                value={this.state.hour_to}
                                onChange={e => {
                                    let { date_fr, date_to, hour_fr, hour_to, type} = this.state;
                                    this.setState({
                                        hour_to: e.target.value,
                                        isEmpty: !(!!date_fr && !!date_to && !!hour_fr && !!e.target.value && !!type)
                                    })
                                }}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LeaveTypeSelect onChange={e => {
                            let { date_fr, date_to, hour_fr, hour_to, type} = this.state;
                            this.setState({
                                type: e.target.value,
                                isEmpty: !(!!date_fr && !!date_to && !!hour_fr && !!hour_to && !!e.target.value)
                            });
                        }}/>
                    </div>
                    <input className='btn btn-primary' type="submit" value="Submit" disabled={this.state.isEmpty}/>
                </form>
            </div>
        );
    }
};

LeaveForm.propTypes = {
    user_id: PropTypes.number.isRequired,
}

export default LeaveForm;