/*
where the magic happens
*/

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.

		document.getElementById("user_div").style.display = "block";
		document.getElementById("topnav-right").style.display = "inline-flex";
		document.getElementById("auth").style.display = "none";
		showMyGiftCards()

	} else {
		// No user is signed in.

		document.getElementById("user_div").style.display = "none";
		document.getElementById("topnav-right").style.display = "none";
		document.getElementById("auth").style.display = "flex";

	}
});

function login() {

	var userEmail = document.getElementById('email_field').value
	var userPass = document.getElementById('password_field').value

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		window.alert("Error: " + errorMessage)
	});

}

function signup() {
	var userEmail = document.getElementById('email_signup_field').value
	var userPass = document.getElementById('password_signup_field').value

	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		window.alert("Error: " + errorMessage)
	});

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log("Error: " + errorMessage)
	});
}

function signinWithGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		console.log(errorMessage)
	});

}

function logout() {

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
		window.alert("Error: " + error)
	});

}

function registerGiftCard() {
	// A post entry.
	var cardData = {
		base: document.getElementById("base").value,
		bidder: "N/A",
		company: document.getElementById("company").value,
		email: firebase.auth().currentUser.email,
		enddate: new Date(document.getElementById("end").value).toString(),
		highest: 0,
		startdate: new Date().toString(),
		value: document.getElementById("value").value
	};

	console.log(cardData)

	firebase.database().ref().child('giftcards').push(cardData);

	document.getElementById("base").value = null
	document.getElementById("company").value = null
	document.getElementById("end").value = null
	document.getElementById("value").value = null
}

function showMyGiftCards() {
	// establishes root of db
	var rootRef = firebase.database().ref();

	// creates ref for node
	var ref = rootRef.child('giftcards');

	// gets values from database and changes html
	ref.on('value', function(snap) {
		document.getElementById("mygiftcards").innerHTML = ""
		// gets values for each element in data set
		var currentUser = firebase.auth().currentUser.email

		snap.forEach(function(child){
			var childData = child.val();

			var email = childData.email;

			if (currentUser.localeCompare(email) == 0) {
				var company = childData.company;
				var val = childData.value;
				var base = childData.base;
				var highest = childData.highest;
				var startdate = childData.startdate;
				var enddate = childData.enddate;
				var bidder = childData.bidder;

				var today = new Date();
				var enddate = new Date(enddate);
				var startdate = new Date(startdate);

				document.getElementById("mygiftcards").innerHTML += "<fieldset class='giftcards'><legend><h1 class='giftcard-header'>$"+ val + " " + company + " Gift Card" + "</h1></legend><div class='flex-container'><div><fieldset class='base-bid'><legend><h3>Base bid</h3></legend><h2>$" + base + "</h2></fieldset></div><div><fieldset class='current-highest'><legend><h3>Highest bid</h3></legend><h2>$" + highest + "</h2></fieldset></div></div><div class='flex-container'><div><fieldset class='base-bid'><legend><h3>Start date</h3></legend><h2>" + startdate.toUTCString() + "</h2></fieldset></div><div><fieldset class='current-highest'><legend><h3>End date</h3></legend><h2>" + enddate.toUTCString() + "</h2></fieldset></div></div><fieldset><legend><h3>Highest bidder</h3></legend><h2>" + bidder + "</h2></fieldset></div></div></fieldset>";
			}
		});
	});
}
