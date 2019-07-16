import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {readSub} from '../redux/dispatch/PreferenceEvents'
import {withRouter} from 'react-router-dom'
import {Card, Button, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap';


class Favorite extends Component {
  onClickLike = (like) => (e) => {
    this.props.history.push('/blog/'+like.blogId)
  }

  onClickSubscribe = (sub) => (e) => {
    this.props.history.push('/user/'+sub.hostId)
    this.props.readSub(sub.id)
  }
  render() {
    const {blogs, users, subscriptions, auth, prefReducer} = this.props;
    if (!blogs || !this.props.likes || !users || !subscriptions) return <div></div>
    let likes = this.props.likes.filter(x => x.userId===auth.uid)
    let subs = subscriptions.filter(x=>x.subscriberId==auth.uid)
    let backgroundImage = "url("+require("../img/background2.jpg")+")"
    //"#51005d" "#4080bf"
    let background = "#9c27b0"

    return (
        <div className="container">
            <Card style={{backgroundImage, color:"white"}}> 
                <CardBody>
                <CardTitle>{"Likes"} </CardTitle> 
                <hr></hr>
                <ul>
                    {likes.map((like)=><li key={like.id} style={{cursor:"pointer", textAlign:"center", paddingBottom:"3px"}} 
                        onClick={this.onClickLike(like)}>
                         {blogs[like.blogId] && blogs[like.blogId].title} 
                    </li>)}
                </ul>
                </CardBody>
            </Card>

            <br></br>

            <Card style={{backgroundImage, color:"white"}}>
                <CardBody >
                <CardTitle>{"Subscriptions"} </CardTitle> 
                <hr></hr>

                <ul>
                    {subs.filter((sub)=>sub.subscribed)
                    .map((sub)=><li key={sub.id} style={{color:((sub.read!=="false") ? 'white' : 'yellow'), cursor:"pointer", textAlign:"center", marginBottom:"3px"}} 
                        onClick={this.onClickSubscribe(sub)}>
                         {users[sub.hostId] && users[sub.hostId].nickName} 
                    </li>)}
                </ul>
                </CardBody>
            </Card>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    // console.log(state.firestore.data)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.data.users,
        blogs: state.firestore.data.blogs,
        likes: state.firestore.ordered.likes,
        subscriptions : state.firestore.ordered.subscriptions,  
        prefReducer : state.preference
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readSub : (id)=>dispatch(readSub(id)),
    }
}

  
export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection : 'comments'},
        {collection : 'blogs'},
        {collection : 'subscriptions'},
        {collection : 'likes'},
        {collection : 'users'}
    ])
) (Favorite));
