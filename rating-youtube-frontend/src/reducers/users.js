const defaultState = {
	currentUser: null,
	emotions: [],
  allVideos: [],
	currentVideo: null,
	single: null,
	filteredEmotions: [],
	timedEmotion: [],
	setTheTime: null
}

export default function userReducer(state=defaultState, action){
	switch(action.type){
		case "LOGIN_USER":
			return {...state, currentUser: action.payload.user}
		case "GET_EMOTIONS":
			return {...state, emotions: action.payload}
		case "GET_VIDEOS":
			return {...state, allVideos: action.payload}
		case "CREATE_VIDEO":
			return {...state, currentVideo: action.payload}
		case "ADD_EMOTION":
			return {...state, emotions: [...state.emotions, action.payload]}
		case "SINGLE_VIDEO":
			return {...state, single: action.payload}
		case "FILTERED_EMOTION":
			return {...state, filteredEmotions: action.payload}
		case "TIME_EMOTION":
			return {...state, timedEmotion: action.payload}
		case "CLEAN_TIME_EMOTION":
			return {...state, timedEmotion: []}
		case 'SET_TIME':
		  return {...state, setTheTime: action.payload}
		case "LOGOUT":
			return defaultState
		default:
			return state
	}
}
