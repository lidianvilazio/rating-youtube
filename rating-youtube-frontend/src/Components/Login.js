import React from 'react'


class Login extends React.Component{

render(){
  return(
    <div className=" form-white col-md-6 mb-4 mx-auto ">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center default-text py-3"><i className="fa fa-lock "></i> Login:</h3>
            <div className="md-form">
              <i className="fa fa-user prefix grey-text"></i>
              <input type="text" id="inputLGEx" className="form-control" name="username" placeholder="Your Username" />

            </div>
            <div className="md-form">
                <i className="fa fa-lock prefix grey-text"></i>
                <input type="password" id="defaultForm-pass" className="form-control" name="password" placeholder='Your Password'/>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-danger"> Submit</button>

            </div>
          </div>
        </div>
      </div>
  )}
}

export default Login;
