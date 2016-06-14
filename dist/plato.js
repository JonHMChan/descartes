"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! Plato v0.0.1 | (c) Jonathan Chan @jonhmchan */

var Plato = function () {
	function Plato() {
		_classCallCheck(this, Plato);

		this.layout = {
			wrappers: {
				default: 1200,
				mobile: 800
			},
			grid: {
				columns: 12,
				gutter: 1.6,
				fixedGutter: 15
			}
		};

		this.typography = {
			font: {
				base: "Helvetica",
				heading: "Helvetica"
			},
			size: {
				base: "1em"
			},
			lineHeight: {
				base: 1.5,
				heading: 1.2
			}
		};

		this.colors = {
			background: {
				primary: "#fff",
				secondary: "#333"
			}
		};
	}

	_createClass(Plato, [{
		key: "base",
		value: function base() {
			var tree = {
				"html": {
					"box-sizing": "border-box",
					"body": {
						"font-family": this.typography.font.base,
						"background": this.colors.background.primary,
						".row": { _mixins: this.row() },
						".col1": { _mixins: this.col(1) },
						".col2": { _mixins: this.col(2) },
						".col3": { _mixins: this.col(3) },
						".col4": { _mixins: this.col(4) },
						".col5": { _mixins: this.col(5) },
						".col6": { _mixins: this.col(6) },
						".col7": { _mixins: this.col(7) },
						".col8": { _mixins: this.col(8) },
						".col9": { _mixins: this.col(9) },
						".col10": { _mixins: this.col(10) },
						".col11": { _mixins: this.col(11) },
						".col12": { _mixins: this.col(12) },
						".table-row": { _mixins: this.tableRow() },
						".table-col1": { _mixins: this.tableCol(1) },
						".table-col2": { _mixins: this.tableCol(2) },
						".table-col3": { _mixins: this.tableCol(3) },
						".table-col4": { _mixins: this.tableCol(4) },
						".table-col5": { _mixins: this.tableCol(5) },
						".table-col6": { _mixins: this.tableCol(6) },
						".table-col7": { _mixins: this.tableCol(7) },
						".table-col8": { _mixins: this.tableCol(8) },
						".table-col9": { _mixins: this.tableCol(9) },
						".table-col10": { _mixins: this.tableCol(10) },
						".table-col11": { _mixins: this.tableCol(11) },
						".table-col12": { _mixins: this.tableCol(12) }
					}
				},
				"*, *::before, *::after": {
					"box-sizing": "border-box"
				}
			};
			return tree;
		}

		/* Value functions */

		// rgba()
		// ----------
		// Shorthand for rgba() colors

	}, {
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
			var width = arguments.length <= 0 || arguments[0] === undefined ? this.layout.wrappers : arguments[0];

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
					return window.innerWidth >= _this.layout.wrappers.mobile ? 0 : _this.layout.grid.fixedGutter;
				},
				"margin-right": function marginRight() {
					return window.innerWidth >= _this.layout.wrappers.mobile ? 0 : _this.layout.grid.fixedGutter;
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
					return window.innerWidth >= _this2.layout.wrappers.mobile ? "table" : "block";
				},
				"box-sizing": "border-box",
				"margin-left": function marginLeft() {
					return window.innerWidth >= _this2.layout.wrappers.mobile ? 0 : _this2.layout.grid.fixedGutter;
				},
				"margin-right": function marginRight() {
					return window.innerWidth >= _this2.layout.wrappers.mobile ? 0 : _this2.layout.grid.fixedGutter;
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

			var columns = arguments.length <= 2 || arguments[2] === undefined ? this.layout.grid.columns : arguments[2];
			var gutter = arguments.length <= 3 || arguments[3] === undefined ? this.layout.grid.gutter : arguments[3];

			var calc = function calc(n, c, g) {
				return n * ((100 - (c - 1) * g) / c) + (n - 1) * g;
			};
			return {
				"_listeners": [[window, "resize"]],
				"float": function float() {
					return window.innerWidth >= _this3.layout.wrappers.mobile ? "left" : "none";
				},
				"box-sizing": "border-box",
				"width": function width() {
					return window.innerWidth >= _this3.layout.wrappers.mobile ? calc(num, columns, gutter).toString() + "%" : "100%";
				},
				"margin-right": function marginRight(_) {
					return _.nextElementSibling === null ? 0 : gutter.toString() + "%";
				},
				"margin-bottom": function marginBottom(_) {
					return window.innerWidth >= _this3.layout.wrappers.mobile ? 0 : _this3.layout.grid.fixedGutter;
				}
			};
		}
	}, {
		key: "tableCol",
		value: function tableCol() {
			var num = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var _this4 = this;

			var columns = arguments.length <= 2 || arguments[2] === undefined ? this.layout.grid.columns : arguments[2];
			var gutter = arguments.length <= 3 || arguments[3] === undefined ? this.layout.grid.gutter : arguments[3];

			var calc = function calc(n, c, g) {
				return n * ((100 - (c - 1) * g) / c) + (n - 1) * g;
			};
			return {
				"_listeners": [[window, "resize"]],
				"display": function display() {
					return window.innerWidth >= _this4.layout.wrappers.mobile ? "table-cell" : "block";
				},
				"box-sizing": "border-box",
				"width": function width() {
					return window.innerWidth >= _this4.layout.wrappers.mobile ? (calc(num, columns, gutter) + gutter).toString() + "%" : "100%";
				},
				"margin-bottom": function marginBottom(_) {
					return window.innerWidth >= _this4.layout.wrappers.mobile ? 0 : _this4.layout.grid.fixedGutter;
				}
			};
		}
	}]);

	return Plato;
}();