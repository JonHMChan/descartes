const m = {margin: 0, padding: 0, "height": "100%"}
const heading = {"margin-top": 0, "margin-bottom": 15, padding: 0, 'font-weight': 300}
const wrapper = {"max-width": 800, margin: "0 auto"}
const verticalAlign = {position: "relative", top: "50%", "transform": "translateY(-50%)"}
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

new Descartes({
	"html": {
		_mixins: m,
		"font-family": "Source Sans Pro, Helvetica",
		color: "#333",
		"font-size": 16,
		"font-weight": 300,
		body: {
			_mixins: m,
			_listeners: [[window, "click"]],
			height: "100%",
			background: () => {
				return 'linear-gradient(' + rand_angle().toString() + 'deg, ' + rand_rgba() + ', ' + rand_rgba() + ')'
			},
			"pre": {
				border: "1px solid #fff",
				"white-space": "pre-wrap",
				"text-align": "left"
			},
			nav: {
				_mixins: wrapper,
				"text-align": "center",
				position: "fixed"
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
					button: {
						background: "none",
						border: "1px solid #fff",
						padding: "10px 15px",
						color: "#fff",
						"font-size": 14,
						"text-transform": "uppercase"
					}
				}
			},
			section: {
				padding: "25px 0",
				"&.plain": {
					background: "#fff",
					"> div": {
						_mixins: wrapper,
					}
				},
				"&.offset": {
					background: "#fff",
					position: "relative",
					"&.left": {
						"> div": {
							width: "50%",
							float: "left",
							"&:nth-child(1) > div": {
								width: "50%",
								float: "right"
							},
							"&:last-child": {
								clear: "both"
							}
						}
					},
					"&.right": {
						"> div": {
							width: "50%",
							float: "left",
							"&:nth-child(2) > div": {
								width: "50%",
								float: "left"
							}
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