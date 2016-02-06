/*! Descartes v0.0.1-pre | (c) Jon Chan @jonhmchan | descartes.io/license */
class Descartes {
	constructor(tree) {
		this.tree = tree
		this.mappings = {}
		this.mappingsPriority = 0

		this.selector = 'selector'
		this.rule = 'rule'
		this.meta = 'meta'
		this.mixins = '_mixins'
		this.listeners = '_listeners'
		
		this.prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']
		this.properties = ['align-content','align-items','align-self','all','animation','animation-delay','animation-direction','animation-duration','animation-fill-mode','animation-iteration-count','animation-name','animation-play-state','animation-timing-function','backface-visibility','background','background-attachment','background-blend-mode','background-clip','background-color','background-image','background-origin','background-position','background-repeat','background-size','border','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-style','border-bottom-width','border-collapse','border-color','border-image','border-image-outset','border-image-repeat','border-image-slice','border-image-source','border-image-width','border-left','border-left-color','border-left-style','border-left-width','border-radius','border-right','border-right-color','border-right-style','border-right-width','border-spacing','border-style','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-style','border-top-width','border-width','bottom','box-shadow','box-sizing','caption-side','clear','clip','color','column-count','column-fill','column-gap','column-rule','column-rule-color','column-rule-style','column-rule-width','column-span','column-width','columns','content','counter-increment','counter-reset','cursor','direction','display','empty-cells','filter','flex','flex-basis','flex-direction','flex-flow','flex-grow','flex-shrink','flex-wrap','float','font','@font-face','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','hanging-punctuation','height','justify-content','@keyframes','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','@media','min-height','min-width','nav-down','nav-index','nav-left','nav-right','nav-up','opacity','order','outline','outline-color','outline-offset','outline-style','outline-width','overflow','overflow-x','overflow-y','padding','padding-bottom','padding-left','padding-right','padding-top','page-break-after','page-break-before','page-break-inside','perspective','perspective-origin','position','quotes','resize','right','tab-size','table-layout','text-align','text-align-last','text-decoration','text-decoration-color','text-decoration-line','text-decoration-style','text-indent','text-justify','text-overflow','text-shadow','text-transform','top','transform','transform-origin','transform-style','transition','transition-delay','transition-duration','transition-property','transition-timing-function','unicode-bidi','vertical-align','visibility','white-space','width','word-break','word-spacing','word-wrap','z-index']
		this.pseudos = ['::after','::before','::first-letter','::first-line','::selection','::backdrop',':active',':any',':checked',':default',':dir',':disabled',':empty',':enabled',':first',':first-child',':first-of-type',':fullscreen',':focus',':hover',':indeterminate',':in-range',':invalid',':lang',':last-child',':last-of-type',':left',':link',':not',':nth-child',':nth-last-child',':nth-last-of-type',':nth-of-type',':only-child',':only-of-type',':optional',':out-of-range',':read-only',':read-write',':required',':right',':root',':scope',':target',':valid',':visited']


		this.findType = undefined
		this.find = this.findLibrary()
		
		this.render()
	}

	findLibrary() {
		if (typeof $ !== 'undefined') {
			this.findType = 'jquery'
			const finder = (_) => {
				let elems = []
				$(_).each((i, e) => {
					elems.push(e)
				})
				return elems
			}
			return finder
		} else if (typeof Sizzle !== 'undefined') {
			this.findType = 'sizzle'
			return Sizzle
		}
	}

	// Returns the computed rules tree based on original tree
	compute(tree = this.tree) {
		if (typeof tree === 'object') {
			let result = {}
			for (let key in tree) {
				let value = tree[key]
				let keyObject = this.parseKey(key)
				if (keyObject.type === this.selector) {
					result[keyObject.key] = this.compute(value)
				} else if (keyObject.type === this.rule) {
					result[keyObject.key] = value
				} else if (keyObject.type === this.meta) {
					if (keyObject.key === this.mixins) {
						let mixedRules = this.parseMixins(tree, key)
						result = mixedRules
					} else if (keyObject.key === this.listeners) {
						result[keyObject.key] = value
					}
				}
			}
			return result
		}
		return null
	}

	// Expands the computed rules tree into a flat rule mappings object
	flatten(tree = this.compute(tree), parentSelector = "", priority = this.mappingsPriority) {
		for (let selector in tree) {
			let rules = Object.assign({}, tree[selector])
			let _listeners = rules[this.listeners]
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
						this.flatten(subtree, nestedSelector, priority + 1)
					}
				}
			}
			this.mappings[selector] = {
				rules,
				_listeners,
				priority
			}
			if (this.mappingsPriority < priority) this.mappingsPriority = priority
		}
		return this.mappings
	}

	render() {
		this.flatten()
		this.bindListeners()
		this.applyAll()
	}

	bindListeners() {
		for (let selector in this.mappings) {
			let mapping = this.mappings[selector]
			let listeners = mapping[this.listeners]
			if (typeof listeners === 'undefined') continue
			let rules = mapping['rules']
			listeners.map(l => {
				if (typeof l[0] === 'string') {
					if (this.findType == 'jquery') {
						this.find(l[0]).map(x => {
							x.bind(l[1], () => {
								this.cascade(selector, rules)
								this.apply()
							})
						})
					} else if (this.findType === 'sizzle') {
						this.find(l[0]).map(x => {
							x.addEventListener(l[1], () => {
								this.cascade(selector, rules)
								this.apply()
							})
						})
					}
				} else {
					l[0].addEventListener(l[1], () => {
						this.cascade(selector, rules)
						this.apply()
					})
				}
			})
		}
	}

	applyAll() {
		// sort by priority
		let prioritizedList = Array.apply(null, Array(this.mappingsPriority + 1)).map(() => { return [] })
		for (let key in this.mappings) {
			let mapping = this.mappings[key]
			prioritizedList[mapping.priority].push([key, mapping.rules])
		}
		prioritizedList.map(set => {
			set.map(mapping => {
				this.cascade(mapping[0], mapping[1])
			})
		})
		this.apply()
	}

	apply() {
		if (this.findType === 'jquery') {
			let all = this.find("*")
			all.map(x => {
				let style = x.getAttribute('data-descartes')
				if (typeof style === 'undefined') return
				x.setAttribute('style', this.createStyleString(JSON.parse(style), x))
			})
		}
	}

	cascade(selector = null, rules = null) {
		if (selector === null || rules === null) return false
		if (this.isPseudo(selector) && this.applyPsuedo(selector, rules)) return
		let elems = this.find(selector.toString())
		if (elems.length === 0) return false
		elems.map(elem => {
			let style = elem.getAttribute('data-descartes')
			if (typeof style === 'undefined') return
			style = (style === null) ? {} : JSON.parse(style)
			let computed = {}
			for (let key in rules) {
				computed[key] = this.computeRule(rules[key], key, elem)
			}
			style = Object.assign(style, computed)
			elem.setAttribute('data-descartes', JSON.stringify(style))
		})
		return true
	}

	createStyleString(rules, elem) {
		let style = ""
		for (let key in rules) {
			let computedRule = this.computeRule(rules[key], key, elem)
			style += key + ": " + computedRule + "; "
		}
		style = style.slice(0, -1);
		return style
	}

	applyPsuedo(selector, rules) {
		if (this.isPseudo(selector)) {
			if (this.findType === 'jquery') {
				let sheet = '<style type="text/css" class="_after">' + selector + " {" + this.createStyleString(rules) + ' }</style>';
				$(sheet).appendTo("head")
				return
			}
			return true
		}
		return false
	}

	computeRule(rule, key, elem = null) {
		if (typeof rule === 'function' && elem !== null) {
			rule = rule(elem)
		}
		let except = ['font-weight', 'opacity', 'z-index']
		if (Number(rule) === rule && except.indexOf(key) < 0) {
			return rule.toString() + "px"
		}
		if (key === 'content') {
			return "'" + rule.toString() + "'"
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

	// Adds mixins to existing tree
	parseMixins(tree, selector) {
		let mixins = tree[this.mixins]

		if (!Array.isArray(mixins)) {
			mixins = [mixins]
		}

		for (let index in mixins) {
			let mixin = mixins[index]
			if (mixin !== null && typeof mixin === 'object') {
				for (let rule in mixin) {
					if (!tree.hasOwnProperty(rule) || tree[rule] === null) tree[rule] = mixin[rule]
				}
			} else {
				throw("'" + selector + "' tree has an invalid _mixins value. _mixins can only be an object literal or array of object literals.")
			}
		}
		delete tree[this.mixins]
		return tree
	}

	isPseudo(sel) {
		for (let key in this.psuedos) {
			let pattern = this.psuedos[key]
			if sel.match(new RegExp('.+' + pattern) > -1) return true
		}
		return false
	}

	isMeta(key) {
		const metas = [this.mixins, this.listeners]
		return metas.indexOf(key) > -1
	}

	selIsAppending(sel) {
		return sel.substr(0, 1) === '&'
	}

	isRule(key) {
		return this.properties.indexOf(key) > -1
	}
}
document.getElementsByTagName("html")[0].style.display = "none";
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);
docReady(function() {
    // code here
    document.getElementsByTagName("html")[0].style.display = "block";
});