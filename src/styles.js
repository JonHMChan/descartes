const m = {margin: 0, padding: 0, "height": "100%"}
const heading = {"margin-top": 0, "margin-bottom": 15, padding: 0, 'font-weight': 300}
const wrapper = {"max-width": 800, margin: "0 auto"}
const verticalAlign = {position: "relative", top: "50%", "transform": "translateY(-50%)"}
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
			background: () => {
				return 'linear-gradient(' + rand_angle().toString() + 'deg, ' + rand_rgba() + ', ' + rand_rgba() + ')'
			},
			pre: {
				"font-size": 14,
				code: {
					"font-family": "Anonymous Pro"
				}
			},
			nav: {
				_mixins: wrapper,
				"text-align": "center",
				position: "fixed"
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
							"word-wrap": "pre-wrap",
							"font-size": 16,
							"font-family": "Anonymous Pro",
							padding: 25,
							background: "rgba(0,0,0,0.75)"
						}
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
				"&.plain": {
					background: "#fff",
					pre: {
						width: "100%"
					},
					"> div": {
						_mixins: wrapper,
						padding: 25
					}
				},
				"&.offset": {
					_mixins: clearfix,
					background: "#fff",
					position: "relative",
					display: "table",
					width: "100%",
					"&.left > div": {
						width: "50%",
						padding: 15,
						"box-sizing": "border-box",
						display: "table-cell",
						"vertical-align": "middle",
						"&:nth-child(1) > div": {
							width: 400,
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
							float: "right"
						},
						"&:nth-child(2) > div": {
							width: 400,
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
})