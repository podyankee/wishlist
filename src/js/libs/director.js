//
// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
// Version 1.2.6
//
(function (a) {
	function k(a, b, c, d) {
		var e = 0,
			f = 0,
			g = 0,
			c = (c || '(').toString(),
			d = (d || ')').toString(),
			h;
		for (h = 0; h < a.length; h++) {
			var i = a[h];
			if (
				i.indexOf(c, e) > i.indexOf(d, e) ||
				(~i.indexOf(c, e) && !~i.indexOf(d, e)) ||
				(!~i.indexOf(c, e) && ~i.indexOf(d, e))
			) {
				(f = i.indexOf(c, e)), (g = i.indexOf(d, e));
				if ((~f && !~g) || (!~f && ~g)) {
					var j = a.slice(0, (h || 1) + 1).join(b);
					a = [j].concat(a.slice((h || 1) + 1));
				}
				(e = (g > f ? g : f) + 1), (h = 0);
			} else e = 0;
		}
		return a;
	}
	function j(a, b) {
		var c,
			d = 0,
			e = '';
		while ((c = a.substr(d).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)))
			(d = c.index + c[0].length),
				(c[0] = c[0].replace(/^\*/, '([_.()!\\ %@&a-zA-Z0-9-]+)')),
				(e += a.substr(0, c.index) + c[0]);
		a = e += a.substr(d);
		var f = a.match(/:([^\/]+)/gi),
			g,
			h;
		if (f) {
			h = f.length;
			for (var j = 0; j < h; j++)
				(g = f[j]), g.slice(0, 2) === '::' ? (a = g.slice(1)) : (a = a.replace(g, i(g, b)));
		}
		return a;
	}
	function i(a, b, c) {
		c = a;
		for (var d in b)
			if (b.hasOwnProperty(d)) {
				c = b[d](a);
				if (c !== a) break;
			}
		return c === a ? '([._a-zA-Z0-9-%()]+)' : c;
	}
	function h(a, b, c) {
		if (!a.length) return c();
		var d = 0;
		(function e() {
			b(a[d], function (b) {
				b || b === !1 ? (c(b), (c = function () {})) : ((d += 1), d === a.length ? c() : e());
			});
		})();
	}
	function g(a) {
		var b = [];
		for (var c = 0, d = a.length; c < d; c++) b = b.concat(a[c]);
		return b;
	}
	function f(a, b) {
		for (var c = 0; c < a.length; c += 1) if (b(a[c], c, a) === !1) return;
	}
	function c() {
		return b.hash === '' || b.hash === '#';
	}
	var b = document.location,
		d = {
			mode: 'modern',
			hash: b.hash,
			history: !1,
			check: function () {
				var a = b.hash;
				a != this.hash && ((this.hash = a), this.onHashChanged());
			},
			fire: function () {
				this.mode === 'modern'
					? this.history === !0
						? window.onpopstate()
						: window.onhashchange()
					: this.onHashChanged();
			},
			init: function (a, b) {
				function d(a) {
					for (var b = 0, c = e.listeners.length; b < c; b++) e.listeners[b](a);
				}
				var c = this;
				(this.history = b), e.listeners || (e.listeners = []);
				if (
					'onhashchange' in window &&
					(document.documentMode === undefined || document.documentMode > 7)
				)
					this.history === !0
						? setTimeout(function () {
								window.onpopstate = d;
						  }, 500)
						: (window.onhashchange = d),
						(this.mode = 'modern');
				else {
					var f = document.createElement('iframe');
					(f.id = 'state-frame'),
						(f.style.display = 'none'),
						document.body.appendChild(f),
						this.writeFrame(''),
						'onpropertychange' in document &&
							'attachEvent' in document &&
							document.attachEvent('onpropertychange', function () {
								event.propertyName === 'location' && c.check();
							}),
						window.setInterval(function () {
							c.check();
						}, 50),
						(this.onHashChanged = d),
						(this.mode = 'legacy');
				}
				e.listeners.push(a);
				return this.mode;
			},
			destroy: function (a) {
				if (!!e && !!e.listeners) {
					var b = e.listeners;
					for (var c = b.length - 1; c >= 0; c--) b[c] === a && b.splice(c, 1);
				}
			},
			setHash: function (a) {
				this.mode === 'legacy' && this.writeFrame(a),
					this.history === !0
						? (window.history.pushState({}, document.title, a), this.fire())
						: (b.hash = a[0] === '/' ? a : '/' + a);
				return this;
			},
			writeFrame: function (a) {
				var b = document.getElementById('state-frame'),
					c = b.contentDocument || b.contentWindow.document;
				c.open(),
					c.write("<script>_hash = '" + a + "'; onload = parent.listener.syncHash;<script>"),
					c.close();
			},
			syncHash: function () {
				var a = this._hash;
				a != b.hash && (b.hash = a);
				return this;
			},
			onHashChanged: function () {},
		},
		e = (a.Router = function (a) {
			if (this instanceof e)
				(this.params = {}),
					(this.routes = {}),
					(this.methods = ['on', 'once', 'after', 'before']),
					(this.scope = []),
					(this._methods = {}),
					(this._insert = this.insert),
					(this.insert = this.insertEx),
					(this.historySupport =
						(window.history != null ? window.history.pushState : null) != null),
					this.configure(),
					this.mount(a || {});
			else return new e(a);
		});
	(e.prototype.init = function (a) {
		var e = this,
			f;
		(this.handler = function (a) {
			var b = (a && a.newURL) || window.location.hash,
				c = e.history === !0 ? e.getPath() : b.replace(/.*#/, '');
			e.dispatch('on', c.charAt(0) === '/' ? c : '/' + c);
		}),
			d.init(this.handler, this.history),
			this.history === !1
				? c() && a
					? (b.hash = a)
					: c() || e.dispatch('on', '/' + b.hash.replace(/^(#\/|#|\/)/, ''))
				: (this.convert_hash_in_init
						? ((f = c() && a ? a : c() ? null : b.hash.replace(/^#/, '')),
						  f && window.history.replaceState({}, document.title, f))
						: (f = this.getPath()),
				  (f || this.run_in_init === !0) && this.handler());
		return this;
	}),
		(e.prototype.explode = function () {
			var a = this.history === !0 ? this.getPath() : b.hash;
			a.charAt(1) === '/' && (a = a.slice(1));
			return a.slice(1, a.length).split('/');
		}),
		(e.prototype.setRoute = function (a, b, c) {
			var e = this.explode();
			typeof a == 'number' && typeof b == 'string'
				? (e[a] = b)
				: typeof c == 'string'
				? e.splice(a, b, s)
				: (e = [a]),
				d.setHash(e.join('/'));
			return e;
		}),
		(e.prototype.insertEx = function (a, b, c, d) {
			a === 'once' &&
				((a = 'on'),
				(c = (function (a) {
					var b = !1;
					return function () {
						if (!b) {
							b = !0;
							return a.apply(this, arguments);
						}
					};
				})(c)));
			return this._insert(a, b, c, d);
		}),
		(e.prototype.getRoute = function (a) {
			var b = a;
			if (typeof a == 'number') b = this.explode()[a];
			else if (typeof a == 'string') {
				var c = this.explode();
				b = c.indexOf(a);
			} else b = this.explode();
			return b;
		}),
		(e.prototype.destroy = function () {
			d.destroy(this.handler);
			return this;
		}),
		(e.prototype.getPath = function () {
			var a = window.location.pathname;
			a.substr(0, 1) !== '/' && (a = '/' + a);
			return a;
		});
	var l = /\?.*/;
	(e.prototype.configure = function (a) {
		a = a || {};
		for (var b = 0; b < this.methods.length; b++) this._methods[this.methods[b]] = !0;
		(this.recurse = a.recurse || this.recurse || !1),
			(this.async = a.async || !1),
			(this.delimiter = a.delimiter || '/'),
			(this.strict = typeof a.strict == 'undefined' ? !0 : a.strict),
			(this.notfound = a.notfound),
			(this.resource = a.resource),
			(this.history = (a.html5history && this.historySupport) || !1),
			(this.run_in_init = this.history === !0 && a.run_handler_in_init !== !1),
			(this.convert_hash_in_init = this.history === !0 && a.convert_hash_in_init !== !1),
			(this.every = { after: a.after || null, before: a.before || null, on: a.on || null });
		return this;
	}),
		(e.prototype.param = function (a, b) {
			a[0] !== ':' && (a = ':' + a);
			var c = new RegExp(a, 'g');
			this.params[a] = function (a) {
				return a.replace(c, b.source || b);
			};
			return this;
		}),
		(e.prototype.on = e.prototype.route =
			function (a, b, c) {
				var d = this;
				!c && typeof b == 'function' && ((c = b), (b = a), (a = 'on'));
				if (Array.isArray(b))
					return b.forEach(function (b) {
						d.on(a, b, c);
					});
				b.source && (b = b.source.replace(/\\\//gi, '/'));
				if (Array.isArray(a))
					return a.forEach(function (a) {
						d.on(a.toLowerCase(), b, c);
					});
				(b = b.split(new RegExp(this.delimiter))),
					(b = k(b, this.delimiter)),
					this.insert(a, this.scope.concat(b), c);
			}),
		(e.prototype.path = function (a, b) {
			var c = this,
				d = this.scope.length;
			a.source && (a = a.source.replace(/\\\//gi, '/')),
				(a = a.split(new RegExp(this.delimiter))),
				(a = k(a, this.delimiter)),
				(this.scope = this.scope.concat(a)),
				b.call(this, this),
				this.scope.splice(d, a.length);
		}),
		(e.prototype.dispatch = function (a, b, c) {
			function h() {
				(d.last = e.after), d.invoke(d.runlist(e), d, c);
			}
			var d = this,
				e = this.traverse(a, b.replace(l, ''), this.routes, ''),
				f = this._invoked,
				g;
			this._invoked = !0;
			if (!e || e.length === 0) {
				(this.last = []),
					typeof this.notfound == 'function' &&
						this.invoke([this.notfound], { method: a, path: b }, c);
				return !1;
			}
			this.recurse === 'forward' && (e = e.reverse()),
				(g = this.every && this.every.after ? [this.every.after].concat(this.last) : [this.last]);
			if (g && g.length > 0 && f) {
				this.async ? this.invoke(g, this, h) : (this.invoke(g, this), h());
				return !0;
			}
			h();
			return !0;
		}),
		(e.prototype.invoke = function (a, b, c) {
			var d = this,
				e;
			this.async
				? ((e = function (c, d) {
						if (Array.isArray(c)) return h(c, e, d);
						typeof c == 'function' && c.apply(b, (a.captures || []).concat(d));
				  }),
				  h(a, e, function () {
						c && c.apply(b, arguments);
				  }))
				: ((e = function (c) {
						if (Array.isArray(c)) return f(c, e);
						if (typeof c == 'function') return c.apply(b, a.captures || []);
						typeof c == 'string' && d.resource && d.resource[c].apply(b, a.captures || []);
				  }),
				  f(a, e));
		}),
		(e.prototype.traverse = function (a, b, c, d, e) {
			function l(a) {
				function c(a) {
					for (var b = a.length - 1; b >= 0; b--)
						Array.isArray(a[b])
							? (c(a[b]), a[b].length === 0 && a.splice(b, 1))
							: e(a[b]) || a.splice(b, 1);
				}
				function b(a) {
					var c = [];
					for (var d = 0; d < a.length; d++) c[d] = Array.isArray(a[d]) ? b(a[d]) : a[d];
					return c;
				}
				if (!e) return a;
				var d = b(a);
				(d.matched = a.matched), (d.captures = a.captures), (d.after = a.after.filter(e)), c(d);
				return d;
			}
			var f = [],
				g,
				h,
				i,
				j,
				k;
			if (b === this.delimiter && c[a]) {
				(j = [[c.before, c[a]].filter(Boolean)]),
					(j.after = [c.after].filter(Boolean)),
					(j.matched = !0),
					(j.captures = []);
				return l(j);
			}
			for (var m in c)
				if (
					c.hasOwnProperty(m) &&
					(!this._methods[m] ||
						(this._methods[m] && typeof c[m] == 'object' && !Array.isArray(c[m])))
				) {
					(g = h = d + this.delimiter + m),
						this.strict || (h += '[' + this.delimiter + ']?'),
						(i = b.match(new RegExp('^' + h)));
					if (!i) continue;
					if (i[0] && i[0] == b && c[m][a]) {
						(j = [[c[m].before, c[m][a]].filter(Boolean)]),
							(j.after = [c[m].after].filter(Boolean)),
							(j.matched = !0),
							(j.captures = i.slice(1)),
							this.recurse &&
								c === this.routes &&
								(j.push([c.before, c.on].filter(Boolean)),
								(j.after = j.after.concat([c.after].filter(Boolean))));
						return l(j);
					}
					j = this.traverse(a, b, c[m], g);
					if (j.matched) {
						j.length > 0 && (f = f.concat(j)),
							this.recurse &&
								(f.push([c[m].before, c[m].on].filter(Boolean)),
								(j.after = j.after.concat([c[m].after].filter(Boolean))),
								c === this.routes &&
									(f.push([c.before, c.on].filter(Boolean)),
									(j.after = j.after.concat([c.after].filter(Boolean))))),
							(f.matched = !0),
							(f.captures = j.captures),
							(f.after = j.after);
						return l(f);
					}
				}
			return !1;
		}),
		(e.prototype.insert = function (a, b, c, d) {
			var e, f, g, h, i;
			(b = b.filter(function (a) {
				return a && a.length > 0;
			})),
				(d = d || this.routes),
				(i = b.shift()),
				/\:|\*/.test(i) && !/\\d|\\w/.test(i) && (i = j(i, this.params));
			if (b.length > 0) {
				d[i] = d[i] || {};
				return this.insert(a, b, c, d[i]);
			}
			{
				if (!!i || !!b.length || d !== this.routes) {
					(f = typeof d[i]), (g = Array.isArray(d[i]));
					if (d[i] && !g && f == 'object') {
						e = typeof d[i][a];
						switch (e) {
							case 'function':
								d[i][a] = [d[i][a], c];
								return;
							case 'object':
								d[i][a].push(c);
								return;
							case 'undefined':
								d[i][a] = c;
								return;
						}
					} else if (f == 'undefined') {
						(h = {}), (h[a] = c), (d[i] = h);
						return;
					}
					throw new Error('Invalid route context: ' + f);
				}
				e = typeof d[a];
				switch (e) {
					case 'function':
						d[a] = [d[a], c];
						return;
					case 'object':
						d[a].push(c);
						return;
					case 'undefined':
						d[a] = c;
						return;
				}
			}
		}),
		(e.prototype.extend = function (a) {
			function e(a) {
				(b._methods[a] = !0),
					(b[a] = function () {
						var c = arguments.length === 1 ? [a, ''] : [a];
						b.on.apply(b, c.concat(Array.prototype.slice.call(arguments)));
					});
			}
			var b = this,
				c = a.length,
				d;
			for (d = 0; d < c; d++) e(a[d]);
		}),
		(e.prototype.runlist = function (a) {
			var b = this.every && this.every.before ? [this.every.before].concat(g(a)) : g(a);
			this.every && this.every.on && b.push(this.every.on),
				(b.captures = a.captures),
				(b.source = a.source);
			return b;
		}),
		(e.prototype.mount = function (a, b) {
			function d(b, d) {
				var e = b,
					f = b.split(c.delimiter),
					g = typeof a[b],
					h = f[0] === '' || !c._methods[f[0]],
					i = h ? 'on' : e;
				h && ((e = e.slice((e.match(new RegExp('^' + c.delimiter)) || [''])[0].length)), f.shift());
				h && g === 'object' && !Array.isArray(a[b])
					? ((d = d.concat(f)), c.mount(a[b], d))
					: (h && ((d = d.concat(e.split(c.delimiter))), (d = k(d, c.delimiter))),
					  c.insert(i, d, a[b]));
			}
			if (!!a && typeof a == 'object' && !Array.isArray(a)) {
				var c = this;
				(b = b || []), Array.isArray(b) || (b = b.split(c.delimiter));
				for (var e in a) a.hasOwnProperty(e) && d(e, b.slice(0));
			}
		});
})(typeof exports == 'object' ? exports : window);
