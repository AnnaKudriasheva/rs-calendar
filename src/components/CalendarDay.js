import React from 'react';
import Event from './Event';


export default class CalendarDay extends React.Component {
    render() {
        let labelTemplate;
        if (this.props.data) {
            labelTemplate = this.props.data.map((event, idx) => {
                const className = `event-label card__label ${event.type}`;
                return (
                    <Event
                      key={idx}
                      class={className}
                      idx={idx}
                      event={event}
                      type={this.props.type}
                    />
                );
            });
        }
        return (
            <div>
                {labelTemplate}
            </div>
        );
    }
}
