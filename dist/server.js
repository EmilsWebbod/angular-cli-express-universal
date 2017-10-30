/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(18);
const path = __webpack_require__(4);
const _ = __webpack_require__(1);
const functors_1 = __webpack_require__(19);
var Folders;
(function (Folders) {
    Folders.dist = path.join(__dirname, '..', 'dist', 'browser');
    Folders.server = path.join(__dirname, '..', 'dist', 'server');
})(Folders = exports.Folders || (exports.Folders = {}));
var Files;
(function (Files) {
    Files.readFile = filename => {
        return new functors_1.IO(() => fs.readFileSync(filename, 'utf8'));
    };
    Files.readDir = function (dir) {
        return new functors_1.IO(() => fs.readdirSync(dir));
    };
    Files.fromServer = file => path.join(__dirname, '..', 'dist', 'server', file);
    Files.fromDist = file => path.join(__dirname, '..', 'dist', 'browser', file);
    Files.getFileFromDist = _.compose(Files.readFile, Files.fromDist);
})(Files = exports.Files || (exports.Files = {}));

/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = {
    port: 3005,
    cookie_secret: process.env.COOKIE_SECRET || 'MyCookieSecret',
    redis_url: process.env.REDISCLOUD_URL || '//127.0.0.1:6379',
    mongo_db: process.env.MONGODB_URI || 'mongodb://acc01:acc01@localhost/HourPlaner'
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-server");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@nguniversal/module-map-ngfactory-loader");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app = __webpack_require__(0)();
var Utils;
(function (Utils) {
    Utils.isProduction = () => app.get('env') === 'production';
    Utils.isDevelopment = () => !Utils.isProduction();
    function normalizePort(val) {
        const _port = parseInt(val, 10);
        if (isNaN(_port)) {
            return val;
        }
        if (_port >= 0) {
            return _port;
        }
        return false;
    }
    Utils.normalizePort = normalizePort;
})(Utils = exports.Utils || (exports.Utils = {}));


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(9);
const passportLocalMongoose = __webpack_require__(62);
const handler_1 = __webpack_require__(11);
const _ = __webpack_require__(1);
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true,
        minLength: 2,
        set: _.toLower
    },
    created: { type: Date, default: Date.now() }
});
userSchema.plugin(passportLocalMongoose, {
    attemptsField: true,
    lastLoginField: true,
    usernameLowerCase: true,
    /*limitAttempts: true,*/
    maxAttempts: 25
});
exports.User = mongoose.model('user', userSchema);
exports.User.initUser = name => new exports.User({ username: name });
exports.User.test = function () {
    return new Promise((res, rej) => {
        rej(handler_1.Handler.modelError('test')({ test: 'test' }));
    });
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EHANDLER_STATUS;
(function (EHANDLER_STATUS) {
    EHANDLER_STATUS[EHANDLER_STATUS["SUCCESS"] = 1] = "SUCCESS";
    EHANDLER_STATUS[EHANDLER_STATUS["WARNING"] = 2] = "WARNING";
    EHANDLER_STATUS[EHANDLER_STATUS["INPUT"] = 3] = "INPUT";
    EHANDLER_STATUS[EHANDLER_STATUS["AUTHENTICATION"] = 4] = "AUTHENTICATION";
    EHANDLER_STATUS[EHANDLER_STATUS["ERROR"] = 5] = "ERROR"; // Error on server.
})(EHANDLER_STATUS = exports.EHANDLER_STATUS || (exports.EHANDLER_STATUS = {}));
/**
 * Template messages that could be used over the app for consistent messages
 * W_ : Warning messages
 * E_ : Error messages
 * I_ : Wrong Input message
 */
exports.MSG = {
    success: 'Success',
    I_default: 'Input did not match criteria',
    W_login: 'Username and Password did not match existing user',
    W_register: 'Failed to register user',
    W_user_exist: 'User with username already exist'
};
exports.Logger = __webpack_require__(63);
var Handler;
(function (Handler) {
    /**
     * Parsing messages to user to a correct model. Consistent messaging
     * @param {number} status
     * @param {string} msg
     * @param data
     * @returns {IHandler}
     * @private
     */
    function _json_result(status, msg = '', data = null) {
        return {
            status: status,
            msg: msg,
            data: data
        };
    }
    /**
     * Logging errors from Ctrl if model error is not needed to users.
     * Will log errors to a logfile with Winston
     * @param msg
     */
    Handler.ctrlError = res => msg => error => {
        exports.Logger.log('error', msg, error);
        return res(_json_result(EHANDLER_STATUS.ERROR, msg));
    };
    /**
     * If spesific errors in model need to be communicated to users.
     * Will log errors to a logfile with Winston
     * @param msg
     */
    Handler.modelError = msg => error => {
        exports.Logger.log('error', msg, error);
        return _json_result(EHANDLER_STATUS.ERROR, msg);
    };
    /**
     * Error handling is done in model.
     * To add more ways to spesific error messages for user
     * Could also change it with res but will help to understand errors in ctrl.
     */
    Handler.ctrlModelError = res => res;
    function success(msg = '', data = null) {
        return _json_result(EHANDLER_STATUS.SUCCESS, msg, data);
    }
    Handler.success = success;
    function warning(msg) {
        return _json_result(EHANDLER_STATUS.WARNING, msg);
    }
    Handler.warning = warning;
    function input(msg) {
        return _json_result(EHANDLER_STATUS.INPUT, msg);
    }
    Handler.input = input;
    function auth() {
        return _json_result(EHANDLER_STATUS.AUTHENTICATION, 'Please log in');
    }
    Handler.auth = auth;
    function error(msg) {
        return _json_result(EHANDLER_STATUS.ERROR, msg);
    }
    Handler.error = error;
})(Handler = exports.Handler || (exports.Handler = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
const express = __webpack_require__(0);
const app = express();
/** Render engine and SSR */
__webpack_require__(17)(app);
/** All extra that is built upon express */
__webpack_require__(49)(app);
/** Init Session and Redis */
__webpack_require__(56)(app);
/** Init DB */
__webpack_require__(59)(app);
/** Init Passport login */
__webpack_require__(61)(app);
/** Load api and all the routes */
app.use('/api', __webpack_require__(65));
app.use('/api/user', __webpack_require__(66));
app.use('/', __webpack_require__(68));
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
});
/** Finally set up server for launch and start */
__webpack_require__(70)(app);
module.exports = app;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("zone.js");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Rx");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const _ = __webpack_require__(1);
const files_1 = __webpack_require__(2);
const index = files_1.Files.getFileFromDist('index.html').unsafePerformIO();
const core_1 = __webpack_require__(5);
module.exports = app => {
    if (app.get('env') === 'production') {
        console.log('Initializing SSR');
        const getFirst = _.compose(_.split('.'), _.head, _.filter(_.startsWith('main')));
        const serverFiles = _.compose(_.map(getFirst), files_1.Files.readDir, files_1.Files.fromServer);
        const main = serverFiles('').unsafePerformIO();
        const { renderModuleFactory } = __webpack_require__(6);
        const { provideModuleMap } = __webpack_require__(7);
        const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = __webpack_require__(20)(`./main.${main.length > 3 ? main[1] + '.' : ''}bundle.js`);
        core_1.enableProdMode();
        app.engine('html', (_, options, callback) => {
            const opts = {
                document: index,
                url: options.req.url,
                extraProviders: [{
                        provide: 'server_url',
                        useValue: `${options.req.protocol}://${options.req.get('host')}`,
                        multi: true
                    }, provideModuleMap(LAZY_MODULE_MAP)]
            };
            renderModuleFactory(AppServerModuleNgFactory, opts).then(html => {
                callback(null, html);
            });
            console.log('SSR Done');
        });
    }
    else {
        console.log('Initializing html engine');
        app.engine('html', (_, options, callback) => {
            callback(null, index);
        });
        console.log('Engine Done');
    }
    app.set('views', files_1.Folders.dist);
    app.set('view engine', 'html');
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(1);
const inspect = function (x) {
    return (x && x.inspect) ? x.inspect() : x;
};
class Identity {
    constructor(__value) {
        this.__value = __value;
    }
    static of(x) {
        return new Identity(x);
    }
    map(f) {
        return Identity.of(f(this.__value));
    }
}
exports.Identity = Identity;
class Maybe {
    constructor(__value) {
        this.__value = __value;
    }
    static of(x) {
        return new Maybe(x);
    }
    isNothing() {
        return (this.__value === null || this.__value === undefined);
    }
    map(f) {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
    }
    join() {
        return this.isNothing() ? Maybe.of(null) : this.__value;
    }
    chain(f) {
        return this.map(f).join();
    }
    ap(other) {
        return this.isNothing() ? Maybe.of(null) : other.map(this.__value);
    }
    inspect() {
        return 'Maybe(' + inspect(this.__value) + ')';
    }
}
exports.Maybe = Maybe;
class Left {
    constructor(__value) {
        this.__value = __value;
    }
    static of(x) {
        return new Left(x);
    }
    map(mapper) { return this; }
    join() { return this; }
    chain(x) { return this; }
    ap(x) { return this; }
    inspect() {
        return 'Left(' + inspect(this.__value) + ')';
    }
}
exports.Left = Left;
class Right {
    constructor(__value) {
        this.__value = __value;
    }
    static of(x) {
        return new Right(x);
    }
    map(f) {
        return Right.of(f(this.__value));
    }
    join() {
        return this.__value;
    }
    chain(f) {
        return f(this.__value);
    }
    ap(other) {
        return this.chain(function (f) {
            return other.map(f);
        });
    }
    inspect() {
        return 'Right(' + inspect(this.__value) + ')';
    }
}
exports.Right = Right;
class IO {
    constructor(unsafePerformIO) {
        this.unsafePerformIO = unsafePerformIO;
    }
    static of(x) {
        return new IO(() => x);
    }
    map(f) {
        return new IO(_.compose(f, this.unsafePerformIO));
    }
    join() {
        return this.unsafePerformIO();
    }
    chain(f) {
        return this.map(f).join();
    }
    ap(a) {
        return this.chain(function (f) {
            return a.map(f);
        });
    }
    inspect() {
        return 'IO(' + inspect(this.unsafePerformIO) + ')';
    }
}
exports.IO = IO;
exports.unsafePerformIO = function (x) { return x.unsafePerformIO(); };
exports.either = _.curry(function (f, g, e) {
    switch (e.constructor) {
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
});
// overwriting join from pt 1
exports.join = function (m) { return m.join(); };
exports.chain = _.curry(function (f, m) {
    return m.map(f).join(); // or compose(join, map(f))(m)
});
exports.liftA2 = _.curry(function (f, a1, a2) {
    return a1.map(f).ap(a2);
});
exports.liftA3 = _.curry(function (f, a1, a2, a3) {
    return a1.map(f).ap(a2).ap(a3);
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./main.5eee8e4d722d483cafd5.bundle.js": 21
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 20;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){for(var o in n)e[o]=n[o]}(exports,function(e){function n(l){if(o[l])return o[l].exports;var t=o[l]={i:l,l:!1,exports:{}};return e[l].call(t.exports,t,t.exports,n),t.l=!0,t.exports}var o={};return n.m=e,n.c=o,n.d=function(e,o,l){n.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:l})},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}({"+sp4":function(e,n){e.exports=__webpack_require__(22)},"/uBQ":function(e,n){e.exports=__webpack_require__(23)},0:function(e,n,o){e.exports=o("Zq8w")},"02xY":function(e,n){e.exports=__webpack_require__(24)},"2Mjv":function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("LycM"),u=o("T2Au"),i=o("3U7J");n.LazyModule=function(){function e(){}return e=l([t.NgModule({imports:[u.SharedModule,i.LazyRouterModule],declarations:[r.LazyComponent]})],e)}()},"3B5Z":function(e,n,o){"use strict";function l(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"p",[],null,null,null,null,null)),(e()(),u.\u0275ted(-1,null,["\n  lazy works!\n"])),(e()(),u.\u0275ted(-1,null,["\n"]))],null,null)}function t(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"app-lazy",[],null,null,null,l,a)),u.\u0275did(1,114688,null,0,i.LazyComponent,[],null,null)],function(e,n){e(n,1,0)},null)}var r=o("FY+S"),u=o("OQ0P"),i=o("LycM"),a=u.\u0275crt({encapsulation:0,styles:[r.styles],data:{}});n.RenderType_LazyComponent=a,n.View_LazyComponent_0=l,n.View_LazyComponent_Host_0=t,n.LazyComponentNgFactory=u.\u0275ccf("app-lazy",i.LazyComponent,t,{},{},[])},"3U7J":function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("LycM"),u=o("A7Ap"),i=[{path:"",component:r.LazyComponent}];n.LazyRouterModule=function(){function e(){}return e=l([t.NgModule({imports:[u.RouterModule.forChild(i)],exports:[u.RouterModule]})],e)}()},"52xY":function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");o("emCa"),n.HomeComponent=function(){function e(e){this._user=e}return e.prototype.ngOnInit=function(){},e.prototype.logout=function(){this._user.logout().then(function(e){console.log(e)})},e=l([t.Component({selector:"app-home",templateUrl:"./home.component.html",styleUrls:["./home.component.scss"]})],e)}()},"61WG":function(e,n){e.exports=__webpack_require__(25)},"63Bd":function(e,n,o){"use strict";n.styles=[""]},"7b+E":function(e,n){e.exports=__webpack_require__(26)},"8GTP":function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("yv0u"),u=o("Ir0Z"),i=o("uiya"),a=o("oOlt"),d=o("emCa");n.ServiceModule=function(){function e(){}return n=e,e.forRoot=function(){return{ngModule:n,providers:[a.ResponseService,i.ServerService,d.UserService]}},e=n=l([t.NgModule({imports:[r.CommonModule,u.HttpClientModule]})],e);var n}()},"8e9l":function(e,n){e.exports=__webpack_require__(27)},"8wGh":function(e,n){e.exports=__webpack_require__(28)},"9K8V":function(e,n){e.exports=__webpack_require__(7)},A7Ap:function(e,n){e.exports=__webpack_require__(29)},ASwt:function(e,n){e.exports=__webpack_require__(6)},C6s5:function(e,n){e.exports=__webpack_require__(30)},D5Jq:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("wM8j");n.MaterialModule=function(){function e(){}return e=l([t.NgModule({imports:[r.MatButtonModule,r.MatCardModule,r.MatGridListModule,r.MatInputModule],declarations:[],exports:[r.MatButtonModule,r.MatCardModule,r.MatGridListModule,r.MatInputModule]})],e)}()},EqQh:function(e,n){e.exports=__webpack_require__(31)},"FY+S":function(e,n,o){"use strict";n.styles=[""]},"Hq/i":function(e,n){e.exports=__webpack_require__(32)},Ir0Z:function(e,n){e.exports=__webpack_require__(33)},JwoV:function(e,n,o){"use strict";var l=o("OQ0P"),t=o("bNRb"),r=o("wQAS"),u=o("NwXH"),i=o("gou4"),a=o("yv0u"),d=o("wp5R"),s=o("ASwt"),p=o("8wGh"),c=o("Hq/i"),m=o("A7Ap"),f=o("l0JX"),v=o("Ir0Z"),g=o("fGNU"),M=o("02xY"),_=o("vM6b"),C=o("aNNv"),R=o("l0GU"),h=o("61WG"),y=o("oOlt"),A=o("uiya"),S=o("emCa"),N=o("f9NF"),E=o("aR8+"),O=o("rGE3"),I=o("52xY"),F=o("dZNi"),P=o("8GTP"),T=o("MnMZ"),L=o("t92t"),b=o("7b+E"),w=o("Zdke"),U=o("ua6K"),D=o("D5Jq"),q=o("T2Au"),H=o("ldC+"),x=o("cipL");n.AppServerModuleNgFactory=l.\u0275cmf(t.AppServerModule,[r.AppComponent],function(e){return l.\u0275mod([l.\u0275mpd(512,l.ComponentFactoryResolver,l.\u0275CodegenComponentFactoryResolver,[[8,[u.HomeComponentNgFactory,i.AppComponentNgFactory]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l.\u0275mpd(5120,l.LOCALE_ID,l.\u0275m,[[3,l.LOCALE_ID]]),l.\u0275mpd(4608,a.NgLocalization,a.NgLocaleLocalization,[l.LOCALE_ID,[2,a.\u0275a]]),l.\u0275mpd(5120,l.IterableDiffers,l.\u0275k,[]),l.\u0275mpd(5120,l.KeyValueDiffers,l.\u0275l,[]),l.\u0275mpd(4608,d.DomSanitizer,d.\u0275e,[a.DOCUMENT]),l.\u0275mpd(6144,l.Sanitizer,null,[d.DomSanitizer]),l.\u0275mpd(4608,d.HAMMER_GESTURE_CONFIG,d.HammerGestureConfig,[]),l.\u0275mpd(5120,d.EVENT_MANAGER_PLUGINS,function(e,n,o,l,t){return[new d.\u0275DomEventsPlugin(e,n),new d.\u0275KeyEventsPlugin(o),new d.\u0275HammerGesturesPlugin(l,t)]},[a.DOCUMENT,l.NgZone,a.DOCUMENT,a.DOCUMENT,d.HAMMER_GESTURE_CONFIG]),l.\u0275mpd(4608,d.EventManager,d.EventManager,[d.EVENT_MANAGER_PLUGINS,l.NgZone]),l.\u0275mpd(135680,d.\u0275DomSharedStylesHost,d.\u0275DomSharedStylesHost,[a.DOCUMENT]),l.\u0275mpd(4608,d.\u0275DomRendererFactory2,d.\u0275DomRendererFactory2,[d.EventManager,d.\u0275DomSharedStylesHost]),l.\u0275mpd(4608,s.\u0275c,s.\u0275c,[d.DOCUMENT,[2,d.\u0275TRANSITION_ID]]),l.\u0275mpd(6144,d.\u0275SharedStylesHost,null,[s.\u0275c]),l.\u0275mpd(4608,s.\u0275ServerRendererFactory2,s.\u0275ServerRendererFactory2,[l.NgZone,d.DOCUMENT,d.\u0275SharedStylesHost]),l.\u0275mpd(4608,p.AnimationDriver,p.\u0275NoopAnimationDriver,[]),l.\u0275mpd(5120,p.\u0275AnimationStyleNormalizer,c.\u0275d,[]),l.\u0275mpd(4608,p.\u0275AnimationEngine,c.\u0275b,[p.AnimationDriver,p.\u0275AnimationStyleNormalizer]),l.\u0275mpd(5120,l.RendererFactory2,s.\u0275a,[s.\u0275ServerRendererFactory2,p.\u0275AnimationEngine,l.NgZone]),l.\u0275mpd(4352,l.Testability,null,[]),l.\u0275mpd(4608,d.Meta,d.Meta,[a.DOCUMENT]),l.\u0275mpd(4608,d.Title,d.Title,[a.DOCUMENT]),l.\u0275mpd(5120,m.ActivatedRoute,m.\u0275f,[m.Router]),l.\u0275mpd(4608,m.NoPreloading,m.NoPreloading,[]),l.\u0275mpd(6144,m.PreloadingStrategy,null,[m.NoPreloading]),l.\u0275mpd(135680,m.RouterPreloader,m.RouterPreloader,[m.Router,l.NgModuleFactoryLoader,l.Compiler,l.Injector,m.PreloadingStrategy]),l.\u0275mpd(4608,m.PreloadAllModules,m.PreloadAllModules,[]),l.\u0275mpd(5120,m.ROUTER_INITIALIZER,m.\u0275i,[m.\u0275g]),l.\u0275mpd(5120,l.APP_BOOTSTRAP_LISTENER,function(e){return[e]},[m.ROUTER_INITIALIZER]),l.\u0275mpd(4608,f.AnimationBuilder,c.\u0275BrowserAnimationBuilder,[l.RendererFactory2,d.DOCUMENT]),l.\u0275mpd(4608,v.HttpXsrfTokenExtractor,v.\u0275g,[a.DOCUMENT,l.PLATFORM_ID,v.\u0275e]),l.\u0275mpd(4608,v.\u0275h,v.\u0275h,[v.HttpXsrfTokenExtractor,v.\u0275f]),l.\u0275mpd(5120,v.HTTP_INTERCEPTORS,function(e,n){return[e,new g.UniversalInterceptor(n)]},[v.\u0275h,"server_url"]),l.\u0275mpd(4608,v.XhrFactory,s.\u0275d,[]),l.\u0275mpd(4608,v.HttpXhrBackend,v.HttpXhrBackend,[v.XhrFactory]),l.\u0275mpd(6144,v.HttpBackend,null,[v.HttpXhrBackend]),l.\u0275mpd(5120,v.HttpHandler,s.\u0275g,[v.HttpBackend,[2,v.HTTP_INTERCEPTORS]]),l.\u0275mpd(4608,v.HttpClient,v.HttpClient,[v.HttpHandler]),l.\u0275mpd(4608,v.\u0275d,v.\u0275d,[]),l.\u0275mpd(4608,M.\u0275i,M.\u0275i,[]),l.\u0275mpd(4608,M.FormBuilder,M.FormBuilder,[]),l.\u0275mpd(6144,_.DIR_DOCUMENT,null,[d.DOCUMENT]),l.\u0275mpd(4608,_.Directionality,_.Directionality,[[2,_.DIR_DOCUMENT]]),l.\u0275mpd(4608,C.Platform,C.Platform,[]),l.\u0275mpd(4608,R.InteractivityChecker,R.InteractivityChecker,[C.Platform]),l.\u0275mpd(4608,R.FocusTrapFactory,R.FocusTrapFactory,[R.InteractivityChecker,C.Platform,l.NgZone]),l.\u0275mpd(136192,R.AriaDescriber,R.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,R.AriaDescriber],C.Platform]),l.\u0275mpd(5120,R.LiveAnnouncer,R.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,R.LiveAnnouncer],[2,R.LIVE_ANNOUNCER_ELEMENT_TOKEN],C.Platform]),l.\u0275mpd(5120,R.FocusMonitor,R.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,R.FocusMonitor],l.NgZone,C.Platform]),l.\u0275mpd(4608,h.ErrorStateMatcher,h.ErrorStateMatcher,[]),l.\u0275mpd(4608,y.ResponseService,y.ResponseService,[l.PLATFORM_ID,m.Router]),l.\u0275mpd(4608,A.ServerService,A.ServerService,[v.HttpClient,y.ResponseService]),l.\u0275mpd(4608,S.UserService,S.UserService,[A.ServerService]),l.\u0275mpd(4608,N.BrowserXhr,s.\u0275d,[]),l.\u0275mpd(4608,N.ResponseOptions,N.BaseResponseOptions,[]),l.\u0275mpd(4608,N.XSRFStrategy,s.\u0275e,[]),l.\u0275mpd(4608,N.XHRBackend,N.XHRBackend,[N.BrowserXhr,N.ResponseOptions,N.XSRFStrategy]),l.\u0275mpd(4608,N.RequestOptions,N.BaseRequestOptions,[]),l.\u0275mpd(5120,N.Http,s.\u0275f,[N.XHRBackend,N.RequestOptions]),l.\u0275mpd(512,a.CommonModule,a.CommonModule,[]),l.\u0275mpd(1024,l.ErrorHandler,d.\u0275a,[]),l.\u0275mpd(1024,l.NgProbeToken,function(){return[m.\u0275b()]},[]),l.\u0275mpd(512,m.\u0275g,m.\u0275g,[l.Injector]),l.\u0275mpd(256,l.APP_ID,"my-hour-planer",[]),l.\u0275mpd(2048,d.\u0275TRANSITION_ID,null,[l.APP_ID]),l.\u0275mpd(1024,l.APP_INITIALIZER,function(e,n,o,l,t){return[d.\u0275h(e),m.\u0275h(n),d.\u0275f(o,l,t)]},[[2,l.NgProbeToken],m.\u0275g,d.\u0275TRANSITION_ID,a.DOCUMENT,l.Injector]),l.\u0275mpd(512,l.ApplicationInitStatus,l.ApplicationInitStatus,[[2,l.APP_INITIALIZER]]),l.\u0275mpd(131584,l.ApplicationRef,l.ApplicationRef,[l.NgZone,l.\u0275Console,l.Injector,l.ErrorHandler,l.ComponentFactoryResolver,l.ApplicationInitStatus]),l.\u0275mpd(512,l.ApplicationModule,l.ApplicationModule,[l.ApplicationRef]),l.\u0275mpd(512,d.BrowserModule,d.BrowserModule,[[3,d.BrowserModule]]),l.\u0275mpd(1024,m.\u0275a,m.\u0275d,[[3,m.Router]]),l.\u0275mpd(512,m.UrlSerializer,E.CustomUrlSerializer,[]),l.\u0275mpd(512,m.ChildrenOutletContexts,m.ChildrenOutletContexts,[]),l.\u0275mpd(256,m.ROUTER_CONFIGURATION,{},[]),l.\u0275mpd(1024,a.LocationStrategy,m.\u0275c,[a.PlatformLocation,[2,a.APP_BASE_HREF],m.ROUTER_CONFIGURATION]),l.\u0275mpd(512,a.Location,a.Location,[a.LocationStrategy]),l.\u0275mpd(512,l.Compiler,l.Compiler,[]),l.\u0275mpd(512,l.NgModuleFactoryLoader,O.ModuleMapNgFactoryLoader,[l.Compiler,O.MODULE_MAP]),l.\u0275mpd(1024,m.ROUTES,function(){return[[{path:"",component:I.HomeComponent},{path:"lazy",loadChildren:"./modules/+lazy/lazy.module#LazyModule"}]]},[]),l.\u0275mpd(1024,m.Router,m.\u0275e,[l.ApplicationRef,m.UrlSerializer,m.ChildrenOutletContexts,a.Location,l.Injector,l.NgModuleFactoryLoader,l.Compiler,m.ROUTES,m.ROUTER_CONFIGURATION,[2,m.UrlHandlingStrategy],[2,m.RouteReuseStrategy]]),l.\u0275mpd(512,m.RouterModule,m.RouterModule,[[2,m.\u0275a],[2,m.Router]]),l.\u0275mpd(512,F.AppRouterModule,F.AppRouterModule,[]),l.\u0275mpd(512,c.BrowserAnimationsModule,c.BrowserAnimationsModule,[]),l.\u0275mpd(512,v.HttpClientXsrfModule,v.HttpClientXsrfModule,[]),l.\u0275mpd(512,v.HttpClientModule,v.HttpClientModule,[]),l.\u0275mpd(512,P.ServiceModule,P.ServiceModule,[]),l.\u0275mpd(512,M.\u0275ba,M.\u0275ba,[]),l.\u0275mpd(512,M.FormsModule,M.FormsModule,[]),l.\u0275mpd(512,M.ReactiveFormsModule,M.ReactiveFormsModule,[]),l.\u0275mpd(512,h.CompatibilityModule,h.CompatibilityModule,[]),l.\u0275mpd(512,_.BidiModule,_.BidiModule,[]),l.\u0275mpd(256,h.MATERIAL_SANITY_CHECKS,!0,[]),l.\u0275mpd(512,h.MatCommonModule,h.MatCommonModule,[[2,h.MATERIAL_SANITY_CHECKS]]),l.\u0275mpd(512,C.PlatformModule,C.PlatformModule,[]),l.\u0275mpd(512,h.MatRippleModule,h.MatRippleModule,[]),l.\u0275mpd(512,R.A11yModule,R.A11yModule,[]),l.\u0275mpd(512,T.MatButtonModule,T.MatButtonModule,[]),l.\u0275mpd(512,L.MatCardModule,L.MatCardModule,[]),l.\u0275mpd(512,h.MatLineModule,h.MatLineModule,[]),l.\u0275mpd(512,b.MatGridListModule,b.MatGridListModule,[]),l.\u0275mpd(512,w.MatFormFieldModule,w.MatFormFieldModule,[]),l.\u0275mpd(512,U.MatInputModule,U.MatInputModule,[]),l.\u0275mpd(512,D.MaterialModule,D.MaterialModule,[]),l.\u0275mpd(512,q.SharedModule,q.SharedModule,[]),l.\u0275mpd(512,H.CoreModule,H.CoreModule,[]),l.\u0275mpd(512,E.AppModule,E.AppModule,[]),l.\u0275mpd(512,N.HttpModule,N.HttpModule,[]),l.\u0275mpd(512,c.NoopAnimationsModule,c.NoopAnimationsModule,[]),l.\u0275mpd(512,s.ServerModule,s.ServerModule,[]),l.\u0275mpd(512,x.ModuleMapLoaderModule,x.ModuleMapLoaderModule,[]),l.\u0275mpd(512,t.AppServerModule,t.AppServerModule,[]),l.\u0275mpd(256,v.\u0275e,"XSRF-TOKEN",[]),l.\u0275mpd(256,v.\u0275f,"X-XSRF-TOKEN",[])])})},"L/+9":function(e,n,o){"use strict";n.styles=[""]},LycM:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");n.LazyComponent=function(){function e(){}return e.prototype.ngOnInit=function(){},e=l([t.Component({selector:"app-lazy",templateUrl:"./lazy.component.html",styleUrls:["./lazy.component.scss"]})],e)}()},MPHo:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");o("emCa"),o("A7Ap"),n.LoginComponent=function(){function e(e,n){this._user=e,this._router=n}return e.prototype.ngOnInit=function(){},e.prototype.login=function(e){var n=this;this._user.login(e.value.username,e.value.password).then(function(e){e&&n._router.navigate(["lazy"])})},e=l([t.Component({selector:"app-login",templateUrl:"./login.component.html",styleUrls:["./login.component.css"]})],e)}()},MnMZ:function(e,n){e.exports=__webpack_require__(34)},NGzs:function(e,n,o){"use strict";function l(e){return u.\u0275vid(0,[(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275eld(1,0,null,null,1,"h2",[],null,null,null,null,null)),(e()(),u.\u0275ted(-1,null,["Register"])),(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275eld(4,0,null,null,56,"form",[["ngNativeValidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(e,n,o){var l=!0,t=e.component;return"submit"===n&&(l=!1!==u.\u0275nov(e,5).onSubmit(o)&&l),"reset"===n&&(l=!1!==u.\u0275nov(e,5).onReset()&&l),"ngSubmit"===n&&(l=!1!==t.register(u.\u0275nov(e,5))&&l),l},null,null)),u.\u0275did(5,4210688,[["register_form",4]],0,i.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),u.\u0275prd(2048,null,i.ControlContainer,null,[i.NgForm]),u.\u0275did(7,16384,null,0,i.NgControlStatusGroup,[i.ControlContainer],null,null),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(9,0,null,null,21,"mat-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-focused",null],[2,"mat-primary",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,a.View_MatFormField_0,a.RenderType_MatFormField)),u.\u0275did(10,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(11,7389184,null,6,s.MatFormField,[u.ElementRef,u.Renderer2,u.ChangeDetectorRef,[2,d.MAT_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),u.\u0275qud(335544320,1,{_control:0}),u.\u0275qud(335544320,2,{_placeholderChild:0}),u.\u0275qud(603979776,3,{_errorChildren:1}),u.\u0275qud(603979776,4,{_hintChildren:1}),u.\u0275qud(603979776,5,{_prefixChildren:1}),u.\u0275qud(603979776,6,{_suffixChildren:1}),(e()(),u.\u0275ted(-1,1,["\n    "])),(e()(),u.\u0275eld(19,0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["name","username"],["ngModel",""],["placeholder","Username"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[8,"readOnly",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(e,n,o){var l=!0;return"input"===n&&(l=!1!==u.\u0275nov(e,20)._handleInput(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,20).onTouched()&&l),"compositionstart"===n&&(l=!1!==u.\u0275nov(e,20)._compositionStart()&&l),"compositionend"===n&&(l=!1!==u.\u0275nov(e,20)._compositionEnd(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,28)._focusChanged(!1)&&l),"focus"===n&&(l=!1!==u.\u0275nov(e,28)._focusChanged(!0)&&l),"input"===n&&(l=!1!==u.\u0275nov(e,28)._onInput()&&l),l},null,null)),u.\u0275did(20,16384,null,0,i.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,i.COMPOSITION_BUFFER_MODE]],null,null),u.\u0275did(21,16384,null,0,i.RequiredValidator,[],{required:[0,"required"]},null),u.\u0275prd(1024,null,i.NG_VALIDATORS,function(e){return[e]},[i.RequiredValidator]),u.\u0275prd(1024,null,i.NG_VALUE_ACCESSOR,function(e){return[e]},[i.DefaultValueAccessor]),u.\u0275did(24,671744,null,0,i.NgModel,[[2,i.ControlContainer],[2,i.NG_VALIDATORS],[8,null],[2,i.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),u.\u0275prd(2048,null,i.NgControl,null,[i.NgModel]),u.\u0275did(26,16384,null,0,i.NgControlStatus,[i.NgControl],null,null),u.\u0275did(27,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(28,933888,null,0,p.MatInput,[u.ElementRef,u.Renderer2,c.Platform,[2,i.NgControl],[2,i.NgForm],[2,i.FormGroupDirective],d.ErrorStateMatcher],{placeholder:[0,"placeholder"],required:[1,"required"]},null),u.\u0275prd(2048,[[1,4]],s.MatFormFieldControl,null,[p.MatInput]),(e()(),u.\u0275ted(-1,1,["\n  "])),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(32,0,null,null,21,"mat-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-focused",null],[2,"mat-primary",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,a.View_MatFormField_0,a.RenderType_MatFormField)),u.\u0275did(33,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(34,7389184,null,6,s.MatFormField,[u.ElementRef,u.Renderer2,u.ChangeDetectorRef,[2,d.MAT_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),u.\u0275qud(335544320,7,{_control:0}),u.\u0275qud(335544320,8,{_placeholderChild:0}),u.\u0275qud(603979776,9,{_errorChildren:1}),u.\u0275qud(603979776,10,{_hintChildren:1}),u.\u0275qud(603979776,11,{_prefixChildren:1}),u.\u0275qud(603979776,12,{_suffixChildren:1}),(e()(),u.\u0275ted(-1,1,["\n    "])),(e()(),u.\u0275eld(42,0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["name","password"],["ngModel",""],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[8,"readOnly",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(e,n,o){var l=!0;return"input"===n&&(l=!1!==u.\u0275nov(e,43)._handleInput(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,43).onTouched()&&l),"compositionstart"===n&&(l=!1!==u.\u0275nov(e,43)._compositionStart()&&l),"compositionend"===n&&(l=!1!==u.\u0275nov(e,43)._compositionEnd(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,51)._focusChanged(!1)&&l),"focus"===n&&(l=!1!==u.\u0275nov(e,51)._focusChanged(!0)&&l),"input"===n&&(l=!1!==u.\u0275nov(e,51)._onInput()&&l),l},null,null)),u.\u0275did(43,16384,null,0,i.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,i.COMPOSITION_BUFFER_MODE]],null,null),u.\u0275did(44,16384,null,0,i.RequiredValidator,[],{required:[0,"required"]},null),u.\u0275prd(1024,null,i.NG_VALIDATORS,function(e){return[e]},[i.RequiredValidator]),u.\u0275prd(1024,null,i.NG_VALUE_ACCESSOR,function(e){return[e]},[i.DefaultValueAccessor]),u.\u0275did(47,671744,null,0,i.NgModel,[[2,i.ControlContainer],[2,i.NG_VALIDATORS],[8,null],[2,i.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),u.\u0275prd(2048,null,i.NgControl,null,[i.NgModel]),u.\u0275did(49,16384,null,0,i.NgControlStatus,[i.NgControl],null,null),u.\u0275did(50,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(51,933888,null,0,p.MatInput,[u.ElementRef,u.Renderer2,c.Platform,[2,i.NgControl],[2,i.NgForm],[2,i.FormGroupDirective],d.ErrorStateMatcher],{placeholder:[0,"placeholder"],required:[1,"required"],type:[2,"type"]},null),u.\u0275prd(2048,[[7,4]],s.MatFormFieldControl,null,[p.MatInput]),(e()(),u.\u0275ted(-1,1,["\n  "])),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(55,0,null,null,4,"button",[["class","mat-raised-button"],["color","primary"],["mat-raised-button",""]],[[8,"disabled",0]],null,null,m.View_MatButton_0,m.RenderType_MatButton)),u.\u0275did(56,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(57,180224,null,0,f.MatButton,[u.Renderer2,u.ElementRef,c.Platform,v.FocusMonitor],{color:[0,"color"]},null),u.\u0275did(58,16384,null,0,f.MatRaisedButtonCssMatStyler,[],null,null),(e()(),u.\u0275ted(-1,0,["Register"])),(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275ted(-1,null,["\n"]))],function(e,n){e(n,21,0,""),e(n,24,0,"username",""),e(n,28,0,"Username",""),e(n,44,0,""),e(n,47,0,"password",""),e(n,51,0,"Password","","password"),e(n,57,0,"primary")},function(e,n){e(n,4,0,u.\u0275nov(n,7).ngClassUntouched,u.\u0275nov(n,7).ngClassTouched,u.\u0275nov(n,7).ngClassPristine,u.\u0275nov(n,7).ngClassDirty,u.\u0275nov(n,7).ngClassValid,u.\u0275nov(n,7).ngClassInvalid,u.\u0275nov(n,7).ngClassPending),e(n,9,1,[u.\u0275nov(n,11)._control.errorState,u.\u0275nov(n,11)._control.errorState,u.\u0275nov(n,11)._canPlaceholderFloat,u.\u0275nov(n,11)._control.shouldPlaceholderFloat||u.\u0275nov(n,11)._shouldAlwaysFloat,u.\u0275nov(n,11)._control.focused,"primary"==u.\u0275nov(n,11).color,"accent"==u.\u0275nov(n,11).color,"warn"==u.\u0275nov(n,11).color,u.\u0275nov(n,11)._shouldForward("untouched"),u.\u0275nov(n,11)._shouldForward("touched"),u.\u0275nov(n,11)._shouldForward("pristine"),u.\u0275nov(n,11)._shouldForward("dirty"),u.\u0275nov(n,11)._shouldForward("valid"),u.\u0275nov(n,11)._shouldForward("invalid"),u.\u0275nov(n,11)._shouldForward("pending")]),e(n,19,1,[u.\u0275nov(n,21).required?"":null,u.\u0275nov(n,26).ngClassUntouched,u.\u0275nov(n,26).ngClassTouched,u.\u0275nov(n,26).ngClassPristine,u.\u0275nov(n,26).ngClassDirty,u.\u0275nov(n,26).ngClassValid,u.\u0275nov(n,26).ngClassInvalid,u.\u0275nov(n,26).ngClassPending,u.\u0275nov(n,28).id,u.\u0275nov(n,28).placeholder,u.\u0275nov(n,28).disabled,u.\u0275nov(n,28).required,u.\u0275nov(n,28).readonly,u.\u0275nov(n,28)._ariaDescribedby||null,u.\u0275nov(n,28).errorState]),e(n,32,1,[u.\u0275nov(n,34)._control.errorState,u.\u0275nov(n,34)._control.errorState,u.\u0275nov(n,34)._canPlaceholderFloat,u.\u0275nov(n,34)._control.shouldPlaceholderFloat||u.\u0275nov(n,34)._shouldAlwaysFloat,u.\u0275nov(n,34)._control.focused,"primary"==u.\u0275nov(n,34).color,"accent"==u.\u0275nov(n,34).color,"warn"==u.\u0275nov(n,34).color,u.\u0275nov(n,34)._shouldForward("untouched"),u.\u0275nov(n,34)._shouldForward("touched"),u.\u0275nov(n,34)._shouldForward("pristine"),u.\u0275nov(n,34)._shouldForward("dirty"),u.\u0275nov(n,34)._shouldForward("valid"),u.\u0275nov(n,34)._shouldForward("invalid"),u.\u0275nov(n,34)._shouldForward("pending")]),e(n,42,1,[u.\u0275nov(n,44).required?"":null,u.\u0275nov(n,49).ngClassUntouched,u.\u0275nov(n,49).ngClassTouched,u.\u0275nov(n,49).ngClassPristine,u.\u0275nov(n,49).ngClassDirty,u.\u0275nov(n,49).ngClassValid,u.\u0275nov(n,49).ngClassInvalid,u.\u0275nov(n,49).ngClassPending,u.\u0275nov(n,51).id,u.\u0275nov(n,51).placeholder,u.\u0275nov(n,51).disabled,u.\u0275nov(n,51).required,u.\u0275nov(n,51).readonly,u.\u0275nov(n,51)._ariaDescribedby||null,u.\u0275nov(n,51).errorState]),e(n,55,0,u.\u0275nov(n,57).disabled||null)})}function t(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"app-register",[],null,null,null,l,_)),u.\u0275did(1,114688,null,0,g.RegisterComponent,[M.UserService],null,null)],function(e,n){e(n,1,0)},null)}var r=o("L/+9"),u=o("OQ0P"),i=o("02xY"),a=o("+sp4"),d=o("61WG"),s=o("Zdke"),p=o("ua6K"),c=o("aNNv"),m=o("C6s5"),f=o("MnMZ"),v=o("l0GU"),g=o("xnfE"),M=o("emCa"),_=u.\u0275crt({encapsulation:0,styles:[r.styles],data:{}});n.RenderType_RegisterComponent=_,n.View_RegisterComponent_0=l,n.View_RegisterComponent_Host_0=t,n.RegisterComponentNgFactory=u.\u0275ccf("app-register",g.RegisterComponent,t,{},{},[])},NwXH:function(e,n,o){"use strict";function l(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),u.\u0275ted(-1,null,["Home"])),(e()(),u.\u0275ted(-1,null,["\n\n"])),(e()(),u.\u0275eld(3,0,null,null,1,"app-register",[],null,null,null,i.View_RegisterComponent_0,i.RenderType_RegisterComponent)),u.\u0275did(4,114688,null,0,a.RegisterComponent,[d.UserService],null,null),(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275eld(6,0,null,null,1,"app-login",[],null,null,null,s.View_LoginComponent_0,s.RenderType_LoginComponent)),u.\u0275did(7,114688,null,0,p.LoginComponent,[d.UserService,c.Router],null,null),(e()(),u.\u0275ted(-1,null,["\n\n"])),(e()(),u.\u0275eld(9,0,null,null,4,"button",[["class","mat-raised-button"],["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,o){var l=!0;return"click"===n&&(l=!1!==e.component.logout()&&l),l},m.View_MatButton_0,m.RenderType_MatButton)),u.\u0275did(10,16384,null,0,f.MatPrefixRejector,[],null,null),u.\u0275did(11,180224,null,0,v.MatButton,[u.Renderer2,u.ElementRef,g.Platform,M.FocusMonitor],null,null),u.\u0275did(12,16384,null,0,v.MatRaisedButtonCssMatStyler,[],null,null),(e()(),u.\u0275ted(-1,0,["Log Out"])),(e()(),u.\u0275ted(-1,null,["\n\n"]))],function(e,n){e(n,4,0),e(n,7,0)},function(e,n){e(n,9,0,u.\u0275nov(n,11).disabled||null)})}function t(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"app-home",[],null,null,null,l,C)),u.\u0275did(1,114688,null,0,_.HomeComponent,[d.UserService],null,null)],function(e,n){e(n,1,0)},null)}var r=o("btoQ"),u=o("OQ0P"),i=o("NGzs"),a=o("xnfE"),d=o("emCa"),s=o("jURK"),p=o("MPHo"),c=o("A7Ap"),m=o("C6s5"),f=o("61WG"),v=o("MnMZ"),g=o("aNNv"),M=o("l0GU"),_=o("52xY"),C=u.\u0275crt({encapsulation:0,styles:[r.styles],data:{}});n.RenderType_HomeComponent=C,n.View_HomeComponent_0=l,n.View_HomeComponent_Host_0=t,n.HomeComponentNgFactory=u.\u0275ccf("app-home",_.HomeComponent,t,{},{},[])},OQ0P:function(e,n){e.exports=__webpack_require__(5)},RXrv:function(e,n,o){"use strict";var l=o("OQ0P"),t=o("2Mjv"),r=o("3B5Z"),u=o("yv0u"),i=o("02xY"),a=o("vM6b"),d=o("wp5R"),s=o("aNNv"),p=o("l0GU"),c=o("61WG"),m=o("A7Ap"),f=o("MnMZ"),v=o("t92t"),g=o("7b+E"),M=o("Zdke"),_=o("ua6K"),C=o("D5Jq"),R=o("T2Au"),h=o("3U7J"),y=o("LycM");n.LazyModuleNgFactory=l.\u0275cmf(t.LazyModule,[],function(e){return l.\u0275mod([l.\u0275mpd(512,l.ComponentFactoryResolver,l.\u0275CodegenComponentFactoryResolver,[[8,[r.LazyComponentNgFactory]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l.\u0275mpd(4608,u.NgLocalization,u.NgLocaleLocalization,[l.LOCALE_ID,[2,u.\u0275a]]),l.\u0275mpd(4608,i.\u0275i,i.\u0275i,[]),l.\u0275mpd(4608,i.FormBuilder,i.FormBuilder,[]),l.\u0275mpd(6144,a.DIR_DOCUMENT,null,[d.DOCUMENT]),l.\u0275mpd(4608,a.Directionality,a.Directionality,[[2,a.DIR_DOCUMENT]]),l.\u0275mpd(4608,s.Platform,s.Platform,[]),l.\u0275mpd(4608,p.InteractivityChecker,p.InteractivityChecker,[s.Platform]),l.\u0275mpd(4608,p.FocusTrapFactory,p.FocusTrapFactory,[p.InteractivityChecker,s.Platform,l.NgZone]),l.\u0275mpd(136192,p.AriaDescriber,p.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,p.AriaDescriber],s.Platform]),l.\u0275mpd(5120,p.LiveAnnouncer,p.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,p.LiveAnnouncer],[2,p.LIVE_ANNOUNCER_ELEMENT_TOKEN],s.Platform]),l.\u0275mpd(5120,p.FocusMonitor,p.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,p.FocusMonitor],l.NgZone,s.Platform]),l.\u0275mpd(4608,c.ErrorStateMatcher,c.ErrorStateMatcher,[]),l.\u0275mpd(512,u.CommonModule,u.CommonModule,[]),l.\u0275mpd(512,m.RouterModule,m.RouterModule,[[2,m.\u0275a],[2,m.Router]]),l.\u0275mpd(512,i.\u0275ba,i.\u0275ba,[]),l.\u0275mpd(512,i.FormsModule,i.FormsModule,[]),l.\u0275mpd(512,i.ReactiveFormsModule,i.ReactiveFormsModule,[]),l.\u0275mpd(512,c.CompatibilityModule,c.CompatibilityModule,[]),l.\u0275mpd(512,a.BidiModule,a.BidiModule,[]),l.\u0275mpd(256,c.MATERIAL_SANITY_CHECKS,!0,[]),l.\u0275mpd(512,c.MatCommonModule,c.MatCommonModule,[[2,c.MATERIAL_SANITY_CHECKS]]),l.\u0275mpd(512,s.PlatformModule,s.PlatformModule,[]),l.\u0275mpd(512,c.MatRippleModule,c.MatRippleModule,[]),l.\u0275mpd(512,p.A11yModule,p.A11yModule,[]),l.\u0275mpd(512,f.MatButtonModule,f.MatButtonModule,[]),l.\u0275mpd(512,v.MatCardModule,v.MatCardModule,[]),l.\u0275mpd(512,c.MatLineModule,c.MatLineModule,[]),l.\u0275mpd(512,g.MatGridListModule,g.MatGridListModule,[]),l.\u0275mpd(512,M.MatFormFieldModule,M.MatFormFieldModule,[]),l.\u0275mpd(512,_.MatInputModule,_.MatInputModule,[]),l.\u0275mpd(512,C.MaterialModule,C.MaterialModule,[]),l.\u0275mpd(512,R.SharedModule,R.SharedModule,[]),l.\u0275mpd(512,h.LazyRouterModule,h.LazyRouterModule,[]),l.\u0275mpd(512,t.LazyModule,t.LazyModule,[]),l.\u0275mpd(1024,m.ROUTES,function(){return[[{path:"",component:y.LazyComponent}]]},[])])})},RYCs:function(e,n,o){"use strict";n.styles=[""]},T2Au:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("D5Jq"),u=o("A7Ap"),i=o("yv0u"),a=o("xnfE"),d=o("MPHo"),s=o("02xY");n.SharedModule=function(){function e(){}return e=l([t.NgModule({imports:[i.CommonModule,u.RouterModule,s.FormsModule,s.ReactiveFormsModule,r.MaterialModule],declarations:[a.RegisterComponent,d.LoginComponent],exports:[i.CommonModule,u.RouterModule,s.FormsModule,r.MaterialModule,a.RegisterComponent,d.LoginComponent]})],e)}()},Z7rc:function(e,n){e.exports=__webpack_require__(35)},Zdke:function(e,n){e.exports=__webpack_require__(36)},Zq8w:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l=o("RXrv"),t=o("JwoV");n.AppServerModuleNgFactory=t.AppServerModuleNgFactory;var r=o("bNRb");n.AppServerModule=r.AppServerModule,n.LAZY_MODULE_MAP={"./modules/+lazy/lazy.module#LazyModule":l.LazyModuleNgFactory}},aNNv:function(e,n){e.exports=__webpack_require__(37)},"aR8+":function(e,n,o){"use strict";var l=o("8e9l").__extends,t=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var r=o("wp5R"),u=o("OQ0P"),i=o("wQAS"),a=o("dZNi"),d=o("T2Au"),s=o("Hq/i"),p=o("ldC+"),c=o("8GTP"),m=o("A7Ap"),f=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return l(n,e),n.prototype.parse=function(n){return n=n.replace(/\+/g,"%20"),e.prototype.parse.call(this,n)},n.prototype.serialize=function(n){return e.prototype.serialize.call(this,n).replace(/%20/g,"+")},n}(m.DefaultUrlSerializer);n.CustomUrlSerializer=f,n.AppModule=function(){function e(){}return e=t([u.NgModule({imports:[r.BrowserModule.withServerTransition({appId:"my-hour-planer"}),a.AppRouterModule,s.BrowserAnimationsModule,c.ServiceModule.forRoot(),d.SharedModule,p.CoreModule],declarations:[i.AppComponent],providers:[{provide:m.UrlSerializer,useClass:f}],bootstrap:[i.AppComponent]})],e)}()},bNRb:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("ASwt"),u=o("aR8+"),i=o("wQAS"),a=o("Hq/i"),d=o("Ir0Z"),s=o("fGNU"),p=o("9K8V");n.AppServerModule=function(){function e(){}return e=l([t.NgModule({imports:[u.AppModule,r.ServerModule,a.NoopAnimationsModule,p.ModuleMapLoaderModule],providers:[{provide:d.HTTP_INTERCEPTORS,useClass:s.UniversalInterceptor,multi:!0}],bootstrap:[i.AppComponent]})],e)}()},btoQ:function(e,n,o){"use strict";n.styles=[""]},cipL:function(e,n){e.exports=__webpack_require__(38)},dZNi:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("A7Ap"),u=[{path:"",component:o("52xY").HomeComponent},{path:"lazy",loadChildren:"./modules/+lazy/lazy.module#LazyModule"}];n.AppRouterModule=function(){function e(){}return e=l([t.NgModule({imports:[r.RouterModule.forRoot(u)],exports:[r.RouterModule]})],e)}()},emCa:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");o("uiya"),n.UserService=function(){function e(e){var n=this;this._server=e,this._url="/api/user/",this.get=function(e){return n._server.get(""+n._url+e)},this.post=function(e){return function(o){return n._server.post(""+n._url+e)(o)}}}return e.prototype.register=function(e,n){return this.post("register")({username:e,password:n})},e.prototype.login=function(e,n){return this.post("login")({username:e,password:n})},e.prototype.logout=function(){return this.get("logout")},e=l([t.Injectable()],e)}()},f9NF:function(e,n){e.exports=__webpack_require__(39)},fGNU:function(e,n,o){"use strict";var l=o("8e9l").__decorate,t=o("8e9l").__param;Object.defineProperty(n,"__esModule",{value:!0});var r=o("OQ0P");n.UniversalInterceptor=function(){function e(e){this.serverUrl=e}return e.prototype.intercept=function(e,n){var o=this.serverUrl?e.clone({url:""+this.serverUrl+e.url}):e;return n.handle(o)},e=l([r.Injectable(),t(0,r.Inject("server_url"))],e)}()},gou4:function(e,n,o){"use strict";function l(e){return u.\u0275vid(0,[(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275eld(1,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),u.\u0275did(2,212992,null,0,i.RouterOutlet,[i.ChildrenOutletContexts,u.ViewContainerRef,u.ComponentFactoryResolver,[8,null],u.ChangeDetectorRef],null,null),(e()(),u.\u0275ted(-1,null,["\n\n"])),(e()(),u.\u0275eld(4,0,null,null,3,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(e,n,o){var l=!0;return"click"===n&&(l=!1!==u.\u0275nov(e,5).onClick(o.button,o.ctrlKey,o.metaKey,o.shiftKey)&&l),l},null,null)),u.\u0275did(5,671744,null,0,i.RouterLinkWithHref,[i.Router,i.ActivatedRoute,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),u.\u0275pad(6,1),(e()(),u.\u0275ted(-1,null,["Lazy"])),(e()(),u.\u0275ted(-1,null,["\n\n"]))],function(e,n){e(n,2,0),e(n,5,0,e(n,6,0,"/lazy"))},function(e,n){e(n,4,0,u.\u0275nov(n,5).target,u.\u0275nov(n,5).href)})}function t(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"app-root",[],null,null,null,l,s)),u.\u0275did(1,49152,null,0,d.AppComponent,[],null,null)],null,null)}var r=o("RYCs"),u=o("OQ0P"),i=o("A7Ap"),a=o("yv0u"),d=o("wQAS"),s=u.\u0275crt({encapsulation:0,styles:[r.styles],data:{}});n.RenderType_AppComponent=s,n.View_AppComponent_0=l,n.View_AppComponent_Host_0=t,n.AppComponentNgFactory=u.\u0275ccf("app-root",d.AppComponent,t,{},{},[])},jURK:function(e,n,o){"use strict";function l(e){return u.\u0275vid(0,[(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275eld(1,0,null,null,1,"h2",[],null,null,null,null,null)),(e()(),u.\u0275ted(-1,null,["Login"])),(e()(),u.\u0275ted(-1,null,["\n\n"])),(e()(),u.\u0275eld(4,0,null,null,56,"form",[["ngNativeValidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(e,n,o){var l=!0,t=e.component;return"submit"===n&&(l=!1!==u.\u0275nov(e,5).onSubmit(o)&&l),"reset"===n&&(l=!1!==u.\u0275nov(e,5).onReset()&&l),"ngSubmit"===n&&(l=!1!==t.login(u.\u0275nov(e,5))&&l),l},null,null)),u.\u0275did(5,4210688,[["login_form",4]],0,i.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),u.\u0275prd(2048,null,i.ControlContainer,null,[i.NgForm]),u.\u0275did(7,16384,null,0,i.NgControlStatusGroup,[i.ControlContainer],null,null),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(9,0,null,null,21,"mat-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-focused",null],[2,"mat-primary",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,a.View_MatFormField_0,a.RenderType_MatFormField)),u.\u0275did(10,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(11,7389184,null,6,s.MatFormField,[u.ElementRef,u.Renderer2,u.ChangeDetectorRef,[2,d.MAT_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),u.\u0275qud(335544320,1,{_control:0}),u.\u0275qud(335544320,2,{_placeholderChild:0}),u.\u0275qud(603979776,3,{_errorChildren:1}),u.\u0275qud(603979776,4,{_hintChildren:1}),u.\u0275qud(603979776,5,{_prefixChildren:1}),u.\u0275qud(603979776,6,{_suffixChildren:1}),(e()(),u.\u0275ted(-1,1,["\n    "])),(e()(),u.\u0275eld(19,0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["name","username"],["ngModel",""],["placeholder","Username"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[8,"readOnly",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(e,n,o){var l=!0;return"input"===n&&(l=!1!==u.\u0275nov(e,20)._handleInput(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,20).onTouched()&&l),"compositionstart"===n&&(l=!1!==u.\u0275nov(e,20)._compositionStart()&&l),"compositionend"===n&&(l=!1!==u.\u0275nov(e,20)._compositionEnd(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,28)._focusChanged(!1)&&l),"focus"===n&&(l=!1!==u.\u0275nov(e,28)._focusChanged(!0)&&l),"input"===n&&(l=!1!==u.\u0275nov(e,28)._onInput()&&l),l},null,null)),u.\u0275did(20,16384,null,0,i.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,i.COMPOSITION_BUFFER_MODE]],null,null),u.\u0275did(21,16384,null,0,i.RequiredValidator,[],{required:[0,"required"]},null),u.\u0275prd(1024,null,i.NG_VALIDATORS,function(e){return[e]},[i.RequiredValidator]),u.\u0275prd(1024,null,i.NG_VALUE_ACCESSOR,function(e){return[e]},[i.DefaultValueAccessor]),u.\u0275did(24,671744,null,0,i.NgModel,[[2,i.ControlContainer],[2,i.NG_VALIDATORS],[8,null],[2,i.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),u.\u0275prd(2048,null,i.NgControl,null,[i.NgModel]),u.\u0275did(26,16384,null,0,i.NgControlStatus,[i.NgControl],null,null),u.\u0275did(27,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(28,933888,null,0,p.MatInput,[u.ElementRef,u.Renderer2,c.Platform,[2,i.NgControl],[2,i.NgForm],[2,i.FormGroupDirective],d.ErrorStateMatcher],{placeholder:[0,"placeholder"],required:[1,"required"]},null),u.\u0275prd(2048,[[1,4]],s.MatFormFieldControl,null,[p.MatInput]),(e()(),u.\u0275ted(-1,1,["\n  "])),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(32,0,null,null,21,"mat-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-focused",null],[2,"mat-primary",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,a.View_MatFormField_0,a.RenderType_MatFormField)),u.\u0275did(33,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(34,7389184,null,6,s.MatFormField,[u.ElementRef,u.Renderer2,u.ChangeDetectorRef,[2,d.MAT_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),u.\u0275qud(335544320,7,{_control:0}),u.\u0275qud(335544320,8,{_placeholderChild:0}),u.\u0275qud(603979776,9,{_errorChildren:1}),u.\u0275qud(603979776,10,{_hintChildren:1}),u.\u0275qud(603979776,11,{_prefixChildren:1}),u.\u0275qud(603979776,12,{_suffixChildren:1}),(e()(),u.\u0275ted(-1,1,["\n    "])),(e()(),u.\u0275eld(42,0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["name","password"],["ngModel",""],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[8,"readOnly",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(e,n,o){var l=!0;return"input"===n&&(l=!1!==u.\u0275nov(e,43)._handleInput(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,43).onTouched()&&l),"compositionstart"===n&&(l=!1!==u.\u0275nov(e,43)._compositionStart()&&l),"compositionend"===n&&(l=!1!==u.\u0275nov(e,43)._compositionEnd(o.target.value)&&l),"blur"===n&&(l=!1!==u.\u0275nov(e,51)._focusChanged(!1)&&l),"focus"===n&&(l=!1!==u.\u0275nov(e,51)._focusChanged(!0)&&l),"input"===n&&(l=!1!==u.\u0275nov(e,51)._onInput()&&l),l},null,null)),u.\u0275did(43,16384,null,0,i.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,i.COMPOSITION_BUFFER_MODE]],null,null),u.\u0275did(44,16384,null,0,i.RequiredValidator,[],{required:[0,"required"]},null),u.\u0275prd(1024,null,i.NG_VALIDATORS,function(e){return[e]},[i.RequiredValidator]),u.\u0275prd(1024,null,i.NG_VALUE_ACCESSOR,function(e){return[e]},[i.DefaultValueAccessor]),u.\u0275did(47,671744,null,0,i.NgModel,[[2,i.ControlContainer],[2,i.NG_VALIDATORS],[8,null],[2,i.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),u.\u0275prd(2048,null,i.NgControl,null,[i.NgModel]),u.\u0275did(49,16384,null,0,i.NgControlStatus,[i.NgControl],null,null),u.\u0275did(50,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(51,933888,null,0,p.MatInput,[u.ElementRef,u.Renderer2,c.Platform,[2,i.NgControl],[2,i.NgForm],[2,i.FormGroupDirective],d.ErrorStateMatcher],{placeholder:[0,"placeholder"],required:[1,"required"],type:[2,"type"]},null),u.\u0275prd(2048,[[7,4]],s.MatFormFieldControl,null,[p.MatInput]),(e()(),u.\u0275ted(-1,1,["\n  "])),(e()(),u.\u0275ted(-1,null,["\n\n  "])),(e()(),u.\u0275eld(55,0,null,null,4,"button",[["class","mat-raised-button"],["color","success"],["mat-raised-button",""]],[[8,"disabled",0]],null,null,m.View_MatButton_0,m.RenderType_MatButton)),u.\u0275did(56,16384,null,0,d.MatPrefixRejector,[],null,null),u.\u0275did(57,180224,null,0,f.MatButton,[u.Renderer2,u.ElementRef,c.Platform,v.FocusMonitor],{color:[0,"color"]},null),u.\u0275did(58,16384,null,0,f.MatRaisedButtonCssMatStyler,[],null,null),(e()(),u.\u0275ted(-1,0,["Login"])),(e()(),u.\u0275ted(-1,null,["\n"])),(e()(),u.\u0275ted(-1,null,["\n"]))],function(e,n){e(n,21,0,""),e(n,24,0,"username",""),e(n,28,0,"Username",""),e(n,44,0,""),e(n,47,0,"password",""),e(n,51,0,"Password","","password"),e(n,57,0,"success")},function(e,n){e(n,4,0,u.\u0275nov(n,7).ngClassUntouched,u.\u0275nov(n,7).ngClassTouched,u.\u0275nov(n,7).ngClassPristine,u.\u0275nov(n,7).ngClassDirty,u.\u0275nov(n,7).ngClassValid,u.\u0275nov(n,7).ngClassInvalid,u.\u0275nov(n,7).ngClassPending),e(n,9,1,[u.\u0275nov(n,11)._control.errorState,u.\u0275nov(n,11)._control.errorState,u.\u0275nov(n,11)._canPlaceholderFloat,u.\u0275nov(n,11)._control.shouldPlaceholderFloat||u.\u0275nov(n,11)._shouldAlwaysFloat,u.\u0275nov(n,11)._control.focused,"primary"==u.\u0275nov(n,11).color,"accent"==u.\u0275nov(n,11).color,"warn"==u.\u0275nov(n,11).color,u.\u0275nov(n,11)._shouldForward("untouched"),u.\u0275nov(n,11)._shouldForward("touched"),u.\u0275nov(n,11)._shouldForward("pristine"),u.\u0275nov(n,11)._shouldForward("dirty"),u.\u0275nov(n,11)._shouldForward("valid"),u.\u0275nov(n,11)._shouldForward("invalid"),u.\u0275nov(n,11)._shouldForward("pending")]),e(n,19,1,[u.\u0275nov(n,21).required?"":null,u.\u0275nov(n,26).ngClassUntouched,u.\u0275nov(n,26).ngClassTouched,u.\u0275nov(n,26).ngClassPristine,u.\u0275nov(n,26).ngClassDirty,u.\u0275nov(n,26).ngClassValid,u.\u0275nov(n,26).ngClassInvalid,u.\u0275nov(n,26).ngClassPending,u.\u0275nov(n,28).id,u.\u0275nov(n,28).placeholder,u.\u0275nov(n,28).disabled,u.\u0275nov(n,28).required,u.\u0275nov(n,28).readonly,u.\u0275nov(n,28)._ariaDescribedby||null,u.\u0275nov(n,28).errorState]),e(n,32,1,[u.\u0275nov(n,34)._control.errorState,u.\u0275nov(n,34)._control.errorState,u.\u0275nov(n,34)._canPlaceholderFloat,u.\u0275nov(n,34)._control.shouldPlaceholderFloat||u.\u0275nov(n,34)._shouldAlwaysFloat,u.\u0275nov(n,34)._control.focused,"primary"==u.\u0275nov(n,34).color,"accent"==u.\u0275nov(n,34).color,"warn"==u.\u0275nov(n,34).color,u.\u0275nov(n,34)._shouldForward("untouched"),u.\u0275nov(n,34)._shouldForward("touched"),u.\u0275nov(n,34)._shouldForward("pristine"),u.\u0275nov(n,34)._shouldForward("dirty"),u.\u0275nov(n,34)._shouldForward("valid"),u.\u0275nov(n,34)._shouldForward("invalid"),u.\u0275nov(n,34)._shouldForward("pending")]),e(n,42,1,[u.\u0275nov(n,44).required?"":null,u.\u0275nov(n,49).ngClassUntouched,u.\u0275nov(n,49).ngClassTouched,u.\u0275nov(n,49).ngClassPristine,u.\u0275nov(n,49).ngClassDirty,u.\u0275nov(n,49).ngClassValid,u.\u0275nov(n,49).ngClassInvalid,u.\u0275nov(n,49).ngClassPending,u.\u0275nov(n,51).id,u.\u0275nov(n,51).placeholder,u.\u0275nov(n,51).disabled,u.\u0275nov(n,51).required,u.\u0275nov(n,51).readonly,u.\u0275nov(n,51)._ariaDescribedby||null,u.\u0275nov(n,51).errorState]),e(n,55,0,u.\u0275nov(n,57).disabled||null)})}function t(e){return u.\u0275vid(0,[(e()(),u.\u0275eld(0,0,null,null,1,"app-login",[],null,null,null,l,C)),u.\u0275did(1,114688,null,0,g.LoginComponent,[M.UserService,_.Router],null,null)],function(e,n){e(n,1,0)},null)}var r=o("63Bd"),u=o("OQ0P"),i=o("02xY"),a=o("+sp4"),d=o("61WG"),s=o("Zdke"),p=o("ua6K"),c=o("aNNv"),m=o("C6s5"),f=o("MnMZ"),v=o("l0GU"),g=o("MPHo"),M=o("emCa"),_=o("A7Ap"),C=u.\u0275crt({encapsulation:0,styles:[r.styles],data:{}});n.RenderType_LoginComponent=C,n.View_LoginComponent_0=l,n.View_LoginComponent_Host_0=t,n.LoginComponentNgFactory=u.\u0275ccf("app-login",g.LoginComponent,t,{},{},[])},l0GU:function(e,n){e.exports=__webpack_require__(40)},l0JX:function(e,n){e.exports=__webpack_require__(41)},"ldC+":function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P"),r=o("52xY"),u=o("T2Au");n.CoreModule=function(){function e(){}return e=l([t.NgModule({imports:[u.SharedModule],declarations:[r.HomeComponent],exports:[r.HomeComponent]})],e)}()},oOlt:function(e,n,o){"use strict";var l=o("8e9l").__decorate,t=o("8e9l").__param;Object.defineProperty(n,"__esModule",{value:!0});var r,u=o("OQ0P"),i=o("/uBQ"),a=o("yv0u"),d=(o("A7Ap"),null);!function(e){e[e.SUCCESS=1]="SUCCESS",e[e.WARNING=2]="WARNING",e[e.INPUT=3]="INPUT",e[e.AUTHENTICATION=4]="AUTHENTICATION",e[e.ERROR=5]="ERROR"}(r=n.STATUS||(n.STATUS={}));var s;!function(e){e[e.DISABLED=0]="DISABLED",e[e.SUCCESS=1]="SUCCESS",e[e.LOADING=2]="LOADING",e[e.ERROR=3]="ERROR",e[e.USER_ERROR=4]="USER_ERROR",e[e.USER_MSG=5]="USER_MSG",e[e.REDIRECT=6]="REDIRECT",e[e.TIMEOUT=7]="TIMEOUT",e[e.AUTHENTICATE=8]="AUTHENTICATE"}(s=n.LOADER||(n.LOADER={})),n.ResponseService=function(){function e(e,n){var o=this;this.platformId=e,this._router=n,this._loading=new i.BehaviorSubject(s.DISABLED),this.loading$=this._loading.asObservable(),this.response=null,this.loaderMessage="",this.__base=function(e){return d.response=e,e.status!==r.SUCCESS&&d.showMessage(o._getResponseType(e.status),e.msg,o._getResponseMessageHeader(e.status)),d.disable(),o._getResponseValue(e)},d=this}return e.prototype.getLoader=function(){return this.loading$},e.prototype.pending=function(){return this._loading.getValue()},e.prototype.disable=function(){this._loading.next(s.DISABLED)},e.prototype.isLoading=function(){return this._loading.getValue()===s.LOADING},e.prototype.showMessage=function(e,n,o){a.isPlatformBrowser(this.platformId)},e.prototype.load=function(e,n){this.loaderMessage=e||"Loading",this._loading.next(s.LOADING)},e.prototype.catch=function(e){var n=e.message?e.message:e.status?e.status+" - "+e.statusText:"Could not connect to server";console.error("Error:",e),d.showMessage("error",n,"Error"),d.disable()},e.prototype.handle=function(e){var n=e;return n||console.error("Not valid API boy!"),console.log("Response:",n.status,n.msg,n.data),d.__base(n)},e.prototype._getResponseType=function(e){switch(e){case r.SUCCESS:return"success";case r.AUTHENTICATION:return"error";default:return"warning"}},e.prototype._getResponseMessageHeader=function(e){switch(e){case r.SUCCESS:return"Success";case r.WARNING:return"Warning";case r.AUTHENTICATION:return"Authentication";case r.INPUT:return"Input Error";case r.ERROR:return"Server error";default:return"warning"}},e.prototype._getResponseValue=function(e){switch(e.status){case r.SUCCESS:return e.data||!0;case r.INPUT:return e;default:return!1}},e.prototype.timeout=function(){console.error("Timeout"),d.showMessage("error","Could not connect to server","Server error"),d.disable()},e=l([u.Injectable(),t(0,u.Inject(u.PLATFORM_ID))],e)}()},rGE3:function(e,n){e.exports=__webpack_require__(42)},t92t:function(e,n){e.exports=__webpack_require__(43)},ua6K:function(e,n){e.exports=__webpack_require__(44)},uiya:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");o("Ir0Z"),o("oOlt"),o("EqQh"),o("Z7rc"),n.ServerService=function(){function e(e,n){var o=this;this._http=e,this._r=n,this.get=function(e){return o._r.load("Get --- "+e),o.withHandler(o._http.get(e))},this.post=function(e){return function(n){return o._r.load("Post --- "+e),o.withHandler(o._http.post(e,n))}},this.patch=function(e){return function(n){return o._r.load("Patch --- "+e),o.withHandler(o._http.patch(e,n))}},this.put=function(e){return function(n){return o._r.load("Put --- "+e),o.withHandler(o._http.put(e,n))}},this.delete=function(e){return o._r.load("Delete --- "+e),o.withHandler(o._http.delete(e))},this.getWithHandler=function(e){return function(n){return o._r.load("Get --- "+n),o.noHandler(o._http.get(n))(e)}},this.postWithHandler=function(e){return function(n){return function(l){return o._r.load("Post --- "+n),o.noHandler(o._http.post(n,l))(e)}}},this.toPromise=function(e){return function(n){return function(o){return e.toPromise().then(o).catch(n)}}},this.asPromise=function(e){return o.toPromise(e)},this.noHandler=function(e){return o.toPromise(e)(o._r.catch)},this.withHandler=function(e){return o.noHandler(e)(o._r.handle)}}return e=l([t.Injectable()],e)}()},vM6b:function(e,n){e.exports=__webpack_require__(45)},wM8j:function(e,n){e.exports=__webpack_require__(46)},wQAS:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");n.AppComponent=function(){function e(){this.title="app"}return e=l([t.Component({selector:"app-root",templateUrl:"./app.component.html",styleUrls:["./app.component.scss"]})],e)}()},wp5R:function(e,n){e.exports=__webpack_require__(47)},xnfE:function(e,n,o){"use strict";var l=o("8e9l").__decorate;Object.defineProperty(n,"__esModule",{value:!0});var t=o("OQ0P");o("emCa"),n.RegisterComponent=function(){function e(e){this._user=e}return e.prototype.ngOnInit=function(){},e.prototype.register=function(e){return this._user.register(e.value.username,e.value.password).then(function(e){console.log(e)}),!1},e=l([t.Component({selector:"app-register",templateUrl:"./register.component.html",styleUrls:["./register.component.css"]})],e)}()},yv0u:function(e,n){e.exports=__webpack_require__(48)}}));

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/form-field/typings/index.ngfactory");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("rxjs/BehaviorSubject");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/core");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/grid-list");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("@angular/animations/browser");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@angular/router");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/button/typings/index.ngfactory");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/catch");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser/animations");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@angular/common/http");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/button");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/toPromise");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/form-field");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/platform");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@nguniversal/module-map-ngfactory-loader/src/module-map-loader.module");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("@angular/http");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/a11y");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("@angular/animations");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("@nguniversal/module-map-ngfactory-loader/src/module-map-ngfactory-loader");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/card");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/input");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/bidi");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("@angular/material");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const utils_1 = __webpack_require__(8);
const files_1 = __webpack_require__(2);
const path = __webpack_require__(4);
const morgan = __webpack_require__(50);
const bodyParser = __webpack_require__(51);
const favicon = __webpack_require__(52);
const compression = __webpack_require__(53);
const x_frame = __webpack_require__(54);
const connect_flash = __webpack_require__(55);
module.exports = app => {
    console.log('Initializing Use addons');
    /**
     * Set Up Morgan Logger
     */
    if (utils_1.Utils.isProduction()) {
        app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: path.join(__dirname, 'morgan.log') }));
    }
    else {
        app.use(morgan('dev'));
    }
    /**
     * Set Body Parser
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    /**
     * Set Up Other stuff
     */
    app.use(favicon(files_1.Files.fromDist('favicon.ico')));
    app.use(compression());
    app.use(x_frame());
    app.use(connect_flash());
    console.log('Addons Done');
};

/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("x-frame-options");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const config_1 = __webpack_require__(3);
const session = __webpack_require__(57);
const Redis = __webpack_require__(58)(session);
module.exports = app => {
    console.log('Initializing Session');
    /**
     * Set up Session
     */
    app.use(session({
        secret: config_1.Config.cookie_secret,
        store: new Redis({ url: config_1.Config.redis_url }),
        resave: true,
        saveUninitialized: true
    }));
    console.log('Session Done');
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const config_1 = __webpack_require__(3);
const mongoose = __webpack_require__(9);
const autoIncrement = __webpack_require__(60);
module.exports = (app) => {
    console.log('Initializing Database');
    /**
     * INIT Mongoose
     */
    mongoose.connect(config_1.Config.mongo_db);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    autoIncrement.initialize(mongoose.connection);
    console.log('DB Done');
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const user_model_1 = __webpack_require__(10);
const passport = __webpack_require__(12);
const LocalStrategy = __webpack_require__(64).Strategy;
module.exports = app => {
    /**
     * Init Passport
     */
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        user_model_1.User.findById(id).exec().then(user => {
            done(null, user);
        }, err => done(err, null));
    });
    passport.use(new LocalStrategy(function (username, password, done) {
        user_model_1.User.findOne({ 'username': username }).exec().then(user => {
            if (!user) {
                return done(true, null);
            }
            user.authenticate(password, (err, res) => {
                if (err || !res) {
                    return done(true, null);
                }
                done(null, user);
            });
        }, err => done(true, null));
    }));
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("passport-local-mongoose");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const router = express.Router();
module.exports = router;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const user_ctrl_1 = __webpack_require__(67);
const router = express.Router();
router.post('/login', (req, res, next) => {
    user_ctrl_1.UserCtrl.login(req, res, next);
})
    .post('/register', (req, res, next) => {
    user_ctrl_1.UserCtrl.register(req.body.username, req.body.password).then(x => res.json(x));
})
    .get('/logout', (req, res, next) => {
    user_ctrl_1.UserCtrl.logout(req).then(x => res.json(x));
})
    .get('/test', (req, res, next) => {
    user_ctrl_1.UserCtrl.test().then(x => res.json(x));
});
module.exports = router;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(10);
const passport = __webpack_require__(12);
var UserCtrl;
(function (UserCtrl) {
    function setCookie(req) {
        const _extend = 30 * 24 * 60 * 60 * 1000;
        req.session.cookie.expires = new Date(Date.now() + _extend);
        req.session.cookie.maxAge = _extend;
        req.session.regenerate(() => { });
    }
    function login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                return res.json(handler_1.Handler.warning(handler_1.MSG.W_login));
            }
            req.login(user, login_error => {
                if (login_error) {
                    return res.json(handler_1.Handler.warning(handler_1.MSG.W_login));
                }
                if (req.body.remember) {
                    setCookie(req);
                }
                return res.json(handler_1.Handler.success('User logged in'));
            });
        })(req, res, next);
    }
    UserCtrl.login = login;
    function register(username, password) {
        return new Promise(res => {
            if (!username || !password) {
                return res(handler_1.Handler.input(handler_1.MSG.I_default));
            }
            user_model_1.User.register(user_model_1.User.initUser(username), password, (err, user) => {
                if (err || !user) {
                    return handler_1.Handler.ctrlError(res)(handler_1.MSG.W_user_exist)(err);
                }
                return res(handler_1.Handler.success('User registered'));
            });
        });
    }
    UserCtrl.register = register;
    function logout(req) {
        return new Promise(res => {
            req.logout();
            res(handler_1.Handler.success('User logged out'));
        });
    }
    UserCtrl.logout = logout;
    function test() {
        return new Promise(res => {
            user_model_1.User.test().then(test => {
                res(handler_1.Handler.success());
            }, handler_1.Handler.ctrlModelError(res));
        });
    }
    UserCtrl.test = test;
})(UserCtrl = exports.UserCtrl || (exports.UserCtrl = {}));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = __webpack_require__(2);
const gzipStatic = __webpack_require__(69);
const router = __webpack_require__(0).Router();
router.get('*.*', gzipStatic(files_1.Folders.dist));
router.get('*', (req, res) => {
    res.render('index', { req, res });
});
module.exports = router;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("connect-gzip-static");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
const config_1 = __webpack_require__(3);
const http = __webpack_require__(71);
const cluster = __webpack_require__(72);
const debug = __webpack_require__(73)('www.deskvibe.co:server');
module.exports = app => {
    console.log('Initializing Server');
    const port = utils_1.Utils.normalizePort(process.env.PORT || config_1.Config.port || '3000');
    const server = http.createServer(app);
    const numCPUs = process.env.WEB_CONCURRENCY || __webpack_require__(74).cpus().length;
    app.set('port', port);
    /**
     * Listen on provided port, on all network interfaces.
     */
    if (cluster.isMaster && app.get('env') !== 'development') {
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', function (worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
        });
    }
    else {
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
    }
    console.log('Listening on port: ' + port);
    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
    console.log('Server Started');
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ })
/******/ ]);