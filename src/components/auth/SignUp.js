import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../redux/dispatch/AuthEvents'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email : '',
          password : '',
          password2 : '',
          nickName : ''
      }
  }

  signUp() {
    //   console.log('this.state', this.state);
    this.props.signUp(this.state);
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
        <h2>Sign Up Page</h2>    
        <div className = "form-group">
            <input
                className = "form-control"
                type = "text"
                id = "email"
                placeholder = "Enter Your Email Here..."
                maxLength = "100"
                style = {{textAlign:"center"}}                
                onChange = {this.onInputChange}
            />
            <input
                className = "form-control"
                type = "text"
                id = "nickName"
                placeholder = "Enter Your NickName Here..."
                maxLength = "10"
                style = {{textAlign:"center"}}                
                onChange = {this.onInputChange}
            />
            <input
                className = "form-control"
                type = "password"
                id = "password"
                placeholder = "Enter Your Password Here..."
                maxLength = "30"
                style = {{textAlign:"center"}}                
                onChange = {this.onInputChange}
            />
            <input
                className = "form-control"
                type = "password"
                id = "password2"
                placeholder = "Re-Enter Your Password Here..."
                maxLength = "30"
                style = {{textAlign:"center"}}               
                onChange = {this.onInputChange}
            />
            <div className='red-text' id="warning">
                    {authError ?<p> {authError}</p> : null}
            </div>
            <button
                style={{marginTop: '10px'}}
                className="btn btn-primary"
                id = "submit"
                onClick = {this.signUp.bind(this)}
                >
                Sign Up
            </button>
        </div> 
        </div>   
      </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        authError : state.auth.signUpError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp : (user) => dispatch(signUp(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)