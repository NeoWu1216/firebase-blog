export const signUp = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //firestore to store, firebase to auth in
        const firebase = getFirebase();
        const firestore = getFirestore();
        
        if (user.password !== user.password2) {
            dispatch({type : "SIGNUP_ERROR", authError : "Passwords don't match"});
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then((response)=> {
            return firestore.collection('users').doc(response.user.uid).set({
                nickName : user.nickName
            })
        }).then(() => {
            dispatch({type : "SIGNUP_SUCCESS"})
        }).catch((err) => {
            dispatch({type : "SIGNUP_ERROR", err})
        })
    }
}

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email, 
            credentials.password
        ).then(() => {
            dispatch({type : "SIGNIN_SUCCESS"})
        }).catch((err) => {
            dispatch({type : "SIGNIN_ERROR", err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type : 'SIGNOUT_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'SIGNOUT_ERROR', err})
        })
    }
}

export const resetPassword = (user) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        
        firebase.auth().sendPasswordResetEmail(user.email).then(()=> {
            dispatch({type : 'RESET_SUCCESS'})
        }).catch((err)=> {
            dispatch({type:'RESET_ERROR', err})
        })
    }
}