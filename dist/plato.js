"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plato = function () {
	function Plato() {
		_classCallCheck(this, Plato);

		this.wrapper = 1200;
		this.mobileBreak = 800;
		this.columns = 12;

		this.gutter = 1.6;
		this.fixedGutter = 15;
	}

	/* Value functions */

	// rgba()
	// ----------
	// Shorthand for rgba() colors

	_createClass(Plato, [{
		key: "rgba",
		value: function rgba() {
			var r = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var g = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var b = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var a = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

			return "rgba(" + [r, g, b].map(function (x) {
				return Math.round(x);
			}).join(",") + "," + a + ")";
		}

		// Scale
		// ----------
		// Returns an output between `out_min` and `out_max` that is proportional to `gauge` position
		// between `min` and `max`

	}, {
		key: "scale",
		value: function scale() {
			var gauge = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
			var out_min = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
			var out_max = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];

			if (gauge <= min) return out_min;
			if (gauge >= max) return out_max;
			return out_min + (out_max - out_min) * ((gauge - min) / (max - min));
		}

		/* Mixins */

		// Wrapper
		// ----------
		// Sets the maximum width of content and centers it within parent, default is set by object

	}, {
		key: "wrapper",
		value: function wrapper() {
			var width = arguments.length <= 0 || arguments[0] === undefined ? this.wrapper : arguments[0];

			return {
				"max-width": width,
				"margin-left": "auto",
				"margin-right": "auto"
			};
		}

		// Clearfix
		// ----------
		// Standard clearfix implementation using ::after psuedo property

	}, {
		key: "clearfix",
		value: function clearfix() {
			return {
				"&::after": {
					"content": "",
					"display": "table",
					"clear": "both"
				}
			};
		}

		// Row
		// ----------
		// Used as part of the grid, applies resets and clearfixes

	}, {
		key: "row",
		value: function row() {
			var _this = this;

			return Object.assign(this.clearfix(), {
				"_listeners": [[window, "resize"]],
				"box-sizing": "border-box",
				"margin-left": function marginLeft() {
					return window.innerWidth >= _this.mobileBreak ? 0 : _this.fixedGutter;
				},
				"margin-right": function marginRight() {
					return window.innerWidth >= _this.mobileBreak ? 0 : _this.fixedGutter;
				}
			});
		}
	}, {
		key: "tableRow",
		value: function tableRow() {
			var _this2 = this;

			return Object.assign(this.clearfix(), {
				"_listeners": [[window, "resize"]],
				"display": function display() {
					return window.innerWidth >= _this2.mobileBreak ? "table" : "block";
				},
				"box-sizing": "border-box",
				"margin-left": function marginLeft() {
					return window.innerWidth >= _this2.mobileBreak ? 0 : _this2.fixedGutter;
				},
				"margin-right": function marginRight() {
					return window.innerWidth >= _this2.mobileBreak ? 0 : _this2.fixedGutter;
				}
			});
		}

		// Column
		// ----------
		// Used in combination with `row()` to create a grid

	}, {
		key: "col",
		value: function col() {
			var num = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var _this3 = this;

			var columns = arguments.length <= 2 || arguments[2] === undefined ? this.columns : arguments[2];
			var gutter = arguments.length <= 3 || arguments[3] === undefined ? this.gutter : arguments[3];

			var calc = function calc(n, c, g) {
				return n * ((100 - (c - 1) * g) / c) + (n - 1) * g;
			};
			return {
				"_listeners": [[window, "resize"]],
				"float": function float() {
					return window.innerWidth >= _this3.mobileBreak ? "left" : "none";
				},
				"box-sizing": "border-box",
				"width": function width() {
					return window.innerWidth >= _this3.mobileBreak ? calc(num, columns, gutter).toString() + "%" : "100%";
				},
				"margin-right": function marginRight(_) {
					return _.nextElementSibling === null ? 0 : gutter.toString() + "%";
				},
				"margin-bottom": function marginBottom(_) {
					return window.innerWidth >= _this3.mobileBreak ? 0 : _this3.fixedGutter;
				}
			};
		}
	}, {
		key: "tableCol",
		value: function tableCol() {
			var num = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var _this4 = this;

			var columns = arguments.length <= 2 || arguments[2] === undefined ? this.columns : arguments[2];
			var gutter = arguments.length <= 3 || arguments[3] === undefined ? this.gutter : arguments[3];

			var calc = function calc(n, c, g) {
				return n * ((100 - (c - 1) * g) / c) + (n - 1) * g;
			};
			return {
				"_listeners": [[window, "resize"]],
				"display": function display() {
					return window.innerWidth >= _this4.mobileBreak ? "table-cell" : "block";
				},
				"box-sizing": "border-box",
				"width": function width() {
					return window.innerWidth >= _this4.mobileBreak ? (calc(num, columns, gutter) + gutter).toString() + "%" : "100%";
				},
				"margin-bottom": function marginBottom(_) {
					return window.innerWidth >= _this4.mobileBreak ? 0 : _this4.fixedGutter;
				}
			};
		}
	}]);

	return Plato;
}();