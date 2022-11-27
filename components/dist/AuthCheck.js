"use strict";
exports.__esModule = true;
var router_1 = require("next/router");
var react_1 = require("react");
var auth_context_1 = require("../store/auth.context");
function AuthCheck(_a) {
    var children = _a.children;
    var _b = react_1.useContext(auth_context_1["default"]), user = _b.user, loading = _b.loading;
    var router = router_1.useRouter();
    react_1.useEffect(function () {
        if (!user) {
            router.push('/');
        }
        console.log(user);
    }, [loading]);
    return children;
}
exports["default"] = AuthCheck;
