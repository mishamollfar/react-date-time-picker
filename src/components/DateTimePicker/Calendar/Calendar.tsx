import * as React from 'react';
import './Calendar.css';

interface ICalendarProps {
  onChangeDate: (data: any) => {};
  salectedDate: string;
}

interface ICalendarState {
  daysName: string[];
  monthsName: string[];
  monthsDays: number[];
  monthNow: { name: string; days: number; year: number };
  days: number[];
  prevMonthDays: number[];
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(public props: ICalendarProps) {
    super(props);
    this.state = {
      days: [],
      daysName: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      monthNow: { name: '', days: 0, year: 0 },
      monthsDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthsName: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      prevMonthDays: [],
    };
    setTimeout(() => this.getMounthNow(this.dateNow));
  }

  get dateNow() {
    return new Date();
  }

  public changedDate(day: any) {
    const date = this.createDate(day);
    this.props.onChangeDate(date);
  };

  public createDate(day: any) {
    const year = this.dateNow.getFullYear();
    const month = this.state.monthsName.indexOf(this.state.monthNow.name);
    return new Date(year, month, day);
  }

  public getMounthNow(date: any) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfWeek = this.getFirstMonthDayOfWeek(date);
    this.getDayPrevMonth(firstDayOfWeek);
    this.setState({
      monthNow: { name: this.state.monthsName[month], days: this.state.monthsDays[month], year },
    });
    setTimeout(() => this.genarateMonthDays());
  }

  public genarateMonthDays() {
    const days = [...Array(this.state.monthNow.days).keys()];
    this.setState({ days });
  }

  public getFirstMonthDayOfWeek(datNow: any) {
    return new Date(datNow.getFullYear(), datNow.getMonth()).getDay();
  }

  public getDayPrevMonth(firstDayMonth: any) {
    const day = firstDayMonth - 1;
    const firstDay = day < 0 ? this.state.daysName.length - 1 : day;
    const days = [...Array(firstDay).keys()];
    this.setState({ prevMonthDays: days });
  }

  public prevMonth = () => {
    let selectPrevMonth = this.state.monthsName.indexOf(this.state.monthNow.name) - 1;
    let year = this.state.monthNow.year;
    if (selectPrevMonth < 0) {
      selectPrevMonth = this.state.monthsName.length - 1;
      year = this.state.monthNow.year - 1;
    }
    this.getMounthNow(new Date(year, selectPrevMonth));
  };

  public nextMonth = () => {
    let selectNextMonth = this.state.monthsName.indexOf(this.state.monthNow.name) + 1;
    let year = this.state.monthNow.year;
    if (selectNextMonth > 11) {
      selectNextMonth = 0;
      year = this.state.monthNow.year + 1;
    }
    this.getMounthNow(new Date(year, selectNextMonth));
  };

  get disablePrevMonth() {
    return this.state.monthsName.indexOf(this.state.monthNow.name) === this.dateNow.getMonth();
  }

  public weekendDay(day: any) {
    return day === 5 || day === 6;
  }

  public dayNow = (day: any) => {
    const dayNow = this.dateNow.getDate();

    return day === dayNow && this.verifyMothAndYear();
  };

  public verifyMothAndYear() {
    const daySelectMonthNow = this.dateNow.getMonth() === this.state.monthsName.indexOf(this.state.monthNow.name);
    const daySelectYearhNow = this.dateNow.getFullYear() === this.state.monthNow.year;
    return daySelectMonthNow && daySelectYearhNow;
  }

  public checkedDay = (day: any) => {
    return !!this.props.salectedDate ? day === new Date(this.props.salectedDate).getDate() : false;
  };

  public disableDay = (day: any) => {
    return day < this.dateNow.getDate() && this.verifyMothAndYear();
  };

  public render() {
    return (
      <div className="calendar-container">
        <div className="calendar-toolbar">
          <i
            className={'icon' + (this.disablePrevMonth ? ' disable' : ' click')}
            onClick={this.prevMonth}
          >
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path fill="#000000" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </i>
          <span className="month-name">
            {this.state.monthNow.name} {this.state.monthNow.year}г.
          </span>
          <i className="icon click" onClick={this.nextMonth}>
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path fill="#000000" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </i>
        </div>
        <div className="month">
          <div className="day-name">
            {this.state.daysName.map((dayName, i) => (
              <span key={i} className={'button day' + (this.weekendDay(i) ? ' weekend' : '')}>
                {dayName}
              </span>
            ))}
          </div>

          <div className="week-day">
            {this.state.prevMonthDays.map((day, i) => <span key={i} className="button day" />)}
            {this.state.days.map((day, i) => (
              <button
                key={i}
                onClick={this.changedDate.bind(this, day + 1)}
                disabled={this.disableDay(day + 1)}
                className={
                  'button day' +
                  (this.checkedDay(day + 1) ? ' checked ' : '') +
                  (this.dayNow(day + 1) ? ' date-now' : '')
                }
              >
                <span>{day + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
