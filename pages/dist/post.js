"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var React = require("react");
var AppBar_1 = require("@mui/material/AppBar");
var Button_1 = require("@mui/material/Button");
var Card_1 = require("@mui/material/Card");
var CardActions_1 = require("@mui/material/CardActions");
var CardContent_1 = require("@mui/material/CardContent");
var CardMedia_1 = require("@mui/material/CardMedia");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var Grid_1 = require("@mui/material/Grid");
var Stack_1 = require("@mui/material/Stack");
var Box_1 = require("@mui/material/Box");
var Toolbar_1 = require("@mui/material/Toolbar");
var Typography_1 = require("@mui/material/Typography");
var Container_1 = require("@mui/material/Container");
var styles_1 = require("@mui/material/styles");
var styles_2 = require("@mui/material/styles");
var Dialog_1 = require("@mui/material/Dialog");
var DialogTitle_1 = require("@mui/material/DialogTitle");
var DialogContent_1 = require("@mui/material/DialogContent");
var DialogActions_1 = require("@mui/material/DialogActions");
var IconButton_1 = require("@mui/material/IconButton");
var Close_1 = require("@mui/icons-material/Close");
var react_1 = require("react");
var material_1 = require("@mui/material");
var PostController_1 = require("../controller/PostController");
var storage_1 = require("firebase/storage");
var firebase_1 = require("../firebase/firebase");
var auth_context_1 = require("../store/auth.context");
var router_1 = require("next/router");
var authentication_1 = require("../firebase/authentication");
var theme = styles_1.createTheme();
var BootstrapDialog = styles_2.styled(Dialog_1["default"])(function (_a) {
    var theme = _a.theme;
    return ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2)
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1)
        }
    });
});
function BootstrapDialogTitle(props) {
    var children = props.children, onClose = props.onClose, other = __rest(props, ["children", "onClose"]);
    return (React.createElement(DialogTitle_1["default"], __assign({ sx: { m: 0, p: 2 } }, other),
        children,
        onClose ? (React.createElement(IconButton_1["default"], { "aria-label": 'close', onClick: onClose, sx: {
                position: "absolute",
                right: 8,
                top: 8,
                color: function (theme) { return theme.palette.grey[500]; }
            } },
            React.createElement(Close_1["default"], null))) : null));
}
function Post() {
    var _this = this;
    //Dependencies START
    var controller = PostController_1["default"]();
    var requestFetch = controller.requestFetch, requestAdd = controller.requestAdd, requestDelete = controller.requestDelete, requestUpdate = controller.requestUpdate;
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    var _b = react_1.useState(false), openEdit = _b[0], setOpenEdit = _b[1];
    var _c = react_1.useState(), data = _c[0], setData = _c[1];
    var _d = react_1.useState(), id = _d[0], setId = _d[1];
    var _e = react_1.useState({
        title: "",
        description: "",
        image: ""
    }), addData = _e[0], setAddData = _e[1];
    var _f = react_1.useContext(auth_context_1["default"]), user = _f.user, loading = _f.loading;
    var router = router_1.useRouter();
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var uploadLogo = function (selectedFile) { return __awaiter(_this, void 0, void 0, function () {
        var imageRef, state, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    imageRef = storage_1.ref(firebase_1.storage, "files/" + selectedFile.name + new Date());
                    console.log(imageRef);
                    return [4 /*yield*/, storage_1.uploadBytes(imageRef, selectedFile)];
                case 1:
                    state = _a.sent();
                    return [4 /*yield*/, storage_1.getDownloadURL(state.ref)];
                case 2:
                    url = _a.sent();
                    console.log(url);
                    setAddData(__assign(__assign({}, addData), { image: url }));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Delete Post?")) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestDelete(id)
                            .then(function () {
                            alert("Delete Successful!");
                            displayPosts();
                        })["catch"](function (err) {
                            alert("Delete Failed: " + err);
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var addPost = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(addData.title == "" || addData.description == "")) return [3 /*break*/, 1];
                    alert("Please fill up all the fields. Thank you");
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, requestAdd(addData)["catch"](function (err) {
                        alert(err);
                    })];
                case 2:
                    response = _a.sent();
                    alert("Posted successfully");
                    displayPosts();
                    setAddData({
                        title: "",
                        description: "",
                        image: ""
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var updatePost = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(addData.title == "" || addData.description == "")) return [3 /*break*/, 1];
                    alert("Please fill up all the fields. Thank you");
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, requestUpdate(id, addData)["catch"](function (err) {
                        alert(err);
                    })];
                case 2:
                    response = _a.sent();
                    alert("Post updated successfully");
                    displayPosts();
                    setAddData({
                        title: "",
                        description: "",
                        image: ""
                    });
                    setId("");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var displayPosts = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _posts, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestFetch()["catch"](function (err) {
                        alert("Failed to load reported user" + err);
                    })];
                case 1:
                    _posts = _a.sent();
                    posts = _posts.map(function (_a) {
                        var id = _a.id, title = _a.title, description = _a.description, image = _a.image;
                        return ({
                            id: id,
                            title: title,
                            description: description,
                            image: image
                        });
                    });
                    if (_posts)
                        setData(posts);
                    return [2 /*return*/];
            }
        });
    }); }, [requestFetch]);
    react_1.useEffect(function () {
        var reloadUser = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, user.reload()];
                    case 1:
                        _a.sent();
                        displayPosts();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        if (!loading) {
            if (user && !user.reloadUserInfo.customAttributes) {
                reloadUser();
            }
            else {
                if (!user) {
                    router.push("/");
                }
                else {
                    displayPosts();
                }
            }
        }
    }, [loading, user]);
    return (React.createElement(styles_1.ThemeProvider, { theme: theme },
        React.createElement(BootstrapDialog, { onClose: handleClose, "aria-labelledby": 'customized-dialog-title', open: open },
            React.createElement(BootstrapDialogTitle, { id: 'customized-dialog-title', onClose: handleClose }, "Add Post"),
            React.createElement(DialogContent_1["default"], { dividers: true },
                React.createElement(Grid_1["default"], { container: true },
                    React.createElement(Grid_1["default"], { item: true, sm: 12 },
                        React.createElement(material_1.TextField, { required: true, id: 'outlined-required', label: 'Title', fullWidth: true, onChange: function (e) {
                                setAddData(__assign(__assign({}, addData), { title: e.target.value }));
                            }, value: addData.title })),
                    React.createElement(Grid_1["default"], { item: true, sm: 12, sx: { mt: 1 } },
                        React.createElement(material_1.TextField, { id: 'outlined-multiline-flexible', label: 'Description', multiline: true, rows: 4, variant: 'outlined', fullWidth: true, onChange: function (e) {
                                setAddData(__assign(__assign({}, addData), { description: e.target.value }));
                            }, value: addData.description })),
                    React.createElement(Grid_1["default"], { item: true, sm: 12, sx: { mt: 1 } },
                        React.createElement(material_1.Input, { type: 'file', fullWidth: true, required: true, onChange: function (e) {
                                var file = e.target.files ? e.target.files[0] : undefined;
                                uploadLogo(file);
                            } })))),
            React.createElement(DialogActions_1["default"], null,
                React.createElement(Button_1["default"], { autoFocus: true, onClick: function () {
                        addPost();
                        handleClose();
                    } }, "Add Post"))),
        React.createElement(BootstrapDialog, { onClose: function () {
                setOpenEdit(false);
            }, "aria-labelledby": 'customized-dialog-title', open: openEdit },
            React.createElement(BootstrapDialogTitle, { id: 'customized-dialog-title', onClose: function () {
                    setOpenEdit(false);
                } }, "Edit Post"),
            React.createElement(DialogContent_1["default"], { dividers: true },
                React.createElement(Grid_1["default"], { container: true },
                    React.createElement(Grid_1["default"], { item: true, sm: 12 },
                        React.createElement(material_1.TextField, { required: true, id: 'outlined-required', label: 'Title', fullWidth: true, onChange: function (e) {
                                setAddData(__assign(__assign({}, addData), { title: e.target.value }));
                            }, value: addData.title })),
                    React.createElement(Grid_1["default"], { item: true, sm: 12, sx: { mt: 1 } },
                        React.createElement(material_1.TextField, { id: 'outlined-multiline-flexible', label: 'Description', multiline: true, rows: 4, variant: 'outlined', fullWidth: true, onChange: function (e) {
                                setAddData(__assign(__assign({}, addData), { description: e.target.value }));
                            }, value: addData.description })),
                    React.createElement(Grid_1["default"], { item: true, sm: 12, sx: { mt: 1 } },
                        React.createElement(material_1.Input, { type: 'file', fullWidth: true, required: true, onChange: function (e) {
                                var file = e.target.files ? e.target.files[0] : undefined;
                                uploadLogo(file);
                            } })))),
            React.createElement(DialogActions_1["default"], null,
                React.createElement(Button_1["default"], { autoFocus: true, onClick: function () {
                        updatePost();
                        setOpenEdit(false);
                    } }, "Edit Post"))),
        React.createElement(CssBaseline_1["default"], null),
        React.createElement(AppBar_1["default"], { position: 'static' },
            React.createElement(Toolbar_1["default"], null,
                React.createElement(Typography_1["default"], { variant: 'h6', component: 'div', sx: { flexGrow: 1 } }, "DevFest 2023"),
                React.createElement(Button_1["default"], { color: 'inherit', onClick: function () {
                        authentication_1.logOut();
                        router.push("/");
                    } }, "Logout"))),
        React.createElement("main", null,
            React.createElement(Box_1["default"], { sx: {
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6
                } },
                React.createElement(Container_1["default"], { maxWidth: 'sm' },
                    React.createElement(Typography_1["default"], { component: 'h1', variant: 'h2', align: 'center', color: 'text.primary', gutterBottom: true }, "Posts"),
                    React.createElement(Stack_1["default"], { sx: { pt: 4 }, direction: 'row', spacing: 2, justifyContent: 'center' },
                        React.createElement(Button_1["default"], { variant: 'contained', onClick: handleClickOpen }, "Add Post")))),
            React.createElement(Container_1["default"], { sx: { py: 8 }, maxWidth: 'md' },
                React.createElement(Grid_1["default"], { container: true, spacing: 4 }, data === null || data === void 0 ? void 0 : data.map(function (item, key) { return (React.createElement(Grid_1["default"], { item: true, key: key, xs: 12, sm: 6, md: 4 },
                    React.createElement(Card_1["default"], { sx: {
                            height: "100%",
                            display: "flex",
                            flexDirection: "column"
                        } },
                        React.createElement(CardMedia_1["default"], { component: 'img', sx: {
                                16: 9
                            }, image: (item === null || item === void 0 ? void 0 : item.image) == ""
                                ? "https://via.placeholder.com/300"
                                : item === null || item === void 0 ? void 0 : item.image, alt: 'random' }),
                        React.createElement(CardContent_1["default"], { sx: { flexGrow: 1 } },
                            React.createElement(Typography_1["default"], { gutterBottom: true, variant: 'h5', component: 'h2' }, item === null || item === void 0 ? void 0 : item.title),
                            React.createElement(Typography_1["default"], null, item === null || item === void 0 ? void 0 : item.description)),
                        React.createElement(CardActions_1["default"], null,
                            React.createElement(Button_1["default"], { size: 'small', onClick: function () {
                                    setId(item === null || item === void 0 ? void 0 : item.id);
                                    setOpenEdit(true);
                                    setAddData(item);
                                } }, "Edit"),
                            React.createElement(Button_1["default"], { size: 'small', onClickCapture: function () { return handleDelete(item === null || item === void 0 ? void 0 : item.id); } }, "Delete"))))); }))))));
}
exports["default"] = Post;
