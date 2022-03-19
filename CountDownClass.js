import React, { useState } from 'react';

let timerID = null
let path = "http://localhost:8080/sounds/audio.mp3";
let audio = new Audio(path);


//
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
            paused: true,
            over: true,
            play: false,
            disabled: false,
            extra: false
        };
    }

    tick() {
//        const [disabled, setDisabled] = useState(false);
//        const [users, setUsers] = this.useState(false);
        
        const { time, paused, over, play } = this.state;
      //  console.log(time, paused, over, play);
       // this.setState({disabled: false});    
        // Do nothing if paused
        if (paused || over) return;


        if (time.hours === 0 && time.minutes === 0 && time.seconds < 25 && !play) {
            audio.play();
            this.setState({ play: true });
            this.setState({ extra: true });
        } 
        // Time up
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0 ) {
            this.setState({ over: true });
            this.setState({paused: true});
            this.setState({disabled: false});

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
            over: false,
            play: false,
            extra: false,
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
//      const [disable, setDisable] = useState(0);

        const { state: { time, paused, over, play, disabled, extra }, reset } = this;
        
        return ( 
                <div>
                    <p className={`${!extra ? "stopwatch-time" : "stopwatch-time2"}`}> { `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}` } </p> 
                     { over ? <div className='pb-4 text-warning fw-bold'>¡Juego terminado!</div> : '' }  
                    <p className='stopwatch-button' >
                        <button disabled={over} onClick = { () => this.setState({ paused: !paused }) } > { paused ? 'CONTINUAR' : 'DETENER' }  </button> 
                        <button disabled={disabled}  onClick = { () => this.reset()}   > INICIAR </button>
                    </p> 
                </div>
        );
    }
}