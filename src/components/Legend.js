import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Legend extends React.Component {
    render() {
        return (
            <div className="slds-grid legend">
                <div className="legend__item">
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__lecture"
                        />
                        Lecture
                    </div>
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__task"
                        />
                        Task
                    </div>
                </div>
                <div className="legend__item">
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__deadline"
                        />
                        Deadline
                    </div>
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__workshop"
                        />
                        Workshop
                    </div>
                </div>
                <div className="legend__item">
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__event"
                        />
                        Event
                    </div>
                    <div>
                        <FontAwesome
                          name="square"
                          className="legend__webinar"
                        />
                        Webinar
                    </div>
                </div>
            </div>
        );
    }
}
