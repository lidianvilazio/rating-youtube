import React from 'react'
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux'

class Radar extends React.Component{

  state = {
    data: {
   	labels: [
   		'Like',
   		'Dislike',
   	],
   	datasets: [{
   		data: [0,0],
   		backgroundColor: [
   		'#FF6384',
   		'#36A2EB',
   		],
   		hoverBackgroundColor: [
   		'#FF6384',
   		'#36A2EB',
   		]
   	}]
   }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.like.length > this.state.data.datasets[0].data[0] || nextProps.dislike.length > this.state.data.datasets[0].data[1]) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const data = [prevProps.like.length, prevProps.dislike.length]
    if(this.state.data.datasets[0].data[0] < prevProps.like.length || this.state.data.datasets[0].data[1] < prevProps.dislike.length) {
      this.setState({data: {
          labels: [
             'Like',
             'Dislike',
           ],
           datasets: [{
             data: data,
             backgroundColor: [
             '#FF6384',
             '#36A2EB',
             ],
             hoverBackgroundColor: [
             '#FF6384',
             '#36A2EB',
             ]
           }]
         }
         })
        }
    }


  render() {
    // console.log(this.props.like.length);
    // console.log(this.state.data);
    // console.log(this.state.data.datasets[0].data[0]);
    return (
      <div>
        <h2>Video Likes</h2>
        <Doughnut data={this.state.data} />
      </div>
    );
  }
};

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps)(Radar);
