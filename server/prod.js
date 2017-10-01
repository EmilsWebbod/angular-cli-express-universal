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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
const fs = __webpack_require__(17);
const path = __webpack_require__(4);
const _ = __webpack_require__(1);
const functors_1 = __webpack_require__(18);
var Folders;
(function (Folders) {
    Folders.dist = path.join(__dirname, '..', 'dist');
    Folders.server = path.join(__dirname, '..', 'dist-server');
})(Folders = exports.Folders || (exports.Folders = {}));
var Files;
(function (Files) {
    Files.readFile = filename => {
        return new functors_1.IO(() => fs.readFileSync(filename, 'utf8'));
    };
    Files.readDir = function (dir) {
        return new functors_1.IO(() => fs.readdirSync(dir));
    };
    Files.fromServer = file => path.join(__dirname, '..', 'dist-server', file);
    Files.fromDist = file => path.join(__dirname, '..', 'dist', file);
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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(8);
const passportLocalMongoose = __webpack_require__(56);
const handler_1 = __webpack_require__(10);
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
/* 10 */
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
exports.Logger = __webpack_require__(57);
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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
const express = __webpack_require__(0);
const app = express();
/** Render engine and SSR */
__webpack_require__(16)(app);
/** All extra that is built upon express */
__webpack_require__(43)(app);
/** Init Session and Redis */
__webpack_require__(50)(app);
/** Init DB */
__webpack_require__(53)(app);
/** Init Passport login */
__webpack_require__(55)(app);
/** Load api and all the routes */
app.use('/api', __webpack_require__(59));
app.use('/api/user', __webpack_require__(60));
app.use('/', __webpack_require__(62));
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
});
/** Finally set up server for launch and start */
__webpack_require__(64)(app);
module.exports = app;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("zone.js");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Rx");

/***/ }),
/* 16 */
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
        const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = __webpack_require__(19)(`./main.${main.length > 3 ? main[1] + '.' : ''}bundle.js`);
        core_1.enableProdMode();
        app.engine('html', (_, options, callback) => {
            const opts = {
                document: index,
                url: options.req.url
            };
            renderModuleFactory(AppServerModuleNgFactory, opts).then(html => {
                callback(null, html);
            });
        });
        console.log('SSR Done');
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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./main.5ca631dc8d4a19f3401e.bundle.js": 20
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
webpackContext.id = 19;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

!function(n,e){for(var l in e)n[l]=e[l]}(exports,function(n){function e(t){if(l[t])return l[t].exports;var o=l[t]={i:t,l:!1,exports:{}};return n[t].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var l={};return e.m=n,e.c=l,e.d=function(n,l,t){e.o(n,l)||Object.defineProperty(n,l,{configurable:!1,enumerable:!0,get:t})},e.n=function(n){var l=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(l,"a",l),l},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=0)}({"/uBQ":function(n,e){n.exports=__webpack_require__(21)},0:function(n,e,l){n.exports=l("Zq8w")},"02xY":function(n,e){n.exports=__webpack_require__(22)},"2cGb":function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("OQ0P"),o=l("bNRb"),r=l("wQAS"),i=l("scRf"),u=l("q4dy"),a=l("yv0u"),d=l("wp5R"),s=l("ASwt"),p=l("8wGh"),c=l("Hq/i"),m=l("A7Ap"),f=l("l0JX"),g=l("Ir0Z"),b=l("02xY"),v=l("vM6b"),_=l("aNNv"),h=l("ifTt"),R=l("l0GU"),M=l("oOlt"),C=l("uiya"),y=l("emCa"),A=l("f9NF"),x=l("52xY"),I=l("dZNi"),O=l("8GTP"),E=l("61WG"),S=l("t92t"),T=l("7b+E"),N=l("Zdke"),w=l("ua6K"),P=l("MnMZ"),F=l("D5Jq"),D=l("T2Au"),L=l("ldC+"),q=l("aR8+");e.AppServerModuleNgFactory=t.\u0275cmf(o.AppServerModule,[r.AppComponent],function(n){return t.\u0275mod([t.\u0275mpd(512,t.ComponentFactoryResolver,t.\u0275CodegenComponentFactoryResolver,[[8,[i.HomeComponentNgFactory,u.AppComponentNgFactory]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t.\u0275mpd(5120,t.LOCALE_ID,t.\u0275m,[[3,t.LOCALE_ID]]),t.\u0275mpd(4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID]),t.\u0275mpd(5120,t.IterableDiffers,t.\u0275k,[]),t.\u0275mpd(5120,t.KeyValueDiffers,t.\u0275l,[]),t.\u0275mpd(4608,d.DomSanitizer,d.\u0275e,[a.DOCUMENT]),t.\u0275mpd(6144,t.Sanitizer,null,[d.DomSanitizer]),t.\u0275mpd(4608,d.HAMMER_GESTURE_CONFIG,d.HammerGestureConfig,[]),t.\u0275mpd(5120,d.EVENT_MANAGER_PLUGINS,function(n,e,l,t){return[new d.\u0275DomEventsPlugin(n),new d.\u0275KeyEventsPlugin(e),new d.\u0275HammerGesturesPlugin(l,t)]},[a.DOCUMENT,a.DOCUMENT,a.DOCUMENT,d.HAMMER_GESTURE_CONFIG]),t.\u0275mpd(4608,d.EventManager,d.EventManager,[d.EVENT_MANAGER_PLUGINS,t.NgZone]),t.\u0275mpd(135680,d.\u0275DomSharedStylesHost,d.\u0275DomSharedStylesHost,[a.DOCUMENT]),t.\u0275mpd(4608,d.\u0275DomRendererFactory2,d.\u0275DomRendererFactory2,[d.EventManager,d.\u0275DomSharedStylesHost]),t.\u0275mpd(4608,s.\u0275b,s.\u0275b,[d.DOCUMENT,[2,d.\u0275TRANSITION_ID]]),t.\u0275mpd(6144,d.\u0275SharedStylesHost,null,[s.\u0275b]),t.\u0275mpd(4608,s.\u0275ServerRendererFactory2,s.\u0275ServerRendererFactory2,[t.NgZone,d.DOCUMENT,d.\u0275SharedStylesHost]),t.\u0275mpd(4608,p.AnimationDriver,p.\u0275NoopAnimationDriver,[]),t.\u0275mpd(5120,p.\u0275AnimationStyleNormalizer,c.\u0275d,[]),t.\u0275mpd(4608,p.\u0275AnimationEngine,c.\u0275b,[p.AnimationDriver,p.\u0275AnimationStyleNormalizer]),t.\u0275mpd(5120,t.RendererFactory2,s.\u0275a,[s.\u0275ServerRendererFactory2,p.\u0275AnimationEngine,t.NgZone]),t.\u0275mpd(4352,t.Testability,null,[]),t.\u0275mpd(4608,d.Meta,d.Meta,[a.DOCUMENT]),t.\u0275mpd(4608,d.Title,d.Title,[a.DOCUMENT]),t.\u0275mpd(5120,m.ActivatedRoute,m.\u0275f,[m.Router]),t.\u0275mpd(4608,m.NoPreloading,m.NoPreloading,[]),t.\u0275mpd(6144,m.PreloadingStrategy,null,[m.NoPreloading]),t.\u0275mpd(135680,m.RouterPreloader,m.RouterPreloader,[m.Router,t.NgModuleFactoryLoader,t.Compiler,t.Injector,m.PreloadingStrategy]),t.\u0275mpd(4608,m.PreloadAllModules,m.PreloadAllModules,[]),t.\u0275mpd(5120,m.ROUTER_INITIALIZER,m.\u0275i,[m.\u0275g]),t.\u0275mpd(5120,t.APP_BOOTSTRAP_LISTENER,function(n){return[n]},[m.ROUTER_INITIALIZER]),t.\u0275mpd(4608,f.AnimationBuilder,c.\u0275BrowserAnimationBuilder,[t.RendererFactory2,d.DOCUMENT]),t.\u0275mpd(4608,g.HttpXsrfTokenExtractor,g.\u0275g,[a.DOCUMENT,t.PLATFORM_ID,g.\u0275e]),t.\u0275mpd(4608,g.\u0275h,g.\u0275h,[g.HttpXsrfTokenExtractor,g.\u0275f]),t.\u0275mpd(5120,g.HTTP_INTERCEPTORS,function(n){return[n]},[g.\u0275h]),t.\u0275mpd(4608,g.XhrFactory,s.\u0275c,[]),t.\u0275mpd(4608,g.HttpXhrBackend,g.HttpXhrBackend,[g.XhrFactory]),t.\u0275mpd(6144,g.HttpBackend,null,[g.HttpXhrBackend]),t.\u0275mpd(5120,g.HttpHandler,s.\u0275f,[g.HttpBackend,[2,g.HTTP_INTERCEPTORS]]),t.\u0275mpd(4608,g.HttpClient,g.HttpClient,[g.HttpHandler]),t.\u0275mpd(4608,g.\u0275d,g.\u0275d,[]),t.\u0275mpd(4608,b.\u0275i,b.\u0275i,[]),t.\u0275mpd(4608,b.FormBuilder,b.FormBuilder,[]),t.\u0275mpd(6144,v.DIR_DOCUMENT,null,[d.DOCUMENT]),t.\u0275mpd(4608,v.Directionality,v.Directionality,[[2,v.DIR_DOCUMENT]]),t.\u0275mpd(4608,_.Platform,_.Platform,[]),t.\u0275mpd(5120,h.ScrollDispatcher,h.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,h.ScrollDispatcher],t.NgZone,_.Platform]),t.\u0275mpd(5120,h.ViewportRuler,h.VIEWPORT_RULER_PROVIDER_FACTORY,[[3,h.ViewportRuler],h.ScrollDispatcher]),t.\u0275mpd(4608,R.InteractivityChecker,R.InteractivityChecker,[_.Platform]),t.\u0275mpd(4608,R.FocusTrapFactory,R.FocusTrapFactory,[R.InteractivityChecker,_.Platform,t.NgZone]),t.\u0275mpd(136192,R.AriaDescriber,R.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,R.AriaDescriber],_.Platform]),t.\u0275mpd(5120,R.LiveAnnouncer,R.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,R.LiveAnnouncer],[2,R.LIVE_ANNOUNCER_ELEMENT_TOKEN],_.Platform]),t.\u0275mpd(5120,R.FocusMonitor,R.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,R.FocusMonitor],t.NgZone,_.Platform]),t.\u0275mpd(4608,M.ResponseService,M.ResponseService,[t.PLATFORM_ID,m.Router]),t.\u0275mpd(4608,C.ServerService,C.ServerService,[g.HttpClient,M.ResponseService]),t.\u0275mpd(4608,y.UserService,y.UserService,[C.ServerService]),t.\u0275mpd(4608,A.BrowserXhr,s.\u0275c,[]),t.\u0275mpd(4608,A.ResponseOptions,A.BaseResponseOptions,[]),t.\u0275mpd(4608,A.XSRFStrategy,s.\u0275d,[]),t.\u0275mpd(4608,A.XHRBackend,A.XHRBackend,[A.BrowserXhr,A.ResponseOptions,A.XSRFStrategy]),t.\u0275mpd(4608,A.RequestOptions,A.BaseRequestOptions,[]),t.\u0275mpd(5120,A.Http,s.\u0275e,[A.XHRBackend,A.RequestOptions]),t.\u0275mpd(512,a.CommonModule,a.CommonModule,[]),t.\u0275mpd(1024,t.ErrorHandler,d.\u0275a,[]),t.\u0275mpd(1024,t.NgProbeToken,function(){return[m.\u0275b()]},[]),t.\u0275mpd(512,m.\u0275g,m.\u0275g,[t.Injector]),t.\u0275mpd(256,t.APP_ID,"my-hour-planer",[]),t.\u0275mpd(2048,d.\u0275TRANSITION_ID,null,[t.APP_ID]),t.\u0275mpd(1024,t.APP_INITIALIZER,function(n,e,l,t,o,r){return[d.\u0275c(n,e),m.\u0275h(l),d.\u0275f(t,o,r)]},[[2,d.NgProbeToken],[2,t.NgProbeToken],m.\u0275g,d.\u0275TRANSITION_ID,a.DOCUMENT,t.Injector]),t.\u0275mpd(512,t.ApplicationInitStatus,t.ApplicationInitStatus,[[2,t.APP_INITIALIZER]]),t.\u0275mpd(131584,t.\u0275e,t.\u0275e,[t.NgZone,t.\u0275Console,t.Injector,t.ErrorHandler,t.ComponentFactoryResolver,t.ApplicationInitStatus]),t.\u0275mpd(2048,t.ApplicationRef,null,[t.\u0275e]),t.\u0275mpd(512,t.ApplicationModule,t.ApplicationModule,[t.ApplicationRef]),t.\u0275mpd(512,d.BrowserModule,d.BrowserModule,[[3,d.BrowserModule]]),t.\u0275mpd(1024,m.\u0275a,m.\u0275d,[[3,m.Router]]),t.\u0275mpd(512,m.UrlSerializer,m.DefaultUrlSerializer,[]),t.\u0275mpd(512,m.ChildrenOutletContexts,m.ChildrenOutletContexts,[]),t.\u0275mpd(256,m.ROUTER_CONFIGURATION,{},[]),t.\u0275mpd(1024,a.LocationStrategy,m.\u0275c,[a.PlatformLocation,[2,a.APP_BASE_HREF],m.ROUTER_CONFIGURATION]),t.\u0275mpd(512,a.Location,a.Location,[a.LocationStrategy]),t.\u0275mpd(512,t.Compiler,t.Compiler,[]),t.\u0275mpd(512,t.NgModuleFactoryLoader,t.SystemJsNgModuleLoader,[t.Compiler,[2,t.SystemJsNgModuleLoaderConfig]]),t.\u0275mpd(1024,m.ROUTES,function(){return[[{path:"",component:x.HomeComponent}]]},[]),t.\u0275mpd(1024,m.Router,m.\u0275e,[t.ApplicationRef,m.UrlSerializer,m.ChildrenOutletContexts,a.Location,t.Injector,t.NgModuleFactoryLoader,t.Compiler,m.ROUTES,m.ROUTER_CONFIGURATION,[2,m.UrlHandlingStrategy],[2,m.RouteReuseStrategy]]),t.\u0275mpd(512,m.RouterModule,m.RouterModule,[[2,m.\u0275a],[2,m.Router]]),t.\u0275mpd(512,I.AppRouterModule,I.AppRouterModule,[]),t.\u0275mpd(512,c.BrowserAnimationsModule,c.BrowserAnimationsModule,[]),t.\u0275mpd(512,g.HttpClientXsrfModule,g.HttpClientXsrfModule,[]),t.\u0275mpd(512,g.HttpClientModule,g.HttpClientModule,[]),t.\u0275mpd(512,O.ServiceModule,O.ServiceModule,[]),t.\u0275mpd(512,b.\u0275ba,b.\u0275ba,[]),t.\u0275mpd(512,b.FormsModule,b.FormsModule,[]),t.\u0275mpd(512,b.ReactiveFormsModule,b.ReactiveFormsModule,[]),t.\u0275mpd(512,E.CompatibilityModule,E.CompatibilityModule,[]),t.\u0275mpd(512,v.BidiModule,v.BidiModule,[]),t.\u0275mpd(256,E.MATERIAL_SANITY_CHECKS,!0,[]),t.\u0275mpd(512,E.MdCommonModule,E.MdCommonModule,[[2,d.DOCUMENT],[2,E.MATERIAL_SANITY_CHECKS]]),t.\u0275mpd(512,S.MdCardModule,S.MdCardModule,[]),t.\u0275mpd(512,E.MdLineModule,E.MdLineModule,[]),t.\u0275mpd(512,T.MdGridListModule,T.MdGridListModule,[]),t.\u0275mpd(512,_.PlatformModule,_.PlatformModule,[]),t.\u0275mpd(512,N.MdFormFieldModule,N.MdFormFieldModule,[]),t.\u0275mpd(512,w.MdInputModule,w.MdInputModule,[]),t.\u0275mpd(512,h.ScrollDispatchModule,h.ScrollDispatchModule,[]),t.\u0275mpd(512,E.MdRippleModule,E.MdRippleModule,[]),t.\u0275mpd(512,R.A11yModule,R.A11yModule,[]),t.\u0275mpd(512,P.MdButtonModule,P.MdButtonModule,[]),t.\u0275mpd(512,F.MaterialModule,F.MaterialModule,[]),t.\u0275mpd(512,D.SharedModule,D.SharedModule,[]),t.\u0275mpd(512,L.CoreModule,L.CoreModule,[]),t.\u0275mpd(512,q.AppModule,q.AppModule,[]),t.\u0275mpd(512,A.HttpModule,A.HttpModule,[]),t.\u0275mpd(512,c.NoopAnimationsModule,c.NoopAnimationsModule,[]),t.\u0275mpd(512,s.ServerModule,s.ServerModule,[]),t.\u0275mpd(512,o.AppServerModule,o.AppServerModule,[]),t.\u0275mpd(256,g.\u0275e,"XSRF-TOKEN",[]),t.\u0275mpd(256,g.\u0275f,"X-XSRF-TOKEN",[])])})},"52xY":function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("emCa"),o=function(){function n(n){this._user=n}return n.prototype.ngOnInit=function(){},n.prototype.logout=function(){this._user.logout().then(function(n){console.log(n)})},n.ctorParameters=function(){return[{type:t.UserService}]},n}();e.HomeComponent=o},"61WG":function(n,e){n.exports=__webpack_require__(23)},"6OSA":function(n,e,l){"use strict";function t(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,1,"div",[["class","mat-input-prefix mat-form-field-prefix"]],null,null,null,null,null)),c.\u0275ncd(null,0)],null,null)}function o(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,1,"span",[["aria-hidden","true"],["class","mat-placeholder-required mat-form-field-required-marker"]],null,null,null,null,null)),(n()(),c.\u0275ted(null,["*"]))],null,null)}function r(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,[[3,0],["placeholder",1]],null,4,"label",[["class","mat-input-placeholder mat-form-field-placeholder"]],[[1,"for",0],[1,"aria-owns",0],[2,"mat-empty",null],[2,"mat-form-field-empty",null],[2,"mat-float",null],[2,"mat-form-field-float",null],[2,"mat-accent",null],[2,"mat-warn",null]],null,null,null,null)),c.\u0275ncd(null,2),(n()(),c.\u0275ted(null,[""," "])),(n()(),c.\u0275and(16777216,null,null,1,null,o)),c.\u0275did(16384,null,0,f.NgIf,[c.ViewContainerRef,c.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,e){var l=e.component;n(e,4,0,!l.hideRequiredMarker&&l._control.required)},function(n,e){var l=e.component;n(e,0,0,l._control.id,l._control.id,l._control.empty&&!l._shouldAlwaysFloat,l._control.empty&&!l._shouldAlwaysFloat,l._canPlaceholderFloat,l._canPlaceholderFloat,"accent"==l.color,"warn"==l.color),n(e,2,0,l._control.placeholder)})}function i(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,1,"div",[["class","mat-input-suffix mat-form-field-suffix"]],null,null,null,null,null)),c.\u0275ncd(null,3)],null,null)}function u(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,1,"div",[],[[24,"@transitionMessages",0]],null,null,null,null)),c.\u0275ncd(null,4)],null,function(n,e){n(e,0,0,e.component._subscriptAnimationState)})}function a(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,1,"div",[["class","mat-hint"]],[[8,"id",0]],null,null,null,null)),(n()(),c.\u0275ted(null,["",""]))],null,function(n,e){var l=e.component;n(e,0,0,l._hintLabelId),n(e,1,0,l.hintLabel)})}function d(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,5,"div",[["class","mat-input-hint-wrapper mat-form-field-hint-wrapper"]],[[24,"@transitionMessages",0]],null,null,null,null)),(n()(),c.\u0275and(16777216,null,null,1,null,a)),c.\u0275did(16384,null,0,f.NgIf,[c.ViewContainerRef,c.TemplateRef],{ngIf:[0,"ngIf"]},null),c.\u0275ncd(null,5),(n()(),c.\u0275eld(0,null,null,0,"div",[["class","mat-input-hint-spacer mat-form-field-hint-spacer"]],null,null,null,null,null)),c.\u0275ncd(null,6)],function(n,e){n(e,2,0,e.component.hintLabel)},function(n,e){n(e,0,0,e.component._subscriptAnimationState)})}function s(n){return c.\u0275vid(2,[c.\u0275qud(402653184,1,{underlineRef:0}),c.\u0275qud(402653184,2,{_connectionContainerRef:0}),c.\u0275qud(671088640,3,{_placeholder:0}),(n()(),c.\u0275eld(0,null,null,18,"div",[["class","mat-input-wrapper mat-form-field-wrapper"]],null,null,null,null,null)),(n()(),c.\u0275eld(0,[[2,0],["connectionContainer",1]],null,9,"div",[["class","mat-input-flex mat-form-field-flex"]],null,null,null,null,null)),(n()(),c.\u0275and(16777216,null,null,1,null,t)),c.\u0275did(16384,null,0,f.NgIf,[c.ViewContainerRef,c.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),c.\u0275eld(0,null,null,4,"div",[["class","mat-input-infix mat-form-field-infix"]],null,null,null,null,null)),c.\u0275ncd(null,1),(n()(),c.\u0275eld(0,null,null,2,"span",[["class","mat-input-placeholder-wrapper mat-form-field-placeholder-wrapper"]],null,null,null,null,null)),(n()(),c.\u0275and(16777216,null,null,1,null,r)),c.\u0275did(16384,null,0,f.NgIf,[c.ViewContainerRef,c.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),c.\u0275and(16777216,null,null,1,null,i)),c.\u0275did(16384,null,0,f.NgIf,[c.ViewContainerRef,c.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),c.\u0275eld(0,[[1,0],["underline",1]],null,1,"div",[["class","mat-input-underline mat-form-field-underline"]],[[2,"mat-disabled",null]],null,null,null,null)),(n()(),c.\u0275eld(0,null,null,0,"span",[["class","mat-input-ripple mat-form-field-ripple"]],[[2,"mat-accent",null],[2,"mat-warn",null]],null,null,null,null)),(n()(),c.\u0275eld(0,null,null,5,"div",[["class","mat-input-subscript-wrapper mat-form-field-subscript-wrapper"]],null,null,null,null,null)),c.\u0275did(16384,null,0,f.NgSwitch,[],{ngSwitch:[0,"ngSwitch"]},null),(n()(),c.\u0275and(16777216,null,null,1,null,u)),c.\u0275did(278528,null,0,f.NgSwitchCase,[c.ViewContainerRef,c.TemplateRef,f.NgSwitch],{ngSwitchCase:[0,"ngSwitchCase"]},null),(n()(),c.\u0275and(16777216,null,null,1,null,d)),c.\u0275did(278528,null,0,f.NgSwitchCase,[c.ViewContainerRef,c.TemplateRef,f.NgSwitch],{ngSwitchCase:[0,"ngSwitchCase"]},null)],function(n,e){var l=e.component;n(e,6,0,l._prefixChildren.length),n(e,11,0,l._hasPlaceholder()),n(e,13,0,l._suffixChildren.length),n(e,17,0,l._getDisplayedMessages());n(e,19,0,"error");n(e,21,0,"hint")},function(n,e){var l=e.component;n(e,14,0,l._control.disabled),n(e,15,0,"accent"==l.color,"warn"==l.color)})}function p(n){return c.\u0275vid(0,[(n()(),c.\u0275eld(0,null,null,7,"md-input-container",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-focused",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==c.\u0275nov(n,1)._control.focus()&&t}return t},s,e.RenderType_MdFormField)),c.\u0275did(7389184,null,6,m.MdFormField,[c.ElementRef,c.ChangeDetectorRef,[2,b.MD_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),c.\u0275qud(335544320,1,{_control:0}),c.\u0275qud(335544320,2,{_placeholderChild:0}),c.\u0275qud(603979776,3,{_errorChildren:1}),c.\u0275qud(603979776,4,{_hintChildren:1}),c.\u0275qud(603979776,5,{_prefixChildren:1}),c.\u0275qud(603979776,6,{_suffixChildren:1})],null,function(n,e){n(e,0,0,c.\u0275nov(e,1)._control.errorState,c.\u0275nov(e,1)._control.errorState,c.\u0275nov(e,1)._control.focused,c.\u0275nov(e,1)._shouldForward("untouched"),c.\u0275nov(e,1)._shouldForward("touched"),c.\u0275nov(e,1)._shouldForward("pristine"),c.\u0275nov(e,1)._shouldForward("dirty"),c.\u0275nov(e,1)._shouldForward("valid"),c.\u0275nov(e,1)._shouldForward("invalid"),c.\u0275nov(e,1)._shouldForward("pending"))})}Object.defineProperty(e,"__esModule",{value:!0});var c=l("OQ0P"),m=l("Zdke"),f=l("yv0u"),g=l("aNNv"),b=l("61WG");e.MdFormFieldModuleNgFactory=c.\u0275cmf(m.MdFormFieldModule,[],function(n){return c.\u0275mod([c.\u0275mpd(512,c.ComponentFactoryResolver,c.\u0275CodegenComponentFactoryResolver,[[8,[]],[3,c.ComponentFactoryResolver],c.NgModuleRef]),c.\u0275mpd(4608,f.NgLocalization,f.NgLocaleLocalization,[c.LOCALE_ID]),c.\u0275mpd(4608,g.Platform,g.Platform,[]),c.\u0275mpd(512,f.CommonModule,f.CommonModule,[]),c.\u0275mpd(512,g.PlatformModule,g.PlatformModule,[]),c.\u0275mpd(512,m.MdFormFieldModule,m.MdFormFieldModule,[])])});var v=[".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-float{display:block;transition:none}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}.mat-focused .mat-form-field-placeholder.mat-form-field-float,.mat-form-field-placeholder.mat-form-field-empty,.mat-form-field-placeholder.mat-form-field-float:not(.mat-form-field-empty){display:block}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background-position:0;background-color:transparent}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform 150ms linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}",".mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}"];e.RenderType_MdFormField=c.\u0275crt({encapsulation:2,styles:v,data:{animation:[{type:7,name:"transitionMessages",definitions:[{type:0,name:"enter",styles:{type:6,styles:{opacity:1,transform:"translateY(0%)"},offset:null},options:void 0},{type:1,expr:"void => enter",animation:[{type:6,styles:{opacity:0,transform:"translateY(-100%)"},offset:null},{type:4,styles:null,timings:"300ms cubic-bezier(0.55, 0, 0.55, 0.2)"}],options:null}],options:{}}]}}),e.View_MdFormField_0=s,e.View_MdFormField_Host_0=p,e.MdFormFieldNgFactory=c.\u0275ccf("md-input-container, mat-input-container, md-form-field, mat-form-field",m.MdFormField,p,{color:"color",dividerColor:"dividerColor",hideRequiredMarker:"hideRequiredMarker",hintLabel:"hintLabel",floatPlaceholder:"floatPlaceholder"},{},["[mdPrefix], [matPrefix]","*","md-placeholder, mat-placeholder","[mdSuffix], [matSuffix]","md-error, mat-error","md-hint:not([align='end']), mat-hint:not([align='end'])","md-hint[align='end'], mat-hint[align='end']"])},"7b+E":function(n,e){n.exports=__webpack_require__(24)},"8GTP":function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("uiya"),o=l("oOlt"),r=l("emCa"),i=function(){function n(){}return n.forRoot=function(){return{ngModule:n,providers:[o.ResponseService,t.ServerService,r.UserService]}},n}();e.ServiceModule=i},"8wGh":function(n,e){n.exports=__webpack_require__(25)},A7Ap:function(n,e){n.exports=__webpack_require__(26)},ASwt:function(n,e){n.exports=__webpack_require__(6)},BAmO:function(n,e,l){"use strict";function t(n){return i.\u0275vid(0,[(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275eld(0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),i.\u0275ted(null,["Login"])),(n()(),i.\u0275ted(null,["\n\n"])),(n()(),i.\u0275eld(0,null,null,57,"form",[["ngNativeValidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(n,e,l){var t=!0,o=n.component;if("submit"===e){t=!1!==i.\u0275nov(n,5).onSubmit(l)&&t}if("reset"===e){t=!1!==i.\u0275nov(n,5).onReset()&&t}if("ngSubmit"===e){t=!1!==o.login(i.\u0275nov(n,5))&&t}return t},null,null)),i.\u0275did(16384,[["login_form",4]],0,a.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),i.\u0275prd(2048,null,a.ControlContainer,null,[a.NgForm]),i.\u0275did(16384,null,0,a.NgControlStatusGroup,[a.ControlContainer],null,null),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,21,"md-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-focused",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==i.\u0275nov(n,11)._control.focus()&&t}return t},d.View_MdFormField_0,d.RenderType_MdFormField)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(7389184,null,6,p.MdFormField,[i.ElementRef,i.ChangeDetectorRef,[2,s.MD_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),i.\u0275qud(335544320,1,{_control:0}),i.\u0275qud(335544320,2,{_placeholderChild:0}),i.\u0275qud(603979776,3,{_errorChildren:1}),i.\u0275qud(603979776,4,{_hintChildren:1}),i.\u0275qud(603979776,5,{_prefixChildren:1}),i.\u0275qud(603979776,6,{_suffixChildren:1}),(n()(),i.\u0275ted(1,["\n    "])),(n()(),i.\u0275eld(0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["mdInput",""],["name","username"],["ngModel",""],["placeholder","Username"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[8,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(n,e,l){var t=!0;if("input"===e){t=!1!==i.\u0275nov(n,20)._handleInput(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,20).onTouched()&&t}if("compositionstart"===e){t=!1!==i.\u0275nov(n,20)._compositionStart()&&t}if("compositionend"===e){t=!1!==i.\u0275nov(n,20)._compositionEnd(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,28)._focusChanged(!1)&&t}if("focus"===e){t=!1!==i.\u0275nov(n,28)._focusChanged(!0)&&t}if("input"===e){t=!1!==i.\u0275nov(n,28)._onInput()&&t}return t},null,null)),i.\u0275did(16384,null,0,a.DefaultValueAccessor,[i.Renderer2,i.ElementRef,[2,a.COMPOSITION_BUFFER_MODE]],null,null),i.\u0275did(16384,null,0,a.RequiredValidator,[],{required:[0,"required"]},null),i.\u0275prd(1024,null,a.NG_VALIDATORS,function(n){return[n]},[a.RequiredValidator]),i.\u0275prd(1024,null,a.NG_VALUE_ACCESSOR,function(n){return[n]},[a.DefaultValueAccessor]),i.\u0275did(671744,null,0,a.NgModel,[[2,a.ControlContainer],[2,a.NG_VALIDATORS],[8,null],[2,a.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),i.\u0275prd(2048,null,a.NgControl,null,[a.NgModel]),i.\u0275did(16384,null,0,a.NgControlStatus,[a.NgControl],null,null),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(933888,null,0,c.MdInput,[i.ElementRef,i.Renderer2,m.Platform,[2,a.NgControl],[2,a.NgForm],[2,a.FormGroupDirective],[2,s.MD_ERROR_GLOBAL_OPTIONS]],{placeholder:[0,"placeholder"],required:[1,"required"]},null),i.\u0275prd(2048,[[1,4]],p.MdFormFieldControl,null,[c.MdInput]),(n()(),i.\u0275ted(1,["\n  "])),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,21,"md-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-focused",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==i.\u0275nov(n,34)._control.focus()&&t}return t},d.View_MdFormField_0,d.RenderType_MdFormField)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(7389184,null,6,p.MdFormField,[i.ElementRef,i.ChangeDetectorRef,[2,s.MD_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),i.\u0275qud(335544320,7,{_control:0}),i.\u0275qud(335544320,8,{_placeholderChild:0}),i.\u0275qud(603979776,9,{_errorChildren:1}),i.\u0275qud(603979776,10,{_hintChildren:1}),i.\u0275qud(603979776,11,{_prefixChildren:1}),i.\u0275qud(603979776,12,{_suffixChildren:1}),(n()(),i.\u0275ted(1,["\n    "])),(n()(),i.\u0275eld(0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["mdInput",""],["name","password"],["ngModel",""],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[8,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(n,e,l){var t=!0;if("input"===e){t=!1!==i.\u0275nov(n,43)._handleInput(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,43).onTouched()&&t}if("compositionstart"===e){t=!1!==i.\u0275nov(n,43)._compositionStart()&&t}if("compositionend"===e){t=!1!==i.\u0275nov(n,43)._compositionEnd(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,51)._focusChanged(!1)&&t}if("focus"===e){t=!1!==i.\u0275nov(n,51)._focusChanged(!0)&&t}if("input"===e){t=!1!==i.\u0275nov(n,51)._onInput()&&t}return t},null,null)),i.\u0275did(16384,null,0,a.DefaultValueAccessor,[i.Renderer2,i.ElementRef,[2,a.COMPOSITION_BUFFER_MODE]],null,null),i.\u0275did(16384,null,0,a.RequiredValidator,[],{required:[0,"required"]},null),i.\u0275prd(1024,null,a.NG_VALIDATORS,function(n){return[n]},[a.RequiredValidator]),i.\u0275prd(1024,null,a.NG_VALUE_ACCESSOR,function(n){return[n]},[a.DefaultValueAccessor]),i.\u0275did(671744,null,0,a.NgModel,[[2,a.ControlContainer],[2,a.NG_VALIDATORS],[8,null],[2,a.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),i.\u0275prd(2048,null,a.NgControl,null,[a.NgModel]),i.\u0275did(16384,null,0,a.NgControlStatus,[a.NgControl],null,null),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(933888,null,0,c.MdInput,[i.ElementRef,i.Renderer2,m.Platform,[2,a.NgControl],[2,a.NgForm],[2,a.FormGroupDirective],[2,s.MD_ERROR_GLOBAL_OPTIONS]],{placeholder:[0,"placeholder"],required:[1,"required"],type:[2,"type"]},null),i.\u0275prd(2048,[[7,4]],p.MdFormFieldControl,null,[c.MdInput]),(n()(),i.\u0275ted(1,["\n  "])),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,5,"button",[["class","mat-raised-button"],["color","success"],["md-raised-button",""]],[[8,"disabled",0]],null,null,f.View_MdButton_0,f.RenderType_MdButton)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(180224,null,0,g.MdButton,[i.Renderer2,i.ElementRef,m.Platform,b.FocusMonitor],{color:[0,"color"]},null),i.\u0275did(16384,null,0,g.MdRaisedButtonCssMatStyler,[],null,null),i.\u0275prd(8448,null,s.MATERIAL_COMPATIBILITY_MODE,!0,[]),(n()(),i.\u0275ted(0,["Login"])),(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275ted(null,["\n"]))],function(n,e){n(e,21,0,"");n(e,24,0,"username","");n(e,28,0,"Username","");n(e,44,0,"");n(e,47,0,"password","");n(e,51,0,"Password","","password");n(e,57,0,"success")},function(n,e){n(e,4,0,i.\u0275nov(e,7).ngClassUntouched,i.\u0275nov(e,7).ngClassTouched,i.\u0275nov(e,7).ngClassPristine,i.\u0275nov(e,7).ngClassDirty,i.\u0275nov(e,7).ngClassValid,i.\u0275nov(e,7).ngClassInvalid,i.\u0275nov(e,7).ngClassPending),n(e,9,0,i.\u0275nov(e,11)._control.errorState,i.\u0275nov(e,11)._control.errorState,i.\u0275nov(e,11)._control.focused,i.\u0275nov(e,11)._shouldForward("untouched"),i.\u0275nov(e,11)._shouldForward("touched"),i.\u0275nov(e,11)._shouldForward("pristine"),i.\u0275nov(e,11)._shouldForward("dirty"),i.\u0275nov(e,11)._shouldForward("valid"),i.\u0275nov(e,11)._shouldForward("invalid"),i.\u0275nov(e,11)._shouldForward("pending")),n(e,19,1,[i.\u0275nov(e,21).required?"":null,i.\u0275nov(e,26).ngClassUntouched,i.\u0275nov(e,26).ngClassTouched,i.\u0275nov(e,26).ngClassPristine,i.\u0275nov(e,26).ngClassDirty,i.\u0275nov(e,26).ngClassValid,i.\u0275nov(e,26).ngClassInvalid,i.\u0275nov(e,26).ngClassPending,i.\u0275nov(e,28).id,i.\u0275nov(e,28).placeholder,i.\u0275nov(e,28).disabled,i.\u0275nov(e,28).required,i.\u0275nov(e,28)._ariaDescribedby||null,i.\u0275nov(e,28).errorState]),n(e,32,0,i.\u0275nov(e,34)._control.errorState,i.\u0275nov(e,34)._control.errorState,i.\u0275nov(e,34)._control.focused,i.\u0275nov(e,34)._shouldForward("untouched"),i.\u0275nov(e,34)._shouldForward("touched"),i.\u0275nov(e,34)._shouldForward("pristine"),i.\u0275nov(e,34)._shouldForward("dirty"),i.\u0275nov(e,34)._shouldForward("valid"),i.\u0275nov(e,34)._shouldForward("invalid"),i.\u0275nov(e,34)._shouldForward("pending")),n(e,42,1,[i.\u0275nov(e,44).required?"":null,i.\u0275nov(e,49).ngClassUntouched,i.\u0275nov(e,49).ngClassTouched,i.\u0275nov(e,49).ngClassPristine,i.\u0275nov(e,49).ngClassDirty,i.\u0275nov(e,49).ngClassValid,i.\u0275nov(e,49).ngClassInvalid,i.\u0275nov(e,49).ngClassPending,i.\u0275nov(e,51).id,i.\u0275nov(e,51).placeholder,i.\u0275nov(e,51).disabled,i.\u0275nov(e,51).required,i.\u0275nov(e,51)._ariaDescribedby||null,i.\u0275nov(e,51).errorState]),n(e,55,0,i.\u0275nov(e,57).disabled||null)})}function o(n){return i.\u0275vid(0,[(n()(),i.\u0275eld(0,null,null,1,"app-login",[],null,null,null,t,e.RenderType_LoginComponent)),i.\u0275did(114688,null,0,u.LoginComponent,[v.UserService],null,null)],function(n,e){n(e,1,0)},null)}Object.defineProperty(e,"__esModule",{value:!0});var r=l("kks4"),i=l("OQ0P"),u=l("MPHo"),a=l("02xY"),d=l("6OSA"),s=l("61WG"),p=l("Zdke"),c=l("ua6K"),m=l("aNNv"),f=l("wjk8"),g=l("MnMZ"),b=l("l0GU"),v=l("emCa"),_=[r.styles];e.RenderType_LoginComponent=i.\u0275crt({encapsulation:0,styles:_,data:{}}),e.View_LoginComponent_0=t,e.View_LoginComponent_Host_0=o,e.LoginComponentNgFactory=i.\u0275ccf("app-login",u.LoginComponent,o,{},{},[])},D5Jq:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){}return n}();e.MaterialModule=t},EqQh:function(n,e){n.exports=__webpack_require__(27)},"Hq/i":function(n,e){n.exports=__webpack_require__(28)},Ir0Z:function(n,e){n.exports=__webpack_require__(29)},MPHo:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("emCa"),o=function(){function n(n){this._user=n}return n.prototype.ngOnInit=function(){},n.prototype.login=function(n){var e=n.value.username,l=n.value.password;this._user.login(e,l).then(function(n){console.log(n)})},n.ctorParameters=function(){return[{type:t.UserService}]},n}();e.LoginComponent=o},MnMZ:function(n,e){n.exports=__webpack_require__(30)},OQ0P:function(n,e){n.exports=__webpack_require__(5)},T2Au:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){}return n}();e.SharedModule=t},Z7rc:function(n,e){n.exports=__webpack_require__(31)},Zdke:function(n,e){n.exports=__webpack_require__(32)},Zq8w:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("bNRb");e.AppServerModule=t.AppServerModule;var o=l("2cGb");e.AppServerModuleNgFactory=o.AppServerModuleNgFactory,e.LAZY_MODULE_MAP={}},aNNv:function(n,e){n.exports=__webpack_require__(33)},"aR8+":function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){}return n}();e.AppModule=t},bNRb:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){}return n}();e.AppServerModule=t},dZNi:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("52xY"),o=(t.HomeComponent,function(){function n(){}return n}());e.AppRouterModule=o},emCa:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("uiya"),o=function(){function n(n){var e=this;this._server=n,this._url="/api/user/",this.get=function(n){return e._server.get(""+e._url+n)},this.post=function(n){return function(l){return e._server.post(""+e._url+n)(l)}}}return n.prototype.register=function(n,e){return this.post("register")({username:n,password:e})},n.prototype.login=function(n,e){return this.post("login")({username:n,password:e})},n.prototype.logout=function(){return this.get("logout")},n.ctorParameters=function(){return[{type:t.ServerService}]},n}();e.UserService=o},f9NF:function(n,e){n.exports=__webpack_require__(34)},ifTt:function(n,e){n.exports=__webpack_require__(35)},k7ea:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.styles=[""]},kks4:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.styles=[""]},l0GU:function(n,e){n.exports=__webpack_require__(36)},l0JX:function(n,e){n.exports=__webpack_require__(37)},"ldC+":function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){}return n}();e.CoreModule=t},mx8N:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.styles=[""]},oOlt:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t,o=l("OQ0P"),r=l("/uBQ"),i=l("yv0u"),u=l("A7Ap"),a=null;!function(n){n[n.SUCCESS=1]="SUCCESS",n[n.WARNING=2]="WARNING",n[n.INPUT=3]="INPUT",n[n.AUTHENTICATION=4]="AUTHENTICATION",n[n.ERROR=5]="ERROR"}(t=e.STATUS||(e.STATUS={}));var d;!function(n){n[n.DISABLED=0]="DISABLED",n[n.SUCCESS=1]="SUCCESS",n[n.LOADING=2]="LOADING",n[n.ERROR=3]="ERROR",n[n.USER_ERROR=4]="USER_ERROR",n[n.USER_MSG=5]="USER_MSG",n[n.REDIRECT=6]="REDIRECT",n[n.TIMEOUT=7]="TIMEOUT",n[n.AUTHENTICATE=8]="AUTHENTICATE"}(d=e.LOADER||(e.LOADER={}));var s=function(){function n(n,e){var l=this;this.platformId=n,this._router=e,this._loading=new r.BehaviorSubject(d.DISABLED),this.loading$=this._loading.asObservable(),this.response=null,this.loaderMessage="",this.__base=function(n){return a.response=n,n.status!==t.SUCCESS&&a.showMessage(l._getResponseType(n.status),n.msg,l._getResponseMessageHeader(n.status)),a.disable(),l._getResponseValue(n)},a=this}return n.prototype.getLoader=function(){return this.loading$},n.prototype.pending=function(){return this._loading.getValue()},n.prototype.disable=function(){this._loading.next(d.DISABLED)},n.prototype.isLoading=function(){return this._loading.getValue()===d.LOADING},n.prototype.showMessage=function(n,e,l){i.isPlatformBrowser(this.platformId)},n.prototype.load=function(n,e){this.loaderMessage=n||"Loading",this._loading.next(d.LOADING)},n.prototype.catch=function(n){var e=n.message?n.message:n.status?n.status+" - "+n.statusText:"Could not connect to server";console.error("Error:",n),a.showMessage("error",e,"Error"),a.disable()},n.prototype.handle=function(n){var e=n;return e||console.error("Not valid API boy!"),console.log("Response:",e.status,e.msg,e.data),a.__base(e)},n.prototype._getResponseType=function(n){switch(n){case t.SUCCESS:return"success";case t.AUTHENTICATION:return"error";default:return"warning"}},n.prototype._getResponseMessageHeader=function(n){switch(n){case t.SUCCESS:return"Success";case t.WARNING:return"Warning";case t.AUTHENTICATION:return"Authentication";case t.INPUT:return"Input Error";case t.ERROR:return"Server error";default:return"warning"}},n.prototype._getResponseValue=function(n){switch(n.status){case t.SUCCESS:return n.data||!0;case t.INPUT:return n;default:return!1}},n.prototype.timeout=function(){console.error("Timeout"),a.showMessage("error","Could not connect to server","Server error"),a.disable()},n.ctorParameters=function(){return[{type:void 0,decorators:[{type:o.Inject,args:[o.PLATFORM_ID]}]},{type:u.Router}]},n}();e.ResponseService=s},q4dy:function(n,e,l){"use strict";function t(n){return i.\u0275vid(0,[(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275eld(16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),i.\u0275did(212992,null,0,u.RouterOutlet,[u.ChildrenOutletContexts,i.ViewContainerRef,i.ComponentFactoryResolver,[8,null],i.ChangeDetectorRef],null,null),(n()(),i.\u0275ted(null,["\n\n"]))],function(n,e){n(e,2,0)},null)}function o(n){return i.\u0275vid(0,[(n()(),i.\u0275eld(0,null,null,1,"app-root",[],null,null,null,t,e.RenderType_AppComponent)),i.\u0275did(49152,null,0,a.AppComponent,[],null,null)],null,null)}Object.defineProperty(e,"__esModule",{value:!0});var r=l("k7ea"),i=l("OQ0P"),u=l("A7Ap"),a=l("wQAS"),d=[r.styles];e.RenderType_AppComponent=i.\u0275crt({encapsulation:0,styles:d,data:{}}),e.View_AppComponent_0=t,e.View_AppComponent_Host_0=o,e.AppComponentNgFactory=i.\u0275ccf("app-root",a.AppComponent,o,{},{},[])},scRf:function(n,e,l){"use strict";function t(n){return i.\u0275vid(0,[(n()(),i.\u0275eld(0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),i.\u0275ted(null,["Home"])),(n()(),i.\u0275ted(null,["\n\n"])),(n()(),i.\u0275eld(0,null,null,1,"app-register",[],null,null,null,u.View_RegisterComponent_0,u.RenderType_RegisterComponent)),i.\u0275did(114688,null,0,a.RegisterComponent,[d.UserService],null,null),(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275eld(0,null,null,1,"app-login",[],null,null,null,s.View_LoginComponent_0,s.RenderType_LoginComponent)),i.\u0275did(114688,null,0,p.LoginComponent,[d.UserService],null,null),(n()(),i.\u0275ted(null,["\n\n"])),(n()(),i.\u0275eld(0,null,null,5,"button",[["class","mat-raised-button"],["md-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0,o=n.component;if("click"===e){t=!1!==o.logout()&&t}return t},m.View_MdButton_0,m.RenderType_MdButton)),i.\u0275did(16384,null,0,f.MdPrefixRejector,[[2,f.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(180224,null,0,g.MdButton,[i.Renderer2,i.ElementRef,b.Platform,v.FocusMonitor],null,null),i.\u0275did(16384,null,0,g.MdRaisedButtonCssMatStyler,[],null,null),i.\u0275prd(8448,null,f.MATERIAL_COMPATIBILITY_MODE,!0,[]),(n()(),i.\u0275ted(0,["Log Out"])),(n()(),i.\u0275ted(null,["\n\n"]))],function(n,e){n(e,4,0),n(e,7,0)},function(n,e){n(e,9,0,i.\u0275nov(e,11).disabled||null)})}function o(n){return i.\u0275vid(0,[(n()(),i.\u0275eld(0,null,null,1,"app-home",[],null,null,null,t,e.RenderType_HomeComponent)),i.\u0275did(114688,null,0,c.HomeComponent,[d.UserService],null,null)],function(n,e){n(e,1,0)},null)}Object.defineProperty(e,"__esModule",{value:!0});var r=l("mx8N"),i=l("OQ0P"),u=l("yiAJ"),a=l("xnfE"),d=l("emCa"),s=l("BAmO"),p=l("MPHo"),c=l("52xY"),m=l("wjk8"),f=l("61WG"),g=l("MnMZ"),b=l("aNNv"),v=l("l0GU"),_=[r.styles];e.RenderType_HomeComponent=i.\u0275crt({encapsulation:0,styles:_,data:{}}),e.View_HomeComponent_0=t,e.View_HomeComponent_Host_0=o,e.HomeComponentNgFactory=i.\u0275ccf("app-home",c.HomeComponent,o,{},{},[])},t92t:function(n,e){n.exports=__webpack_require__(38)},ua6K:function(n,e){n.exports=__webpack_require__(39)},uiya:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("Ir0Z"),o=l("oOlt");l("EqQh"),l("Z7rc");var r=function(){function n(n,e){var l=this;this._http=n,this._r=e,this.get=function(n){return l._r.load("Get --- "+n),l.withHandler(l._http.get(n))},this.post=function(n){return function(e){return l._r.load("Post --- "+n),l.withHandler(l._http.post(n,e))}},this.patch=function(n){return function(e){return l._r.load("Patch --- "+n),l.withHandler(l._http.patch(n,e))}},this.put=function(n){return function(e){return l._r.load("Put --- "+n),l.withHandler(l._http.put(n,e))}},this.delete=function(n){return l._r.load("Delete --- "+n),l.withHandler(l._http.delete(n))},this.getWithHandler=function(n){return function(e){return l._r.load("Get --- "+e),l.noHandler(l._http.get(e))(n)}},this.postWithHandler=function(n){return function(e){return function(t){return l._r.load("Post --- "+e),l.noHandler(l._http.post(e,t))(n)}}},this.toPromise=function(n){return function(e){return function(l){return n.toPromise().then(l).catch(e)}}},this.asPromise=function(n){return l.toPromise(n)},this.noHandler=function(n){return l.toPromise(n)(l._r.catch)},this.withHandler=function(n){return l.noHandler(n)(l._r.handle)}}return n.ctorParameters=function(){return[{type:t.HttpClient},{type:o.ResponseService}]},n}();e.ServerService=r},vM6b:function(n,e){n.exports=__webpack_require__(40)},vqi5:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.styles=[""]},wQAS:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function n(){this.title="app"}return n}();e.AppComponent=t},wjk8:function(n,e,l){"use strict";function t(n){return u.\u0275vid(2,[(n()(),u.\u0275eld(0,null,null,1,"span",[["class","mat-button-wrapper"]],null,null,null,null,null)),u.\u0275ncd(null,0),(n()(),u.\u0275eld(0,null,null,1,"div",[["class","mat-button-ripple mat-ripple"],["mat-ripple",""]],[[2,"mat-button-ripple-round",null],[2,"mat-ripple-unbounded",null]],null,null,null,null)),u.\u0275did(671744,null,0,g.MdRipple,[u.ElementRef,u.NgZone,m.ViewportRuler,c.Platform,[2,g.MD_RIPPLE_GLOBAL_OPTIONS]],{_matRippleTrigger:[0,"_matRippleTrigger"],_matRippleCentered:[1,"_matRippleCentered"],_matRippleDisabled:[2,"_matRippleDisabled"]},null),(n()(),u.\u0275eld(0,null,null,0,"div",[["class","mat-button-focus-overlay"]],null,null,null,null,null))],function(n,e){var l=e.component;n(e,3,0,l._getHostElement(),l._isIconButton,l._isRippleDisabled())},function(n,e){var l=e.component;n(e,2,0,l._isRoundButton||l._isIconButton,u.\u0275nov(e,3).unbounded)})}function o(n){return u.\u0275vid(0,[(n()(),u.\u0275eld(0,null,null,2,"button",[["md-button",""]],[[8,"disabled",0]],null,null,t,e.RenderType_MdButton)),u.\u0275did(180224,null,0,a.MdButton,[u.Renderer2,u.ElementRef,c.Platform,f.FocusMonitor],null,null),u.\u0275prd(8448,null,g.MATERIAL_COMPATIBILITY_MODE,!0,[])],null,function(n,e){n(e,0,0,u.\u0275nov(e,1).disabled||null)})}function r(n){return u.\u0275vid(2,[(n()(),u.\u0275eld(0,null,null,1,"span",[["class","mat-button-wrapper"]],null,null,null,null,null)),u.\u0275ncd(null,0),(n()(),u.\u0275eld(0,null,null,1,"div",[["class","mat-button-ripple mat-ripple"],["mat-ripple",""]],[[2,"mat-button-ripple-round",null],[2,"mat-ripple-unbounded",null]],null,null,null,null)),u.\u0275did(671744,null,0,g.MdRipple,[u.ElementRef,u.NgZone,m.ViewportRuler,c.Platform,[2,g.MD_RIPPLE_GLOBAL_OPTIONS]],{_matRippleTrigger:[0,"_matRippleTrigger"],_matRippleCentered:[1,"_matRippleCentered"],_matRippleDisabled:[2,"_matRippleDisabled"]},null),(n()(),u.\u0275eld(0,null,null,0,"div",[["class","mat-button-focus-overlay"]],null,null,null,null,null))],function(n,e){var l=e.component;n(e,3,0,l._getHostElement(),l._isIconButton,l._isRippleDisabled())},function(n,e){var l=e.component;n(e,2,0,l._isRoundButton||l._isIconButton,u.\u0275nov(e,3).unbounded)})}function i(n){return u.\u0275vid(0,[(n()(),u.\u0275eld(0,null,null,1,"a",[["md-button",""]],[[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==u.\u0275nov(n,1)._haltDisabledEvents(l)&&t}return t},r,e.RenderType_MdAnchor)),u.\u0275did(180224,null,0,a.MdAnchor,[c.Platform,f.FocusMonitor,u.ElementRef,u.Renderer2],null,null)],null,function(n,e){n(e,0,0,u.\u0275nov(e,1).disabled?-1:0,u.\u0275nov(e,1).disabled||null,u.\u0275nov(e,1).disabled.toString())})}Object.defineProperty(e,"__esModule",{value:!0});var u=l("OQ0P"),a=l("MnMZ"),d=l("yv0u"),s=l("vM6b"),p=l("wp5R"),c=l("aNNv"),m=l("ifTt"),f=l("l0GU"),g=l("61WG");e.MdButtonModuleNgFactory=u.\u0275cmf(a.MdButtonModule,[],function(n){return u.\u0275mod([u.\u0275mpd(512,u.ComponentFactoryResolver,u.\u0275CodegenComponentFactoryResolver,[[8,[]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u.\u0275mpd(4608,d.NgLocalization,d.NgLocaleLocalization,[u.LOCALE_ID]),u.\u0275mpd(6144,s.DIR_DOCUMENT,null,[p.DOCUMENT]),u.\u0275mpd(4608,s.Directionality,s.Directionality,[[2,s.DIR_DOCUMENT]]),u.\u0275mpd(4608,c.Platform,c.Platform,[]),u.\u0275mpd(5120,m.ScrollDispatcher,m.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,m.ScrollDispatcher],u.NgZone,c.Platform]),u.\u0275mpd(5120,m.ViewportRuler,m.VIEWPORT_RULER_PROVIDER_FACTORY,[[3,m.ViewportRuler],m.ScrollDispatcher]),u.\u0275mpd(4608,f.InteractivityChecker,f.InteractivityChecker,[c.Platform]),u.\u0275mpd(4608,f.FocusTrapFactory,f.FocusTrapFactory,[f.InteractivityChecker,c.Platform,u.NgZone]),u.\u0275mpd(136192,f.AriaDescriber,f.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,f.AriaDescriber],c.Platform]),u.\u0275mpd(5120,f.LiveAnnouncer,f.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,f.LiveAnnouncer],[2,f.LIVE_ANNOUNCER_ELEMENT_TOKEN],c.Platform]),u.\u0275mpd(5120,f.FocusMonitor,f.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,f.FocusMonitor],u.NgZone,c.Platform]),u.\u0275mpd(512,d.CommonModule,d.CommonModule,[]),u.\u0275mpd(512,g.CompatibilityModule,g.CompatibilityModule,[]),u.\u0275mpd(512,s.BidiModule,s.BidiModule,[]),u.\u0275mpd(256,g.MATERIAL_SANITY_CHECKS,!0,[]),u.\u0275mpd(512,g.MdCommonModule,g.MdCommonModule,[[2,p.DOCUMENT],[2,g.MATERIAL_SANITY_CHECKS]]),u.\u0275mpd(512,c.PlatformModule,c.PlatformModule,[]),u.\u0275mpd(512,m.ScrollDispatchModule,m.ScrollDispatchModule,[]),u.\u0275mpd(512,g.MdRippleModule,g.MdRippleModule,[]),u.\u0275mpd(512,f.A11yModule,f.A11yModule,[]),u.\u0275mpd(512,a.MdButtonModule,a.MdButtonModule,[])])});var b=[".mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:88px;line-height:36px;padding:0 16px;border-radius:2px}[disabled].mat-button,[disabled].mat-fab,[disabled].mat-icon-button,[disabled].mat-mini-fab,[disabled].mat-raised-button{cursor:default}.cdk-keyboard-focused.mat-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-icon-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-mini-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-raised-button .mat-button-focus-overlay{opacity:1}.mat-button::-moz-focus-inner,.mat-fab::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-mini-fab::-moz-focus-inner,.mat-raised-button::-moz-focus-inner{border:0}.mat-fab,.mat-mini-fab,.mat-raised-button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-fab:not([disabled]):active,.mat-mini-fab:not([disabled]):active,.mat-raised-button:not([disabled]):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}[disabled].mat-fab,[disabled].mat-mini-fab,[disabled].mat-raised-button{box-shadow:none}.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{transition:none;opacity:0}.mat-button:hover .mat-button-focus-overlay{opacity:1}.mat-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button,.mat-icon-button,.mat-raised-button{color:currentColor}.mat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*{vertical-align:middle}.mat-button-focus-overlay,.mat-button-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-focus-overlay{background-color:rgba(0,0,0,.12);border-radius:inherit;opacity:0;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1)}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}}.mat-button-ripple-round{border-radius:50%;z-index:1}@media screen and (-ms-high-contrast:active){.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}"];e.RenderType_MdButton=u.\u0275crt({encapsulation:2,styles:b,data:{}}),e.View_MdButton_0=t,e.View_MdButton_Host_0=o,e.MdButtonNgFactory=u.\u0275ccf("button[md-button], button[md-raised-button], button[md-icon-button],\n             button[md-fab], button[md-mini-fab],\n             button[mat-button], button[mat-raised-button], button[mat-icon-button],\n             button[mat-fab], button[mat-mini-fab]",a.MdButton,o,{disabled:"disabled",disableRipple:"disableRipple",color:"color"},{},["*"]);var v=[".mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:88px;line-height:36px;padding:0 16px;border-radius:2px}[disabled].mat-button,[disabled].mat-fab,[disabled].mat-icon-button,[disabled].mat-mini-fab,[disabled].mat-raised-button{cursor:default}.cdk-keyboard-focused.mat-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-icon-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-mini-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-raised-button .mat-button-focus-overlay{opacity:1}.mat-button::-moz-focus-inner,.mat-fab::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-mini-fab::-moz-focus-inner,.mat-raised-button::-moz-focus-inner{border:0}.mat-fab,.mat-mini-fab,.mat-raised-button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-fab:not([disabled]):active,.mat-mini-fab:not([disabled]):active,.mat-raised-button:not([disabled]):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}[disabled].mat-fab,[disabled].mat-mini-fab,[disabled].mat-raised-button{box-shadow:none}.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{transition:none;opacity:0}.mat-button:hover .mat-button-focus-overlay{opacity:1}.mat-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button,.mat-icon-button,.mat-raised-button{color:currentColor}.mat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*{vertical-align:middle}.mat-button-focus-overlay,.mat-button-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-focus-overlay{background-color:rgba(0,0,0,.12);border-radius:inherit;opacity:0;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1)}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}}.mat-button-ripple-round{border-radius:50%;z-index:1}@media screen and (-ms-high-contrast:active){.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}"];e.RenderType_MdAnchor=u.\u0275crt({encapsulation:2,styles:v,data:{}}),e.View_MdAnchor_0=r,e.View_MdAnchor_Host_0=i,e.MdAnchorNgFactory=u.\u0275ccf("a[md-button], a[md-raised-button], a[md-icon-button], a[md-fab], a[md-mini-fab],\n             a[mat-button], a[mat-raised-button], a[mat-icon-button], a[mat-fab], a[mat-mini-fab]",a.MdAnchor,i,{disabled:"disabled",disableRipple:"disableRipple",color:"color"},{},["*"])},wp5R:function(n,e){n.exports=__webpack_require__(41)},xnfE:function(n,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=l("emCa"),o=function(){function n(n){this._user=n}return n.prototype.ngOnInit=function(){},n.prototype.register=function(n){var e=n.value.username,l=n.value.password;return this._user.register(e,l).then(function(n){console.log(n)}),!1},n.ctorParameters=function(){return[{type:t.UserService}]},n}();e.RegisterComponent=o},yiAJ:function(n,e,l){"use strict";function t(n){return i.\u0275vid(0,[(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275eld(0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),i.\u0275ted(null,["Register"])),(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275eld(0,null,null,57,"form",[["ngNativeValidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(n,e,l){var t=!0,o=n.component;if("submit"===e){t=!1!==i.\u0275nov(n,5).onSubmit(l)&&t}if("reset"===e){t=!1!==i.\u0275nov(n,5).onReset()&&t}if("ngSubmit"===e){t=!1!==o.register(i.\u0275nov(n,5))&&t}return t},null,null)),i.\u0275did(16384,[["register_form",4]],0,a.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),i.\u0275prd(2048,null,a.ControlContainer,null,[a.NgForm]),i.\u0275did(16384,null,0,a.NgControlStatusGroup,[a.ControlContainer],null,null),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,21,"md-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-focused",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==i.\u0275nov(n,11)._control.focus()&&t}return t},d.View_MdFormField_0,d.RenderType_MdFormField)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(7389184,null,6,p.MdFormField,[i.ElementRef,i.ChangeDetectorRef,[2,s.MD_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),i.\u0275qud(335544320,1,{_control:0}),i.\u0275qud(335544320,2,{_placeholderChild:0}),i.\u0275qud(603979776,3,{_errorChildren:1}),i.\u0275qud(603979776,4,{_hintChildren:1}),i.\u0275qud(603979776,5,{_prefixChildren:1}),i.\u0275qud(603979776,6,{_suffixChildren:1}),(n()(),i.\u0275ted(1,["\n    "])),(n()(),i.\u0275eld(0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["mdInput",""],["name","username"],["ngModel",""],["placeholder","Username"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[8,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(n,e,l){var t=!0;if("input"===e){t=!1!==i.\u0275nov(n,20)._handleInput(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,20).onTouched()&&t}if("compositionstart"===e){t=!1!==i.\u0275nov(n,20)._compositionStart()&&t}if("compositionend"===e){t=!1!==i.\u0275nov(n,20)._compositionEnd(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,28)._focusChanged(!1)&&t}if("focus"===e){t=!1!==i.\u0275nov(n,28)._focusChanged(!0)&&t}if("input"===e){t=!1!==i.\u0275nov(n,28)._onInput()&&t}return t},null,null)),i.\u0275did(16384,null,0,a.DefaultValueAccessor,[i.Renderer2,i.ElementRef,[2,a.COMPOSITION_BUFFER_MODE]],null,null),i.\u0275did(16384,null,0,a.RequiredValidator,[],{required:[0,"required"]},null),i.\u0275prd(1024,null,a.NG_VALIDATORS,function(n){return[n]},[a.RequiredValidator]),i.\u0275prd(1024,null,a.NG_VALUE_ACCESSOR,function(n){return[n]},[a.DefaultValueAccessor]),i.\u0275did(671744,null,0,a.NgModel,[[2,a.ControlContainer],[2,a.NG_VALIDATORS],[8,null],[2,a.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),i.\u0275prd(2048,null,a.NgControl,null,[a.NgModel]),i.\u0275did(16384,null,0,a.NgControlStatus,[a.NgControl],null,null),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(933888,null,0,c.MdInput,[i.ElementRef,i.Renderer2,m.Platform,[2,a.NgControl],[2,a.NgForm],[2,a.FormGroupDirective],[2,s.MD_ERROR_GLOBAL_OPTIONS]],{placeholder:[0,"placeholder"],required:[1,"required"]},null),i.\u0275prd(2048,[[1,4]],p.MdFormFieldControl,null,[c.MdInput]),(n()(),i.\u0275ted(1,["\n  "])),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,21,"md-form-field",[["class","mat-input-container mat-form-field"]],[[2,"mat-input-invalid",null],[2,"mat-form-field-invalid",null],[2,"mat-focused",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"click"]],function(n,e,l){var t=!0;if("click"===e){t=!1!==i.\u0275nov(n,34)._control.focus()&&t}return t},d.View_MdFormField_0,d.RenderType_MdFormField)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(7389184,null,6,p.MdFormField,[i.ElementRef,i.ChangeDetectorRef,[2,s.MD_PLACEHOLDER_GLOBAL_OPTIONS]],null,null),i.\u0275qud(335544320,7,{_control:0}),i.\u0275qud(335544320,8,{_placeholderChild:0}),i.\u0275qud(603979776,9,{_errorChildren:1}),i.\u0275qud(603979776,10,{_hintChildren:1}),i.\u0275qud(603979776,11,{_prefixChildren:1}),i.\u0275qud(603979776,12,{_suffixChildren:1}),(n()(),i.\u0275ted(1,["\n    "])),(n()(),i.\u0275eld(0,null,1,10,"input",[["class","mat-input-element mat-form-field-autofill-control"],["mdInput",""],["name","password"],["ngModel",""],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[8,"id",0],[8,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"aria-describedby",0],[1,"aria-invalid",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(n,e,l){var t=!0;if("input"===e){t=!1!==i.\u0275nov(n,43)._handleInput(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,43).onTouched()&&t}if("compositionstart"===e){t=!1!==i.\u0275nov(n,43)._compositionStart()&&t}if("compositionend"===e){t=!1!==i.\u0275nov(n,43)._compositionEnd(l.target.value)&&t}if("blur"===e){t=!1!==i.\u0275nov(n,51)._focusChanged(!1)&&t}if("focus"===e){t=!1!==i.\u0275nov(n,51)._focusChanged(!0)&&t}if("input"===e){t=!1!==i.\u0275nov(n,51)._onInput()&&t}return t},null,null)),i.\u0275did(16384,null,0,a.DefaultValueAccessor,[i.Renderer2,i.ElementRef,[2,a.COMPOSITION_BUFFER_MODE]],null,null),i.\u0275did(16384,null,0,a.RequiredValidator,[],{required:[0,"required"]},null),i.\u0275prd(1024,null,a.NG_VALIDATORS,function(n){return[n]},[a.RequiredValidator]),i.\u0275prd(1024,null,a.NG_VALUE_ACCESSOR,function(n){return[n]},[a.DefaultValueAccessor]),i.\u0275did(671744,null,0,a.NgModel,[[2,a.ControlContainer],[2,a.NG_VALIDATORS],[8,null],[2,a.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},null),i.\u0275prd(2048,null,a.NgControl,null,[a.NgModel]),i.\u0275did(16384,null,0,a.NgControlStatus,[a.NgControl],null,null),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(933888,null,0,c.MdInput,[i.ElementRef,i.Renderer2,m.Platform,[2,a.NgControl],[2,a.NgForm],[2,a.FormGroupDirective],[2,s.MD_ERROR_GLOBAL_OPTIONS]],{placeholder:[0,"placeholder"],required:[1,"required"],type:[2,"type"]},null),i.\u0275prd(2048,[[7,4]],p.MdFormFieldControl,null,[c.MdInput]),(n()(),i.\u0275ted(1,["\n  "])),(n()(),i.\u0275ted(null,["\n\n  "])),(n()(),i.\u0275eld(0,null,null,5,"button",[["class","mat-raised-button"],["color","primary"],["md-raised-button",""]],[[8,"disabled",0]],null,null,f.View_MdButton_0,f.RenderType_MdButton)),i.\u0275did(16384,null,0,s.MdPrefixRejector,[[2,s.MATERIAL_COMPATIBILITY_MODE],i.ElementRef],null,null),i.\u0275did(180224,null,0,g.MdButton,[i.Renderer2,i.ElementRef,m.Platform,b.FocusMonitor],{color:[0,"color"]},null),i.\u0275did(16384,null,0,g.MdRaisedButtonCssMatStyler,[],null,null),i.\u0275prd(8448,null,s.MATERIAL_COMPATIBILITY_MODE,!0,[]),(n()(),i.\u0275ted(0,["Register"])),(n()(),i.\u0275ted(null,["\n"])),(n()(),i.\u0275ted(null,["\n"]))],function(n,e){n(e,21,0,"");n(e,24,0,"username","");n(e,28,0,"Username","");n(e,44,0,"");n(e,47,0,"password","");n(e,51,0,"Password","","password");n(e,57,0,"primary")},function(n,e){n(e,4,0,i.\u0275nov(e,7).ngClassUntouched,i.\u0275nov(e,7).ngClassTouched,i.\u0275nov(e,7).ngClassPristine,i.\u0275nov(e,7).ngClassDirty,i.\u0275nov(e,7).ngClassValid,i.\u0275nov(e,7).ngClassInvalid,i.\u0275nov(e,7).ngClassPending),n(e,9,0,i.\u0275nov(e,11)._control.errorState,i.\u0275nov(e,11)._control.errorState,i.\u0275nov(e,11)._control.focused,i.\u0275nov(e,11)._shouldForward("untouched"),i.\u0275nov(e,11)._shouldForward("touched"),i.\u0275nov(e,11)._shouldForward("pristine"),i.\u0275nov(e,11)._shouldForward("dirty"),i.\u0275nov(e,11)._shouldForward("valid"),i.\u0275nov(e,11)._shouldForward("invalid"),i.\u0275nov(e,11)._shouldForward("pending")),n(e,19,1,[i.\u0275nov(e,21).required?"":null,i.\u0275nov(e,26).ngClassUntouched,i.\u0275nov(e,26).ngClassTouched,i.\u0275nov(e,26).ngClassPristine,i.\u0275nov(e,26).ngClassDirty,i.\u0275nov(e,26).ngClassValid,i.\u0275nov(e,26).ngClassInvalid,i.\u0275nov(e,26).ngClassPending,i.\u0275nov(e,28).id,i.\u0275nov(e,28).placeholder,i.\u0275nov(e,28).disabled,i.\u0275nov(e,28).required,i.\u0275nov(e,28)._ariaDescribedby||null,i.\u0275nov(e,28).errorState]),n(e,32,0,i.\u0275nov(e,34)._control.errorState,i.\u0275nov(e,34)._control.errorState,i.\u0275nov(e,34)._control.focused,i.\u0275nov(e,34)._shouldForward("untouched"),i.\u0275nov(e,34)._shouldForward("touched"),i.\u0275nov(e,34)._shouldForward("pristine"),i.\u0275nov(e,34)._shouldForward("dirty"),i.\u0275nov(e,34)._shouldForward("valid"),i.\u0275nov(e,34)._shouldForward("invalid"),i.\u0275nov(e,34)._shouldForward("pending")),n(e,42,1,[i.\u0275nov(e,44).required?"":null,i.\u0275nov(e,49).ngClassUntouched,i.\u0275nov(e,49).ngClassTouched,i.\u0275nov(e,49).ngClassPristine,i.\u0275nov(e,49).ngClassDirty,i.\u0275nov(e,49).ngClassValid,i.\u0275nov(e,49).ngClassInvalid,i.\u0275nov(e,49).ngClassPending,i.\u0275nov(e,51).id,i.\u0275nov(e,51).placeholder,i.\u0275nov(e,51).disabled,i.\u0275nov(e,51).required,i.\u0275nov(e,51)._ariaDescribedby||null,i.\u0275nov(e,51).errorState]),n(e,55,0,i.\u0275nov(e,57).disabled||null)})}function o(n){return i.\u0275vid(0,[(n()(),i.\u0275eld(0,null,null,1,"app-register",[],null,null,null,t,e.RenderType_RegisterComponent)),i.\u0275did(114688,null,0,u.RegisterComponent,[v.UserService],null,null)],function(n,e){n(e,1,0)},null)}Object.defineProperty(e,"__esModule",{value:!0});var r=l("vqi5"),i=l("OQ0P"),u=l("xnfE"),a=l("02xY"),d=l("6OSA"),s=l("61WG"),p=l("Zdke"),c=l("ua6K"),m=l("aNNv"),f=l("wjk8"),g=l("MnMZ"),b=l("l0GU"),v=l("emCa"),_=[r.styles];e.RenderType_RegisterComponent=i.\u0275crt({encapsulation:0,styles:_,data:{}}),e.View_RegisterComponent_0=t,e.View_RegisterComponent_Host_0=o,e.RegisterComponentNgFactory=i.\u0275ccf("app-register",u.RegisterComponent,o,{},{},[])},yv0u:function(n,e){n.exports=__webpack_require__(42)}}));

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("rxjs/BehaviorSubject");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/core");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/grid-list");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@angular/animations/browser");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@angular/router");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/catch");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser/animations");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@angular/common/http");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/button");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/toPromise");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/form-field");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/platform");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("@angular/http");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/scrolling");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/a11y");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@angular/animations");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/card");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("@angular/material/input");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@angular/cdk/bidi");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const utils_1 = __webpack_require__(7);
const files_1 = __webpack_require__(2);
const path = __webpack_require__(4);
const morgan = __webpack_require__(44);
const bodyParser = __webpack_require__(45);
const favicon = __webpack_require__(46);
const compression = __webpack_require__(47);
const x_frame = __webpack_require__(48);
const connect_flash = __webpack_require__(49);
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
/* 44 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("x-frame-options");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const config_1 = __webpack_require__(3);
const session = __webpack_require__(51);
const Redis = __webpack_require__(52)(session);
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
/* 51 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const config_1 = __webpack_require__(3);
const mongoose = __webpack_require__(8);
const autoIncrement = __webpack_require__(54);
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
/* 54 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const user_model_1 = __webpack_require__(9);
const passport = __webpack_require__(11);
const LocalStrategy = __webpack_require__(58).Strategy;
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
/* 56 */
/***/ (function(module, exports) {

module.exports = require("passport-local-mongoose");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const router = express.Router();
module.exports = router;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(0);
const user_ctrl_1 = __webpack_require__(61);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __webpack_require__(10);
const user_model_1 = __webpack_require__(9);
const passport = __webpack_require__(11);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = __webpack_require__(2);
const gzipStatic = __webpack_require__(63);
const router = __webpack_require__(0).Router();
router.get('*.*', gzipStatic(files_1.Folders.dist));
router.get('*', (req, res) => {
    res.render('index', { req, res });
});
module.exports = router;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("connect-gzip-static");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(7);
const config_1 = __webpack_require__(3);
const http = __webpack_require__(65);
const cluster = __webpack_require__(66);
const debug = __webpack_require__(67)('www.deskvibe.co:server');
module.exports = app => {
    console.log('Initializing Server');
    const port = utils_1.Utils.normalizePort(process.env.PORT || config_1.Config.port || '3000');
    const server = http.createServer(app);
    const numCPUs = process.env.WEB_CONCURRENCY || __webpack_require__(68).cpus().length;
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
/* 65 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ })
/******/ ]);