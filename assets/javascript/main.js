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
    


var config = {
    apiKey: "AIzaSyDngPn-9Y0lmb_00NC-y76ybx8vFc-j6P4",
    authDomain: "signin-8e10e.firebaseapp.com",
    databaseURL: "https://signin-8e10e.firebaseio.com",
    projectId: "signin-8e10e",
    storageBucket: "signin-8e10e.appspot.com",
    messagingSenderId: "497085812892"
};

firebase.initializeApp(config);

/*firebase authorization variable*/
const auth = firebase.auth();
/* authentication changes listener */
firebase.auth().onAuthStateChanged();


$(".register form").on("submit", function (event) {
    event.preventDefault();

    var email = $(".register .email").val();
    var password = $(".register .password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log(user);
        })
        .catch(function (err) {
            console.log(err);
        });

});

$(".login form").on("submit", function (event) {
    event.preventDefault();

    var email = $(".login .email").val();
    var password = $(".login .password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log(user);
        })
        .catch(function (err) {
            console.log(err);
        });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $(".btnLogOut").classList.remove('hide');
        } else {
            $(".btnLogOut").classList.add('hide');
        }
    });

    
    /* logging out */
    
    $(".btnLogOut").addEventListener('click', e => {
        firebase.auth().signOut();
        console.log('logged out')
    });

});


}};