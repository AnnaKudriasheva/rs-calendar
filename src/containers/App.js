import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Calendar days={days} />
            </div>
        );
    }
}
