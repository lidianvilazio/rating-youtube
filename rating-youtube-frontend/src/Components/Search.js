import React from 'react'
import { connect } from 'react-redux'

class Search extends React.Component {

  state = {
    search: ''
  }

  handleChange = e => {
    this.setState({search: e.target.value})
  }

  render() {
    return(
      <div className="col-md-12  mb-4 col-centered mx-auto form-white login">
        <input type="text" id="defaultForm-pass" className="form-control" name="search" onChange={this.handleChange} value={this.state.search} placeholder=''/>
        <button type="button" className="btn button" onClick={() => {this.props.handleSubmit(this.state.search)}}> {this.props.loading ? "Loading...": "Search"}</button>
      </div>
    )
  }

}

export default connect(null, {  })(Search)
