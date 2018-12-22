export const changeMusicState = (state) => {
    return (dispatch) => {
        dispatch({type:'MUSIC_STATE_CHANGE'}, state)
    }
}

export const changeMusic = (music) => {
    return ((dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        firestore.collection('users').doc(firebase.auth().currentUser.uid).update({
            musicId : music
        }).then(()=>{
            dispatch({type:'MUSIC_CHANGE', music})
        }).catch((err)=>{
            dispatch({type:'MUSIC_CHANGE_ERROR', err})
        })
    })
}

export const readSub = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection('subscriptions').doc(id).update({
            read : true,
        }).then(()=>{
            window.location.reload()
        }).catch((err) => {
            alert('Error in update sub')
        })
    }
}


export const fetchSubId =  (subscriberId, hostId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        let subs = firestore.collection('subscriptions')
        const filtered = subs.where('subscriberId','==', subscriberId).where('hostId','==',hostId).get()
        filtered.then(function(querySnapshot) {
            if (querySnapshot.size == 0) {
                dispatch({type:'SUB_RES', subId : undefined})
            }
            querySnapshot.forEach(function(doc) {
                dispatch({type:'SUB_RES', subId : doc.id})
            })
        }).catch( (err) => {
            alert(err.message)
        })
    }
}



export const subscribe = (id, subscriberId, hostId, sub) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        if (!id) {
            firestore.collection('subscriptions').add({
                subscriberId, 
                hostId,
                subscribed: true
            }).then((info) => {
                id = info.id
                dispatch({type:'SUB', id})
            }).catch((err) => {
                dispatch({type:'SUB_ERROR', err})
            })
            return 
        }

        firestore.collection('subscriptions').doc(id).update({
            subscribed : sub
        }).then((info) => {
            dispatch({type:'SUB_CHANGE'})
        }).catch((err) => {
            dispatch({type:'SUB_CHANGE_ERROR', err})
        })
    }
}

export const reportLoadingError = (err) => {
    return ((dispatch) => {
        dispatch({type:'MUSIC_LOAD_ERROR', err})
    })
}

export const reportStarting = (err) => {
    return ((dispatch) => {
        dispatch({type:'MUSIC_START', err})
    })
}

export const resetSub = () => {
    return (dispatch) => {
        dispatch({type:'RESET_SUB'})
    }
}
