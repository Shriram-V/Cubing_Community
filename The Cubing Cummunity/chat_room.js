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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "add room"
      });
      localStorage.setItem("room_name", room_name);
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  room_names_firebase = childKey;
                  //Start code
                  console.log(room_names_firebase);
                  row = "<div class='room_name' id=" + room_names_firebase + " onclick='redirectToRoomName(this.id)'>" + room_names_firebase + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "chat_page.html";
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}