import React, { Component } from "react";
import "./Timer.css";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      days: 35,
      hours: 17,
      minutes: 9,
      seconds: 43,
      time_up: ""
    };
    this.x = null;
  }

  count() {
    const { days, hours, minutes, seconds } = this.state;
    let totalSeconds =
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds - 1;

    if (totalSeconds < 0) {
      clearInterval(this.x);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        time_up: "TIME IS UP"
      });
    } else {
      const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
      const remainingHours = Math.floor(
        (totalSeconds % (24 * 60 * 60)) / (60 * 60)
      );
      const remainingMinutes = Math.floor(
        (totalSeconds % (60 * 60)) / 60
      );
      const remainingSeconds = Math.floor(totalSeconds % 60);

      this.setState({
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds
      });
    }
  }

  componentDidMount() {
    this.x = setInterval(this.count, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.x);
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div id="countdown">
        <div className="col-4">
          <div className="box">
            <p id="day">{days < 10 ? "0" + days : days}</p>
            <span className="text">Days</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
            <span className="text">Hours</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
            <span className="text">Minutes</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
