"use strict";
exports.__esModule = true;
exports.storage = exports.auth = exports.db = exports.app = exports.firebaseConfig = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("@firebase/auth");
var firestore_1 = require("firebase/firestore");
var storage_1 = require("@firebase/storage");
exports.firebaseConfig = {};
// Initialize Firebase
exports.app = app_1.initializeApp(exports.firebaseConfig);
exports.db = firestore_1.getFirestore(exports.app);
exports.auth = auth_1.getAuth(exports.app);
exports.storage = storage_1.getStorage(exports.app);
// const analytics = getAnalytics(app);
