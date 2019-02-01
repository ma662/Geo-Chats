var config = {
    apiKey: "AIzaSyDs156FXHEVnRk6yj6Z82K8nWY3w1YJiG0",
    authDomain: "geo-chats.firebaseapp.com",
    databaseURL: "https://geo-chats.firebaseio.com",
    projectId: "geo-chats",
    storageBucket: "geo-chats.appspot.com",
    messagingSenderId: "157534175404"
};
firebase.initializeApp(config);
var auth = firebase.auth();


$("#sign-up").on("click", function (e) {
    e.preventDefault();

    $("<input type='email' id='email' class='form-control' placeholder='example@url.com' required=''>").prependTo('.form-signin');
    $("<input type='password' id='conf-pass' class='form-control' placeholder='Confirm Password' required=''>").appendTo('.form-signin');
    $("#sign-up").remove();
    $("#login").remove();

    $("<button id='sign-up2' class='btn-primary btn-lg btn-block' type='button'>Create Account</button>").appendTo('.form-signin');
})




$(document).on("click", "#sign-up2", function(e){
    e.preventDefault();

    var uEmail = $("#email").val().trim();
    var uName = $("#username").val().trim();
    var uPass = $("#pass").val().trim();
    var confPass = $("#conf-pass").val().trim();
    console.log(uName);
    console.log(uPass);
    var date = new Date();
    var date_string = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
   
    if(uPass === confPass){
        auth.createUserWithEmailAndPassword(uEmail, uPass).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error:"+errorMessage)
        }).then(function() {

            //variables that will get pushed into the user database object
            var userEmail = auth.currentUser.email;
            var userID = auth.currentUser.uid;
            var postData = {
                uName: uName,
                email: userEmail,
                joinDate: date_string,
                avatar: "assets/images/geo_chat_logo_160.png",
                history: [],
                friends: []
            };
        
            // Get a key for a new Post.
        
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/users/' + userID] = postData;
        
            console.log(updates);
            return firebase.database().ref().update(updates);
        
        });
    }
  
  })

$(document).on("click", "#login", function (e) {
    e.preventDefault();

    // get vals of uName and uPass
    var uName = $("#username").val().trim();
    var uPass = $("#pass").val().trim();

    // alert(uName + "\n" + uPass);

    auth.signInWithEmailAndPassword(uName, uPass).catch(function(error) {
        // Handle Errors here.
        
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error:"+errorMessage);
    })
});