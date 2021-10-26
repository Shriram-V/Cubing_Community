//YOUR FIREBASE LINKS

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBDX9VLxmLqKW-Z41cMIUizW-UGGlL5Csg",
    authDomain: "cubingcommunity-721a3.firebaseapp.com",
    databaseURL: "https://cubingcommunity-721a3-default-rtdb.firebaseio.com",
    projectId: "cubingcommunity-721a3",
    storageBucket: "cubingcommunity-721a3.appspot.com",
    messagingSenderId: "983478216255",
    appId: "1:983478216255:web:772f3cf707bb5398b5fa8a",
    measurementId: "G-VT0KKL95LZ"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          likes: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name_user = message_data['name'];
                      message = message_data['message'];
                      like = message_data['likes'];

                      name_tag = "<h4>" + name_user + "<img src='tick.png' class='user_tick'></h4>";
                      message_tag = "<h4 class='message_h4'>" + message + "</h4>";
                      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value =" + like + " onclick='updateLike(this.id)'>";
                      span_tag = "<span class='glyphicon glyphicon-thumbs-up'> " + like + "</span></button><hr>";

                      row = name_tag + message_tag + like_button + span_tag;
                      document.getElementById("output").innerHTML += row;


                      //End code
                }
          });
    });
}
getData();

function updateLike(message_id) {
    console.log("you have clicked on button with Id- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          likes: updated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function back() {
    localStorage.removeItem("room_name");
    window.location = "chat_room.html";
}