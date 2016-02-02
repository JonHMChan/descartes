const m = [{margin: 0, padding: 0}]
const wrapper = {"max-width": 800}

const _ = {
	"html": {
		_mixins: m,
		"font-family": "Helvetica",
		body: {
			_mixins: m,
			nav: {
				_mixins: wrapper,
				"text-align": "center"
			},
			header: {
				height: "100%",
				"div.content": {
					_listeners: [[window, "resize"]],
					"margin-top": (s) => { return (window.innerHeight - s.offsetHeight) / 2; },
					"text-align": "center"
				}
			}
		}
	}
}

d = new Descartes(_)
d.render()