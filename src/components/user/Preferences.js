import React, { Component } from 'react'
import {changeMusic, changeMusicState} from '../redux/dispatch/PreferenceEvents'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

class Preferences extends Component {
  state = {
    content : ""
  }
  onInputChange=(e) => {
    this.setState({[e.target.id]:e.target.value})
  }

  onMusicChange = (e) => {
    e.preventDefault();
    console.log("To be submitted: ", this.state);
    this.props.changeMusic(this.state.content);
    this.setState({content : ""});
  }
  onMusicChangeState= (e) => {
    e.preventDefault();
    this.props.changeMusicState(this.state);
  }

  render() {
    const {preference, auth, profile} = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    let music;
    // if (!users || !users[auth.uid] || !users[auth.uid].musicId)
    music = (profile.musicId) ?   (profile.musicId) : "KgEQNlR4A6o";
    const src = "https://www.youtube.com/watch?v="+music;
    const color = (preference.status !== "normal") ? "red" : "black";
    return (
      <div>
        <img src={require('../img/youtube-icon.jpg')}  style={{marginTop:"2em",  width:"15%", height:"auto"}}/>
      <form className="container" style={{marginTop : '1em'}}>
        <b style={{fontSize : '15px'}}> 
          Current Playing :  {src} 
        </b> <br/> <br/>
        <b style={{fontSize : '20px', color : color}}> 
          Status : {preference.status}
        </b>
        <input style={{textAlign : 'center', marginTop : '1em', marginBottom: '1em'}} 
             placeholder="Type New Youtube ID Here: " value={this.state.content} 
             id = "content" onChange={this.onInputChange}/>
        <button id = "submit1" style={{marginRight : '2em'}} onClick={this.onMusicChange} >
          Change
        </button>
        <button id = "submit2" onClick={this.onMusicChangeState}>
        {preference.paused ? "continue" : "pause"}
        </button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.data.users,
    preference: state.preference
  }
}


const mapDispatchToProps = dispatch => {
  return {
    changeMusic: (music) => dispatch(changeMusic(music)),
    changeMusicState: (music) => dispatch(changeMusicState(music)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // firestoreConnect([
  //   {collection : 'users'}
  // ])
)(Preferences);