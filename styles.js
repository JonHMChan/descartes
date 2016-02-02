const m = [{margin: 0, padding: 0, "height": "100%"}]
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
		color: "#fff",
		"font-size": 16,
		body: {
			_mixins: m,
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
				"div.content": {
					_listeners: [[window, "scroll"]],
					_mixins: [verticalAlign, wrapper],
					"opacity": () => {
						const top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)
						return prop(top, 150, 350, 1, 0);
					},
					"text-align": "center",
					h1: {
						"font-size": 120,
						"font-weight": 300,
						"line-height": 110,
						margin: 0
					},
					h2: {
						margin: 0,
						"margin-bottom": 0,
						"font-weight": 200,
						"font-size": 36
					},
					p: {
						"margin-top": 5,
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
				color: "#333",
				background: "#fff",
				padding: "25px 0",
				"> div": {
					_mixins: wrapper,
				}
			}
		}
	}
})