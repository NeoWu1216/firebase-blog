import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../redux/dispatch/AuthEvents'
import { Redirect } from 'react-router-dom'


class SignIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email : '',
          password : ''
      }

  }

  onSubmit=(e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  
  render() {
    const {authError, auth} = this.props;
    if (auth.uid) return <Redirect to='/'/>


    return (
    <div  className="container">
      <div className="form-inline" style={{textAlign:'center'}}>
        <h3>Sign In Page</h3>    
        <div className = "form-group">
            <input
                className = "form-control"
                type = "text"
                id = "email"
                placeholder = "Enter Your Email Here..."
                style = {{textAlign:"center", marginTop:"2ex"}}
                onChange = {event => this.setState({email: event.target.value})}
            />
            <input
                className = "form-control"
                type = "password"
                id = "password"
                placeholder = "Enter Your Password Here..."
                style = {{textAlign:"center", marginTop:"1ex"}}
                onChange = {event => this.setState({password: event.target.value})}
            />
            <div className = "input-field">
                <div className='red-text' id="warning">
                    {authError ?<p> {authError}</p> : null}
                </div>
                <button
                  style={{marginTop: '10px'}}
                  className="btn btn-primary"
                  id = "submit"
                  onClick = {this.onSubmit}
                  >
                  Sign In
                  </button>
            </div>

            <div className = "input-field">
                <button
                  style={{marginTop: '10px'}}
                  id = "reset"
                  onClick = {() => {this.props.history.push('/reset')}}
                >
                  Forget Your Password?
                </button>
            </div>
        </div>    
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        authError : state.auth.signInError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn : (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
// connect (mapStateToProps, mapDispatchToProps)