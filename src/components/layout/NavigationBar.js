import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../redux/dispatch/AuthEvents'
import SignOutLinks from './SignOutLinks'
import SignInLinks from './SignInLinks'


class NavigationBar extends Component {
  render() {
    const {auth, profile} = this.props;
    const authlinks = (auth.uid==null) ? <SignInLinks/> : <SignOutLinks profile={profile}/>;

    return (
      <nav className="nav-wrapper pink">
        <div className="container">
          <div className='left'>
            <NavLink id='home-link' to='/' className='left brand-logo' >XSSBlog</NavLink>
          </div>
          {authlinks}
      </div>
      </nav>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    profile : state.firebase.profile,
    auth : state.firebase.auth
  }
}

export default  connect(mapStateToProps)(NavigationBar)