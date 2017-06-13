import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Controls extends React.Component {
    render() {
        return (
            <div className="calendar__controls slds-grid slds-wrap">
                <div className="slds-p-horizontal_small slds-size_2-of-2
                slds-medium-size_2-of-6
                slds-large-size_4-of-12">
                    <h2>{this.props.month}</h2>
                </div>
                <div className="slds-p-horizontal_small slds-size_2-of-2
                slds-medium-size_2-of-6 slds-large-size_4-of-12">
                    <h2 className="year-position">{this.props.year}</h2>
                </div>
                <div className="slds-p-horizontal_small slds-size_1-of-2
                slds-medium-size_1-of-6 slds-large-size_2-of-12
                slds-x-small-size_3-of-6">
                    <div className="slds-grid calendar__controls-toggle">
                        <div className="week-mode">
                            <label htmlFor=" ">WEEK MODE</label>
                        </div>
                        <div>
                            <div className="slds-form-element">
                                <label className="slds-checkbox_toggle slds-grid">
                                    <input
                                      type="checkbox"
                                      name="checkbox"
                                      aria-describedby="toggle-desc"
                                    />
                                    <span
                                      id="toggle-desc"
                                      className="slds-checkbox_faux_container"
                                      aria-live="assertive"
                                      onClick={this.props.toWeek}>
                                        <span className="slds-checkbox_faux" />
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slds-p-horizontal_small
                slds-size_1-of-2 slds-medium-size_1-of-6
                slds-large-size_2-of-12">
                    <div className="slds-clearfix">
                        <div className="slds-float_right">
                            <div className="slds-button-group" role="group">
                                <button
                                  className="slds-button slds-button_neutral"
                                  onClick={this.props.toPrev}>
                                    <FontAwesome
                                      name="arrow-left"
                                      className="btn-icon"
                                      ariaLabel="false"
                                    />
                                </button>
                                <button
                                  className="slds-button slds-button_neutral"
                                  onClick={this.props.toNext}>
                                    <FontAwesome
                                      name="arrow-right"
                                      className="btn-icon"
                                      ariaLabel="false"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
