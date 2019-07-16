import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {compose} from 'redux'
import {deleteBlog, likeBlog} from '../redux/dispatch/BlogEvents'
import {firestoreConnect} from 'react-redux-firebase'
import moment from 'moment'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'
import ScrollAnimation from 'react-animate-on-scroll';
import {Button, Card, Icon, Container, Label, Popup} from 'semantic-ui-react'
import BlogCard from './BlogCard'


class BlogSummary extends Component {

  onRead = (id) => (e) => {
    this.props.history.push('/blog/'+id)
  }


  onSubmit = (id, uid) => (e) => {
    const {auth} = this.props;
    e.preventDefault();
    if (uid !== auth.uid) {
      alert('Error: Missing or insufficient permissions')
      return;
    } else {
      this.props.deleteBlog(id);
      //https://github.com/prescottprue/react-redux-firebase/issues/257
      this.props.history.push('/create')
      this.props.history.goBack()
      // this.props.history.go(0)
    }
  }

  redirectProfile = (uid) => (e) => {
    this.props.history.push('/user/'+uid);
  }

  render() {
    const {blogs, auth, table} = this.props;
    if (!blogs) return <div/>;
    return (!table ? ( <Card.Group itemsPerRow={1}>
        {blogs.map(blog =>
        // <ScrollAnimation animateIn="fadeIn" animateOnce>
          <BlogCard blog={blog} 
            onRead={this.onRead} 
            onDelete={this.onSubmit} 
            redirectProfile={this.redirectProfile}
            canDelete={auth.uid == blog.authorId}
            key = {blog.id}
          />
          // </ScrollAnimation>
        )}
    </Card.Group>) : (


      <table style={{borderSpacing: "30px"}}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Like</th> 
              <th>Title</th>             
              <th>Date</th>
              <th> </th>
            </tr>
          </thead>
          <tbody >
          { blogs && blogs.map(blog =>
            <tr style={{textAlign:'center'}} key={blog.id}>
              <td>  <NavLink to={'/user/'+blog.authorId}> {blog.author} </NavLink></td>
              <td >{blog.popularity || 0}</td>
              <td> <NavLink to={'/blog/'+blog.id} id={blog.id}> {blog.title} </NavLink></td>
              <td>{blog.createdAt}</td>
              <td> </td>
              {auth.uid == blog.authorId ?
              <td> <a style={{cursor : 'pointer'}} id={"delete "+blog.id} 
              onClick={this.onSubmit(blog.id, auth.uid, blog.authorId)}> x </a> </td> : null}
            </tr>
            // </NavLink>
          )}
          </tbody>
      </table>
    ))
  }
}

const mapStateToProps = (state, oldProps) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBlog : (id) => dispatch(deleteBlog(id)),
    like : (p1,p2,p3,p4) => dispatch(likeBlog(p1,p2,p3,p4)),
  }
}

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection : 'likes'},
  ])
)(BlogSummary));