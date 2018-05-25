import React from 'react'
import YouTube from 'react-youtube'
// import { ActionCable } from 'react-actioncable-provider'
import Emotions from './Emotions'
import { getUser, setTime, addingEmotion, cleanTimeEmotion, timeEmotion, getEmotions, getVideos, handleFunny, filterEmotions } from '../actions/actions'
import { connect } from 'react-redux'

let setThisTime
let videoTime

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
        this._onPlay(this.state.e)
      })
    }
  }

  _onPlay = (e) => {
    clearInterval(this.props.setTheTime)
    console.log(Math.floor(e.target.getDuration()));
    const emotions = this.props.filterEmotions(this.props.emotions, this.props.currentVideo)
    const time = this.props.timeEmotion
    const arr = []
    const pause = this._onPause
    setThisTime = setInterval(function(){
      if(Math.floor(e.target.getDuration()) === Math.floor(e.target.getCurrentTime())) {
        time(arr)
        pause()
      } else {
        const emo = emotions.payload.filter(emotion => emotion.time === Math.floor(e.target.getCurrentTime()))
        time(emo)
      }
      console.log(":)");
     }, 1000);
    this.props.setTime(setThisTime)
    this.setState({e: e},() => {
      if(this.state.liked) {
        this.props.handleFunny(this.props.single, Math.floor(e.target.getCurrentTime()), this.props.currentUser)
        this.setState({liked: false})
      }
      this.setState({pause: false})
    })
  }

  _onPause = (e) => {
    clearInterval(this.props.setTheTime)
    this.setState({pause: true})
  }

  // clearTime = () => {
  //   return clearInterval(setThisTime)
  // }

  // handleSocketResponse = data => {
  //   switch (data.type) {
  //
  //     case 'ADD_EMOTION':
  //       this.handleClick()
  //       break;
  //     default:
  //       return data
  //   }
  // }

  // {this.props.currentVideo ? <ActionCable
  //   channel={{channel: 'VideoChannel', video_id: this.props.currentVideo.id}}
  //   onReceived={this.handleSocketResponse}
  //   /> : null}

  render() {

    return(
      <div className="col-md-8  mb-4 col-centered mx-auto form-white">
        {!this.state.pause ? <Emotions/> : null}
        <YouTube
          videoId={this.props.single.id.videoId}
          onReady={this._onReady}
          liked={this.state.liked}
          onClick={this.handleClick}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />

        <button type="button" className="btn button" onClick={this.handleClick}>Like</button>
        <button type="button" className="btn button" onClick={this.props.back}>Back</button>

      </div>
    )
  }
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps, {getUser, setTime, addingEmotion, cleanTimeEmotion, timeEmotion, handleFunny, getEmotions, getVideos, filterEmotions})(Video);
