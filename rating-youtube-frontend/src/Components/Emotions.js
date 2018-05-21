import React from 'react'

class Emotions extends React.Component {

  state = {
    emotions: []
  }

  componentDidMount() {
    this.fetchEmotions()
  }

  fetchEmotions = () => {
    fetch('http://localhost:3000/api/v1/emotions')
    .then( r => r.json())
    .then(json => this.setState({emotions: json}))
  }

  filterEmotions = (video) => {
    return this.state.emotions.filter(emotion => emotion.video_id === video.id).sort((a, b) => a.time - b.time);
  }

  render() {

    let emotions = []

    if(this.props.video) {
      emotions = this.filterEmotions(this.props.video)
    }
    //
    // console.log(this.state.emotions);

    return(
      <div>helloo</div>
    )
  }

}

export default Emotions;
