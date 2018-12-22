export const createComment = (comment) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const filestore = getFirestore();
        const firebase = getFirebase();
        if (comment.content === '') {
            dispatch({type:'COMMENT_CREATION_ERROR', commentError:'Content must be non-empty'})
            return;
        }
        const user = firebase.auth().currentUser;
        filestore.collection('comments').add({
            content: comment.content,
            articleId : comment.blog.id,
            blogAuthorId : comment.blog.authorId,
            commentAuthor: user ? getState().firebase.profile.nickName : "Anonymous", 
            commentAuthorId : user ? user.uid : -1,
            createdAt: new Date(),
        }).then((info) => {
            dispatch({type:'COMMENT_CREATION', id:info.id})
        }).catch((err) => {
            dispatch({type:'COMMENT_CREATION_ERROR', err})
        })
    }
}