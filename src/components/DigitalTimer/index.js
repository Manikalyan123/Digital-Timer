// Write your code here
import {Component} from 'react'
import './index.css'
import {connect} from 'http2'

class DigitalTimer extends Component {
  state = {play: false, timeInSec: 0, minTimeInMin: 25}

  visibleTimer = () => {
    const {timeInSec, minTimeInMin} = this.state
    const totalSeconds = minTimeInMin * 60 - timeInSec
    const Mins = Math.floor(totalSeconds / 60)
    const Secs = Math.floor(totalSeconds % 60)
    const Min = Mins > 9 ? Mins : `0${Mins}`
    const Sec = Secs > 9 ? Secs : `0${Secs}`
    return `${Min}:${Sec}`
  }

  incrementSecs = () => {
    const {timeInSec, minTimeInMin} = this.state
    const isTimeCompleted = timeInSec === minTimeInMin * 60

    if (isTimeCompleted) {
      clearInterval(this.intervalId)
      this.setState({play: false})
    } else {
      this.setState(prevState => ({timeInSec: prevState.timeInSec + 1}))
    }
  }

  onClickPlayPause = () => {
    const {play, timeInSec, minTimeInMin} = this.state
    if (play) {
      this.clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementSecs, 1000)
    }
    this.setState(prevState => ({play: !prevState.play}))
  }

  onClickResetBtn = () => {
    this.setState({timeInSec: 0})
  }

  onIncrement = () => {
    this.setState(prevState => ({minTimeInMin: prevState.minTimeInMin + 1}))
  }
  onDecrement = () => {
    const {minTimeInMin} = this.state
    if (minTimeInMin > 0) {
      this.setState(prevState => ({minTimeInMin: prevState.minTimeInMin - 1}))
    }
  }

  changeButtonCode = () => {
    const {play} = this.state

    const buttonCode = play ? (
      <div className="play-cont">
        <button
          onClick={this.onClickPlayPause}
          type="button"
          className="play-pause-btn"
        >
          {' '}
          <img
            className="pause-image"
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            alt="pause"
          />
        </button>

        <p className="play-text">Running</p>
      </div>
    ) : (
      <div className="play-cont">
        <button
          onClick={this.onClickPlayPause}
          type="button"
          className="play-pause-btn"
        >
          <img
            className="pause-image"
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            alt="pause"
          />
        </button>
        <p className="play-text">Start</p>
      </div>
    )
    return buttonCode
  }

  render() {
    const {minTimeInMin, play, timeInSec} = this.state
    return (
      <div className="Main-Cont">
        <h1>Digital Timer</h1>
        <div className="Cont">
          <div className="image-Cont">
            <div className="time-display-cont">
              <h1 className="counter">{this.visibleTimer()}</h1>
              <p className="plus">Paused</p>
            </div>
          </div>

          <div className="content-cont">
            <div className="pause-reset-Cont">
              <div>{this.changeButtonCode()}</div>
              <div className="reset-cont">
                <button
                  onClick={this.onClickResetBtn}
                  type="button"
                  className="play-pause-btn"
                >
                  <img
                    className="reset"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt=""
                  />
                  <p1 className="play-text">reset</p1>
                </button>
              </div>
            </div>
            <p className="passage">Set time limit</p>
            <div className="change-num-cont">
              <button
                type="button"
                className="play-pause-btn"
                onClick={this.onDecrement}
              >
                <p className="plus">-</p>
              </button>
              <div className="change-num">
                <p className="plus">{minTimeInMin}</p>
              </div>
              <button
                type="button"
                className="play-pause-btn"
                onClick={this.onIncrement}
              >
                <p className="plus">+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
