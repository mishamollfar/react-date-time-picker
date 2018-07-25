import * as React        from 'react';
import { ValidatorDate } from '../utils/validator-date';
import './Minutes.css';

interface IMinutesProps {
  onChangeMinutes: (item: number) => {};
  date: string;
  selectedHour: number;
  selectedMinute: number;
}

interface IMinutesState {
  minutes: number[];
}

export default class Minutes extends React.Component<IMinutesProps, IMinutesState> {
  public validate = new ValidatorDate(this.props.date, this.props.selectedHour);

  constructor(public props: IMinutesProps) {
    super(props);
    this.state = { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] };
  }

  public minuteNow = (minute: number) => {
    const nowDate = this.validate.verifyEqualDate;
    const minuts = this.validate.dateNow.getMinutes();
    const delta = minuts - minute;

    return (minute === minuts || (delta > -5 && delta <= 0)) && nowDate;
  };

  public checkedMinute = (minute: number) => {
    return minute === this.props.selectedMinute;
  };

  public selectMinute(minute: number) {
    this.props.onChangeMinutes(minute);
  };

  public render() {
    return (
      <div className="minute-container">
        {this.state.minutes.map((item, i) => (
          <button
            key={i}
            onClick={this.selectMinute.bind(this, item)}
            disabled={this.validate.disableTime({ time: item, period: 'minut' })}
            className={
              'button minute ' +
              (this.checkedMinute(item) ? 'checked ' : '') +
              (this.minuteNow(item) ? 'date-now' : '')
            }
          >
            {this.props.selectedHour}:<span className="mark">{item <= 5 ? '0' + item : item}</span>
          </button>
        ))}
      </div>
    );
  }
}
