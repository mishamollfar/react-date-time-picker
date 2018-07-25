import * as React        from 'react';
import { ValidatorDate } from '../utils/validator-date';
import './Hours.css';

interface IHoursProps {
  onChangeHours: (item: number) => {};
  date: string;
  selectedHour: number;
}

interface IHoursState {
  hours: number[];
}

export default class Hours extends React.Component<IHoursProps, IHoursState> {
  public validate = new ValidatorDate(this.props.date, this.props.selectedHour);

  constructor(public props: IHoursProps) {
    super(props);
    this.state = { hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] };
  }

  public hourNow = (hour: number) => {
    const nowDate = this.validate.verifyEqualDate;
    return hour === this.validate.dateNow.getHours() && nowDate;
  };

  public checkedHour = (hour: number) => {
    return hour === this.props.selectedHour;
  };

  public selectHour(hour: number) {
     this.props.onChangeHours(hour);
  };

  public render() {
    return (
      <div className="time-container">
        {this.state.hours.map((item, i) => (
          <button
            key={i}
            onClick={this.selectHour.bind(this, item)}
            disabled={this.validate.disableTime({ time: item, period: 'hour' })}
            className={
              'button minute ' + (this.checkedHour(item) ? 'checked ' : '') + (this.hourNow(item) ? 'date-now' : '')
            }
          >
            <span className="mark">{item}</span>:00
          </button>
        ))}
      </div>
    );
  }
}
