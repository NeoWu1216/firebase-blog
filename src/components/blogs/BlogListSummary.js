import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Card, Button, CardTitle, CardText,CardSubtitle, CardBody } from 'reactstrap';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {deleteBlog, likeBlog} from '../redux/dispatch/BlogEvents'
import {firestoreConnect} from 'react-redux-firebase'
import moment from 'moment'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'
import ScrollAnimation from 'react-animate-on-scroll';


class BlogSummary extends Component {
  onSubmit = (id, uid, authUid) => (e) => {
    e.preventDefault();
    if (uid !== authUid) {
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

  render() {
    const {blogs, auth, table} = this.props;
    if (!blogs) return <div/>;
    return (!table ? ( <div>
        {blogs.map(blog =>
        // <ScrollAnimation animateIn="fadeIn" animateOnce>
          <NavLink key={blog.id} to={'/blog/'+blog.id}>
            <Card id={blog.id}  style={{padding:'2ex'}}>
              <p id={"delete "+blog.id} className="right" onClick={this.onSubmit(blog.id, auth.uid, blog.authorId)}>x</p>
              <CardBody>
                <CardTitle>{blog.title} </CardTitle> 
                <CardSubtitle>{"Author: "+blog.author}</CardSubtitle>
                <CardText>{blog.createdAt} </CardText>
                <CardText>{blog.content.substring(0,70)+'...'}</CardText>
                <CardSubtitle className="right">  
                  <img src={require('../img/like.png')} width="15" height="15"></img>
                  { }  {blog.popularity || 0}
                </CardSubtitle>
                <Button>Read more...</Button>
              </CardBody>
            </Card>
          </NavLink>
          // </ScrollAnimation>
        )}
    </div>) : (

      // <BootstrapTable
      //   data={blogs}
      //   striped
      // >
      // <TableHeaderColumn dataField="id" isKey></TableHeaderColumn>
      // <TableHeaderColumn dataField="title" dataAlign="right">Product ID</TableHeaderColumn>
      // </BootstrapTable>


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
              <td> <a style={{cursor : 'pointer'}} id={"delete "+blog.id} 
              onClick={this.onSubmit(blog.id, auth.uid, blog.authorId)}> x </a> </td>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogSummary));