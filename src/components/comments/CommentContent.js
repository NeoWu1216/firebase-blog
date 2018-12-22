import React, {Component} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'
import {Link, withRouter} from 'react-router-dom'

// export default (props) => {
//     const {elem, global} = props;
    
//     // return (global) ? <Link to={"/blog/"+elem.articleId}>{centralBody}</Link> : centralBody;
// }

class CommentContent extends Component {
  render() {
    const {elem, global} = this.props;
    return (
        <Comment onClick={()=>{if (global) this.props.history.push('/blog/'+elem.articleId)}}>
            {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/> */}
            <Comment.Content>
            <Comment.Author as='a' onClick={(e)=>{this.props.history.push('/user/'+elem.commentAuthorId)}}>
                {elem.commentAuthor}
            </Comment.Author>
            <Comment.Metadata>
                <div style={{fontWeight:'bold'}}>{moment(elem.createdAt.toDate()).calendar()}</div>
            </Comment.Metadata>
            <Comment.Text > <p name={elem.content}> {elem.content} </p> </Comment.Text>
            {/* <Comment.Actions>
                <Comment.Action>Like</Comment.Action>
            </Comment.Actions> */}
            </Comment.Content>
        </Comment>
    )
  }
}

export default withRouter(CommentContent)