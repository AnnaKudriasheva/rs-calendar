import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import FontAwesome from 'react-fontawesome';
import Legend from '../components/Legend';
import ApiClient from '../apiClient';
import Controls from './Controls';
import CalendarDay from './CalendarDay';
import { getMonthCalendar, getWeekCalendar } from '../createCalendar';

const moment = extendMoment(Moment);
let storage = {};

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.currentWeek = moment().week();
        this.currentMonth = moment().month();
        this.currentYear = moment().year();
        this.apiClient = new ApiClient();

        const events = this.apiClient.getEvents();
        events.then((response) => {
            response.map((item) => {
                const date = moment(item.start).format('YYYY-MM-DD');
                if (!(date in storage)) {
                    storage[date] = [];
                }
                storage[date].push({
                    id: item.id,
                    title: item.title,
                    start: item.start,
                    type: item.type,
                });
            });
            this.setState({ storage });
        });
        this.state = {
            date: this.props.date,
            curr: this.currentMonth,
            month: moment().month(this.currentMonth).format('MMMM'),
            year: this.currentYear,
            calendar: getMonthCalendar(this.currentMonth, this.currentYear),
            storage: false,
            week: false,
            nextWeek: 0,
            prevWeek: 0,
        };

    }

    toWeekView() {
        if (!this.state.week) {
            this.currentWeek = moment().week();
            this.currentMonth = moment().month();
            this.setState({
                curr: moment().month(),
                week: true,
                month: moment().month(this.currentMonth).format('MMMM'),
                calendar: getWeekCalendar(this.currentWeek, this.currentMonth).calendar,
            });
        } else {
            this.setState({
                week: false,
                calendar: getMonthCalendar(this.currentMonth, this.currentYear),
            });
        }
    }

    toNextMonth() {
        this.setState({
            storage: false,
        });

        let result;
        let changeMonth = false;
        const events = this.apiClient.getEvents();
        storage = {};

        if (this.state.week) {
            this.currentWeek += 1;
            const weekData = getWeekCalendar(this.currentWeek, this.currentMonth, this.currentYear);
            result = weekData.calendar;
            changeMonth = weekData.changeMonth;
            if (changeMonth) {
                if (this.currentMonth <= 10) {
                    this.currentMonth += 1;
                }
                else {
                    this.currentYear += 1;
                    this.currentMonth = 0;
                }
            }

        } else {
            if (this.currentMonth <= 10) {
                this.currentMonth += 1;
            }
            else {
                this.currentYear += 1;
                this.currentMonth = 0;
            }
            result = getMonthCalendar(this.currentMonth, this.currentYear);
        }


        events.then((response) => {
            response.map((item) => {
                let date = moment(item.start).format('YYYY-MM-DD');
                if (!(date in storage)) {
                    storage[date] = [];
                }
                storage[date].push({
                    id: item.id,
                    title: item.title,
                    start: item.start,
                    type: item.type,
                });
            });

            this.setState({
                curr: this.currentMonth,
                year: this.currentYear,
                month: moment().month(this.currentMonth).format('MMMM'),
                calendar: result,
                storage,
            });
        });
    }

    toPrevMonth() {
        this.setState({
            storage: false,
        });

        let result;
        let changeMonth = false;
        const events = this.apiClient.getEvents();
        storage = {};

        if (this.state.week) {
            this.currentWeek -= 1;
            let weekData = getWeekCalendar(this.currentWeek, this.currentMonth, this.currentYear);
            result = weekData.calendar;
            changeMonth = weekData.changeMonth;
            if (changeMonth) {
                if (this.currentMonth === 0) {
                    this.currentYear -= 1;
                    this.currentMonth = 11;
                } else {
                    this.currentMonth -= 1;
                }
            }
        } else {
            if (this.currentMonth === 0) {
                this.currentYear -= 1;
                this.currentMonth = 11;
            } else {
                this.currentMonth -= 1;
            }

            result = getMonthCalendar(this.currentMonth, this.currentYear);
        }

        events.then((response) => {
            response.map((item) => {
                const date = moment(item.start).format('YYYY-MM-DD');
                if (!(date in storage)) {
                    storage[date] = [];
                }
                storage[date].push({
                    id: item.id,
                    title: item.title,
                    start: item.start,
                    type: item.type,
                });
            });

            this.setState({
                curr: this.currentMonth,
                year: this.currentYear,
                month: moment().month(this.currentMonth).format('MMMM'),
                calendar: result,
                storage,
            });
        });
    }

    render() {
        let calendarTemplate;
        let calendarDays;
        const days = this.props.days;
        const currMonth = this.state.month;
        const currYear = this.state.year;
        const daysNamesTemplate = days.map((item, index) => {
            return (
                <div key={index} className="slds-size_1-of-7">
                    <span className="day-name slds-align_absolute-center">
                        {item}
                    </span>
                </div>
            );
        });

        if (!this.state.storage) {
            return (
                <div className="calendar">
                    <Legend />
                    <Controls
                      month={currMonth}
                      year={currYear}
                      toNext={this.toNextMonth.bind(this)}
                      toPrev={this.toPrevMonth.bind(this)}
                      toWeek={this.toWeekView.bind(this)}
                    />
                    <div className="calendar__day-names slds-grid slds-wrap">
                        <div
                          role="status"
                          className="slds-spinner slds-align_absolute-center
                          slds-spinner_large spinner">
                            <div className="slds-spinner__dot-a" />
                            <div className="slds-spinner__dot-b" />
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.week) {
            calendarTemplate = this.state.calendar.map((day, idx) => {
                let dayEvents = false;
                let dayAgenda = 'RELAX. LEARN JS. CODEWARS. ENGLISH.';
                let key = moment(day).format('YYYY-MM-DD');
                if (this.state.storage[key]) {
                    dayEvents = [];
                    this.state.storage[key].map(el => {
                        dayEvents.push(el);
                    });
                    dayAgenda = 'DAY AGENDA';
                }
                return (
                    <div
                        key={idx}
                        className="slds-grid slds-wrap slds-grid_vertical-stretch">
                        <div className="slds-size_1-of-8">
                            <article className=" calendar__card-week">
                                <div className="slds-card__header slds-grid">
                                    <header className="slds-media
                                    slds-media_center slds-has-flexi-truncate">
                                        <div className="slds-media__figure calendar__day">
                                            {day.toDate().getDate().toString()}
                                        </div>
                                        <div className="slds-media__body">
                                            <h2 className="calendar__day">
                                                <FontAwesome
                                                    name="calendar"
                                                    className="icon-margin
                                                  icon-calendar"/>
                                            </h2>
                                        </div>
                                    </header>
                                </div>
                                <div
                                    className="slds-card__body slds-card__body_inner">
                                    <h2 className="calendar__day">{days[idx]}</h2>
                                </div>
                            </article>
                        </div>
                        <div className="slds-size_7-of-8">
                            <article className="slds-card calendar__card">
                                <div className="slds-card__header slds-grid">
                                    <header className="slds-media
                                slds-media_center slds-has-flexi-truncate">
                                        <div className="slds-media__figure"/>
                                        <div className="slds-media__body">
                                            <h2 className="slds-text-heading">
                                                {dayAgenda}
                                            </h2>
                                        </div>
                                    </header>
                                </div>
                                <div
                                    className="slds-card__body slds-card__body_inner">
                                    <CalendarDay data={dayEvents} type="week"/>
                                </div>
                            </article>
                        </div>
                    </div>
                );
            });
        } else {
            const daysTemplate = this.state.calendar.map((week) => {
                return week.days.map((day, idx) => {
                    let cardType = 'slds-card calendar__card';
                    let dayEvents = false;
                    const key = moment(day).format('YYYY-MM-DD');
                    if (this.state.storage[key]) {
                        dayEvents = [];
                        this.state.storage[key].map(el => {
                            dayEvents.push(el);
                        });
                    }
                    if (day.month() !== this.state.curr) {
                        cardType = 'calendar__card-disabled';
                    } else if (key === moment().format('YYYY-MM-DD')) {
                        cardType = 'calendar__card-today';
                    }
                    return (
                        <div
                            key={idx}
                            className="slds-size_1-of-7">
                            <article className={cardType}>
                                <div className="slds-card__header slds-grid">
                                    <header className="slds-media
                                slds-media_center slds-has-flexi-truncate">
                                        <div className="slds-media__figure"/>
                                        <div className="slds-media__body">
                                            <h2 className="calendar__day">
                                                {day.toDate().getDate().toString()}
                                            </h2>
                                        </div>
                                    </header>
                                </div>
                                <div className="slds-card__body slds-card__body_inner">
                                    <CalendarDay
                                      data={dayEvents}
                                      type="month"
                                    />
                                </div>
                            </article>
                        </div>
                    );
                });
            });

            calendarTemplate = this.state.calendar.map((week, idx) => {
                return (
                    <div
                      key={idx}
                      className="slds-grid_vertical-stretch slds-grid slds-wrap">
                        {daysTemplate[idx]}
                    </div>
                );
            });

            calendarDays = (
                <div className="calendar__day-names slds-grid slds-wrap">
                    {daysNamesTemplate}
                </div>
            )
        }
        return (
            <div className="calendar">
                <Legend />
                <Controls
                  month={currMonth}
                  year={currYear}
                  toNext={this.toNextMonth.bind(this)}
                  toPrev={this.toPrevMonth.bind(this)}
                  toWeek={this.toWeekView.bind(this)}
                />
                {calendarDays}
                {calendarTemplate}
            </div>
        );
    }
}
