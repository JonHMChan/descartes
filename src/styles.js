const m = {margin: 0, padding: 0, height: "100%"}
const heading = {"margin-top": 0, "margin-bottom": 15, padding: 0, 'font-weight': 300}
const max = 900
const wrapper = {"max-width": max, margin: "0 auto"}
const verticalAlign = {position: "relative", top: "50%", "transform": "translateY(-50%)"}
const _button = {background: "none",
				"border-width": "1px",
				"border-style": "solid",
				"border-color": "currentColor",
				padding: "10px 15px",
				"font-size": 12,
				"letter-spacing": 1,
				"text-transform": "uppercase",
				"cursor": "pointer"}
const clearfix = {"&::after":
	{
		content: "",
		display: "table",
		clear: "both"
	}
}
const rand_rgba = () => {
	return "rgba("+[255,255,255].map(x => {
		return Math.round(Math.random() * x);
	}).join()+", 1)"
}
const rand_angle = () => {
	return Math.round(Math.random() * (180) - 90);
}

const prop = (sel, a, b, x, y) => {
	if (sel <= a) return x
	if (sel >= b) return y
	const ratio = (sel-a)/(b-a)
	return (x + ((y-x) * ratio))
}

const p = new Plato()

const d = new Descartes({
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
			"background": () => {
				return 'linear-gradient('
					+ rand_angle().toString() + 'deg,'
					+ rand_rgba() + ','
					+ rand_rgba() + ')'
					+ ' center center fixed no-repeat'
			},
			pre: {
				"font-size": 14,
				code: {
					"font-family": "Anonymous Pro"
				}
			},
			".row": { _mixins: p.tableRow() },
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
			"nav": {
				_listeners: [[window, "scroll"]],
				"text-align": "center",
				position: "fixed",
				width: "100%",
				"z-index": 9999,
				"color": (_) => {
					let v = p.scale($(window).scrollTop(), $(window).height()/2, $(window).height(),255,50)
					return p.rgba(v,v,v,1)
				},
				background: (_) => {
					return p.rgba(255,255,255, p.scale($(window).scrollTop(), $(window).height()/2, $(window).height(), 0, 0.9) )
				},
				"box-shadow": (_) => {
					return "0 0 15px " + p.rgba(100,100,100, p.scale($(window).scrollTop(), $(window).height()/2, $(window).height(), 0, 0.2) )
				},
				"> div": {
					_mixins: wrapper,
					padding: 15
				}
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
					"opacity": () => {
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
					background: "none",
					color: "#fff",
					"text-align": "center",
					"> div": {
						_mixins: [wrapper, p.clearfix()]
					}
				},
				"&.offset": {
					_mixins: m,
					width: "100%",
					background: "rgba(255,255,255,0.75)",
					position: "relative",
					height: "100%",
					padding: "25px 0",
					"> .row": {
						_mixins: [p.tableRow(), wrapper],
						"height": "100%",
						".col5": {
							_mixins: p.tableCol(5),
							"vertical-align": "middle",
							"padding": 15
						},
						".col7": {
							_mixins: p.tableCol(7),
							"vertical-align": "middle"
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
})

console.log(d.elemMappings)