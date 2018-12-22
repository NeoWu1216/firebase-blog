import React, { Component } from 'react'
import BlogList from '../blogs/BlogList';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { withRouter, Redirect } from 'react-router-dom'
import Parallax from './Parallax'

class DashBoard  extends Component {
  
  
  render() {

    const {blogs, auth} = this.props;
    // if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div>
        <div className="dashboard container">
            <BlogList blogs={blogs}/>
        </div>
        <Parallax/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state: ", state)
  return {
    blogs: state.firestore.ordered.blogs,
    auth : state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection : 'blogs'}
  ])
) (DashBoard)