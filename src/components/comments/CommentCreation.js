import React, { Component} from 'react'
import TextArea from 'react-textarea-autosize'
import { createComment } from '../redux/dispatch/CommentEvents'
import {connect} from 'react-redux'


class CommentCreation extends Component {
  state = {
    content: "",
    blog: this.props.blog,
    uid: this.props.auth.uid
  }

  onInputChange=(e) => {
    this.setState({[e.target.id]:e.target.value})
  }
  onSubmit= (e) => {
    console.log("To be submitted: ", this.state);
    e.preventDefault();
    this.props.createComment(this.state);
    // window.location.reload()
    this.setState({content : ""});
  }

  render() {
    const {auth, comment} = this.props;
    const status = comment.status;
    return (
      <div className="panel panel-default">
        <div className="panel-body">
            <TextArea 
              id="content"  //placeholder?
              placeholder = "Enter Comment Here:"
              minRows={3} 
              style={{maxWidth:"100%"}}
              onChange = {this.onInputChange}
              value = {this.state.content}
              />

            <div className='red-text'> 
              {status ?<p> {status}</p> : null} 
            </div>

            <button type = "button"
                  id = "submit"
                  style={{float : "left"}}
                  onClick={this.onSubmit}>
                  Post Comment
            </button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    comment: state.comment
  }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentCreation)