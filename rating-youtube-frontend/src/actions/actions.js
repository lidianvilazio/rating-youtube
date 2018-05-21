const API_URL = "http://localhost:3000/api/v1"
const headers = {
	"Content-Type": "application/json"
}

function authedHeaders(){
	return {
		...headers,
		"Authorization": localStorage.getItem("token")
	}
}
export function login(username, password){
	return (dispatch) => {
		return fetch(API_URL + "/login", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({username, password})
		})
		.then(res => res.json())
		.then(userData => {
			console.log("LOGGING IN", userData)
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function signup(email, name, username, password){
	return (dispatch) => {
		return fetch(API_URL + "/signup", {
			method: "POST",
			headers: authedHeaders(),
			body: JSON.stringify({email, name, username, password})
		})
		.then(res => res.json())
		.then(userData => {
			console.log("LOGGING IN", userData)
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function getUser(){

	const token = localStorage.getItem("token")
	return (dispatch) => {
		return fetch(API_URL + "/get_user", {
			headers: {
				"Authorization": token
			}
		})
		.then(res => res.json())
		.then(userData => {
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function logout(){
	localStorage.removeItem("token")
	return {
		type: "LOGOUT"
	}
}

export function getEmotions(){
	return (dispatch) => {
		return fetch(API_URL + "/emotions")
		.then(res => res.json())
		.then(emotions => {
			console.log(emotions);
			dispatch({type: "GET_EMOTIONS", payload: emotions})
		})
	}
}
