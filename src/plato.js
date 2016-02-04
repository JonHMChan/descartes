class Plato {
	constructor() {
		this.wrapper = 800
		this.columns = 12
	}

	/* Value functions */

	// rgba()
	// ----------
	// Shorthand for rgba() colors
	rgba(r=0,g=0,b=0,a=0) {
		return "rgba(" + [r,g,b,a].join(",") + ")"
	}

	// Scale
	// ----------
	// Returns an output between `out_min` and `out_max` that is proportional to `gauge` position
	// between `min` and `max`
	scale(gauge=0, min=0, max=1, out_min=0, out_max=1) {
		if (gauge <= min) return out_min
		if (gauge >= max) return out_max
		return (out_min + ((out_max-out_min) * ((gauge-min)/(max-min))))
	}

	/* Mixins */

	// Wrapper
	// ----------
	// Sets the maximum width of content and centers it within parent, default is set by object
	wrapper(width = this.wrapper) {
		return {
			"max-width": width,
			"margin-left": "auto",
			"margin-right": "auto"
		}
	}

	// Clearfix
	// ----------
	// Standard clearfix implementation using ::after psuedo property
	clearfix() {
		return {
			"::after": {
				"content": "",
				"display": "table",
				"clear": "both"
			}
		}
	}

	// Row
	// ----------
	// Used to contain elements that are going to be arranged in a grid and
	// essentially is a combination of `wrapper()` and `clearfix()`
	row(width = null) {
		return Object.assign(this.wrapper(width), clearfix())
	}

	// Column
	// ----------
	// Used in combination with `row()` to create a grid
	col(num = 1, columns = this.columns) {
		return {
			"width": (num/float(columns)).toString() + "%",
			"float": "left",
		}
	}
}