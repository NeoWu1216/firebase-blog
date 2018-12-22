import React, { Component } from 'react'
import {storage, firestore} from '../../firebase/FirebaseConfig'
import { connect } from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'


class Avatar extends Component {
  state = {
    image: null,
    progress: 0
  }
  handleChange = e => {
    let image = undefined;
    if (e.target.files[0]) {
      let image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
    const {image} = this.state;
    const {auth} = this.props;
    // firestore.collection('users').where("nickName", "==", "aaa").get().then(s=>{s.forEach(e=>{console.log(e.data())})})
    if (!image || !image.name){
        return;
    }
    const uploadTask = storage.ref(`images/${"avatar_"+auth.uid}`).put(image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      this.setState({progress});
      }, 
      (err) => {
          alert(err)
          console.error(err)
      }, 
      () => { //image.name
          storage.ref('images').child("avatar_"+auth.uid).getDownloadURL().then(url => {
            firestore.collection("users").doc(auth.uid).update({
              avatarURL : url
          });
        }).catch((err) => {
            alert(err);
            console.error(err)
        })
      }
    );
  }
  render() {
    const {auth, profile} = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    return (
      <div className='container'>
      <div className="form-inline" style={{justifyContent:'center'}}>
      <div className = "form-group">
        <meter  style={{ width:'100%', marginTop:"10px", marginBottom:"10px"}} value={this.state.progress} min="0" max="100"></meter>
        <br/>
        <img src={(profile && profile.avatarURL) || 'https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji_400x400.jpg'} alt="Uploaded" height="300" width="400" />
        <div className = "input-field">   
          <input  
            type="file" 
            id = "select"
            // className = "btn btn-primary"
            onChange={this.handleChange} 
            style = {{justifyItems:'center', paddingLeft:'50px'}}
            accept="image/png, image/jpeg"/>
        </div>
        <div className = "input-field">        
          <button id="upload" onClick={this.handleUpload}>Upload</button>
        </div>
      </div>
      </div>
      </div>
    )
  } 
}


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection : 'users'}
  ])
)(Avatar);