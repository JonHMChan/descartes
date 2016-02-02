class Descartes {
	constructor(tree) {
		this.tree = tree
		this.selector = 'selector'
		this.rule = 'rule'
		this.meta = 'meta'
		this.mixins = '_mixins'
		this.mappings = {}
		this.rules = ['align-content','align-items','align-self','all','animation','animation-delay','animation-direction','animation-duration','animation-fill-mode','animation-iteration-count','animation-name','animation-play-state','animation-timing-function','backface-visibility','background','background-attachment','background-blend-mode','background-clip','background-color','background-image','background-origin','background-position','background-repeat','background-size','border','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-style','border-bottom-width','border-collapse','border-color','border-image','border-image-outset','border-image-repeat','border-image-slice','border-image-source','border-image-width','border-left','border-left-color','border-left-style','border-left-width','border-radius','border-right','border-right-color','border-right-style','border-right-width','border-spacing','border-style','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-style','border-top-width','border-width','bottom','box-shadow','box-sizing','caption-side','clear','clip','color','column-count','column-fill','column-gap','column-rule','column-rule-color','column-rule-style','column-rule-width','column-span','column-width','columns','content','counter-increment','counter-reset','cursor','direction','display','empty-cells','filter','flex','flex-basis','flex-direction','flex-flow','flex-grow','flex-shrink','flex-wrap','float','font','@font-face','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','hanging-punctuation','height','justify-content','@keyframes','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','@media','min-height','min-width','nav-down','nav-index','nav-left','nav-right','nav-up','opacity','order','outline','outline-color','outline-offset','outline-style','outline-width','overflow','overflow-x','overflow-y','padding','padding-bottom','padding-left','padding-right','padding-top','page-break-after','page-break-before','page-break-inside','perspective','perspective-origin','position','quotes','resize','right','tab-size','table-layout','text-align','text-align-last','text-decoration','text-decoration-color','text-decoration-line','text-decoration-style','text-indent','text-justify','text-overflow','text-shadow','text-transform','top','transform','transform-origin','transform-style','transition','transition-delay','transition-duration','transition-property','transition-timing-function','unicode-bidi','vertical-align','visibility','white-space','width','word-break','word-spacing','word-wrap','z-index']
		
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
		console.log(this.mappings)
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
		let mixins = rules[this.mixins]

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
				console.log(mixin)
				throw("'" + key + "' has an invalid _mixins value. _mixins can only be an object literal or array of object literals.")
			}
		}
		delete rules[this.mixins]
		return rules
	}

	isMeta(key) {
		const metas = [this.mixins]
		return metas.indexOf(key) > -1
	}

	selIsAppending(sel) {
		return sel.substr(0, 1) === '&'
	}

	isRule(key) {
		return this.rules.indexOf(key) > -1
	}
}
