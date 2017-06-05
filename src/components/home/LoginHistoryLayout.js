import React, { Component } from 'react';
import { database } from '../../../config/firebase_config';
class LoginHistoryLayout extends Component {

    constructor(p) {
        super(p);
        this.state = {
            loginHistoies: [],
            isMouseOn: false
        };
    }

    componentDidMount() {
        let layout = this.refs.layout;
        database().ref('/login').limitToLast(20)
        .on('value',(snapshot) => {
            let his = [];
            for (var key in snapshot.val()) {
                his.push(snapshot.val()[key]);
            }
            this.setState({loginHistoies: his});
            if (!this.state.isMouseOn) {
                layout.scrollTop = layout.scrollHeight;
            }
        });
    }

    componentWillUnmount() {
        database().ref().onDisconnect();
    }

    render() {
        return (
            <div className='container-fluid'>
                <div style={{fontSize: 24}}>
                    Login
                </div>
                <div style={{overflow: 'auto', height: 180}} ref='layout' onMouseEnter={e => {this.setState({isMouseOn: true})}} onMouseLeave={e=>{this.setState({isMouseOn: false})}}>
                    <ui>
                        {this.state.loginHistoies.map((value, key) => {
                            return (
                                <li key={key} className='h4'>{value.username + ' - ' + value.login_date}</li>
                            );
                        })}
                    </ui>
                </div>
            </div>
        );
    }
};

export default LoginHistoryLayout;