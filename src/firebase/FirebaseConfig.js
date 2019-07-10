import * as firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

//Ensure date don't break
firebase.firestore().settings({timestampsInSnapshots:true});
export default firebase;

const firestore = firebase.firestore();
const storage = firebase.storage();
export {firestore, storage}