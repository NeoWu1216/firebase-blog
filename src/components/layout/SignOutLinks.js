import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {signOut} from '../redux/dispatch/AuthEvents'
// import {subscribe} from '../redux/dispatch/PreferenceEvents'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const signOutLinks = (props) => {
  const uid = props.auth.uid;
  const {profile} = props;
  return (
    <ul className='right' >
      <li><NavLink to={'/user/'+uid} id='profile'>Profile</NavLink></li>
      <li><NavLink to='/favorite' id="favorite">Favorite</NavLink></li>
      <li><NavLink to='/create' id='blog-creation-link'>New Blog</NavLink></li>
      <li><NavLink to='/' onClick={props.signOut} id="signout">Sign Out</NavLink></li>
      <li> <img src={(profile.avatarURL) || 'https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji_400x400.jpg'} 
      alt="Uploaded" width="35px" height="35px" style={{marginBottom:"-10px"}}/> </li>
      <li><a className='btn btn-floating' style={{fontSize: "10px", marginBottom:"5px"}}>{props.profile.nickName}</a></li>
    </ul>
  )
}


const mapStateToProps = (state) => {
  return {
    auth : state.firebase.auth,
    profile : state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut : () => dispatch(signOut()),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(signOutLinks);