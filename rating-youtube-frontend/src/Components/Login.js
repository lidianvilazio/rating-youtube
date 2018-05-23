import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/actions'


class Login extends React.Component{

  state = {
		username: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		this.props.login(this.state.username, this.state.password)
			.then(()=> localStorage.getItem("token") ? this.props.history.push("/videos") : this.setState({alert: 'nope'}) )
	}

render(){
  return(
    <div className=" form-white col-md-6 mb-4 mx-auto ">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center default-text py-3"><i className="fa fa-lock "></i> Login:</h3>
            <div className="md-form">
              <i className="fa fa-user prefix grey-text"></i>
              <input type="text" id="inputLGEx" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Your Username" />

            </div>
            <div className="md-form">
                <i className="fa fa-lock prefix grey-text"></i>
                <input type="password" id="defaultForm-pass" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder='Your Password'/>
            </div>
            <div className="text-center">
              <button type="button" className="btn button" onClick={this.handleSubmit}> Submit</button>

            </div>
          </div>
        </div>
      </div>
  )}
}

export default connect(null, { login })(Login)
