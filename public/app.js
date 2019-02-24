(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/fn/regexp/escape":2,"core-js/shim":325,"regenerator-runtime/runtime":326}],2:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/_core":23,"../../modules/core.regexp.escape":128}],3:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],4:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":18}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":42,"./_wks":126}],6:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":51}],8:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-absolute-index":111,"./_to-length":115,"./_to-object":116}],9:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-absolute-index":111,"./_to-length":115,"./_to-object":116}],10:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":39}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":111,"./_to-iobject":114,"./_to-length":115}],12:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":15,"./_ctx":25,"./_iobject":47,"./_to-length":115,"./_to-object":116}],13:[function(require,module,exports){
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":3,"./_iobject":47,"./_to-length":115,"./_to-object":116}],14:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":49,"./_is-object":51,"./_wks":126}],15:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":14}],16:[function(require,module,exports){
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":3,"./_invoke":46,"./_is-object":51}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":18,"./_wks":126}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],19:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_an-instance":6,"./_ctx":25,"./_descriptors":29,"./_for-of":39,"./_iter-define":55,"./_iter-step":57,"./_meta":65,"./_object-create":70,"./_object-dp":71,"./_redefine-all":90,"./_set-species":97,"./_validate-collection":123}],20:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":10,"./_classof":17}],21:[function(require,module,exports){
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_an-instance":6,"./_an-object":7,"./_array-methods":12,"./_for-of":39,"./_has":41,"./_is-object":51,"./_meta":65,"./_redefine-all":90,"./_validate-collection":123}],22:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":6,"./_export":33,"./_fails":35,"./_for-of":39,"./_global":40,"./_inherit-if-required":45,"./_is-object":51,"./_iter-detect":56,"./_meta":65,"./_redefine":91,"./_redefine-all":90,"./_set-to-string-tag":98}],23:[function(require,module,exports){
var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],24:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":71,"./_property-desc":89}],25:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":3}],26:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":35}],27:[function(require,module,exports){
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":7,"./_to-primitive":117}],28:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],29:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":35}],30:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":40,"./_is-object":51}],31:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],32:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":77,"./_object-keys":80,"./_object-pie":81}],33:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":23,"./_ctx":25,"./_global":40,"./_hide":42,"./_redefine":91}],34:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":126}],35:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],36:[function(require,module,exports){
'use strict';
var hide = require('./_hide');
var redefine = require('./_redefine');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":28,"./_fails":35,"./_hide":42,"./_redefine":91,"./_wks":126}],37:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":7}],38:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_ctx":25,"./_is-array":49,"./_is-object":51,"./_to-length":115,"./_wks":126}],39:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":7,"./_ctx":25,"./_is-array-iter":48,"./_iter-call":53,"./_to-length":115,"./core.get-iterator-method":127}],40:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],41:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],42:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":29,"./_object-dp":71,"./_property-desc":89}],43:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":40}],44:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":29,"./_dom-create":30,"./_fails":35}],45:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":51,"./_set-proto":96}],46:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],47:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":18}],48:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":58,"./_wks":126}],49:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":18}],50:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":51}],51:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],52:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":18,"./_is-object":51,"./_wks":126}],53:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":7}],54:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":42,"./_object-create":70,"./_property-desc":89,"./_set-to-string-tag":98,"./_wks":126}],55:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":33,"./_hide":42,"./_iter-create":54,"./_iterators":58,"./_library":59,"./_object-gpo":78,"./_redefine":91,"./_set-to-string-tag":98,"./_wks":126}],56:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":126}],57:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],58:[function(require,module,exports){
module.exports = {};

},{}],59:[function(require,module,exports){
module.exports = false;

},{}],60:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],61:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":64}],62:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],63:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],64:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],65:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":35,"./_has":41,"./_is-object":51,"./_object-dp":71,"./_uid":121}],66:[function(require,module,exports){
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./_export":33,"./_shared":100,"./es6.map":158,"./es6.weak-map":264}],67:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":18,"./_global":40,"./_task":110}],68:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":3}],69:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":35,"./_iobject":47,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_to-object":116}],70:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":7,"./_dom-create":30,"./_enum-bug-keys":31,"./_html":43,"./_object-dps":72,"./_shared-key":99}],71:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":7,"./_descriptors":29,"./_ie8-dom-define":44,"./_to-primitive":117}],72:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":7,"./_descriptors":29,"./_object-dp":71,"./_object-keys":80}],73:[function(require,module,exports){
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_fails":35,"./_global":40,"./_library":59}],74:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":29,"./_has":41,"./_ie8-dom-define":44,"./_object-pie":81,"./_property-desc":89,"./_to-iobject":114,"./_to-primitive":117}],75:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":76,"./_to-iobject":114}],76:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":31,"./_object-keys-internal":79}],77:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],78:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":41,"./_shared-key":99,"./_to-object":116}],79:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":11,"./_has":41,"./_shared-key":99,"./_to-iobject":114}],80:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":31,"./_object-keys-internal":79}],81:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],82:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":23,"./_export":33,"./_fails":35}],83:[function(require,module,exports){
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":80,"./_object-pie":81,"./_to-iobject":114}],84:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_an-object":7,"./_global":40,"./_object-gopn":76,"./_object-gops":77}],85:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":40,"./_string-trim":108,"./_string-ws":109}],86:[function(require,module,exports){
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":40,"./_string-trim":108,"./_string-ws":109}],87:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],88:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":7,"./_is-object":51,"./_new-promise-capability":68}],89:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],90:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":91}],91:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":23,"./_global":40,"./_has":41,"./_hide":42,"./_uid":121}],92:[function(require,module,exports){
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],93:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],94:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":3,"./_ctx":25,"./_export":33,"./_for-of":39}],95:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":33}],96:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":7,"./_ctx":25,"./_is-object":51,"./_object-gopd":74}],97:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":29,"./_global":40,"./_object-dp":71,"./_wks":126}],98:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":41,"./_object-dp":71,"./_wks":126}],99:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":100,"./_uid":121}],100:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":23,"./_global":40,"./_library":59}],101:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":3,"./_an-object":7,"./_wks":126}],102:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":35}],103:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":28,"./_to-integer":113}],104:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":28,"./_is-regexp":52}],105:[function(require,module,exports){
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_defined":28,"./_export":33,"./_fails":35}],106:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":28,"./_string-repeat":107,"./_to-length":115}],107:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_defined":28,"./_to-integer":113}],108:[function(require,module,exports){
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_defined":28,"./_export":33,"./_fails":35,"./_string-ws":109}],109:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],110:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":18,"./_ctx":25,"./_dom-create":30,"./_global":40,"./_html":43,"./_invoke":46}],111:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":113}],112:[function(require,module,exports){
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":113,"./_to-length":115}],113:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],114:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":28,"./_iobject":47}],115:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":113}],116:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":28}],117:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":51}],118:[function(require,module,exports){
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_an-instance":6,"./_array-copy-within":8,"./_array-fill":9,"./_array-includes":11,"./_array-methods":12,"./_classof":17,"./_ctx":25,"./_descriptors":29,"./_export":33,"./_fails":35,"./_global":40,"./_has":41,"./_hide":42,"./_is-array-iter":48,"./_is-object":51,"./_iter-detect":56,"./_iterators":58,"./_library":59,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_object-gpo":78,"./_property-desc":89,"./_redefine-all":90,"./_set-species":97,"./_species-constructor":101,"./_to-absolute-index":111,"./_to-index":112,"./_to-integer":113,"./_to-length":115,"./_to-object":116,"./_to-primitive":117,"./_typed":120,"./_typed-buffer":119,"./_uid":121,"./_wks":126,"./core.get-iterator-method":127,"./es6.array.iterator":139}],119:[function(require,module,exports){
'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_an-instance":6,"./_array-fill":9,"./_descriptors":29,"./_fails":35,"./_global":40,"./_hide":42,"./_library":59,"./_object-dp":71,"./_object-gopn":76,"./_redefine-all":90,"./_set-to-string-tag":98,"./_to-index":112,"./_to-integer":113,"./_to-length":115,"./_typed":120}],120:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":40,"./_hide":42,"./_uid":121}],121:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],122:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":40}],123:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":51}],124:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":23,"./_global":40,"./_library":59,"./_object-dp":71,"./_wks-ext":125}],125:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":126}],126:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":40,"./_shared":100,"./_uid":121}],127:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":17,"./_core":23,"./_iterators":58,"./_wks":126}],128:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":33,"./_replacer":92}],129:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_add-to-unscopables":5,"./_array-copy-within":8,"./_export":33}],130:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],131:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_add-to-unscopables":5,"./_array-fill":9,"./_export":33}],132:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],133:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":33}],134:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":33}],135:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],136:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":24,"./_ctx":25,"./_export":33,"./_is-array-iter":48,"./_iter-call":53,"./_iter-detect":56,"./_to-length":115,"./_to-object":116,"./core.get-iterator-method":127}],137:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_array-includes":11,"./_export":33,"./_strict-method":102}],138:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":33,"./_is-array":49}],139:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":5,"./_iter-define":55,"./_iter-step":57,"./_iterators":58,"./_to-iobject":114}],140:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":33,"./_iobject":47,"./_strict-method":102,"./_to-iobject":114}],141:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":33,"./_strict-method":102,"./_to-integer":113,"./_to-iobject":114,"./_to-length":115}],142:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],143:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_create-property":24,"./_export":33,"./_fails":35}],144:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_array-reduce":13,"./_export":33,"./_strict-method":102}],145:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_array-reduce":13,"./_export":33,"./_strict-method":102}],146:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_cof":18,"./_export":33,"./_fails":35,"./_html":43,"./_to-absolute-index":111,"./_to-length":115}],147:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],148:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":3,"./_export":33,"./_fails":35,"./_strict-method":102,"./_to-object":116}],149:[function(require,module,exports){
require('./_set-species')('Array');

},{"./_set-species":97}],150:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":33}],151:[function(require,module,exports){
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_date-to-iso-string":26,"./_export":33}],152:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":33,"./_fails":35,"./_to-object":116,"./_to-primitive":117}],153:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_date-to-primitive":27,"./_hide":42,"./_wks":126}],154:[function(require,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":91}],155:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_bind":16,"./_export":33}],156:[function(require,module,exports){
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":51,"./_object-dp":71,"./_object-gpo":78,"./_wks":126}],157:[function(require,module,exports){
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_descriptors":29,"./_object-dp":71}],158:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection":22,"./_collection-strong":19,"./_validate-collection":123}],159:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":33,"./_math-log1p":62}],160:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":33}],161:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":33}],162:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":33,"./_math-sign":64}],163:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":33}],164:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":33}],165:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":33,"./_math-expm1":60}],166:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":33,"./_math-fround":61}],167:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":33}],168:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":33,"./_fails":35}],169:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":33}],170:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":33,"./_math-log1p":62}],171:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":33}],172:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":33,"./_math-sign":64}],173:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":33,"./_fails":35,"./_math-expm1":60}],174:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":33,"./_math-expm1":60}],175:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":33}],176:[function(require,module,exports){
'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_cof":18,"./_descriptors":29,"./_fails":35,"./_global":40,"./_has":41,"./_inherit-if-required":45,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_redefine":91,"./_string-trim":108,"./_to-primitive":117}],177:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":33}],178:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":33,"./_global":40}],179:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":33,"./_is-integer":50}],180:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":33}],181:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":33,"./_is-integer":50}],182:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":33}],183:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":33}],184:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":33,"./_parse-float":85}],185:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":33,"./_parse-int":86}],186:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_a-number-value":4,"./_export":33,"./_fails":35,"./_string-repeat":107,"./_to-integer":113}],187:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_a-number-value":4,"./_export":33,"./_fails":35}],188:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":33,"./_object-assign":69}],189:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":33,"./_object-create":70}],190:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_descriptors":29,"./_export":33,"./_object-dps":72}],191:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":29,"./_export":33,"./_object-dp":71}],192:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],193:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_object-gopd":74,"./_object-sap":82,"./_to-iobject":114}],194:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-gopn-ext":75,"./_object-sap":82}],195:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_object-gpo":78,"./_object-sap":82,"./_to-object":116}],196:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":51,"./_object-sap":82}],197:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":51,"./_object-sap":82}],198:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":51,"./_object-sap":82}],199:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":33,"./_same-value":93}],200:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":80,"./_object-sap":82,"./_to-object":116}],201:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],202:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],203:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":33,"./_set-proto":96}],204:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":17,"./_redefine":91,"./_wks":126}],205:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":33,"./_parse-float":85}],206:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":33,"./_parse-int":86}],207:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":3,"./_an-instance":6,"./_classof":17,"./_core":23,"./_ctx":25,"./_export":33,"./_for-of":39,"./_global":40,"./_is-object":51,"./_iter-detect":56,"./_library":59,"./_microtask":67,"./_new-promise-capability":68,"./_perform":87,"./_promise-resolve":88,"./_redefine-all":90,"./_set-species":97,"./_set-to-string-tag":98,"./_species-constructor":101,"./_task":110,"./_user-agent":122,"./_wks":126}],208:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_a-function":3,"./_an-object":7,"./_export":33,"./_fails":35,"./_global":40}],209:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_a-function":3,"./_an-object":7,"./_bind":16,"./_export":33,"./_fails":35,"./_global":40,"./_is-object":51,"./_object-create":70}],210:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":7,"./_export":33,"./_fails":35,"./_object-dp":71,"./_to-primitive":117}],211:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gopd":74}],212:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_an-object":7,"./_export":33,"./_iter-create":54}],213:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gopd":74}],214:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gpo":78}],215:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_an-object":7,"./_export":33,"./_has":41,"./_is-object":51,"./_object-gopd":74,"./_object-gpo":78}],216:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":33}],217:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_an-object":7,"./_export":33}],218:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":33,"./_own-keys":84}],219:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":7,"./_export":33}],220:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":33,"./_set-proto":96}],221:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_an-object":7,"./_export":33,"./_has":41,"./_is-object":51,"./_object-dp":71,"./_object-gopd":74,"./_object-gpo":78,"./_property-desc":89}],222:[function(require,module,exports){
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_descriptors":29,"./_fails":35,"./_flags":37,"./_global":40,"./_inherit-if-required":45,"./_is-regexp":52,"./_object-dp":71,"./_object-gopn":76,"./_redefine":91,"./_set-species":97,"./_wks":126}],223:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":29,"./_flags":37,"./_object-dp":71}],224:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"./_fix-re-wks":36}],225:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

},{"./_fix-re-wks":36}],226:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

},{"./_fix-re-wks":36}],227:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = require('./_is-regexp');
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

},{"./_fix-re-wks":36,"./_is-regexp":52}],228:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":7,"./_descriptors":29,"./_fails":35,"./_flags":37,"./_redefine":91,"./es6.regexp.flags":223}],229:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":22,"./_collection-strong":19,"./_validate-collection":123}],230:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":105}],231:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":105}],232:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":105}],233:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":105}],234:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":33,"./_string-at":103}],235:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104,"./_to-length":115}],236:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":105}],237:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":105}],238:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":105}],239:[function(require,module,exports){
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":33,"./_to-absolute-index":111}],240:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104}],241:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":105}],242:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":55,"./_string-at":103}],243:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":105}],244:[function(require,module,exports){
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":33,"./_to-iobject":114,"./_to-length":115}],245:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":33,"./_string-repeat":107}],246:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":105}],247:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104,"./_to-length":115}],248:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":105}],249:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":105}],250:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":105}],251:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":108}],252:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":7,"./_descriptors":29,"./_enum-keys":32,"./_export":33,"./_fails":35,"./_global":40,"./_has":41,"./_hide":42,"./_is-array":49,"./_is-object":51,"./_library":59,"./_meta":65,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_object-gopn-ext":75,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_property-desc":89,"./_redefine":91,"./_set-to-string-tag":98,"./_shared":100,"./_to-iobject":114,"./_to-primitive":117,"./_uid":121,"./_wks":126,"./_wks-define":124,"./_wks-ext":125}],253:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_an-object":7,"./_export":33,"./_fails":35,"./_global":40,"./_is-object":51,"./_set-species":97,"./_species-constructor":101,"./_to-absolute-index":111,"./_to-length":115,"./_typed":120,"./_typed-buffer":119}],254:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":33,"./_typed":120,"./_typed-buffer":119}],255:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],256:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],257:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],258:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],259:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],260:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],261:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],262:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],263:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":118}],264:[function(require,module,exports){
'use strict';
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var fails = require('./_fails');
var validate = require('./_validate-collection');
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_array-methods":12,"./_collection":22,"./_collection-weak":21,"./_fails":35,"./_is-object":51,"./_meta":65,"./_object-assign":69,"./_redefine":91,"./_validate-collection":123}],265:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection":22,"./_collection-weak":21,"./_validate-collection":123}],266:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_a-function":3,"./_add-to-unscopables":5,"./_array-species-create":15,"./_export":33,"./_flatten-into-array":38,"./_to-length":115,"./_to-object":116}],267:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_add-to-unscopables":5,"./_array-species-create":15,"./_export":33,"./_flatten-into-array":38,"./_to-integer":113,"./_to-length":115,"./_to-object":116}],268:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_add-to-unscopables":5,"./_array-includes":11,"./_export":33}],269:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_cof":18,"./_export":33,"./_global":40,"./_microtask":67}],270:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_cof":18,"./_export":33}],271:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":33,"./_global":40}],272:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":94}],273:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":95}],274:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_collection-to-json":20,"./_export":33}],275:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":33}],276:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":33}],277:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":33}],278:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":33,"./_math-fround":61,"./_math-scale":63}],279:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":33}],280:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":33}],281:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":33}],282:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":33}],283:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":33}],284:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":33,"./_math-scale":63}],285:[function(require,module,exports){
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":33}],286:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":33}],287:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":3,"./_descriptors":29,"./_export":33,"./_object-dp":71,"./_object-forced-pam":73,"./_to-object":116}],288:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":3,"./_descriptors":29,"./_export":33,"./_object-dp":71,"./_object-forced-pam":73,"./_to-object":116}],289:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":33,"./_object-to-array":83}],290:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_create-property":24,"./_export":33,"./_object-gopd":74,"./_own-keys":84,"./_to-iobject":114}],291:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":73,"./_object-gopd":74,"./_object-gpo":78,"./_to-object":116,"./_to-primitive":117}],292:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":73,"./_object-gopd":74,"./_object-gpo":78,"./_to-object":116,"./_to-primitive":117}],293:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":33,"./_object-to-array":83}],294:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_core":23,"./_export":33,"./_for-of":39,"./_global":40,"./_hide":42,"./_microtask":67,"./_redefine-all":90,"./_set-species":97,"./_wks":126}],295:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":23,"./_export":33,"./_global":40,"./_promise-resolve":88,"./_species-constructor":101}],296:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":33,"./_new-promise-capability":68,"./_perform":87}],297:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_an-object":7,"./_metadata":66}],298:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_an-object":7,"./_metadata":66}],299:[function(require,module,exports){
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":7,"./_array-from-iterable":10,"./_metadata":66,"./_object-gpo":78,"./es6.set":229}],300:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66,"./_object-gpo":78}],301:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":7,"./_metadata":66}],302:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66}],303:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66,"./_object-gpo":78}],304:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66}],305:[function(require,module,exports){
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_a-function":3,"./_an-object":7,"./_metadata":66}],306:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":94}],307:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":95}],308:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":20,"./_export":33}],309:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":33,"./_string-at":103}],310:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_defined":28,"./_export":33,"./_flags":37,"./_is-regexp":52,"./_iter-create":54,"./_to-length":115}],311:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":33,"./_string-pad":106,"./_user-agent":122}],312:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":33,"./_string-pad":106,"./_user-agent":122}],313:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":108}],314:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":108}],315:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":124}],316:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":124}],317:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":33,"./_global":40}],318:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":94}],319:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":95}],320:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":94}],321:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":95}],322:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":40,"./_hide":42,"./_iterators":58,"./_object-keys":80,"./_redefine":91,"./_wks":126,"./es6.array.iterator":139}],323:[function(require,module,exports){
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":33,"./_task":110}],324:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_export":33,"./_global":40,"./_user-agent":122}],325:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/_core":23,"./modules/es6.array.copy-within":129,"./modules/es6.array.every":130,"./modules/es6.array.fill":131,"./modules/es6.array.filter":132,"./modules/es6.array.find":134,"./modules/es6.array.find-index":133,"./modules/es6.array.for-each":135,"./modules/es6.array.from":136,"./modules/es6.array.index-of":137,"./modules/es6.array.is-array":138,"./modules/es6.array.iterator":139,"./modules/es6.array.join":140,"./modules/es6.array.last-index-of":141,"./modules/es6.array.map":142,"./modules/es6.array.of":143,"./modules/es6.array.reduce":145,"./modules/es6.array.reduce-right":144,"./modules/es6.array.slice":146,"./modules/es6.array.some":147,"./modules/es6.array.sort":148,"./modules/es6.array.species":149,"./modules/es6.date.now":150,"./modules/es6.date.to-iso-string":151,"./modules/es6.date.to-json":152,"./modules/es6.date.to-primitive":153,"./modules/es6.date.to-string":154,"./modules/es6.function.bind":155,"./modules/es6.function.has-instance":156,"./modules/es6.function.name":157,"./modules/es6.map":158,"./modules/es6.math.acosh":159,"./modules/es6.math.asinh":160,"./modules/es6.math.atanh":161,"./modules/es6.math.cbrt":162,"./modules/es6.math.clz32":163,"./modules/es6.math.cosh":164,"./modules/es6.math.expm1":165,"./modules/es6.math.fround":166,"./modules/es6.math.hypot":167,"./modules/es6.math.imul":168,"./modules/es6.math.log10":169,"./modules/es6.math.log1p":170,"./modules/es6.math.log2":171,"./modules/es6.math.sign":172,"./modules/es6.math.sinh":173,"./modules/es6.math.tanh":174,"./modules/es6.math.trunc":175,"./modules/es6.number.constructor":176,"./modules/es6.number.epsilon":177,"./modules/es6.number.is-finite":178,"./modules/es6.number.is-integer":179,"./modules/es6.number.is-nan":180,"./modules/es6.number.is-safe-integer":181,"./modules/es6.number.max-safe-integer":182,"./modules/es6.number.min-safe-integer":183,"./modules/es6.number.parse-float":184,"./modules/es6.number.parse-int":185,"./modules/es6.number.to-fixed":186,"./modules/es6.number.to-precision":187,"./modules/es6.object.assign":188,"./modules/es6.object.create":189,"./modules/es6.object.define-properties":190,"./modules/es6.object.define-property":191,"./modules/es6.object.freeze":192,"./modules/es6.object.get-own-property-descriptor":193,"./modules/es6.object.get-own-property-names":194,"./modules/es6.object.get-prototype-of":195,"./modules/es6.object.is":199,"./modules/es6.object.is-extensible":196,"./modules/es6.object.is-frozen":197,"./modules/es6.object.is-sealed":198,"./modules/es6.object.keys":200,"./modules/es6.object.prevent-extensions":201,"./modules/es6.object.seal":202,"./modules/es6.object.set-prototype-of":203,"./modules/es6.object.to-string":204,"./modules/es6.parse-float":205,"./modules/es6.parse-int":206,"./modules/es6.promise":207,"./modules/es6.reflect.apply":208,"./modules/es6.reflect.construct":209,"./modules/es6.reflect.define-property":210,"./modules/es6.reflect.delete-property":211,"./modules/es6.reflect.enumerate":212,"./modules/es6.reflect.get":215,"./modules/es6.reflect.get-own-property-descriptor":213,"./modules/es6.reflect.get-prototype-of":214,"./modules/es6.reflect.has":216,"./modules/es6.reflect.is-extensible":217,"./modules/es6.reflect.own-keys":218,"./modules/es6.reflect.prevent-extensions":219,"./modules/es6.reflect.set":221,"./modules/es6.reflect.set-prototype-of":220,"./modules/es6.regexp.constructor":222,"./modules/es6.regexp.flags":223,"./modules/es6.regexp.match":224,"./modules/es6.regexp.replace":225,"./modules/es6.regexp.search":226,"./modules/es6.regexp.split":227,"./modules/es6.regexp.to-string":228,"./modules/es6.set":229,"./modules/es6.string.anchor":230,"./modules/es6.string.big":231,"./modules/es6.string.blink":232,"./modules/es6.string.bold":233,"./modules/es6.string.code-point-at":234,"./modules/es6.string.ends-with":235,"./modules/es6.string.fixed":236,"./modules/es6.string.fontcolor":237,"./modules/es6.string.fontsize":238,"./modules/es6.string.from-code-point":239,"./modules/es6.string.includes":240,"./modules/es6.string.italics":241,"./modules/es6.string.iterator":242,"./modules/es6.string.link":243,"./modules/es6.string.raw":244,"./modules/es6.string.repeat":245,"./modules/es6.string.small":246,"./modules/es6.string.starts-with":247,"./modules/es6.string.strike":248,"./modules/es6.string.sub":249,"./modules/es6.string.sup":250,"./modules/es6.string.trim":251,"./modules/es6.symbol":252,"./modules/es6.typed.array-buffer":253,"./modules/es6.typed.data-view":254,"./modules/es6.typed.float32-array":255,"./modules/es6.typed.float64-array":256,"./modules/es6.typed.int16-array":257,"./modules/es6.typed.int32-array":258,"./modules/es6.typed.int8-array":259,"./modules/es6.typed.uint16-array":260,"./modules/es6.typed.uint32-array":261,"./modules/es6.typed.uint8-array":262,"./modules/es6.typed.uint8-clamped-array":263,"./modules/es6.weak-map":264,"./modules/es6.weak-set":265,"./modules/es7.array.flat-map":266,"./modules/es7.array.flatten":267,"./modules/es7.array.includes":268,"./modules/es7.asap":269,"./modules/es7.error.is-error":270,"./modules/es7.global":271,"./modules/es7.map.from":272,"./modules/es7.map.of":273,"./modules/es7.map.to-json":274,"./modules/es7.math.clamp":275,"./modules/es7.math.deg-per-rad":276,"./modules/es7.math.degrees":277,"./modules/es7.math.fscale":278,"./modules/es7.math.iaddh":279,"./modules/es7.math.imulh":280,"./modules/es7.math.isubh":281,"./modules/es7.math.rad-per-deg":282,"./modules/es7.math.radians":283,"./modules/es7.math.scale":284,"./modules/es7.math.signbit":285,"./modules/es7.math.umulh":286,"./modules/es7.object.define-getter":287,"./modules/es7.object.define-setter":288,"./modules/es7.object.entries":289,"./modules/es7.object.get-own-property-descriptors":290,"./modules/es7.object.lookup-getter":291,"./modules/es7.object.lookup-setter":292,"./modules/es7.object.values":293,"./modules/es7.observable":294,"./modules/es7.promise.finally":295,"./modules/es7.promise.try":296,"./modules/es7.reflect.define-metadata":297,"./modules/es7.reflect.delete-metadata":298,"./modules/es7.reflect.get-metadata":300,"./modules/es7.reflect.get-metadata-keys":299,"./modules/es7.reflect.get-own-metadata":302,"./modules/es7.reflect.get-own-metadata-keys":301,"./modules/es7.reflect.has-metadata":303,"./modules/es7.reflect.has-own-metadata":304,"./modules/es7.reflect.metadata":305,"./modules/es7.set.from":306,"./modules/es7.set.of":307,"./modules/es7.set.to-json":308,"./modules/es7.string.at":309,"./modules/es7.string.match-all":310,"./modules/es7.string.pad-end":311,"./modules/es7.string.pad-start":312,"./modules/es7.string.trim-left":313,"./modules/es7.string.trim-right":314,"./modules/es7.symbol.async-iterator":315,"./modules/es7.symbol.observable":316,"./modules/es7.system.global":317,"./modules/es7.weak-map.from":318,"./modules/es7.weak-map.of":319,"./modules/es7.weak-set.from":320,"./modules/es7.weak-set.of":321,"./modules/web.dom.iterable":322,"./modules/web.immediate":323,"./modules/web.timers":324}],326:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],327:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":331,"hyperx":334,"on-load":337}],328:[function(require,module,exports){

},{}],329:[function(require,module,exports){
arguments[4][328][0].apply(exports,arguments)
},{"dup":328}],330:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],331:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":328}],332:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],333:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],334:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":333}],335:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                                }

                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],336:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],337:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":336,"global/document":331,"global/window":332}],338:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":339,"bel":327,"morphdom":335}],339:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],340:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inicio = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div>\n            <div class="row">\n                ', '\n            </div>\n        </div>'], ['\n        <div>\n            <div class="row">\n                ', '\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral([' \n                        <div class="col m3"> \n                            <div class="card-container manual-flip">\n                                <div class="card card-custom">\n                                    <div class="front" title="', '">\n                                        <div class="header">\n                                            <h5 class="motto">Punto de Venta</h5>\n                                        </div>\n                                        \n                                        <div class="content">\n                                            <div class="main">\n                                                ', '\n                                                <h3 class="name">', '</h3>\n                                                <p class="center white-text">', '</p>\n                                            </div>\n                                            <div id=', ' class="footer" style="cursor:pointer" onclick=', '>\n                                                Ver Detalles                                \n                                            </div>\n                                        </div>\n                                    </div> \n                                    <div class="back" title="', '">\n                                        <div class="header">\n                                            <h5 class="motto">Descripci\xF3n</h5>\n                                        </div>\n                                        <div class="content">\n                                            <div class="main">\n                                                <div class="row" style="display:none">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">receipt</i> Comprobante</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">print</i> Imprimir voucher</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect  yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">format_list_bulleted</i> Detalles</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">check_circle</i> Terminar cuenta</a>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class="footer" style="cursor:pointer" onclick=', '>\n                                                Atras\n                                            </div>\n                                        </div>\n                                    </div>  \n                                </div> \n                            </div>\n                        </div>\n                        '], [' \n                        <div class="col m3"> \n                            <div class="card-container manual-flip">\n                                <div class="card card-custom">\n                                    <div class="front" title="', '">\n                                        <div class="header">\n                                            <h5 class="motto">Punto de Venta</h5>\n                                        </div>\n                                        \n                                        <div class="content">\n                                            <div class="main">\n                                                ', '\n                                                <h3 class="name">', '</h3>\n                                                <p class="center white-text">', '</p>\n                                            </div>\n                                            <div id=', ' class="footer" style="cursor:pointer" onclick=', '>\n                                                Ver Detalles                                \n                                            </div>\n                                        </div>\n                                    </div> \n                                    <div class="back" title="', '">\n                                        <div class="header">\n                                            <h5 class="motto">Descripci\xF3n</h5>\n                                        </div>\n                                        <div class="content">\n                                            <div class="main">\n                                                <div class="row" style="display:none">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">receipt</i> Comprobante</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">print</i> Imprimir voucher</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect  yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">format_list_bulleted</i> Detalles</a>\n                                                    </div>\n                                                </div>\n                                                <div class="row">\n                                                    <div class="col m12">\n                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=', '><i class="material-icons left">check_circle</i> Terminar cuenta</a>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class="footer" style="cursor:pointer" onclick=', '>\n                                                Atras\n                                            </div>\n                                        </div>\n                                    </div>  \n                                </div> \n                            </div>\n                        </div>\n                        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                                                    <div class="yellow ball-animation" style="text-align: -webkit-center;text-align: center;">\n                                                        <h4 style="display:inline-block;">', '</h4>\n                                                    </div>'], ['\n                                                    <div class="yellow ball-animation" style="text-align: -webkit-center;text-align: center;">\n                                                        <h4 style="display:inline-block;">', '</h4>\n                                                    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                                                    <div class="yellow ball" style="text-align: -webkit-center;text-align: center;">\n                                                        <h4 style="display:inline-block;"><i class="material-icons">airplay</i></h4>\n                                                    </div>'], ['\n                                                    <div class="yellow ball" style="text-align: -webkit-center;text-align: center;">\n                                                        <h4 style="display:inline-block;"><i class="material-icons">airplay</i></h4>\n                                                    </div>']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las mesas</a>\n    </div>'], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las mesas</a>\n    </div>']),
    _templateObject6 = _taggedTemplateLiteral(['\n    <div class="card">\n        <div class="card-content">\n            <span class="card-title center">Detalle de la cuenta ', ' - ', '</span> \n            <div class="row">\n                <div class="col m6">\n                    <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">\n                        <div class="stackedcards-container">\n\n                        ', '\n                       \n        \n                        </div>\n                        <div class="stackedcards--animatable stackedcards-overlay top"><img src="assets/img/check.png"  width="auto" height="auto"/></div>\n                        \n                        <div class="stackedcards--animatable stackedcards-overlay left"><img src="assets/img/close.png" width="auto" height="auto"/></div>\n                    </div>\n                \n                </div>\n                <div class="col m6">\n                    <div class="row center">\n                        <strong><h5 class="header">Platillos y/o bebidas</h5></strong>\n                    </div>\n                    <div class="row" id="listaDetalles">\n                        <ul class="collapsible" data-collapsible="expandable">\n                            ', '\n\n                            <li>\n                                <div class="collapsible-header" style="display: table;width: 100%;"> \n                                    <a href="javascript:void();" class="collection-item right-align right">\n                                        Total : ', ' ', '\n                                    </a>  \n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>              \n        </div> \n    </div>'], ['\n    <div class="card">\n        <div class="card-content">\n            <span class="card-title center">Detalle de la cuenta ', ' - ', '</span> \n            <div class="row">\n                <div class="col m6">\n                    <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">\n                        <div class="stackedcards-container">\n\n                        ', '\n                       \n        \n                        </div>\n                        <div class="stackedcards--animatable stackedcards-overlay top"><img src="assets/img/check.png"  width="auto" height="auto"/></div>\n                        \n                        <div class="stackedcards--animatable stackedcards-overlay left"><img src="assets/img/close.png" width="auto" height="auto"/></div>\n                    </div>\n                \n                </div>\n                <div class="col m6">\n                    <div class="row center">\n                        <strong><h5 class="header">Platillos y/o bebidas</h5></strong>\n                    </div>\n                    <div class="row" id="listaDetalles">\n                        <ul class="collapsible" data-collapsible="expandable">\n                            ', '\n\n                            <li>\n                                <div class="collapsible-header" style="display: table;width: 100%;"> \n                                    <a href="javascript:void();" class="collection-item right-align right">\n                                        Total : ', ' ', '\n                                    </a>  \n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>              \n        </div> \n    </div>']),
    _templateObject7 = _taggedTemplateLiteral(['\n                                <div class="card" id="', '">\n                                    <div class="card-image">\n                                        <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                        <span class="card-title">', '</span>\n                                        <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none" onclick=', '><i class="material-icons">check</i></a>\n                                    </div> \n                                    <div class="card-content">\n                                        <br>\n                                        <div class="row center">\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                            </div>\n                                            <div class="col m4 s4">\n                                                <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;" onkeyup=', '  onchange=', '> \n                                            </div>\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                            </div>\n                                        </div>\n                                        <div class="row center">\n                                            <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                <i class="material-icons left">save</i>\n                                            </button>\n                                        </div>\n                                    </div> \n                                </div>'], ['\n                                <div class="card" id="', '">\n                                    <div class="card-image">\n                                        <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                        <span class="card-title">', '</span>\n                                        <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none" onclick=', '><i class="material-icons">check</i></a>\n                                    </div> \n                                    <div class="card-content">\n                                        <br>\n                                        <div class="row center">\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                            </div>\n                                            <div class="col m4 s4">\n                                                <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;" onkeyup=', '  onchange=', '> \n                                            </div>\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                            </div>\n                                        </div>\n                                        <div class="row center">\n                                            <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                <i class="material-icons left">save</i>\n                                            </button>\n                                        </div>\n                                    </div> \n                                </div>']),
    _templateObject8 = _taggedTemplateLiteral(['\n                                <div class="card" id="', '">\n                                    <div class="card-image">\n                                        <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                        <span class="card-title">', '</span>\n                                        <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                                    </div> \n                                    <div class="card-content">\n                                        <div class="row center">\n                                                ', '\n                                        </div>\n                                        <div class="row center">\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                            </div>\n                                            <div class="col m4 s4">\n                                                <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                                            </div>\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                            </div>\n                                        </div>\n                                        <div class="row center">\n                                            <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                <i class="material-icons left">save</i>\n                                            </button>\n                                        </div>\n                                    </div> \n                                </div>\n                                '], ['\n                                <div class="card" id="', '">\n                                    <div class="card-image">\n                                        <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                        <span class="card-title">', '</span>\n                                        <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                                    </div> \n                                    <div class="card-content">\n                                        <div class="row center">\n                                                ', '\n                                        </div>\n                                        <div class="row center">\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                            </div>\n                                            <div class="col m4 s4">\n                                                <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                                            </div>\n                                            <div class="col m4 s4">\n                                                <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                            </div>\n                                        </div>\n                                        <div class="row center">\n                                            <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                <i class="material-icons left">save</i>\n                                            </button>\n                                        </div>\n                                    </div> \n                                </div>\n                                ']),
    _templateObject9 = _taggedTemplateLiteral([''], ['']),
    _templateObject10 = _taggedTemplateLiteral(['\n                                    <div class="card" id="', '">\n                                        <div class="card-image">\n                                            <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                            <span class="card-title">', '</span>\n                                            <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                            <a class="btn-floating btn-large halfway-fab waves-effect waves-light green"  style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                                        </div> \n                                        <div class="card-content">\n                                            <br>\n                                            <div class="row center">\n                                                <div class="col m4 s4">\n                                                    <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                                </div>\n                                                <div class="col m4 s4">\n                                                    <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                                                </div>\n                                                <div class="col m4 s4">\n                                                    <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                                </div>\n                                            </div>\n                                            <div class="row center">\n                                                <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                    <i class="material-icons left">save</i>\n                                                </button>\n                                            </div>\n                                        </div> \n                                    </div>'], ['\n                                    <div class="card" id="', '">\n                                        <div class="card-image">\n                                            <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                                            <span class="card-title">', '</span>\n                                            <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                                            <a class="btn-floating btn-large halfway-fab waves-effect waves-light green"  style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                                        </div> \n                                        <div class="card-content">\n                                            <br>\n                                            <div class="row center">\n                                                <div class="col m4 s4">\n                                                    <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                                                </div>\n                                                <div class="col m4 s4">\n                                                    <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                                                </div>\n                                                <div class="col m4 s4">\n                                                    <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                                                </div>\n                                            </div>\n                                            <div class="row center">\n                                                <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                                                    <i class="material-icons left">save</i>\n                                                </button>\n                                            </div>\n                                        </div> \n                                    </div>']),
    _templateObject11 = _taggedTemplateLiteral(['\n                                    <li>  \n                                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                        </div>\n                                    </li>'], ['\n                                    <li>  \n                                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                        </div>\n                                    </li>']),
    _templateObject12 = _taggedTemplateLiteral(['\n                                    <li>\n                                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                        </div>\n                                        <div class="collapsible-body" style="display: table;width: 100%;">\n\n                                            ', '\n \n                                        </div>\n                                    </li>\n                                    '], ['\n                                    <li>\n                                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                        </div>\n                                        <div class="collapsible-body" style="display: table;width: 100%;">\n\n                                            ', '\n \n                                        </div>\n                                    </li>\n                                    ']),
    _templateObject13 = _taggedTemplateLiteral(['\n                                        <li>  \n                                            <div class="collapsible-header" style="display: table;width: 100%;"> \n                                                <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                            </div>\n                                        </li>'], ['\n                                        <li>  \n                                            <div class="collapsible-header" style="display: table;width: 100%;"> \n                                                <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                                            </div>\n                                        </li>']),
    _templateObject14 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item active">Detalles de la cuenta</a>\n    </div>'], ['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item active">Detalles de la cuenta</a>\n    </div>']),
    _templateObject15 = _taggedTemplateLiteral([' \n        <ul class="collapsible" data-collapsible="expandable">\n            ', '\n\n            <li>\n                <div class="collapsible-header" style="display: table;width: 100%;"> \n                    <a href="javascript:void();" class="collection-item right-align right">\n                        Total : ', ' ', '\n                    </a>  \n                </div>\n            </li>\n        </ul>'], [' \n        <ul class="collapsible" data-collapsible="expandable">\n            ', '\n\n            <li>\n                <div class="collapsible-header" style="display: table;width: 100%;"> \n                    <a href="javascript:void();" class="collection-item right-align right">\n                        Total : ', ' ', '\n                    </a>  \n                </div>\n            </li>\n        </ul>']),
    _templateObject16 = _taggedTemplateLiteral(['\n                    <li>  \n                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                        </div>\n                    </li>'], ['\n                    <li>  \n                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                        </div>\n                    </li>']),
    _templateObject17 = _taggedTemplateLiteral(['\n                    <li>\n                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                        </div>\n                        <div class="collapsible-body" style="display: table;width: 100%;">\n\n                            ', '\n\n                        </div>\n                    </li>\n                    '], ['\n                    <li>\n                        <div class="collapsible-header" style="display: table;width: 100%;"> \n                            <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                        </div>\n                        <div class="collapsible-body" style="display: table;width: 100%;">\n\n                            ', '\n\n                        </div>\n                    </li>\n                    ']),
    _templateObject18 = _taggedTemplateLiteral(['\n                        <li>  \n                            <div class="collapsible-header" style="display: table;width: 100%;"> \n                                <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                            </div>\n                        </li>'], ['\n                        <li>  \n                            <div class="collapsible-header" style="display: table;width: 100%;"> \n                                <a href="javascript:void();" class="collection-item right-align right col s12 col m12" onclick=', '><span class="left">(', ') ', '</span> <span class="new badge green right-align" data-badge-caption="', ' ', '"></span></a>\n                            </div>\n                        </li>']),
    _templateObject19 = _taggedTemplateLiteral(['\n        <div>\n            <div class="modal-content">\n                <div class="row center">\n                    <h5 class="header">Elige una cuenta</h5>\n                </div>\n                <div class="row">\n                    <div class="collection">\n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>\n        '], ['\n        <div>\n            <div class="modal-content">\n                <div class="row center">\n                    <h5 class="header">Elige una cuenta</h5>\n                </div>\n                <div class="row">\n                    <div class="collection">\n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>\n        ']),
    _templateObject20 = _taggedTemplateLiteral([' \n                            <a href="javascript:void(0);" class="collection-item" onclick=', '><i class="material-icons left">label_outline</i> CUENTA : ', '</a>\n                        '], [' \n                            <a href="javascript:void(0);" class="collection-item" onclick=', '><i class="material-icons left">label_outline</i> CUENTA : ', '</a>\n                        ']),
    _templateObject21 = _taggedTemplateLiteral([' \n        <div class="card" id="divInvoice">\n            <div class="card-content">\n                <div class="row">\n                    <div class="col m12 s12">\n                        <div class="row">\n                            <div class="col s8 m8">\n                                <div class="row">\n                                    <div class="input-field col s6">\n                                        <select id="tipo_doc_ident" onchange="', '">\n                                            <option value="DNI" ', '>DNI</option>\n                                            <option value="RUC" ', '>RUC</option>\n                                        </select>\n                                        <label>Tipo Documento</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" value="', '">\n                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divRazonSocial" style="display:none">\n                                    <div class="input-field col s12">\n                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" value="', '">\n                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divNombres">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40" value="', '">\n                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                                <div class="row" id="divApellidos">\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30" value="', '">\n                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30" value="', '">\n                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>\n                                    </div>\n                                </div> \n\n                                <div class="row">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate" value="', '">\n                                            <label class="active">Direccion</label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class="col s4 m4 right">\n                                <div class="card grey lighten-4">\n                                    <div class="card-content">\n                                        <div class="row">\n                                            <div class="col s12 m12">\n                                                <h5 id="tituloComprobante">R.U.C. 1111222234</h5>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s12 m12" id="divTipoComprobante">\n                                                <select id="cod_documento" onchange=', '>\n                                                </select>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s6 m6" id="divSeries" onchange=', '>\n                                                <select id="nro_serie"> \n                                                </select>\n                                            </div>\n                                            <div class="col s6 m6">\n                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" value="0">\n                                                <label class="active" for="numero" id="lnumero" data-error="" data-success="">N\xFAmero</label>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="input-field col s12">\n                                                <input value="" id="fecha" type="text" class="datepicker">\n                                                <label for="fecha" class="active" for="fecha" id="lfecha" data-error="" data-success="">Fecha</label>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                </div>\n                <div class="row">\n                    <table class="table table-hover" id="tablaComprobante">\n                        <thead>\n                            <tr>\n                                <th>Producto</th>\n                                <th>Cantidad</th> \n                                <th class="center">Precio</th>\n                                <th class="center">Total</th>\n                            </tr>\n                        </thead>\n                        <tbody id="bodyComprobante">\n                            ', '\n                        </tbody>\n                        <tbody>\n                            \n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right">\n                                    <p>\n                                        <strong>Subtotal:\xA0</strong>\n                                    </p>\n                                    <p>\n                                        <strong>Descuento(%):\xA0</strong>\n                                    </p>\n                                </td>\n                                <td class="center">\n                                    <p>\n                                        <strong id="SumaTotal">', '', '</strong>\n                                    </p>\n                                    <p>\n                                    <strong id="Descuento" contenteditable="true" onkeyup="', '">', '</strong>\n                                    </p>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right"><h5><strong>Total:\xA0</strong></h5></td>\n                                <td class="center"><h5><strong id="totalGlobal">', '', '</strong></h5></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <a class="waves-effect grey darken-4 btn" onclick=', '><i class="material-icons left">print</i>Aceptar</a>\n                </div>\n            </div>\n        </div>'], [' \n        <div class="card" id="divInvoice">\n            <div class="card-content">\n                <div class="row">\n                    <div class="col m12 s12">\n                        <div class="row">\n                            <div class="col s8 m8">\n                                <div class="row">\n                                    <div class="input-field col s6">\n                                        <select id="tipo_doc_ident" onchange="', '">\n                                            <option value="DNI" ', '>DNI</option>\n                                            <option value="RUC" ', '>RUC</option>\n                                        </select>\n                                        <label>Tipo Documento</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" value="', '">\n                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divRazonSocial" style="display:none">\n                                    <div class="input-field col s12">\n                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" value="', '">\n                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divNombres">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40" value="', '">\n                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                                <div class="row" id="divApellidos">\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30" value="', '">\n                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30" value="', '">\n                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>\n                                    </div>\n                                </div> \n\n                                <div class="row">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate" value="', '">\n                                            <label class="active">Direccion</label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class="col s4 m4 right">\n                                <div class="card grey lighten-4">\n                                    <div class="card-content">\n                                        <div class="row">\n                                            <div class="col s12 m12">\n                                                <h5 id="tituloComprobante">R.U.C. 1111222234</h5>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s12 m12" id="divTipoComprobante">\n                                                <select id="cod_documento" onchange=', '>\n                                                </select>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s6 m6" id="divSeries" onchange=', '>\n                                                <select id="nro_serie"> \n                                                </select>\n                                            </div>\n                                            <div class="col s6 m6">\n                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" value="0">\n                                                <label class="active" for="numero" id="lnumero" data-error="" data-success="">N\xFAmero</label>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="input-field col s12">\n                                                <input value="" id="fecha" type="text" class="datepicker">\n                                                <label for="fecha" class="active" for="fecha" id="lfecha" data-error="" data-success="">Fecha</label>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                </div>\n                <div class="row">\n                    <table class="table table-hover" id="tablaComprobante">\n                        <thead>\n                            <tr>\n                                <th>Producto</th>\n                                <th>Cantidad</th> \n                                <th class="center">Precio</th>\n                                <th class="center">Total</th>\n                            </tr>\n                        </thead>\n                        <tbody id="bodyComprobante">\n                            ', '\n                        </tbody>\n                        <tbody>\n                            \n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right">\n                                    <p>\n                                        <strong>Subtotal:\xA0</strong>\n                                    </p>\n                                    <p>\n                                        <strong>Descuento(%):\xA0</strong>\n                                    </p>\n                                </td>\n                                <td class="center">\n                                    <p>\n                                        <strong id="SumaTotal">', '', '</strong>\n                                    </p>\n                                    <p>\n                                    <strong id="Descuento" contenteditable="true" onkeyup="', '">', '</strong>\n                                    </p>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right"><h5><strong>Total:\xA0</strong></h5></td>\n                                <td class="center"><h5><strong id="totalGlobal">', '', '</strong></h5></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <a class="waves-effect grey darken-4 btn" onclick=', '><i class="material-icons left">print</i>Aceptar</a>\n                </div>\n            </div>\n        </div>']),
    _templateObject22 = _taggedTemplateLiteral([' \n                                <tr id="', '-', '">\n                                    <td class="Detalle"><p style="display:none" class="pDetalle pValor">', '</p> <input style="text-transform: uppercase;" type="text" class="validate" value="', '" disabled></td>\n                                    <td class="Cantidad"><p style="display:none" class="pCantidad pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" onkeyup="', '"></td>\n                                    <td class="Precio"><p style="display:none" class="pPrecio pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" onkeyup="', '"></td>\n                                    <td class="Total"><p style="display:none" class="pTotal pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" disabled></td>\n                                </tr>\n                            '], [' \n                                <tr id="', '-', '">\n                                    <td class="Detalle"><p style="display:none" class="pDetalle pValor">', '</p> <input style="text-transform: uppercase;" type="text" class="validate" value="', '" disabled></td>\n                                    <td class="Cantidad"><p style="display:none" class="pCantidad pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" onkeyup="', '"></td>\n                                    <td class="Precio"><p style="display:none" class="pPrecio pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" onkeyup="', '"></td>\n                                    <td class="Total"><p style="display:none" class="pTotal pValor">', '</p><input style="text-transform: uppercase;text-align: right;" type="number" class="validate" value="', '" disabled></td>\n                                </tr>\n                            ']),
    _templateObject23 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item" onclick=', '>Todos los comprobantes</a>\n        <a href="#!" class="collection-item" onclick=', '>Nuevo Comprobante</a>\n    </div>'], ['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item" onclick=', '>Todos los comprobantes</a>\n        <a href="#!" class="collection-item" onclick=', '>Nuevo Comprobante</a>\n    </div>']),
    _templateObject24 = _taggedTemplateLiteral(['<ul class="collection">\n                    ', '\n                </ul>'], ['<ul class="collection">\n                    ', '\n                </ul>']),
    _templateObject25 = _taggedTemplateLiteral(['\n                        <li class="collection-item">(', ') ', '</li>'], ['\n                        <li class="collection-item">(', ') ', '</li>']),
    _templateObject26 = _taggedTemplateLiteral(['\n            <div class="collection right-align">\n                ', '\n            </div>'], ['\n            <div class="collection right-align">\n                ', '\n            </div>']),
    _templateObject27 = _taggedTemplateLiteral(['\n                    <a href="javascript:void();" style="color: #2c2c54;font-size: 12px;font-weight: bold;" class="collection-item">(', ') ', ' <span class="new badge orange right-align" data-badge-caption="', ' ', '"></span></a>'], ['\n                    <a href="javascript:void();" style="color: #2c2c54;font-size: 12px;font-weight: bold;" class="collection-item">(', ') ', ' <span class="new badge orange right-align" data-badge-caption="', ' ', '"></span></a>']),
    _templateObject28 = _taggedTemplateLiteral(['\n        <select id="cod_documento">\n        ', '\n        </select>'], ['\n        <select id="cod_documento">\n        ', '\n        </select>']),
    _templateObject29 = _taggedTemplateLiteral(['\n             <option value="', '" onchange=', '>', '</option>\n        '], ['\n             <option value="', '" onchange=', '>', '</option>\n        ']),
    _templateObject30 = _taggedTemplateLiteral(['\n        <select id="nro_serie">\n        ', '\n        </select>'], ['\n        <select id="nro_serie">\n        ', '\n        </select>']),
    _templateObject31 = _taggedTemplateLiteral(['\n             <option value="', '">', '</option>\n        '], ['\n             <option value="', '">', '</option>\n        ']),
    _templateObject32 = _taggedTemplateLiteral(['\n        <div>\n        ', '\n        </div>'], ['\n        <div>\n        ', '\n        </div>']),
    _templateObject33 = _taggedTemplateLiteral(['\n            <div>\n                <div class="card-image">\n                    <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                    <span class="card-title">', '</span>\n                    <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                    <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                </div> \n                <div class="card-content">\n                    <div class="row center">\n                            ', '\n                    </div>\n                    <div class="row center">\n                        <div class="col m4 s4">\n                            <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                        </div>\n                        <div class="col m4 s4">\n                            <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                        </div>\n                        <div class="col m4 s4">\n                            <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                        </div>\n                    </div>\n                    <div class="row center">\n                        <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                            <i class="material-icons left">save</i>\n                        </button>\n                    </div>\n                </div> \n            </div>'], ['\n            <div>\n                <div class="card-image">\n                    <img  src="public/images/', '" style="background-color: rgba(0, 0, 0, 0.45);">\n                    <span class="card-title">', '</span>\n                    <a class="col m5 s5 offset-s6 btn-floating btn-small halfway-fab waves-effect waves-light red" style="left: 24px;border-radius: 0%;width: auto;padding-left: 10px;padding-right: 10px;" onclick=', '>Eliminar</a>\n                    <a class="btn-floating btn-large halfway-fab waves-effect waves-light green" style="display:none"  onclick=', '><i class="material-icons">check</i></a>\n                </div> \n                <div class="card-content">\n                    <div class="row center">\n                            ', '\n                    </div>\n                    <div class="row center">\n                        <div class="col m4 s4">\n                            <a href="javascript:void(0);" class="waves-effect waves-light red-text" onclick="', '"><i class="material-icons">remove</i></a>\n                        </div>\n                        <div class="col m4 s4">\n                            <input value="', '" id="', '" type="number" class="validate" style="text-align: -webkit-center;text-align: center;font-size: 45px;font-style: oblique;font-weight: bold;"  onkeyup=', ' onchange=', '> \n                        </div>\n                        <div class="col m4 s4">\n                            <a href="javascript:void(0);" class="waves-effect waves-light blue-text" onclick="', '"><i class="material-icons">add</i></a>\n                        </div>\n                    </div>\n                    <div class="row center">\n                        <button class="btn waves-effect waves-light" onclick="', '">Guardar Cantidad\n                            <i class="material-icons left">save</i>\n                        </button>\n                    </div>\n                </div> \n            </div>']);

var _constantes = require('../constantes_entorno/constantes');

var _utils = require('../utils');

var _ecaja = require('../ecaja.comprobante/');

var _nuevo = require('../ecaja.comprobante/nuevo');

var _net = require('net');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

var contador = 0;
var $card = null;
var lastCard = null;
var jsonSeries = {};

function Ver(puntos_venta) {

    var el = yo(_templateObject, puntos_venta.map(function (e) {
        return yo(_templateObject2, e.estado_accion, e.Nro_Cuentas > 0 ? yo(_templateObject3, e.Nro_Cuentas) : yo(_templateObject4), e.nombre_mesa, e.Mesero, e.cod_mesa, function () {
            return RotarCard(e.Nro_Cuentas, e.cod_mesa);
        }, e.estado_accion, function () {
            return VerDetalles(e, "C");
        }, function () {
            return VerDetalles(e, "I");
        }, function () {
            return VerDetalles(e, "D");
        }, function () {
            return VerDetalles(e, "T");
        }, function () {
            return RotarCard(e.Nro_Cuentas, e.cod_mesa);
        });
    }));
    //const numeroFilas = Math.floor(paginas/4) 

    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);

    var sub_nav = yo(_templateObject5);
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    //$(".dropdown-button").dropdown();
}

function VerDetalleSeleccion(productos, cuenta, i, punto_venta) {
    var el = yo(_templateObject6, i, punto_venta.nombre_mesa, productos.map(function (p, index, array) {
        return array[index + 1] != undefined ? p.id_referencia == '0' && array[index + 1].id_referencia == '0' ? yo(_templateObject7, p.id_detalle + "-" + p.pedido_id, p.imagen_url, p.descripcion_detalle, function () {
            return RechazarProducto(p, cuenta);
        }, function () {
            return AceptarProducto(p, cuenta);
        }, function () {
            return DisminuirCantidad(index);
        }, p.cantidad, index, function () {
            return CambioCantidad(index);
        }, function () {
            return CambioCantidad(index);
        }, function () {
            return AumentarCantidad(index);
        }, function () {
            return ConfirmarCantidad(p, cuenta, index);
        }) : p.id_referencia == '0' && array[index + 1].id_referencia != '0' ? yo(_templateObject8, p.id_detalle + "-" + p.pedido_id, p.imagen_url, p.descripcion_detalle, function () {
            return RechazarProducto(p, cuenta);
        }, function () {
            return AceptarProducto(p, cuenta);
        }, LlenarCombinaciones(p, "card", productos), function () {
            return DisminuirCantidad(index);
        }, p.cantidad, index, function () {
            return CambioCantidad(index);
        }, function () {
            return CambioCantidad(index);
        }, function () {
            return AumentarCantidad(index);
        }, function () {
            return ConfirmarCantidad(p, cuenta, index);
        }) : yo(_templateObject9) : p.id_referencia == '0' ? yo(_templateObject10, p.id_detalle + "-" + p.pedido_id, p.imagen_url, p.descripcion_detalle, function () {
            return RechazarProducto(p, cuenta);
        }, function () {
            return AceptarProducto(p, cuenta);
        }, function () {
            return DisminuirCantidad(index);
        }, p.cantidad, index, function () {
            return CambioCantidad(index);
        }, function () {
            return CambioCantidad(index);
        }, function () {
            return AumentarCantidad(index);
        }, function () {
            return ConfirmarCantidad(p, cuenta, index);
        }) : yo(_templateObject9);
    }), productos.map(function (p, index, array) {
        return array[index + 1] != undefined ? p.id_referencia == '0' && array[index + 1].id_referencia == '0' ? yo(_templateObject11, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2)) : p.id_referencia == '0' && array[index + 1].id_referencia != '0' ? yo(_templateObject12, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2), LlenarCombinaciones(p, "lista", productos, index)) : yo(_templateObject9) : p.id_referencia == '0' ? yo(_templateObject13, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2)) : yo(_templateObject9);
    }), productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', parseFloat(productos[0].total).toFixed(2));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);

    var sub_nav = yo(_templateObject14, function () {
        return inicio();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    //$(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({ accordion: false });
    (0, _utils.Init)();
}

function ActualizarDetallePedido(productos, cuenta) {
    var el = yo(_templateObject15, productos.map(function (p, index, array) {
        return array[index + 1] != undefined ? p.id_referencia == '0' && array[index + 1].id_referencia == '0' ? yo(_templateObject16, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2)) : p.id_referencia == '0' && array[index + 1].id_referencia != '0' ? yo(_templateObject17, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2), LlenarCombinaciones(p, "lista", productos, index)) : yo(_templateObject9) : p.id_referencia == '0' ? yo(_templateObject18, function () {
            return SeleccionarProducto(p, productos, cuenta);
        }, p.cantidad, p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2)) : yo(_templateObject9);
    }), productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', parseFloat(productos[0].total).toFixed(2));
    var container = document.getElementById('listaDetalles');
    empty(container).appendChild(el);
}

function VerSeleccionCuentas(cuentas, tipo, punto_venta) {
    var el = yo(_templateObject19, cuentas.map(function (e, i) {
        return yo(_templateObject20, function () {
            return SeleccionarCuenta(e, tipo, i + 1, punto_venta);
        }, i + 1);
    }));
    var container = document.getElementById('modal-details');
    empty(container).appendChild(el);
    $('#modal-details').modal();
    $('#modal-details').modal('open');
}

function VerInvoice(pedido_detalle) {
    var idFila = contador;
    var el = yo(_templateObject21, function () {
        return CambioTipoDoc();
    }, pedido_detalle[0].tipo_doc_ident == "DNI" ? 'selected' : '', pedido_detalle[0].tipo_doc_ident == "RUC" ? 'selected' : '', pedido_detalle[0].doc_ident != null ? pedido_detalle[0].doc_ident : '', pedido_detalle[0].razon_social != null ? pedido_detalle[0].razon_social : '', pedido_detalle[0].nombres != null ? pedido_detalle[0].nombres : '', pedido_detalle[0].a_paterno != null ? pedido_detalle[0].a_paterno : '', pedido_detalle[0].a_materno != null ? pedido_detalle[0].a_materno : '', pedido_detalle[0].direccion != null ? pedido_detalle[0].direccion : '', function () {
        return CambioDocumento();
    }, function () {
        return CambioSerie(pedido_detalle[0].cod_sucursal);
    }, pedido_detalle.map(function (e) {
        return yo(_templateObject22, idFila, e.producto_id, e.descripcion_detalle, e.descripcion_detalle, parseFloat(e.cantidad).toFixed(2), parseFloat(e.cantidad).toFixed(2), function () {
            return CambioCelda(pedido_detalle[0].cod_moneda == "PEN" ? "S/ " : "USD ", idFila + "-" + e.producto_id);
        }, e.precio, e.precio, function () {
            return CambioCelda(pedido_detalle[0].cod_moneda == "PEN" ? "S/ " : "USD ", idFila + "-" + e.producto_id);
        }, (parseFloat(e.cantidad) * parseFloat(e.precio)).toFixed(2), (parseFloat(e.cantidad) * parseFloat(e.precio)).toFixed(2));
    }), pedido_detalle[0].cod_moneda == "PEN" ? "S/ " : "USD ", parseFloat(pedido_detalle[0].total).toFixed(2), function () {
        return CambioDescuento(pedido_detalle[0].cod_moneda == "PEN" ? "S/ " : "USD ");
    }, pedido_detalle[0].descuento == "" || pedido_detalle[0].descuento == null || empty(pedido_detalle[0].descuento) ? "0" : pedido_detalle[0].descuento, pedido_detalle[0].cod_moneda == "PEN" ? "S/ " : "USD ", parseFloat(pedido_detalle[0].total).toFixed(2), function () {
        return AceptarPedido(pedido_detalle);
    });
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('select').material_select();

    var sub_nav = yo(_templateObject23, function () {
        return inicio();
    }, function () {
        return (0, _ecaja.comprobantes)();
    }, function () {
        return (0, _nuevo.nuevoComprobante)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);

    TraerTiposComprobantes(pedido_detalle[0].cod_sucursal);

    $('.datepicker').pickadate({
        container: 'body',
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agos", "Set", "Oct", "Nov", "Dic"],
        weekdaysFull: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysLetter: ["D", "L", "M", "Mi", "J", "V", "S"],
        today: "Hoy",
        clear: "Limpiar",
        close: "Ok"
    });
    var $input = $('#fecha').pickadate();
    var picker = $input.pickadate('picker');
    picker.set('select', new Date());
    CambioTipoDoc();
}

function LlenarCombinaciones(producto, tipo, productos, index) {
    if (tipo == "card") return yo(_templateObject24, productos.map(function (p) {
        return producto.id_detalle == p.id_referencia && p.id_referencia != "0" ? yo(_templateObject25, p.cantidad, p.nombre != "" && p.nombre != null ? p.nombre : p.descripcion_detalle) : yo(_templateObject9);
    }));else return yo(_templateObject26, productos.map(function (p) {
        return producto.id_detalle == p.id_referencia && p.id_referencia != "0" ? yo(_templateObject27, p.cantidad, p.nombre != "" && p.nombre != null ? p.nombre : p.descripcion_detalle, productos[0].cod_moneda == "PEN" ? 'S/ ' : 'USD', (parseFloat(p.cantidad) * parseFloat(p.precio)).toFixed(2)) : yo(_templateObject9);
    }));
}

function LlenarTipoDocumentos(documentos) {
    var el = yo(_templateObject28, documentos.map(function (e) {
        return yo(_templateObject29, e.cod_documento, function () {
            return TraerSeriesNumeros(e.cod_documento);
        }, e.descripcion_doc);
    }));

    var container = document.getElementById('divTipoComprobante');
    empty(container).appendChild(el);
    $('select').material_select();
}

function LlenarSeries(series, cod_sucursal) {
    jsonSeries = series;
    var el = yo(_templateObject30, series.map(function (e) {
        return yo(_templateObject31, e.nro_serie, e.nro_serie);
    }));
    var container = document.getElementById('divSeries');
    empty(container).appendChild(el);
    $('select').material_select();
    CambioSerie(cod_sucursal);
}

function SeleccionarProducto(p, productos, cuenta) {

    var idPadre = $(".stackedcards-container").find(".stackedcards-active").attr("id");
    var idCard = p.id_detalle + "-" + p.pedido_id;

    var arreglo = idPadre.split("-");
    var id_detalle_padre = arreglo[0];
    var pedido_id_padre = parseInt(arreglo[1]);

    var contentCard = yo(_templateObject32, productos.map(function (p_, index) {
        return p_.id_detalle == p.id_detalle && p_.pedido_id == p.pedido_id ? yo(_templateObject33, p_.imagen_url, p_.descripcion_detalle, function () {
            return RechazarProducto(p_, cuenta);
        }, function () {
            return AceptarProducto(p_, cuenta);
        }, LlenarCombinaciones(p_, "card", productos), function () {
            return DisminuirCantidad(index);
        }, p_.cantidad, index, function () {
            return CambioCantidad(index);
        }, function () {
            return CambioCantidad(index);
        }, function () {
            return AumentarCantidad(index);
        }, function () {
            return ConfirmarCantidad(p_, cuenta, index);
        }) : yo(_templateObject9);
    }));

    var contentPadre = yo(_templateObject32, productos.map(function (p_, index) {
        return p_.id_detalle == id_detalle_padre && p_.pedido_id == pedido_id_padre ? yo(_templateObject33, p_.imagen_url, p_.descripcion_detalle, function () {
            return RechazarProducto(p_, cuenta);
        }, function () {
            return AceptarProducto(p_, cuenta);
        }, LlenarCombinaciones(p_, "card", productos), function () {
            return DisminuirCantidad(index);
        }, p_.cantidad, index, function () {
            return CambioCantidad(index);
        }, function () {
            return CambioCantidad(index);
        }, function () {
            return AumentarCantidad(index);
        }, function () {
            return ConfirmarCantidad(p_, cuenta, index);
        }) : yo(_templateObject9);
    }));

    var containerPadre = document.getElementById(idPadre);
    empty(containerPadre).appendChild(contentCard);

    var containerHijo = document.getElementById(idCard);
    empty(containerHijo).appendChild(contentPadre);
}

function CambioCantidad(idCantidad) {
    var valor_inicial = parseInt($("#" + idCantidad).val());
    if (valor_inicial <= 0) {
        $("#" + idCantidad).val(1);
    }
}

function CambioSerie(cod_sucursal) {
    fetchNumeroSiguiente(cod_sucursal);
}

function CambioDocumento() {
    var cod_documento = $("#cod_documento").val();
    TraerSeriesNumeros(cod_documento);
}

function CambioCelda(moneda, idTR) {
    var Cantidad = $("#" + idTR).find("td.Cantidad").find("input").val();
    var Precio = $("#" + idTR).find("td.Precio").find("input").val().trim().replace("S/", "").replace("USD", "");
    $("#" + idTR).find("td.Total").find("input").val((parseFloat(Cantidad) * parseFloat(Precio)).toFixed(2));

    $("#" + idTR).find("td.Cantidad").find("p.pCantidad").text(Cantidad);
    $("#" + idTR).find("td.Precio").find("p.pPrecio").text(moneda + " " + Precio);
    $("#" + idTR).find("td.Total").find("p.pTotal").text((parseFloat(Cantidad) * parseFloat(Precio)).toFixed(2));

    CalcularSuma(moneda);
}

function CambioTipoDoc() {
    if ($("#tipo_doc_ident").val() == "DNI") {
        $("#divNombres").show();
        $("#divApellidos").show();
        $("#divRazonSocial").hide();
    } else {
        $("#divNombres").hide();
        $("#divApellidos").hide();
        $("#divRazonSocial").show();
    }
}

function AceptarProducto() {
    (0, _utils.onActionTop)();
}

function RechazarProducto(e, cuenta) {
    var r = confirm("Esta seguro de eliminar el producto del pedido?");
    if (r == true) {
        fetchEliminarDetallePedido(e.pedido_id, e.id_detalle, function (res) {
            if (res.err) {
                console.log(res.err);
            } else {
                (0, _utils.onActionLeft)();
                fetchPedidoDetalle(cuenta, function (res) {
                    if (res.err) {
                        console.log(res.err);
                    } else {
                        console.log(res);
                        if (res.punto_venta.length > 0) ActualizarDetallePedido(res.punto_venta, cuenta);else inicio();
                    }
                });
            }
        });
    }
}

function ConfirmarCantidad(e, cuenta, idCantidad) {
    var cantidad = $("input#" + idCantidad).val();
    var r = confirm("Esta seguro de actualizar la cantidad del producto?");
    if (r == true) {
        fetchActualizarCantidadDetallePedido(e.pedido_id, e.id_detalle, parseInt(cantidad), function (res) {
            if (res.err) {
                console.log(res.err);
            } else {
                fetchPedidoDetalle(cuenta, function (res) {
                    if (res.err) {
                        console.log(res.err);
                    } else {
                        if (res.punto_venta.length > 0) ActualizarDetallePedido(res.punto_venta, cuenta);else inicio();
                    }
                });
            }
        });
    }
}

function DisminuirCantidad(idCantidad) {
    var valor_inicial = parseInt($("input#" + idCantidad).val());
    if (valor_inicial > 1) {
        valor_inicial = valor_inicial - 1;
        $("input#" + idCantidad).val(valor_inicial);
    }
}

function AumentarCantidad(idCantidad) {
    var valor_inicial = parseInt($("input#" + idCantidad).val());
    valor_inicial = valor_inicial + 1;
    $("input#" + idCantidad).val(valor_inicial);
}

function CambioDescuento(moneda) {
    var descuento = $("#Descuento").text();
    var total = parseFloat($("#SumaTotal").text().trim().replace("S/", "").replace("USD", "")) * parseFloat(descuento) / 100;
    $("#totalGlobal").text(moneda + " " + (parseFloat($("#SumaTotal").text().trim().replace("S/", "").replace("USD", "")) - total).toFixed(2));
}

function CalcularSuma(moneda) {
    var suma = 0;
    $('#bodyComprobante tr').each(function () {
        suma = suma + parseFloat($(this).find("td.Total").find("input").val());
    });

    $("#SumaTotal").text(moneda + " " + suma);
    CambioDescuento(moneda);
}

function AceptarPedido(pedido_detalle) {

    var props = {};
    if ($("#tipo_doc_ident").val() == "DNI") {
        props = {
            'nombres': { maxLen: 100 },
            'a_paterno': { maxLen: 100 },
            'a_materno': { maxLen: 100 },
            'numero_doc': { maxLen: 15 },
            'fecha': {},
            'numero': {}
        };
    } else {
        props = {
            'razon_social': { maxLen: 120 },
            'numero_doc': { maxLen: 15 },
            'fecha': {},
            'numero': {}
        };
    }

    if (!Validar(props)) return;

    var cod_documento = $("#cod_documento").val();
    var nro_serie = parseInt($("#nro_serie").val());
    var numero = parseInt($("#numero").val().trim() == "" ? "0" : $("#numero").val().trim());
    var cod_sucursal = pedido_detalle[0].cod_sucursal;
    var pedido_id = pedido_detalle[0].pedido_id;
    var cod_persona = pedido_detalle[0].cod_persona;
    var nombre_cliente = $("#divNombres").css("display") == "none" ? $("#razon_social").val() : $("#nombres").val() + " " + $("#a_paterno").val() + " " + $("#a_materno").val();
    var direccion_cliente = $("#direccion").val();
    var concepto = "COMPROBANTE";
    var total = $("#totalGlobal").text().replace("S/", "").replace("USD", "");
    var impuesto = 0;
    var estado = "EMITIDO";
    var obs = "";
    var fecha = $("#fecha").val();
    var params = {
        cod_documento: cod_documento,
        nro_serie: nro_serie,
        numero: numero,
        cod_sucursal: cod_sucursal,
        pedido_id: pedido_id,
        cod_persona: cod_persona,
        nombre_cliente: nombre_cliente,
        direccion_cliente: direccion_cliente,
        concepto: concepto,
        total: total,
        impuesto: impuesto,
        estado: estado,
        obs: obs,
        fecha: fecha
    };
    fetchComprobante(params, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {

            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            var pdf = btoa(generateInvoice());

            var parametros = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: pdf,
                    nombre_pdf: 'recibo'
                })
            };
            fetch(_constantes.URL + '/ws/save_pdf', parametros).then(function (req) {
                return req.json();
            }).then(function (res) {
                console.log(res);
                if (res.respuesta == "ok") {
                    var winPDF = new BrowserWindow({
                        width: 800,
                        height: 600
                    });
                    PDFWindow.addSupport(winPDF);
                    winPDF.loadURL(dir + '/assets/media/recibo.pdf');
                    inicio();
                }
            });
        }
    });
}

function SeleccionarCuenta(cuenta, tipo, i, punto_venta) {
    contador = 0;
    try {
        $('#modal-details').modal('close');
    } catch (e) {}

    switch (tipo) {
        case "C":
            ShowLoader();
            fetchPedidoDetalle(cuenta, function (res) {
                if (res.err) {
                    console.log(res.err);
                } else {
                    console.log(res);
                    if (res.punto_venta.length > 0) VerInvoice(res.punto_venta);
                }
                HideLoader();
            });
            break;
        case "I":
            ShowLoader();
            fetchImprimirVoucher(cuenta, function (res) {
                if (res.err) {
                    console.log(res.err);
                } else {
                    console.log(res);
                }
                HideLoader();
            });
            break;
        case "D":
            ShowLoader();
            fetchPedidoDetalle(cuenta, function (res) {
                if (res.err) {
                    console.log(res.err);
                } else {
                    console.log(res);
                    if (res.punto_venta.length > 0) VerDetalleSeleccion(res.punto_venta, cuenta, i, punto_venta);
                }
                HideLoader();
            });
            break;
        case "T":
            if (confirm('Desea finalizar la cuenta ' + i + '?')) {
                ShowLoader();
                fetchFinalizarPedido(cuenta, function (res) {
                    if (res.err) {
                        console.log(res.err);
                    } else {
                        console.log(res);
                        if (!_constantes.ENV_WEB) {
                            socket.emit("FIN_CUENTA");
                        }
                        inicio();
                    }
                    HideLoader();
                });
            }
            break;
    }
}

function RotarCard(nro_cuentas, idBtn) {
    if (nro_cuentas > 0) {
        var $card = $("#" + idBtn).closest('.card-container');
        if ($card.hasClass('hover')) {
            $card.removeClass('hover');
        } else {
            $card.addClass('hover');
        }
    }
}

function VerDetalles(punto_venta, tipo) {
    if (punto_venta.Nro_Cuentas == 1) {
        fetchCuentas(punto_venta, function (res) {
            if (res.err) {
                console.log(res.err);
            } else {
                SeleccionarCuenta(res.punto_venta[0], tipo, 1, punto_venta);
            }
        });
    } else {

        fetchCuentas(punto_venta, function (res) {
            if (res.err) {
                console.log(res.err);
            } else {
                VerSeleccionCuentas(res.punto_venta, tipo, punto_venta);
            }
        });
    }
}

function fetchActualizarCantidadDetallePedido(pedido_id, id_detalle, cantidad, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_detalle: id_detalle,
            pedido_id: pedido_id,
            cantidad: cantidad
        })
    };
    fetch(_constantes.URL + '/ws/actualizar_cantidad_pedido_detalle', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchEliminarDetallePedido(pedido_id, id_detalle, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_detalle: id_detalle,
            pedido_id: pedido_id
        })
    };
    fetch(_constantes.URL + '/ws/eliminar_pedido_detalle', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchImprimirVoucher(cuenta, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero: cuenta.numero
        })
    };
    fetch(_constantes.URL + '/ws/impresion_nota_venta', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchFinalizarPedido(cuenta, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pedido_id: cuenta.pedido_id
        })
    };
    fetch(_constantes.URL + '/ws/finish_pedido', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchNumeroSiguiente(cod_sucursal) {
    var cod_documento = $("#cod_documento").val();
    var nro_serie = $("#nro_serie").val();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_documento: cod_documento,
            nro_serie: nro_serie,
            cod_sucursal: cod_sucursal
        })
    };
    fetch(_constantes.URL + '/ws/get_numero_siguiente', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        $("#numero").val(res.numero);
    });
}

function fetchProductosMesa(punto_venta, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_mesa: punto_venta.cod_punto_venta
        })
    };
    fetch(_constantes.URL + '/ws/get_productos_by_mesa', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchComprobante(params, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(params)
    };
    fetch(_constantes.URL + '/ws/save_ecaja_comprobante', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchPedidoDetalle(cuenta, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pedido_id: cuenta.pedido_id,
            cod_punto_venta: cuenta.cod_punto_venta
        })
    };
    fetch(_constantes.URL + '/ws/get_pedido_detalle', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchDocumentos(cod_sucursal, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_sucursal: cod_sucursal
        })
    };
    fetch(_constantes.URL + '/ws/get_tipo_comprobantes', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchSeriesNumeros(cod_documento, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_documento: cod_documento
        })
    };
    fetch(_constantes.URL + '/ws/get_series_by_documento', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchCuentas(punto_venta, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_punto_venta: punto_venta.cod_mesa
        })
    };
    fetch(_constantes.URL + '/ws/get_cuentas_by_punto_venta', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchPuntosVentas(callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    };
    fetch(_constantes.URL + '/ws/get_puntos_venta', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function TraerTiposComprobantes(cod_sucursal) {
    fetchDocumentos(cod_sucursal, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            if (res.documentos.length > 0) {
                LlenarTipoDocumentos(res.documentos);
                TraerSeriesNumeros(res.documentos[0].cod_documento, cod_sucursal);
            }
        }
    });
}

function TraerSeriesNumeros(cod_documento, cod_sucursal) {
    fetchSeriesNumeros(cod_documento, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            if (res.series.length > 0) {
                LlenarSeries(res.series, cod_sucursal);
            }
        }
    });
}
if (!_constantes.ENV_WEB) {
    var socket = SocketIOClient(_constantes.URL);
}
function inicio() {
    if (!_constantes.ENV_WEB) {
        socket.on('NUEVA_COMANDA', function (data) {
            fetchPuntosVentas(function (res) {
                if (res.err) {
                    console.log(res.err);
                } else {
                    Ver(res.puntos_venta);
                }
            });
        });
    }
    ShowLoader();
    fetchPuntosVentas(function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            Ver(res.puntos_venta);
        }
        HideLoader();
    });
}

function generateInvoice() {
    $(".pValor").css("display", "block");
    var companyJSON = {
        CompanyName: 'GRIFOS MARECELOS S.R.L SLSLL',
        CompanyRUC: "20101001010",
        CompanyAddress: "UVIMA 5 G9 SAN JERONIMO"
    };

    var company_logo = {
        src: null, //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdgAAAGWCAIAAABU6QXSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAU/SURBVHhe7dQxAQAADMOg+TfdycgDIrgBkBIxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFAanvaPG1kiWmMAQAAAABJRU5ErkJggg==',
        w: 80,
        h: 50
    };

    var fontSizes = {
        HeadFontSize: 16,
        TitleFontSize: 12,
        SubTitleFontSize: 11,
        NormalFontSize: 10,
        SmallFontSize: 8
    };

    var lineSpacing = {
        MarginTop: 25,
        MarginSeccionCliente: 55,
        NormalSpacing: 25
    };

    var doc = new jsPDF('p', 'pt');

    var rightStartCol1 = 370;
    var rightStartCol2 = 450;

    var InitialstartX = 40;
    var startX = 50;
    var InitialstartY = 40;
    var startY = 0;

    var lineHeights = 12;

    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');

    if (company_logo.src != null) {
        doc.addImage(company_logo.src, 'PNG', startX, startY += 50, company_logo.w, company_logo.h);
        doc.textAlign(companyJSON.CompanyName, { align: "left" }, startX, startY += 15 + company_logo.h);
    } else {
        doc.setFontSize(fontSizes.HeadFontSize);
        doc.setFontType('bold');
        doc.textAlign(companyJSON.CompanyName, { align: "left" }, startX, startY += 30 + company_logo.h);
        doc.setFontSize(fontSizes.SubTitleFontSize);
        doc.setFontType('normal');
        doc.textAlign(companyJSON.CompanyAddress, { align: "left" }, startX, startY + 20);
        startY += 30;
    }

    doc.setLineWidth(1);
    doc.roundedRect(startX - 10, startY + lineSpacing.MarginSeccionCliente - 20, 520, 80, 3, 3);

    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');
    doc.textAlign("SEÑOR(ES) :", { align: "left" }, startX, startY += lineSpacing.MarginSeccionCliente);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign($("#tipo_doc_ident").val() == "DNI" ? $("#nombres").val() + " " + $("#a_paterno").val() + " " + $("#a_materno").val() : $("#razon_social").val(), { align: "left" }, 120, startY);

    doc.setFontType('bold');
    doc.textAlign($("#tipo_doc_ident").val() + " :", { align: "left" }, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign("47171096", { align: "left" }, 120, startY);

    doc.setFontType('bold');
    doc.textAlign("DIRECCION :", { align: "left" }, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign($("#direccion").val(), { align: "left" }, 120, startY);

    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.textAlign("FECHA EMISION : ", { align: "left" }, rightStartCol1 + 60, startY - 50);
    doc.textAlign($("#fecha").val(), { align: "left" }, rightStartCol1 + 70, startY - 30);

    var tempY = InitialstartY;

    doc.setLineWidth(2);
    doc.roundedRect(360, tempY, 200, 100, 3, 3);
    //doc.rect(230, tempY, 230, 180); 
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign("R.U.C. " + companyJSON.CompanyRUC, { align: "left" }, rightStartCol1 + 30, tempY += lineSpacing.MarginTop);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign($("#cod_documento option:selected").text(), { align: "left" }, rightStartCol1 + 10, tempY += lineSpacing.NormalSpacing);

    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign("Serie " + $("#nro_serie").val(), { align: "left" }, rightStartCol1 + 20, tempY += lineSpacing.NormalSpacing);
    doc.textAlign("Nº " + $("#numero").val(), { align: "left" }, rightStartCol1 + 100, tempY);

    var resd = doc.autoTableHtmlToJson(document.getElementById("tablaComprobante"));

    doc.autoTable(resd.columns, resd.data, {
        startY: startY + 30,
        startX: 80,
        margin: { horizontal: 30 },
        headerStyles: { rowHeight: 12, fontSize: 7, valign: 'middle' },
        styles: { overflow: 'linebreak' },
        bodyStyles: { rowHeight: 12, fontSize: 8, valign: 'middle' },
        theme: 'plain',
        pageBreak: 'avoid'
    });

    return doc.output();
}
exports.inicio = inicio;

},{"../constantes_entorno/constantes":343,"../ecaja.comprobante/":349,"../ecaja.comprobante/nuevo":350,"../utils":379,"empty-element":330,"net":329,"yo-yo":338}],341:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.almacenes = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Almacenes</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="almacen_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="almacen_busqueda" >Ingrese el nombre del almac\xE9n para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Almacenes</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="almacen_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="almacen_busqueda" >Ingrese el nombre del almac\xE9n para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Descripci\xF3n</th>\n                    <th>Tipo</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Descripci\xF3n</th>\n                    <th>Tipo</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(almacenes, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(almacenes, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('select').material_select();
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Almacenes</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevoAlmacen()}">Nuevo Almacén</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var almacen_busqueda = document.getElementById('almacen_busqueda').value.toUpperCase();
    fetchAlmacenes(tamano_pagina, pagina_actual, almacen_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.almacenes, paginas, pagina_actual));
        }
    });
}

function VerTabla(almacenes, paginas, pagina_actual) {
    return yo(_templateObject2, almacenes.map(function (a) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevoAlmacen)(a);
        }, a.descripcion, a.tipo, a.estado == "ACTIVO" ? 'blue' : 'red', a.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchAlmacenes(tamano_pagina, _numero_pagina, almacen_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            almacen_busqueda: almacen_busqueda
        })
    };
    fetch(_constantes.URL + '/almacenes_api/get_almacenes', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function almacenes(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchAlmacenes(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.almacenes, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.almacenes = almacenes;

},{"../constantes_entorno/constantes":343,"./nuevo":342,"empty-element":330,"yo-yo":338}],342:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevoAlmacen = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                             <input style="text-transform: uppercase;" id="almacen_cod" value="', '" type="text" class="validate" data-length="50">\n                             <label for="almacen_cod" id="lalmacen_cod" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Almac\xE9n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="descripcion" type="text" data-length="200">\n                                <label for="descripcion" id="ldescripcion" class="active" data-error="Descripci\xF3n mayor al permitido" data-success="">Descripci\xF3n</label>\n                            </div>\n                            \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <select id="tipo">\n                                    <option value="PRINCIPAL" ', '>PRINCIPAL</option>\n                                    <option value="SECUNDARIO" ', '>SECUNDARIO</option>\n                                </select>\n                                <label>Tipo</label>\n                            </div>\n                             \n                        </div>\n                        \n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Almac\xE9n</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                             <input style="text-transform: uppercase;" id="almacen_cod" value="', '" type="text" class="validate" data-length="50">\n                             <label for="almacen_cod" id="lalmacen_cod" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Almac\xE9n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="descripcion" type="text" data-length="200">\n                                <label for="descripcion" id="ldescripcion" class="active" data-error="Descripci\xF3n mayor al permitido" data-success="">Descripci\xF3n</label>\n                            </div>\n                            \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <select id="tipo">\n                                    <option value="PRINCIPAL" ', '>PRINCIPAL</option>\n                                    <option value="SECUNDARIO" ', '>SECUNDARIO</option>\n                                </select>\n                                <label>Tipo</label>\n                            </div>\n                             \n                        </div>\n                        \n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Almac\xE9n</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Almac\xE9n</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Almac\xE9n</a>\n                            </div>\n                            ']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(almacen) {
    var el = yo(_templateObject, almacen ? 'Editar Almacén' : 'Nuevo Almacén', almacen ? almacen.estado == 'ACTIVO' ? 'checked' : '' : 'checked', almacen ? "none" : "display", almacen ? almacen.almacen_cod : '', almacen ? almacen.descripcion : '', almacen ? almacen.tipo == "PRINCIPAL" ? 'selected' : '' : '', almacen ? almacen.tipo == "SECUNDARIO" ? 'selected' : '' : '', function () {
        return Guardar(almacen);
    }, almacen ? yo(_templateObject2, function () {
        return Eliminar(almacen);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('select').material_select();
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>almacenes()}" class="collection-item">Todos los Almacenes</a>
        <a href="#!" class="collection-item active">Nuevo Almacén</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}
function Guardar(a) {
    var props = {
        'almacen_cod': { maxLen: 50 },
        'descripcion': { maxLen: 200 }
    };
    if (!Validar(props)) return;

    ShowLoader();
    var almacen_id = a ? a.almacen_id : -1;
    var almacen_cod = $('#almacen_cod').val().toUpperCase();
    var descripcion = $('#descripcion').val().toUpperCase();
    var tipo = $('#tipo').val();
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            almacen_id: almacen_id,
            almacen_cod: almacen_cod,
            descripcion: descripcion,
            tipo: tipo,
            estado: estado
        })
    };

    fetch(_constantes.URL + '/almacenes_api/save_almacen', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.almacenes.length > 0) {
                (0, _index.almacenes)();
            }
        }
        HideLoader();
    });
}
function Eliminar(a) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var almacen_id = a.almacen_id;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                almacen_id: almacen_id
            })
        };
        fetch(_constantes.URL + '/almacenes_api/delete_almacen', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletealmacen == 'Se elimino correctamente') {
                    (0, _index.almacenes)();
                }
            }
            HideLoader();
        });
    }
}
function nuevoAlmacen(almacen) {
    ShowLoader();
    Ver(almacen);
    HideLoader();
}

exports.nuevoAlmacen = nuevoAlmacen;

},{"../constantes_entorno/constantes":343,"./index":341,"empty-element":330,"yo-yo":338}],343:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENV_WEB = false;

var URL = ENV_WEB ? '' : 'http://localhost:5000'; //'http://192.168.1.6:5000'

exports.ENV_WEB = ENV_WEB;
exports.URL = URL;

},{}],344:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.documentos = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Documentos</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="documento_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="documento_busqueda" >Ingrese el nombre del documento para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>                    \n                </div>               \n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Documentos</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="documento_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="documento_busqueda" >Ingrese el nombre del documento para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>                    \n                </div>               \n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Descripci\xF3n</th>\n                    <th>Tipo</th>\n                    <th>Formato</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Descripci\xF3n</th>\n                    <th>Tipo</th>\n                    <th>Formato</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(documentos, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(documentos, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Documentos</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nuevo Documento</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var documento_busqueda = document.getElementById('documento_busqueda').value.toUpperCase();
    fetchDocumentos(tamano_pagina, pagina_actual, documento_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.documentos, paginas, pagina_actual));
        }
    });
}

function VerTabla(documentos, paginas, pagina_actual) {
    return yo(_templateObject2, documentos.map(function (d) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevoDocumento)(d);
        }, d.descripcion_doc, d.tipo_doc, d.formato_doc, d.estado == "ACTIVO" ? 'blue' : 'red', d.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchDocumentos(tamano_pagina, _numero_pagina, documento_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            documento_busqueda: documento_busqueda
        })
    };
    fetch(_constantes.URL + '/documentos_api/get_documentos', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function documentos(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchDocumentos(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.documentos, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.documentos = documentos;

},{"../constantes_entorno/constantes":343,"./nuevo":346,"empty-element":330,"yo-yo":338}],345:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevaserie = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div>\n        <div class="modal-content">\n            <h5 class="header">', '</h5>\n            <div class="row">\n                <form class="col s12">\n                     \n                    <div class="row">\n                        <div class="col s6">\n                            <label>Estado</label>\n                            <div class="switch">\n                                <label>\n                                Inactivo\n                                <input id="estado" ', ' type="checkbox">\n                                <span class="lever"></span>\n                                Activo\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <input id="nro_serie" type="number" class="validate" value="', '">\n                            <label class="active">N\xFAmero Serie</label>\n                        </div>\n                        <div class="input-field col s6">\n                            <input id="nro_inicio" type="number" class="validate" value="', '">\n                            <label class="active">N\xFAmero Inicio</label>\n                        </div>\n                    </div>\n                        \n                    <div class="row">\n                        \n                        <div class="input-field col s6">\n                            <select id="cod_sucursal">\n                                ', '\n                            </select>\n                            <label>Sucursal</label>\n                        </div>\n\n                        <div class="input-field col s6">\n                            <select id="esta_afecto">\n                                <option value="1"  ', '>SI</option>\n                                <option value="0" ', '>NO</option>\n                            </select>\n                            <label>Esta Afecto?</label>\n                        </div>\n                            \n                    </div>\n                    \n                        \n                    <div class="row">\n                        <div class="col s6">\n                            <a onclick=', ' class="waves-effect waves-light btn">Guardar Serie</a>\n                        </div>\n                        ', '\n                    </div>\n                    \n                </form>\n            </div>\n        </div>\n    </div>'], ['\n    <div>\n        <div class="modal-content">\n            <h5 class="header">', '</h5>\n            <div class="row">\n                <form class="col s12">\n                     \n                    <div class="row">\n                        <div class="col s6">\n                            <label>Estado</label>\n                            <div class="switch">\n                                <label>\n                                Inactivo\n                                <input id="estado" ', ' type="checkbox">\n                                <span class="lever"></span>\n                                Activo\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <input id="nro_serie" type="number" class="validate" value="', '">\n                            <label class="active">N\xFAmero Serie</label>\n                        </div>\n                        <div class="input-field col s6">\n                            <input id="nro_inicio" type="number" class="validate" value="', '">\n                            <label class="active">N\xFAmero Inicio</label>\n                        </div>\n                    </div>\n                        \n                    <div class="row">\n                        \n                        <div class="input-field col s6">\n                            <select id="cod_sucursal">\n                                ', '\n                            </select>\n                            <label>Sucursal</label>\n                        </div>\n\n                        <div class="input-field col s6">\n                            <select id="esta_afecto">\n                                <option value="1"  ', '>SI</option>\n                                <option value="0" ', '>NO</option>\n                            </select>\n                            <label>Esta Afecto?</label>\n                        </div>\n                            \n                    </div>\n                    \n                        \n                    <div class="row">\n                        <div class="col s6">\n                            <a onclick=', ' class="waves-effect waves-light btn">Guardar Serie</a>\n                        </div>\n                        ', '\n                    </div>\n                    \n                </form>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<option value="', '" ', '>', '</option>'], ['<option value="', '" ', '>', '</option>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                        <div class="col s6">\n                            <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Serie</a>\n                        </div>\n                        '], ['\n                        <div class="col s6">\n                            <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Serie</a>\n                        </div>\n                        ']),
    _templateObject4 = _taggedTemplateLiteral([''], ['']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(documento, serie, sucursales) {
    var el = yo(_templateObject, serie ? 'Editar Serie' : 'Nueva Serie', serie ? serie.estado == 'ACTIVO' ? 'checked' : '' : 'checked', serie ? serie.nro_serie : '', serie ? serie.nro_inicio : '', sucursales.map(function (u) {
        return yo(_templateObject2, u.cod_sucursal, serie ? serie.cod_sucursal == u.cod_sucursal ? 'selected' : '' : '', u.cod_sucursal);
    }), serie ? serie.esta_afecto == "1" ? 'selected' : '' : '', serie ? serie.esta_afecto == "0" ? 'selected' : '' : '', function () {
        return Guardar(documento, serie);
    }, serie ? yo(_templateObject3, function () {
        return Eliminar(documento, serie);
    }) : yo(_templateObject4));
    var container = document.getElementById('modal');
    empty(container).appendChild(el);
    $('select').material_select();
    $('#modal').modal();
    $('#modal').modal('open');
}

function Eliminar(documento, serie) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_documento = documento.cod_documento;
        var nro_serie = serie.nro_serie;
        var nro_inicio = serie.nro_inicio;
        var cod_sucursal = serie.cod_sucursal;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_documento: cod_documento,
                nro_serie: nro_serie,
                nro_inicio: nro_inicio,
                cod_sucursal: cod_sucursal
            })
        };
        fetch(_constantes.URL + '/documentos_api/delete_serie', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deleteserie == 'Se elimino correctamente') {
                    (0, _nuevo.nuevoDocumento)(documento);
                }
            }
            HideLoader();
            $("#modal").modal('close');
        });
    }
}

function Guardar(documento, serie) {
    var cod_documento = documento.cod_documento;
    var nro_serie = $('#nro_serie').val();
    var nro_inicio = $('#nro_inicio').val();
    var cod_sucursal = $('#cod_sucursal').val();
    var esta_afecto = $("#esta_afecto").val();
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_documento: cod_documento,
            nro_serie: nro_serie,
            nro_inicio: nro_inicio,
            cod_sucursal: cod_sucursal,
            esta_afecto: esta_afecto,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/documentos_api/save_serie', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.series.length > 0) {
                (0, _nuevo.nuevoDocumento)(documento);
            }
        }
        $("#modal").modal('close');
    });
}

function nuevaserie(documento, serie) {
    ShowLoader();

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tamano_pagina: 500,
            numero_pagina: 1,
            sucursal_busqueda: ''
        })
    };
    fetch(_constantes.URL + '/sucursales_api/get_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        //Ver(sucursal,res.ubigeos) 
        Ver(documento, serie, res.sucursales);

        HideLoader();
    });

    HideLoader();
}

exports.nuevaserie = nuevaserie;

},{"../constantes_entorno/constantes":343,"./nuevo":346,"empty-element":330,"yo-yo":338}],346:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevoDocumento = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_documento">Documento</a></li>\n                        ', '\n                    </ul>\n                </div>\n\n                <div id="tab_documento" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <form class="col s12">\n                            <div class="row" id="box_error" style="display:none;">\n                                <div class="col s12">\n                                <div class="card-panel  red lighten-2">\n                                    <span class="white-text" id = "text_error"></span>\n                                </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6" style="display:', '">\n                                    <input style="text-transform: uppercase;" id="cod_documento" type="text" class="validate">\n                                    <label class="active" for="cod_documento" id="lcod_documento" data-error="" data-success="">Codigo Documento</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform: uppercase;" value="', '" id="descripcion_doc" type="text">\n                                    <label class="active" for="descripcion_doc" id="ldescripcion_doc" data-error="" data-success="">Descripcion</label>\n                                </div>\n                                \n                            </div>\n                            \n                            <div class="row">\n                                \n                                <div class="input-field col s6">\n                                    <input value="', '" id="tipo_doc" type="text" class="validate">\n                                    <label for="tipo_doc" class="active">Tipo</label>\n                                </div>\n\n                                <div class="input-field col s6">\n                                    <input value="', '" id="formato_doc" type="text" class="validate">\n                                    <label for="formato_doc" class="active">Formato</label>\n                                </div>\n                                \n                            </div>\n                            \n                            \n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Guardar Documento</a>\n                                </div>\n                                ', '\n                            </div>\n                        </form>\n                    </div>\n                </div>\n                ', '\n                \n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_documento">Documento</a></li>\n                        ', '\n                    </ul>\n                </div>\n\n                <div id="tab_documento" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <form class="col s12">\n                            <div class="row" id="box_error" style="display:none;">\n                                <div class="col s12">\n                                <div class="card-panel  red lighten-2">\n                                    <span class="white-text" id = "text_error"></span>\n                                </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6" style="display:', '">\n                                    <input style="text-transform: uppercase;" id="cod_documento" type="text" class="validate">\n                                    <label class="active" for="cod_documento" id="lcod_documento" data-error="" data-success="">Codigo Documento</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform: uppercase;" value="', '" id="descripcion_doc" type="text">\n                                    <label class="active" for="descripcion_doc" id="ldescripcion_doc" data-error="" data-success="">Descripcion</label>\n                                </div>\n                                \n                            </div>\n                            \n                            <div class="row">\n                                \n                                <div class="input-field col s6">\n                                    <input value="', '" id="tipo_doc" type="text" class="validate">\n                                    <label for="tipo_doc" class="active">Tipo</label>\n                                </div>\n\n                                <div class="input-field col s6">\n                                    <input value="', '" id="formato_doc" type="text" class="validate">\n                                    <label for="formato_doc" class="active">Formato</label>\n                                </div>\n                                \n                            </div>\n                            \n                            \n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Guardar Documento</a>\n                                </div>\n                                ', '\n                            </div>\n                        </form>\n                    </div>\n                </div>\n                ', '\n                \n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<li class="tab col s3"><a href="#tab_serie" onclick="', '">Series</a></li>'], ['<li class="tab col s3"><a href="#tab_serie" onclick="', '">Series</a></li>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Documento</a>\n                                </div>\n                                '], ['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Documento</a>\n                                </div>\n                                ']),
    _templateObject4 = _taggedTemplateLiteral([''], ['']),
    _templateObject5 = _taggedTemplateLiteral(['<div id="tab_serie" class="col s12"></div>'], ['<div id="tab_serie" class="col s12"></div>']),
    _templateObject6 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nro Serie</th>\n                    <th>Nro Inicio</th>\n                    <th>Sucursal</th>\n                    <th>Esta afectado</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nro Serie</th>\n                    <th>Nro Inicio</th>\n                    <th>Sucursal</th>\n                    <th>Esta afectado</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject7 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject8 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']),
    _templateObject9 = _taggedTemplateLiteral(['\n        <div class="row"> \n            <br><br>\n            <div class="col-md-12">\n                <div class="row">\n                    <div class="col s12">\n                        <a onclick=', ' class="waves-effect waves-light btn blue accent-2 lighten-3">Agregar serie</a>\n                    </div>\n                </div> \n                <div class="row">\n                    <form class="col s12">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="serie_busqueda" onkeyup="', '" type="number" class="validate">\n                            <label for="serie_busqueda" >Ingrese el numero de la serie para buscar</label>\n                        </div>\n                    </form>\n                </div> \n                <div class="row">\n                    <div class="input-field col s12">\n                        <div id="div_tabla">                            \n                            ', '\n                        </div>\n                    </div>\n                </div> \n            </div>\n        </div>'], ['\n        <div class="row"> \n            <br><br>\n            <div class="col-md-12">\n                <div class="row">\n                    <div class="col s12">\n                        <a onclick=', ' class="waves-effect waves-light btn blue accent-2 lighten-3">Agregar serie</a>\n                    </div>\n                </div> \n                <div class="row">\n                    <form class="col s12">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="serie_busqueda" onkeyup="', '" type="number" class="validate">\n                            <label for="serie_busqueda" >Ingrese el numero de la serie para buscar</label>\n                        </div>\n                    </form>\n                </div> \n                <div class="row">\n                    <div class="input-field col s12">\n                        <div id="div_tabla">                            \n                            ', '\n                        </div>\n                    </div>\n                </div> \n            </div>\n        </div>']);

var _constantes = require('../constantes_entorno/constantes');

var _nueva_serie = require('./nueva_serie');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(documento, series, paginas, pagina_actual) {
    var el = yo(_templateObject, documento && yo(_templateObject2, function () {
        return CargarTabSeries(documento, series, paginas, pagina_actual);
    }), documento ? documento.estado == 'ACTIVO' ? 'checked' : '' : 'checked', documento ? "none" : "display", documento ? documento.descripcion_doc : '', documento ? documento.tipo_doc : '', documento ? documento.formato_doc : '', function () {
        return Guardar(documento);
    }, documento ? yo(_templateObject3, function () {
        return Eliminar(documento);
    }) : yo(_templateObject4), documento && yo(_templateObject5));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('ul.tabs').tabs();
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>documentos()}" class="collection-item">Todos los Documentos</a>
        <a href="#!" class="collection-item active">Nuevo Documento</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}

function VerTablaSeries(documento, series, paginas, pagina_actual) {
    return yo(_templateObject6, series.map(function (s) {
        return yo(_templateObject7, function () {
            return AgregarSerie(documento, s);
        }, s.nro_serie, s.nro_inicio, s.cod_sucursal, s.esta_afecto == 0 ? 'NO' : 'SI', s.estado == "ACTIVO" ? 'blue' : 'red', s.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? BuscarSerie(documento, pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject8, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return BuscarSerie(documento, i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? BuscarSerie(documento, pagina_actual + 1) : null;
    });
}

function CargarTabSeries(documento, series, paginas, pagina_actual) {
    var el = yo(_templateObject9, function () {
        return AgregarSerie(documento);
    }, function () {
        return BuscarSerie(documento, 1);
    }, VerTablaSeries(documento, series, paginas, pagina_actual));
    var container = document.getElementById('tab_serie');
    empty(container).appendChild(el);
}

function fetchSeries(documento, tamano_pagina, _numero_pagina, serie_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            serie_busqueda: serie_busqueda,
            cod_documento_cod: documento ? documento.cod_documento : ''
        })
    };
    fetch(_constantes.URL + '/documentos_api/get_series', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function BuscarSerie(documento, pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var serie_busqueda = document.getElementById('serie_busqueda').value.toUpperCase();
    fetchSeries(documento, tamano_pagina, pagina_actual, serie_busqueda.length > 0 ? serie_busqueda : null, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTablaSeries(documento, res.series, paginas, pagina_actual));
        }
    });
}

function Guardar(d) {

    var props = {
        'cod_documento': {},
        'descripcion_doc': {}
    };
    if (!Validar(props)) return;

    ShowLoader();
    var cod_documento = d ? d.cod_documento : $("#cod_documento").val().toUpperCase();
    var descripcion_doc = $('#descripcion_doc').val().toUpperCase();
    var tipo_doc = $('#tipo_doc').val();
    var formato_doc = $('#formato_doc').val();
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_documento: cod_documento,
            descripcion_doc: descripcion_doc,
            tipo_doc: tipo_doc,
            formato_doc: formato_doc,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/documentos_api/save_documento', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        HideLoader();
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.documentos.length > 0) {
                nuevoDocumento(res.documentos[0]);
            }
        }
    });
}

function Eliminar(documento) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_documento = documento.cod_documento;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_documento: cod_documento
            })
        };
        fetch(_constantes.URL + '/documentos_api/delete_documento', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletedocumento == 'Se elimino correctamente') {
                    (0, _index.documentos)();
                }
            }
            HideLoader();
        });
    }
}

function AgregarSerie(documento, s) {
    (0, _nueva_serie.nuevaserie)(documento, s);
}

function nuevoDocumento(documento, _numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchSeries(documento, tamano_pagina, _numero_pagina, null, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(documento, res.series, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });

    // Ver(documento)
    // HideLoader()
}

exports.nuevoDocumento = nuevoDocumento;

},{"../constantes_entorno/constantes":343,"./index":344,"./nueva_serie":345,"empty-element":330,"yo-yo":338}],347:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cajas = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Cajas</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="caja_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="caja_busqueda" >Ingrese la caja para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Cajas</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="caja_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="caja_busqueda" >Ingrese la caja para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre Caja</th>\n                    <th>Sucursal</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre Caja</th>\n                    <th>Sucursal</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(cajas, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(cajas, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las cajas</a>
        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item">Nueva Caja</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var caja_busqueda = document.getElementById('caja_busqueda').value.toUpperCase();
    fetchCajas(tamano_pagina, pagina_actual, caja_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.cajas, paginas, pagina_actual));
        }
    });
}
function VerTabla(cajas, paginas, pagina_actual) {
    return yo(_templateObject2, cajas.map(function (c) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevaCaja)(c);
        }, c.nombre_caja, c.nombre_sucursal, c.estado == "ACTIVO" ? 'blue' : 'red', c.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}
function fetchCajas(tamano_pagina, _numero_pagina, caja_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            caja_busqueda: caja_busqueda
        })
    };
    fetch(_constantes.URL + '/ecaja_caja/get_cajas', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}
function cajas(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchCajas(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.cajas, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.cajas = cajas;

},{"../constantes_entorno/constantes":343,"./nuevo":348,"empty-element":330,"yo-yo":338}],348:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevaCaja = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nueva Caja</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre_caja" type="text" class="validate">\n                                <label id="lnombre_caja" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Caja</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="cod_sucursal"> \n                                    ', '\n                                    ', ' \n                                </select>\n                                <label id="lcod_sucursal">C\xF3digo Sucursal</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input id="clave" type="password" class="validate">\n                                <label for="" class="active" id="lclave">Clave</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="observacion" class="materialize-textarea" value="', '">\n                                <label for="observacion" class="active">Observaci\xF3n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input id="nombre_ip" type="text" class="validate" value="', '">\n                                <label for="nombre_ip" class="active">Nombre IP</label>\n                            </div>\n                        </div>\n                        \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Caja</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nueva Caja</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre_caja" type="text" class="validate">\n                                <label id="lnombre_caja" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Caja</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="cod_sucursal"> \n                                    ', '\n                                    ', ' \n                                </select>\n                                <label id="lcod_sucursal">C\xF3digo Sucursal</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input id="clave" type="password" class="validate">\n                                <label for="" class="active" id="lclave">Clave</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="observacion" class="materialize-textarea" value="', '">\n                                <label for="observacion" class="active">Observaci\xF3n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input id="nombre_ip" type="text" class="validate" value="', '">\n                                <label for="nombre_ip" class="active">Nombre IP</label>\n                            </div>\n                        </div>\n                        \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Caja</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<div class="input-field col s6">\n                                <input value="', '" id="cod_caja" type="text" class="validate">\n                                <label id="lcod_caja" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>\n                            </div>'], ['<div class="input-field col s6">\n                                <input value="', '" id="cod_caja" type="text" class="validate">\n                                <label id="lcod_caja" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>\n                            </div>']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']),
    _templateObject4 = _taggedTemplateLiteral(['<option value="">Seleccione una sucursal</div>'], ['<option value="">Seleccione una sucursal</div>']),
    _templateObject5 = _taggedTemplateLiteral(['<option style="text-transform:uppercase" value="', '" ', '>', '</option>'], ['<option style="text-transform:uppercase" value="', '" ', '>', '</option>']),
    _templateObject6 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Caja</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Caja</a>\n                            </div>\n                            ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(caja, sucursales) {
    var el = yo(_templateObject, caja ? caja.estado == 'ACTIVO' ? 'checked' : '' : 'checked', !caja ? yo(_templateObject2, caja ? caja.cod_caja : '') : yo(_templateObject3), caja ? caja.nombre_caja : '', caja ? yo(_templateObject3) : yo(_templateObject4), sucursales.map(function (e) {
        return yo(_templateObject5, e.cod_sucursal, caja ? caja.cod_sucursal == e.cod_sucursal ? 'selected' : '' : '', e.nombre);
    }), caja ? caja.observacion : '', caja ? caja.nombre_ip : '', function () {
        return Guardar(caja);
    }, caja ? yo(_templateObject6, function () {
        return Eliminar(caja);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>cajas()}" class="collection-item">Todos las Cajas</a>
        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item active">Nueva Caja</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}

function Guardar(u) {
    var props = {
        'cod_caja': {},
        'cod_sucursal': {},
        'nombre_caja': {},
        'clave': { minLen: 4 }
    };
    if (!Validar(props)) return;
    ShowLoader();
    var cod_caja = u ? u.cod_caja : document.getElementById('cod_caja').value.toUpperCase();
    var cod_sucursal = document.getElementById('cod_sucursal').value.toUpperCase();
    var nombre_caja = document.getElementById('nombre_caja').value.toUpperCase();
    var clave = document.getElementById('clave').value.toUpperCase();
    var observacion = document.getElementById('observacion').value.toUpperCase();
    var nombre_ip = document.getElementById('nombre_ip').value.toUpperCase();
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_caja: cod_caja,
            cod_sucursal: cod_sucursal,
            nombre_caja: nombre_caja,
            clave: clave,
            observacion: observacion,
            nombre_ip: nombre_ip,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/ecaja_caja/save_caja', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.cajas.length > 0) {
                (0, _index.cajas)();
            }
        }
        HideLoader();
    });
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_caja = u.cod_caja;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_caja: cod_caja
            })
        };
        fetch(_constantes.URL + '/ecaja_caja/delete_caja', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            console.log(res);
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                    (0, _index.cajas)();
                }
            }
            HideLoader();
        });
    }
}
function nuevaCaja(caja) {
    ShowLoader();

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tamano_pagina: 10,
            numero_pagina: 1,
            sucursal_busqueda: ''
        })
    };
    fetch(_constantes.URL + '/sucursales_api/get_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            console.log(res.err);
        } else {
            Ver(caja, res.sucursales);
        }
    });

    HideLoader();
}

exports.nuevaCaja = nuevaCaja;

},{"../constantes_entorno/constantes":343,"./index":347,"empty-element":330,"yo-yo":338}],349:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.comprobantes = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Comprobantes</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="comprobante_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="comprobante_busqueda" >Ingrese el comprobante para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Comprobantes</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="comprobante_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="comprobante_busqueda" >Ingrese el comprobante para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Cod. Documento.</th>\n                    <th>Serie</th>\n                    <th>Numero</th>\n                    <th>Fecha Emision</th>\n                    <th>Cliente</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Cod. Documento.</th>\n                    <th>Serie</th>\n                    <th>Numero</th>\n                    <th>Fecha Emision</th>\n                    <th>Cliente</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(comprobantes, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(comprobantes, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las cajas</a>
        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item">Nueva Caja</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var comprobante_busqueda = document.getElementById('comprobante_busqueda').value.toUpperCase();
    fetchComprobantes(tamano_pagina, pagina_actual, comprobante_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.comprobantes, paginas, pagina_actual));
        }
    });
}
function VerTabla(comprobantes, paginas, pagina_actual) {
    return yo(_templateObject2, comprobantes.map(function (c) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevoComprobante)(c);
        }, c.comp_cod_documento, c.comp_nro_serie, c.comp_numero, c.fecha_emision, c.nombre_cliente, c.comp_estado == "EMITIDO" ? 'blue' : 'red', c.comp_estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}
function fetchComprobantes(tamano_pagina, _numero_pagina, comprobante_busqueda, callback) {
    var numero_serie_busqueda = -1;
    if (comprobante_busqueda.match(/^[0-9]+$/) != null) {
        numero_serie_busqueda = parseInt(comprobante_busqueda);
        comprobante_busqueda = "";
    }

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            comprobante_busqueda: comprobante_busqueda,
            numero_serie_busqueda: numero_serie_busqueda
        })
    };
    console.log("parametros comprobante");
    console.log(parametros);

    fetch(_constantes.URL + '/ecaja_comprobante/get_comprobantes', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}
function comprobantes(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchComprobantes(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.comprobantes, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.comprobantes = comprobantes;

},{"../constantes_entorno/constantes":343,"./nuevo":350,"empty-element":330,"yo-yo":338}],350:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevoComprobante = undefined;

var _templateObject = _taggedTemplateLiteral([' \n        <div class="card" id="divInvoice">\n            <div class="card-content">\n                <div class="row">\n                    <div class="col m12 s12">\n                        <div class="row">\n                            <div class="col s8 m8">\n                                <div class="row">\n                                    <div class="input-field col s6">\n                                        <select id="tipo_doc_ident" disabled>\n                                            <option value="DNI">DNI</option>\n                                            <option value="RUC">RUC</option>\n                                        </select>\n                                        <label>Tipo Documento</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" >\n                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divRazonSocial" style="display:none">\n                                    <div class="input-field col s12">\n                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" >\n                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divNombres">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40">\n                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                                <div class="row" id="divApellidos">\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30">\n                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30">\n                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>\n                                    </div>\n                                </div> \n\n                                <div class="row">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate">\n                                            <label class="active">Direccion</label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class="col s4 m4 right">\n                                <div class="card grey lighten-4">\n                                    <div class="card-content">\n                                        <div class="row">\n                                            <div class="col s12 m12">\n                                                <h5 id="tituloComprobante">R.U.C. 1111222234</h5>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s12 m12" id="divTipoComprobante">\n                                                <select id="cod_documento">\n                                                </select>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s6 m6" id="divSeries">\n                                                <select id="nro_serie"> \n                                                </select>\n                                            </div>\n                                            <div class="col s6 m6">\n                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" value="0">\n                                                <label class="active" for="numero" id="lnumero" data-error="" data-success="">N\xFAmero</label>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="input-field col s12">\n                                                <input value="" id="fecha" type="text" class="datepicker">\n                                                <label for="fecha" class="active" for="fecha" id="lfecha" data-error="" data-success="">Fecha</label>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                </div>\n                <div class="row">\n                    <table class="table table-hover" id="tablaComprobante">\n                        <thead>\n                            <tr>\n                                <th>Producto</th>\n                                <th>Cantidad</th> \n                                <th class="center">Precio</th>\n                                <th class="center">Total</th>\n                            </tr>\n                        </thead>\n                        <tbody id="bodyComprobante">\n                            \n                        </tbody>\n                        <tbody>\n                            \n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right">\n                                    <p>\n                                        <strong>Subtotal:\xA0</strong>\n                                    </p>\n                                    <p>\n                                        <strong>Descuento(%):\xA0</strong>\n                                    </p>\n                                </td>\n                                <td class="center">\n                                    <p>\n                                        <strong id="SumaTotal">0</strong>\n                                    </p>\n                                    <p>\n                                    <strong id="Descuento" contenteditable="true" ></strong>\n                                    </p>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right"><h5><strong>Total:\xA0</strong></h5></td>\n                                <td class="center"><h5><strong id="totalGlobal">0</strong></h5></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <a class="waves-effect grey darken-4 btn" ><i class="material-icons left">print</i>Imprimir</a>\n                </div>\n            </div>\n        </div>'], [' \n        <div class="card" id="divInvoice">\n            <div class="card-content">\n                <div class="row">\n                    <div class="col m12 s12">\n                        <div class="row">\n                            <div class="col s8 m8">\n                                <div class="row">\n                                    <div class="input-field col s6">\n                                        <select id="tipo_doc_ident" disabled>\n                                            <option value="DNI">DNI</option>\n                                            <option value="RUC">RUC</option>\n                                        </select>\n                                        <label>Tipo Documento</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" >\n                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divRazonSocial" style="display:none">\n                                    <div class="input-field col s12">\n                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" >\n                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                                    </div>\n                                </div>\n                                <div class="row" id="divNombres">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40">\n                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                                <div class="row" id="divApellidos">\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30">\n                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>\n                                    </div>\n                                    <div class="input-field col s6">\n                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30">\n                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>\n                                    </div>\n                                </div> \n\n                                <div class="row">\n                                    <div class="input-field col s12">\n                                        <div class="row">\n                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate">\n                                            <label class="active">Direccion</label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class="col s4 m4 right">\n                                <div class="card grey lighten-4">\n                                    <div class="card-content">\n                                        <div class="row">\n                                            <div class="col s12 m12">\n                                                <h5 id="tituloComprobante">R.U.C. 1111222234</h5>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s12 m12" id="divTipoComprobante">\n                                                <select id="cod_documento">\n                                                </select>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col s6 m6" id="divSeries">\n                                                <select id="nro_serie"> \n                                                </select>\n                                            </div>\n                                            <div class="col s6 m6">\n                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" value="0">\n                                                <label class="active" for="numero" id="lnumero" data-error="" data-success="">N\xFAmero</label>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="input-field col s12">\n                                                <input value="" id="fecha" type="text" class="datepicker">\n                                                <label for="fecha" class="active" for="fecha" id="lfecha" data-error="" data-success="">Fecha</label>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                </div>\n                <div class="row">\n                    <table class="table table-hover" id="tablaComprobante">\n                        <thead>\n                            <tr>\n                                <th>Producto</th>\n                                <th>Cantidad</th> \n                                <th class="center">Precio</th>\n                                <th class="center">Total</th>\n                            </tr>\n                        </thead>\n                        <tbody id="bodyComprobante">\n                            \n                        </tbody>\n                        <tbody>\n                            \n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right">\n                                    <p>\n                                        <strong>Subtotal:\xA0</strong>\n                                    </p>\n                                    <p>\n                                        <strong>Descuento(%):\xA0</strong>\n                                    </p>\n                                </td>\n                                <td class="center">\n                                    <p>\n                                        <strong id="SumaTotal">0</strong>\n                                    </p>\n                                    <p>\n                                    <strong id="Descuento" contenteditable="true" ></strong>\n                                    </p>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td> \xA0 </td>\n                                <td> \xA0 </td>\n                                <td class="right"><h5><strong>Total:\xA0</strong></h5></td>\n                                <td class="center"><h5><strong id="totalGlobal">0</strong></h5></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <a class="waves-effect grey darken-4 btn" ><i class="material-icons left">print</i>Imprimir</a>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item" onclick=', '>Todos los comprobantes</a>\n        <a href="#!" class="collection-item">Nuevo Comprobante</a>\n    </div>'], ['\n    <div class="collection">\n        <a href="#!" class="collection-item" onclick=', '>Atras</a>\n        <a href="#!" class="collection-item" onclick=', '>Todos los comprobantes</a>\n        <a href="#!" class="collection-item">Nuevo Comprobante</a>\n    </div>']);

var _index = require('./index');

var _inicio = require('../inicio');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

var contador = 0;
function VerComprobante(comprobante) {
    var idFila = contador;
    var el = yo(_templateObject);
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('select').material_select();

    var sub_nav = yo(_templateObject2, function () {
        return (0, _inicio.inicio)();
    }, function () {
        return (0, _index.comprobantes)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);

    $('.datepicker').pickadate({
        container: 'body',
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agos", "Set", "Oct", "Nov", "Dic"],
        weekdaysFull: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysLetter: ["D", "L", "M", "Mi", "J", "V", "S"],
        today: "Hoy",
        clear: "Limpiar",
        close: "Ok"
    });
    var $input = $('#fecha').pickadate();
    var picker = $input.pickadate('picker');
    picker.set('select', new Date());
}

function nuevoComprobante(pcomprobante) {
    ShowLoader();
    VerComprobante(pcomprobante);
    HideLoader();
}

exports.nuevoComprobante = nuevoComprobante;

},{"../inicio":365,"./index":349,"empty-element":330,"yo-yo":338}],351:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.empresas = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Empresas</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="empresa_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="empresa_busqueda" >Ingrese el nombre de la empresa para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>                    \n                </div>               \n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Empresas</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="empresa_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="empresa_busqueda" >Ingrese el nombre de la empresa para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>                    \n                </div>               \n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direccion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direccion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(empresas, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(empresas, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var empresa_busqueda = document.getElementById('empresa_busqueda').value.toUpperCase();
    fetchEmpresas(tamano_pagina, pagina_actual, empresa_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.empresas, paginas, pagina_actual));
        }
    });
}

function VerTabla(empresas, paginas, pagina_actual) {
    return yo(_templateObject2, empresas.map(function (e) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevaEmpresa)(e);
        }, e.razon_social, e.direccion, e.estado == "ACTIVO" ? 'blue' : 'red', e.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchEmpresas(tamano_pagina, _numero_pagina, empresa_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            empresa_busqueda: empresa_busqueda
        })
    };
    fetch(_constantes.URL + '/empresa_api/get_empresas', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function empresas(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchEmpresas(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.empresas, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.empresas = empresas;

},{"../constantes_entorno/constantes":343,"./nuevo":352,"empty-element":330,"yo-yo":338}],352:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevaEmpresa = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_empresa">Empresa</a></li>\n                        ', '\n                    </ul>\n                </div>\n\n                <div id="tab_empresa" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <form class="col s12">\n                            <div class="row" id="box_error" style="display:none;">\n                                <div class="col s12">\n                                <div class="card-panel  red lighten-2">\n                                    <span class="white-text" id = "text_error"></span>\n                                </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6" style="display:', '">\n                                    <input style="text-transform: uppercase;" id="cod_empresa" type="text" class="validate" value="', '">\n                                    <label class="active" for="cod_empresa" id="lcod_empresa" data-error="" data-success="">Codigo Empresa</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform: uppercase;" value="', '" id="nombre_corto" type="text">\n                                    <label class="active" for="nombre_corto" id="lnombre_corto" data-error="" data-success="">Nombre corto empresa</label>\n                                </div>\n                                \n                            </div>\n                            <div class="row">\n                                \n                                <div class="input-field col s12">\n                                    <input value="', '" id="ruc" type="text" class="validate">\n                                    <label for="ruc" class="active" id="lruc" data-error="" data-success="">R.U.C.</label>\n                                </div>\n                            </div>\n                            \n                            <div class="row">\n                                \n                                <div class="input-field col s12">\n                                    <input value="', '" id="razon_social" type="text" class="validate">\n                                    <label for="razon_social" class="active" id="lrazon_social" data-error="" data-success="">Razon Social</label>\n                                </div>\n                            </div>\n                            \n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="descripcion" type="text" class="validate">\n                                    <label for="descripcion" class="active">Descripcion</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="direccion" type="text" class="validate">\n                                    <label for="direccion" class="active">Direccion</label>\n                                </div>\n                                \n                            </div>\n                            \n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <input value="', '" id="telefono1" type="text" class="validate">\n                                    <label for="telefono1" class="active">Telefono 1</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input value="', '" id="telefono2" type="text" class="validate">\n                                    <label for="telefono2" class="active">Telefono 2</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="correo" type="email" class="validate">\n                                    <label for="correo" class="active">Correo</label>\n                                </div>\n                        \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="pagina_web" type="text" class="validate">\n                                    <label for="pagina_web" class="active">Pagina Web</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="col s6">\n                                    <div class="row">\n                                        <div class="col s12 file-field input-field">\n                                            <div class="btn">\n                                                <span>Cargar Imagen</span>\n                                                <input type="file" id="url_imagen" onchange="', '">\n                                            </div>\n                                            <div class="file-path-wrapper">\n                                                <input class="file-path validate" type="text">\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class="row">\n                                        <img class="col s6 materialboxed" id="url_imagen_previa" src="', '">\n                                    </div>\n                                </div>\n                                <div class="col s6">\n                                        <div class="row">\n                                            <div class="col s12 file-field input-field">\n                                                <div class="btn">\n                                                    <span>Cargar Imagen Impresion</span>\n                                                    <input type="file" id="url_imagen_impresion" onchange="', '">\n                                                </div>\n                                                <div class="file-path-wrapper">\n                                                    <input class="file-path validate" type="text">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <img class="col s6 materialboxed" id="url_imagen_impresion_previa" src="', '">\n                                        </div>\n                                    </div>\n                                </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Registrar Empresa</a>\n                                </div>\n                                ', '\n                            </div>\n                        </form>\n                    </div>\n                </div>\n                ', '\n                \n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_empresa">Empresa</a></li>\n                        ', '\n                    </ul>\n                </div>\n\n                <div id="tab_empresa" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <form class="col s12">\n                            <div class="row" id="box_error" style="display:none;">\n                                <div class="col s12">\n                                <div class="card-panel  red lighten-2">\n                                    <span class="white-text" id = "text_error"></span>\n                                </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6" style="display:', '">\n                                    <input style="text-transform: uppercase;" id="cod_empresa" type="text" class="validate" value="', '">\n                                    <label class="active" for="cod_empresa" id="lcod_empresa" data-error="" data-success="">Codigo Empresa</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform: uppercase;" value="', '" id="nombre_corto" type="text">\n                                    <label class="active" for="nombre_corto" id="lnombre_corto" data-error="" data-success="">Nombre corto empresa</label>\n                                </div>\n                                \n                            </div>\n                            <div class="row">\n                                \n                                <div class="input-field col s12">\n                                    <input value="', '" id="ruc" type="text" class="validate">\n                                    <label for="ruc" class="active" id="lruc" data-error="" data-success="">R.U.C.</label>\n                                </div>\n                            </div>\n                            \n                            <div class="row">\n                                \n                                <div class="input-field col s12">\n                                    <input value="', '" id="razon_social" type="text" class="validate">\n                                    <label for="razon_social" class="active" id="lrazon_social" data-error="" data-success="">Razon Social</label>\n                                </div>\n                            </div>\n                            \n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="descripcion" type="text" class="validate">\n                                    <label for="descripcion" class="active">Descripcion</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="direccion" type="text" class="validate">\n                                    <label for="direccion" class="active">Direccion</label>\n                                </div>\n                                \n                            </div>\n                            \n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <input value="', '" id="telefono1" type="text" class="validate">\n                                    <label for="telefono1" class="active">Telefono 1</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input value="', '" id="telefono2" type="text" class="validate">\n                                    <label for="telefono2" class="active">Telefono 2</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="correo" type="email" class="validate">\n                                    <label for="correo" class="active">Correo</label>\n                                </div>\n                        \n                            </div>\n\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <input value="', '" id="pagina_web" type="text" class="validate">\n                                    <label for="pagina_web" class="active">Pagina Web</label>\n                                </div>\n                                \n                            </div>\n\n                            <div class="row">\n                                <div class="col s6">\n                                    <div class="row">\n                                        <div class="col s12 file-field input-field">\n                                            <div class="btn">\n                                                <span>Cargar Imagen</span>\n                                                <input type="file" id="url_imagen" onchange="', '">\n                                            </div>\n                                            <div class="file-path-wrapper">\n                                                <input class="file-path validate" type="text">\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class="row">\n                                        <img class="col s6 materialboxed" id="url_imagen_previa" src="', '">\n                                    </div>\n                                </div>\n                                <div class="col s6">\n                                        <div class="row">\n                                            <div class="col s12 file-field input-field">\n                                                <div class="btn">\n                                                    <span>Cargar Imagen Impresion</span>\n                                                    <input type="file" id="url_imagen_impresion" onchange="', '">\n                                                </div>\n                                                <div class="file-path-wrapper">\n                                                    <input class="file-path validate" type="text">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <img class="col s6 materialboxed" id="url_imagen_impresion_previa" src="', '">\n                                        </div>\n                                    </div>\n                                </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Registrar Empresa</a>\n                                </div>\n                                ', '\n                            </div>\n                        </form>\n                    </div>\n                </div>\n                ', '\n                \n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<li class="tab col s3"><a href="#tab_sucursales" onclick="', '">Sucursales</a></li>'], ['<li class="tab col s3"><a href="#tab_sucursales" onclick="', '">Sucursales</a></li>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Empresa</a>\n                                </div>\n                                '], ['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Empresa</a>\n                                </div>\n                                ']),
    _templateObject4 = _taggedTemplateLiteral([''], ['']),
    _templateObject5 = _taggedTemplateLiteral(['<div id="tab_sucursales" class="col s12"></div>'], ['<div id="tab_sucursales" class="col s12"></div>']),
    _templateObject6 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direcci\xF3n</th>\n                    <th>Tel\xE9fono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direcci\xF3n</th>\n                    <th>Tel\xE9fono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject7 = _taggedTemplateLiteral(['\n                <tr>\n                    <td> \n                        <select id="', '" onchange="', '">\n                            <option value="ACTIVO" ', '>RELACIONADO</option>\n                            <option value="INACTIVO" ', '>NO RELACIONADO</option>\n                        </select>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td> \n                        <select id="', '" onchange="', '">\n                            <option value="ACTIVO" ', '>RELACIONADO</option>\n                            <option value="INACTIVO" ', '>NO RELACIONADO</option>\n                        </select>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject8 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']),
    _templateObject9 = _taggedTemplateLiteral(['\n        <div class="row"> \n            <br><br>\n            <div class="col-md-12">\n                <div class="row">\n                    <div class="col s12">\n                        <a onclick=', ' class="waves-effect waves-light btn blue accent-2 lighten-3">Nueva Sucursal</a>\n                    </div>\n                </div> \n                <div class="row">\n                    <form class="col s12">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="sucursal_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="sucursal_busqueda" >Ingrese la sucursal para buscar</label>\n                        </div>\n                    </form>\n                </div> \n                <div class="row">\n                    <div class="input-field col s12">\n                        <div id="div_tabla">                            \n                            ', '\n                        </div>\n                    </div>\n                </div> \n            </div>\n        </div>'], ['\n        <div class="row"> \n            <br><br>\n            <div class="col-md-12">\n                <div class="row">\n                    <div class="col s12">\n                        <a onclick=', ' class="waves-effect waves-light btn blue accent-2 lighten-3">Nueva Sucursal</a>\n                    </div>\n                </div> \n                <div class="row">\n                    <form class="col s12">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="sucursal_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="sucursal_busqueda" >Ingrese la sucursal para buscar</label>\n                        </div>\n                    </form>\n                </div> \n                <div class="row">\n                    <div class="input-field col s12">\n                        <div id="div_tabla">                            \n                            ', '\n                        </div>\n                    </div>\n                </div> \n            </div>\n        </div>']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

var _nuevo = require('../sucursales/nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(empresa, sucursales, paginas, pagina_actual) {
    var el = yo(_templateObject, empresa && yo(_templateObject2, function () {
        return CargarTabSucursales(empresa, sucursales, paginas, pagina_actual);
    }), empresa ? empresa.estado == 'ACTIVO' ? 'checked' : '' : 'checked', empresa ? "none" : "display", empresa ? empresa.cod_empresa : '', empresa ? empresa.nombre_corto : '', empresa ? empresa.ruc : '', empresa ? empresa.razon_social : '', empresa ? empresa.descripcion : '', empresa ? empresa.direccion : '', empresa ? empresa.telefono1 : '', empresa ? empresa.telefono2 : '', empresa ? empresa.correo : '', empresa ? empresa.pagina_web : '', CambiarImagen, empresa ? 'public/images/' + empresa.url_imagen : '', CambiarImagenImpresion, empresa ? 'public/images/' + empresa.url_imagen_impresion : '', function () {
        return Guardar(empresa);
    }, empresa ? yo(_templateObject3, function () {
        return Eliminar(empresa);
    }) : yo(_templateObject4), empresa && yo(_templateObject5));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    $('ul.tabs').tabs();
}

function VerTablaSucursales(empresa, sucursales, paginas, pagina_actual) {
    console.log(sucursales);
    return yo(_templateObject6, sucursales.map(function (s) {
        return yo(_templateObject7, s.cod_sucursal, function () {
            return InsertarRelacion(empresa, s);
        }, parseInt(s.flagEmpresaSucursal) != -1 || s.flagEmpresaSucursal != '-1' ? 'selected' : '', parseInt(s.flagEmpresaSucursal) == -1 || s.flagEmpresaSucursal == '-1' ? 'selected' : '', s.nombre, s.direccion, s.telefono, s.estado == "ACTIVO" ? 'blue' : 'red', s.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(empresa, pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject8, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(empresa, mi + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(empresa, pagina_actual + 1) : null;
    });
}

function CargarTabSucursales(empresa, sucursales, paginas, pagina_actual) {
    var el = yo(_templateObject9, function () {
        return (0, _nuevo.nuevaSucursal)();
    }, function () {
        return Buscar(empresa, 1);
    }, VerTablaSucursales(empresa, sucursales, paginas, pagina_actual));
    var container = document.getElementById('tab_sucursales');
    empty(container).appendChild(el);
    $('select').material_select();
}

function fetchSucursales(empresa, sucursal_busqueda, tamano_pagina, _numero_pagina, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            cod_empresa: empresa ? empresa.cod_empresa : '',
            sucursal_busqueda: sucursal_busqueda
        })
    };
    fetch(_constantes.URL + '/empresa_api/get_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function fetchRelacionarSucursal(empresa, sucursal, estado, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_empresa: empresa ? empresa.cod_empresa : '',
            cod_sucursal: sucursal.cod_sucursal,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/empresa_api/save_sucursal_empresa', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function CambiarImagen() {
    document.getElementById('url_imagen_previa').src = document.getElementById('url_imagen').files[0].path;
}

function CambiarImagenImpresion() {
    document.getElementById('url_imagen_impresion_previa').src = document.getElementById('url_imagen_impresion').files[0].path;
}

function InsertarRelacion(empresa, sucursal) {
    var estado = $("#" + sucursal.cod_sucursal).val();
    fetchRelacionarSucursal(empresa, sucursal, estado, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            (0, _index.empresas)();
        }
    });
}

function Buscar(empresa, pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var sucursal_busqueda = document.getElementById('sucursal_busqueda').value.toUpperCase();
    fetchSucursales(empresa, sucursal_busqueda, tamano_pagina, pagina_actual, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTablaSucursales(empresa, res.sucursales, paginas, pagina_actual));
        }
    });
}

function ValidarDimensionesImagen(callback) {
    var image = null;
    var file = null;
    var _URL = window.URL || window.webkitURL;

    if (file = document.getElementById('url_imagen_impresion').files[0]) {
        image = new Image();
        image.onload = function () {
            if (this.width == 192 && this.height == 192) {
                callback('ACEPTADO');
            } else {
                callback('RECHAZADO');
            }
        };
        image.src = _URL.createObjectURL(file);
    } else {
        callback('VACIO');
    }
}

function Guardar(e) {

    var props = {
        'cod_empresa': {},
        'nombre_corto': {},
        'razon_social': {},
        'ruc': {
            maxLength: 11,
            minLength: 11
        }
    };

    ValidarDimensionesImagen(function (variable) {
        if (variable != "RECHAZADO" && Validar(props)) {
            Guardar_(e, variable);
        } else {
            if (variable == "RECHAZADO") alert("El tamaño de la imagen de impresion no es permitido debe tener las dimensiones de 192 X 192. Se procedera a guardar la informacion sin la imagen de impresion", "Mensaje Informacion");
            if (Validar(props)) Guardar_(e, variable);else return;
        }
    });
}

function Guardar_(e, flag_dimension) {
    ShowLoader();

    var cod_empresa = e ? e.cod_empresa : $("#cod_empresa").val().toUpperCase();
    var nombre_corto = $("#nombre_corto").val().toUpperCase();
    var ruc = $("#ruc").val();
    var razon_social = $("#razon_social").val().toUpperCase();
    var descripcion = $("#descripcion").val().toUpperCase();
    var direccion = $("#direccion").val().toUpperCase();
    var telefono1 = $("#telefono1").val().toUpperCase();
    var telefono2 = $("#telefono2").val().toUpperCase();
    var correo = $("#correo").val();
    var pagina_web = $("#pagina_web").val().toUpperCase();
    var url_imagen = document.getElementById('url_imagen').files.length > 0 ? document.getElementById('url_imagen').files[0].path : '';
    var imagen_anterior = e ? e.url_imagen : '';
    var url_imagen_impresion = flag_dimension != "ACEPTADO" ? "" : document.getElementById('url_imagen_impresion').files.length > 0 ? document.getElementById('url_imagen_impresion').files[0].path : '';
    var imagen_anterior_impresion = e ? e.url_imagen_impresion : '';
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_empresa: cod_empresa,
            ruc: ruc,
            nombre_corto: nombre_corto,
            razon_social: razon_social,
            descripcion: descripcion,
            direccion: direccion,
            telefono1: telefono1,
            telefono2: telefono2,
            correo: correo,
            pagina_web: pagina_web,
            url_imagen: url_imagen,
            imagen_anterior: imagen_anterior,
            url_imagen_impresion: url_imagen_impresion,
            imagen_anterior_impresion: imagen_anterior_impresion,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/empresa_api/save_empresa', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        HideLoader();
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            (0, _index.empresas)();
        }
    });
}

function Eliminar(empresa) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_empresa = empresa.cod_empresa;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_empresa: cod_empresa
            })
        };
        fetch(_constantes.URL + '/empresa_api/delete_empresa', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                (0, _index.empresas)();
            }
            HideLoader();
        });
    }
}

/*function AgregarSerie(documento,s){
    nuevaserie(documento,s)
}*/

function nuevaEmpresa(empresa, _numero_pagina) {
    ShowLoader();
    HideLoader();
    var tamano_pagina = 5;
    fetchSucursales(empresa, '', tamano_pagina, _numero_pagina, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);
            Ver(empresa, res.sucursales, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.nuevaEmpresa = nuevaEmpresa;

},{"../constantes_entorno/constantes":343,"../sucursales/nuevo":376,"./index":351,"empty-element":330,"yo-yo":338}],353:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.categorias = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Categorias</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="categoria_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="categoria_busqueda" >Ingrese la categoria para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Categorias</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="categoria_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="categoria_busqueda" >Ingrese la categoria para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las categorias</a>\n        <a href="#!" onclick="', '" class="collection-item">Nueva Categoria</a>\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las categorias</a>\n        <a href="#!" onclick="', '" class="collection-item">Nueva Categoria</a>\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Imagen</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Imagen</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td> <img class="materialboxed" style="height:50px;width:50px;" src="public/images/', '"></td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td> <img class="materialboxed" style="height:50px;width:50px;" src="public/images/', '"></td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

var _eproductos = require('../eproductos.producto');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(_categorias, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(_categorias, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevo)();
    }, function () {
        return (0, _eproductos.productos)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var categoria_busqueda = document.getElementById('categoria_busqueda').value.toUpperCase();
    fetchCategorias(tamano_pagina, pagina_actual, categoria_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.categorias, paginas, pagina_actual));
        }
    });
}
function VerTabla(_categorias, paginas, pagina_actual) {
    return yo(_templateObject3, _categorias.map(function (c) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevo)(c);
        }, c.cod_categoria, c.nombre_categoria, c.imagen_url, c.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}
function fetchCategorias(tamano_pagina, _numero_pagina, categoria_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            categoria_busqueda: categoria_busqueda
        })
    };
    fetch(_constantes.URL + '/eproductos_categoria/get_categorias', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}
function categorias(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchCategorias(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.categorias, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.categorias = categorias;

},{"../constantes_entorno/constantes":343,"../eproductos.producto":356,"./nuevo":354,"empty-element":330,"yo-yo":338}],354:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nueva Categoria</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre_categoria" type="text" class="validate">\n                                <label id="lnombre_categoria" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Categoria</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6 file-field input-field">\n                                <div class="btn">\n                                    <span>Cargar</span>\n                                    <input type="file" id="imagen_url" onchange="', '">\n                                </div>\n                                <div class="file-path-wrapper">\n                                    <input class="file-path validate" type="text">\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <img class="col s6 materialboxed" id="imagen_previa" src="', '">\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Categoria</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nueva Categoria</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre_categoria" type="text" class="validate">\n                                <label id="lnombre_categoria" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Categoria</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6 file-field input-field">\n                                <div class="btn">\n                                    <span>Cargar</span>\n                                    <input type="file" id="imagen_url" onchange="', '">\n                                </div>\n                                <div class="file-path-wrapper">\n                                    <input class="file-path validate" type="text">\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <img class="col s6 materialboxed" id="imagen_previa" src="', '">\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Categoria</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<div class="input-field col s6">\n                                <input value="', '" id="cod_categoria" type="text" class="validate">\n                                <label id="lcod_categoria" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>\n                            </div>'], ['<div class="input-field col s6">\n                                <input value="', '" id="cod_categoria" type="text" class="validate">\n                                <label id="lcod_categoria" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>\n                            </div>']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']),
    _templateObject4 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Categoria</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Categoria</a>\n                            </div>\n                            ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos las categorias</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nueva Categoria</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos las categorias</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nueva Categoria</a>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(categoria) {
    var el = yo(_templateObject, categoria ? categoria.estado == 'ACTIVO' ? 'checked' : '' : 'checked', !categoria ? yo(_templateObject2, categoria ? categoria.cod_categoria : '') : yo(_templateObject3), categoria ? categoria.nombre_categoria : '', CambiarImagen, categoria ? 'public/images/' + categoria.imagen_url : '', function () {
        return Guardar(categoria);
    }, categoria ? yo(_templateObject4, function () {
        return Eliminar(categoria);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject5, function () {
        return (0, _index.categorias)();
    }, function () {
        return nuevo();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
}

function CambiarImagen() {
    document.getElementById('imagen_previa').src = document.getElementById('imagen_url').files[0].path;
}

function Guardar(u) {
    var props = {
        'cod_categoria': {},
        'nombre_categoria': {}
    };
    if (!Validar(props)) return;
    ShowLoader();
    var cod_categoria = u ? u.cod_categoria : document.getElementById('cod_categoria').value.toUpperCase();
    var nombre_categoria = document.getElementById('nombre_categoria').value.toUpperCase();
    var imagen_url = document.getElementById('imagen_url').files.length > 0 ? document.getElementById('imagen_url').files[0].path : '';
    var imagen_anterior = u ? u.imagen_url : '';
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_categoria: cod_categoria,
            nombre_categoria: nombre_categoria, imagen_url: imagen_url, estado: estado, imagen_anterior: imagen_anterior
        })
    };
    fetch(_constantes.URL + '/eproductos_categoria/save_categoria', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.categorias.length > 0) {
                (0, _index.categorias)();
            }
        }
        HideLoader();
    });
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_categoria = u.cod_categoria;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_categoria: cod_categoria
            })
        };
        fetch(_constantes.URL + '/eproductos_categoria/delete_categoria', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                    (0, _index.categorias)();
                }
            }
            HideLoader();
        });
    }
}
function nuevo(categoria) {
    ShowLoader();
    Ver(categoria);
    HideLoader();
}

exports.nuevo = nuevo;

},{"../constantes_entorno/constantes":343,"./index":353,"empty-element":330,"yo-yo":338}],355:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combinaciones = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="col s12">\n        <div id="modalCombinaciones" class="modal col s6 modal-fixed-footer">\n            <div class="modal-content">\n                <h5>Combinaciones</h5>\n                <div class="row">\n                    <a style="font-size:8pt;" \n                    class="waves-effect waves-light btn white teal-text text-accent-4" \n                    onclick="', '">\n                    <i class="material-icons left teal-text text-accent-4">add_box</i> Nueva Combinacion</a>\n                    <ul class="collapsible" data-collapsible="accordion">\n                        ', '\n                    </ul>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Guardar</a>\n            </div>\n        </div>\n        <div id="modalNuevaCombinacion" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <div id="modalAgregarItem" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <div id="modalSeleccionarProducto" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <br>\n        <div class="col s8">\n            \n            <div class="row">\n                <a style="font-size:8pt;" \n                class="waves-effect waves-light btn white teal-text text-accent-4" \n                onclick="', '" id="editarCombinaciones">\n                <i class="material-icons left teal-text text-accent-4">edit</i> Editar Combinaciones</a>\n            </div>\n            <div class="row">\n                <ul class="collapsible" data-collapsible="accordion">\n                    ', '\n                </ul>\n            </div>\n        </div>\n        <div class="col s4">\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">radio_button_checked</i> Obligatorio\n                </div>\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">check_box</i> Opcionales\n                </div>\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">add_box</i> Multiple\n                </div>\n        </div>\n    </div>'], ['\n    <div class="col s12">\n        <div id="modalCombinaciones" class="modal col s6 modal-fixed-footer">\n            <div class="modal-content">\n                <h5>Combinaciones</h5>\n                <div class="row">\n                    <a style="font-size:8pt;" \n                    class="waves-effect waves-light btn white teal-text text-accent-4" \n                    onclick="', '">\n                    <i class="material-icons left teal-text text-accent-4">add_box</i> Nueva Combinacion</a>\n                    <ul class="collapsible" data-collapsible="accordion">\n                        ', '\n                    </ul>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Guardar</a>\n            </div>\n        </div>\n        <div id="modalNuevaCombinacion" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <div id="modalAgregarItem" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <div id="modalSeleccionarProducto" class="modal col s6 modal-fixed-footer">\n            \n        </div>\n        <br>\n        <div class="col s8">\n            \n            <div class="row">\n                <a style="font-size:8pt;" \n                class="waves-effect waves-light btn white teal-text text-accent-4" \n                onclick="', '" id="editarCombinaciones">\n                <i class="material-icons left teal-text text-accent-4">edit</i> Editar Combinaciones</a>\n            </div>\n            <div class="row">\n                <ul class="collapsible" data-collapsible="accordion">\n                    ', '\n                </ul>\n            </div>\n        </div>\n        <div class="col s4">\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">radio_button_checked</i> Obligatorio\n                </div>\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">check_box</i> Opcionales\n                </div>\n                <div class="row">\n                    <i class="material-icons left deep-purple-text text-lighten-2">add_box</i> Multiple\n                </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<li>\n                            <div class="collapsible-header" onclick="', '">\n                                <p>\n                                <input onclick="', '" type="checkbox" ', ' class="filled-in" id="filled-in-box', '" />\n                                <label for="filled-in-box', '"></label>\n                                </p>\n\n                                <i class="material-icons">remove_red_eye</i><a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                <a href="#!" onclick="', '"><i class="material-icons indigo-text">edit</i></a>', '\n                            </div>\n                            <div class="collapsible-body" id="MOC', '">\n                                \n                            </div>\n                        </li>'], ['<li>\n                            <div class="collapsible-header" onclick="', '">\n                                <p>\n                                <input onclick="', '" type="checkbox" ', ' class="filled-in" id="filled-in-box', '" />\n                                <label for="filled-in-box', '"></label>\n                                </p>\n\n                                <i class="material-icons">remove_red_eye</i><a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                <a href="#!" onclick="', '"><i class="material-icons indigo-text">edit</i></a>', '\n                            </div>\n                            <div class="collapsible-body" id="MOC', '">\n                                \n                            </div>\n                        </li>']),
    _templateObject3 = _taggedTemplateLiteral(['<li>\n                        <div class="collapsible-header" onclick="', '">\n                            <i class="material-icons">expand_more</i>', '\n                        </div>\n                        <div class="collapsible-body" id="COM', '">\n                            \n                        </div>\n                    </li>'], ['<li>\n                        <div class="collapsible-header" onclick="', '">\n                            <i class="material-icons">expand_more</i>', '\n                        </div>\n                        <div class="collapsible-body" id="COM', '">\n                            \n                        </div>\n                    </li>']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nuevo Producto</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nuevo Producto</a>\n    </div>\n        ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div>\n        <div class="modal-content">\n            <h5>', ' Combinacion</h5>\n            <div class="row">\n                <div class="input-field col s12">\n                    <input value="', '" id="etiqueta_titulo" type="text" class="validate" placeholder="Elije sabores">\n                    <label for="etiqueta_titulo" class="active" id="letiqueta_titulo">Etiqueta</label>\n                </div>\n            </div>\n            <div class="row">\n                <div class="input-field col s6">\n                    <select id="tipo_combinacion" onchange="', '">\n                        <option value="OBLIGATORIO" ', '>Obligatorio</option>\n                        <option value="OPCIONAL" ', '>Opcionales</option>\n                        <option value="MULTIPLE" ', '>Multiple</option>\n                    </select>\n                    <label>Tipo de combinacion</label>\n                </div>\n                <div class="input-field col s6" id="input_cantidad_minima">\n                    <input value="', '" id="cantidad_minima" type="text" class="validate" placeholder="Ejmp. 1, 2, 3">\n                    <label for="cantidad_minima" class="active" id="lcantidad_minima">Seleccione al menos</label>\n                </div>\n            </div>\n            <div class="row">\n                <a style="font-size:8pt;" class="waves-effect waves-light btn white teal-text text-accent-4" \n                onclick="', '">\n                <i class="material-icons left teal-text text-accent-4">add</i> Agregar item</a>\n            </div>\n            <div id="tableItems">\n                <table class="col s12 table">\n                    <thead>\n                        <td></td>\n                        <td><label>Nombre</label></td>\n                        <td><label>Moneda</label></td>\n                        <td><label>Valor</label></td>\n                    </thead>\n                    <tbody id="titems">\n                        ', '\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Guardar</a>\n            <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n        </div>\n    </div>\n    '], ['\n    <div>\n        <div class="modal-content">\n            <h5>', ' Combinacion</h5>\n            <div class="row">\n                <div class="input-field col s12">\n                    <input value="', '" id="etiqueta_titulo" type="text" class="validate" placeholder="Elije sabores">\n                    <label for="etiqueta_titulo" class="active" id="letiqueta_titulo">Etiqueta</label>\n                </div>\n            </div>\n            <div class="row">\n                <div class="input-field col s6">\n                    <select id="tipo_combinacion" onchange="', '">\n                        <option value="OBLIGATORIO" ', '>Obligatorio</option>\n                        <option value="OPCIONAL" ', '>Opcionales</option>\n                        <option value="MULTIPLE" ', '>Multiple</option>\n                    </select>\n                    <label>Tipo de combinacion</label>\n                </div>\n                <div class="input-field col s6" id="input_cantidad_minima">\n                    <input value="', '" id="cantidad_minima" type="text" class="validate" placeholder="Ejmp. 1, 2, 3">\n                    <label for="cantidad_minima" class="active" id="lcantidad_minima">Seleccione al menos</label>\n                </div>\n            </div>\n            <div class="row">\n                <a style="font-size:8pt;" class="waves-effect waves-light btn white teal-text text-accent-4" \n                onclick="', '">\n                <i class="material-icons left teal-text text-accent-4">add</i> Agregar item</a>\n            </div>\n            <div id="tableItems">\n                <table class="col s12 table">\n                    <thead>\n                        <td></td>\n                        <td><label>Nombre</label></td>\n                        <td><label>Moneda</label></td>\n                        <td><label>Valor</label></td>\n                    </thead>\n                    <tbody id="titems">\n                        ', '\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Guardar</a>\n            <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n        </div>\n    </div>\n    ']),
    _templateObject6 = _taggedTemplateLiteral(['\n                        <tr id="', '">\n                            <td>\n                                <div class="">\n                                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                    <a href="#!" onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                                </div>\n                            </td>\n                            <td>', '</td>\n                            <td>SOLES</td>\n                            <td>', '</td>\n                        </tr>\n                        '], ['\n                        <tr id="', '">\n                            <td>\n                                <div class="">\n                                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                    <a href="#!" onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                                </div>\n                            </td>\n                            <td>', '</td>\n                            <td>SOLES</td>\n                            <td>', '</td>\n                        </tr>\n                        ']),
    _templateObject7 = _taggedTemplateLiteral(['\n                <table>\n                    ', '\n                </table>\n                '], ['\n                <table>\n                    ', '\n                </table>\n                ']),
    _templateObject8 = _taggedTemplateLiteral(['\n                        <tr>\n                            <td><i class="deep-purple-text text-lighten-2 material-icons">', '</i></td>\n                            <td>', '</td>\n                            <td>S/', '</td>\n                        </tr>\n                    '], ['\n                        <tr>\n                            <td><i class="deep-purple-text text-lighten-2 material-icons">', '</i></td>\n                            <td>', '</td>\n                            <td>S/', '</td>\n                        </tr>\n                    ']),
    _templateObject9 = _taggedTemplateLiteral(['\n                <a style="font-size:8pt;" \n                class="waves-effect waves-light btn white red-text text-darken-2" \n                onclick="', '">\n                <i class="material-icons left red-text text-darken-2">delete</i> Eliminar Combinacion</a>\n                '], ['\n                <a style="font-size:8pt;" \n                class="waves-effect waves-light btn white red-text text-darken-2" \n                onclick="', '">\n                <i class="material-icons left red-text text-darken-2">delete</i> Eliminar Combinacion</a>\n                ']),
    _templateObject10 = _taggedTemplateLiteral(['\n    <div>\n        <div class="modal-content">\n            <h5>', ' Item</h5>\n            <div class="row">\n                    <div class="input-field col s6">\n                        <input type="text" value="', '" id="nombre_producto" style="text-transform:uppercase">\n                        <label for="nombre_producto" class="active" id="lnombre_producto">Nombre del item</label>\n                    </div>\n                <div class="col s6">\n                    <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Sel. Producto</a>\n                </div>\n            </div>\n            <div class="row">\n                <div class="input-field col s6">\n                    <select id="cod_moneda">\n                        <option value="PEN" selected>Soles</option>\n                    </select>\n                    <label>Tipo de moneda</label>\n                </div>\n                <div class="input-field col s6">\n                    <input value="', '" id="precio" type="text" class="validate">\n                    <label for="precio" id="lprecio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">', '</a>\n            <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n        </div>\n    </div>\n    '], ['\n    <div>\n        <div class="modal-content">\n            <h5>', ' Item</h5>\n            <div class="row">\n                    <div class="input-field col s6">\n                        <input type="text" value="', '" id="nombre_producto" style="text-transform:uppercase">\n                        <label for="nombre_producto" class="active" id="lnombre_producto">Nombre del item</label>\n                    </div>\n                <div class="col s6">\n                    <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Sel. Producto</a>\n                </div>\n            </div>\n            <div class="row">\n                <div class="input-field col s6">\n                    <select id="cod_moneda">\n                        <option value="PEN" selected>Soles</option>\n                    </select>\n                    <label>Tipo de moneda</label>\n                </div>\n                <div class="input-field col s6">\n                    <input value="', '" id="precio" type="text" class="validate">\n                    <label for="precio" id="lprecio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">', '</a>\n            <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n        </div>\n    </div>\n    ']),
    _templateObject11 = _taggedTemplateLiteral(['\n        <div>\n            <div class="modal-content">\n                <h5>Seleccione el Producto</h5>\n                <br>\n                <br>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <input type="text" id="nombre_producto_sel" style="text-transform:uppercase" class="autocomplete">\n                        <label for="nombre_producto_sel" class="active" id="lnombre_producto_sel">Busque el producto</label>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Seleccionar</a>\n                <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n            </div>\n        </div>\n        '], ['\n        <div>\n            <div class="modal-content">\n                <h5>Seleccione el Producto</h5>\n                <br>\n                <br>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <input type="text" id="nombre_producto_sel" style="text-transform:uppercase" class="autocomplete">\n                        <label for="nombre_producto_sel" class="active" id="lnombre_producto_sel">Busque el producto</label>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Seleccionar</a>\n                <a href="#!" onclick="', '" class="waves-effect waves-green red btn">Cancelar</a>\n            </div>\n        </div>\n        ']),
    _templateObject12 = _taggedTemplateLiteral(['<table class="col s12 table">\n    <thead>\n        <td></td>\n        <td><label>Nombre</label></td>\n        <td><label>Moneda</label></td>\n        <td><label>Valor</label></td>\n    </thead>\n    <tbody id="titems">\n        ', '\n    </tbody>\n</table>'], ['<table class="col s12 table">\n    <thead>\n        <td></td>\n        <td><label>Nombre</label></td>\n        <td><label>Moneda</label></td>\n        <td><label>Valor</label></td>\n    </thead>\n    <tbody id="titems">\n        ', '\n    </tbody>\n</table>']),
    _templateObject13 = _taggedTemplateLiteral(['\n        <tr id="', '">\n            <td>\n                <div class="">\n                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                </div>\n            </td>\n            <td>', '</td>\n            <td>SOLES</td>\n            <td>', '</td>\n        </tr>\n        '], ['\n        <tr id="', '">\n            <td>\n                <div class="">\n                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                </div>\n            </td>\n            <td>', '</td>\n            <td>SOLES</td>\n            <td>', '</td>\n        </tr>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

var COMBINACIONES_PRODUCTO = [];
var ITEMS = [];
function Ver(combinaciones, combinaciones_producto, producto_id) {
    var el = yo(_templateObject, function () {
        return VerNuevaCombinacion();
    }, combinaciones.map(function (c) {
        return yo(_templateObject2, function () {
            return AbrirCombinacion(c, "MOC");
        }, function () {
            return SeleccionarCombinacion(c, producto_id);
        }, c.producto_id ? 'checked' : '', c.combinacion_id, c.combinacion_id, function () {
            return EliminarCombinacion(c);
        }, function () {
            return VerEditarCombinacion(c);
        }, c.etiqueta_titulo, c.combinacion_id);
    }), function () {
        return GuardarCombinaciones(producto_id);
    }, function () {
        return VerCombinaciones();
    }, combinaciones_producto.map(function (c) {
        return yo(_templateObject3, function () {
            return AbrirCombinacion(c, "COM");
        }, c.etiqueta_titulo, c.combinacion_id);
    }));
    var container = document.getElementById('tab_comb');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject4, function () {
        return (0, _index.productos)();
    }, function () {
        return nuevo();
    });
    $('.modal').modal();
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });
}
function SeleccionarCombinacion(c, producto_id) {
    var EstaSeleccionado = document.getElementById("filled-in-box" + c.combinacion_id).checked;
    COMBINACIONES_PRODUCTO.filter(function (com) {
        if (com.combinacion_id == c.combinacion_id) {
            com.producto_id = EstaSeleccionado ? producto_id : null;
        }
        return com;
    });
}

function EliminarCombinacion(combinacion) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var combinacion_id = combinacion.combinacion_id;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                combinacion_id: combinacion_id
            })
        };
        fetch(_constantes.URL + '/eproductos_combinacion/delete_combinacion', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                $('#modalNuevaCombinacion').modal('close');
                $('#modalCombinaciones').modal('close');
                combinaciones(PRODUCTO_ID_G, true);
            }
            HideLoader();
        });
    }
}

function GuardarCombinaciones(producto_id) {
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            combinaciones_producto: COMBINACIONES_PRODUCTO.filter(function (c) {
                return c.producto_id != null;
            }),
            producto_id: producto_id
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/save_combinaciones_producto', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            $('#modalCombinaciones').modal('close');
            combinaciones(producto_id);
        }
        HideLoader();
    });
}
function VerEditarCombinacion(combinacion) {
    var combinacion_id = combinacion.combinacion_id;
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            combinacion_id: combinacion_id
        })
    };
    fetch(_constantes.URL + '/eproductos_combinacion/get_combinacion_detalle', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            var it = res.items;
            ITEMS = [];
            for (var i = 0; i < it.length; i++) {
                var e = it[i];
                var dic = {
                    'detalle_id': e.detalle_id,
                    'producto_id': e.producto_id,
                    'nombre_producto': e.nombre_producto + (e.producto_id ? ' - ' + e.producto_id : ''),
                    'cod_moneda': e.cod_moneda,
                    'precio': e.precio
                };
                ITEMS.push(dic);
            }
            VerNuevaCombinacion(combinacion);
        }
        HideLoader();
    });
}

function VerCombinaciones() {
    $('#modalCombinaciones').modal('open');
}

function hideAlMenos() {
    var tipo = document.getElementById('tipo_combinacion').value;
    var cant = document.getElementById('input_cantidad_minima');
    if (tipo == 'OBLIGATORIO') {
        cant.classList.add('hide');
    } else {
        cant.classList.remove('hide');
    }
}

function VerNuevaCombinacion(combinacion) {
    $('#modalNuevaCombinacion').modal('open');
    if (combinacion == undefined) ITEMS = [];
    var el = yo(_templateObject5, combinacion ? 'Editar' : 'Nueva', combinacion ? combinacion.etiqueta_titulo : '', function (ev) {
        return hideAlMenos();
    }, combinacion ? combinacion.cantidad_maxima == 0 ? 'selected' : '' : 'selected', combinacion ? combinacion.cantidad_maxima == 1 ? 'selected' : '' : '', combinacion ? combinacion.cantidad_maxima >= 2 ? 'selected' : '' : '', combinacion ? combinacion.cantidad_minima : '', function () {
        return VerAgregarItem();
    }, ITEMS.map(function (it, i) {
        return yo(_templateObject6, it.detalle_id, function () {
            return EliminarItem(it, i);
        }, function () {
            return VerAgregarItem(it, i);
        }, it.nombre_producto, parseFloat(it.precio).toFixed(2));
    }), function () {
        return GuardarCombinacion(combinacion);
    }, function () {
        return $('#modalNuevaCombinacion').modal('close');
    });
    var container = document.getElementById('modalNuevaCombinacion');
    empty(container).appendChild(el);
    $('select').material_select();
    hideAlMenos();
}

function GuardarCombinacion(combinacion) {
    var props = {
        'etiqueta_titulo': {}
    };
    if (!Validar(props) || ITEMS.length == 0) return;
    var combinacion_id = combinacion ? combinacion.combinacion_id : -1;
    var etiqueta_titulo = document.getElementById('etiqueta_titulo').value;
    var cantidad_minima = document.getElementById('tipo_combinacion').value == 'OBLIGATORIO' ? 1 : parseInt(document.getElementById('cantidad_minima').value);
    var cantidad_maxima = document.getElementById('tipo_combinacion').value == 'OBLIGATORIO' ? 0 : document.getElementById('tipo_combinacion').value == 'OPCIONAL' ? 1 : 50;
    var estado = 'ACTIVO';

    for (var i = 0; i < ITEMS.length; i++) {
        if (ITEMS[i].producto_id != null) {
            ITEMS[i].nombre_producto = ITEMS[i].nombre_producto.split(' - ')[0];
        }
    }
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            combinacion_id: combinacion_id,
            etiqueta_titulo: etiqueta_titulo,
            cantidad_maxima: cantidad_maxima,
            cantidad_minima: cantidad_minima,
            estado: estado,
            ITEMS: ITEMS
        })
    };
    fetch(_constantes.URL + '/eproductos_combinacion/save_combinacion', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            $('#modalNuevaCombinacion').modal('close');
            $('#modalCombinaciones').modal('close');
            combinaciones(PRODUCTO_ID_G, true);
        }
        HideLoader();
    });
}

function AbrirCombinacion(c, id_seccion) {
    var combinacion_id = c.combinacion_id;
    var combinacion = document.getElementById(id_seccion + c.combinacion_id);
    var icono = '';
    if (parseInt(c.cantidad_maxima) == 0) {
        icono = 'radio_button_checked';
    } else if (parseInt(c.cantidad_maxima) == 1) {
        icono = 'check_box';
    } else {
        icono = 'add_box';
    }
    empty(combinacion);
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            combinacion_id: combinacion_id
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/get_combinacion_detalle', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            //mostrar error
            console.log(res.err);
        } else {
            var combinacion_detalle = res.com_detalle;
            combinacion.appendChild(yo(_templateObject7, combinacion_detalle.map(function (d) {
                return yo(_templateObject8, icono, d.nombre_producto, parseFloat(d.precio).toFixed(2));
            })));
            if (id_seccion == 'ME') {
                combinacion.appendChild(yo(_templateObject9, function () {
                    return EliminarCombinacion(combinacion_id);
                }));
            }
        }
        // HideLoader()
    });
}

function EliminarItem(it, i) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        if (it.detalle_id != -1) {
            var detalle_id = it.detalle_id;
            var parametros = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    detalle_id: detalle_id
                })
            };
            fetch(_constantes.URL + '/eproductos_combinacion/delete_combinacion_detalle', parametros).then(function (req) {
                return req.json();
            }).then(function (res) {
                if (res.err) {
                    $('#text_error').text(res.err);
                    $('#box_error').show();
                } else {
                    ITEMS.splice(i, 1);
                    reloadTableItems();
                }
                HideLoader();
            });
        } else {
            ShowLoader();
            ITEMS.splice(i, 1);
            reloadTableItems();
            HideLoader();
        }
    }
}
function VerAgregarItem(item, i) {
    $('#modalAgregarItem').modal('open');
    var el = yo(_templateObject10, item ? 'Editar' : 'Agregar', item ? item.nombre_producto : '', function () {
        return VerSeleccionarProducto1();
    }, item ? parseFloat(item.precio).toFixed(2) : '', function () {
        return guardarItem(item, i);
    }, item ? 'Guardar' : 'Agregar', function () {
        return $('#modalAgregarItem').modal('close');
    });
    function guardarItem(item) {
        var props = {
            'nombre_producto': {},
            'precio': {}
        };
        if (!Validar(props)) return;

        var selpe = midata[document.getElementById('nombre_producto').value];
        var it = {
            'detalle_id': item ? item.detalle_id : -1,
            'nombre_producto': document.getElementById('nombre_producto').value.toUpperCase(),
            'cod_moneda': document.getElementById('cod_moneda').value,
            'precio': parseFloat(document.getElementById('precio').value).toFixed(2)
        };
        if (selpe != undefined) {
            it['producto_id'] = selpe.producto_id;
        } else {
            it['producto_id'] = null;
        }
        if (item) {
            ITEMS[i] = it;
        } else {
            ITEMS.push(it);
        }
        reloadTableItems();
        $('#modalAgregarItem').modal('close');
    }

    var container = document.getElementById('modalAgregarItem');
    empty(container).appendChild(el);
    $('select').material_select();
    var midata = {};
    VerSeleccionarProducto();

    function VerSeleccionarProducto1() {
        $('#modalSeleccionarProducto').modal('open');
        VerSeleccionarProducto();
    }

    function VerSeleccionarProducto() {
        //$('#modalSeleccionarProducto').modal('open')
        var el = yo(_templateObject11, function () {
            return SeleccionarProducto();
        }, function () {
            return $('#modalSeleccionarProducto').modal('close');
        });
        var container = document.getElementById('modalSeleccionarProducto');
        empty(container).appendChild(el);

        function SeleccionarProducto() {
            var props = {
                'nombre_producto_sel': {}
            };
            if (!Validar(props)) return;

            var selpe = midata[document.getElementById('nombre_producto_sel').value];
            if (selpe != undefined) {
                var nombre = document.getElementById('nombre_producto_sel').value;
                document.getElementById('nombre_producto').value = nombre;
                document.getElementById('lnombre_producto').classList.add('active');
                document.getElementById('precio').value = parseFloat(selpe.valor_precio).toFixed(2);
                document.getElementById('lprecio').classList.add('active');
                $('#modalSeleccionarProducto').modal('close');
            }
        }

        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})

        };

        fetch(_constantes.URL + '/eproductos_producto/get_all_productos', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            var pro = res.productos;
            var data = {};
            for (var i = 0; i < pro.length; i++) {
                var p = pro[i];
                midata[p.nombre + " - " + p.producto_id] = p;
                data[p.nombre + " - " + p.producto_id] = null;
            }
            $('input.autocomplete').autocomplete({
                data: data,
                limit: 5,
                minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        });
    }
}

function reloadTableItems() {
    var table = yo(_templateObject12, ITEMS.map(function (it, i) {
        return yo(_templateObject13, it.detalle_id, function () {
            return EliminarItem(it, i);
        }, function () {
            return VerAgregarItem(it, i);
        }, it.nombre_producto, parseFloat(it.precio).toFixed(2));
    }));
    var container = document.getElementById('tableItems');
    empty(container).appendChild(table);
}

function VerTablaPrecios() {
    empty(document.getElementById('tprecios'));
    PRECIOS_.map(function (p, i) {
        return document.getElementById('tprecios').appendChild(yo(_templateObject13, p.cod_precio, function () {
            return QuitarPrecio(p.cod_precio);
        }, function () {
            return NuevoPrecio(p);
        }, p.nombre_precio, parseFloat(p.valor_precio).toFixed(2)));
    });
}
function Guardar(u) {
    var props = {
        'nombre': {},
        'cod_producto': {},
        'cod_categoria': {}
    };
    if (!Validar(props)) return;
    if (PRECIOS_.length == 0) {
        NuevoPrecio();
        return;
    }
    ShowLoader();
    var producto_id = u ? u.producto_id : -1;
    var nombre = document.getElementById('nombre').value.toUpperCase();
    var cod_producto = document.getElementById('cod_producto').value.toUpperCase();
    var alias = document.getElementById('nombre').value.substring(0, 25).toUpperCase();
    var cod_marca = document.getElementById('cod_marca').value.toUpperCase();
    var cod_categoria = document.getElementById('cod_categoria').value.toUpperCase();
    var imagen_url = document.getElementById('imagen_url').files.length > 0 ? document.getElementById('imagen_url').files[0].path : '';
    var imagen_anterior = u ? u.imagen_url : '';
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var precios = PRECIOS_;
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto_id: producto_id, nombre: nombre, cod_producto: cod_producto,
            alias: alias, cod_marca: cod_marca, cod_categoria: cod_categoria,
            imagen_url: imagen_url, estado: estado, imagen_anterior: imagen_anterior,
            precios: precios
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/save_producto', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.productos.length > 0) {
                (0, _index.productos)();
            }
        }
        HideLoader();
    });
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var producto_id = u.producto_id;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                producto_id: producto_id
            })
        };
        fetch(_constantes.URL + '/eproductos_producto/delete_producto', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                    (0, _index.productos)();
                }
            }
            HideLoader();
        });
    }
}
var PRODUCTO_ID_G;
function combinaciones(producto_id, modalopen) {
    PRODUCTO_ID_G = producto_id;
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto_id: producto_id
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/get_combinaciones', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            //mostrar error
            console.log(res.err);
        } else {
            COMBINACIONES_PRODUCTO = res.combinaciones;
            Ver(res.combinaciones, res.combinaciones_producto, producto_id);
            if (modalopen) {
                document.getElementById("editarCombinaciones").click();
            }
        }
        HideLoader();
    });
}

exports.combinaciones = combinaciones;

},{"../constantes_entorno/constantes":343,"./index":356,"empty-element":330,"yo-yo":338}],356:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.productos = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Productos</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="producto_busqueda" onkeyup="', '" type="text" class="">\n                        <label for="producto_busqueda" >Ingrese el producto para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Productos</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="producto_busqueda" onkeyup="', '" type="text" class="">\n                        <label for="producto_busqueda" >Ingrese el producto para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los productos</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Producto</a>\n        <a href="#!" onclick="', '" class="collection-item">Categorias</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los productos</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Producto</a>\n        <a href="#!" onclick="', '" class="collection-item">Categorias</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Categoria</th>\n                    <th>Imagen</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Categoria</th>\n                    <th>Imagen</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td> <img class="materialboxed" style="display: block;max-height:50px;max-width:50px;width: auto;height: auto;" src="public/images/', '"></td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td> <img class="materialboxed" style="display: block;max-height:50px;max-width:50px;width: auto;height: auto;" src="public/images/', '"></td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

var _eproductos = require('../eproductos.categoria');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(_productos, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(_productos, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevo)();
    }, function () {
        return (0, _eproductos.categorias)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var producto_busqueda = document.getElementById('producto_busqueda').value.toUpperCase();
    fetchProductos(tamano_pagina, pagina_actual, producto_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.productos, paginas, pagina_actual));
        }
    });
}
function VerTabla(_productos, paginas, pagina_actual) {
    return yo(_templateObject3, _productos.map(function (c) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevo)(c);
        }, c.cod_producto, c.nombre, c.nombre_categoria, c.imagen_url, c.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}
function fetchProductos(tamano_pagina, _numero_pagina, producto_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            producto_busqueda: producto_busqueda
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/get_productos', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        callback(res);
    });
}
function productos(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchProductos(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.productos, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.productos = productos;

},{"../constantes_entorno/constantes":343,"../eproductos.categoria":353,"./nuevo":357,"empty-element":330,"yo-yo":338}],357:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n                <div class="card-content">\n                    <div id="modal1" class="modal">\n                        <div class="modal-content">\n                            <h4>Nuevo Precio</h4>\n                            <div class="row">\n                                <div class="input-field col s4">\n                                    <input value="" id="nombre_precio" type="text" class="validate">\n                                    <label id="lnombre_precio" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Precio</label>\n                                </div>\n                                <div class="input-field col s4">\n                                    <select id="cod_moneda">\n                                        <option value="PEN" disabled selected>SOLES</option>\n                                    </select>\n                                    <label>Seleccione Moneda</label>\n                                </div>\n                                <div class="input-field col s4">\n                                    <input value="" id="valor_precio" type="text" class="validate">\n                                    <label id="lvalor_precio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="modal-footer">\n                            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Agregar</a>\n                        </div>\n                    </div>\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_prin">Principal</a></li>\n                        ', '\n                        ', '\n                    </ul>\n                </div>\n                <div id="tab_prin" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="col s6">\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <input onkeyup="', '" style="text-transform:uppercase" value="', '" id="nombre" type="text" class="validate">\n                                    <label id="lnombre" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Producto</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform:uppercase" value="', '" id="cod_producto" type="text" class="validate">\n                                    <label id="lcod_producto" class="active" data-error="Ingrese codigo producto" data-success="Correcto">Codigo Producto</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <textarea id="descripcion" class="materialize-textarea">', '</textarea>\n                                    <label class="active">Descripcion larga</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <select id="cod_categoria">\n                                        <option value="" disabled selected></option>\n                                        ', '\n                                    </select>\n                                    <label id="lcod_categoria">Seleccione Categoria</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform:uppercase" value="', '" id="cod_marca" type="text" class="">\n                                    <label id="" class="active"> Marca de Producto</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <select id="almacen_cod">\n                                        <option value="" disabled ></option>\n                                        ', '\n                                    </select>\n                                    <label id="lalmacen_cod">Seleccione Origen</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <!-- <label>Precio(s)</label> -->\n                                <a style="font-size:8pt;" \n                                    class="col s6 waves-effect waves-light btn white teal-text text-accent-4" \n                                    onclick="', '">\n                                    <i class="material-icons left teal-text text-accent-4">add_box</i> Agregar Precio</a>\n                                <table class="col s12 table">\n                                    <thead>\n                                        <td></td>\n                                        <td><label>Nombre</label></td>\n                                        <td><label>Moneda</label></td>\n                                        <td><label>Valor</label></td>\n                                    </thead>\n                                    <tbody id="tprecios">\n                                        ', '\n                                    </tbody>\n                                </table>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Guardar Producto</a>\n                                </div>\n                                ', '\n                            </div>\n                        </div>\n                        <div class="col s6">\n                            <div class="row">\n                                <div class="col s12 file-field input-field">\n                                    <div class="btn">\n                                        <span>Cargar</span>\n                                        <input type="file" id="imagen_url" onchange="', '">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <img class="col s6 materialboxed" id="imagen_previa" src="', '">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                ', '\n                ', '\n                \n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n                <div class="card-content">\n                    <div id="modal1" class="modal">\n                        <div class="modal-content">\n                            <h4>Nuevo Precio</h4>\n                            <div class="row">\n                                <div class="input-field col s4">\n                                    <input value="" id="nombre_precio" type="text" class="validate">\n                                    <label id="lnombre_precio" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Precio</label>\n                                </div>\n                                <div class="input-field col s4">\n                                    <select id="cod_moneda">\n                                        <option value="PEN" disabled selected>SOLES</option>\n                                    </select>\n                                    <label>Seleccione Moneda</label>\n                                </div>\n                                <div class="input-field col s4">\n                                    <input value="" id="valor_precio" type="text" class="validate">\n                                    <label id="lvalor_precio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="modal-footer">\n                            <a href="#!" onclick="', '" class="waves-effect waves-green teal accent-4 btn">Agregar</a>\n                        </div>\n                    </div>\n                <div class="col s12">\n                    <ul class="tabs">\n                        <li class="tab col s3"><a class="active" href="#tab_prin">Principal</a></li>\n                        ', '\n                        ', '\n                    </ul>\n                </div>\n                <div id="tab_prin" class="col s12">\n                    <br><br>\n                    <div class="row">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error">yrty</span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="col s6">\n                            <div class="row">\n                                <div class="col s6">\n                                    <label>Estado</label>\n                                    <div class="switch">\n                                        <label>\n                                        Inactivo\n                                        <input id="estado" ', ' type="checkbox">\n                                        <span class="lever"></span>\n                                        Activo\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <input onkeyup="', '" style="text-transform:uppercase" value="', '" id="nombre" type="text" class="validate">\n                                    <label id="lnombre" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Producto</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform:uppercase" value="', '" id="cod_producto" type="text" class="validate">\n                                    <label id="lcod_producto" class="active" data-error="Ingrese codigo producto" data-success="Correcto">Codigo Producto</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s12">\n                                    <textarea id="descripcion" class="materialize-textarea">', '</textarea>\n                                    <label class="active">Descripcion larga</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <select id="cod_categoria">\n                                        <option value="" disabled selected></option>\n                                        ', '\n                                    </select>\n                                    <label id="lcod_categoria">Seleccione Categoria</label>\n                                </div>\n                                <div class="input-field col s6">\n                                    <input style="text-transform:uppercase" value="', '" id="cod_marca" type="text" class="">\n                                    <label id="" class="active"> Marca de Producto</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="input-field col s6">\n                                    <select id="almacen_cod">\n                                        <option value="" disabled ></option>\n                                        ', '\n                                    </select>\n                                    <label id="lalmacen_cod">Seleccione Origen</label>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <!-- <label>Precio(s)</label> -->\n                                <a style="font-size:8pt;" \n                                    class="col s6 waves-effect waves-light btn white teal-text text-accent-4" \n                                    onclick="', '">\n                                    <i class="material-icons left teal-text text-accent-4">add_box</i> Agregar Precio</a>\n                                <table class="col s12 table">\n                                    <thead>\n                                        <td></td>\n                                        <td><label>Nombre</label></td>\n                                        <td><label>Moneda</label></td>\n                                        <td><label>Valor</label></td>\n                                    </thead>\n                                    <tbody id="tprecios">\n                                        ', '\n                                    </tbody>\n                                </table>\n                            </div>\n                            <div class="row">\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn">Guardar Producto</a>\n                                </div>\n                                ', '\n                            </div>\n                        </div>\n                        <div class="col s6">\n                            <div class="row">\n                                <div class="col s12 file-field input-field">\n                                    <div class="btn">\n                                        <span>Cargar</span>\n                                        <input type="file" id="imagen_url" onchange="', '">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <img class="col s6 materialboxed" id="imagen_previa" src="', '">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                ', '\n                ', '\n                \n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<li class="tab col s3"><a href="#tab_comb" onclick="', '">Combinaciones</a></li>'], ['<li class="tab col s3"><a href="#tab_comb" onclick="', '">Combinaciones</a></li>']),
    _templateObject3 = _taggedTemplateLiteral(['<li class="tab col s3"><a href="#tab_part">Partes</a></li>'], ['<li class="tab col s3"><a href="#tab_part">Partes</a></li>']),
    _templateObject4 = _taggedTemplateLiteral(['<option value="', '" ', '>', '</option>'], ['<option value="', '" ', '>', '</option>']),
    _templateObject5 = _taggedTemplateLiteral(['\n                                        <tr id="', '">\n                                            <td>\n                                                <div class="">\n                                                    <a href="#!"  onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                                                </div>\n                                            </td>\n                                            <td>', '</td>\n                                            <td>SOLES</td>\n                                            <td>', '</td>\n                                        </tr>\n                                        '], ['\n                                        <tr id="', '">\n                                            <td>\n                                                <div class="">\n                                                    <a href="#!"  onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                                                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                                                </div>\n                                            </td>\n                                            <td>', '</td>\n                                            <td>SOLES</td>\n                                            <td>', '</td>\n                                        </tr>\n                                        ']),
    _templateObject6 = _taggedTemplateLiteral(['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Producto</a>\n                                </div>\n                                '], ['\n                                <div class="col s6">\n                                    <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Producto</a>\n                                </div>\n                                ']),
    _templateObject7 = _taggedTemplateLiteral([''], ['']),
    _templateObject8 = _taggedTemplateLiteral(['<div id="tab_comb" class="col s12">Proximamente...</div>'], ['<div id="tab_comb" class="col s12">Proximamente...</div>']),
    _templateObject9 = _taggedTemplateLiteral(['<div id="tab_part" class="col s12">Proximamente...</div>'], ['<div id="tab_part" class="col s12">Proximamente...</div>']),
    _templateObject10 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nuevo Producto</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Atras</a>\n        <a href="#!" onclick="', '" class="collection-item active">Nuevo Producto</a>\n    </div>\n        ']),
    _templateObject11 = _taggedTemplateLiteral(['\n        <tr id="', '">\n            <td>\n                <div class="">\n                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                </div>\n            </td>\n            <td>', '</td>\n            <td>SOLES</td>\n            <td>', '</td>\n        </tr>\n        '], ['\n        <tr id="', '">\n            <td>\n                <div class="">\n                    <a href="#!" onclick="', '"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>\n                    <a href="#!"  onclick="', '"><i class="material-icons indigo-text">edit</i></a>\n                </div>\n            </td>\n            <td>', '</td>\n            <td>SOLES</td>\n            <td>', '</td>\n        </tr>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

var _combinaciones = require('./combinaciones');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

var PRECIOS_ = [];
function Ver(categorias, almacenes, p) {
    var el = yo(_templateObject, function () {
        return AgregarPrecio();
    }, p && yo(_templateObject2, function () {
        return (0, _combinaciones.combinaciones)(p.producto_id);
    }), p && yo(_templateObject3), p ? p.estado == 'ACTIVO' ? 'checked' : '' : 'checked', function () {
        return GenerarCodigo();
    }, p ? p.nombre : '', p ? p.cod_producto : '', p ? p.descripcion : '', categorias.map(function (c) {
        return yo(_templateObject4, c.cod_categoria, p ? p.cod_categoria == c.cod_categoria ? 'selected' : '' : '', c.nombre_categoria);
    }), p ? p.cod_marca : '', almacenes.map(function (c) {
        return yo(_templateObject4, c.almacen_cod, p ? p.almacen_cod == c.almacen_cod ? 'selected' : '' : '', c.descripcion);
    }), function () {
        return NuevoPrecio();
    }, PRECIOS_.map(function (p, i) {
        return yo(_templateObject5, p.cod_precio, function () {
            return QuitarPrecio(p.cod_precio);
        }, function () {
            return NuevoPrecio(p);
        }, p.nombre_precio, parseFloat(p.valor_precio).toFixed(2));
    }), function () {
        return Guardar(p);
    }, p ? yo(_templateObject6, function () {
        return Eliminar(p);
    }) : yo(_templateObject7), CambiarImagen, p ? 'public/images/' + p.imagen_url : '', p && yo(_templateObject8), p && yo(_templateObject9));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject10, function () {
        return (0, _index.productos)();
    }, function () {
        return nuevo();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();
    $('ul.tabs').tabs();
    $('.modal').modal();
}

function CambiarImagen() {
    document.getElementById('imagen_previa').src = document.getElementById('imagen_url').files[0].path;
}
function NuevoPrecio(precio) {
    var cod_precio = document.getElementById('nombre_precio');
    if (precio) {
        var valor_precio = document.getElementById('valor_precio');
        cod_precio.setAttribute('disabled', '');
        cod_precio.value = precio.cod_precio;
        valor_precio.value = parseFloat(precio.valor_precio).toFixed(2);
    } else {
        cod_precio.removeAttribute('disabled');
    }
    $('#modal1').modal('open');
}
function AgregarPrecio() {
    var props = {
        'nombre_precio': {},
        'valor_precio': { number_msg: 'Ingrese monto valido' }
    };
    if (!Validar(props)) return;
    var cod_precio = document.getElementById('nombre_precio');
    var cod_moneda = document.getElementById('cod_moneda');
    var valor_precio = document.getElementById('valor_precio');
    var nuevo_precio = {
        cod_unidad: 'NIU',
        cod_precio: cod_precio.value.toUpperCase(),
        nombre_precio: cod_precio.value.toUpperCase(),
        cod_moneda: cod_moneda.value,
        valor_precio: parseFloat(valor_precio.value)
    };
    if (PRECIOS_.find(function (p) {
        return p.cod_precio == cod_precio.value.toUpperCase();
    })) {
        PRECIOS_ = PRECIOS_.filter(function (p) {
            if (p.cod_precio == cod_precio.value.toUpperCase()) {
                p.valor_precio = parseFloat(valor_precio.value);
            }
            return p;
        });
    } else {
        PRECIOS_ = PRECIOS_.concat(nuevo_precio);
    }

    $('#modal1').modal('close');
    VerTablaPrecios();
    cod_precio.value = '';
    valor_precio.value = '';
}

function QuitarPrecio(cod_precio) {
    if (confirm('Desea eliminar este precio?')) {
        PRECIOS_ = PRECIOS_.filter(function (p) {
            return p.cod_precio != cod_precio;
        });
        VerTablaPrecios();
    }
}
function VerTablaPrecios() {
    empty(document.getElementById('tprecios'));
    PRECIOS_.map(function (p, i) {
        return document.getElementById('tprecios').appendChild(yo(_templateObject11, p.cod_precio, function () {
            return QuitarPrecio(p.cod_precio);
        }, function () {
            return NuevoPrecio(p);
        }, p.nombre_precio, parseFloat(p.valor_precio).toFixed(2)));
    });
}
function GenerarCodigo() {
    var nombre_producto = document.getElementById('nombre').value;
    var len_nombre = nombre_producto.length;
    document.getElementById('cod_producto').value = nombre_producto.substring(0, 2).trim() + nombre_producto[len_nombre - 1] + nombre_producto[len_nombre - 2] + parseInt(Math.random() * 10);
}
function Guardar(u) {
    var props = {
        'nombre': {},
        'cod_producto': {},
        'cod_categoria': {},
        'almacen_cod': {}
    };
    if (!Validar(props)) return;
    if (PRECIOS_.length == 0) {
        NuevoPrecio();
        return;
    }
    ShowLoader();
    var producto_id = u ? u.producto_id : -1;
    var nombre = document.getElementById('nombre').value.trim().toUpperCase();
    var cod_producto = document.getElementById('cod_producto').value.toUpperCase();
    var alias = document.getElementById('nombre').value.substring(0, 25).toUpperCase();
    var descripcion = document.getElementById('descripcion').value;
    var cod_marca = document.getElementById('cod_marca').value.toUpperCase();
    var cod_categoria = document.getElementById('cod_categoria').value;
    var almacen_cod = document.getElementById('almacen_cod').value;
    var imagen_url = document.getElementById('imagen_url').files.length > 0 ? document.getElementById('imagen_url').files[0].path : '';
    var imagen_anterior = u ? u.imagen_url : '';
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var precios = PRECIOS_;
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto_id: producto_id, nombre: nombre, cod_producto: cod_producto,
            alias: alias, descripcion: descripcion, cod_marca: cod_marca, almacen_cod: almacen_cod, cod_categoria: cod_categoria,
            imagen_url: imagen_url, estado: estado, imagen_anterior: imagen_anterior,
            precios: precios
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/save_producto', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.productos.length > 0) {
                (0, _index.productos)();
            }
        }
        HideLoader();
    });
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var producto_id = u.producto_id;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                producto_id: producto_id
            })
        };
        fetch(_constantes.URL + '/eproductos_producto/delete_producto', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                    (0, _index.productos)();
                }
            }
            HideLoader();
        });
    }
}
function nuevo(u) {
    PRECIOS_ = [];
    ShowLoader();
    var producto_id = u ? u.producto_id : -1;
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto_id: producto_id
        })
    };
    fetch(_constantes.URL + '/eproductos_producto/find', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            PRECIOS_ = res.precios;
            Ver(res.categorias, res.almacenes, u);
        }
        HideLoader();
    });
}

exports.nuevo = nuevo;

},{"../constantes_entorno/constantes":343,"./combinaciones":355,"./index":356,"empty-element":330,"yo-yo":338}],358:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cuentas = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Usuarios</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="usuario_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="usuario_busqueda" >Ingrese el nombre de usuario para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Usuarios</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="usuario_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="usuario_busqueda" >Ingrese el nombre de usuario para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los usuarios</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Usuario</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los usuarios</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Usuario</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Usuario</th>\n                    <th>Email</th>\n                    <th>Telefono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Usuario</th>\n                    <th>Email</th>\n                    <th>Telefono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(_cuentas, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(_cuentas, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevo)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var usuario_busqueda = document.getElementById('usuario_busqueda').value.toUpperCase();
    fetchCuentas(tamano_pagina, pagina_actual, usuario_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.cuentas, paginas, pagina_actual));
        }
    });
}
function VerTabla(_cuentas, paginas, pagina_actual) {
    return yo(_templateObject3, _cuentas.map(function (c) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevo)(c);
        }, c.usuario, c.email, c.telefono, c.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}
function fetchCuentas(tamano_pagina, _numero_pagina, usuario_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            usuario_busqueda: usuario_busqueda
        })
    };
    fetch(_constantes.URL + '/cuentas_api/get_cuentas', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}
function cuentas(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchCuentas(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.cuentas, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.cuentas = cuentas;

},{"../constantes_entorno/constantes":343,"./nuevo":359,"empty-element":330,"yo-yo":338}],359:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nuevo Usuario</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="usuario" type="text" class="validate">\n                                <label class="active" id="lusuario">Usuario</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="email" type="email" class="validate">\n                                <label for="email" class="active" id="lemail">Email</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="contrasena" type="password" class="validate">\n                                <label for="" class="active" id="lcontrasena">Contrase\xF1a</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="telefono" type="text" class="">\n                                <label for="" class="active">Telefono</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="cod_perfil">\n                                    <option value=null disabled selected></option>\n                                    ', '\n                                </select>\n                                <label>Perfil</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="cod_sucursal">\n                                    <option value=null disabled selected></option>\n                                    ', '\n                                </select>\n                                <label>Sucursal</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Usuario</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nuevo Usuario</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="usuario" type="text" class="validate">\n                                <label class="active" id="lusuario">Usuario</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="email" type="email" class="validate">\n                                <label for="email" class="active" id="lemail">Email</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="contrasena" type="password" class="validate">\n                                <label for="" class="active" id="lcontrasena">Contrase\xF1a</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="telefono" type="text" class="">\n                                <label for="" class="active">Telefono</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="cod_perfil">\n                                    <option value=null disabled selected></option>\n                                    ', '\n                                </select>\n                                <label>Perfil</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="cod_sucursal">\n                                    <option value=null disabled selected></option>\n                                    ', '\n                                </select>\n                                <label>Sucursal</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Usuario</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n                                    <option value="', '" ', ' >', '</option>\n                                    '], ['\n                                    <option value="', '" ', ' >', '</option>\n                                    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Usuario</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Usuario</a>\n                            </div>\n                            ']),
    _templateObject4 = _taggedTemplateLiteral([''], ['']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los usuarios</a>\n        <a href="#!" class="collection-item active">Nuevo Usuario</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los usuarios</a>\n        <a href="#!" class="collection-item active">Nuevo Usuario</a>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(usuario, perfiles, sucursales) {
    var el = yo(_templateObject, usuario ? usuario.estado ? 'checked' : '' : 'checked', usuario ? usuario.usuario : '', usuario ? usuario.email : '', usuario ? usuario.telefono : '', perfiles.map(function (p) {
        return yo(_templateObject2, p.cod_perfil, usuario ? usuario.cod_perfil == p.cod_perfil ? 'selected' : '' : '', p.nombre);
    }), sucursales.map(function (p) {
        return yo(_templateObject2, p.cod_sucursal, usuario ? usuario.cod_sucursal == p.cod_sucursal ? 'selected' : '' : '', p.nombre);
    }), function () {
        return Guardar(usuario);
    }, usuario ? yo(_templateObject3, function () {
        return Eliminar(usuario);
    }) : yo(_templateObject4));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject5, function () {
        return (0, _index.cuentas)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();
}

function Guardar(u) {
    var props = {
        'usuario': {},
        'email': {},
        'contrasena': { minLen: 4 }
    };
    if (!Validar(props)) return;
    ShowLoader();
    var usuario_id = u ? u.usuario_id : '-1';
    var usuario = document.getElementById('usuario').value.toUpperCase();
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var contrasena = document.getElementById('contrasena').value;
    var cod_perfil = document.getElementById('cod_perfil').value == 'null' ? null : document.getElementById('cod_perfil').value;
    var cod_sucursal = document.getElementById('cod_sucursal').value == 'null' ? null : document.getElementById('cod_sucursal').value;
    var foto_url = null;
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario_id: usuario_id,
            usuario: usuario, email: email, telefono: telefono,
            contrasena: contrasena, cod_perfil: cod_perfil, cod_sucursal: cod_sucursal,
            foto_url: foto_url, estado: estado
        })
    };
    fetch(_constantes.URL + '/cuentas_api/save_cuenta', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.cuentas.length > 0) {
                (0, _index.cuentas)();
            }
        }
        HideLoader();
    });
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var usuario_id = u.usuario_id;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuario_id
            })
        };
        fetch(_constantes.URL + '/cuentas_api/delete_cuenta', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletecuenta == 'Se elimino correctamente') {
                    (0, _index.cuentas)();
                }
            }
            HideLoader();
        });
    }
}
function nuevo(usuario) {
    ShowLoader();
    // const usuario_id = u.usuario_id
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    };
    fetch(_constantes.URL + '/cuentas_api/get_perfiles_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            Ver(usuario, res.perfiles, res.sucursales);
        }
        HideLoader();
    });
}

exports.nuevo = nuevo;

},{"../constantes_entorno/constantes":343,"./index":358,"empty-element":330,"yo-yo":338}],360:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modulos = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Modulos</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="modulo_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="modulo_busqueda" >Ingrese el nombre del modulo para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Modulos</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="modulo_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="modulo_busqueda" >Ingrese el nombre del modulo para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los modulos</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Modulo</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los modulos</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Modulo</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Descripcion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Descripcion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(modulos, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(modulos, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevo)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);

    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual) {
    var tamano_pagina = 5;
    var modulo_busqueda = document.getElementById('modulo_busqueda').value.toUpperCase();
    fetchModulos(tamano_pagina, pagina_actual, modulo_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.modulos, paginas, pagina_actual));
        }
    });
}

function VerTabla(modulos, paginas, pagina_actual) {
    return yo(_templateObject3, modulos.map(function (m) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevo)(m);
        }, m.cod_modulo, m.nombre, m.descripcion, m.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchModulos(tamano_pagina, _numero_pagina, modulo_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            modulo_busqueda: modulo_busqueda
        })
    };
    fetch(_constantes.URL + '/modulos_api/get_modulos', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function modulos(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchModulos(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.modulos, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.modulos = modulos;

},{"../constantes_entorno/constantes":343,"./nuevo":361,"empty-element":330,"yo-yo":338}],361:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nuevo Modulo</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                            <div class="col s6">\n                                <label>Nivel</label>\n                                <div class="switch">\n                                    <label>\n                                    No accede\n                                    <input id="nivel" checked="', '" type="checkbox">\n                                    <span class="lever"></span>\n                                    Accede\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre" type="text" class="validate">\n                                <label for="nombre" class="active" id="lnombre">Nombre</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="ruta_modulo" type="text" value="', '" class="validate">\n                                <label for="ruta_modulo" class="active" id="lruta_modulo">Ruta del modulo</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="tipo_modulo">\n                                    <option value="MANTENIMIENTO" ', '>Mantenimiento</option>\n                                    <option value="PROCESO" ', '>Proceso</option>\n                                    <option value="REPORTE" ', '>Reporte</option>\n                                </select>\n                                <label>Tipo de modulo</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="descripcion" type="text" value="', '" class="validate">\n                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <div class="file-field input-field">\n                                    <div class="btn">\n                                        <span>Imagen</span>\n                                        <input type="file">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Modulo</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Nuevo Modulo</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                            <div class="col s6">\n                                <label>Nivel</label>\n                                <div class="switch">\n                                    <label>\n                                    No accede\n                                    <input id="nivel" checked="', '" type="checkbox">\n                                    <span class="lever"></span>\n                                    Accede\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre" type="text" class="validate">\n                                <label for="nombre" class="active" id="lnombre">Nombre</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="ruta_modulo" type="text" value="', '" class="validate">\n                                <label for="ruta_modulo" class="active" id="lruta_modulo">Ruta del modulo</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="tipo_modulo">\n                                    <option value="MANTENIMIENTO" ', '>Mantenimiento</option>\n                                    <option value="PROCESO" ', '>Proceso</option>\n                                    <option value="REPORTE" ', '>Reporte</option>\n                                </select>\n                                <label>Tipo de modulo</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="descripcion" type="text" value="', '" class="validate">\n                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <div class="file-field input-field">\n                                    <div class="btn">\n                                        <span>Imagen</span>\n                                        <input type="file">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Modulo</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<div class="input-field col s6">\n                                <input id="cod_modulo" style="text-transform:uppercase" type="text" class="validate">\n                                <label for="cod_modulo" class="active" id="lcod_modulo">Codigo modulo</label>\n                            </div>'], ['<div class="input-field col s6">\n                                <input id="cod_modulo" style="text-transform:uppercase" type="text" class="validate">\n                                <label for="cod_modulo" class="active" id="lcod_modulo">Codigo modulo</label>\n                            </div>']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']),
    _templateObject4 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Modulo</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Modulo</a>\n                            </div>\n                            ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los modulos</a>\n        <a href="#!" class="collection-item active">Nuevo Modulo</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los modulos</a>\n        <a href="#!" class="collection-item active">Nuevo Modulo</a>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(modulo) {
    var el = yo(_templateObject, modulo ? modulo.estado == "ACTIVO" ? 'checked' : '' : 'checked', modulo ? modulo.nivel == 1 ? 'true' : 'false' : 'true', !modulo ? yo(_templateObject2) : yo(_templateObject3), modulo ? modulo.nombre : '', modulo ? modulo.ruta_modulo : '', modulo ? modulo.tipo_modulo == "MANTENIMIENTO" ? 'selected' : '' : 'selected', modulo ? modulo.tipo_modulo == "PROCESO" ? 'selected' : '' : '', modulo ? modulo.tipo_modulo == "REPORTE" ? 'selected' : '' : '', modulo ? modulo.descripcion : '', function () {
        return Guardar(modulo);
    }, modulo ? yo(_templateObject4, function () {
        return Eliminar(modulo);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject5, function () {
        return (0, _index.modulos)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();
}

function Guardar(m) {
    var props = {
        'cod_modulo': {},
        'nombre': {},
        'contrasena': { minLen: 4 }
    };
    if (!Validar(props)) return;
    ShowLoader();
    var cod_modulo = m ? m.cod_modulo : document.getElementById('cod_modulo').value.toUpperCase();
    var nombre = document.getElementById('nombre').value.toUpperCase();
    var descripcion = document.getElementById('descripcion').value;
    var ruta_modulo = document.getElementById('ruta_modulo').value;
    var tipo_modulo = document.getElementById('tipo_modulo').value;
    var imagen_url = null;
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var nivel = document.getElementById('nivel').checked ? 1 : 0;
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_modulo: cod_modulo,
            nombre: nombre,
            descripcion: descripcion,
            nivel: nivel,
            ruta_modulo: ruta_modulo,
            tipo_modulo: tipo_modulo,
            imagen_url: imagen_url,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/modulos_api/save_modulo', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.modulos.length > 0) {
                (0, _index.modulos)();
            }
        }
        HideLoader();
    });
}
function Eliminar(m) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_modulo = m.cod_modulo;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_modulo: cod_modulo
            })
        };
        fetch(_constantes.URL + '/modulos_api/delete_modulo', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletemodulo == 'Se elimino correctamente') {
                    (0, _index.modulos)();
                }
            }
            HideLoader();
        });
    }
}
function nuevo(modulo) {
    console.log(modulo);
    ShowLoader();
    Ver(modulo);
    HideLoader();
}

exports.nuevo = nuevo;

},{"../constantes_entorno/constantes":343,"./index":360,"empty-element":330,"yo-yo":338}],362:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.perfiles = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Perfiles</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="perfil_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="perfil_busqueda" >Ingrese el nombre del perfil para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Lista de Perfiles</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <i class="material-icons prefix">search</i>\n                        <input id="perfil_busqueda" onkeyup="', '" type="text" class="validate">\n                        <label for="perfil_busqueda" >Ingrese el nombre del perfil para buscar</label>\n                    </div>\n                </div>\n                <div id="div_tabla">                            \n                    ', '\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los perfiles</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Perfil</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todos los perfiles</a>\n        <a href="#!" onclick="', '" class="collection-item">Nuevo Perfil</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Descripcion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Codigo</th>\n                    <th>Nombre</th>\n                    <th>Descripcion</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick="', '" class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick="', '" class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(perfiles, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(perfiles, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevo)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);

    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual) {
    var tamano_pagina = 5;
    var perfil_busqueda = document.getElementById('perfil_busqueda').value.toUpperCase();
    fetchPerfiles(tamano_pagina, pagina_actual, perfil_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.perfiles, paginas, pagina_actual));
        }
    });
}

function VerTabla(perfiles, paginas, pagina_actual) {
    return yo(_templateObject3, perfiles.map(function (p) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevo)(p);
        }, p.cod_perfil, p.nombre, p.descripcion, p.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchPerfiles(tamano_pagina, _numero_pagina, perfil_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            perfil_busqueda: perfil_busqueda
        })
    };
    fetch(_constantes.URL + '/perfiles_api/get_perfiles', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function perfiles(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchPerfiles(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.perfiles, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.perfiles = perfiles;

},{"../constantes_entorno/constantes":343,"./nuevo":363,"empty-element":330,"yo-yo":338}],363:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', ' Perfil</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre" type="text" class="validate">\n                                <label for="nombre" class="active" id="lnombre">Nombre</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="descripcion" type="text" value="', '" class="validate">\n                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <div class="file-field input-field">\n                                    <div class="btn">\n                                        <span>Icono</span>\n                                        <input type="file">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <span class="card-title">Acceso a los modulos</span>\n                        <br>\n                        <div class="row">\n                            <div class="col s6">\n                                <span>Nombre del modulo</span>\n                            </div> \n                            <div class="col s6">\n                                <span>Nivel de acceso</span>\n                            </div>  \n                             \n                        </div>\n                        <hr>\n                        ', '\n                        <br>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Perfil</a>\n                            </div>\n                            ', '\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', ' Perfil</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id="text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            ', '\n                            <div class="input-field col s6">\n                                <input value="', '" id="nombre" type="text" class="validate">\n                                <label for="nombre" class="active" id="lnombre">Nombre</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input id="descripcion" type="text" value="', '" class="validate">\n                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <div class="file-field input-field">\n                                    <div class="btn">\n                                        <span>Icono</span>\n                                        <input type="file">\n                                    </div>\n                                    <div class="file-path-wrapper">\n                                        <input class="file-path validate" type="text">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <span class="card-title">Acceso a los modulos</span>\n                        <br>\n                        <div class="row">\n                            <div class="col s6">\n                                <span>Nombre del modulo</span>\n                            </div> \n                            <div class="col s6">\n                                <span>Nivel de acceso</span>\n                            </div>  \n                             \n                        </div>\n                        <hr>\n                        ', '\n                        <br>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Perfil</a>\n                            </div>\n                            ', '\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<div class="input-field col s6">\n                                <input id="cod_perfil" type="text" style="text-transform:uppercase" class="validate">\n                                <label for="cod_perfil" class="active" id="lcod_perfil">Codigo perfil</label>\n                            </div>'], ['<div class="input-field col s6">\n                                <input id="cod_perfil" type="text" style="text-transform:uppercase" class="validate">\n                                <label for="cod_perfil" class="active" id="lcod_perfil">Codigo perfil</label>\n                            </div>']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']),
    _templateObject4 = _taggedTemplateLiteral(['\n                        <div>\n                        <div class="row">\n                            <div class="col s6">\n                                <span>', '</span>\n                            </div> \n                            <div class="col s6">\n                                <div class="switch">\n                                    <label>\n                                    No Accede\n                                    <input id="nivel_acceso_', '" checked="', '" type="checkbox">\n                                    <span class="lever"></span>\n                                    Accede\n                                    </label>\n                                </div>\n                            </div>  \n                             \n                        </div>  \n                        <hr>\n                        </div>                      \n                        '], ['\n                        <div>\n                        <div class="row">\n                            <div class="col s6">\n                                <span>', '</span>\n                            </div> \n                            <div class="col s6">\n                                <div class="switch">\n                                    <label>\n                                    No Accede\n                                    <input id="nivel_acceso_', '" checked="', '" type="checkbox">\n                                    <span class="lever"></span>\n                                    Accede\n                                    </label>\n                                </div>\n                            </div>  \n                             \n                        </div>  \n                        <hr>\n                        </div>                      \n                        ']),
    _templateObject5 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Perfil</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Perfil</a>\n                            </div>\n                            ']),
    _templateObject6 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los Perfiles</a>\n        <a href="#!" class="collection-item active">', ' Perfil</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todos los Perfiles</a>\n        <a href="#!" class="collection-item active">', ' Perfil</a>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(perfil, modulos) {
    var el = yo(_templateObject, perfil ? 'Editar' : 'Nuevo', perfil ? perfil.estado == 'ACTIVO' ? 'checked' : '' : 'checked', !perfil ? yo(_templateObject2) : yo(_templateObject3), perfil ? perfil.nombre : '', perfil ? perfil.descripcion : '', modulos.map(function (m) {
        return yo(_templateObject4, m.nombre, m.cod_modulo, m.nivel_acceso != undefined ? m.nivel_acceso == 1 ? 'true' : 'false' : 'true');
    }), function () {
        return Guardar(perfil, modulos);
    }, perfil ? yo(_templateObject5, function () {
        return Eliminar(perfil);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject6, function () {
        return (0, _index.perfiles)();
    }, perfil ? 'Editar' : 'Nuevo');
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();
}

function Guardar(p, modulos) {
    var props = {
        'cod_perfil': {},
        'nombre': {}
    };
    if (!Validar(props)) return;

    var cod_perfil = p ? p.cod_perfil : document.getElementById('cod_perfil').value.toUpperCase();
    var nombre = document.getElementById('nombre').value.toUpperCase();
    var descripcion = document.getElementById('descripcion').value;
    var url_icono = null;
    var estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO';
    var modulosParam = [];
    for (var i = 0; i < modulos.length; i++) {
        var m = modulos[i];
        var idMod = 'nivel_acceso_' + m.cod_modulo;
        modulosParam[i] = {
            cod_modulo: m.cod_modulo,
            nivel_acceso: document.getElementById(idMod).checked ? 1 : 0,
            estado: 'ACTIVO'
        };
    }
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_perfil: cod_perfil,
            nombre: nombre,
            descripcion: descripcion,
            url_icono: url_icono,
            estado: estado,
            modulosParam: modulosParam
        })
    };
    fetch(_constantes.URL + '/perfiles_api/save_modulos_perfil', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.resp == "TODO CORRECTO") {
                (0, _index.perfiles)();
            }
        }
        HideLoader();
    });
}
function Eliminar(p) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_perfil = p.cod_perfil;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_perfil: cod_perfil
            })
        };
        fetch(_constantes.URL + '/perfiles_api/delete_perfil', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deleteperfil == 'Se elimino correctamente') {
                    (0, _index.perfiles)();
                }
            }
            HideLoader();
        });
    }
}
function nuevo(perfil) {
    if (perfil) {
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_perfil: perfil.cod_perfil
            })
        };
        ShowLoader();
        fetch(_constantes.URL + '/perfiles_api/get_modulos_perfil', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                console.log(res.modulos);
                Ver(perfil, res.modulos);
            }
            HideLoader();
        });
    } else {
        var _parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };
        ShowLoader();
        fetch(_constantes.URL + '/perfiles_api/get_modulos', _parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            console.log(res);
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                Ver(perfil, res.modulos);
            }
            HideLoader();
        });
    }
}

exports.nuevo = nuevo;

},{"../constantes_entorno/constantes":343,"./index":362,"empty-element":330,"yo-yo":338}],364:[function(require,module,exports){
'use strict';

var _navegador = require('./navegador');

var _sub_navegador = require('./sub_navegador');

var _login = require('./login');

require('babel-polyfill');
// var page = require('page');

(0, _navegador.navegador)();
(0, _sub_navegador.sub_navegador)();
(0, _login.login)();

},{"./login":366,"./navegador":368,"./sub_navegador":374,"babel-polyfill":1}],365:[function(require,module,exports){
arguments[4][340][0].apply(exports,arguments)
},{"../constantes_entorno/constantes":343,"../ecaja.comprobante/":349,"../ecaja.comprobante/nuevo":350,"../utils":379,"dup":340,"empty-element":330,"net":329,"yo-yo":338}],366:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Inicio de Sesion</span>\n                <form class="col s12">\n                    <div class="row" id="box_error" style="display:none;">\n                        <div class="col s12">\n                        <div class="card-panel  red lighten-2">\n                            <span class="white-text" id = "text_error"></span>\n                        </div>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input id="usuario" type="text" class="validate">\n                            <label for="text" id="lusuario" data-error="" >Usuario</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input id="contrasena" type="password" class="validate">\n                            <label for="password" id="lcontrasena">Contrase\xF1a</label>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class="card-action">\n                <a href="#" onclick="', '" class="btn">Ingresar</a>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Inicio de Sesion</span>\n                <form class="col s12">\n                    <div class="row" id="box_error" style="display:none;">\n                        <div class="col s12">\n                        <div class="card-panel  red lighten-2">\n                            <span class="white-text" id = "text_error"></span>\n                        </div>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input id="usuario" type="text" class="validate">\n                            <label for="text" id="lusuario" data-error="" >Usuario</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input id="contrasena" type="password" class="validate">\n                            <label for="password" id="lcontrasena">Contrase\xF1a</label>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class="card-action">\n                <a href="#" onclick="', '" class="btn">Ingresar</a>\n            </div>\n        </div>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _navegador = require('../navegador');

var _Inicio = require('../Inicio');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver() {
    var el = yo(_templateObject, function () {
        return Ingresar();
    });
    return el;
}
function Ingresar() {
    var props = {
        'usuario': {},
        'contrasena': {}
    };
    if (!Validar(props)) return;
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: document.getElementById('usuario').value,
            contrasena: document.getElementById('contrasena').value
        })
    };
    fetch(_constantes.URL + '/login_', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            (0, _navegador.navegador)(res.cuenta.usuario, res.modulos);
            (0, _Inicio.inicio)();
        }
        HideLoader();
    });
}
function login() {
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(Ver());
}

exports.login = login;

},{"../Inicio":340,"../constantes_entorno/constantes":343,"../navegador":368,"empty-element":330,"yo-yo":338}],367:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menu_administracion = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="row">\n        <ul class="collapsible" data-collapsible="accordion">\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Empresas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las empresas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva empresa</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Sucursales\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las sucursales</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva sucursal</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Almacenes\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los almacenes</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo almacen</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Puntos de Ventas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los puntos de ventas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo punto de venta</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Documentos\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los documentos</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo documento</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Ubigeos\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los ubigeos</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo ubigeo</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Cajas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las cajas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva caja</a>\n                    </div>\n                </div>\n            </li>\n\n        </ul>\n    </div>\n        '], ['\n    <div class="row">\n        <ul class="collapsible" data-collapsible="accordion">\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Empresas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las empresas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva empresa</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Sucursales\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las sucursales</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva sucursal</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Almacenes\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los almacenes</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo almacen</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Puntos de Ventas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los puntos de ventas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo punto de venta</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Documentos\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los documentos</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo documento</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Ubigeos\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todos los ubigeos</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nuevo ubigeo</a>\n                    </div>\n                </div>\n            </li>\n\n            <li>\n                <div class="collapsible-header">\n                    <i class="material-icons">expand_more</i>Cajas\n                </div>\n                <div class="collapsible-body">\n                    <div class="collection">\n                        <a href="#!" onclick="', '" class="collection-item"> Todas las cajas</a>\n                        <a href="#!" onclick="', '" class="collection-item">Nueva caja</a>\n                    </div>\n                </div>\n            </li>\n\n        </ul>\n    </div>\n        ']);

var _sucursales = require('../sucursales');

var _nuevo = require('../sucursales/nuevo');

var _almacenes = require('../almacenes');

var _nuevo2 = require('../almacenes/nuevo');

var _puntos_ventas = require('../puntos_ventas');

var _nuevo3 = require('../puntos_ventas/nuevo');

var _documentos = require('../documentos');

var _nuevo4 = require('../documentos/nuevo');

var _personas = require('../personas');

var _nuevo5 = require('../personas/nuevo');

var _ubigeos = require('../ubigeos');

var _nuevo6 = require('../ubigeos/nuevo');

var _ecaja = require('../ecaja.caja');

var _nuevo7 = require('../ecaja.caja/nuevo');

var _empresa = require('../empresa');

var _nuevo8 = require('../empresa/nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function menu_administracion() {

    var sub_nav = yo(_templateObject, function () {
        return (0, _empresa.empresas)();
    }, function () {
        return (0, _nuevo8.nuevaEmpresa)();
    }, function () {
        return (0, _sucursales.sucursales)();
    }, function () {
        return (0, _nuevo.nuevaSucursal)();
    }, function () {
        return (0, _almacenes.almacenes)();
    }, function () {
        return (0, _nuevo2.nuevoAlmacen)();
    }, function () {
        return (0, _puntos_ventas.puntos_ventas)();
    }, function () {
        return (0, _nuevo3.nuevo_punto_venta)();
    }, function () {
        return (0, _documentos.documentos)();
    }, function () {
        return (0, _nuevo4.nuevoDocumento)();
    }, function () {
        return (0, _ubigeos.ubigeos)();
    }, function () {
        return (0, _nuevo6.nuevoUbigeo)();
    }, function () {
        return (0, _ecaja.cajas)();
    }, function () {
        return (0, _nuevo7.nuevaCaja)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('.collapsible').collapsible();
    empty(document.getElementById('contenido_principal'));
    //sucursales()
}

exports.menu_administracion = menu_administracion;

},{"../almacenes":341,"../almacenes/nuevo":342,"../documentos":344,"../documentos/nuevo":346,"../ecaja.caja":347,"../ecaja.caja/nuevo":348,"../empresa":351,"../empresa/nuevo":352,"../personas":369,"../personas/nuevo":370,"../puntos_ventas":371,"../puntos_ventas/nuevo":372,"../sucursales":375,"../sucursales/nuevo":376,"../ubigeos":377,"../ubigeos/nuevo":378,"empty-element":330,"yo-yo":338}],368:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.navegador = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <nav>\n            <div class="nav-wrapper" style="background-color:#2c2c54">\n                <ul class="right hide-on-med-and-down">\n                    <li>\n                        <a onclick="', '">Inicio</a>\n                    </li>\n                    <li>\n                        <a onclick="', '">Reportes</a>\n                    </li>\n                    <li>\n                        <a class="dropdown-button" href="#!" data-activates="Opciones">Configuracion\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        ', '\n                    </li>\n                    <!-- Dropdown Trigger -->\n                    <li>\n                        <a class="dropdown-button" href="#!" data-activates="sesion">', '\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <ul id="sesion" class="dropdown-content">\n                            <li>\n                                <a onclick="', '">Salir</a>\n                            </li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </nav>'], ['\n        <nav>\n            <div class="nav-wrapper" style="background-color:#2c2c54">\n                <ul class="right hide-on-med-and-down">\n                    <li>\n                        <a onclick="', '">Inicio</a>\n                    </li>\n                    <li>\n                        <a onclick="', '">Reportes</a>\n                    </li>\n                    <li>\n                        <a class="dropdown-button" href="#!" data-activates="Opciones">Configuracion\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        ', '\n                    </li>\n                    <!-- Dropdown Trigger -->\n                    <li>\n                        <a class="dropdown-button" href="#!" data-activates="sesion">', '\n                            <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <ul id="sesion" class="dropdown-content">\n                            <li>\n                                <a onclick="', '">Salir</a>\n                            </li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </nav>']),
    _templateObject2 = _taggedTemplateLiteral(['<ul id="Opciones" class="dropdown-content">\n                            ', '\n                        </ul>'], ['<ul id="Opciones" class="dropdown-content">\n                            ', '\n                        </ul>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                            <li>\n                                <a onclick="', '">', '</a>\n                            </li>\n                            '], ['\n                            <li>\n                                <a onclick="', '">', '</a>\n                            </li>\n                            ']),
    _templateObject4 = _taggedTemplateLiteral(['<ul id="Opciones" class="dropdown-content">\n                            <li>\n                                <a onclick="', '">ADMINISTRACION</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">CLIENTES</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">PRODUCTOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">USUARIOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">MODULOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">PERFILES</a>\n                            </li>\n                        </ul>'], ['<ul id="Opciones" class="dropdown-content">\n                            <li>\n                                <a onclick="', '">ADMINISTRACION</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">CLIENTES</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">PRODUCTOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">USUARIOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">MODULOS</a>\n                            </li>\n                            <li>\n                                <a onclick="', '">PERFILES</a>\n                            </li>\n                        </ul>']),
    _templateObject5 = _taggedTemplateLiteral(['<div></div>'], ['<div></div>']);

var _menu = require('../menu');

var _eproductos = require('../eproductos.producto');

var _inicio = require('../inicio');

var _sub_navegador = require('../sub_navegador');

var _login = require('../login');

var _eseguridad = require('../eseguridad.cuenta');

var _eseguridad2 = require('../eseguridad.modulo');

var _eseguridad3 = require('../eseguridad.perfil');

var _personas = require('../personas');

var _reportes = require('../reportes');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(login, modulos_cuenta) {
    var el = login ? yo(_templateObject, function () {
        return (0, _inicio.inicio)();
    }, function () {
        return (0, _reportes.reportes)();
    }, login != 'ADMIN' ? yo(_templateObject2, modulos_cuenta.map(function (m) {
        return m.nivel_acceso == 1 ? yo(_templateObject3, function () {
            return AbrirModulo(m.ruta_modulo);
        }, m.nombre) : null;
    })) : yo(_templateObject4, function () {
        return (0, _menu.menu_administracion)();
    }, function () {
        return (0, _personas.personas)();
    }, function () {
        return (0, _eproductos.productos)();
    }, function () {
        return (0, _eseguridad.cuentas)();
    }, function () {
        return (0, _eseguridad2.modulos)();
    }, function () {
        return (0, _eseguridad3.perfiles)();
    }), login, function () {
        return CerrarSesion();
    }) : yo(_templateObject5);
    var container = document.getElementById('navegador_content');
    empty(container).appendChild(el);
    $(".dropdown-button").dropdown();
}
function AbrirModulo(ruta_modulo) {
    switch (ruta_modulo) {
        case 'personas':
            (0, _personas.personas)();
            break;
        case 'productos':
            (0, _eproductos.productos)();
            break;
        case 'cuentas':
            (0, _eseguridad.cuentas)();
            break;
        case 'modulos':
            (0, _eseguridad2.modulos)();
            break;
        case 'perfiles':
            (0, _eseguridad3.perfiles)();
            break;
        case 'menu_administracion':
            (0, _menu.menu_administracion)();
            break;
    }
}
function CerrarSesion() {
    Ver();
    (0, _sub_navegador.sub_navegador)();
    (0, _login.login)();
}

function navegador(login, modulos_cuenta) {
    Ver(login, modulos_cuenta);
}

exports.navegador = navegador;

},{"../eproductos.producto":356,"../eseguridad.cuenta":358,"../eseguridad.modulo":360,"../eseguridad.perfil":362,"../inicio":365,"../login":366,"../menu":367,"../personas":369,"../reportes":373,"../sub_navegador":374,"empty-element":330,"yo-yo":338}],369:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.personas = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Personas</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="persona_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="persona_busqueda" >Ingrese el nombre de la persona para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Personas</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="persona_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="persona_busqueda" >Ingrese el nombre de la persona para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las personas</a>\n        <a href="#!" class="collection-item" onclick="', '">Nueva Persona</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Todas las personas</a>\n        <a href="#!" class="collection-item" onclick="', '">Nueva Persona</a>\n    </div>\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Cliente</th>\n                    <th>Doc.</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Cliente</th>\n                    <th>Doc.</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>                   \n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>                   \n                </tr>\n                ']),
    _templateObject5 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(personas, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(personas, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject2, function () {
        return (0, _nuevo.nuevaPersona)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var persona_busqueda = document.getElementById('persona_busqueda').value.toUpperCase();
    fetchPersonas(tamano_pagina, pagina_actual, persona_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.personas, paginas, pagina_actual));
        }
    });
}

function VerTabla(personas, paginas, pagina_actual) {
    return yo(_templateObject3, personas.map(function (p) {
        return yo(_templateObject4, function () {
            return (0, _nuevo.nuevaPersona)(p);
        }, p.nombres && p.nombres != null && p.nombres != "" ? p.nombres + " " + p.a_paterno + " " + p.a_materno : p.razon_social, p.tipo_doc_ident, p.doc_ident, p.estado == "ACTIVO" ? 'blue' : 'red', p.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject5, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchPersonas(tamano_pagina, _numero_pagina, persona_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            persona_busqueda: persona_busqueda
        })
    };
    fetch(_constantes.URL + '/personas_api/get_personas', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function personas(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchPersonas(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.personas, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.personas = personas;

},{"../constantes_entorno/constantes":343,"./nuevo":370,"empty-element":330,"yo-yo":338}],370:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevaPersona = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            \n                            \n                            <div class="input-field col s6">\n                                <select id="tipo_doc_ident" onchange="', '">\n                                    <option value="DNI" ', '>DNI</option>\n                                    <option value="RUC" ', '>RUC</option>\n                                </select>\n                                <label>Tipo Documento</label>\n                            </div>      \n\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;"  id="cod_persona" type="text" class="validate">\n                                <label class="active" for="cod_persona" id="lcod_persona" data-error="" data-success="">C\xF3digo Persona</label>\n                            </div>                          \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6" id="divRazonSocial">\n                                <input style="text-transform: uppercase;" value="', '" id="razon_social" type="text" class="validate" data-length="120">\n                                <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                            </div>\n                            \n                            <div class="input-field col s6" id="divNombres">\n                                <input style="text-transform: uppercase;" value="', '" id="nombres" type="text" class="validate" data-length="40">\n                                <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                            </div>\n\n                        </div>\n\n                        <div class="row">\n                            \n                            <div class="input-field col s6" id="divAP">\n                                <input style="text-transform: uppercase;" value="', '" id="a_paterno" type="text" class="validate" data-length="30">\n                                <label class="active" for="a_paterno" id="la_paterno" data-error="apellido mayor al tama\xF1o permitido" data-success="">Apellido Paterno</label>\n                            </div>\n                            \n                            <div class="input-field col s6" id="divAM">\n                                <input style="text-transform: uppercase;" value="', '" id="a_materno" type="text" class="validate" data-length="30">\n                                <label class="active" for="a_materno" id="la_materno" data-error="apellido mayor al tama\xF1o permitido" data-success="">Apellido Materno</label>\n                            </div>\n\n                        </div>\n                        <div class="row">\n                             \n                            <div class="input-field col s6">\n                                <input value="', '" id="doc_ident" type="text" class="validate" data-length="15">\n                                <label class="active" for="doc_ident" id="ldoc_ident" data-error="numero mayor al tama\xF1o permitido" data-success="">Numero Documento</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="direccion" type="text" class="validate">\n                                <label for="direccion" class="active">Direcci\xF3n</label>\n                            </div>\n\n                        </div>\n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <input value="', '" id="fecha_nacimiento" type="text" class="datepicker">\n                                <label for="fecha_nacimiento" class="active">Fecha Nac.</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="tel_fijo" type="text" class="validate">\n                                <label for="tel_fijo" class="active">Telefono</label>\n                            </div>\n                            \n                        </div>\n\n                         <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <input value="', '" id="telf_movil" type="text" class="validate">\n                                <label for="telf_movil" class="active">Celular</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="correo" type="email" class="validate">\n                                <label for="correo" class="active">Correo</label>\n                            </div>\n                            \n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6">\n                                <select id="sexo">\n                                    <option value="M" ', '>Masculino</option>\n                                    <option value="F" ', '>Femenino</option>\n                                </select>\n                                <label>Sexo</label>\n                            </div>     \n\n                        </div>\n                        \n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Persona</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            \n                            \n                            <div class="input-field col s6">\n                                <select id="tipo_doc_ident" onchange="', '">\n                                    <option value="DNI" ', '>DNI</option>\n                                    <option value="RUC" ', '>RUC</option>\n                                </select>\n                                <label>Tipo Documento</label>\n                            </div>      \n\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;"  id="cod_persona" type="text" class="validate">\n                                <label class="active" for="cod_persona" id="lcod_persona" data-error="" data-success="">C\xF3digo Persona</label>\n                            </div>                          \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6" id="divRazonSocial">\n                                <input style="text-transform: uppercase;" value="', '" id="razon_social" type="text" class="validate" data-length="120">\n                                <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tama\xF1o permitido" data-success="">Razon Social</label>\n                            </div>\n                            \n                            <div class="input-field col s6" id="divNombres">\n                                <input style="text-transform: uppercase;" value="', '" id="nombres" type="text" class="validate" data-length="40">\n                                <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tama\xF1o permitido" data-success="">Nombres</label>\n                            </div>\n\n                        </div>\n\n                        <div class="row">\n                            \n                            <div class="input-field col s6" id="divAP">\n                                <input style="text-transform: uppercase;" value="', '" id="a_paterno" type="text" class="validate" data-length="30">\n                                <label class="active" for="a_paterno" id="la_paterno" data-error="apellido mayor al tama\xF1o permitido" data-success="">Apellido Paterno</label>\n                            </div>\n                            \n                            <div class="input-field col s6" id="divAM">\n                                <input style="text-transform: uppercase;" value="', '" id="a_materno" type="text" class="validate" data-length="30">\n                                <label class="active" for="a_materno" id="la_materno" data-error="apellido mayor al tama\xF1o permitido" data-success="">Apellido Materno</label>\n                            </div>\n\n                        </div>\n                        <div class="row">\n                             \n                            <div class="input-field col s6">\n                                <input value="', '" id="doc_ident" type="text" class="validate" data-length="15">\n                                <label class="active" for="doc_ident" id="ldoc_ident" data-error="numero mayor al tama\xF1o permitido" data-success="">Numero Documento</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="direccion" type="text" class="validate">\n                                <label for="direccion" class="active">Direcci\xF3n</label>\n                            </div>\n\n                        </div>\n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <input value="', '" id="fecha_nacimiento" type="text" class="datepicker">\n                                <label for="fecha_nacimiento" class="active">Fecha Nac.</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="tel_fijo" type="text" class="validate">\n                                <label for="tel_fijo" class="active">Telefono</label>\n                            </div>\n                            \n                        </div>\n\n                         <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <input value="', '" id="telf_movil" type="text" class="validate">\n                                <label for="telf_movil" class="active">Celular</label>\n                            </div>\n\n                            <div class="input-field col s6">\n                                <input value="', '" id="correo" type="email" class="validate">\n                                <label for="correo" class="active">Correo</label>\n                            </div>\n                            \n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6">\n                                <select id="sexo">\n                                    <option value="M" ', '>Masculino</option>\n                                    <option value="F" ', '>Femenino</option>\n                                </select>\n                                <label>Sexo</label>\n                            </div>     \n\n                        </div>\n                        \n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Persona</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Persona</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Persona</a>\n                            </div>\n                            ']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todas las Personas</a>\n        <a href="#!" class="collection-item active">Nueva Persona</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" onclick="', '" class="collection-item">Todas las Personas</a>\n        <a href="#!" class="collection-item active">Nueva Persona</a>\n    </div>\n        ']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(persona) {
    var el = yo(_templateObject, persona ? 'Editar Persona' : 'Nueva Persona', persona ? persona.estado == 'ACTIVO' ? 'checked' : '' : 'checked', function () {
        return CambioTipoDoc();
    }, persona ? persona.tipo_doc_ident == 'DNI' ? 'selected' : '' : 'selected', persona ? persona.tipo_doc_ident == 'RUC' ? 'selected' : '' : '', persona ? "none" : "display", persona ? persona.razon_social : '', persona ? persona.nombres : '', persona ? persona.a_paterno : '', persona ? persona.a_materno : '', persona ? persona.doc_ident : '', persona ? persona.direccion : '', persona ? persona.fecha_nacimiento : '', persona ? persona.tel_fijo : '', persona ? persona.telf_movil : '', persona ? persona.correo : '', persona ? persona.sexo == 'M' ? 'selected' : '' : '', persona ? persona.sexo == 'F' ? 'selected' : '' : '', function () {
        return Guardar(persona);
    }, persona ? yo(_templateObject2, function () {
        return Eliminar(persona);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject4, function () {
        return (0, _index.personas)();
    });
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();

    $('.datepicker').pickadate({
        container: 'body',
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agos", "Set", "Oct", "Nov", "Dic"],
        weekdaysFull: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysLetter: ["D", "L", "M", "Mi", "J", "V", "S"],
        today: "Hoy",
        clear: "Limpiar",
        close: "Ok"
    });
    /*$('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200, 
        format: 'yyyy-mm-dd'
    });*/
    var $input = $('#fecha_nacimiento').pickadate();
    var picker = $input.pickadate('picker');
    picker.set('select', new Date());
    CambioTipoDoc();
}

function CambioTipoDoc() {

    if ($("#tipo_doc_ident").val() == "RUC") {
        $("#divRazonSocial").show();
        $("#divNombres").hide();
        $("#divAP").hide();
        $("#divAM").hide();
    } else {
        $("#divRazonSocial").hide();
        $("#divNombres").show();
        $("#divAP").show();
        $("#divAM").show();
    }
}

function Guardar(p) {
    var props = {};
    if ($("#tipo_doc_ident").val() == "DNI") {
        props = {
            'nombres': { maxLen: 100 },
            'a_paterno': { maxLen: 100 },
            'a_materno': { maxLen: 100 },
            'doc_ident': { maxLen: 15 }
        };
    } else {
        props = {
            'razon_social': { maxLen: 120 },
            'doc_ident': { maxLen: 15 }
        };
    }

    if (!Validar(props)) return;

    ShowLoader();
    var cod_persona = p ? p.cod_persona : $("#cod_persona").val().toUpperCase();
    if ($("#cod_persona").val().trim() == "") cod_persona = $('#doc_ident').val();
    var tipo_persona = null;
    var razon_social = $('#razon_social').val().toUpperCase();
    var nombres = $('#nombres').val().toUpperCase();
    var a_paterno = $('#a_paterno').val().toUpperCase();
    var a_materno = $('#a_materno').val().toUpperCase();
    var tipo_doc_ident = $("#tipo_doc_ident").val();
    var doc_ident = $('#doc_ident').val();
    var fecha_nacimiento = $('#fecha_nacimiento').val();
    var sexo = $('#sexo').val();
    var direccion = $('#direccion').val();
    var tel_fijo = $('#tel_fijo').val();
    var telf_movil = $('#telf_movil').val();
    var correo = $('#correo').val();
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_persona: cod_persona,
            tipo_persona: tipo_persona,
            razon_social: razon_social,
            nombres: nombres,
            a_paterno: a_paterno,
            a_materno: a_materno,
            tipo_doc_ident: tipo_doc_ident,
            doc_ident: doc_ident,
            fecha_nacimiento: fecha_nacimiento,
            sexo: sexo,
            direccion: direccion,
            tel_fijo: tel_fijo,
            telf_movil: telf_movil,
            correo: correo,
            estado: estado
        })
    };
    fetch(_constantes.URL + '/personas_api/save_persona', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.personas.length > 0) {
                (0, _index.personas)();
            }
        }
        HideLoader();
    });
}

function Eliminar(persona) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_persona = persona.cod_persona;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_persona: cod_persona
            })
        };
        fetch(_constantes.URL + '/personas_api/delete_persona', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletepersona == 'Se elimino correctamente') {
                    (0, _index.personas)();
                }
            }
            HideLoader();
        });
    }
}

function nuevaPersona(persona) {
    ShowLoader();
    Ver(persona);
    HideLoader();
}

exports.nuevaPersona = nuevaPersona;

},{"../constantes_entorno/constantes":343,"./index":369,"empty-element":330,"yo-yo":338}],371:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.puntos_ventas = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Puntos de Venta</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="punto_venta_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="punto_venta_busqueda" >Ingrese el nombre del punto de venta para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Puntos de Venta</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="punto_venta_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="punto_venta_busqueda" >Ingrese el nombre del punto de venta para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Sucursal</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Sucursal</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(puntos_ventas, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(puntos_ventas, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Puntos de Venta</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo_punto_venta()}">Nuevo Punto de Venta</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var punto_venta_busqueda = document.getElementById('punto_venta_busqueda').value.toUpperCase();
    fetchPuntosVentas(tamano_pagina, pagina_actual, punto_venta_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.puntos_ventas, paginas, pagina_actual));
        }
    });
}

function VerTabla(puntos_ventas, paginas, pagina_actual) {
    return yo(_templateObject2, puntos_ventas.map(function (p) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevo_punto_venta)(p);
        }, p.nombre_punto, p.cod_sucursal, p.estado == "ACTIVO" ? 'blue' : 'red', p.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchPuntosVentas(tamano_pagina, _numero_pagina, punto_venta_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            punto_venta_busqueda: punto_venta_busqueda
        })
    };
    fetch(_constantes.URL + '/puntos_ventas_api/get_puntos_ventas', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function puntos_ventas(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchPuntosVentas(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.puntos_ventas, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.puntos_ventas = puntos_ventas;

},{"../constantes_entorno/constantes":343,"./nuevo":372,"empty-element":330,"yo-yo":338}],372:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevo_punto_venta = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_punto_venta" type="text" class="validate">\n                                <label class="active" id="lcod_punto_venta">C\xF3digo Punto Venta</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="nombre_punto" type="text">\n                                <label for="nombre_punto" id="lnombre_punto" class="active">Nombre Punto Venta</label>\n                            </div>\n                            \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <select id="cod_sucursal"> \n                                    ', '\n                                        \n                                </select>\n                                <label>C\xF3digo Sucursal</label>\n                            </div>\n                             <div class="input-field col s6">\n                                <select id="estado_accion">\n                                    <option value="LIBRE" ', '>LIBRE</option>\n                                    <option value="OCUPADO" ', '>OCUPADO</option>\n                                    <option value="PENDIENTE" ', '>PENDIENTE</option>\n                                </select>\n                                <label>Estado de la acci\xF3n</label>\n                            </div>\n                        </div>\n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Punto de Venta</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_punto_venta" type="text" class="validate">\n                                <label class="active" id="lcod_punto_venta">C\xF3digo Punto Venta</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="nombre_punto" type="text">\n                                <label for="nombre_punto" id="lnombre_punto" class="active">Nombre Punto Venta</label>\n                            </div>\n                            \n                        </div>\n                         \n                        <div class="row">\n                            \n                            <div class="input-field col s6">\n                                <select id="cod_sucursal"> \n                                    ', '\n                                        \n                                </select>\n                                <label>C\xF3digo Sucursal</label>\n                            </div>\n                             <div class="input-field col s6">\n                                <select id="estado_accion">\n                                    <option value="LIBRE" ', '>LIBRE</option>\n                                    <option value="OCUPADO" ', '>OCUPADO</option>\n                                    <option value="PENDIENTE" ', '>PENDIENTE</option>\n                                </select>\n                                <label>Estado de la acci\xF3n</label>\n                            </div>\n                        </div>\n                          \n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Punto de Venta</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<option style="text-transform:uppercase" value="', '" ', '>', '</option>'], ['<option style="text-transform:uppercase" value="', '" ', '>', '</option>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Punto Venta</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Punto Venta</a>\n                            </div>\n                            ']),
    _templateObject4 = _taggedTemplateLiteral([''], ['']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(punto_venta, sucursales) {
    var el = yo(_templateObject, punto_venta ? 'Editar Punto de Venta' : 'Nuevo Punto de Venta', punto_venta ? punto_venta.estado == 'ACTIVO' ? 'checked' : '' : 'checked', punto_venta ? "none" : "display", punto_venta ? punto_venta.cod_punto_venta : '', punto_venta ? punto_venta.nombre_punto : '', sucursales.map(function (e) {
        return yo(_templateObject2, e.cod_sucursal, punto_venta ? punto_venta.cod_sucursal == e.cod_sucursal ? 'selected' : '' : '', e.nombre);
    }), punto_venta ? punto_venta.estado_accion == "LIBRE" ? 'selected' : '' : '', punto_venta ? punto_venta.estado_accion == "OCUPADO" ? 'selected' : '' : '', punto_venta ? punto_venta.estado_accion == "PENDIENTE" ? 'selected' : '' : '', function () {
        return Guardar(punto_venta);
    }, punto_venta ? yo(_templateObject3, function () {
        return Eliminar(punto_venta);
    }) : yo(_templateObject4));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>puntos_ventas()}" class="collection-item">Todos los Puntos de Venta</a>
        <a href="#!" class="collection-item active">Nuevo Punto de Venta</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}
function Guardar(p) {

    var props = {
        'cod_punto_venta': {},
        'nombre_punto': {}
    };
    if (!Validar(props)) return;

    ShowLoader();
    var cod_punto_venta = p ? p.cod_punto_venta : $('#cod_punto_venta').val().toUpperCase();
    var nombre_punto = $('#nombre_punto').val().toUpperCase();
    var cod_sucursal = $('#cod_sucursal').val();
    var estado_accion = $('#estado_accion').val();
    var usuario_accion = null;
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_punto_venta: cod_punto_venta,
            nombre_punto: nombre_punto,
            cod_sucursal: cod_sucursal,
            estado_accion: estado_accion,
            usuario_accion: usuario_accion,
            estado: estado
        })
    };
    console.log(parametros);
    fetch(_constantes.URL + '/puntos_ventas_api/save_punto_venta', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.puntos_ventas.length > 0) {
                (0, _index.puntos_ventas)();
            }
        }
        HideLoader();
    });
}

function Eliminar(punto_venta) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_punto_venta = punto_venta.cod_punto_venta;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_punto_venta: cod_punto_venta
            })
        };
        fetch(_constantes.URL + '/puntos_ventas_api/delete_punto_venta', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletepuntoventa == 'Se elimino correctamente') {
                    (0, _index.puntos_ventas)();
                }
            }
            HideLoader();
        });
    }
}

function nuevo_punto_venta(punto_venta) {
    ShowLoader();

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tamano_pagina: 10,
            numero_pagina: 1,
            sucursal_busqueda: ''
        })
    };
    fetch(_constantes.URL + '/sucursales_api/get_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            console.log(res.err);
        } else {
            Ver(punto_venta, res.sucursales);
        }
    });
    HideLoader();
}

exports.nuevo_punto_venta = nuevo_punto_venta;

},{"../constantes_entorno/constantes":343,"./index":371,"empty-element":330,"yo-yo":338}],373:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reportes = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Reporte de ventas mensual</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <div class="row col s5">\n                            <div class="input-field">\n                                <select id="Anio">\n                                    <option value=\'\'>Seleccione el a\xF1o</option>\n                                    ', '\n                                </select>\n                                <label id="lAnio">Seleccione el a\xF1o</label>\n                            </div>\n                        </div>\n                        <div class="row col s5">\n                            <div class="input-field">\n                                <select id="Mes">\n                                    <option value=\'\'>Seleccione el mes</option>\n                                    ', '\n                                </select>\n                                <label id="lMes">Seleccione Mes</label>\n                            </div>\n                        </div>\n                        <div class="row col s2">\n                            <a href="#" onclick="', '" class="btn">Generar</a>\n                        </div>\n                    </div>\n                </div>\n                <div id="div_tabla">\n                </div>\n            </div>\n        </div>\n    </div>\n        '], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">Reporte de ventas mensual</span>\n                <div class="row">\n                    <div class="input-field col s12">\n                        <div class="row col s5">\n                            <div class="input-field">\n                                <select id="Anio">\n                                    <option value=\'\'>Seleccione el a\xF1o</option>\n                                    ', '\n                                </select>\n                                <label id="lAnio">Seleccione el a\xF1o</label>\n                            </div>\n                        </div>\n                        <div class="row col s5">\n                            <div class="input-field">\n                                <select id="Mes">\n                                    <option value=\'\'>Seleccione el mes</option>\n                                    ', '\n                                </select>\n                                <label id="lMes">Seleccione Mes</label>\n                            </div>\n                        </div>\n                        <div class="row col s2">\n                            <a href="#" onclick="', '" class="btn">Generar</a>\n                        </div>\n                    </div>\n                </div>\n                <div id="div_tabla">\n                </div>\n            </div>\n        </div>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['<option value=', '>', '</option>'], ['<option value=', '>', '</option>']),
    _templateObject3 = _taggedTemplateLiteral(['\n        <div class="collection">\n            <a href="#!" class="collection-item active">Ventas mensual</a>\n        </div>\n            '], ['\n        <div class="collection">\n            <a href="#!" class="collection-item active">Ventas mensual</a>\n        </div>\n            ']),
    _templateObject4 = _taggedTemplateLiteral(['\n        <div> \n        <table class="striped" id="tablaDatos">\n            <thead>\n                <tr>\n                    <th>Producto</th>\n                    <th>Cantidad</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <div class="row">\n            <a class="waves-effect black white-text btn btn-small" onclick=', '><i class="material-icons left">print</i> Imprimir Reporte</a>\n        </div>\n        </div>'], ['\n        <div> \n        <table class="striped" id="tablaDatos">\n            <thead>\n                <tr>\n                    <th>Producto</th>\n                    <th>Cantidad</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <div class="row">\n            <a class="waves-effect black white-text btn btn-small" onclick=', '><i class="material-icons left">print</i> Imprimir Reporte</a>\n        </div>\n        </div>']),
    _templateObject5 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                ']);

var _constantes = require('../constantes_entorno/constantes');

var _navegador = require('../navegador');

var _Inicio = require('../Inicio');

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

var anios = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

var mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function Ver() {
    var el = yo(_templateObject, anios.map(function (e, index, array) {
        return yo(_templateObject2, array[index], array[index]);
    }), mes.map(function (e, index, array) {
        return yo(_templateObject2, index + 1, array[index]);
    }), function () {
        return GenerarReporte();
    });
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    var sub_nav = yo(_templateObject3);
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(sub_nav);
    $('select').material_select();
}

function VerTabla(datos) {
    console.log(datos);
    var contentTable = yo(_templateObject4, datos.map(function (d) {
        return yo(_templateObject5, d.descripcion_detalle, d.cantidad);
    }), function () {
        return ImprimirReporte();
    });
    var container = document.getElementById('div_tabla');
    empty(container).appendChild(contentTable);
}

function ImprimirReporte() {
    var _doc$autoTable;

    var doc = new jsPDF('p', 'pt');
    var rest = doc.autoTableHtmlToJson(document.getElementById("tablaDatos"));

    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Mangiar - Reporte Ventas", 10, 20);
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Del mes " + $("#Mes option:selected").text() + " del " + $("#Anio").val(), 10, doc.autoTableEndPosY() + 35);

    doc.setFontSize(10);
    doc.setFontStyle('bold');

    doc.autoTable(rest.columns, rest.data, (_doc$autoTable = {
        startY: 45,
        margin: {
            horizontal: 10
        },
        tableWidth: 'wrap'
    }, _defineProperty(_doc$autoTable, 'margin', {
        top: 10
    }), _defineProperty(_doc$autoTable, 'styles', {
        cellPadding: 2
    }), _defineProperty(_doc$autoTable, 'headerStyles', {
        rowHeight: 14,
        fontSize: 12,
        valign: 'middle'
    }), _defineProperty(_doc$autoTable, 'theme', 'plain'), _defineProperty(_doc$autoTable, 'pageBreak', 'avoid'), _doc$autoTable));

    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    var pdf = btoa(doc.output());

    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: pdf,
            nombre_pdf: 'reporte'
        })
    };
    fetch(_constantes.URL + '/ws/save_pdf', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.respuesta == "ok") {
            var winPDF = new BrowserWindow({
                width: 800,
                height: 600
            });
            PDFWindow.addSupport(winPDF);
            winPDF.loadURL(dir + '/assets/media/reporte.pdf');
            (0, _Inicio.inicio)();
        }
    });
}

function GenerarReporte() {
    var props = {
        'Anio': {},
        'Mes': {}
    };
    if (!Validar(props)) return;
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anio: parseInt($("#Anio").val()),
            mes: parseInt($("#Mes").val())
        })
    };
    fetch(_constantes.URL + '/ws/get_reporte_by_anio_mes', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            if (res.datos.length > 0) VerTabla(res.datos);
        }
        HideLoader();
    });
}

function reportes() {
    Ver();
}

exports.reportes = reportes;

},{"../Inicio":340,"../constantes_entorno/constantes":343,"../navegador":368,"empty-element":330,"yo-yo":338}],374:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Inicio de Sesion</a>\n    </div>\n        '], ['\n    <div class="collection">\n        <a href="#!" class="collection-item active">Inicio de Sesion</a>\n    </div>\n        ']),
    _templateObject2 = _taggedTemplateLiteral([''], ['']);

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');
function Ver() {
    var el = yo(_templateObject);
    return el;
}

var no_login = yo(_templateObject2);
function sub_navegador() {
    var container = document.getElementById('sub_navegador_content');
    empty(container).appendChild(Ver());
}

exports.sub_navegador = sub_navegador;

},{"empty-element":330,"yo-yo":338}],375:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sucursales = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Sucursales</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="sucursal_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="sucursal_busqueda" >Ingrese el nombre de la sucursal para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Sucursales</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="sucursal_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="sucursal_busqueda" >Ingrese el nombre de la sucursal para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">                            \n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direcci\xF3n</th>\n                    <th>Tel\xE9fono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Nombre</th>\n                    <th>Direcci\xF3n</th>\n                    <th>Tel\xE9fono</th>\n                    <th>Estado</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>\n                        <span class="new badge ', '" data-badge-caption="', '"></span>\n                    </td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(sucursales, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(sucursales, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las Sucursales</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $(".dropdown-button").dropdown();*/
}

function Buscar(pagina_actual) {
    // ShowLoader()
    var tamano_pagina = 5;
    var sucursal_busqueda = document.getElementById('sucursal_busqueda').value.toUpperCase();
    fetchSucursales(tamano_pagina, pagina_actual, sucursal_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.sucursales, paginas, pagina_actual));
        }
    });
}

function VerTabla(sucursales, paginas, pagina_actual) {
    return yo(_templateObject2, sucursales.map(function (s) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevaSucursal)(s);
        }, s.nombre, s.direccion, s.telefono, s.estado == "ACTIVO" ? 'blue' : 'red', s.estado);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function fetchSucursales(tamano_pagina, _numero_pagina, sucursal_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            sucursal_busqueda: sucursal_busqueda
        })
    };
    fetch(_constantes.URL + '/sucursales_api/get_sucursales', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function sucursales(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchSucursales(tamano_pagina, _numero_pagina, '', function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.sucursales, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.sucursales = sucursales;

},{"../constantes_entorno/constantes":343,"./nuevo":376,"empty-element":330,"yo-yo":338}],376:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevaSucursal = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;" id="cod_sucursal" type="text" class="validate" data-length="30">\n                                <label class="active" for="cod_sucursal" id="lcod_sucursal" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Sucursal</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="nombre" type="text" class="validate" data-length="100">\n                                <label class="active" for="nombre" id="lnombre" data-error="Es necesario llenar este campo" data-success="">Nombre</label>\n                            </div>\n                            \n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="direccion" type="text" data-length="120">\n                                <label class="active" for="direccion" id="ldireccion" data-error="Es necesario llenar este campo" data-success="">Direcci\xF3n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="telefono" type="text" class="validate" data-length="12">\n                                <label for="telefono" class="active">Tel\xE9fono</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="correo" type="email" class="validate" data-length="40">\n                                <label for="correo" class="active" data-error="Correo invalido" data-success="">Correo</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="fax" type="text" class="validate" data-length="12">\n                                <label for="fax" class="active">Fax</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="tipo_sistema">\n                                    <option value="escritorio">Escritorio</option>\n                                </select>\n                                <label>Tipo de Sistema</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="latitud" type="text" class="validate">\n                                <label for="latitud" class="active">Latitud</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="longitud" type="text" class="validate">\n                                <label for="longitud" class="active">Longitud</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="departamento" onchange="', '">\n                                    ', '\n                                    ', '\n                                </select>\n                                <label id="ldepartamento">Departamento</label>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6" id="divProvincia">\n                                <div class="input-field col s12">\n                                    <select id="provincia" onchange="', '">\n                                        ', '\n                                        ', '\n                                    </select>\n                                    <label id="lprovincia">Provincia</label>\n                                </div>\n                            </div>\n                            <div class="col s6" id="divDistrito">\n                                <div class="input-field col s12">\n                                    <select id="distrito">\n                                        ', '\n                                        ', '\n                                    </select>\n                                    <label id="ldistrito">Distrito</label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Sucursal</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <label>Estado</label>\n                                <div class="switch">\n                                    <label>\n                                    Inactivo\n                                    <input id="estado" ', ' type="checkbox">\n                                    <span class="lever"></span>\n                                    Activo\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6" style="display:', '">\n                                <input style="text-transform: uppercase;" id="cod_sucursal" type="text" class="validate" data-length="30">\n                                <label class="active" for="cod_sucursal" id="lcod_sucursal" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Sucursal</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input style="text-transform: uppercase;" value="', '" id="nombre" type="text" class="validate" data-length="100">\n                                <label class="active" for="nombre" id="lnombre" data-error="Es necesario llenar este campo" data-success="">Nombre</label>\n                            </div>\n                            \n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="direccion" type="text" data-length="120">\n                                <label class="active" for="direccion" id="ldireccion" data-error="Es necesario llenar este campo" data-success="">Direcci\xF3n</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="telefono" type="text" class="validate" data-length="12">\n                                <label for="telefono" class="active">Tel\xE9fono</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="correo" type="email" class="validate" data-length="40">\n                                <label for="correo" class="active" data-error="Correo invalido" data-success="">Correo</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="fax" type="text" class="validate" data-length="12">\n                                <label for="fax" class="active">Fax</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <select id="tipo_sistema">\n                                    <option value="escritorio">Escritorio</option>\n                                </select>\n                                <label>Tipo de Sistema</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <input value="', '" id="latitud" type="text" class="validate">\n                                <label for="latitud" class="active">Latitud</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <input value="', '" id="longitud" type="text" class="validate">\n                                <label for="longitud" class="active">Longitud</label>\n                            </div>\n                            <div class="input-field col s6">\n                                <select id="departamento" onchange="', '">\n                                    ', '\n                                    ', '\n                                </select>\n                                <label id="ldepartamento">Departamento</label>\n                            </div>\n                        </div>\n                         <div class="row">\n                            <div class="col s6" id="divProvincia">\n                                <div class="input-field col s12">\n                                    <select id="provincia" onchange="', '">\n                                        ', '\n                                        ', '\n                                    </select>\n                                    <label id="lprovincia">Provincia</label>\n                                </div>\n                            </div>\n                            <div class="col s6" id="divDistrito">\n                                <div class="input-field col s12">\n                                    <select id="distrito">\n                                        ', '\n                                        ', '\n                                    </select>\n                                    <label id="ldistrito">Distrito</label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Sucursal</a>\n                            </div>\n                            ', '\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral([''], ['']),
    _templateObject3 = _taggedTemplateLiteral(['<option value="">Seleccione un departamento</div>'], ['<option value="">Seleccione un departamento</div>']),
    _templateObject4 = _taggedTemplateLiteral(['<option value="', '" ', '>', '</option>'], ['<option value="', '" ', '>', '</option>']),
    _templateObject5 = _taggedTemplateLiteral(['<option value="">Seleccione una provincia</div>'], ['<option value="">Seleccione una provincia</div>']),
    _templateObject6 = _taggedTemplateLiteral(['<option value="">Seleccione un distrito</div>'], ['<option value="">Seleccione un distrito</div>']),
    _templateObject7 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Sucursal</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Sucursal</a>\n                            </div>\n                            ']),
    _templateObject8 = _taggedTemplateLiteral(['\n        <div class="input-field col s12">\n            <select id="provincia">\n                <option value="">Seleccione una provincia</div>\n            </select>\n            <label id="lprovincia">Provincia</label>\n        </div>'], ['\n        <div class="input-field col s12">\n            <select id="provincia">\n                <option value="">Seleccione una provincia</div>\n            </select>\n            <label id="lprovincia">Provincia</label>\n        </div>']),
    _templateObject9 = _taggedTemplateLiteral(['\n                <div class="input-field col s12">\n                    <select id="provincia" onchange="', '">\n                    <option value="">Seleccione una provincia</div>\n                    ', '\n                    </select>\n                    <label id="lprovincia">Provincia</label>\n                </div>'], ['\n                <div class="input-field col s12">\n                    <select id="provincia" onchange="', '">\n                    <option value="">Seleccione una provincia</div>\n                    ', '\n                    </select>\n                    <label id="lprovincia">Provincia</label>\n                </div>']),
    _templateObject10 = _taggedTemplateLiteral(['<option value="', '">', '</option>'], ['<option value="', '">', '</option>']),
    _templateObject11 = _taggedTemplateLiteral(['\n        <div class="input-field col s12">\n            <select id="distrito">\n                <option value="">Seleccione un distrito</div>\n            </select>\n            <label id="ldistrito">Distrito</label>\n        </div>'], ['\n        <div class="input-field col s12">\n            <select id="distrito">\n                <option value="">Seleccione un distrito</div>\n            </select>\n            <label id="ldistrito">Distrito</label>\n        </div>']),
    _templateObject12 = _taggedTemplateLiteral(['\n            <div class="input-field col s12">\n                <select id="distrito">\n                <option value="">Seleccione un distrito</div>\n                ', '\n                </select>\n                <label id="ldistrito">Distrito</label>\n            </div>'], ['\n            <div class="input-field col s12">\n                <select id="distrito">\n                <option value="">Seleccione un distrito</div>\n                ', '\n                </select>\n                <label id="ldistrito">Distrito</label>\n            </div>']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(sucursal, ubigeos) {
    var el = yo(_templateObject, sucursal ? 'Editar Sucursal' : 'Nueva Sucursal', sucursal ? sucursal.estado == 'ACTIVO' ? 'checked' : '' : 'checked', sucursal ? "none" : "display", sucursal ? sucursal.nombre : '', sucursal ? sucursal.direccion : '', sucursal ? sucursal.telefono : '', sucursal ? sucursal.correo : '', sucursal ? sucursal.fax : '', sucursal ? sucursal.latitud : '0', sucursal ? sucursal.longitud : '0', function () {
        return CambioDepartamento(sucursal, ubigeos);
    }, sucursal ? yo(_templateObject2) : yo(_templateObject3), ubigeos.map(function (u) {
        return yo(_templateObject4, u.cod_departamento, sucursal ? sucursal.departamento == u.cod_departamento ? 'selected' : '' : '', u.departamento);
    }), function () {
        return CambioProvincia(sucursal, ubigeos);
    }, sucursal ? yo(_templateObject2) : yo(_templateObject5), sucursal ? ubigeos.map(function (u) {
        return yo(_templateObject4, u.cod_provincia, sucursal ? sucursal.provincia == u.cod_provincia ? 'selected' : '' : '', u.provincia);
    }) : yo(_templateObject2), sucursal ? yo(_templateObject2) : yo(_templateObject6), sucursal ? ubigeos.map(function (u) {
        return yo(_templateObject4, u.cod_distrito, sucursal ? sucursal.distrito == u.cod_distrito ? 'selected' : '' : '', u.distrito);
    }) : yo(_templateObject2), function () {
        return Guardar(sucursal);
    }, sucursal ? yo(_templateObject7, function () {
        return Eliminar(sucursal);
    }) : yo(_templateObject2));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>sucursales()}" class="collection-item">Todas las Sucursales</a>
        <a href="#!" class="collection-item active">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}

function CambioDepartamento(sucursal, ubigeos) {
    var cod_departamento = $("#departamento").val();
    var blank = yo(_templateObject8);

    var opts = document.getElementById('divProvincia');
    empty(opts).appendChild(blank);
    $('select').material_select();

    if (cod_departamento != "-1") {

        var el = yo(_templateObject9, function () {
            return CambioProvincia(sucursal, ubigeos);
        }, ubigeos.map(function (u) {
            return u.cod_departamento == cod_departamento ? yo(_templateObject10, u.cod_provincia, u.provincia) : yo(_templateObject2);
        }));

        var opts = document.getElementById('divProvincia');
        empty(opts).appendChild(el);
        $('select').material_select();

        CambioProvincia(sucursal, ubigeos);
    }
}

function CambioProvincia(sucursal, ubigeos) {
    var cod_provincia = $("#provincia").val();
    var blank = yo(_templateObject11);

    var opts = document.getElementById('divDistrito');
    empty(opts).appendChild(blank);
    $('select').material_select();

    var el = yo(_templateObject12, ubigeos.map(function (u) {
        return u.cod_provincia == cod_provincia ? yo(_templateObject10, u.cod_distrito, u.distrito) : yo(_templateObject2);
    }));

    var opts = document.getElementById('divDistrito');
    empty(opts).appendChild(el);
    $('select').material_select();
}

function Guardar(s) {

    var props = {
        'cod_sucursal': {},
        'nombre': { maxLen: 100 },
        'direccion': {},
        'departamento': {},
        'provincia': {},
        'distrito': {}
    };
    if (!Validar(props)) return;

    ShowLoader();
    var cod_sucursal = s ? s.cod_sucursal : $('#cod_sucursal').val().toUpperCase();
    var nombre = $('#nombre').val().toUpperCase();
    var direccion = $('#direccion').val().toUpperCase();
    var telefono = $('#telefono').val();
    var correo = $('#correo').val();
    var fax = $('#fax').val();
    var tipo_sistema = $('#tipo_sistema').val();
    var latitud = $('#latitud').val().trim() == "" ? 0 : $('#latitud').val();
    var longitud = $('#longitud').val().trim() == "" ? 0 : $('#longitud').val();
    var estado = $("#estado").is(':checked') ? 'ACTIVO' : 'INACTIVO';
    var departamento = $('#departamento').val();
    var provincia = $('#provincia').val();
    var distrito = $('#distrito').val();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_sucursal: cod_sucursal,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            fax: fax,
            tipo_sistema: tipo_sistema,
            latitud: latitud,
            longitud: longitud,
            estado: estado,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito
        })
    };
    console.log(parametros);
    fetch(_constantes.URL + '/sucursales_api/save_sucursal', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.sucursales.length > 0) {
                (0, _index.sucursales)();
            }
        }
        HideLoader();
    });
}

function Eliminar(s) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_sucursal = s.cod_sucursal;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_sucursal: cod_sucursal
            })
        };
        fetch(_constantes.URL + '/sucursales_api/delete_sucursal', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deletesucursal == 'Se elimino correctamente') {
                    (0, _index.sucursales)();
                }
            }
            HideLoader();
        });
    }
}
function nuevaSucursal(sucursal) {
    ShowLoader();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tamano_pagina: 10,
            numero_pagina: 1,
            ubigeo_busqueda: ''
        })
    };
    fetch(_constantes.URL + '/ubigeos_api/get_ubigeos', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        //Ver(sucursal,res.ubigeos)
        if (res.err) {
            console.log(res.err);
        } else {
            Ver(sucursal, res.ubigeos);
        }
        HideLoader();
    });

    /*const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tamano_pagina:10,
            numero_pagina:1,
            sucursal_busqueda: ''
        })
    }
    fetch('http://localhost:5000/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(sucursal)
            }
            HideLoader()
        })*/
}

exports.nuevaSucursal = nuevaSucursal;

},{"../constantes_entorno/constantes":343,"./index":375,"empty-element":330,"yo-yo":338}],377:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ubigeos = undefined;

var _templateObject = _taggedTemplateLiteral(['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Ubigeos</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="ubigeo_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="ubigeo_busqueda" >Ingrese el nombre del ubigeo para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">\n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>'], ['\n        <div class="card horizontal">\n            <div class="card-stacked">\n                <div class="card-content">\n                    <span class="card-title">Lista de Ubigeos</span>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <i class="material-icons prefix">search</i>\n                            <input id="ubigeo_busqueda" onkeyup="', '" type="text" class="validate">\n                            <label for="ubigeo_busqueda" >Ingrese el nombre del ubigeo para buscar</label>\n                        </div>\n                    </div>\n                    <div id="div_tabla">\n                        ', '\n                    </div>\n                </div>\n            </div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Departamento</th>\n                    <th>Provincia</th>\n                    <th>Distrito</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>'], ['\n    <div>\n        <table class="striped">\n            <thead>\n                <tr>\n                    <th>Opc.</th>\n                    <th>Departamento</th>\n                    <th>Provincia</th>\n                    <th>Distrito</th>\n                </tr>\n            </thead>\n            <tbody>\n                ', '\n            </tbody>\n        </table>\n        <ul class="pagination">\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_left</i>\n                </a>\n            </li>\n            ', '\n            <li class="', '">\n                <a href="#!" onclick="', '">\n                    <i class="material-icons">chevron_right</i>\n                </a>\n            </li>\n        </ul>\n    </div>']),
    _templateObject3 = _taggedTemplateLiteral(['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                '], ['\n                <tr>\n                    <td>\n                        <a onclick=', ' class="dropdown-button btn teal accent-3 btn-floating">\n                        <i class="material-icons">edit</i>\n                        </a>\n                    </td>\n                    <td>', '</td>\n                    <td>', '</td>\n                    <td>', '</td>\n                </tr>\n                ']),
    _templateObject4 = _taggedTemplateLiteral(['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>'], ['<li class=', '>\n            <a href="#!" onclick="', '" >', '</a>\n            </li>']);

var _constantes = require('../constantes_entorno/constantes');

var _nuevo = require('./nuevo');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(ubigeos, paginas, pagina_actual) {
    var el = yo(_templateObject, function () {
        return Buscar(1);
    }, VerTabla(ubigeos, paginas, pagina_actual));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Ubigeos</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevoUbigeo()}">Nuevo Ubigeo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}

function VerTabla(ubigeos, paginas, pagina_actual) {
    return yo(_templateObject2, ubigeos.map(function (u) {
        return yo(_templateObject3, function () {
            return (0, _nuevo.nuevoUbigeo)(u);
        }, u.departamento, u.provincia, u.distrito);
    }), pagina_actual > 1 ? 'waves-effect' : 'disabled', function () {
        return pagina_actual > 1 ? Buscar(pagina_actual - 1) : null;
    }, new Array(paginas).fill(0).map(function (p, i) {
        return yo(_templateObject4, pagina_actual == i + 1 ? 'active indigo lighten-2' : ' waves-effect', function () {
            return Buscar(i + 1);
        }, i + 1);
    }), pagina_actual < paginas ? 'waves-effect' : 'disabled', function () {
        return pagina_actual < paginas ? Buscar(pagina_actual + 1) : null;
    });
}

function Buscar(pagina_actual) {
    var tamano_pagina = 5;
    var ubigeo_busqueda = document.getElementById('ubigeo_busqueda').value.toUpperCase();
    fetchUbigeos(tamano_pagina, pagina_actual, ubigeo_busqueda, function (res) {
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            var tabla_content = document.getElementById('div_tabla');
            empty(tabla_content).appendChild(VerTabla(res.ubigeos, paginas, pagina_actual));
        }
    });
}

function fetchUbigeos(tamano_pagina, _numero_pagina, ubigeo_busqueda, callback) {
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_pagina: _numero_pagina || 1,
            tamano_pagina: tamano_pagina,
            ubigeo_busqueda: ubigeo_busqueda
        })
    };
    fetch(_constantes.URL + '/ubigeos_api/get_ubigeos', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        callback(res);
    });
}

function ubigeos(_numero_pagina) {
    ShowLoader();
    var tamano_pagina = 5;
    fetchUbigeos(tamano_pagina, _numero_pagina, '', function (res) {
        console.log(res);
        if (res.err) {
            console.log(res.err);
        } else {
            var paginas = parseInt(res.num_filas);
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0);

            Ver(res.ubigeos, paginas, _numero_pagina || 1);
        }
        HideLoader();
    });
}

exports.ubigeos = ubigeos;

},{"../constantes_entorno/constantes":343,"./nuevo":378,"empty-element":330,"yo-yo":338}],378:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nuevoUbigeo = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         \n                        <div class="row">\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_departamento" type="text" class="validate" data-length="2">\n                                <label for="cod_departamento" id="lcod_departamento" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Departamento</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_provincia" type="text" data-length="2" class="validate">\n                                <label for="cod_provincia" id="lcod_provincia" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Provincia</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_distrito" type="text" data-length="2" class="validate">\n                                <label for="cod_distrito" id="lcod_distrito" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Distrito</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="departamento" class="validate" type="text">\n                                <label for="departamento" class="active">Departamento</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="provincia" type="text" class="validate">\n                                <label for="provincia" class="active">Provincia</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="distrito" type="text" class="validate">\n                                <label for="distrito" class="active">Distrito</label>\n                            </div>\n                        </div>\n\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Ubigeo</a>\n                            </div>\n                            ', '\n                        </div>\n                          \n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>'], ['\n    <div class="card horizontal">\n        <div class="card-stacked">\n            <div class="card-content">\n                <span class="card-title">', '</span>\n                <div class="row">\n                    <form class="col s12">\n                        <div class="row" id="box_error" style="display:none;">\n                            <div class="col s12">\n                            <div class="card-panel  red lighten-2">\n                                <span class="white-text" id = "text_error"></span>\n                            </div>\n                            </div>\n                        </div>\n                         \n                        <div class="row">\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_departamento" type="text" class="validate" data-length="2">\n                                <label for="cod_departamento" id="lcod_departamento" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Departamento</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_provincia" type="text" data-length="2" class="validate">\n                                <label for="cod_provincia" id="lcod_provincia" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Provincia</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="cod_distrito" type="text" data-length="2" class="validate">\n                                <label for="cod_distrito" id="lcod_distrito" class="active" data-error="C\xF3digo mayor al permitido" data-success="">Codigo Distrito</label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="departamento" class="validate" type="text">\n                                <label for="departamento" class="active">Departamento</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="provincia" type="text" class="validate">\n                                <label for="provincia" class="active">Provincia</label>\n                            </div>\n                            <div class="input-field col s4">\n                                <input style="text-transform: uppercase;" value="', '" id="distrito" type="text" class="validate">\n                                <label for="distrito" class="active">Distrito</label>\n                            </div>\n                        </div>\n\n                        <div class="row">\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn">Guardar Ubigeo</a>\n                            </div>\n                            ', '\n                        </div>\n                          \n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Ubigeo</a>\n                            </div>\n                            '], ['\n                            <div class="col s6">\n                                <a onclick=', ' class="waves-effect waves-light btn red lighten-3">Eliminar Ubigeo</a>\n                            </div>\n                            ']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']);

var _constantes = require('../constantes_entorno/constantes');

var _index = require('./index');

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

var yo = require('yo-yo');
var empty = require('empty-element');

function Ver(ubigeo) {
    var el = yo(_templateObject, ubigeo ? 'Editar Ubigeo' : 'Nuevo Ubigeo', ubigeo ? ubigeo.cod_departamento : '', ubigeo ? ubigeo.cod_provincia : '', ubigeo ? ubigeo.cod_distrito : '', ubigeo ? ubigeo.departamento : '', ubigeo ? ubigeo.provincia : '', ubigeo ? ubigeo.distrito : '', function () {
        return Guardar(ubigeo);
    }, ubigeo ? yo(_templateObject2, function () {
        return Eliminar(ubigeo);
    }) : yo(_templateObject3));
    var container = document.getElementById('contenido_principal');
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${ubigeos}" class="collection-item">Todos los Ubigeos</a>
        <a href="#!" class="collection-item active">Nuevo Ubigeo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}
function Guardar(u) {
    var props = {
        'cod_departamento': { maxLen: 2 },
        'cod_distrito': { maxLen: 2 },
        'cod_provincia': { maxLen: 2 }
    };
    if (!Validar(props)) return;
    ShowLoader();
    var cod_departamento = u ? u.cod_departamento : $('#cod_departamento').val().toUpperCase();
    var cod_provincia = u ? u.cod_provincia : $('#cod_provincia').val().toUpperCase();
    var cod_distrito = u ? u.cod_distrito : $('#cod_distrito').val().toUpperCase();
    var departamento = $('#departamento').val().toUpperCase();
    var provincia = $('#provincia').val().toUpperCase();
    var distrito = $('#distrito').val().toUpperCase();
    var parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod_departamento: cod_departamento,
            cod_provincia: cod_provincia,
            cod_distrito: cod_distrito,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito
        })
    };
    fetch(_constantes.URL + '/ubigeos_api/save_ubigeo', parametros).then(function (req) {
        return req.json();
    }).then(function (res) {
        console.log(res);
        if (res.err) {
            $('#text_error').text(res.err);
            $('#box_error').show();
        } else {
            if (res.ubigeos.length > 0) {
                (0, _index.ubigeos)();
            }
        }
        HideLoader();
    });
}

function Eliminar(ubigeo) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader();
        var cod_departamento = ubigeo.cod_departamento;
        var cod_provincia = ubigeo.cod_provincia;
        var cod_distrito = ubigeo.cod_distrito;
        var parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod_departamento: cod_departamento,
                cod_provincia: cod_provincia,
                cod_distrito: cod_distrito
            })
        };
        fetch(_constantes.URL + '/ubigeos_api/delete_ubigeo', parametros).then(function (req) {
            return req.json();
        }).then(function (res) {
            if (res.err) {
                $('#text_error').text(res.err);
                $('#box_error').show();
            } else {
                if (res.respuesta[0].fn_deleteubigeo == 'Se elimino correctamente') {
                    (0, _index.ubigeos)();
                }
            }
            HideLoader();
        });
    }
}

function nuevoUbigeo(ubigeo) {
    ShowLoader();
    Ver(ubigeo);
    HideLoader();
}

exports.nuevoUbigeo = nuevoUbigeo;

},{"../constantes_entorno/constantes":343,"./index":377,"empty-element":330,"yo-yo":338}],379:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
var rotate = true; //Activate the elements' rotation for each move on stacked cards.
var items = 3; //Number of visible elements when the stacked options are bottom or top.
var elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
var useOverlays = true; //Enable or disable the overlays for swipe elements.
var maxElements; //Total of stacked cards on DOM.
var currentPosition = 0; //Keep the position of active stacked card.
var velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
var topObj; //Keep the swipe top properties.
var leftObj; //Keep the swipe left properties.
var listElNodesObj; //Keep the list of nodes from stacked cards.
var listElNodesWidth; //Keep the stacked cards width.
var currentElementObj; //Keep the stacked card element to swipe.
var stackedCardsObj;
var isFirstTime = true;
var elementHeight;
var obj;
var elTrans;
var addMargin;
var i;
var rotateElement;

function transformUi(moveX, moveY, opacity, elementObj) {
    requestAnimationFrame(function () {
        var element = elementObj;

        // Function to generate rotate value 
        function RotateRegulator(value) {
            if (value / 10 > 15) {
                return 15;
            } else if (value / 10 < -15) {
                return -15;
            }
            return value / 10;
        }

        if (rotate) {
            rotateElement = RotateRegulator(moveX);
        } else {
            rotateElement = 0;
        }

        if (stackedOptions === "Top") {
            elTrans = elementsMargin * (items - 1);
            if (element) {
                element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.opacity = opacity;
            }
        } else if (stackedOptions === "Bottom" || stackedOptions === "None") {

            if (element) {
                element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + moveY + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.transform = "translateX(" + moveX + "px) translateY(" + moveY + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.opacity = opacity;
            }
        }
    });
};

function countElements() {
    maxElements = listElNodesObj.length;
    if (items > maxElements) {
        items = maxElements;
    }
};

function currentElement() {
    currentElementObj = listElNodesObj[currentPosition];
};

function updateUi() {
    requestAnimationFrame(function () {
        elTrans = 0;
        var elZindex = 5;
        var elScale = 1;
        var elOpac = 1;
        var elTransTop = items;
        var elTransInc = elementsMargin;

        for (i = currentPosition; i < currentPosition + items; i++) {
            if (listElNodesObj[i]) {
                if (stackedOptions === "Top") {

                    listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');

                    if (useOverlays) {
                        leftObj.classList.add('stackedcards-origin-top');
                        topObj.classList.add('stackedcards-origin-top');
                    }

                    elTrans = elTransInc * elTransTop;
                    elTransTop--;
                } else if (stackedOptions === "Bottom") {
                    listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');

                    if (useOverlays) {
                        leftObj.classList.add('stackedcards-origin-bottom');
                        topObj.classList.add('stackedcards-origin-bottom');
                    }

                    elTrans = elTrans + elTransInc;
                } else if (stackedOptions === "None") {

                    listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
                    elTrans = elTrans + elTransInc;
                }

                listElNodesObj[i].style.transform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                listElNodesObj[i].style.webkitTransform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                listElNodesObj[i].style.opacity = elOpac;
                listElNodesObj[i].style.zIndex = elZindex;

                elScale = elScale - 0.04;
                elOpac = elOpac - 1 / items;
                elZindex--;
            }
        }
    });
};

function removeNoTransition() {
    if (listElNodesObj[currentPosition]) {

        if (useOverlays) {
            leftObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
        }

        listElNodesObj[currentPosition].classList.remove('no-transition');
        listElNodesObj[currentPosition].style.zIndex = 6;
    }
};

function changeStages() {
    if (currentPosition == maxElements) {
        //Event listener created to know when transition ends and changes states
        /*listElNodesObj[maxElements - 1].addEventListener('transitionend', function(){
            document.body.classList.add("background-7");
            document.querySelector('.stage').classList.add('hidden'); 
            document.querySelector('.final-state').classList.remove('hidden');
            document.querySelector('.final-state').classList.add('active');
            listElNodesObj[maxElements - 1].removeEventListener('transitionend', null, false); 
        });*/
    }
};

function setActiveHidden() {
    if (!(currentPosition >= maxElements)) {
        listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
        listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
        listElNodesObj[currentPosition].classList.add('stackedcards-active');
    }
};

function onSwipeRight() {
    removeNoTransition();
    transformUi(400, 0, 0, currentElementObj);
    if (useOverlays) {
        transformUi(400, 0, 0, topObj); //Move topOverlay
        resetOverlayRight();
    }

    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeStages();
    setActiveHidden();
};

function resetOverlays() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {

            setTimeout(function () {
                if (stackedOptions === "Top") {

                    elTrans = elementsMargin * (items - 1);
                } else if (stackedOptions === "Bottom" || stackedOptions === "None") {

                    elTrans = 0;
                }

                if (!isFirstTime) {

                    leftObj.classList.add('no-transition');
                    topObj.classList.add('no-transition');
                }

                requestAnimationFrame(function () {

                    leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.opacity = '0';

                    topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.opacity = '0';
                });
            }, 300); // wait for animations time

            isFirstTime = false;
        }
    }
};

function resetOverlayRight() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {
            setTimeout(function () {

                if (stackedOptions === "Top") {

                    elTrans = elementsMargin * (items - 1);
                } else if (stackedOptions === "Bottom" || stackedOptions === "None") {

                    elTrans = 0;
                }

                if (!isFirstTime) {

                    topObj.classList.add('no-transition');
                }

                requestAnimationFrame(function () {

                    topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.opacity = '0';
                });
            }, 300);

            isFirstTime = false;
        }
    }
};

function onSwipeLeft(ob) {
    removeNoTransition();
    transformUi(-1000, 0, 0, currentElementObj);
    if (useOverlays) {
        transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
        transformUi(-1000, 0, 0, topObj); //Move topOverlay
        resetOverlayLeft();
        if (ob != undefined) ob.style.zIndex = '1';
    }
    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeStages();
    setActiveHidden();
};

function resetOverlayLeft() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {
            setTimeout(function () {

                if (stackedOptions === "Top") {

                    elTrans = elementsMargin * (items - 1);
                } else if (stackedOptions === "Bottom" || stackedOptions === "None") {

                    elTrans = 0;
                }

                if (!isFirstTime) {

                    leftObj.classList.add('no-transition');
                    topObj.classList.add('no-transition');
                }

                requestAnimationFrame(function () {

                    leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.opacity = '0';

                    topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.opacity = '0';
                });
            }, 300);

            isFirstTime = false;
        }
    }
};

function Init() {

    stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
    rotate = true; //Activate the elements' rotation for each move on stacked cards.
    items = 3; //Number of visible elements when the stacked options are bottom or top.
    elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
    useOverlays = true; //Enable or disable the overlays for swipe elements.
    maxElements = 0; //Total of stacked cards on DOM.
    currentPosition = 0; //Keep the position of active stacked card.
    velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
    topObj = ''; //Keep the swipe top properties.
    leftObj = ''; //Keep the swipe left properties.
    listElNodesObj = ''; //Keep the list of nodes from stacked cards.
    listElNodesWidth = ''; //Keep the stacked cards width.
    currentElementObj = ''; //Keep the stacked card element to swipe.
    stackedCardsObj = '';
    isFirstTime = true;
    elementHeight = 0;
    obj = '';
    elTrans = '';
    addMargin = '';
    i = '';
    rotateElement = '';

    obj = document.getElementById('stacked-cards-block');
    stackedCardsObj = obj.querySelector('.stackedcards-container');
    listElNodesObj = stackedCardsObj.children;

    topObj = obj.querySelector('.stackedcards-overlay.top');
    leftObj = obj.querySelector('.stackedcards-overlay.left');

    countElements();
    currentElement();
    listElNodesWidth = stackedCardsObj.offsetWidth;
    currentElementObj = listElNodesObj[0];
    updateUi();

    //Prepare elements on DOM
    addMargin = elementsMargin * (items - 1) + 'px';

    if (stackedOptions === "Top") {

        for (i = items; i < maxElements; i++) {
            listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
        }

        elTrans = elementsMargin * (items - 1);

        stackedCardsObj.style.marginBottom = addMargin;
    } else if (stackedOptions === "Bottom") {

        for (i = items; i < maxElements; i++) {
            listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
        }

        elTrans = 0;

        stackedCardsObj.style.marginBottom = addMargin;
    } else if (stackedOptions === "None") {

        for (i = items; i < maxElements; i++) {
            listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
        }

        elTrans = 0;
    }

    for (i = items; i < maxElements; i++) {
        listElNodesObj[i].style.zIndex = 0;
        listElNodesObj[i].style.opacity = 0;
        listElNodesObj[i].style.webkitTransform = 'scale(' + (1 - items * 0.04) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
        listElNodesObj[i].style.transform = 'scale(' + (1 - items * 0.04) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
    }

    if (listElNodesObj[currentPosition]) {
        listElNodesObj[currentPosition].classList.add('stackedcards-active');
    }

    if (useOverlays) {
        leftObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        leftObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';

        topObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        topObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
    } else {
        leftObj.className = '';
        topObj.className = '';

        leftObj.classList.add('stackedcards-overlay-hidden');
        topObj.classList.add('stackedcards-overlay-hidden');
    }

    //Remove class init
    setTimeout(function () {
        obj.classList.remove('init');
    }, 150);
}

function onSwipeTop(ob) {
    removeNoTransition();
    transformUi(0, -1000, 0, currentElementObj);
    if (useOverlays) {
        transformUi(0, -1000, 0, leftObj); //Move leftOverlay
        transformUi(0, -1000, 0, topObj); //Move topOverlay
        resetOverlays();
        if (ob != undefined) ob.style.zIndex = '1';
    }

    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeStages();
    setActiveHidden();
};

function onActionTop() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {
            leftObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
            topObj.style.zIndex = '8';
            transformUi(0, 0, 1, topObj);
        }

        setTimeout(function () {
            onSwipeTop(topObj);
            resetOverlays();
        }, 300); //wait animations end
    }
};

function onActionLeft() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {
            leftObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
            leftObj.style.zIndex = '8';
            transformUi(0, 0, 1, leftObj);
        }

        setTimeout(function () {
            onSwipeLeft(leftObj);
            resetOverlayLeft();
        }, 300);
    }
};

function onActionRight() {
    if (!(currentPosition >= maxElements)) {
        if (useOverlays) {
            topObj.classList.remove('no-transition');
        }

        setTimeout(function () {
            onSwipeRight();
            resetOverlayRight();
        }, 300);
    }
};

exports.Init = Init;
exports.onActionLeft = onActionLeft;
exports.onActionTop = onActionTop;

},{}]},{},[364])