import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../redux/dispatch/AuthEvents'
import { Redirect } from 'react-router-dom'

class ResetPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email : '',
      }
  }

  onSubmit() {
    //   console.log('this.state', this.state);
    this.props.resetPassword(this.state);
  }

  onInputChange=(e) => {
    this.setState({[e.target.id]:e.target.value})
  }
  
  render() {
    let {authError, auth} = this.props;
    if (auth.uid) return <Redirect to='/'/>

    return (
    <div className="container">
      <div className="form-inline" style={{textAlign:'center'}}>
        <h2>Reset Password</h2>    
        <div className = "form-group">
            <input
                className = "form-control"
                type = "text"
                id = "email"
                placeholder = "Enter Email To Be Reset..."
                style = {{textAlign:"center"}}                
                onChange = {this.onInputChange}
            />
            
            <div className='purple-text'>
                {authError ?<p> {authError}</p> : null}
            </div>

            <button
                style={{marginTop: '10px'}}
                className="btn btn-primary"
                id = "submit"
                onClick = {this.onSubmit.bind(this)}
                >
                Reset Password
            </button>
        </div> 
        </div>   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        authError : state.auth.resetError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword : (user) => dispatch(resetPassword(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)