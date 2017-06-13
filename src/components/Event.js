import React from 'react';
import Moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { extendMoment } from 'moment-range';
import EventModal from './EventModal';

const moment = extendMoment(Moment);

export default class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        const className = `${this.props.class} slds-grid`;

        if (this.props.type === 'week') {
            return (
                <div key={this.props.idx}>
                    <div className={className}>
                        <div className="slds-size_2-of-3">
                            <a
                              href="#"
                              onClick={(e) => this.toggleModal()}
                              className="card__label-link slds-truncate">
                                {this.props.event.type}: {this.props.event.title}
                            </a>
                        </div>
                        <div className="slds-size_1-of-3 card__label-link">
                            <span>
                                <FontAwesome
                                  name="clock-o"
                                  className="icon-margin"
                                />
                                {moment(this.props.event.start).format('hh:mm')}
                            </span>
                        </div>
                    </div>
                    <EventModal
                      show={this.state.isOpen}
                      onClose={this.toggleModal.bind(this)}
                      event={this.props.event}
                      class={this.props.class}
                    />
                </div>
            );
        }

        return (
            <div key={this.props.idx}>
                <div
                  className={className}
                  onClick={(e) => this.toggleModal()}>
                    <div className="calendar__event-title slds-size_2-of-3
                    slds-align_absolute-center">
                        <a
                          href="#"
                          onClick={(e) => this.toggleModal()}
                          className="card__label-link slds-truncate">
                            {this.props.event.title}
                        </a>
                    </div>
                    <div className="calendar__event-time slds-size_1-of-3
                    slds-align_absolute-center card__label-link">
                        <span>
                            {moment(this.props.event.start).format('hh:mm')}
                        </span>
                    </div>
                </div>
                <EventModal
                  show={this.state.isOpen}
                  onClose={this.toggleModal.bind(this)}
                  event={this.props.event}
                  class={this.props.class}
                />
            </div>
        );
    }
}
