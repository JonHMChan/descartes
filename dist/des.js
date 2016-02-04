"use strict";

var Des = {
	scale: function scale(gauge, min, max, out_min, out_max) {
		if (gauge <= min) return out_min;
		if (gauge >= max) return out_max;
		return out_min + (out_max - out_min) * ((gauge - min) / (max - min));
	}
};