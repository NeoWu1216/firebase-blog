import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {withRouter, Redirect} from 'react-router-dom'
import logo from './../../logo.svg';
import '../../App.css'
import {deleteBlog, reset, likeBlog} from '../redux/dispatch/BlogEvents'
import sanitizeHtml from 'sanitize-html'
import moment from 'moment'
import CommentSection from '../comments/CommentSection'
import Parallax from '../layout/Parallax'


import React, {Component, PureCompoennt } from 'react'

const notFound = <div className='container' style={{textAlign:'center'}}>
                          <h1 > Post not found. This can be a delete post. </h1>
                          <img src={logo} className="App-logo" alt="logo" />
                        </div>

let reloaded = false
class BlogContent extends Component {
  state = {
    html : true,
    likeId : undefined
  }

  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteBlog(this.props.match.params.id);
    this.props.history.push('/')
  }

  onLike = (count) => (e) => {
    if (!this.props.auth.uid) {
      this.props.history.push('/signin')
      return
    }
    e.preventDefault();
    // console.log(this.state.likeId, this.props.blog.id, this.props.auth.uid)
    this.props.like(this.state.likeId, this.props.blog.id, this.props.auth.uid, count)
  }

  render() {
      const {blog, users, likes, auth, blogReducer} = this.props;
      if  (blog==null || blog==undefined) 
        return notFound;
      if (blogReducer.status === 'disliked' || blogReducer.status=== 'liked') {
        this.props.reset();
        // this.setState({likeId : blogReducer.id})
        window.location.reload();
      } 
      console.log(this.props, this.state)
      let {likeId, html} = this.state;
      
      if (likeId === undefined) {
        const blogLikes = blog && likes && likes.filter((elem) => elem.blogId == blog.id)
        const like = blogLikes && blogLikes.filter((elem) => elem.userId == auth.uid)
        likeId = like ? (like.length ? like[0].id : null) : undefined
        if (likeId !== undefined) {
          this.setState({likeId})
        }
      }


      const likeButtonURL = likeId ? require('../img/like.png') : require('../img/dislike.jpg')

      const avatarURL = (blog && blog.authorId && users[blog.authorId] && users[blog.authorId].avatarURL) ? 
            users[blog.authorId].avatarURL : 'https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji_400x400.jpg'
            
      return (blog==null || blog==undefined) ? notFound : (
        <div>
        <div className="container" style={{textAlign:'center', marginBottom:'5ex'}}>
            <h4>{blog.title}</h4>
            <a onClick={(e)=>{this.props.history.push('/user/'+blog.authorId)}}>
              <h6 id="author" style={{cursor:"pointer"}}>{"Author : "+blog.author}</h6>
              <img src={avatarURL}  alt="Uploaded" width="35px" height="35px" style={{marginBottom:"-10px"}}/>
            </a>
            <h6>{moment(blog.createdAt.toDate()).calendar()}</h6>
            
            <a id="like" onClick={this.onLike(blog.popularity || 0)}>
            <img style={{cursor:'pointer'}} src={likeButtonURL} width="20" height="20" color="gray"></img>
                  { } {blog.popularity || 0}  </a>

            {html ? <div style={{paddingTop:'5ex'}} 
              dangerouslySetInnerHTML={{__html: (blog.content)}}/>
              : <div style={{textAlign:'left', paddingTop:'5ex', whiteSpace: "pre-wrap"}}>{blog.content}</div>}

            <button
              className="btn"
              id = "display"
              style = {{flow : "right", marginTop: 60, marginBottom : "4ex"}}
              onClick = {() => this.setState({html:!html})}
              >
              View {html ? "raw" : "webpage"}
            </button> 
            <hr style={{width:"140%", marginLeft: "-20%"}}/>
            <CommentSection blog={blog}/>
        </div>  <Parallax/> </div>
      )
  }
}


const mapStateToProps = (state, oldProps) => {
  // console.log(state)
  const id = oldProps.match.params.id;
  const blogs = state.firestore.data.blogs; // instead of ordered, which is a list with id inside
  return {
    blog:  (blogs&&blogs[id]) ? {...blogs[id], id} : null,
    auth : state.firebase.auth,
    users : state.firestore.data.users,
    likes : state.firestore.ordered.likes,
    profile : state.firebase.profile,
    blogReducer: state.blog
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteBlog : (id) => dispatch(deleteBlog(id)),
    like : (p1,p2,p3,p4) => dispatch(likeBlog(p1,p2,p3,p4)),
    reset: (blog) => dispatch(reset(blog))
  }
}


function AlwaysUpdateConnect(mapState = null, mapDispatch = null, mergeProps = null, options = {}) {
  return connect(
    mapState,
    mapDispatch,
    mergeProps,
    Object.assign(options, {
      pure: true
    })
  );
}

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection : 'likes'},
    {collection : 'blogs'},
    {collection : 'users'},
  ])
) (BlogContent))
