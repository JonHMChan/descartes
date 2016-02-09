class Plato {
	constructor() {
		this.wrapper = 1200
		this.mobileBreak = 800
		this.columns = 12

		this.gutter = 1.6
		this.fixedGutter = 15
	}

	/* Value functions */

	// rgba()
	// ----------
	// Shorthand for rgba() colors
	rgba(r=0,g=0,b=0,a=0) {
		return "rgba(" + [r,g,b].map(x => Math.round(x)).join(",") + "," + a + ")"
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
			"&::after": {
				"content": "",
				"display": "table",
				"clear": "both"
			}
		}
	}

	// Row
	// ----------
	// Used as part of the grid, applies resets and clearfixes
	row() {
		return Object.assign(this.clearfix(), {
			"_listeners": [[window, "resize"]],
			"box-sizing": "border-box",
			"margin-left": () => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter },
			"margin-right": () => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter }
		})
	}

	tableRow() {
		return Object.assign(this.clearfix(), {
			"_listeners": [[window, "resize"]],
			"display": () => {
				return (window.innerWidth >= this.mobileBreak) ? "table" : "block"
			},
			"box-sizing": "border-box",
			"margin-left": () => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter },
			"margin-right": () => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter }
		})
	}

	// Column
	// ----------
	// Used in combination with `row()` to create a grid
	col(num = 1, offset = 0, columns = this.columns, gutter = this.gutter) {
		const calc = (n, c, g) => { return ((n*((100-((c-1)*g))/c))+((n-1)*g)) }
		return {
			"_listeners": [[window, "resize"]],
			"float": () => { return (window.innerWidth >= this.mobileBreak) ? "left" : "none" },
			"box-sizing": "border-box",
			"width": () => { return (window.innerWidth >= this.mobileBreak) ? calc(num,columns,gutter).toString() + "%" : "100%" },
			"margin-right": (_) => { return (_.nextElementSibling === null) ? 0 : (gutter.toString() + "%") },
			"margin-bottom": (_) => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter }
		}
	}

	tableCol(num = 1, offset = 0, columns = this.columns, gutter = this.gutter) {
		const calc = (n, c, g) => { return ((n*((100-((c-1)*g))/c))+((n-1)*g)) }
		return {
			"_listeners": [[window, "resize"]],
			"display": () => { return (window.innerWidth >= this.mobileBreak) ? "table-cell" : "block" },
			"box-sizing": "border-box",
			"width": () => { return (window.innerWidth >= this.mobileBreak) ? (calc(num,columns,gutter) + gutter).toString() + "%" : "100%" },
			"margin-bottom": (_) => { return (window.innerWidth >= this.mobileBreak) ? 0 : this.fixedGutter }
		}
	}
}