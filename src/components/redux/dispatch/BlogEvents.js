export const createBlog = (blog, auth) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        console.log('Below is the state of createBlog');
        console.log(getState());
        if (blog.title === '') {
            dispatch({type:'BLOG_CREATION_ERROR', blogError:'Title must be non-empty'})
            return;
        }
        if (blog.content === '') {
            dispatch({type:'BLOG_CREATION_ERROR', blogError:'Content must be non-empty'})
            return;
        }

        firestore.collection('subscriptions').where('hostId','==',auth.uid).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.update({read : 'false'})
            })
        }).catch((err) => {
            alert('Error in update sub')
        })


        firestore.collection('blogs').add({
            ...blog,
            author: getState().firebase.profile.nickName, 
            authorId : firebase.auth().currentUser.uid,
            createdAt: new Date(),
            popularity : 0
        }).then((info) => {
            dispatch({type:'BLOG_CREATION', id:info.id})
        }).catch((err) => {
            dispatch({type:'BLOG_CREATION_ERROR', err})
        })
    }
}

export const reset = (blog) => {
    return (dispatch) => {
        dispatch({type:'BLOG_RESET'})
    }
}

export const deleteBlog = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('blogs').doc(id).delete()
        .then(() => {
            dispatch({type:'BLOG_DELETION', id:id})

            firestore.collection('comments').where('articleId','==',id).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                })
            }).then(()=>{
                dispatch({type: "COMMENT_DELETION"})
            }).catch((err) => {
                alert("WTF Failure")
                dispatch({type: "COMMENT_DELETION_ERROR", err})
            })
            return;

        }).catch((err) => {
            dispatch({type:'BLOG_DELETION_ERROR', err})
        })
    }
}



export const likeBlog = (id, blogId, userId, likeCount) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log(id, blogId, userId)
        if (!id || id==undefined) {
            firestore.collection('likes').add({
                blogId, 
                userId
            }).then((info) => {
                firestore.collection('blogs').doc(blogId).update({
                    popularity : likeCount+1
                }).then(()=>{
                    dispatch({type:'LIKE', id:info.id})
                }).catch((err)=> {
                    alert(err.message)
                })
            }).catch((err) => {
                dispatch({type:'LIKE_ERROR', err})
            })
        } else {
            firestore.collection('likes').doc(id).delete().then(() => {
                firestore.collection('blogs').doc(blogId).update({
                    popularity : likeCount-1
                }).then(()=>{
                    dispatch({type:'DISLIKE', id})
                }).catch((err)=> {
                    alert(err.message)
                })
            }).catch((err) => {
                dispatch({type:'DISLIKE_ERROR', err})
            })
        }
    }
}