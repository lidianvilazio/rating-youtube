import React from 'react'
import YouTube from 'react-youtube';
import Emotions from './Emotions'
import {getUser, cleanTimeEmotion, timeEmotion, getEmotions, getVideos, handleFunny, filterEmotions} from '../actions/actions'
import {connect} from 'react-redux'

let setTime

class Video extends React.Component {

  state = {
    liked: false,
    e: null,
    pause: true,
    v: null,
  }

  componentDidMount() {
    this.props.getVideos()
  }

  handleClick = () => {
    if(this.state.pause === false) {
      this.setState({liked: true}, () => {
        clearTimeout(setTime)
        this._onPlay(this.state.e)
      })
    }
  }

  _onPlay = (e) => {
    const emotions = this.props.filterEmotions(this.props.emotions, this.props.currentVideo)
    const time = this.props.timeEmotion
    const clean = this.props.cleanTimeEmotion
    setTime = setInterval(function(){
      const emo = emotions.payload.filter(emotion => emotion.time === Math.floor(e.target.getCurrentTime()))
      time(emo)
     }, 1000);
    this.setState({e: e},() => {
      if(this.state.liked) {
        this.props.handleFunny(this.props.single, Math.floor(e.target.getCurrentTime()), this.props.currentUser)
        this.setState({liked: false})
      }
      this.setState({pause: false})
    })
  }

  _onPause = (e) => {
    clearTimeout(setTime)
    this.setState({pause: true})
  }

  render() {

    return(
      <div className="col-md-8  mb-4 col-centered mx-auto form-white">
        <Emotions/>
        <YouTube
          videoId={this.props.single.id.videoId}
          onReady={this._onReady}
          liked={this.state.liked}
          onClick={this.handleClick}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />

        <button type="button" className="btn button" onClick={this.handleClick}>Funny</button>
        <button type="button" className="btn button" onClick={this.props.back}>Back</button>

      </div>
    )
  }
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps, {getUser, cleanTimeEmotion, timeEmotion, handleFunny, getEmotions, getVideos, filterEmotions})(Video);
