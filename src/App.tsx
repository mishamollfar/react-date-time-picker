import * as React     from 'react';
import './App.css';
import DateTimePicker from './components/DateTimePicker/DateTimePicker/DateTimePicker';

import logo from './logo.svg';

class App extends React.Component {
    constructor(public props: any) {
        super(props);
    }

    public changeDateTime = (date: any): any => {
        console.log('changeDateTime', date);
    };

    public render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to component react-date-time-picker</h1>
            </header>
            <p className="App-intro">
                To get install you must run command clone this repository.
              in the future we created package on the npm
              <code className="code">npm install react-date-time-picker</code>
            </p>
            <p className="App-intro">
              and after installed package you use this component.
            </p>

            <div className="date-time-picker-btn">
              <span className="text">Select date time:</span>
              <DateTimePicker title={'select date-time'} onChangeDateTime={this.changeDateTime}/>
            </div>
          </div>
        );
    }
}

export default App;
