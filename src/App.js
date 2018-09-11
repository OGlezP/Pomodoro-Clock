import React from 'react';
import './App.min.css';

var varToStop;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLenght: 25,
      breakLenght: 5,h
      seconds: 60,
      minutes: 25,
      nameSession: 'Session',
      currentState: 'stop',
      urlBeep: 'https://goo.gl/65cBl1',
      buttonState: 'enabled',
    }
    this.handleBreakOperation = this.handleBreakOperation.bind(this);
    this.handleSessionOperation = this.handleSessionOperation.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.runBreak = this.runBreak.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleBreakOperation(operation){
   if(this.state.buttonState === 'enabled'){
     if (operation === 'rest') {
       if(this.state.breakLenght > 1){
         this.setState({
           breakLenght: this.state.breakLenght - 1
         });
       }
     } else {
       if(this.state.breakLenght < 60){
         this.setState({
           breakLenght: this.state.breakLenght + 1
         })
       }
     }
   }
 }


  handleSessionOperation(operation){
    if(this.state.buttonState === 'enabled'){
      if (operation === 'rest') {
        if(this.state.sessionLenght > 1) {
          this.setState({
            minutes: this.state.sessionLenght-1,
            seconds: 60,
            sessionLenght: this.state.sessionLenght - 1
          })
        }
      } else {
        if(this.state.sessionLenght < 60) {
          this.setState({
            minutes: this.state.sessionLenght+1,
            seconds: 60,
            sessionLenght: this.state.sessionLenght + 1
          })
        }
      }
    }
  }

  handleStartStop() {
    this.state.currentState === 'stop' ? (
      this.setState({currentState: 'play', buttonState: 'disabled'}),
      varToStop = setInterval(() => this.handleDiscount(), 1000)
    ) : (
      this.setState({currentState: 'stop', buttonState: 'enabled'}),
      clearInterval(varToStop)
    )
  }

  handleDiscount(){
    if (this.state.seconds >= 1) {
      this.setState(e => ({seconds: e.seconds  -  1}));
      if (this.state.minutes === this.state.sessionLenght) {
        this.setState({minutes: this.state.minutes - 1});
      }
      this.state.seconds < 10 ? this.setState({seconds: '0' + this.state.seconds}) : this.setState({seconds: this.state.seconds})
      if (this.state.minutes === 0 && this.state.seconds === 0){
        this.audio.play();
      }
    } else {
        this.state.minutes >=1 ? this.setState({minutes: this.state.minutes-1, seconds: 59}) : this.runBreak()
      }
  }

  runBreak() {
    if (this.state.nameSession === 'Session'){
      this.setState({
        minutes: this.state.breakLenght,
        nameSession: 'Break',
      });
    } else {
      this.setState({
        minutes: this.state.sessionLenght,
        nameSession: 'Session',
      });
    }

  }

  reset() {
    this.setState({
      sessionLenght: 25,
      breakLenght: 5,
      seconds: 60,
      minutes: 25,
      nameSession: 'Session',
      currentState: 'stop',
      buttonState: 'enabled',
    });
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(varToStop);
  }

  render () {
    return (
      <div id="main-container">
        <h1 id="title">POMODORO CLOCK</h1>
        <h3 id="title">By OGLEZP</h3>
          <div id="break-container">
            <h2 id="break-label">Break Length</h2>
            <i id="break-decrement" onClick={() => this.handleBreakOperation('rest')} className="fa fa-minus-circle"></i>
            <i id="break-length">{this.state.breakLenght}</i>
            <i id="break-increment" onClick={() => this.handleBreakOperation('plus')} className="fa fa-plus-circle"></i>
          </div>
          <div id="session-container">
            <h2 id="session-label">Session Length</h2>
            <i id="session-decrement" onClick={() => this.handleSessionOperation('rest')} className="fa fa-minus-circle"></i>
            <i id="session-length">{this.state.sessionLenght}</i>
            <i id="session-increment" onClick={() => this.handleSessionOperation('plus')} className="fa fa-plus-circle"></i>
          </div>
          <div id="message-container">
            <h2 id="timer-label">{this.state.nameSession}</h2>
            <p id="time-left">
              {this.state.minutes < 10 ?
              '0' + this.state.minutes :
              this.state.minutes}:
              {this.state.seconds === 60 ?
              '00' : this.state.seconds}
            </p>
          </div>
        <audio id="beep" src={this.state.urlBeep} ref={(alarm) => { this.audio = alarm; }} />
        <button id="start_stop"  onClick={this.handleStartStop}>
          <i className="fa fa-play-circle" />
          <i className="fa fa-pause" />
        </button>
        <button id="reset" onClick={this.reset}>
          <i className="fa fa-refresh"/>
        </button>
      </div>
    );
  }
}

export default PomodoroClock;
