"use strict";
exports.__esModule = true;
exports.logOut = exports.signInAnonymous = exports.signUpEmailPassword = exports.signInEmailPassword = exports.signInWithGoogle = exports.currentUser = void 0;
var auth_1 = require("firebase/auth");
var firebase_1 = require("./firebase");
exports.currentUser = function () {
    return auth_1.onAuthStateChanged(firebase_1.auth, function (user) { });
};
exports.signInWithGoogle = function (redirect) {
    auth_1.signInWithPopup(firebase_1.auth, new auth_1.GoogleAuthProvider())
        .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var credential = auth_1.GoogleAuthProvider.credentialFromResult(result);
        var token = credential === null || credential === void 0 ? void 0 : credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        redirect();
        alert('You have successfully signed in with Google');
        // ...
    })["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.customData.email;
        // The AuthCredential type that was used.
        var credential = auth_1.GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage);
        // ...
    });
};
exports.signInEmailPassword = function (email, password, redirect) {
    auth_1.signInWithEmailAndPassword(firebase_1.auth, email, password)
        .then(function (userCredential) {
        // Signed in
        var user = userCredential.user;
        alert('Succefully signed in');
        redirect();
        // ...
    })["catch"](function (error) {
        alert(error.message);
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
    });
};
exports.signUpEmailPassword = function (email, password, redirect) {
    auth_1.createUserWithEmailAndPassword(firebase_1.auth, email, password)
        .then(function (userCredential) {
        // Signed in
        // const user = userCredential.user;
        alert('You have successfully signed up');
        redirect();
    })["catch"](function (error) {
        //   const errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
    });
};
exports.signInAnonymous = function () { return auth_1.signInAnonymously(firebase_1.auth); };
exports.logOut = function () { return auth_1.signOut(firebase_1.auth); };
