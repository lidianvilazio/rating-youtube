import React from 'react'

class VideoItem extends React.Component {

  render() {
    return(
      <div className="col-md-8  mb-4 col-centered mx-auto form-white" onClick={() => {this.props.handleVideo(this.props.video)}}>
        <div className="card card-style" onClick={() => {this.props.handleClick(this.props.video)}}>
          <img className='img-style' src={this.props.video.snippet.thumbnails.high.url} alt={this.props.video.snippet.description}/>
          <div className="card-body">
            <p className="title-style">{this.props.video.snippet.title}</p>
            <p className='chanel-style'>{this.props.video.snippet.chanelTitle}</p>
            <p className='description-style'>{this.props.video.snippet.description}</p>
            </div>
        </div>
      </div>
    )
  }

}

export default VideoItem;
