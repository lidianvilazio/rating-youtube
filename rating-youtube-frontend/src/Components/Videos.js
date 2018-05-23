import React from 'react'
import VideoItem from './VideoItem'
import Search from "./Search"
import YTSearch from 'youtube-api-search'
import Video from './Video'
import {getUser, singleVideo, filterEmotions, getEmotions, getVideos, handleVideo, handleFunny} from '../actions/actions'
import {connect} from 'react-redux'


const API_KEY = 'AIzaSyAQxqKgl5xQiSkt2hLAldd1hZ5kf8B5eqc'

class Videos extends React.Component {

  state = {
    videos: [],
    loading: false,
    clicked: false,
  }

  componentDidMount(){
		this.props.getEmotions(),
    this.props.getVideos()
	}

  searchYT = term => {
    this.setState({loading: true})
    YTSearch({key: API_KEY, term }, videos => {
      this.setState({videos: videos, loading: false})
    })
  }

  handleSubmit = term => {
    clearTimeout(this.props.setTheTime)
    this.searchYT(term)
    this.setState({clicked: false})
  }

  handleClick = (video) => {
    this.props.singleVideo(video)
    this.props.handleVideo(video)
    this.setState({clicked: true})
  }

  back = () => {
    this.setState({clicked: false})
  }

  render() {

    const videos = this.state.videos.map(video => {
      if(video.id.videoId !== undefined) {
        return <VideoItem key={video.etag} video={video} handleClick={this.handleClick}/>
      }
    })

    return(
      <div>
        <Search handleSubmit={this.handleSubmit} loading={this.state.loading}/>
        {this.state.clicked ? <Video back={this.back}/> : videos}
      </div>
    )
  }
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps, {getUser, handleVideo, singleVideo, handleFunny, getEmotions, getVideos, filterEmotions})(Videos);
