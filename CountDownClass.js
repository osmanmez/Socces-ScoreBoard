import React from 'react';

let timerID = null

export default class CountDownTimer extends React.Component {
    // Set up state variables
    constructor(props) {
        super(props);
        const { hours = 0, minutes = 0, seconds = 0 } = props;
        this.state = {
            time: {
                hours: parseInt(hours, 10),
                minutes: parseInt(minutes, 10),
                seconds: parseInt(seconds, 10)
            },
            paused: false,
            over: false
        };
    }

    tick() {
        const { time, paused, over } = this.state;
        console.log(time, paused, over);
        // Do nothing if paused
        if (paused || over) return;

        // Time up
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            this.setState({ over: true });
        } else if (time.minutes === 0 && time.seconds === 0) {
            // decrement hour
            this.setState({
                time: {
                    hours: time.hours - 1,
                    minutes: 59,
                    seconds: 59
                }
            });
        } else if (time.seconds === 0) {
            // decrement minutes
            this.setState({
                time: {
                    hours: time.hours,
                    minutes: time.minutes - 1,
                    seconds: 59
                }
            });
        } else {
            // decrement seconds
            this.setState({
                time: {
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds - 1
                }
            });
        }
    };

    // Resets counter to original state
    reset() {
        const {
                  props: { hours = 0, minutes = 0, seconds = 0 }
            } = this;

        this.setState({
            time: {
                hours: parseInt(hours, 10),
                minutes: parseInt(minutes, 10),
                seconds: parseInt(seconds, 10)
            },
            paused: false,
            over: false
        });
    };

    componentDidMount() {
        timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        // clear time on unmount
        timerID = null
    }

    render() {
        const {
            state: { time, paused, over },
            reset
        } = this;
        return ( 
        <div>
            <p> { `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}` } </p> 
            <div > { over ? "Time's up!" : '' } </div> 
            <button onClick = {
                () => this.setState({ paused: !paused })
            } > { paused ? 'Resume' : 'Pause' } 
            </button> 
            <button onClick = {
                () => reset()
            } > Restart </button> 
          </div>
        );
    }
}