"use strict";

var m = { margin: 0, padding: 0, "height": "100%" };
var heading = { "margin-top": 0, "margin-bottom": 15, padding: 0, 'font-weight': 300 };
var max = 900;
var wrapper = { "max-width": max, margin: "0 auto" };
var verticalAlign = { position: "relative", top: "50%", "transform": "translateY(-50%)" };
var _button = { background: "none",
	"border-width": "1px",
	"border-style": "solid",
	"border-color": "currentColor",
	padding: "10px 15px",
	"font-size": 12,
	"letter-spacing": 1,
	"text-transform": "uppercase",
	"cursor": "pointer" };
var clearfix = { "&::after": {
		content: "",
		display: "table",
		clear: "both"
	}
};
var rand_rgba = function rand_rgba() {
	return "rgba(" + [255, 255, 255].map(function (x) {
		return Math.round(Math.random() * x);
	}).join() + ", 1)";
};
var rand_angle = function rand_angle() {
	return Math.round(Math.random() * 180 - 90);
};

var prop = function prop(sel, a, b, x, y) {
	if (sel <= a) return x;
	if (sel >= b) return y;
	var ratio = (sel - a) / (b - a);
	return x + (y - x) * ratio;
};

var p = new Plato();

new Descartes({
	"html": {
		_mixins: m,
		"font-family": "Source Sans Pro, Helvetica",
		color: "#333",
		"font-size": 16,
		"font-weight": 300,
		body: {
			_mixins: m,
			_listeners: [[window, "click"], [window, "touchstart"]],
			height: "100%",
			"background": function background() {
				return 'linear-gradient(' + rand_angle().toString() + 'deg,' + rand_rgba() + ',' + rand_rgba() + ')' + ' center center fixed no-repeat';
			},
			pre: {
				"font-size": 14,
				code: {
					"font-family": "Anonymous Pro"
				}
			},
			".row": { _mixins: p.clearfix() },
			".col1": { _mixins: p.col(1) },
			".col2": { _mixins: p.col(2) },
			".col3": { _mixins: p.col(3) },
			".col4": { _mixins: p.col(4) },
			".col5": { _mixins: p.col(5) },
			".col6": { _mixins: p.col(6) },
			".col7": { _mixins: p.col(7) },
			".col8": { _mixins: p.col(8) },
			".col9": { _mixins: p.col(9) },
			".col10": { _mixins: p.col(10) },
			".col11": { _mixins: p.col(11) },
			".col12": { _mixins: p.col(12) },
			nav: {
				_mixins: wrapper,
				"text-align": "center",
				position: "fixed"
			},
			"a.button": {
				_mixins: _button
			},
			button: {
				_mixins: _button
			},
			".wrapper": {
				_mixins: wrapper
			},
			header: {
				_mixins: m,
				height: "90%",
				color: "#fff",
				"div.content": {
					_listeners: [[window, "scroll"]],
					_mixins: [verticalAlign, wrapper],
					"opacity": function opacity() {
						return prop($(window).scrollTop(), 150, 350, 1, 0);
					},
					"text-align": "center",
					h1: {
						_mixins: heading,
						"font-size": 120,
						"line-height": 110,
						"margin-bottom": 0
					},
					h2: {
						_mixins: heading,
						"margin-bottom": 0,
						"font-size": 36
					},
					p: {
						_mixins: heading,
						"margin-bottom": 15,
						"font-size": 20
					},
					pre: {
						width: "100%",
						code: {
							"text-align": "left",
							"word-wrap": "pre-wrap",
							"font-size": 16,
							"font-family": "Anonymous Pro",
							padding: 25,
							background: "rgba(0,0,0,0.75)"
						}
					},
					button: {
						_mixins: _button,
						color: "#fff"
					}
				}
			},
			section: {
				"&.plain": {
					padding: "25px 0",
					background: "#fff",
					pre: {
						width: "100%"
					},
					"> div": {
						_mixins: wrapper
					}
				},
				"&.offset": {
					_mixins: clearfix,
					background: "rgba(255,255,255,0.75)",
					position: "relative",
					display: "table",
					height: "100%",
					width: "100%",
					"&.left > div": {
						width: "50%",
						padding: 15,
						"box-sizing": "border-box",
						display: "table-cell",
						"vertical-align": "middle",
						"&:nth-child(1) > div": {
							width: max / 2,
							float: "right"
						}
					},
					"&.right > div": {
						width: "50%",
						padding: 15,
						"box-sizing": "border-box",
						display: "table-cell",
						"vertical-align": "middle",
						"&:nth-child(1) > div": {
							width: max / 2,
							float: "right"
						},
						"&:nth-child(2) > div": {
							width: max / 2,
							float: "left"
						}
					}
				},
				h3: {
					_mixins: heading,
					"font-size": 36,
					"margin-bottom": 0
				},
				h4: {
					_mixins: heading,
					"font-size": 24,
					"margin-bottom": 0
				}
			}
		}
	}
});