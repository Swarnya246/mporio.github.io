firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.

		document.getElementById("user_div").style.display = "block";
		document.getElementById("signup_div").style.display = "none"
		document.getElementById("login_div").style.display = "none";

	} else {
		// No user is signed in.

		document.getElementById("user_div").style.display = "none";
		document.getElementById("signup_div").style.display = "block"
		document.getElementById("login_div").style.display = "block";

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

function logout() {

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
		window.alert("Error: " + error)
	});

}
