import React from 'react'
import VideoItem from './VideoItem'
import Search from "./Search"
import YTSearch from 'youtube-api-search'
import Video from './Video'
import {getUser, getEmotions} from '../actions/actions'
import {connect} from 'react-redux'
// import videoReducer from '../reducers/videos'


const API_KEY = 'AIzaSyAQxqKgl5xQiSkt2hLAldd1hZ5kf8B5eqc'


class Videos extends React.Component {


  state = {
    videos: [],
    loading: false,
    clicked: false,
    only: '',
    allVideos: [],
  }

  searchYT = term => {
    this.setState({loading: true})
    YTSearch({key: API_KEY, term }, videos => {
      this.setState({videos: videos, loading: false}, () => {this.getVideos()})
    })
  }

  handleSubmit = term => {
    this.searchYT(term)
  }

  handleClick = (video) => {
    this.setState({clicked: true, only: video})
  }

  // , () => { this.fetchEmotions() }

  getVideos = () => {
    fetch('http://localhost:3000/api/v1/videos')
    .then(r => r.json())
    .then(json => this.setState({allVideos: json}))
  }

  back = () => {
    this.setState({clicked: false, only: ''})
  }

  // fetchEmotions = () => {
  //   fetch('http://localhost:3000/api/v1/emotions')
  //   .then( r => r.json())
  //   .then(json => this.setState({emotions: json}))
  // }

  handleVideo = (video) => {
    const etag = video.etag
    fetch('http://localhost:3000/api/v1/videos#create', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript"
      },
      method: "POST",
      body: JSON.stringify({etag: etag})
    })
  }

  handleFunny = (video, time) => {
    const etag = video.etag
    const user = this.props.currentUser
    fetch('http://localhost:3000/api/v1/emotions#create', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript"
      },
      method: "POST",
      body: JSON.stringify({etag: etag, user_id: user.id, time: time})
    })
  }


  render() {

    console.log(this.props);

    const videos = this.state.videos.map(video => {
      if(video.id.videoId !== undefined) {
        return <VideoItem key={video.etag} video={video} handleClick={this.handleClick} emotions={this.state.emotions} handleVideo={this.handleVideo}/>
      }
    })
    return(
      <div>
        <Search handleSubmit={this.handleSubmit} loading={this.state.loading}/>
        {this.state.clicked ? <Video video={this.state.only}  back={this.back} allVideos={this.state.allVideos} handleFunny={this.handleFunny}/> : videos}
      </div>
    )
  }
}

function mapStateToProps(state){
	return {...state.userReducer, ...state.videosReducer}
}

export default connect(mapStateToProps, {getUser, getEmotions})(Videos);
