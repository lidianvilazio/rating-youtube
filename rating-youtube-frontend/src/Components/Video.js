import React from 'react'
import YouTube from 'react-youtube';

const emoji = require("emoji-dictionary");

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
    this.setState({e: e},() => {
      if(this.state.liked) {
        console.log(e.target.getCurrentTime());
        this.setState({liked: false})
      }

      this.setState({pause: false})
    })
  }

  _onPause = (e) => {
    this.setState({pause: true})
  }
  // {emoji.getUnicode("heart_eyes")}

  render() {
    console.log(emoji.getUnicode("heart_eyes"));
    return(
      <div>
        <YouTube
          videoId={this.props.video.id.videoId}
          onReady={this._onReady}
          liked={this.state.liked}
          onClick={this.handleClick}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
        <i onClick={this.handleClick}>{emoji.getUnicode("heart_eyes")}</i>
      </div>
    )
  }
}

export default Video;
