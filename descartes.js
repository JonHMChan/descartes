class Descartes {
	constructor(tree) {
		this.tree = tree
		this.selector = 'selector'
		this.rule = 'rule'
		this.meta = 'meta'
		this.mappings = {}
	}

	// Returns the computed rules tree based on original tree
	compute(tree = this.tree) {
		if (typeof tree === 'object') {
			let result = {}
			for (let key in tree) {
				let val = tree[key]
				let keyObject = this.parseKey(key)
				if (keyObject.type === this.selector) {
					result[keyObject.key] = this.parseMixins(this.compute(val), key)
				} else if (keyObject.type === this.rule) {
					return tree
				}
			}
			return result
		}
		return null
	}

	// Expands the computed rules tree into a flat rule mappings object
	flatten(tree = this.compute(tree), parentSelector = "") {
		for (let selector in tree) {
			let rules = Object.assign({}, tree[selector])


			// Add the rules in here
			for (let rule in rules) {
				if (!this.isRule(rule)) {
					let subtree = null
					if (parentSelector === "") parentSelector = selector
					let nestedSelector = this.nestSelector(rule, parentSelector)
					if (!this.isMeta(rule) && !this.isRule(rule)) {
						subtree = {}
						subtree[nestedSelector] = rules[rule]
					}
					delete rules[rule]
					if (subtree !== null) {
						this.flatten(subtree, nestedSelector)
					}
				}
			}
			this.mappings[selector] = rules
		}
		return this.mappings
	}

	render() {
		this.flatten()
		this.applyAll()
	}

	applyAll() {
		for (let key in this.mappings) {
			this.apply(key, this.mappings[key])
		}
	}

	apply(selector = null, rule = null) {
		if (selector === null || rule === null) return
		let elems = Sizzle(selector)
		let style = ""
		for (let key in rule) {
			let computedRule = this.computeRule(rule[key])
			style += key + ": " + computedRule + "; "
		}
		style = style.slice(0, -1);
		elems.map(elem => {
			elem.setAttribute('style', style)
		})
	}

	computeRule(rule) {
		if (typeof rule === 'function') {
			rule = rule()
		}
		if (Number(rule) === rule && rule % 1 === 0) {
			return rule.toString() + "px"
		}
		return rule.toString()
	}

	nestSelector(current, parent) {
		let separator = " "
		if (this.selIsAppending(current)) {
			separator = ""
			current = current.substring(1)
		}
		return parent + separator + current
	}

	// Runs any checks on the current key to see what type it is
	parseKey(key) {
		let isMeta = this.isMeta(key)
		let isRule = this.isRule(key)
		return {
			key,
			type: isMeta ? this.meta : isRule ? this.rule : this.selector
		}
	}

	// Adds mixins to existing rules
	parseMixins(rules, key) {
		let mixins = rules['_mixins']

		if (!Array.isArray(mixins)) {
			mixins = [mixins]
		}

		for (let index in mixins) {
			let mixin = mixins[index]
			if (mixin !== null && typeof mixin === 'object') {
				for (let rule in mixin) {
					if (!rules.hasOwnProperty(rule) || rules[rule] === null) rules[rule] = mixin[rule]
				}
			} else {
				throw("'" + key + "' has an invalid _mixins value. _mixins can only be an object literal or array of object literals.")
			}
		}
		delete rules['_mixins']
		return rules
	}

	isMeta(key) {
		const metas = ['_mixins']
		return metas.indexOf(key) > -1
	}

	selIsAppending(sel) {
		return sel.substr(0, 1) === '&'
	}

	isRule(key) {
		const rules = ['margin', 'padding', 'background', 'max-width', 'height', 'width'] // todo: find a way to check if this is a rule
		return rules.indexOf(key) > -1
	}
}
