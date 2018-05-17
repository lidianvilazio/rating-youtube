import React from 'react'

class VideoItem extends React.Component {

  render() {
    return(
      <div onClick={() => {this.props.handleClick(this.props.video)}}>
        <img src={this.props.video.snippet.thumbnails.medium.url}/>
        <p>{this.props.video.snippet.title}</p>
        <p>{this.props.video.snippet.chanelTitle}</p>
        <p>{this.props.video.snippet.description}</p>
      </div>
    )
  }

}

export default VideoItem;
