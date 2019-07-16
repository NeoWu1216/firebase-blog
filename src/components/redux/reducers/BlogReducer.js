const defaultState = {
    id : null,
    status : null
}

const blogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'BLOG_CREATION':
            console.log('action', action)
            return {
                ...state,
                id : action.id,
                status : "Success"
            }
        case 'BLOG_CREATION_ERROR':
            return {
                ...state,
                status : action.blogError ? action.blogError : action.err.message
            }
        case 'BLOG_RESET':
            return {
                ...state,
                status : null
            }
        case 'BLOG_DELETION':
            console.log(action.id+' successfully deleted')
            return {
                ...state,
                status : null
            }
        case 'BLOG_DELETION_ERROR':
            alert('Deletion error: '+action.err.message)
            console.log('Deletion error: '+action.err.message)
        case 'LIKE':
            console.log('action', action)
            return {
                ...state,
                status : 'liked',
                id : action.id
            }
        case 'LIKE_ERROR':
            alert('Error in Like: '+action.err.message)
            return {
                ...state
            }
        case 'DISLIKE':
            console.log('action', action)
            return {
                ...state,
                status : 'disliked',
                id : null
            }
        case 'DISLIKE_ERROR':
            alert('Error in DisLike: '+action.err.message)
            return {
                ...state,
            }
    }
    return state
}



export default blogReducer;