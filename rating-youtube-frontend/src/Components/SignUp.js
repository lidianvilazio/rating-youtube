import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/actions'

class Signup extends React.Component {

  state = {
    email: "",
    name: "",
		username: "",
		password: "",
		passwordConfirmation: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {

		if (this.state.password === this.state.passwordConfirmation){

      this.props.signup(this.state.email, this.state.name, this.state.username, this.state.password)
      .then(()=> localStorage.getItem("token") ? this.props.history.push("/videos") : this.setState({alert: 'nope'}) )

		} else {

			alert("Password should be the same!")

		}

	}

render(){

  return(
    <div className="col-md-6  mb-4 col-centered mx-auto form-white login">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center default-text py-3"><i className="fa fa-lock"></i> SignUp:</h3>
          <div className="md-form">
          <i className="fa  fa-user prefix grey-text"></i>
          <input type="text" id="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Your Email"/>
          </div>
          <div className="md-form">
            <i className="fa  fa-user prefix grey-text"></i>
              <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} name="name" placeholder="Your Name"/>
          </div>
            <div className="md-form">
              <i className="fa  fa-user prefix grey-text"></i>
                <input type="text" id="username" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Your Username"/>
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" id="passwordConfirmation" className="form-control" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Your Password Confirmation"/>
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Your Password"/>
            </div>
            <div className="text-center">
              <button className="btn button" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>

  )
  }
}

export default connect(null, { signup })(Signup)
