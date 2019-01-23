var uiConfig = {
    signInSuccessUrl: '<file:///Users/cnikolinka/Desktop/Geo-Chats/index.html>',
    signInOptions: [
     firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url/callback.
    tosUrl: '<https://www.google.com>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<https://www.google.com>');
    }
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);



var config = {
    apiKey: "AIzaSyDngPn-9Y0lmb_00NC-y76ybx8vFc-j6P4",
    authDomain: "signin-8e10e.firebaseapp.com",
    databaseURL: "https://signin-8e10e.firebaseio.com",
    projectId: "signin-8e10e",
    storageBucket: "signin-8e10e.appspot.com",
    messagingSenderId: "497085812892"
};
firebase.initializeApp(config);



var firebase = require('firebase');
var firebaseui = require('firebaseui');

/*firebase authorization variable*/
const auth = firebase.auth();

/* variables to hold the email and password sign in authorization */
const promise = auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassword(email, pass);

/*variables to hold the google sign in authorization*/
const googleProvider = new firebase.auth.GoogleAuthProvider();
const googlePromise = auth.signInWithPopup(googleProvider);

/* authentication changes listener */
firebase.auth().onAuthStateChanged();

/* Register with username and password event listener*/
document.getElementById("btnSignUp").addEventListener('click', e => {
    const email = document.getElementById("txtUserName").value;
    const pass = document.getElementById("txtPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
        console.log(error.message);
    });
})

/* Login with existing username and password event listener */
document.getElementById("btnLogin").addEventListener('click', e => {
    const email = document.getElementById("txtUserName").value;
    const pass = document.getElementById("txtPassword").value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e => { console.log(e.massage) })
})

/* app change upon loggin in and logging out (making the logout button visible when logged in) */
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("btnLogOut").classList.remove('hide')
    } else {
        document.getElementById("btnLogOut").classList.add('hide')
    }
})

/* logging out */

document.getElementById("btnLogOut").addEventListener('click', e => {
    firebase.auth().signOut();
    console.log('logged out')
});







