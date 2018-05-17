import React from 'react'
import Videos from '../Components/Videos'
import {Route, withRouter} from 'react-router-dom'
import NavBar from '../Components/NavBar';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getUser, logout} from '../actions/actions'

class Main extends React.Component {

  componentDidMount(){
		if (localStorage.getItem("token")){
			this.props.getUser()
			.then(() => {
				this.props.history.push('/home')
			})
		}
	}

  render() {
    return (
      <div>
      <header className="App-header">
      <div>
      <NavBar/>
      </div>
      </header>
      <Button onClick={() => {
        this.props.logout()
        this.props.history.push('/login')
      }}>Logout</Button>
      <Route exact path="/videos" component={Videos} />
      <Route exact path="/login" render={renderProps => <Login/> } />
      <Route exact path="/signup" render={renderProps => <SignUp/> }/>
      </div>

  );
}
}

function mapStateToProps(state){
	return {...state.userReducer}
}

export default withRouter(connect(mapStateToProps, {getUser, logout})(Main));
