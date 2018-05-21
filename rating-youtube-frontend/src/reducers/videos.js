const defaultState = {
	videos: [],
  emotions: []
}

export default function videoReducer(state=defaultState, action){
	switch(action.type){
		case "GET_EMOTIONS":
			return {...state, emotions: action.payload}
		case "LOGOUT":
			return defaultState
		default:
			return state
	}
}
