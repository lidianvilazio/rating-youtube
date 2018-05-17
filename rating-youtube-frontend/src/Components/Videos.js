import React from 'react'
import VideoItem from './VideoItem'
import Search from "./Search"
import YTSearch from 'youtube-api-search'
import Video from './Video'

const API_KEY = 'AIzaSyAQxqKgl5xQiSkt2hLAldd1hZ5kf8B5eqc'


class Videos extends React.Component {


  state = {
    videos: [],
    loading: false,
    clicked: false,
    only: ''
  }

  searchYT = term => {
    this.setState({loading: true})
    YTSearch({key: API_KEY, term }, videos => {
      this.setState({videos: videos, loading: false})
    })
  }

  handleSubmit = term => {
    this.searchYT(term)
  }

  handleClick = (video) => {
    this.setState({clicked: true, only: video}, () => {
      console.log(video);
    })
  }

  back = () => {
    this.setState({clicked: false, only: ''})
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
        {this.state.clicked ? <Video video={this.state.only}  back={this.back}/> :videos}
      </div>
    )
  }
}

export default Videos;
