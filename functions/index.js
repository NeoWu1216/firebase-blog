const functions = require('firebase-functions');
const admin =  require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello world");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc=> console.log('added notification', doc))
})

exports.projectCreated = functions.firestore
    .document('blogs/{blogId}')
    .onCreate(doc => {
        const blog = doc.data();
        return createNotification({
            content : 'New blog creation',
            user : `${blog.author}`,
            time : admin.firestore.FieldValue.serverTimestamp()
        })
    })