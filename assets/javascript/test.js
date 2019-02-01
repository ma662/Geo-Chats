$(document).on("click", "#test", function(){
    getUser(function(x){console.log(x)})
})

var userObject = {
    loggedIn: '',
    username: '',
    selectedRegion: false
};

var chat = {
    regionLocked: true,      // regionLocked until geolocationally confirmed
    regionCode: 'trashHeap',

    whatTime: function() {
        var today = new Date();
        var time = today.toLocaleTimeString()
        return time;
    },

    send: function() {
        if ($("#input-field").val() != '') {
            var newMessage = $("#input-field").val();
            var msgArr = [0, newMessage];
            // forcibly clear input field
            $("#input-field").val('');
            var time = this.whatTime();
            database.ref(chat.regionCode + "/").push({
                username: user.username,
                message: msgArr,
                timestamp: time,
                // type: "message",
            });
            $("#chat-history").scrollTop($("#chat-history").get(0).scrollHeight);
        }
    },

    ping: function() {
        navigator.geolocation.getCurrentPosition(function (position, error) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // console.log(pos.lat);
            // console.log(pos.lng);
            var mapURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + pos.lat + "," + pos.lng + "&zoom=13&size=350x350&maptype=roadmap&markers=color:red%7C" + pos.lat + "," + pos.lng + "&key=AIzaSyDWxgwUgXQkFafEz-Xojc7P1tn_j4e3NDg";
            var msgArr = [1, mapURL];
            // forcibly clear input field
            $("#input-field").val('');
            var time = chat.whatTime();
            database.ref(chat.regionCode + "/").push({
                username: user.username,
                message: msgArr,
                timestamp: time,
            });
            $("#chat-history").scrollTop($("#chat-history").get(0).scrollHeight);
        });
    }, // end of ping
};

$(document).ready(function(){

$(".region").on("click", function (e) {
    e.preventDefault();

    if (!user.selectedRegion) {
        chat.regionCode = this.id;
        myRegion = (chat.regionCode.slice(7, chat.regionCode.length).replace(/-/g, ' '));
        // jersey city || new york

        // get user position
        navigator.geolocation.getCurrentPosition(function (position, error) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyAOKpdCN5cXgEoKrBnRlg3M72BrOnAty_0";

            // Function to call Geocoding results
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                    // ===================================
                    // Region Checking
                    // ===================================

                var addressComponents = response.results[0].address_components;
                // (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

                for (var i = 0; i < addressComponents.length; i++) {

                    // ensure user's comps are lowercase so the comparison works
                    var formattedComp = addressComponents[i]["short_name"].toLowerCase();

                    // For Debugging
                    // console.log({
                    //     myRegion: myRegion,
                    //     aComp: formattedComp,
                    // });

                    if (formattedComp === myRegion) {
                        chat.regionLocked = false;
                        user.selectedRegion = true;
                        break;
                    }
                    else if (i === addressComponents.length - 1 && chat.regionLocked){
                        // if you fail region check, show modal
                        $("#wrong-region").modal("show");
                    }
                    console.log(chat.regionLocked);
                }

                // pass region check
                if (!chat.regionLocked && user.selectedRegion) {
                    alert("Region check passed!");
                    chat.regionLocked = true;

                    // ===================================
                    // Dynamic Chatroom Initialization
                    // ===================================

                    var chatDiv = $("<div id='chat-div'>");
                    var chatHistory = $("<div id='chat-history'>");
                    chatHistory.appendTo(chatDiv);

                    // User Input
                    var inputForm = $("<form>");

                    var inputField = $("<input type='text'>").text("Type your message...");
                    inputField.attr("id", "input-field");
                    inputField.appendTo(inputForm);

                    var send = $("<button type='submit' id='submit'>").text("| Send Message");
                    send.appendTo(inputForm);

                    var ping = $("<button type='button' id='ping'>").text("🌎|");
                    ping.appendTo(inputForm);

                    inputForm.appendTo(chatDiv);
                    chatDiv.appendTo("#border");

                    // ===================================
                    // Chat Functions
                    // ===================================

                    send.on("click", function (e) {
                        e.preventDefault();
                        chat["send"]();
                    });

                    // on id ping button click
                    ping.on("click", function (e) {
                        e.preventDefault();
                        chat["ping"]();
                    });

                    // chat message updater
                    database.ref().on("value", function (snapshot) {
                        // everytime this fires, empty the chat
                        chatHistory.empty();

                        // go through snapshot keys, create a p tag and stuff into chat history, then stuff chat history into chat div
                        for (var i = 0; i < Object.keys(snapshot.val()[chat.regionCode]).length; i++) {
                            var thisKey = Object.keys(snapshot.val()[chat.regionCode])[i];

                            // // set up styling hooks 
                            var thisMsg = $("<div>").addClass("messages");

                            var uName = snapshot.val()[chat.regionCode][thisKey].username;
                            $("<p>").attr("id", "sender").text(uName + ":").appendTo(thisMsg);

                            var payload = snapshot.val()[chat.regionCode][thisKey].message;
                            
                            // if payload is a regular message
                            if (payload[0] === 0) {
                                var txtMsg = payload[1];
                                $("<p>").attr("id", "payload").text(txtMsg).appendTo(thisMsg);
                            }
                            // if payload is a mapMessage
                            else if (payload[0] === 1) {
                                var thisLink = payload[1];
                                $("<img>").attr("id", "payload").attr("src", thisLink).appendTo(thisMsg);
                            }

                            var ts = snapshot.val()[chat.regionCode][thisKey].timestamp;
                            $("<p>").attr("id", "timestamp").text(ts).appendTo(thisMsg);

                            // console.log(thisMsg.text());
                            thisMsg.appendTo(chatHistory);
                        }

                        console.log("I have fired initially or because of a db update");

                        // automatically scroll chat-history div every time database is changed 
                        $("#chat-history").scrollTop($("#chat-history").get(0).scrollHeight);
                    }); // end database(ref)

                } // end (!chat.regionLocked)

            }); // end ajax
                
        }); // end navigator

    } // end (!user.selectedRegion)
    else { 
        // if a region was selected and successfully entered, show modal
        $("#region-selected").modal("show");
    }

});
// doc closing tab
});