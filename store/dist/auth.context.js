"use strict";
exports.__esModule = true;
exports.AuthContextProvider = void 0;
var react_1 = require("react");
var firebase_1 = require("../firebase/firebase");
var auth_1 = require("firebase/auth");
var initialUser = null;
var AuthContext = react_1.createContext({
    user: initialUser,
    loading: true
});
function AuthContextProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    react_1.useEffect(function () {
        var unsubscribe;
        unsubscribe = auth_1.onAuthStateChanged(firebase_1.auth, function (user) {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    return (react_1["default"].createElement(AuthContext.Provider, { value: { user: user, loading: loading } }, children));
}
exports.AuthContextProvider = AuthContextProvider;
exports["default"] = AuthContext;
