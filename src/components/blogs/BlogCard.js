import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {compose} from 'redux'
import {Button, Card, Icon, Container, Label, Popup} from 'semantic-ui-react'
import {deleteBlog, likeBlog} from '../redux/dispatch/BlogEvents'
import {firestoreConnect} from 'react-redux-firebase'


const BlogCardUI = ({blog, onRead, canDelete, onDelete, redirectProfile, likeId, onLike}) => {
  return (<Card fluid className='ui centered align grid'>
  <Card.Content>
    <Card.Header onClick={onRead(blog.id)} style={{cursor:"pointer"}}>
      {blog.title}
    </Card.Header>
    <Card.Meta>
      {/* <span className='date'> */}
        {blog.createdAt}
      {/* </span> */}
    </Card.Meta>

    <Label as='a' color='blue' onClick={redirectProfile(blog.authorId)}>
        {/* <img src={atc.author_avatar}/> */}
        {blog.author}
    </Label>
    <br/>

    {/* <Container textAlign='justified'> */}
    <Card.Description>
      {blog.content.substring(0,70)+'...'}
    </Card.Description>
    {/* </Container> */}
  </Card.Content>
  <Card.Content extra >
      {likeId ? 
        <Icon name='heart' style={{color:'red'}}/> :
        <Icon name='heart outline' style={{color:'pink'}}/>
      }
      {blog.popularity} Likes
  </Card.Content>
  <Card.Content extra>

  <Button.Group size='small'>
    <Button basic color='green' onClick={onRead(blog.id)}>
      Read
    </Button>
    {(canDelete ?
    <Popup trigger={
        <Button basic color='red' onClick={onDelete(blog.id, blog.authorId)}>
          Delete
        </Button>
      }
      inverted
      content = "Warning: can't undo delete"
    /> : null)}
  </Button.Group>

  </Card.Content>
</Card>)
}



class BlogCard extends Component {
  state = {
    likeId : undefined
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
    let {likeId} = this.state;
    let {blog, likes, auth} = this.props;
      
    if (likeId === undefined) {
      const blogLikes = blog && likes && likes.filter((elem) => elem.blogId == blog.id)
      const like = blogLikes && blogLikes.filter((elem) => elem.userId == auth.uid)
      likeId = like ? (like.length ? like[0].id : null) : undefined
      if (likeId !== undefined) {
        this.setState({likeId})
      }
    }

    return <BlogCardUI {...this.props} likeId={likeId} onLike={this.onLike}/>
  }
}


const mapStateToProps = (state, oldProps) => {
  return {
    auth: state.firebase.auth,
    likes : state.firestore.ordered.likes,
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
    {collection : 'users'},
  ])
)(BlogCard));




