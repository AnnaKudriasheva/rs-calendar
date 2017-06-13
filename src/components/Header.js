import React from 'react';
import logo from '../../images/logo_rs.png';

export default class Header extends React.Component {
    render() {
        return (
            <header className="slds-global-header_container">
                <div className="header slds-grid slds-grid_align-center">
                    <div className="slds-global-header__item">
                        <div className="header__main-logo">
                            <img
                              src={logo}
                              alt=""
                            />
                        </div>
                    </div>
                    <div className="slds-global-header__item">
                        <div className="header__calendar">
                            <p>CALENDAR</p>
                            <p>Track your study...</p>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
