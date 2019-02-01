
var config = {
    apiKey: "AIzaSyDs156FXHEVnRk6yj6Z82K8nWY3w1YJiG0",
    authDomain: "geo-chats.firebaseapp.com",
    databaseURL: "https://geo-chats.firebaseio.com",
    projectId: "geo-chats",
    storageBucket: "geo-chats.appspot.com",
    messagingSenderId: "157534175404"
};

firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();
var main_user;


//function to get if a user is logged in
function getUser(callback){
    auth.onAuthStateChanged(function(user) {
        if(user!==null){
            callback(true);
            return true;
        } else {
            callback(false);
            return false;
        }
    })
}




