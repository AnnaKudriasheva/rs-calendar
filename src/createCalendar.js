import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function getMonthCalendar(month, year) {
    const startDate = moment({ year, month });
    const calendar = [];
    const startWeek = moment(startDate).startOf('month').week();
    const endWeek = moment(startDate).endOf('month').week();
    if (startWeek > endWeek) {
        for (let week = startWeek; week <= startWeek + 4; week++) {
            calendar.push({
                week,
                days: new Array(7).fill(0).map((n, i) =>
                    moment(startDate).week(week).startOf('isoweek').clone()
                        .add(n + i, 'day')),
            });
        }
    } else {
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push({
                week,
                days: new Array(7).fill(0).map((n, i) =>
                    moment(startDate).week(week).startOf('isoweek').clone()
                        .add(n + i, 'day')),
            });
        }
    }
    return calendar;
}


export function getWeekCalendar(week, month, year) {
    const calendar = [];
    let changeMonth = false;
    for (let i = 0; i < 7; i++) {
        if(i === 0) {
            calendar.push(moment({year, month}).startOf('isoWeek').week(week));
        } else {
            calendar.push(moment({year, month}).startOf('isoWeek').week(week).add(i, 'days'));
        }
    }
    calendar.map((day) => {
        if (day.month() !== month) {
            changeMonth = true;
        }
    });

    return {
        calendar,
        changeMonth,
    };
}
