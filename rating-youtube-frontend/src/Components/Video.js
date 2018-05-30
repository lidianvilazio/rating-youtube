import React from 'react'
import YouTube from 'react-youtube'
import Emotions from './Emotions'
import { getUser, setTime, addingEmotion, getDislike, getLike, cleanTimeEmotion, timeEmotion, getEmotions, getVideos, handleFunny } from '../actions/actions'
import { connect } from 'react-redux'
import Radar from './Radar'
import Webcam from 'react-webcam';
// import Vision from './Vision'
import vision from "react-cloud-vision-api";
import smiley from '../images/smiley.jpeg'

// const smiley = require('../public/images/smiley.jpeg')

vision.init({ auth: your_api_key})

let setThisTime
let videoTime

class Video extends React.Component {

  state = {
    liked: false,
    e: null,
    pause: true,
    v: null,
    emotionType: null,
    imageSrc: null,
    webcam: null
  }

  componentDidMount() {
    this.props.getVideos()
  }

  setRef = (webcam) => {
    this.setState({webcam: webcam})
  }

  capture = () => {
    // const imageSrc = this.state.webcam.getScreenshot();
    // this.setState({imageSrc: this.state.webcam.getScreenshot()})
    return this.state.webcam.getScreenshot()
  };

  handleClick = (e) => {
    if(this.state.pause === false) {
      // console.log(e);
      this.setState({liked: true, emotionType: e}, () => {
        this._onPlay(this.state.e)
        this.imgOut()
      })
    }
  }

  handleButton = (e) => {
    this.handleClick(e.target.value)
  }

  _onPlay = (e) => {
    clearInterval(this.props.setTheTime)
    this.props.getLike(this.props.currentVideo)
    this.props.getDislike(this.props.currentVideo)
    const like = this.props.like
    const time = this.props.timeEmotion
    const arr = []
    const pause = this._onPause
    const capture = this.capture
    const pauseIf = this.state.pause
    const getPic = this.getPic
    const getEmotion = this.getEmotion
    setThisTime = setInterval(function(){
      if(Math.floor(e.target.getDuration()) === Math.floor(e.target.getCurrentTime())) {
        time(arr)
        pause()
      } else {
        const emo = like.filter(emotion => emotion.time === Math.floor(e.target.getCurrentTime()))
        time(emo)
        getEmotion(getPic(capture()))
      }
     }, 1000);
    this.props.setTime(setThisTime)
    this.setState({e: e},() => {
      if(this.state.liked) {
        console.log(this.state.emotionType);
        this.props.handleFunny(this.props.single, Math.floor(e.target.getCurrentTime()), this.props.currentUser, this.state.emotionType)
        this.setState({liked: false})
      }
      this.setState({pause: false})
    })
  }

  _onPause = (e) => {
    clearInterval(this.props.setTheTime)
    this.setState({pause: true, emotionType: null})
  }

  getPic = (pic) => {
    const req = new vision.Request({
      image: new vision.Image({
      base64: pic,
    }),
    features: [
      new vision.Feature('FACE_DETECTION', 4),
    ]
  })
  return req
  }

  getEmotion = (req) => {
    vision.annotate(req).then((res) => {
      // console.log(res.responses[0].faceAnnotations[0]);
      // console.log(res.responses);
      // console.log(res.responses[0].faceAnnotations);
      if(res.responses[0].faceAnnotations) {
        console.log(res.responses[0].faceAnnotations[0].joyLikelihood);
        if(res.responses[0].faceAnnotations[0].joyLikelihood === "VERY_LIKELY") {
          this.handleClick('like')
        } else if(res.responses[0].faceAnnotations[0].sorrowLikelihood === 'POSSIBLE' || res.responses[0].faceAnnotations[0].sorrowLikelihood === 'LIKELY' || res.responses[0].faceAnnotations[0].sorrowLikelihood === 'VERY_LIKELY') {
          this.handleClick('dislike')
        }
      } else {
        console.log('error');
      }
      //joyLikelihood "VERY_UNLIKELY", "POSSIBLE", "VERY_LIKELY" joy happy
      // surpriseLikelihood surprise
      // angerLikelihood anger
      // sorrowLikelihood
      // console.log(res[0]);
      // console.log(JSON.stringify(res.responses))
      }, (e) => {
        console.log('Error: ', e)
      })
  }

  imgOut = () => {
    setTimeout(() => {this.setState({emotionType: null})}, 1000);
  }
// {!this.state.pause ? <Emotions/> : null}
  render() {
    // console.log(this.state.emotionType);
    return(
      <div className='col-md-12  mb-12 animated fadeInLeft'>
        <div className='col-md-12'>
          <YouTube
            videoId={this.props.single.id.videoId}
            onReady={this._onReady}
            liked={this.state.liked}
            onClick={this.handleClick}
            onPlay={this._onPlay}
            onPause={this._onPause}
          />
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
          />
          </div>
            <button type="button" value='dislike' className="btn button" onClick={this.handleButton}>Dislike</button>
            <button type="button" value='like' className="btn button" onClick={this.handleButton}>Like</button>
            <button type="button" className="btn button" onClick={this.props.back}>Back</button>
            {this.state.emotionType === 'like' ? <img src={smiley}/> : null}
        <div className='col-md-4'><Radar/></div>
      </div>

    )
  }
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps, {getUser, getDislike, setTime, getLike, addingEmotion, cleanTimeEmotion, timeEmotion, handleFunny, getEmotions, getVideos})(Video);
