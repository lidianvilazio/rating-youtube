import React from 'react'
import {Doughnut} from 'react-chartjs-2';
import { getUser, getSurprise, setTime, addingEmotion, getDislike, getLike, cleanTimeEmotion, timeEmotion, getEmotions, getVideos, handleFunny } from '../actions/actions'
import { connect } from 'react-redux'

class Radar extends React.Component {

    state = {
      data: {
     	labels: [
     		'Like',
     		'Dislike',
        'Surprise',
     	],
     	datasets: [{
     		data: [0,0,0],
     		backgroundColor: [
          '#E62117',
          '#808080',
          '#101010',
     		],
     		hoverBackgroundColor: [
          '#E62117',
          '#808080',
          '#101010',
     		]
     	}]
    },
     currentVideo: null
    }

      static getDerivedStateFromProps (nextProps, nextState) {
        // console.log(nextProps.currentVideo);

          if(nextProps.currentVideo) {
            const data = [nextProps.currentVideo.likes.length, nextProps.currentVideo.dislikes.length, nextProps.currentVideo.surprises.length]
            // console.log("SETTING STATE")
            return {data: {
                labels: [
                   'Like',
                   'Dislike',
                   'Surprise',
                 ],
                 datasets: [{
                   data: data,
                   backgroundColor: [
                   '#E62117',
                   '#808080',
                   '#101010',
                   ],
                   hoverBackgroundColor: [
                   '#E62117',
                   '#808080',
                   '#101010',
                   ]
                 }]
               },
               currentVideo: nextProps.currentVideo
               }
             }
          }

    shouldComponentUpdate(nextProps, nextState) {
      console.log(this.props.currentVideo);
      console.log(nextProps.currentVideo);
      console.log(nextState.currentVideo);
      if(nextProps.like.length > this.state.data.datasets[0].data[0] || nextProps.dislike.length > this.state.data.datasets[0].data[1] || nextProps.surprise.length > this.state.data.datasets[0].data[2] || nextProps.currentVideo.id !== this.state.currentVideo.id) {
        console.log(":(");
        return true
      } else {
        return false
      }
    }

   //  componentDidUpdate(prevProps, prevState) {
   //  const data = [prevProps.like.length, prevProps.dislike.length, prevProps.surprise.length]
   //  console.log(data);
   //  if(this.state.data.datasets[0].data[0] < prevProps.like.length || this.state.data.datasets[0].data[1] < prevProps.dislike.length || this.state.data.datasets[0].data[1] < prevProps.surprise.length || prevProps.currentVideo.id !== prevState.currentVideo.id) {
   //    this.setState({data: {
   //        labels: [
   //           'Like',
   //           'Dislike',
   //           'Surprise',
   //         ],
   //         datasets: [{
   //           data: data,
   //           backgroundColor: [
   //           '#E62117',
   //           '#808080',
   //           '#101010',
   //           ],
   //           hoverBackgroundColor: [
   //           '#E62117',
   //           '#808080',
   //           '#101010',
   //           ]
   //         }]
   //       }
   //     })
   //   }
   // }


  render() {
    return (
      <div>
        <Doughnut data={this.state.data} />
      </div>
    );
  }
}

function mapStateToProps(state){
	return {...state.userReducer}
}


export default connect(mapStateToProps, {getUser, getSurprise, getDislike, setTime, getLike, addingEmotion, cleanTimeEmotion, timeEmotion, handleFunny, getEmotions, getVideos})(Radar);
