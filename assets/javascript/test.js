$(document).on("click", "#test", () =>{

    var photo = auth.currentUser.photoURL;
    var div =  $("#test");

    var img = $("<img>").attr("src", photo);

    div.append(img);
})

function getPhoto(){
    var div =  $("#test");
    var photo;

    getUser(function(user){
        photo = user.photoURL;
        var img = $("<img>").attr("src", photo);

        div.append(img);
    })
}

$(document).ready( () =>{
    getPhoto();
})
