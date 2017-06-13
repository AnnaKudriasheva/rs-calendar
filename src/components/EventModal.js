import React from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import ApiClient from '../apiClient';

const moment = extendMoment(Moment);

export default class EventModal extends React.Component {
    constructor(props) {
        super(props);
        this.event = new ApiClient();
        this.trainers = [];
        this.resources = [];
        const eventInfo = this.event.getEvent(this.props.event.id);
        eventInfo.then((response) => {
            this.response = response;
            this.response.speakers.map((id) => {
                const trainers = this.event.getTrainers(id);
                trainers.then((trainerResponse) => {
                    this.trainers.push(trainerResponse);
                });
            });
            this.response.resources.map((item) => {
                this.resources.push(item);
            });
        });
    }

    render() {
        const eventData = this.response;
        const resourcesTemplate = this.resources.map((item, idx) => {
            return (
                <div
                  className="slds-grid event-modal__resources slds-m-around_x-small"
                  key={idx}>
                    <div>
                        <h3 className="slds-m-right_xx-small">
                            <FontAwesome
                              name="paperclip"
                              className="slds-m-right_xx-small"
                            />
                            {item.type}:
                        </h3>
                    </div>
                    <div>
                        <a href={item.resource}>Link
                            <FontAwesome
                              name="globe"
                              className="slds-m-left_xx-small"
                            />
                        </a>
                    </div>
                </div>
            );
        });

        const headerClass = `${this.props.class.split(' ').splice(-1)}-border 
        event-modal__header`;

        if (!this.props.show) {
            return null;
        }

        const trainersTemplate = this.trainers.map((trainer, idx) => {
            return (
                <div key={idx} className="slds-media">
                    <div className="slds-media__figure">
                        <span className="slds-avatar slds-avatar_small">
                            <img
                              alt="avatar"
                              src={trainer.avatar}
                              title="Trainer avatar"
                            />
                        </span>
                    </div>
                    <div className="slds-media__body">
                        <p>{trainer.name}</p>
                    </div>
                </div>
            );
        });
        if (eventData.type !== 'deadline') {
            return (
                <div>
                    <section
                      role="dialog"
                      aria-labelledby="modal-heading-01"
                      aria-describedby="modal-content-id-1"
                      className="slds-modal slds-fade-in-open">
                        <div className="slds-modal__container">
                            <header className={headerClass}>
                                <h2 className="slds-text-heading_large
                                 slds-hyphenate event-modal__h2">
                                    {eventData.title}
                                </h2>
                            </header>
                            <div className="slds-modal__content
                            slds-p-around_medium">
                                <div className="slds-grid slds-grid_align-spread">
                                    <div className="event-modal__time">
                                        <FontAwesome
                                          name="clock-o"
                                          className="icon-margin"
                                        />
                                        {moment(eventData.start).format('hh:mm')}
                                    </div>
                                    <div className="event-modal__trainers">
                                        {trainersTemplate}
                                    </div>
                                </div>
                                <div className="event-modal__location slds-grid
                                 slds-m-top_x-small slds-m-bottom_x-small">
                                    <div>
                                        <h2 className="slds-text-heading--small">
                                            <FontAwesome
                                              name="map-marker"
                                              className="slds-m-right_xx-small"
                                            />
                                        </h2>
                                    </div>
                                    <div className="slds-text-heading--small">
                                        {eventData.location}
                                    </div>
                                </div>
                                <div className="event-modal__description">
                                    {eventData.description}
                                </div>
                                <h2 className="slds-text-heading--small
                                 slds-m-top_x-small slds-m-bottom_x-small">
                                    <FontAwesome
                                      name="thumb-tack"
                                      className="slds-m-right_xx-small"
                                    />
                                    RESOURCES: </h2>
                                <div className="slds-card">
                                    {resourcesTemplate}
                                </div>
                                <div className="slds-form-element">
                                    <h2 className="slds-text-heading--small
                                    slds-m-top_x-small slds-m-bottom_x-small">
                                        <FontAwesome
                                          name="commenting"
                                          className="slds-m-right_xx-small"
                                        />
                                        CREATE FEEDBACK: </h2>
                                    <div className="slds-form-element__control
                                     event-modal__feedback">
                                        <textarea
                                          rows={3}
                                          id="textarea-id-01"
                                          className="slds-textarea"
                                          placeholder="Enter your feedback"
                                        />
                                    </div>
                                    <button
                                      className="slds-button slds-button_neutral
                                      slds-m-top_xx-small"
                                      onClick=""
                                      type="submit">
                                        Send feedback
                                    </button>
                                </div>
                            </div>
                            <footer className="slds-modal__footer">
                                <button
                                  className="slds-button slds-button_neutral"
                                  onClick={this.props.onClose}>
                                    Close
                                </button>
                            </footer>
                        </div>
                    </section>
                    <div className="slds-backdrop slds-backdrop_open" />
                </div>
            );
        }
        return (
            <div className="demo-only">
                <section
                  role="dialog"
                  aria-labelledby="modal-heading-01"
                  aria-describedby="modal-content-id-1"
                  className="slds-modal slds-fade-in-open">
                    <div className="slds-modal__container">
                        <header className={headerClass}>
                            <h2 className="slds-text-heading_large
                            slds-hyphenate event-modal__h2">
                                {eventData.title}
                            </h2>
                        </header>
                        <div className="slds-modal__content
                         slds-p-around_medium">
                            <div className="slds-grid slds-grid_align-spread">
                                <div className="event-modal__time">
                                    <FontAwesome
                                      name="clock-o"
                                      className="icon-margin"
                                    />
                                    {moment(eventData.start).format('hh:mm')}
                                </div>
                                <div className="event-modal__trainers">
                                    {trainersTemplate}
                                </div>
                            </div>
                            <div className="event-modal__description">
                                {eventData.description}
                            </div>
                        </div>
                        <footer className="slds-modal__footer">
                            <button
                              className="slds-button slds-button_neutral"
                              onClick={this.props.onClose}>
                                Close
                            </button>
                        </footer>
                    </div>
                </section>
                <div className="slds-backdrop slds-backdrop_open" />
            </div>
        );
    }
}
