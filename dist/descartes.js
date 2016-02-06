'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! Descartes v0.0.1-pre | (c) Jon Chan @jonhmchan | descartes.io/license */

var Descartes = function () {
	function Descartes(tree) {
		_classCallCheck(this, Descartes);

		this.tree = tree;
		this.mappings = {};
		this.mappingsPriority = 0;

		this.selector = 'selector';
		this.rule = 'rule';
		this.meta = 'meta';
		this.mixins = '_mixins';
		this.listeners = '_listeners';

		this.prefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];
		this.rules = ['align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'backface-visibility', 'background', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-shadow', 'box-sizing', 'caption-side', 'clear', 'clip', 'color', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font', '@font-face', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging-punctuation', 'height', 'justify-content', '@keyframes', 'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', '@media', 'min-height', 'min-width', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'opacity', 'order', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'perspective', 'perspective-origin', 'position', 'quotes', 'resize', 'right', 'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'text-indent', 'text-justify', 'text-overflow', 'text-shadow', 'text-transform', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'white-space', 'width', 'word-break', 'word-spacing', 'word-wrap', 'z-index'];

		this.findType = undefined;
		this.find = this.findLibrary();

		this.render();
	}

	_createClass(Descartes, [{
		key: 'findLibrary',
		value: function findLibrary() {
			if (typeof $ !== 'undefined') {
				this.findType = 'jquery';
				var finder = function finder(_) {
					var elems = [];
					$(_).each(function (i, e) {
						elems.push(e);
					});
					return elems;
				};
				return finder;
			} else if (typeof Sizzle !== 'undefined') {
				this.findType = 'sizzle';
				return Sizzle;
			}
		}

		// Returns the computed rules tree based on original tree

	}, {
		key: 'compute',
		value: function compute() {
			var tree = arguments.length <= 0 || arguments[0] === undefined ? this.tree : arguments[0];

			if ((typeof tree === 'undefined' ? 'undefined' : _typeof(tree)) === 'object') {
				var result = {};
				for (var key in tree) {
					var value = tree[key];
					var keyObject = this.parseKey(key);
					if (keyObject.type === this.selector) {
						result[keyObject.key] = this.compute(value);
					} else if (keyObject.type === this.rule) {
						result[keyObject.key] = value;
					} else if (keyObject.type === this.meta) {
						if (keyObject.key === this.mixins) {
							var mixedRules = this.parseMixins(tree, key);
							result = mixedRules;
						} else if (keyObject.key === this.listeners) {
							result[keyObject.key] = value;
						}
					}
				}
				return result;
			}
			return null;
		}

		// Expands the computed rules tree into a flat rule mappings object

	}, {
		key: 'flatten',
		value: function flatten() {
			var tree = arguments.length <= 0 || arguments[0] === undefined ? this.compute(tree) : arguments[0];
			var parentSelector = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
			var priority = arguments.length <= 2 || arguments[2] === undefined ? this.mappingsPriority : arguments[2];

			for (var selector in tree) {
				var rules = Object.assign({}, tree[selector]);
				var _listeners = rules[this.listeners];
				// Add the rules in here
				for (var rule in rules) {
					if (!this.isRule(rule)) {
						var subtree = null;
						if (parentSelector === "") parentSelector = selector;
						var nestedSelector = this.nestSelector(rule, parentSelector);
						if (!this.isMeta(rule) && !this.isRule(rule)) {
							subtree = {};
							subtree[nestedSelector] = rules[rule];
						}
						delete rules[rule];
						if (subtree !== null) {
							this.flatten(subtree, nestedSelector, priority + 1);
						}
					}
				}
				this.mappings[selector] = {
					rules: rules,
					_listeners: _listeners,
					priority: priority
				};
				if (this.mappingsPriority < priority) this.mappingsPriority = priority;
			}
			return this.mappings;
		}
	}, {
		key: 'render',
		value: function render() {
			this.flatten();
			this.bindListeners();
			this.applyAll();
		}
	}, {
		key: 'bindListeners',
		value: function bindListeners() {
			var _this = this;

			var _loop = function _loop(selector) {
				var mapping = _this.mappings[selector];
				var listeners = mapping[_this.listeners];
				if (typeof listeners === 'undefined') return 'continue';
				var rules = mapping['rules'];
				listeners.map(function (l) {
					if (typeof l[0] === 'string') {
						if (_this.findType == 'jquery') {
							_this.find(l[0]).map(function (x) {
								x.bind(l[1], function () {
									_this.applyStyles(selector, rules);
									_this.apply();
								});
							});
						} else if (_this.findType === 'sizzle') {
							_this.find(l[0]).map(function (x) {
								x.addEventListener(l[1], function () {
									_this.applyStyles(selector, rules);
									_this.apply();
								});
							});
						}
					} else {
						l[0].addEventListener(l[1], function () {
							_this.applyStyles(selector, rules);
							_this.apply();
						});
					}
				});
			};

			for (var selector in this.mappings) {
				var _ret = _loop(selector);

				if (_ret === 'continue') continue;
			}
		}
	}, {
		key: 'applyAll',
		value: function applyAll() {
			var _this2 = this;

			// sort by priority
			var prioritizedList = Array.apply(null, Array(this.mappingsPriority + 1)).map(function () {
				return [];
			});
			for (var key in this.mappings) {
				var mapping = this.mappings[key];
				prioritizedList[mapping.priority].push([key, mapping.rules]);
			}
			prioritizedList.map(function (set) {
				set.map(function (mapping) {
					_this2.applyStyles(mapping[0], mapping[1]);
				});
			});
			this.apply();
		}
	}, {
		key: 'apply',
		value: function apply() {
			var _this3 = this;

			if (this.findType === 'jquery') {
				var all = this.find("*");
				all.map(function (x) {
					var style = x.getAttribute('data-descartes');
					if (typeof style === 'undefined') return;
					x.setAttribute('style', _this3.createStyleString(JSON.parse(style), x));
				});
				// $("[data-descartes]").removeAttr("data-descartes")
			}
		}
	}, {
		key: 'applyStyles',
		value: function applyStyles() {
			var _this4 = this;

			var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var rules = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			if (selector === null || rules === null) return false;
			if (this.isPseudo(selector) && this.applyPsuedo(selector, rules)) return;
			var elems = this.find(selector.toString());
			if (elems.length === 0) return false;
			elems.map(function (elem) {
				var style = elem.getAttribute('data-descartes');
				if (typeof style === 'undefined') return;
				style = style === null ? {} : JSON.parse(style);
				var computed = {};
				for (var key in rules) {
					computed[key] = _this4.computeRule(rules[key], key, elem);
				}
				style = Object.assign(style, computed);
				elem.setAttribute('data-descartes', JSON.stringify(style));
			});
			return true;
		}
	}, {
		key: 'createStyleString',
		value: function createStyleString(rules, elem) {
			var style = "";
			for (var key in rules) {
				var computedRule = this.computeRule(rules[key], key, elem);
				style += key + ": " + computedRule + "; ";
			}
			style = style.slice(0, -1);
			return style;
		}
	}, {
		key: 'applyPsuedo',
		value: function applyPsuedo(selector, rules) {
			if (this.isPseudo(selector)) {
				var pure = selector.replace('::after', '').replace('::before', '');
				if (this.findType === 'jquery') {
					var sheet = '<style type="text/css" class="_after">' + selector + " {" + this.createStyleString(rules) + ' }</style>';
					$(sheet).appendTo("head");
					return;
					if (selector.match(/.+::after/) !== null) $(sheet).appendTo(pure);
					if (selector.match(/.+::before/) !== null) $(sheet).prependTo(pure);
				}
				return true;
			}
			return false;
		}
	}, {
		key: 'computeRule',
		value: function computeRule(rule, key) {
			var elem = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

			if (typeof rule === 'function' && elem !== null) {
				rule = rule(elem);
			}
			var except = ['font-weight', 'opacity', 'z-index'];
			if (Number(rule) === rule && except.indexOf(key) < 0) {
				return rule.toString() + "px";
			}
			if (key === 'content') {
				return "'" + rule.toString() + "'";
			}
			return rule.toString();
		}
	}, {
		key: 'nestSelector',
		value: function nestSelector(current, parent) {
			var separator = " ";
			if (this.selIsAppending(current)) {
				separator = "";
				current = current.substring(1);
			}
			return parent + separator + current;
		}

		// Runs any checks on the current key to see what type it is

	}, {
		key: 'parseKey',
		value: function parseKey(key) {
			var isMeta = this.isMeta(key);
			var isRule = this.isRule(key);
			return {
				key: key,
				type: isMeta ? this.meta : isRule ? this.rule : this.selector
			};
		}

		// Adds mixins to existing tree

	}, {
		key: 'parseMixins',
		value: function parseMixins(tree, selector) {
			var mixins = tree[this.mixins];

			if (!Array.isArray(mixins)) {
				mixins = [mixins];
			}

			for (var index in mixins) {
				var mixin = mixins[index];
				if (mixin !== null && (typeof mixin === 'undefined' ? 'undefined' : _typeof(mixin)) === 'object') {
					for (var rule in mixin) {
						if (!tree.hasOwnProperty(rule) || tree[rule] === null) tree[rule] = mixin[rule];
					}
				} else {
					throw "'" + selector + "' tree has an invalid _mixins value. _mixins can only be an object literal or array of object literals.";
				}
			}
			delete tree[this.mixins];
			return tree;
		}
	}, {
		key: 'isPseudo',
		value: function isPseudo(sel) {
			return sel.match(/.+::after/) !== null || sel.match(/.+::before/) !== null;
		}
	}, {
		key: 'isMeta',
		value: function isMeta(key) {
			var metas = [this.mixins, this.listeners];
			return metas.indexOf(key) > -1;
		}
	}, {
		key: 'selIsAppending',
		value: function selIsAppending(sel) {
			return sel.substr(0, 1) === '&';
		}
	}, {
		key: 'isRule',
		value: function isRule(key) {
			return this.rules.indexOf(key) > -1;
		}
	}]);

	return Descartes;
}();

document.getElementsByTagName("html")[0].style.display = "none";
(function (funcName, baseObj) {
	// The public function name defaults to window.docReady
	// but you can pass in your own object and own function name and those will be used
	// if you want to put them in a different namespace
	funcName = funcName || "docReady";
	baseObj = baseObj || window;
	var readyList = [];
	var readyFired = false;
	var readyEventHandlersInstalled = false;

	// call this when the document is ready
	// this function protects itself against being called more than once
	function ready() {
		if (!readyFired) {
			// this must be set to true before we start calling callbacks
			readyFired = true;
			for (var i = 0; i < readyList.length; i++) {
				// if a callback here happens to add new ready handlers,
				// the docReady() function will see that it already fired
				// and will schedule the callback to run right after
				// this event loop finishes so all handlers will still execute
				// in order and no new ones will be added to the readyList
				// while we are processing the list
				readyList[i].fn.call(window, readyList[i].ctx);
			}
			// allow any closures held by these functions to free
			readyList = [];
		}
	}

	function readyStateChange() {
		if (document.readyState === "complete") {
			ready();
		}
	}

	// This is the one public interface
	// docReady(fn, context);
	// the context argument is optional - if present, it will be passed
	// as an argument to the callback
	baseObj[funcName] = function (callback, context) {
		// if ready has already fired, then just schedule the callback
		// to fire asynchronously, but right away
		if (readyFired) {
			setTimeout(function () {
				callback(context);
			}, 1);
			return;
		} else {
			// add the function and context to the list
			readyList.push({ fn: callback, ctx: context });
		}
		// if document already ready to go, schedule the ready function to run
		if (document.readyState === "complete") {
			setTimeout(ready, 1);
		} else if (!readyEventHandlersInstalled) {
			// otherwise if we don't have event handlers installed, install them
			if (document.addEventListener) {
				// first choice is DOMContentLoaded event
				document.addEventListener("DOMContentLoaded", ready, false);
				// backup is window load event
				window.addEventListener("load", ready, false);
			} else {
				// must be IE
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
			readyEventHandlersInstalled = true;
		}
	};
})("docReady", window);
docReady(function () {
	// code here
	document.getElementsByTagName("html")[0].style.display = "block";
});