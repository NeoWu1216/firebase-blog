import React, { Component } from 'react'
// import Script from 'react-load-script'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {reportLoadingError, reportStarting} from '../redux/dispatch/PreferenceEvents'



class Music extends Component {
  // loadscript(src) {
  //   const script = document.createElement("script");

  //   script.src = src;
  //   //script.async = true;

  //   document.body.appendChild(script);
  // }


  // componentDidMount () {
  //   this.loadscript('https://www.youtube.com/iframe_api');
  //   this.loadscript('https://cdn.rawgit.com/labnol/files/master/yt.js')
  // }

  // handleOnReady = () => setTimeout(() => this.setState({ playing: true }), 1000);

  onError = (music)=> e => {
    console.error("Error Loading Music", music)
    this.props.reportLoadingError(e)
  }

  onStart = (e) => {
    console.log("onStart")
    this.props.reportStarting(e)
  }

  handleOnReady = (e) => {
    console.log("onReady")
    // this.props.reportLoadingError(e)
  }

  render() {
    const {preference, auth, profile} = this.props;
    let music = "";
    if (auth.uid)
      music = (profile.musicId) ?   (profile.musicId) : "KgEQNlR4A6o";

    const {paused} = preference;
    const src = "https://www.youtube.com/watch?v="+music;
    // console.log(src)
    // console.log("Paused: ", paused)
    return (
      <ReactPlayer url={src} width={0} height={0} loop playing={!paused} volume={0.7}
      // onReady={() => {console.log('onReady')}}
      onReady={this.handleOnReady}
      onStart={this.onStart}
      playbackRate={1.0}
      onError={this.onError(music)} //use wrong music to mute, no need to report every time.
    />
    )
  }
}


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    // users: state.firestore.data.users,
    preference: state.preference,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {reportLoadingError : (err) => dispatch(reportLoadingError(err)),
    reportStarting : (err) => dispatch(reportStarting(err))}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection : 'users'}
  ])
)(Music);
