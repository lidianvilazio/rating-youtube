import React from 'react'
import Video from './Video'

// const apiKey = 'AIzaSyAQxqKgl5xQiSkt2hLAldd1hZ5kf8B5eqc'


class Videos extends React.Component {


  state = {
    videos: []
  }

  componentDidMount() {
    this.VideoList()
  }

  // fetchfetchVideo = () => {
  //   fetch('http://localhost:3000/api/v1/videos')
  //   .then(r => r.json())
  //   .then(json => this.setState({videos: json}))
  // }

  VideoList = () => {
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAQxqKgl5xQiSkt2hLAldd1hZ5kf8B5eqc&part=snippet,id&order=date&maxResults=20')
    .then(resp => resp.json())
    .then((json) => this.setState({videos: json.items}));
  }

  render() {
    const videos = this.state.videos.map(video => {
      if(video.id.videoId !== undefined) {
        return <Video key={video.id.videoId} video={video}/>
      }
    })
    return(
      <div>
        {videos}
      </div>
    )
  }
}

export default Videos;
