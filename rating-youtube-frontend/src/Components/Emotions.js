import React from 'react'
import {connect} from 'react-redux'
import {cleanTimeEmotion, timeEmotion} from '../actions/actions'

const Emotions = (props) => {

    return(
      <div>{props.timedEmotion.length > 0 ? <h1>{props.timedEmotion.length} {props.timedEmotion.length === 1 ? "person" : "people"} liked this moment </h1> : <h1> Be the first to like this moment</h1>}</div>
    )

}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default connect(mapStateToProps,{cleanTimeEmotion, timeEmotion} )(Emotions);
