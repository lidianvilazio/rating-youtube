import React from 'react'
import YouTube from 'react-youtube';
import Emotions from './Emotions'

class Video extends React.Component {

  state = {
    liked: false,
    e: null,
    pause: true
  }

  handleClick = () => {
    if(this.state.pause === false) {
      this.setState({liked: true}, () => {
        this._onPlay(this.state.e)
      })
    }
  }

  _onPlay = (e) => {
    // setInterval(function(){ console.log(Math.floor(e.target.getCurrentTime())) }, 1000);
    this.setState({e: e},() => {
      if(this.state.liked) {
        // console.log(Math.floor(e.target.getCurrentTime()));
        this.props.handleFunny(this.props.video, Math.floor(e.target.getCurrentTime()))
        this.setState({liked: false})
      }
      this.setState({pause: false})
    })
  }

  _onPause = (e) => {
    this.setState({pause: true})
  }

  getVideo = () => {
    return this.props.allVideos.filter(video => video.etag === this.props.video.etag)[0]
  }

  filterEmotions = (video) => {
    return this.state.emotions.filter(emotion => emotion.video_id === video.id).sort((a, b) => a.time - b.time);
  }

  render() {

    console.log("emotions",this.props.emotions);
    console.log("videos",this.props.allVideos);
    let video

    this.props.allVideos.length > 0 ? video = this.getVideo() : null

    return(
      <div className="col-md-8  mb-4 col-centered mx-auto form-white">
      <Emotions video={video}/>
        <YouTube
          videoId={this.props.video.id.videoId}
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

export default Video;
