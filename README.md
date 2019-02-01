# Geo-Chats
Project 1 repository for a messaging chat room app that utilizes Google maps API.


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Geo Chat</title>
    <!-- this is the code that will allow icon to be visible in the title bar of the brower -->
    <link rel="icon" type="image/ico" href="assets/images/geo_chat_logo_160.png" />

    <!-- Bootstrap CSS CDN -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        crossorigin="anonymous">
    
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/message.css">
    <link rel="stylesheet" href="assets/css/testmess.css">

    <!-- Font Awesome JS -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
        crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
        crossorigin="anonymous"></script>

    <!-- jquery from myles side of the project -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Linking Firebase from myles -->
    <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
    <script defer src="assets/javascript/firebase.js"></script>
</head>

<body>
    <!-- Modal -->
    <div id="wrong-region" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Error</h5>
                </div>
                <div class="modal-body">
                    You are not located in that region. Please try another option. Thank you!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end of Modal -->

    <!-- Modal -->
    <div id="region-selected" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Room Already Selected</h5>
                </div>
                <div class="modal-body">
                    If you'd like to select a new one, please press "New Room" to refresh the page, then select the room of your choosing.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="refresh" type="button" class="btn btn-secondary" data-dismiss="modal">New Room</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end of Modal -->

    <div class="wrapper">
        <!-- Sidebar Holder -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3><img src="assets/images/geo_chat_logo_160.png"></h3>
            </div>

            <ul class="list-unstyled components">
                <p class="light">Welcome to GEO CHAT!</p>

                <li class="active">
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Regions</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">

                        <li class="region" id="region:jersey-city"><a href="#">Jersey City</a></li>
                        
                        <li class="region" id="region:nj"><a href="#">New Jersey</a></li>

                        <li class="region" id="region:new-york"><a href="#">New York</a></li>

                    </ul>
                    <a href="about.html">About Us</a>
                    <a href="login.html" id="logout">Logout</a>
                </li>
            </ul>
        </nav>

        <!-- Page Content Holder -->
        <div id="content">
            <nav class="navbar navbar-default">
                <div class="container-fluid">

                    <div class="navbar-header">
                        <button type="button" id="sidebarCollapse" class="navbar-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <p id="uname-display"></a>

                </div>
            </nav>

            <h2>A new way to chat with people in your location!</h2>
            <h6>( This application requires access to your current location ... obviously )</h6>
            
            <!-- Chatroom div -->
            <div id="border">
            </div>

            <div id="test">Test</div>
            
            
        </div>
    </div>

    <!-- Popper.JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
        crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>
    <!-- Js source code-->
    <script src="assets/javascript/main.js"></script>
    <script defer src="assets/javascript/test.js"></script>
</body>
</html>