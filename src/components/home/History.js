import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import HistoryInfo from './HistoryInfo';

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historys: [],
            history: null
        }
    }

    componentDidMount() {
        axios.get('/api/history/' + this.props.user_id)
        .then(
            ({data}) => {
                this.setState({historys: data});
            },
            err => {}
        )

    }

    render() {

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='h1'>
                            History
                    </div>
                    <div className='col-md-6 col-sm-6'>
                        <div>
                            <div style={{height: 300, overflow: 'scroll'}} >
                                <table className='table table-striped table-hover'>
                                    <tbody>
                                        {this.state.historys.map((value, index) => {
                                            let date = new Date(value.date_fr).toLocaleDateString();
                                            let id = value._id;
                                            return (
                                                <tr key={index} onClick={e=> {this.setState({history: value})}}>
                                                    <td className='text-center'>
                                                        {date}
                                                    </td>
                                                    <td>
                                                        {value.name}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-6'>
                        {(this.state.history) ? <HistoryInfo history={this.state.history} /> : ''}
                    </div>
                </div>
            </div>
        );
    }
};

History.propTypes = {
    user_id: PropTypes.number.isRequired,
    doUpdate: PropTypes.string
}

export default History;