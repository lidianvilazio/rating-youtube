import React from 'react'
import {handleVideo} from '../actions/actions'
import {connect} from 'react-redux'

class VideoItem extends React.Component {

  render() {
    return(
      <div className="col-md-8  mb-4 col-centered mx-auto form-white" onClick={() => {
        this.props.handleClick(this.props.video)
      }}>
        <div className="card card-style">
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

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps, {handleVideo})(VideoItem);
