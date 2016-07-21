/*! Plato v0.0.1 | (c) Jonathan Chan @jonhmchan */
class Plato {
	constructor() {
		this.layout = {
			wrappers: {
				default: 1200,
				mobile: 800
			},
			grid: {
				columns: 12,
				gutter: 1.6,
				fixedGutter: 15
			}
		}

		this.typography = {
			font: {
				base: "Helvetica",
				heading: "Helvetica"
			},
			size: {
				unit: "em",
				base: 1.0,
			},
			lineHeight: {
				base: 1.5,
				heading: 1.2
			}
		}

		this.colors = {
			background: {
				primary: "#fff",
				secondary: "#333"
			}
		}
	}

	base() {
		let tree = {
			"html": {
				"margin": 0,
				"padding": 0,
				"height": "100%",
				"font-family": this.typography.font.base,
				"background": this.colors.background.primary,
				"body": {
					"margin": 0,
					"padding": 0,
					"height": "100%",
					".row": { _mixins: this.row() },
					".col1": { _mixins: this.col(1) },
					".col2": { _mixins: this.col(2) },
					".col3": { _mixins: this.col(3) },
					".col4": { _mixins: this.col(4) },
					".col5": { _mixins: this.col(5) },
					".col6": { _mixins: this.col(6) },
					".col7": { _mixins: this.col(7) },
					".col8": { _mixins: this.col(8) },
					".col9": { _mixins: this.col(9) },
					".col10": { _mixins: this.col(10) },
					".col11": { _mixins: this.col(11) },
					".col12": { _mixins: this.col(12) },
					".table-row": { _mixins: this.tableRow() },
					".table-col1": { _mixins: this.tableCol(1) },
					".table-col2": { _mixins: this.tableCol(2) },
					".table-col3": { _mixins: this.tableCol(3) },
					".table-col4": { _mixins: this.tableCol(4) },
					".table-col5": { _mixins: this.tableCol(5) },
					".table-col6": { _mixins: this.tableCol(6) },
					".table-col7": { _mixins: this.tableCol(7) },
					".table-col8": { _mixins: this.tableCol(8) },
					".table-col9": { _mixins: this.tableCol(9) },
					".table-col10": { _mixins: this.tableCol(10) },
					".table-col11": { _mixins: this.tableCol(11) },
					".table-col12": { _mixins: this.tableCol(12) },
				}
			},
			"*, *::before, *::after": {
				"box-sizing": "border-box"
			}
		}
		return tree
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
	wrapper(width = this.layout.wrappers.default) {
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
			"box-sizing": "border-box",
			"$(window).resize": {
				"margin-left": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "auto" : this.layout.grid.fixedGutter },
				"margin-right": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "auto" : this.layout.grid.fixedGutter },
			}
		})
	}

	tableRow() {
		return Object.assign(this.clearfix(), {
			"box-sizing": "border-box",
			"$(window).resize": {
				"margin-left": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "auto" : this.layout.grid.fixedGutter },
				"margin-right": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "auto" : this.layout.grid.fixedGutter },
				"display": () => {
					return (window.innerWidth >= this.layout.wrappers.mobile) ? "table" : "block"
				}
			}
		})
	}

	// Column
	// ----------
	// Used in combination with `row()` to create a grid
	col(num = 1, offset = 0, columns = this.layout.grid.columns, gutter = this.layout.grid.gutter) {
		const calc = (n, c, g) => { return ((n*((100-((c-1)*g))/c))+((n-1)*g)) }
		return {
			"box-sizing": "border-box",
			"$(window).resize": {
				"width": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? calc(num,columns,gutter).toString() + "%" : "100%" },
				"margin-right": (_) => { return (_.nextElementSibling === null) ? 0 : (gutter.toString() + "%") },
				"margin-bottom": (_) => { return (window.innerWidth >= this.layout.wrappers.mobile) ? 0 : this.layout.grid.fixedGutter },
				"float": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "left" : "none" }
			}
		}
	}

	tableCol(num = 1, offset = 0, columns = this.layout.grid.columns, gutter = this.layout.grid.gutter) {
		const calc = (n, c, g) => { return ((n*((100-((c-1)*g))/c))+((n-1)*g)) }
		return {
			"box-sizing": "border-box",
			"$(window).resize": {
				"display": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? "table-cell" : "block" },
				"width": () => { return (window.innerWidth >= this.layout.wrappers.mobile) ? (calc(num,columns,gutter) + gutter).toString() + "%" : "100%" },
				"margin-bottom": (_) => { return (window.innerWidth >= this.layout.wrappers.mobile) ? 0 : this.layout.grid.fixedGutter }
			}
		}
	}
}