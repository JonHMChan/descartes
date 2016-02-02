const m = [{margin: 0, padding: 0, "min-height": "100%"}]
const wrapper = {"max-width": 800, margin: "0 auto"}
const rgba = (a,b,c,d) => { return "rgba("+[a,b,c,d].join()+")" }
const rand_rgba = () => {
	return "rgba("+[255,255,255].map(x => {
		return Math.round(Math.random() * x);
	}).join()+", 1)"
}
const rand_angle = () => {
	return Math.round(Math.random() * (180) - 90);
}

const _ = {
	"html": {
		_mixins: m,
		"font-family": "Source Sans Pro, Helvetica",
		color: "#fff",
		body: {
			background: () => {
				return 'linear-gradient(' + rand_angle().toString() + 'deg, ' + rand_rgba() + ', ' + rand_rgba() + ')'
			},
			_mixins: m,
			nav: {
				_mixins: wrapper,
				"text-align": "center",
				position: "fixed"
			},
			header: {
				_mixins: m,
				"div.content": {
					_listeners: [[window, "resize"]],
					"margin": (s) => { return (((window.innerHeight - s.offsetHeight) / 2) - 50) + "px 0"; },
					"text-align": "center",
					h1: {
						"font-size": 120,
						"font-weight": 200,
						"line-height": 110,
						margin: 0
					},
					h2: {
						margin: 0,
						"margin-bottom": 15,
						"font-weight": 200,
						"font-size": 36
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
				background: "rgba(255,255,255,0.80)",
				padding: "25px 0",
				"> div": {
					_mixins: wrapper,
				}
			}
		}
	}
}

d = new Descartes(_)
d.render()