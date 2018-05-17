import React from 'react'

class SignUp extends React.Component {

render(){
  return(
    <div className="col-md-6  mb-4 col-centered mx-auto form-white">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center default-text py-3"><i className="fa fa-lock"></i> SignUp:</h3>
          <div className="md-form">
          <i className="fa  fa-user prefix grey-text"></i>
          <input type="text" id="email" className="form-control" name="email" placeholder="Your Email"/>
          </div>
          <div className="md-form">
            <i className="fa  fa-user prefix grey-text"></i>
              <input type="text" id="name" className="form-control" name="name" placeholder="Your Name"/>
          </div>
            <div className="md-form">
              <i className="fa  fa-user prefix grey-text"></i>
                <input type="text" id="username" className="form-control" name="username" placeholder="Your Username"/>
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" id="password" className="form-control" name="password" placeholder="Your Password"/>
            </div>
            <div className="text-center">
              <button className="btn btn-danger">Submit</button>
            </div>
          </div>
        </div>
      </div>

  )
  }
}

export default SignUp;
