((d) => {
	const m = [{margin: 0, padding: 0}]

	const _ = {
		"html": {
			_mixins: m,
			background: "red",
			body: {
				_mixins: m,
				margin: 0,
				header: {
					_mixins: m,
					height: () => { return window.innerWidth / 2 }
				},
				section: {
					"&.thing": {
						background: "red"
					}
				}
			}
		}
	}

	d = new Descartes(_)
	d.render()
})(Descartes)
