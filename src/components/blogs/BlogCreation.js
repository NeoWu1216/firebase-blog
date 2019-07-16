import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBlog, reset } from '../redux/dispatch/BlogEvents'
import TextArea from 'react-textarea-autosize'
import {Redirect} from 'react-router-dom'
import {Message, Input, Label, Form, Button, Icon} from 'semantic-ui-react'



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
    this.props.createBlog(this.state, this.props.auth);
  }

  // componentDidMount = () => {
  // }

  render() {
    const {auth, blog} = this.props;
    const {title, content} = this.state;
    const status = blog.status;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (status==='Success') {
      this.props.reset();
      // this.props.history.go(0)
      // window.location.reload();
      return <Redirect to={'/blog/'+blog.id}/>
    }

    return (
      <div >
        <div className = "container">
          <Message
            attached
            header='Create a new blog below'
          />
          <Form className='attached segment container center'>
          <Form.Field>
            <Label> Title </Label>
            <Form.Input placeholder='Place title here: '
               type='text' 
              id="title" value={title} onChange={this.onInputChange}/>
          </Form.Field>
            <Form.Field>
              <Label> Content </Label>
              <TextArea placeholder='Place content here: '
                id="content" value={content} onChange={this.onInputChange} />
            </Form.Field>
            <hr />
            <Button color='blue' onClick={this.onSubmit}>Submit</Button>
          </Form>
          { status ? 
          <Message attached='bottom' negative>
              {status}
          </Message> :
          <Message attached='bottom' warning>
            <Icon name='help' />
            Change your mind? Go back to home and draft won't be saved.
          </Message>
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    blog: state.blog
  }
}

const mapDispatchToProps = dispatch => {
    return {
        createBlog: (blog,auth) => dispatch(createBlog(blog,auth)),
        reset: (blog) => dispatch(reset(blog))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BlogCreation)