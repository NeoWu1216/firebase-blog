import React, { Component } from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Redirect} from 'react-router-dom'
import {Link, NavLink, withRouter} from 'react-router-dom'
import Preferences from './Preferences'
import BlogList from '../blogs/BlogList'
import {CommentList} from '../comments/CommentList' //not a typo, must be passed directly
import Avatar from "./Avatar";
import {subscribe, fetchSubId, resetSub} from '../redux/dispatch/PreferenceEvents'
import Parallax from '../layout/Parallax'


let prevState = {
    page : 1
}

class Profile extends Component {
    
    constructor(props) {
        super(props)
        const pathId = props.match.params.id;
        const currId = props.auth.uid;
        this.state = prevState
        if (prevState.page == 0)
            this.state = {...prevState, page:1}
    }

    componentWillUnmount() {
        prevState = this.state;
    }

    componentDidMount() {
        if (this.props.auth.uid) {
            this.props.fetchSubId(this.props.auth.uid, this.props.match.params.id)
        }
    }

    goToPage = (page) => (e) => {
        e.preventDefault();
        this.setState({page : page})
        // console.log("Switch page to", page)
    }

    subscribe = (subscriberId, hostId, sub) => (e) => {
        e.preventDefault();
        const { subscriptions, prefReducer} = this.props;
        if (!this.props.auth.uid) {
            this.props.history.push('/signin')
        } else if (subscriptions) {
            this.props.subscribe(prefReducer.subId, subscriberId, hostId, sub)
            this.props.fetchSubId(this.props.auth.uid, this.props.match.params.id)
            this.props.history.push('/signin')
            this.props.history.goBack()
        }
    }

    
    render() {
        const {profile, auth, blogs, comments, users, subscriptions, prefReducer} = this.props;
        const uid = this.props.match.params.id
        let subbed = false;
        if (subscriptions && prefReducer.subId && subscriptions[prefReducer.subId])
            subbed = subscriptions[prefReducer.subId].subscribed;

        if (uid === '-1') {
            return <img src={require('../img/Anonymous.jpeg')}  style={{width:"100%", height:"auto"}}/>
        }

        // if (!auth.uid) return <Redirect to='/signin'/>
        if (!blogs ||!comments ||!users ||!users[uid]) return <div/>

        let settingsPage = 
        <li onClick={this.goToPage(0)} id="settings">
            <a> Settings </a>
        </li>
        let avatarPage = 
        <li onClick={this.goToPage(3)} id="avatar">
            <a> Avatar </a>
        </li>
        let subscribeButton =
        <li onClick={this.subscribe(auth.uid, uid, !subbed)} id="subscribe"> 
            <a> {!subbed ? "Subscribe" : "Unsubscribe"} </a> 
        </li>
        //Use a new collection~

        const authorBlogs = blogs.filter((elem) => elem.authorId===uid)
        const authorComments = comments.filter((elem)=>elem.commentAuthorId===uid)
        // console.log(comments)
        // console.log(authorComments)
        const content = ((page)=>{
            switch(page) {
                case 0:
                    return <Preferences profile={profile}/>
                case 1:
                    return (authorBlogs.length > 0) ? 
                        (<div>
                            <h1>{(auth.uid===uid) ? "My Blogs" : 
                                (this.props.users[uid].nickName+"'s Blogs")}</h1>
                            <BlogList blogs={authorBlogs}/>
                        </div>) 
                        : <h3>No Blogs found for {users[uid].nickName}</h3>
                case 2:
                    return <CommentList comments={authorComments}/>
                case 3:
                    return <Avatar />
            }
        })(this.state.page);
        //marginBottom: -10 != marginTop : 10
        return (
            <div>
            <nav className="nav-wrapper pink" style={{marginBottom: "5vh"}}>
                <div className="container">
                    {/* <div className='left'>
                        <div className='left brand-logo' > {(auth.uid===uid) ? "My profile" : this.props.users[uid].nickName+"'s profile"} </div>
                    </div> */}
                    <ul className='right'  >
                        {(auth.uid!==uid) && subscribeButton}
                        {/* <li><NavLink to='/'>
                            Home
                        </NavLink></li> */}
                        <li onClick={this.goToPage(1)} id="blogs">
                          <a> Blogs </a>
                        </li>
                        <li onClick={this.goToPage(2)} id="comments">
                          <a> Comments </a>
                        </li>
                        
                        {(auth.uid===uid) && settingsPage}
                        {(auth.uid===uid) && avatarPage}
                        <li><img src={(users[uid].avatarURL) || 'https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji_400x400.jpg'} 
                        alt="Uploaded" width="35px" height="35px"  style={{marginBottom:"-10px"}}/></li> 
                        <li><a className='btn btn-floating' style={{fontSize: "10px", marginBottom:"5px"}}>{this.props.users[uid].nickName}</a></li>

                    </ul>
                </div>
            </nav>


                <div className="container">
                    {content}   
                </div>
                <Parallax/>
            </div>

            // Alternatively use NavBar from react-bootstrap
            // however, contains too many bugs
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        blogs: state.firestore.ordered.blogs,
        comments : state.firestore.ordered.comments,
        users : state.firestore.data.users,
        subscriptions : state.firestore.data.subscriptions,  
        prefReducer : state.preference
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      subscribe : (p1,p2,p3,p4)=>dispatch(subscribe(p1,p2,p3,p4)),
      fetchSubId : (p1,p2) => dispatch(fetchSubId(p1,p2)),
      resetSub : ()=>dispatch(resetSub()),
    }
}

  
export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection : 'comments'},
        {collection : 'blogs'},
        {collection : 'users'},
        {collection : 'subscriptions'}
    ])
) (Profile));