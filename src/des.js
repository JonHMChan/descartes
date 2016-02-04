const Des = {
	scale: (gauge=0, min=0, max=1, out_min=0, out_max=1) => {
		if (gauge <= min) return out_min
		if (gauge >= max) return out_max
		return (out_min + ((out_max-out_min) * ((gauge-min)/(max-min))))
	},
	rgba: (r=0,g=0,b=0,a=0) {
		return "rgba(" + [r,g,b,a].join(",") + ")"
	}
}

class Kant() {
	constructor() {
		this.wrapper = 800
		this.columns = 12
	}

	wrapper() {
		return {
			"max-width": this.wrapper,
			"margin-left": "auto",
			"margin-right": "auto"
		}
	}
}