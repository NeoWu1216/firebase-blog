import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createBlog, reset } from '../redux/dispatch/BlogEvents'
import TextArea from 'react-textarea-autosize'
import {Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';


class BlogCreation extends Component {
  state = {
      title : this.props.title ? this.props.title : "",
      content: this.props.content ? this.props.content : ""
  }

  onInputChange=(e) => {
    this.setState({[e.target.id]:e.target.value})
  }


  onSubmit= (e) => {
    e.preventDefault();
    const {auth, blogs} = this.props
    let numblogs = blogs.filter((elem) => elem.authorId===auth.uid).length
    console.log(numblogs)
    if (numblogs >= 5) {
      alert(numblogs + " blogs has already created. Doing so would exceed limit of " + 5 + ". Delete some blogs and retry")
      return
    }
    this.props.createBlog(this.state, this.props.auth);
  }

  // componentDidMount = () => {
  // }

  render() {
    const {auth, blog} = this.props;
    const status = blog.status;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (status==='Success') {
      this.props.reset();
      // this.props.history.go(0)
      // window.location.reload();
      return <Redirect to={'/blog/'+blog.id}/>
    }

    return (
      <div className="container">
        <div className="form-inline" style={{textAlign:'center'}}>
        <h4>Creating new Blog</h4>
        <div className = "form-group">
            <input
                className = "form-control"
                type = "text"
                id = "title"
                placeholder = "...Title..."
                value = {this.state.title}
                maxLength="100"
                style = {{textAlign:"center", marginTop:"1ex"}}
                onChange = {this.onInputChange}
            />
            <TextArea 
            id = "content"
            style = {{marginTop:"3ex"}}
            minRows = {6}
            maxLength="50000"
            value = {this.state.content}
            onChange = {this.onInputChange} />
            <div className = "input-field">
            <div className='red-text'>
                    {status ?<p> {status}</p> : null}
              </div>
              <button
                  style={{marginTop: '20px'}}
                  className="btn btn-primary"
                  type = "button"
                  id = "submit"
                  onClick = {this.onSubmit}
                  >
                  Submit
                  </button>
              
            </div>
        </div>    
      </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    blog: state.blog,
    blogs: state.firestore.ordered.blogs
  }
}

const mapDispatchToProps = dispatch => {
    return {
        createBlog: (blog,auth) => dispatch(createBlog(blog,auth)),
        reset: (blog) => dispatch(reset(blog))
    }
}
  
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection : 'blogs'}
  ])
)(BlogCreation)
