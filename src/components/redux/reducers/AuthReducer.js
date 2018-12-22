const defaultState = {
    authError : null,
    signUpError : null, 
    signInError : null,
    signOutError : null,
    resetError : null,
}

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'SIGNUP_ERROR':
            console.log('signUp error')
            return {
                ...state,
                signUpError : action.authError ? action.authError : action.err.message
            }
        case 'SIGNUP_SUCCESS':
            console.log('signUp success')
            return {
                ...state,
                signUpError : null
            }
        case 'SIGNIN_ERROR':
            console.log('signIn error')
            return {
                ...state,
                signInError : action.err.message
            }
        case 'SIGNIN_SUCCESS':
            console.log('signIn success')
            return {
                ...state,
                signInError : null
            }
        case 'SIGNOUT_ERROR':
            console.log('signOut error')
            alert('signOut Failed! something must be happening')
            return {
                ...state,
                signOutError : 'SignOut Failed'
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signOut success')
            return {
                ...state,
                signOutError : null
            }
        case 'RESET_SUCCESS':
            console.log('password reset success')
            return {
                ...state,
                resetError : "Email Sent~"
            }
        case 'RESET_ERROR':
            console.log('password reset failure')
            return {
                ...state,
                resetError : action.err.message
            }
        default:
            return state;
    }
}


export default authReducer;