const defaultState = {
	currentUser: null,
}

export default function userReducer(state=defaultState, action){
	switch(action.type){
		case "LOGIN_USER":
			return {...state, currentUser: action.payload.user}
		// case "LOGOUT":
		// 	return defaultState
		default:
			return state
	}
}
