/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
!(function (window, undefined) {
  var jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context);
    },
    _jQuery = window.jQuery,
    _$ = window.$,
    document = window.document,
    rootjQuery,
    quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
    isSimple = /^.[^:#\[\.,]*$/,
    rnotwhite = /\S/,
    rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
    userAgent = navigator.userAgent,
    browserMatch,
    readyBound = !1,
    readyList = [],
    DOMContentLoaded,
    toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    indexOf = Array.prototype.indexOf;
  function doScrollCheck() {
    if (!jQuery.isReady) {
      try {
        document.documentElement.doScroll("left");
      } catch (error) {
        return void setTimeout(doScrollCheck, 1);
      }
      jQuery.ready();
    }
  }
  function evalScript(i, elem) {
    elem.src
      ? jQuery.ajax({ url: elem.src, async: !1, dataType: "script" })
      : jQuery.globalEval(
          elem.text || elem.textContent || elem.innerHTML || ""
        ),
      elem.parentNode && elem.parentNode.removeChild(elem);
  }
  function access(elems, key, value, exec, fn, pass) {
    var length = elems.length;
    if ("object" == typeof key) {
      for (var k in key) access(elems, k, key[k], exec, fn, value);
      return elems;
    }
    if (void 0 !== value) {
      exec = !pass && exec && jQuery.isFunction(value);
      for (var i = 0; i < length; i++)
        fn(
          elems[i],
          key,
          exec ? value.call(elems[i], i, fn(elems[i], key)) : value,
          pass
        );
      return elems;
    }
    return length ? fn(elems[0], key) : void 0;
  }
  function now() {
    return new Date().getTime();
  }
  (jQuery.fn = jQuery.prototype =
    {
      init: function (selector, context) {
        var match, elem, ret, doc;
        if (!selector) return this;
        if (selector.nodeType)
          return (this.context = this[0] = selector), (this.length = 1), this;
        if ("body" === selector && !context)
          return (
            (this.context = document),
            (this[0] = document.body),
            (this.selector = "body"),
            (this.length = 1),
            this
          );
        if ("string" == typeof selector) {
          if (!(match = quickExpr.exec(selector)) || (!match[1] && context))
            return !context && /^\w+$/.test(selector)
              ? ((this.selector = selector),
                (this.context = document),
                (selector = document.getElementsByTagName(selector)),
                jQuery.merge(this, selector))
              : !context || context.jquery
              ? (context || rootjQuery).find(selector)
              : jQuery(context).find(selector);
          if (match[1])
            return (
              (doc = context ? context.ownerDocument || context : document),
              (ret = rsingleTag.exec(selector))
                ? jQuery.isPlainObject(context)
                  ? ((selector = [document.createElement(ret[1])]),
                    jQuery.fn.attr.call(selector, context, !0))
                  : (selector = [doc.createElement(ret[1])])
                : (selector = (
                    (ret = buildFragment([match[1]], [doc])).cacheable
                      ? ret.fragment.cloneNode(!0)
                      : ret.fragment
                  ).childNodes),
              jQuery.merge(this, selector)
            );
          if ((elem = document.getElementById(match[2]))) {
            if (elem.id !== match[2]) return rootjQuery.find(selector);
            (this.length = 1), (this[0] = elem);
          }
          return (this.context = document), (this.selector = selector), this;
        }
        return jQuery.isFunction(selector)
          ? rootjQuery.ready(selector)
          : (void 0 !== selector.selector &&
              ((this.selector = selector.selector),
              (this.context = selector.context)),
            jQuery.makeArray(selector, this));
      },
      selector: "",
      jquery: "1.4.2",
      length: 0,
      size: function () {
        return this.length;
      },
      toArray: function () {
        return slice.call(this, 0);
      },
      get: function (num) {
        return null == num
          ? this.toArray()
          : num < 0
          ? this.slice(num)[0]
          : this[num];
      },
      pushStack: function (elems, name, selector) {
        var ret = jQuery();
        return (
          jQuery.isArray(elems)
            ? push.apply(ret, elems)
            : jQuery.merge(ret, elems),
          (ret.prevObject = this),
          (ret.context = this.context),
          "find" === name
            ? (ret.selector =
                this.selector + (this.selector ? " " : "") + selector)
            : name &&
              (ret.selector =
                this.selector + "." + name + "(" + selector + ")"),
          ret
        );
      },
      each: function (callback, args) {
        return jQuery.each(this, callback, args);
      },
      ready: function (fn) {
        return (
          jQuery.bindReady(),
          jQuery.isReady
            ? fn.call(document, jQuery)
            : readyList && readyList.push(fn),
          this
        );
      },
      eq: function (i) {
        return -1 === i ? this.slice(i) : this.slice(i, +i + 1);
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      slice: function () {
        return this.pushStack(
          slice.apply(this, arguments),
          "slice",
          slice.call(arguments).join(",")
        );
      },
      map: function (callback) {
        return this.pushStack(
          jQuery.map(this, function (elem, i) {
            return callback.call(elem, i, elem);
          })
        );
      },
      end: function () {
        return this.prevObject || jQuery(null);
      },
      push: push,
      sort: [].sort,
      splice: [].splice,
    }),
    (jQuery.fn.init.prototype = jQuery.fn),
    (jQuery.extend = jQuery.fn.extend =
      function () {
        var target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = !1,
          options,
          name,
          src,
          copy;
        for (
          "boolean" == typeof target &&
            ((deep = target), (target = arguments[1] || {}), (i = 2)),
            "object" == typeof target ||
              jQuery.isFunction(target) ||
              (target = {}),
            length === i && ((target = this), --i);
          i < length;
          i++
        )
          if (null != (options = arguments[i]))
            for (name in options)
              if (((src = target[name]), target !== (copy = options[name])))
                if (
                  deep &&
                  copy &&
                  (jQuery.isPlainObject(copy) || jQuery.isArray(copy))
                ) {
                  var clone =
                    src && (jQuery.isPlainObject(src) || jQuery.isArray(src))
                      ? src
                      : jQuery.isArray(copy)
                      ? []
                      : {};
                  target[name] = jQuery.extend(deep, clone, copy);
                } else void 0 !== copy && (target[name] = copy);
        return target;
      }),
    jQuery.extend({
      noConflict: function (deep) {
        return (window.$ = _$), deep && (window.jQuery = _jQuery), jQuery;
      },
      isReady: !1,
      ready: function () {
        if (!jQuery.isReady) {
          if (!document.body) return setTimeout(jQuery.ready, 13);
          if (((jQuery.isReady = !0), readyList)) {
            for (var fn, i = 0; (fn = readyList[i++]); )
              fn.call(document, jQuery);
            readyList = null;
          }
          jQuery.fn.triggerHandler && jQuery(document).triggerHandler("ready");
        }
      },
      bindReady: function () {
        if (!readyBound) {
          if (((readyBound = !0), "complete" === document.readyState))
            return jQuery.ready();
          if (document.addEventListener)
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, !1),
              window.addEventListener("load", jQuery.ready, !1);
          else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", DOMContentLoaded),
              window.attachEvent("onload", jQuery.ready);
            var toplevel = !1;
            try {
              toplevel = null == window.frameElement;
            } catch (e) {}
            document.documentElement.doScroll && toplevel && doScrollCheck();
          }
        }
      },
      isFunction: function (obj) {
        return "[object Function]" === toString.call(obj);
      },
      isArray: function (obj) {
        return "[object Array]" === toString.call(obj);
      },
      isPlainObject: function (obj) {
        if (
          !obj ||
          "[object Object]" !== toString.call(obj) ||
          obj.nodeType ||
          obj.setInterval
        )
          return !1;
        if (
          obj.constructor &&
          !hasOwnProperty.call(obj, "constructor") &&
          !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")
        )
          return !1;
        var key;
        for (key in obj);
        return void 0 === key || hasOwnProperty.call(obj, key);
      },
      isEmptyObject: function (obj) {
        for (var name in obj) return !1;
        return !0;
      },
      error: function (msg) {
        throw msg;
      },
      parseJSON: function (data) {
        return "string" == typeof data && data
          ? ((data = jQuery.trim(data)),
            /^[\],:{}\s]*$/.test(
              data
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            )
              ? window.JSON && window.JSON.parse
                ? window.JSON.parse(data)
                : new Function("return " + data)()
              : void jQuery.error("Invalid JSON: " + data))
          : null;
      },
      noop: function () {},
      globalEval: function (data) {
        if (data && rnotwhite.test(data)) {
          var head =
              document.getElementsByTagName("head")[0] ||
              document.documentElement,
            script = document.createElement("script");
          (script.type = "text/javascript"),
            jQuery.support.scriptEval
              ? script.appendChild(document.createTextNode(data))
              : (script.text = data),
            head.insertBefore(script, head.firstChild),
            head.removeChild(script);
        }
      },
      nodeName: function (elem, name) {
        return (
          elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase()
        );
      },
      each: function (object, callback, args) {
        var name,
          i = 0,
          length = object.length,
          isObj = void 0 === length || jQuery.isFunction(object);
        if (args)
          if (isObj) {
            for (name in object)
              if (!1 === callback.apply(object[name], args)) break;
          } else
            for (; i < length && !1 !== callback.apply(object[i++], args); );
        else if (isObj) {
          for (name in object)
            if (!1 === callback.call(object[name], name, object[name])) break;
        } else
          for (
            var value = object[0];
            i < length && !1 !== callback.call(value, i, value);
            value = object[++i]
          );
        return object;
      },
      trim: function (text) {
        return (text || "").replace(rtrim, "");
      },
      makeArray: function (array, results) {
        var ret = results || [];
        return (
          null != array &&
            (null == array.length ||
            "string" == typeof array ||
            jQuery.isFunction(array) ||
            ("function" != typeof array && array.setInterval)
              ? push.call(ret, array)
              : jQuery.merge(ret, array)),
          ret
        );
      },
      inArray: function (elem, array) {
        if (array.indexOf) return array.indexOf(elem);
        for (var i = 0, length = array.length; i < length; i++)
          if (array[i] === elem) return i;
        return -1;
      },
      merge: function (first, second) {
        var i = first.length,
          j = 0;
        if ("number" == typeof second.length)
          for (var l = second.length; j < l; j++) first[i++] = second[j];
        else for (; void 0 !== second[j]; ) first[i++] = second[j++];
        return (first.length = i), first;
      },
      grep: function (elems, callback, inv) {
        for (var ret = [], i = 0, length = elems.length; i < length; i++)
          !inv != !callback(elems[i], i) && ret.push(elems[i]);
        return ret;
      },
      map: function (elems, callback, arg) {
        for (var ret = [], value, i = 0, length = elems.length; i < length; i++)
          null != (value = callback(elems[i], i, arg)) &&
            (ret[ret.length] = value);
        return ret.concat.apply([], ret);
      },
      guid: 1,
      proxy: function (fn, proxy, thisObject) {
        return (
          2 === arguments.length &&
            ("string" == typeof proxy
              ? ((fn = (thisObject = fn)[proxy]), (proxy = void 0))
              : proxy &&
                !jQuery.isFunction(proxy) &&
                ((thisObject = proxy), (proxy = void 0))),
          !proxy &&
            fn &&
            (proxy = function () {
              return fn.apply(thisObject || this, arguments);
            }),
          fn && (proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++),
          proxy
        );
      },
      uaMatch: function (ua) {
        ua = ua.toLowerCase();
        var match =
          /(webkit)[ \/]([\w.]+)/.exec(ua) ||
          /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
          /(msie) ([\w.]+)/.exec(ua) ||
          (!/compatible/.test(ua) &&
            /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua)) ||
          [];
        return { browser: match[1] || "", version: match[2] || "0" };
      },
      browser: {},
    }),
    (browserMatch = jQuery.uaMatch(userAgent)).browser &&
      ((jQuery.browser[browserMatch.browser] = !0),
      (jQuery.browser.version = browserMatch.version)),
    jQuery.browser.webkit && (jQuery.browser.safari = !0),
    indexOf &&
      (jQuery.inArray = function (elem, array) {
        return indexOf.call(array, elem);
      }),
    (rootjQuery = jQuery(document)),
    document.addEventListener
      ? (DOMContentLoaded = function () {
          document.removeEventListener(
            "DOMContentLoaded",
            DOMContentLoaded,
            !1
          ),
            jQuery.ready();
        })
      : document.attachEvent &&
        (DOMContentLoaded = function () {
          "complete" === document.readyState &&
            (document.detachEvent("onreadystatechange", DOMContentLoaded),
            jQuery.ready());
        }),
    (function () {
      jQuery.support = {};
      var root = document.documentElement,
        script = document.createElement("script"),
        div = document.createElement("div"),
        id = "script" + now();
      (div.style.display = "none"),
        (div.innerHTML =
          "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>");
      var all = div.getElementsByTagName("*"),
        a = div.getElementsByTagName("a")[0];
      if (all && all.length && a) {
        (jQuery.support = {
          leadingWhitespace: 3 === div.firstChild.nodeType,
          tbody: !div.getElementsByTagName("tbody").length,
          htmlSerialize: !!div.getElementsByTagName("link").length,
          style: /red/.test(a.getAttribute("style")),
          hrefNormalized: "/a" === a.getAttribute("href"),
          opacity: /^0.55$/.test(a.style.opacity),
          cssFloat: !!a.style.cssFloat,
          checkOn: "on" === div.getElementsByTagName("input")[0].value,
          optSelected: document
            .createElement("select")
            .appendChild(document.createElement("option")).selected,
          parentNode:
            null ===
            div.removeChild(div.appendChild(document.createElement("div")))
              .parentNode,
          deleteExpando: !0,
          checkClone: !1,
          scriptEval: !1,
          noCloneEvent: !0,
          boxModel: null,
        }),
          (script.type = "text/javascript");
        try {
          script.appendChild(document.createTextNode("window." + id + "=1;"));
        } catch (e) {}
        root.insertBefore(script, root.firstChild),
          window[id] && ((jQuery.support.scriptEval = !0), delete window[id]);
        try {
          delete script.test;
        } catch (e) {
          jQuery.support.deleteExpando = !1;
        }
        root.removeChild(script),
          div.attachEvent &&
            div.fireEvent &&
            (div.attachEvent("onclick", function click() {
              (jQuery.support.noCloneEvent = !1),
                div.detachEvent("onclick", click);
            }),
            div.cloneNode(!0).fireEvent("onclick")),
          ((div = document.createElement("div")).innerHTML =
            "<input type='radio' name='radiotest' checked='checked'/>");
        var fragment = document.createDocumentFragment();
        fragment.appendChild(div.firstChild),
          (jQuery.support.checkClone = fragment
            .cloneNode(!0)
            .cloneNode(!0).lastChild.checked),
          jQuery(function () {
            var div = document.createElement("div");
            (div.style.width = div.style.paddingLeft = "1px"),
              document.body.appendChild(div),
              (jQuery.boxModel = jQuery.support.boxModel =
                2 === div.offsetWidth),
              (document.body.removeChild(div).style.display = "none"),
              (div = null);
          });
        var eventSupported = function (eventName) {
          var el = document.createElement("div"),
            isSupported = (eventName = "on" + eventName) in el;
          return (
            isSupported ||
              (el.setAttribute(eventName, "return;"),
              (isSupported = "function" == typeof el[eventName])),
            (el = null),
            isSupported
          );
        };
        (jQuery.support.submitBubbles = eventSupported("submit")),
          (jQuery.support.changeBubbles = eventSupported("change")),
          (root = script = div = all = a = null);
      }
    })(),
    (jQuery.props = {
      for: "htmlFor",
      class: "className",
      readonly: "readOnly",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      rowspan: "rowSpan",
      colspan: "colSpan",
      tabindex: "tabIndex",
      usemap: "useMap",
      frameborder: "frameBorder",
    });
  var expando = "jQuery" + now(),
    uuid = 0,
    windowData = {};
  jQuery.extend({
    cache: {},
    expando: expando,
    noData: { embed: !0, object: !0, applet: !0 },
    data: function (elem, name, data) {
      if (!elem.nodeName || !jQuery.noData[elem.nodeName.toLowerCase()]) {
        var id = (elem = elem == window ? windowData : elem)[expando],
          cache = jQuery.cache,
          thisCache;
        return id || "string" != typeof name || void 0 !== data
          ? (id || (id = ++uuid),
            "object" == typeof name
              ? ((elem[expando] = id),
                (thisCache = cache[id] = jQuery.extend(!0, {}, name)))
              : cache[id] || ((elem[expando] = id), (cache[id] = {})),
            (thisCache = cache[id]),
            void 0 !== data && (thisCache[name] = data),
            "string" == typeof name ? thisCache[name] : thisCache)
          : null;
      }
    },
    removeData: function (elem, name) {
      if (!elem.nodeName || !jQuery.noData[elem.nodeName.toLowerCase()]) {
        var id = (elem = elem == window ? windowData : elem)[expando],
          cache = jQuery.cache,
          thisCache = cache[id];
        name
          ? thisCache &&
            (delete thisCache[name],
            jQuery.isEmptyObject(thisCache) && jQuery.removeData(elem))
          : (jQuery.support.deleteExpando
              ? delete elem[jQuery.expando]
              : elem.removeAttribute && elem.removeAttribute(jQuery.expando),
            delete cache[id]);
      }
    },
  }),
    jQuery.fn.extend({
      data: function (key, value) {
        if (void 0 === key && this.length) return jQuery.data(this[0]);
        if ("object" == typeof key)
          return this.each(function () {
            jQuery.data(this, key);
          });
        var parts = key.split(".");
        if (((parts[1] = parts[1] ? "." + parts[1] : ""), void 0 === value)) {
          var data = this.triggerHandler("getData" + parts[1] + "!", [
            parts[0],
          ]);
          return (
            void 0 === data &&
              this.length &&
              (data = jQuery.data(this[0], key)),
            void 0 === data && parts[1] ? this.data(parts[0]) : data
          );
        }
        return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(
          function () {
            jQuery.data(this, key, value);
          }
        );
      },
      removeData: function (key) {
        return this.each(function () {
          jQuery.removeData(this, key);
        });
      },
    }),
    jQuery.extend({
      queue: function (elem, type, data) {
        if (elem) {
          type = (type || "fx") + "queue";
          var q = jQuery.data(elem, type);
          return data
            ? (!q || jQuery.isArray(data)
                ? (q = jQuery.data(elem, type, jQuery.makeArray(data)))
                : q.push(data),
              q)
            : q || [];
        }
      },
      dequeue: function (elem, type) {
        type = type || "fx";
        var queue = jQuery.queue(elem, type),
          fn = queue.shift();
        "inprogress" === fn && (fn = queue.shift()),
          fn &&
            ("fx" === type && queue.unshift("inprogress"),
            fn.call(elem, function () {
              jQuery.dequeue(elem, type);
            }));
      },
    }),
    jQuery.fn.extend({
      queue: function (type, data) {
        return (
          "string" != typeof type && ((data = type), (type = "fx")),
          void 0 === data
            ? jQuery.queue(this[0], type)
            : this.each(function (i, elem) {
                var queue = jQuery.queue(this, type, data);
                "fx" === type &&
                  "inprogress" !== queue[0] &&
                  jQuery.dequeue(this, type);
              })
        );
      },
      dequeue: function (type) {
        return this.each(function () {
          jQuery.dequeue(this, type);
        });
      },
      delay: function (time, type) {
        return (
          (time = (jQuery.fx && jQuery.fx.speeds[time]) || time),
          (type = type || "fx"),
          this.queue(type, function () {
            var elem = this;
            setTimeout(function () {
              jQuery.dequeue(elem, type);
            }, time);
          })
        );
      },
      clearQueue: function (type) {
        return this.queue(type || "fx", []);
      },
    });
  var rclass = /[\n\t]/g,
    rspace = /\s+/,
    rreturn = /\r/g,
    rspecialurl = /href|src|style/,
    rtype = /(button|input)/i,
    rfocusable = /(button|input|object|select|textarea)/i,
    rclickable = /^(a|area)$/i,
    rradiocheck = /radio|checkbox/;
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, name, value, !0, jQuery.attr);
    },
    removeAttr: function (name, fn) {
      return this.each(function () {
        jQuery.attr(this, name, ""),
          1 === this.nodeType && this.removeAttribute(name);
      });
    },
    addClass: function (value) {
      if (jQuery.isFunction(value))
        return this.each(function (i) {
          var self = jQuery(this);
          self.addClass(value.call(this, i, self.attr("class")));
        });
      if (value && "string" == typeof value)
        for (
          var classNames = (value || "").split(rspace), i = 0, l = this.length;
          i < l;
          i++
        ) {
          var elem = this[i];
          if (1 === elem.nodeType)
            if (elem.className) {
              for (
                var className = " " + elem.className + " ",
                  setClass = elem.className,
                  c = 0,
                  cl = classNames.length;
                c < cl;
                c++
              )
                className.indexOf(" " + classNames[c] + " ") < 0 &&
                  (setClass += " " + classNames[c]);
              elem.className = jQuery.trim(setClass);
            } else elem.className = value;
        }
      return this;
    },
    removeClass: function (value) {
      if (jQuery.isFunction(value))
        return this.each(function (i) {
          var self = jQuery(this);
          self.removeClass(value.call(this, i, self.attr("class")));
        });
      if ((value && "string" == typeof value) || void 0 === value)
        for (
          var classNames = (value || "").split(rspace), i = 0, l = this.length;
          i < l;
          i++
        ) {
          var elem = this[i];
          if (1 === elem.nodeType && elem.className)
            if (value) {
              for (
                var className = (" " + elem.className + " ").replace(
                    rclass,
                    " "
                  ),
                  c = 0,
                  cl = classNames.length;
                c < cl;
                c++
              )
                className = className.replace(" " + classNames[c] + " ", " ");
              elem.className = jQuery.trim(className);
            } else elem.className = "";
        }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value,
        isBool = "boolean" == typeof stateVal;
      return jQuery.isFunction(value)
        ? this.each(function (i) {
            var self = jQuery(this);
            self.toggleClass(
              value.call(this, i, self.attr("class"), stateVal),
              stateVal
            );
          })
        : this.each(function () {
            if ("string" === type)
              for (
                var className,
                  i = 0,
                  self = jQuery(this),
                  state = stateVal,
                  classNames = value.split(rspace);
                (className = classNames[i++]);

              )
                (state = isBool ? state : !self.hasClass(className)),
                  self[state ? "addClass" : "removeClass"](className);
            else
              ("undefined" !== type && "boolean" !== type) ||
                (this.className &&
                  jQuery.data(this, "__className__", this.className),
                (this.className =
                  this.className || !1 === value
                    ? ""
                    : jQuery.data(this, "__className__") || ""));
          });
    },
    hasClass: function (selector) {
      for (
        var className = " " + selector + " ", i = 0, l = this.length;
        i < l;
        i++
      )
        if (
          (" " + this[i].className + " ")
            .replace(rclass, " ")
            .indexOf(className) > -1
        )
          return !0;
      return !1;
    },
    val: function (value) {
      if (void 0 !== value) {
        var isFunction = jQuery.isFunction(value);
        return this.each(function (i) {
          var self = jQuery(this),
            val = value;
          if (1 === this.nodeType)
            if (
              (isFunction && (val = value.call(this, i, self.val())),
              "number" == typeof val && (val += ""),
              jQuery.isArray(val) && rradiocheck.test(this.type))
            )
              this.checked = jQuery.inArray(self.val(), val) >= 0;
            else if (jQuery.nodeName(this, "select")) {
              var values = jQuery.makeArray(val);
              jQuery("option", this).each(function () {
                this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
              }),
                values.length || (this.selectedIndex = -1);
            } else this.value = val;
        });
      }
      var elem = this[0];
      if (elem) {
        if (jQuery.nodeName(elem, "option"))
          return (elem.attributes.value || {}).specified
            ? elem.value
            : elem.text;
        if (jQuery.nodeName(elem, "select")) {
          var index = elem.selectedIndex,
            values = [],
            options = elem.options,
            one = "select-one" === elem.type;
          if (index < 0) return null;
          for (
            var i = one ? index : 0, max = one ? index + 1 : options.length;
            i < max;
            i++
          ) {
            var option = options[i];
            if (option.selected) {
              if (((value = jQuery(option).val()), one)) return value;
              values.push(value);
            }
          }
          return values;
        }
        return rradiocheck.test(elem.type) && !jQuery.support.checkOn
          ? null === elem.getAttribute("value")
            ? "on"
            : elem.value
          : (elem.value || "").replace(rreturn, "");
      }
    },
  }),
    jQuery.extend({
      attrFn: {
        val: !0,
        css: !0,
        html: !0,
        text: !0,
        data: !0,
        width: !0,
        height: !0,
        offset: !0,
      },
      attr: function (elem, name, value, pass) {
        if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType) {
          if (pass && name in jQuery.attrFn) return jQuery(elem)[name](value);
          var notxml = 1 !== elem.nodeType || !jQuery.isXMLDoc(elem),
            set = void 0 !== value;
          if (
            ((name = (notxml && jQuery.props[name]) || name),
            1 === elem.nodeType)
          ) {
            var special = rspecialurl.test(name);
            if ("selected" === name && !jQuery.support.optSelected) {
              var parent = elem.parentNode;
              parent &&
                (parent.selectedIndex,
                parent.parentNode && parent.parentNode.selectedIndex);
            }
            if (name in elem && notxml && !special) {
              if (
                (set &&
                  ("type" === name &&
                    rtype.test(elem.nodeName) &&
                    elem.parentNode &&
                    jQuery.error("type property can't be changed"),
                  (elem[name] = value)),
                jQuery.nodeName(elem, "form") && elem.getAttributeNode(name))
              )
                return elem.getAttributeNode(name).nodeValue;
              if ("tabIndex" === name) {
                var attributeNode = elem.getAttributeNode("tabIndex");
                return attributeNode && attributeNode.specified
                  ? attributeNode.value
                  : rfocusable.test(elem.nodeName) ||
                    (rclickable.test(elem.nodeName) && elem.href)
                  ? 0
                  : void 0;
              }
              return elem[name];
            }
            if (!jQuery.support.style && notxml && "style" === name)
              return (
                set && (elem.style.cssText = "" + value), elem.style.cssText
              );
            set && elem.setAttribute(name, "" + value);
            var attr =
              !jQuery.support.hrefNormalized && notxml && special
                ? elem.getAttribute(name, 2)
                : elem.getAttribute(name);
            return null === attr ? void 0 : attr;
          }
          return jQuery.style(elem, name, value);
        }
      },
    });
  var rnamespaces = /\.(.*)$/,
    fcleanup = function (nm) {
      return nm.replace(/[^\w\s\.\|`]/g, function (ch) {
        return "\\" + ch;
      });
    };
  jQuery.event = {
    add: function (elem, types, handler, data) {
      if (3 !== elem.nodeType && 8 !== elem.nodeType) {
        var handleObjIn, handleObj;
        elem.setInterval &&
          elem !== window &&
          !elem.frameElement &&
          (elem = window),
          handler.handler && (handler = (handleObjIn = handler).handler),
          handler.guid || (handler.guid = jQuery.guid++);
        var elemData = jQuery.data(elem);
        if (elemData) {
          var events = (elemData.events = elemData.events || {}),
            eventHandle,
            eventHandle;
          (eventHandle = elemData.handle) ||
            (elemData.handle = eventHandle =
              function () {
                return void 0 === jQuery || jQuery.event.triggered
                  ? void 0
                  : jQuery.event.handle.apply(eventHandle.elem, arguments);
              }),
            (eventHandle.elem = elem),
            (types = types.split(" "));
          for (var type, i = 0, namespaces; (type = types[i++]); ) {
            (handleObj = handleObjIn
              ? jQuery.extend({}, handleObjIn)
              : { handler: handler, data: data }),
              type.indexOf(".") > -1
                ? ((namespaces = type.split(".")),
                  (type = namespaces.shift()),
                  (handleObj.namespace = namespaces.slice(0).sort().join(".")))
                : ((namespaces = []), (handleObj.namespace = "")),
              (handleObj.type = type),
              (handleObj.guid = handler.guid);
            var handlers = events[type],
              special = jQuery.event.special[type] || {};
            handlers ||
              ((handlers = events[type] = []),
              (special.setup &&
                !1 !==
                  special.setup.call(elem, data, namespaces, eventHandle)) ||
                (elem.addEventListener
                  ? elem.addEventListener(type, eventHandle, !1)
                  : elem.attachEvent &&
                    elem.attachEvent("on" + type, eventHandle))),
              special.add &&
                (special.add.call(elem, handleObj),
                handleObj.handler.guid ||
                  (handleObj.handler.guid = handler.guid)),
              handlers.push(handleObj),
              (jQuery.event.global[type] = !0);
          }
          elem = null;
        }
      }
    },
    global: {},
    remove: function (elem, types, handler, pos) {
      if (3 !== elem.nodeType && 8 !== elem.nodeType) {
        var ret,
          type,
          fn,
          i = 0,
          all,
          namespaces,
          namespace,
          special,
          eventType,
          handleObj,
          origType,
          elemData = jQuery.data(elem),
          events = elemData && elemData.events;
        if (elemData && events)
          if (
            (types &&
              types.type &&
              ((handler = types.handler), (types = types.type)),
            !types || ("string" == typeof types && "." === types.charAt(0)))
          )
            for (type in ((types = types || ""), events))
              jQuery.event.remove(elem, type + types);
          else {
            for (types = types.split(" "); (type = types[i++]); )
              if (
                ((origType = type),
                (handleObj = null),
                (namespaces = []),
                (all = type.indexOf(".") < 0) ||
                  ((namespaces = type.split(".")),
                  (type = namespaces.shift()),
                  (namespace = new RegExp(
                    "(^|\\.)" +
                      jQuery
                        .map(namespaces.slice(0).sort(), fcleanup)
                        .join("\\.(?:.*\\.)?") +
                      "(\\.|$)"
                  ))),
                (eventType = events[type]))
              )
                if (handler) {
                  special = jQuery.event.special[type] || {};
                  for (
                    var j = pos || 0;
                    j < eventType.length &&
                    ((handleObj = eventType[j]),
                    handler.guid !== handleObj.guid ||
                      ((all || namespace.test(handleObj.namespace)) &&
                        (null == pos && eventType.splice(j--, 1),
                        special.remove && special.remove.call(elem, handleObj)),
                      null == pos));
                    j++
                  );
                  (0 === eventType.length ||
                    (null != pos && 1 === eventType.length)) &&
                    ((special.teardown &&
                      !1 !== special.teardown.call(elem, namespaces)) ||
                      removeEvent(elem, type, elemData.handle),
                    (ret = null),
                    delete events[type]);
                } else
                  for (var j = 0; j < eventType.length; j++)
                    (handleObj = eventType[j]),
                      (all || namespace.test(handleObj.namespace)) &&
                        (jQuery.event.remove(
                          elem,
                          origType,
                          handleObj.handler,
                          j
                        ),
                        eventType.splice(j--, 1));
            if (jQuery.isEmptyObject(events)) {
              var handle = elemData.handle;
              handle && (handle.elem = null),
                delete elemData.events,
                delete elemData.handle,
                jQuery.isEmptyObject(elemData) && jQuery.removeData(elem);
            }
          }
      }
    },
    trigger: function (event, data, elem) {
      var type = event.type || event,
        bubbling = arguments[3];
      if (!bubbling) {
        if (
          ((event =
            "object" == typeof event
              ? event[expando]
                ? event
                : jQuery.extend(jQuery.Event(type), event)
              : jQuery.Event(type)),
          type.indexOf("!") >= 0 &&
            ((event.type = type = type.slice(0, -1)), (event.exclusive = !0)),
          elem ||
            (event.stopPropagation(),
            jQuery.event.global[type] &&
              jQuery.each(jQuery.cache, function () {
                this.events &&
                  this.events[type] &&
                  jQuery.event.trigger(event, data, this.handle.elem);
              })),
          !elem || 3 === elem.nodeType || 8 === elem.nodeType)
        )
          return;
        (event.result = void 0),
          (event.target = elem),
          (data = jQuery.makeArray(data)).unshift(event);
      }
      event.currentTarget = elem;
      var handle = jQuery.data(elem, "handle");
      handle && handle.apply(elem, data);
      var parent = elem.parentNode || elem.ownerDocument;
      try {
        (elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ||
          (elem["on" + type] &&
            !1 === elem["on" + type].apply(elem, data) &&
            (event.result = !1));
      } catch (e) {}
      if (!event.isPropagationStopped() && parent)
        jQuery.event.trigger(event, data, parent, !0);
      else if (!event.isDefaultPrevented()) {
        var target = event.target,
          old,
          isClick = jQuery.nodeName(target, "a") && "click" === type,
          special = jQuery.event.special[type] || {};
        if (
          !(
            (special._default && !1 !== special._default.call(elem, event)) ||
            isClick ||
            (target &&
              target.nodeName &&
              jQuery.noData[target.nodeName.toLowerCase()])
          )
        ) {
          try {
            target[type] &&
              ((old = target["on" + type]) && (target["on" + type] = null),
              (jQuery.event.triggered = !0),
              target[type]());
          } catch (e) {}
          old && (target["on" + type] = old), (jQuery.event.triggered = !1);
        }
      }
    },
    handle: function (event) {
      var all, handlers, namespaces, namespace, events;
      ((event = arguments[0] =
        jQuery.event.fix(event || window.event)).currentTarget = this),
        (all = event.type.indexOf(".") < 0 && !event.exclusive) ||
          ((namespaces = event.type.split(".")),
          (event.type = namespaces.shift()),
          (namespace = new RegExp(
            "(^|\\.)" +
              namespaces.slice(0).sort().join("\\.(?:.*\\.)?") +
              "(\\.|$)"
          )));
      var events,
        handlers = (events = jQuery.data(this, "events"))[event.type];
      if (events && handlers)
        for (var j = 0, l = (handlers = handlers.slice(0)).length; j < l; j++) {
          var handleObj = handlers[j];
          if (all || namespace.test(handleObj.namespace)) {
            (event.handler = handleObj.handler),
              (event.data = handleObj.data),
              (event.handleObj = handleObj);
            var ret = handleObj.handler.apply(this, arguments);
            if (
              (void 0 !== ret &&
                ((event.result = ret),
                !1 === ret &&
                  (event.preventDefault(), event.stopPropagation())),
              event.isImmediatePropagationStopped())
            )
              break;
          }
        }
      return event.result;
    },
    props:
      "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(
        " "
      ),
    fix: function (event) {
      if (event[expando]) return event;
      var originalEvent = event;
      event = jQuery.Event(originalEvent);
      for (var i = this.props.length, prop; i; )
        event[(prop = this.props[--i])] = originalEvent[prop];
      if (
        (event.target || (event.target = event.srcElement || document),
        3 === event.target.nodeType && (event.target = event.target.parentNode),
        !event.relatedTarget &&
          event.fromElement &&
          (event.relatedTarget =
            event.fromElement === event.target
              ? event.toElement
              : event.fromElement),
        null == event.pageX && null != event.clientX)
      ) {
        var doc = document.documentElement,
          body = document.body;
        (event.pageX =
          event.clientX +
          ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
          ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)),
          (event.pageY =
            event.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0));
      }
      return (
        !event.which &&
          (event.charCode || 0 === event.charCode
            ? event.charCode
            : event.keyCode) &&
          (event.which = event.charCode || event.keyCode),
        !event.metaKey && event.ctrlKey && (event.metaKey = event.ctrlKey),
        event.which ||
          void 0 === event.button ||
          (event.which =
            1 & event.button
              ? 1
              : 2 & event.button
              ? 3
              : 4 & event.button
              ? 2
              : 0),
        event
      );
    },
    guid: 1e8,
    proxy: jQuery.proxy,
    special: {
      ready: { setup: jQuery.bindReady, teardown: jQuery.noop },
      live: {
        add: function (handleObj) {
          jQuery.event.add(
            this,
            handleObj.origType,
            jQuery.extend({}, handleObj, { handler: liveHandler })
          );
        },
        remove: function (handleObj) {
          var remove = !0,
            type = handleObj.origType.replace(rnamespaces, "");
          jQuery.each(jQuery.data(this, "events").live || [], function () {
            if (type === this.origType.replace(rnamespaces, ""))
              return (remove = !1), !1;
          }),
            remove &&
              jQuery.event.remove(this, handleObj.origType, liveHandler);
        },
      },
      beforeunload: {
        setup: function (data, namespaces, eventHandle) {
          return this.setInterval && (this.onbeforeunload = eventHandle), !1;
        },
        teardown: function (namespaces, eventHandle) {
          this.onbeforeunload === eventHandle && (this.onbeforeunload = null);
        },
      },
    },
  };
  var removeEvent = document.removeEventListener
    ? function (elem, type, handle) {
        elem.removeEventListener(type, handle, !1);
      }
    : function (elem, type, handle) {
        elem.detachEvent("on" + type, handle);
      };
  function returnFalse() {
    return !1;
  }
  function returnTrue() {
    return !0;
  }
  (jQuery.Event = function (src) {
    if (!this.preventDefault) return new jQuery.Event(src);
    src && src.type
      ? ((this.originalEvent = src), (this.type = src.type))
      : (this.type = src),
      (this.timeStamp = now()),
      (this[expando] = !0);
  }),
    (jQuery.Event.prototype = {
      preventDefault: function () {
        this.isDefaultPrevented = returnTrue;
        var e = this.originalEvent;
        e && (e.preventDefault && e.preventDefault(), (e.returnValue = !1));
      },
      stopPropagation: function () {
        this.isPropagationStopped = returnTrue;
        var e = this.originalEvent;
        e && (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        (this.isImmediatePropagationStopped = returnTrue),
          this.stopPropagation();
      },
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
    });
  var withinElement = function (event) {
      var parent = event.relatedTarget;
      try {
        for (; parent && parent !== this; ) parent = parent.parentNode;
        parent !== this &&
          ((event.type = event.data),
          jQuery.event.handle.apply(this, arguments));
      } catch (e) {}
    },
    delegate = function (event) {
      (event.type = event.data), jQuery.event.handle.apply(this, arguments);
    };
  if (
    (jQuery.each(
      { mouseenter: "mouseover", mouseleave: "mouseout" },
      function (orig, fix) {
        jQuery.event.special[orig] = {
          setup: function (data) {
            jQuery.event.add(
              this,
              fix,
              data && data.selector ? delegate : withinElement,
              orig
            );
          },
          teardown: function (data) {
            jQuery.event.remove(
              this,
              fix,
              data && data.selector ? delegate : withinElement
            );
          },
        };
      }
    ),
    jQuery.support.submitBubbles ||
      (jQuery.event.special.submit = {
        setup: function (data, namespaces) {
          if ("form" === this.nodeName.toLowerCase()) return !1;
          jQuery.event.add(this, "click.specialSubmit", function (e) {
            var elem = e.target,
              type = elem.type;
            if (
              ("submit" === type || "image" === type) &&
              jQuery(elem).closest("form").length
            )
              return trigger("submit", this, arguments);
          }),
            jQuery.event.add(this, "keypress.specialSubmit", function (e) {
              var elem = e.target,
                type = elem.type;
              if (
                ("text" === type || "password" === type) &&
                jQuery(elem).closest("form").length &&
                13 === e.keyCode
              )
                return trigger("submit", this, arguments);
            });
        },
        teardown: function (namespaces) {
          jQuery.event.remove(this, ".specialSubmit");
        },
      }),
    !jQuery.support.changeBubbles)
  ) {
    var formElems = /textarea|input|select/i,
      changeFilters,
      getVal = function (elem) {
        var type = elem.type,
          val = elem.value;
        return (
          "radio" === type || "checkbox" === type
            ? (val = elem.checked)
            : "select-multiple" === type
            ? (val =
                elem.selectedIndex > -1
                  ? jQuery
                      .map(elem.options, function (elem) {
                        return elem.selected;
                      })
                      .join("-")
                  : "")
            : "select" === elem.nodeName.toLowerCase() &&
              (val = elem.selectedIndex),
          val
        );
      },
      testChange = function testChange(e) {
        var elem = e.target,
          data,
          val;
        if (
          formElems.test(elem.nodeName) &&
          !elem.readOnly &&
          ((data = jQuery.data(elem, "_change_data")),
          (val = getVal(elem)),
          ("focusout" === e.type && "radio" === elem.type) ||
            jQuery.data(elem, "_change_data", val),
          void 0 !== data && val !== data)
        )
          return null != data || val
            ? ((e.type = "change"), jQuery.event.trigger(e, arguments[1], elem))
            : void 0;
      };
    (jQuery.event.special.change = {
      filters: {
        focusout: testChange,
        click: function (e) {
          var elem = e.target,
            type = elem.type;
          if (
            "radio" === type ||
            "checkbox" === type ||
            "select" === elem.nodeName.toLowerCase()
          )
            return testChange.call(this, e);
        },
        keydown: function (e) {
          var elem = e.target,
            type = elem.type;
          if (
            (13 === e.keyCode && "textarea" !== elem.nodeName.toLowerCase()) ||
            (32 === e.keyCode && ("checkbox" === type || "radio" === type)) ||
            "select-multiple" === type
          )
            return testChange.call(this, e);
        },
        beforeactivate: function (e) {
          var elem = e.target;
          jQuery.data(elem, "_change_data", getVal(elem));
        },
      },
      setup: function (data, namespaces) {
        if ("file" === this.type) return !1;
        for (var type in changeFilters)
          jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
        return formElems.test(this.nodeName);
      },
      teardown: function (namespaces) {
        return (
          jQuery.event.remove(this, ".specialChange"),
          formElems.test(this.nodeName)
        );
      },
    }),
      (changeFilters = jQuery.event.special.change.filters);
  }
  function trigger(type, elem, args) {
    return (args[0].type = type), jQuery.event.handle.apply(elem, args);
  }
  document.addEventListener &&
    jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
      function handler(e) {
        return (
          ((e = jQuery.event.fix(e)).type = fix),
          jQuery.event.handle.call(this, e)
        );
      }
      jQuery.event.special[fix] = {
        setup: function () {
          this.addEventListener(orig, handler, !0);
        },
        teardown: function () {
          this.removeEventListener(orig, handler, !0);
        },
      };
    }),
    jQuery.each(["bind", "one"], function (i, name) {
      jQuery.fn[name] = function (type, data, fn) {
        if ("object" == typeof type) {
          for (var key in type) this[name](key, data, type[key], fn);
          return this;
        }
        jQuery.isFunction(data) && ((fn = data), (data = void 0));
        var handler =
          "one" === name
            ? jQuery.proxy(fn, function (event) {
                return (
                  jQuery(this).unbind(event, handler), fn.apply(this, arguments)
                );
              })
            : fn;
        if ("unload" === type && "one" !== name) this.one(type, data, fn);
        else
          for (var i = 0, l = this.length; i < l; i++)
            jQuery.event.add(this[i], type, handler, data);
        return this;
      };
    }),
    jQuery.fn.extend({
      unbind: function (type, fn) {
        if ("object" != typeof type || type.preventDefault)
          for (var i = 0, l = this.length; i < l; i++)
            jQuery.event.remove(this[i], type, fn);
        else for (var key in type) this.unbind(key, type[key]);
        return this;
      },
      delegate: function (selector, types, data, fn) {
        return this.live(types, data, fn, selector);
      },
      undelegate: function (selector, types, fn) {
        return 0 === arguments.length
          ? this.unbind("live")
          : this.die(types, null, fn, selector);
      },
      trigger: function (type, data) {
        return this.each(function () {
          jQuery.event.trigger(type, data, this);
        });
      },
      triggerHandler: function (type, data) {
        if (this[0]) {
          var event = jQuery.Event(type);
          return (
            event.preventDefault(),
            event.stopPropagation(),
            jQuery.event.trigger(event, data, this[0]),
            event.result
          );
        }
      },
      toggle: function (fn) {
        for (var args = arguments, i = 1; i < args.length; )
          jQuery.proxy(fn, args[i++]);
        return this.click(
          jQuery.proxy(fn, function (event) {
            var lastToggle =
              (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
            return (
              jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1),
              event.preventDefault(),
              args[lastToggle].apply(this, arguments) || !1
            );
          })
        );
      },
      hover: function (fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      },
    });
  var liveMap = {
    focus: "focusin",
    blur: "focusout",
    mouseenter: "mouseover",
    mouseleave: "mouseout",
  };
  function liveHandler(event) {
    var stop,
      elems = [],
      selectors = [],
      args = arguments,
      related,
      match,
      handleObj,
      elem,
      j,
      i,
      l,
      data,
      events = jQuery.data(this, "events");
    if (
      event.liveFired !== this &&
      events &&
      events.live &&
      (!event.button || "click" !== event.type)
    ) {
      event.liveFired = this;
      var live = events.live.slice(0);
      for (j = 0; j < live.length; j++)
        (handleObj = live[j]).origType.replace(rnamespaces, "") === event.type
          ? selectors.push(handleObj.selector)
          : live.splice(j--, 1);
      for (
        i = 0,
          l = (match = jQuery(event.target).closest(
            selectors,
            event.currentTarget
          )).length;
        i < l;
        i++
      )
        for (j = 0; j < live.length; j++)
          (handleObj = live[j]),
            match[i].selector === handleObj.selector &&
              ((elem = match[i].elem),
              (related = null),
              ("mouseenter" !== handleObj.preType &&
                "mouseleave" !== handleObj.preType) ||
                (related = jQuery(event.relatedTarget).closest(
                  handleObj.selector
                )[0]),
              (related && related === elem) ||
                elems.push({ elem: elem, handleObj: handleObj }));
      for (i = 0, l = elems.length; i < l; i++)
        if (
          ((match = elems[i]),
          (event.currentTarget = match.elem),
          (event.data = match.handleObj.data),
          (event.handleObj = match.handleObj),
          !1 === match.handleObj.origHandler.apply(match.elem, args))
        ) {
          stop = !1;
          break;
        }
      return stop;
    }
  }
  function liveConvert(type, selector) {
    return (
      "live." +
      (type && "*" !== type ? type + "." : "") +
      selector.replace(/\./g, "`").replace(/ /g, "&")
    );
  }
  jQuery.each(["live", "die"], function (i, name) {
    jQuery.fn[name] = function (types, data, fn, origSelector) {
      var type,
        i = 0,
        match,
        namespaces,
        preType,
        selector = origSelector || this.selector,
        context = origSelector ? this : jQuery(this.context);
      for (
        jQuery.isFunction(data) && ((fn = data), (data = void 0)),
          types = (types || "").split(" ");
        null != (type = types[i++]);

      )
        (namespaces = ""),
          (match = rnamespaces.exec(type)) &&
            ((namespaces = match[0]), (type = type.replace(rnamespaces, ""))),
          "hover" !== type
            ? ((preType = type),
              "focus" === type || "blur" === type
                ? (types.push(liveMap[type] + namespaces), (type += namespaces))
                : (type = (liveMap[type] || type) + namespaces),
              "live" === name
                ? context.each(function () {
                    jQuery.event.add(this, liveConvert(type, selector), {
                      data: data,
                      selector: selector,
                      handler: fn,
                      origType: type,
                      origHandler: fn,
                      preType: preType,
                    });
                  })
                : context.unbind(liveConvert(type, selector), fn))
            : types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
      return this;
    };
  }),
    jQuery.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(
        " "
      ),
      function (i, name) {
        (jQuery.fn[name] = function (fn) {
          return fn ? this.bind(name, fn) : this.trigger(name);
        }),
          jQuery.attrFn && (jQuery.attrFn[name] = !0);
      }
    ),
    window.attachEvent &&
      !window.addEventListener &&
      window.attachEvent("onunload", function () {
        for (var id in jQuery.cache)
          if (jQuery.cache[id].handle)
            try {
              jQuery.event.remove(jQuery.cache[id].handle.elem);
            } catch (e) {}
      }),
    /*!
     * Sizzle CSS Selector Engine - v1.0
     *  Copyright 2009, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */ (function () {
      var chunker =
          /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        done = 0,
        toString = Object.prototype.toString,
        hasDuplicate = !1,
        baseHasDuplicate = !0;
      [0, 0].sort(function () {
        return (baseHasDuplicate = !1), 0;
      });
      var Sizzle = function (selector, context, results, seed) {
        results = results || [];
        var origContext = (context = context || document);
        if (1 !== context.nodeType && 9 !== context.nodeType) return [];
        if (!selector || "string" != typeof selector) return results;
        for (
          var parts = [],
            m,
            set,
            checkSet,
            extra,
            prune = !0,
            contextXML = isXML(context),
            soFar = selector;
          null !== (chunker.exec(""), (m = chunker.exec(soFar)));

        )
          if (((soFar = m[3]), parts.push(m[1]), m[2])) {
            extra = m[3];
            break;
          }
        if (parts.length > 1 && origPOS.exec(selector))
          if (2 === parts.length && Expr.relative[parts[0]])
            set = posProcess(parts[0] + parts[1], context);
          else
            for (
              set = Expr.relative[parts[0]]
                ? [context]
                : Sizzle(parts.shift(), context);
              parts.length;

            )
              (selector = parts.shift()),
                Expr.relative[selector] && (selector += parts.shift()),
                (set = posProcess(selector, set));
        else {
          var ret, ret;
          if (
            !seed &&
            parts.length > 1 &&
            9 === context.nodeType &&
            !contextXML &&
            Expr.match.ID.test(parts[0]) &&
            !Expr.match.ID.test(parts[parts.length - 1])
          )
            context = (ret = Sizzle.find(parts.shift(), context, contextXML))
              .expr
              ? Sizzle.filter(ret.expr, ret.set)[0]
              : ret.set[0];
          if (context)
            for (
              set = (ret = seed
                ? { expr: parts.pop(), set: makeArray(seed) }
                : Sizzle.find(
                    parts.pop(),
                    1 !== parts.length ||
                      ("~" !== parts[0] && "+" !== parts[0]) ||
                      !context.parentNode
                      ? context
                      : context.parentNode,
                    contextXML
                  )).expr
                ? Sizzle.filter(ret.expr, ret.set)
                : ret.set,
                parts.length > 0 ? (checkSet = makeArray(set)) : (prune = !1);
              parts.length;

            ) {
              var cur = parts.pop(),
                pop = cur;
              Expr.relative[cur] ? (pop = parts.pop()) : (cur = ""),
                null == pop && (pop = context),
                Expr.relative[cur](checkSet, pop, contextXML);
            }
          else checkSet = parts = [];
        }
        if (
          (checkSet || (checkSet = set),
          checkSet || Sizzle.error(cur || selector),
          "[object Array]" === toString.call(checkSet))
        )
          if (prune)
            if (context && 1 === context.nodeType)
              for (var i = 0; null != checkSet[i]; i++)
                checkSet[i] &&
                  (!0 === checkSet[i] ||
                    (1 === checkSet[i].nodeType &&
                      contains(context, checkSet[i]))) &&
                  results.push(set[i]);
            else
              for (var i = 0; null != checkSet[i]; i++)
                checkSet[i] &&
                  1 === checkSet[i].nodeType &&
                  results.push(set[i]);
          else results.push.apply(results, checkSet);
        else makeArray(checkSet, results);
        return (
          extra &&
            (Sizzle(extra, origContext, results, seed),
            Sizzle.uniqueSort(results)),
          results
        );
      };
      (Sizzle.uniqueSort = function (results) {
        if (
          sortOrder &&
          ((hasDuplicate = baseHasDuplicate),
          results.sort(sortOrder),
          hasDuplicate)
        )
          for (var i = 1; i < results.length; i++)
            results[i] === results[i - 1] && results.splice(i--, 1);
        return results;
      }),
        (Sizzle.matches = function (expr, set) {
          return Sizzle(expr, null, null, set);
        }),
        (Sizzle.find = function (expr, context, isXML) {
          var set, match;
          if (!expr) return [];
          for (var i = 0, l = Expr.order.length; i < l; i++) {
            var type = Expr.order[i],
              match;
            if ((match = Expr.leftMatch[type].exec(expr))) {
              var left = match[1];
              if (
                (match.splice(1, 1),
                "\\" !== left.substr(left.length - 1) &&
                  ((match[1] = (match[1] || "").replace(/\\/g, "")),
                  null != (set = Expr.find[type](match, context, isXML))))
              ) {
                expr = expr.replace(Expr.match[type], "");
                break;
              }
            }
          }
          return (
            set || (set = context.getElementsByTagName("*")),
            { set: set, expr: expr }
          );
        }),
        (Sizzle.filter = function (expr, set, inplace, not) {
          for (
            var old = expr,
              result = [],
              curLoop = set,
              match,
              anyFound,
              isXMLFilter = set && set[0] && isXML(set[0]);
            expr && set.length;

          ) {
            for (var type in Expr.filter)
              if (
                null != (match = Expr.leftMatch[type].exec(expr)) &&
                match[2]
              ) {
                var filter = Expr.filter[type],
                  found,
                  item,
                  left = match[1];
                if (
                  ((anyFound = !1),
                  match.splice(1, 1),
                  "\\" === left.substr(left.length - 1))
                )
                  continue;
                if ((curLoop === result && (result = []), Expr.preFilter[type]))
                  if (
                    (match = Expr.preFilter[type](
                      match,
                      curLoop,
                      inplace,
                      result,
                      not,
                      isXMLFilter
                    ))
                  ) {
                    if (!0 === match) continue;
                  } else anyFound = found = !0;
                if (match)
                  for (var i = 0; null != (item = curLoop[i]); i++)
                    if (item) {
                      var pass =
                        not ^ !!(found = filter(item, match, i, curLoop));
                      inplace && null != found
                        ? pass
                          ? (anyFound = !0)
                          : (curLoop[i] = !1)
                        : pass && (result.push(item), (anyFound = !0));
                    }
                if (void 0 !== found) {
                  if (
                    (inplace || (curLoop = result),
                    (expr = expr.replace(Expr.match[type], "")),
                    !anyFound)
                  )
                    return [];
                  break;
                }
              }
            if (expr === old) {
              if (null != anyFound) break;
              Sizzle.error(expr);
            }
            old = expr;
          }
          return curLoop;
        }),
        (Sizzle.error = function (msg) {
          throw "Syntax error, unrecognized expression: " + msg;
        });
      var Expr = (Sizzle.selectors = {
          order: ["ID", "NAME", "TAG"],
          match: {
            ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
            PSEUDO:
              /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/,
          },
          leftMatch: {},
          attrMap: { class: "className", for: "htmlFor" },
          attrHandle: {
            href: function (elem) {
              return elem.getAttribute("href");
            },
          },
          relative: {
            "+": function (checkSet, part) {
              var isPartStr = "string" == typeof part,
                isTag = isPartStr && !/\W/.test(part),
                isPartStrNotTag = isPartStr && !isTag;
              isTag && (part = part.toLowerCase());
              for (var i = 0, l = checkSet.length, elem; i < l; i++)
                if ((elem = checkSet[i])) {
                  for (
                    ;
                    (elem = elem.previousSibling) && 1 !== elem.nodeType;

                  );
                  checkSet[i] =
                    isPartStrNotTag ||
                    (elem && elem.nodeName.toLowerCase() === part)
                      ? elem || !1
                      : elem === part;
                }
              isPartStrNotTag && Sizzle.filter(part, checkSet, !0);
            },
            ">": function (checkSet, part) {
              var isPartStr = "string" == typeof part;
              if (isPartStr && !/\W/.test(part)) {
                part = part.toLowerCase();
                for (var i = 0, l = checkSet.length; i < l; i++) {
                  var elem;
                  if ((elem = checkSet[i])) {
                    var parent = elem.parentNode;
                    checkSet[i] =
                      parent.nodeName.toLowerCase() === part && parent;
                  }
                }
              } else {
                for (var i = 0, l = checkSet.length; i < l; i++) {
                  var elem;
                  (elem = checkSet[i]) &&
                    (checkSet[i] = isPartStr
                      ? elem.parentNode
                      : elem.parentNode === part);
                }
                isPartStr && Sizzle.filter(part, checkSet, !0);
              }
            },
            "": function (checkSet, part, isXML) {
              var doneName = done++,
                checkFn = dirCheck;
              if ("string" == typeof part && !/\W/.test(part)) {
                var nodeCheck = (part = part.toLowerCase());
                checkFn = dirNodeCheck;
              }
              checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
            },
            "~": function (checkSet, part, isXML) {
              var doneName = done++,
                checkFn = dirCheck;
              if ("string" == typeof part && !/\W/.test(part)) {
                var nodeCheck = (part = part.toLowerCase());
                checkFn = dirNodeCheck;
              }
              checkFn(
                "previousSibling",
                part,
                doneName,
                checkSet,
                nodeCheck,
                isXML
              );
            },
          },
          find: {
            ID: function (match, context, isXML) {
              if (void 0 !== context.getElementById && !isXML) {
                var m = context.getElementById(match[1]);
                return m ? [m] : [];
              }
            },
            NAME: function (match, context) {
              if (void 0 !== context.getElementsByName) {
                for (
                  var ret = [],
                    results = context.getElementsByName(match[1]),
                    i = 0,
                    l = results.length;
                  i < l;
                  i++
                )
                  results[i].getAttribute("name") === match[1] &&
                    ret.push(results[i]);
                return 0 === ret.length ? null : ret;
              }
            },
            TAG: function (match, context) {
              return context.getElementsByTagName(match[1]);
            },
          },
          preFilter: {
            CLASS: function (match, curLoop, inplace, result, not, isXML) {
              if (((match = " " + match[1].replace(/\\/g, "") + " "), isXML))
                return match;
              for (var i = 0, elem; null != (elem = curLoop[i]); i++)
                elem &&
                  (not ^
                  (elem.className &&
                    (" " + elem.className + " ")
                      .replace(/[\t\n]/g, " ")
                      .indexOf(match) >= 0)
                    ? inplace || result.push(elem)
                    : inplace && (curLoop[i] = !1));
              return !1;
            },
            ID: function (match) {
              return match[1].replace(/\\/g, "");
            },
            TAG: function (match, curLoop) {
              return match[1].toLowerCase();
            },
            CHILD: function (match) {
              if ("nth" === match[1]) {
                var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
                  ("even" === match[2] ? "2n" : "odd" === match[2] && "2n+1") ||
                    (!/\D/.test(match[2]) && "0n+" + match[2]) ||
                    match[2]
                );
                (match[2] = test[1] + (test[2] || 1) - 0),
                  (match[3] = test[3] - 0);
              }
              return (match[0] = done++), match;
            },
            ATTR: function (match, curLoop, inplace, result, not, isXML) {
              var name = match[1].replace(/\\/g, "");
              return (
                !isXML && Expr.attrMap[name] && (match[1] = Expr.attrMap[name]),
                "~=" === match[2] && (match[4] = " " + match[4] + " "),
                match
              );
            },
            PSEUDO: function (match, curLoop, inplace, result, not) {
              if ("not" === match[1]) {
                if (
                  !(
                    (chunker.exec(match[3]) || "").length > 1 ||
                    /^\w/.test(match[3])
                  )
                ) {
                  var ret = Sizzle.filter(match[3], curLoop, inplace, !0 ^ not);
                  return inplace || result.push.apply(result, ret), !1;
                }
                match[3] = Sizzle(match[3], null, null, curLoop);
              } else if (
                Expr.match.POS.test(match[0]) ||
                Expr.match.CHILD.test(match[0])
              )
                return !0;
              return match;
            },
            POS: function (match) {
              return match.unshift(!0), match;
            },
          },
          filters: {
            enabled: function (elem) {
              return !1 === elem.disabled && "hidden" !== elem.type;
            },
            disabled: function (elem) {
              return !0 === elem.disabled;
            },
            checked: function (elem) {
              return !0 === elem.checked;
            },
            selected: function (elem) {
              return elem.parentNode.selectedIndex, !0 === elem.selected;
            },
            parent: function (elem) {
              return !!elem.firstChild;
            },
            empty: function (elem) {
              return !elem.firstChild;
            },
            has: function (elem, i, match) {
              return !!Sizzle(match[3], elem).length;
            },
            header: function (elem) {
              return /h\d/i.test(elem.nodeName);
            },
            text: function (elem) {
              return "text" === elem.type;
            },
            radio: function (elem) {
              return "radio" === elem.type;
            },
            checkbox: function (elem) {
              return "checkbox" === elem.type;
            },
            file: function (elem) {
              return "file" === elem.type;
            },
            password: function (elem) {
              return "password" === elem.type;
            },
            submit: function (elem) {
              return "submit" === elem.type;
            },
            image: function (elem) {
              return "image" === elem.type;
            },
            reset: function (elem) {
              return "reset" === elem.type;
            },
            button: function (elem) {
              return (
                "button" === elem.type ||
                "button" === elem.nodeName.toLowerCase()
              );
            },
            input: function (elem) {
              return /input|select|textarea|button/i.test(elem.nodeName);
            },
          },
          setFilters: {
            first: function (elem, i) {
              return 0 === i;
            },
            last: function (elem, i, match, array) {
              return i === array.length - 1;
            },
            even: function (elem, i) {
              return i % 2 == 0;
            },
            odd: function (elem, i) {
              return i % 2 == 1;
            },
            lt: function (elem, i, match) {
              return i < match[3] - 0;
            },
            gt: function (elem, i, match) {
              return i > match[3] - 0;
            },
            nth: function (elem, i, match) {
              return match[3] - 0 === i;
            },
            eq: function (elem, i, match) {
              return match[3] - 0 === i;
            },
          },
          filter: {
            PSEUDO: function (elem, match, i, array) {
              var name = match[1],
                filter = Expr.filters[name];
              if (filter) return filter(elem, i, match, array);
              if ("contains" === name)
                return (
                  (
                    elem.textContent ||
                    elem.innerText ||
                    getText([elem]) ||
                    ""
                  ).indexOf(match[3]) >= 0
                );
              if ("not" === name) {
                for (var not = match[3], i = 0, l = not.length; i < l; i++)
                  if (not[i] === elem) return !1;
                return !0;
              }
              Sizzle.error("Syntax error, unrecognized expression: " + name);
            },
            CHILD: function (elem, match) {
              var type = match[1],
                node = elem;
              switch (type) {
                case "only":
                case "first":
                  for (; (node = node.previousSibling); )
                    if (1 === node.nodeType) return !1;
                  if ("first" === type) return !0;
                  node = elem;
                case "last":
                  for (; (node = node.nextSibling); )
                    if (1 === node.nodeType) return !1;
                  return !0;
                case "nth":
                  var first = match[2],
                    last = match[3];
                  if (1 === first && 0 === last) return !0;
                  var doneName = match[0],
                    parent = elem.parentNode;
                  if (
                    parent &&
                    (parent.sizcache !== doneName || !elem.nodeIndex)
                  ) {
                    var count = 0;
                    for (
                      node = parent.firstChild;
                      node;
                      node = node.nextSibling
                    )
                      1 === node.nodeType && (node.nodeIndex = ++count);
                    parent.sizcache = doneName;
                  }
                  var diff = elem.nodeIndex - last;
                  return 0 === first
                    ? 0 === diff
                    : diff % first == 0 && diff / first >= 0;
              }
            },
            ID: function (elem, match) {
              return 1 === elem.nodeType && elem.getAttribute("id") === match;
            },
            TAG: function (elem, match) {
              return (
                ("*" === match && 1 === elem.nodeType) ||
                elem.nodeName.toLowerCase() === match
              );
            },
            CLASS: function (elem, match) {
              return (
                (
                  " " +
                  (elem.className || elem.getAttribute("class")) +
                  " "
                ).indexOf(match) > -1
              );
            },
            ATTR: function (elem, match) {
              var name = match[1],
                result = Expr.attrHandle[name]
                  ? Expr.attrHandle[name](elem)
                  : null != elem[name]
                  ? elem[name]
                  : elem.getAttribute(name),
                value = result + "",
                type = match[2],
                check = match[4];
              return null == result
                ? "!=" === type
                : "=" === type
                ? value === check
                : "*=" === type
                ? value.indexOf(check) >= 0
                : "~=" === type
                ? (" " + value + " ").indexOf(check) >= 0
                : check
                ? "!=" === type
                  ? value !== check
                  : "^=" === type
                  ? 0 === value.indexOf(check)
                  : "$=" === type
                  ? value.substr(value.length - check.length) === check
                  : "|=" === type &&
                    (value === check ||
                      value.substr(0, check.length + 1) === check + "-")
                : value && !1 !== result;
            },
            POS: function (elem, match, i, array) {
              var name = match[2],
                filter = Expr.setFilters[name];
              if (filter) return filter(elem, i, match, array);
            },
          },
        }),
        origPOS = Expr.match.POS;
      for (var type in Expr.match)
        (Expr.match[type] = new RegExp(
          Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source
        )),
          (Expr.leftMatch[type] = new RegExp(
            /(^(?:.|\r|\n)*?)/.source +
              Expr.match[type].source.replace(/\\(\d+)/g, function (all, num) {
                return "\\" + (num - 0 + 1);
              })
          ));
      var makeArray = function (array, results) {
          return (
            (array = Array.prototype.slice.call(array, 0)),
            results ? (results.push.apply(results, array), results) : array
          );
        },
        sortOrder,
        div;
      try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0]
          .nodeType;
      } catch (e) {
        makeArray = function (array, results) {
          var ret = results || [];
          if ("[object Array]" === toString.call(array))
            Array.prototype.push.apply(ret, array);
          else if ("number" == typeof array.length)
            for (var i = 0, l = array.length; i < l; i++) ret.push(array[i]);
          else for (var i = 0; array[i]; i++) ret.push(array[i]);
          return ret;
        };
      }
      function getText(elems) {
        for (var ret = "", elem, i = 0; elems[i]; i++)
          3 === (elem = elems[i]).nodeType || 4 === elem.nodeType
            ? (ret += elem.nodeValue)
            : 8 !== elem.nodeType && (ret += getText(elem.childNodes));
        return ret;
      }
      function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        for (var i = 0, l = checkSet.length; i < l; i++) {
          var elem = checkSet[i];
          if (elem) {
            elem = elem[dir];
            for (var match = !1; elem; ) {
              if (elem.sizcache === doneName) {
                match = checkSet[elem.sizset];
                break;
              }
              if (
                (1 !== elem.nodeType ||
                  isXML ||
                  ((elem.sizcache = doneName), (elem.sizset = i)),
                elem.nodeName.toLowerCase() === cur)
              ) {
                match = elem;
                break;
              }
              elem = elem[dir];
            }
            checkSet[i] = match;
          }
        }
      }
      function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        for (var i = 0, l = checkSet.length; i < l; i++) {
          var elem = checkSet[i];
          if (elem) {
            elem = elem[dir];
            for (var match = !1; elem; ) {
              if (elem.sizcache === doneName) {
                match = checkSet[elem.sizset];
                break;
              }
              if (1 === elem.nodeType)
                if (
                  (isXML || ((elem.sizcache = doneName), (elem.sizset = i)),
                  "string" != typeof cur)
                ) {
                  if (elem === cur) {
                    match = !0;
                    break;
                  }
                } else if (Sizzle.filter(cur, [elem]).length > 0) {
                  match = elem;
                  break;
                }
              elem = elem[dir];
            }
            checkSet[i] = match;
          }
        }
      }
      document.documentElement.compareDocumentPosition
        ? (sortOrder = function (a, b) {
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)
              return (
                a == b && (hasDuplicate = !0),
                a.compareDocumentPosition ? -1 : 1
              );
            var ret = 4 & a.compareDocumentPosition(b) ? -1 : a === b ? 0 : 1;
            return 0 === ret && (hasDuplicate = !0), ret;
          })
        : "sourceIndex" in document.documentElement
        ? (sortOrder = function (a, b) {
            if (!a.sourceIndex || !b.sourceIndex)
              return a == b && (hasDuplicate = !0), a.sourceIndex ? -1 : 1;
            var ret = a.sourceIndex - b.sourceIndex;
            return 0 === ret && (hasDuplicate = !0), ret;
          })
        : document.createRange &&
          (sortOrder = function (a, b) {
            if (!a.ownerDocument || !b.ownerDocument)
              return a == b && (hasDuplicate = !0), a.ownerDocument ? -1 : 1;
            var aRange = a.ownerDocument.createRange(),
              bRange = b.ownerDocument.createRange();
            aRange.setStart(a, 0),
              aRange.setEnd(a, 0),
              bRange.setStart(b, 0),
              bRange.setEnd(b, 0);
            var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
            return 0 === ret && (hasDuplicate = !0), ret;
          }),
        (function () {
          var form = document.createElement("div"),
            id = "script" + new Date().getTime();
          form.innerHTML = "<a name='" + id + "'/>";
          var root = document.documentElement;
          root.insertBefore(form, root.firstChild),
            document.getElementById(id) &&
              ((Expr.find.ID = function (match, context, isXML) {
                if (void 0 !== context.getElementById && !isXML) {
                  var m = context.getElementById(match[1]);
                  return m
                    ? m.id === match[1] ||
                      (void 0 !== m.getAttributeNode &&
                        m.getAttributeNode("id").nodeValue === match[1])
                      ? [m]
                      : void 0
                    : [];
                }
              }),
              (Expr.filter.ID = function (elem, match) {
                var node =
                  void 0 !== elem.getAttributeNode &&
                  elem.getAttributeNode("id");
                return 1 === elem.nodeType && node && node.nodeValue === match;
              })),
            root.removeChild(form),
            (root = form = null);
        })(),
        (div = document.createElement("div")).appendChild(
          document.createComment("")
        ),
        div.getElementsByTagName("*").length > 0 &&
          (Expr.find.TAG = function (match, context) {
            var results = context.getElementsByTagName(match[1]);
            if ("*" === match[1]) {
              for (var tmp = [], i = 0; results[i]; i++)
                1 === results[i].nodeType && tmp.push(results[i]);
              results = tmp;
            }
            return results;
          }),
        (div.innerHTML = "<a href='#'></a>"),
        div.firstChild &&
          void 0 !== div.firstChild.getAttribute &&
          "#" !== div.firstChild.getAttribute("href") &&
          (Expr.attrHandle.href = function (elem) {
            return elem.getAttribute("href", 2);
          }),
        (div = null),
        document.querySelectorAll &&
          (function () {
            var oldSizzle = Sizzle,
              div = document.createElement("div");
            if (
              ((div.innerHTML = "<p class='TEST'></p>"),
              !div.querySelectorAll ||
                0 !== div.querySelectorAll(".TEST").length)
            ) {
              for (var prop in ((Sizzle = function (
                query,
                context,
                extra,
                seed
              ) {
                if (
                  ((context = context || document),
                  !seed && 9 === context.nodeType && !isXML(context))
                )
                  try {
                    return makeArray(context.querySelectorAll(query), extra);
                  } catch (e) {}
                return oldSizzle(query, context, extra, seed);
              }),
              oldSizzle))
                Sizzle[prop] = oldSizzle[prop];
              div = null;
            }
          })(),
        (function () {
          var div = document.createElement("div");
          (div.innerHTML =
            "<div class='test e'></div><div class='test'></div>"),
            div.getElementsByClassName &&
              0 !== div.getElementsByClassName("e").length &&
              ((div.lastChild.className = "e"),
              1 !== div.getElementsByClassName("e").length &&
                (Expr.order.splice(1, 0, "CLASS"),
                (Expr.find.CLASS = function (match, context, isXML) {
                  if (void 0 !== context.getElementsByClassName && !isXML)
                    return context.getElementsByClassName(match[1]);
                }),
                (div = null)));
        })();
      var contains = document.compareDocumentPosition
          ? function (a, b) {
              return !!(16 & a.compareDocumentPosition(b));
            }
          : function (a, b) {
              return a !== b && (!a.contains || a.contains(b));
            },
        isXML = function (elem) {
          var documentElement = (elem ? elem.ownerDocument || elem : 0)
            .documentElement;
          return !!documentElement && "HTML" !== documentElement.nodeName;
        },
        posProcess = function (selector, context) {
          for (
            var tmpSet = [],
              later = "",
              match,
              root = context.nodeType ? [context] : context;
            (match = Expr.match.PSEUDO.exec(selector));

          )
            (later += match[0]),
              (selector = selector.replace(Expr.match.PSEUDO, ""));
          selector = Expr.relative[selector] ? selector + "*" : selector;
          for (var i = 0, l = root.length; i < l; i++)
            Sizzle(selector, root[i], tmpSet);
          return Sizzle.filter(later, tmpSet);
        };
      (jQuery.find = Sizzle),
        (jQuery.expr = Sizzle.selectors),
        (jQuery.expr[":"] = jQuery.expr.filters),
        (jQuery.unique = Sizzle.uniqueSort),
        (jQuery.text = getText),
        (jQuery.isXMLDoc = isXML),
        (jQuery.contains = contains);
    })();
  var runtil = /Until$/,
    rparentsprev = /^(?:parents|prevUntil|prevAll)/,
    rmultiselector = /,/,
    slice = Array.prototype.slice,
    winnow = function (elements, qualifier, keep) {
      if (jQuery.isFunction(qualifier))
        return jQuery.grep(elements, function (elem, i) {
          return !!qualifier.call(elem, i, elem) === keep;
        });
      if (qualifier.nodeType)
        return jQuery.grep(elements, function (elem, i) {
          return (elem === qualifier) === keep;
        });
      if ("string" == typeof qualifier) {
        var filtered = jQuery.grep(elements, function (elem) {
          return 1 === elem.nodeType;
        });
        if (isSimple.test(qualifier))
          return jQuery.filter(qualifier, filtered, !keep);
        qualifier = jQuery.filter(qualifier, filtered);
      }
      return jQuery.grep(elements, function (elem, i) {
        return jQuery.inArray(elem, qualifier) >= 0 === keep;
      });
    };
  function isDisconnected(node) {
    return !node || !node.parentNode || 11 === node.parentNode.nodeType;
  }
  jQuery.fn.extend({
    find: function (selector) {
      for (
        var ret = this.pushStack("", "find", selector),
          length = 0,
          i = 0,
          l = this.length;
        i < l;
        i++
      )
        if (((length = ret.length), jQuery.find(selector, this[i], ret), i > 0))
          for (var n = length; n < ret.length; n++)
            for (var r = 0; r < length; r++)
              if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break;
              }
      return ret;
    },
    has: function (target) {
      var targets = jQuery(target);
      return this.filter(function () {
        for (var i = 0, l = targets.length; i < l; i++)
          if (jQuery.contains(this, targets[i])) return !0;
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector, !1), "not", selector);
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector, !0), "filter", selector);
    },
    is: function (selector) {
      return !!selector && jQuery.filter(selector, this).length > 0;
    },
    closest: function (selectors, context) {
      if (jQuery.isArray(selectors)) {
        var ret = [],
          cur = this[0],
          match,
          matches = {},
          selector;
        if (cur && selectors.length) {
          for (var i = 0, l = selectors.length; i < l; i++)
            matches[(selector = selectors[i])] ||
              (matches[selector] = jQuery.expr.match.POS.test(selector)
                ? jQuery(selector, context || this.context)
                : selector);
          for (; cur && cur.ownerDocument && cur !== context; ) {
            for (selector in matches)
              ((match = matches[selector]).jquery
                ? match.index(cur) > -1
                : jQuery(cur).is(match)) &&
                (ret.push({ selector: selector, elem: cur }),
                delete matches[selector]);
            cur = cur.parentNode;
          }
        }
        return ret;
      }
      var pos = jQuery.expr.match.POS.test(selectors)
        ? jQuery(selectors, context || this.context)
        : null;
      return this.map(function (i, cur) {
        for (; cur && cur.ownerDocument && cur !== context; ) {
          if (pos ? pos.index(cur) > -1 : jQuery(cur).is(selectors)) return cur;
          cur = cur.parentNode;
        }
        return null;
      });
    },
    index: function (elem) {
      return elem && "string" != typeof elem
        ? jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        : jQuery.inArray(
            this[0],
            elem ? jQuery(elem) : this.parent().children()
          );
    },
    add: function (selector, context) {
      var set =
          "string" == typeof selector
            ? jQuery(selector, context || this.context)
            : jQuery.makeArray(selector),
        all = jQuery.merge(this.get(), set);
      return this.pushStack(
        isDisconnected(set[0]) || isDisconnected(all[0])
          ? all
          : jQuery.unique(all)
      );
    },
    andSelf: function () {
      return this.add(this.prevObject);
    },
  }),
    jQuery.each(
      {
        parent: function (elem) {
          var parent = elem.parentNode;
          return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function (elem) {
          return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
          return jQuery.dir(elem, "parentNode", until);
        },
        next: function (elem) {
          return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function (elem) {
          return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function (elem) {
          return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
          return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
          return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
          return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
          return jQuery.sibling(elem.parentNode.firstChild, elem);
        },
        children: function (elem) {
          return jQuery.sibling(elem.firstChild);
        },
        contents: function (elem) {
          return jQuery.nodeName(elem, "iframe")
            ? elem.contentDocument || elem.contentWindow.document
            : jQuery.makeArray(elem.childNodes);
        },
      },
      function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
          var ret = jQuery.map(this, fn, until);
          return (
            runtil.test(name) || (selector = until),
            selector &&
              "string" == typeof selector &&
              (ret = jQuery.filter(selector, ret)),
            (ret = this.length > 1 ? jQuery.unique(ret) : ret),
            (this.length > 1 || rmultiselector.test(selector)) &&
              rparentsprev.test(name) &&
              (ret = ret.reverse()),
            this.pushStack(ret, name, slice.call(arguments).join(","))
          );
        };
      }
    ),
    jQuery.extend({
      filter: function (expr, elems, not) {
        return (
          not && (expr = ":not(" + expr + ")"), jQuery.find.matches(expr, elems)
        );
      },
      dir: function (elem, dir, until) {
        for (
          var matched = [], cur = elem[dir];
          cur &&
          9 !== cur.nodeType &&
          (void 0 === until || 1 !== cur.nodeType || !jQuery(cur).is(until));

        )
          1 === cur.nodeType && matched.push(cur), (cur = cur[dir]);
        return matched;
      },
      nth: function (cur, result, dir, elem) {
        result = result || 1;
        for (
          var num = 0;
          cur && (1 !== cur.nodeType || ++num !== result);
          cur = cur[dir]
        );
        return cur;
      },
      sibling: function (n, elem) {
        for (var r = []; n; n = n.nextSibling)
          1 === n.nodeType && n !== elem && r.push(n);
        return r;
      },
    });
  var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g,
    rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnocache = /<script|<object|<embed|<option|<style/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    fcloseTag = function (all, front, tag) {
      return rselfClosing.test(tag) ? all : front + "></" + tag + ">";
    },
    wrapMap = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""],
    };
  function cloneCopyEvent(orig, ret) {
    var i = 0;
    ret.each(function () {
      if (this.nodeName === (orig[i] && orig[i].nodeName)) {
        var oldData = jQuery.data(orig[i++]),
          curData = jQuery.data(this, oldData),
          events = oldData && oldData.events;
        if (events)
          for (var type in (delete curData.handle,
          (curData.events = {}),
          events))
            for (var handler in events[type])
              jQuery.event.add(
                this,
                type,
                events[type][handler],
                events[type][handler].data
              );
      }
    });
  }
  function buildFragment(args, nodes, scripts) {
    var fragment,
      cacheable,
      cacheresults,
      doc = nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document;
    return (
      1 === args.length &&
        "string" == typeof args[0] &&
        args[0].length < 512 &&
        doc === document &&
        !rnocache.test(args[0]) &&
        (jQuery.support.checkClone || !rchecked.test(args[0])) &&
        ((cacheable = !0),
        (cacheresults = jQuery.fragments[args[0]]) &&
          1 !== cacheresults &&
          (fragment = cacheresults)),
      fragment ||
        ((fragment = doc.createDocumentFragment()),
        jQuery.clean(args, doc, fragment, scripts)),
      cacheable && (jQuery.fragments[args[0]] = cacheresults ? fragment : 1),
      { fragment: fragment, cacheable: cacheable }
    );
  }
  (wrapMap.optgroup = wrapMap.option),
    (wrapMap.tbody =
      wrapMap.tfoot =
      wrapMap.colgroup =
      wrapMap.caption =
        wrapMap.thead),
    (wrapMap.th = wrapMap.td),
    jQuery.support.htmlSerialize ||
      (wrapMap._default = [1, "div<div>", "</div>"]),
    jQuery.fn.extend({
      text: function (text) {
        return jQuery.isFunction(text)
          ? this.each(function (i) {
              var self = jQuery(this);
              self.text(text.call(this, i, self.text()));
            })
          : "object" != typeof text && void 0 !== text
          ? this.empty().append(
              ((this[0] && this[0].ownerDocument) || document).createTextNode(
                text
              )
            )
          : jQuery.text(this);
      },
      wrapAll: function (html) {
        if (jQuery.isFunction(html))
          return this.each(function (i) {
            jQuery(this).wrapAll(html.call(this, i));
          });
        if (this[0]) {
          var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && wrap.insertBefore(this[0]),
            wrap
              .map(function () {
                for (
                  var elem = this;
                  elem.firstChild && 1 === elem.firstChild.nodeType;

                )
                  elem = elem.firstChild;
                return elem;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (html) {
        return jQuery.isFunction(html)
          ? this.each(function (i) {
              jQuery(this).wrapInner(html.call(this, i));
            })
          : this.each(function () {
              var self = jQuery(this),
                contents = self.contents();
              contents.length ? contents.wrapAll(html) : self.append(html);
            });
      },
      wrap: function (html) {
        return this.each(function () {
          jQuery(this).wrapAll(html);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            jQuery.nodeName(this, "body") ||
              jQuery(this).replaceWith(this.childNodes);
          })
          .end();
      },
      append: function () {
        return this.domManip(arguments, !0, function (elem) {
          1 === this.nodeType && this.appendChild(elem);
        });
      },
      prepend: function () {
        return this.domManip(arguments, !0, function (elem) {
          1 === this.nodeType && this.insertBefore(elem, this.firstChild);
        });
      },
      before: function () {
        if (this[0] && this[0].parentNode)
          return this.domManip(arguments, !1, function (elem) {
            this.parentNode.insertBefore(elem, this);
          });
        if (arguments.length) {
          var set = jQuery(arguments[0]);
          return (
            set.push.apply(set, this.toArray()),
            this.pushStack(set, "before", arguments)
          );
        }
      },
      after: function () {
        if (this[0] && this[0].parentNode)
          return this.domManip(arguments, !1, function (elem) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          });
        if (arguments.length) {
          var set = this.pushStack(this, "after", arguments);
          return set.push.apply(set, jQuery(arguments[0]).toArray()), set;
        }
      },
      remove: function (selector, keepData) {
        for (var i = 0, elem; null != (elem = this[i]); i++)
          (selector && !jQuery.filter(selector, [elem]).length) ||
            (keepData ||
              1 !== elem.nodeType ||
              (jQuery.cleanData(elem.getElementsByTagName("*")),
              jQuery.cleanData([elem])),
            elem.parentNode && elem.parentNode.removeChild(elem));
        return this;
      },
      empty: function () {
        for (var i = 0, elem; null != (elem = this[i]); i++)
          for (
            1 === elem.nodeType &&
            jQuery.cleanData(elem.getElementsByTagName("*"));
            elem.firstChild;

          )
            elem.removeChild(elem.firstChild);
        return this;
      },
      clone: function (events) {
        var ret = this.map(function () {
          if (jQuery.support.noCloneEvent || jQuery.isXMLDoc(this))
            return this.cloneNode(!0);
          var html = this.outerHTML,
            ownerDocument = this.ownerDocument;
          if (!html) {
            var div = ownerDocument.createElement("div");
            div.appendChild(this.cloneNode(!0)), (html = div.innerHTML);
          }
          return jQuery.clean(
            [
              html
                .replace(rinlinejQuery, "")
                .replace(/=([^="'>\s]+\/)>/g, '="$1">')
                .replace(rleadingWhitespace, ""),
            ],
            ownerDocument
          )[0];
        });
        return (
          !0 === events &&
            (cloneCopyEvent(this, ret),
            cloneCopyEvent(this.find("*"), ret.find("*"))),
          ret
        );
      },
      html: function (value) {
        if (void 0 === value)
          return this[0] && 1 === this[0].nodeType
            ? this[0].innerHTML.replace(rinlinejQuery, "")
            : null;
        if (
          "string" != typeof value ||
          rnocache.test(value) ||
          (!jQuery.support.leadingWhitespace &&
            rleadingWhitespace.test(value)) ||
          wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]
        )
          jQuery.isFunction(value)
            ? this.each(function (i) {
                var self = jQuery(this),
                  old = self.html();
                self.empty().append(function () {
                  return value.call(this, i, old);
                });
              })
            : this.empty().append(value);
        else {
          value = value.replace(rxhtmlTag, fcloseTag);
          try {
            for (var i = 0, l = this.length; i < l; i++)
              1 === this[i].nodeType &&
                (jQuery.cleanData(this[i].getElementsByTagName("*")),
                (this[i].innerHTML = value));
          } catch (e) {
            this.empty().append(value);
          }
        }
        return this;
      },
      replaceWith: function (value) {
        return this[0] && this[0].parentNode
          ? jQuery.isFunction(value)
            ? this.each(function (i) {
                var self = jQuery(this),
                  old = self.html();
                self.replaceWith(value.call(this, i, old));
              })
            : ("string" != typeof value && (value = jQuery(value).detach()),
              this.each(function () {
                var next = this.nextSibling,
                  parent = this.parentNode;
                jQuery(this).remove(),
                  next
                    ? jQuery(next).before(value)
                    : jQuery(parent).append(value);
              }))
          : this.pushStack(
              jQuery(jQuery.isFunction(value) ? value() : value),
              "replaceWith",
              value
            );
      },
      detach: function (selector) {
        return this.remove(selector, !0);
      },
      domManip: function (args, table, callback) {
        var results,
          first,
          value = args[0],
          scripts = [],
          fragment,
          parent;
        if (
          !jQuery.support.checkClone &&
          3 === arguments.length &&
          "string" == typeof value &&
          rchecked.test(value)
        )
          return this.each(function () {
            jQuery(this).domManip(args, table, callback, !0);
          });
        if (jQuery.isFunction(value))
          return this.each(function (i) {
            var self = jQuery(this);
            (args[0] = value.call(this, i, table ? self.html() : void 0)),
              self.domManip(args, table, callback);
          });
        if (this[0]) {
          if (
            ((parent = value && value.parentNode),
            (first =
              1 ===
              (fragment = (results =
                jQuery.support.parentNode &&
                parent &&
                11 === parent.nodeType &&
                parent.childNodes.length === this.length
                  ? { fragment: parent }
                  : buildFragment(args, this, scripts)).fragment).childNodes
                .length
                ? (fragment = fragment.firstChild)
                : fragment.firstChild))
          ) {
            table = table && jQuery.nodeName(first, "tr");
            for (var i = 0, l = this.length; i < l; i++)
              callback.call(
                table ? root(this[i], first) : this[i],
                i > 0 || results.cacheable || this.length > 1
                  ? fragment.cloneNode(!0)
                  : fragment
              );
          }
          scripts.length && jQuery.each(scripts, evalScript);
        }
        return this;
        function root(elem, cur) {
          return jQuery.nodeName(elem, "table")
            ? elem.getElementsByTagName("tbody")[0] ||
                elem.appendChild(elem.ownerDocument.createElement("tbody"))
            : elem;
        }
      },
    }),
    (jQuery.fragments = {}),
    jQuery.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (name, original) {
        jQuery.fn[name] = function (selector) {
          var ret = [],
            insert = jQuery(selector),
            parent = 1 === this.length && this[0].parentNode;
          if (
            parent &&
            11 === parent.nodeType &&
            1 === parent.childNodes.length &&
            1 === insert.length
          )
            return insert[original](this[0]), this;
          for (var i = 0, l = insert.length; i < l; i++) {
            var elems = (i > 0 ? this.clone(!0) : this).get();
            jQuery.fn[original].apply(jQuery(insert[i]), elems),
              (ret = ret.concat(elems));
          }
          return this.pushStack(ret, name, insert.selector);
        };
      }
    ),
    jQuery.extend({
      clean: function (elems, context, fragment, scripts) {
        void 0 === (context = context || document).createElement &&
          (context =
            context.ownerDocument ||
            (context[0] && context[0].ownerDocument) ||
            document);
        for (var ret = [], i = 0, elem; null != (elem = elems[i]); i++)
          if (("number" == typeof elem && (elem += ""), elem)) {
            if ("string" != typeof elem || rhtml.test(elem)) {
              if ("string" == typeof elem) {
                elem = elem.replace(rxhtmlTag, fcloseTag);
                var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                  wrap = wrapMap[tag] || wrapMap._default,
                  depth = wrap[0],
                  div = context.createElement("div");
                for (div.innerHTML = wrap[1] + elem + wrap[2]; depth--; )
                  div = div.lastChild;
                if (!jQuery.support.tbody)
                  for (
                    var hasBody = rtbody.test(elem),
                      tbody =
                        "table" !== tag || hasBody
                          ? "<table>" !== wrap[1] || hasBody
                            ? []
                            : div.childNodes
                          : div.firstChild && div.firstChild.childNodes,
                      j = tbody.length - 1;
                    j >= 0;
                    --j
                  )
                    jQuery.nodeName(tbody[j], "tbody") &&
                      !tbody[j].childNodes.length &&
                      tbody[j].parentNode.removeChild(tbody[j]);
                !jQuery.support.leadingWhitespace &&
                  rleadingWhitespace.test(elem) &&
                  div.insertBefore(
                    context.createTextNode(rleadingWhitespace.exec(elem)[0]),
                    div.firstChild
                  ),
                  (elem = div.childNodes);
              }
            } else elem = context.createTextNode(elem);
            elem.nodeType ? ret.push(elem) : (ret = jQuery.merge(ret, elem));
          }
        if (fragment)
          for (var i = 0; ret[i]; i++)
            !scripts ||
            !jQuery.nodeName(ret[i], "script") ||
            (ret[i].type && "text/javascript" !== ret[i].type.toLowerCase())
              ? (1 === ret[i].nodeType &&
                  ret.splice.apply(
                    ret,
                    [i + 1, 0].concat(
                      jQuery.makeArray(ret[i].getElementsByTagName("script"))
                    )
                  ),
                fragment.appendChild(ret[i]))
              : scripts.push(
                  ret[i].parentNode
                    ? ret[i].parentNode.removeChild(ret[i])
                    : ret[i]
                );
        return ret;
      },
      cleanData: function (elems) {
        for (
          var data,
            id,
            cache = jQuery.cache,
            special = jQuery.event.special,
            deleteExpando = jQuery.support.deleteExpando,
            i = 0,
            elem;
          null != (elem = elems[i]);
          i++
        )
          if ((id = elem[jQuery.expando])) {
            if ((data = cache[id]).events)
              for (var type in data.events)
                special[type]
                  ? jQuery.event.remove(elem, type)
                  : removeEvent(elem, type, data.handle);
            deleteExpando
              ? delete elem[jQuery.expando]
              : elem.removeAttribute && elem.removeAttribute(jQuery.expando),
              delete cache[id];
          }
      },
    });
  var rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
    ralpha = /alpha\([^)]*\)/,
    ropacity = /opacity=([^)]*)/,
    rfloat = /float/i,
    rdashAlpha = /-([a-z])/gi,
    rupper = /([A-Z])/g,
    rnumpx = /^-?\d+(?:px)?$/i,
    rnum = /^-?\d/,
    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssWidth = ["Left", "Right"],
    cssHeight = ["Top", "Bottom"],
    getComputedStyle =
      document.defaultView && document.defaultView.getComputedStyle,
    styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat",
    fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    };
  (jQuery.fn.css = function (name, value) {
    return access(this, name, value, !0, function (elem, name, value) {
      if (void 0 === value) return jQuery.curCSS(elem, name);
      "number" != typeof value || rexclude.test(name) || (value += "px"),
        jQuery.style(elem, name, value);
    });
  }),
    jQuery.extend({
      style: function (elem, name, value) {
        if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType) {
          ("width" === name || "height" === name) &&
            parseFloat(value) < 0 &&
            (value = void 0);
          var style = elem.style || elem,
            set = void 0 !== value;
          if (!jQuery.support.opacity && "opacity" === name) {
            if (set) {
              style.zoom = 1;
              var opacity =
                  parseInt(value, 10) + "" == "NaN"
                    ? ""
                    : "alpha(opacity=" + 100 * value + ")",
                filter = style.filter || jQuery.curCSS(elem, "filter") || "";
              style.filter = ralpha.test(filter)
                ? filter.replace(ralpha, opacity)
                : opacity;
            }
            return style.filter && style.filter.indexOf("opacity=") >= 0
              ? parseFloat(ropacity.exec(style.filter)[1]) / 100 + ""
              : "";
          }
          return (
            rfloat.test(name) && (name = styleFloat),
            (name = name.replace(rdashAlpha, fcamelCase)),
            set && (style[name] = value),
            style[name]
          );
        }
      },
      css: function (elem, name, force, extra) {
        if ("width" === name || "height" === name) {
          var val,
            props = cssShow,
            which = "width" === name ? cssWidth : cssHeight;
          function getWH() {
            (val = "width" === name ? elem.offsetWidth : elem.offsetHeight),
              "border" !== extra &&
                jQuery.each(which, function () {
                  extra ||
                    (val -=
                      parseFloat(jQuery.curCSS(elem, "padding" + this, !0)) ||
                      0),
                    "margin" === extra
                      ? (val +=
                          parseFloat(
                            jQuery.curCSS(elem, "margin" + this, !0)
                          ) || 0)
                      : (val -=
                          parseFloat(
                            jQuery.curCSS(elem, "border" + this + "Width", !0)
                          ) || 0);
                });
          }
          return (
            0 !== elem.offsetWidth ? getWH() : jQuery.swap(elem, props, getWH),
            Math.max(0, Math.round(val))
          );
        }
        return jQuery.curCSS(elem, name, force);
      },
      curCSS: function (elem, name, force) {
        var ret,
          style = elem.style,
          filter;
        if (!jQuery.support.opacity && "opacity" === name && elem.currentStyle)
          return "" ===
            (ret = ropacity.test(elem.currentStyle.filter || "")
              ? parseFloat(RegExp.$1) / 100 + ""
              : "")
            ? "1"
            : ret;
        if (
          (rfloat.test(name) && (name = styleFloat),
          !force && style && style[name])
        )
          ret = style[name];
        else if (getComputedStyle) {
          rfloat.test(name) && (name = "float"),
            (name = name.replace(rupper, "-$1").toLowerCase());
          var defaultView = elem.ownerDocument.defaultView;
          if (!defaultView) return null;
          var computedStyle = defaultView.getComputedStyle(elem, null);
          computedStyle && (ret = computedStyle.getPropertyValue(name)),
            "opacity" === name && "" === ret && (ret = "1");
        } else if (elem.currentStyle) {
          var camelCase = name.replace(rdashAlpha, fcamelCase);
          if (
            ((ret = elem.currentStyle[name] || elem.currentStyle[camelCase]),
            !rnumpx.test(ret) && rnum.test(ret))
          ) {
            var left = style.left,
              rsLeft = elem.runtimeStyle.left;
            (elem.runtimeStyle.left = elem.currentStyle.left),
              (style.left = "fontSize" === camelCase ? "1em" : ret || 0),
              (ret = style.pixelLeft + "px"),
              (style.left = left),
              (elem.runtimeStyle.left = rsLeft);
          }
        }
        return ret;
      },
      swap: function (elem, options, callback) {
        var old = {};
        for (var name in options)
          (old[name] = elem.style[name]), (elem.style[name] = options[name]);
        for (var name in (callback.call(elem), options))
          elem.style[name] = old[name];
      },
    }),
    jQuery.expr &&
      jQuery.expr.filters &&
      ((jQuery.expr.filters.hidden = function (elem) {
        var width = elem.offsetWidth,
          height = elem.offsetHeight,
          skip = "tr" === elem.nodeName.toLowerCase();
        return (
          (0 === width && 0 === height && !skip) ||
          (!(width > 0 && height > 0 && !skip) &&
            "none" === jQuery.curCSS(elem, "display"))
        );
      }),
      (jQuery.expr.filters.visible = function (elem) {
        return !jQuery.expr.filters.hidden(elem);
      }));
  var jsc = now(),
    rscript = /<script(.|\s)*?\/script>/gi,
    rselectTextarea = /select|textarea/i,
    rinput =
      /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
    jsre = /=\?(&|$)/,
    rquery = /\?/,
    rts = /(\?|&)_=.*?(&|$)/,
    rurl = /^(\w+:)?\/\/([^\/?#]+)/,
    r20 = /%20/g,
    _load = jQuery.fn.load;
  jQuery.fn.extend({
    load: function (url, params, callback) {
      if ("string" != typeof url) return _load.call(this, url);
      if (!this.length) return this;
      var off = url.indexOf(" ");
      if (off >= 0) {
        var selector = url.slice(off, url.length);
        url = url.slice(0, off);
      }
      var type = "GET";
      params &&
        (jQuery.isFunction(params)
          ? ((callback = params), (params = null))
          : "object" == typeof params &&
            ((params = jQuery.param(params, jQuery.ajaxSettings.traditional)),
            (type = "POST")));
      var self = this;
      return (
        jQuery.ajax({
          url: url,
          type: type,
          dataType: "html",
          data: params,
          complete: function (res, status) {
            ("success" !== status && "notmodified" !== status) ||
              self.html(
                selector
                  ? jQuery("<div />")
                      .append(res.responseText.replace(rscript, ""))
                      .find(selector)
                  : res.responseText
              ),
              callback && self.each(callback, [res.responseText, status, res]);
          },
        }),
        this
      );
    },
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? jQuery.makeArray(this.elements) : this;
      })
        .filter(function () {
          return (
            this.name &&
            !this.disabled &&
            (this.checked ||
              rselectTextarea.test(this.nodeName) ||
              rinput.test(this.type))
          );
        })
        .map(function (i, elem) {
          var val = jQuery(this).val();
          return null == val
            ? null
            : jQuery.isArray(val)
            ? jQuery.map(val, function (val, i) {
                return { name: elem.name, value: val };
              })
            : { name: elem.name, value: val };
        })
        .get();
    },
  }),
    jQuery.each(
      "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(
        " "
      ),
      function (i, o) {
        jQuery.fn[o] = function (f) {
          return this.bind(o, f);
        };
      }
    ),
    jQuery.extend({
      get: function (url, data, callback, type) {
        return (
          jQuery.isFunction(data) &&
            ((type = type || callback), (callback = data), (data = null)),
          jQuery.ajax({
            type: "GET",
            url: url,
            data: data,
            success: callback,
            dataType: type,
          })
        );
      },
      getScript: function (url, callback) {
        return jQuery.get(url, null, callback, "script");
      },
      getJSON: function (url, data, callback) {
        return jQuery.get(url, data, callback, "json");
      },
      post: function (url, data, callback, type) {
        return (
          jQuery.isFunction(data) &&
            ((type = type || callback), (callback = data), (data = {})),
          jQuery.ajax({
            type: "POST",
            url: url,
            data: data,
            success: callback,
            dataType: type,
          })
        );
      },
      ajaxSetup: function (settings) {
        jQuery.extend(jQuery.ajaxSettings, settings);
      },
      ajaxSettings: {
        url: location.href,
        global: !0,
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        processData: !0,
        async: !0,
        xhr:
          !window.XMLHttpRequest ||
          ("file:" === window.location.protocol && window.ActiveXObject)
            ? function () {
                try {
                  return new window.ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
              }
            : function () {
                return new window.XMLHttpRequest();
              },
        accepts: {
          xml: "application/xml, text/xml",
          html: "text/html",
          script: "text/javascript, application/javascript",
          json: "application/json, text/javascript",
          text: "text/plain",
          _default: "*/*",
        },
      },
      lastModified: {},
      etag: {},
      ajax: function (origSettings) {
        var s = jQuery.extend(!0, {}, jQuery.ajaxSettings, origSettings),
          jsonp,
          status,
          data,
          callbackContext = (origSettings && origSettings.context) || s,
          type = s.type.toUpperCase();
        if (
          (s.data &&
            s.processData &&
            "string" != typeof s.data &&
            (s.data = jQuery.param(s.data, s.traditional)),
          "jsonp" === s.dataType &&
            ("GET" === type
              ? jsre.test(s.url) ||
                (s.url +=
                  (rquery.test(s.url) ? "&" : "?") +
                  (s.jsonp || "callback") +
                  "=?")
              : (s.data && jsre.test(s.data)) ||
                (s.data =
                  (s.data ? s.data + "&" : "") +
                  (s.jsonp || "callback") +
                  "=?"),
            (s.dataType = "json")),
          "json" === s.dataType &&
            ((s.data && jsre.test(s.data)) || jsre.test(s.url)) &&
            ((jsonp = s.jsonpCallback || "jsonp" + jsc++),
            s.data &&
              (s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1")),
            (s.url = s.url.replace(jsre, "=" + jsonp + "$1")),
            (s.dataType = "script"),
            (window[jsonp] =
              window[jsonp] ||
              function (tmp) {
                (data = tmp), success(), complete(), (window[jsonp] = void 0);
                try {
                  delete window[jsonp];
                } catch (e) {}
                head && head.removeChild(script);
              })),
          "script" === s.dataType && null === s.cache && (s.cache = !1),
          !1 === s.cache && "GET" === type)
        ) {
          var ts = now(),
            ret = s.url.replace(rts, "$1_=" + ts + "$2");
          s.url =
            ret +
            (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
        }
        s.data &&
          "GET" === type &&
          (s.url += (rquery.test(s.url) ? "&" : "?") + s.data),
          s.global && !jQuery.active++ && jQuery.event.trigger("ajaxStart");
        var parts = rurl.exec(s.url),
          remote =
            parts &&
            ((parts[1] && parts[1] !== location.protocol) ||
              parts[2] !== location.host);
        if ("script" === s.dataType && "GET" === type && remote) {
          var head =
              document.getElementsByTagName("head")[0] ||
              document.documentElement,
            script = document.createElement("script");
          if (
            ((script.src = s.url),
            s.scriptCharset && (script.charset = s.scriptCharset),
            !jsonp)
          ) {
            var done = !1;
            script.onload = script.onreadystatechange = function () {
              done ||
                (this.readyState &&
                  "loaded" !== this.readyState &&
                  "complete" !== this.readyState) ||
                ((done = !0),
                success(),
                complete(),
                (script.onload = script.onreadystatechange = null),
                head && script.parentNode && head.removeChild(script));
            };
          }
          head.insertBefore(script, head.firstChild);
        } else {
          var requestDone = !1,
            xhr = s.xhr();
          if (xhr) {
            s.username
              ? xhr.open(type, s.url, s.async, s.username, s.password)
              : xhr.open(type, s.url, s.async);
            try {
              (s.data || (origSettings && origSettings.contentType)) &&
                xhr.setRequestHeader("Content-Type", s.contentType),
                s.ifModified &&
                  (jQuery.lastModified[s.url] &&
                    xhr.setRequestHeader(
                      "If-Modified-Since",
                      jQuery.lastModified[s.url]
                    ),
                  jQuery.etag[s.url] &&
                    xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url])),
                remote ||
                  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                xhr.setRequestHeader(
                  "Accept",
                  s.dataType && s.accepts[s.dataType]
                    ? s.accepts[s.dataType] + ", */*"
                    : s.accepts._default
                );
            } catch (e) {}
            if (
              s.beforeSend &&
              !1 === s.beforeSend.call(callbackContext, xhr, s)
            )
              return (
                s.global &&
                  !--jQuery.active &&
                  jQuery.event.trigger("ajaxStop"),
                xhr.abort(),
                !1
              );
            s.global && trigger("ajaxSend", [xhr, s]);
            var onreadystatechange = (xhr.onreadystatechange = function (
              isTimeout
            ) {
              if (xhr && 0 !== xhr.readyState && "abort" !== isTimeout) {
                if (
                  !requestDone &&
                  xhr &&
                  (4 === xhr.readyState || "timeout" === isTimeout)
                ) {
                  var errMsg;
                  if (
                    ((requestDone = !0),
                    (xhr.onreadystatechange = jQuery.noop),
                    "success" ===
                      (status =
                        "timeout" === isTimeout
                          ? "timeout"
                          : jQuery.httpSuccess(xhr)
                          ? s.ifModified && jQuery.httpNotModified(xhr, s.url)
                            ? "notmodified"
                            : "success"
                          : "error"))
                  )
                    try {
                      data = jQuery.httpData(xhr, s.dataType, s);
                    } catch (err) {
                      (status = "parsererror"), (errMsg = err);
                    }
                  "success" === status || "notmodified" === status
                    ? jsonp || success()
                    : jQuery.handleError(s, xhr, status, errMsg),
                    complete(),
                    "timeout" === isTimeout && xhr.abort(),
                    s.async && (xhr = null);
                }
              } else
                requestDone || complete(),
                  (requestDone = !0),
                  xhr && (xhr.onreadystatechange = jQuery.noop);
            });
            try {
              var oldAbort = xhr.abort;
              xhr.abort = function () {
                xhr && oldAbort.call(xhr), onreadystatechange("abort");
              };
            } catch (e) {}
            s.async &&
              s.timeout > 0 &&
              setTimeout(function () {
                xhr && !requestDone && onreadystatechange("timeout");
              }, s.timeout);
            try {
              xhr.send(
                "POST" === type || "PUT" === type || "DELETE" === type
                  ? s.data
                  : null
              );
            } catch (e) {
              jQuery.handleError(s, xhr, null, e), complete();
            }
            return s.async || onreadystatechange(), xhr;
          }
        }
        function success() {
          s.success && s.success.call(callbackContext, data, status, xhr),
            s.global && trigger("ajaxSuccess", [xhr, s]);
        }
        function complete() {
          s.complete && s.complete.call(callbackContext, xhr, status),
            s.global && trigger("ajaxComplete", [xhr, s]),
            s.global && !--jQuery.active && jQuery.event.trigger("ajaxStop");
        }
        function trigger(type, args) {
          (s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
        }
      },
      handleError: function (s, xhr, status, e) {
        s.error && s.error.call(s.context || s, xhr, status, e),
          s.global &&
            (s.context ? jQuery(s.context) : jQuery.event).trigger(
              "ajaxError",
              [xhr, s, e]
            );
      },
      active: 0,
      httpSuccess: function (xhr) {
        try {
          return (
            (!xhr.status && "file:" === location.protocol) ||
            (xhr.status >= 200 && xhr.status < 300) ||
            304 === xhr.status ||
            1223 === xhr.status ||
            0 === xhr.status
          );
        } catch (e) {}
        return !1;
      },
      httpNotModified: function (xhr, url) {
        var lastModified = xhr.getResponseHeader("Last-Modified"),
          etag = xhr.getResponseHeader("Etag");
        return (
          lastModified && (jQuery.lastModified[url] = lastModified),
          etag && (jQuery.etag[url] = etag),
          304 === xhr.status || 0 === xhr.status
        );
      },
      httpData: function (xhr, type, s) {
        var ct = xhr.getResponseHeader("content-type") || "",
          xml = "xml" === type || (!type && ct.indexOf("xml") >= 0),
          data = xml ? xhr.responseXML : xhr.responseText;
        return (
          xml &&
            "parsererror" === data.documentElement.nodeName &&
            jQuery.error("parsererror"),
          s && s.dataFilter && (data = s.dataFilter(data, type)),
          "string" == typeof data &&
            ("json" === type || (!type && ct.indexOf("json") >= 0)
              ? (data = jQuery.parseJSON(data))
              : ("script" === type ||
                  (!type && ct.indexOf("javascript") >= 0)) &&
                jQuery.globalEval(data)),
          data
        );
      },
      param: function (a, traditional) {
        var s = [];
        if (
          (void 0 === traditional &&
            (traditional = jQuery.ajaxSettings.traditional),
          jQuery.isArray(a) || a.jquery)
        )
          jQuery.each(a, function () {
            add(this.name, this.value);
          });
        else for (var prefix in a) buildParams(prefix, a[prefix]);
        return s.join("&").replace(r20, "+");
        function buildParams(prefix, obj) {
          jQuery.isArray(obj)
            ? jQuery.each(obj, function (i, v) {
                traditional || /\[\]$/.test(prefix)
                  ? add(prefix, v)
                  : buildParams(
                      prefix +
                        "[" +
                        ("object" == typeof v || jQuery.isArray(v) ? i : "") +
                        "]",
                      v
                    );
              })
            : traditional || null == obj || "object" != typeof obj
            ? add(prefix, obj)
            : jQuery.each(obj, function (k, v) {
                buildParams(prefix + "[" + k + "]", v);
              });
        }
        function add(key, value) {
          (value = jQuery.isFunction(value) ? value() : value),
            (s[s.length] =
              encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      },
    });
  var elemdisplay = {},
    rfxtypes = /toggle|show|hide/,
    rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
    timerId,
    fxAttrs = [
      ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
      ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
      ["opacity"],
    ];
  function genFx(type, num) {
    var obj = {};
    return (
      jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function () {
        obj[this] = type;
      }),
      obj
    );
  }
  function getWindow(elem) {
    return "scrollTo" in elem && elem.document
      ? elem
      : 9 === elem.nodeType && (elem.defaultView || elem.parentWindow);
  }
  jQuery.fn.extend({
    show: function (speed, callback) {
      if (speed || 0 === speed)
        return this.animate(genFx("show", 3), speed, callback);
      for (var i = 0, l = this.length; i < l; i++) {
        var old = jQuery.data(this[i], "olddisplay");
        if (
          ((this[i].style.display = old || ""),
          "none" === jQuery.css(this[i], "display"))
        ) {
          var nodeName = this[i].nodeName,
            display;
          if (elemdisplay[nodeName]) display = elemdisplay[nodeName];
          else {
            var elem = jQuery("<" + nodeName + " />").appendTo("body");
            "none" === (display = elem.css("display")) && (display = "block"),
              elem.remove(),
              (elemdisplay[nodeName] = display);
          }
          jQuery.data(this[i], "olddisplay", display);
        }
      }
      for (var j = 0, k = this.length; j < k; j++)
        this[j].style.display = jQuery.data(this[j], "olddisplay") || "";
      return this;
    },
    hide: function (speed, callback) {
      if (speed || 0 === speed)
        return this.animate(genFx("hide", 3), speed, callback);
      for (var i = 0, l = this.length; i < l; i++) {
        var old = jQuery.data(this[i], "olddisplay");
        old ||
          "none" === old ||
          jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
      }
      for (var j = 0, k = this.length; j < k; j++)
        this[j].style.display = "none";
      return this;
    },
    _toggle: jQuery.fn.toggle,
    toggle: function (fn, fn2) {
      var bool = "boolean" == typeof fn;
      return (
        jQuery.isFunction(fn) && jQuery.isFunction(fn2)
          ? this._toggle.apply(this, arguments)
          : null == fn || bool
          ? this.each(function () {
              var state = bool ? fn : jQuery(this).is(":hidden");
              jQuery(this)[state ? "show" : "hide"]();
            })
          : this.animate(genFx("toggle", 3), fn, fn2),
        this
      );
    },
    fadeTo: function (speed, to, callback) {
      return this.filter(":hidden")
        .css("opacity", 0)
        .show()
        .end()
        .animate({ opacity: to }, speed, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var optall = jQuery.speed(speed, easing, callback);
      return jQuery.isEmptyObject(prop)
        ? this.each(optall.complete)
        : this[!1 === optall.queue ? "each" : "queue"](function () {
            var opt = jQuery.extend({}, optall),
              p,
              hidden = 1 === this.nodeType && jQuery(this).is(":hidden"),
              self = this;
            for (p in prop) {
              var name = p.replace(rdashAlpha, fcamelCase);
              if (
                (p !== name &&
                  ((prop[name] = prop[p]), delete prop[p], (p = name)),
                ("hide" === prop[p] && hidden) ||
                  ("show" === prop[p] && !hidden))
              )
                return opt.complete.call(this);
              ("height" !== p && "width" !== p) ||
                !this.style ||
                ((opt.display = jQuery.css(this, "display")),
                (opt.overflow = this.style.overflow)),
                jQuery.isArray(prop[p]) &&
                  (((opt.specialEasing = opt.specialEasing || {})[p] =
                    prop[p][1]),
                  (prop[p] = prop[p][0]));
            }
            return (
              null != opt.overflow && (this.style.overflow = "hidden"),
              (opt.curAnim = jQuery.extend({}, prop)),
              jQuery.each(prop, function (name, val) {
                var e = new jQuery.fx(self, opt, name);
                if (rfxtypes.test(val))
                  e["toggle" === val ? (hidden ? "show" : "hide") : val](prop);
                else {
                  var parts = rfxnum.exec(val),
                    start = e.cur(!0) || 0;
                  if (parts) {
                    var end = parseFloat(parts[2]),
                      unit = parts[3] || "px";
                    "px" !== unit &&
                      ((self.style[name] = (end || 1) + unit),
                      (start = ((end || 1) / e.cur(!0)) * start),
                      (self.style[name] = start + unit)),
                      parts[1] &&
                        (end = ("-=" === parts[1] ? -1 : 1) * end + start),
                      e.custom(start, end, unit);
                  } else e.custom(start, val, "");
                }
              }),
              !0
            );
          });
    },
    stop: function (clearQueue, gotoEnd) {
      var timers = jQuery.timers;
      return (
        clearQueue && this.queue([]),
        this.each(function () {
          for (var i = timers.length - 1; i >= 0; i--)
            timers[i].elem === this &&
              (gotoEnd && timers[i](!0), timers.splice(i, 1));
        }),
        gotoEnd || this.dequeue(),
        this
      );
    },
  }),
    jQuery.each(
      {
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
      },
      function (name, props) {
        jQuery.fn[name] = function (speed, callback) {
          return this.animate(props, speed, callback);
        };
      }
    ),
    jQuery.extend({
      speed: function (speed, easing, fn) {
        var opt =
          speed && "object" == typeof speed
            ? speed
            : {
                complete:
                  fn || (!fn && easing) || (jQuery.isFunction(speed) && speed),
                duration: speed,
                easing:
                  (fn && easing) ||
                  (easing && !jQuery.isFunction(easing) && easing),
              };
        return (
          (opt.duration = jQuery.fx.off
            ? 0
            : "number" == typeof opt.duration
            ? opt.duration
            : jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default),
          (opt.old = opt.complete),
          (opt.complete = function () {
            !1 !== opt.queue && jQuery(this).dequeue(),
              jQuery.isFunction(opt.old) && opt.old.call(this);
          }),
          opt
        );
      },
      easing: {
        linear: function (p, n, firstNum, diff) {
          return firstNum + diff * p;
        },
        swing: function (p, n, firstNum, diff) {
          return (-Math.cos(p * Math.PI) / 2 + 0.5) * diff + firstNum;
        },
      },
      timers: [],
      fx: function (elem, options, prop) {
        (this.options = options),
          (this.elem = elem),
          (this.prop = prop),
          options.orig || (options.orig = {});
      },
    }),
    (jQuery.fx.prototype = {
      update: function () {
        this.options.step && this.options.step.call(this.elem, this.now, this),
          (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this),
          ("height" !== this.prop && "width" !== this.prop) ||
            !this.elem.style ||
            (this.elem.style.display = "block");
      },
      cur: function (force) {
        if (
          null != this.elem[this.prop] &&
          (!this.elem.style || null == this.elem.style[this.prop])
        )
          return this.elem[this.prop];
        var r = parseFloat(jQuery.css(this.elem, this.prop, force));
        return r && r > -1e4
          ? r
          : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
      },
      custom: function (from, to, unit) {
        (this.startTime = now()),
          (this.start = from),
          (this.end = to),
          (this.unit = unit || this.unit || "px"),
          (this.now = this.start),
          (this.pos = this.state = 0);
        var self = this;
        function t(gotoEnd) {
          return self.step(gotoEnd);
        }
        (t.elem = this.elem),
          t() &&
            jQuery.timers.push(t) &&
            !timerId &&
            (timerId = setInterval(jQuery.fx.tick, 13));
      },
      show: function () {
        (this.options.orig[this.prop] = jQuery.style(this.elem, this.prop)),
          (this.options.show = !0),
          this.custom(
            "width" === this.prop || "height" === this.prop ? 1 : 0,
            this.cur()
          ),
          jQuery(this.elem).show();
      },
      hide: function () {
        (this.options.orig[this.prop] = jQuery.style(this.elem, this.prop)),
          (this.options.hide = !0),
          this.custom(this.cur(), 0);
      },
      step: function (gotoEnd) {
        var t = now(),
          done = !0;
        if (gotoEnd || t >= this.options.duration + this.startTime) {
          for (var i in ((this.now = this.end),
          (this.pos = this.state = 1),
          this.update(),
          (this.options.curAnim[this.prop] = !0),
          this.options.curAnim))
            !0 !== this.options.curAnim[i] && (done = !1);
          if (done) {
            if (null != this.options.display) {
              this.elem.style.overflow = this.options.overflow;
              var old = jQuery.data(this.elem, "olddisplay");
              (this.elem.style.display = old || this.options.display),
                "none" === jQuery.css(this.elem, "display") &&
                  (this.elem.style.display = "block");
            }
            if (
              (this.options.hide && jQuery(this.elem).hide(),
              this.options.hide || this.options.show)
            )
              for (var p in this.options.curAnim)
                jQuery.style(this.elem, p, this.options.orig[p]);
            this.options.complete.call(this.elem);
          }
          return !1;
        }
        var n = t - this.startTime;
        this.state = n / this.options.duration;
        var specialEasing =
            this.options.specialEasing && this.options.specialEasing[this.prop],
          defaultEasing =
            this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
        return (
          (this.pos = jQuery.easing[specialEasing || defaultEasing](
            this.state,
            n,
            0,
            1,
            this.options.duration
          )),
          (this.now = this.start + (this.end - this.start) * this.pos),
          this.update(),
          !0
        );
      },
    }),
    jQuery.extend(jQuery.fx, {
      tick: function () {
        for (var timers = jQuery.timers, i = 0; i < timers.length; i++)
          timers[i]() || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop();
      },
      stop: function () {
        clearInterval(timerId), (timerId = null);
      },
      speeds: { slow: 600, fast: 200, _default: 400 },
      step: {
        opacity: function (fx) {
          jQuery.style(fx.elem, "opacity", fx.now);
        },
        _default: function (fx) {
          fx.elem.style && null != fx.elem.style[fx.prop]
            ? (fx.elem.style[fx.prop] =
                ("width" === fx.prop || "height" === fx.prop
                  ? Math.max(0, fx.now)
                  : fx.now) + fx.unit)
            : (fx.elem[fx.prop] = fx.now);
        },
      },
    }),
    jQuery.expr &&
      jQuery.expr.filters &&
      (jQuery.expr.filters.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
          return elem === fn.elem;
        }).length;
      }),
    "getBoundingClientRect" in document.documentElement
      ? (jQuery.fn.offset = function (options) {
          var elem = this[0];
          if (options)
            return this.each(function (i) {
              jQuery.offset.setOffset(this, options, i);
            });
          if (!elem || !elem.ownerDocument) return null;
          if (elem === elem.ownerDocument.body)
            return jQuery.offset.bodyOffset(elem);
          var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top,
            left;
          return {
            top:
              box.top +
              (self.pageYOffset ||
                (jQuery.support.boxModel && docElem.scrollTop) ||
                body.scrollTop) -
              clientTop,
            left:
              box.left +
              (self.pageXOffset ||
                (jQuery.support.boxModel && docElem.scrollLeft) ||
                body.scrollLeft) -
              clientLeft,
          };
        })
      : (jQuery.fn.offset = function (options) {
          var elem = this[0];
          if (options)
            return this.each(function (i) {
              jQuery.offset.setOffset(this, options, i);
            });
          if (!elem || !elem.ownerDocument) return null;
          if (elem === elem.ownerDocument.body)
            return jQuery.offset.bodyOffset(elem);
          jQuery.offset.initialize();
          for (
            var offsetParent = elem.offsetParent,
              prevOffsetParent = elem,
              doc = elem.ownerDocument,
              computedStyle,
              docElem = doc.documentElement,
              body = doc.body,
              defaultView = doc.defaultView,
              prevComputedStyle = defaultView
                ? defaultView.getComputedStyle(elem, null)
                : elem.currentStyle,
              top = elem.offsetTop,
              left = elem.offsetLeft;
            (elem = elem.parentNode) &&
            elem !== body &&
            elem !== docElem &&
            (!jQuery.offset.supportsFixedPosition ||
              "fixed" !== prevComputedStyle.position);

          )
            (computedStyle = defaultView
              ? defaultView.getComputedStyle(elem, null)
              : elem.currentStyle),
              (top -= elem.scrollTop),
              (left -= elem.scrollLeft),
              elem === offsetParent &&
                ((top += elem.offsetTop),
                (left += elem.offsetLeft),
                !jQuery.offset.doesNotAddBorder ||
                  (jQuery.offset.doesAddBorderForTableAndCells &&
                    /^t(able|d|h)$/i.test(elem.nodeName)) ||
                  ((top += parseFloat(computedStyle.borderTopWidth) || 0),
                  (left += parseFloat(computedStyle.borderLeftWidth) || 0)),
                (prevOffsetParent = offsetParent),
                (offsetParent = elem.offsetParent)),
              jQuery.offset.subtractsBorderForOverflowNotVisible &&
                "visible" !== computedStyle.overflow &&
                ((top += parseFloat(computedStyle.borderTopWidth) || 0),
                (left += parseFloat(computedStyle.borderLeftWidth) || 0)),
              (prevComputedStyle = computedStyle);
          return (
            ("relative" !== prevComputedStyle.position &&
              "static" !== prevComputedStyle.position) ||
              ((top += body.offsetTop), (left += body.offsetLeft)),
            jQuery.offset.supportsFixedPosition &&
              "fixed" === prevComputedStyle.position &&
              ((top += Math.max(docElem.scrollTop, body.scrollTop)),
              (left += Math.max(docElem.scrollLeft, body.scrollLeft))),
            { top: top, left: left }
          );
        }),
    (jQuery.offset = {
      initialize: function () {
        var body = document.body,
          container = document.createElement("div"),
          innerDiv,
          checkDiv,
          table,
          td,
          bodyMarginTop = parseFloat(jQuery.curCSS(body, "marginTop", !0)) || 0,
          html =
            "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        jQuery.extend(container.style, {
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          border: 0,
          width: "1px",
          height: "1px",
          visibility: "hidden",
        }),
          (container.innerHTML = html),
          body.insertBefore(container, body.firstChild),
          (checkDiv = (innerDiv = container.firstChild).firstChild),
          (td = innerDiv.nextSibling.firstChild.firstChild),
          (this.doesNotAddBorder = 5 !== checkDiv.offsetTop),
          (this.doesAddBorderForTableAndCells = 5 === td.offsetTop),
          (checkDiv.style.position = "fixed"),
          (checkDiv.style.top = "20px"),
          (this.supportsFixedPosition =
            20 === checkDiv.offsetTop || 15 === checkDiv.offsetTop),
          (checkDiv.style.position = checkDiv.style.top = ""),
          (innerDiv.style.overflow = "hidden"),
          (innerDiv.style.position = "relative"),
          (this.subtractsBorderForOverflowNotVisible =
            -5 === checkDiv.offsetTop),
          (this.doesNotIncludeMarginInBodyOffset =
            body.offsetTop !== bodyMarginTop),
          body.removeChild(container),
          (body = container = innerDiv = checkDiv = table = td = null),
          (jQuery.offset.initialize = jQuery.noop);
      },
      bodyOffset: function (body) {
        var top = body.offsetTop,
          left = body.offsetLeft;
        return (
          jQuery.offset.initialize(),
          jQuery.offset.doesNotIncludeMarginInBodyOffset &&
            ((top += parseFloat(jQuery.curCSS(body, "marginTop", !0)) || 0),
            (left += parseFloat(jQuery.curCSS(body, "marginLeft", !0)) || 0)),
          { top: top, left: left }
        );
      },
      setOffset: function (elem, options, i) {
        /static/.test(jQuery.curCSS(elem, "position")) &&
          (elem.style.position = "relative");
        var curElem = jQuery(elem),
          curOffset = curElem.offset(),
          curTop = parseInt(jQuery.curCSS(elem, "top", !0), 10) || 0,
          curLeft = parseInt(jQuery.curCSS(elem, "left", !0), 10) || 0;
        jQuery.isFunction(options) &&
          (options = options.call(elem, i, curOffset));
        var props = {
          top: options.top - curOffset.top + curTop,
          left: options.left - curOffset.left + curLeft,
        };
        "using" in options
          ? options.using.call(elem, props)
          : curElem.css(props);
      },
    }),
    jQuery.fn.extend({
      position: function () {
        if (!this[0]) return null;
        var elem = this[0],
          offsetParent = this.offsetParent(),
          offset = this.offset(),
          parentOffset = /^body|html$/i.test(offsetParent[0].nodeName)
            ? { top: 0, left: 0 }
            : offsetParent.offset();
        return (
          (offset.top -= parseFloat(jQuery.curCSS(elem, "marginTop", !0)) || 0),
          (offset.left -=
            parseFloat(jQuery.curCSS(elem, "marginLeft", !0)) || 0),
          (parentOffset.top +=
            parseFloat(jQuery.curCSS(offsetParent[0], "borderTopWidth", !0)) ||
            0),
          (parentOffset.left +=
            parseFloat(jQuery.curCSS(offsetParent[0], "borderLeftWidth", !0)) ||
            0),
          {
            top: offset.top - parentOffset.top,
            left: offset.left - parentOffset.left,
          }
        );
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var offsetParent = this.offsetParent || document.body;
            offsetParent &&
            !/^body|html$/i.test(offsetParent.nodeName) &&
            "static" === jQuery.css(offsetParent, "position");

          )
            offsetParent = offsetParent.offsetParent;
          return offsetParent;
        });
      },
    }),
    jQuery.each(["Left", "Top"], function (i, name) {
      var method = "scroll" + name;
      jQuery.fn[method] = function (val) {
        var elem = this[0],
          win;
        return elem
          ? void 0 !== val
            ? this.each(function () {
                (win = getWindow(this))
                  ? win.scrollTo(
                      i ? jQuery(win).scrollLeft() : val,
                      i ? val : jQuery(win).scrollTop()
                    )
                  : (this[method] = val);
              })
            : (win = getWindow(elem))
            ? "pageXOffset" in win
              ? win[i ? "pageYOffset" : "pageXOffset"]
              : (jQuery.support.boxModel &&
                  win.document.documentElement[method]) ||
                win.document.body[method]
            : elem[method]
          : null;
      };
    }),
    jQuery.each(["Height", "Width"], function (i, name) {
      var type = name.toLowerCase();
      (jQuery.fn["inner" + name] = function () {
        return this[0] ? jQuery.css(this[0], type, !1, "padding") : null;
      }),
        (jQuery.fn["outer" + name] = function (margin) {
          return this[0]
            ? jQuery.css(this[0], type, !1, margin ? "margin" : "border")
            : null;
        }),
        (jQuery.fn[type] = function (size) {
          var elem = this[0];
          return elem
            ? jQuery.isFunction(size)
              ? this.each(function (i) {
                  var self = jQuery(this);
                  self[type](size.call(this, i, self[type]()));
                })
              : "scrollTo" in elem && elem.document
              ? ("CSS1Compat" === elem.document.compatMode &&
                  elem.document.documentElement["client" + name]) ||
                elem.document.body["client" + name]
              : 9 === elem.nodeType
              ? Math.max(
                  elem.documentElement["client" + name],
                  elem.body["scroll" + name],
                  elem.documentElement["scroll" + name],
                  elem.body["offset" + name],
                  elem.documentElement["offset" + name]
                )
              : void 0 === size
              ? jQuery.css(elem, type)
              : this.css(type, "string" == typeof size ? size : size + "px")
            : null == size
            ? null
            : this;
        });
    }),
    (window.jQuery = window.$ = jQuery);
})(window),
  /*!
   * jQuery UI 1.8.7
   *
   * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI
   */
  (function ($, undefined) {
    function visible(element) {
      return !$(element)
        .parents()
        .andSelf()
        .filter(function () {
          return (
            "hidden" === $.curCSS(this, "visibility") ||
            $.expr.filters.hidden(this)
          );
        }).length;
    }
    ($.ui = $.ui || {}),
      $.ui.version ||
        ($.extend($.ui, {
          version: "1.8.7",
          keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91,
          },
        }),
        $.fn.extend({
          _focus: $.fn.focus,
          focus: function (delay, fn) {
            return "number" == typeof delay
              ? this.each(function () {
                  var elem = this;
                  setTimeout(function () {
                    $(elem).focus(), fn && fn.call(elem);
                  }, delay);
                })
              : this._focus.apply(this, arguments);
          },
          scrollParent: function () {
            var scrollParent;
            return (
              (scrollParent =
                ($.browser.msie &&
                  /(static|relative)/.test(this.css("position"))) ||
                /absolute/.test(this.css("position"))
                  ? this.parents()
                      .filter(function () {
                        return (
                          /(relative|absolute|fixed)/.test(
                            $.curCSS(this, "position", 1)
                          ) &&
                          /(auto|scroll)/.test(
                            $.curCSS(this, "overflow", 1) +
                              $.curCSS(this, "overflow-y", 1) +
                              $.curCSS(this, "overflow-x", 1)
                          )
                        );
                      })
                      .eq(0)
                  : this.parents()
                      .filter(function () {
                        return /(auto|scroll)/.test(
                          $.curCSS(this, "overflow", 1) +
                            $.curCSS(this, "overflow-y", 1) +
                            $.curCSS(this, "overflow-x", 1)
                        );
                      })
                      .eq(0)),
              /fixed/.test(this.css("position")) || !scrollParent.length
                ? $(document)
                : scrollParent
            );
          },
          zIndex: function (zIndex) {
            if (void 0 !== zIndex) return this.css("zIndex", zIndex);
            if (this.length)
              for (
                var elem = $(this[0]), position, value;
                elem.length && elem[0] !== document;

              ) {
                if (
                  ("absolute" === (position = elem.css("position")) ||
                    "relative" === position ||
                    "fixed" === position) &&
                  ((value = parseInt(elem.css("zIndex"), 10)),
                  !isNaN(value) && 0 !== value)
                )
                  return value;
                elem = elem.parent();
              }
            return 0;
          },
          disableSelection: function () {
            return this.bind(
              ($.support.selectstart ? "selectstart" : "mousedown") +
                ".ui-disableSelection",
              function (event) {
                event.preventDefault();
              }
            );
          },
          enableSelection: function () {
            return this.unbind(".ui-disableSelection");
          },
        }),
        $.each(["Width", "Height"], function (i, name) {
          var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
              innerWidth: $.fn.innerWidth,
              innerHeight: $.fn.innerHeight,
              outerWidth: $.fn.outerWidth,
              outerHeight: $.fn.outerHeight,
            };
          function reduce(elem, size, border, margin) {
            return (
              $.each(side, function () {
                (size -= parseFloat($.curCSS(elem, "padding" + this, !0)) || 0),
                  border &&
                    (size -=
                      parseFloat(
                        $.curCSS(elem, "border" + this + "Width", !0)
                      ) || 0),
                  margin &&
                    (size -=
                      parseFloat($.curCSS(elem, "margin" + this, !0)) || 0);
              }),
              size
            );
          }
          ($.fn["inner" + name] = function (size) {
            return void 0 === size
              ? orig["inner" + name].call(this)
              : this.each(function () {
                  $(this).css(type, reduce(this, size) + "px");
                });
          }),
            ($.fn["outer" + name] = function (size, margin) {
              return "number" != typeof size
                ? orig["outer" + name].call(this, size)
                : this.each(function () {
                    $(this).css(type, reduce(this, size, !0, margin) + "px");
                  });
            });
        }),
        $.extend($.expr[":"], {
          data: function (elem, i, match) {
            return !!$.data(elem, match[3]);
          },
          focusable: function (element) {
            var nodeName = element.nodeName.toLowerCase(),
              tabIndex = $.attr(element, "tabindex");
            if ("area" === nodeName) {
              var map = element.parentNode,
                mapName = map.name,
                img;
              return (
                !(
                  !element.href ||
                  !mapName ||
                  "map" !== map.nodeName.toLowerCase()
                ) &&
                !!(img = $("img[usemap=#" + mapName + "]")[0]) &&
                visible(img)
              );
            }
            return (
              (/input|select|textarea|button|object/.test(nodeName)
                ? !element.disabled
                : ("a" == nodeName && element.href) || !isNaN(tabIndex)) &&
              visible(element)
            );
          },
          tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex");
            return (
              (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(":focusable")
            );
          },
        }),
        $(function () {
          var body = document.body,
            div = body.appendChild((div = document.createElement("div")));
          $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0,
          }),
            ($.support.minHeight = 100 === div.offsetHeight),
            ($.support.selectstart = "onselectstart" in div),
            (body.removeChild(div).style.display = "none");
        }),
        $.extend($.ui, {
          plugin: {
            add: function (module, option, set) {
              var proto = $.ui[module].prototype;
              for (var i in set)
                (proto.plugins[i] = proto.plugins[i] || []),
                  proto.plugins[i].push([option, set[i]]);
            },
            call: function (instance, name, args) {
              var set = instance.plugins[name];
              if (set && instance.element[0].parentNode)
                for (var i = 0; i < set.length; i++)
                  instance.options[set[i][0]] &&
                    set[i][1].apply(instance.element, args);
            },
          },
          contains: function (a, b) {
            return document.compareDocumentPosition
              ? 16 & a.compareDocumentPosition(b)
              : a !== b && a.contains(b);
          },
          hasScroll: function (el, a) {
            if ("hidden" === $(el).css("overflow")) return !1;
            var scroll = a && "left" === a ? "scrollLeft" : "scrollTop",
              has = !1;
            return (
              el[scroll] > 0 ||
              ((el[scroll] = 1), (has = el[scroll] > 0), (el[scroll] = 0), has)
            );
          },
          isOverAxis: function (x, reference, size) {
            return x > reference && x < reference + size;
          },
          isOver: function (y, x, top, left, height, width) {
            return (
              $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width)
            );
          },
        }));
  })(jQuery),
  /*!
   * jQuery UI Widget 1.8.7
   *
   * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Widget
   */
  (function ($, undefined) {
    if ($.cleanData) {
      var _cleanData = $.cleanData;
      $.cleanData = function (elems) {
        for (var i = 0, elem; null != (elem = elems[i]); i++)
          $(elem).triggerHandler("remove");
        _cleanData(elems);
      };
    } else {
      var _remove = $.fn.remove;
      $.fn.remove = function (selector, keepData) {
        return this.each(function () {
          return (
            keepData ||
              (selector && !$.filter(selector, [this]).length) ||
              $("*", this)
                .add([this])
                .each(function () {
                  $(this).triggerHandler("remove");
                }),
            _remove.call($(this), selector, keepData)
          );
        });
      };
    }
    ($.widget = function (name, base, prototype) {
      var namespace = name.split(".")[0],
        fullName;
      (fullName = namespace + "-" + (name = name.split(".")[1])),
        prototype || ((prototype = base), (base = $.Widget)),
        ($.expr[":"][fullName] = function (elem) {
          return !!$.data(elem, name);
        }),
        ($[namespace] = $[namespace] || {}),
        ($[namespace][name] = function (options, element) {
          arguments.length && this._createWidget(options, element);
        });
      var basePrototype = new base();
      (basePrototype.options = $.extend(!0, {}, basePrototype.options)),
        ($[namespace][name].prototype = $.extend(
          !0,
          basePrototype,
          {
            namespace: namespace,
            widgetName: name,
            widgetEventPrefix:
              $[namespace][name].prototype.widgetEventPrefix || name,
            widgetBaseClass: fullName,
          },
          prototype
        )),
        $.widget.bridge(name, $[namespace][name]);
    }),
      ($.widget.bridge = function (name, object) {
        $.fn[name] = function (options) {
          var isMethodCall = "string" == typeof options,
            args = Array.prototype.slice.call(arguments, 1),
            returnValue = this;
          return (
            (options =
              !isMethodCall && args.length
                ? $.extend.apply(null, [!0, options].concat(args))
                : options),
            isMethodCall && "_" === options.charAt(0)
              ? returnValue
              : (isMethodCall
                  ? this.each(function () {
                      var instance = $.data(this, name),
                        methodValue =
                          instance && $.isFunction(instance[options])
                            ? instance[options].apply(instance, args)
                            : instance;
                      if (methodValue !== instance && void 0 !== methodValue)
                        return (returnValue = methodValue), !1;
                    })
                  : this.each(function () {
                      var instance = $.data(this, name);
                      instance
                        ? instance.option(options || {})._init()
                        : $.data(this, name, new object(options, this));
                    }),
                returnValue)
          );
        };
      }),
      ($.Widget = function (options, element) {
        arguments.length && this._createWidget(options, element);
      }),
      ($.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: { disabled: !1 },
        _createWidget: function (options, element) {
          $.data(element, this.widgetName, this),
            (this.element = $(element)),
            (this.options = $.extend(
              !0,
              {},
              this.options,
              this._getCreateOptions(),
              options
            ));
          var self = this;
          this.element.bind("remove." + this.widgetName, function () {
            self.destroy();
          }),
            this._create(),
            this._trigger("create"),
            this._init();
        },
        _getCreateOptions: function () {
          return $.metadata && $.metadata.get(this.element[0])[this.widgetName];
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
          this.element
            .unbind("." + this.widgetName)
            .removeData(this.widgetName),
            this.widget()
              .unbind("." + this.widgetName)
              .removeAttr("aria-disabled")
              .removeClass(
                this.widgetBaseClass + "-disabled ui-state-disabled"
              );
        },
        widget: function () {
          return this.element;
        },
        option: function (key, value) {
          var options = key;
          if (0 === arguments.length) return $.extend({}, this.options);
          if ("string" == typeof key) {
            if (void 0 === value) return this.options[key];
            (options = {})[key] = value;
          }
          return this._setOptions(options), this;
        },
        _setOptions: function (options) {
          var self = this;
          return (
            $.each(options, function (key, value) {
              self._setOption(key, value);
            }),
            this
          );
        },
        _setOption: function (key, value) {
          return (
            (this.options[key] = value),
            "disabled" === key &&
              this.widget()
                [value ? "addClass" : "removeClass"](
                  this.widgetBaseClass + "-disabled ui-state-disabled"
                )
                .attr("aria-disabled", value),
            this
          );
        },
        enable: function () {
          return this._setOption("disabled", !1);
        },
        disable: function () {
          return this._setOption("disabled", !0);
        },
        _trigger: function (type, event, data) {
          var callback = this.options[type];
          if (
            (((event = $.Event(event)).type = (
              type === this.widgetEventPrefix
                ? type
                : this.widgetEventPrefix + type
            ).toLowerCase()),
            (data = data || {}),
            event.originalEvent)
          )
            for (var i = $.event.props.length, prop; i; )
              event[(prop = $.event.props[--i])] = event.originalEvent[prop];
          return (
            this.element.trigger(event, data),
            !(
              ($.isFunction(callback) &&
                !1 === callback.call(this.element[0], event, data)) ||
              event.isDefaultPrevented()
            )
          );
        },
      });
  })(jQuery),
  /*!
   * jQuery UI Mouse 1.8.7
   *
   * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Mouse
   *
   * Depends:
   *	jquery.ui.widget.js
   */
  (function ($, undefined) {
    $.widget("ui.mouse", {
      options: { cancel: ":input,option", distance: 1, delay: 0 },
      _mouseInit: function () {
        var self = this;
        this.element
          .bind("mousedown." + this.widgetName, function (event) {
            return self._mouseDown(event);
          })
          .bind("click." + this.widgetName, function (event) {
            if (
              !0 ===
              $.data(event.target, self.widgetName + ".preventClickEvent")
            )
              return (
                $.removeData(
                  event.target,
                  self.widgetName + ".preventClickEvent"
                ),
                event.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName);
      },
      _mouseDown: function (event) {
        if (
          ((event.originalEvent = event.originalEvent || {}),
          !event.originalEvent.mouseHandled)
        ) {
          this._mouseStarted && this._mouseUp(event),
            (this._mouseDownEvent = event);
          var self = this,
            btnIsLeft = 1 == event.which,
            elIsCancel =
              "string" == typeof this.options.cancel &&
              $(event.target)
                .parents()
                .add(event.target)
                .filter(this.options.cancel).length;
          return (
            !(btnIsLeft && !elIsCancel && this._mouseCapture(event)) ||
            ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
              (this._mouseDelayTimer = setTimeout(function () {
                self.mouseDelayMet = !0;
              }, this.options.delay)),
            this._mouseDistanceMet(event) &&
            this._mouseDelayMet(event) &&
            ((this._mouseStarted = !1 !== this._mouseStart(event)),
            !this._mouseStarted)
              ? (event.preventDefault(), !0)
              : ((this._mouseMoveDelegate = function (event) {
                  return self._mouseMove(event);
                }),
                (this._mouseUpDelegate = function (event) {
                  return self._mouseUp(event);
                }),
                $(document)
                  .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                event.preventDefault(),
                (event.originalEvent.mouseHandled = !0),
                !0))
          );
        }
      },
      _mouseMove: function (event) {
        return !$.browser.msie || document.documentMode >= 9 || event.button
          ? this._mouseStarted
            ? (this._mouseDrag(event), event.preventDefault())
            : (this._mouseDistanceMet(event) &&
                this._mouseDelayMet(event) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, event)),
                this._mouseStarted
                  ? this._mouseDrag(event)
                  : this._mouseUp(event)),
              !this._mouseStarted)
          : this._mouseUp(event);
      },
      _mouseUp: function (event) {
        return (
          $(document)
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            event.target == this._mouseDownEvent.target &&
              $.data(event.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(event)),
          !1
        );
      },
      _mouseDistanceMet: function (event) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - event.pageX),
            Math.abs(this._mouseDownEvent.pageY - event.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function (event) {
        return this.mouseDelayMet;
      },
      _mouseStart: function (event) {},
      _mouseDrag: function (event) {},
      _mouseStop: function (event) {},
      _mouseCapture: function (event) {
        return !0;
      },
    });
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.draggable", $.ui.mouse, {
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
      },
      _create: function () {
        "original" != this.options.helper ||
          /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative"),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._mouseInit();
      },
      destroy: function () {
        if (this.element.data("draggable"))
          return (
            this.element
              .removeData("draggable")
              .unbind(".draggable")
              .removeClass(
                "ui-draggable ui-draggable-dragging ui-draggable-disabled"
              ),
            this._mouseDestroy(),
            this
          );
      },
      _mouseCapture: function (event) {
        var o = this.options;
        return (
          !(
            this.helper ||
            o.disabled ||
            $(event.target).is(".ui-resizable-handle")
          ) && ((this.handle = this._getHandle(event)), !!this.handle)
        );
      },
      _mouseStart: function (event) {
        var o = this.options;
        return (
          (this.helper = this._createHelper(event)),
          this._cacheHelperProportions(),
          $.ui.ddmanager && ($.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.positionAbs = this.element.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          $.extend(this.offset, {
            click: {
              left: event.pageX - this.offset.left,
              top: event.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          (this.originalPosition = this.position =
            this._generatePosition(event)),
          (this.originalPageX = event.pageX),
          (this.originalPageY = event.pageY),
          o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
          o.containment && this._setContainment(),
          !1 === this._trigger("start", event)
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              $.ui.ddmanager &&
                !o.dropBehaviour &&
                $.ui.ddmanager.prepareOffsets(this, event),
              this.helper.addClass("ui-draggable-dragging"),
              this._mouseDrag(event, !0),
              !0)
        );
      },
      _mouseDrag: function (event, noPropagation) {
        if (
          ((this.position = this._generatePosition(event)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !noPropagation)
        ) {
          var ui = this._uiHash();
          if (!1 === this._trigger("drag", event, ui))
            return this._mouseUp({}), !1;
          this.position = ui.position;
        }
        return (
          (this.options.axis && "y" == this.options.axis) ||
            (this.helper[0].style.left = this.position.left + "px"),
          (this.options.axis && "x" == this.options.axis) ||
            (this.helper[0].style.top = this.position.top + "px"),
          $.ui.ddmanager && $.ui.ddmanager.drag(this, event),
          !1
        );
      },
      _mouseStop: function (event) {
        var dropped = !1;
        if (
          ($.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (dropped = $.ui.ddmanager.drop(this, event)),
          this.dropped && ((dropped = this.dropped), (this.dropped = !1)),
          !this.element[0] || !this.element[0].parentNode)
        )
          return !1;
        if (
          ("invalid" == this.options.revert && !dropped) ||
          ("valid" == this.options.revert && dropped) ||
          !0 === this.options.revert ||
          ($.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, dropped))
        ) {
          var self = this;
          $(this.helper).animate(
            this.originalPosition,
            parseInt(this.options.revertDuration, 10),
            function () {
              !1 !== self._trigger("stop", event) && self._clear();
            }
          );
        } else !1 !== this._trigger("stop", event) && this._clear();
        return !1;
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function (event) {
        var handle =
          !this.options.handle || !$(this.options.handle, this.element).length;
        return (
          $(this.options.handle, this.element)
            .find("*")
            .andSelf()
            .each(function () {
              this == event.target && (handle = !0);
            }),
          handle
        );
      },
      _createHelper: function (event) {
        var o = this.options,
          helper = $.isFunction(o.helper)
            ? $(o.helper.apply(this.element[0], [event]))
            : "clone" == o.helper
            ? this.element.clone()
            : this.element;
        return (
          helper.parents("body").length ||
            helper.appendTo(
              "parent" == o.appendTo ? this.element[0].parentNode : o.appendTo
            ),
          helper[0] == this.element[0] ||
            /(fixed|absolute)/.test(helper.css("position")) ||
            helper.css("position", "absolute"),
          helper
        );
      },
      _adjustOffsetFromHelper: function (obj) {
        "string" == typeof obj && (obj = obj.split(" ")),
          $.isArray(obj) && (obj = { left: +obj[0], top: +obj[1] || 0 }),
          "left" in obj &&
            (this.offset.click.left = obj.left + this.margins.left),
          "right" in obj &&
            (this.offset.click.left =
              this.helperProportions.width - obj.right + this.margins.left),
          "top" in obj && (this.offset.click.top = obj.top + this.margins.top),
          "bottom" in obj &&
            (this.offset.click.top =
              this.helperProportions.height - obj.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var po = this.offsetParent.offset();
        return (
          "absolute" == this.cssPosition &&
            this.scrollParent[0] != document &&
            $.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((po.left += this.scrollParent.scrollLeft()),
            (po.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] == document.body ||
            (this.offsetParent[0].tagName &&
              "html" == this.offsetParent[0].tagName.toLowerCase() &&
              $.browser.msie)) &&
            (po = { top: 0, left: 0 }),
          {
            top:
              po.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              po.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" == this.cssPosition) {
          var p = this.element.position();
          return {
            top:
              p.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              p.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var o = this.options;
        if (
          ("parent" == o.containment &&
            (o.containment = this.helper[0].parentNode),
          ("document" != o.containment && "window" != o.containment) ||
            (this.containment = [
              ("document" == o.containment ? 0 : $(window).scrollLeft()) -
                this.offset.relative.left -
                this.offset.parent.left,
              ("document" == o.containment ? 0 : $(window).scrollTop()) -
                this.offset.relative.top -
                this.offset.parent.top,
              ("document" == o.containment ? 0 : $(window).scrollLeft()) +
                $("document" == o.containment ? document : window).width() -
                this.helperProportions.width -
                this.margins.left,
              ("document" == o.containment ? 0 : $(window).scrollTop()) +
                ($("document" == o.containment ? document : window).height() ||
                  document.body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(o.containment) ||
            o.containment.constructor == Array)
        )
          o.containment.constructor == Array &&
            (this.containment = o.containment);
        else {
          var ce = $(o.containment)[0];
          if (!ce) return;
          var co = $(o.containment).offset(),
            over = "hidden" != $(ce).css("overflow");
          this.containment = [
            co.left +
              (parseInt($(ce).css("borderLeftWidth"), 10) || 0) +
              (parseInt($(ce).css("paddingLeft"), 10) || 0) -
              this.margins.left,
            co.top +
              (parseInt($(ce).css("borderTopWidth"), 10) || 0) +
              (parseInt($(ce).css("paddingTop"), 10) || 0) -
              this.margins.top,
            co.left +
              (over
                ? Math.max(ce.scrollWidth, ce.offsetWidth)
                : ce.offsetWidth) -
              (parseInt($(ce).css("borderLeftWidth"), 10) || 0) -
              (parseInt($(ce).css("paddingRight"), 10) || 0) -
              this.helperProportions.width -
              this.margins.left,
            co.top +
              (over
                ? Math.max(ce.scrollHeight, ce.offsetHeight)
                : ce.offsetHeight) -
              (parseInt($(ce).css("borderTopWidth"), 10) || 0) -
              (parseInt($(ce).css("paddingBottom"), 10) || 0) -
              this.helperProportions.height -
              this.margins.top,
          ];
        }
      },
      _convertPositionTo: function (d, pos) {
        pos || (pos = this.position);
        var mod = "absolute" == d ? 1 : -1,
          o = this.options,
          scroll =
            "absolute" != this.cssPosition ||
            (this.scrollParent[0] != document &&
              $.ui.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
        return {
          top:
            pos.top +
            this.offset.relative.top * mod +
            this.offset.parent.top * mod -
            ($.browser.safari &&
            $.browser.version < 526 &&
            "fixed" == this.cssPosition
              ? 0
              : ("fixed" == this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : scrollIsRootNode
                  ? 0
                  : scroll.scrollTop()) * mod),
          left:
            pos.left +
            this.offset.relative.left * mod +
            this.offset.parent.left * mod -
            ($.browser.safari &&
            $.browser.version < 526 &&
            "fixed" == this.cssPosition
              ? 0
              : ("fixed" == this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : scrollIsRootNode
                  ? 0
                  : scroll.scrollLeft()) * mod),
        };
      },
      _generatePosition: function (event) {
        var o = this.options,
          scroll =
            "absolute" != this.cssPosition ||
            (this.scrollParent[0] != document &&
              $.ui.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName),
          pageX = event.pageX,
          pageY = event.pageY;
        if (
          this.originalPosition &&
          (this.containment &&
            (event.pageX - this.offset.click.left < this.containment[0] &&
              (pageX = this.containment[0] + this.offset.click.left),
            event.pageY - this.offset.click.top < this.containment[1] &&
              (pageY = this.containment[1] + this.offset.click.top),
            event.pageX - this.offset.click.left > this.containment[2] &&
              (pageX = this.containment[2] + this.offset.click.left),
            event.pageY - this.offset.click.top > this.containment[3] &&
              (pageY = this.containment[3] + this.offset.click.top)),
          o.grid)
        ) {
          var top =
            this.originalPageY +
            Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
          pageY =
            this.containment &&
            (top - this.offset.click.top < this.containment[1] ||
              top - this.offset.click.top > this.containment[3])
              ? top - this.offset.click.top < this.containment[1]
                ? top + o.grid[1]
                : top - o.grid[1]
              : top;
          var left =
            this.originalPageX +
            Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
          pageX =
            this.containment &&
            (left - this.offset.click.left < this.containment[0] ||
              left - this.offset.click.left > this.containment[2])
              ? left - this.offset.click.left < this.containment[0]
                ? left + o.grid[0]
                : left - o.grid[0]
              : left;
        }
        return {
          top:
            pageY -
            this.offset.click.top -
            this.offset.relative.top -
            this.offset.parent.top +
            ($.browser.safari &&
            $.browser.version < 526 &&
            "fixed" == this.cssPosition
              ? 0
              : "fixed" == this.cssPosition
              ? -this.scrollParent.scrollTop()
              : scrollIsRootNode
              ? 0
              : scroll.scrollTop()),
          left:
            pageX -
            this.offset.click.left -
            this.offset.relative.left -
            this.offset.parent.left +
            ($.browser.safari &&
            $.browser.version < 526 &&
            "fixed" == this.cssPosition
              ? 0
              : "fixed" == this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : scrollIsRootNode
              ? 0
              : scroll.scrollLeft()),
        };
      },
      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] == this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1);
      },
      _trigger: function (type, event, ui) {
        return (
          (ui = ui || this._uiHash()),
          $.ui.plugin.call(this, type, [event, ui]),
          "drag" == type &&
            (this.positionAbs = this._convertPositionTo("absolute")),
          $.Widget.prototype._trigger.call(this, type, event, ui)
        );
      },
      plugins: {},
      _uiHash: function (event) {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
      $.extend($.ui.draggable, { version: "1.8.7" }),
      $.ui.plugin.add("draggable", "connectToSortable", {
        start: function (event, ui) {
          var inst = $(this).data("draggable"),
            o = inst.options,
            uiSortable = $.extend({}, ui, { item: inst.element });
          (inst.sortables = []),
            $(o.connectToSortable).each(function () {
              var sortable = $.data(this, "sortable");
              sortable &&
                !sortable.options.disabled &&
                (inst.sortables.push({
                  instance: sortable,
                  shouldRevert: sortable.options.revert,
                }),
                sortable._refreshItems(),
                sortable._trigger("activate", event, uiSortable));
            });
        },
        stop: function (event, ui) {
          var inst = $(this).data("draggable"),
            uiSortable = $.extend({}, ui, { item: inst.element });
          $.each(inst.sortables, function () {
            this.instance.isOver
              ? ((this.instance.isOver = 0),
                (inst.cancelHelperRemoval = !0),
                (this.instance.cancelHelperRemoval = !1),
                this.shouldRevert && (this.instance.options.revert = !0),
                this.instance._mouseStop(event),
                (this.instance.options.helper = this.instance.options._helper),
                "original" == inst.options.helper &&
                  this.instance.currentItem.css({ top: "auto", left: "auto" }))
              : ((this.instance.cancelHelperRemoval = !1),
                this.instance._trigger("deactivate", event, uiSortable));
          });
        },
        drag: function (event, ui) {
          var inst = $(this).data("draggable"),
            self = this,
            checkPos = function (o) {
              var dyClick = this.offset.click.top,
                dxClick = this.offset.click.left,
                helperTop = this.positionAbs.top,
                helperLeft = this.positionAbs.left,
                itemHeight = o.height,
                itemWidth = o.width,
                itemTop = o.top,
                itemLeft = o.left;
              return $.ui.isOver(
                helperTop + dyClick,
                helperLeft + dxClick,
                itemTop,
                itemLeft,
                itemHeight,
                itemWidth
              );
            };
          $.each(inst.sortables, function (i) {
            (this.instance.positionAbs = inst.positionAbs),
              (this.instance.helperProportions = inst.helperProportions),
              (this.instance.offset.click = inst.offset.click),
              this.instance._intersectsWith(this.instance.containerCache)
                ? (this.instance.isOver ||
                    ((this.instance.isOver = 1),
                    (this.instance.currentItem = $(self)
                      .clone()
                      .appendTo(this.instance.element)
                      .data("sortable-item", !0)),
                    (this.instance.options._helper =
                      this.instance.options.helper),
                    (this.instance.options.helper = function () {
                      return ui.helper[0];
                    }),
                    (event.target = this.instance.currentItem[0]),
                    this.instance._mouseCapture(event, !0),
                    this.instance._mouseStart(event, !0, !0),
                    (this.instance.offset.click.top = inst.offset.click.top),
                    (this.instance.offset.click.left = inst.offset.click.left),
                    (this.instance.offset.parent.left -=
                      inst.offset.parent.left -
                      this.instance.offset.parent.left),
                    (this.instance.offset.parent.top -=
                      inst.offset.parent.top - this.instance.offset.parent.top),
                    inst._trigger("toSortable", event),
                    (inst.dropped = this.instance.element),
                    (inst.currentItem = inst.element),
                    (this.instance.fromOutside = inst)),
                  this.instance.currentItem && this.instance._mouseDrag(event))
                : this.instance.isOver &&
                  ((this.instance.isOver = 0),
                  (this.instance.cancelHelperRemoval = !0),
                  (this.instance.options.revert = !1),
                  this.instance._trigger(
                    "out",
                    event,
                    this.instance._uiHash(this.instance)
                  ),
                  this.instance._mouseStop(event, !0),
                  (this.instance.options.helper =
                    this.instance.options._helper),
                  this.instance.currentItem.remove(),
                  this.instance.placeholder &&
                    this.instance.placeholder.remove(),
                  inst._trigger("fromSortable", event),
                  (inst.dropped = !1));
          });
        },
      }),
      $.ui.plugin.add("draggable", "cursor", {
        start: function (event, ui) {
          var t = $("body"),
            o = $(this).data("draggable").options;
          t.css("cursor") && (o._cursor = t.css("cursor")),
            t.css("cursor", o.cursor);
        },
        stop: function (event, ui) {
          var o = $(this).data("draggable").options;
          o._cursor && $("body").css("cursor", o._cursor);
        },
      }),
      $.ui.plugin.add("draggable", "iframeFix", {
        start: function (event, ui) {
          var o = $(this).data("draggable").options;
          $(!0 === o.iframeFix ? "iframe" : o.iframeFix).each(function () {
            $(
              '<div class="ui-draggable-iframeFix" style="background: #fff;"></div>'
            )
              .css({
                width: this.offsetWidth + "px",
                height: this.offsetHeight + "px",
                position: "absolute",
                opacity: "0.001",
                zIndex: 1e3,
              })
              .css($(this).offset())
              .appendTo("body");
          });
        },
        stop: function (event, ui) {
          $("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this);
          });
        },
      }),
      $.ui.plugin.add("draggable", "opacity", {
        start: function (event, ui) {
          var t = $(ui.helper),
            o = $(this).data("draggable").options;
          t.css("opacity") && (o._opacity = t.css("opacity")),
            t.css("opacity", o.opacity);
        },
        stop: function (event, ui) {
          var o = $(this).data("draggable").options;
          o._opacity && $(ui.helper).css("opacity", o._opacity);
        },
      }),
      $.ui.plugin.add("draggable", "scroll", {
        start: function (event, ui) {
          var i = $(this).data("draggable");
          i.scrollParent[0] != document &&
            "HTML" != i.scrollParent[0].tagName &&
            (i.overflowOffset = i.scrollParent.offset());
        },
        drag: function (event, ui) {
          var i = $(this).data("draggable"),
            o = i.options,
            scrolled = !1;
          i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName
            ? ((o.axis && "x" == o.axis) ||
                (i.overflowOffset.top +
                  i.scrollParent[0].offsetHeight -
                  event.pageY <
                o.scrollSensitivity
                  ? (i.scrollParent[0].scrollTop = scrolled =
                      i.scrollParent[0].scrollTop + o.scrollSpeed)
                  : event.pageY - i.overflowOffset.top < o.scrollSensitivity &&
                    (i.scrollParent[0].scrollTop = scrolled =
                      i.scrollParent[0].scrollTop - o.scrollSpeed)),
              (o.axis && "y" == o.axis) ||
                (i.overflowOffset.left +
                  i.scrollParent[0].offsetWidth -
                  event.pageX <
                o.scrollSensitivity
                  ? (i.scrollParent[0].scrollLeft = scrolled =
                      i.scrollParent[0].scrollLeft + o.scrollSpeed)
                  : event.pageX - i.overflowOffset.left < o.scrollSensitivity &&
                    (i.scrollParent[0].scrollLeft = scrolled =
                      i.scrollParent[0].scrollLeft - o.scrollSpeed)))
            : ((o.axis && "x" == o.axis) ||
                (event.pageY - $(document).scrollTop() < o.scrollSensitivity
                  ? (scrolled = $(document).scrollTop(
                      $(document).scrollTop() - o.scrollSpeed
                    ))
                  : $(window).height() -
                      (event.pageY - $(document).scrollTop()) <
                      o.scrollSensitivity &&
                    (scrolled = $(document).scrollTop(
                      $(document).scrollTop() + o.scrollSpeed
                    ))),
              (o.axis && "y" == o.axis) ||
                (event.pageX - $(document).scrollLeft() < o.scrollSensitivity
                  ? (scrolled = $(document).scrollLeft(
                      $(document).scrollLeft() - o.scrollSpeed
                    ))
                  : $(window).width() -
                      (event.pageX - $(document).scrollLeft()) <
                      o.scrollSensitivity &&
                    (scrolled = $(document).scrollLeft(
                      $(document).scrollLeft() + o.scrollSpeed
                    )))),
            !1 !== scrolled &&
              $.ui.ddmanager &&
              !o.dropBehaviour &&
              $.ui.ddmanager.prepareOffsets(i, event);
        },
      }),
      $.ui.plugin.add("draggable", "snap", {
        start: function (event, ui) {
          var i = $(this).data("draggable"),
            o = i.options;
          (i.snapElements = []),
            $(
              o.snap.constructor != String
                ? o.snap.items || ":data(draggable)"
                : o.snap
            ).each(function () {
              var $t = $(this),
                $o = $t.offset();
              this != i.element[0] &&
                i.snapElements.push({
                  item: this,
                  width: $t.outerWidth(),
                  height: $t.outerHeight(),
                  top: $o.top,
                  left: $o.left,
                });
            });
        },
        drag: function (event, ui) {
          for (
            var inst = $(this).data("draggable"),
              o = inst.options,
              d = o.snapTolerance,
              x1 = ui.offset.left,
              x2 = x1 + inst.helperProportions.width,
              y1 = ui.offset.top,
              y2 = y1 + inst.helperProportions.height,
              i = inst.snapElements.length - 1;
            i >= 0;
            i--
          ) {
            var l = inst.snapElements[i].left,
              r = l + inst.snapElements[i].width,
              t = inst.snapElements[i].top,
              b = t + inst.snapElements[i].height;
            if (
              (l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d) ||
              (l - d < x1 && x1 < r + d && t - d < y2 && y2 < b + d) ||
              (l - d < x2 && x2 < r + d && t - d < y1 && y1 < b + d) ||
              (l - d < x2 && x2 < r + d && t - d < y2 && y2 < b + d)
            ) {
              if ("inner" != o.snapMode) {
                var ts = Math.abs(t - y2) <= d,
                  bs = Math.abs(b - y1) <= d,
                  ls = Math.abs(l - x2) <= d,
                  rs = Math.abs(r - x1) <= d;
                ts &&
                  (ui.position.top =
                    inst._convertPositionTo("relative", {
                      top: t - inst.helperProportions.height,
                      left: 0,
                    }).top - inst.margins.top),
                  bs &&
                    (ui.position.top =
                      inst._convertPositionTo("relative", { top: b, left: 0 })
                        .top - inst.margins.top),
                  ls &&
                    (ui.position.left =
                      inst._convertPositionTo("relative", {
                        top: 0,
                        left: l - inst.helperProportions.width,
                      }).left - inst.margins.left),
                  rs &&
                    (ui.position.left =
                      inst._convertPositionTo("relative", { top: 0, left: r })
                        .left - inst.margins.left);
              }
              var first = ts || bs || ls || rs;
              if ("outer" != o.snapMode) {
                var ts = Math.abs(t - y1) <= d,
                  bs = Math.abs(b - y2) <= d,
                  ls = Math.abs(l - x1) <= d,
                  rs = Math.abs(r - x2) <= d;
                ts &&
                  (ui.position.top =
                    inst._convertPositionTo("relative", { top: t, left: 0 })
                      .top - inst.margins.top),
                  bs &&
                    (ui.position.top =
                      inst._convertPositionTo("relative", {
                        top: b - inst.helperProportions.height,
                        left: 0,
                      }).top - inst.margins.top),
                  ls &&
                    (ui.position.left =
                      inst._convertPositionTo("relative", { top: 0, left: l })
                        .left - inst.margins.left),
                  rs &&
                    (ui.position.left =
                      inst._convertPositionTo("relative", {
                        top: 0,
                        left: r - inst.helperProportions.width,
                      }).left - inst.margins.left);
              }
              !inst.snapElements[i].snapping &&
                (ts || bs || ls || rs || first) &&
                inst.options.snap.snap &&
                inst.options.snap.snap.call(
                  inst.element,
                  event,
                  $.extend(inst._uiHash(), {
                    snapItem: inst.snapElements[i].item,
                  })
                ),
                (inst.snapElements[i].snapping = ts || bs || ls || rs || first);
            } else
              inst.snapElements[i].snapping &&
                inst.options.snap.release &&
                inst.options.snap.release.call(
                  inst.element,
                  event,
                  $.extend(inst._uiHash(), {
                    snapItem: inst.snapElements[i].item,
                  })
                ),
                (inst.snapElements[i].snapping = !1);
          }
        },
      }),
      $.ui.plugin.add("draggable", "stack", {
        start: function (event, ui) {
          var o = $(this).data("draggable").options,
            group = $.makeArray($(o.stack)).sort(function (a, b) {
              return (
                (parseInt($(a).css("zIndex"), 10) || 0) -
                (parseInt($(b).css("zIndex"), 10) || 0)
              );
            });
          if (group.length) {
            var min = parseInt(group[0].style.zIndex) || 0;
            $(group).each(function (i) {
              this.style.zIndex = min + i;
            }),
              (this[0].style.zIndex = min + group.length);
          }
        },
      }),
      $.ui.plugin.add("draggable", "zIndex", {
        start: function (event, ui) {
          var t = $(ui.helper),
            o = $(this).data("draggable").options;
          t.css("zIndex") && (o._zIndex = t.css("zIndex")),
            t.css("zIndex", o.zIndex);
        },
        stop: function (event, ui) {
          var o = $(this).data("draggable").options;
          o._zIndex && $(ui.helper).css("zIndex", o._zIndex);
        },
      });
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.droppable", {
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect",
      },
      _create: function () {
        var o = this.options,
          accept = o.accept;
        (this.isover = 0),
          (this.isout = 1),
          (this.accept = $.isFunction(accept)
            ? accept
            : function (d) {
                return d.is(accept);
              }),
          (this.proportions = {
            width: this.element[0].offsetWidth,
            height: this.element[0].offsetHeight,
          }),
          ($.ui.ddmanager.droppables[o.scope] =
            $.ui.ddmanager.droppables[o.scope] || []),
          $.ui.ddmanager.droppables[o.scope].push(this),
          o.addClasses && this.element.addClass("ui-droppable");
      },
      destroy: function () {
        for (
          var drop = $.ui.ddmanager.droppables[this.options.scope], i = 0;
          i < drop.length;
          i++
        )
          drop[i] == this && drop.splice(i, 1);
        return (
          this.element
            .removeClass("ui-droppable ui-droppable-disabled")
            .removeData("droppable")
            .unbind(".droppable"),
          this
        );
      },
      _setOption: function (key, value) {
        "accept" == key &&
          (this.accept = $.isFunction(value)
            ? value
            : function (d) {
                return d.is(value);
              }),
          $.Widget.prototype._setOption.apply(this, arguments);
      },
      _activate: function (event) {
        var draggable = $.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass),
          draggable && this._trigger("activate", event, this.ui(draggable));
      },
      _deactivate: function (event) {
        var draggable = $.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass),
          draggable && this._trigger("deactivate", event, this.ui(draggable));
      },
      _over: function (event) {
        var draggable = $.ui.ddmanager.current;
        draggable &&
          (draggable.currentItem || draggable.element)[0] != this.element[0] &&
          this.accept.call(
            this.element[0],
            draggable.currentItem || draggable.element
          ) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", event, this.ui(draggable)));
      },
      _out: function (event) {
        var draggable = $.ui.ddmanager.current;
        draggable &&
          (draggable.currentItem || draggable.element)[0] != this.element[0] &&
          this.accept.call(
            this.element[0],
            draggable.currentItem || draggable.element
          ) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", event, this.ui(draggable)));
      },
      _drop: function (event, custom) {
        var draggable = custom || $.ui.ddmanager.current;
        if (
          !draggable ||
          (draggable.currentItem || draggable.element)[0] == this.element[0]
        )
          return !1;
        var childrenIntersection = !1;
        return (
          this.element
            .find(":data(droppable)")
            .not(".ui-draggable-dragging")
            .each(function () {
              var inst = $.data(this, "droppable");
              if (
                inst.options.greedy &&
                !inst.options.disabled &&
                inst.options.scope == draggable.options.scope &&
                inst.accept.call(
                  inst.element[0],
                  draggable.currentItem || draggable.element
                ) &&
                $.ui.intersect(
                  draggable,
                  $.extend(inst, { offset: inst.element.offset() }),
                  inst.options.tolerance
                )
              )
                return (childrenIntersection = !0), !1;
            }),
          !childrenIntersection &&
            !!this.accept.call(
              this.element[0],
              draggable.currentItem || draggable.element
            ) &&
            (this.options.activeClass &&
              this.element.removeClass(this.options.activeClass),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", event, this.ui(draggable)),
            this.element)
        );
      },
      ui: function (c) {
        return {
          draggable: c.currentItem || c.element,
          helper: c.helper,
          position: c.position,
          offset: c.positionAbs,
        };
      },
    }),
      $.extend($.ui.droppable, { version: "1.8.7" }),
      ($.ui.intersect = function (draggable, droppable, toleranceMode) {
        if (!droppable.offset) return !1;
        var x1 = (draggable.positionAbs || draggable.position.absolute).left,
          x2 = x1 + draggable.helperProportions.width,
          y1 = (draggable.positionAbs || draggable.position.absolute).top,
          y2 = y1 + draggable.helperProportions.height,
          l = droppable.offset.left,
          r = l + droppable.proportions.width,
          t = droppable.offset.top,
          b = t + droppable.proportions.height;
        switch (toleranceMode) {
          case "fit":
            return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
          case "intersect":
            return (
              l < x1 + draggable.helperProportions.width / 2 &&
              x2 - draggable.helperProportions.width / 2 < r &&
              t < y1 + draggable.helperProportions.height / 2 &&
              y2 - draggable.helperProportions.height / 2 < b
            );
          case "pointer":
            var draggableLeft =
                (draggable.positionAbs || draggable.position.absolute).left +
                (draggable.clickOffset || draggable.offset.click).left,
              draggableTop =
                (draggable.positionAbs || draggable.position.absolute).top +
                (draggable.clickOffset || draggable.offset.click).top,
              isOver;
            return $.ui.isOver(
              draggableTop,
              draggableLeft,
              t,
              l,
              droppable.proportions.height,
              droppable.proportions.width
            );
          case "touch":
            return (
              ((y1 >= t && y1 <= b) ||
                (y2 >= t && y2 <= b) ||
                (y1 < t && y2 > b)) &&
              ((x1 >= l && x1 <= r) ||
                (x2 >= l && x2 <= r) ||
                (x1 < l && x2 > r))
            );
          default:
            return !1;
        }
      }),
      ($.ui.ddmanager = {
        current: null,
        droppables: { default: [] },
        prepareOffsets: function (t, event) {
          var m = $.ui.ddmanager.droppables[t.options.scope] || [],
            type = event ? event.type : null,
            list = (t.currentItem || t.element)
              .find(":data(droppable)")
              .andSelf();
          droppablesLoop: for (var i = 0; i < m.length; i++)
            if (
              !(
                m[i].options.disabled ||
                (t &&
                  !m[i].accept.call(
                    m[i].element[0],
                    t.currentItem || t.element
                  ))
              )
            ) {
              for (var j = 0; j < list.length; j++)
                if (list[j] == m[i].element[0]) {
                  m[i].proportions.height = 0;
                  continue droppablesLoop;
                }
              (m[i].visible = "none" != m[i].element.css("display")),
                m[i].visible &&
                  ((m[i].offset = m[i].element.offset()),
                  (m[i].proportions = {
                    width: m[i].element[0].offsetWidth,
                    height: m[i].element[0].offsetHeight,
                  }),
                  "mousedown" == type && m[i]._activate.call(m[i], event));
            }
        },
        drop: function (draggable, event) {
          var dropped = !1;
          return (
            $.each(
              $.ui.ddmanager.droppables[draggable.options.scope] || [],
              function () {
                this.options &&
                  (!this.options.disabled &&
                    this.visible &&
                    $.ui.intersect(draggable, this, this.options.tolerance) &&
                    (dropped = dropped || this._drop.call(this, event)),
                  !this.options.disabled &&
                    this.visible &&
                    this.accept.call(
                      this.element[0],
                      draggable.currentItem || draggable.element
                    ) &&
                    ((this.isout = 1),
                    (this.isover = 0),
                    this._deactivate.call(this, event)));
              }
            ),
            dropped
          );
        },
        drag: function (draggable, event) {
          draggable.options.refreshPositions &&
            $.ui.ddmanager.prepareOffsets(draggable, event),
            $.each(
              $.ui.ddmanager.droppables[draggable.options.scope] || [],
              function () {
                if (
                  !this.options.disabled &&
                  !this.greedyChild &&
                  this.visible
                ) {
                  var intersects = $.ui.intersect(
                      draggable,
                      this,
                      this.options.tolerance
                    ),
                    c =
                      intersects || 1 != this.isover
                        ? intersects && 0 == this.isover
                          ? "isover"
                          : null
                        : "isout";
                  if (c) {
                    var parentInstance;
                    if (this.options.greedy) {
                      var parent = this.element.parents(
                        ":data(droppable):eq(0)"
                      );
                      parent.length &&
                        ((parentInstance = $.data(
                          parent[0],
                          "droppable"
                        )).greedyChild = "isover" == c ? 1 : 0);
                    }
                    parentInstance &&
                      "isover" == c &&
                      ((parentInstance.isover = 0),
                      (parentInstance.isout = 1),
                      parentInstance._out.call(parentInstance, event)),
                      (this[c] = 1),
                      (this["isout" == c ? "isover" : "isout"] = 0),
                      this["isover" == c ? "_over" : "_out"].call(this, event),
                      parentInstance &&
                        "isout" == c &&
                        ((parentInstance.isout = 0),
                        (parentInstance.isover = 1),
                        parentInstance._over.call(parentInstance, event));
                  }
                }
              }
            );
        },
      });
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.resizable", $.ui.mouse, {
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 1e3,
      },
      _create: function () {
        var self = this,
          o = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          $.extend(this, {
            _aspectRatio: !!o.aspectRatio,
            aspectRatio: o.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              o.helper || o.ghost || o.animate
                ? o.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /canvas|textarea|input|select|button|img/i
          ) &&
            (/relative/.test(this.element.css("position")) &&
              $.browser.opera &&
              this.element.css({
                position: "relative",
                top: "auto",
                left: "auto",
              }),
            this.element.wrap(
              $('<div class="ui-wrapper" style="overflow: hidden;"></div>').css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("resizable", this.element.data("resizable"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin"),
            }),
            this._proportionallyResize()),
          (this.handles =
            o.handles ||
            ($(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          this.handles.constructor == String)
        ) {
          "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
          var n = this.handles.split(",");
          this.handles = {};
          for (var i = 0; i < n.length; i++) {
            var handle = $.trim(n[i]),
              hname,
              axis = $(
                '<div class="ui-resizable-handle ' +
                  ("ui-resizable-" + handle) +
                  '"></div>'
              );
            /sw|se|ne|nw/.test(handle) && axis.css({ zIndex: ++o.zIndex }),
              "se" == handle &&
                axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[handle] = ".ui-resizable-" + handle),
              this.element.append(axis);
          }
        }
        (this._renderAxis = function (target) {
          for (var i in ((target = target || this.element), this.handles)) {
            if (
              (this.handles[i].constructor == String &&
                (this.handles[i] = $(this.handles[i], this.element).show()),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /textarea|input|select|button/i
                ))
            ) {
              var axis = $(this.handles[i], this.element),
                padWrapper = 0;
              padWrapper = /sw|ne|nw|se|n|s/.test(i)
                ? axis.outerHeight()
                : axis.outerWidth();
              var padPos = [
                "padding",
                /ne|nw|n/.test(i)
                  ? "Top"
                  : /se|sw|s/.test(i)
                  ? "Bottom"
                  : /^e$/.test(i)
                  ? "Right"
                  : "Left",
              ].join("");
              target.css(padPos, padWrapper), this._proportionallyResize();
            }
            $(this.handles[i]).length;
          }
        }),
          this._renderAxis(this.element),
          (this._handles = $(
            ".ui-resizable-handle",
            this.element
          ).disableSelection()),
          this._handles.mouseover(function () {
            if (!self.resizing) {
              if (this.className)
                var axis = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                );
              self.axis = axis && axis[1] ? axis[1] : "se";
            }
          }),
          o.autoHide &&
            (this._handles.hide(),
            $(this.element)
              .addClass("ui-resizable-autohide")
              .hover(
                function () {
                  $(this).removeClass("ui-resizable-autohide"),
                    self._handles.show();
                },
                function () {
                  self.resizing ||
                    ($(this).addClass("ui-resizable-autohide"),
                    self._handles.hide());
                }
              )),
          this._mouseInit();
      },
      destroy: function () {
        this._mouseDestroy();
        var _destroy = function (exp) {
          $(exp)
            .removeClass(
              "ui-resizable ui-resizable-disabled ui-resizable-resizing"
            )
            .removeData("resizable")
            .unbind(".resizable")
            .find(".ui-resizable-handle")
            .remove();
        };
        if (this.elementIsWrapper) {
          _destroy(this.element);
          var wrapper = this.element;
          wrapper
            .after(
              this.originalElement.css({
                position: wrapper.css("position"),
                width: wrapper.outerWidth(),
                height: wrapper.outerHeight(),
                top: wrapper.css("top"),
                left: wrapper.css("left"),
              })
            )
            .remove();
        }
        return (
          this.originalElement.css("resize", this.originalResizeStyle),
          _destroy(this.originalElement),
          this
        );
      },
      _mouseCapture: function (event) {
        var handle = !1;
        for (var i in this.handles)
          $(this.handles[i])[0] == event.target && (handle = !0);
        return !this.options.disabled && handle;
      },
      _mouseStart: function (event) {
        var o = this.options,
          iniPos = this.element.position(),
          el = this.element;
        (this.resizing = !0),
          (this.documentScroll = {
            top: $(document).scrollTop(),
            left: $(document).scrollLeft(),
          }),
          (el.is(".ui-draggable") || /absolute/.test(el.css("position"))) &&
            el.css({
              position: "absolute",
              top: iniPos.top,
              left: iniPos.left,
            }),
          $.browser.opera &&
            /relative/.test(el.css("position")) &&
            el.css({ position: "relative", top: "auto", left: "auto" }),
          this._renderProxy();
        var curleft = num(this.helper.css("left")),
          curtop = num(this.helper.css("top"));
        o.containment &&
          ((curleft += $(o.containment).scrollLeft() || 0),
          (curtop += $(o.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: curleft, top: curtop }),
          (this.size = this._helper
            ? { width: el.outerWidth(), height: el.outerHeight() }
            : { width: el.width(), height: el.height() }),
          (this.originalSize = this._helper
            ? { width: el.outerWidth(), height: el.outerHeight() }
            : { width: el.width(), height: el.height() }),
          (this.originalPosition = { left: curleft, top: curtop }),
          (this.sizeDiff = {
            width: el.outerWidth() - el.width(),
            height: el.outerHeight() - el.height(),
          }),
          (this.originalMousePosition = {
            left: event.pageX,
            top: event.pageY,
          }),
          (this.aspectRatio =
            "number" == typeof o.aspectRatio
              ? o.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1);
        var cursor = $(".ui-resizable-" + this.axis).css("cursor");
        return (
          $("body").css(
            "cursor",
            "auto" == cursor ? this.axis + "-resize" : cursor
          ),
          el.addClass("ui-resizable-resizing"),
          this._propagate("start", event),
          !0
        );
      },
      _mouseDrag: function (event) {
        var el = this.helper,
          o = this.options,
          self = this,
          smp = this.originalMousePosition,
          a = this.axis,
          dx = event.pageX - smp.left || 0,
          dy = event.pageY - smp.top || 0,
          trigger = this._change[a];
        if (!trigger) return !1;
        var data = trigger.apply(this, [event, dx, dy]),
          ie6 = $.browser.msie && $.browser.version < 7,
          csdif = this.sizeDiff;
        return (
          (this._aspectRatio || event.shiftKey) &&
            (data = this._updateRatio(data, event)),
          (data = this._respectSize(data, event)),
          this._propagate("resize", event),
          el.css({
            top: this.position.top + "px",
            left: this.position.left + "px",
            width: this.size.width + "px",
            height: this.size.height + "px",
          }),
          !this._helper &&
            this._proportionallyResizeElements.length &&
            this._proportionallyResize(),
          this._updateCache(data),
          this._trigger("resize", event, this.ui()),
          !1
        );
      },
      _mouseStop: function (event) {
        this.resizing = !1;
        var o = this.options,
          self = this;
        if (this._helper) {
          var pr = this._proportionallyResizeElements,
            ista = pr.length && /textarea/i.test(pr[0].nodeName),
            soffseth =
              ista && $.ui.hasScroll(pr[0], "left") ? 0 : this.sizeDiff.height,
            soffsetw = ista ? 0 : this.sizeDiff.width,
            s = {
              width: this.size.width - soffsetw,
              height: this.size.height - soffseth,
            },
            left =
              parseInt(this.element.css("left"), 10) +
                (this.position.left - this.originalPosition.left) || null,
            top =
              parseInt(this.element.css("top"), 10) +
                (this.position.top - this.originalPosition.top) || null;
          o.animate || this.element.css($.extend(s, { top: top, left: left })),
            this.helper.height(this.size.height),
            this.helper.width(this.size.width),
            this._helper && !o.animate && this._proportionallyResize();
        }
        return (
          $("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", event),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updateCache: function (data) {
        var o = this.options;
        (this.offset = this.helper.offset()),
          isNumber(data.left) && (this.position.left = data.left),
          isNumber(data.top) && (this.position.top = data.top),
          isNumber(data.height) && (this.size.height = data.height),
          isNumber(data.width) && (this.size.width = data.width);
      },
      _updateRatio: function (data, event) {
        var o = this.options,
          cpos = this.position,
          csize = this.size,
          a = this.axis;
        return (
          data.height
            ? (data.width = csize.height * this.aspectRatio)
            : data.width && (data.height = csize.width / this.aspectRatio),
          "sw" == a &&
            ((data.left = cpos.left + (csize.width - data.width)),
            (data.top = null)),
          "nw" == a &&
            ((data.top = cpos.top + (csize.height - data.height)),
            (data.left = cpos.left + (csize.width - data.width))),
          data
        );
      },
      _respectSize: function (data, event) {
        var el = this.helper,
          o = this.options,
          pRatio = this._aspectRatio || event.shiftKey,
          a = this.axis,
          ismaxw =
            isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
          ismaxh =
            isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
          isminw =
            isNumber(data.width) && o.minWidth && o.minWidth > data.width,
          isminh =
            isNumber(data.height) && o.minHeight && o.minHeight > data.height;
        isminw && (data.width = o.minWidth),
          isminh && (data.height = o.minHeight),
          ismaxw && (data.width = o.maxWidth),
          ismaxh && (data.height = o.maxHeight);
        var dw = this.originalPosition.left + this.originalSize.width,
          dh = this.position.top + this.size.height,
          cw = /sw|nw|w/.test(a),
          ch = /nw|ne|n/.test(a);
        isminw && cw && (data.left = dw - o.minWidth),
          ismaxw && cw && (data.left = dw - o.maxWidth),
          isminh && ch && (data.top = dh - o.minHeight),
          ismaxh && ch && (data.top = dh - o.maxHeight);
        var isNotwh = !data.width && !data.height;
        return (
          isNotwh && !data.left && data.top
            ? (data.top = null)
            : isNotwh && !data.top && data.left && (data.left = null),
          data
        );
      },
      _proportionallyResize: function () {
        var o = this.options;
        if (this._proportionallyResizeElements.length)
          for (
            var element = this.helper || this.element, i = 0;
            i < this._proportionallyResizeElements.length;
            i++
          ) {
            var prel = this._proportionallyResizeElements[i];
            if (!this.borderDif) {
              var b = [
                  prel.css("borderTopWidth"),
                  prel.css("borderRightWidth"),
                  prel.css("borderBottomWidth"),
                  prel.css("borderLeftWidth"),
                ],
                p = [
                  prel.css("paddingTop"),
                  prel.css("paddingRight"),
                  prel.css("paddingBottom"),
                  prel.css("paddingLeft"),
                ];
              this.borderDif = $.map(b, function (v, i) {
                var border, padding;
                return (parseInt(v, 10) || 0) + (parseInt(p[i], 10) || 0);
              });
            }
            ($.browser.msie &&
              ($(element).is(":hidden") ||
                $(element).parents(":hidden").length)) ||
              prel.css({
                height:
                  element.height() - this.borderDif[0] - this.borderDif[2] || 0,
                width:
                  element.width() - this.borderDif[1] - this.borderDif[3] || 0,
              });
          }
      },
      _renderProxy: function () {
        var el = this.element,
          o = this.options;
        if (((this.elementOffset = el.offset()), this._helper)) {
          this.helper =
            this.helper || $('<div style="overflow:hidden;"></div>');
          var ie6 = $.browser.msie && $.browser.version < 7,
            ie6offset = ie6 ? 1 : 0,
            pxyoffset = ie6 ? 2 : -1;
          this.helper.addClass(this._helper).css({
            width: this.element.outerWidth() + pxyoffset,
            height: this.element.outerHeight() + pxyoffset,
            position: "absolute",
            left: this.elementOffset.left - ie6offset + "px",
            top: this.elementOffset.top - ie6offset + "px",
            zIndex: ++o.zIndex,
          }),
            this.helper.appendTo("body").disableSelection();
        } else this.helper = this.element;
      },
      _change: {
        e: function (event, dx, dy) {
          return { width: this.originalSize.width + dx };
        },
        w: function (event, dx, dy) {
          var o = this.options,
            cs = this.originalSize,
            sp;
          return {
            left: this.originalPosition.left + dx,
            width: cs.width - dx,
          };
        },
        n: function (event, dx, dy) {
          var o = this.options,
            cs = this.originalSize,
            sp;
          return {
            top: this.originalPosition.top + dy,
            height: cs.height - dy,
          };
        },
        s: function (event, dx, dy) {
          return { height: this.originalSize.height + dy };
        },
        se: function (event, dx, dy) {
          return $.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [event, dx, dy])
          );
        },
        sw: function (event, dx, dy) {
          return $.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [event, dx, dy])
          );
        },
        ne: function (event, dx, dy) {
          return $.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [event, dx, dy])
          );
        },
        nw: function (event, dx, dy) {
          return $.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [event, dx, dy])
          );
        },
      },
      _propagate: function (n, event) {
        $.ui.plugin.call(this, n, [event, this.ui()]),
          "resize" != n && this._trigger(n, event, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
      $.extend($.ui.resizable, { version: "1.8.7" }),
      $.ui.plugin.add("resizable", "alsoResize", {
        start: function (event, ui) {
          var self,
            o = $(this).data("resizable").options,
            _store = function (exp) {
              $(exp).each(function () {
                var el = $(this);
                el.data("resizable-alsoresize", {
                  width: parseInt(el.width(), 10),
                  height: parseInt(el.height(), 10),
                  left: parseInt(el.css("left"), 10),
                  top: parseInt(el.css("top"), 10),
                  position: el.css("position"),
                });
              });
            };
          "object" != typeof o.alsoResize || o.alsoResize.parentNode
            ? _store(o.alsoResize)
            : o.alsoResize.length
            ? ((o.alsoResize = o.alsoResize[0]), _store(o.alsoResize))
            : $.each(o.alsoResize, function (exp) {
                _store(exp);
              });
        },
        resize: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            os = self.originalSize,
            op = self.originalPosition,
            delta = {
              height: self.size.height - os.height || 0,
              width: self.size.width - os.width || 0,
              top: self.position.top - op.top || 0,
              left: self.position.left - op.left || 0,
            },
            _alsoResize = function (exp, c) {
              $(exp).each(function () {
                var el = $(this),
                  start = $(this).data("resizable-alsoresize"),
                  style = {},
                  css =
                    c && c.length
                      ? c
                      : el.parents(ui.originalElement[0]).length
                      ? ["width", "height"]
                      : ["width", "height", "top", "left"];
                $.each(css, function (i, prop) {
                  var sum = (start[prop] || 0) + (delta[prop] || 0);
                  sum && sum >= 0 && (style[prop] = sum || null);
                }),
                  $.browser.opera &&
                    /relative/.test(el.css("position")) &&
                    ((self._revertToRelativePosition = !0),
                    el.css({
                      position: "absolute",
                      top: "auto",
                      left: "auto",
                    })),
                  el.css(style);
              });
            };
          "object" != typeof o.alsoResize || o.alsoResize.nodeType
            ? _alsoResize(o.alsoResize)
            : $.each(o.alsoResize, function (exp, c) {
                _alsoResize(exp, c);
              });
        },
        stop: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            _reset = function (exp) {
              $(exp).each(function () {
                var el = $(this);
                el.css({ position: el.data("resizable-alsoresize").position });
              });
            };
          self._revertToRelativePosition &&
            ((self._revertToRelativePosition = !1),
            "object" != typeof o.alsoResize || o.alsoResize.nodeType
              ? _reset(o.alsoResize)
              : $.each(o.alsoResize, function (exp) {
                  _reset(exp);
                })),
            $(this).removeData("resizable-alsoresize");
        },
      }),
      $.ui.plugin.add("resizable", "animate", {
        stop: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            pr = self._proportionallyResizeElements,
            ista = pr.length && /textarea/i.test(pr[0].nodeName),
            soffseth =
              ista && $.ui.hasScroll(pr[0], "left") ? 0 : self.sizeDiff.height,
            soffsetw = ista ? 0 : self.sizeDiff.width,
            style = {
              width: self.size.width - soffsetw,
              height: self.size.height - soffseth,
            },
            left =
              parseInt(self.element.css("left"), 10) +
                (self.position.left - self.originalPosition.left) || null,
            top =
              parseInt(self.element.css("top"), 10) +
                (self.position.top - self.originalPosition.top) || null;
          self.element.animate(
            $.extend(style, top && left ? { top: top, left: left } : {}),
            {
              duration: o.animateDuration,
              easing: o.animateEasing,
              step: function () {
                var data = {
                  width: parseInt(self.element.css("width"), 10),
                  height: parseInt(self.element.css("height"), 10),
                  top: parseInt(self.element.css("top"), 10),
                  left: parseInt(self.element.css("left"), 10),
                };
                pr &&
                  pr.length &&
                  $(pr[0]).css({ width: data.width, height: data.height }),
                  self._updateCache(data),
                  self._propagate("resize", event);
              },
            }
          );
        },
      }),
      $.ui.plugin.add("resizable", "containment", {
        start: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            el = self.element,
            oc = o.containment,
            ce =
              oc instanceof $
                ? oc.get(0)
                : /parent/.test(oc)
                ? el.parent().get(0)
                : oc;
          if (ce)
            if (
              ((self.containerElement = $(ce)),
              /document/.test(oc) || oc == document)
            )
              (self.containerOffset = { left: 0, top: 0 }),
                (self.containerPosition = { left: 0, top: 0 }),
                (self.parentData = {
                  element: $(document),
                  left: 0,
                  top: 0,
                  width: $(document).width(),
                  height:
                    $(document).height() ||
                    document.body.parentNode.scrollHeight,
                });
            else {
              var element = $(ce),
                p = [];
              $(["Top", "Right", "Left", "Bottom"]).each(function (i, name) {
                p[i] = num(element.css("padding" + name));
              }),
                (self.containerOffset = element.offset()),
                (self.containerPosition = element.position()),
                (self.containerSize = {
                  height: element.innerHeight() - p[3],
                  width: element.innerWidth() - p[1],
                });
              var co = self.containerOffset,
                ch = self.containerSize.height,
                cw = self.containerSize.width,
                width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw,
                height = $.ui.hasScroll(ce) ? ce.scrollHeight : ch;
              self.parentData = {
                element: ce,
                left: co.left,
                top: co.top,
                width: width,
                height: height,
              };
            }
        },
        resize: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            ps = self.containerSize,
            co = self.containerOffset,
            cs = self.size,
            cp = self.position,
            pRatio = self._aspectRatio || event.shiftKey,
            cop = { top: 0, left: 0 },
            ce = self.containerElement;
          ce[0] != document && /static/.test(ce.css("position")) && (cop = co),
            cp.left < (self._helper ? co.left : 0) &&
              ((self.size.width =
                self.size.width +
                (self._helper
                  ? self.position.left - co.left
                  : self.position.left - cop.left)),
              pRatio && (self.size.height = self.size.width / o.aspectRatio),
              (self.position.left = o.helper ? co.left : 0)),
            cp.top < (self._helper ? co.top : 0) &&
              ((self.size.height =
                self.size.height +
                (self._helper
                  ? self.position.top - co.top
                  : self.position.top)),
              pRatio && (self.size.width = self.size.height * o.aspectRatio),
              (self.position.top = self._helper ? co.top : 0)),
            (self.offset.left = self.parentData.left + self.position.left),
            (self.offset.top = self.parentData.top + self.position.top);
          var woset = Math.abs(
              (self._helper, self.offset.left - cop.left + self.sizeDiff.width)
            ),
            hoset = Math.abs(
              (self._helper
                ? self.offset.top - cop.top
                : self.offset.top - co.top) + self.sizeDiff.height
            ),
            isParent =
              self.containerElement.get(0) == self.element.parent().get(0),
            isOffsetRelative = /relative|absolute/.test(
              self.containerElement.css("position")
            );
          isParent && isOffsetRelative && (woset -= self.parentData.left),
            woset + self.size.width >= self.parentData.width &&
              ((self.size.width = self.parentData.width - woset),
              pRatio &&
                (self.size.height = self.size.width / self.aspectRatio)),
            hoset + self.size.height >= self.parentData.height &&
              ((self.size.height = self.parentData.height - hoset),
              pRatio &&
                (self.size.width = self.size.height * self.aspectRatio));
        },
        stop: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            cp = self.position,
            co = self.containerOffset,
            cop = self.containerPosition,
            ce = self.containerElement,
            helper = $(self.helper),
            ho = helper.offset(),
            w = helper.outerWidth() - self.sizeDiff.width,
            h = helper.outerHeight() - self.sizeDiff.height;
          self._helper &&
            !o.animate &&
            /relative/.test(ce.css("position")) &&
            $(this).css({
              left: ho.left - cop.left - co.left,
              width: w,
              height: h,
            }),
            self._helper &&
              !o.animate &&
              /static/.test(ce.css("position")) &&
              $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h,
              });
        },
      }),
      $.ui.plugin.add("resizable", "ghost", {
        start: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            cs = self.size;
          (self.ghost = self.originalElement.clone()),
            self.ghost
              .css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0,
              })
              .addClass("ui-resizable-ghost")
              .addClass("string" == typeof o.ghost ? o.ghost : ""),
            self.ghost.appendTo(self.helper);
        },
        resize: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options;
          self.ghost &&
            self.ghost.css({
              position: "relative",
              height: self.size.height,
              width: self.size.width,
            });
        },
        stop: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options;
          self.ghost &&
            self.helper &&
            self.helper.get(0).removeChild(self.ghost.get(0));
        },
      }),
      $.ui.plugin.add("resizable", "grid", {
        resize: function (event, ui) {
          var self = $(this).data("resizable"),
            o = self.options,
            cs = self.size,
            os = self.originalSize,
            op = self.originalPosition,
            a = self.axis,
            ratio = o._aspectRatio || event.shiftKey;
          o.grid = "number" == typeof o.grid ? [o.grid, o.grid] : o.grid;
          var ox =
              Math.round((cs.width - os.width) / (o.grid[0] || 1)) *
              (o.grid[0] || 1),
            oy =
              Math.round((cs.height - os.height) / (o.grid[1] || 1)) *
              (o.grid[1] || 1);
          /^(se|s|e)$/.test(a)
            ? ((self.size.width = os.width + ox),
              (self.size.height = os.height + oy))
            : /^(ne)$/.test(a)
            ? ((self.size.width = os.width + ox),
              (self.size.height = os.height + oy),
              (self.position.top = op.top - oy))
            : /^(sw)$/.test(a)
            ? ((self.size.width = os.width + ox),
              (self.size.height = os.height + oy),
              (self.position.left = op.left - ox))
            : ((self.size.width = os.width + ox),
              (self.size.height = os.height + oy),
              (self.position.top = op.top - oy),
              (self.position.left = op.left - ox));
        },
      });
    var num = function (v) {
        return parseInt(v, 10) || 0;
      },
      isNumber = function (value) {
        return !isNaN(parseInt(value, 10));
      };
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.selectable", $.ui.mouse, {
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
      },
      _create: function () {
        var self = this,
          selectees;
        this.element.addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (selectees = $(self.options.filter, self.element[0])).each(
              function () {
                var $this = $(this),
                  pos = $this.offset();
                $.data(this, "selectable-item", {
                  element: this,
                  $element: $this,
                  left: pos.left,
                  top: pos.top,
                  right: pos.left + $this.outerWidth(),
                  bottom: pos.top + $this.outerHeight(),
                  startselected: !1,
                  selected: $this.hasClass("ui-selected"),
                  selecting: $this.hasClass("ui-selecting"),
                  unselecting: $this.hasClass("ui-unselecting"),
                });
              }
            );
          }),
          this.refresh(),
          (this.selectees = selectees.addClass("ui-selectee")),
          this._mouseInit(),
          (this.helper = $("<div class='ui-selectable-helper'></div>"));
      },
      destroy: function () {
        return (
          this.selectees
            .removeClass("ui-selectee")
            .removeData("selectable-item"),
          this.element
            .removeClass("ui-selectable ui-selectable-disabled")
            .removeData("selectable")
            .unbind(".selectable"),
          this._mouseDestroy(),
          this
        );
      },
      _mouseStart: function (event) {
        var self = this;
        if (
          ((this.opos = [event.pageX, event.pageY]), !this.options.disabled)
        ) {
          var options = this.options;
          (this.selectees = $(options.filter, this.element[0])),
            this._trigger("start", event),
            $(options.appendTo).append(this.helper),
            this.helper.css({
              left: event.clientX,
              top: event.clientY,
              width: 0,
              height: 0,
            }),
            options.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var selectee = $.data(this, "selectable-item");
              (selectee.startselected = !0),
                event.metaKey ||
                  (selectee.$element.removeClass("ui-selected"),
                  (selectee.selected = !1),
                  selectee.$element.addClass("ui-unselecting"),
                  (selectee.unselecting = !0),
                  self._trigger("unselecting", event, {
                    unselecting: selectee.element,
                  }));
            }),
            $(event.target)
              .parents()
              .andSelf()
              .each(function () {
                var selectee = $.data(this, "selectable-item");
                if (selectee) {
                  var doSelect =
                    !event.metaKey ||
                    !selectee.$element.hasClass("ui-selected");
                  return (
                    selectee.$element
                      .removeClass(doSelect ? "ui-unselecting" : "ui-selected")
                      .addClass(doSelect ? "ui-selecting" : "ui-unselecting"),
                    (selectee.unselecting = !doSelect),
                    (selectee.selecting = doSelect),
                    (selectee.selected = doSelect),
                    doSelect
                      ? self._trigger("selecting", event, {
                          selecting: selectee.element,
                        })
                      : self._trigger("unselecting", event, {
                          unselecting: selectee.element,
                        }),
                    !1
                  );
                }
              });
        }
      },
      _mouseDrag: function (event) {
        var self = this;
        if (((this.dragged = !0), !this.options.disabled)) {
          var options = this.options,
            x1 = this.opos[0],
            y1 = this.opos[1],
            x2 = event.pageX,
            y2 = event.pageY;
          if (x1 > x2) {
            var tmp = x2;
            (x2 = x1), (x1 = tmp);
          }
          if (y1 > y2) {
            var tmp = y2;
            (y2 = y1), (y1 = tmp);
          }
          return (
            this.helper.css({
              left: x1,
              top: y1,
              width: x2 - x1,
              height: y2 - y1,
            }),
            this.selectees.each(function () {
              var selectee = $.data(this, "selectable-item");
              if (selectee && selectee.element != self.element[0]) {
                var hit = !1;
                "touch" == options.tolerance
                  ? (hit = !(
                      selectee.left > x2 ||
                      selectee.right < x1 ||
                      selectee.top > y2 ||
                      selectee.bottom < y1
                    ))
                  : "fit" == options.tolerance &&
                    (hit =
                      selectee.left > x1 &&
                      selectee.right < x2 &&
                      selectee.top > y1 &&
                      selectee.bottom < y2),
                  hit
                    ? (selectee.selected &&
                        (selectee.$element.removeClass("ui-selected"),
                        (selectee.selected = !1)),
                      selectee.unselecting &&
                        (selectee.$element.removeClass("ui-unselecting"),
                        (selectee.unselecting = !1)),
                      selectee.selecting ||
                        (selectee.$element.addClass("ui-selecting"),
                        (selectee.selecting = !0),
                        self._trigger("selecting", event, {
                          selecting: selectee.element,
                        })))
                    : (selectee.selecting &&
                        (event.metaKey && selectee.startselected
                          ? (selectee.$element.removeClass("ui-selecting"),
                            (selectee.selecting = !1),
                            selectee.$element.addClass("ui-selected"),
                            (selectee.selected = !0))
                          : (selectee.$element.removeClass("ui-selecting"),
                            (selectee.selecting = !1),
                            selectee.startselected &&
                              (selectee.$element.addClass("ui-unselecting"),
                              (selectee.unselecting = !0)),
                            self._trigger("unselecting", event, {
                              unselecting: selectee.element,
                            }))),
                      selectee.selected &&
                        (event.metaKey ||
                          selectee.startselected ||
                          (selectee.$element.removeClass("ui-selected"),
                          (selectee.selected = !1),
                          selectee.$element.addClass("ui-unselecting"),
                          (selectee.unselecting = !0),
                          self._trigger("unselecting", event, {
                            unselecting: selectee.element,
                          }))));
              }
            }),
            !1
          );
        }
      },
      _mouseStop: function (event) {
        var self = this;
        this.dragged = !1;
        var options = this.options;
        return (
          $(".ui-unselecting", this.element[0]).each(function () {
            var selectee = $.data(this, "selectable-item");
            selectee.$element.removeClass("ui-unselecting"),
              (selectee.unselecting = !1),
              (selectee.startselected = !1),
              self._trigger("unselected", event, {
                unselected: selectee.element,
              });
          }),
          $(".ui-selecting", this.element[0]).each(function () {
            var selectee = $.data(this, "selectable-item");
            selectee.$element
              .removeClass("ui-selecting")
              .addClass("ui-selected"),
              (selectee.selecting = !1),
              (selectee.selected = !0),
              (selectee.startselected = !0),
              self._trigger("selected", event, { selected: selectee.element });
          }),
          this._trigger("stop", event),
          this.helper.remove(),
          !1
        );
      },
    }),
      $.extend($.ui.selectable, { version: "1.8.7" });
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.sortable", $.ui.mouse, {
      widgetEventPrefix: "sort",
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3,
      },
      _create: function () {
        var o = this.options;
        (this.containerCache = {}),
          this.element.addClass("ui-sortable"),
          this.refresh(),
          (this.floating =
            !!this.items.length &&
            /left|right/.test(this.items[0].item.css("float"))),
          (this.offset = this.element.offset()),
          this._mouseInit();
      },
      destroy: function () {
        this.element
          .removeClass("ui-sortable ui-sortable-disabled")
          .removeData("sortable")
          .unbind(".sortable"),
          this._mouseDestroy();
        for (var i = this.items.length - 1; i >= 0; i--)
          this.items[i].item.removeData("sortable-item");
        return this;
      },
      _setOption: function (key, value) {
        "disabled" === key
          ? ((this.options[key] = value),
            this.widget()[value ? "addClass" : "removeClass"](
              "ui-sortable-disabled"
            ))
          : $.Widget.prototype._setOption.apply(this, arguments);
      },
      _mouseCapture: function (event, overrideHandle) {
        if (this.reverting) return !1;
        if (this.options.disabled || "static" == this.options.type) return !1;
        this._refreshItems(event);
        var currentItem = null,
          self = this,
          nodes = $(event.target)
            .parents()
            .each(function () {
              if ($.data(this, "sortable-item") == self)
                return (currentItem = $(this)), !1;
            });
        if (
          ($.data(event.target, "sortable-item") == self &&
            (currentItem = $(event.target)),
          !currentItem)
        )
          return !1;
        if (this.options.handle && !overrideHandle) {
          var validHandle = !1;
          if (
            ($(this.options.handle, currentItem)
              .find("*")
              .andSelf()
              .each(function () {
                this == event.target && (validHandle = !0);
              }),
            !validHandle)
          )
            return !1;
        }
        return (
          (this.currentItem = currentItem), this._removeCurrentsFromItems(), !0
        );
      },
      _mouseStart: function (event, overrideHandle, noActivation) {
        var o = this.options,
          self = this;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(event)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          $.extend(this.offset, {
            click: {
              left: event.pageX - this.offset.left,
              top: event.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          (this.originalPosition = this._generatePosition(event)),
          (this.originalPageX = event.pageX),
          (this.originalPageY = event.pageY),
          o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] != this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          o.containment && this._setContainment(),
          o.cursor &&
            ($("body").css("cursor") &&
              (this._storedCursor = $("body").css("cursor")),
            $("body").css("cursor", o.cursor)),
          o.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
          o.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
          this.scrollParent[0] != document &&
            "HTML" != this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", event, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !noActivation)
        )
          for (var i = this.containers.length - 1; i >= 0; i--)
            this.containers[i]._trigger("activate", event, this._uiHash(this));
        return (
          $.ui.ddmanager && ($.ui.ddmanager.current = this),
          $.ui.ddmanager &&
            !o.dropBehaviour &&
            $.ui.ddmanager.prepareOffsets(this, event),
          (this.dragging = !0),
          this.helper.addClass("ui-sortable-helper"),
          this._mouseDrag(event),
          !0
        );
      },
      _mouseDrag: function (event) {
        if (
          ((this.position = this._generatePosition(event)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
          this.options.scroll)
        ) {
          var o = this.options,
            scrolled = !1;
          this.scrollParent[0] != document &&
          "HTML" != this.scrollParent[0].tagName
            ? (this.overflowOffset.top +
                this.scrollParent[0].offsetHeight -
                event.pageY <
              o.scrollSensitivity
                ? (this.scrollParent[0].scrollTop = scrolled =
                    this.scrollParent[0].scrollTop + o.scrollSpeed)
                : event.pageY - this.overflowOffset.top < o.scrollSensitivity &&
                  (this.scrollParent[0].scrollTop = scrolled =
                    this.scrollParent[0].scrollTop - o.scrollSpeed),
              this.overflowOffset.left +
                this.scrollParent[0].offsetWidth -
                event.pageX <
              o.scrollSensitivity
                ? (this.scrollParent[0].scrollLeft = scrolled =
                    this.scrollParent[0].scrollLeft + o.scrollSpeed)
                : event.pageX - this.overflowOffset.left <
                    o.scrollSensitivity &&
                  (this.scrollParent[0].scrollLeft = scrolled =
                    this.scrollParent[0].scrollLeft - o.scrollSpeed))
            : (event.pageY - $(document).scrollTop() < o.scrollSensitivity
                ? (scrolled = $(document).scrollTop(
                    $(document).scrollTop() - o.scrollSpeed
                  ))
                : $(window).height() - (event.pageY - $(document).scrollTop()) <
                    o.scrollSensitivity &&
                  (scrolled = $(document).scrollTop(
                    $(document).scrollTop() + o.scrollSpeed
                  )),
              event.pageX - $(document).scrollLeft() < o.scrollSensitivity
                ? (scrolled = $(document).scrollLeft(
                    $(document).scrollLeft() - o.scrollSpeed
                  ))
                : $(window).width() - (event.pageX - $(document).scrollLeft()) <
                    o.scrollSensitivity &&
                  (scrolled = $(document).scrollLeft(
                    $(document).scrollLeft() + o.scrollSpeed
                  ))),
            !1 !== scrolled &&
              $.ui.ddmanager &&
              !o.dropBehaviour &&
              $.ui.ddmanager.prepareOffsets(this, event);
        }
        (this.positionAbs = this._convertPositionTo("absolute")),
          (this.options.axis && "y" == this.options.axis) ||
            (this.helper[0].style.left = this.position.left + "px"),
          (this.options.axis && "x" == this.options.axis) ||
            (this.helper[0].style.top = this.position.top + "px");
        for (var i = this.items.length - 1; i >= 0; i--) {
          var item = this.items[i],
            itemElement = item.item[0],
            intersection = this._intersectsWithPointer(item);
          if (
            intersection &&
            !(
              itemElement == this.currentItem[0] ||
              this.placeholder[1 == intersection ? "next" : "prev"]()[0] ==
                itemElement ||
              $.ui.contains(this.placeholder[0], itemElement) ||
              ("semi-dynamic" == this.options.type &&
                $.ui.contains(this.element[0], itemElement))
            )
          ) {
            if (
              ((this.direction = 1 == intersection ? "down" : "up"),
              "pointer" != this.options.tolerance &&
                !this._intersectsWithSides(item))
            )
              break;
            this._rearrange(event, item),
              this._trigger("change", event, this._uiHash());
            break;
          }
        }
        return (
          this._contactContainers(event),
          $.ui.ddmanager && $.ui.ddmanager.drag(this, event),
          this._trigger("sort", event, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (event, noPropagation) {
        if (event) {
          if (
            ($.ui.ddmanager &&
              !this.options.dropBehaviour &&
              $.ui.ddmanager.drop(this, event),
            this.options.revert)
          ) {
            var self = this,
              cur = self.placeholder.offset();
            (self.reverting = !0),
              $(this.helper).animate(
                {
                  left:
                    cur.left -
                    this.offset.parent.left -
                    self.margins.left +
                    (this.offsetParent[0] == document.body
                      ? 0
                      : this.offsetParent[0].scrollLeft),
                  top:
                    cur.top -
                    this.offset.parent.top -
                    self.margins.top +
                    (this.offsetParent[0] == document.body
                      ? 0
                      : this.offsetParent[0].scrollTop),
                },
                parseInt(this.options.revert, 10) || 500,
                function () {
                  self._clear(event);
                }
              );
          } else this._clear(event, noPropagation);
          return !1;
        }
      },
      cancel: function () {
        var self = this;
        if (this.dragging) {
          this._mouseUp(),
            "original" == this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass("ui-sortable-helper")
              : this.currentItem.show();
          for (var i = this.containers.length - 1; i >= 0; i--)
            this.containers[i]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger("out", null, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        }
        return (
          this.placeholder[0].parentNode &&
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          "original" != this.options.helper &&
            this.helper &&
            this.helper[0].parentNode &&
            this.helper.remove(),
          $.extend(this, {
            helper: null,
            dragging: !1,
            reverting: !1,
            _noFinalSort: null,
          }),
          this.domPosition.prev
            ? $(this.domPosition.prev).after(this.currentItem)
            : $(this.domPosition.parent).prepend(this.currentItem),
          this
        );
      },
      serialize: function (o) {
        var items = this._getItemsAsjQuery(o && o.connected),
          str = [];
        return (
          (o = o || {}),
          $(items).each(function () {
            var res = ($(o.item || this).attr(o.attribute || "id") || "").match(
              o.expression || /(.+)[-=_](.+)/
            );
            res &&
              str.push(
                (o.key || res[1] + "[]") +
                  "=" +
                  (o.key && o.expression ? res[1] : res[2])
              );
          }),
          !str.length && o.key && str.push(o.key + "="),
          str.join("&")
        );
      },
      toArray: function (o) {
        var items = this._getItemsAsjQuery(o && o.connected),
          ret = [];
        return (
          (o = o || {}),
          items.each(function () {
            ret.push($(o.item || this).attr(o.attribute || "id") || "");
          }),
          ret
        );
      },
      _intersectsWith: function (item) {
        var x1 = this.positionAbs.left,
          x2 = x1 + this.helperProportions.width,
          y1 = this.positionAbs.top,
          y2 = y1 + this.helperProportions.height,
          l = item.left,
          r = l + item.width,
          t = item.top,
          b = t + item.height,
          dyClick = this.offset.click.top,
          dxClick = this.offset.click.left,
          isOverElement =
            y1 + dyClick > t &&
            y1 + dyClick < b &&
            x1 + dxClick > l &&
            x1 + dxClick < r;
        return "pointer" == this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" != this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              item[this.floating ? "width" : "height"])
          ? isOverElement
          : l < x1 + this.helperProportions.width / 2 &&
              x2 - this.helperProportions.width / 2 < r &&
              t < y1 + this.helperProportions.height / 2 &&
              y2 - this.helperProportions.height / 2 < b;
      },
      _intersectsWithPointer: function (item) {
        var isOverElementHeight = $.ui.isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            item.top,
            item.height
          ),
          isOverElementWidth = $.ui.isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            item.left,
            item.width
          ),
          isOverElement = isOverElementHeight && isOverElementWidth,
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();
        return (
          !!isOverElement &&
          (this.floating
            ? (horizontalDirection && "right" == horizontalDirection) ||
              "down" == verticalDirection
              ? 2
              : 1
            : verticalDirection && ("down" == verticalDirection ? 2 : 1))
        );
      },
      _intersectsWithSides: function (item) {
        var isOverBottomHalf = $.ui.isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            item.top + item.height / 2,
            item.height
          ),
          isOverRightHalf = $.ui.isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            item.left + item.width / 2,
            item.width
          ),
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();
        return this.floating && horizontalDirection
          ? ("right" == horizontalDirection && isOverRightHalf) ||
              ("left" == horizontalDirection && !isOverRightHalf)
          : verticalDirection &&
              (("down" == verticalDirection && isOverBottomHalf) ||
                ("up" == verticalDirection && !isOverBottomHalf));
      },
      _getDragVerticalDirection: function () {
        var delta = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 != delta && (delta > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var delta = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 != delta && (delta > 0 ? "right" : "left");
      },
      refresh: function (event) {
        return this._refreshItems(event), this.refreshPositions(), this;
      },
      _connectWith: function () {
        var options = this.options;
        return options.connectWith.constructor == String
          ? [options.connectWith]
          : options.connectWith;
      },
      _getItemsAsjQuery: function (connected) {
        var self = this,
          items = [],
          queries = [],
          connectWith = this._connectWith();
        if (connectWith && connected)
          for (var i = connectWith.length - 1; i >= 0; i--)
            for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
              var inst = $.data(cur[j], "sortable");
              inst &&
                inst != this &&
                !inst.options.disabled &&
                queries.push([
                  $.isFunction(inst.options.items)
                    ? inst.options.items.call(inst.element)
                    : $(inst.options.items, inst.element)
                        .not(".ui-sortable-helper")
                        .not(".ui-sortable-placeholder"),
                  inst,
                ]);
            }
        queries.push([
          $.isFunction(this.options.items)
            ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem,
              })
            : $(this.options.items, this.element)
                .not(".ui-sortable-helper")
                .not(".ui-sortable-placeholder"),
          this,
        ]);
        for (var i = queries.length - 1; i >= 0; i--)
          queries[i][0].each(function () {
            items.push(this);
          });
        return $(items);
      },
      _removeCurrentsFromItems: function () {
        for (
          var list = this.currentItem.find(":data(sortable-item)"), i = 0;
          i < this.items.length;
          i++
        )
          for (var j = 0; j < list.length; j++)
            list[j] == this.items[i].item[0] && this.items.splice(i, 1);
      },
      _refreshItems: function (event) {
        (this.items = []), (this.containers = [this]);
        var items = this.items,
          self = this,
          queries = [
            [
              $.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], event, {
                    item: this.currentItem,
                  })
                : $(this.options.items, this.element),
              this,
            ],
          ],
          connectWith = this._connectWith();
        if (connectWith)
          for (var i = connectWith.length - 1; i >= 0; i--)
            for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
              var inst = $.data(cur[j], "sortable");
              inst &&
                inst != this &&
                !inst.options.disabled &&
                (queries.push([
                  $.isFunction(inst.options.items)
                    ? inst.options.items.call(inst.element[0], event, {
                        item: this.currentItem,
                      })
                    : $(inst.options.items, inst.element),
                  inst,
                ]),
                this.containers.push(inst));
            }
        for (var i = queries.length - 1; i >= 0; i--)
          for (
            var targetData = queries[i][1],
              _queries = queries[i][0],
              j = 0,
              queriesLength = _queries.length;
            j < queriesLength;
            j++
          ) {
            var item = $(_queries[j]);
            item.data("sortable-item", targetData),
              items.push({
                item: item,
                instance: targetData,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
          }
      },
      refreshPositions: function (fast) {
        this.offsetParent &&
          this.helper &&
          (this.offset.parent = this._getParentOffset());
        for (var i = this.items.length - 1; i >= 0; i--) {
          var item = this.items[i],
            t = this.options.toleranceElement
              ? $(this.options.toleranceElement, item.item)
              : item.item;
          fast ||
            ((item.width = t.outerWidth()), (item.height = t.outerHeight()));
          var p = t.offset();
          (item.left = p.left), (item.top = p.top);
        }
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (var i = this.containers.length - 1; i >= 0; i--) {
            var p = this.containers[i].element.offset();
            (this.containers[i].containerCache.left = p.left),
              (this.containers[i].containerCache.top = p.top),
              (this.containers[i].containerCache.width =
                this.containers[i].element.outerWidth()),
              (this.containers[i].containerCache.height =
                this.containers[i].element.outerHeight());
          }
        return this;
      },
      _createPlaceholder: function (that) {
        var self = that || this,
          o = self.options;
        if (!o.placeholder || o.placeholder.constructor == String) {
          var className = o.placeholder;
          o.placeholder = {
            element: function () {
              var el = $(document.createElement(self.currentItem[0].nodeName))
                .addClass(
                  className ||
                    self.currentItem[0].className + " ui-sortable-placeholder"
                )
                .removeClass("ui-sortable-helper")[0];
              return className || (el.style.visibility = "hidden"), el;
            },
            update: function (container, p) {
              (className && !o.forcePlaceholderSize) ||
                (p.height() ||
                  p.height(
                    self.currentItem.innerHeight() -
                      parseInt(self.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(self.currentItem.css("paddingBottom") || 0, 10)
                  ),
                p.width() ||
                  p.width(
                    self.currentItem.innerWidth() -
                      parseInt(self.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(self.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          };
        }
        (self.placeholder = $(
          o.placeholder.element.call(self.element, self.currentItem)
        )),
          self.currentItem.after(self.placeholder),
          o.placeholder.update(self, self.placeholder);
      },
      _contactContainers: function (event) {
        for (
          var innermostContainer = null,
            innermostIndex = null,
            i = this.containers.length - 1;
          i >= 0;
          i--
        )
          if (
            !$.ui.contains(this.currentItem[0], this.containers[i].element[0])
          )
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (
                innermostContainer &&
                $.ui.contains(
                  this.containers[i].element[0],
                  innermostContainer.element[0]
                )
              )
                continue;
              (innermostContainer = this.containers[i]), (innermostIndex = i);
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger("out", event, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        if (innermostContainer)
          if (1 === this.containers.length)
            this.containers[innermostIndex]._trigger(
              "over",
              event,
              this._uiHash(this)
            ),
              (this.containers[innermostIndex].containerCache.over = 1);
          else if (this.currentContainer != this.containers[innermostIndex]) {
            for (
              var dist = 1e4,
                itemWithLeastDistance = null,
                base =
                  this.positionAbs[
                    this.containers[innermostIndex].floating ? "left" : "top"
                  ],
                j = this.items.length - 1;
              j >= 0;
              j--
            )
              if (
                $.ui.contains(
                  this.containers[innermostIndex].element[0],
                  this.items[j].item[0]
                )
              ) {
                var cur =
                  this.items[j][
                    this.containers[innermostIndex].floating ? "left" : "top"
                  ];
                Math.abs(cur - base) < dist &&
                  ((dist = Math.abs(cur - base)),
                  (itemWithLeastDistance = this.items[j]));
              }
            if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
            (this.currentContainer = this.containers[innermostIndex]),
              itemWithLeastDistance
                ? this._rearrange(event, itemWithLeastDistance, null, !0)
                : this._rearrange(
                    event,
                    null,
                    this.containers[innermostIndex].element,
                    !0
                  ),
              this._trigger("change", event, this._uiHash()),
              this.containers[innermostIndex]._trigger(
                "change",
                event,
                this._uiHash(this)
              ),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[innermostIndex]._trigger(
                "over",
                event,
                this._uiHash(this)
              ),
              (this.containers[innermostIndex].containerCache.over = 1);
          }
      },
      _createHelper: function (event) {
        var o = this.options,
          helper = $.isFunction(o.helper)
            ? $(o.helper.apply(this.element[0], [event, this.currentItem]))
            : "clone" == o.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          helper.parents("body").length ||
            $(
              "parent" != o.appendTo
                ? o.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(helper[0]),
          helper[0] == this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          ("" == helper[0].style.width || o.forceHelperSize) &&
            helper.width(this.currentItem.width()),
          ("" == helper[0].style.height || o.forceHelperSize) &&
            helper.height(this.currentItem.height()),
          helper
        );
      },
      _adjustOffsetFromHelper: function (obj) {
        "string" == typeof obj && (obj = obj.split(" ")),
          $.isArray(obj) && (obj = { left: +obj[0], top: +obj[1] || 0 }),
          "left" in obj &&
            (this.offset.click.left = obj.left + this.margins.left),
          "right" in obj &&
            (this.offset.click.left =
              this.helperProportions.width - obj.right + this.margins.left),
          "top" in obj && (this.offset.click.top = obj.top + this.margins.top),
          "bottom" in obj &&
            (this.offset.click.top =
              this.helperProportions.height - obj.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var po = this.offsetParent.offset();
        return (
          "absolute" == this.cssPosition &&
            this.scrollParent[0] != document &&
            $.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((po.left += this.scrollParent.scrollLeft()),
            (po.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] == document.body ||
            (this.offsetParent[0].tagName &&
              "html" == this.offsetParent[0].tagName.toLowerCase() &&
              $.browser.msie)) &&
            (po = { top: 0, left: 0 }),
          {
            top:
              po.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              po.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" == this.cssPosition) {
          var p = this.currentItem.position();
          return {
            top:
              p.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              p.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var o = this.options;
        if (
          ("parent" == o.containment &&
            (o.containment = this.helper[0].parentNode),
          ("document" != o.containment && "window" != o.containment) ||
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              $("document" == o.containment ? document : window).width() -
                this.helperProportions.width -
                this.margins.left,
              ($("document" == o.containment ? document : window).height() ||
                document.body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          !/^(document|window|parent)$/.test(o.containment))
        ) {
          var ce = $(o.containment)[0],
            co = $(o.containment).offset(),
            over = "hidden" != $(ce).css("overflow");
          this.containment = [
            co.left +
              (parseInt($(ce).css("borderLeftWidth"), 10) || 0) +
              (parseInt($(ce).css("paddingLeft"), 10) || 0) -
              this.margins.left,
            co.top +
              (parseInt($(ce).css("borderTopWidth"), 10) || 0) +
              (parseInt($(ce).css("paddingTop"), 10) || 0) -
              this.margins.top,
            co.left +
              (over
                ? Math.max(ce.scrollWidth, ce.offsetWidth)
                : ce.offsetWidth) -
              (parseInt($(ce).css("borderLeftWidth"), 10) || 0) -
              (parseInt($(ce).css("paddingRight"), 10) || 0) -
              this.helperProportions.width -
              this.margins.left,
            co.top +
              (over
                ? Math.max(ce.scrollHeight, ce.offsetHeight)
                : ce.offsetHeight) -
              (parseInt($(ce).css("borderTopWidth"), 10) || 0) -
              (parseInt($(ce).css("paddingBottom"), 10) || 0) -
              this.helperProportions.height -
              this.margins.top,
          ];
        }
      },
      _convertPositionTo: function (d, pos) {
        pos || (pos = this.position);
        var mod = "absolute" == d ? 1 : -1,
          o = this.options,
          scroll =
            "absolute" != this.cssPosition ||
            (this.scrollParent[0] != document &&
              $.ui.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
        return {
          top:
            pos.top +
            this.offset.relative.top * mod +
            this.offset.parent.top * mod -
            ($.browser.safari && "fixed" == this.cssPosition
              ? 0
              : ("fixed" == this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : scrollIsRootNode
                  ? 0
                  : scroll.scrollTop()) * mod),
          left:
            pos.left +
            this.offset.relative.left * mod +
            this.offset.parent.left * mod -
            ($.browser.safari && "fixed" == this.cssPosition
              ? 0
              : ("fixed" == this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : scrollIsRootNode
                  ? 0
                  : scroll.scrollLeft()) * mod),
        };
      },
      _generatePosition: function (event) {
        var o = this.options,
          scroll =
            "absolute" != this.cssPosition ||
            (this.scrollParent[0] != document &&
              $.ui.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
        "relative" != this.cssPosition ||
          (this.scrollParent[0] != document &&
            this.scrollParent[0] != this.offsetParent[0]) ||
          (this.offset.relative = this._getRelativeOffset());
        var pageX = event.pageX,
          pageY = event.pageY;
        if (
          this.originalPosition &&
          (this.containment &&
            (event.pageX - this.offset.click.left < this.containment[0] &&
              (pageX = this.containment[0] + this.offset.click.left),
            event.pageY - this.offset.click.top < this.containment[1] &&
              (pageY = this.containment[1] + this.offset.click.top),
            event.pageX - this.offset.click.left > this.containment[2] &&
              (pageX = this.containment[2] + this.offset.click.left),
            event.pageY - this.offset.click.top > this.containment[3] &&
              (pageY = this.containment[3] + this.offset.click.top)),
          o.grid)
        ) {
          var top =
            this.originalPageY +
            Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
          pageY =
            this.containment &&
            (top - this.offset.click.top < this.containment[1] ||
              top - this.offset.click.top > this.containment[3])
              ? top - this.offset.click.top < this.containment[1]
                ? top + o.grid[1]
                : top - o.grid[1]
              : top;
          var left =
            this.originalPageX +
            Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
          pageX =
            this.containment &&
            (left - this.offset.click.left < this.containment[0] ||
              left - this.offset.click.left > this.containment[2])
              ? left - this.offset.click.left < this.containment[0]
                ? left + o.grid[0]
                : left - o.grid[0]
              : left;
        }
        return {
          top:
            pageY -
            this.offset.click.top -
            this.offset.relative.top -
            this.offset.parent.top +
            ($.browser.safari && "fixed" == this.cssPosition
              ? 0
              : "fixed" == this.cssPosition
              ? -this.scrollParent.scrollTop()
              : scrollIsRootNode
              ? 0
              : scroll.scrollTop()),
          left:
            pageX -
            this.offset.click.left -
            this.offset.relative.left -
            this.offset.parent.left +
            ($.browser.safari && "fixed" == this.cssPosition
              ? 0
              : "fixed" == this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : scrollIsRootNode
              ? 0
              : scroll.scrollLeft()),
        };
      },
      _rearrange: function (event, i, a, hardRefresh) {
        a
          ? a[0].appendChild(this.placeholder[0])
          : i.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" == this.direction ? i.item[0] : i.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var self = this,
          counter = this.counter;
        window.setTimeout(function () {
          counter == self.counter && self.refreshPositions(!hardRefresh);
        }, 0);
      },
      _clear: function (event, noPropagation) {
        this.reverting = !1;
        var delayedTriggers = [],
          self = this;
        if (
          (!this._noFinalSort &&
            this.currentItem[0].parentNode &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] == this.currentItem[0])
        ) {
          for (var i in this._storedCSS)
            ("auto" != this._storedCSS[i] && "static" != this._storedCSS[i]) ||
              (this._storedCSS[i] = "");
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else this.currentItem.show();
        if (
          (this.fromOutside &&
            !noPropagation &&
            delayedTriggers.push(function (event) {
              this._trigger("receive", event, this._uiHash(this.fromOutside));
            }),
          (!this.fromOutside &&
            this.domPosition.prev ==
              this.currentItem.prev().not(".ui-sortable-helper")[0] &&
            this.domPosition.parent == this.currentItem.parent()[0]) ||
            noPropagation ||
            delayedTriggers.push(function (event) {
              this._trigger("update", event, this._uiHash());
            }),
          !$.ui.contains(this.element[0], this.currentItem[0]))
        ) {
          noPropagation ||
            delayedTriggers.push(function (event) {
              this._trigger("remove", event, this._uiHash());
            });
          for (var i = this.containers.length - 1; i >= 0; i--)
            $.ui.contains(this.containers[i].element[0], this.currentItem[0]) &&
              !noPropagation &&
              (delayedTriggers.push(
                function (c) {
                  return function (event) {
                    c._trigger("receive", event, this._uiHash(this));
                  };
                }.call(this, this.containers[i])
              ),
              delayedTriggers.push(
                function (c) {
                  return function (event) {
                    c._trigger("update", event, this._uiHash(this));
                  };
                }.call(this, this.containers[i])
              ));
        }
        for (var i = this.containers.length - 1; i >= 0; i--)
          noPropagation ||
            delayedTriggers.push(
              function (c) {
                return function (event) {
                  c._trigger("deactivate", event, this._uiHash(this));
                };
              }.call(this, this.containers[i])
            ),
            this.containers[i].containerCache.over &&
              (delayedTriggers.push(
                function (c) {
                  return function (event) {
                    c._trigger("out", event, this._uiHash(this));
                  };
                }.call(this, this.containers[i])
              ),
              (this.containers[i].containerCache.over = 0));
        if (
          (this._storedCursor && $("body").css("cursor", this._storedCursor),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" == this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          this.cancelHelperRemoval)
        ) {
          if (!noPropagation) {
            this._trigger("beforeStop", event, this._uiHash());
            for (var i = 0; i < delayedTriggers.length; i++)
              delayedTriggers[i].call(this, event);
            this._trigger("stop", event, this._uiHash());
          }
          return !1;
        }
        if (
          (noPropagation || this._trigger("beforeStop", event, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.helper[0] != this.currentItem[0] && this.helper.remove(),
          (this.helper = null),
          !noPropagation)
        ) {
          for (var i = 0; i < delayedTriggers.length; i++)
            delayedTriggers[i].call(this, event);
          this._trigger("stop", event, this._uiHash());
        }
        return (this.fromOutside = !1), !0;
      },
      _trigger: function () {
        !1 === $.Widget.prototype._trigger.apply(this, arguments) &&
          this.cancel();
      },
      _uiHash: function (inst) {
        var self = inst || this;
        return {
          helper: self.helper,
          placeholder: self.placeholder || $([]),
          position: self.position,
          originalPosition: self.originalPosition,
          offset: self.positionAbs,
          item: self.currentItem,
          sender: inst ? inst.element : null,
        };
      },
    }),
      $.extend($.ui.sortable, { version: "1.8.7" });
  })(jQuery),
  jQuery.effects ||
    (function ($, undefined) {
      function getRGB(color) {
        var result;
        return color && color.constructor == Array && 3 == color.length
          ? color
          : (result =
              /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(
                color
              ))
          ? [
              parseInt(result[1], 10),
              parseInt(result[2], 10),
              parseInt(result[3], 10),
            ]
          : (result =
              /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(
                color
              ))
          ? [
              2.55 * parseFloat(result[1]),
              2.55 * parseFloat(result[2]),
              2.55 * parseFloat(result[3]),
            ]
          : (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(
              color
            ))
          ? [
              parseInt(result[1], 16),
              parseInt(result[2], 16),
              parseInt(result[3], 16),
            ]
          : (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
          ? [
              parseInt(result[1] + result[1], 16),
              parseInt(result[2] + result[2], 16),
              parseInt(result[3] + result[3], 16),
            ]
          : (result = /rgba\(0, 0, 0, 0\)/.exec(color))
          ? colors.transparent
          : colors[$.trim(color).toLowerCase()];
      }
      function getColor(elem, attr) {
        var color;
        do {
          if (
            ("" != (color = $.curCSS(elem, attr)) && "transparent" != color) ||
            $.nodeName(elem, "body")
          )
            break;
          attr = "backgroundColor";
        } while ((elem = elem.parentNode));
        return getRGB(color);
      }
      ($.effects = {}),
        $.each(
          [
            "backgroundColor",
            "borderBottomColor",
            "borderLeftColor",
            "borderRightColor",
            "borderTopColor",
            "borderColor",
            "color",
            "outlineColor",
          ],
          function (i, attr) {
            $.fx.step[attr] = function (fx) {
              fx.colorInit ||
                ((fx.start = getColor(fx.elem, attr)),
                (fx.end = getRGB(fx.end)),
                (fx.colorInit = !0)),
                (fx.elem.style[attr] =
                  "rgb(" +
                  Math.max(
                    Math.min(
                      parseInt(
                        fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0],
                        10
                      ),
                      255
                    ),
                    0
                  ) +
                  "," +
                  Math.max(
                    Math.min(
                      parseInt(
                        fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1],
                        10
                      ),
                      255
                    ),
                    0
                  ) +
                  "," +
                  Math.max(
                    Math.min(
                      parseInt(
                        fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2],
                        10
                      ),
                      255
                    ),
                    0
                  ) +
                  ")");
            };
          }
        );
      var colors = {
          aqua: [0, 255, 255],
          azure: [240, 255, 255],
          beige: [245, 245, 220],
          black: [0, 0, 0],
          blue: [0, 0, 255],
          brown: [165, 42, 42],
          cyan: [0, 255, 255],
          darkblue: [0, 0, 139],
          darkcyan: [0, 139, 139],
          darkgrey: [169, 169, 169],
          darkgreen: [0, 100, 0],
          darkkhaki: [189, 183, 107],
          darkmagenta: [139, 0, 139],
          darkolivegreen: [85, 107, 47],
          darkorange: [255, 140, 0],
          darkorchid: [153, 50, 204],
          darkred: [139, 0, 0],
          darksalmon: [233, 150, 122],
          darkviolet: [148, 0, 211],
          fuchsia: [255, 0, 255],
          gold: [255, 215, 0],
          green: [0, 128, 0],
          indigo: [75, 0, 130],
          khaki: [240, 230, 140],
          lightblue: [173, 216, 230],
          lightcyan: [224, 255, 255],
          lightgreen: [144, 238, 144],
          lightgrey: [211, 211, 211],
          lightpink: [255, 182, 193],
          lightyellow: [255, 255, 224],
          lime: [0, 255, 0],
          magenta: [255, 0, 255],
          maroon: [128, 0, 0],
          navy: [0, 0, 128],
          olive: [128, 128, 0],
          orange: [255, 165, 0],
          pink: [255, 192, 203],
          purple: [128, 0, 128],
          violet: [128, 0, 128],
          red: [255, 0, 0],
          silver: [192, 192, 192],
          white: [255, 255, 255],
          yellow: [255, 255, 0],
          transparent: [255, 255, 255],
        },
        classAnimationActions = ["add", "remove", "toggle"],
        shorthandStyles = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1,
        };
      function getElementStyles() {
        var style = document.defaultView
            ? document.defaultView.getComputedStyle(this, null)
            : this.currentStyle,
          newStyle = {},
          key,
          camelCase;
        if (style && style.length && style[0] && style[style[0]])
          for (var len = style.length; len--; )
            "string" == typeof style[(key = style[len])] &&
              (newStyle[
                (camelCase = key.replace(/\-(\w)/g, function (all, letter) {
                  return letter.toUpperCase();
                }))
              ] = style[key]);
        else
          for (key in style)
            "string" == typeof style[key] && (newStyle[key] = style[key]);
        return newStyle;
      }
      function filterStyles(styles) {
        var name, value;
        for (name in styles)
          (null == (value = styles[name]) ||
            $.isFunction(value) ||
            name in shorthandStyles ||
            /scrollbar/.test(name) ||
            (!/color/i.test(name) && isNaN(parseFloat(value)))) &&
            delete styles[name];
        return styles;
      }
      function styleDifference(oldStyle, newStyle) {
        var diff = { _: 0 },
          name;
        for (name in newStyle)
          oldStyle[name] != newStyle[name] && (diff[name] = newStyle[name]);
        return diff;
      }
      function _normalizeArguments(effect, options, speed, callback) {
        return (
          "object" == typeof effect &&
            ((callback = options),
            (speed = null),
            (effect = (options = effect).effect)),
          $.isFunction(options) &&
            ((callback = options), (speed = null), (options = {})),
          ("number" == typeof options || $.fx.speeds[options]) &&
            ((callback = speed), (speed = options), (options = {})),
          $.isFunction(speed) && ((callback = speed), (speed = null)),
          (options = options || {}),
          (speed = speed || options.duration),
          [
            effect,
            options,
            (speed = $.fx.off
              ? 0
              : "number" == typeof speed
              ? speed
              : speed in $.fx.speeds
              ? $.fx.speeds[speed]
              : $.fx.speeds._default),
            (callback = callback || options.complete),
          ]
        );
      }
      function standardSpeed(speed) {
        return (
          !(speed && "number" != typeof speed && !$.fx.speeds[speed]) ||
          ("string" == typeof speed && !$.effects[speed])
        );
      }
      ($.effects.animateClass = function (value, duration, easing, callback) {
        return (
          $.isFunction(easing) && ((callback = easing), (easing = null)),
          this.each(function () {
            $.queue(this, "fx", function () {
              var that = $(this),
                originalStyleAttr = that.attr("style") || " ",
                originalStyle = filterStyles(getElementStyles.call(this)),
                newStyle,
                className = that.attr("className");
              $.each(classAnimationActions, function (i, action) {
                value[action] && that[action + "Class"](value[action]);
              }),
                (newStyle = filterStyles(getElementStyles.call(this))),
                that.attr("className", className),
                that.animate(
                  styleDifference(originalStyle, newStyle),
                  duration,
                  easing,
                  function () {
                    $.each(classAnimationActions, function (i, action) {
                      value[action] && that[action + "Class"](value[action]);
                    }),
                      "object" == typeof that.attr("style")
                        ? ((that.attr("style").cssText = ""),
                          (that.attr("style").cssText = originalStyleAttr))
                        : that.attr("style", originalStyleAttr),
                      callback && callback.apply(this, arguments);
                  }
                );
              var queue = $.queue(this),
                anim = queue.splice(queue.length - 1, 1)[0];
              queue.splice(1, 0, anim), $.dequeue(this);
            });
          })
        );
      }),
        $.fn.extend({
          _addClass: $.fn.addClass,
          addClass: function (classNames, speed, easing, callback) {
            return speed
              ? $.effects.animateClass.apply(this, [
                  { add: classNames },
                  speed,
                  easing,
                  callback,
                ])
              : this._addClass(classNames);
          },
          _removeClass: $.fn.removeClass,
          removeClass: function (classNames, speed, easing, callback) {
            return speed
              ? $.effects.animateClass.apply(this, [
                  { remove: classNames },
                  speed,
                  easing,
                  callback,
                ])
              : this._removeClass(classNames);
          },
          _toggleClass: $.fn.toggleClass,
          toggleClass: function (classNames, force, speed, easing, callback) {
            return "boolean" == typeof force || void 0 === force
              ? speed
                ? $.effects.animateClass.apply(this, [
                    force ? { add: classNames } : { remove: classNames },
                    speed,
                    easing,
                    callback,
                  ])
                : this._toggleClass(classNames, force)
              : $.effects.animateClass.apply(this, [
                  { toggle: classNames },
                  force,
                  speed,
                  easing,
                ]);
          },
          switchClass: function (remove, add, speed, easing, callback) {
            return $.effects.animateClass.apply(this, [
              { add: add, remove: remove },
              speed,
              easing,
              callback,
            ]);
          },
        }),
        $.extend($.effects, {
          version: "1.8.7",
          save: function (element, set) {
            for (var i = 0; i < set.length; i++)
              null !== set[i] &&
                element.data("ec.storage." + set[i], element[0].style[set[i]]);
          },
          restore: function (element, set) {
            for (var i = 0; i < set.length; i++)
              null !== set[i] &&
                element.css(set[i], element.data("ec.storage." + set[i]));
          },
          setMode: function (el, mode) {
            return (
              "toggle" == mode && (mode = el.is(":hidden") ? "show" : "hide"),
              mode
            );
          },
          getBaseline: function (origin, original) {
            var y, x;
            switch (origin[0]) {
              case "top":
                y = 0;
                break;
              case "middle":
                y = 0.5;
                break;
              case "bottom":
                y = 1;
                break;
              default:
                y = origin[0] / original.height;
            }
            switch (origin[1]) {
              case "left":
                x = 0;
                break;
              case "center":
                x = 0.5;
                break;
              case "right":
                x = 1;
                break;
              default:
                x = origin[1] / original.width;
            }
            return { x: x, y: y };
          },
          createWrapper: function (element) {
            if (element.parent().is(".ui-effects-wrapper"))
              return element.parent();
            var props = {
                width: element.outerWidth(!0),
                height: element.outerHeight(!0),
                float: element.css("float"),
              },
              wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
              });
            return (
              element.wrap(wrapper),
              (wrapper = element.parent()),
              "static" == element.css("position")
                ? (wrapper.css({ position: "relative" }),
                  element.css({ position: "relative" }))
                : ($.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index"),
                  }),
                  $.each(["top", "left", "bottom", "right"], function (i, pos) {
                    (props[pos] = element.css(pos)),
                      isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto");
                  }),
                  element.css({ position: "relative", top: 0, left: 0 })),
              wrapper.css(props).show()
            );
          },
          removeWrapper: function (element) {
            return element.parent().is(".ui-effects-wrapper")
              ? element.parent().replaceWith(element)
              : element;
          },
          setTransition: function (element, list, factor, value) {
            return (
              (value = value || {}),
              $.each(list, function (i, x) {
                (unit = element.cssUnit(x)),
                  unit[0] > 0 && (value[x] = unit[0] * factor + unit[1]);
              }),
              value
            );
          },
        }),
        $.fn.extend({
          effect: function (effect, options, speed, callback) {
            var args = _normalizeArguments.apply(this, arguments),
              args2 = {
                options: args[1],
                duration: args[2],
                callback: args[3],
              },
              mode = args2.options.mode,
              effectMethod = $.effects[effect];
            return $.fx.off || !effectMethod
              ? mode
                ? this[mode](args2.duration, args2.callback)
                : this.each(function () {
                    args2.callback && args2.callback.call(this);
                  })
              : effectMethod.call(this, args2);
          },
          _show: $.fn.show,
          show: function (speed) {
            if (standardSpeed(speed)) return this._show.apply(this, arguments);
            var args = _normalizeArguments.apply(this, arguments);
            return (args[1].mode = "show"), this.effect.apply(this, args);
          },
          _hide: $.fn.hide,
          hide: function (speed) {
            if (standardSpeed(speed)) return this._hide.apply(this, arguments);
            var args = _normalizeArguments.apply(this, arguments);
            return (args[1].mode = "hide"), this.effect.apply(this, args);
          },
          __toggle: $.fn.toggle,
          toggle: function (speed) {
            if (
              standardSpeed(speed) ||
              "boolean" == typeof speed ||
              $.isFunction(speed)
            )
              return this.__toggle.apply(this, arguments);
            var args = _normalizeArguments.apply(this, arguments);
            return (args[1].mode = "toggle"), this.effect.apply(this, args);
          },
          cssUnit: function (key) {
            var style = this.css(key),
              val = [];
            return (
              $.each(["em", "px", "%", "pt"], function (i, unit) {
                style.indexOf(unit) > 0 && (val = [parseFloat(style), unit]);
              }),
              val
            );
          },
        }),
        ($.easing.jswing = $.easing.swing),
        $.extend($.easing, {
          def: "easeOutQuad",
          swing: function (x, t, b, c, d) {
            return $.easing[$.easing.def](x, t, b, c, d);
          },
          easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
          },
          easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
          },
          easeInOutQuad: function (x, t, b, c, d) {
            return (t /= d / 2) < 1
              ? (c / 2) * t * t + b
              : (-c / 2) * (--t * (t - 2) - 1) + b;
          },
          easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
          },
          easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
          },
          easeInOutCubic: function (x, t, b, c, d) {
            return (t /= d / 2) < 1
              ? (c / 2) * t * t * t + b
              : (c / 2) * ((t -= 2) * t * t + 2) + b;
          },
          easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
          },
          easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
          },
          easeInOutQuart: function (x, t, b, c, d) {
            return (t /= d / 2) < 1
              ? (c / 2) * t * t * t * t + b
              : (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
          },
          easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
          },
          easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
          },
          easeInOutQuint: function (x, t, b, c, d) {
            return (t /= d / 2) < 1
              ? (c / 2) * t * t * t * t * t + b
              : (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
          },
          easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
          },
          easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin((t / d) * (Math.PI / 2)) + b;
          },
          easeInOutSine: function (x, t, b, c, d) {
            return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
          },
          easeInExpo: function (x, t, b, c, d) {
            return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
          },
          easeOutExpo: function (x, t, b, c, d) {
            return t == d ? b + c : c * (1 - Math.pow(2, (-10 * t) / d)) + b;
          },
          easeInOutExpo: function (x, t, b, c, d) {
            return 0 == t
              ? b
              : t == d
              ? b + c
              : (t /= d / 2) < 1
              ? (c / 2) * Math.pow(2, 10 * (t - 1)) + b
              : (c / 2) * (2 - Math.pow(2, -10 * --t)) + b;
          },
          easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
          },
          easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
          },
          easeInOutCirc: function (x, t, b, c, d) {
            return (t /= d / 2) < 1
              ? (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
              : (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
          },
          easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158,
              p = 0,
              a = c;
            if (0 == t) return b;
            if (1 == (t /= d)) return b + c;
            if ((p || (p = 0.3 * d), a < Math.abs(c))) {
              a = c;
              var s = p / 4;
            } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
            return (
              -a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
              b
            );
          },
          easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158,
              p = 0,
              a = c;
            if (0 == t) return b;
            if (1 == (t /= d)) return b + c;
            if ((p || (p = 0.3 * d), a < Math.abs(c))) {
              a = c;
              var s = p / 4;
            } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
            return (
              a *
                Math.pow(2, -10 * t) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
              c +
              b
            );
          },
          easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158,
              p = 0,
              a = c;
            if (0 == t) return b;
            if (2 == (t /= d / 2)) return b + c;
            if ((p || (p = d * (0.3 * 1.5)), a < Math.abs(c))) {
              a = c;
              var s = p / 4;
            } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
            return t < 1
              ? a *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
                  -0.5 +
                  b
              : a *
                  Math.pow(2, -10 * (t -= 1)) *
                  Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
                  0.5 +
                  c +
                  b;
          },
          easeInBack: function (x, t, b, c, d, s) {
            return (
              null == s && (s = 1.70158),
              c * (t /= d) * t * ((s + 1) * t - s) + b
            );
          },
          easeOutBack: function (x, t, b, c, d, s) {
            return (
              null == s && (s = 1.70158),
              c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
            );
          },
          easeInOutBack: function (x, t, b, c, d, s) {
            return (
              null == s && (s = 1.70158),
              (t /= d / 2) < 1
                ? (c / 2) * (t * t * ((1 + (s *= 1.525)) * t - s)) + b
                : (c / 2) * ((t -= 2) * t * ((1 + (s *= 1.525)) * t + s) + 2) +
                  b
            );
          },
          easeInBounce: function (x, t, b, c, d) {
            return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
          },
          easeOutBounce: function (x, t, b, c, d) {
            return (t /= d) < 1 / 2.75
              ? c * (7.5625 * t * t) + b
              : t < 2 / 2.75
              ? c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
              : t < 2.5 / 2.75
              ? c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
              : c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
          },
          easeInOutBounce: function (x, t, b, c, d) {
            return t < d / 2
              ? 0.5 * $.easing.easeInBounce(x, 2 * t, 0, c, d) + b
              : 0.5 * $.easing.easeOutBounce(x, 2 * t - d, 0, c, d) +
                  0.5 * c +
                  b;
          },
        });
    })(jQuery),
  (function ($, undefined) {
    $.effects.blind = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left"],
          mode = $.effects.setMode(el, o.options.mode || "hide"),
          direction = o.options.direction || "vertical";
        $.effects.save(el, props), el.show();
        var wrapper = $.effects.createWrapper(el).css({ overflow: "hidden" }),
          ref = "vertical" == direction ? "height" : "width",
          distance =
            "vertical" == direction ? wrapper.height() : wrapper.width();
        "show" == mode && wrapper.css(ref, 0);
        var animation = {};
        (animation[ref] = "show" == mode ? distance : 0),
          wrapper.animate(animation, o.duration, o.options.easing, function () {
            "hide" == mode && el.hide(),
              $.effects.restore(el, props),
              $.effects.removeWrapper(el),
              o.callback && o.callback.apply(el[0], arguments),
              el.dequeue();
          });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.bounce = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left"],
          mode = $.effects.setMode(el, o.options.mode || "effect"),
          direction = o.options.direction || "up",
          distance = o.options.distance || 20,
          times = o.options.times || 5,
          speed = o.duration || 250;
        /show|hide/.test(mode) && props.push("opacity"),
          $.effects.save(el, props),
          el.show(),
          $.effects.createWrapper(el);
        var ref = "up" == direction || "down" == direction ? "top" : "left",
          motion = "up" == direction || "left" == direction ? "pos" : "neg",
          distance =
            o.options.distance ||
            ("top" == ref
              ? el.outerHeight({ margin: !0 }) / 3
              : el.outerWidth({ margin: !0 }) / 3),
          animation;
        ("show" == mode &&
          el.css("opacity", 0).css(ref, "pos" == motion ? -distance : distance),
        "hide" == mode && (distance /= 2 * times),
        "hide" != mode && times--,
        "show" == mode) &&
          (((animation = { opacity: 1 })[ref] =
            ("pos" == motion ? "+=" : "-=") + distance),
          el.animate(animation, speed / 2, o.options.easing),
          (distance /= 2),
          times--);
        for (var i = 0; i < times; i++) {
          var animation1,
            animation2 = {};
          ((animation1 = {})[ref] = ("pos" == motion ? "-=" : "+=") + distance),
            (animation2[ref] = ("pos" == motion ? "+=" : "-=") + distance),
            el
              .animate(animation1, speed / 2, o.options.easing)
              .animate(animation2, speed / 2, o.options.easing),
            (distance = "hide" == mode ? 2 * distance : distance / 2);
        }
        if ("hide" == mode) {
          var animation;
          ((animation = { opacity: 0 })[ref] =
            ("pos" == motion ? "-=" : "+=") + distance),
            el.animate(animation, speed / 2, o.options.easing, function () {
              el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                o.callback && o.callback.apply(this, arguments);
            });
        } else {
          var animation1,
            animation2 = {};
          ((animation1 = {})[ref] = ("pos" == motion ? "-=" : "+=") + distance),
            (animation2[ref] = ("pos" == motion ? "+=" : "-=") + distance),
            el
              .animate(animation1, speed / 2, o.options.easing)
              .animate(animation2, speed / 2, o.options.easing, function () {
                $.effects.restore(el, props),
                  $.effects.removeWrapper(el),
                  o.callback && o.callback.apply(this, arguments);
              });
        }
        el.queue("fx", function () {
          el.dequeue();
        }),
          el.dequeue();
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.clip = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left", "height", "width"],
          mode = $.effects.setMode(el, o.options.mode || "hide"),
          direction = o.options.direction || "vertical";
        $.effects.save(el, props), el.show();
        var wrapper = $.effects.createWrapper(el).css({ overflow: "hidden" }),
          animate = "IMG" == el[0].tagName ? wrapper : el,
          ref = {
            size: "vertical" == direction ? "height" : "width",
            position: "vertical" == direction ? "top" : "left",
          },
          distance =
            "vertical" == direction ? animate.height() : animate.width();
        "show" == mode &&
          (animate.css(ref.size, 0), animate.css(ref.position, distance / 2));
        var animation = {};
        (animation[ref.size] = "show" == mode ? distance : 0),
          (animation[ref.position] = "show" == mode ? 0 : distance / 2),
          animate.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.options.easing,
            complete: function () {
              "hide" == mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                o.callback && o.callback.apply(el[0], arguments),
                el.dequeue();
            },
          });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.drop = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left", "opacity"],
          mode = $.effects.setMode(el, o.options.mode || "hide"),
          direction = o.options.direction || "left";
        $.effects.save(el, props), el.show(), $.effects.createWrapper(el);
        var ref = "up" == direction || "down" == direction ? "top" : "left",
          motion = "up" == direction || "left" == direction ? "pos" : "neg",
          distance =
            o.options.distance ||
            ("top" == ref
              ? el.outerHeight({ margin: !0 }) / 2
              : el.outerWidth({ margin: !0 }) / 2);
        "show" == mode &&
          el.css("opacity", 0).css(ref, "pos" == motion ? -distance : distance);
        var animation = { opacity: "show" == mode ? 1 : 0 };
        (animation[ref] =
          ("show" == mode
            ? "pos" == motion
              ? "+="
              : "-="
            : "pos" == motion
            ? "-="
            : "+=") + distance),
          el.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.options.easing,
            complete: function () {
              "hide" == mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                o.callback && o.callback.apply(this, arguments),
                el.dequeue();
            },
          });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.explode = function (o) {
      return this.queue(function () {
        var rows = o.options.pieces
            ? Math.round(Math.sqrt(o.options.pieces))
            : 3,
          cells = o.options.pieces
            ? Math.round(Math.sqrt(o.options.pieces))
            : 3;
        o.options.mode =
          "toggle" == o.options.mode
            ? $(this).is(":visible")
              ? "hide"
              : "show"
            : o.options.mode;
        var el = $(this).show().css("visibility", "hidden"),
          offset = el.offset();
        (offset.top -= parseInt(el.css("marginTop"), 10) || 0),
          (offset.left -= parseInt(el.css("marginLeft"), 10) || 0);
        for (
          var width = el.outerWidth(!0), height = el.outerHeight(!0), i = 0;
          i < rows;
          i++
        )
          for (var j = 0; j < cells; j++)
            el.clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: (width / cells) * -j,
                top: (height / rows) * -i,
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: width / cells,
                height: height / rows,
                left:
                  offset.left +
                  j * (width / cells) +
                  ("show" == o.options.mode
                    ? (j - Math.floor(cells / 2)) * (width / cells)
                    : 0),
                top:
                  offset.top +
                  i * (height / rows) +
                  ("show" == o.options.mode
                    ? (i - Math.floor(rows / 2)) * (height / rows)
                    : 0),
                opacity: "show" == o.options.mode ? 0 : 1,
              })
              .animate(
                {
                  left:
                    offset.left +
                    j * (width / cells) +
                    ("show" == o.options.mode
                      ? 0
                      : (j - Math.floor(cells / 2)) * (width / cells)),
                  top:
                    offset.top +
                    i * (height / rows) +
                    ("show" == o.options.mode
                      ? 0
                      : (i - Math.floor(rows / 2)) * (height / rows)),
                  opacity: "show" == o.options.mode ? 1 : 0,
                },
                o.duration || 500
              );
        setTimeout(function () {
          "show" == o.options.mode
            ? el.css({ visibility: "visible" })
            : el.css({ visibility: "visible" }).hide(),
            o.callback && o.callback.apply(el[0]),
            el.dequeue(),
            $("div.ui-effects-explode").remove();
        }, o.duration || 500);
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.fade = function (o) {
      return this.queue(function () {
        var elem = $(this),
          mode = $.effects.setMode(elem, o.options.mode || "hide");
        elem.animate(
          { opacity: mode },
          {
            queue: !1,
            duration: o.duration,
            easing: o.options.easing,
            complete: function () {
              o.callback && o.callback.apply(this, arguments), elem.dequeue();
            },
          }
        );
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.fold = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left"],
          mode = $.effects.setMode(el, o.options.mode || "hide"),
          size = o.options.size || 15,
          horizFirst = !!o.options.horizFirst,
          duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2;
        $.effects.save(el, props), el.show();
        var wrapper = $.effects.createWrapper(el).css({ overflow: "hidden" }),
          widthFirst = ("show" == mode) != horizFirst,
          ref = widthFirst ? ["width", "height"] : ["height", "width"],
          distance = widthFirst
            ? [wrapper.width(), wrapper.height()]
            : [wrapper.height(), wrapper.width()],
          percent = /([0-9]+)%/.exec(size);
        percent &&
          (size =
            (parseInt(percent[1], 10) / 100) *
            distance["hide" == mode ? 0 : 1]),
          "show" == mode &&
            wrapper.css(
              horizFirst
                ? { height: 0, width: size }
                : { height: size, width: 0 }
            );
        var animation1 = {},
          animation2 = {};
        (animation1[ref[0]] = "show" == mode ? distance[0] : size),
          (animation2[ref[1]] = "show" == mode ? distance[1] : 0),
          wrapper
            .animate(animation1, duration, o.options.easing)
            .animate(animation2, duration, o.options.easing, function () {
              "hide" == mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                o.callback && o.callback.apply(el[0], arguments),
                el.dequeue();
            });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.highlight = function (o) {
      return this.queue(function () {
        var elem = $(this),
          props = ["backgroundImage", "backgroundColor", "opacity"],
          mode = $.effects.setMode(elem, o.options.mode || "show"),
          animation = { backgroundColor: elem.css("backgroundColor") };
        "hide" == mode && (animation.opacity = 0),
          $.effects.save(elem, props),
          elem
            .show()
            .css({
              backgroundImage: "none",
              backgroundColor: o.options.color || "#ffff99",
            })
            .animate(animation, {
              queue: !1,
              duration: o.duration,
              easing: o.options.easing,
              complete: function () {
                "hide" == mode && elem.hide(),
                  $.effects.restore(elem, props),
                  "show" == mode &&
                    !$.support.opacity &&
                    this.style.removeAttribute("filter"),
                  o.callback && o.callback.apply(this, arguments),
                  elem.dequeue();
              },
            });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.pulsate = function (o) {
      return this.queue(function () {
        var elem = $(this),
          mode = $.effects.setMode(elem, o.options.mode || "show");
        (times = 2 * (o.options.times || 5) - 1),
          (duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2),
          (isVisible = elem.is(":visible")),
          (animateTo = 0),
          isVisible || (elem.css("opacity", 0).show(), (animateTo = 1)),
          (("hide" == mode && isVisible) || ("show" == mode && !isVisible)) &&
            times--;
        for (var i = 0; i < times; i++)
          elem.animate({ opacity: animateTo }, duration, o.options.easing),
            (animateTo = (animateTo + 1) % 2);
        elem.animate(
          { opacity: animateTo },
          duration,
          o.options.easing,
          function () {
            0 == animateTo && elem.hide(),
              o.callback && o.callback.apply(this, arguments);
          }
        ),
          elem
            .queue("fx", function () {
              elem.dequeue();
            })
            .dequeue();
      });
    };
  })(jQuery),
  (function ($, undefined) {
    ($.effects.puff = function (o) {
      return this.queue(function () {
        var elem = $(this),
          mode = $.effects.setMode(elem, o.options.mode || "hide"),
          percent = parseInt(o.options.percent, 10) || 150,
          factor = percent / 100,
          original = { height: elem.height(), width: elem.width() };
        $.extend(o.options, {
          fade: !0,
          mode: mode,
          percent: "hide" == mode ? percent : 100,
          from:
            "hide" == mode
              ? original
              : {
                  height: original.height * factor,
                  width: original.width * factor,
                },
        }),
          elem.effect("scale", o.options, o.duration, o.callback),
          elem.dequeue();
      });
    }),
      ($.effects.scale = function (o) {
        return this.queue(function () {
          var el = $(this),
            options = $.extend(!0, {}, o.options),
            mode = $.effects.setMode(el, o.options.mode || "effect"),
            percent =
              parseInt(o.options.percent, 10) ||
              (0 == parseInt(o.options.percent, 10)
                ? 0
                : "hide" == mode
                ? 0
                : 100),
            direction = o.options.direction || "both",
            origin = o.options.origin;
          "effect" != mode &&
            ((options.origin = origin || ["middle", "center"]),
            (options.restore = !0));
          var original = { height: el.height(), width: el.width() };
          el.from =
            o.options.from ||
            ("show" == mode ? { height: 0, width: 0 } : original);
          var factor_y = "horizontal" != direction ? percent / 100 : 1,
            factor_x = "vertical" != direction ? percent / 100 : 1;
          (el.to = {
            height: original.height * factor_y,
            width: original.width * factor_x,
          }),
            o.options.fade &&
              ("show" == mode && ((el.from.opacity = 0), (el.to.opacity = 1)),
              "hide" == mode && ((el.from.opacity = 1), (el.to.opacity = 0))),
            (options.from = el.from),
            (options.to = el.to),
            (options.mode = mode),
            el.effect("size", options, o.duration, o.callback),
            el.dequeue();
        });
      }),
      ($.effects.size = function (o) {
        return this.queue(function () {
          var el = $(this),
            props = [
              "position",
              "top",
              "left",
              "width",
              "height",
              "overflow",
              "opacity",
            ],
            props1 = ["position", "top", "left", "overflow", "opacity"],
            props2 = ["width", "height", "overflow"],
            cProps = ["fontSize"],
            vProps = [
              "borderTopWidth",
              "borderBottomWidth",
              "paddingTop",
              "paddingBottom",
            ],
            hProps = [
              "borderLeftWidth",
              "borderRightWidth",
              "paddingLeft",
              "paddingRight",
            ],
            mode = $.effects.setMode(el, o.options.mode || "effect"),
            restore = o.options.restore || !1,
            scale = o.options.scale || "both",
            origin = o.options.origin,
            original = { height: el.height(), width: el.width() };
          if (
            ((el.from = o.options.from || original),
            (el.to = o.options.to || original),
            origin)
          ) {
            var baseline = $.effects.getBaseline(origin, original);
            (el.from.top = (original.height - el.from.height) * baseline.y),
              (el.from.left = (original.width - el.from.width) * baseline.x),
              (el.to.top = (original.height - el.to.height) * baseline.y),
              (el.to.left = (original.width - el.to.width) * baseline.x);
          }
          var factor = {
            from: {
              y: el.from.height / original.height,
              x: el.from.width / original.width,
            },
            to: {
              y: el.to.height / original.height,
              x: el.to.width / original.width,
            },
          };
          ("box" != scale && "both" != scale) ||
            (factor.from.y != factor.to.y &&
              ((props = props.concat(vProps)),
              (el.from = $.effects.setTransition(
                el,
                vProps,
                factor.from.y,
                el.from
              )),
              (el.to = $.effects.setTransition(
                el,
                vProps,
                factor.to.y,
                el.to
              ))),
            factor.from.x != factor.to.x &&
              ((props = props.concat(hProps)),
              (el.from = $.effects.setTransition(
                el,
                hProps,
                factor.from.x,
                el.from
              )),
              (el.to = $.effects.setTransition(
                el,
                hProps,
                factor.to.x,
                el.to
              )))),
            ("content" != scale && "both" != scale) ||
              (factor.from.y != factor.to.y &&
                ((props = props.concat(cProps)),
                (el.from = $.effects.setTransition(
                  el,
                  cProps,
                  factor.from.y,
                  el.from
                )),
                (el.to = $.effects.setTransition(
                  el,
                  cProps,
                  factor.to.y,
                  el.to
                )))),
            $.effects.save(el, restore ? props : props1),
            el.show(),
            $.effects.createWrapper(el),
            el.css("overflow", "hidden").css(el.from),
            ("content" != scale && "both" != scale) ||
              ((vProps = vProps
                .concat(["marginTop", "marginBottom"])
                .concat(cProps)),
              (hProps = hProps.concat(["marginLeft", "marginRight"])),
              (props2 = props.concat(vProps).concat(hProps)),
              el.find("*[width]").each(function () {
                (child = $(this)), restore && $.effects.save(child, props2);
                var c_original_height = child.height(),
                  c_original_width = child.width();
                (child.from = {
                  height: c_original_height * factor.from.y,
                  width: c_original_width * factor.from.x,
                }),
                  (child.to = {
                    height: c_original_height * factor.to.y,
                    width: c_original_width * factor.to.x,
                  }),
                  factor.from.y != factor.to.y &&
                    ((child.from = $.effects.setTransition(
                      child,
                      vProps,
                      factor.from.y,
                      child.from
                    )),
                    (child.to = $.effects.setTransition(
                      child,
                      vProps,
                      factor.to.y,
                      child.to
                    ))),
                  factor.from.x != factor.to.x &&
                    ((child.from = $.effects.setTransition(
                      child,
                      hProps,
                      factor.from.x,
                      child.from
                    )),
                    (child.to = $.effects.setTransition(
                      child,
                      hProps,
                      factor.to.x,
                      child.to
                    ))),
                  child.css(child.from),
                  child.animate(
                    child.to,
                    o.duration,
                    o.options.easing,
                    function () {
                      restore && $.effects.restore(child, props2);
                    }
                  );
              })),
            el.animate(el.to, {
              queue: !1,
              duration: o.duration,
              easing: o.options.easing,
              complete: function () {
                0 === el.to.opacity && el.css("opacity", el.from.opacity),
                  "hide" == mode && el.hide(),
                  $.effects.restore(el, restore ? props : props1),
                  $.effects.removeWrapper(el),
                  o.callback && o.callback.apply(this, arguments),
                  el.dequeue();
              },
            });
        });
      });
  })(jQuery),
  (function ($, undefined) {
    $.effects.shake = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left"],
          mode = $.effects.setMode(el, o.options.mode || "effect"),
          direction = o.options.direction || "left",
          distance = o.options.distance || 20,
          times = o.options.times || 3,
          speed = o.duration || o.options.duration || 140;
        $.effects.save(el, props), el.show(), $.effects.createWrapper(el);
        var ref = "up" == direction || "down" == direction ? "top" : "left",
          motion = "up" == direction || "left" == direction ? "pos" : "neg",
          animation = {},
          animation1 = {},
          animation2 = {};
        (animation[ref] = ("pos" == motion ? "-=" : "+=") + distance),
          (animation1[ref] = ("pos" == motion ? "+=" : "-=") + 2 * distance),
          (animation2[ref] = ("pos" == motion ? "-=" : "+=") + 2 * distance),
          el.animate(animation, speed, o.options.easing);
        for (var i = 1; i < times; i++)
          el.animate(animation1, speed, o.options.easing).animate(
            animation2,
            speed,
            o.options.easing
          );
        el
          .animate(animation1, speed, o.options.easing)
          .animate(animation, speed / 2, o.options.easing, function () {
            $.effects.restore(el, props),
              $.effects.removeWrapper(el),
              o.callback && o.callback.apply(this, arguments);
          }),
          el.queue("fx", function () {
            el.dequeue();
          }),
          el.dequeue();
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.slide = function (o) {
      return this.queue(function () {
        var el = $(this),
          props = ["position", "top", "left"],
          mode = $.effects.setMode(el, o.options.mode || "show"),
          direction = o.options.direction || "left";
        $.effects.save(el, props),
          el.show(),
          $.effects.createWrapper(el).css({ overflow: "hidden" });
        var ref = "up" == direction || "down" == direction ? "top" : "left",
          motion = "up" == direction || "left" == direction ? "pos" : "neg",
          distance =
            o.options.distance ||
            ("top" == ref
              ? el.outerHeight({ margin: !0 })
              : el.outerWidth({ margin: !0 }));
        "show" == mode &&
          el.css(
            ref,
            "pos" == motion
              ? isNaN(distance)
                ? "-" + distance
                : -distance
              : distance
          );
        var animation = {};
        (animation[ref] =
          ("show" == mode
            ? "pos" == motion
              ? "+="
              : "-="
            : "pos" == motion
            ? "-="
            : "+=") + distance),
          el.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.options.easing,
            complete: function () {
              "hide" == mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                o.callback && o.callback.apply(this, arguments),
                el.dequeue();
            },
          });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.effects.transfer = function (o) {
      return this.queue(function () {
        var elem = $(this),
          target = $(o.options.to),
          endPosition = target.offset(),
          animation = {
            top: endPosition.top,
            left: endPosition.left,
            height: target.innerHeight(),
            width: target.innerWidth(),
          },
          startPosition = elem.offset(),
          transfer = $('<div class="ui-effects-transfer"></div>')
            .appendTo(document.body)
            .addClass(o.options.className)
            .css({
              top: startPosition.top,
              left: startPosition.left,
              height: elem.innerHeight(),
              width: elem.innerWidth(),
              position: "absolute",
            })
            .animate(animation, o.duration, o.options.easing, function () {
              transfer.remove(),
                o.callback && o.callback.apply(elem[0], arguments),
                elem.dequeue();
            });
      });
    };
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.accordion", {
      options: {
        active: 0,
        animated: "slide",
        autoHeight: !0,
        clearStyle: !1,
        collapsible: !1,
        event: "click",
        fillSpace: !1,
        header: "> li > :first-child,> :not(li):even",
        icons: {
          header: "ui-icon-triangle-1-e",
          headerSelected: "ui-icon-triangle-1-s",
        },
        navigation: !1,
        navigationFilter: function () {
          return this.href.toLowerCase() === location.href.toLowerCase();
        },
      },
      _create: function () {
        var self = this,
          options = self.options;
        if (
          ((self.running = 0),
          self.element
            .addClass("ui-accordion ui-widget ui-helper-reset")
            .children("li")
            .addClass("ui-accordion-li-fix"),
          (self.headers = self.element
            .find(options.header)
            .addClass(
              "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"
            )
            .bind("mouseenter.accordion", function () {
              options.disabled || $(this).addClass("ui-state-hover");
            })
            .bind("mouseleave.accordion", function () {
              options.disabled || $(this).removeClass("ui-state-hover");
            })
            .bind("focus.accordion", function () {
              options.disabled || $(this).addClass("ui-state-focus");
            })
            .bind("blur.accordion", function () {
              options.disabled || $(this).removeClass("ui-state-focus");
            })),
          self.headers
            .next()
            .addClass(
              "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            ),
          options.navigation)
        ) {
          var current = self.element
            .find("a")
            .filter(options.navigationFilter)
            .eq(0);
          if (current.length) {
            var header = current.closest(".ui-accordion-header");
            header.length
              ? (self.active = header)
              : (self.active = current.closest(".ui-accordion-content").prev());
          }
        }
        (self.active = self
          ._findActive(self.active || options.active)
          .addClass("ui-state-default ui-state-active")
          .toggleClass("ui-corner-all")
          .toggleClass("ui-corner-top")),
          self.active.next().addClass("ui-accordion-content-active"),
          self._createIcons(),
          self.resize(),
          self.element.attr("role", "tablist"),
          self.headers
            .attr("role", "tab")
            .bind("keydown.accordion", function (event) {
              return self._keydown(event);
            })
            .next()
            .attr("role", "tabpanel"),
          self.headers
            .not(self.active || "")
            .attr({ "aria-expanded": "false", tabIndex: -1 })
            .next()
            .hide(),
          self.active.length
            ? self.active.attr({ "aria-expanded": "true", tabIndex: 0 })
            : self.headers.eq(0).attr("tabIndex", 0),
          $.browser.safari || self.headers.find("a").attr("tabIndex", -1),
          options.event &&
            self.headers.bind(
              options.event.split(" ").join(".accordion ") + ".accordion",
              function (event) {
                self._clickHandler.call(self, event, this),
                  event.preventDefault();
              }
            );
      },
      _createIcons: function () {
        var options = this.options;
        options.icons &&
          ($("<span></span>")
            .addClass("ui-icon " + options.icons.header)
            .prependTo(this.headers),
          this.active
            .children(".ui-icon")
            .toggleClass(options.icons.header)
            .toggleClass(options.icons.headerSelected),
          this.element.addClass("ui-accordion-icons"));
      },
      _destroyIcons: function () {
        this.headers.children(".ui-icon").remove(),
          this.element.removeClass("ui-accordion-icons");
      },
      destroy: function () {
        var options = this.options;
        this.element
          .removeClass("ui-accordion ui-widget ui-helper-reset")
          .removeAttr("role"),
          this.headers
            .unbind(".accordion")
            .removeClass(
              "ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
            )
            .removeAttr("role")
            .removeAttr("aria-expanded")
            .removeAttr("tabIndex"),
          this.headers.find("a").removeAttr("tabIndex"),
          this._destroyIcons();
        var contents = this.headers
          .next()
          .css("display", "")
          .removeAttr("role")
          .removeClass(
            "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled"
          );
        return (
          (options.autoHeight || options.fillHeight) &&
            contents.css("height", ""),
          $.Widget.prototype.destroy.call(this)
        );
      },
      _setOption: function (key, value) {
        $.Widget.prototype._setOption.apply(this, arguments),
          "active" == key && this.activate(value),
          "icons" == key &&
            (this._destroyIcons(), value && this._createIcons()),
          "disabled" == key &&
            this.headers
              .add(this.headers.next())
              [value ? "addClass" : "removeClass"](
                "ui-accordion-disabled ui-state-disabled"
              );
      },
      _keydown: function (event) {
        if (!(this.options.disabled || event.altKey || event.ctrlKey)) {
          var keyCode = $.ui.keyCode,
            length = this.headers.length,
            currentIndex = this.headers.index(event.target),
            toFocus = !1;
          switch (event.keyCode) {
            case keyCode.RIGHT:
            case keyCode.DOWN:
              toFocus = this.headers[(currentIndex + 1) % length];
              break;
            case keyCode.LEFT:
            case keyCode.UP:
              toFocus = this.headers[(currentIndex - 1 + length) % length];
              break;
            case keyCode.SPACE:
            case keyCode.ENTER:
              this._clickHandler({ target: event.target }, event.target),
                event.preventDefault();
          }
          return (
            !toFocus ||
            ($(event.target).attr("tabIndex", -1),
            $(toFocus).attr("tabIndex", 0),
            toFocus.focus(),
            !1)
          );
        }
      },
      resize: function () {
        var options = this.options,
          maxHeight;
        if (options.fillSpace) {
          if ($.browser.msie) {
            var defOverflow = this.element.parent().css("overflow");
            this.element.parent().css("overflow", "hidden");
          }
          (maxHeight = this.element.parent().height()),
            $.browser.msie &&
              this.element.parent().css("overflow", defOverflow),
            this.headers.each(function () {
              maxHeight -= $(this).outerHeight(!0);
            }),
            this.headers
              .next()
              .each(function () {
                $(this).height(
                  Math.max(
                    0,
                    maxHeight - $(this).innerHeight() + $(this).height()
                  )
                );
              })
              .css("overflow", "auto");
        } else
          options.autoHeight &&
            ((maxHeight = 0),
            this.headers
              .next()
              .each(function () {
                maxHeight = Math.max(maxHeight, $(this).height("").height());
              })
              .height(maxHeight));
        return this;
      },
      activate: function (index) {
        this.options.active = index;
        var active = this._findActive(index)[0];
        return this._clickHandler({ target: active }, active), this;
      },
      _findActive: function (selector) {
        return selector
          ? "number" == typeof selector
            ? this.headers.filter(":eq(" + selector + ")")
            : this.headers.not(this.headers.not(selector))
          : !1 === selector
          ? $([])
          : this.headers.filter(":eq(0)");
      },
      _clickHandler: function (event, target) {
        var options = this.options;
        if (!options.disabled)
          if (event.target) {
            var clicked = $(event.currentTarget || target),
              clickedIsActive = clicked[0] === this.active[0];
            if (
              ((options.active =
                (!options.collapsible || !clickedIsActive) &&
                this.headers.index(clicked)),
              !(this.running || (!options.collapsible && clickedIsActive)))
            ) {
              this.active
                .removeClass("ui-state-active ui-corner-top")
                .addClass("ui-state-default ui-corner-all")
                .children(".ui-icon")
                .removeClass(options.icons.headerSelected)
                .addClass(options.icons.header),
                clickedIsActive ||
                  (clicked
                    .removeClass("ui-state-default ui-corner-all")
                    .addClass("ui-state-active ui-corner-top")
                    .children(".ui-icon")
                    .removeClass(options.icons.header)
                    .addClass(options.icons.headerSelected),
                  clicked.next().addClass("ui-accordion-content-active"));
              var toShow = clicked.next(),
                toHide = this.active.next(),
                data = {
                  options: options,
                  newHeader:
                    clickedIsActive && options.collapsible ? $([]) : clicked,
                  oldHeader: this.active,
                  newContent:
                    clickedIsActive && options.collapsible ? $([]) : toShow,
                  oldContent: toHide,
                },
                down =
                  this.headers.index(this.active[0]) >
                  this.headers.index(clicked[0]);
              (this.active = clickedIsActive ? $([]) : clicked),
                this._toggle(toShow, toHide, data, clickedIsActive, down);
            }
          } else {
            if (!options.collapsible) return;
            this.active
              .removeClass("ui-state-active ui-corner-top")
              .addClass("ui-state-default ui-corner-all")
              .children(".ui-icon")
              .removeClass(options.icons.headerSelected)
              .addClass(options.icons.header),
              this.active.next().addClass("ui-accordion-content-active");
            var toHide = this.active.next(),
              data = {
                options: options,
                newHeader: $([]),
                oldHeader: options.active,
                newContent: $([]),
                oldContent: toHide,
              },
              toShow = (this.active = $([]));
            this._toggle(toShow, toHide, data);
          }
      },
      _toggle: function (toShow, toHide, data, clickedIsActive, down) {
        var self = this,
          options = self.options;
        (self.toShow = toShow), (self.toHide = toHide), (self.data = data);
        var complete = function () {
          if (self) return self._completed.apply(self, arguments);
        };
        if (
          (self._trigger("changestart", null, self.data),
          (self.running = 0 === toHide.size() ? toShow.size() : toHide.size()),
          options.animated)
        ) {
          var animOptions = {};
          (animOptions =
            options.collapsible && clickedIsActive
              ? {
                  toShow: $([]),
                  toHide: toHide,
                  complete: complete,
                  down: down,
                  autoHeight: options.autoHeight || options.fillSpace,
                }
              : {
                  toShow: toShow,
                  toHide: toHide,
                  complete: complete,
                  down: down,
                  autoHeight: options.autoHeight || options.fillSpace,
                }),
            options.proxied || (options.proxied = options.animated),
            options.proxiedDuration ||
              (options.proxiedDuration = options.duration),
            (options.animated = $.isFunction(options.proxied)
              ? options.proxied(animOptions)
              : options.proxied),
            (options.duration = $.isFunction(options.proxiedDuration)
              ? options.proxiedDuration(animOptions)
              : options.proxiedDuration);
          var animations = $.ui.accordion.animations,
            duration = options.duration,
            easing = options.animated;
          !easing ||
            animations[easing] ||
            $.easing[easing] ||
            (easing = "slide"),
            animations[easing] ||
              (animations[easing] = function (options) {
                this.slide(options, {
                  easing: easing,
                  duration: duration || 700,
                });
              }),
            animations[easing](animOptions);
        } else
          options.collapsible && clickedIsActive
            ? toShow.toggle()
            : (toHide.hide(), toShow.show()),
            complete(!0);
        toHide.prev().attr({ "aria-expanded": "false", tabIndex: -1 }).blur(),
          toShow.prev().attr({ "aria-expanded": "true", tabIndex: 0 }).focus();
      },
      _completed: function (cancel) {
        (this.running = cancel ? 0 : --this.running),
          this.running ||
            (this.options.clearStyle &&
              this.toShow.add(this.toHide).css({ height: "", overflow: "" }),
            this.toHide.removeClass("ui-accordion-content-active"),
            this._trigger("change", null, this.data));
      },
    }),
      $.extend($.ui.accordion, {
        version: "1.8.7",
        animations: {
          slide: function (options, additions) {
            if (
              (options = $.extend(
                { easing: "swing", duration: 300 },
                options,
                additions
              )).toHide.size()
            )
              if (options.toShow.size()) {
                var overflow = options.toShow.css("overflow"),
                  percentDone = 0,
                  showProps = {},
                  hideProps = {},
                  fxAttrs = ["height", "paddingTop", "paddingBottom"],
                  originalWidth,
                  s = options.toShow;
                (originalWidth = s[0].style.width),
                  s.width(
                    parseInt(s.parent().width(), 10) -
                      parseInt(s.css("paddingLeft"), 10) -
                      parseInt(s.css("paddingRight"), 10) -
                      (parseInt(s.css("borderLeftWidth"), 10) || 0) -
                      (parseInt(s.css("borderRightWidth"), 10) || 0)
                  ),
                  $.each(fxAttrs, function (i, prop) {
                    hideProps[prop] = "hide";
                    var parts = ("" + $.css(options.toShow[0], prop)).match(
                      /^([\d+-.]+)(.*)$/
                    );
                    showProps[prop] = {
                      value: parts[1],
                      unit: parts[2] || "px",
                    };
                  }),
                  options.toShow.css({ height: 0, overflow: "hidden" }).show(),
                  options.toHide
                    .filter(":hidden")
                    .each(options.complete)
                    .end()
                    .filter(":visible")
                    .animate(hideProps, {
                      step: function (now, settings) {
                        "height" == settings.prop &&
                          (percentDone =
                            settings.end - settings.start == 0
                              ? 0
                              : (settings.now - settings.start) /
                                (settings.end - settings.start)),
                          (options.toShow[0].style[settings.prop] =
                            percentDone * showProps[settings.prop].value +
                            showProps[settings.prop].unit);
                      },
                      duration: options.duration,
                      easing: options.easing,
                      complete: function () {
                        options.autoHeight || options.toShow.css("height", ""),
                          options.toShow.css({
                            width: originalWidth,
                            overflow: overflow,
                          }),
                          options.complete();
                      },
                    });
              } else
                options.toHide.animate(
                  { height: "hide", paddingTop: "hide", paddingBottom: "hide" },
                  options
                );
            else
              options.toShow.animate(
                { height: "show", paddingTop: "show", paddingBottom: "show" },
                options
              );
          },
          bounceslide: function (options) {
            this.slide(options, {
              easing: options.down ? "easeOutBounce" : "swing",
              duration: options.down ? 1e3 : 200,
            });
          },
        },
      });
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.autocomplete", {
      options: {
        appendTo: "body",
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
      },
      _create: function () {
        var self = this,
          doc = this.element[0].ownerDocument,
          suppressKeyPress;
        this.element
          .addClass("ui-autocomplete-input")
          .attr("autocomplete", "off")
          .attr({
            role: "textbox",
            "aria-autocomplete": "list",
            "aria-haspopup": "true",
          })
          .bind("keydown.autocomplete", function (event) {
            if (!self.options.disabled && !self.element.attr("readonly")) {
              suppressKeyPress = !1;
              var keyCode = $.ui.keyCode;
              switch (event.keyCode) {
                case keyCode.PAGE_UP:
                  self._move("previousPage", event);
                  break;
                case keyCode.PAGE_DOWN:
                  self._move("nextPage", event);
                  break;
                case keyCode.UP:
                  self._move("previous", event), event.preventDefault();
                  break;
                case keyCode.DOWN:
                  self._move("next", event), event.preventDefault();
                  break;
                case keyCode.ENTER:
                case keyCode.NUMPAD_ENTER:
                  self.menu.active &&
                    ((suppressKeyPress = !0), event.preventDefault());
                case keyCode.TAB:
                  if (!self.menu.active) return;
                  self.menu.select(event);
                  break;
                case keyCode.ESCAPE:
                  self.element.val(self.term), self.close(event);
                  break;
                default:
                  clearTimeout(self.searching),
                    (self.searching = setTimeout(function () {
                      self.term != self.element.val() &&
                        ((self.selectedItem = null), self.search(null, event));
                    }, self.options.delay));
              }
            }
          })
          .bind("keypress.autocomplete", function (event) {
            suppressKeyPress &&
              ((suppressKeyPress = !1), event.preventDefault());
          })
          .bind("focus.autocomplete", function () {
            self.options.disabled ||
              ((self.selectedItem = null),
              (self.previous = self.element.val()));
          })
          .bind("blur.autocomplete", function (event) {
            self.options.disabled ||
              (clearTimeout(self.searching),
              (self.closing = setTimeout(function () {
                self.close(event), self._change(event);
              }, 150)));
          }),
          this._initSource(),
          (this.response = function () {
            return self._response.apply(self, arguments);
          }),
          (this.menu = $("<ul></ul>")
            .addClass("ui-autocomplete")
            .appendTo($(this.options.appendTo || "body", doc)[0])
            .mousedown(function (event) {
              var menuElement = self.menu.element[0];
              $(event.target).closest(".ui-menu-item").length ||
                setTimeout(function () {
                  $(document).one("mousedown", function (event) {
                    event.target === self.element[0] ||
                      event.target === menuElement ||
                      $.ui.contains(menuElement, event.target) ||
                      self.close();
                  });
                }, 1),
                setTimeout(function () {
                  clearTimeout(self.closing);
                }, 13);
            })
            .menu({
              focus: function (event, ui) {
                var item = ui.item.data("item.autocomplete");
                !1 !== self._trigger("focus", event, { item: item }) &&
                  /^key/.test(event.originalEvent.type) &&
                  self.element.val(item.value);
              },
              selected: function (event, ui) {
                var item = ui.item.data("item.autocomplete"),
                  previous = self.previous;
                self.element[0] !== doc.activeElement &&
                  (self.element.focus(),
                  (self.previous = previous),
                  setTimeout(function () {
                    (self.previous = previous), (self.selectedItem = item);
                  }, 1)),
                  !1 !== self._trigger("select", event, { item: item }) &&
                    self.element.val(item.value),
                  (self.term = self.element.val()),
                  self.close(event),
                  (self.selectedItem = item);
              },
              blur: function (event, ui) {
                self.menu.element.is(":visible") &&
                  self.element.val() !== self.term &&
                  self.element.val(self.term);
              },
            })
            .zIndex(this.element.zIndex() + 1)
            .css({ top: 0, left: 0 })
            .hide()
            .data("menu")),
          $.fn.bgiframe && this.menu.element.bgiframe();
      },
      destroy: function () {
        this.element
          .removeClass("ui-autocomplete-input")
          .removeAttr("autocomplete")
          .removeAttr("role")
          .removeAttr("aria-autocomplete")
          .removeAttr("aria-haspopup"),
          this.menu.element.remove(),
          $.Widget.prototype.destroy.call(this);
      },
      _setOption: function (key, value) {
        $.Widget.prototype._setOption.apply(this, arguments),
          "source" === key && this._initSource(),
          "appendTo" === key &&
            this.menu.element.appendTo(
              $(value || "body", this.element[0].ownerDocument)[0]
            );
      },
      _initSource: function () {
        var self = this,
          array,
          url;
        $.isArray(this.options.source)
          ? ((array = this.options.source),
            (this.source = function (request, response) {
              response($.ui.autocomplete.filter(array, request.term));
            }))
          : "string" == typeof this.options.source
          ? ((url = this.options.source),
            (this.source = function (request, response) {
              self.xhr && self.xhr.abort(),
                (self.xhr = $.ajax({
                  url: url,
                  data: request,
                  dataType: "json",
                  success: function (data, status, xhr) {
                    xhr === self.xhr && response(data), (self.xhr = null);
                  },
                  error: function (xhr) {
                    xhr === self.xhr && response([]), (self.xhr = null);
                  },
                }));
            }))
          : (this.source = this.options.source);
      },
      search: function (value, event) {
        return (
          (value = null != value ? value : this.element.val()),
          (this.term = this.element.val()),
          value.length < this.options.minLength
            ? this.close(event)
            : (clearTimeout(this.closing),
              !1 !== this._trigger("search", event)
                ? this._search(value)
                : void 0)
        );
      },
      _search: function (value) {
        this.element.addClass("ui-autocomplete-loading"),
          this.source({ term: value }, this.response);
      },
      _response: function (content) {
        content && content.length
          ? ((content = this._normalize(content)),
            this._suggest(content),
            this._trigger("open"))
          : this.close(),
          this.element.removeClass("ui-autocomplete-loading");
      },
      close: function (event) {
        clearTimeout(this.closing),
          this.menu.element.is(":visible") &&
            (this.menu.element.hide(),
            this.menu.deactivate(),
            this._trigger("close", event));
      },
      _change: function (event) {
        this.previous !== this.element.val() &&
          this._trigger("change", event, { item: this.selectedItem });
      },
      _normalize: function (items) {
        return items.length && items[0].label && items[0].value
          ? items
          : $.map(items, function (item) {
              return "string" == typeof item
                ? { label: item, value: item }
                : $.extend(
                    {
                      label: item.label || item.value,
                      value: item.value || item.label,
                    },
                    item
                  );
            });
      },
      _suggest: function (items) {
        var ul = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
        this._renderMenu(ul, items),
          this.menu.deactivate(),
          this.menu.refresh(),
          ul.show(),
          this._resizeMenu(),
          ul.position($.extend({ of: this.element }, this.options.position));
      },
      _resizeMenu: function () {
        var ul = this.menu.element;
        ul.outerWidth(
          Math.max(ul.width("").outerWidth(), this.element.outerWidth())
        );
      },
      _renderMenu: function (ul, items) {
        var self = this;
        $.each(items, function (index, item) {
          self._renderItem(ul, item);
        });
      },
      _renderItem: function (ul, item) {
        return $("<li></li>")
          .data("item.autocomplete", item)
          .append($("<a></a>").text(item.label))
          .appendTo(ul);
      },
      _move: function (direction, event) {
        if (this.menu.element.is(":visible"))
          return (this.menu.first() && /^previous/.test(direction)) ||
            (this.menu.last() && /^next/.test(direction))
            ? (this.element.val(this.term), void this.menu.deactivate())
            : void this.menu[direction](event);
        this.search(null, event);
      },
      widget: function () {
        return this.menu.element;
      },
    }),
      $.extend($.ui.autocomplete, {
        escapeRegex: function (value) {
          return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        },
        filter: function (array, term) {
          var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
          return $.grep(array, function (value) {
            return matcher.test(value.label || value.value || value);
          });
        },
      });
  })(jQuery),
  (function ($) {
    $.widget("ui.menu", {
      _create: function () {
        var self = this;
        this.element
          .addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
          .attr({
            role: "listbox",
            "aria-activedescendant": "ui-active-menuitem",
          })
          .click(function (event) {
            $(event.target).closest(".ui-menu-item a").length &&
              (event.preventDefault(), self.select(event));
          }),
          this.refresh();
      },
      refresh: function () {
        var self = this,
          items;
        this.element
          .children("li:not(.ui-menu-item):has(a)")
          .addClass("ui-menu-item")
          .attr("role", "menuitem")
          .children("a")
          .addClass("ui-corner-all")
          .attr("tabindex", -1)
          .mouseenter(function (event) {
            self.activate(event, $(this).parent());
          })
          .mouseleave(function () {
            self.deactivate();
          });
      },
      activate: function (event, item) {
        if ((this.deactivate(), this.hasScroll())) {
          var offset = item.offset().top - this.element.offset().top,
            scroll = this.element.attr("scrollTop"),
            elementHeight = this.element.height();
          offset < 0
            ? this.element.attr("scrollTop", scroll + offset)
            : offset >= elementHeight &&
              this.element.attr(
                "scrollTop",
                scroll + offset - elementHeight + item.height()
              );
        }
        (this.active = item
          .eq(0)
          .children("a")
          .addClass("ui-state-hover")
          .attr("id", "ui-active-menuitem")
          .end()),
          this._trigger("focus", event, { item: item });
      },
      deactivate: function () {
        this.active &&
          (this.active
            .children("a")
            .removeClass("ui-state-hover")
            .removeAttr("id"),
          this._trigger("blur"),
          (this.active = null));
      },
      next: function (event) {
        this.move("next", ".ui-menu-item:first", event);
      },
      previous: function (event) {
        this.move("prev", ".ui-menu-item:last", event);
      },
      first: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      last: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      move: function (direction, edge, event) {
        if (this.active) {
          var next = this.active[direction + "All"](".ui-menu-item").eq(0);
          next.length
            ? this.activate(event, next)
            : this.activate(event, this.element.children(edge));
        } else this.activate(event, this.element.children(edge));
      },
      nextPage: function (event) {
        if (this.hasScroll()) {
          if (!this.active || this.last())
            return void this.activate(
              event,
              this.element.children(".ui-menu-item:first")
            );
          var base = this.active.offset().top,
            height = this.element.height(),
            result = this.element.children(".ui-menu-item").filter(function () {
              var close =
                $(this).offset().top - base - height + $(this).height();
              return close < 10 && close > -10;
            });
          result.length ||
            (result = this.element.children(".ui-menu-item:last")),
            this.activate(event, result);
        } else
          this.activate(
            event,
            this.element
              .children(".ui-menu-item")
              .filter(!this.active || this.last() ? ":first" : ":last")
          );
      },
      previousPage: function (event) {
        if (this.hasScroll()) {
          if (!this.active || this.first())
            return void this.activate(
              event,
              this.element.children(".ui-menu-item:last")
            );
          var base = this.active.offset().top,
            height = this.element.height();
          (result = this.element.children(".ui-menu-item").filter(function () {
            var close = $(this).offset().top - base + height - $(this).height();
            return close < 10 && close > -10;
          })),
            result.length ||
              (result = this.element.children(".ui-menu-item:first")),
            this.activate(event, result);
        } else
          this.activate(
            event,
            this.element
              .children(".ui-menu-item")
              .filter(!this.active || this.first() ? ":last" : ":first")
          );
      },
      hasScroll: function () {
        return this.element.height() < this.element.attr("scrollHeight");
      },
      select: function (event) {
        this._trigger("selected", event, { item: this.active });
      },
    });
  })(jQuery),
  (function ($, undefined) {
    var lastActive,
      baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
      stateClasses = "ui-state-hover ui-state-active ",
      typeClasses =
        "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
      formResetHandler = function (event) {
        $(":ui-button", event.target.form).each(function () {
          var inst = $(this).data("button");
          setTimeout(function () {
            inst.refresh();
          }, 1);
        });
      },
      radioGroup = function (radio) {
        var name = radio.name,
          form = radio.form,
          radios = $([]);
        return (
          name &&
            (radios = form
              ? $(form).find("[name='" + name + "']")
              : $("[name='" + name + "']", radio.ownerDocument).filter(
                  function () {
                    return !this.form;
                  }
                )),
          radios
        );
      };
    $.widget("ui.button", {
      options: {
        disabled: null,
        text: !0,
        label: null,
        icons: { primary: null, secondary: null },
      },
      _create: function () {
        this.element
          .closest("form")
          .unbind("reset.button")
          .bind("reset.button", formResetHandler),
          "boolean" != typeof this.options.disabled &&
            (this.options.disabled = this.element.attr("disabled")),
          this._determineButtonType(),
          (this.hasTitle = !!this.buttonElement.attr("title"));
        var self = this,
          options = this.options,
          toggleButton = "checkbox" === this.type || "radio" === this.type,
          hoverClass =
            "ui-state-hover" + (toggleButton ? "" : " ui-state-active"),
          focusClass = "ui-state-focus";
        null === options.label && (options.label = this.buttonElement.html()),
          this.element.is(":disabled") && (options.disabled = !0),
          this.buttonElement
            .addClass(baseClasses)
            .attr("role", "button")
            .bind("mouseenter.button", function () {
              options.disabled ||
                ($(this).addClass("ui-state-hover"),
                this === lastActive && $(this).addClass("ui-state-active"));
            })
            .bind("mouseleave.button", function () {
              options.disabled || $(this).removeClass(hoverClass);
            })
            .bind("focus.button", function () {
              $(this).addClass(focusClass);
            })
            .bind("blur.button", function () {
              $(this).removeClass(focusClass);
            }),
          toggleButton &&
            this.element.bind("change.button", function () {
              self.refresh();
            }),
          "checkbox" === this.type
            ? this.buttonElement.bind("click.button", function () {
                if (options.disabled) return !1;
                $(this).toggleClass("ui-state-active"),
                  self.buttonElement.attr(
                    "aria-pressed",
                    self.element[0].checked
                  );
              })
            : "radio" === this.type
            ? this.buttonElement.bind("click.button", function () {
                if (options.disabled) return !1;
                $(this).addClass("ui-state-active"),
                  self.buttonElement.attr("aria-pressed", !0);
                var radio = self.element[0];
                radioGroup(radio)
                  .not(radio)
                  .map(function () {
                    return $(this).button("widget")[0];
                  })
                  .removeClass("ui-state-active")
                  .attr("aria-pressed", !1);
              })
            : (this.buttonElement
                .bind("mousedown.button", function () {
                  if (options.disabled) return !1;
                  $(this).addClass("ui-state-active"),
                    (lastActive = this),
                    $(document).one("mouseup", function () {
                      lastActive = null;
                    });
                })
                .bind("mouseup.button", function () {
                  if (options.disabled) return !1;
                  $(this).removeClass("ui-state-active");
                })
                .bind("keydown.button", function (event) {
                  if (options.disabled) return !1;
                  (event.keyCode != $.ui.keyCode.SPACE &&
                    event.keyCode != $.ui.keyCode.ENTER) ||
                    $(this).addClass("ui-state-active");
                })
                .bind("keyup.button", function () {
                  $(this).removeClass("ui-state-active");
                }),
              this.buttonElement.is("a") &&
                this.buttonElement.keyup(function (event) {
                  event.keyCode === $.ui.keyCode.SPACE && $(this).click();
                })),
          this._setOption("disabled", options.disabled);
      },
      _determineButtonType: function () {
        if (
          (this.element.is(":checkbox")
            ? (this.type = "checkbox")
            : this.element.is(":radio")
            ? (this.type = "radio")
            : this.element.is("input")
            ? (this.type = "input")
            : (this.type = "button"),
          "checkbox" === this.type || "radio" === this.type)
        ) {
          (this.buttonElement = this.element
            .parents()
            .last()
            .find("label[for=" + this.element.attr("id") + "]")),
            this.element.addClass("ui-helper-hidden-accessible");
          var checked = this.element.is(":checked");
          checked && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.attr("aria-pressed", checked);
        } else this.buttonElement = this.element;
      },
      widget: function () {
        return this.buttonElement;
      },
      destroy: function () {
        this.element.removeClass("ui-helper-hidden-accessible"),
          this.buttonElement
            .removeClass(baseClasses + " " + stateClasses + " " + typeClasses)
            .removeAttr("role")
            .removeAttr("aria-pressed")
            .html(this.buttonElement.find(".ui-button-text").html()),
          this.hasTitle || this.buttonElement.removeAttr("title"),
          $.Widget.prototype.destroy.call(this);
      },
      _setOption: function (key, value) {
        $.Widget.prototype._setOption.apply(this, arguments),
          "disabled" === key &&
            (value
              ? this.element.attr("disabled", !0)
              : this.element.removeAttr("disabled")),
          this._resetButton();
      },
      refresh: function () {
        var isDisabled = this.element.is(":disabled");
        isDisabled !== this.options.disabled &&
          this._setOption("disabled", isDisabled),
          "radio" === this.type
            ? radioGroup(this.element[0]).each(function () {
                $(this).is(":checked")
                  ? $(this)
                      .button("widget")
                      .addClass("ui-state-active")
                      .attr("aria-pressed", !0)
                  : $(this)
                      .button("widget")
                      .removeClass("ui-state-active")
                      .attr("aria-pressed", !1);
              })
            : "checkbox" === this.type &&
              (this.element.is(":checked")
                ? this.buttonElement
                    .addClass("ui-state-active")
                    .attr("aria-pressed", !0)
                : this.buttonElement
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", !1));
      },
      _resetButton: function () {
        if ("input" !== this.type) {
          var buttonElement = this.buttonElement.removeClass(typeClasses),
            buttonText = $("<span></span>")
              .addClass("ui-button-text")
              .html(this.options.label)
              .appendTo(buttonElement.empty())
              .text(),
            icons = this.options.icons,
            multipleIcons = icons.primary && icons.secondary;
          icons.primary || icons.secondary
            ? (buttonElement.addClass(
                "ui-button-text-icon" +
                  (multipleIcons
                    ? "s"
                    : icons.primary
                    ? "-primary"
                    : "-secondary")
              ),
              icons.primary &&
                buttonElement.prepend(
                  "<span class='ui-button-icon-primary ui-icon " +
                    icons.primary +
                    "'></span>"
                ),
              icons.secondary &&
                buttonElement.append(
                  "<span class='ui-button-icon-secondary ui-icon " +
                    icons.secondary +
                    "'></span>"
                ),
              this.options.text ||
                (buttonElement
                  .addClass(
                    multipleIcons
                      ? "ui-button-icons-only"
                      : "ui-button-icon-only"
                  )
                  .removeClass(
                    "ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary"
                  ),
                this.hasTitle || buttonElement.attr("title", buttonText)))
            : buttonElement.addClass("ui-button-text-only");
        } else this.options.label && this.element.val(this.options.label);
      },
    }),
      $.widget("ui.buttonset", {
        options: {
          items:
            ":button, :submit, :reset, :checkbox, :radio, a, :data(button)",
        },
        _create: function () {
          this.element.addClass("ui-buttonset");
        },
        _init: function () {
          this.refresh();
        },
        _setOption: function (key, value) {
          "disabled" === key && this.buttons.button("option", key, value),
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        refresh: function () {
          this.buttons = this.element
            .find(this.options.items)
            .filter(":ui-button")
            .button("refresh")
            .end()
            .not(":ui-button")
            .button()
            .end()
            .map(function () {
              return $(this).button("widget")[0];
            })
            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
            .filter(":first")
            .addClass("ui-corner-left")
            .end()
            .filter(":last")
            .addClass("ui-corner-right")
            .end()
            .end();
        },
        destroy: function () {
          this.element.removeClass("ui-buttonset"),
            this.buttons
              .map(function () {
                return $(this).button("widget")[0];
              })
              .removeClass("ui-corner-left ui-corner-right")
              .end()
              .button("destroy"),
            $.Widget.prototype.destroy.call(this);
        },
      });
  })(jQuery),
  (function ($, undefined) {
    $.extend($.ui, { datepicker: { version: "1.8.7" } });
    var PROP_NAME = "datepicker",
      dpuuid = new Date().getTime();
    function Datepicker() {
      (this.debug = !1),
        (this._curInst = null),
        (this._keyEvent = !1),
        (this._disabledInputs = []),
        (this._datepickerShowing = !1),
        (this._inDialog = !1),
        (this._mainDivId = "ui-datepicker-div"),
        (this._inlineClass = "ui-datepicker-inline"),
        (this._appendClass = "ui-datepicker-append"),
        (this._triggerClass = "ui-datepicker-trigger"),
        (this._dialogClass = "ui-datepicker-dialog"),
        (this._disableClass = "ui-datepicker-disabled"),
        (this._unselectableClass = "ui-datepicker-unselectable"),
        (this._currentClass = "ui-datepicker-current-day"),
        (this._dayOverClass = "ui-datepicker-days-cell-over"),
        (this.regional = []),
        (this.regional[""] = {
          closeText: "Done",
          prevText: "Prev",
          nextText: "Next",
          currentText: "Today",
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthNamesShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          weekHeader: "Wk",
          dateFormat: "mm/dd/yy",
          firstDay: 0,
          isRTL: !1,
          showMonthAfterYear: !1,
          yearSuffix: "",
        }),
        (this._defaults = {
          showOn: "focus",
          showAnim: "fadeIn",
          showOptions: {},
          defaultDate: null,
          appendText: "",
          buttonText: "...",
          buttonImage: "",
          buttonImageOnly: !1,
          hideIfNoPrevNext: !1,
          navigationAsDateFormat: !1,
          gotoCurrent: !1,
          changeMonth: !1,
          changeYear: !1,
          yearRange: "c-10:c+10",
          showOtherMonths: !1,
          selectOtherMonths: !1,
          showWeek: !1,
          calculateWeek: this.iso8601Week,
          shortYearCutoff: "+10",
          minDate: null,
          maxDate: null,
          duration: "fast",
          beforeShowDay: null,
          beforeShow: null,
          onSelect: null,
          onChangeMonthYear: null,
          onClose: null,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          stepMonths: 1,
          stepBigMonths: 12,
          altField: "",
          altFormat: "",
          constrainInput: !0,
          showButtonPanel: !1,
          autoSize: !1,
        }),
        $.extend(this._defaults, this.regional[""]),
        (this.dpDiv = $(
          '<div id="' +
            this._mainDivId +
            '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'
        ));
    }
    function extendRemove(target, props) {
      for (var name in ($.extend(target, props), props))
        (null != props[name] && props[name] != undefined) ||
          (target[name] = props[name]);
      return target;
    }
    function isArray(a) {
      return (
        a &&
        (($.browser.safari && "object" == typeof a && a.length) ||
          (a.constructor && a.constructor.toString().match(/\Array\(\)/)))
      );
    }
    $.extend(Datepicker.prototype, {
      markerClassName: "hasDatepicker",
      log: function () {
        this.debug && console.log.apply("", arguments);
      },
      _widgetDatepicker: function () {
        return this.dpDiv;
      },
      setDefaults: function (settings) {
        return extendRemove(this._defaults, settings || {}), this;
      },
      _attachDatepicker: function (target, settings) {
        var inlineSettings = null;
        for (var attrName in this._defaults) {
          var attrValue = target.getAttribute("date:" + attrName);
          if (attrValue) {
            inlineSettings = inlineSettings || {};
            try {
              inlineSettings[attrName] = eval(attrValue);
            } catch (err) {
              inlineSettings[attrName] = attrValue;
            }
          }
        }
        var nodeName = target.nodeName.toLowerCase(),
          inline = "div" == nodeName || "span" == nodeName;
        target.id || ((this.uuid += 1), (target.id = "dp" + this.uuid));
        var inst = this._newInst($(target), inline);
        (inst.settings = $.extend({}, settings || {}, inlineSettings || {})),
          "input" == nodeName
            ? this._connectDatepicker(target, inst)
            : inline && this._inlineDatepicker(target, inst);
      },
      _newInst: function (target, inline) {
        var id;
        return {
          id: target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
          input: target,
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          drawMonth: 0,
          drawYear: 0,
          inline: inline,
          dpDiv: inline
            ? $(
                '<div class="' +
                  this._inlineClass +
                  ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'
              )
            : this.dpDiv,
        };
      },
      _connectDatepicker: function (target, inst) {
        var input = $(target);
        (inst.append = $([])),
          (inst.trigger = $([])),
          input.hasClass(this.markerClassName) ||
            (this._attachments(input, inst),
            input
              .addClass(this.markerClassName)
              .keydown(this._doKeyDown)
              .keypress(this._doKeyPress)
              .keyup(this._doKeyUp)
              .bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value;
              })
              .bind("getData.datepicker", function (event, key) {
                return this._get(inst, key);
              }),
            this._autoSize(inst),
            $.data(target, PROP_NAME, inst));
      },
      _attachments: function (input, inst) {
        var appendText = this._get(inst, "appendText"),
          isRTL = this._get(inst, "isRTL");
        inst.append && inst.append.remove(),
          appendText &&
            ((inst.append = $(
              '<span class="' +
                this._appendClass +
                '">' +
                appendText +
                "</span>"
            )),
            input[isRTL ? "before" : "after"](inst.append)),
          input.unbind("focus", this._showDatepicker),
          inst.trigger && inst.trigger.remove();
        var showOn = this._get(inst, "showOn");
        if (
          (("focus" != showOn && "both" != showOn) ||
            input.focus(this._showDatepicker),
          "button" == showOn || "both" == showOn)
        ) {
          var buttonText = this._get(inst, "buttonText"),
            buttonImage = this._get(inst, "buttonImage");
          (inst.trigger = $(
            this._get(inst, "buttonImageOnly")
              ? $("<img/>").addClass(this._triggerClass).attr({
                  src: buttonImage,
                  alt: buttonText,
                  title: buttonText,
                })
              : $('<button type="button"></button>')
                  .addClass(this._triggerClass)
                  .html(
                    "" == buttonImage
                      ? buttonText
                      : $("<img/>").attr({
                          src: buttonImage,
                          alt: buttonText,
                          title: buttonText,
                        })
                  )
          )),
            input[isRTL ? "before" : "after"](inst.trigger),
            inst.trigger.click(function () {
              return (
                $.datepicker._datepickerShowing &&
                $.datepicker._lastInput == input[0]
                  ? $.datepicker._hideDatepicker()
                  : $.datepicker._showDatepicker(input[0]),
                !1
              );
            });
        }
      },
      _autoSize: function (inst) {
        if (this._get(inst, "autoSize") && !inst.inline) {
          var date = new Date(2009, 11, 20),
            dateFormat = this._get(inst, "dateFormat");
          if (dateFormat.match(/[DM]/)) {
            var findMax = function (names) {
              for (var max = 0, maxI = 0, i = 0; i < names.length; i++)
                names[i].length > max && ((max = names[i].length), (maxI = i));
              return maxI;
            };
            date.setMonth(
              findMax(
                this._get(
                  inst,
                  dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"
                )
              )
            ),
              date.setDate(
                findMax(
                  this._get(
                    inst,
                    dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"
                  )
                ) +
                  20 -
                  date.getDay()
              );
          }
          inst.input.attr("size", this._formatDate(inst, date).length);
        }
      },
      _inlineDatepicker: function (target, inst) {
        var divSpan = $(target);
        divSpan.hasClass(this.markerClassName) ||
          (divSpan
            .addClass(this.markerClassName)
            .append(inst.dpDiv)
            .bind("setData.datepicker", function (event, key, value) {
              inst.settings[key] = value;
            })
            .bind("getData.datepicker", function (event, key) {
              return this._get(inst, key);
            }),
          $.data(target, PROP_NAME, inst),
          this._setDate(inst, this._getDefaultDate(inst), !0),
          this._updateDatepicker(inst),
          this._updateAlternate(inst),
          inst.dpDiv.show());
      },
      _dialogDatepicker: function (input, date, onSelect, settings, pos) {
        var inst = this._dialogInst;
        if (!inst) {
          this.uuid += 1;
          var id = "dp" + this.uuid;
          (this._dialogInput = $(
            '<input type="text" id="' +
              id +
              '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'
          )),
            this._dialogInput.keydown(this._doKeyDown),
            $("body").append(this._dialogInput),
            ((inst = this._dialogInst =
              this._newInst(this._dialogInput, !1)).settings = {}),
            $.data(this._dialogInput[0], PROP_NAME, inst);
        }
        if (
          (extendRemove(inst.settings, settings || {}),
          (date =
            date && date.constructor == Date
              ? this._formatDate(inst, date)
              : date),
          this._dialogInput.val(date),
          (this._pos = pos
            ? pos.length
              ? pos
              : [pos.pageX, pos.pageY]
            : null),
          !this._pos)
        ) {
          var browserWidth = document.documentElement.clientWidth,
            browserHeight = document.documentElement.clientHeight,
            scrollX =
              document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY =
              document.documentElement.scrollTop || document.body.scrollTop;
          this._pos = [
            browserWidth / 2 - 100 + scrollX,
            browserHeight / 2 - 150 + scrollY,
          ];
        }
        return (
          this._dialogInput
            .css("left", this._pos[0] + 20 + "px")
            .css("top", this._pos[1] + "px"),
          (inst.settings.onSelect = onSelect),
          (this._inDialog = !0),
          this.dpDiv.addClass(this._dialogClass),
          this._showDatepicker(this._dialogInput[0]),
          $.blockUI && $.blockUI(this.dpDiv),
          $.data(this._dialogInput[0], PROP_NAME, inst),
          this
        );
      },
      _destroyDatepicker: function (target) {
        var $target = $(target),
          inst = $.data(target, PROP_NAME);
        if ($target.hasClass(this.markerClassName)) {
          var nodeName = target.nodeName.toLowerCase();
          $.removeData(target, PROP_NAME),
            "input" == nodeName
              ? (inst.append.remove(),
                inst.trigger.remove(),
                $target
                  .removeClass(this.markerClassName)
                  .unbind("focus", this._showDatepicker)
                  .unbind("keydown", this._doKeyDown)
                  .unbind("keypress", this._doKeyPress)
                  .unbind("keyup", this._doKeyUp))
              : ("div" != nodeName && "span" != nodeName) ||
                $target.removeClass(this.markerClassName).empty();
        }
      },
      _enableDatepicker: function (target) {
        var $target = $(target),
          inst = $.data(target, PROP_NAME);
        if ($target.hasClass(this.markerClassName)) {
          var nodeName = target.nodeName.toLowerCase();
          if ("input" == nodeName)
            (target.disabled = !1),
              inst.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !1;
                })
                .end()
                .filter("img")
                .css({ opacity: "1.0", cursor: "" });
          else if ("div" == nodeName || "span" == nodeName) {
            var inline;
            $target
              .children("." + this._inlineClass)
              .children()
              .removeClass("ui-state-disabled");
          }
          this._disabledInputs = $.map(this._disabledInputs, function (value) {
            return value == target ? null : value;
          });
        }
      },
      _disableDatepicker: function (target) {
        var $target = $(target),
          inst = $.data(target, PROP_NAME);
        if ($target.hasClass(this.markerClassName)) {
          var nodeName = target.nodeName.toLowerCase();
          if ("input" == nodeName)
            (target.disabled = !0),
              inst.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !0;
                })
                .end()
                .filter("img")
                .css({ opacity: "0.5", cursor: "default" });
          else if ("div" == nodeName || "span" == nodeName) {
            var inline;
            $target
              .children("." + this._inlineClass)
              .children()
              .addClass("ui-state-disabled");
          }
          (this._disabledInputs = $.map(this._disabledInputs, function (value) {
            return value == target ? null : value;
          })),
            (this._disabledInputs[this._disabledInputs.length] = target);
        }
      },
      _isDisabledDatepicker: function (target) {
        if (!target) return !1;
        for (var i = 0; i < this._disabledInputs.length; i++)
          if (this._disabledInputs[i] == target) return !0;
        return !1;
      },
      _getInst: function (target) {
        try {
          return $.data(target, PROP_NAME);
        } catch (err) {
          throw "Missing instance data for this datepicker";
        }
      },
      _optionDatepicker: function (target, name, value) {
        var inst = this._getInst(target);
        if (2 == arguments.length && "string" == typeof name)
          return "defaults" == name
            ? $.extend({}, $.datepicker._defaults)
            : inst
            ? "all" == name
              ? $.extend({}, inst.settings)
              : this._get(inst, name)
            : null;
        var settings = name || {};
        if (
          ("string" == typeof name && ((settings = {})[name] = value), inst)
        ) {
          this._curInst == inst && this._hideDatepicker();
          var date = this._getDateDatepicker(target, !0);
          extendRemove(inst.settings, settings),
            this._attachments($(target), inst),
            this._autoSize(inst),
            this._setDateDatepicker(target, date),
            this._updateDatepicker(inst);
        }
      },
      _changeDatepicker: function (target, name, value) {
        this._optionDatepicker(target, name, value);
      },
      _refreshDatepicker: function (target) {
        var inst = this._getInst(target);
        inst && this._updateDatepicker(inst);
      },
      _setDateDatepicker: function (target, date) {
        var inst = this._getInst(target);
        inst &&
          (this._setDate(inst, date),
          this._updateDatepicker(inst),
          this._updateAlternate(inst));
      },
      _getDateDatepicker: function (target, noDefault) {
        var inst = this._getInst(target);
        return (
          inst && !inst.inline && this._setDateFromField(inst, noDefault),
          inst ? this._getDate(inst) : null
        );
      },
      _doKeyDown: function (event) {
        var inst = $.datepicker._getInst(event.target),
          handled = !0,
          isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
        if (((inst._keyEvent = !0), $.datepicker._datepickerShowing))
          switch (event.keyCode) {
            case 9:
              $.datepicker._hideDatepicker(), (handled = !1);
              break;
            case 13:
              var sel = $(
                "td." +
                  $.datepicker._dayOverClass +
                  ":not(." +
                  $.datepicker._currentClass +
                  ")",
                inst.dpDiv
              );
              return (
                sel[0]
                  ? $.datepicker._selectDay(
                      event.target,
                      inst.selectedMonth,
                      inst.selectedYear,
                      sel[0]
                    )
                  : $.datepicker._hideDatepicker(),
                !1
              );
            case 27:
              $.datepicker._hideDatepicker();
              break;
            case 33:
              $.datepicker._adjustDate(
                event.target,
                event.ctrlKey
                  ? -$.datepicker._get(inst, "stepBigMonths")
                  : -$.datepicker._get(inst, "stepMonths"),
                "M"
              );
              break;
            case 34:
              $.datepicker._adjustDate(
                event.target,
                event.ctrlKey
                  ? +$.datepicker._get(inst, "stepBigMonths")
                  : +$.datepicker._get(inst, "stepMonths"),
                "M"
              );
              break;
            case 35:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._clearDate(event.target),
                (handled = event.ctrlKey || event.metaKey);
              break;
            case 36:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._gotoToday(event.target),
                (handled = event.ctrlKey || event.metaKey);
              break;
            case 37:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"),
                (handled = event.ctrlKey || event.metaKey),
                event.originalEvent.altKey &&
                  $.datepicker._adjustDate(
                    event.target,
                    event.ctrlKey
                      ? -$.datepicker._get(inst, "stepBigMonths")
                      : -$.datepicker._get(inst, "stepMonths"),
                    "M"
                  );
              break;
            case 38:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._adjustDate(event.target, -7, "D"),
                (handled = event.ctrlKey || event.metaKey);
              break;
            case 39:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"),
                (handled = event.ctrlKey || event.metaKey),
                event.originalEvent.altKey &&
                  $.datepicker._adjustDate(
                    event.target,
                    event.ctrlKey
                      ? +$.datepicker._get(inst, "stepBigMonths")
                      : +$.datepicker._get(inst, "stepMonths"),
                    "M"
                  );
              break;
            case 40:
              (event.ctrlKey || event.metaKey) &&
                $.datepicker._adjustDate(event.target, 7, "D"),
                (handled = event.ctrlKey || event.metaKey);
              break;
            default:
              handled = !1;
          }
        else
          36 == event.keyCode && event.ctrlKey
            ? $.datepicker._showDatepicker(this)
            : (handled = !1);
        handled && (event.preventDefault(), event.stopPropagation());
      },
      _doKeyPress: function (event) {
        var inst = $.datepicker._getInst(event.target);
        if ($.datepicker._get(inst, "constrainInput")) {
          var chars = $.datepicker._possibleChars(
              $.datepicker._get(inst, "dateFormat")
            ),
            chr = String.fromCharCode(
              event.charCode == undefined ? event.keyCode : event.charCode
            );
          return (
            event.ctrlKey ||
            event.metaKey ||
            chr < " " ||
            !chars ||
            chars.indexOf(chr) > -1
          );
        }
      },
      _doKeyUp: function (event) {
        var inst = $.datepicker._getInst(event.target);
        if (inst.input.val() != inst.lastVal)
          try {
            var date;
            $.datepicker.parseDate(
              $.datepicker._get(inst, "dateFormat"),
              inst.input ? inst.input.val() : null,
              $.datepicker._getFormatConfig(inst)
            ) &&
              ($.datepicker._setDateFromField(inst),
              $.datepicker._updateAlternate(inst),
              $.datepicker._updateDatepicker(inst));
          } catch (event) {
            $.datepicker.log(event);
          }
        return !0;
      },
      _showDatepicker: function (input) {
        if (
          ("input" != (input = input.target || input).nodeName.toLowerCase() &&
            (input = $("input", input.parentNode)[0]),
          !$.datepicker._isDisabledDatepicker(input) &&
            $.datepicker._lastInput != input)
        ) {
          var inst = $.datepicker._getInst(input);
          $.datepicker._curInst &&
            $.datepicker._curInst != inst &&
            $.datepicker._curInst.dpDiv.stop(!0, !0);
          var beforeShow = $.datepicker._get(inst, "beforeShow");
          extendRemove(
            inst.settings,
            beforeShow ? beforeShow.apply(input, [input, inst]) : {}
          ),
            (inst.lastVal = null),
            ($.datepicker._lastInput = input),
            $.datepicker._setDateFromField(inst),
            $.datepicker._inDialog && (input.value = ""),
            $.datepicker._pos ||
              (($.datepicker._pos = $.datepicker._findPos(input)),
              ($.datepicker._pos[1] += input.offsetHeight));
          var isFixed = !1;
          $(input)
            .parents()
            .each(function () {
              return !(isFixed |= "fixed" == $(this).css("position"));
            }),
            isFixed &&
              $.browser.opera &&
              (($.datepicker._pos[0] -= document.documentElement.scrollLeft),
              ($.datepicker._pos[1] -= document.documentElement.scrollTop));
          var offset = {
            left: $.datepicker._pos[0],
            top: $.datepicker._pos[1],
          };
          if (
            (($.datepicker._pos = null),
            inst.dpDiv.empty(),
            inst.dpDiv.css({
              position: "absolute",
              display: "block",
              top: "-1000px",
            }),
            $.datepicker._updateDatepicker(inst),
            (offset = $.datepicker._checkOffset(inst, offset, isFixed)),
            inst.dpDiv.css({
              position:
                $.datepicker._inDialog && $.blockUI
                  ? "static"
                  : isFixed
                  ? "fixed"
                  : "absolute",
              display: "none",
              left: offset.left + "px",
              top: offset.top + "px",
            }),
            !inst.inline)
          ) {
            var showAnim = $.datepicker._get(inst, "showAnim"),
              duration = $.datepicker._get(inst, "duration"),
              postProcess = function () {
                $.datepicker._datepickerShowing = !0;
                var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                if (cover.length) {
                  var borders = $.datepicker._getBorders(inst.dpDiv);
                  cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight(),
                  });
                }
              };
            inst.dpDiv.zIndex($(input).zIndex() + 1),
              $.effects && $.effects[showAnim]
                ? inst.dpDiv.show(
                    showAnim,
                    $.datepicker._get(inst, "showOptions"),
                    duration,
                    postProcess
                  )
                : inst.dpDiv[showAnim || "show"](
                    showAnim ? duration : null,
                    postProcess
                  ),
              (showAnim && duration) || postProcess(),
              inst.input.is(":visible") &&
                !inst.input.is(":disabled") &&
                inst.input.focus(),
              ($.datepicker._curInst = inst);
          }
        }
      },
      _updateDatepicker: function (inst) {
        var self = this,
          borders = $.datepicker._getBorders(inst.dpDiv);
        inst.dpDiv.empty().append(this._generateHTML(inst));
        var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
        cover.length &&
          cover.css({
            left: -borders[0],
            top: -borders[1],
            width: inst.dpDiv.outerWidth(),
            height: inst.dpDiv.outerHeight(),
          }),
          inst.dpDiv
            .find(
              "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"
            )
            .bind("mouseout", function () {
              $(this).removeClass("ui-state-hover"),
                -1 != this.className.indexOf("ui-datepicker-prev") &&
                  $(this).removeClass("ui-datepicker-prev-hover"),
                -1 != this.className.indexOf("ui-datepicker-next") &&
                  $(this).removeClass("ui-datepicker-next-hover");
            })
            .bind("mouseover", function () {
              self._isDisabledDatepicker(
                inst.inline ? inst.dpDiv.parent()[0] : inst.input[0]
              ) ||
                ($(this)
                  .parents(".ui-datepicker-calendar")
                  .find("a")
                  .removeClass("ui-state-hover"),
                $(this).addClass("ui-state-hover"),
                -1 != this.className.indexOf("ui-datepicker-prev") &&
                  $(this).addClass("ui-datepicker-prev-hover"),
                -1 != this.className.indexOf("ui-datepicker-next") &&
                  $(this).addClass("ui-datepicker-next-hover"));
            })
            .end()
            .find("." + this._dayOverClass + " a")
            .trigger("mouseover")
            .end();
        var numMonths = this._getNumberOfMonths(inst),
          cols = numMonths[1],
          width = 17;
        if (
          (cols > 1
            ? inst.dpDiv
                .addClass("ui-datepicker-multi-" + cols)
                .css("width", 17 * cols + "em")
            : inst.dpDiv
                .removeClass(
                  "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
                )
                .width(""),
          inst.dpDiv[
            (1 != numMonths[0] || 1 != numMonths[1] ? "add" : "remove") +
              "Class"
          ]("ui-datepicker-multi"),
          inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"](
            "ui-datepicker-rtl"
          ),
          inst == $.datepicker._curInst &&
            $.datepicker._datepickerShowing &&
            inst.input &&
            inst.input.is(":visible") &&
            !inst.input.is(":disabled") &&
            inst.input.focus(),
          inst.yearshtml)
        ) {
          var origyearshtml = inst.yearshtml;
          setTimeout(function () {
            origyearshtml === inst.yearshtml &&
              inst.dpDiv
                .find("select.ui-datepicker-year:first")
                .replaceWith(inst.yearshtml),
              (origyearshtml = inst.yearshtml = null);
          }, 0);
        }
      },
      _getBorders: function (elem) {
        var convert = function (value) {
          return { thin: 1, medium: 2, thick: 3 }[value] || value;
        };
        return [
          parseFloat(convert(elem.css("border-left-width"))),
          parseFloat(convert(elem.css("border-top-width"))),
        ];
      },
      _checkOffset: function (inst, offset, isFixed) {
        var dpWidth = inst.dpDiv.outerWidth(),
          dpHeight = inst.dpDiv.outerHeight(),
          inputWidth = inst.input ? inst.input.outerWidth() : 0,
          inputHeight = inst.input ? inst.input.outerHeight() : 0,
          viewWidth =
            document.documentElement.clientWidth + $(document).scrollLeft(),
          viewHeight =
            document.documentElement.clientHeight + $(document).scrollTop();
        return (
          (offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0),
          (offset.left -=
            isFixed && offset.left == inst.input.offset().left
              ? $(document).scrollLeft()
              : 0),
          (offset.top -=
            isFixed && offset.top == inst.input.offset().top + inputHeight
              ? $(document).scrollTop()
              : 0),
          (offset.left -= Math.min(
            offset.left,
            offset.left + dpWidth > viewWidth && viewWidth > dpWidth
              ? Math.abs(offset.left + dpWidth - viewWidth)
              : 0
          )),
          (offset.top -= Math.min(
            offset.top,
            offset.top + dpHeight > viewHeight && viewHeight > dpHeight
              ? Math.abs(dpHeight + inputHeight)
              : 0
          )),
          offset
        );
      },
      _findPos: function (obj) {
        for (
          var inst = this._getInst(obj), isRTL = this._get(inst, "isRTL");
          obj && ("hidden" == obj.type || 1 != obj.nodeType);

        )
          obj = obj[isRTL ? "previousSibling" : "nextSibling"];
        var position = $(obj).offset();
        return [position.left, position.top];
      },
      _hideDatepicker: function (input) {
        var inst = this._curInst;
        if (
          inst &&
          (!input || inst == $.data(input, PROP_NAME)) &&
          this._datepickerShowing
        ) {
          var showAnim = this._get(inst, "showAnim"),
            duration = this._get(inst, "duration"),
            postProcess = function () {
              $.datepicker._tidyDialog(inst), (this._curInst = null);
            };
          $.effects && $.effects[showAnim]
            ? inst.dpDiv.hide(
                showAnim,
                $.datepicker._get(inst, "showOptions"),
                duration,
                postProcess
              )
            : inst.dpDiv[
                "slideDown" == showAnim
                  ? "slideUp"
                  : "fadeIn" == showAnim
                  ? "fadeOut"
                  : "hide"
              ](showAnim ? duration : null, postProcess),
            showAnim || postProcess();
          var onClose = this._get(inst, "onClose");
          onClose &&
            onClose.apply(inst.input ? inst.input[0] : null, [
              inst.input ? inst.input.val() : "",
              inst,
            ]),
            (this._datepickerShowing = !1),
            (this._lastInput = null),
            this._inDialog &&
              (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px",
              }),
              $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))),
            (this._inDialog = !1);
        }
      },
      _tidyDialog: function (inst) {
        inst.dpDiv
          .removeClass(this._dialogClass)
          .unbind(".ui-datepicker-calendar");
      },
      _checkExternalClick: function (event) {
        if ($.datepicker._curInst) {
          var $target = $(event.target);
          $target[0].id == $.datepicker._mainDivId ||
            0 != $target.parents("#" + $.datepicker._mainDivId).length ||
            $target.hasClass($.datepicker.markerClassName) ||
            $target.hasClass($.datepicker._triggerClass) ||
            !$.datepicker._datepickerShowing ||
            ($.datepicker._inDialog && $.blockUI) ||
            $.datepicker._hideDatepicker();
        }
      },
      _adjustDate: function (id, offset, period) {
        var target = $(id),
          inst = this._getInst(target[0]);
        this._isDisabledDatepicker(target[0]) ||
          (this._adjustInstDate(
            inst,
            offset + ("M" == period ? this._get(inst, "showCurrentAtPos") : 0),
            period
          ),
          this._updateDatepicker(inst));
      },
      _gotoToday: function (id) {
        var target = $(id),
          inst = this._getInst(target[0]);
        if (this._get(inst, "gotoCurrent") && inst.currentDay)
          (inst.selectedDay = inst.currentDay),
            (inst.drawMonth = inst.selectedMonth = inst.currentMonth),
            (inst.drawYear = inst.selectedYear = inst.currentYear);
        else {
          var date = new Date();
          (inst.selectedDay = date.getDate()),
            (inst.drawMonth = inst.selectedMonth = date.getMonth()),
            (inst.drawYear = inst.selectedYear = date.getFullYear());
        }
        this._notifyChange(inst), this._adjustDate(target);
      },
      _selectMonthYear: function (id, select, period) {
        var target = $(id),
          inst = this._getInst(target[0]);
        (inst._selectingMonthYear = !1),
          (inst["selected" + ("M" == period ? "Month" : "Year")] = inst[
            "draw" + ("M" == period ? "Month" : "Year")
          ] =
            parseInt(select.options[select.selectedIndex].value, 10)),
          this._notifyChange(inst),
          this._adjustDate(target);
      },
      _clickMonthYear: function (id) {
        var target = $(id),
          inst = this._getInst(target[0]);
        inst.input &&
          inst._selectingMonthYear &&
          setTimeout(function () {
            inst.input.focus();
          }, 0),
          (inst._selectingMonthYear = !inst._selectingMonthYear);
      },
      _selectDay: function (id, month, year, td) {
        var target = $(id);
        if (
          !$(td).hasClass(this._unselectableClass) &&
          !this._isDisabledDatepicker(target[0])
        ) {
          var inst = this._getInst(target[0]);
          (inst.selectedDay = inst.currentDay = $("a", td).html()),
            (inst.selectedMonth = inst.currentMonth = month),
            (inst.selectedYear = inst.currentYear = year),
            this._selectDate(
              id,
              this._formatDate(
                inst,
                inst.currentDay,
                inst.currentMonth,
                inst.currentYear
              )
            );
        }
      },
      _clearDate: function (id) {
        var target = $(id),
          inst = this._getInst(target[0]);
        this._selectDate(target, "");
      },
      _selectDate: function (id, dateStr) {
        var target = $(id),
          inst = this._getInst(target[0]);
        (dateStr = null != dateStr ? dateStr : this._formatDate(inst)),
          inst.input && inst.input.val(dateStr),
          this._updateAlternate(inst);
        var onSelect = this._get(inst, "onSelect");
        onSelect
          ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])
          : inst.input && inst.input.trigger("change"),
          inst.inline
            ? this._updateDatepicker(inst)
            : (this._hideDatepicker(),
              (this._lastInput = inst.input[0]),
              "object" != typeof inst.input[0] && inst.input.focus(),
              (this._lastInput = null));
      },
      _updateAlternate: function (inst) {
        var altField = this._get(inst, "altField");
        if (altField) {
          var altFormat =
              this._get(inst, "altFormat") || this._get(inst, "dateFormat"),
            date = this._getDate(inst),
            dateStr = this.formatDate(
              altFormat,
              date,
              this._getFormatConfig(inst)
            );
          $(altField).each(function () {
            $(this).val(dateStr);
          });
        }
      },
      noWeekends: function (date) {
        var day = date.getDay();
        return [day > 0 && day < 6, ""];
      },
      iso8601Week: function (date) {
        var checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        return (
          checkDate.setMonth(0),
          checkDate.setDate(1),
          Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        );
      },
      parseDate: function (format, value, settings) {
        if (null == format || null == value) throw "Invalid arguments";
        if (
          "" ==
          (value = "object" == typeof value ? value.toString() : value + "")
        )
          return null;
        for (
          var shortYearCutoff =
              (settings ? settings.shortYearCutoff : null) ||
              this._defaults.shortYearCutoff,
            dayNamesShort =
              (settings ? settings.dayNamesShort : null) ||
              this._defaults.dayNamesShort,
            dayNames =
              (settings ? settings.dayNames : null) || this._defaults.dayNames,
            monthNamesShort =
              (settings ? settings.monthNamesShort : null) ||
              this._defaults.monthNamesShort,
            monthNames =
              (settings ? settings.monthNames : null) ||
              this._defaults.monthNames,
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = !1,
            lookAhead = function (match) {
              var matches =
                iFormat + 1 < format.length &&
                format.charAt(iFormat + 1) == match;
              return matches && iFormat++, matches;
            },
            getNumber = function (match) {
              var isDoubled = lookAhead(match),
                size,
                digits = new RegExp(
                  "^\\d{1," +
                    ("@" == match
                      ? 14
                      : "!" == match
                      ? 20
                      : "y" == match && isDoubled
                      ? 4
                      : "o" == match
                      ? 3
                      : 2) +
                    "}"
                ),
                num = value.substring(iValue).match(digits);
              if (!num) throw "Missing number at position " + iValue;
              return (iValue += num[0].length), parseInt(num[0], 10);
            },
            getName = function (match, shortNames, longNames) {
              for (
                var names = lookAhead(match) ? longNames : shortNames, i = 0;
                i < names.length;
                i++
              )
                if (
                  value.substr(iValue, names[i].length).toLowerCase() ==
                  names[i].toLowerCase()
                )
                  return (iValue += names[i].length), i + 1;
              throw "Unknown name at position " + iValue;
            },
            checkLiteral = function () {
              if (value.charAt(iValue) != format.charAt(iFormat))
                throw "Unexpected literal at position " + iValue;
              iValue++;
            },
            iValue = 0,
            iFormat = 0;
          iFormat < format.length;
          iFormat++
        )
          if (literal)
            "'" != format.charAt(iFormat) || lookAhead("'")
              ? checkLiteral()
              : (literal = !1);
          else
            switch (format.charAt(iFormat)) {
              case "d":
                day = getNumber("d");
                break;
              case "D":
                getName("D", dayNamesShort, dayNames);
                break;
              case "o":
                doy = getNumber("o");
                break;
              case "m":
                month = getNumber("m");
                break;
              case "M":
                month = getName("M", monthNamesShort, monthNames);
                break;
              case "y":
                year = getNumber("y");
                break;
              case "@":
                var date;
                (year = (date = new Date(getNumber("@"))).getFullYear()),
                  (month = date.getMonth() + 1),
                  (day = date.getDate());
                break;
              case "!":
                var date;
                (year = (date = new Date(
                  (getNumber("!") - this._ticksTo1970) / 1e4
                )).getFullYear()),
                  (month = date.getMonth() + 1),
                  (day = date.getDate());
                break;
              case "'":
                lookAhead("'") ? checkLiteral() : (literal = !0);
                break;
              default:
                checkLiteral();
            }
        if (
          (-1 == year
            ? (year = new Date().getFullYear())
            : year < 100 &&
              (year +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (year <= shortYearCutoff ? 0 : -100)),
          doy > -1)
        )
          for (month = 1, day = doy; ; ) {
            var dim = this._getDaysInMonth(year, month - 1);
            if (day <= dim) break;
            month++, (day -= dim);
          }
        var date;
        if (
          (date = this._daylightSavingAdjust(
            new Date(year, month - 1, day)
          )).getFullYear() != year ||
          date.getMonth() + 1 != month ||
          date.getDate() != day
        )
          throw "Invalid date";
        return date;
      },
      ATOM: "yy-mm-dd",
      COOKIE: "D, dd M yy",
      ISO_8601: "yy-mm-dd",
      RFC_822: "D, d M y",
      RFC_850: "DD, dd-M-y",
      RFC_1036: "D, d M y",
      RFC_1123: "D, d M yy",
      RFC_2822: "D, d M yy",
      RSS: "D, d M y",
      TICKS: "!",
      TIMESTAMP: "@",
      W3C: "yy-mm-dd",
      _ticksTo1970:
        24 *
        (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) *
        60 *
        60 *
        1e7,
      formatDate: function (format, date, settings) {
        if (!date) return "";
        var dayNamesShort =
            (settings ? settings.dayNamesShort : null) ||
            this._defaults.dayNamesShort,
          dayNames =
            (settings ? settings.dayNames : null) || this._defaults.dayNames,
          monthNamesShort =
            (settings ? settings.monthNamesShort : null) ||
            this._defaults.monthNamesShort,
          monthNames =
            (settings ? settings.monthNames : null) ||
            this._defaults.monthNames,
          lookAhead = function (match) {
            var matches =
              iFormat + 1 < format.length &&
              format.charAt(iFormat + 1) == match;
            return matches && iFormat++, matches;
          },
          formatNumber = function (match, value, len) {
            var num = "" + value;
            if (lookAhead(match)) for (; num.length < len; ) num = "0" + num;
            return num;
          },
          formatName = function (match, value, shortNames, longNames) {
            return lookAhead(match) ? longNames[value] : shortNames[value];
          },
          output = "",
          literal = !1;
        if (date)
          for (var iFormat = 0; iFormat < format.length; iFormat++)
            if (literal)
              "'" != format.charAt(iFormat) || lookAhead("'")
                ? (output += format.charAt(iFormat))
                : (literal = !1);
            else
              switch (format.charAt(iFormat)) {
                case "d":
                  output += formatNumber("d", date.getDate(), 2);
                  break;
                case "D":
                  output += formatName(
                    "D",
                    date.getDay(),
                    dayNamesShort,
                    dayNames
                  );
                  break;
                case "o":
                  output += formatNumber(
                    "o",
                    (date.getTime() -
                      new Date(date.getFullYear(), 0, 0).getTime()) /
                      864e5,
                    3
                  );
                  break;
                case "m":
                  output += formatNumber("m", date.getMonth() + 1, 2);
                  break;
                case "M":
                  output += formatName(
                    "M",
                    date.getMonth(),
                    monthNamesShort,
                    monthNames
                  );
                  break;
                case "y":
                  output += lookAhead("y")
                    ? date.getFullYear()
                    : (date.getYear() % 100 < 10 ? "0" : "") +
                      (date.getYear() % 100);
                  break;
                case "@":
                  output += date.getTime();
                  break;
                case "!":
                  output += 1e4 * date.getTime() + this._ticksTo1970;
                  break;
                case "'":
                  lookAhead("'") ? (output += "'") : (literal = !0);
                  break;
                default:
                  output += format.charAt(iFormat);
              }
        return output;
      },
      _possibleChars: function (format) {
        for (
          var chars = "",
            literal = !1,
            lookAhead = function (match) {
              var matches =
                iFormat + 1 < format.length &&
                format.charAt(iFormat + 1) == match;
              return matches && iFormat++, matches;
            },
            iFormat = 0;
          iFormat < format.length;
          iFormat++
        )
          if (literal)
            "'" != format.charAt(iFormat) || lookAhead("'")
              ? (chars += format.charAt(iFormat))
              : (literal = !1);
          else
            switch (format.charAt(iFormat)) {
              case "d":
              case "m":
              case "y":
              case "@":
                chars += "0123456789";
                break;
              case "D":
              case "M":
                return null;
              case "'":
                lookAhead("'") ? (chars += "'") : (literal = !0);
                break;
              default:
                chars += format.charAt(iFormat);
            }
        return chars;
      },
      _get: function (inst, name) {
        return inst.settings[name] !== undefined
          ? inst.settings[name]
          : this._defaults[name];
      },
      _setDateFromField: function (inst, noDefault) {
        if (inst.input.val() != inst.lastVal) {
          var dateFormat = this._get(inst, "dateFormat"),
            dates = (inst.lastVal = inst.input ? inst.input.val() : null),
            date,
            defaultDate;
          date = defaultDate = this._getDefaultDate(inst);
          var settings = this._getFormatConfig(inst);
          try {
            date = this.parseDate(dateFormat, dates, settings) || defaultDate;
          } catch (event) {
            this.log(event), (dates = noDefault ? "" : dates);
          }
          (inst.selectedDay = date.getDate()),
            (inst.drawMonth = inst.selectedMonth = date.getMonth()),
            (inst.drawYear = inst.selectedYear = date.getFullYear()),
            (inst.currentDay = dates ? date.getDate() : 0),
            (inst.currentMonth = dates ? date.getMonth() : 0),
            (inst.currentYear = dates ? date.getFullYear() : 0),
            this._adjustInstDate(inst);
        }
      },
      _getDefaultDate: function (inst) {
        return this._restrictMinMax(
          inst,
          this._determineDate(inst, this._get(inst, "defaultDate"), new Date())
        );
      },
      _determineDate: function (inst, date, defaultDate) {
        var offsetNumeric = function (offset) {
            var date = new Date();
            return date.setDate(date.getDate() + offset), date;
          },
          offsetString = function (offset) {
            try {
              return $.datepicker.parseDate(
                $.datepicker._get(inst, "dateFormat"),
                offset,
                $.datepicker._getFormatConfig(inst)
              );
            } catch (e) {}
            for (
              var date =
                  (offset.toLowerCase().match(/^c/)
                    ? $.datepicker._getDate(inst)
                    : null) || new Date(),
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                matches = pattern.exec(offset);
              matches;

            ) {
              switch (matches[2] || "d") {
                case "d":
                case "D":
                  day += parseInt(matches[1], 10);
                  break;
                case "w":
                case "W":
                  day += 7 * parseInt(matches[1], 10);
                  break;
                case "m":
                case "M":
                  (month += parseInt(matches[1], 10)),
                    (day = Math.min(
                      day,
                      $.datepicker._getDaysInMonth(year, month)
                    ));
                  break;
                case "y":
                case "Y":
                  (year += parseInt(matches[1], 10)),
                    (day = Math.min(
                      day,
                      $.datepicker._getDaysInMonth(year, month)
                    ));
              }
              matches = pattern.exec(offset);
            }
            return new Date(year, month, day);
          },
          newDate =
            null == date || "" === date
              ? defaultDate
              : "string" == typeof date
              ? offsetString(date)
              : "number" == typeof date
              ? isNaN(date)
                ? defaultDate
                : offsetNumeric(date)
              : new Date(date.getTime());
        return (
          (newDate =
            newDate && "Invalid Date" == newDate.toString()
              ? defaultDate
              : newDate) &&
            (newDate.setHours(0),
            newDate.setMinutes(0),
            newDate.setSeconds(0),
            newDate.setMilliseconds(0)),
          this._daylightSavingAdjust(newDate)
        );
      },
      _daylightSavingAdjust: function (date) {
        return date
          ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0),
            date)
          : null;
      },
      _setDate: function (inst, date, noChange) {
        var clear = !date,
          origMonth = inst.selectedMonth,
          origYear = inst.selectedYear,
          newDate = this._restrictMinMax(
            inst,
            this._determineDate(inst, date, new Date())
          );
        (inst.selectedDay = inst.currentDay = newDate.getDate()),
          (inst.drawMonth =
            inst.selectedMonth =
            inst.currentMonth =
              newDate.getMonth()),
          (inst.drawYear =
            inst.selectedYear =
            inst.currentYear =
              newDate.getFullYear()),
          (origMonth == inst.selectedMonth && origYear == inst.selectedYear) ||
            noChange ||
            this._notifyChange(inst),
          this._adjustInstDate(inst),
          inst.input && inst.input.val(clear ? "" : this._formatDate(inst));
      },
      _getDate: function (inst) {
        var startDate;
        return !inst.currentYear || (inst.input && "" == inst.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
            );
      },
      _generateHTML: function (inst) {
        var today = new Date();
        today = this._daylightSavingAdjust(
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        );
        var isRTL = this._get(inst, "isRTL"),
          showButtonPanel = this._get(inst, "showButtonPanel"),
          hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
          navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
          numMonths = this._getNumberOfMonths(inst),
          showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
          stepMonths = this._get(inst, "stepMonths"),
          isMultiMonth = 1 != numMonths[0] || 1 != numMonths[1],
          currentDate = this._daylightSavingAdjust(
            inst.currentDay
              ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
              : new Date(9999, 9, 9)
          ),
          minDate = this._getMinMaxDate(inst, "min"),
          maxDate = this._getMinMaxDate(inst, "max"),
          drawMonth = inst.drawMonth - showCurrentAtPos,
          drawYear = inst.drawYear;
        if ((drawMonth < 0 && ((drawMonth += 12), drawYear--), maxDate)) {
          var maxDraw = this._daylightSavingAdjust(
            new Date(
              maxDate.getFullYear(),
              maxDate.getMonth() - numMonths[0] * numMonths[1] + 1,
              maxDate.getDate()
            )
          );
          for (
            maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
            this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) >
            maxDraw;

          )
            --drawMonth < 0 && ((drawMonth = 11), drawYear--);
        }
        (inst.drawMonth = drawMonth), (inst.drawYear = drawYear);
        var prevText = this._get(inst, "prevText");
        prevText = navigationAsDateFormat
          ? this.formatDate(
              prevText,
              this._daylightSavingAdjust(
                new Date(drawYear, drawMonth - stepMonths, 1)
              ),
              this._getFormatConfig(inst)
            )
          : prevText;
        var prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth)
            ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' +
              dpuuid +
              ".datepicker._adjustDate('#" +
              inst.id +
              "', -" +
              stepMonths +
              ", 'M');\" title=\"" +
              prevText +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (isRTL ? "e" : "w") +
              '">' +
              prevText +
              "</span></a>"
            : hideIfNoPrevNext
            ? ""
            : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' +
              prevText +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (isRTL ? "e" : "w") +
              '">' +
              prevText +
              "</span></a>",
          nextText = this._get(inst, "nextText");
        nextText = navigationAsDateFormat
          ? this.formatDate(
              nextText,
              this._daylightSavingAdjust(
                new Date(drawYear, drawMonth + stepMonths, 1)
              ),
              this._getFormatConfig(inst)
            )
          : nextText;
        var next = this._canAdjustMonth(inst, 1, drawYear, drawMonth)
            ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' +
              dpuuid +
              ".datepicker._adjustDate('#" +
              inst.id +
              "', +" +
              stepMonths +
              ", 'M');\" title=\"" +
              nextText +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (isRTL ? "w" : "e") +
              '">' +
              nextText +
              "</span></a>"
            : hideIfNoPrevNext
            ? ""
            : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' +
              nextText +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (isRTL ? "w" : "e") +
              '">' +
              nextText +
              "</span></a>",
          currentText = this._get(inst, "currentText"),
          gotoDate =
            this._get(inst, "gotoCurrent") && inst.currentDay
              ? currentDate
              : today;
        currentText = navigationAsDateFormat
          ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst))
          : currentText;
        var controls = inst.inline
            ? ""
            : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' +
              dpuuid +
              '.datepicker._hideDatepicker();">' +
              this._get(inst, "closeText") +
              "</button>",
          buttonPanel = showButtonPanel
            ? '<div class="ui-datepicker-buttonpane ui-widget-content">' +
              (isRTL ? controls : "") +
              (this._isInRange(inst, gotoDate)
                ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' +
                  dpuuid +
                  ".datepicker._gotoToday('#" +
                  inst.id +
                  "');\">" +
                  currentText +
                  "</button>"
                : "") +
              (isRTL ? "" : controls) +
              "</div>"
            : "",
          firstDay = parseInt(this._get(inst, "firstDay"), 10);
        firstDay = isNaN(firstDay) ? 0 : firstDay;
        for (
          var showWeek = this._get(inst, "showWeek"),
            dayNames = this._get(inst, "dayNames"),
            dayNamesShort = this._get(inst, "dayNamesShort"),
            dayNamesMin = this._get(inst, "dayNamesMin"),
            monthNames = this._get(inst, "monthNames"),
            monthNamesShort = this._get(inst, "monthNamesShort"),
            beforeShowDay = this._get(inst, "beforeShowDay"),
            showOtherMonths = this._get(inst, "showOtherMonths"),
            selectOtherMonths = this._get(inst, "selectOtherMonths"),
            calculateWeek =
              this._get(inst, "calculateWeek") || this.iso8601Week,
            defaultDate = this._getDefaultDate(inst),
            html = "",
            row = 0;
          row < numMonths[0];
          row++
        ) {
          for (var group = "", col = 0; col < numMonths[1]; col++) {
            var selectedDate = this._daylightSavingAdjust(
                new Date(drawYear, drawMonth, inst.selectedDay)
              ),
              cornerClass = " ui-corner-all",
              calender = "";
            if (isMultiMonth) {
              if (
                ((calender += '<div class="ui-datepicker-group'),
                numMonths[1] > 1)
              )
                switch (col) {
                  case 0:
                    (calender += " ui-datepicker-group-first"),
                      (cornerClass =
                        " ui-corner-" + (isRTL ? "right" : "left"));
                    break;
                  case numMonths[1] - 1:
                    (calender += " ui-datepicker-group-last"),
                      (cornerClass =
                        " ui-corner-" + (isRTL ? "left" : "right"));
                    break;
                  default:
                    (calender += " ui-datepicker-group-middle"),
                      (cornerClass = "");
                }
              calender += '">';
            }
            calender +=
              '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' +
              cornerClass +
              '">' +
              (/all|left/.test(cornerClass) && 0 == row
                ? isRTL
                  ? next
                  : prev
                : "") +
              (/all|right/.test(cornerClass) && 0 == row
                ? isRTL
                  ? prev
                  : next
                : "") +
              this._generateMonthYearHeader(
                inst,
                drawMonth,
                drawYear,
                minDate,
                maxDate,
                row > 0 || col > 0,
                monthNames,
                monthNamesShort
              ) +
              '</div><table class="ui-datepicker-calendar"><thead><tr>';
            for (
              var thead = showWeek
                  ? '<th class="ui-datepicker-week-col">' +
                    this._get(inst, "weekHeader") +
                    "</th>"
                  : "",
                dow = 0;
              dow < 7;
              dow++
            ) {
              var day = (dow + firstDay) % 7;
              thead +=
                "<th" +
                ((dow + firstDay + 6) % 7 >= 5
                  ? ' class="ui-datepicker-week-end"'
                  : "") +
                '><span title="' +
                dayNames[day] +
                '">' +
                dayNamesMin[day] +
                "</span></th>";
            }
            calender += thead + "</tr></thead><tbody>";
            var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
            drawYear == inst.selectedYear &&
              drawMonth == inst.selectedMonth &&
              (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth));
            for (
              var leadDays =
                  (this._getFirstDayOfMonth(drawYear, drawMonth) -
                    firstDay +
                    7) %
                  7,
                numRows = isMultiMonth
                  ? 6
                  : Math.ceil((leadDays + daysInMonth) / 7),
                printDate = this._daylightSavingAdjust(
                  new Date(drawYear, drawMonth, 1 - leadDays)
                ),
                dRow = 0;
              dRow < numRows;
              dRow++
            ) {
              calender += "<tr>";
              for (
                var tbody = showWeek
                    ? '<td class="ui-datepicker-week-col">' +
                      this._get(inst, "calculateWeek")(printDate) +
                      "</td>"
                    : "",
                  dow = 0;
                dow < 7;
                dow++
              ) {
                var daySettings = beforeShowDay
                    ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [
                        printDate,
                      ])
                    : [!0, ""],
                  otherMonth = printDate.getMonth() != drawMonth,
                  unselectable =
                    (otherMonth && !selectOtherMonths) ||
                    !daySettings[0] ||
                    (minDate && printDate < minDate) ||
                    (maxDate && printDate > maxDate);
                (tbody +=
                  '<td class="' +
                  ((dow + firstDay + 6) % 7 >= 5
                    ? " ui-datepicker-week-end"
                    : "") +
                  (otherMonth ? " ui-datepicker-other-month" : "") +
                  ((printDate.getTime() == selectedDate.getTime() &&
                    drawMonth == inst.selectedMonth &&
                    inst._keyEvent) ||
                  (defaultDate.getTime() == printDate.getTime() &&
                    defaultDate.getTime() == selectedDate.getTime())
                    ? " " + this._dayOverClass
                    : "") +
                  (unselectable
                    ? " " + this._unselectableClass + " ui-state-disabled"
                    : "") +
                  (otherMonth && !showOtherMonths
                    ? ""
                    : " " +
                      daySettings[1] +
                      (printDate.getTime() == currentDate.getTime()
                        ? " " + this._currentClass
                        : "") +
                      (printDate.getTime() == today.getTime()
                        ? " ui-datepicker-today"
                        : "")) +
                  '"' +
                  ((otherMonth && !showOtherMonths) || !daySettings[2]
                    ? ""
                    : ' title="' + daySettings[2] + '"') +
                  (unselectable
                    ? ""
                    : ' onclick="DP_jQuery_' +
                      dpuuid +
                      ".datepicker._selectDay('#" +
                      inst.id +
                      "'," +
                      printDate.getMonth() +
                      "," +
                      printDate.getFullYear() +
                      ', this);return false;"') +
                  ">" +
                  (otherMonth && !showOtherMonths
                    ? "&#xa0;"
                    : unselectable
                    ? '<span class="ui-state-default">' +
                      printDate.getDate() +
                      "</span>"
                    : '<a class="ui-state-default' +
                      (printDate.getTime() == today.getTime()
                        ? " ui-state-highlight"
                        : "") +
                      (printDate.getTime() == currentDate.getTime()
                        ? " ui-state-active"
                        : "") +
                      (otherMonth ? " ui-priority-secondary" : "") +
                      '" href="#">' +
                      printDate.getDate() +
                      "</a>") +
                  "</td>"),
                  printDate.setDate(printDate.getDate() + 1),
                  (printDate = this._daylightSavingAdjust(printDate));
              }
              calender += tbody + "</tr>";
            }
            ++drawMonth > 11 && ((drawMonth = 0), drawYear++),
              (group += calender +=
                "</tbody></table>" +
                (isMultiMonth
                  ? "</div>" +
                    (numMonths[0] > 0 && col == numMonths[1] - 1
                      ? '<div class="ui-datepicker-row-break"></div>'
                      : "")
                  : ""));
          }
          html += group;
        }
        return (
          (html +=
            buttonPanel +
            ($.browser.msie &&
            parseInt($.browser.version, 10) < 7 &&
            !inst.inline
              ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>'
              : "")),
          (inst._keyEvent = !1),
          html
        );
      },
      _generateMonthYearHeader: function (
        inst,
        drawMonth,
        drawYear,
        minDate,
        maxDate,
        secondary,
        monthNames,
        monthNamesShort
      ) {
        var changeMonth = this._get(inst, "changeMonth"),
          changeYear = this._get(inst, "changeYear"),
          showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
          html = '<div class="ui-datepicker-title">',
          monthHtml = "";
        if (secondary || !changeMonth)
          monthHtml +=
            '<span class="ui-datepicker-month">' +
            monthNames[drawMonth] +
            "</span>";
        else {
          var inMinYear = minDate && minDate.getFullYear() == drawYear,
            inMaxYear = maxDate && maxDate.getFullYear() == drawYear;
          monthHtml +=
            '<select class="ui-datepicker-month" onchange="DP_jQuery_' +
            dpuuid +
            ".datepicker._selectMonthYear('#" +
            inst.id +
            "', this, 'M');\" onclick=\"DP_jQuery_" +
            dpuuid +
            ".datepicker._clickMonthYear('#" +
            inst.id +
            "');\">";
          for (var month = 0; month < 12; month++)
            (!inMinYear || month >= minDate.getMonth()) &&
              (!inMaxYear || month <= maxDate.getMonth()) &&
              (monthHtml +=
                '<option value="' +
                month +
                '"' +
                (month == drawMonth ? ' selected="selected"' : "") +
                ">" +
                monthNamesShort[month] +
                "</option>");
          monthHtml += "</select>";
        }
        if (
          (showMonthAfterYear ||
            (html +=
              monthHtml +
              (!secondary && changeMonth && changeYear ? "" : "&#xa0;")),
          (inst.yearshtml = ""),
          secondary || !changeYear)
        )
          html += '<span class="ui-datepicker-year">' + drawYear + "</span>";
        else {
          var years = this._get(inst, "yearRange").split(":"),
            thisYear = new Date().getFullYear(),
            determineYear = function (value) {
              var year = value.match(/c[+-].*/)
                ? drawYear + parseInt(value.substring(1), 10)
                : value.match(/[+-].*/)
                ? thisYear + parseInt(value, 10)
                : parseInt(value, 10);
              return isNaN(year) ? thisYear : year;
            },
            year = determineYear(years[0]),
            endYear = Math.max(year, determineYear(years[1] || ""));
          for (
            year = minDate ? Math.max(year, minDate.getFullYear()) : year,
              endYear = maxDate
                ? Math.min(endYear, maxDate.getFullYear())
                : endYear,
              inst.yearshtml +=
                '<select class="ui-datepicker-year" onchange="DP_jQuery_' +
                dpuuid +
                ".datepicker._selectMonthYear('#" +
                inst.id +
                "', this, 'Y');\" onclick=\"DP_jQuery_" +
                dpuuid +
                ".datepicker._clickMonthYear('#" +
                inst.id +
                "');\">";
            year <= endYear;
            year++
          )
            inst.yearshtml +=
              '<option value="' +
              year +
              '"' +
              (year == drawYear ? ' selected="selected"' : "") +
              ">" +
              year +
              "</option>";
          (inst.yearshtml += "</select>"),
            $.browser.mozilla
              ? (html +=
                  '<select class="ui-datepicker-year"><option value="' +
                  drawYear +
                  '" selected="selected">' +
                  drawYear +
                  "</option></select>")
              : ((html += inst.yearshtml), (inst.yearshtml = null));
        }
        return (
          (html += this._get(inst, "yearSuffix")),
          showMonthAfterYear &&
            (html +=
              (!secondary && changeMonth && changeYear ? "" : "&#xa0;") +
              monthHtml),
          (html += "</div>")
        );
      },
      _adjustInstDate: function (inst, offset, period) {
        var year = inst.drawYear + ("Y" == period ? offset : 0),
          month = inst.drawMonth + ("M" == period ? offset : 0),
          day =
            Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
            ("D" == period ? offset : 0),
          date = this._restrictMinMax(
            inst,
            this._daylightSavingAdjust(new Date(year, month, day))
          );
        (inst.selectedDay = date.getDate()),
          (inst.drawMonth = inst.selectedMonth = date.getMonth()),
          (inst.drawYear = inst.selectedYear = date.getFullYear()),
          ("M" != period && "Y" != period) || this._notifyChange(inst);
      },
      _restrictMinMax: function (inst, date) {
        var minDate = this._getMinMaxDate(inst, "min"),
          maxDate = this._getMinMaxDate(inst, "max"),
          newDate = minDate && date < minDate ? minDate : date;
        return (newDate = maxDate && newDate > maxDate ? maxDate : newDate);
      },
      _notifyChange: function (inst) {
        var onChange = this._get(inst, "onChangeMonthYear");
        onChange &&
          onChange.apply(inst.input ? inst.input[0] : null, [
            inst.selectedYear,
            inst.selectedMonth + 1,
            inst,
          ]);
      },
      _getNumberOfMonths: function (inst) {
        var numMonths = this._get(inst, "numberOfMonths");
        return null == numMonths
          ? [1, 1]
          : "number" == typeof numMonths
          ? [1, numMonths]
          : numMonths;
      },
      _getMinMaxDate: function (inst, minMax) {
        return this._determineDate(
          inst,
          this._get(inst, minMax + "Date"),
          null
        );
      },
      _getDaysInMonth: function (year, month) {
        return 32 - new Date(year, month, 32).getDate();
      },
      _getFirstDayOfMonth: function (year, month) {
        return new Date(year, month, 1).getDay();
      },
      _canAdjustMonth: function (inst, offset, curYear, curMonth) {
        var numMonths = this._getNumberOfMonths(inst),
          date = this._daylightSavingAdjust(
            new Date(
              curYear,
              curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]),
              1
            )
          );
        return (
          offset < 0 &&
            date.setDate(
              this._getDaysInMonth(date.getFullYear(), date.getMonth())
            ),
          this._isInRange(inst, date)
        );
      },
      _isInRange: function (inst, date) {
        var minDate = this._getMinMaxDate(inst, "min"),
          maxDate = this._getMinMaxDate(inst, "max");
        return (
          (!minDate || date.getTime() >= minDate.getTime()) &&
          (!maxDate || date.getTime() <= maxDate.getTime())
        );
      },
      _getFormatConfig: function (inst) {
        var shortYearCutoff = this._get(inst, "shortYearCutoff");
        return {
          shortYearCutoff: (shortYearCutoff =
            "string" != typeof shortYearCutoff
              ? shortYearCutoff
              : (new Date().getFullYear() % 100) +
                parseInt(shortYearCutoff, 10)),
          dayNamesShort: this._get(inst, "dayNamesShort"),
          dayNames: this._get(inst, "dayNames"),
          monthNamesShort: this._get(inst, "monthNamesShort"),
          monthNames: this._get(inst, "monthNames"),
        };
      },
      _formatDate: function (inst, day, month, year) {
        day ||
          ((inst.currentDay = inst.selectedDay),
          (inst.currentMonth = inst.selectedMonth),
          (inst.currentYear = inst.selectedYear));
        var date = day
          ? "object" == typeof day
            ? day
            : this._daylightSavingAdjust(new Date(year, month, day))
          : this._daylightSavingAdjust(
              new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
            );
        return this.formatDate(
          this._get(inst, "dateFormat"),
          date,
          this._getFormatConfig(inst)
        );
      },
    }),
      ($.fn.datepicker = function (options) {
        $.datepicker.initialized ||
          ($(document)
            .mousedown($.datepicker._checkExternalClick)
            .find("body")
            .append($.datepicker.dpDiv),
          ($.datepicker.initialized = !0));
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options ||
          ("isDisabled" != options &&
            "getDate" != options &&
            "widget" != options)
          ? "option" == options &&
            2 == arguments.length &&
            "string" == typeof arguments[1]
            ? $.datepicker["_" + options + "Datepicker"].apply(
                $.datepicker,
                [this[0]].concat(otherArgs)
              )
            : this.each(function () {
                "string" == typeof options
                  ? $.datepicker["_" + options + "Datepicker"].apply(
                      $.datepicker,
                      [this].concat(otherArgs)
                    )
                  : $.datepicker._attachDatepicker(this, options);
              })
          : $.datepicker["_" + options + "Datepicker"].apply(
              $.datepicker,
              [this[0]].concat(otherArgs)
            );
      }),
      ($.datepicker = new Datepicker()),
      ($.datepicker.initialized = !1),
      ($.datepicker.uuid = new Date().getTime()),
      ($.datepicker.version = "1.8.7"),
      (window["DP_jQuery_" + dpuuid] = $);
  })(jQuery),
  (function ($, undefined) {
    var uiDialogClasses =
        "ui-dialog ui-widget ui-widget-content ui-corner-all ",
      sizeRelatedOptions = {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0,
      },
      resizableRelatedOptions = {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
      };
    $.widget("ui.dialog", {
      options: {
        autoOpen: !0,
        buttons: {},
        closeOnEscape: !0,
        closeText: "close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: !1,
        maxWidth: !1,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          collision: "fit",
          using: function (pos) {
            var topOffset = $(this).css(pos).offset().top;
            topOffset < 0 && $(this).css("top", pos.top - topOffset);
          },
        },
        resizable: !0,
        show: null,
        stack: !0,
        title: "",
        width: 300,
        zIndex: 1e3,
      },
      _create: function () {
        (this.originalTitle = this.element.attr("title")),
          "string" != typeof this.originalTitle && (this.originalTitle = ""),
          (this.options.title = this.options.title || this.originalTitle);
        var self = this,
          options = self.options,
          title = options.title || "&#160;",
          titleId = $.ui.dialog.getTitleId(self.element),
          uiDialog = (self.uiDialog = $("<div></div>"))
            .appendTo(document.body)
            .hide()
            .addClass(uiDialogClasses + options.dialogClass)
            .css({ zIndex: options.zIndex })
            .attr("tabIndex", -1)
            .css("outline", 0)
            .keydown(function (event) {
              options.closeOnEscape &&
                event.keyCode &&
                event.keyCode === $.ui.keyCode.ESCAPE &&
                (self.close(event), event.preventDefault());
            })
            .attr({ role: "dialog", "aria-labelledby": titleId })
            .mousedown(function (event) {
              self.moveToTop(!1, event);
            }),
          uiDialogContent = self.element
            .show()
            .removeAttr("title")
            .addClass("ui-dialog-content ui-widget-content")
            .appendTo(uiDialog),
          uiDialogTitlebar = (self.uiDialogTitlebar = $("<div></div>"))
            .addClass(
              "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
            )
            .prependTo(uiDialog),
          uiDialogTitlebarClose = $('<a href="#"></a>')
            .addClass("ui-dialog-titlebar-close ui-corner-all")
            .attr("role", "button")
            .hover(
              function () {
                uiDialogTitlebarClose.addClass("ui-state-hover");
              },
              function () {
                uiDialogTitlebarClose.removeClass("ui-state-hover");
              }
            )
            .focus(function () {
              uiDialogTitlebarClose.addClass("ui-state-focus");
            })
            .blur(function () {
              uiDialogTitlebarClose.removeClass("ui-state-focus");
            })
            .click(function (event) {
              return self.close(event), !1;
            })
            .appendTo(uiDialogTitlebar),
          uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText =
            $("<span></span>"))
            .addClass("ui-icon ui-icon-closethick")
            .text(options.closeText)
            .appendTo(uiDialogTitlebarClose),
          uiDialogTitle = $("<span></span>")
            .addClass("ui-dialog-title")
            .attr("id", titleId)
            .html(title)
            .prependTo(uiDialogTitlebar);
        $.isFunction(options.beforeclose) &&
          !$.isFunction(options.beforeClose) &&
          (options.beforeClose = options.beforeclose),
          uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection(),
          options.draggable && $.fn.draggable && self._makeDraggable(),
          options.resizable && $.fn.resizable && self._makeResizable(),
          self._createButtons(options.buttons),
          (self._isOpen = !1),
          $.fn.bgiframe && uiDialog.bgiframe();
      },
      _init: function () {
        this.options.autoOpen && this.open();
      },
      destroy: function () {
        var self = this;
        return (
          this.overlay && this.overlay.destroy(),
          this.uiDialog.hide(),
          this.element
            .unbind(".dialog")
            .removeData("dialog")
            .removeClass("ui-dialog-content ui-widget-content")
            .hide()
            .appendTo("body"),
          this.uiDialog.remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          this
        );
      },
      widget: function () {
        return this.uiDialog;
      },
      close: function (event) {
        var self = this,
          maxZ,
          thisZ;
        if (!1 !== self._trigger("beforeClose", event))
          return (
            self.overlay && self.overlay.destroy(),
            self.uiDialog.unbind("keypress.ui-dialog"),
            (self._isOpen = !1),
            self.options.hide
              ? self.uiDialog.hide(self.options.hide, function () {
                  self._trigger("close", event);
                })
              : (self.uiDialog.hide(), self._trigger("close", event)),
            $.ui.dialog.overlay.resize(),
            self.options.modal &&
              ((maxZ = 0),
              $(".ui-dialog").each(function () {
                this !== self.uiDialog[0] &&
                  ((thisZ = $(this).css("z-index")),
                  isNaN(thisZ) || (maxZ = Math.max(maxZ, thisZ)));
              }),
              ($.ui.dialog.maxZ = maxZ)),
            self
          );
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function (force, event) {
        var self = this,
          options = this.options,
          saveScroll;
        return (options.modal && !force) || (!options.stack && !options.modal)
          ? this._trigger("focus", event)
          : (options.zIndex > $.ui.dialog.maxZ &&
              ($.ui.dialog.maxZ = options.zIndex),
            this.overlay &&
              (($.ui.dialog.maxZ += 1),
              this.overlay.$el.css(
                "z-index",
                ($.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)
              )),
            (saveScroll = {
              scrollTop: this.element.attr("scrollTop"),
              scrollLeft: this.element.attr("scrollLeft"),
            }),
            ($.ui.dialog.maxZ += 1),
            this.uiDialog.css("z-index", $.ui.dialog.maxZ),
            this.element.attr(saveScroll),
            this._trigger("focus", event),
            this);
      },
      open: function () {
        if (!this._isOpen) {
          var self = this,
            options = this.options,
            uiDialog = this.uiDialog;
          return (
            (this.overlay = options.modal
              ? new $.ui.dialog.overlay(this)
              : null),
            this._size(),
            this._position(options.position),
            uiDialog.show(options.show),
            this.moveToTop(!0),
            options.modal &&
              uiDialog.bind("keypress.ui-dialog", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB) {
                  var tabbables = $(":tabbable", this),
                    first = tabbables.filter(":first"),
                    last = tabbables.filter(":last");
                  return event.target !== last[0] || event.shiftKey
                    ? event.target === first[0] && event.shiftKey
                      ? (last.focus(1), !1)
                      : void 0
                    : (first.focus(1), !1);
                }
              }),
            $(
              this.element
                .find(":tabbable")
                .get()
                .concat(
                  uiDialog
                    .find(".ui-dialog-buttonpane :tabbable")
                    .get()
                    .concat(uiDialog.get())
                )
            )
              .eq(0)
              .focus(),
            (this._isOpen = !0),
            this._trigger("open"),
            this
          );
        }
      },
      _createButtons: function (buttons) {
        var self = this,
          hasButtons = !1,
          uiDialogButtonPane = $("<div></div>").addClass(
            "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
          ),
          uiButtonSet = $("<div></div>")
            .addClass("ui-dialog-buttonset")
            .appendTo(uiDialogButtonPane);
        self.uiDialog.find(".ui-dialog-buttonpane").remove(),
          "object" == typeof buttons &&
            null !== buttons &&
            $.each(buttons, function () {
              return !(hasButtons = !0);
            }),
          hasButtons &&
            ($.each(buttons, function (name, props) {
              props = $.isFunction(props)
                ? { click: props, text: name }
                : props;
              var button = $('<button type="button"></button>')
                .attr(props, !0)
                .unbind("click")
                .click(function () {
                  props.click.apply(self.element[0], arguments);
                })
                .appendTo(uiButtonSet);
              $.fn.button && button.button();
            }),
            uiDialogButtonPane.appendTo(self.uiDialog));
      },
      _makeDraggable: function () {
        var self = this,
          options = self.options,
          doc = $(document),
          heightBeforeDrag;
        function filteredUi(ui) {
          return { position: ui.position, offset: ui.offset };
        }
        self.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function (event, ui) {
            (heightBeforeDrag =
              "auto" === options.height ? "auto" : $(this).height()),
              $(this).height($(this).height()).addClass("ui-dialog-dragging"),
              self._trigger("dragStart", event, filteredUi(ui));
          },
          drag: function (event, ui) {
            self._trigger("drag", event, filteredUi(ui));
          },
          stop: function (event, ui) {
            (options.position = [
              ui.position.left - doc.scrollLeft(),
              ui.position.top - doc.scrollTop(),
            ]),
              $(this)
                .removeClass("ui-dialog-dragging")
                .height(heightBeforeDrag),
              self._trigger("dragStop", event, filteredUi(ui)),
              $.ui.dialog.overlay.resize();
          },
        });
      },
      _makeResizable: function (handles) {
        handles = void 0 === handles ? this.options.resizable : handles;
        var self = this,
          options = self.options,
          position = self.uiDialog.css("position"),
          resizeHandles =
            "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
        function filteredUi(ui) {
          return {
            originalPosition: ui.originalPosition,
            originalSize: ui.originalSize,
            position: ui.position,
            size: ui.size,
          };
        }
        self.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: self.element,
            maxWidth: options.maxWidth,
            maxHeight: options.maxHeight,
            minWidth: options.minWidth,
            minHeight: self._minHeight(),
            handles: resizeHandles,
            start: function (event, ui) {
              $(this).addClass("ui-dialog-resizing"),
                self._trigger("resizeStart", event, filteredUi(ui));
            },
            resize: function (event, ui) {
              self._trigger("resize", event, filteredUi(ui));
            },
            stop: function (event, ui) {
              $(this).removeClass("ui-dialog-resizing"),
                (options.height = $(this).height()),
                (options.width = $(this).width()),
                self._trigger("resizeStop", event, filteredUi(ui)),
                $.ui.dialog.overlay.resize();
            },
          })
          .css("position", position)
          .find(".ui-resizable-se")
          .addClass("ui-icon ui-icon-grip-diagonal-se");
      },
      _minHeight: function () {
        var options = this.options;
        return "auto" === options.height
          ? options.minHeight
          : Math.min(options.minHeight, options.height);
      },
      _position: function (position) {
        var myAt = [],
          offset = [0, 0],
          isVisible;
        position
          ? (("string" == typeof position ||
              ("object" == typeof position && "0" in position)) &&
              (1 ===
                (myAt = position.split
                  ? position.split(" ")
                  : [position[0], position[1]]).length && (myAt[1] = myAt[0]),
              $.each(["left", "top"], function (i, offsetPosition) {
                +myAt[i] === myAt[i] &&
                  ((offset[i] = myAt[i]), (myAt[i] = offsetPosition));
              }),
              (position = {
                my: myAt.join(" "),
                at: myAt.join(" "),
                offset: offset.join(" "),
              })),
            (position = $.extend(
              {},
              $.ui.dialog.prototype.options.position,
              position
            )))
          : (position = $.ui.dialog.prototype.options.position),
          (isVisible = this.uiDialog.is(":visible")) || this.uiDialog.show(),
          this.uiDialog
            .css({ top: 0, left: 0 })
            .position($.extend({ of: window }, position)),
          isVisible || this.uiDialog.hide();
      },
      _setOptions: function (options) {
        var self = this,
          resizableOptions = {},
          resize = !1;
        $.each(options, function (key, value) {
          self._setOption(key, value),
            key in sizeRelatedOptions && (resize = !0),
            key in resizableRelatedOptions && (resizableOptions[key] = value);
        }),
          resize && this._size(),
          this.uiDialog.is(":data(resizable)") &&
            this.uiDialog.resizable("option", resizableOptions);
      },
      _setOption: function (key, value) {
        var self = this,
          uiDialog = self.uiDialog;
        switch (key) {
          case "beforeclose":
            key = "beforeClose";
            break;
          case "buttons":
            self._createButtons(value);
            break;
          case "closeText":
            self.uiDialogTitlebarCloseText.text("" + value);
            break;
          case "dialogClass":
            uiDialog
              .removeClass(self.options.dialogClass)
              .addClass(uiDialogClasses + value);
            break;
          case "disabled":
            value
              ? uiDialog.addClass("ui-dialog-disabled")
              : uiDialog.removeClass("ui-dialog-disabled");
            break;
          case "draggable":
            var isDraggable = uiDialog.is(":data(draggable)");
            isDraggable && !value && uiDialog.draggable("destroy"),
              !isDraggable && value && self._makeDraggable();
            break;
          case "position":
            self._position(value);
            break;
          case "resizable":
            var isResizable = uiDialog.is(":data(resizable)");
            isResizable && !value && uiDialog.resizable("destroy"),
              isResizable &&
                "string" == typeof value &&
                uiDialog.resizable("option", "handles", value),
              isResizable || !1 === value || self._makeResizable(value);
            break;
          case "title":
            $(".ui-dialog-title", self.uiDialogTitlebar).html(
              "" + (value || "&#160;")
            );
        }
        $.Widget.prototype._setOption.apply(self, arguments);
      },
      _size: function () {
        var options = this.options,
          nonContentHeight,
          minContentHeight,
          isVisible = this.uiDialog.is(":visible");
        if (
          (this.element.show().css({ width: "auto", minHeight: 0, height: 0 }),
          options.minWidth > options.width &&
            (options.width = options.minWidth),
          (nonContentHeight = this.uiDialog
            .css({ height: "auto", width: options.width })
            .height()),
          (minContentHeight = Math.max(
            0,
            options.minHeight - nonContentHeight
          )),
          "auto" === options.height)
        )
          if ($.support.minHeight)
            this.element.css({ minHeight: minContentHeight, height: "auto" });
          else {
            this.uiDialog.show();
            var autoHeight = this.element.css("height", "auto").height();
            isVisible || this.uiDialog.hide(),
              this.element.height(Math.max(autoHeight, minContentHeight));
          }
        else
          this.element.height(Math.max(options.height - nonContentHeight, 0));
        this.uiDialog.is(":data(resizable)") &&
          this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
    }),
      $.extend($.ui.dialog, {
        version: "1.8.7",
        uuid: 0,
        maxZ: 0,
        getTitleId: function ($el) {
          var id = $el.attr("id");
          return (
            id || ((this.uuid += 1), (id = this.uuid)), "ui-dialog-title-" + id
          );
        },
        overlay: function (dialog) {
          this.$el = $.ui.dialog.overlay.create(dialog);
        },
      }),
      $.extend($.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: $.map(
          "focus,mousedown,mouseup,keydown,keypress,click".split(","),
          function (event) {
            return event + ".dialog-overlay";
          }
        ).join(" "),
        create: function (dialog) {
          0 === this.instances.length &&
            (setTimeout(function () {
              $.ui.dialog.overlay.instances.length &&
                $(document).bind($.ui.dialog.overlay.events, function (event) {
                  if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ)
                    return !1;
                });
            }, 1),
            $(document).bind("keydown.dialog-overlay", function (event) {
              dialog.options.closeOnEscape &&
                event.keyCode &&
                event.keyCode === $.ui.keyCode.ESCAPE &&
                (dialog.close(event), event.preventDefault());
            }),
            $(window).bind(
              "resize.dialog-overlay",
              $.ui.dialog.overlay.resize
            ));
          var $el = (
            this.oldInstances.pop() ||
            $("<div></div>").addClass("ui-widget-overlay")
          )
            .appendTo(document.body)
            .css({ width: this.width(), height: this.height() });
          return $.fn.bgiframe && $el.bgiframe(), this.instances.push($el), $el;
        },
        destroy: function ($el) {
          var indexOf = $.inArray($el, this.instances);
          -1 != indexOf &&
            this.oldInstances.push(this.instances.splice(indexOf, 1)[0]),
            0 === this.instances.length &&
              $([document, window]).unbind(".dialog-overlay"),
            $el.remove();
          var maxZ = 0;
          $.each(this.instances, function () {
            maxZ = Math.max(maxZ, this.css("z-index"));
          }),
            (this.maxZ = maxZ);
        },
        height: function () {
          var scrollHeight, offsetHeight;
          return $.browser.msie && $.browser.version < 7
            ? (scrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
              )) <
              (offsetHeight = Math.max(
                document.documentElement.offsetHeight,
                document.body.offsetHeight
              ))
              ? $(window).height() + "px"
              : scrollHeight + "px"
            : $(document).height() + "px";
        },
        width: function () {
          var scrollWidth, offsetWidth;
          return $.browser.msie && $.browser.version < 7
            ? (scrollWidth = Math.max(
                document.documentElement.scrollWidth,
                document.body.scrollWidth
              )) <
              (offsetWidth = Math.max(
                document.documentElement.offsetWidth,
                document.body.offsetWidth
              ))
              ? $(window).width() + "px"
              : scrollWidth + "px"
            : $(document).width() + "px";
        },
        resize: function () {
          var $overlays = $([]);
          $.each($.ui.dialog.overlay.instances, function () {
            $overlays = $overlays.add(this);
          }),
            $overlays.css({ width: 0, height: 0 }).css({
              width: $.ui.dialog.overlay.width(),
              height: $.ui.dialog.overlay.height(),
            });
        },
      }),
      $.extend($.ui.dialog.overlay.prototype, {
        destroy: function () {
          $.ui.dialog.overlay.destroy(this.$el);
        },
      });
  })(jQuery),
  (function ($, undefined) {
    $.ui = $.ui || {};
    var horizontalPositions = /left|center|right/,
      verticalPositions = /top|center|bottom/,
      center = "center",
      _position = $.fn.position,
      _offset = $.fn.offset;
    ($.fn.position = function (options) {
      if (!options || !options.of) return _position.apply(this, arguments);
      options = $.extend({}, options);
      var target = $(options.of),
        targetElem = target[0],
        collision = (options.collision || "flip").split(" "),
        offset = options.offset ? options.offset.split(" ") : [0, 0],
        targetWidth,
        targetHeight,
        basePosition;
      return (
        9 === targetElem.nodeType
          ? ((targetWidth = target.width()),
            (targetHeight = target.height()),
            (basePosition = { top: 0, left: 0 }))
          : targetElem.setTimeout
          ? ((targetWidth = target.width()),
            (targetHeight = target.height()),
            (basePosition = {
              top: target.scrollTop(),
              left: target.scrollLeft(),
            }))
          : targetElem.preventDefault
          ? ((options.at = "left top"),
            (targetWidth = targetHeight = 0),
            (basePosition = { top: options.of.pageY, left: options.of.pageX }))
          : ((targetWidth = target.outerWidth()),
            (targetHeight = target.outerHeight()),
            (basePosition = target.offset())),
        $.each(["my", "at"], function () {
          var pos = (options[this] || "").split(" ");
          1 === pos.length &&
            (pos = horizontalPositions.test(pos[0])
              ? pos.concat([center])
              : verticalPositions.test(pos[0])
              ? [center].concat(pos)
              : [center, center]),
            (pos[0] = horizontalPositions.test(pos[0]) ? pos[0] : center),
            (pos[1] = verticalPositions.test(pos[1]) ? pos[1] : center),
            (options[this] = pos);
        }),
        1 === collision.length && (collision[1] = collision[0]),
        (offset[0] = parseInt(offset[0], 10) || 0),
        1 === offset.length && (offset[1] = offset[0]),
        (offset[1] = parseInt(offset[1], 10) || 0),
        "right" === options.at[0]
          ? (basePosition.left += targetWidth)
          : options.at[0] === center && (basePosition.left += targetWidth / 2),
        "bottom" === options.at[1]
          ? (basePosition.top += targetHeight)
          : options.at[1] === center && (basePosition.top += targetHeight / 2),
        (basePosition.left += offset[0]),
        (basePosition.top += offset[1]),
        this.each(function () {
          var elem = $(this),
            elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            marginLeft = parseInt($.curCSS(this, "marginLeft", !0)) || 0,
            marginTop = parseInt($.curCSS(this, "marginTop", !0)) || 0,
            collisionWidth =
              elemWidth +
                marginLeft +
                parseInt($.curCSS(this, "marginRight", !0)) || 0,
            collisionHeight =
              elemHeight +
                marginTop +
                parseInt($.curCSS(this, "marginBottom", !0)) || 0,
            position = $.extend({}, basePosition),
            collisionPosition;
          "right" === options.my[0]
            ? (position.left -= elemWidth)
            : options.my[0] === center && (position.left -= elemWidth / 2),
            "bottom" === options.my[1]
              ? (position.top -= elemHeight)
              : options.my[1] === center && (position.top -= elemHeight / 2),
            (position.left = Math.round(position.left)),
            (position.top = Math.round(position.top)),
            (collisionPosition = {
              left: position.left - marginLeft,
              top: position.top - marginTop,
            }),
            $.each(["left", "top"], function (i, dir) {
              $.ui.position[collision[i]] &&
                $.ui.position[collision[i]][dir](position, {
                  targetWidth: targetWidth,
                  targetHeight: targetHeight,
                  elemWidth: elemWidth,
                  elemHeight: elemHeight,
                  collisionPosition: collisionPosition,
                  collisionWidth: collisionWidth,
                  collisionHeight: collisionHeight,
                  offset: offset,
                  my: options.my,
                  at: options.at,
                });
            }),
            $.fn.bgiframe && elem.bgiframe(),
            elem.offset($.extend(position, { using: options.using }));
        })
      );
    }),
      ($.ui.position = {
        fit: {
          left: function (position, data) {
            var win = $(window),
              over =
                data.collisionPosition.left +
                data.collisionWidth -
                win.width() -
                win.scrollLeft();
            position.left =
              over > 0
                ? position.left - over
                : Math.max(
                    position.left - data.collisionPosition.left,
                    position.left
                  );
          },
          top: function (position, data) {
            var win = $(window),
              over =
                data.collisionPosition.top +
                data.collisionHeight -
                win.height() -
                win.scrollTop();
            position.top =
              over > 0
                ? position.top - over
                : Math.max(
                    position.top - data.collisionPosition.top,
                    position.top
                  );
          },
        },
        flip: {
          left: function (position, data) {
            if (data.at[0] !== center) {
              var win = $(window),
                over =
                  data.collisionPosition.left +
                  data.collisionWidth -
                  win.width() -
                  win.scrollLeft(),
                myOffset =
                  "left" === data.my[0]
                    ? -data.elemWidth
                    : "right" === data.my[0]
                    ? data.elemWidth
                    : 0,
                atOffset =
                  "left" === data.at[0] ? data.targetWidth : -data.targetWidth,
                offset = -2 * data.offset[0];
              position.left +=
                data.collisionPosition.left < 0
                  ? myOffset + atOffset + offset
                  : over > 0
                  ? myOffset + atOffset + offset
                  : 0;
            }
          },
          top: function (position, data) {
            if (data.at[1] !== center) {
              var win = $(window),
                over =
                  data.collisionPosition.top +
                  data.collisionHeight -
                  win.height() -
                  win.scrollTop(),
                myOffset =
                  "top" === data.my[1]
                    ? -data.elemHeight
                    : "bottom" === data.my[1]
                    ? data.elemHeight
                    : 0,
                atOffset =
                  "top" === data.at[1] ? data.targetHeight : -data.targetHeight,
                offset = -2 * data.offset[1];
              position.top +=
                data.collisionPosition.top < 0
                  ? myOffset + atOffset + offset
                  : over > 0
                  ? myOffset + atOffset + offset
                  : 0;
            }
          },
        },
      }),
      $.offset.setOffset ||
        (($.offset.setOffset = function (elem, options) {
          /static/.test($.curCSS(elem, "position")) &&
            (elem.style.position = "relative");
          var curElem = $(elem),
            curOffset = curElem.offset(),
            curTop = parseInt($.curCSS(elem, "top", !0), 10) || 0,
            curLeft = parseInt($.curCSS(elem, "left", !0), 10) || 0,
            props = {
              top: options.top - curOffset.top + curTop,
              left: options.left - curOffset.left + curLeft,
            };
          "using" in options
            ? options.using.call(elem, props)
            : curElem.css(props);
        }),
        ($.fn.offset = function (options) {
          var elem = this[0];
          return elem && elem.ownerDocument
            ? options
              ? this.each(function () {
                  $.offset.setOffset(this, options);
                })
              : _offset.call(this)
            : null;
        }));
  })(jQuery),
  (function ($, undefined) {
    $.widget("ui.progressbar", {
      options: { value: 0, max: 100 },
      min: 0,
      _create: function () {
        this.element
          .addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all")
          .attr({
            role: "progressbar",
            "aria-valuemin": this.min,
            "aria-valuemax": this.options.max,
            "aria-valuenow": this._value(),
          }),
          (this.valueDiv = $(
            "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>"
          ).appendTo(this.element)),
          (this.oldValue = this._value()),
          this._refreshValue();
      },
      destroy: function () {
        this.element
          .removeClass(
            "ui-progressbar ui-widget ui-widget-content ui-corner-all"
          )
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.valueDiv.remove(),
          $.Widget.prototype.destroy.apply(this, arguments);
      },
      value: function (newValue) {
        return void 0 === newValue
          ? this._value()
          : (this._setOption("value", newValue), this);
      },
      _setOption: function (key, value) {
        "value" === key &&
          ((this.options.value = value),
          this._refreshValue(),
          this._value() === this.options.max && this._trigger("complete")),
          $.Widget.prototype._setOption.apply(this, arguments);
      },
      _value: function () {
        var val = this.options.value;
        return (
          "number" != typeof val && (val = 0),
          Math.min(this.options.max, Math.max(this.min, val))
        );
      },
      _percentage: function () {
        return (100 * this._value()) / this.options.max;
      },
      _refreshValue: function () {
        var value = this.value(),
          percentage = this._percentage();
        this.oldValue !== value &&
          ((this.oldValue = value), this._trigger("change")),
          this.valueDiv
            .toggleClass("ui-corner-right", value === this.options.max)
            .width(percentage.toFixed(0) + "%"),
          this.element.attr("aria-valuenow", value);
      },
    }),
      $.extend($.ui.progressbar, { version: "1.8.7" });
  })(jQuery),
  (function ($, undefined) {
    var numPages = 5;
    $.widget("ui.slider", $.ui.mouse, {
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
      },
      _create: function () {
        var self = this,
          o = this.options;
        if (
          ((this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget ui-widget-content ui-corner-all"
          ),
          o.disabled && this.element.addClass("ui-slider-disabled ui-disabled"),
          (this.range = $([])),
          o.range &&
            (!0 === o.range
              ? ((this.range = $("<div></div>")),
                o.values || (o.values = [this._valueMin(), this._valueMin()]),
                o.values.length &&
                  2 !== o.values.length &&
                  (o.values = [o.values[0], o.values[0]]))
              : (this.range = $("<div></div>")),
            this.range.appendTo(this.element).addClass("ui-slider-range"),
            ("min" !== o.range && "max" !== o.range) ||
              this.range.addClass("ui-slider-range-" + o.range),
            this.range.addClass("ui-widget-header")),
          0 === $(".ui-slider-handle", this.element).length &&
            $("<a href='#'></a>")
              .appendTo(this.element)
              .addClass("ui-slider-handle"),
          o.values && o.values.length)
        )
          for (
            ;
            $(".ui-slider-handle", this.element).length < o.values.length;

          )
            $("<a href='#'></a>")
              .appendTo(this.element)
              .addClass("ui-slider-handle");
        (this.handles = $(".ui-slider-handle", this.element).addClass(
          "ui-state-default ui-corner-all"
        )),
          (this.handle = this.handles.eq(0)),
          this.handles
            .add(this.range)
            .filter("a")
            .click(function (event) {
              event.preventDefault();
            })
            .hover(
              function () {
                o.disabled || $(this).addClass("ui-state-hover");
              },
              function () {
                $(this).removeClass("ui-state-hover");
              }
            )
            .focus(function () {
              o.disabled
                ? $(this).blur()
                : ($(".ui-slider .ui-state-focus").removeClass(
                    "ui-state-focus"
                  ),
                  $(this).addClass("ui-state-focus"));
            })
            .blur(function () {
              $(this).removeClass("ui-state-focus");
            }),
          this.handles.each(function (i) {
            $(this).data("index.ui-slider-handle", i);
          }),
          this.handles
            .keydown(function (event) {
              var ret = !0,
                index = $(this).data("index.ui-slider-handle"),
                allowed,
                curVal,
                newVal,
                step;
              if (!self.options.disabled) {
                switch (event.keyCode) {
                  case $.ui.keyCode.HOME:
                  case $.ui.keyCode.END:
                  case $.ui.keyCode.PAGE_UP:
                  case $.ui.keyCode.PAGE_DOWN:
                  case $.ui.keyCode.UP:
                  case $.ui.keyCode.RIGHT:
                  case $.ui.keyCode.DOWN:
                  case $.ui.keyCode.LEFT:
                    if (
                      ((ret = !1),
                      !self._keySliding &&
                        ((self._keySliding = !0),
                        $(this).addClass("ui-state-active"),
                        !1 === (allowed = self._start(event, index))))
                    )
                      return;
                }
                switch (
                  ((step = self.options.step),
                  (curVal = newVal =
                    self.options.values && self.options.values.length
                      ? self.values(index)
                      : self.value()),
                  event.keyCode)
                ) {
                  case $.ui.keyCode.HOME:
                    newVal = self._valueMin();
                    break;
                  case $.ui.keyCode.END:
                    newVal = self._valueMax();
                    break;
                  case $.ui.keyCode.PAGE_UP:
                    newVal = self._trimAlignValue(
                      curVal + (self._valueMax() - self._valueMin()) / 5
                    );
                    break;
                  case $.ui.keyCode.PAGE_DOWN:
                    newVal = self._trimAlignValue(
                      curVal - (self._valueMax() - self._valueMin()) / 5
                    );
                    break;
                  case $.ui.keyCode.UP:
                  case $.ui.keyCode.RIGHT:
                    if (curVal === self._valueMax()) return;
                    newVal = self._trimAlignValue(curVal + step);
                    break;
                  case $.ui.keyCode.DOWN:
                  case $.ui.keyCode.LEFT:
                    if (curVal === self._valueMin()) return;
                    newVal = self._trimAlignValue(curVal - step);
                }
                return self._slide(event, index, newVal), ret;
              }
            })
            .keyup(function (event) {
              var index = $(this).data("index.ui-slider-handle");
              self._keySliding &&
                ((self._keySliding = !1),
                self._stop(event, index),
                self._change(event, index),
                $(this).removeClass("ui-state-active"));
            }),
          this._refreshValue(),
          (this._animateOff = !1);
      },
      destroy: function () {
        return (
          this.handles.remove(),
          this.range.remove(),
          this.element
            .removeClass(
              "ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"
            )
            .removeData("slider")
            .unbind(".slider"),
          this._mouseDestroy(),
          this
        );
      },
      _mouseCapture: function (event) {
        var o = this.options,
          position,
          normValue,
          distance,
          closestHandle,
          self,
          index,
          allowed,
          offset,
          mouseOverHandle;
        return (
          !o.disabled &&
          ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (position = { x: event.pageX, y: event.pageY }),
          (normValue = this._normValueFromMouse(position)),
          (distance = this._valueMax() - this._valueMin() + 1),
          (self = this),
          this.handles.each(function (i) {
            var thisDistance = Math.abs(normValue - self.values(i));
            distance > thisDistance &&
              ((distance = thisDistance),
              (closestHandle = $(this)),
              (index = i));
          }),
          !0 === o.range &&
            this.values(1) === o.min &&
            ((index += 1), (closestHandle = $(this.handles[index]))),
          !1 !== (allowed = this._start(event, index)) &&
            ((this._mouseSliding = !0),
            (self._handleIndex = index),
            closestHandle.addClass("ui-state-active").focus(),
            (offset = closestHandle.offset()),
            (mouseOverHandle = !$(event.target)
              .parents()
              .andSelf()
              .is(".ui-slider-handle")),
            (this._clickOffset = mouseOverHandle
              ? { left: 0, top: 0 }
              : {
                  left: event.pageX - offset.left - closestHandle.width() / 2,
                  top:
                    event.pageY -
                    offset.top -
                    closestHandle.height() / 2 -
                    (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) -
                    (parseInt(closestHandle.css("borderBottomWidth"), 10) ||
                      0) +
                    (parseInt(closestHandle.css("marginTop"), 10) || 0),
                }),
            this.handles.hasClass("ui-state-hover") ||
              this._slide(event, index, normValue),
            (this._animateOff = !0),
            !0))
        );
      },
      _mouseStart: function (event) {
        return !0;
      },
      _mouseDrag: function (event) {
        var position = { x: event.pageX, y: event.pageY },
          normValue = this._normValueFromMouse(position);
        return this._slide(event, this._handleIndex, normValue), !1;
      },
      _mouseStop: function (event) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(event, this._handleIndex),
          this._change(event, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (position) {
        var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
        return (
          "horizontal" === this.orientation
            ? ((pixelTotal = this.elementSize.width),
              (pixelMouse =
                position.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((pixelTotal = this.elementSize.height),
              (pixelMouse =
                position.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (percentMouse = pixelMouse / pixelTotal) > 1 && (percentMouse = 1),
          percentMouse < 0 && (percentMouse = 0),
          "vertical" === this.orientation && (percentMouse = 1 - percentMouse),
          (valueTotal = this._valueMax() - this._valueMin()),
          (valueMouse = this._valueMin() + percentMouse * valueTotal),
          this._trimAlignValue(valueMouse)
        );
      },
      _start: function (event, index) {
        var uiHash = { handle: this.handles[index], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((uiHash.value = this.values(index)),
            (uiHash.values = this.values())),
          this._trigger("start", event, uiHash)
        );
      },
      _slide: function (event, index, newVal) {
        var otherVal, newValues, allowed;
        this.options.values && this.options.values.length
          ? ((otherVal = this.values(index ? 0 : 1)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              ((0 === index && newVal > otherVal) ||
                (1 === index && newVal < otherVal)) &&
              (newVal = otherVal),
            newVal !== this.values(index) &&
              (((newValues = this.values())[index] = newVal),
              (allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal,
                values: newValues,
              })),
              (otherVal = this.values(index ? 0 : 1)),
              !1 !== allowed && this.values(index, newVal, !0)))
          : newVal !== this.value() &&
            !1 !==
              (allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal,
              })) &&
            this.value(newVal);
      },
      _stop: function (event, index) {
        var uiHash = { handle: this.handles[index], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((uiHash.value = this.values(index)),
          (uiHash.values = this.values())),
          this._trigger("stop", event, uiHash);
      },
      _change: function (event, index) {
        if (!this._keySliding && !this._mouseSliding) {
          var uiHash = { handle: this.handles[index], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((uiHash.value = this.values(index)),
            (uiHash.values = this.values())),
            this._trigger("change", event, uiHash);
        }
      },
      value: function (newValue) {
        return (
          arguments.length &&
            ((this.options.value = this._trimAlignValue(newValue)),
            this._refreshValue(),
            this._change(null, 0)),
          this._value()
        );
      },
      values: function (index, newValue) {
        var vals, newValues, i;
        if (
          (arguments.length > 1 &&
            ((this.options.values[index] = this._trimAlignValue(newValue)),
            this._refreshValue(),
            this._change(null, index)),
          !arguments.length)
        )
          return this._values();
        if (!$.isArray(arguments[0]))
          return this.options.values && this.options.values.length
            ? this._values(index)
            : this.value();
        for (
          vals = this.options.values, newValues = arguments[0], i = 0;
          i < vals.length;
          i += 1
        )
          (vals[i] = this._trimAlignValue(newValues[i])), this._change(null, i);
        this._refreshValue();
      },
      _setOption: function (key, value) {
        var i,
          valsLength = 0;
        switch (
          ($.isArray(this.options.values) &&
            (valsLength = this.options.values.length),
          $.Widget.prototype._setOption.apply(this, arguments),
          key)
        ) {
          case "disabled":
            value
              ? (this.handles.filter(".ui-state-focus").blur(),
                this.handles.removeClass("ui-state-hover"),
                this.handles.attr("disabled", "disabled"),
                this.element.addClass("ui-disabled"))
              : (this.handles.removeAttr("disabled"),
                this.element.removeClass("ui-disabled"));
            break;
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue();
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), i = 0;
              i < valsLength;
              i += 1
            )
              this._change(null, i);
            this._animateOff = !1;
        }
      },
      _value: function () {
        var val = this.options.value;
        return (val = this._trimAlignValue(val));
      },
      _values: function (index) {
        var val, vals, i;
        if (arguments.length)
          return (
            (val = this.options.values[index]),
            (val = this._trimAlignValue(val))
          );
        for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1)
          vals[i] = this._trimAlignValue(vals[i]);
        return vals;
      },
      _trimAlignValue: function (val) {
        if (val <= this._valueMin()) return this._valueMin();
        if (val >= this._valueMax()) return this._valueMax();
        var step = this.options.step > 0 ? this.options.step : 1,
          valModStep = (val - this._valueMin()) % step;
        return (
          (alignValue = val - valModStep),
          2 * Math.abs(valModStep) >= step &&
            (alignValue += valModStep > 0 ? step : -step),
          parseFloat(alignValue.toFixed(5))
        );
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.options.max;
      },
      _refreshValue: function () {
        var oRange = this.options.range,
          o = this.options,
          self = this,
          animate = !this._animateOff && o.animate,
          valPercent,
          _set = {},
          lastValPercent,
          value,
          valueMin,
          valueMax;
        this.options.values && this.options.values.length
          ? this.handles.each(function (i, j) {
              (valPercent =
                ((self.values(i) - self._valueMin()) /
                  (self._valueMax() - self._valueMin())) *
                100),
                (_set["horizontal" === self.orientation ? "left" : "bottom"] =
                  valPercent + "%"),
                $(this)
                  .stop(1, 1)
                  [animate ? "animate" : "css"](_set, o.animate),
                !0 === self.options.range &&
                  ("horizontal" === self.orientation
                    ? (0 === i &&
                        self.range
                          .stop(1, 1)
                          [animate ? "animate" : "css"](
                            { left: valPercent + "%" },
                            o.animate
                          ),
                      1 === i &&
                        self.range[animate ? "animate" : "css"](
                          { width: valPercent - lastValPercent + "%" },
                          { queue: !1, duration: o.animate }
                        ))
                    : (0 === i &&
                        self.range
                          .stop(1, 1)
                          [animate ? "animate" : "css"](
                            { bottom: valPercent + "%" },
                            o.animate
                          ),
                      1 === i &&
                        self.range[animate ? "animate" : "css"](
                          { height: valPercent - lastValPercent + "%" },
                          { queue: !1, duration: o.animate }
                        ))),
                (lastValPercent = valPercent);
            })
          : ((value = this.value()),
            (valueMin = this._valueMin()),
            (valueMax = this._valueMax()),
            (valPercent =
              valueMax !== valueMin
                ? ((value - valueMin) / (valueMax - valueMin)) * 100
                : 0),
            (_set["horizontal" === self.orientation ? "left" : "bottom"] =
              valPercent + "%"),
            this.handle
              .stop(1, 1)
              [animate ? "animate" : "css"](_set, o.animate),
            "min" === oRange &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [animate ? "animate" : "css"](
                  { width: valPercent + "%" },
                  o.animate
                ),
            "max" === oRange &&
              "horizontal" === this.orientation &&
              this.range[animate ? "animate" : "css"](
                { width: 100 - valPercent + "%" },
                { queue: !1, duration: o.animate }
              ),
            "min" === oRange &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [animate ? "animate" : "css"](
                  { height: valPercent + "%" },
                  o.animate
                ),
            "max" === oRange &&
              "vertical" === this.orientation &&
              this.range[animate ? "animate" : "css"](
                { height: 100 - valPercent + "%" },
                { queue: !1, duration: o.animate }
              ));
      },
    }),
      $.extend($.ui.slider, { version: "1.8.7" });
  })(jQuery),
  (function ($, undefined) {
    var tabId = 0,
      listId = 0;
    function getNextTabId() {
      return ++tabId;
    }
    function getNextListId() {
      return ++listId;
    }
    $.widget("ui.tabs", {
      options: {
        add: null,
        ajaxOptions: null,
        cache: !1,
        cookie: null,
        collapsible: !1,
        disable: null,
        disabled: [],
        enable: null,
        event: "click",
        fx: null,
        idPrefix: "ui-tabs-",
        load: null,
        panelTemplate: "<div></div>",
        remove: null,
        select: null,
        show: null,
        spinner: "<em>Loading&#8230;</em>",
        tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>",
      },
      _create: function () {
        this._tabify(!0);
      },
      _setOption: function (key, value) {
        if ("selected" == key) {
          if (this.options.collapsible && value == this.options.selected)
            return;
          this.select(value);
        } else (this.options[key] = value), this._tabify();
      },
      _tabId: function (a) {
        return (
          (a.title &&
            a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "")) ||
          this.options.idPrefix + getNextTabId()
        );
      },
      _sanitizeSelector: function (hash) {
        return hash.replace(/:/g, "\\:");
      },
      _cookie: function () {
        var cookie =
          this.cookie ||
          (this.cookie =
            this.options.cookie.name || "ui-tabs-" + getNextListId());
        return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
      },
      _ui: function (tab, panel) {
        return { tab: tab, panel: panel, index: this.anchors.index(tab) };
      },
      _cleanup: function () {
        this.lis
          .filter(".ui-state-processing")
          .removeClass("ui-state-processing")
          .find("span:data(label.tabs)")
          .each(function () {
            var el = $(this);
            el.html(el.data("label.tabs")).removeData("label.tabs");
          });
      },
      _tabify: function (init) {
        var self = this,
          o = this.options,
          fragmentId = /^#.+/,
          hideFx,
          showFx;
        (this.list = this.element.find("ol,ul").eq(0)),
          (this.lis = $(" > li:has(a[href])", this.list)),
          (this.anchors = this.lis.map(function () {
            return $("a", this)[0];
          })),
          (this.panels = $([])),
          this.anchors.each(function (i, a) {
            var href = $(a).attr("href"),
              hrefBase = href.split("#")[0],
              baseEl;
            if (
              (hrefBase &&
                (hrefBase === location.toString().split("#")[0] ||
                  ((baseEl = $("base")[0]) && hrefBase === baseEl.href)) &&
                ((href = a.hash), (a.href = href)),
              fragmentId.test(href))
            )
              self.panels = self.panels.add(
                self.element.find(self._sanitizeSelector(href))
              );
            else if (href && "#" !== href) {
              $.data(a, "href.tabs", href),
                $.data(a, "load.tabs", href.replace(/#.*$/, ""));
              var id = self._tabId(a);
              a.href = "#" + id;
              var $panel = self.element.find("#" + id);
              $panel.length ||
                ($panel = $(o.panelTemplate)
                  .attr("id", id)
                  .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
                  .insertAfter(self.panels[i - 1] || self.list)).data(
                  "destroy.tabs",
                  !0
                ),
                (self.panels = self.panels.add($panel));
            } else o.disabled.push(i);
          }),
          init
            ? (this.element.addClass(
                "ui-tabs ui-widget ui-widget-content ui-corner-all"
              ),
              this.list.addClass(
                "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
              ),
              this.lis.addClass("ui-state-default ui-corner-top"),
              this.panels.addClass(
                "ui-tabs-panel ui-widget-content ui-corner-bottom"
              ),
              void 0 === o.selected
                ? (location.hash &&
                    this.anchors.each(function (i, a) {
                      if (a.hash == location.hash) return (o.selected = i), !1;
                    }),
                  "number" != typeof o.selected &&
                    o.cookie &&
                    (o.selected = parseInt(self._cookie(), 10)),
                  "number" != typeof o.selected &&
                    this.lis.filter(".ui-tabs-selected").length &&
                    (o.selected = this.lis.index(
                      this.lis.filter(".ui-tabs-selected")
                    )),
                  (o.selected = o.selected || (this.lis.length ? 0 : -1)))
                : null === o.selected && (o.selected = -1),
              (o.selected =
                (o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0
                  ? o.selected
                  : 0),
              (o.disabled = $.unique(
                o.disabled.concat(
                  $.map(this.lis.filter(".ui-state-disabled"), function (n, i) {
                    return self.lis.index(n);
                  })
                )
              ).sort()),
              -1 != $.inArray(o.selected, o.disabled) &&
                o.disabled.splice($.inArray(o.selected, o.disabled), 1),
              this.panels.addClass("ui-tabs-hide"),
              this.lis.removeClass("ui-tabs-selected ui-state-active"),
              o.selected >= 0 &&
                this.anchors.length &&
                (self.element
                  .find(self._sanitizeSelector(self.anchors[o.selected].hash))
                  .removeClass("ui-tabs-hide"),
                this.lis
                  .eq(o.selected)
                  .addClass("ui-tabs-selected ui-state-active"),
                self.element.queue("tabs", function () {
                  self._trigger(
                    "show",
                    null,
                    self._ui(
                      self.anchors[o.selected],
                      self.element.find(
                        self._sanitizeSelector(self.anchors[o.selected].hash)
                      )
                    )
                  );
                }),
                this.load(o.selected)),
              $(window).bind("unload", function () {
                self.lis.add(self.anchors).unbind(".tabs"),
                  (self.lis = self.anchors = self.panels = null);
              }))
            : (o.selected = this.lis.index(
                this.lis.filter(".ui-tabs-selected")
              )),
          this.element[o.collapsible ? "addClass" : "removeClass"](
            "ui-tabs-collapsible"
          ),
          o.cookie && this._cookie(o.selected, o.cookie);
        for (var i = 0, li; (li = this.lis[i]); i++)
          $(li)[
            -1 == $.inArray(i, o.disabled) || $(li).hasClass("ui-tabs-selected")
              ? "removeClass"
              : "addClass"
          ]("ui-state-disabled");
        if (
          (!1 === o.cache && this.anchors.removeData("cache.tabs"),
          this.lis.add(this.anchors).unbind(".tabs"),
          "mouseover" !== o.event)
        ) {
          var addState = function (state, el) {
              el.is(":not(.ui-state-disabled)") &&
                el.addClass("ui-state-" + state);
            },
            removeState = function (state, el) {
              el.removeClass("ui-state-" + state);
            };
          this.lis.bind("mouseover.tabs", function () {
            addState("hover", $(this));
          }),
            this.lis.bind("mouseout.tabs", function () {
              removeState("hover", $(this));
            }),
            this.anchors.bind("focus.tabs", function () {
              addState("focus", $(this).closest("li"));
            }),
            this.anchors.bind("blur.tabs", function () {
              removeState("focus", $(this).closest("li"));
            });
        }
        function resetStyle($el, fx) {
          $el.css("display", ""),
            !$.support.opacity &&
              fx.opacity &&
              $el[0].style.removeAttribute("filter");
        }
        o.fx &&
          ($.isArray(o.fx)
            ? ((hideFx = o.fx[0]), (showFx = o.fx[1]))
            : (hideFx = showFx = o.fx));
        var showTab = showFx
            ? function (clicked, $show) {
                $(clicked)
                  .closest("li")
                  .addClass("ui-tabs-selected ui-state-active"),
                  $show
                    .hide()
                    .removeClass("ui-tabs-hide")
                    .animate(showFx, showFx.duration || "normal", function () {
                      resetStyle($show, showFx),
                        self._trigger(
                          "show",
                          null,
                          self._ui(clicked, $show[0])
                        );
                    });
              }
            : function (clicked, $show) {
                $(clicked)
                  .closest("li")
                  .addClass("ui-tabs-selected ui-state-active"),
                  $show.removeClass("ui-tabs-hide"),
                  self._trigger("show", null, self._ui(clicked, $show[0]));
              },
          hideTab = hideFx
            ? function (clicked, $hide) {
                $hide.animate(hideFx, hideFx.duration || "normal", function () {
                  self.lis.removeClass("ui-tabs-selected ui-state-active"),
                    $hide.addClass("ui-tabs-hide"),
                    resetStyle($hide, hideFx),
                    self.element.dequeue("tabs");
                });
              }
            : function (clicked, $hide, $show) {
                self.lis.removeClass("ui-tabs-selected ui-state-active"),
                  $hide.addClass("ui-tabs-hide"),
                  self.element.dequeue("tabs");
              };
        this.anchors.bind(o.event + ".tabs", function () {
          var el = this,
            $li = $(el).closest("li"),
            $hide = self.panels.filter(":not(.ui-tabs-hide)"),
            $show = self.element.find(self._sanitizeSelector(el.hash));
          if (
            ($li.hasClass("ui-tabs-selected") && !o.collapsible) ||
            $li.hasClass("ui-state-disabled") ||
            $li.hasClass("ui-state-processing") ||
            self.panels.filter(":animated").length ||
            !1 === self._trigger("select", null, self._ui(this, $show[0]))
          )
            return this.blur(), !1;
          if (
            ((o.selected = self.anchors.index(this)),
            self.abort(),
            o.collapsible)
          ) {
            if ($li.hasClass("ui-tabs-selected"))
              return (
                (o.selected = -1),
                o.cookie && self._cookie(o.selected, o.cookie),
                self.element
                  .queue("tabs", function () {
                    hideTab(el, $hide);
                  })
                  .dequeue("tabs"),
                this.blur(),
                !1
              );
            if (!$hide.length)
              return (
                o.cookie && self._cookie(o.selected, o.cookie),
                self.element.queue("tabs", function () {
                  showTab(el, $show);
                }),
                self.load(self.anchors.index(this)),
                this.blur(),
                !1
              );
          }
          if ((o.cookie && self._cookie(o.selected, o.cookie), !$show.length))
            throw "jQuery UI Tabs: Mismatching fragment identifier.";
          $hide.length &&
            self.element.queue("tabs", function () {
              hideTab(el, $hide);
            }),
            self.element.queue("tabs", function () {
              showTab(el, $show);
            }),
            self.load(self.anchors.index(this)),
            $.browser.msie && this.blur();
        }),
          this.anchors.bind("click.tabs", function () {
            return !1;
          });
      },
      _getIndex: function (index) {
        return (
          "string" == typeof index &&
            (index = this.anchors.index(
              this.anchors.filter("[href$=" + index + "]")
            )),
          index
        );
      },
      destroy: function () {
        var o = this.options;
        return (
          this.abort(),
          this.element
            .unbind(".tabs")
            .removeClass(
              "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
            )
            .removeData("tabs"),
          this.list.removeClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          ),
          this.anchors.each(function () {
            var href = $.data(this, "href.tabs");
            href && (this.href = href);
            var $this = $(this).unbind(".tabs");
            $.each(["href", "load", "cache"], function (i, prefix) {
              $this.removeData(prefix + ".tabs");
            });
          }),
          this.lis
            .unbind(".tabs")
            .add(this.panels)
            .each(function () {
              $.data(this, "destroy.tabs")
                ? $(this).remove()
                : $(this).removeClass(
                    [
                      "ui-state-default",
                      "ui-corner-top",
                      "ui-tabs-selected",
                      "ui-state-active",
                      "ui-state-hover",
                      "ui-state-focus",
                      "ui-state-disabled",
                      "ui-tabs-panel",
                      "ui-widget-content",
                      "ui-corner-bottom",
                      "ui-tabs-hide",
                    ].join(" ")
                  );
            }),
          o.cookie && this._cookie(null, o.cookie),
          this
        );
      },
      add: function (url, label, index) {
        void 0 === index && (index = this.anchors.length);
        var self = this,
          o = this.options,
          $li = $(
            o.tabTemplate
              .replace(/#\{href\}/g, url)
              .replace(/#\{label\}/g, label)
          ),
          id = url.indexOf("#")
            ? this._tabId($("a", $li)[0])
            : url.replace("#", "");
        $li.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
        var $panel = self.element.find("#" + id);
        return (
          $panel.length ||
            ($panel = $(o.panelTemplate)
              .attr("id", id)
              .data("destroy.tabs", !0)),
          $panel.addClass(
            "ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"
          ),
          index >= this.lis.length
            ? ($li.appendTo(this.list),
              $panel.appendTo(this.list[0].parentNode))
            : ($li.insertBefore(this.lis[index]),
              $panel.insertBefore(this.panels[index])),
          (o.disabled = $.map(o.disabled, function (n, i) {
            return n >= index ? ++n : n;
          })),
          this._tabify(),
          1 == this.anchors.length &&
            ((o.selected = 0),
            $li.addClass("ui-tabs-selected ui-state-active"),
            $panel.removeClass("ui-tabs-hide"),
            this.element.queue("tabs", function () {
              self._trigger(
                "show",
                null,
                self._ui(self.anchors[0], self.panels[0])
              );
            }),
            this.load(0)),
          this._trigger(
            "add",
            null,
            this._ui(this.anchors[index], this.panels[index])
          ),
          this
        );
      },
      remove: function (index) {
        index = this._getIndex(index);
        var o = this.options,
          $li = this.lis.eq(index).remove(),
          $panel = this.panels.eq(index).remove();
        return (
          $li.hasClass("ui-tabs-selected") &&
            this.anchors.length > 1 &&
            this.select(index + (index + 1 < this.anchors.length ? 1 : -1)),
          (o.disabled = $.map(
            $.grep(o.disabled, function (n, i) {
              return n != index;
            }),
            function (n, i) {
              return n >= index ? --n : n;
            }
          )),
          this._tabify(),
          this._trigger("remove", null, this._ui($li.find("a")[0], $panel[0])),
          this
        );
      },
      enable: function (index) {
        index = this._getIndex(index);
        var o = this.options;
        if (-1 != $.inArray(index, o.disabled))
          return (
            this.lis.eq(index).removeClass("ui-state-disabled"),
            (o.disabled = $.grep(o.disabled, function (n, i) {
              return n != index;
            })),
            this._trigger(
              "enable",
              null,
              this._ui(this.anchors[index], this.panels[index])
            ),
            this
          );
      },
      disable: function (index) {
        index = this._getIndex(index);
        var self = this,
          o = this.options;
        return (
          index != o.selected &&
            (this.lis.eq(index).addClass("ui-state-disabled"),
            o.disabled.push(index),
            o.disabled.sort(),
            this._trigger(
              "disable",
              null,
              this._ui(this.anchors[index], this.panels[index])
            )),
          this
        );
      },
      select: function (index) {
        if (-1 == (index = this._getIndex(index))) {
          if (!this.options.collapsible || -1 == this.options.selected)
            return this;
          index = this.options.selected;
        }
        return (
          this.anchors.eq(index).trigger(this.options.event + ".tabs"), this
        );
      },
      load: function (index) {
        index = this._getIndex(index);
        var self = this,
          o = this.options,
          a = this.anchors.eq(index)[0],
          url = $.data(a, "load.tabs");
        if (
          (this.abort(),
          url &&
            (0 === this.element.queue("tabs").length ||
              !$.data(a, "cache.tabs")))
        ) {
          if ((this.lis.eq(index).addClass("ui-state-processing"), o.spinner)) {
            var span = $("span", a);
            span.data("label.tabs", span.html()).html(o.spinner);
          }
          return (
            (this.xhr = $.ajax(
              $.extend({}, o.ajaxOptions, {
                url: url,
                success: function (r, s) {
                  self.element.find(self._sanitizeSelector(a.hash)).html(r),
                    self._cleanup(),
                    o.cache && $.data(a, "cache.tabs", !0),
                    self._trigger(
                      "load",
                      null,
                      self._ui(self.anchors[index], self.panels[index])
                    );
                  try {
                    o.ajaxOptions.success(r, s);
                  } catch (e) {}
                },
                error: function (xhr, s, e) {
                  self._cleanup(),
                    self._trigger(
                      "load",
                      null,
                      self._ui(self.anchors[index], self.panels[index])
                    );
                  try {
                    o.ajaxOptions.error(xhr, s, index, a);
                  } catch (e) {}
                },
              })
            )),
            self.element.dequeue("tabs"),
            this
          );
        }
        this.element.dequeue("tabs");
      },
      abort: function () {
        return (
          this.element.queue([]),
          this.panels.stop(!1, !0),
          this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)),
          this.xhr && (this.xhr.abort(), delete this.xhr),
          this._cleanup(),
          this
        );
      },
      url: function (index, url) {
        return (
          this.anchors
            .eq(index)
            .removeData("cache.tabs")
            .data("load.tabs", url),
          this
        );
      },
      length: function () {
        return this.anchors.length;
      },
    }),
      $.extend($.ui.tabs, { version: "1.8.7" }),
      $.extend($.ui.tabs.prototype, {
        rotation: null,
        rotate: function (ms, continuing) {
          var self = this,
            o = this.options,
            rotate =
              self._rotate ||
              (self._rotate = function (e) {
                clearTimeout(self.rotation),
                  (self.rotation = setTimeout(function () {
                    var t = o.selected;
                    self.select(++t < self.anchors.length ? t : 0);
                  }, ms)),
                  e && e.stopPropagation();
              }),
            stop =
              self._unrotate ||
              (self._unrotate = continuing
                ? function (e) {
                    (t = o.selected), rotate();
                  }
                : function (e) {
                    e.clientX && self.rotate(null);
                  });
          return (
            ms
              ? (this.element.bind("tabsshow", rotate),
                this.anchors.bind(o.event + ".tabs", stop),
                rotate())
              : (clearTimeout(self.rotation),
                this.element.unbind("tabsshow", rotate),
                this.anchors.unbind(o.event + ".tabs", stop),
                delete this._rotate,
                delete this._unrotate),
            this
          );
        },
      });
  })(jQuery),
  (function (a) {
    function f(a, b) {
      if (!(a.originalEvent.touches.length > 1)) {
        a.preventDefault();
        var c = a.originalEvent.changedTouches[0],
          d = document.createEvent("MouseEvents");
        d.initMouseEvent(
          b,
          !0,
          !0,
          window,
          1,
          c.screenX,
          c.screenY,
          c.clientX,
          c.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
          a.target.dispatchEvent(d);
      }
    }
    if (((a.support.touch = "ontouchend" in document), a.support.touch)) {
      var e,
        b = a.ui.mouse.prototype,
        c = b._mouseInit,
        d = b._mouseDestroy;
      (b._touchStart = function (a) {
        var b = this;
        !e &&
          b._mouseCapture(a.originalEvent.changedTouches[0]) &&
          ((e = !0),
          (b._touchMoved = !1),
          f(a, "mouseover"),
          f(a, "mousemove"),
          f(a, "mousedown"));
      }),
        (b._touchMove = function (a) {
          e && ((this._touchMoved = !0), f(a, "mousemove"));
        }),
        (b._touchEnd = function (a) {
          e &&
            (f(a, "mouseup"),
            f(a, "mouseout"),
            this._touchMoved || f(a, "click"),
            (e = !1));
        }),
        (b._mouseInit = function () {
          var b = this;
          b.element.bind({
            touchstart: a.proxy(b, "_touchStart"),
            touchmove: a.proxy(b, "_touchMove"),
            touchend: a.proxy(b, "_touchEnd"),
          }),
            c.call(b);
        }),
        (b._mouseDestroy = function () {
          var b = this;
          b.element.unbind({
            touchstart: a.proxy(b, "_touchStart"),
            touchmove: a.proxy(b, "_touchMove"),
            touchend: a.proxy(b, "_touchEnd"),
          }),
            d.call(b);
        });
    }
  })(jQuery),
  $(window).load(function () {
    function outputValue(data) {
      $("#Q48HTML_1").val(data);
    }
    var dragStrArr = dragStr.split("|"),
      droStrArr = dropStr.split("|"),
      scaleValueArr = scaleValue.split("|"),
      sliderLabels = sliderLabel.split("|"),
      indexArr = dragStr.split("|"),
      indexZ = 20,
      X = 0,
      Y = 0,
      dropArray = [],
      dragArr = [];
    shufle && shuffle(dragStrArr);
    for (var i = 1; i <= dragStrArr.length; i++)
      $(".draggableBlock").append(
        "<div id='draggable" +
          index(i) +
          "' class='draggableOp' style='z-index:" +
          indexZ +
          ";'><div class='pretext' style='width:" +
          dragWidth +
          "px; height:" +
          dragHeight +
          "px;'><div class='textCl' style='color:" +
          dragColor +
          ";'>" +
          dragStrArr[i - 1] +
          "</div></div></div>"
      ),
        (indexZ += 1),
        (dragArr[i - 1] = "");
    for (var i = 1; i <= droStrArr.length; i++)
      $(".drops").append(
        "<div id='droppable" + i + "' class='targetDb'></div>"
      ),
        (dropArray[i - 1] = "");
    $(".drops").append("<div class='dropsL'>&nbsp;</div>"),
      $(".drops").append("<div class='dropsR'>&nbsp;</div>"),
      $(".drops").append("<div class='textL'>" + sliderLabels[0] + "</div>"),
      $(".drops").append("<div class='textR'>" + sliderLabels[1] + "</div>");
    var dropArrowWidth = 100 * droStrArr.length + 80;
    function revertPosition(dropped) {
      var dgId = $(this).attr("id").split("e")[1],
        $draggable = $(this),
        hasBeenDroppedBefore = $draggable.data("hasBeenDropped");
      if (
        ((wasJustDropped =
          dropped &&
          ("droppable1" == dropped[0].id ||
            "droppable2" == dropped[0].id ||
            "droppable3" == dropped[0].id ||
            "droppable4" == dropped[0].id ||
            "droppable5" == dropped[0].id ||
            "droppable6" == dropped[0].id ||
            "droppable7" == dropped[0].id ||
            "droppable8" == dropped[0].id ||
            "droppable9" == dropped[0].id)),
        wasJustDropped)
      ) {
        var dpId = dropped[0].id.split("e")[1];
        return (
          updateDropList(dpId, dgId),
          (dragArr[dgId - 1] = dpId),
          dragsDisable(),
          outputData(dragArr),
          !1
        );
      }
      return (
        !hasBeenDroppedBefore ||
        ($draggable.animate({ top: 0, left: 0 }, "slow"),
        backDropList(dgId),
        (dragArr[dgId - 1] = ""),
        outputData(dragArr),
        dragsDisable(),
        !1)
      );
    }
    function updateDropList(dpId, dgId) {
      dropArray[dpId - 1] = dgId;
      for (var rn = 0; rn < dropArray.length; rn++)
        dropArray[rn] == dgId && (dropArray[rn] = "");
      (dropArray[dpId - 1] = dgId), dropAreaDisable(dropArray);
    }
    function dropAreaDisable(dropArray) {
      for (var rn = 1; rn <= dropArray.length; rn++)
        "" != dropArray[rn - 1]
          ? $("#droppable" + rn).droppable("option", "disabled", !0)
          : $("#droppable" + rn).droppable("option", "disabled", !1);
    }
    function dragsDisable() {
      for (var dp = 0, rn = 1; rn <= dragArr.length; rn++)
        "" != dragArr[rn - 1] && dp++;
      if (dp >= 5)
        for (var r = 1; r <= dragArr.length; r++)
          "" == dragArr[r - 1] &&
            $("#draggable" + r).draggable("option", "disabled", !0);
      else
        for (var r = 1; r <= dragArr.length; r++)
          $("#draggable" + r).draggable("option", "disabled", !1);
    }
    function backDropList(dgId) {
      for (var rn = 0; rn < dropArray.length; rn++)
        dropArray[rn] == dgId && (dropArray[rn] = "");
      dropAreaDisable(dropArray);
    }
    function outputData(dragArr) {
      outputValue(dropArray.toString());
    }
    function index(a) {
      for (var j = 0; j < indexArr.length; j++)
        if (indexArr[j] == dragStrArr[a - 1]) return j + 1;
    }
    function shuffle(array) {
      for (
        var currentIndex = array.length, temporaryValue, randomIndex;
        0 !== currentIndex;

      )
        (randomIndex = Math.floor(Math.random() * currentIndex)),
          (temporaryValue = array[(currentIndex -= 1)]),
          (array[currentIndex] = array[randomIndex]),
          (array[randomIndex] = temporaryValue);
      return array;
    }
    $(".drops").css("width", dropArrowWidth + "px"),
      $(".draggableOp").draggable({
        refreshPositions: !0,
        containment: ".mainContainer",
        cursor: "default",
        greedy: !0,
        revert: revertPosition,
        drag: function (event, ui) {
          indexZ++, $(this).css({ "z-index": indexZ });
        },
      }),
      $(".targetDb").droppable({
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function (event, ui) {
          $(this).addClass("ui-state-highlight"),
            $(ui.draggable).data("hasBeenDropped", !0),
            ui.draggable.position({ of: $(this), my: "center", at: "center" });
        },
        $activate: function (event, ui) {},
      });
    $(".drops").append(
      "<div class='scale-rating'>" +
        "<div class='scale-range'>" +
        scaleValueArr[0] +
        "</div>" +
        "<div class='scale-range'>" +
        scaleValueArr[1] +
        "</div>" +
        "<div class='scale-range'>" +
        scaleValueArr[2] +
        "</div>" +
        "<div class='scale-range'>" +
        scaleValueArr[3] +
        "</div>" +
        "<div class='scale-range'>" +
        scaleValueArr[4] +
        "</div>" +
        "</div>"
    );
  });
$(window).ready(function () {
  function dragnRankWidget() {
    $(".dnd-container").append(
      ' <div class="mainContainer clearfix"><div class="clearAll" style="height: 5px"></div><div class="draggableBlock" style="font-size: 14px"></div><div class="targetMainBlock clearfix"><div class="drops" style="width: 580px"></div><div style="height: 80px"></div><div class="clearAll"></div></div><div class="clearAll" style="height: 60px"></div></div>'
    );
    // $("body").append(' <input type="hidden" id="Q48HTML_1" />');
  }
  dragnRankWidget();
});
//# sourceMappingURL=dragmodule.min.js.map
