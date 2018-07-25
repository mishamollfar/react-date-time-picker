import * as React  from 'react';
import CloseButton from '../../CloseButton/CloseButton';
import Calendar    from '../Calendar/Calendar';
import Hours       from '../Hours/Hours';
import Minutes     from '../Minutes/Minutes';
import './DateTimePicker.css';

interface IDateTimePickerProps {
  onChangeDateTime: (data: any) => {};
  title: string;
}

interface IDateTimePickerState {
  hours: number;
  minutes: number;
  dateTime: string;
  show: boolean;
  showCalendar: boolean;
  showHours: boolean;
  showMinuts: boolean;
}

const optionsDatePreview = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };
const optionsDateGoBack = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };

export default class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
  public state = {
    dateTime: '',
    hours: 0,
    minutes: 0,
    show: false,
    showCalendar: false,
    showHours: false,
    showMinuts: false,
  };
  constructor(public props: IDateTimePickerProps) {
    super(props);
  }

  public changeDate = (date: any): any => {
    this.setState({ dateTime: this.convertDate(date), showCalendar: !this.state.showCalendar, showHours: true });
  };

  public changeHours = (hours: number): any => {
    this.setState({
      dateTime: this.convertDate(hours, 'hour'),
      hours,
      showHours: !this.state.showHours,
      showMinuts: !this.state.showMinuts,
    });
  };

  public changeMinutes = (minutes: number): any => {
    this.setState({ dateTime: this.convertDate(minutes, 'minut'), minutes, showMinuts: false, show: false });
    setTimeout(() => this.closeDateTimePicker());
  };

  public convertDate(dateTime: any, type?: 'hour' | 'minut') {
    const dateTS = type ? new Date(this.state.dateTime) : dateTime;
    if (type === 'minut') {
      dateTS.setMinutes(dateTime);
    } else if (type === 'hour') {
      dateTS.setHours(dateTime);
    }
    return new Date(dateTS).toISOString();
  }

  public changeDateTime = () => {
    this.setState({ show: !this.state.show, showCalendar: true });
  };

  public closeDateTimePicker() {
    const date = new Date(this.state.dateTime);
    this.actionToParent(date);
  }

  public changeDateTimeNow = () => {
    const datenow = new Date();
    datenow.setMinutes(5);
    this.actionToParent(datenow);
    this.setState({ show: !this.state.show, dateTime: datenow.toISOString() });
  };

  public actionToParent(data: any) {
    this.props.onChangeDateTime(data);
  }

  public resetDate = (): any => {
    this.actionToParent(null);
    this.setState({ dateTime: '' });
  };

  public goBackPreviewTime = () => {
    const showCalendar: boolean = this.state.showHours;
    const showHours: boolean = this.state.showMinuts;
    const showMinuts = false;
    this.setState({ showCalendar, showHours, showMinuts });
  };

  public render() {
    return (
      <div className="date-time-picker">
        <button className="button shedule" onClick={this.changeDateTime}>
          {this.state.dateTime
            ? new Date(this.state.dateTime).toLocaleString('en-GB', optionsDatePreview)
            : this.props.title}
        </button>
        {this.state.dateTime && <CloseButton onClose={this.resetDate} />}
        {this.state.show && (
          <div className="date-time-overlay">
            {this.state.showCalendar && (
              <button className="button date-now-btn" onClick={this.changeDateTimeNow}>
                <i className="icon">
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path
                      fill="#000000"
                      d="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28
                    7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65
                    18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34
                    18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z"
                    />
                  </svg>
                </i>
              </button>
            )}
            {this.state.showCalendar && <Calendar salectedDate={this.state.dateTime} onChangeDate={this.changeDate} />}

            {!this.state.showCalendar && (
              <button
                className="button go-back"
                onClick={this.goBackPreviewTime}
              >
                {new Date(this.state.dateTime).toLocaleString('en-GB', optionsDateGoBack)}
              </button>
            )}
            {this.state.showHours && (
              <Hours selectedHour={this.state.hours} date={this.state.dateTime} onChangeHours={this.changeHours} />
            )}
            {this.state.showMinuts && (
              <Minutes
                date={this.state.dateTime}
                onChangeMinutes={this.changeMinutes}
                selectedHour={this.state.hours}
                selectedMinute={this.state.minutes}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
