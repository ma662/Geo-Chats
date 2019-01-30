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

            //fix moving from signup
            var userEmail = auth.currentUser.email;
            var userID = auth.currentUser.uid;
            var postData = {
                uName: uName,
                email: userEmail,
                joinDate: date_string,
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

  $("#login").on("click", function (e) {
    e.preventDefault();

    // get vals of uName and uPass
    var uName = $("#username").val().trim();
    var uPass = $("#pass").val().trim();

    // alert(uName + "\n" + uPass);

    if (uName != '') {
        userRef.once("value")
            .then(function (snapshot) {
                debugVar = snapshot;
                mySnap = snapshot.val();

                // if db doesn't have uName
                if (!snapshot.hasChild(uName)) {
                    alert("Either this username password combination is incorrect or that user doesn't exist.");

                    // for (var i=0; i<Object.keys(mySnap).length; i++) {
                    //     var thisKey = Object.keys(mySnap)[i];

                    //     var vals = Object.keys(mySnap[thisKey]);
                    //     console.log(vals);

                    //     var dPass = mySnap[thisKey];

                }
                else {
                    // if db does have it, pull snapshot data, see if uPass matches pass of db user
                    var comp = mySnap[uName]['pass'];
                    console.log(comp);

                    if (uPass === comp) {
                        // Clear sessionStorage
                        localStorage.clear();

                        // Store all content into sessionStorage
                        localStorage.setItem("username", uName);
                        localStorage.setItem("log-token", true);

                        alert("Login successful");

                        window.open("./index.html"); // open main page
                    }
                    else {
                        alert("Either this username password combination is incorrect or that user doesn't exist.");
                    }

                }
                $("#username").val('');
                $("#pass").val('');
            });
    }
});