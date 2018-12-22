const defaultState = {
    status : null
}

const commentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'COMMENT_CREATION':
            console.log("Comment created successfully")
            console.log('action', action)
            console.log(state)
            return {
                ...state,
                status : null
            }
        case 'COMMENT_CREATION_ERROR':
            const error = action.commentError ? action.commentError : action.err.message;
            return {
                ...state,
                status : error
            }
        case 'COMMENT_DELETION':
            console.log('Comments Deletion Success')
            break;
        case 'COMMENT_DELETION_ERROR':
            alert('Deletion error: '+action.err.message)
            console.log('Deletion error: '+action.err.message)
    }
    return state
}



export default commentReducer;