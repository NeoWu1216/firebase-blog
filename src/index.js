import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './components/redux/reducers/RootReducer';
import { Provider } from 'react-redux'
import rthunk from 'redux-thunk'
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import config from './firebase/FirebaseConfig'
import 'semantic-ui-css/semantic.min.css'


const middleware = applyMiddleware(rthunk.withExtraArgument({getFirebase, getFirestore}))
const firebase = reactReduxFirebase(config, {useFirestoreForProfile:true, userProfile:'users', attachAuthIsReady: true});
const firestore = reduxFirestore(config)
const store = createStore(rootReducer, compose(middleware, firebase, firestore));

// ReactDOM.render(
//     <Provider store={store}>
//         <App/> 
//     </Provider>,
//     document.getElementById('root')
// );
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App/> 
        </Provider>,
        document.getElementById('root')
    );
    serviceWorker.unregister();
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
