import React from 'react'

class User extends React.Component {
  state = {
    user: ''
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(r => r.json())
    .then(json => this.setState({user: json}))
  }

  render() {
    // console.log(this.state.user);
    return(
      <div>hello</div>
    )
  }
}

export default User;
