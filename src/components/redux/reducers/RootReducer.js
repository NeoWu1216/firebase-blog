import authReducer from './AuthReducer'
import blogReducer from './BlogReducer'
import commentReducer from './CommentReducer'
import preferenceReducer from './PreferenceReducer'
import { combineReducers } from 'redux';
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    comment: commentReducer,
    preference : preferenceReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer,
})
export default rootReducer;