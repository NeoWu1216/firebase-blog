import React, { Component } from 'react'
import CommentCreationSection from './CommentCreation'
import CommentList from './CommentList'

class CommentSection extends Component {
  render() {
    return (
      <div>
        <CommentList blog={this.props.blog}/>
        <CommentCreationSection blog={this.props.blog}/>
      </div>
    )
  }
}

export default CommentSection;