import React from 'react'
import Videos from '../Components/Videos'
import {Route, withRouter} from 'react-router-dom'
import NavBar from '../Components/NavBar';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
// import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getUser, logout} from '../actions/actions'
import Video from '../Components/Video';

class Main extends React.Component {

  componentDidMount(){
		if (localStorage.getItem("token")){
			this.props.getUser()
			.then(() => {
				this.props.history.push('/videos')
			})
		} else {
      this.props.history.push('/login')
    }
	}

  render() {
    return (
      <div>
      <header className="App-header">
      <div>
      <NavBar/>
      {localStorage.token ? <button onClick={() => {
        this.props.logout()
        this.props.history.push('/login')
      }}>Logout</button> : null}
      </div>
      </header>
      <Route exact path="/videos" component={Videos} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/video" component={Signup}/>
      </div>

  );
}
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default withRouter(connect(mapStateToProps, {getUser, logout})(Main));
