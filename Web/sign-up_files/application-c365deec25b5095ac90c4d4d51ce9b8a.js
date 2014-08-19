(function() {
window.Bobcat = window.$B = window.Bobcat || {}, "function" == typeof $B.timerCheck && $B.timerCheck("application or application-editor.js run"), 
window.console || (window.console = {
log:function() {},
error:function() {},
warn:function() {}
});
}).call(this), function(e, t) {
e.rails !== t && e.error("jquery-ujs has already been loaded!");
var n;
e.rails = n = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(t) {
var n = e('meta[name="csrf-token"]').attr("content");
n && t.setRequestHeader("X-CSRF-Token", n);
},
fire:function(t, n, i) {
var r = e.Event(n);
return t.trigger(r, i), r.result !== !1;
},
confirm:function(e) {
return confirm(e);
},
ajax:function(t) {
return e.ajax(t);
},
href:function(e) {
return e.attr("href");
},
handleRemote:function(i) {
var r, o, a, s, l, u, d, c;
if (n.fire(i, "ajax:before")) {
if (s = i.data("cross-domain"), l = s === t ? null :s, u = i.data("with-credentials") || null, 
d = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
r = i.attr("method"), o = i.attr("action"), a = i.serializeArray();
var p = i.data("ujs:submit-button");
p && (a.push(p), i.data("ujs:submit-button", null));
} else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(), 
i.data("params") && (a = a + "&" + i.data("params"))) :i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", 
o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) :(r = i.data("method"), 
o = n.href(i), a = i.data("params") || null);
c = {
type:r || "GET",
data:a,
dataType:d,
beforeSend:function(e, r) {
return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), 
n.fire(i, "ajax:beforeSend", [ e, r ]);
},
success:function(e, t, n) {
i.trigger("ajax:success", [ e, t, n ]);
},
complete:function(e, t) {
i.trigger("ajax:complete", [ e, t ]);
},
error:function(e, t, n) {
i.trigger("ajax:error", [ e, t, n ]);
},
crossDomain:l
}, u && (c.xhrFields = {
withCredentials:u
}), o && (c.url = o);
var h = n.ajax(c);
return i.trigger("ajax:send", h), h;
}
return !1;
},
handleMethod:function(i) {
var r = n.href(i), o = i.data("method"), a = i.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + r + '"></form>'), d = '<input name="_method" value="' + o + '" type="hidden" />';
l !== t && s !== t && (d += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && u.attr("target", a), u.hide().append(d).appendTo("body"), u.submit();
},
disableFormElements:function(t) {
t.find(n.disableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0);
});
},
enableFormElements:function(t) {
t.find(n.enableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1);
});
},
allowAction:function(e) {
var t, i = e.data("confirm"), r = !1;
return i ? (n.fire(e, "confirm") && (r = n.confirm(i), t = n.fire(e, "confirm:complete", [ r ])), 
r && t) :!0;
},
blankInputs:function(t, n, i) {
var r, o, a = e(), s = n || "input,textarea", l = t.find(s);
return l.each(function() {
if (r = e(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") :r.val(), 
!o == !i) {
if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
a = a.add(r);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(e, t) {
return n.blankInputs(e, t, !0);
},
stopEverything:function(t) {
return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), 
!1;
},
disableElement:function(e) {
e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
return n.stopEverything(e);
});
},
enableElement:function(e) {
e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), 
e.unbind("click.railsDisable");
}
}, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
e.crossDomain || n.CSRFProtection(i);
}), e(document).delegate(n.linkDisableSelector, "ajax:complete", function() {
n.enableElement(e(this));
}), e(document).delegate(n.linkClickSelector, "click.rails", function(i) {
var r = e(this), o = r.data("method"), a = r.data("params");
if (!n.allowAction(r)) return n.stopEverything(i);
if (r.is(n.linkDisableSelector) && n.disableElement(r), r.data("remote") !== t) {
if (!(!i.metaKey && !i.ctrlKey || o && "GET" !== o || a)) return !0;
var s = n.handleRemote(r);
return s === !1 ? n.enableElement(r) :s.error(function() {
n.enableElement(r);
}), !1;
}
return r.data("method") ? (n.handleMethod(r), !1) :void 0;
}), e(document).delegate(n.buttonClickSelector, "click.rails", function(t) {
var i = e(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(t);
}), e(document).delegate(n.inputChangeSelector, "change.rails", function(t) {
var i = e(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(t);
}), e(document).delegate(n.formSubmitSelector, "submit.rails", function(i) {
var r = e(this), o = r.data("remote") !== t, a = n.blankInputs(r, n.requiredInputSelector), s = n.nonBlankInputs(r, n.fileInputSelector);
if (!n.allowAction(r)) return n.stopEverything(i);
if (a && r.attr("novalidate") == t && n.fire(r, "ajax:aborted:required", [ a ])) return n.stopEverything(i);
if (o) {
if (s) {
setTimeout(function() {
n.disableFormElements(r);
}, 13);
var l = n.fire(r, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
n.enableFormElements(r);
}, 13), l;
}
return n.handleRemote(r), !1;
}
setTimeout(function() {
n.disableFormElements(r);
}, 13);
}), e(document).delegate(n.formInputClickSelector, "click.rails", function(t) {
var i = e(this);
if (!n.allowAction(i)) return n.stopEverything(t);
var r = i.attr("name"), o = r ? {
name:r,
value:i.val()
} :null;
i.closest("form").data("ujs:submit-button", o);
}), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
this == t.target && n.disableFormElements(e(this));
}), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(t) {
this == t.target && n.enableFormElements(e(this));
}), e(function() {
var t = e("meta[name=csrf-token]").attr("content"), n = e("meta[name=csrf-param]").attr("content");
e('form input[name="' + n + '"]').val(t);
}));
}(jQuery), /*!
 * jQuery UI Effects 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
function(e, t) {
var n = "ui-effects-";
e.effects = {
effect:{}
}, /*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
function(e, t) {
function n(e, t, n) {
var i = c[t.type] || {};
return null == e ? n || !t.def ? null :t.def :(e = i.floor ? ~~e :parseFloat(e), 
isNaN(e) ? t.def :i.mod ? (e + i.mod) % i.mod :0 > e ? 0 :i.max < e ? i.max :e);
}
function i(t) {
var n = u(), i = n._rgba = [];
return t = t.toLowerCase(), f(l, function(e, r) {
var o, a = r.re.exec(t), s = a && r.parse(a), l = r.space || "rgba";
return s ? (o = n[l](s), n[d[l].cache] = o[d[l].cache], i = n._rgba = o._rgba, !1) :void 0;
}), i.length ? ("0,0,0,0" === i.join() && e.extend(i, o.transparent), n) :o[t];
}
function r(e, t, n) {
return n = (n + 1) % 1, 1 > 6 * n ? e + (t - e) * n * 6 :1 > 2 * n ? t :2 > 3 * n ? e + (t - e) * (2 / 3 - n) * 6 :e;
}
var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", s = /^([\-+])=\s*(\d+\.?\d*)/, l = [ {
re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
parse:function(e) {
return [ e[1], e[2], e[3], e[4] ];
}
}, {
re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
parse:function(e) {
return [ 2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4] ];
}
}, {
re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
parse:function(e) {
return [ parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16) ];
}
}, {
re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,
parse:function(e) {
return [ parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16) ];
}
}, {
re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
space:"hsla",
parse:function(e) {
return [ e[1], e[2] / 100, e[3] / 100, e[4] ];
}
} ], u = e.Color = function(t, n, i, r) {
return new e.Color.fn.parse(t, n, i, r);
}, d = {
rgba:{
props:{
red:{
idx:0,
type:"byte"
},
green:{
idx:1,
type:"byte"
},
blue:{
idx:2,
type:"byte"
}
}
},
hsla:{
props:{
hue:{
idx:0,
type:"degrees"
},
saturation:{
idx:1,
type:"percent"
},
lightness:{
idx:2,
type:"percent"
}
}
}
}, c = {
"byte":{
floor:!0,
max:255
},
percent:{
max:1
},
degrees:{
mod:360,
floor:!0
}
}, p = u.support = {}, h = e("<p>")[0], f = e.each;
h.style.cssText = "background-color:rgba(1,1,1,.5)", p.rgba = h.style.backgroundColor.indexOf("rgba") > -1, 
f(d, function(e, t) {
t.cache = "_" + e, t.props.alpha = {
idx:3,
type:"percent",
def:1
};
}), u.fn = e.extend(u.prototype, {
parse:function(r, a, s, l) {
if (r === t) return this._rgba = [ null, null, null, null ], this;
(r.jquery || r.nodeType) && (r = e(r).css(a), a = t);
var c = this, p = e.type(r), h = this._rgba = [];
return a !== t && (r = [ r, a, s, l ], p = "array"), "string" === p ? this.parse(i(r) || o._default) :"array" === p ? (f(d.rgba.props, function(e, t) {
h[t.idx] = n(r[t.idx], t);
}), this) :"object" === p ? (r instanceof u ? f(d, function(e, t) {
r[t.cache] && (c[t.cache] = r[t.cache].slice());
}) :f(d, function(t, i) {
var o = i.cache;
f(i.props, function(e, t) {
if (!c[o] && i.to) {
if ("alpha" === e || null == r[e]) return;
c[o] = i.to(c._rgba);
}
c[o][t.idx] = n(r[e], t, !0);
}), c[o] && e.inArray(null, c[o].slice(0, 3)) < 0 && (c[o][3] = 1, i.from && (c._rgba = i.from(c[o])));
}), this) :void 0;
},
is:function(e) {
var t = u(e), n = !0, i = this;
return f(d, function(e, r) {
var o, a = t[r.cache];
return a && (o = i[r.cache] || r.to && r.to(i._rgba) || [], f(r.props, function(e, t) {
return null != a[t.idx] ? n = a[t.idx] === o[t.idx] :void 0;
})), n;
}), n;
},
_space:function() {
var e = [], t = this;
return f(d, function(n, i) {
t[i.cache] && e.push(n);
}), e.pop();
},
transition:function(e, t) {
var i = u(e), r = i._space(), o = d[r], a = 0 === this.alpha() ? u("transparent") :this, s = a[o.cache] || o.to(a._rgba), l = s.slice();
return i = i[o.cache], f(o.props, function(e, r) {
var o = r.idx, a = s[o], u = i[o], d = c[r.type] || {};
null !== u && (null === a ? l[o] = u :(d.mod && (u - a > d.mod / 2 ? a += d.mod :a - u > d.mod / 2 && (a -= d.mod)), 
l[o] = n((u - a) * t + a, r)));
}), this[r](l);
},
blend:function(t) {
if (1 === this._rgba[3]) return this;
var n = this._rgba.slice(), i = n.pop(), r = u(t)._rgba;
return u(e.map(n, function(e, t) {
return (1 - i) * r[t] + i * e;
}));
},
toRgbaString:function() {
var t = "rgba(", n = e.map(this._rgba, function(e, t) {
return null == e ? t > 2 ? 1 :0 :e;
});
return 1 === n[3] && (n.pop(), t = "rgb("), t + n.join() + ")";
},
toHslaString:function() {
var t = "hsla(", n = e.map(this.hsla(), function(e, t) {
return null == e && (e = t > 2 ? 1 :0), t && 3 > t && (e = Math.round(100 * e) + "%"), 
e;
});
return 1 === n[3] && (n.pop(), t = "hsl("), t + n.join() + ")";
},
toHexString:function(t) {
var n = this._rgba.slice(), i = n.pop();
return t && n.push(~~(255 * i)), "#" + e.map(n, function(e) {
return e = (e || 0).toString(16), 1 === e.length ? "0" + e :e;
}).join("");
},
toString:function() {
return 0 === this._rgba[3] ? "transparent" :this.toRgbaString();
}
}), u.fn.parse.prototype = u.fn, d.hsla.to = function(e) {
if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
var t, n, i = e[0] / 255, r = e[1] / 255, o = e[2] / 255, a = e[3], s = Math.max(i, r, o), l = Math.min(i, r, o), u = s - l, d = s + l, c = .5 * d;
return t = l === s ? 0 :i === s ? 60 * (r - o) / u + 360 :r === s ? 60 * (o - i) / u + 120 :60 * (i - r) / u + 240, 
n = 0 === u ? 0 :.5 >= c ? u / d :u / (2 - d), [ Math.round(t) % 360, n, c, null == a ? 1 :a ];
}, d.hsla.from = function(e) {
if (null == e[0] || null == e[1] || null == e[2]) return [ null, null, null, e[3] ];
var t = e[0] / 360, n = e[1], i = e[2], o = e[3], a = .5 >= i ? i * (1 + n) :i + n - i * n, s = 2 * i - a;
return [ Math.round(255 * r(s, a, t + 1 / 3)), Math.round(255 * r(s, a, t)), Math.round(255 * r(s, a, t - 1 / 3)), o ];
}, f(d, function(i, r) {
var o = r.props, a = r.cache, l = r.to, d = r.from;
u.fn[i] = function(i) {
if (l && !this[a] && (this[a] = l(this._rgba)), i === t) return this[a].slice();
var r, s = e.type(i), c = "array" === s || "object" === s ? i :arguments, p = this[a].slice();
return f(o, function(e, t) {
var i = c["object" === s ? e :t.idx];
null == i && (i = p[t.idx]), p[t.idx] = n(i, t);
}), d ? (r = u(d(p)), r[a] = p, r) :u(p);
}, f(o, function(t, n) {
u.fn[t] || (u.fn[t] = function(r) {
var o, a = e.type(r), l = "alpha" === t ? this._hsla ? "hsla" :"rgba" :i, u = this[l](), d = u[n.idx];
return "undefined" === a ? d :("function" === a && (r = r.call(this, d), a = e.type(r)), 
null == r && n.empty ? this :("string" === a && (o = s.exec(r), o && (r = d + parseFloat(o[2]) * ("+" === o[1] ? 1 :-1))), 
u[n.idx] = r, this[l](u)));
});
});
}), u.hook = function(t) {
var n = t.split(" ");
f(n, function(t, n) {
e.cssHooks[n] = {
set:function(t, r) {
var o, a, s = "";
if ("transparent" !== r && ("string" !== e.type(r) || (o = i(r)))) {
if (r = u(o || r), !p.rgba && 1 !== r._rgba[3]) {
for (a = "backgroundColor" === n ? t.parentNode :t; ("" === s || "transparent" === s) && a && a.style; ) try {
s = e.css(a, "backgroundColor"), a = a.parentNode;
} catch (l) {}
r = r.blend(s && "transparent" !== s ? s :"_default");
}
r = r.toRgbaString();
}
try {
t.style[n] = r;
} catch (l) {}
}
}, e.fx.step[n] = function(t) {
t.colorInit || (t.start = u(t.elem, n), t.end = u(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos));
};
});
}, u.hook(a), e.cssHooks.borderColor = {
expand:function(e) {
var t = {};
return f([ "Top", "Right", "Bottom", "Left" ], function(n, i) {
t["border" + i + "Color"] = e;
}), t;
}
}, o = e.Color.names = {
aqua:"#00ffff",
black:"#000000",
blue:"#0000ff",
fuchsia:"#ff00ff",
gray:"#808080",
green:"#008000",
lime:"#00ff00",
maroon:"#800000",
navy:"#000080",
olive:"#808000",
purple:"#800080",
red:"#ff0000",
silver:"#c0c0c0",
teal:"#008080",
white:"#ffffff",
yellow:"#ffff00",
transparent:[ null, null, null, 0 ],
_default:"#ffffff"
};
}(jQuery), function() {
function n(t) {
var n, i, r = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) :t.currentStyle, o = {};
if (r && r.length && r[0] && r[r[0]]) for (i = r.length; i--; ) n = r[i], "string" == typeof r[n] && (o[e.camelCase(n)] = r[n]); else for (n in r) "string" == typeof r[n] && (o[n] = r[n]);
return o;
}
function i(t, n) {
var i, r, a = {};
for (i in n) r = n[i], t[i] !== r && (o[i] || (e.fx.step[i] || !isNaN(parseFloat(r))) && (a[i] = r));
return a;
}
var r = [ "add", "remove", "toggle" ], o = {
border:1,
borderBottom:1,
borderColor:1,
borderLeft:1,
borderRight:1,
borderTop:1,
borderWidth:1,
margin:1,
padding:1
};
e.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function(t, n) {
e.fx.step[n] = function(e) {
("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, n, e.end), 
e.setAttr = !0);
};
}), e.fn.addBack || (e.fn.addBack = function(e) {
return this.add(null == e ? this.prevObject :this.prevObject.filter(e));
}), e.effects.animateClass = function(t, o, a, s) {
var l = e.speed(o, a, s);
return this.queue(function() {
var o, a = e(this), s = a.attr("class") || "", u = l.children ? a.find("*").addBack() :a;
u = u.map(function() {
var t = e(this);
return {
el:t,
start:n(this)
};
}), o = function() {
e.each(r, function(e, n) {
t[n] && a[n + "Class"](t[n]);
});
}, o(), u = u.map(function() {
return this.end = n(this.el[0]), this.diff = i(this.start, this.end), this;
}), a.attr("class", s), u = u.map(function() {
var t = this, n = e.Deferred(), i = e.extend({}, l, {
queue:!1,
complete:function() {
n.resolve(t);
}
});
return this.el.animate(this.diff, i), n.promise();
}), e.when.apply(e, u.get()).done(function() {
o(), e.each(arguments, function() {
var t = this.el;
e.each(this.diff, function(e) {
t.css(e, "");
});
}), l.complete.call(a[0]);
});
});
}, e.fn.extend({
addClass:function(t) {
return function(n, i, r, o) {
return i ? e.effects.animateClass.call(this, {
add:n
}, i, r, o) :t.apply(this, arguments);
};
}(e.fn.addClass),
removeClass:function(t) {
return function(n, i, r, o) {
return arguments.length > 1 ? e.effects.animateClass.call(this, {
remove:n
}, i, r, o) :t.apply(this, arguments);
};
}(e.fn.removeClass),
toggleClass:function(n) {
return function(i, r, o, a, s) {
return "boolean" == typeof r || r === t ? o ? e.effects.animateClass.call(this, r ? {
add:i
} :{
remove:i
}, o, a, s) :n.apply(this, arguments) :e.effects.animateClass.call(this, {
toggle:i
}, r, o, a);
};
}(e.fn.toggleClass),
switchClass:function(t, n, i, r, o) {
return e.effects.animateClass.call(this, {
add:n,
remove:t
}, i, r, o);
}
});
}(), function() {
function i(t, n, i, r) {
return e.isPlainObject(t) && (n = t, t = t.effect), t = {
effect:t
}, null == n && (n = {}), e.isFunction(n) && (r = n, i = null, n = {}), ("number" == typeof n || e.fx.speeds[n]) && (r = i, 
i = n, n = {}), e.isFunction(i) && (r = i, i = null), n && e.extend(t, n), i = i || n.duration, 
t.duration = e.fx.off ? 0 :"number" == typeof i ? i :i in e.fx.speeds ? e.fx.speeds[i] :e.fx.speeds._default, 
t.complete = r || n.complete, t;
}
function r(t) {
return !t || "number" == typeof t || e.fx.speeds[t] ? !0 :"string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 :"object" != typeof t || t.effect ? !1 :!0 :!0;
}
e.extend(e.effects, {
version:"1.10.3",
save:function(e, t) {
for (var i = 0; i < t.length; i++) null !== t[i] && e.data(n + t[i], e[0].style[t[i]]);
},
restore:function(e, i) {
var r, o;
for (o = 0; o < i.length; o++) null !== i[o] && (r = e.data(n + i[o]), r === t && (r = ""), 
e.css(i[o], r));
},
setMode:function(e, t) {
return "toggle" === t && (t = e.is(":hidden") ? "show" :"hide"), t;
},
getBaseline:function(e, t) {
var n, i;
switch (e[0]) {
case "top":
n = 0;
break;

case "middle":
n = .5;
break;

case "bottom":
n = 1;
break;

default:
n = e[0] / t.height;
}
switch (e[1]) {
case "left":
i = 0;
break;

case "center":
i = .5;
break;

case "right":
i = 1;
break;

default:
i = e[1] / t.width;
}
return {
x:i,
y:n
};
},
createWrapper:function(t) {
if (t.parent().is(".ui-effects-wrapper")) return t.parent();
var n = {
width:t.outerWidth(!0),
height:t.outerHeight(!0),
"float":t.css("float")
}, i = e("<div></div>").addClass("ui-effects-wrapper").css({
fontSize:"100%",
background:"transparent",
border:"none",
margin:0,
padding:0
}), r = {
width:t.width(),
height:t.height()
}, o = document.activeElement;
try {
o.id;
} catch (a) {
o = document.body;
}
return t.wrap(i), (t[0] === o || e.contains(t[0], o)) && e(o).focus(), i = t.parent(), 
"static" === t.css("position") ? (i.css({
position:"relative"
}), t.css({
position:"relative"
})) :(e.extend(n, {
position:t.css("position"),
zIndex:t.css("z-index")
}), e.each([ "top", "left", "bottom", "right" ], function(e, i) {
n[i] = t.css(i), isNaN(parseInt(n[i], 10)) && (n[i] = "auto");
}), t.css({
position:"relative",
top:0,
left:0,
right:"auto",
bottom:"auto"
})), t.css(r), i.css(n).show();
},
removeWrapper:function(t) {
var n = document.activeElement;
return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), 
t;
},
setTransition:function(t, n, i, r) {
return r = r || {}, e.each(n, function(e, n) {
var o = t.cssUnit(n);
o[0] > 0 && (r[n] = o[0] * i + o[1]);
}), r;
}
}), e.fn.extend({
effect:function() {
function t(t) {
function i() {
e.isFunction(o) && o.call(r[0]), e.isFunction(t) && t();
}
var r = e(this), o = n.complete, s = n.mode;
(r.is(":hidden") ? "hide" === s :"show" === s) ? (r[s](), i()) :a.call(r[0], n, i);
}
var n = i.apply(this, arguments), r = n.mode, o = n.queue, a = e.effects.effect[n.effect];
return e.fx.off || !a ? r ? this[r](n.duration, n.complete) :this.each(function() {
n.complete && n.complete.call(this);
}) :o === !1 ? this.each(t) :this.queue(o || "fx", t);
},
show:function(e) {
return function(t) {
if (r(t)) return e.apply(this, arguments);
var n = i.apply(this, arguments);
return n.mode = "show", this.effect.call(this, n);
};
}(e.fn.show),
hide:function(e) {
return function(t) {
if (r(t)) return e.apply(this, arguments);
var n = i.apply(this, arguments);
return n.mode = "hide", this.effect.call(this, n);
};
}(e.fn.hide),
toggle:function(e) {
return function(t) {
if (r(t) || "boolean" == typeof t) return e.apply(this, arguments);
var n = i.apply(this, arguments);
return n.mode = "toggle", this.effect.call(this, n);
};
}(e.fn.toggle),
cssUnit:function(t) {
var n = this.css(t), i = [];
return e.each([ "em", "px", "%", "pt" ], function(e, t) {
n.indexOf(t) > 0 && (i = [ parseFloat(n), t ]);
}), i;
}
});
}(), function() {
var t = {};
e.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(e, n) {
t[n] = function(t) {
return Math.pow(t, e + 2);
};
}), e.extend(t, {
Sine:function(e) {
return 1 - Math.cos(e * Math.PI / 2);
},
Circ:function(e) {
return 1 - Math.sqrt(1 - e * e);
},
Elastic:function(e) {
return 0 === e || 1 === e ? e :-Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15);
},
Back:function(e) {
return e * e * (3 * e - 2);
},
Bounce:function(e) {
for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11; ) ;
return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2);
}
}), e.each(t, function(t, n) {
e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function(e) {
return 1 - n(1 - e);
}, e.easing["easeInOut" + t] = function(e) {
return .5 > e ? n(2 * e) / 2 :1 - n(-2 * e + 2) / 2;
};
});
}();
}(jQuery), /*!
 * jQuery UI Effects Bounce 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
function(e) {
e.effects.effect.bounce = function(t, n) {
var i, r, o, a = e(this), s = [ "position", "top", "bottom", "left", "right", "height", "width" ], l = e.effects.setMode(a, t.mode || "effect"), u = "hide" === l, d = "show" === l, c = t.direction || "up", p = t.distance, h = t.times || 5, f = 2 * h + (d || u ? 1 :0), m = t.duration / f, g = t.easing, _ = "up" === c || "down" === c ? "top" :"left", y = "up" === c || "left" === c, v = a.queue(), b = v.length;
for ((d || u) && s.push("opacity"), e.effects.save(a, s), a.show(), e.effects.createWrapper(a), 
p || (p = a["top" === _ ? "outerHeight" :"outerWidth"]() / 3), d && (o = {
opacity:1
}, o[_] = 0, a.css("opacity", 0).css(_, y ? 2 * -p :2 * p).animate(o, m, g)), u && (p /= Math.pow(2, h - 1)), 
o = {}, o[_] = 0, i = 0; h > i; i++) r = {}, r[_] = (y ? "-=" :"+=") + p, a.animate(r, m, g).animate(o, m, g), 
p = u ? 2 * p :p / 2;
u && (r = {
opacity:0
}, r[_] = (y ? "-=" :"+=") + p, a.animate(r, m, g)), a.queue(function() {
u && a.hide(), e.effects.restore(a, s), e.effects.removeWrapper(a), n();
}), b > 1 && v.splice.apply(v, [ 1, 0 ].concat(v.splice(b, f + 1))), a.dequeue();
};
}(jQuery), /*!
 * jQuery UI Effects Shake 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
function(e) {
e.effects.effect.shake = function(t, n) {
var i, r = e(this), o = [ "position", "top", "bottom", "left", "right", "height", "width" ], a = e.effects.setMode(r, t.mode || "effect"), s = t.direction || "left", l = t.distance || 20, u = t.times || 3, d = 2 * u + 1, c = Math.round(t.duration / d), p = "up" === s || "down" === s ? "top" :"left", h = "up" === s || "left" === s, f = {}, m = {}, g = {}, _ = r.queue(), y = _.length;
for (e.effects.save(r, o), r.show(), e.effects.createWrapper(r), f[p] = (h ? "-=" :"+=") + l, 
m[p] = (h ? "+=" :"-=") + 2 * l, g[p] = (h ? "-=" :"+=") + 2 * l, r.animate(f, c, t.easing), 
i = 1; u > i; i++) r.animate(m, c, t.easing).animate(g, c, t.easing);
r.animate(m, c, t.easing).animate(f, c / 2, t.easing).queue(function() {
"hide" === a && r.hide(), e.effects.restore(r, o), e.effects.removeWrapper(r), n();
}), y > 1 && _.splice.apply(_, [ 1, 0 ].concat(_.splice(y, d + 1))), r.dequeue();
};
}(jQuery), function() {
function e(t, n, i) {
if (t === n) return 0 !== t || 1 / t == 1 / n;
if (null == t || null == n) return t === n;
if (t._chain && (t = t._wrapped), n._chain && (n = n._wrapped), t.isEqual && M.isFunction(t.isEqual)) return t.isEqual(n);
if (n.isEqual && M.isFunction(n.isEqual)) return n.isEqual(t);
var r = u.call(t);
if (r != u.call(n)) return !1;
switch (r) {
case "[object String]":
return t == String(n);

case "[object Number]":
return t != +t ? n != +n :0 == t ? 1 / t == 1 / n :t == +n;

case "[object Date]":
case "[object Boolean]":
return +t == +n;

case "[object RegExp]":
return t.source == n.source && t.global == n.global && t.multiline == n.multiline && t.ignoreCase == n.ignoreCase;
}
if ("object" != typeof t || "object" != typeof n) return !1;
for (var o = i.length; o--; ) if (i[o] == t) return !0;
i.push(t);
var a = 0, s = !0;
if ("[object Array]" == r) {
if (a = t.length, s = a == n.length) for (;a-- && (s = a in t == a in n && e(t[a], n[a], i)); ) ;
} else {
if ("constructor" in t != "constructor" in n || t.constructor != n.constructor) return !1;
for (var l in t) if (M.has(t, l) && (a++, !(s = M.has(n, l) && e(t[l], n[l], i)))) break;
if (s) {
for (l in n) if (M.has(n, l) && !a--) break;
s = !a;
}
}
return i.pop(), s;
}
var t = this, n = t._, i = {}, r = Array.prototype, o = Object.prototype, a = Function.prototype, s = r.slice, l = r.unshift, u = o.toString, d = o.hasOwnProperty, c = r.forEach, p = r.map, h = r.reduce, f = r.reduceRight, m = r.filter, g = r.every, _ = r.some, y = r.indexOf, v = r.lastIndexOf, b = Array.isArray, w = Object.keys, k = a.bind, M = function(e) {
return new C(e);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = M), 
exports._ = M) :t._ = M, M.VERSION = "1.3.1";
var L = M.each = M.forEach = function(e, t, n) {
if (null != e) if (c && e.forEach === c) e.forEach(t, n); else if (e.length === +e.length) {
for (var r = 0, o = e.length; o > r; r++) if (r in e && t.call(n, e[r], r, e) === i) return;
} else for (var a in e) if (M.has(e, a) && t.call(n, e[a], a, e) === i) return;
};
M.map = M.collect = function(e, t, n) {
var i = [];
return null == e ? i :p && e.map === p ? e.map(t, n) :(L(e, function(e, r, o) {
i[i.length] = t.call(n, e, r, o);
}), e.length === +e.length && (i.length = e.length), i);
}, M.reduce = M.foldl = M.inject = function(e, t, n, i) {
var r = arguments.length > 2;
if (null == e && (e = []), h && e.reduce === h) return i && (t = M.bind(t, i)), 
r ? e.reduce(t, n) :e.reduce(t);
if (L(e, function(e, o, a) {
r ? n = t.call(i, n, e, o, a) :(n = e, r = !0);
}), !r) throw new TypeError("Reduce of empty array with no initial value");
return n;
}, M.reduceRight = M.foldr = function(e, t, n, i) {
var r = arguments.length > 2;
if (null == e && (e = []), f && e.reduceRight === f) return i && (t = M.bind(t, i)), 
r ? e.reduceRight(t, n) :e.reduceRight(t);
var o = M.toArray(e).reverse();
return i && !r && (t = M.bind(t, i)), r ? M.reduce(o, t, n, i) :M.reduce(o, t);
}, M.find = M.detect = function(e, t, n) {
var i;
return S(e, function(e, r, o) {
return t.call(n, e, r, o) ? (i = e, !0) :void 0;
}), i;
}, M.filter = M.select = function(e, t, n) {
var i = [];
return null == e ? i :m && e.filter === m ? e.filter(t, n) :(L(e, function(e, r, o) {
t.call(n, e, r, o) && (i[i.length] = e);
}), i);
}, M.reject = function(e, t, n) {
var i = [];
return null == e ? i :(L(e, function(e, r, o) {
t.call(n, e, r, o) || (i[i.length] = e);
}), i);
}, M.every = M.all = function(e, t, n) {
var r = !0;
return null == e ? r :g && e.every === g ? e.every(t, n) :(L(e, function(e, o, a) {
return (r = r && t.call(n, e, o, a)) ? void 0 :i;
}), r);
};
var S = M.some = M.any = function(e, t, n) {
t || (t = M.identity);
var r = !1;
return null == e ? r :_ && e.some === _ ? e.some(t, n) :(L(e, function(e, o, a) {
return r || (r = t.call(n, e, o, a)) ? i :void 0;
}), !!r);
};
M.include = M.contains = function(e, t) {
var n = !1;
return null == e ? n :y && e.indexOf === y ? -1 != e.indexOf(t) :n = S(e, function(e) {
return e === t;
});
}, M.invoke = function(e, t) {
var n = s.call(arguments, 2);
return M.map(e, function(e) {
return (M.isFunction(t) ? t || e :e[t]).apply(e, n);
});
}, M.pluck = function(e, t) {
return M.map(e, function(e) {
return e[t];
});
}, M.max = function(e, t, n) {
if (!t && M.isArray(e)) return Math.max.apply(Math, e);
if (!t && M.isEmpty(e)) return -1/0;
var i = {
computed:-1/0
};
return L(e, function(e, r, o) {
var a = t ? t.call(n, e, r, o) :e;
a >= i.computed && (i = {
value:e,
computed:a
});
}), i.value;
}, M.min = function(e, t, n) {
if (!t && M.isArray(e)) return Math.min.apply(Math, e);
if (!t && M.isEmpty(e)) return 1/0;
var i = {
computed:1/0
};
return L(e, function(e, r, o) {
var a = t ? t.call(n, e, r, o) :e;
a < i.computed && (i = {
value:e,
computed:a
});
}), i.value;
}, M.shuffle = function(e) {
var t, n = [];
return L(e, function(e, i) {
0 == i ? n[0] = e :(t = Math.floor(Math.random() * (i + 1)), n[i] = n[t], n[t] = e);
}), n;
}, M.sortBy = function(e, t, n) {
return M.pluck(M.map(e, function(e, i, r) {
return {
value:e,
criteria:t.call(n, e, i, r)
};
}).sort(function(e, t) {
var n = e.criteria, i = t.criteria;
return i > n ? -1 :n > i ? 1 :0;
}), "value");
}, M.groupBy = function(e, t) {
var n = {}, i = M.isFunction(t) ? t :function(e) {
return e[t];
};
return L(e, function(e, t) {
var r = i(e, t);
(n[r] || (n[r] = [])).push(e);
}), n;
}, M.sortedIndex = function(e, t, n) {
n || (n = M.identity);
for (var i = 0, r = e.length; r > i; ) {
var o = i + r >> 1;
n(e[o]) < n(t) ? i = o + 1 :r = o;
}
return i;
}, M.toArray = function(e) {
return e ? e.toArray ? e.toArray() :M.isArray(e) ? s.call(e) :M.isArguments(e) ? s.call(e) :M.values(e) :[];
}, M.size = function(e) {
return M.toArray(e).length;
}, M.first = M.head = function(e, t, n) {
return null == t || n ? e[0] :s.call(e, 0, t);
}, M.initial = function(e, t, n) {
return s.call(e, 0, e.length - (null == t || n ? 1 :t));
}, M.last = function(e, t, n) {
return null == t || n ? e[e.length - 1] :s.call(e, Math.max(e.length - t, 0));
}, M.rest = M.tail = function(e, t, n) {
return s.call(e, null == t || n ? 1 :t);
}, M.compact = function(e) {
return M.filter(e, function(e) {
return !!e;
});
}, M.flatten = function(e, t) {
return M.reduce(e, function(e, n) {
return M.isArray(n) ? e.concat(t ? n :M.flatten(n)) :(e[e.length] = n, e);
}, []);
}, M.without = function(e) {
return M.difference(e, s.call(arguments, 1));
}, M.uniq = M.unique = function(e, t, n) {
var i = n ? M.map(e, n) :e, r = [];
return M.reduce(i, function(n, i, o) {
return 0 != o && (t === !0 ? M.last(n) == i :M.include(n, i)) || (n[n.length] = i, 
r[r.length] = e[o]), n;
}, []), r;
}, M.union = function() {
return M.uniq(M.flatten(arguments, !0));
}, M.intersection = M.intersect = function(e) {
var t = s.call(arguments, 1);
return M.filter(M.uniq(e), function(e) {
return M.every(t, function(t) {
return M.indexOf(t, e) >= 0;
});
});
}, M.difference = function(e) {
var t = M.flatten(s.call(arguments, 1));
return M.filter(e, function(e) {
return !M.include(t, e);
});
}, M.zip = function() {
for (var e = s.call(arguments), t = M.max(M.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++) n[i] = M.pluck(e, "" + i);
return n;
}, M.indexOf = function(e, t, n) {
if (null == e) return -1;
var i, r;
if (n) return i = M.sortedIndex(e, t), e[i] === t ? i :-1;
if (y && e.indexOf === y) return e.indexOf(t);
for (i = 0, r = e.length; r > i; i++) if (i in e && e[i] === t) return i;
return -1;
}, M.lastIndexOf = function(e, t) {
if (null == e) return -1;
if (v && e.lastIndexOf === v) return e.lastIndexOf(t);
for (var n = e.length; n--; ) if (n in e && e[n] === t) return n;
return -1;
}, M.range = function(e, t, n) {
arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, o = new Array(i); i > r; ) o[r++] = e, 
e += n;
return o;
};
var T = function() {};
M.bind = function(e, t) {
var n, i;
if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
if (!M.isFunction(e)) throw new TypeError();
return i = s.call(arguments, 2), n = function() {
if (!(this instanceof n)) return e.apply(t, i.concat(s.call(arguments)));
T.prototype = e.prototype;
var r = new T(), o = e.apply(r, i.concat(s.call(arguments)));
return Object(o) === o ? o :r;
};
}, M.bindAll = function(e) {
var t = s.call(arguments, 1);
return 0 == t.length && (t = M.functions(e)), L(t, function(t) {
e[t] = M.bind(e[t], e);
}), e;
}, M.memoize = function(e, t) {
var n = {};
return t || (t = M.identity), function() {
var i = t.apply(this, arguments);
return M.has(n, i) ? n[i] :n[i] = e.apply(this, arguments);
};
}, M.delay = function(e, t) {
var n = s.call(arguments, 2);
return setTimeout(function() {
return e.apply(e, n);
}, t);
}, M.defer = function(e) {
return M.delay.apply(M, [ e, 1 ].concat(s.call(arguments, 1)));
}, M.throttle = function(e, t) {
var n, i, r, o, a, s = M.debounce(function() {
a = o = !1;
}, t);
return function() {
n = this, i = arguments;
var l = function() {
r = null, a && e.apply(n, i), s();
};
r || (r = setTimeout(l, t)), o ? a = !0 :e.apply(n, i), s(), o = !0;
};
}, M.debounce = function(e, t) {
var n;
return function() {
var i = this, r = arguments, o = function() {
n = null, e.apply(i, r);
};
clearTimeout(n), n = setTimeout(o, t);
};
}, M.once = function(e) {
var t, n = !1;
return function() {
return n ? t :(n = !0, t = e.apply(this, arguments));
};
}, M.wrap = function(e, t) {
return function() {
var n = [ e ].concat(s.call(arguments, 0));
return t.apply(this, n);
};
}, M.compose = function() {
var e = arguments;
return function() {
for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
return t[0];
};
}, M.after = function(e, t) {
return 0 >= e ? t() :function() {
return --e < 1 ? t.apply(this, arguments) :void 0;
};
}, M.keys = w || function(e) {
if (e !== Object(e)) throw new TypeError("Invalid object");
var t = [];
for (var n in e) M.has(e, n) && (t[t.length] = n);
return t;
}, M.values = function(e) {
return M.map(e, M.identity);
}, M.functions = M.methods = function(e) {
var t = [];
for (var n in e) M.isFunction(e[n]) && t.push(n);
return t.sort();
}, M.extend = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var n in t) e[n] = t[n];
}), e;
}, M.defaults = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var n in t) null == e[n] && (e[n] = t[n]);
}), e;
}, M.clone = function(e) {
return M.isObject(e) ? M.isArray(e) ? e.slice() :M.extend({}, e) :e;
}, M.tap = function(e, t) {
return t(e), e;
}, M.isEqual = function(t, n) {
return e(t, n, []);
}, M.isEmpty = function(e) {
if (M.isArray(e) || M.isString(e)) return 0 === e.length;
for (var t in e) if (M.has(e, t)) return !1;
return !0;
}, M.isElement = function(e) {
return !(!e || 1 != e.nodeType);
}, M.isArray = b || function(e) {
return "[object Array]" == u.call(e);
}, M.isObject = function(e) {
return e === Object(e);
}, M.isArguments = function(e) {
return "[object Arguments]" == u.call(e);
}, M.isArguments(arguments) || (M.isArguments = function(e) {
return !(!e || !M.has(e, "callee"));
}), M.isFunction = function(e) {
return "[object Function]" == u.call(e);
}, M.isString = function(e) {
return "[object String]" == u.call(e);
}, M.isNumber = function(e) {
return "[object Number]" == u.call(e);
}, M.isNaN = function(e) {
return e !== e;
}, M.isBoolean = function(e) {
return e === !0 || e === !1 || "[object Boolean]" == u.call(e);
}, M.isDate = function(e) {
return "[object Date]" == u.call(e);
}, M.isRegExp = function(e) {
return "[object RegExp]" == u.call(e);
}, M.isNull = function(e) {
return null === e;
}, M.isUndefined = function(e) {
return void 0 === e;
}, M.has = function(e, t) {
return d.call(e, t);
}, M.noConflict = function() {
return t._ = n, this;
}, M.identity = function(e) {
return e;
}, M.times = function(e, t, n) {
for (var i = 0; e > i; i++) t.call(n, i);
}, M.escape = function(e) {
return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, M.mixin = function(e) {
L(M.functions(e), function(t) {
A(t, M[t] = e[t]);
});
};
var D = 0;
M.uniqueId = function(e) {
var t = D++;
return e ? e + t :t;
}, M.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var x = /.^/, Y = function(e) {
return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
M.template = function(e, t) {
var n = M.templateSettings, i = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || x, function(e, t) {
return "',_.escape(" + Y(t) + "),'";
}).replace(n.interpolate || x, function(e, t) {
return "'," + Y(t) + ",'";
}).replace(n.evaluate || x, function(e, t) {
return "');" + Y(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", r = new Function("obj", "_", i);
return t ? r(t, M) :function(e) {
return r.call(this, e, M);
};
}, M.chain = function(e) {
return M(e).chain();
};
var C = function(e) {
this._wrapped = e;
};
M.prototype = C.prototype;
var E = function(e, t) {
return t ? M(e).chain() :e;
}, A = function(e, t) {
C.prototype[e] = function() {
var e = s.call(arguments);
return l.call(e, this._wrapped), E(t.apply(M, e), this._chain);
};
};
M.mixin(M), L([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
var t = r[e];
C.prototype[e] = function() {
var n = this._wrapped;
t.apply(n, arguments);
var i = n.length;
return "shift" != e && "splice" != e || 0 !== i || delete n[0], E(n, this._chain);
};
}), L([ "concat", "join", "slice" ], function(e) {
var t = r[e];
C.prototype[e] = function() {
return E(t.apply(this._wrapped, arguments), this._chain);
};
}), C.prototype.chain = function() {
return this._chain = !0, this;
}, C.prototype.value = function() {
return this._wrapped;
};
}.call(this), /* Copyright (c) 2010-2013 Marcus Westin */
function(e) {
function t() {
try {
return s in e && e[s];
} catch (t) {
return !1;
}
}
function n(e) {
return function() {
var t = Array.prototype.slice.call(arguments, 0);
t.unshift(r), u.appendChild(r), r.addBehavior("#default#userData"), r.load(s);
var n = e.apply(o, t);
return u.removeChild(r), n;
};
}
function i(e) {
return e.replace(/^d/, "___$&").replace(p, "___");
}
var r, o = {}, a = e.document, s = "localStorage", l = "script";
if (o.disabled = !1, o.set = function() {}, o.get = function() {}, o.remove = function() {}, 
o.clear = function() {}, o.transact = function(e, t, n) {
var i = o.get(e);
null == n && (n = t, t = null), "undefined" == typeof i && (i = t || {}), n(i), 
o.set(e, i);
}, o.getAll = function() {}, o.forEach = function() {}, o.serialize = function(e) {
return JSON.stringify(e);
}, o.deserialize = function(e) {
if ("string" != typeof e) return void 0;
try {
return JSON.parse(e);
} catch (t) {
return e || void 0;
}
}, t()) r = e[s], o.set = function(e, t) {
return void 0 === t ? o.remove(e) :(r.setItem(e, o.serialize(t)), t);
}, o.get = function(e) {
return o.deserialize(r.getItem(e));
}, o.remove = function(e) {
r.removeItem(e);
}, o.clear = function() {
r.clear();
}, o.getAll = function() {
var e = {};
return o.forEach(function(t, n) {
e[t] = n;
}), e;
}, o.forEach = function(e) {
for (var t = 0; t < r.length; t++) {
var n = r.key(t);
e(n, o.get(n));
}
}; else if (a.documentElement.addBehavior) {
var u, d;
try {
d = new ActiveXObject("htmlfile"), d.open(), d.write("<" + l + ">document.w=window</" + l + '><iframe src="/favicon.ico"></iframe>'), 
d.close(), u = d.w.frames[0].document, r = u.createElement("div");
} catch (c) {
r = a.createElement("div"), u = a.body;
}
var p = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
o.set = n(function(e, t, n) {
return t = i(t), void 0 === n ? o.remove(t) :(e.setAttribute(t, o.serialize(n)), 
e.save(s), n);
}), o.get = n(function(e, t) {
return t = i(t), o.deserialize(e.getAttribute(t));
}), o.remove = n(function(e, t) {
t = i(t), e.removeAttribute(t), e.save(s);
}), o.clear = n(function(e) {
var t = e.XMLDocument.documentElement.attributes;
e.load(s);
for (var n, i = 0; n = t[i]; i++) e.removeAttribute(n.name);
e.save(s);
}), o.getAll = function() {
var e = {};
return o.forEach(function(t, n) {
e[t] = n;
}), e;
}, o.forEach = n(function(e, t) {
for (var n, i = e.XMLDocument.documentElement.attributes, r = 0; n = i[r]; ++r) t(n.name, o.deserialize(e.getAttribute(n.name)));
});
}
try {
var h = "__storejs__";
o.set(h, h), o.get(h) != h && (o.disabled = !0), o.remove(h);
} catch (c) {
o.disabled = !0;
}
o.enabled = !o.disabled, "undefined" != typeof module && module.exports ? module.exports = o :"function" == typeof define && define.amd ? define(o) :e.store = o;
}(Function("return this")());

var dateFormat = function() {
var e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, t = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, n = /[^-+\dA-Z]/g, i = function(e, t) {
for (e = String(e), t = t || 2; e.length < t; ) e = "0" + e;
return e;
};
return function(r, o, a) {
var s = dateFormat;
if (1 != arguments.length || "[object String]" != Object.prototype.toString.call(r) || /\d/.test(r) || (o = r, 
r = void 0), r = r ? new Date(r) :new Date(), isNaN(r)) throw SyntaxError("invalid date");
o = String(s.masks[o] || o || s.masks["default"]), "UTC:" == o.slice(0, 4) && (o = o.slice(4), 
a = !0);
var l = a ? "getUTC" :"get", u = r[l + "Date"](), d = r[l + "Day"](), c = r[l + "Month"](), p = r[l + "FullYear"](), h = r[l + "Hours"](), f = r[l + "Minutes"](), m = r[l + "Seconds"](), g = r[l + "Milliseconds"](), _ = a ? 0 :r.getTimezoneOffset(), y = {
d:u,
dd:i(u),
ddd:s.i18n.dayNames[d],
dddd:s.i18n.dayNames[d + 7],
m:c + 1,
mm:i(c + 1),
mmm:s.i18n.monthNames[c],
mmmm:s.i18n.monthNames[c + 12],
yy:String(p).slice(2),
yyyy:p,
h:h % 12 || 12,
hh:i(h % 12 || 12),
H:h,
HH:i(h),
M:f,
MM:i(f),
s:m,
ss:i(m),
l:i(g, 3),
L:i(g > 99 ? Math.round(g / 10) :g),
t:12 > h ? "a" :"p",
tt:12 > h ? "am" :"pm",
T:12 > h ? "A" :"P",
TT:12 > h ? "AM" :"PM",
Z:a ? "UTC" :(String(r).match(t) || [ "" ]).pop().replace(n, ""),
o:(_ > 0 ? "-" :"+") + i(100 * Math.floor(Math.abs(_) / 60) + Math.abs(_) % 60, 4),
S:[ "th", "st", "nd", "rd" ][u % 10 > 3 ? 0 :(u % 100 - u % 10 != 10) * u % 10]
};
return o.replace(e, function(e) {
return e in y ? y[e] :e.slice(1, e.length - 1);
});
};
}();

dateFormat.masks = {
"default":"ddd mmm dd yyyy HH:MM:ss",
shortDate:"m/d/yy",
mediumDate:"mmm d, yyyy",
longDate:"mmmm d, yyyy",
fullDate:"dddd, mmmm d, yyyy",
shortTime:"h:MM TT",
mediumTime:"h:MM:ss TT",
longTime:"h:MM:ss TT Z",
isoDate:"yyyy-mm-dd",
isoTime:"HH:MM:ss",
isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",
isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}, dateFormat.i18n = {
dayNames:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
monthNames:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
}, Date.prototype.format = function(e, t) {
return dateFormat(this, e, t);
};

var origParse = Date.parse, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];

Date.parse = function(e) {
var t, n, i = 0;
if (n = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(e)) {
for (var r, o = 0; r = numericKeys[o]; ++o) n[r] = +n[r] || 0;
n[2] = (+n[2] || 1) - 1, n[3] = +n[3] || 1, "Z" !== n[8] && void 0 !== n[9] && (i = 60 * n[10] + n[11], 
"+" === n[9] && (i = 0 - i)), t = Date.UTC(n[1], n[2], n[3], n[4], n[5] + i, n[6], n[7]);
} else t = origParse ? origParse(e) :0/0;
return new Date(t);
}, function(e) {
function t() {
return {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function n(e, t) {
function n() {
lt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
}
var i = !0;
return l(function() {
return i && (n(), i = !1), t.apply(this, arguments);
}, t);
}
function i(e, t) {
return function(n) {
return c(e.call(this, n), t);
};
}
function r(e, t) {
return function(n) {
return this.lang().ordinal(e.call(this, n), t);
};
}
function o() {}
function a(e) {
L(e), l(this, e);
}
function s(e) {
var t = _(e), n = t.year || 0, i = t.quarter || 0, r = t.month || 0, o = t.week || 0, a = t.day || 0, s = t.hour || 0, l = t.minute || 0, u = t.second || 0, d = t.millisecond || 0;
this._milliseconds = +d + 1e3 * u + 6e4 * l + 36e5 * s, this._days = +a + 7 * o, 
this._months = +r + 3 * i + 12 * n, this._data = {}, this._bubble();
}
function l(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), 
e;
}
function u(e) {
var t, n = {};
for (t in e) e.hasOwnProperty(t) && kt.hasOwnProperty(t) && (n[t] = e[t]);
return n;
}
function d(e) {
return 0 > e ? Math.ceil(e) :Math.floor(e);
}
function c(e, t, n) {
for (var i = "" + Math.abs(e), r = e >= 0; i.length < t; ) i = "0" + i;
return (r ? n ? "+" :"" :"-") + i;
}
function p(e, t, n, i) {
var r = t._milliseconds, o = t._days, a = t._months;
i = null == i ? !0 :i, r && e._d.setTime(+e._d + r * n), o && it(e, "Date", nt(e, "Date") + o * n), 
a && tt(e, nt(e, "Month") + a * n), i && lt.updateOffset(e, o || a);
}
function h(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function f(e) {
return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date;
}
function m(e, t, n) {
var i, r = Math.min(e.length, t.length), o = Math.abs(e.length - t.length), a = 0;
for (i = 0; r > i; i++) (n && e[i] !== t[i] || !n && v(e[i]) !== v(t[i])) && a++;
return a + o;
}
function g(e) {
if (e) {
var t = e.toLowerCase().replace(/(.)s$/, "$1");
e = Qt[e] || Xt[t] || t;
}
return e;
}
function _(e) {
var t, n, i = {};
for (n in e) e.hasOwnProperty(n) && (t = g(n), t && (i[t] = e[n]));
return i;
}
function y(t) {
var n, i;
if (0 === t.indexOf("week")) n = 7, i = "day"; else {
if (0 !== t.indexOf("month")) return;
n = 12, i = "month";
}
lt[t] = function(r, o) {
var a, s, l = lt.fn._lang[t], u = [];
if ("number" == typeof r && (o = r, r = e), s = function(e) {
var t = lt().utc().set(i, e);
return l.call(lt.fn._lang, t, r || "");
}, null != o) return s(o);
for (a = 0; n > a; a++) u.push(s(a));
return u;
};
}
function v(e) {
var t = +e, n = 0;
return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) :Math.ceil(t)), n;
}
function b(e, t) {
return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
}
function w(e, t, n) {
return X(lt([ e, 11, 31 + t - n ]), t, n).week;
}
function k(e) {
return M(e) ? 366 :365;
}
function M(e) {
return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function L(e) {
var t;
e._a && -2 === e._pf.overflow && (t = e._a[mt] < 0 || e._a[mt] > 11 ? mt :e._a[gt] < 1 || e._a[gt] > b(e._a[ft], e._a[mt]) ? gt :e._a[_t] < 0 || e._a[_t] > 23 ? _t :e._a[yt] < 0 || e._a[yt] > 59 ? yt :e._a[vt] < 0 || e._a[vt] > 59 ? vt :e._a[bt] < 0 || e._a[bt] > 999 ? bt :-1, 
e._pf._overflowDayOfYear && (ft > t || t > gt) && (t = gt), e._pf.overflow = t);
}
function S(e) {
return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, 
e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), 
e._isValid;
}
function T(e) {
return e ? e.toLowerCase().replace("_", "-") :e;
}
function D(e, t) {
return t._isUTC ? lt(e).zone(t._offset || 0) :lt(e).local();
}
function x(e, t) {
return t.abbr = e, wt[e] || (wt[e] = new o()), wt[e].set(t), wt[e];
}
function Y(e) {
delete wt[e];
}
function C(e) {
var t, n, i, r, o = 0, a = function(e) {
if (!wt[e] && Mt) try {
require("./lang/" + e);
} catch (t) {}
return wt[e];
};
if (!e) return lt.fn._lang;
if (!h(e)) {
if (n = a(e)) return n;
e = [ e ];
}
for (;o < e.length; ) {
for (r = T(e[o]).split("-"), t = r.length, i = T(e[o + 1]), i = i ? i.split("-") :null; t > 0; ) {
if (n = a(r.slice(0, t).join("-"))) return n;
if (i && i.length >= t && m(r, i, !0) >= t - 1) break;
t--;
}
o++;
}
return lt.fn._lang;
}
function E(e) {
return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") :e.replace(/\\/g, "");
}
function A(e) {
var t, n, i = e.match(Dt);
for (t = 0, n = i.length; n > t; t++) i[t] = nn[i[t]] ? nn[i[t]] :E(i[t]);
return function(r) {
var o = "";
for (t = 0; n > t; t++) o += i[t] instanceof Function ? i[t].call(r, e) :i[t];
return o;
};
}
function $(e, t) {
return e.isValid() ? (t = I(t, e.lang()), Zt[t] || (Zt[t] = A(t)), Zt[t](e)) :e.lang().invalidDate();
}
function I(e, t) {
function n(e) {
return t.longDateFormat(e) || e;
}
var i = 5;
for (xt.lastIndex = 0; i >= 0 && xt.test(e); ) e = e.replace(xt, n), xt.lastIndex = 0, 
i -= 1;
return e;
}
function O(e, t) {
var n, i = t._strict;
switch (e) {
case "Q":
return Pt;

case "DDDD":
return Ht;

case "YYYY":
case "GGGG":
case "gggg":
return i ? zt :Et;

case "Y":
case "G":
case "g":
return Wt;

case "YYYYYY":
case "YYYYY":
case "GGGGG":
case "ggggg":
return i ? Rt :At;

case "S":
if (i) return Pt;

case "SS":
if (i) return Nt;

case "SSS":
if (i) return Ht;

case "DDD":
return Ct;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return It;

case "a":
case "A":
return C(t._l)._meridiemParse;

case "X":
return Bt;

case "Z":
case "ZZ":
return Ot;

case "T":
return Ft;

case "SSSS":
return $t;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "ww":
case "WW":
return i ? Nt :Yt;

case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "W":
case "e":
case "E":
return Yt;

case "Do":
return jt;

default:
return n = new RegExp(R(z(e.replace("\\", "")), "i"));
}
}
function F(e) {
e = e || "";
var t = e.match(Ot) || [], n = t[t.length - 1] || [], i = (n + "").match(Jt) || [ "-", 0, 0 ], r = +(60 * i[1]) + v(i[2]);
return "+" === i[0] ? -r :r;
}
function B(e, t, n) {
var i, r = n._a;
switch (e) {
case "Q":
null != t && (r[mt] = 3 * (v(t) - 1));
break;

case "M":
case "MM":
null != t && (r[mt] = v(t) - 1);
break;

case "MMM":
case "MMMM":
i = C(n._l).monthsParse(t), null != i ? r[mt] = i :n._pf.invalidMonth = t;
break;

case "D":
case "DD":
null != t && (r[gt] = v(t));
break;

case "Do":
null != t && (r[gt] = v(parseInt(t, 10)));
break;

case "DDD":
case "DDDD":
null != t && (n._dayOfYear = v(t));
break;

case "YY":
r[ft] = lt.parseTwoDigitYear(t);
break;

case "YYYY":
case "YYYYY":
case "YYYYYY":
r[ft] = v(t);
break;

case "a":
case "A":
n._isPm = C(n._l).isPM(t);
break;

case "H":
case "HH":
case "h":
case "hh":
r[_t] = v(t);
break;

case "m":
case "mm":
r[yt] = v(t);
break;

case "s":
case "ss":
r[vt] = v(t);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
r[bt] = v(1e3 * ("0." + t));
break;

case "X":
n._d = new Date(1e3 * parseFloat(t));
break;

case "Z":
case "ZZ":
n._useUTC = !0, n._tzm = F(t);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
e = e.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = t);
}
}
function j(e) {
var t, n, i, r, o, a, s, l, u, d, c = [];
if (!e._d) {
for (i = N(e), e._w && null == e._a[gt] && null == e._a[mt] && (o = function(t) {
var n = parseInt(t, 10);
return t ? t.length < 3 ? n > 68 ? 1900 + n :2e3 + n :n :null == e._a[ft] ? lt().weekYear() :e._a[ft];
}, a = e._w, null != a.GG || null != a.W || null != a.E ? s = Z(o(a.GG), a.W || 1, a.E, 4, 1) :(l = C(e._l), 
u = null != a.d ? J(a.d, l) :null != a.e ? parseInt(a.e, 10) + l._week.dow :0, d = parseInt(a.w, 10) || 1, 
null != a.d && u < l._week.dow && d++, s = Z(o(a.gg), d, u, l._week.doy, l._week.dow)), 
e._a[ft] = s.year, e._dayOfYear = s.dayOfYear), e._dayOfYear && (r = null == e._a[ft] ? i[ft] :e._a[ft], 
e._dayOfYear > k(r) && (e._pf._overflowDayOfYear = !0), n = G(r, 0, e._dayOfYear), 
e._a[mt] = n.getUTCMonth(), e._a[gt] = n.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = c[t] = i[t];
for (;7 > t; t++) e._a[t] = c[t] = null == e._a[t] ? 2 === t ? 1 :0 :e._a[t];
c[_t] += v((e._tzm || 0) / 60), c[yt] += v((e._tzm || 0) % 60), e._d = (e._useUTC ? G :V).apply(null, c);
}
}
function P(e) {
var t;
e._d || (t = _(e._i), e._a = [ t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond ], 
j(e));
}
function N(e) {
var t = new Date();
return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] :[ t.getFullYear(), t.getMonth(), t.getDate() ];
}
function H(e) {
e._a = [], e._pf.empty = !0;
var t, n, i, r, o, a = C(e._l), s = "" + e._i, l = s.length, u = 0;
for (i = I(e._f, a).match(Dt) || [], t = 0; t < i.length; t++) r = i[t], n = (s.match(O(r, e)) || [])[0], 
n && (o = s.substr(0, s.indexOf(n)), o.length > 0 && e._pf.unusedInput.push(o), 
s = s.slice(s.indexOf(n) + n.length), u += n.length), nn[r] ? (n ? e._pf.empty = !1 :e._pf.unusedTokens.push(r), 
B(r, n, e)) :e._strict && !n && e._pf.unusedTokens.push(r);
e._pf.charsLeftOver = l - u, s.length > 0 && e._pf.unusedInput.push(s), e._isPm && e._a[_t] < 12 && (e._a[_t] += 12), 
e._isPm === !1 && 12 === e._a[_t] && (e._a[_t] = 0), j(e), L(e);
}
function z(e) {
return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, i, r) {
return t || n || i || r;
});
}
function R(e) {
return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function W(e) {
var n, i, r, o, a;
if (0 === e._f.length) return e._pf.invalidFormat = !0, void (e._d = new Date(0/0));
for (o = 0; o < e._f.length; o++) a = 0, n = l({}, e), n._pf = t(), n._f = e._f[o], 
H(n), S(n) && (a += n._pf.charsLeftOver, a += 10 * n._pf.unusedTokens.length, n._pf.score = a, 
(null == r || r > a) && (r = a, i = n));
l(e, i || n);
}
function U(e) {
var t, n, i = e._i, r = Ut.exec(i);
if (r) {
for (e._pf.iso = !0, t = 0, n = Vt.length; n > t; t++) if (Vt[t][1].exec(i)) {
e._f = Vt[t][0] + (r[6] || " ");
break;
}
for (t = 0, n = Gt.length; n > t; t++) if (Gt[t][1].exec(i)) {
e._f += Gt[t][0];
break;
}
i.match(Ot) && (e._f += "Z"), H(e);
} else lt.createFromInputFallback(e);
}
function q(t) {
var n = t._i, i = Lt.exec(n);
n === e ? t._d = new Date() :i ? t._d = new Date(+i[1]) :"string" == typeof n ? U(t) :h(n) ? (t._a = n.slice(0), 
j(t)) :f(n) ? t._d = new Date(+n) :"object" == typeof n ? P(t) :"number" == typeof n ? t._d = new Date(n) :lt.createFromInputFallback(t);
}
function V(e, t, n, i, r, o, a) {
var s = new Date(e, t, n, i, r, o, a);
return 1970 > e && s.setFullYear(e), s;
}
function G(e) {
var t = new Date(Date.UTC.apply(null, arguments));
return 1970 > e && t.setUTCFullYear(e), t;
}
function J(e, t) {
if ("string" == typeof e) if (isNaN(e)) {
if (e = t.weekdaysParse(e), "number" != typeof e) return null;
} else e = parseInt(e, 10);
return e;
}
function K(e, t, n, i, r) {
return r.relativeTime(t || 1, !!n, e, i);
}
function Q(e, t, n) {
var i = ht(Math.abs(e) / 1e3), r = ht(i / 60), o = ht(r / 60), a = ht(o / 24), s = ht(a / 365), l = 45 > i && [ "s", i ] || 1 === r && [ "m" ] || 45 > r && [ "mm", r ] || 1 === o && [ "h" ] || 22 > o && [ "hh", o ] || 1 === a && [ "d" ] || 25 >= a && [ "dd", a ] || 45 >= a && [ "M" ] || 345 > a && [ "MM", ht(a / 30) ] || 1 === s && [ "y" ] || [ "yy", s ];
return l[2] = t, l[3] = e > 0, l[4] = n, K.apply({}, l);
}
function X(e, t, n) {
var i, r = n - t, o = n - e.day();
return o > r && (o -= 7), r - 7 > o && (o += 7), i = lt(e).add("d", o), {
week:Math.ceil(i.dayOfYear() / 7),
year:i.year()
};
}
function Z(e, t, n, i, r) {
var o, a, s = G(e, 0, 1).getUTCDay();
return n = null != n ? n :r, o = r - s + (s > i ? 7 :0) - (r > s ? 7 :0), a = 7 * (t - 1) + (n - r) + o + 1, 
{
year:a > 0 ? e :e - 1,
dayOfYear:a > 0 ? a :k(e - 1) + a
};
}
function et(t) {
var n = t._i, i = t._f;
return null === n || i === e && "" === n ? lt.invalid({
nullInput:!0
}) :("string" == typeof n && (t._i = n = C().preparse(n)), lt.isMoment(n) ? (t = u(n), 
t._d = new Date(+n._d)) :i ? h(i) ? W(t) :H(t) :q(t), new a(t));
}
function tt(e, t) {
var n;
return "string" == typeof t && (t = e.lang().monthsParse(t), "number" != typeof t) ? e :(n = Math.min(e.date(), b(e.year(), t)), 
e._d["set" + (e._isUTC ? "UTC" :"") + "Month"](t, n), e);
}
function nt(e, t) {
return e._d["get" + (e._isUTC ? "UTC" :"") + t]();
}
function it(e, t, n) {
return "Month" === t ? tt(e, n) :e._d["set" + (e._isUTC ? "UTC" :"") + t](n);
}
function rt(e, t) {
return function(n) {
return null != n ? (it(this, e, n), lt.updateOffset(this, t), this) :nt(this, e);
};
}
function ot(e) {
lt.duration.fn[e] = function() {
return this._data[e];
};
}
function at(e, t) {
lt.duration.fn["as" + e] = function() {
return +this / t;
};
}
function st(e) {
"undefined" == typeof ender && (ut = pt.moment, pt.moment = e ? n("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", lt) :lt);
}
for (var lt, ut, dt, ct = "2.6.0", pt = "undefined" != typeof global ? global :this, ht = Math.round, ft = 0, mt = 1, gt = 2, _t = 3, yt = 4, vt = 5, bt = 6, wt = {}, kt = {
_isAMomentObject:null,
_i:null,
_f:null,
_l:null,
_strict:null,
_isUTC:null,
_offset:null,
_pf:null,
_lang:null
}, Mt = "undefined" != typeof module && module.exports, Lt = /^\/?Date\((\-?\d+)/i, St = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Tt = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Dt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, xt = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Yt = /\d\d?/, Ct = /\d{1,3}/, Et = /\d{1,4}/, At = /[+\-]?\d{1,6}/, $t = /\d+/, It = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Ot = /Z|[\+\-]\d\d:?\d\d/gi, Ft = /T/i, Bt = /[\+\-]?\d+(\.\d{1,3})?/, jt = /\d{1,2}/, Pt = /\d/, Nt = /\d\d/, Ht = /\d{3}/, zt = /\d{4}/, Rt = /[+-]?\d{6}/, Wt = /[+-]?\d+/, Ut = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, qt = "YYYY-MM-DDTHH:mm:ssZ", Vt = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], Gt = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], Jt = /([\+\-]|\d\d)/gi, Kt = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), 
{
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}), Qt = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
Q:"quarter",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, Xt = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, Zt = {}, en = "DDD w W M D d".split(" "), tn = "M D H h m s w W".split(" "), nn = {
M:function() {
return this.month() + 1;
},
MMM:function(e) {
return this.lang().monthsShort(this, e);
},
MMMM:function(e) {
return this.lang().months(this, e);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(e) {
return this.lang().weekdaysMin(this, e);
},
ddd:function(e) {
return this.lang().weekdaysShort(this, e);
},
dddd:function(e) {
return this.lang().weekdays(this, e);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return c(this.year() % 100, 2);
},
YYYY:function() {
return c(this.year(), 4);
},
YYYYY:function() {
return c(this.year(), 5);
},
YYYYYY:function() {
var e = this.year(), t = e >= 0 ? "+" :"-";
return t + c(Math.abs(e), 6);
},
gg:function() {
return c(this.weekYear() % 100, 2);
},
gggg:function() {
return c(this.weekYear(), 4);
},
ggggg:function() {
return c(this.weekYear(), 5);
},
GG:function() {
return c(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return c(this.isoWeekYear(), 4);
},
GGGGG:function() {
return c(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return v(this.milliseconds() / 100);
},
SS:function() {
return c(v(this.milliseconds() / 10), 2);
},
SSS:function() {
return c(this.milliseconds(), 3);
},
SSSS:function() {
return c(this.milliseconds(), 3);
},
Z:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + c(v(e / 60), 2) + ":" + c(v(e) % 60, 2);
},
ZZ:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + c(v(e / 60), 2) + c(v(e) % 60, 2);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
},
Q:function() {
return this.quarter();
}
}, rn = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; en.length; ) dt = en.pop(), 
nn[dt + "o"] = r(nn[dt], dt);
for (;tn.length; ) dt = tn.pop(), nn[dt + dt] = i(nn[dt], 2);
for (nn.DDDD = i(nn.DDD, 3), l(o.prototype, {
set:function(e) {
var t, n;
for (n in e) t = e[n], "function" == typeof t ? this[n] = t :this["_" + n] = t;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(e) {
return this._months[e.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(e) {
return this._monthsShort[e.month()];
},
monthsParse:function(e) {
var t, n, i;
for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++) if (this._monthsParse[t] || (n = lt.utc([ 2e3, t ]), 
i = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(i.replace(".", ""), "i")), 
this._monthsParse[t].test(e)) return t;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(e) {
return this._weekdays[e.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(e) {
return this._weekdaysShort[e.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(e) {
return this._weekdaysMin[e.day()];
},
weekdaysParse:function(e) {
var t, n, i;
for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++) if (this._weekdaysParse[t] || (n = lt([ 2e3, 1 ]).day(t), 
i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
this._weekdaysParse[t] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(e) {
var t = this._longDateFormat[e];
return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
return e.slice(1);
}), this._longDateFormat[e] = t), t;
},
isPM:function(e) {
return "p" === (e + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(e, t, n) {
return e > 11 ? n ? "pm" :"PM" :n ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(e, t) {
var n = this._calendar[e];
return "function" == typeof n ? n.apply(t) :n;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(e, t, n, i) {
var r = this._relativeTime[n];
return "function" == typeof r ? r(e, t, n, i) :r.replace(/%d/i, e);
},
pastFuture:function(e, t) {
var n = this._relativeTime[e > 0 ? "future" :"past"];
return "function" == typeof n ? n(t) :n.replace(/%s/i, t);
},
ordinal:function(e) {
return this._ordinal.replace("%d", e);
},
_ordinal:"%d",
preparse:function(e) {
return e;
},
postformat:function(e) {
return e;
},
week:function(e) {
return X(e, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), lt = function(n, i, r, o) {
var a;
return "boolean" == typeof r && (o = r, r = e), a = {}, a._isAMomentObject = !0, 
a._i = n, a._f = i, a._l = r, a._strict = o, a._isUTC = !1, a._pf = t(), et(a);
}, lt.suppressDeprecationWarnings = !1, lt.createFromInputFallback = n("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
e._d = new Date(e._i);
}), lt.utc = function(n, i, r, o) {
var a;
return "boolean" == typeof r && (o = r, r = e), a = {}, a._isAMomentObject = !0, 
a._useUTC = !0, a._isUTC = !0, a._l = r, a._i = n, a._f = i, a._strict = o, a._pf = t(), 
et(a).utc();
}, lt.unix = function(e) {
return lt(1e3 * e);
}, lt.duration = function(e, t) {
var n, i, r, o = e, a = null;
return lt.isDuration(e) ? o = {
ms:e._milliseconds,
d:e._days,
M:e._months
} :"number" == typeof e ? (o = {}, t ? o[t] = e :o.milliseconds = e) :(a = St.exec(e)) ? (n = "-" === a[1] ? -1 :1, 
o = {
y:0,
d:v(a[gt]) * n,
h:v(a[_t]) * n,
m:v(a[yt]) * n,
s:v(a[vt]) * n,
ms:v(a[bt]) * n
}) :(a = Tt.exec(e)) && (n = "-" === a[1] ? -1 :1, r = function(e) {
var t = e && parseFloat(e.replace(",", "."));
return (isNaN(t) ? 0 :t) * n;
}, o = {
y:r(a[2]),
M:r(a[3]),
d:r(a[4]),
h:r(a[5]),
m:r(a[6]),
s:r(a[7]),
w:r(a[8])
}), i = new s(o), lt.isDuration(e) && e.hasOwnProperty("_lang") && (i._lang = e._lang), 
i;
}, lt.version = ct, lt.defaultFormat = qt, lt.momentProperties = kt, lt.updateOffset = function() {}, 
lt.lang = function(e, t) {
var n;
return e ? (t ? x(T(e), t) :null === t ? (Y(e), e = "en") :wt[e] || C(e), n = lt.duration.fn._lang = lt.fn._lang = C(e), 
n._abbr) :lt.fn._lang._abbr;
}, lt.langData = function(e) {
return e && e._lang && e._lang._abbr && (e = e._lang._abbr), C(e);
}, lt.isMoment = function(e) {
return e instanceof a || null != e && e.hasOwnProperty("_isAMomentObject");
}, lt.isDuration = function(e) {
return e instanceof s;
}, dt = rn.length - 1; dt >= 0; --dt) y(rn[dt]);
lt.normalizeUnits = function(e) {
return g(e);
}, lt.invalid = function(e) {
var t = lt.utc(0/0);
return null != e ? l(t._pf, e) :t._pf.userInvalidated = !0, t;
}, lt.parseZone = function() {
return lt.apply(null, arguments).parseZone();
}, lt.parseTwoDigitYear = function(e) {
return v(e) + (v(e) > 68 ? 1900 :2e3);
}, l(lt.fn = a.prototype, {
clone:function() {
return lt(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
var e = lt(this).utc();
return 0 < e.year() && e.year() <= 9999 ? $(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") :$(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
},
isValid:function() {
return S(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && m(this._a, (this._isUTC ? lt.utc(this._a) :lt(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return l({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(e) {
var t = $(this, e || lt.defaultFormat);
return this.lang().postformat(t);
},
add:function(e, t) {
var n;
return n = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), p(this, n, 1), 
this;
},
subtract:function(e, t) {
var n;
return n = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), p(this, n, -1), 
this;
},
diff:function(e, t, n) {
var i, r, o = D(e, this), a = 6e4 * (this.zone() - o.zone());
return t = g(t), "year" === t || "month" === t ? (i = 432e5 * (this.daysInMonth() + o.daysInMonth()), 
r = 12 * (this.year() - o.year()) + (this.month() - o.month()), r += (this - lt(this).startOf("month") - (o - lt(o).startOf("month"))) / i, 
r -= 6e4 * (this.zone() - lt(this).startOf("month").zone() - (o.zone() - lt(o).startOf("month").zone())) / i, 
"year" === t && (r /= 12)) :(i = this - o, r = "second" === t ? i / 1e3 :"minute" === t ? i / 6e4 :"hour" === t ? i / 36e5 :"day" === t ? (i - a) / 864e5 :"week" === t ? (i - a) / 6048e5 :i), 
n ? r :d(r);
},
from:function(e, t) {
return lt.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t);
},
fromNow:function(e) {
return this.from(lt(), e);
},
calendar:function() {
var e = D(lt(), this).startOf("day"), t = this.diff(e, "days", !0), n = -6 > t ? "sameElse" :-1 > t ? "lastWeek" :0 > t ? "lastDay" :1 > t ? "sameDay" :2 > t ? "nextDay" :7 > t ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(n, this));
},
isLeapYear:function() {
return M(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(e) {
var t = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != e ? (e = J(e, this.lang()), this.add({
d:e - t
})) :t;
},
month:rt("Month", !0),
startOf:function(e) {
switch (e = g(e)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === e ? this.weekday(0) :"isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), 
this;
},
endOf:function(e) {
return e = g(e), this.startOf(e).add("isoWeek" === e ? "week" :e, 1).subtract("ms", 1);
},
isAfter:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) > +lt(e).startOf(t);
},
isBefore:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) < +lt(e).startOf(t);
},
isSame:function(e, t) {
return t = t || "ms", +this.clone().startOf(t) === +D(e, this).startOf(t);
},
min:function(e) {
return e = lt.apply(null, arguments), this > e ? this :e;
},
max:function(e) {
return e = lt.apply(null, arguments), e > this ? this :e;
},
zone:function(e, t) {
var n = this._offset || 0;
return null == e ? this._isUTC ? n :this._d.getTimezoneOffset() :("string" == typeof e && (e = F(e)), 
Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, n !== e && (!t || this._changeInProgress ? p(this, lt.duration(n - e, "m"), 1, !1) :this._changeInProgress || (this._changeInProgress = !0, 
lt.updateOffset(this, !0), this._changeInProgress = null)), this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return this._tzm ? this.zone(this._tzm) :"string" == typeof this._i && this.zone(this._i), 
this;
},
hasAlignedHourOffset:function(e) {
return e = e ? lt(e).zone() :0, (this.zone() - e) % 60 === 0;
},
daysInMonth:function() {
return b(this.year(), this.month());
},
dayOfYear:function(e) {
var t = ht((lt(this).startOf("day") - lt(this).startOf("year")) / 864e5) + 1;
return null == e ? t :this.add("d", e - t);
},
quarter:function(e) {
return null == e ? Math.ceil((this.month() + 1) / 3) :this.month(3 * (e - 1) + this.month() % 3);
},
weekYear:function(e) {
var t = X(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == e ? t :this.add("y", e - t);
},
isoWeekYear:function(e) {
var t = X(this, 1, 4).year;
return null == e ? t :this.add("y", e - t);
},
week:function(e) {
var t = this.lang().week(this);
return null == e ? t :this.add("d", 7 * (e - t));
},
isoWeek:function(e) {
var t = X(this, 1, 4).week;
return null == e ? t :this.add("d", 7 * (e - t));
},
weekday:function(e) {
var t = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == e ? t :this.add("d", e - t);
},
isoWeekday:function(e) {
return null == e ? this.day() || 7 :this.day(this.day() % 7 ? e :e - 7);
},
isoWeeksInYear:function() {
return w(this.year(), 1, 4);
},
weeksInYear:function() {
var e = this._lang._week;
return w(this.year(), e.dow, e.doy);
},
get:function(e) {
return e = g(e), this[e]();
},
set:function(e, t) {
return e = g(e), "function" == typeof this[e] && this[e](t), this;
},
lang:function(t) {
return t === e ? this._lang :(this._lang = C(t), this);
}
}), lt.fn.millisecond = lt.fn.milliseconds = rt("Milliseconds", !1), lt.fn.second = lt.fn.seconds = rt("Seconds", !1), 
lt.fn.minute = lt.fn.minutes = rt("Minutes", !1), lt.fn.hour = lt.fn.hours = rt("Hours", !0), 
lt.fn.date = rt("Date", !0), lt.fn.dates = n("dates accessor is deprecated. Use date instead.", rt("Date", !0)), 
lt.fn.year = rt("FullYear", !0), lt.fn.years = n("years accessor is deprecated. Use year instead.", rt("FullYear", !0)), 
lt.fn.days = lt.fn.day, lt.fn.months = lt.fn.month, lt.fn.weeks = lt.fn.week, lt.fn.isoWeeks = lt.fn.isoWeek, 
lt.fn.quarters = lt.fn.quarter, lt.fn.toJSON = lt.fn.toISOString, l(lt.duration.fn = s.prototype, {
_bubble:function() {
var e, t, n, i, r = this._milliseconds, o = this._days, a = this._months, s = this._data;
s.milliseconds = r % 1e3, e = d(r / 1e3), s.seconds = e % 60, t = d(e / 60), s.minutes = t % 60, 
n = d(t / 60), s.hours = n % 24, o += d(n / 24), s.days = o % 30, a += d(o / 30), 
s.months = a % 12, i = d(a / 12), s.years = i;
},
weeks:function() {
return d(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12);
},
humanize:function(e) {
var t = +this, n = Q(t, !e, this.lang());
return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n);
},
add:function(e, t) {
var n = lt.duration(e, t);
return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, 
this._bubble(), this;
},
subtract:function(e, t) {
var n = lt.duration(e, t);
return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, 
this._bubble(), this;
},
get:function(e) {
return e = g(e), this[e.toLowerCase() + "s"]();
},
as:function(e) {
return e = g(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]();
},
lang:lt.fn.lang,
toIsoString:function() {
var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), i = Math.abs(this.hours()), r = Math.abs(this.minutes()), o = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (e ? e + "Y" :"") + (t ? t + "M" :"") + (n ? n + "D" :"") + (i || r || o ? "T" :"") + (i ? i + "H" :"") + (r ? r + "M" :"") + (o ? o + "S" :"") :"P0D";
}
});
for (dt in Kt) Kt.hasOwnProperty(dt) && (at(dt, Kt[dt]), ot(dt.toLowerCase()));
at("Weeks", 6048e5), lt.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, lt.lang("en", {
ordinal:function(e) {
var t = e % 10, n = 1 === v(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
}
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar-ma", {
months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar", {
months:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
monthsShort:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("bg", {
months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Днес в] LT",
nextDay:"[Утре в] LT",
nextWeek:"dddd [в] LT",
lastDay:"[Вчера в] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[В изминалата] dddd [в] LT";

case 1:
case 2:
case 4:
case 5:
return "[В изминалия] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"след %s",
past:"преди %s",
s:"няколко секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дни",
M:"месец",
MM:"%d месеца",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, n = e % 100;
return 0 === e ? e + "-ев" :0 === n ? e + "-ен" :n > 10 && 20 > n ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(t) {
function n(e, t, n) {
var i = {
mm:"munutenn",
MM:"miz",
dd:"devezh"
};
return e + " " + o(i[n], e);
}
function i(e) {
switch (r(e)) {
case 1:
case 3:
case 4:
case 5:
case 9:
return e + " bloaz";

default:
return e + " vloaz";
}
}
function r(e) {
return e > 9 ? r(e % 10) :e;
}
function o(e, t) {
return 2 === t ? a(e) :e;
}
function a(t) {
var n = {
m:"v",
b:"v",
d:"z"
};
return n[t.charAt(0)] === e ? t :n[t.charAt(0)] + t.substring(1);
}
return t.lang("br", {
months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
longDateFormat:{
LT:"h[e]mm A",
L:"DD/MM/YYYY",
LL:"D [a viz] MMMM YYYY",
LLL:"D [a viz] MMMM YYYY LT",
LLLL:"dddd, D [a viz] MMMM YYYY LT"
},
calendar:{
sameDay:"[Hiziv da] LT",
nextDay:"[Warc'hoazh da] LT",
nextWeek:"dddd [da] LT",
lastDay:"[Dec'h da] LT",
lastWeek:"dddd [paset da] LT",
sameElse:"L"
},
relativeTime:{
future:"a-benn %s",
past:"%s 'zo",
s:"un nebeud segondennoù",
m:"ur vunutenn",
mm:n,
h:"un eur",
hh:"%d eur",
d:"un devezh",
dd:n,
M:"ur miz",
MM:n,
y:"ur bloaz",
yy:i
},
ordinal:function(e) {
var t = 1 === e ? "añ" :"vet";
return e + t;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = e + " ";
switch (n) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return i += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return i += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return i += 1 === e ? "dan" :"dana";

case "MM":
return i += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return i += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("bs", {
months:"januar_februar_mart_april_maj_juni_juli_avgust_septembar_oktobar_novembar_decembar".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ca", {
months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),
weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[avui a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextDay:function() {
return "[demà a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextWeek:function() {
return "dddd [a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastDay:function() {
return "[ahir a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastWeek:function() {
return "[el] dddd [passat a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"fa %s",
s:"uns segons",
m:"un minut",
mm:"%d minuts",
h:"una hora",
hh:"%d hores",
d:"un dia",
dd:"%d dies",
M:"un mes",
MM:"%d mesos",
y:"un any",
yy:"%d anys"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e && 1 !== ~~(e / 10);
}
function n(e, n, i, r) {
var o = e + " ";
switch (i) {
case "s":
return n || r ? "pár sekund" :"pár sekundami";

case "m":
return n ? "minuta" :r ? "minutu" :"minutou";

case "mm":
return n || r ? o + (t(e) ? "minuty" :"minut") :o + "minutami";

case "h":
return n ? "hodina" :r ? "hodinu" :"hodinou";

case "hh":
return n || r ? o + (t(e) ? "hodiny" :"hodin") :o + "hodinami";

case "d":
return n || r ? "den" :"dnem";

case "dd":
return n || r ? o + (t(e) ? "dny" :"dní") :o + "dny";

case "M":
return n || r ? "měsíc" :"měsícem";

case "MM":
return n || r ? o + (t(e) ? "měsíce" :"měsíců") :o + "měsíci";

case "y":
return n || r ? "rok" :"rokem";

case "yy":
return n || r ? o + (t(e) ? "roky" :"let") :o + "lety";
}
}
var i = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), r = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
return e.lang("cs", {
months:i,
monthsShort:r,
monthsParse:function(e, t) {
var n, i = [];
for (n = 0; 12 > n; n++) i[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
return i;
}(i, r),
weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),
weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes v] LT",
nextDay:"[zítra v] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v neděli v] LT";

case 1:
case 2:
return "[v] dddd [v] LT";

case 3:
return "[ve středu v] LT";

case 4:
return "[ve čtvrtek v] LT";

case 5:
return "[v pátek v] LT";

case 6:
return "[v sobotu v] LT";
}
},
lastDay:"[včera v] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulou neděli v] LT";

case 1:
case 2:
return "[minulé] dddd [v] LT";

case 3:
return "[minulou středu v] LT";

case 4:
case 5:
return "[minulý] dddd [v] LT";

case 6:
return "[minulou sobotu v] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"před %s",
s:n,
m:n,
mm:n,
h:n,
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cv", {
months:"кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),
monthsShort:"кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),
weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),
weekdaysShort:"выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),
weekdaysMin:"вр_тн_ыт_юн_кç_эр_шм".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",
LLL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",
LLLL:"dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"
},
calendar:{
sameDay:"[Паян] LT [сехетре]",
nextDay:"[Ыран] LT [сехетре]",
lastDay:"[Ĕнер] LT [сехетре]",
nextWeek:"[Çитес] dddd LT [сехетре]",
lastWeek:"[Иртнĕ] dddd LT [сехетре]",
sameElse:"L"
},
relativeTime:{
future:function(e) {
var t = /сехет$/i.exec(e) ? "рен" :/çул$/i.exec(e) ? "тан" :"ран";
return e + t;
},
past:"%s каялла",
s:"пĕр-ик çеккунт",
m:"пĕр минут",
mm:"%d минут",
h:"пĕр сехет",
hh:"%d сехет",
d:"пĕр кун",
dd:"%d кун",
M:"пĕр уйăх",
MM:"%d уйăх",
y:"пĕр çул",
yy:"%d çул"
},
ordinal:"%d-мĕш",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cy", {
months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Heddiw am] LT",
nextDay:"[Yfory am] LT",
nextWeek:"dddd [am] LT",
lastDay:"[Ddoe am] LT",
lastWeek:"dddd [diwethaf am] LT",
sameElse:"L"
},
relativeTime:{
future:"mewn %s",
past:"%s yn àl",
s:"ychydig eiliadau",
m:"munud",
mm:"%d munud",
h:"awr",
hh:"%d awr",
d:"diwrnod",
dd:"%d diwrnod",
M:"mis",
MM:"%d mis",
y:"blwyddyn",
yy:"%d flynedd"
},
ordinal:function(e) {
var t = e, n = "", i = [ "", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed" ];
return t > 20 ? n = 40 === t || 50 === t || 60 === t || 80 === t || 100 === t ? "fed" :"ain" :t > 0 && (n = i[t]), 
e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("da", {
months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[I dag kl.] LT",
nextDay:"[I morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[I går kl.] LT",
lastWeek:"[sidste] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"%s siden",
s:"få sekunder",
m:"et minut",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dage",
M:"en måned",
MM:"%d måneder",
y:"et år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = {
m:[ "eine Minute", "einer Minute" ],
h:[ "eine Stunde", "einer Stunde" ],
d:[ "ein Tag", "einem Tag" ],
dd:[ e + " Tage", e + " Tagen" ],
M:[ "ein Monat", "einem Monat" ],
MM:[ e + " Monate", e + " Monaten" ],
y:[ "ein Jahr", "einem Jahr" ],
yy:[ e + " Jahre", e + " Jahren" ]
};
return t ? i[n][0] :i[n][1];
}
return e.lang("de", {
months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm [Uhr]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Heute um] LT",
sameElse:"L",
nextDay:"[Morgen um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gestern um] LT",
lastWeek:"[letzten] dddd [um] LT"
},
relativeTime:{
future:"in %s",
past:"vor %s",
s:"ein paar Sekunden",
m:t,
mm:"%d Minuten",
h:t,
hh:"%d Stunden",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("el", {
monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
months:function(e, t) {
return /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] :this._monthsNominativeEl[e.month()];
},
monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
meridiem:function(e, t, n) {
return e > 11 ? n ? "μμ" :"ΜΜ" :n ? "πμ" :"ΠΜ";
},
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendarEl:{
sameDay:"[Σήμερα {}] LT",
nextDay:"[Αύριο {}] LT",
nextWeek:"dddd [{}] LT",
lastDay:"[Χθες {}] LT",
lastWeek:"[την προηγούμενη] dddd [{}] LT",
sameElse:"L"
},
calendar:function(e, t) {
var n = this._calendarEl[e], i = t && t.hours();
return n.replace("{}", i % 12 === 1 ? "στη" :"στις");
},
relativeTime:{
future:"σε %s",
past:"%s πριν",
s:"δευτερόλεπτα",
m:"ένα λεπτό",
mm:"%d λεπτά",
h:"μία ώρα",
hh:"%d ώρες",
d:"μία μέρα",
dd:"%d μέρες",
M:"ένας μήνας",
MM:"%d μήνες",
y:"ένας χρόνος",
yy:"%d χρόνια"
},
ordinal:function(e) {
return e + "η";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-au", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-ca", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"YYYY-MM-DD",
LL:"D MMMM, YYYY",
LLL:"D MMMM, YYYY LT",
LLLL:"dddd, D MMMM, YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-gb", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eo", {
months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D[-an de] MMMM, YYYY",
LLL:"D[-an de] MMMM, YYYY LT",
LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"
},
meridiem:function(e, t, n) {
return e > 11 ? n ? "p.t.m." :"P.T.M." :n ? "a.t.m." :"A.T.M.";
},
calendar:{
sameDay:"[Hodiaŭ je] LT",
nextDay:"[Morgaŭ je] LT",
nextWeek:"dddd [je] LT",
lastDay:"[Hieraŭ je] LT",
lastWeek:"[pasinta] dddd [je] LT",
sameElse:"L"
},
relativeTime:{
future:"je %s",
past:"antaŭ %s",
s:"sekundoj",
m:"minuto",
mm:"%d minutoj",
h:"horo",
hh:"%d horoj",
d:"tago",
dd:"%d tagoj",
M:"monato",
MM:"%d monatoj",
y:"jaro",
yy:"%d jaroj"
},
ordinal:"%da",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
return e.lang("es", {
months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
monthsShort:function(e, i) {
return /-MMM-/.test(i) ? n[e.month()] :t[e.month()];
},
weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [del] YYYY",
LLL:"D [de] MMMM [del] YYYY LT",
LLLL:"dddd, D [de] MMMM [del] YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoy a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextDay:function() {
return "[mañana a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextWeek:function() {
return "dddd [a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastDay:function() {
return "[ayer a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastWeek:function() {
return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"hace %s",
s:"unos segundos",
m:"un minuto",
mm:"%d minutos",
h:"una hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un año",
yy:"%d años"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, i) {
var r = {
s:[ "mõne sekundi", "mõni sekund", "paar sekundit" ],
m:[ "ühe minuti", "üks minut" ],
mm:[ e + " minuti", e + " minutit" ],
h:[ "ühe tunni", "tund aega", "üks tund" ],
hh:[ e + " tunni", e + " tundi" ],
d:[ "ühe päeva", "üks päev" ],
M:[ "kuu aja", "kuu aega", "üks kuu" ],
MM:[ e + " kuu", e + " kuud" ],
y:[ "ühe aasta", "aasta", "üks aasta" ],
yy:[ e + " aasta", e + " aastat" ]
};
return t ? r[n][2] ? r[n][2] :r[n][1] :i ? r[n][0] :r[n][1];
}
return e.lang("et", {
months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
weekdaysShort:"P_E_T_K_N_R_L".split("_"),
weekdaysMin:"P_E_T_K_N_R_L".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Täna,] LT",
nextDay:"[Homme,] LT",
nextWeek:"[Järgmine] dddd LT",
lastDay:"[Eile,] LT",
lastWeek:"[Eelmine] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s pärast",
past:"%s tagasi",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:"%d päeva",
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eu", {
months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),
weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY[ko] MMMM[ren] D[a]",
LLL:"YYYY[ko] MMMM[ren] D[a] LT",
LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",
l:"YYYY-M-D",
ll:"YYYY[ko] MMM D[a]",
lll:"YYYY[ko] MMM D[a] LT",
llll:"ddd, YYYY[ko] MMM D[a] LT"
},
calendar:{
sameDay:"[gaur] LT[etan]",
nextDay:"[bihar] LT[etan]",
nextWeek:"dddd LT[etan]",
lastDay:"[atzo] LT[etan]",
lastWeek:"[aurreko] dddd LT[etan]",
sameElse:"L"
},
relativeTime:{
future:"%s barru",
past:"duela %s",
s:"segundo batzuk",
m:"minutu bat",
mm:"%d minutu",
h:"ordu bat",
hh:"%d ordu",
d:"egun bat",
dd:"%d egun",
M:"hilabete bat",
MM:"%d hilabete",
y:"urte bat",
yy:"%d urte"
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"۱",
2:"۲",
3:"۳",
4:"۴",
5:"۵",
6:"۶",
7:"۷",
8:"۸",
9:"۹",
0:"۰"
}, n = {
"۱":"1",
"۲":"2",
"۳":"3",
"۴":"4",
"۵":"5",
"۶":"6",
"۷":"7",
"۸":"8",
"۹":"9",
"۰":"0"
};
return e.lang("fa", {
months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
meridiem:function(e) {
return 12 > e ? "قبل از ظهر" :"بعد از ظهر";
},
calendar:{
sameDay:"[امروز ساعت] LT",
nextDay:"[فردا ساعت] LT",
nextWeek:"dddd [ساعت] LT",
lastDay:"[دیروز ساعت] LT",
lastWeek:"dddd [پیش] [ساعت] LT",
sameElse:"L"
},
relativeTime:{
future:"در %s",
past:"%s پیش",
s:"چندین ثانیه",
m:"یک دقیقه",
mm:"%d دقیقه",
h:"یک ساعت",
hh:"%d ساعت",
d:"یک روز",
dd:"%d روز",
M:"یک ماه",
MM:"%d ماه",
y:"یک سال",
yy:"%d سال"
},
preparse:function(e) {
return e.replace(/[۰-۹]/g, function(e) {
return n[e];
}).replace(/،/g, ",");
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
}).replace(/,/g, "،");
},
ordinal:"%dم",
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, i, r) {
var o = "";
switch (i) {
case "s":
return r ? "muutaman sekunnin" :"muutama sekunti";

case "m":
return r ? "minuutin" :"minuutti";

case "mm":
o = r ? "minuutin" :"minuuttia";
break;

case "h":
return r ? "tunnin" :"tunti";

case "hh":
o = r ? "tunnin" :"tuntia";
break;

case "d":
return r ? "päivän" :"päivä";

case "dd":
o = r ? "päivän" :"päivää";
break;

case "M":
return r ? "kuukauden" :"kuukausi";

case "MM":
o = r ? "kuukauden" :"kuukautta";
break;

case "y":
return r ? "vuoden" :"vuosi";

case "yy":
o = r ? "vuoden" :"vuotta";
}
return o = n(e, r) + " " + o;
}
function n(e, t) {
return 10 > e ? t ? r[e] :i[e] :e;
}
var i = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), r = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", i[7], i[8], i[9] ];
return e.lang("fi", {
months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),
weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD.MM.YYYY",
LL:"Do MMMM[ta] YYYY",
LLL:"Do MMMM[ta] YYYY, [klo] LT",
LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",
l:"D.M.YYYY",
ll:"Do MMM YYYY",
lll:"Do MMM YYYY, [klo] LT",
llll:"ddd, Do MMM YYYY, [klo] LT"
},
calendar:{
sameDay:"[tänään] [klo] LT",
nextDay:"[huomenna] [klo] LT",
nextWeek:"dddd [klo] LT",
lastDay:"[eilen] [klo] LT",
lastWeek:"[viime] dddd[na] [klo] LT",
sameElse:"L"
},
relativeTime:{
future:"%s päästä",
past:"%s sitten",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fo", {
months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),
weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[Í dag kl.] LT",
nextDay:"[Í morgin kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[Í gjár kl.] LT",
lastWeek:"[síðstu] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"um %s",
past:"%s síðani",
s:"fá sekund",
m:"ein minutt",
mm:"%d minuttir",
h:"ein tími",
hh:"%d tímar",
d:"ein dagur",
dd:"%d dagar",
M:"ein mánaði",
MM:"%d mánaðir",
y:"eitt ár",
yy:"%d ár"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr-ca", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("gl", {
months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoxe " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextDay:function() {
return "[mañá " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextWeek:function() {
return "dddd [" + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
lastDay:function() {
return "[onte " + (1 !== this.hours() ? "á" :"a") + "] LT";
},
lastWeek:function() {
return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:function(e) {
return "uns segundos" === e ? "nuns segundos" :"en " + e;
},
past:"hai %s",
s:"uns segundos",
m:"un minuto",
mm:"%d minutos",
h:"unha hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("he", {
months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [ב]MMMM YYYY",
LLL:"D [ב]MMMM YYYY LT",
LLLL:"dddd, D [ב]MMMM YYYY LT",
l:"D/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[היום ב־]LT",
nextDay:"[מחר ב־]LT",
nextWeek:"dddd [בשעה] LT",
lastDay:"[אתמול ב־]LT",
lastWeek:"[ביום] dddd [האחרון בשעה] LT",
sameElse:"L"
},
relativeTime:{
future:"בעוד %s",
past:"לפני %s",
s:"מספר שניות",
m:"דקה",
mm:"%d דקות",
h:"שעה",
hh:function(e) {
return 2 === e ? "שעתיים" :e + " שעות";
},
d:"יום",
dd:function(e) {
return 2 === e ? "יומיים" :e + " ימים";
},
M:"חודש",
MM:function(e) {
return 2 === e ? "חודשיים" :e + " חודשים";
},
y:"שנה",
yy:function(e) {
return 2 === e ? "שנתיים" :e + " שנים";
}
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("hi", {
months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[कल] LT",
nextWeek:"dddd, LT",
lastDay:"[कल] LT",
lastWeek:"[पिछले] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s में",
past:"%s पहले",
s:"कुछ ही क्षण",
m:"एक मिनट",
mm:"%d मिनट",
h:"एक घंटा",
hh:"%d घंटे",
d:"एक दिन",
dd:"%d दिन",
M:"एक महीने",
MM:"%d महीने",
y:"एक वर्ष",
yy:"%d वर्ष"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात" :10 > e ? "सुबह" :17 > e ? "दोपहर" :20 > e ? "शाम" :"रात";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = e + " ";
switch (n) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return i += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return i += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return i += 1 === e ? "dan" :"dana";

case "MM":
return i += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return i += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("hr", {
months:"sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
monthsShort:"sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, i) {
var r = e;
switch (n) {
case "s":
return i || t ? "néhány másodperc" :"néhány másodperce";

case "m":
return "egy" + (i || t ? " perc" :" perce");

case "mm":
return r + (i || t ? " perc" :" perce");

case "h":
return "egy" + (i || t ? " óra" :" órája");

case "hh":
return r + (i || t ? " óra" :" órája");

case "d":
return "egy" + (i || t ? " nap" :" napja");

case "dd":
return r + (i || t ? " nap" :" napja");

case "M":
return "egy" + (i || t ? " hónap" :" hónapja");

case "MM":
return r + (i || t ? " hónap" :" hónapja");

case "y":
return "egy" + (i || t ? " év" :" éve");

case "yy":
return r + (i || t ? " év" :" éve");
}
return "";
}
function n(e) {
return (e ? "" :"[múlt] ") + "[" + i[this.day()] + "] LT[-kor]";
}
var i = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
return e.lang("hu", {
months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),
weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),
longDateFormat:{
LT:"H:mm",
L:"YYYY.MM.DD.",
LL:"YYYY. MMMM D.",
LLL:"YYYY. MMMM D., LT",
LLLL:"YYYY. MMMM D., dddd LT"
},
meridiem:function(e, t, n) {
return 12 > e ? n === !0 ? "de" :"DE" :n === !0 ? "du" :"DU";
},
calendar:{
sameDay:"[ma] LT[-kor]",
nextDay:"[holnap] LT[-kor]",
nextWeek:function() {
return n.call(this, !0);
},
lastDay:"[tegnap] LT[-kor]",
lastWeek:function() {
return n.call(this, !1);
},
sameElse:"L"
},
relativeTime:{
future:"%s múlva",
past:"%s",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = {
nominative:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),
accusative:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")
}, i = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[i][e.month()];
}
function n(e) {
var t = "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");
return t[e.month()];
}
function i(e) {
var t = "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");
return t[e.day()];
}
return e.lang("hy-am", {
months:t,
monthsShort:n,
weekdays:i,
weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY թ.",
LLL:"D MMMM YYYY թ., LT",
LLLL:"dddd, D MMMM YYYY թ., LT"
},
calendar:{
sameDay:"[այսօր] LT",
nextDay:"[վաղը] LT",
lastDay:"[երեկ] LT",
nextWeek:function() {
return "dddd [օրը ժամը] LT";
},
lastWeek:function() {
return "[անցած] dddd [օրը ժամը] LT";
},
sameElse:"L"
},
relativeTime:{
future:"%s հետո",
past:"%s առաջ",
s:"մի քանի վայրկյան",
m:"րոպե",
mm:"%d րոպե",
h:"ժամ",
hh:"%d ժամ",
d:"օր",
dd:"%d օր",
M:"ամիս",
MM:"%d ամիս",
y:"տարի",
yy:"%d տարի"
},
meridiem:function(e) {
return 4 > e ? "գիշերվա" :12 > e ? "առավոտվա" :17 > e ? "ցերեկվա" :"երեկոյան";
},
ordinal:function(e, t) {
switch (t) {
case "DDD":
case "w":
case "W":
case "DDDo":
return 1 === e ? e + "-ին" :e + "-րդ";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("id", {
months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "siang" :19 > e ? "sore" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Besok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kemarin pukul] LT",
lastWeek:"dddd [lalu pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lalu",
s:"beberapa detik",
m:"semenit",
mm:"%d menit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e % 100 === 11 ? !0 :e % 10 === 1 ? !1 :!0;
}
function n(e, n, i, r) {
var o = e + " ";
switch (i) {
case "s":
return n || r ? "nokkrar sekúndur" :"nokkrum sekúndum";

case "m":
return n ? "mínúta" :"mínútu";

case "mm":
return t(e) ? o + (n || r ? "mínútur" :"mínútum") :n ? o + "mínúta" :o + "mínútu";

case "hh":
return t(e) ? o + (n || r ? "klukkustundir" :"klukkustundum") :o + "klukkustund";

case "d":
return n ? "dagur" :r ? "dag" :"degi";

case "dd":
return t(e) ? n ? o + "dagar" :o + (r ? "daga" :"dögum") :n ? o + "dagur" :o + (r ? "dag" :"degi");

case "M":
return n ? "mánuður" :r ? "mánuð" :"mánuði";

case "MM":
return t(e) ? n ? o + "mánuðir" :o + (r ? "mánuði" :"mánuðum") :n ? o + "mánuður" :o + (r ? "mánuð" :"mánuði");

case "y":
return n || r ? "ár" :"ári";

case "yy":
return t(e) ? o + (n || r ? "ár" :"árum") :o + (n || r ? "ár" :"ári");
}
}
return e.lang("is", {
months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),
weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd, D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[í dag kl.] LT",
nextDay:"[á morgun kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[í gær kl.] LT",
lastWeek:"[síðasta] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"eftir %s",
past:"fyrir %s síðan",
s:n,
m:n,
mm:n,
h:"klukkustund",
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("it", {
months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Oggi alle] LT",
nextDay:"[Domani alle] LT",
nextWeek:"dddd [alle] LT",
lastDay:"[Ieri alle] LT",
lastWeek:"[lo scorso] dddd [alle] LT",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return (/^[0-9].+$/.test(e) ? "tra" :"in") + " " + e;
},
past:"%s fa",
s:"alcuni secondi",
m:"un minuto",
mm:"%d minuti",
h:"un'ora",
hh:"%d ore",
d:"un giorno",
dd:"%d giorni",
M:"un mese",
MM:"%d mesi",
y:"un anno",
yy:"%d anni"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ja", {
months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
weekdaysShort:"日_月_火_水_木_金_土".split("_"),
weekdaysMin:"日_月_火_水_木_金_土".split("_"),
longDateFormat:{
LT:"Ah時m分",
L:"YYYY/MM/DD",
LL:"YYYY年M月D日",
LLL:"YYYY年M月D日LT",
LLLL:"YYYY年M月D日LT dddd"
},
meridiem:function(e) {
return 12 > e ? "午前" :"午後";
},
calendar:{
sameDay:"[今日] LT",
nextDay:"[明日] LT",
nextWeek:"[来週]dddd LT",
lastDay:"[昨日] LT",
lastWeek:"[前週]dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s後",
past:"%s前",
s:"数秒",
m:"1分",
mm:"%d分",
h:"1時間",
hh:"%d時間",
d:"1日",
dd:"%d日",
M:"1ヶ月",
MM:"%dヶ月",
y:"1年",
yy:"%d年"
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = {
nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
}, i = /D[oD] *MMMM?/.test(t) ? "accusative" :"nominative";
return n[i][e.month()];
}
function n(e, t) {
var n = {
nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")
}, i = /(წინა|შემდეგ)/.test(t) ? "accusative" :"nominative";
return n[i][e.day()];
}
return e.lang("ka", {
months:t,
monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
weekdays:n,
weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[დღეს] LT[-ზე]",
nextDay:"[ხვალ] LT[-ზე]",
lastDay:"[გუშინ] LT[-ზე]",
nextWeek:"[შემდეგ] dddd LT[-ზე]",
lastWeek:"[წინა] dddd LT-ზე",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return /(წამი|წუთი|საათი|წელი)/.test(e) ? e.replace(/ი$/, "ში") :e + "ში";
},
past:function(e) {
return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") :/წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") :void 0;
},
s:"რამდენიმე წამი",
m:"წუთი",
mm:"%d წუთი",
h:"საათი",
hh:"%d საათი",
d:"დღე",
dd:"%d დღე",
M:"თვე",
MM:"%d თვე",
y:"წელი",
yy:"%d წელი"
},
ordinal:function(e) {
return 0 === e ? e :1 === e ? e + "-ლი" :20 > e || 100 >= e && e % 20 === 0 || e % 100 === 0 ? "მე-" + e :e + "-ე";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("km", {
months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[ថ្ងៃនៈ ម៉ោង] LT",
nextDay:"[ស្អែក ម៉ោង] LT",
nextWeek:"dddd [ម៉ោង] LT",
lastDay:"[ម្សិលមិញ ម៉ោង] LT",
lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
sameElse:"L"
},
relativeTime:{
future:"%sទៀត",
past:"%sមុន",
s:"ប៉ុន្មានវិនាទី",
m:"មួយនាទី",
mm:"%d នាទី",
h:"មួយម៉ោង",
hh:"%d ម៉ោង",
d:"មួយថ្ងៃ",
dd:"%d ថ្ងៃ",
M:"មួយខែ",
MM:"%d ខែ",
y:"មួយឆ្នាំ",
yy:"%d ឆ្នាំ"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ko", {
months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
weekdaysShort:"일_월_화_수_목_금_토".split("_"),
weekdaysMin:"일_월_화_수_목_금_토".split("_"),
longDateFormat:{
LT:"A h시 mm분",
L:"YYYY.MM.DD",
LL:"YYYY년 MMMM D일",
LLL:"YYYY년 MMMM D일 LT",
LLLL:"YYYY년 MMMM D일 dddd LT"
},
meridiem:function(e) {
return 12 > e ? "오전" :"오후";
},
calendar:{
sameDay:"오늘 LT",
nextDay:"내일 LT",
nextWeek:"dddd LT",
lastDay:"어제 LT",
lastWeek:"지난주 dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s 후",
past:"%s 전",
s:"몇초",
ss:"%d초",
m:"일분",
mm:"%d분",
h:"한시간",
hh:"%d시간",
d:"하루",
dd:"%d일",
M:"한달",
MM:"%d달",
y:"일년",
yy:"%d년"
},
ordinal:"%d일",
meridiemParse:/(오전|오후)/,
isPM:function(e) {
return "오후" === e;
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = {
m:[ "eng Minutt", "enger Minutt" ],
h:[ "eng Stonn", "enger Stonn" ],
d:[ "een Dag", "engem Dag" ],
dd:[ e + " Deeg", e + " Deeg" ],
M:[ "ee Mount", "engem Mount" ],
MM:[ e + " Méint", e + " Méint" ],
y:[ "ee Joer", "engem Joer" ],
yy:[ e + " Joer", e + " Joer" ]
};
return t ? i[n][0] :i[n][1];
}
function n(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "a " + e :"an " + e;
}
function i(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "viru " + e :"virun " + e;
}
function r() {
var e = this.format("d");
return o(e) ? "[Leschte] dddd [um] LT" :"[Leschten] dddd [um] LT";
}
function o(e) {
switch (e = parseInt(e, 10)) {
case 0:
case 1:
case 3:
case 5:
case 6:
return !0;

default:
return !1;
}
}
function a(e) {
if (e = parseInt(e, 10), isNaN(e)) return !1;
if (0 > e) return !0;
if (10 > e) return e >= 4 && 7 >= e ? !0 :!1;
if (100 > e) {
var t = e % 10, n = e / 10;
return a(0 === t ? n :t);
}
if (1e4 > e) {
for (;e >= 10; ) e /= 10;
return a(e);
}
return e /= 1e3, a(e);
}
return e.lang("lb", {
months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"H:mm [Auer]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Haut um] LT",
sameElse:"L",
nextDay:"[Muer um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gëschter um] LT",
lastWeek:r
},
relativeTime:{
future:n,
past:i,
s:"e puer Sekonnen",
m:t,
mm:"%d Minutten",
h:t,
hh:"%d Stonnen",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, i) {
return t ? "kelios sekundės" :i ? "kelių sekundžių" :"kelias sekundes";
}
function n(e, t, n, i) {
return t ? r(n)[0] :i ? r(n)[1] :r(n)[2];
}
function i(e) {
return e % 10 === 0 || e > 10 && 20 > e;
}
function r(e) {
return s[e].split("_");
}
function o(e, t, o, a) {
var s = e + " ";
return 1 === e ? s + n(e, t, o[0], a) :t ? s + (i(e) ? r(o)[1] :r(o)[0]) :a ? s + r(o)[1] :s + (i(e) ? r(o)[1] :r(o)[2]);
}
function a(e, t) {
var n = -1 === t.indexOf("dddd HH:mm"), i = l[e.weekday()];
return n ? i :i.substring(0, i.length - 2) + "į";
}
var s = {
m:"minutė_minutės_minutę",
mm:"minutės_minučių_minutes",
h:"valanda_valandos_valandą",
hh:"valandos_valandų_valandas",
d:"diena_dienos_dieną",
dd:"dienos_dienų_dienas",
M:"mėnuo_mėnesio_mėnesį",
MM:"mėnesiai_mėnesių_mėnesius",
y:"metai_metų_metus",
yy:"metai_metų_metus"
}, l = "pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");
return e.lang("lt", {
months:"sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
weekdays:a,
weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY [m.] MMMM D [d.]",
LLL:"YYYY [m.] MMMM D [d.], LT [val.]",
LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",
l:"YYYY-MM-DD",
ll:"YYYY [m.] MMMM D [d.]",
lll:"YYYY [m.] MMMM D [d.], LT [val.]",
llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"
},
calendar:{
sameDay:"[Šiandien] LT",
nextDay:"[Rytoj] LT",
nextWeek:"dddd LT",
lastDay:"[Vakar] LT",
lastWeek:"[Praėjusį] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"po %s",
past:"prieš %s",
s:t,
m:n,
mm:o,
h:n,
hh:o,
d:n,
dd:o,
M:n,
MM:o,
y:n,
yy:o
},
ordinal:function(e) {
return e + "-oji";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = e.split("_");
return n ? t % 10 === 1 && 11 !== t ? i[2] :i[3] :t % 10 === 1 && 11 !== t ? i[0] :i[1];
}
function n(e, n, r) {
return e + " " + t(i[r], e, n);
}
var i = {
mm:"minūti_minūtes_minūte_minūtes",
hh:"stundu_stundas_stunda_stundas",
dd:"dienu_dienas_diena_dienas",
MM:"mēnesi_mēnešus_mēnesis_mēneši",
yy:"gadu_gadus_gads_gadi"
};
return e.lang("lv", {
months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),
weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"YYYY. [gada] D. MMMM",
LLL:"YYYY. [gada] D. MMMM, LT",
LLLL:"YYYY. [gada] D. MMMM, dddd, LT"
},
calendar:{
sameDay:"[Šodien pulksten] LT",
nextDay:"[Rīt pulksten] LT",
nextWeek:"dddd [pulksten] LT",
lastDay:"[Vakar pulksten] LT",
lastWeek:"[Pagājušā] dddd [pulksten] LT",
sameElse:"L"
},
relativeTime:{
future:"%s vēlāk",
past:"%s agrāk",
s:"dažas sekundes",
m:"minūti",
mm:n,
h:"stundu",
hh:n,
d:"dienu",
dd:n,
M:"mēnesi",
MM:n,
y:"gadu",
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("mk", {
months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),
weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Денес во] LT",
nextDay:"[Утре во] LT",
nextWeek:"dddd [во] LT",
lastDay:"[Вчера во] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[Во изминатата] dddd [во] LT";

case 1:
case 2:
case 4:
case 5:
return "[Во изминатиот] dddd [во] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"после %s",
past:"пред %s",
s:"неколку секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дена",
M:"месец",
MM:"%d месеци",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, n = e % 100;
return 0 === e ? e + "-ев" :0 === n ? e + "-ен" :n > 10 && 20 > n ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ml", {
months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
longDateFormat:{
LT:"A h:mm -നു",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[ഇന്ന്] LT",
nextDay:"[നാളെ] LT",
nextWeek:"dddd, LT",
lastDay:"[ഇന്നലെ] LT",
lastWeek:"[കഴിഞ്ഞ] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s കഴിഞ്ഞ്",
past:"%s മുൻപ്",
s:"അൽപ നിമിഷങ്ങൾ",
m:"ഒരു മിനിറ്റ്",
mm:"%d മിനിറ്റ്",
h:"ഒരു മണിക്കൂർ",
hh:"%d മണിക്കൂർ",
d:"ഒരു ദിവസം",
dd:"%d ദിവസം",
M:"ഒരു മാസം",
MM:"%d മാസം",
y:"ഒരു വർഷം",
yy:"%d വർഷം"
},
meridiem:function(e) {
return 4 > e ? "രാത്രി" :12 > e ? "രാവിലെ" :17 > e ? "ഉച്ച കഴിഞ്ഞ്" :20 > e ? "വൈകുന്നേരം" :"രാത്രി";
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("mr", {
months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm वाजता",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[उद्या] LT",
nextWeek:"dddd, LT",
lastDay:"[काल] LT",
lastWeek:"[मागील] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s नंतर",
past:"%s पूर्वी",
s:"सेकंद",
m:"एक मिनिट",
mm:"%d मिनिटे",
h:"एक तास",
hh:"%d तास",
d:"एक दिवस",
dd:"%d दिवस",
M:"एक महिना",
MM:"%d महिने",
y:"एक वर्ष",
yy:"%d वर्षे"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात्री" :10 > e ? "सकाळी" :17 > e ? "दुपारी" :20 > e ? "सायंकाळी" :"रात्री";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ms-my", {
months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "tengahari" :19 > e ? "petang" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Esok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kelmarin pukul] LT",
lastWeek:"dddd [lepas pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lepas",
s:"beberapa saat",
m:"seminit",
mm:"%d minit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nb", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[i dag kl.] LT",
nextDay:"[i morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[i går kl.] LT",
lastWeek:"[forrige] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s siden",
s:"noen sekunder",
m:"ett minutt",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dager",
M:"en måned",
MM:"%d måneder",
y:"ett år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("ne", {
months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),
longDateFormat:{
LT:"Aको h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 3 > e ? "राती" :10 > e ? "बिहान" :15 > e ? "दिउँसो" :18 > e ? "बेलुका" :20 > e ? "साँझ" :"राती";
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[भोली] LT",
nextWeek:"[आउँदो] dddd[,] LT",
lastDay:"[हिजो] LT",
lastWeek:"[गएको] dddd[,] LT",
sameElse:"L"
},
relativeTime:{
future:"%sमा",
past:"%s अगाडी",
s:"केही समय",
m:"एक मिनेट",
mm:"%d मिनेट",
h:"एक घण्टा",
hh:"%d घण्टा",
d:"एक दिन",
dd:"%d दिन",
M:"एक महिना",
MM:"%d महिना",
y:"एक बर्ष",
yy:"%d बर्ष"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
return e.lang("nl", {
months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
monthsShort:function(e, i) {
return /-MMM-/.test(i) ? n[e.month()] :t[e.month()];
},
weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),
weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[vandaag om] LT",
nextDay:"[morgen om] LT",
nextWeek:"dddd [om] LT",
lastDay:"[gisteren om] LT",
lastWeek:"[afgelopen] dddd [om] LT",
sameElse:"L"
},
relativeTime:{
future:"over %s",
past:"%s geleden",
s:"een paar seconden",
m:"één minuut",
mm:"%d minuten",
h:"één uur",
hh:"%d uur",
d:"één dag",
dd:"%d dagen",
M:"één maand",
MM:"%d maanden",
y:"één jaar",
yy:"%d jaar"
},
ordinal:function(e) {
return e + (1 === e || 8 === e || e >= 20 ? "ste" :"de");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nn", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),
weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[I dag klokka] LT",
nextDay:"[I morgon klokka] LT",
nextWeek:"dddd [klokka] LT",
lastDay:"[I går klokka] LT",
lastWeek:"[Føregåande] dddd [klokka] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s sidan",
s:"nokre sekund",
m:"eit minutt",
mm:"%d minutt",
h:"ein time",
hh:"%d timar",
d:"ein dag",
dd:"%d dagar",
M:"ein månad",
MM:"%d månader",
y:"eit år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return 5 > e % 10 && e % 10 > 1 && ~~(e / 10) % 10 !== 1;
}
function n(e, n, i) {
var r = e + " ";
switch (i) {
case "m":
return n ? "minuta" :"minutę";

case "mm":
return r + (t(e) ? "minuty" :"minut");

case "h":
return n ? "godzina" :"godzinę";

case "hh":
return r + (t(e) ? "godziny" :"godzin");

case "MM":
return r + (t(e) ? "miesiące" :"miesięcy");

case "yy":
return r + (t(e) ? "lata" :"lat");
}
}
var i = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), r = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
return e.lang("pl", {
months:function(e, t) {
return /D MMMM/.test(t) ? r[e.month()] :i[e.month()];
},
monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),
weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Dziś o] LT",
nextDay:"[Jutro o] LT",
nextWeek:"[W] dddd [o] LT",
lastDay:"[Wczoraj o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[W zeszłą niedzielę o] LT";

case 3:
return "[W zeszłą środę o] LT";

case 6:
return "[W zeszłą sobotę o] LT";

default:
return "[W zeszły] dddd [o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"%s temu",
s:"kilka sekund",
m:n,
mm:n,
h:n,
hh:n,
d:"1 dzień",
dd:"%d dni",
M:"miesiąc",
MM:n,
y:"rok",
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt-br", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY [às] LT",
LLLL:"dddd, D [de] MMMM [de] YYYY [às] LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº"
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY LT",
LLLL:"dddd, D [de] MMMM [de] YYYY LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = {
mm:"minute",
hh:"ore",
dd:"zile",
MM:"luni",
yy:"ani"
}, r = " ";
return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (r = " de "), e + r + i[n];
}
return e.lang("ro", {
months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY H:mm",
LLLL:"dddd, D MMMM YYYY H:mm"
},
calendar:{
sameDay:"[azi la] LT",
nextDay:"[mâine la] LT",
nextWeek:"dddd [la] LT",
lastDay:"[ieri la] LT",
lastWeek:"[fosta] dddd [la] LT",
sameElse:"L"
},
relativeTime:{
future:"peste %s",
past:"%s în urmă",
s:"câteva secunde",
m:"un minut",
mm:t,
h:"o oră",
hh:t,
d:"o zi",
dd:t,
M:"o lună",
MM:t,
y:"un an",
yy:t
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? n[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] :n[2];
}
function n(e, n, i) {
var r = {
mm:n ? "минута_минуты_минут" :"минуту_минуты_минут",
hh:"час_часа_часов",
dd:"день_дня_дней",
MM:"месяц_месяца_месяцев",
yy:"год_года_лет"
};
return "m" === i ? n ? "минута" :"минуту" :e + " " + t(r[i], +e);
}
function i(e, t) {
var n = {
nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
}, i = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[i][e.month()];
}
function r(e, t) {
var n = {
nominative:"янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
}, i = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[i][e.month()];
}
function o(e, t) {
var n = {
nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
}, i = /\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(t) ? "accusative" :"nominative";
return n[i][e.day()];
}
return e.lang("ru", {
months:i,
monthsShort:r,
weekdays:o,
weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),
monthsParse:[ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY г.",
LLL:"D MMMM YYYY г., LT",
LLLL:"dddd, D MMMM YYYY г., LT"
},
calendar:{
sameDay:"[Сегодня в] LT",
nextDay:"[Завтра в] LT",
lastDay:"[Вчера в] LT",
nextWeek:function() {
return 2 === this.day() ? "[Во] dddd [в] LT" :"[В] dddd [в] LT";
},
lastWeek:function() {
switch (this.day()) {
case 0:
return "[В прошлое] dddd [в] LT";

case 1:
case 2:
case 4:
return "[В прошлый] dddd [в] LT";

case 3:
case 5:
case 6:
return "[В прошлую] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"через %s",
past:"%s назад",
s:"несколько секунд",
m:n,
mm:n,
h:"час",
hh:n,
d:"день",
dd:n,
M:"месяц",
MM:n,
y:"год",
yy:n
},
meridiem:function(e) {
return 4 > e ? "ночи" :12 > e ? "утра" :17 > e ? "дня" :"вечера";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
return e + "-й";

case "D":
return e + "-го";

case "w":
case "W":
return e + "-я";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e;
}
function n(e, n, i, r) {
var o = e + " ";
switch (i) {
case "s":
return n || r ? "pár sekúnd" :"pár sekundami";

case "m":
return n ? "minúta" :r ? "minútu" :"minútou";

case "mm":
return n || r ? o + (t(e) ? "minúty" :"minút") :o + "minútami";

case "h":
return n ? "hodina" :r ? "hodinu" :"hodinou";

case "hh":
return n || r ? o + (t(e) ? "hodiny" :"hodín") :o + "hodinami";

case "d":
return n || r ? "deň" :"dňom";

case "dd":
return n || r ? o + (t(e) ? "dni" :"dní") :o + "dňami";

case "M":
return n || r ? "mesiac" :"mesiacom";

case "MM":
return n || r ? o + (t(e) ? "mesiace" :"mesiacov") :o + "mesiacmi";

case "y":
return n || r ? "rok" :"rokom";

case "yy":
return n || r ? o + (t(e) ? "roky" :"rokov") :o + "rokmi";
}
}
var i = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), r = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
return e.lang("sk", {
months:i,
monthsShort:r,
monthsParse:function(e, t) {
var n, i = [];
for (n = 0; 12 > n; n++) i[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
return i;
}(i, r),
weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),
weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes o] LT",
nextDay:"[zajtra o] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v nedeľu o] LT";

case 1:
case 2:
return "[v] dddd [o] LT";

case 3:
return "[v stredu o] LT";

case 4:
return "[vo štvrtok o] LT";

case 5:
return "[v piatok o] LT";

case 6:
return "[v sobotu o] LT";
}
},
lastDay:"[včera o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulú nedeľu o] LT";

case 1:
case 2:
return "[minulý] dddd [o] LT";

case 3:
return "[minulú stredu o] LT";

case 4:
case 5:
return "[minulý] dddd [o] LT";

case 6:
return "[minulú sobotu o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pred %s",
s:n,
m:n,
mm:n,
h:n,
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var i = e + " ";
switch (n) {
case "m":
return t ? "ena minuta" :"eno minuto";

case "mm":
return i += 1 === e ? "minuta" :2 === e ? "minuti" :3 === e || 4 === e ? "minute" :"minut";

case "h":
return t ? "ena ura" :"eno uro";

case "hh":
return i += 1 === e ? "ura" :2 === e ? "uri" :3 === e || 4 === e ? "ure" :"ur";

case "dd":
return i += 1 === e ? "dan" :"dni";

case "MM":
return i += 1 === e ? "mesec" :2 === e ? "meseca" :3 === e || 4 === e ? "mesece" :"mesecev";

case "yy":
return i += 1 === e ? "leto" :2 === e ? "leti" :3 === e || 4 === e ? "leta" :"let";
}
}
return e.lang("sl", {
months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),
weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danes ob] LT",
nextDay:"[jutri ob] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v] [nedeljo] [ob] LT";

case 3:
return "[v] [sredo] [ob] LT";

case 6:
return "[v] [soboto] [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[v] dddd [ob] LT";
}
},
lastDay:"[včeraj ob] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[prejšnja] dddd [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[prejšnji] dddd [ob] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"čez %s",
past:"%s nazaj",
s:"nekaj sekund",
m:t,
mm:t,
h:t,
hh:t,
d:"en dan",
dd:t,
M:"en mesec",
MM:t,
y:"eno leto",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sq", {
months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),
meridiem:function(e) {
return 12 > e ? "PD" :"MD";
},
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Sot në] LT",
nextDay:"[Nesër në] LT",
nextWeek:"dddd [në] LT",
lastDay:"[Dje në] LT",
lastWeek:"dddd [e kaluar në] LT",
sameElse:"L"
},
relativeTime:{
future:"në %s",
past:"%s më parë",
s:"disa sekonda",
m:"një minutë",
mm:"%d minuta",
h:"një orë",
hh:"%d orë",
d:"një ditë",
dd:"%d ditë",
M:"një muaj",
MM:"%d muaj",
y:"një vit",
yy:"%d vite"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "један минут", "једне минуте" ],
mm:[ "минут", "минуте", "минута" ],
h:[ "један сат", "једног сата" ],
hh:[ "сат", "сата", "сати" ],
dd:[ "дан", "дана", "дана" ],
MM:[ "месец", "месеца", "месеци" ],
yy:[ "година", "године", "година" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, n, i) {
var r = t.words[i];
return 1 === i.length ? n ? r[0] :r[1] :e + " " + t.correctGrammaticalCase(e, r);
}
};
return e.lang("sr-cyr", {
months:[ "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар" ],
monthsShort:[ "јан.", "феб.", "мар.", "апр.", "мај", "јун", "јул", "авг.", "сеп.", "окт.", "нов.", "дец." ],
weekdays:[ "недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота" ],
weekdaysShort:[ "нед.", "пон.", "уто.", "сре.", "чет.", "пет.", "суб." ],
weekdaysMin:[ "не", "по", "ут", "ср", "че", "пе", "су" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[данас у] LT",
nextDay:"[сутра у] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[у] [недељу] [у] LT";

case 3:
return "[у] [среду] [у] LT";

case 6:
return "[у] [суботу] [у] LT";

case 1:
case 2:
case 4:
case 5:
return "[у] dddd [у] LT";
}
},
lastDay:"[јуче у] LT",
lastWeek:function() {
var e = [ "[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"пре %s",
s:"неколико секунди",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"дан",
dd:t.translate,
M:"месец",
MM:t.translate,
y:"годину",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "jedan minut", "jedne minute" ],
mm:[ "minut", "minute", "minuta" ],
h:[ "jedan sat", "jednog sata" ],
hh:[ "sat", "sata", "sati" ],
dd:[ "dan", "dana", "dana" ],
MM:[ "mesec", "meseca", "meseci" ],
yy:[ "godina", "godine", "godina" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, n, i) {
var r = t.words[i];
return 1 === i.length ? n ? r[0] :r[1] :e + " " + t.correctGrammaticalCase(e, r);
}
};
return e.lang("sr", {
months:[ "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar" ],
monthsShort:[ "jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec." ],
weekdays:[ "nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota" ],
weekdaysShort:[ "ned.", "pon.", "uto.", "sre.", "čet.", "pet.", "sub." ],
weekdaysMin:[ "ne", "po", "ut", "sr", "če", "pe", "su" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedelju] [u] LT";

case 3:
return "[u] [sredu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[juče u] LT",
lastWeek:function() {
var e = [ "[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pre %s",
s:"nekoliko sekundi",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"dan",
dd:t.translate,
M:"mesec",
MM:t.translate,
y:"godinu",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sv", {
months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),
weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Idag] LT",
nextDay:"[Imorgon] LT",
lastDay:"[Igår] LT",
nextWeek:"dddd LT",
lastWeek:"[Förra] dddd[en] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"för %s sedan",
s:"några sekunder",
m:"en minut",
mm:"%d minuter",
h:"en timme",
hh:"%d timmar",
d:"en dag",
dd:"%d dagar",
M:"en månad",
MM:"%d månader",
y:"ett år",
yy:"%d år"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "e" :1 === t ? "a" :2 === t ? "a" :3 === t ? "e" :"e";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ta", {
months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[இன்று] LT",
nextDay:"[நாளை] LT",
nextWeek:"dddd, LT",
lastDay:"[நேற்று] LT",
lastWeek:"[கடந்த வாரம்] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s இல்",
past:"%s முன்",
s:"ஒரு சில விநாடிகள்",
m:"ஒரு நிமிடம்",
mm:"%d நிமிடங்கள்",
h:"ஒரு மணி நேரம்",
hh:"%d மணி நேரம்",
d:"ஒரு நாள்",
dd:"%d நாட்கள்",
M:"ஒரு மாதம்",
MM:"%d மாதங்கள்",
y:"ஒரு வருடம்",
yy:"%d ஆண்டுகள்"
},
ordinal:function(e) {
return e + "வது";
},
meridiem:function(e) {
return e >= 6 && 10 >= e ? " காலை" :e >= 10 && 14 >= e ? " நண்பகல்" :e >= 14 && 18 >= e ? " எற்பாடு" :e >= 18 && 20 >= e ? " மாலை" :e >= 20 && 24 >= e ? " இரவு" :e >= 0 && 6 >= e ? " வைகறை" :void 0;
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("th", {
months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
longDateFormat:{
LT:"H นาฬิกา m นาที",
L:"YYYY/MM/DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY เวลา LT",
LLLL:"วันddddที่ D MMMM YYYY เวลา LT"
},
meridiem:function(e) {
return 12 > e ? "ก่อนเที่ยง" :"หลังเที่ยง";
},
calendar:{
sameDay:"[วันนี้ เวลา] LT",
nextDay:"[พรุ่งนี้ เวลา] LT",
nextWeek:"dddd[หน้า เวลา] LT",
lastDay:"[เมื่อวานนี้ เวลา] LT",
lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",
sameElse:"L"
},
relativeTime:{
future:"อีก %s",
past:"%sที่แล้ว",
s:"ไม่กี่วินาที",
m:"1 นาที",
mm:"%d นาที",
h:"1 ชั่วโมง",
hh:"%d ชั่วโมง",
d:"1 วัน",
dd:"%d วัน",
M:"1 เดือน",
MM:"%d เดือน",
y:"1 ปี",
yy:"%d ปี"
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tl-ph", {
months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"MM/D/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY LT",
LLLL:"dddd, MMMM DD, YYYY LT"
},
calendar:{
sameDay:"[Ngayon sa] LT",
nextDay:"[Bukas sa] LT",
nextWeek:"dddd [sa] LT",
lastDay:"[Kahapon sa] LT",
lastWeek:"dddd [huling linggo] LT",
sameElse:"L"
},
relativeTime:{
future:"sa loob ng %s",
past:"%s ang nakalipas",
s:"ilang segundo",
m:"isang minuto",
mm:"%d minuto",
h:"isang oras",
hh:"%d oras",
d:"isang araw",
dd:"%d araw",
M:"isang buwan",
MM:"%d buwan",
y:"isang taon",
yy:"%d taon"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"'inci",
5:"'inci",
8:"'inci",
70:"'inci",
80:"'inci",
2:"'nci",
7:"'nci",
20:"'nci",
50:"'nci",
3:"'üncü",
4:"'üncü",
100:"'üncü",
6:"'ncı",
9:"'uncu",
10:"'uncu",
30:"'uncu",
60:"'ıncı",
90:"'ıncı"
};
return e.lang("tr", {
months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[bugün saat] LT",
nextDay:"[yarın saat] LT",
nextWeek:"[haftaya] dddd [saat] LT",
lastDay:"[dün] LT",
lastWeek:"[geçen hafta] dddd [saat] LT",
sameElse:"L"
},
relativeTime:{
future:"%s sonra",
past:"%s önce",
s:"birkaç saniye",
m:"bir dakika",
mm:"%d dakika",
h:"bir saat",
hh:"%d saat",
d:"bir gün",
dd:"%d gün",
M:"bir ay",
MM:"%d ay",
y:"bir yıl",
yy:"%d yıl"
},
ordinal:function(e) {
if (0 === e) return e + "'ıncı";
var n = e % 10, i = e % 100 - n, r = e >= 100 ? 100 :null;
return e + (t[n] || t[i] || t[r]);
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm-la", {
months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[asdkh g] LT",
nextDay:"[aska g] LT",
nextWeek:"dddd [g] LT",
lastDay:"[assant g] LT",
lastWeek:"dddd [g] LT",
sameElse:"L"
},
relativeTime:{
future:"dadkh s yan %s",
past:"yan %s",
s:"imik",
m:"minuḍ",
mm:"%d minuḍ",
h:"saɛa",
hh:"%d tassaɛin",
d:"ass",
dd:"%d ossan",
M:"ayowr",
MM:"%d iyyirn",
y:"asgas",
yy:"%d isgasn"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm", {
months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",
nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",
nextWeek:"dddd [ⴴ] LT",
lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",
lastWeek:"dddd [ⴴ] LT",
sameElse:"L"
},
relativeTime:{
future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
past:"ⵢⴰⵏ %s",
s:"ⵉⵎⵉⴽ",
m:"ⵎⵉⵏⵓⴺ",
mm:"%d ⵎⵉⵏⵓⴺ",
h:"ⵙⴰⵄⴰ",
hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
d:"ⴰⵙⵙ",
dd:"%d oⵙⵙⴰⵏ",
M:"ⴰⵢoⵓⵔ",
MM:"%d ⵉⵢⵢⵉⵔⵏ",
y:"ⴰⵙⴳⴰⵙ",
yy:"%d ⵉⵙⴳⴰⵙⵏ"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? n[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] :n[2];
}
function n(e, n, i) {
var r = {
mm:"хвилина_хвилини_хвилин",
hh:"година_години_годин",
dd:"день_дні_днів",
MM:"місяць_місяці_місяців",
yy:"рік_роки_років"
};
return "m" === i ? n ? "хвилина" :"хвилину" :"h" === i ? n ? "година" :"годину" :e + " " + t(r[i], +e);
}
function i(e, t) {
var n = {
nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")
}, i = /D[oD]? *MMMM?/.test(t) ? "accusative" :"nominative";
return n[i][e.month()];
}
function r(e, t) {
var n = {
nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
}, i = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" :/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" :"nominative";
return n[i][e.day()];
}
function o(e) {
return function() {
return e + "о" + (11 === this.hours() ? "б" :"") + "] LT";
};
}
return e.lang("uk", {
months:i,
monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
weekdays:r,
weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY р.",
LLL:"D MMMM YYYY р., LT",
LLLL:"dddd, D MMMM YYYY р., LT"
},
calendar:{
sameDay:o("[Сьогодні "),
nextDay:o("[Завтра "),
lastDay:o("[Вчора "),
nextWeek:o("[У] dddd ["),
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 5:
case 6:
return o("[Минулої] dddd [").call(this);

case 1:
case 2:
case 4:
return o("[Минулого] dddd [").call(this);
}
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"%s тому",
s:"декілька секунд",
m:n,
mm:n,
h:"годину",
hh:n,
d:"день",
dd:n,
M:"місяць",
MM:n,
y:"рік",
yy:n
},
meridiem:function(e) {
return 4 > e ? "ночі" :12 > e ? "ранку" :17 > e ? "дня" :"вечора";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
case "w":
case "W":
return e + "-й";

case "D":
return e + "-го";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("uz", {
months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"D MMMM YYYY, dddd LT"
},
calendar:{
sameDay:"[Бугун соат] LT [да]",
nextDay:"[Эртага] LT [да]",
nextWeek:"dddd [куни соат] LT [да]",
lastDay:"[Кеча соат] LT [да]",
lastWeek:"[Утган] dddd [куни соат] LT [да]",
sameElse:"L"
},
relativeTime:{
future:"Якин %s ичида",
past:"Бир неча %s олдин",
s:"фурсат",
m:"бир дакика",
mm:"%d дакика",
h:"бир соат",
hh:"%d соат",
d:"бир кун",
dd:"%d кун",
M:"бир ой",
MM:"%d ой",
y:"бир йил",
yy:"%d йил"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("vi", {
months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),
weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM [năm] YYYY",
LLL:"D MMMM [năm] YYYY LT",
LLLL:"dddd, D MMMM [năm] YYYY LT",
l:"DD/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[Hôm nay lúc] LT",
nextDay:"[Ngày mai lúc] LT",
nextWeek:"dddd [tuần tới lúc] LT",
lastDay:"[Hôm qua lúc] LT",
lastWeek:"dddd [tuần rồi lúc] LT",
sameElse:"L"
},
relativeTime:{
future:"%s tới",
past:"%s trước",
s:"vài giây",
m:"một phút",
mm:"%d phút",
h:"một giờ",
hh:"%d giờ",
d:"một ngày",
dd:"%d ngày",
M:"một tháng",
MM:"%d tháng",
y:"một năm",
yy:"%d năm"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-cn", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah点mm",
L:"YYYY-MM-DD",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY-MM-DD",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var n = 100 * e + t;
return 600 > n ? "凌晨" :900 > n ? "早上" :1130 > n ? "上午" :1230 > n ? "中午" :1800 > n ? "下午" :"晚上";
},
calendar:{
sameDay:function() {
return 0 === this.minutes() ? "[今天]Ah[点整]" :"[今天]LT";
},
nextDay:function() {
return 0 === this.minutes() ? "[明天]Ah[点整]" :"[明天]LT";
},
lastDay:function() {
return 0 === this.minutes() ? "[昨天]Ah[点整]" :"[昨天]LT";
},
nextWeek:function() {
var t, n;
return t = e().startOf("week"), n = this.unix() - t.unix() >= 604800 ? "[下]" :"[本]", 
0 === this.minutes() ? n + "dddAh点整" :n + "dddAh点mm";
},
lastWeek:function() {
var t, n;
return t = e().startOf("week"), n = this.unix() < t.unix() ? "[上]" :"[本]", 0 === this.minutes() ? n + "dddAh点整" :n + "dddAh点mm";
},
sameElse:"LL"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "周";

default:
return e;
}
},
relativeTime:{
future:"%s内",
past:"%s前",
s:"几秒",
m:"1分钟",
mm:"%d分钟",
h:"1小时",
hh:"%d小时",
d:"1天",
dd:"%d天",
M:"1个月",
MM:"%d个月",
y:"1年",
yy:"%d年"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-tw", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah點mm",
L:"YYYY年MMMD日",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY年MMMD日",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var n = 100 * e + t;
return 900 > n ? "早上" :1130 > n ? "上午" :1230 > n ? "中午" :1800 > n ? "下午" :"晚上";
},
calendar:{
sameDay:"[今天]LT",
nextDay:"[明天]LT",
nextWeek:"[下]ddddLT",
lastDay:"[昨天]LT",
lastWeek:"[上]ddddLT",
sameElse:"L"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "週";

default:
return e;
}
},
relativeTime:{
future:"%s內",
past:"%s前",
s:"幾秒",
m:"一分鐘",
mm:"%d分鐘",
h:"一小時",
hh:"%d小時",
d:"一天",
dd:"%d天",
M:"一個月",
MM:"%d個月",
y:"一年",
yy:"%d年"
}
});
}), lt.lang("en"), Mt ? module.exports = lt :"function" == typeof define && define.amd ? (define("moment", function(e, t, n) {
return n.config && n.config() && n.config().noGlobal === !0 && (pt.moment = ut), 
lt;
}), st(!0)) :st();
}.call(this), function() {
var e, t;
jQuery.uaMatch = function(e) {
e = e.toLowerCase();
var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
return {
browser:t[1] || "",
version:t[2] || "0"
};
}, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, 
t.version = e.version), t.chrome ? t.webkit = !0 :t.webkit && (t.safari = !0), jQuery.browser = t, 
jQuery.sub = function() {
function e(t, n) {
return new e.fn.init(t, n);
}
jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, 
e.sub = this.sub, e.fn.init = function(n, i) {
return i && i instanceof jQuery && !(i instanceof e) && (i = e(i)), jQuery.fn.init.call(this, n, i, t);
}, e.fn.init.prototype = e.fn;
var t = e(document);
return e;
};
}(), /*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(e) {
"function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], e) :e(jQuery);
}(function(e) {
function t(e) {
return e;
}
function n(e) {
return decodeURIComponent(e.replace(r, " "));
}
function i(e) {
0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
try {
return o.json ? JSON.parse(e) :e;
} catch (t) {}
}
var r = /\+/g, o = e.cookie = function(r, a, s) {
if (void 0 !== a) {
if (s = e.extend({}, o.defaults, s), "number" == typeof s.expires) {
var l = s.expires, u = s.expires = new Date();
u.setDate(u.getDate() + l);
}
return a = o.json ? JSON.stringify(a) :String(a), document.cookie = [ encodeURIComponent(r), "=", o.raw ? a :encodeURIComponent(a), s.expires ? "; expires=" + s.expires.toUTCString() :"", s.path ? "; path=" + s.path :"", s.domain ? "; domain=" + s.domain :"", s.secure ? "; secure" :"" ].join("");
}
for (var d = o.raw ? t :n, c = document.cookie.split("; "), p = r ? void 0 :{}, h = 0, f = c.length; f > h; h++) {
var m = c[h].split("="), g = d(m.shift()), _ = d(m.join("="));
if (r && r === g) {
p = i(_);
break;
}
r || (p[g] = i(_));
}
return p;
};
o.defaults = {}, e.removeCookie = function(t, n) {
return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend(n, {
expires:-1
})), !0) :!1;
};
}), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? i / 2 * t * t + n :-i / 2 * (--t * (t - 2) - 1) + n;
},
easeInQuad:function(e, t, n, i, r) {
return i * (t /= r) * t + n;
},
easeOutQuad:function(e, t, n, i, r) {
return -i * (t /= r) * (t - 2) + n;
},
easeInOutQuad:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? i / 2 * t * t + n :-i / 2 * (--t * (t - 2) - 1) + n;
},
easeInCubic:function(e, t, n, i, r) {
return i * (t /= r) * t * t + n;
},
easeOutCubic:function(e, t, n, i, r) {
return i * ((t = t / r - 1) * t * t + 1) + n;
},
easeInOutCubic:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? i / 2 * t * t * t + n :i / 2 * ((t -= 2) * t * t + 2) + n;
},
easeInQuart:function(e, t, n, i, r) {
return i * (t /= r) * t * t * t + n;
},
easeOutQuart:function(e, t, n, i, r) {
return -i * ((t = t / r - 1) * t * t * t - 1) + n;
},
easeInOutQuart:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n :-i / 2 * ((t -= 2) * t * t * t - 2) + n;
},
easeInQuint:function(e, t, n, i, r) {
return i * (t /= r) * t * t * t * t + n;
},
easeOutQuint:function(e, t, n, i, r) {
return i * ((t = t / r - 1) * t * t * t * t + 1) + n;
},
easeInOutQuint:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n :i / 2 * ((t -= 2) * t * t * t * t + 2) + n;
},
easeInSine:function(e, t, n, i, r) {
return -i * Math.cos(t / r * (Math.PI / 2)) + i + n;
},
easeOutSine:function(e, t, n, i, r) {
return i * Math.sin(t / r * (Math.PI / 2)) + n;
},
easeInOutSine:function(e, t, n, i, r) {
return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n;
},
easeInExpo:function(e, t, n, i, r) {
return 0 == t ? n :i * Math.pow(2, 10 * (t / r - 1)) + n;
},
easeOutExpo:function(e, t, n, i, r) {
return t == r ? n + i :i * (-Math.pow(2, -10 * t / r) + 1) + n;
},
easeInOutExpo:function(e, t, n, i, r) {
return 0 == t ? n :t == r ? n + i :(t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n :i / 2 * (-Math.pow(2, -10 * --t) + 2) + n;
},
easeInCirc:function(e, t, n, i, r) {
return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n;
},
easeOutCirc:function(e, t, n, i, r) {
return i * Math.sqrt(1 - (t = t / r - 1) * t) + n;
},
easeInOutCirc:function(e, t, n, i, r) {
return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n :i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
},
easeInElastic:function(e, t, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (1 == (t /= r)) return n + i;
if (a || (a = .3 * r), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a)) + n;
},
easeOutElastic:function(e, t, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (1 == (t /= r)) return n + i;
if (a || (a = .3 * r), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - o) * Math.PI / a) + i + n;
},
easeInOutElastic:function(e, t, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (2 == (t /= r / 2)) return n + i;
if (a || (a = .3 * r * 1.5), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a) + n :s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a) * .5 + i + n;
},
easeInBack:function(e, t, n, i, r, o) {
return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n;
},
easeOutBack:function(e, t, n, i, r, o) {
return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n;
},
easeInOutBack:function(e, t, n, i, r, o) {
return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * t * t * (((o *= 1.525) + 1) * t - o) + n :i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n;
},
easeInBounce:function(e, t, n, i, r) {
return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n;
},
easeOutBounce:function(e, t, n, i, r) {
return (t /= r) < 1 / 2.75 ? 7.5625 * i * t * t + n :2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n :2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n :i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
},
easeInOutBounce:function(e, t, n, i, r) {
return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n :.5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n;
}
}), /* Javascript plotting library for jQuery, version 0.8.2-alpha.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

*/
function(e) {
e.color = {}, e.color.make = function(t, n, i, r) {
var o = {};
return o.r = t || 0, o.g = n || 0, o.b = i || 0, o.a = null != r ? r :1, o.add = function(e, t) {
for (var n = 0; n < e.length; ++n) o[e.charAt(n)] += t;
return o.normalize();
}, o.scale = function(e, t) {
for (var n = 0; n < e.length; ++n) o[e.charAt(n)] *= t;
return o.normalize();
}, o.toString = function() {
return o.a >= 1 ? "rgb(" + [ o.r, o.g, o.b ].join(",") + ")" :"rgba(" + [ o.r, o.g, o.b, o.a ].join(",") + ")";
}, o.normalize = function() {
function e(e, t, n) {
return e > t ? e :t > n ? n :t;
}
return o.r = e(0, parseInt(o.r), 255), o.g = e(0, parseInt(o.g), 255), o.b = e(0, parseInt(o.b), 255), 
o.a = e(0, o.a, 1), o;
}, o.clone = function() {
return e.color.make(o.r, o.b, o.g, o.a);
}, o.normalize();
}, e.color.extract = function(t, n) {
var i;
do {
if (i = t.css(n).toLowerCase(), "" != i && "transparent" != i) break;
t = t.parent();
} while (!e.nodeName(t.get(0), "body"));
return "rgba(0, 0, 0, 0)" == i && (i = "transparent"), e.color.parse(i);
}, e.color.parse = function(n) {
var i, r = e.color.make;
if (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return r(parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10));
if (i = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return r(parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10), parseFloat(i[4]));
if (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return r(2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3]));
if (i = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return r(2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3]), parseFloat(i[4]));
if (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return r(parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16));
if (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return r(parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16));
var o = e.trim(n).toLowerCase();
return "transparent" == o ? r(255, 255, 255, 0) :(i = t[o] || [ 0, 0, 0 ], r(i[0], i[1], i[2]));
};
var t = {
aqua:[ 0, 255, 255 ],
azure:[ 240, 255, 255 ],
beige:[ 245, 245, 220 ],
black:[ 0, 0, 0 ],
blue:[ 0, 0, 255 ],
brown:[ 165, 42, 42 ],
cyan:[ 0, 255, 255 ],
darkblue:[ 0, 0, 139 ],
darkcyan:[ 0, 139, 139 ],
darkgrey:[ 169, 169, 169 ],
darkgreen:[ 0, 100, 0 ],
darkkhaki:[ 189, 183, 107 ],
darkmagenta:[ 139, 0, 139 ],
darkolivegreen:[ 85, 107, 47 ],
darkorange:[ 255, 140, 0 ],
darkorchid:[ 153, 50, 204 ],
darkred:[ 139, 0, 0 ],
darksalmon:[ 233, 150, 122 ],
darkviolet:[ 148, 0, 211 ],
fuchsia:[ 255, 0, 255 ],
gold:[ 255, 215, 0 ],
green:[ 0, 128, 0 ],
indigo:[ 75, 0, 130 ],
khaki:[ 240, 230, 140 ],
lightblue:[ 173, 216, 230 ],
lightcyan:[ 224, 255, 255 ],
lightgreen:[ 144, 238, 144 ],
lightgrey:[ 211, 211, 211 ],
lightpink:[ 255, 182, 193 ],
lightyellow:[ 255, 255, 224 ],
lime:[ 0, 255, 0 ],
magenta:[ 255, 0, 255 ],
maroon:[ 128, 0, 0 ],
navy:[ 0, 0, 128 ],
olive:[ 128, 128, 0 ],
orange:[ 255, 165, 0 ],
pink:[ 255, 192, 203 ],
purple:[ 128, 0, 128 ],
violet:[ 128, 0, 128 ],
red:[ 255, 0, 0 ],
silver:[ 192, 192, 192 ],
white:[ 255, 255, 255 ],
yellow:[ 255, 255, 0 ]
};
}(jQuery), function(e) {
function t(t, n) {
var i = n.children("." + t)[0];
if (null == i && (i = document.createElement("canvas"), i.className = t, e(i).css({
direction:"ltr",
position:"absolute",
left:0,
top:0
}).appendTo(n), !i.getContext)) {
if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
i = window.G_vmlCanvasManager.initElement(i);
}
this.element = i;
var r = this.context = i.getContext("2d"), o = window.devicePixelRatio || 1, a = r.webkitBackingStorePixelRatio || r.mozBackingStorePixelRatio || r.msBackingStorePixelRatio || r.oBackingStorePixelRatio || r.backingStorePixelRatio || 1;
this.pixelRatio = o / a, this.resize(n.width(), n.height()), this.textContainer = null, 
this.text = {}, this._textCache = {};
}
function n(n, r, o, a) {
function s(e, t) {
t = [ gt ].concat(t);
for (var n = 0; n < e.length; ++n) e[n].apply(this, t);
}
function l() {
for (var n = {
Canvas:t
}, i = 0; i < a.length; ++i) {
var r = a[i];
r.init(gt, n), r.options && e.extend(!0, rt, r.options);
}
}
function u(t) {
e.extend(!0, rt, t), t && t.colors && (rt.colors = t.colors), null == rt.xaxis.color && (rt.xaxis.color = e.color.parse(rt.grid.color).scale("a", .22).toString()), 
null == rt.yaxis.color && (rt.yaxis.color = e.color.parse(rt.grid.color).scale("a", .22).toString()), 
null == rt.xaxis.tickColor && (rt.xaxis.tickColor = rt.grid.tickColor || rt.xaxis.color), 
null == rt.yaxis.tickColor && (rt.yaxis.tickColor = rt.grid.tickColor || rt.yaxis.color), 
null == rt.grid.borderColor && (rt.grid.borderColor = rt.grid.color), null == rt.grid.tickColor && (rt.grid.tickColor = e.color.parse(rt.grid.color).scale("a", .22).toString());
var i, r, o, a = {
style:n.css("font-style"),
size:Math.round(.8 * (+n.css("font-size").replace("px", "") || 13)),
variant:n.css("font-variant"),
weight:n.css("font-weight"),
family:n.css("font-family")
};
for (a.lineHeight = 1.15 * a.size, o = rt.xaxes.length || 1, i = 0; o > i; ++i) r = rt.xaxes[i], 
r && !r.tickColor && (r.tickColor = r.color), r = e.extend(!0, {}, rt.xaxis, r), 
rt.xaxes[i] = r, r.font && (r.font = e.extend({}, a, r.font), r.font.color || (r.font.color = r.color));
for (o = rt.yaxes.length || 1, i = 0; o > i; ++i) r = rt.yaxes[i], r && !r.tickColor && (r.tickColor = r.color), 
r = e.extend(!0, {}, rt.yaxis, r), rt.yaxes[i] = r, r.font && (r.font = e.extend({}, a, r.font), 
r.font.color || (r.font.color = r.color));
for (rt.xaxis.noTicks && null == rt.xaxis.ticks && (rt.xaxis.ticks = rt.xaxis.noTicks), 
rt.yaxis.noTicks && null == rt.yaxis.ticks && (rt.yaxis.ticks = rt.yaxis.noTicks), 
rt.x2axis && (rt.xaxes[1] = e.extend(!0, {}, rt.xaxis, rt.x2axis), rt.xaxes[1].position = "top"), 
rt.y2axis && (rt.yaxes[1] = e.extend(!0, {}, rt.yaxis, rt.y2axis), rt.yaxes[1].position = "right"), 
rt.grid.coloredAreas && (rt.grid.markings = rt.grid.coloredAreas), rt.grid.coloredAreasColor && (rt.grid.markingsColor = rt.grid.coloredAreasColor), 
rt.lines && e.extend(!0, rt.series.lines, rt.lines), rt.points && e.extend(!0, rt.series.points, rt.points), 
rt.bars && e.extend(!0, rt.series.bars, rt.bars), null != rt.shadowSize && (rt.series.shadowSize = rt.shadowSize), 
null != rt.highlightColor && (rt.series.highlightColor = rt.highlightColor), i = 0; i < rt.xaxes.length; ++i) g(dt, i + 1).options = rt.xaxes[i];
for (i = 0; i < rt.yaxes.length; ++i) g(ct, i + 1).options = rt.yaxes[i];
for (var l in mt) rt.hooks[l] && rt.hooks[l].length && (mt[l] = mt[l].concat(rt.hooks[l]));
s(mt.processOptions, [ rt ]);
}
function d(e) {
it = c(e), _(), y();
}
function c(t) {
for (var n = [], i = 0; i < t.length; ++i) {
var r = e.extend(!0, {}, rt.series);
null != t[i].data ? (r.data = t[i].data, delete t[i].data, e.extend(!0, r, t[i]), 
t[i].data = r.data) :r.data = t[i], n.push(r);
}
return n;
}
function p(e, t) {
var n = e[t + "axis"];
return "object" == typeof n && (n = n.n), "number" != typeof n && (n = 1), n;
}
function h() {
return e.grep(dt.concat(ct), function(e) {
return e;
});
}
function f(e) {
var t, n, i = {};
for (t = 0; t < dt.length; ++t) n = dt[t], n && n.used && (i["x" + n.n] = n.c2p(e.left));
for (t = 0; t < ct.length; ++t) n = ct[t], n && n.used && (i["y" + n.n] = n.c2p(e.top));
return void 0 !== i.x1 && (i.x = i.x1), void 0 !== i.y1 && (i.y = i.y1), i;
}
function m(e) {
var t, n, i, r = {};
for (t = 0; t < dt.length; ++t) if (n = dt[t], n && n.used && (i = "x" + n.n, null == e[i] && 1 == n.n && (i = "x"), 
null != e[i])) {
r.left = n.p2c(e[i]);
break;
}
for (t = 0; t < ct.length; ++t) if (n = ct[t], n && n.used && (i = "y" + n.n, null == e[i] && 1 == n.n && (i = "y"), 
null != e[i])) {
r.top = n.p2c(e[i]);
break;
}
return r;
}
function g(t, n) {
return t[n - 1] || (t[n - 1] = {
n:n,
direction:t == dt ? "x" :"y",
options:e.extend(!0, {}, t == dt ? rt.xaxis :rt.yaxis)
}), t[n - 1];
}
function _() {
var t, n = it.length, i = -1;
for (t = 0; t < it.length; ++t) {
var r = it[t].color;
null != r && (n--, "number" == typeof r && r > i && (i = r));
}
i >= n && (n = i + 1);
var o, a = [], s = rt.colors, l = s.length, u = 0;
for (t = 0; n > t; t++) o = e.color.parse(s[t % l] || "#666"), t % l == 0 && t && (u = u >= 0 ? .5 > u ? -u - .2 :0 :-u), 
a[t] = o.scale("rgb", 1 + u);
var d, c = 0;
for (t = 0; t < it.length; ++t) {
if (d = it[t], null == d.color ? (d.color = a[c].toString(), ++c) :"number" == typeof d.color && (d.color = a[d.color].toString()), 
null == d.lines.show) {
var h, f = !0;
for (h in d) if (d[h] && d[h].show) {
f = !1;
break;
}
f && (d.lines.show = !0);
}
null == d.lines.zero && (d.lines.zero = !!d.lines.fill), d.xaxis = g(dt, p(d, "x")), 
d.yaxis = g(ct, p(d, "y"));
}
}
function y() {
function t(e, t, n) {
t < e.datamin && t != -y && (e.datamin = t), n > e.datamax && n != y && (e.datamax = n);
}
var n, i, r, o, a, l, u, d, c, p, f, m, g = Number.POSITIVE_INFINITY, _ = Number.NEGATIVE_INFINITY, y = Number.MAX_VALUE;
for (e.each(h(), function(e, t) {
t.datamin = g, t.datamax = _, t.used = !1;
}), n = 0; n < it.length; ++n) a = it[n], a.datapoints = {
points:[]
}, s(mt.processRawData, [ a, a.data, a.datapoints ]);
for (n = 0; n < it.length; ++n) {
if (a = it[n], f = a.data, m = a.datapoints.format, !m) {
if (m = [], m.push({
x:!0,
number:!0,
required:!0
}), m.push({
y:!0,
number:!0,
required:!0
}), a.bars.show || a.lines.show && a.lines.fill) {
var v = !!(a.bars.show && a.bars.zero || a.lines.show && a.lines.zero);
m.push({
y:!0,
number:!0,
required:!1,
defaultValue:0,
autoscale:v
}), a.bars.horizontal && (delete m[m.length - 1].y, m[m.length - 1].x = !0);
}
a.datapoints.format = m;
}
if (null == a.datapoints.pointsize) {
a.datapoints.pointsize = m.length, u = a.datapoints.pointsize, l = a.datapoints.points;
var b = a.lines.show && a.lines.steps;
for (a.xaxis.used = a.yaxis.used = !0, i = r = 0; i < f.length; ++i, r += u) {
p = f[i];
var w = null == p;
if (!w) for (o = 0; u > o; ++o) d = p[o], c = m[o], c && (c.number && null != d && (d = +d, 
isNaN(d) ? d = null :1/0 == d ? d = y :d == -1/0 && (d = -y)), null == d && (c.required && (w = !0), 
null != c.defaultValue && (d = c.defaultValue))), l[r + o] = d;
if (w) for (o = 0; u > o; ++o) d = l[r + o], null != d && (c = m[o], c.autoscale && (c.x && t(a.xaxis, d, d), 
c.y && t(a.yaxis, d, d))), l[r + o] = null; else if (b && r > 0 && null != l[r - u] && l[r - u] != l[r] && l[r - u + 1] != l[r + 1]) {
for (o = 0; u > o; ++o) l[r + u + o] = l[r + o];
l[r + 1] = l[r - u + 1], r += u;
}
}
}
}
for (n = 0; n < it.length; ++n) a = it[n], s(mt.processDatapoints, [ a, a.datapoints ]);
for (n = 0; n < it.length; ++n) {
a = it[n], l = a.datapoints.points, u = a.datapoints.pointsize, m = a.datapoints.format;
var k = g, M = g, L = _, S = _;
for (i = 0; i < l.length; i += u) if (null != l[i]) for (o = 0; u > o; ++o) d = l[i + o], 
c = m[o], c && c.autoscale !== !1 && d != y && d != -y && (c.x && (k > d && (k = d), 
d > L && (L = d)), c.y && (M > d && (M = d), d > S && (S = d)));
if (a.bars.show) {
var T;
switch (a.bars.align) {
case "left":
T = 0;
break;

case "right":
T = -a.bars.barWidth;
break;

case "center":
T = -a.bars.barWidth / 2;
break;

default:
throw new Error("Invalid bar alignment: " + a.bars.align);
}
a.bars.horizontal ? (M += T, S += T + a.bars.barWidth) :(k += T, L += T + a.bars.barWidth);
}
t(a.xaxis, k, L), t(a.yaxis, M, S);
}
e.each(h(), function(e, t) {
t.datamin == g && (t.datamin = null), t.datamax == _ && (t.datamax = null);
});
}
function v() {
n.css("padding", 0).children(":not(.flot-base,.flot-overlay)").remove(), "static" == n.css("position") && n.css("position", "relative"), 
ot = new t("flot-base", n), at = new t("flot-overlay", n), lt = ot.context, ut = at.context, 
st = e(at.element).unbind();
var i = n.data("plot");
i && (i.shutdown(), at.clear()), n.data("plot", gt);
}
function b() {
rt.grid.hoverable && (st.mousemove(U), st.bind("mouseleave", q)), rt.grid.clickable && st.click(V), 
s(mt.bindEvents, [ st ]);
}
function w() {
yt && clearTimeout(yt), st.unbind("mousemove", U), st.unbind("mouseleave", q), st.unbind("click", V), 
s(mt.shutdown, [ st ]);
}
function k(e) {
function t(e) {
return e;
}
var n, i, r = e.options.transform || t, o = e.options.inverseTransform;
"x" == e.direction ? (n = e.scale = ht / Math.abs(r(e.max) - r(e.min)), i = Math.min(r(e.max), r(e.min))) :(n = e.scale = ft / Math.abs(r(e.max) - r(e.min)), 
n = -n, i = Math.max(r(e.max), r(e.min))), e.p2c = r == t ? function(e) {
return (e - i) * n;
} :function(e) {
return (r(e) - i) * n;
}, e.c2p = o ? function(e) {
return o(i + e / n);
} :function(e) {
return i + e / n;
};
}
function M(e) {
for (var t = e.options, n = e.ticks || [], i = t.labelWidth || 0, r = t.labelHeight || 0, o = i || "x" == e.direction ? Math.floor(ot.width / (n.length || 1)) :null, a = e.direction + "Axis " + e.direction + e.n + "Axis", s = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + a, l = t.font || "flot-tick-label tickLabel", u = 0; u < n.length; ++u) {
var d = n[u];
if (d.label) {
var c = ot.getTextInfo(s, d.label, l, null, o);
i = Math.max(i, c.width), r = Math.max(r, c.height);
}
}
e.labelWidth = t.labelWidth || i, e.labelHeight = t.labelHeight || r;
}
function L(t) {
var n, i = t.labelWidth, r = t.labelHeight, o = t.options.position, a = t.options.tickLength, s = rt.grid.axisMargin, l = rt.grid.labelMargin, u = "x" == t.direction ? dt :ct, d = e.grep(u, function(e) {
return e && e.options.position == o && e.reserveSpace;
});
e.inArray(t, d) == d.length - 1 && (s = 0), n = 0 == e.inArray(t, d), null == a && (a = n ? "full" :5), 
isNaN(+a) || (l += +a), "x" == t.direction ? (r += l, "bottom" == o ? (pt.bottom += r + s, 
t.box = {
top:ot.height - pt.bottom,
height:r
}) :(t.box = {
top:pt.top + s,
height:r
}, pt.top += r + s)) :(i += l, "left" == o ? (t.box = {
left:pt.left + s,
width:i
}, pt.left += i + s) :(pt.right += i + s, t.box = {
left:ot.width - pt.right,
width:i
})), t.position = o, t.tickLength = a, t.box.padding = l, t.innermost = n;
}
function S(e) {
"x" == e.direction ? (e.box.left = pt.left - e.labelWidth / 2, e.box.width = ot.width - pt.left - pt.right + e.labelWidth) :(e.box.top = pt.top - e.labelHeight / 2, 
e.box.height = ot.height - pt.bottom - pt.top + e.labelHeight);
}
function T() {
var t, n = rt.grid.minBorderMargin, i = {
x:0,
y:0
};
if (null == n) for (n = 0, t = 0; t < it.length; ++t) n = Math.max(n, 2 * (it[t].points.radius + it[t].points.lineWidth / 2));
i.x = i.y = Math.ceil(n), e.each(h(), function(e, t) {
var n = t.direction;
t.reserveSpace && (i[n] = Math.ceil(Math.max(i[n], ("x" == n ? t.labelWidth :t.labelHeight) / 2)));
}), pt.left = Math.max(i.x, pt.left), pt.right = Math.max(i.x, pt.right), pt.top = Math.max(i.y, pt.top), 
pt.bottom = Math.max(i.y, pt.bottom);
}
function D() {
var t, n = h(), i = rt.grid.show;
for (var r in pt) {
var o = rt.grid.margin || 0;
pt[r] = "number" == typeof o ? o :o[r] || 0;
}
s(mt.processOffset, [ pt ]);
for (var r in pt) pt[r] += "object" == typeof rt.grid.borderWidth ? i ? rt.grid.borderWidth[r] :0 :i ? rt.grid.borderWidth :0;
if (e.each(n, function(e, t) {
t.show = t.options.show, null == t.show && (t.show = t.used), t.reserveSpace = t.show || t.options.reserveSpace, 
x(t);
}), i) {
var a = e.grep(n, function(e) {
return e.reserveSpace;
});
for (e.each(a, function(e, t) {
Y(t), C(t), E(t, t.ticks), M(t);
}), t = a.length - 1; t >= 0; --t) L(a[t]);
T(), e.each(a, function(e, t) {
S(t);
});
}
ht = ot.width - pt.left - pt.right, ft = ot.height - pt.bottom - pt.top, e.each(n, function(e, t) {
k(t);
}), i && F(), R();
}
function x(e) {
var t = e.options, n = +(null != t.min ? t.min :e.datamin), i = +(null != t.max ? t.max :e.datamax), r = i - n;
if (0 == r) {
var o = 0 == i ? 1 :.01;
null == t.min && (n -= o), (null == t.max || null != t.min) && (i += o);
} else {
var a = t.autoscaleMargin;
null != a && (null == t.min && (n -= r * a, 0 > n && null != e.datamin && e.datamin >= 0 && (n = 0)), 
null == t.max && (i += r * a, i > 0 && null != e.datamax && e.datamax <= 0 && (i = 0)));
}
e.min = n, e.max = i;
}
function Y(t) {
var n, r = t.options;
n = "number" == typeof r.ticks && r.ticks > 0 ? r.ticks :.3 * Math.sqrt("x" == t.direction ? ot.width :ot.height);
var o = (t.max - t.min) / n, a = -Math.floor(Math.log(o) / Math.LN10), s = r.tickDecimals;
null != s && a > s && (a = s);
var l, u = Math.pow(10, -a), d = o / u;
if (1.5 > d ? l = 1 :3 > d ? (l = 2, d > 2.25 && (null == s || s >= a + 1) && (l = 2.5, 
++a)) :l = 7.5 > d ? 5 :10, l *= u, null != r.minTickSize && l < r.minTickSize && (l = r.minTickSize), 
t.delta = o, t.tickDecimals = Math.max(0, null != s ? s :a), t.tickSize = r.tickSize || l, 
"time" == r.mode && !t.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
if (t.tickGenerator || (t.tickGenerator = function(e) {
var t, n = [], r = i(e.min, e.tickSize), o = 0, a = Number.NaN;
do t = a, a = r + o * e.tickSize, n.push(a), ++o; while (a < e.max && a != t);
return n;
}, t.tickFormatter = function(e, t) {
var n = t.tickDecimals ? Math.pow(10, t.tickDecimals) :1, i = "" + Math.round(e * n) / n;
if (null != t.tickDecimals) {
var r = i.indexOf("."), o = -1 == r ? 0 :i.length - r - 1;
if (o < t.tickDecimals) return (o ? i :i + ".") + ("" + n).substr(1, t.tickDecimals - o);
}
return i;
}), e.isFunction(r.tickFormatter) && (t.tickFormatter = function(e, t) {
return "" + r.tickFormatter(e, t);
}), null != r.alignTicksWithAxis) {
var c = ("x" == t.direction ? dt :ct)[r.alignTicksWithAxis - 1];
if (c && c.used && c != t) {
var p = t.tickGenerator(t);
if (p.length > 0 && (null == r.min && (t.min = Math.min(t.min, p[0])), null == r.max && p.length > 1 && (t.max = Math.max(t.max, p[p.length - 1]))), 
t.tickGenerator = function(e) {
var t, n, i = [];
for (n = 0; n < c.ticks.length; ++n) t = (c.ticks[n].v - c.min) / (c.max - c.min), 
t = e.min + t * (e.max - e.min), i.push(t);
return i;
}, !t.mode && null == r.tickDecimals) {
var h = Math.max(0, -Math.floor(Math.log(t.delta) / Math.LN10) + 1), f = t.tickGenerator(t);
f.length > 1 && /\..*0$/.test((f[1] - f[0]).toFixed(h)) || (t.tickDecimals = h);
}
}
}
}
function C(t) {
var n = t.options.ticks, i = [];
null == n || "number" == typeof n && n > 0 ? i = t.tickGenerator(t) :n && (i = e.isFunction(n) ? n(t) :n);
var r, o;
for (t.ticks = [], r = 0; r < i.length; ++r) {
var a = null, s = i[r];
"object" == typeof s ? (o = +s[0], s.length > 1 && (a = s[1])) :o = +s, null == a && (a = t.tickFormatter(o, t)), 
isNaN(o) || t.ticks.push({
v:o,
label:a
});
}
}
function E(e, t) {
e.options.autoscaleMargin && t.length > 0 && (null == e.options.min && (e.min = Math.min(e.min, t[0].v)), 
null == e.options.max && t.length > 1 && (e.max = Math.max(e.max, t[t.length - 1].v)));
}
function A() {
ot.clear(), s(mt.drawBackground, [ lt ]);
var e = rt.grid;
e.show && e.backgroundColor && I(), e.show && !e.aboveData && O();
for (var t = 0; t < it.length; ++t) s(mt.drawSeries, [ lt, it[t] ]), B(it[t]);
s(mt.draw, [ lt ]), e.show && e.aboveData && O(), ot.render(), J();
}
function $(e, t) {
for (var n, i, r, o, a = h(), s = 0; s < a.length; ++s) if (n = a[s], n.direction == t && (o = t + n.n + "axis", 
e[o] || 1 != n.n || (o = t + "axis"), e[o])) {
i = e[o].from, r = e[o].to;
break;
}
if (e[o] || (n = "x" == t ? dt[0] :ct[0], i = e[t + "1"], r = e[t + "2"]), null != i && null != r && i > r) {
var l = i;
i = r, r = l;
}
return {
from:i,
to:r,
axis:n
};
}
function I() {
lt.save(), lt.translate(pt.left, pt.top), lt.fillStyle = nt(rt.grid.backgroundColor, ft, 0, "rgba(255, 255, 255, 0)"), 
lt.fillRect(0, 0, ht, ft), lt.restore();
}
function O() {
var t, n, i, r;
lt.save(), lt.translate(pt.left, pt.top);
var o = rt.grid.markings;
if (o) for (e.isFunction(o) && (n = gt.getAxes(), n.xmin = n.xaxis.min, n.xmax = n.xaxis.max, 
n.ymin = n.yaxis.min, n.ymax = n.yaxis.max, o = o(n)), t = 0; t < o.length; ++t) {
var a = o[t], s = $(a, "x"), l = $(a, "y");
null == s.from && (s.from = s.axis.min), null == s.to && (s.to = s.axis.max), null == l.from && (l.from = l.axis.min), 
null == l.to && (l.to = l.axis.max), s.to < s.axis.min || s.from > s.axis.max || l.to < l.axis.min || l.from > l.axis.max || (s.from = Math.max(s.from, s.axis.min), 
s.to = Math.min(s.to, s.axis.max), l.from = Math.max(l.from, l.axis.min), l.to = Math.min(l.to, l.axis.max), 
(s.from != s.to || l.from != l.to) && (s.from = s.axis.p2c(s.from), s.to = s.axis.p2c(s.to), 
l.from = l.axis.p2c(l.from), l.to = l.axis.p2c(l.to), s.from == s.to || l.from == l.to ? (lt.beginPath(), 
lt.strokeStyle = a.color || rt.grid.markingsColor, lt.lineWidth = a.lineWidth || rt.grid.markingsLineWidth, 
lt.moveTo(s.from, l.from), lt.lineTo(s.to, l.to), lt.stroke()) :(lt.fillStyle = a.color || rt.grid.markingsColor, 
lt.fillRect(s.from, l.to, s.to - s.from, l.from - l.to))));
}
n = h(), i = rt.grid.borderWidth;
for (var u = 0; u < n.length; ++u) {
var d, c, p, f, m = n[u], g = m.box, _ = m.tickLength;
if (m.show && 0 != m.ticks.length) {
for (lt.lineWidth = 1, "x" == m.direction ? (d = 0, c = "full" == _ ? "top" == m.position ? 0 :ft :g.top - pt.top + ("top" == m.position ? g.height :0)) :(c = 0, 
d = "full" == _ ? "left" == m.position ? 0 :ht :g.left - pt.left + ("left" == m.position ? g.width :0)), 
m.innermost || (lt.strokeStyle = m.options.color, lt.beginPath(), p = f = 0, "x" == m.direction ? p = ht + 1 :f = ft + 1, 
1 == lt.lineWidth && ("x" == m.direction ? c = Math.floor(c) + .5 :d = Math.floor(d) + .5), 
lt.moveTo(d, c), lt.lineTo(d + p, c + f), lt.stroke()), lt.strokeStyle = m.options.tickColor, 
lt.beginPath(), t = 0; t < m.ticks.length; ++t) {
var y = m.ticks[t].v;
p = f = 0, isNaN(y) || y < m.min || y > m.max || "full" == _ && ("object" == typeof i && i[m.position] > 0 || i > 0) && (y == m.min || y == m.max) || ("x" == m.direction ? (d = m.p2c(y), 
f = "full" == _ ? -ft :_, "top" == m.position && (f = -f)) :(c = m.p2c(y), p = "full" == _ ? -ht :_, 
"left" == m.position && (p = -p)), 1 == lt.lineWidth && ("x" == m.direction ? d = Math.floor(d) + .5 :c = Math.floor(c) + .5), 
lt.moveTo(d, c), lt.lineTo(d + p, c + f));
}
lt.stroke();
}
}
i && (r = rt.grid.borderColor, "object" == typeof i || "object" == typeof r ? ("object" != typeof i && (i = {
top:i,
right:i,
bottom:i,
left:i
}), "object" != typeof r && (r = {
top:r,
right:r,
bottom:r,
left:r
}), i.top > 0 && (lt.strokeStyle = r.top, lt.lineWidth = i.top, lt.beginPath(), 
lt.moveTo(0 - i.left, 0 - i.top / 2), lt.lineTo(ht, 0 - i.top / 2), lt.stroke()), 
i.right > 0 && (lt.strokeStyle = r.right, lt.lineWidth = i.right, lt.beginPath(), 
lt.moveTo(ht + i.right / 2, 0 - i.top), lt.lineTo(ht + i.right / 2, ft), lt.stroke()), 
i.bottom > 0 && (lt.strokeStyle = r.bottom, lt.lineWidth = i.bottom, lt.beginPath(), 
lt.moveTo(ht + i.right, ft + i.bottom / 2), lt.lineTo(0, ft + i.bottom / 2), lt.stroke()), 
i.left > 0 && (lt.strokeStyle = r.left, lt.lineWidth = i.left, lt.beginPath(), lt.moveTo(0 - i.left / 2, ft + i.bottom), 
lt.lineTo(0 - i.left / 2, 0), lt.stroke())) :(lt.lineWidth = i, lt.strokeStyle = rt.grid.borderColor, 
lt.strokeRect(-i / 2, -i / 2, ht + i, ft + i))), lt.restore();
}
function F() {
e.each(h(), function(e, t) {
if (t.show && 0 != t.ticks.length) {
var n, i, r, o, a, s = t.box, l = t.direction + "Axis " + t.direction + t.n + "Axis", u = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + l, d = t.options.font || "flot-tick-label tickLabel";
ot.removeText(u);
for (var c = 0; c < t.ticks.length; ++c) n = t.ticks[c], !n.label || n.v < t.min || n.v > t.max || ("x" == t.direction ? (o = "center", 
i = pt.left + t.p2c(n.v), "bottom" == t.position ? r = s.top + s.padding :(r = s.top + s.height - s.padding, 
a = "bottom")) :(a = "middle", r = pt.top + t.p2c(n.v), "left" == t.position ? (i = s.left + s.width - s.padding, 
o = "right") :i = s.left + s.padding), ot.addText(u, i, r, n.label, d, null, null, o, a));
}
});
}
function B(e) {
e.lines.show && j(e), e.bars.show && H(e), e.points.show && P(e);
}
function j(e) {
function t(e, t, n, i, r) {
var o = e.points, a = e.pointsize, s = null, l = null;
lt.beginPath();
for (var u = a; u < o.length; u += a) {
var d = o[u - a], c = o[u - a + 1], p = o[u], h = o[u + 1];
if (null != d && null != p) {
if (h >= c && c < r.min) {
if (h < r.min) continue;
d = (r.min - c) / (h - c) * (p - d) + d, c = r.min;
} else if (c >= h && h < r.min) {
if (c < r.min) continue;
p = (r.min - c) / (h - c) * (p - d) + d, h = r.min;
}
if (c >= h && c > r.max) {
if (h > r.max) continue;
d = (r.max - c) / (h - c) * (p - d) + d, c = r.max;
} else if (h >= c && h > r.max) {
if (c > r.max) continue;
p = (r.max - c) / (h - c) * (p - d) + d, h = r.max;
}
if (p >= d && d < i.min) {
if (p < i.min) continue;
c = (i.min - d) / (p - d) * (h - c) + c, d = i.min;
} else if (d >= p && p < i.min) {
if (d < i.min) continue;
h = (i.min - d) / (p - d) * (h - c) + c, p = i.min;
}
if (d >= p && d > i.max) {
if (p > i.max) continue;
c = (i.max - d) / (p - d) * (h - c) + c, d = i.max;
} else if (p >= d && p > i.max) {
if (d > i.max) continue;
h = (i.max - d) / (p - d) * (h - c) + c, p = i.max;
}
(d != s || c != l) && lt.moveTo(i.p2c(d) + t, r.p2c(c) + n), s = p, l = h, lt.lineTo(i.p2c(p) + t, r.p2c(h) + n);
}
}
lt.stroke();
}
function n(e, t, n) {
for (var i = e.points, r = e.pointsize, o = Math.min(Math.max(0, n.min), n.max), a = 0, s = !1, l = 1, u = 0, d = 0; ;) {
if (r > 0 && a > i.length + r) break;
a += r;
var c = i[a - r], p = i[a - r + l], h = i[a], f = i[a + l];
if (s) {
if (r > 0 && null != c && null == h) {
d = a, r = -r, l = 2;
continue;
}
if (0 > r && a == u + r) {
lt.fill(), s = !1, r = -r, l = 1, a = u = d + r;
continue;
}
}
if (null != c && null != h) {
if (h >= c && c < t.min) {
if (h < t.min) continue;
p = (t.min - c) / (h - c) * (f - p) + p, c = t.min;
} else if (c >= h && h < t.min) {
if (c < t.min) continue;
f = (t.min - c) / (h - c) * (f - p) + p, h = t.min;
}
if (c >= h && c > t.max) {
if (h > t.max) continue;
p = (t.max - c) / (h - c) * (f - p) + p, c = t.max;
} else if (h >= c && h > t.max) {
if (c > t.max) continue;
f = (t.max - c) / (h - c) * (f - p) + p, h = t.max;
}
if (s || (lt.beginPath(), lt.moveTo(t.p2c(c), n.p2c(o)), s = !0), p >= n.max && f >= n.max) lt.lineTo(t.p2c(c), n.p2c(n.max)), 
lt.lineTo(t.p2c(h), n.p2c(n.max)); else if (p <= n.min && f <= n.min) lt.lineTo(t.p2c(c), n.p2c(n.min)), 
lt.lineTo(t.p2c(h), n.p2c(n.min)); else {
var m = c, g = h;
f >= p && p < n.min && f >= n.min ? (c = (n.min - p) / (f - p) * (h - c) + c, p = n.min) :p >= f && f < n.min && p >= n.min && (h = (n.min - p) / (f - p) * (h - c) + c, 
f = n.min), p >= f && p > n.max && f <= n.max ? (c = (n.max - p) / (f - p) * (h - c) + c, 
p = n.max) :f >= p && f > n.max && p <= n.max && (h = (n.max - p) / (f - p) * (h - c) + c, 
f = n.max), c != m && lt.lineTo(t.p2c(m), n.p2c(p)), lt.lineTo(t.p2c(c), n.p2c(p)), 
lt.lineTo(t.p2c(h), n.p2c(f)), h != g && (lt.lineTo(t.p2c(h), n.p2c(f)), lt.lineTo(t.p2c(g), n.p2c(f)));
}
}
}
}
lt.save(), lt.translate(pt.left, pt.top), lt.lineJoin = "round";
var i = e.lines.lineWidth, r = e.shadowSize;
if (i > 0 && r > 0) {
lt.lineWidth = r, lt.strokeStyle = "rgba(0,0,0,0.1)";
var o = Math.PI / 18;
t(e.datapoints, Math.sin(o) * (i / 2 + r / 2), Math.cos(o) * (i / 2 + r / 2), e.xaxis, e.yaxis), 
lt.lineWidth = r / 2, t(e.datapoints, Math.sin(o) * (i / 2 + r / 4), Math.cos(o) * (i / 2 + r / 4), e.xaxis, e.yaxis);
}
lt.lineWidth = i, lt.strokeStyle = e.color;
var a = z(e.lines, e.color, 0, ft);
a && (lt.fillStyle = a, n(e.datapoints, e.xaxis, e.yaxis)), i > 0 && t(e.datapoints, 0, 0, e.xaxis, e.yaxis), 
lt.restore();
}
function P(e) {
function t(e, t, n, i, r, o, a, s) {
for (var l = e.points, u = e.pointsize, d = 0; d < l.length; d += u) {
var c = l[d], p = l[d + 1];
null == c || c < o.min || c > o.max || p < a.min || p > a.max || (lt.beginPath(), 
c = o.p2c(c), p = a.p2c(p) + i, "circle" == s ? lt.arc(c, p, t, 0, r ? Math.PI :2 * Math.PI, !1) :s(lt, c, p, t, r), 
lt.closePath(), n && (lt.fillStyle = n, lt.fill()), lt.stroke());
}
}
lt.save(), lt.translate(pt.left, pt.top);
var n = e.points.lineWidth, i = e.shadowSize, r = e.points.radius, o = e.points.symbol;
if (0 == n && (n = 1e-4), n > 0 && i > 0) {
var a = i / 2;
lt.lineWidth = a, lt.strokeStyle = "rgba(0,0,0,0.1)", t(e.datapoints, r, null, a + a / 2, !0, e.xaxis, e.yaxis, o), 
lt.strokeStyle = "rgba(0,0,0,0.2)", t(e.datapoints, r, null, a / 2, !0, e.xaxis, e.yaxis, o);
}
lt.lineWidth = n, lt.strokeStyle = e.color, t(e.datapoints, r, z(e.points, e.color), 0, !1, e.xaxis, e.yaxis, o), 
lt.restore();
}
function N(e, t, n, i, r, o, a, s, l, u, d, c) {
var p, h, f, m, g, _, y, v, b;
d ? (v = _ = y = !0, g = !1, p = n, h = e, m = t + i, f = t + r, p > h && (b = h, 
h = p, p = b, g = !0, _ = !1)) :(g = _ = y = !0, v = !1, p = e + i, h = e + r, f = n, 
m = t, f > m && (b = m, m = f, f = b, v = !0, y = !1)), h < s.min || p > s.max || m < l.min || f > l.max || (p < s.min && (p = s.min, 
g = !1), h > s.max && (h = s.max, _ = !1), f < l.min && (f = l.min, v = !1), m > l.max && (m = l.max, 
y = !1), p = s.p2c(p), f = l.p2c(f), h = s.p2c(h), m = l.p2c(m), a && (u.beginPath(), 
u.moveTo(p, f), u.lineTo(p, m), u.lineTo(h, m), u.lineTo(h, f), u.fillStyle = a(f, m), 
u.fill()), c > 0 && (g || _ || y || v) && (u.beginPath(), u.moveTo(p, f + o), g ? u.lineTo(p, m + o) :u.moveTo(p, m + o), 
y ? u.lineTo(h, m + o) :u.moveTo(h, m + o), _ ? u.lineTo(h, f + o) :u.moveTo(h, f + o), 
v ? u.lineTo(p, f + o) :u.moveTo(p, f + o), u.stroke()));
}
function H(e) {
function t(t, n, i, r, o, a, s) {
for (var l = t.points, u = t.pointsize, d = 0; d < l.length; d += u) null != l[d] && N(l[d], l[d + 1], l[d + 2], n, i, r, o, a, s, lt, e.bars.horizontal, e.bars.lineWidth);
}
lt.save(), lt.translate(pt.left, pt.top), lt.lineWidth = e.bars.lineWidth, lt.strokeStyle = e.color;
var n;
switch (e.bars.align) {
case "left":
n = 0;
break;

case "right":
n = -e.bars.barWidth;
break;

case "center":
n = -e.bars.barWidth / 2;
break;

default:
throw new Error("Invalid bar alignment: " + e.bars.align);
}
var i = e.bars.fill ? function(t, n) {
return z(e.bars, e.color, t, n);
} :null;
t(e.datapoints, n, n + e.bars.barWidth, 0, i, e.xaxis, e.yaxis), lt.restore();
}
function z(t, n, i, r) {
var o = t.fill;
if (!o) return null;
if (t.fillColor) return nt(t.fillColor, i, r, n);
var a = e.color.parse(n);
return a.a = "number" == typeof o ? o :.4, a.normalize(), a.toString();
}
function R() {
if (n.find(".legend").remove(), rt.legend.show) {
for (var t, i, r = [], o = [], a = !1, s = rt.legend.labelFormatter, l = 0; l < it.length; ++l) t = it[l], 
t.label && (i = s ? s(t.label, t) :t.label, i && o.push({
label:i,
color:t.color
}));
if (rt.legend.sorted) if (e.isFunction(rt.legend.sorted)) o.sort(rt.legend.sorted); else if ("reverse" == rt.legend.sorted) o.reverse(); else {
var u = "descending" != rt.legend.sorted;
o.sort(function(e, t) {
return e.label == t.label ? 0 :e.label < t.label != u ? 1 :-1;
});
}
for (var l = 0; l < o.length; ++l) {
var d = o[l];
l % rt.legend.noColumns == 0 && (a && r.push("</tr>"), r.push("<tr>"), a = !0), 
r.push('<td class="legendColorBox"><div style="border:1px solid ' + rt.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + d.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + d.label + "</td>");
}
if (a && r.push("</tr>"), 0 != r.length) {
var c = '<table style="font-size:smaller;color:' + rt.grid.color + '">' + r.join("") + "</table>";
if (null != rt.legend.container) e(rt.legend.container).html(c); else {
var p = "", h = rt.legend.position, f = rt.legend.margin;
null == f[0] && (f = [ f, f ]), "n" == h.charAt(0) ? p += "top:" + (f[1] + pt.top) + "px;" :"s" == h.charAt(0) && (p += "bottom:" + (f[1] + pt.bottom) + "px;"), 
"e" == h.charAt(1) ? p += "right:" + (f[0] + pt.right) + "px;" :"w" == h.charAt(1) && (p += "left:" + (f[0] + pt.left) + "px;");
var m = e('<div class="legend">' + c.replace('style="', 'style="position:absolute;' + p + ";") + "</div>").appendTo(n);
if (0 != rt.legend.backgroundOpacity) {
var g = rt.legend.backgroundColor;
null == g && (g = rt.grid.backgroundColor, g = g && "string" == typeof g ? e.color.parse(g) :e.color.extract(m, "background-color"), 
g.a = 1, g = g.toString());
var _ = m.children();
e('<div style="position:absolute;width:' + _.width() + "px;height:" + _.height() + "px;" + p + "background-color:" + g + ';"> </div>').prependTo(m).css("opacity", rt.legend.backgroundOpacity);
}
}
}
}
}
function W(e, t, n) {
var i, r, o, a = rt.grid.mouseActiveRadius, s = a * a + 1, l = null;
for (i = it.length - 1; i >= 0; --i) if (n(it[i])) {
var u = it[i], d = u.xaxis, c = u.yaxis, p = u.datapoints.points, h = d.c2p(e), f = c.c2p(t), m = a / d.scale, g = a / c.scale;
if (o = u.datapoints.pointsize, d.options.inverseTransform && (m = Number.MAX_VALUE), 
c.options.inverseTransform && (g = Number.MAX_VALUE), u.lines.show || u.points.show) for (r = 0; r < p.length; r += o) {
var _ = p[r], y = p[r + 1];
if (null != _ && !(_ - h > m || -m > _ - h || y - f > g || -g > y - f)) {
var v = Math.abs(d.p2c(_) - e), b = Math.abs(c.p2c(y) - t), w = v * v + b * b;
s > w && (s = w, l = [ i, r / o ]);
}
}
if (u.bars.show && !l) {
var k = "left" == u.bars.align ? 0 :-u.bars.barWidth / 2, M = k + u.bars.barWidth;
for (r = 0; r < p.length; r += o) {
var _ = p[r], y = p[r + 1], L = p[r + 2];
null != _ && (it[i].bars.horizontal ? h <= Math.max(L, _) && h >= Math.min(L, _) && f >= y + k && y + M >= f :h >= _ + k && _ + M >= h && f >= Math.min(L, y) && f <= Math.max(L, y)) && (l = [ i, r / o ]);
}
}
}
return l ? (i = l[0], r = l[1], o = it[i].datapoints.pointsize, {
datapoint:it[i].datapoints.points.slice(r * o, (r + 1) * o),
dataIndex:r,
series:it[i],
seriesIndex:i
}) :null;
}
function U(e) {
rt.grid.hoverable && G("plothover", e, function(e) {
return 0 != e.hoverable;
});
}
function q(e) {
rt.grid.hoverable && G("plothover", e, function() {
return !1;
});
}
function V(e) {
G("plotclick", e, function(e) {
return 0 != e.clickable;
});
}
function G(e, t, i) {
var r = st.offset(), o = t.pageX - r.left - pt.left, a = t.pageY - r.top - pt.top, s = f({
left:o,
top:a
});
s.pageX = t.pageX, s.pageY = t.pageY;
var l = W(o, a, i);
if (l && (l.pageX = parseInt(l.series.xaxis.p2c(l.datapoint[0]) + r.left + pt.left, 10), 
l.pageY = parseInt(l.series.yaxis.p2c(l.datapoint[1]) + r.top + pt.top, 10)), rt.grid.autoHighlight) {
for (var u = 0; u < _t.length; ++u) {
var d = _t[u];
d.auto != e || l && d.series == l.series && d.point[0] == l.datapoint[0] && d.point[1] == l.datapoint[1] || X(d.series, d.point);
}
l && Q(l.series, l.datapoint, e);
}
n.trigger(e, [ s, l ]);
}
function J() {
var e = rt.interaction.redrawOverlayInterval;
return -1 == e ? (K(), void 0) :(yt || (yt = setTimeout(K, e)), void 0);
}
function K() {
yt = null, ut.save(), at.clear(), ut.translate(pt.left, pt.top);
var e, t;
for (e = 0; e < _t.length; ++e) t = _t[e], t.series.bars.show ? tt(t.series, t.point) :et(t.series, t.point);
ut.restore(), s(mt.drawOverlay, [ ut ]);
}
function Q(e, t, n) {
if ("number" == typeof e && (e = it[e]), "number" == typeof t) {
var i = e.datapoints.pointsize;
t = e.datapoints.points.slice(i * t, i * (t + 1));
}
var r = Z(e, t);
-1 == r ? (_t.push({
series:e,
point:t,
auto:n
}), J()) :n || (_t[r].auto = !1);
}
function X(e, t) {
if (null == e && null == t) return _t = [], J(), void 0;
if ("number" == typeof e && (e = it[e]), "number" == typeof t) {
var n = e.datapoints.pointsize;
t = e.datapoints.points.slice(n * t, n * (t + 1));
}
var i = Z(e, t);
-1 != i && (_t.splice(i, 1), J());
}
function Z(e, t) {
for (var n = 0; n < _t.length; ++n) {
var i = _t[n];
if (i.series == e && i.point[0] == t[0] && i.point[1] == t[1]) return n;
}
return -1;
}
function et(t, n) {
var i = n[0], r = n[1], o = t.xaxis, a = t.yaxis, s = "string" == typeof t.highlightColor ? t.highlightColor :e.color.parse(t.color).scale("a", .5).toString();
if (!(i < o.min || i > o.max || r < a.min || r > a.max)) {
var l = t.points.radius + t.points.lineWidth / 2;
ut.lineWidth = l, ut.strokeStyle = s;
var u = 1.5 * l;
i = o.p2c(i), r = a.p2c(r), ut.beginPath(), "circle" == t.points.symbol ? ut.arc(i, r, u, 0, 2 * Math.PI, !1) :t.points.symbol(ut, i, r, u, !1), 
ut.closePath(), ut.stroke();
}
}
function tt(t, n) {
var i = "string" == typeof t.highlightColor ? t.highlightColor :e.color.parse(t.color).scale("a", .5).toString(), r = i, o = "left" == t.bars.align ? 0 :-t.bars.barWidth / 2;
ut.lineWidth = t.bars.lineWidth, ut.strokeStyle = i, N(n[0], n[1], n[2] || 0, o, o + t.bars.barWidth, 0, function() {
return r;
}, t.xaxis, t.yaxis, ut, t.bars.horizontal, t.bars.lineWidth);
}
function nt(t, n, i, r) {
if ("string" == typeof t) return t;
for (var o = lt.createLinearGradient(0, i, 0, n), a = 0, s = t.colors.length; s > a; ++a) {
var l = t.colors[a];
if ("string" != typeof l) {
var u = e.color.parse(r);
null != l.brightness && (u = u.scale("rgb", l.brightness)), null != l.opacity && (u.a *= l.opacity), 
l = u.toString();
}
o.addColorStop(a / (s - 1), l);
}
return o;
}
var it = [], rt = {
colors:[ "#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed" ],
legend:{
show:!0,
noColumns:1,
labelFormatter:null,
labelBoxBorderColor:"#ccc",
container:null,
position:"ne",
margin:5,
backgroundColor:null,
backgroundOpacity:.85,
sorted:null
},
xaxis:{
show:null,
position:"bottom",
mode:null,
font:null,
color:null,
tickColor:null,
transform:null,
inverseTransform:null,
min:null,
max:null,
autoscaleMargin:null,
ticks:null,
tickFormatter:null,
labelWidth:null,
labelHeight:null,
reserveSpace:null,
tickLength:null,
alignTicksWithAxis:null,
tickDecimals:null,
tickSize:null,
minTickSize:null
},
yaxis:{
autoscaleMargin:.02,
position:"left"
},
xaxes:[],
yaxes:[],
series:{
points:{
show:!1,
radius:3,
lineWidth:2,
fill:!0,
fillColor:"#ffffff",
symbol:"circle"
},
lines:{
lineWidth:2,
fill:!1,
fillColor:null,
steps:!1
},
bars:{
show:!1,
lineWidth:2,
barWidth:1,
fill:!0,
fillColor:null,
align:"left",
horizontal:!1,
zero:!0
},
shadowSize:3,
highlightColor:null
},
grid:{
show:!0,
aboveData:!1,
color:"#545454",
backgroundColor:null,
borderColor:null,
tickColor:null,
margin:0,
labelMargin:5,
axisMargin:8,
borderWidth:2,
minBorderMargin:null,
markings:null,
markingsColor:"#f4f4f4",
markingsLineWidth:2,
clickable:!1,
hoverable:!1,
autoHighlight:!0,
mouseActiveRadius:10
},
interaction:{
redrawOverlayInterval:1e3 / 60
},
hooks:{}
}, ot = null, at = null, st = null, lt = null, ut = null, dt = [], ct = [], pt = {
left:0,
right:0,
top:0,
bottom:0
}, ht = 0, ft = 0, mt = {
processOptions:[],
processRawData:[],
processDatapoints:[],
processOffset:[],
drawBackground:[],
drawSeries:[],
draw:[],
bindEvents:[],
drawOverlay:[],
shutdown:[]
}, gt = this;
gt.setData = d, gt.setupGrid = D, gt.draw = A, gt.getPlaceholder = function() {
return n;
}, gt.getCanvas = function() {
return ot.element;
}, gt.getPlotOffset = function() {
return pt;
}, gt.width = function() {
return ht;
}, gt.height = function() {
return ft;
}, gt.offset = function() {
var e = st.offset();
return e.left += pt.left, e.top += pt.top, e;
}, gt.getData = function() {
return it;
}, gt.getAxes = function() {
var t = {};
return e.each(dt.concat(ct), function(e, n) {
n && (t[n.direction + (1 != n.n ? n.n :"") + "axis"] = n);
}), t;
}, gt.getXAxes = function() {
return dt;
}, gt.getYAxes = function() {
return ct;
}, gt.c2p = f, gt.p2c = m, gt.getOptions = function() {
return rt;
}, gt.highlight = Q, gt.unhighlight = X, gt.triggerRedrawOverlay = J, gt.pointOffset = function(e) {
return {
left:parseInt(dt[p(e, "x") - 1].p2c(+e.x) + pt.left, 10),
top:parseInt(ct[p(e, "y") - 1].p2c(+e.y) + pt.top, 10)
};
}, gt.shutdown = w, gt.resize = function() {
var e = n.width(), t = n.height();
ot.resize(e, t), at.resize(e, t);
}, gt.hooks = mt, l(gt), u(o), v(), d(r), D(), A(), b();
var _t = [], yt = null;
}
function i(e, t) {
return t * Math.floor(e / t);
}
var r = Object.prototype.hasOwnProperty;
t.prototype.resize = function(e, t) {
if (0 >= e || 0 >= t) throw new Error("Invalid dimensions for plot, width = " + e + ", height = " + t);
var n = this.element, i = this.context, r = this.pixelRatio;
this.width != e && (n.width = e * r, n.style.width = e + "px", this.width = e), 
this.height != t && (n.height = t * r, n.style.height = t + "px", this.height = t), 
i.restore(), i.save(), i.scale(r, r);
}, t.prototype.clear = function() {
this.context.clearRect(0, 0, this.width, this.height);
}, t.prototype.render = function() {
var e = this._textCache;
for (var t in e) if (r.call(e, t)) {
var n = this.getTextLayer(t), i = e[t];
n.hide();
for (var o in i) if (r.call(i, o)) {
var a = i[o];
for (var s in a) if (r.call(a, s)) {
for (var l, u = a[s].positions, d = 0; l = u[d]; d++) l.active ? l.rendered || (n.append(l.element), 
l.rendered = !0) :(u.splice(d--, 1), l.rendered && l.element.detach());
0 == u.length && delete a[s];
}
}
n.show();
}
}, t.prototype.getTextLayer = function(t) {
var n = this.text[t];
return null == n && (null == this.textContainer && (this.textContainer = e("<div class='flot-text'></div>").css({
position:"absolute",
top:0,
left:0,
bottom:0,
right:0,
"font-size":"smaller",
color:"#545454"
}).insertAfter(this.element)), n = this.text[t] = e("<div></div>").addClass(t).css({
position:"absolute",
top:0,
left:0,
bottom:0,
right:0
}).appendTo(this.textContainer)), n;
}, t.prototype.getTextInfo = function(t, n, i, r, o) {
var a, s, l, u;
if (n = "" + n, a = "object" == typeof i ? i.style + " " + i.variant + " " + i.weight + " " + i.size + "px/" + i.lineHeight + "px " + i.family :i, 
s = this._textCache[t], null == s && (s = this._textCache[t] = {}), l = s[a], null == l && (l = s[a] = {}), 
u = l[n], null == u) {
var d = e("<div></div>").html(n).css({
position:"absolute",
"max-width":o,
top:-9999
}).appendTo(this.getTextLayer(t));
"object" == typeof i ? d.css({
font:a,
color:i.color
}) :"string" == typeof i && d.addClass(i), u = l[n] = {
width:d.outerWidth(!0),
height:d.outerHeight(!0),
element:d,
positions:[]
}, d.detach();
}
return u;
}, t.prototype.addText = function(e, t, n, i, r, o, a, s, l) {
var u = this.getTextInfo(e, i, r, o, a), d = u.positions;
"center" == s ? t -= u.width / 2 :"right" == s && (t -= u.width), "middle" == l ? n -= u.height / 2 :"bottom" == l && (n -= u.height);
for (var c, p = 0; c = d[p]; p++) if (c.x == t && c.y == n) return c.active = !0, 
void 0;
c = {
active:!0,
rendered:!1,
element:d.length ? u.element.clone() :u.element,
x:t,
y:n
}, d.push(c), c.element.css({
top:Math.round(n),
left:Math.round(t),
"text-align":s
});
}, t.prototype.removeText = function(e, t, n, i, o, a) {
if (null == i) {
var s = this._textCache[e];
if (null != s) for (var l in s) if (r.call(s, l)) {
var u = s[l];
for (var d in u) if (r.call(u, d)) for (var c, p = u[d].positions, h = 0; c = p[h]; h++) c.active = !1;
}
} else for (var c, p = this.getTextInfo(e, i, o, a).positions, h = 0; c = p[h]; h++) c.x == t && c.y == n && (c.active = !1);
}, e.plot = function(t, i, r) {
var o = new n(e(t), i, r, e.plot.plugins);
return o;
}, e.plot.version = "0.8.2-alpha", e.plot.plugins = [], e.fn.plot = function(t, n) {
return this.each(function() {
e.plot(this, t, n);
});
};
}(jQuery), /* Pretty handling of time axes.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Set axis.mode to "time" to enable. See the section "Time series data" in
API.txt for details.

*/
function(e) {
function t(e, t) {
return t * Math.floor(e / t);
}
function n(e, t, n, i) {
if ("function" == typeof e.strftime) return e.strftime(t);
var r = function(e, t) {
return e = "" + e, t = "" + (null == t ? "0" :t), 1 == e.length ? t + e :e;
}, o = [], a = !1, s = e.getHours(), l = 12 > s;
null == n && (n = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]), 
null == i && (i = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]);
var u;
u = s > 12 ? s - 12 :0 == s ? 12 :s;
for (var d = 0; d < t.length; ++d) {
var c = t.charAt(d);
if (a) {
switch (c) {
case "a":
c = "" + i[e.getDay()];
break;

case "b":
c = "" + n[e.getMonth()];
break;

case "d":
c = r(e.getDate());
break;

case "e":
c = r(e.getDate(), " ");
break;

case "h":
case "H":
c = r(s);
break;

case "I":
c = r(u);
break;

case "l":
c = r(u, " ");
break;

case "m":
c = r(e.getMonth() + 1);
break;

case "M":
c = r(e.getMinutes());
break;

case "q":
c = "" + (Math.floor(e.getMonth() / 3) + 1);
break;

case "S":
c = r(e.getSeconds());
break;

case "y":
c = r(e.getFullYear() % 100);
break;

case "Y":
c = "" + e.getFullYear();
break;

case "p":
c = l ? "am" :"pm";
break;

case "P":
c = l ? "AM" :"PM";
break;

case "w":
c = "" + e.getDay();
}
o.push(c), a = !1;
} else "%" == c ? a = !0 :o.push(c);
}
return o.join("");
}
function i(e) {
function t(e, t, n, i) {
e[t] = function() {
return n[i].apply(n, arguments);
};
}
var n = {
date:e
};
void 0 != e.strftime && t(n, "strftime", e, "strftime"), t(n, "getTime", e, "getTime"), 
t(n, "setTime", e, "setTime");
for (var i = [ "Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds" ], r = 0; r < i.length; r++) t(n, "get" + i[r], e, "getUTC" + i[r]), 
t(n, "set" + i[r], e, "setUTC" + i[r]);
return n;
}
function r(e, t) {
if ("browser" == t.timezone) return new Date(e);
if (t.timezone && "utc" != t.timezone) {
if ("undefined" != typeof timezoneJS && "undefined" != typeof timezoneJS.Date) {
var n = new timezoneJS.Date();
return n.setTimezone(t.timezone), n.setTime(e), n;
}
return i(new Date(e));
}
return i(new Date(e));
}
function o(i) {
i.hooks.processOptions.push(function(i) {
e.each(i.getAxes(), function(e, i) {
var o = i.options;
"time" == o.mode && (i.tickGenerator = function(e) {
var n = [], i = r(e.min, o), a = 0, l = o.tickSize && "quarter" === o.tickSize[1] || o.minTickSize && "quarter" === o.minTickSize[1] ? d :u;
null != o.minTickSize && (a = "number" == typeof o.tickSize ? o.tickSize :o.minTickSize[0] * s[o.minTickSize[1]]);
for (var c = 0; c < l.length - 1 && !(e.delta < (l[c][0] * s[l[c][1]] + l[c + 1][0] * s[l[c + 1][1]]) / 2 && l[c][0] * s[l[c][1]] >= a); ++c) ;
var p = l[c][0], h = l[c][1];
if ("year" == h) {
if (null != o.minTickSize && "year" == o.minTickSize[1]) p = Math.floor(o.minTickSize[0]); else {
var f = Math.pow(10, Math.floor(Math.log(e.delta / s.year) / Math.LN10)), m = e.delta / s.year / f;
p = 1.5 > m ? 1 :3 > m ? 2 :7.5 > m ? 5 :10, p *= f;
}
1 > p && (p = 1);
}
e.tickSize = o.tickSize || [ p, h ];
var g = e.tickSize[0];
h = e.tickSize[1];
var _ = g * s[h];
"second" == h ? i.setSeconds(t(i.getSeconds(), g)) :"minute" == h ? i.setMinutes(t(i.getMinutes(), g)) :"hour" == h ? i.setHours(t(i.getHours(), g)) :"month" == h ? i.setMonth(t(i.getMonth(), g)) :"quarter" == h ? i.setMonth(3 * t(i.getMonth() / 3, g)) :"year" == h && i.setFullYear(t(i.getFullYear(), g)), 
i.setMilliseconds(0), _ >= s.minute && i.setSeconds(0), _ >= s.hour && i.setMinutes(0), 
_ >= s.day && i.setHours(0), _ >= 4 * s.day && i.setDate(1), _ >= 2 * s.month && i.setMonth(t(i.getMonth(), 3)), 
_ >= 2 * s.quarter && i.setMonth(t(i.getMonth(), 6)), _ >= s.year && i.setMonth(0);
var y, v = 0, b = Number.NaN;
do if (y = b, b = i.getTime(), n.push(b), "month" == h || "quarter" == h) if (1 > g) {
i.setDate(1);
var w = i.getTime();
i.setMonth(i.getMonth() + ("quarter" == h ? 3 :1));
var k = i.getTime();
i.setTime(b + v * s.hour + (k - w) * g), v = i.getHours(), i.setHours(0);
} else i.setMonth(i.getMonth() + g * ("quarter" == h ? 3 :1)); else "year" == h ? i.setFullYear(i.getFullYear() + g) :i.setTime(b + _); while (b < e.max && b != y);
return n;
}, i.tickFormatter = function(e, t) {
var i = r(e, t.options);
if (null != o.timeformat) return n(i, o.timeformat, o.monthNames, o.dayNames);
var a, l = t.options.tickSize && "quarter" == t.options.tickSize[1] || t.options.minTickSize && "quarter" == t.options.minTickSize[1], u = t.tickSize[0] * s[t.tickSize[1]], d = t.max - t.min, c = o.twelveHourClock ? " %p" :"", p = o.twelveHourClock ? "%I" :"%H";
a = u < s.minute ? p + ":%M:%S" + c :u < s.day ? d < 2 * s.day ? p + ":%M" + c :"%b %d " + p + ":%M" + c :u < s.month ? "%b %d" :l && u < s.quarter || !l && u < s.year ? d < s.year ? "%b" :"%b %Y" :l && u < s.year ? d < s.year ? "Q%q" :"Q%q %Y" :"%Y";
var h = n(i, a, o.monthNames, o.dayNames);
return h;
});
});
});
}
var a = {
xaxis:{
timezone:null,
timeformat:null,
twelveHourClock:!1,
monthNames:null
}
}, s = {
second:1e3,
minute:6e4,
hour:36e5,
day:864e5,
month:2592e6,
quarter:7776e6,
year:525949.2 * 60 * 1e3
}, l = [ [ 1, "second" ], [ 2, "second" ], [ 5, "second" ], [ 10, "second" ], [ 30, "second" ], [ 1, "minute" ], [ 2, "minute" ], [ 5, "minute" ], [ 10, "minute" ], [ 30, "minute" ], [ 1, "hour" ], [ 2, "hour" ], [ 4, "hour" ], [ 8, "hour" ], [ 12, "hour" ], [ 1, "day" ], [ 2, "day" ], [ 3, "day" ], [ .25, "month" ], [ .5, "month" ], [ 1, "month" ], [ 2, "month" ] ], u = l.concat([ [ 3, "month" ], [ 6, "month" ], [ 1, "year" ] ]), d = l.concat([ [ 1, "quarter" ], [ 2, "quarter" ], [ 1, "year" ] ]);
e.plot.plugins.push({
init:o,
options:a,
name:"time",
version:"1.0"
}), e.plot.formatDate = n;
}(jQuery), function(e) {
function t() {
var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(e) :window.opera && window.opera.postError && window.opera.postError(e);
}
e.fn.ajaxSubmit = function(n) {
function i(i) {
function o(e) {
var t = e.contentWindow ? e.contentWindow.document :e.contentDocument ? e.contentDocument :e.document;
return t;
}
function a() {
function n() {
try {
var e = o(m).readyState;
t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(n, 50);
} catch (i) {
t("Server abort: ", i, " (", i.name, ")"), l(L), b && clearTimeout(b), b = void 0;
}
}
var i = s.attr("target"), a = s.attr("action");
w.setAttribute("target", h), r || w.setAttribute("method", "POST"), a != c.url && w.setAttribute("action", c.url), 
c.skipEncodingOverride || r && !/post/i.test(r) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), c.timeout && (b = setTimeout(function() {
v = !0, l(M);
}, c.timeout));
var u = [];
try {
if (c.extraData) for (var d in c.extraData) u.push(e('<input type="hidden" name="' + d + '" />').attr("value", c.extraData[d]).appendTo(w)[0]);
c.iframeTarget || (f.appendTo("body"), m.attachEvent ? m.attachEvent("onload", l) :m.addEventListener("load", l, !1)), 
setTimeout(n, 15), w.submit();
} finally {
w.setAttribute("action", a), i ? w.setAttribute("target", i) :s.removeAttr("target"), 
e(u).remove();
}
}
function l(n) {
if (!g.aborted && !D) {
try {
T = o(m);
} catch (i) {
t("cannot access response document: ", i), n = L;
}
if (n === M && g) return g.abort("timeout"), void 0;
if (n == L && g) return g.abort("server abort"), void 0;
if (T && T.location.href != c.iframeSrc || v) {
m.detachEvent ? m.detachEvent("onload", l) :m.removeEventListener("load", l, !1);
var r, a = "success";
try {
if (v) throw "timeout";
var s = "xml" == c.dataType || T.XMLDocument || e.isXMLDoc(T);
if (t("isXml=" + s), !s && window.opera && (null == T.body || "" == T.body.innerHTML) && --x) return t("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var u = T.body ? T.body :T.documentElement;
g.responseText = u ? u.innerHTML :null, g.responseXML = T.XMLDocument ? T.XMLDocument :T, 
s && (c.dataType = "xml"), g.getResponseHeader = function(e) {
var t = {
"content-type":c.dataType
};
return t[e];
}, u && (g.status = Number(u.getAttribute("status")) || g.status, g.statusText = u.getAttribute("statusText") || g.statusText);
var d = c.dataType || "", h = /(json|script|text)/.test(d.toLowerCase());
if (h || c.textarea) {
var _ = T.getElementsByTagName("textarea")[0];
if (_) g.responseText = _.value, g.status = Number(_.getAttribute("status")) || g.status, 
g.statusText = _.getAttribute("statusText") || g.statusText; else if (h) {
var y = T.getElementsByTagName("pre")[0], w = T.getElementsByTagName("body")[0];
y ? g.responseText = y.textContent ? y.textContent :y.innerHTML :w && (g.responseText = w.innerHTML);
}
} else "xml" != c.dataType || g.responseXML || null == g.responseText || (g.responseXML = Y(g.responseText));
try {
S = E(g, c.dataType, c);
} catch (n) {
a = "parsererror", g.error = r = n || a;
}
} catch (n) {
t("error caught: ", n), a = "error", g.error = r = n || a;
}
g.aborted && (t("upload aborted"), a = null), g.status && (a = g.status >= 200 && g.status < 300 || 304 === g.status ? "success" :"error"), 
"success" === a ? (c.success && c.success.call(c.context, S, "success", g), p && e.event.trigger("ajaxSuccess", [ g, c ])) :a && (void 0 == r && (r = g.statusText), 
c.error && c.error.call(c.context, g, a, r), p && e.event.trigger("ajaxError", [ g, c, r ])), 
p && e.event.trigger("ajaxComplete", [ g, c ]), p && !--e.active && e.event.trigger("ajaxStop"), 
c.complete && c.complete.call(c.context, g, a), D = !0, c.timeout && clearTimeout(b), 
setTimeout(function() {
c.iframeTarget || f.remove(), g.responseXML = null;
}, 100);
}
}
}
var u, d, c, p, h, f, m, g, _, y, v, b, w = s[0], k = !!e.fn.prop;
if (i) for (d = 0; d < i.length; d++) u = e(w[i[d].name]), u[k ? "prop" :"attr"]("disabled", !1);
if (e(":input[name=submit],:input[id=submit]", w).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (c = e.extend(!0, {}, e.ajaxSettings, n), c.context = c.context || c, h = "jqFormIO" + new Date().getTime(), 
c.iframeTarget ? (f = e(c.iframeTarget), y = f.attr("name"), null == y ? f.attr("name", h) :h = y) :(f = e('<iframe name="' + h + '" src="' + c.iframeSrc + '" />'), 
f.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), m = f[0], g = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(n) {
var i = "timeout" === n ? "timeout" :"aborted";
t("aborting upload... " + i), this.aborted = 1, f.attr("src", c.iframeSrc), g.error = i, 
c.error && c.error.call(c.context, g, i, n), p && e.event.trigger("ajaxError", [ g, c, i ]), 
c.complete && c.complete.call(c.context, g, i);
}
}, p = c.global, p && !e.active++ && e.event.trigger("ajaxStart"), p && e.event.trigger("ajaxSend", [ g, c ]), 
c.beforeSend && c.beforeSend.call(c.context, g, c) === !1) return c.global && e.active--, 
void 0;
if (!g.aborted) {
_ = w.clk, _ && (y = _.name, y && !_.disabled && (c.extraData = c.extraData || {}, 
c.extraData[y] = _.value, "image" == _.type && (c.extraData[y + ".x"] = w.clk_x, 
c.extraData[y + ".y"] = w.clk_y)));
var M = 1, L = 2;
c.forceSync ? a() :setTimeout(a, 10);
var S, T, D, x = 50, Y = e.parseXML || function(e, t) {
return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e)) :t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t :null;
}, C = e.parseJSON || function(e) {
return window.eval("(" + e + ")");
}, E = function(t, n, i) {
var r = t.getResponseHeader("content-type") || "", o = "xml" === n || !n && r.indexOf("xml") >= 0, a = o ? t.responseXML :t.responseText;
return o && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), 
i && i.dataFilter && (a = i.dataFilter(a, n)), "string" == typeof a && ("json" === n || !n && r.indexOf("json") >= 0 ? a = C(a) :("script" === n || !n && r.indexOf("javascript") >= 0) && e.globalEval(a)), 
a;
};
}
}
if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), 
this;
var r, o, a, s = this;
"function" == typeof n && (n = {
success:n
}), r = this.attr("method"), o = this.attr("action"), a = "string" == typeof o ? e.trim(o) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
n = e.extend(!0, {
url:a,
success:e.ajaxSettings.success,
type:r || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, n);
var l = {};
if (this.trigger("form-pre-serialize", [ this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var u, d, c = this.formToArray(n.semantic);
if (n.data) {
n.extraData = n.data;
for (u in n.data) if (n.data[u] instanceof Array) for (var p in n.data[u]) c.push({
name:u,
value:n.data[u][p]
}); else d = n.data[u], d = e.isFunction(d) ? d() :d, c.push({
name:u,
value:d
});
}
if (n.beforeSubmit && n.beforeSubmit(c, this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ c, this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var h = e.param(c);
"GET" == n.type.toUpperCase() ? (n.url += (n.url.indexOf("?") >= 0 ? "&" :"?") + h, 
n.data = null) :n.data = h;
var f = [];
if (n.resetForm && f.push(function() {
s.resetForm();
}), n.clearForm && f.push(function() {
s.clearForm();
}), !n.dataType && n.target) {
var m = n.success || function() {};
f.push(function(t) {
var i = n.replaceTarget ? "replaceWith" :"html";
e(n.target)[i](t).each(m, arguments);
});
} else n.success && f.push(n.success);
n.success = function(e, t, i) {
for (var r = n.context || n, o = 0, a = f.length; a > o; o++) f[o].apply(r, [ e, t, i || s, s ]);
};
var g = e("input:file", this).length > 0, _ = "multipart/form-data", y = s.attr("enctype") == _ || s.attr("encoding") == _;
if (n.iframe !== !1 && (g || n.iframe || y)) n.closeKeepAlive ? e.get(n.closeKeepAlive, function() {
i(c);
}) :i(c); else {
if (e.browser.msie && "get" == r) {
var v = s[0].getAttribute("method");
"string" == typeof v && (n.type = v);
}
e.ajax(n);
}
return this.trigger("form-submit-notify", [ this, n ]), this;
}, e.fn.ajaxForm = function(n) {
if (0 === this.length) {
var i = {
s:this.selector,
c:this.context
};
return !e.isReady && i.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
e(i.s, i.c).ajaxForm(n);
}), this) :(t("terminating; zero elements found by selector" + (e.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(t) {
t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(n));
}).bind("click.form-plugin", function(t) {
var n = t.target, i = e(n);
if (!i.is(":submit,input:image")) {
var r = i.closest(":submit");
if (0 == r.length) return;
n = r[0];
}
var o = this;
if (o.clk = n, "image" == n.type) if (void 0 != t.offsetX) o.clk_x = t.offsetX, 
o.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
var a = i.offset();
o.clk_x = t.pageX - a.left, o.clk_y = t.pageY - a.top;
} else o.clk_x = t.pageX - n.offsetLeft, o.clk_y = t.pageY - n.offsetTop;
setTimeout(function() {
o.clk = o.clk_x = o.clk_y = null;
}, 100);
});
}, e.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, e.fn.formToArray = function(t) {
var n = [];
if (0 === this.length) return n;
var i = this[0], r = t ? i.getElementsByTagName("*") :i.elements;
if (!r) return n;
var o, a, s, l, u, d, c;
for (o = 0, d = r.length; d > o; o++) if (u = r[o], s = u.name) if (t && i.clk && "image" == u.type) u.disabled || i.clk != u || (n.push({
name:s,
value:e(u).val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
})); else if (l = e.fieldValue(u, !0), l && l.constructor == Array) for (a = 0, 
c = l.length; c > a; a++) n.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && n.push({
name:s,
value:l
});
if (!t && i.clk) {
var p = e(i.clk), h = p[0];
s = h.name, s && !h.disabled && "image" == h.type && (n.push({
name:s,
value:p.val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
}));
}
return n;
}, e.fn.formSerialize = function(t) {
return e.param(this.formToArray(t));
}, e.fn.fieldSerialize = function(t) {
var n = [];
return this.each(function() {
var i = this.name;
if (i) {
var r = e.fieldValue(this, t);
if (r && r.constructor == Array) for (var o = 0, a = r.length; a > o; o++) n.push({
name:i,
value:r[o]
}); else null !== r && "undefined" != typeof r && n.push({
name:this.name,
value:r
});
}
}), e.param(n);
}, e.fn.fieldValue = function(t) {
for (var n = [], i = 0, r = this.length; r > i; i++) {
var o = this[i], a = e.fieldValue(o, t);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(n, a) :n.push(a));
}
return n;
}, e.fieldValue = function(t, n) {
var i = t.name, r = t.type, o = t.tagName.toLowerCase();
if (void 0 === n && (n = !0), n && (!i || t.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r) && !t.checked || ("submit" == r || "image" == r) && t.form && t.form.clk != t || "select" == o && -1 == t.selectedIndex)) return null;
if ("select" == o) {
var a = t.selectedIndex;
if (0 > a) return null;
for (var s = [], l = t.options, u = "select-one" == r, d = u ? a + 1 :l.length, c = u ? a :0; d > c; c++) {
var p = l[c];
if (p.selected) {
var h = p.value;
if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text :p.value), 
u) return h;
s.push(h);
}
}
return s;
}
return e(t).val();
}, e.fn.clearForm = function() {
return this.each(function() {
e("input,select,textarea", this).clearFields();
});
}, e.fn.clearFields = e.fn.clearInputs = function() {
var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var t = this.type, n = this.tagName.toLowerCase();
e.test(t) || "textarea" == n ? this.value = "" :"checkbox" == t || "radio" == t ? this.checked = !1 :"select" == n && (this.selectedIndex = -1);
});
}, e.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, e.fn.enable = function(e) {
return void 0 === e && (e = !0), this.each(function() {
this.disabled = !e;
});
}, e.fn.selected = function(t) {
return void 0 === t && (t = !0), this.each(function() {
var n = this.type;
if ("checkbox" == n || "radio" == n) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
var i = e(this).parent("select");
t && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = t;
}
});
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(e, t, n) {
"$:nomunge";
function i(e) {
return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
}
var r, o = "hashchange", a = document, s = e.event.special, l = a.documentMode, u = "on" + o in t && (l === n || l > 7);
e.fn[o] = function(e) {
return e ? this.bind(o, e) :this.trigger(o);
}, e.fn[o].delay = 50, s[o] = e.extend(s[o], {
setup:function() {
return u ? !1 :(e(r.start), void 0);
},
teardown:function() {
return u ? !1 :(e(r.stop), void 0);
}
}), r = function() {
function r() {
var n = i(), a = h(d);
n !== d ? (p(d = n, a), e(t).trigger(o)) :a !== d && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(r, e.fn[o].delay);
}
var s, l = {}, d = i(), c = function(e) {
return e;
}, p = c, h = c;
return l.start = function() {
s || r();
}, l.stop = function() {
s && clearTimeout(s), s = n;
}, e.browser.msie && !u && function() {
var t, n;
l.start = function() {
t || (n = e.fn[o].src, n = n && n + i(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
n || p(i()), r();
}).attr("src", n || "javascript:void(0)").insertAfter("body")[0].contentWindow, 
a.onpropertychange = function() {
try {
"title" === event.propertyName && (t.document.title = a.title);
} catch (e) {}
});
}, l.stop = c, h = function() {
return i(t.location.href);
}, p = function(n, i) {
var r = t.document, s = e.fn[o].domain;
n !== i && (r.title = a.title, r.open(), s && r.write('<script>document.domain="' + s + '"</script>'), 
r.close(), t.location.hash = n);
};
}(), l;
}();
}(jQuery, this), /*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
function(e) {
e.extend(e.fn, {
validate:function(t) {
if (!this.length) return t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), 
void 0;
var n = e.data(this[0], "validator");
return n ? n :(this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), 
e.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
n.settings.submitHandler && (n.submitButton = t.target), e(t.target).hasClass("cancel") && (n.cancelSubmit = !0), 
void 0 !== e(t.target).attr("formnovalidate") && (n.cancelSubmit = !0);
}), this.submit(function(t) {
function i() {
var i;
return n.settings.submitHandler ? (n.submitButton && (i = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), 
n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && i.remove(), 
!1) :!0;
}
return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, 
i()) :n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) :i() :(n.focusInvalid(), 
!1);
})), n);
},
valid:function() {
if (e(this[0]).is("form")) return this.validate().form();
var t = !0, n = e(this[0].form).validate();
return this.each(function() {
t = t && n.element(this);
}), t;
},
removeAttrs:function(t) {
var n = {}, i = this;
return e.each(t.split(/\s/), function(e, t) {
n[t] = i.attr(t), i.removeAttr(t);
}), n;
},
rules:function(t, n) {
var i = this[0];
if (t) {
var r = e.data(i.form, "validator").settings, o = r.rules, a = e.validator.staticRules(i);
switch (t) {
case "add":
e.extend(a, e.validator.normalizeRule(n)), delete a.messages, o[i.name] = a, n.messages && (r.messages[i.name] = e.extend(r.messages[i.name], n.messages));
break;

case "remove":
if (!n) return delete o[i.name], a;
var s = {};
return e.each(n.split(/\s/), function(e, t) {
s[t] = a[t], delete a[t];
}), s;
}
}
var l = e.validator.normalizeRules(e.extend({}, e.validator.classRules(i), e.validator.attributeRules(i), e.validator.dataRules(i), e.validator.staticRules(i)), i);
if (l.required) {
var u = l.required;
delete l.required, l = e.extend({
required:u
}, l);
}
return l;
}
}), e.extend(e.expr[":"], {
blank:function(t) {
return !e.trim("" + e(t).val());
},
filled:function(t) {
return !!e.trim("" + e(t).val());
},
unchecked:function(t) {
return !e(t).prop("checked");
}
}), e.validator = function(t, n) {
this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, 
this.init();
}, e.validator.format = function(t, n) {
return 1 === arguments.length ? function() {
var n = e.makeArray(arguments);
return n.unshift(t), e.validator.format.apply(this, n);
} :(arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), 
n.constructor !== Array && (n = [ n ]), e.each(n, function(e, n) {
t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
return n;
});
}), t);
}, e.extend(e.validator, {
defaults:{
messages:{},
groups:{},
rules:{},
errorClass:"error",
validClass:"valid",
errorElement:"label",
focusInvalid:!0,
errorContainer:e([]),
errorLabelContainer:e([]),
onsubmit:!0,
ignore:":hidden",
ignoreTitle:!1,
onfocusin:function(e) {
this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), 
this.addWrapper(this.errorsFor(e)).hide());
},
onfocusout:function(e) {
this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e);
},
onkeyup:function(e, t) {
(9 !== t.which || "" !== this.elementValue(e)) && (e.name in this.submitted || e === this.lastElement) && this.element(e);
},
onclick:function(e) {
e.name in this.submitted ? this.element(e) :e.parentNode.name in this.submitted && this.element(e.parentNode);
},
highlight:function(t, n, i) {
"radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(i) :e(t).addClass(n).removeClass(i);
},
unhighlight:function(t, n, i) {
"radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(i) :e(t).removeClass(n).addClass(i);
}
},
setDefaults:function(t) {
e.extend(e.validator.defaults, t);
},
messages:{
required:"This field is required.",
remote:"Please fix this field.",
email:"Please enter a valid email address.",
url:"Please enter a valid URL.",
date:"Please enter a valid date.",
dateISO:"Please enter a valid date (ISO).",
number:"Please enter a valid number.",
digits:"Please enter only digits.",
creditcard:"Please enter a valid credit card number.",
equalTo:"Please enter the same value again.",
maxlength:e.validator.format("Please enter no more than {0} characters."),
minlength:e.validator.format("Please enter at least {0} characters."),
rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),
range:e.validator.format("Please enter a value between {0} and {1}."),
max:e.validator.format("Please enter a value less than or equal to {0}."),
min:e.validator.format("Please enter a value greater than or equal to {0}.")
},
autoCreateRanges:!1,
prototype:{
init:function() {
function t(t) {
var n = e.data(this[0].form, "validator"), i = "on" + t.type.replace(/^validate/, "");
n.settings[i] && n.settings[i].call(n, this[0], t);
}
this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), 
this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), 
this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, 
this.invalid = {}, this.reset();
var n = this.groups = {};
e.each(this.settings.groups, function(t, i) {
"string" == typeof i && (i = i.split(/\s/)), e.each(i, function(e, i) {
n[i] = t;
});
});
var i = this.settings.rules;
e.each(i, function(t, n) {
i[t] = e.validator.normalizeRule(n);
}), e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", t).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", t), 
this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
},
form:function() {
return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), 
this.valid() || e(this.currentForm).triggerHandler("invalid-form", [ this ]), this.showErrors(), 
this.valid();
},
checkForm:function() {
this.prepareForm();
for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
return this.valid();
},
element:function(t) {
t = this.validationTargetFor(this.clean(t)), this.lastElement = t, this.prepareElement(t), 
this.currentElements = e(t);
var n = this.check(t) !== !1;
return n ? delete this.invalid[t.name] :this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), 
this.showErrors(), n;
},
showErrors:function(t) {
if (t) {
e.extend(this.errorMap, t), this.errorList = [];
for (var n in t) this.errorList.push({
message:t[n],
element:this.findByName(n)[0]
});
this.successList = e.grep(this.successList, function(e) {
return !(e.name in t);
});
}
this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) :this.defaultShowErrors();
},
resetForm:function() {
e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, 
this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
},
numberOfInvalids:function() {
return this.objectLength(this.invalid);
},
objectLength:function(e) {
var t = 0;
for (var n in e) t++;
return t;
},
hideErrors:function() {
this.addWrapper(this.toHide).hide();
},
valid:function() {
return 0 === this.size();
},
size:function() {
return this.errorList.length;
},
focusInvalid:function() {
if (this.settings.focusInvalid) try {
e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
} catch (t) {}
},
findLastActive:function() {
var t = this.lastActive;
return t && 1 === e.grep(this.errorList, function(e) {
return e.element.name === t.name;
}).length && t;
},
elements:function() {
var t = this, n = {};
return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), 
this.name in n || !t.objectLength(e(this).rules()) ? !1 :(n[this.name] = !0, !0);
});
},
clean:function(t) {
return e(t)[0];
},
errors:function() {
var t = this.settings.errorClass.replace(" ", ".");
return e(this.settings.errorElement + "." + t, this.errorContext);
},
reset:function() {
this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), 
this.toHide = e([]), this.currentElements = e([]);
},
prepareForm:function() {
this.reset(), this.toHide = this.errors().add(this.containers);
},
prepareElement:function(e) {
this.reset(), this.toHide = this.errorsFor(e);
},
elementValue:function(t) {
var n = e(t).attr("type"), i = e(t).val();
return "radio" === n || "checkbox" === n ? e("input[name='" + e(t).attr("name") + "']:checked").val() :"string" == typeof i ? i.replace(/\r/g, "") :i;
},
check:function(t) {
t = this.validationTargetFor(this.clean(t));
var n, i = e(t).rules(), r = !1, o = this.elementValue(t);
for (var a in i) {
var s = {
method:a,
parameters:i[a]
};
try {
if (n = e.validator.methods[a].call(this, o, t, s.parameters), "dependency-mismatch" === n) {
r = !0;
continue;
}
if (r = !1, "pending" === n) return this.toHide = this.toHide.not(this.errorsFor(t)), 
void 0;
if (!n) return this.formatAndAdd(t, s), !1;
} catch (l) {
throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + s.method + "' method.", l), 
l;
}
}
return r ? void 0 :(this.objectLength(i) && this.successList.push(t), !0);
},
customDataMessage:function(t, n) {
return e(t).data("msg-" + n.toLowerCase()) || t.attributes && e(t).attr("data-msg-" + n.toLowerCase());
},
customMessage:function(e, t) {
var n = this.settings.messages[e];
return n && (n.constructor === String ? n :n[t]);
},
findDefined:function() {
for (var e = 0; e < arguments.length; e++) if (void 0 !== arguments[e]) return arguments[e];
return void 0;
},
defaultMessage:function(t, n) {
return this.findDefined(this.customMessage(t.name, n), this.customDataMessage(t, n), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>");
},
formatAndAdd:function(t, n) {
var i = this.defaultMessage(t, n.method), r = /\$?\{(\d+)\}/g;
"function" == typeof i ? i = i.call(this, n.parameters, t) :r.test(i) && (i = e.validator.format(i.replace(r, "{$1}"), n.parameters)), 
this.errorList.push({
message:i,
element:t
}), this.errorMap[t.name] = i, this.submitted[t.name] = i;
},
addWrapper:function(e) {
return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e;
},
defaultShowErrors:function() {
var e, t;
for (e = 0; this.errorList[e]; e++) {
var n = this.errorList[e];
this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), 
this.showLabel(n.element, n.message);
}
if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
if (this.settings.unhighlight) for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
},
validElements:function() {
return this.currentElements.not(this.invalidElements());
},
invalidElements:function() {
return e(this.errorList).map(function() {
return this.element;
});
},
showLabel:function(t, n) {
var i = this.errorsFor(t);
i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), 
i.html(n)) :(i = e("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(n || ""), 
this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), 
this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, e(t)) :i.insertAfter(t))), 
!n && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) :this.settings.success(i, t)), 
this.toShow = this.toShow.add(i);
},
errorsFor:function(t) {
var n = this.idOrName(t);
return this.errors().filter(function() {
return e(this).attr("for") === n;
});
},
idOrName:function(e) {
return this.groups[e.name] || (this.checkable(e) ? e.name :e.id || e.name);
},
validationTargetFor:function(e) {
return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), 
e;
},
checkable:function(e) {
return /radio|checkbox/i.test(e.type);
},
findByName:function(t) {
return e(this.currentForm).find("[name='" + t + "']");
},
getLength:function(t, n) {
switch (n.nodeName.toLowerCase()) {
case "select":
return e("option:selected", n).length;

case "input":
if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length;
}
return t.length;
},
depend:function(e, t) {
return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) :!0;
},
dependTypes:{
"boolean":function(e) {
return e;
},
string:function(t, n) {
return !!e(t, n.form).length;
},
"function":function(e, t) {
return e(t);
}
},
optional:function(t) {
var n = this.elementValue(t);
return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch";
},
startRequest:function(e) {
this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0);
},
stopRequest:function(t, n) {
this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], 
n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), 
this.formSubmitted = !1) :!n && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [ this ]), 
this.formSubmitted = !1);
},
previousValue:function(t) {
return e.data(t, "previousValue") || e.data(t, "previousValue", {
old:null,
valid:!0,
message:this.defaultMessage(t, "remote")
});
}
},
classRuleSettings:{
required:{
required:!0
},
email:{
email:!0
},
url:{
url:!0
},
date:{
date:!0
},
dateISO:{
dateISO:!0
},
number:{
number:!0
},
digits:{
digits:!0
},
creditcard:{
creditcard:!0
}
},
addClassRules:function(t, n) {
t.constructor === String ? this.classRuleSettings[t] = n :e.extend(this.classRuleSettings, t);
},
classRules:function(t) {
var n = {}, i = e(t).attr("class");
return i && e.each(i.split(" "), function() {
this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this]);
}), n;
},
attributeRules:function(t) {
var n = {}, i = e(t), r = i[0].getAttribute("type");
for (var o in e.validator.methods) {
var a;
"required" === o ? (a = i.get(0).getAttribute(o), "" === a && (a = !0), a = !!a) :a = i.attr(o), 
/min|max/.test(o) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), 
a ? n[o] = a :r === o && "range" !== r && (n[o] = !0);
}
return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, 
n;
},
dataRules:function(t) {
var n, i, r = {}, o = e(t);
for (n in e.validator.methods) i = o.data("rule-" + n.toLowerCase()), void 0 !== i && (r[n] = i);
return r;
},
staticRules:function(t) {
var n = {}, i = e.data(t.form, "validator");
return i.settings.rules && (n = e.validator.normalizeRule(i.settings.rules[t.name]) || {}), 
n;
},
normalizeRules:function(t, n) {
return e.each(t, function(i, r) {
if (r === !1) return delete t[i], void 0;
if (r.param || r.depends) {
var o = !0;
switch (typeof r.depends) {
case "string":
o = !!e(r.depends, n.form).length;
break;

case "function":
o = r.depends.call(n, n);
}
o ? t[i] = void 0 !== r.param ? r.param :!0 :delete t[i];
}
}), e.each(t, function(i, r) {
t[i] = e.isFunction(r) ? r(n) :r;
}), e.each([ "minlength", "maxlength" ], function() {
t[this] && (t[this] = Number(t[this]));
}), e.each([ "rangelength", "range" ], function() {
var n;
t[this] && (e.isArray(t[this]) ? t[this] = [ Number(t[this][0]), Number(t[this][1]) ] :"string" == typeof t[this] && (n = t[this].split(/[\s,]+/), 
t[this] = [ Number(n[0]), Number(n[1]) ]));
}), e.validator.autoCreateRanges && (t.min && t.max && (t.range = [ t.min, t.max ], 
delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [ t.minlength, t.maxlength ], 
delete t.minlength, delete t.maxlength)), t;
},
normalizeRule:function(t) {
if ("string" == typeof t) {
var n = {};
e.each(t.split(/\s/), function() {
n[this] = !0;
}), t = n;
}
return t;
},
addMethod:function(t, n, i) {
e.validator.methods[t] = n, e.validator.messages[t] = void 0 !== i ? i :e.validator.messages[t], 
n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t));
},
methods:{
required:function(t, n, i) {
if (!this.depend(i, n)) return "dependency-mismatch";
if ("select" === n.nodeName.toLowerCase()) {
var r = e(n).val();
return r && r.length > 0;
}
return this.checkable(n) ? this.getLength(t, n) > 0 :e.trim(t).length > 0;
},
email:function(e, t) {
return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e);
},
url:function(e, t) {
return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e);
},
date:function(e, t) {
return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString());
},
dateISO:function(e, t) {
return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e);
},
number:function(e, t) {
return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);
},
digits:function(e, t) {
return this.optional(t) || /^\d+$/.test(e);
},
creditcard:function(e, t) {
if (this.optional(t)) return "dependency-mismatch";
if (/[^0-9 \-]+/.test(e)) return !1;
var n = 0, i = 0, r = !1;
e = e.replace(/\D/g, "");
for (var o = e.length - 1; o >= 0; o--) {
var a = e.charAt(o);
i = parseInt(a, 10), r && (i *= 2) > 9 && (i -= 9), n += i, r = !r;
}
return n % 10 === 0;
},
minlength:function(t, n, i) {
var r = e.isArray(t) ? t.length :this.getLength(e.trim(t), n);
return this.optional(n) || r >= i;
},
maxlength:function(t, n, i) {
var r = e.isArray(t) ? t.length :this.getLength(e.trim(t), n);
return this.optional(n) || i >= r;
},
rangelength:function(t, n, i) {
var r = e.isArray(t) ? t.length :this.getLength(e.trim(t), n);
return this.optional(n) || r >= i[0] && r <= i[1];
},
min:function(e, t, n) {
return this.optional(t) || e >= n;
},
max:function(e, t, n) {
return this.optional(t) || n >= e;
},
range:function(e, t, n) {
return this.optional(t) || e >= n[0] && e <= n[1];
},
equalTo:function(t, n, i) {
var r = e(i);
return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
e(n).valid();
}), t === r.val();
},
remote:function(t, n, i) {
if (this.optional(n)) return "dependency-mismatch";
var r = this.previousValue(n);
if (this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), r.originalMessage = this.settings.messages[n.name].remote, 
this.settings.messages[n.name].remote = r.message, i = "string" == typeof i && {
url:i
} || i, r.old === t) return r.valid;
r.old = t;
var o = this;
this.startRequest(n);
var a = {};
return a[n.name] = t, e.ajax(e.extend(!0, {
url:i,
mode:"abort",
port:"validate" + n.name,
dataType:"json",
data:a,
success:function(i) {
o.settings.messages[n.name].remote = r.originalMessage;
var a = i === !0 || "true" === i;
if (a) {
var s = o.formSubmitted;
o.prepareElement(n), o.formSubmitted = s, o.successList.push(n), delete o.invalid[n.name], 
o.showErrors();
} else {
var l = {}, u = i || o.defaultMessage(n, "remote");
l[n.name] = r.message = e.isFunction(u) ? u(t) :u, o.invalid[n.name] = !0, o.showErrors(l);
}
r.valid = a, o.stopRequest(n, a);
}
}, i)), "pending";
}
}
}), e.format = e.validator.format;
}(jQuery), function(e) {
var t = {};
if (e.ajaxPrefilter) e.ajaxPrefilter(function(e, n, i) {
var r = e.port;
"abort" === e.mode && (t[r] && t[r].abort(), t[r] = i);
}); else {
var n = e.ajax;
e.ajax = function(i) {
var r = ("mode" in i ? i :e.ajaxSettings).mode, o = ("port" in i ? i :e.ajaxSettings).port;
return "abort" === r ? (t[o] && t[o].abort(), t[o] = n.apply(this, arguments), t[o]) :n.apply(this, arguments);
};
}
}(jQuery), function(e) {
e.extend(e.fn, {
validateDelegate:function(t, n, i) {
return this.bind(n, function(n) {
var r = e(n.target);
return r.is(t) ? i.apply(r, arguments) :void 0;
});
}
});
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(e, t, n, i) {
var r = e(t);
e.fn.lazyload = function(o) {
function a() {
var t = 0;
l.each(function() {
var n = e(this);
if (!u.skip_invisible || n.is(":visible")) if (e.abovethetop(this, u) || e.leftofbegin(this, u)) ; else if (e.belowthefold(this, u) || e.rightoffold(this, u)) {
if (++t > u.failure_limit) return !1;
} else n.trigger("appear"), t = 0;
});
}
var s, l = this, u = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:t,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return o && (i !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), 
i !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(u, o)), 
s = u.container === i || u.container === t ? r :e(u.container), 0 === u.event.indexOf("scroll") && s.bind(u.event, function() {
return a();
}), this.each(function() {
var t = this, n = e(t);
t.loaded = !1, n.one("appear", function() {
if (!this.loaded) {
if (u.appear) {
var i = l.length;
u.appear.call(t, i, u);
}
if (n.data("background")) {
var r = n.data("background");
n.css("backgroundImage", "url(" + r + ")");
} else {
var r = n.data(u.data_attribute);
e("<img />").bind("load", function() {
n.hide().attr("src", r).on("load", function() {
n.trigger("afterAppear");
}), n[u.effect](u.effect_speed), t.loaded = !0;
var i = e.grep(l, function(e) {
return !e.loaded;
});
if (l = e(i), u.load) {
var o = l.length;
u.load.call(t, o, u);
}
}).attr("src", r);
}
}
}), 0 !== u.event.indexOf("scroll") && n.bind(u.event, function() {
t.loaded || n.trigger("appear");
});
}), r.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && r.bind("pageshow", function(t) {
t.originalEvent && t.originalEvent.persisted && l.each(function() {
e(this).trigger("appear");
});
}), e(n).ready(function() {
a();
}), this;
}, e.belowthefold = function(n, o) {
var a;
return a = o.container === i || o.container === t ? r.height() + r.scrollTop() :e(o.container).offset().top + e(o.container).height(), 
a <= e(n).offset().top - o.threshold;
}, e.rightoffold = function(n, o) {
var a;
return a = o.container === i || o.container === t ? r.width() + r.scrollLeft() :e(o.container).offset().left + e(o.container).width(), 
a <= e(n).offset().left - o.threshold;
}, e.abovethetop = function(n, o) {
var a;
return a = o.container === i || o.container === t ? r.scrollTop() :e(o.container).offset().top, 
a >= e(n).offset().top + o.threshold + e(n).height();
}, e.leftofbegin = function(n, o) {
var a;
return a = o.container === i || o.container === t ? r.scrollLeft() :e(o.container).offset().left, 
a >= e(n).offset().left + o.threshold + e(n).width();
}, e.inviewport = function(t, n) {
return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n));
}, e.extend(e.expr[":"], {
"below-the-fold":function(t) {
return e.belowthefold(t, {
threshold:0
});
},
"above-the-top":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-screen":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-screen":function(t) {
return !e.rightoffold(t, {
threshold:0
});
},
"in-viewport":function(t) {
return e.inviewport(t, {
threshold:0
});
},
"above-the-fold":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-fold":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-fold":function(t) {
return !e.rightoffold(t, {
threshold:0
});
}
});
}(jQuery, window, document), function(e) {
var t = {
topSpacing:0,
bottomSpacing:0,
className:"is-sticky",
wrapperClassName:"sticky-wrapper",
center:!1,
getWidthFrom:""
}, n = e(window), i = e(document), r = [], o = n.height(), a = function() {
for (var t = n.scrollTop(), a = i.height(), s = a - o, l = t > s ? s - t :0, u = 0; u < r.length; u++) {
var d = r[u], c = d.stickyWrapper.offset().top, p = c - d.topSpacing - l;
if (p >= t) null !== d.currentTop && (d.stickyElement.css("position", "").css("top", ""), 
d.stickyElement.parent().removeClass(d.className), d.currentTop = null); else {
var h = a - d.stickyElement.outerHeight() - d.topSpacing - d.bottomSpacing - t - l;
0 > h ? h += d.topSpacing :h = d.topSpacing, d.currentTop != h && (d.stickyElement.css("position", "fixed").css("top", h), 
"undefined" != typeof d.getWidthFrom && d.stickyElement.css("width", e(d.getWidthFrom).width()), 
d.stickyElement.parent().addClass(d.className), d.currentTop = h);
}
}
}, s = function() {
o = n.height();
}, l = {
init:function(n) {
var i = e.extend(t, n);
return this.each(function() {
var t = e(this), n = t.attr("id"), o = e("<div></div>").attr("id", n + "-sticky-wrapper").addClass(i.wrapperClassName);
t.wrapAll(o), i.center && t.parent().css({
width:t.outerWidth(),
marginLeft:"auto",
marginRight:"auto"
}), "right" == t.css("float") && t.css({
"float":"none"
}).parent().css({
"float":"right"
});
var a = t.parent();
a.css("height", t.outerHeight()), r.push({
topSpacing:i.topSpacing,
bottomSpacing:i.bottomSpacing,
stickyElement:t,
currentTop:null,
stickyWrapper:a,
className:i.className,
getWidthFrom:i.getWidthFrom
});
});
},
update:a,
unstick:function() {
return this.each(function() {
var t = e(this);
removeIdx = -1;
for (var n = 0; n < r.length; n++) r[n].stickyElement.get(0) == t.get(0) && (removeIdx = n);
-1 != removeIdx && (r.splice(removeIdx, 1), t.unwrap(), t.removeAttr("style"));
});
}
};
window.addEventListener ? (window.addEventListener("scroll", a, !1), window.addEventListener("resize", s, !1)) :window.attachEvent && (window.attachEvent("onscroll", a), 
window.attachEvent("onresize", s)), e.fn.sticky = function(t) {
return l[t] ? l[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sticky"), 
void 0) :l.init.apply(this, arguments);
}, e.fn.unstick = function(t) {
return l[t] ? l[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sticky"), 
void 0) :l.unstick.apply(this, arguments);
}, e(function() {
setTimeout(a, 0);
});
}(jQuery), function(e) {
"function" == typeof define && define.amd ? define(e) :window.purl = e();
}(function() {
function e(e, t) {
for (var n = decodeURI(e), i = m[t ? "strict" :"loose"].exec(n), r = {
attr:{},
param:{},
seg:{}
}, a = 14; a--; ) r.attr[h[a]] = i[a] || "";
return r.param.query = o(r.attr.query), r.param.fragment = o(r.attr.fragment), r.seg.path = r.attr.path.replace(/^\/+|\/+$/g, "").split("/"), 
r.seg.fragment = r.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), r.attr.base = r.attr.host ? (r.attr.protocol ? r.attr.protocol + "://" + r.attr.host :r.attr.host) + (r.attr.port ? ":" + r.attr.port :"") :"", 
r;
}
function t(e) {
var t = e.tagName;
return "undefined" != typeof t ? p[t.toLowerCase()] :t;
}
function n(e, t) {
if (0 === e[t].length) return e[t] = {};
var n = {};
for (var i in e[t]) n[i] = e[t][i];
return e[t] = n, n;
}
function i(e, t, r, o) {
var a = e.shift();
if (a) {
var s = t[r] = t[r] || [];
"]" == a ? u(s) ? "" !== o && s.push(o) :"object" == typeof s ? s[d(s).length] = o :s = t[r] = [ t[r], o ] :~a.indexOf("]") ? (a = a.substr(0, a.length - 1), 
!g.test(a) && u(s) && (s = n(t, r)), i(e, s, a, o)) :(!g.test(a) && u(s) && (s = n(t, r)), 
i(e, s, a, o));
} else u(t[r]) ? t[r].push(o) :t[r] = "object" == typeof t[r] ? o :"undefined" == typeof t[r] ? o :[ t[r], o ];
}
function r(e, t, n) {
if (~t.indexOf("]")) {
var r = t.split("[");
i(r, e, "base", n);
} else {
if (!g.test(t) && u(e.base)) {
var o = {};
for (var s in e.base) o[s] = e.base[s];
e.base = o;
}
"" !== t && a(e.base, t, n);
}
return e;
}
function o(e) {
return l(String(e).split(/&|;/), function(e, t) {
try {
t = decodeURIComponent(t.replace(/\+/g, " "));
} catch (n) {}
var i = t.indexOf("="), o = s(t), a = t.substr(0, o || i), l = t.substr(o || i, t.length);
return l = l.substr(l.indexOf("=") + 1, l.length), "" === a && (a = t, l = ""), 
r(e, a, l);
}, {
base:{}
}).base;
}
function a(e, t, n) {
var i = e[t];
"undefined" == typeof i ? e[t] = n :u(i) ? i.push(n) :e[t] = [ i, n ];
}
function s(e) {
for (var t, n, i = e.length, r = 0; i > r; ++r) if (n = e[r], "]" == n && (t = !1), 
"[" == n && (t = !0), "=" == n && !t) return r;
}
function l(e, t) {
for (var n = 0, i = e.length >> 0, r = arguments[2]; i > n; ) n in e && (r = t.call(void 0, r, e[n], n, e)), 
++n;
return r;
}
function u(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function d(e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && t.push(n);
return t;
}
function c(t, n) {
return 1 === arguments.length && t === !0 && (n = !0, t = void 0), n = n || !1, 
t = t || window.location.toString(), {
data:e(t, n),
attr:function(e) {
return e = f[e] || e, "undefined" != typeof e ? this.data.attr[e] :this.data.attr;
},
param:function(e) {
return "undefined" != typeof e ? this.data.param.query[e] :this.data.param.query;
},
fparam:function(e) {
return "undefined" != typeof e ? this.data.param.fragment[e] :this.data.param.fragment;
},
segment:function(e) {
return "undefined" == typeof e ? this.data.seg.path :(e = 0 > e ? this.data.seg.path.length + e :e - 1, 
this.data.seg.path[e]);
},
fsegment:function(e) {
return "undefined" == typeof e ? this.data.seg.fragment :(e = 0 > e ? this.data.seg.fragment.length + e :e - 1, 
this.data.seg.fragment[e]);
}
};
}
var p = {
a:"href",
img:"src",
form:"action",
base:"href",
script:"src",
iframe:"src",
link:"href",
embed:"src",
object:"data"
}, h = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ], f = {
anchor:"fragment"
}, m = {
strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
}, g = /^[0-9]+$/;
return c.jQuery = function(e) {
null != e && (e.fn.url = function(n) {
var i = "";
return this.length && (i = e(this).attr(t(this[0])) || ""), c(i, n);
}, e.url = c);
}, c.jQuery(window.jQuery), c;
}), function(e) {
function t(e) {
return "object" == typeof e ? e :{
top:e,
left:e
};
}
var n = e.scrollTo = function(t, n, i) {
e(window).scrollTo(t, n, i);
};
n.defaults = {
axis:"xy",
duration:parseFloat(e.fn.jquery) >= 1.3 ? 0 :1
}, n.window = function() {
return e(window)._scrollable();
}, e.fn._scrollable = function() {
return this.map(function() {
var t = this, n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!n) return t;
var i = (t.contentWindow || t).document || t.ownerDocument || t;
return e.browser.safari || "BackCompat" == i.compatMode ? i.body :i.documentElement;
});
}, e.fn.scrollTo = function(i, r, o) {
return "object" == typeof r && (o = r, r = 0), "function" == typeof o && (o = {
onAfter:o
}), "max" == i && (i = 9e9), o = e.extend({}, n.defaults, o), r = r || o.speed || o.duration, 
o.queue = o.queue && o.axis.length > 1, o.queue && (r /= 2), o.offset = t(o.offset), 
o.over = t(o.over), this._scrollable().each(function() {
function a(e) {
u.animate(c, r, o.easing, e && function() {
e.call(this, i, o);
});
}
var s, l = this, u = e(l), d = i, c = {}, p = u.is("html,body");
switch (typeof d) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(d)) {
d = t(d);
break;
}
d = e(d, this);

case "object":
(d.is || d.style) && (s = (d = e(d)).offset());
}
e.each(o.axis.split(""), function(e, t) {
var i = "x" == t ? "Left" :"Top", r = i.toLowerCase(), h = "scroll" + i, f = l[h], m = n.max(l, t);
if (s) c[h] = s[r] + (p ? 0 :f - u.offset()[r]), o.margin && (c[h] -= parseInt(d.css("margin" + i)) || 0, 
c[h] -= parseInt(d.css("border" + i + "Width")) || 0), c[h] += o.offset[r] || 0, 
o.over[r] && (c[h] += d["x" == t ? "width" :"height"]() * o.over[r]); else {
var g = d[r];
c[h] = g.slice && "%" == g.slice(-1) ? parseFloat(g) / 100 * m :g;
}
/^\d+$/.test(c[h]) && (c[h] = c[h] <= 0 ? 0 :Math.min(c[h], m)), !e && o.queue && (f != c[h] && a(o.onAfterFirst), 
delete c[h]);
}), a(o.onAfter);
}).end();
}, n.max = function(t, n) {
var i = "x" == n ? "Width" :"Height", r = "scroll" + i;
if (!e(t).is("html,body")) return t[r] - e(t)[i.toLowerCase()]();
var o = "client" + i, a = t.ownerDocument.documentElement, s = t.ownerDocument.body;
return Math.max(a[r], s[r]) - Math.min(a[o], s[o]);
};
}(jQuery), +function(e) {
"use strict";
var t = function(e, t) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", e, t);
};
t.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body",
callback:function() {}
}, t.prototype.init = function(t, n, i) {
this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(i);
for (var r = this.options.trigger.split(" "), o = r.length; o--; ) {
var a = r[o];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
}
}
this.options.selector ? this._options = e.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.getOptions = function(t) {
return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
show:t.delay,
hide:t.delay
}), t;
}, t.prototype.getDelegateOptions = function() {
var t = {}, n = this.getDefaults();
return this._options && e.each(this._options, function(e, i) {
n[e] != i && (t[e] = i);
}), t;
}, t.prototype.enter = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
"in" == n.hoverState && n.show();
}, n.options.delay.show), void 0) :n.show();
}, t.prototype.leave = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
"out" == n.hoverState && n.hide();
}, n.options.delay.hide), void 0) :n.hide();
}, t.prototype.show = function() {
var t = e.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(t), t.isDefaultPrevented()) return;
var n = this.tip();
this.setContent(), this.options.animation && n.addClass("fade");
var i = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) :this.options.placement, r = /\s?auto?\s?/i, o = r.test(i);
o && (i = i.replace(r, "") || "top"), n.detach().css({
top:0,
left:0,
display:"block"
}).addClass(i), this.options.container ? n.appendTo(this.options.container) :n.insertAfter(this.$element);
var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
if (o) {
var u = this.$element.parent(), d = i, c = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth :u.outerWidth(), h = "body" == this.options.container ? window.innerHeight :u.outerHeight(), f = "body" == this.options.container ? 0 :u.offset().left;
i = "bottom" == i && a.top + a.height + l - c > h ? "top" :"top" == i && a.top - c - l < 0 ? "bottom" :"right" == i && a.right + s > p ? "left" :"left" == i && a.left - s < f ? "right" :i, 
n.removeClass(d).addClass(i);
}
var m = this.getCalculatedOffset(i, a, s, l);
this.applyPlacement(m, i), this.$element.trigger("shown.bs." + this.type), "function" == typeof this.options.callback && this.options.callback.call(this.$element, this.tip());
}
}, t.prototype.applyPlacement = function(e, t) {
var n, i = this.tip(), r = i[0].offsetWidth, o = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10), s = parseInt(i.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
i.offset(e).addClass("in");
var l = i[0].offsetWidth, u = i[0].offsetHeight;
if ("top" == t && u != o && (n = !0, e.top = e.top + o - u), /bottom|top/.test(t)) {
var d = 0;
e.left < 0 && (d = -2 * e.left, e.left = 0, i.offset(e), l = i[0].offsetWidth, u = i[0].offsetHeight), 
this.replaceArrow(d - r + l, l, "left");
} else this.replaceArrow(u - o, u, "top");
n && i.offset(e);
}, t.prototype.replaceArrow = function(e, t, n) {
this.arrow().css(n, e ? 50 * (1 - e / t) + "%" :"");
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle();
e.find(".tooltip-inner")[this.options.html ? "html" :"text"](t), e.removeClass("fade in top bottom left right");
}, t.prototype.hide = function() {
function t() {
"in" != n.hoverState && i.detach();
}
var n = this, i = this.tip(), r = e.Event("hide.bs." + this.type);
return this.$element.trigger(r), i.hide(), r.isDefaultPrevented() ? void 0 :(i.removeClass("in"), 
e.support.transition && this.$tip.hasClass("fade") ? i.one(e.support.transition.end, t).emulateTransitionEnd(150) :t(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, t.prototype.fixTitle = function() {
var e = this.$element;
(e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
}, t.prototype.hasContent = function() {
return this.getTitle();
}, t.prototype.getPosition = function() {
var t = this.$element[0];
return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() :{
width:t.offsetWidth,
height:t.offsetHeight
}, this.$element.offset());
}, t.prototype.getCalculatedOffset = function(e, t, n, i) {
return "bottom" == e ? {
top:t.top + t.height,
left:t.left + t.width / 2 - n / 2
} :"top" == e ? {
top:t.top - i,
left:t.left + t.width / 2 - n / 2
} :"left" == e ? {
top:t.top + t.height / 2 - i / 2,
left:t.left - n
} :{
top:t.top + t.height / 2 - i / 2,
left:t.left + t.width
};
}, t.prototype.getTitle = function() {
var e, t = this.$element, n = this.options;
return e = "function" == typeof n.title ? n.title.call(t[0]) :t.attr("data-original-title") || n.title;
}, t.prototype.tip = function() {
return this.$tip = this.$tip || e(this.options.template);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, t.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, t.prototype.enable = function() {
this.enabled = !0;
}, t.prototype.disable = function() {
this.enabled = !1;
}, t.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, t.prototype.toggle = function(t) {
var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
n.tip().hasClass("in") ? n.leave(n) :n.enter(n);
}, t.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var n = e.fn.tooltip;
e.fn.tooltip = function(n) {
return this.each(function() {
var i = e(this), r = i.data("bs.tooltip"), o = "object" == typeof n && n;
r || i.data("bs.tooltip", r = new t(this, o)), "string" == typeof n && r[n]();
});
}, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
return e.fn.tooltip = n, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e) {
"use strict";
var t = function(e, t) {
this.init("popover", e, t);
};
if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle(), n = this.getContent();
e.find(".popover-title")[this.options.html ? "html" :"text"](t), e.find(".popover-content")[this.options.html ? "html" :"text"](n), 
e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
}, t.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, t.prototype.getContent = function() {
var e = this.$element, t = this.options;
return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) :t.content);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, t.prototype.tip = function() {
return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
};
var n = e.fn.popover;
e.fn.popover = function(n) {
return this.each(function() {
var i = e(this), r = i.data("bs.popover"), o = "object" == typeof n && n;
r || i.data("bs.popover", r = new t(this, o)), "string" == typeof n && r[n]();
});
}, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
return e.fn.popover = n, this;
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var e, t, n, i, r = [].slice, o = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, a = {}.hasOwnProperty, s = function(e, t) {
function n() {
this.constructor = e;
}
for (var i in t) a.call(t, i) && (e[i] = t[i]);
return n.prototype = t.prototype, e.prototype = new n(), e.__super__ = t.prototype, 
e;
}, l = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
String.prototype.toSlug = function() {
var e;
return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "), 
e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "), 
e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $B.trackingAlias = function(e) {
var t;
return t = !!$.cookie("__strk_aliased"), 1 !== $S.user_meta.sign_in_count || t ? void 0 :(analytics.alias(e), 
$.cookie("__strk_aliased", "1", {
expires:30,
path:"/"
}));
}, $B.store = {
enabled:!0,
set:function(e, t, n) {
var i;
if (null != window.store && this.enabled) return i = {
val:t
}, n && (i.exp = n, i.time = new Date().getTime()), window.store.set(e, i);
},
setHours:function(e, t, n) {
return this.set(e, t, Math.floor(36e5 * n));
},
get:function(e) {
var t;
return null != window.store && this.enabled ? (t = window.store.get(e), t ? t.exp && t.time && new Date().getTime() - t.time > t.exp ? null :t.val :null) :null;
},
clear:function() {
var e;
return null != (e = window.store) ? e.clear() :void 0;
},
remove:function(e) {
var t;
return null != (t = window.store) ? t.remove(e) :void 0;
}
}, $B.isStatic = function() {
return "yes" === $("html").attr("static");
}, $B.isHeadlessRendering = function() {
return $S.conf.headless_render && !$B.isStatic();
}, $B.toVal = function(e) {
return "function" == typeof e ? e() :e;
}, $B.topInWindow = function(e) {
return $(e).offset().top - $(window).scrollTop();
}, $B.checkAll = function() {
var e, t, n, i, o;
for (n = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) :[], i = 0, 
o = t.length; o > i; i++) if (e = t[i], e !== n) return !1;
return !0;
}, $B.Cookie = function() {
function e(e) {
this.options = null != e ? e :{}, this.set = o(this.set, this), this.get = o(this.get, this);
}
return e.prototype.get = function(e) {
return $.cookie("__" + this.options.scope + "_" + e);
}, e.prototype.set = function(e, t, n) {
return null == n && (n = {
expires:1,
path:"/"
}), $.cookie("__" + this.options.scope + "_" + e, t, n);
}, e;
}(), $B.dialog = function(e) {
var t, n, i;
return i = $.Deferred(), 0 === $("#sdialog").length && $("body").append('      <div id="sdialog" style="opacity: 0; position: relative; z-index: 99999">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #000; opacity: .6;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div class="white-modal" style="display: block; height: auto;">            <div id="sdialog-content" class="modal-container" style="height: auto; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.7);">              <!--text-->            </div>          </div>        </div>      </div>      '), 
$("#sdialog > div").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown"), 
i.reject();
}, 100);
}), $("#sdialog-content").unbind("click").bind("click", function(e) {
return e.stopPropagation();
}), n = {
easing:"easeInOutQuart",
duration:200
}, $("#sdialog").show().animate({
opacity:"1"
}, n), t = $("#sdialog-content").html(e).css("opacity", 0), setTimeout(function() {
return t.addClass("easeUp"), setTimeout(function() {
return t.css("opacity", 1);
}, 200);
}, 100), i;
}, $.fn.doIf = function(e, t) {
return t($(this)) ? e($(this)) :void 0;
}, $B.customAlert = function(e, t, n) {
var i, r, o;
return r = "", null != n && (r = "      <button class='s-btn cancel gray'>" + n + "</button>"), 
i = "", null != t && (i = "      <div class='bottom-actions'>        " + r + "        <button class='s-btn confirm'>" + t + "</button>      </div>    "), 
o = $B.dialog("    <div class='strikingly-custom-alert'>      <i class='fa fa-exclamation-triangle'></i>      <i class='close'>&times;</i>      <div class='alert-content'>      " + e + "      </div>      " + i + "    <div>"), 
$(".strikingly-custom-alert .confirm").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown");
}, 100), o.resolve();
}), $(".strikingly-custom-alert .close, .strikingly-custom-alert .cancel").unbind("click").bind("click", function() {
return $("#sdialog > div").trigger("click");
}), o;
}, $B.getParentWindow = function(e) {
var t;
return t = e.defaultView || e.parentWindow, t.parent;
}, $B.getFrameForDocument = function(e) {
var t, n, i, r;
for (i = $B.getParentWindow(e).document.getElementsByTagName("iframe"), r = i.length; r-- > 0; ) {
n = i[r];
try {
if (t = n.contentDocument || n.contentWindow.document, t === e) return n;
} catch (o) {}
}
}, $B.log = function() {
var e;
return e = "true" === $B.store.get("strikinglyLogger") || $B.log.enabledFlag, $B.log.enabled() && console && console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0;
}, $B.log.enabled = function() {
var e, t, n;
return t = "true" === $B.store.get("strikinglyLogger"), e = "true" === ("function" == typeof (n = $("meta[name=a-minimum]")).attr ? n.attr("content") :void 0), 
t || e || -1 !== window.location.toString().indexOf(":3000");
}, $B.log.enable = function() {
return $B.store.set("strikinglyLogger", "true"), $B.log.enabledFlag = !0, console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
return $B.store.set("strikinglyLogger", "false"), console.log("Bobcat logger disabled!");
}, $B.growl = function(e) {
var t, n, i;
if ($B.log.enabled()) return n = 2800, i = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:i,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return t.animate({
top:"-=5",
opacity:0
}, function() {
return t.remove();
});
}, n), $("body").append(t);
}, $B.pollHelper = function(e, t) {
var n;
return null == t && (t = 1e3), (n = function() {
return setTimeout(function() {
return e.call(this, n);
}, t), t = 1.5 * t;
})();
}, $B.poller = function(e, t, n) {
var i;
return null == t && (t = function() {}), null == n && (n = function() {}), i = !1, 
$B.pollHelper(function(r) {
var o;
return o = $.getJSON(e), o.success(function(e, n, o) {
return i ? void 0 :e && "retry" !== e && "retry" !== (null != e ? e.html :void 0) ? t(e, n, o) :r();
}), o.error(function(e) {
return "retry" === e.responseText ? r() :n();
});
}), {
cancel:function() {
return i = !0;
}
};
}, $B.restPoller = function(e, t) {
var n;
return null == t && (t = {}), n = {
url:e
}, $.extend(!0, n, t), n.success = function(e) {
var n, i, r, o, a, s, l;
if ((null != e ? null != (i = e.message) ? i.type :void 0 :void 0) && (null != e ? null != (r = e.message) ? r.id :void 0 :void 0)) n = "/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm"; else {
if (!(null != e ? null != (o = e.data) ? null != (a = o.task) ? a.type :void 0 :void 0 :void 0) || !(null != e ? null != (s = e.data) ? null != (l = s.task) ? l.id :void 0 :void 0 :void 0)) return $B.log("Could not get poll URL!"), 
$B.log(e), void 0;
n = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm";
}
return $B.poller(n, t.success, t.error), $B.log("Begin polling: " + n);
}, n.error = function(e, n, i) {
return t.error(e, n, i);
}, $.ajax(n), $B.log("Requesting poller: " + e);
}, $B.waitFor = function(e, t, n) {
var i;
return n = n || 100, i = setInterval(function() {
return e() ? (clearInterval(i), t()) :void 0;
}, n);
}, $B.getQueryValue = function(e) {
var t, n;
return t = new RegExp("[?&]" + e + "=([^&#]*)"), n = t.exec(window.location.href), 
null == n ? "" :n[1];
}, $B.detectCSSFeature = function(e) {
var t, n, i, r, o, a, s;
if (i = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
e = e.toLowerCase(), r = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (o = t[a], void 0 !== n.style[o + r]) return !0;
return !1;
}, function(e) {
var t;
return t = {}, e.setCustomization = function(e, n) {
return t[e] = n;
}, e.getCustomization = function(e) {
return null != t[e] ? t[e] :void 0;
};
}($B), function(e) {
var t;
return t = {}, e.meta = function(e, n) {
var i;
return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"), 
null != i ? t[e] = i :($B.log("" + e + " missing in meta."), void 0)) :t[e];
}, e.metaObject = function(e, n) {
var i;
return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"), 
null != i ? t[e] = jQuery.parseJSON(i) :($B.log("" + e + " missing in meta object."), 
{})) :t[e];
}, e.appMeta = function(t) {
return e.metaObject("app-configs")[t];
}, e.siteMeta = function(t) {
return e.metaObject("site-configs")[t];
};
}($B), $B.ui = {
modalStk:[],
removeFromModalStk:function(e) {
var t, n, i, r, o;
for (o = this.modalStk, t = i = 0, r = o.length; r > i; t = ++i) if (n = o[t], n.dialog[0] === e[0]) return this.modalStk.splice(t, 1), 
!0;
return !1;
},
closeLastModal:function() {
var e;
if (0 !== this.modalStk.length) return e = this.modalStk.pop(), $B.ui.closeModal(e.dialog, e.options);
},
openModal:function(e, t) {
var n, i;
if (!e.is(":visible") || "1" !== e.css("opacity")) return t.shade && (0 === (i = $("#g-shade")).length && (i = $('<div id="g-shade" class="s-editor-modal-bg">').css("opacity", 0).appendTo($("body")), 
i.click(function() {
return $B.ui.closeLastModal();
})), i.stop().show(), setTimeout(function() {
return i.css("opacity", 1);
}, 1)), e.css({
"margin-top":-e.height() / 2
}), $(window).height() > 700 ? e.css("top", "45%") :e.css("top", "50%"), t.absolute && e.css({
position:"absolute",
top:$(document).scrollTop() + $(window).height() / 2
}), e.stop().addClass("invisible").show(), setTimeout(function() {
return e.removeClass("invisible");
}, 1), this.modalStk.push({
dialog:e,
options:t
}), (n = $(".s-modal-bg")).length ? (n.css("opacity", 0).show(), n.css("pointer-events", "auto"), 
n.animate({
opacity:1
}, 400, "easeInOutQuart")) :void 0;
},
closeModal:function(e) {
var t, n, i, r;
return t = $(".s-modal-bg"), r = $("#g-shade"), t.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return t.hide();
}), e.is(":visible") ? (e.addClass("invisible"), i = this.removeFromModalStk(e), 
i || $B.log("error: modal", e, " not in modal stack!"), n = !this.modalStk.length, 
n && (r.css("opacity", 0), $("body").removeClass("no-scroll")), setTimeout(function() {
return e.hide(), n ? r.hide() :void 0;
}, 300)) :void 0;
},
openCloseModal:function(e, t) {
var n, i, r;
return i = {
onlyOpen:!1,
shade:!0,
block:!1,
absolute:!1
}, $.extend(!0, i, t), (null != (r = $.browser) ? r.safari :void 0) && e.find("iframe").length && (i.absolute = !0), 
n = e.is(":visible"), n ? i.onlyOpen || this.closeModal(e, i) :this.openModal(e, i), 
n;
},
openPanel:function(e) {
return e.is(":visible") && "1" === e.css("opacity") ? void 0 :(e.css({
left:"-120px"
}).show(), e.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(e) {
return e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return e.hide();
}) :void 0;
},
openClosePanel:function(e, t) {
var n;
return null == t && (t = !1), n = e.is(":visible"), n ? t || this.closePanel(e) :this.openPanel(e), 
n;
},
openIframePopup:function(e, t) {
var n, i, r, o, a;
return null == t && (t = {}), a = $.extend({
showAddress:!1,
noOverride:!1
}, t), n = $(".s-page-layer").show(), $("iframe", n).attr("src", e), i = $(".address .link", n), 
a.showAddress ? i.attr("href", e).text(e) :i.attr("href", "").text(""), a.noOverride || $(".s-page-wrapper").css({
height:"auto",
width:"auto",
"margin-top":0,
"margin-left":0,
padding:"0"
}), null != a.height && (o = null != a.topOffset ? a.topOffset :0, $(".s-page-wrapper").css({
height:a.height + "px",
"margin-top":(.8 * $(window).height() - a.height) / 2 + o + "px"
})), null != a.width && (r = null != a.leftOffset ? a.leftOffset :0, $(".s-page-wrapper").css({
width:a.width + "px",
"margin-left":(.92 * $(window).width() - a.width) / 2 + r + "px"
})), null != a.extra && $(".s-page-wrapper").css(a.extra), setTimeout(function() {
return n.addClass("open"), $(".s-page-shade, .back-btn", n).click(function() {
return $B.ui.closeIframePopup();
});
}, 100);
},
closeIframePopup:function() {
var e;
return e = $(".s-page-layer"), e.removeClass("open"), setTimeout(function() {
return e.hide(), $(".s-page-shade, .back-btn", e).unbind("click"), $("iframe", e).attr("src", "");
}, 300);
},
openLinkInWindow:function(e) {
return e.click(function(e) {
var t, n, i;
return e.preventDefault(), t = $(this), n = t.attr("href"), i = window.open(n, "Share", "scrollbars=1,width=500,height=500,menubar=no,toolbar=no,location=no");
});
},
openInWindow:function(e, t) {
var n;
return null == t && (t = {
height:500,
width:500
}), n = window.open(e, "Share", "scrollbars=1,width=" + t.width + ",height=" + t.height + ",menubar=no,toolbar=no,location=no");
}
}, $B.Queue = function() {
function e() {
this.clear = o(this.clear, this), this.size = o(this.size, this), this.dequeue = o(this.dequeue, this), 
this.enqueue = o(this.enqueue, this), this.q = [];
}
return e.prototype.enqueue = function(e) {
return this.q.push(e);
}, e.prototype.dequeue = function() {
return this.q.shift();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.Stack = function() {
function e() {
this.clear = o(this.clear, this), this.size = o(this.size, this), this.pop = o(this.pop, this), 
this.push = o(this.push, this), this.q = [];
}
return e.prototype.push = function(e) {
return this.q.push(e);
}, e.prototype.pop = function() {
return this.q.pop();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.ObservableStack = function(e) {
function t() {
this.clear = o(this.clear, this), this.pop = o(this.pop, this), this.push = o(this.push, this), 
t.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return s(t, e), t.prototype.push = function(e) {
return t.__super__.push.call(this, e), this.observableSize(this.size());
}, t.prototype.pop = function() {
return this.observableSize(this.size() - 1), t.__super__.pop.call(this);
}, t.prototype.clear = function() {
return t.__super__.clear.call(this), this.observableSize(this.size());
}, t;
}($B.Stack), window.Singleton = function() {
function e() {}
var t;
return t = void 0, e.get = function(e) {
return null != t ? t :t = new i(e);
}, e;
}(), i = function() {
function e(e) {
this.args = e;
}
return e.prototype.echo = function() {
return this.args;
}, e;
}(), n = [ "extended", "included" ], $B.Module = function() {
function e() {}
return e.extend = function(e) {
var t, i, r;
for (t in e) i = e[t], l.call(n, t) < 0 && (this[t] = i);
return null != (r = e.extended) && r.apply(this), this;
}, e.include = function(e) {
var t, i, r;
for (t in e) i = e[t], l.call(n, t) < 0 && (this.prototype[t] = i);
return null != (r = e.included) && r.apply(this), this;
}, e;
}(), $B.UrlHelper = {
isEmail:function(e) {
var t;
return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
t.test(e);
},
hasProtocol:function(e) {
var t, n;
return t = /^((http|https|ftp|mailto|tel|fb|skype|itms-services):)/, n = /^(#)/, 
t.test(e) || n.test(e);
},
addProtocol:function(e, t) {
return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" :"javascript:void(0);" :this.isEmail(e) ? e = "mailto:" + e :this.hasProtocol(e) || (e = "http://" + e), 
e;
},
createUrlParser:function(e) {
var t;
return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
}
}, $B.HtmlHelper = {
htmlEncode:function(e) {
return $("<div/>").text(e).html();
},
htmlDecode:function(e) {
return $("<div/>").html(e).text();
},
checkClosingTags:function(e) {
var t, n, i, r, o, a, s, u, d, c, p;
for (i = function(e) {
var t;
return t = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
e = e.split(/[<>\s]/g)[1], e = e.replace(/\//g, ""), l.call(t, e) >= 0;
}, t = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, r = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
a = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, o = e; r.test(o) || a.test(o); ) o = o.replace(r, ""), 
o = o.replace(a, "");
for (u = null != (p = o.match(t)) ? p :[], n = 0, d = 0, c = u.length; c > d; d++) if (s = u[d], 
!i(s) && ("/" !== s[1] ? n += 1 :n -= 1, 0 > n)) return !1;
return 0 === n;
}
}, $B.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
getOptions:function(e) {
var t, n, i, r, o, a, s;
return this.conversions ? this.conversions :(window.form = e, r = e.find('[name="asset[image_size]"]').get(0), 
a = e.find('[name="asset[thumb_size]"]').get(0), o = this.toImageSize($(r).val()), 
s = this.toImageSize($(a).val()), i = function(e) {
return e.slice(0, -1).split("x")[0];
}, n = function(e) {
return e.slice(0, -1).split("x")[1];
}, t = function(e) {
var t;
return t = e.charAt(e.length - 1), "#" === t ? {
crop:"fill",
gravity:"faces:center"
} :"<" === t || ">" === t ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:i(o),
height:n(o)
},
thumb:{
width:i(s),
height:n(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, t(o)), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)), 
this.conversions);
},
toImageSize:function(e) {
return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]), 
e;
}
}, e = function() {
function e(e) {
this.handler = e, this.queue = [];
}
return e.prototype.run = function() {
var e, t = this;
return e = function() {
return t.queue.length > 0 ? t.run() :void 0;
}, this.handler(this.queue.shift(), e);
}, e.prototype.append = function(e) {
return this.queue.push(e), 1 === this.queue.length ? this.run() :void 0;
}, e;
}(), t = function() {
function e(e, t, n) {
this.item = e, this.url = t, this.callback = n;
}
return e;
}(), $B.loadFacebookScript = function() {
return $S.global_conf.in_china ? void 0 :function(e, t, n) {
var i, r;
return i = e.getElementsByTagName(t)[0], e.getElementById(n) ? void 0 :(r = e.createElement(t), 
r.id = n, r.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=138736959550286", 
i.parentNode.insertBefore(r, i));
}(document, "script", "facebook-jssdk");
}, $B.TwitterLogin = function() {
function e(e) {
this._configs = e;
}
return e.prototype.load = function(e) {
return $S.global_conf.in_china || null != window.twttr ? void 0 :(window.twttr = function(e, t, n) {
var i, r, o;
return i = e.getElementsByTagName(t)[0], e.getElementById(n) ? void 0 :(r = e.createElement(t), 
r.id = n, r.src = "//platform.twitter.com/widgets.js", i.parentNode.insertBefore(r, i), 
window.twttr || (o = {
_e:[],
ready:function(e) {
return o._e.push(e);
}
}));
}(document, "script", "twitter-wjs"), window.twttr.ready(function(t) {
return t.events.bind("tweet", function(t) {
return callback.tweet ? e.tweet(t) :void 0;
});
}));
}, e;
}(), $B.FacebookLogin = function() {
function e(e) {
this._configs = e, this.loadFacebook = o(this.loadFacebook, this), this.fbLoginPopup = o(this.fbLoginPopup, this);
}
return e.prototype.fbLoginPopup = function(e) {
return FB.login(function(t) {
if (t.authResponse) {
if (e.success) return e.success(t);
} else if (e.fail) return e.fail(t);
}, {
scope:this._configs.FACEBOOK_PERMS
});
}, e.prototype.loadFacebook = function(e) {
var t = this;
if (!$S.global_conf.in_china) return window.fbAsyncInit = function() {
return FB.init({
appId:t._configs.FACEBOOK_APP_ID,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(t) {
if (console.log(t), "connected" === t.status) {
if (e.connected) return e.connected(t);
} else if ("not_authorized" === t.status) {
if (e.notAuthorized) return e.notAuthorized(t);
} else if (e.others) return e.others(t);
});
}, function(e) {
var t, n, i;
return t = "facebook-jssdk", i = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 :(n = e.createElement("script"), 
n.id = t, n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", i.parentNode.insertBefore(n, i));
}(document);
}, e;
}(), $B.LinkedinLogin = function() {
function e(e) {
this._configs = e, this.loadLinkedin = o(this.loadLinkedin, this), this.linkedinLogout = o(this.linkedinLogout, this), 
this.linkedinLoginPopup = o(this.linkedinLoginPopup, this);
}
return e.prototype.linkedinLoginPopup = function(e) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (e.success) return e.success();
} else if (e.fail) return e.fail();
});
}, e.prototype.linkedinLogout = function() {
return IN.User.logout();
}, e.prototype.loadLinkedin = function(e) {
var t = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:t._configs.LINKEDIN_API_KEY,
scope:t._configs.LINKEDIN_PERMS,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), e.connected) ? e.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), e.disconnected) ? e.disconnected() :void 0;
}), e.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, e.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, e;
}(), window.AjaxQueueBuffer = e, window.Task = t, $B.debounce = function(e, t) {
var n;
return null == t && (t = 100), n = 0, function() {
var i, r;
return r = this, i = arguments, clearTimeout(n), n = setTimeout(function() {
return e.apply(r, i);
}, t);
};
}, $B.genGeneralErrorHandler = function(e) {
return function(t) {
var n, i, r;
return n = null != t.responseJSON ? null != (i = t.responseJSON.meta) ? null != (r = i.userMessage) ? r.plain :void 0 :void 0 :I18n.t("js.pages.edit.errors.api_error"), 
$B.customAlert(n), "function" == typeof e ? e() :void 0;
};
}, $B.lazyloadIframe = function() {
var e;
return e = 0, function(t, n) {
return null == n && (n = -1), -1 === n && (n = 1e4 + 1e3 * e), e += 1, setTimeout(function() {
return t.data("src") !== t.attr("src") ? (t.attr("src", t.data("src")), "function" == typeof $B.timerCheck ? $B.timerCheck("Loading iframe #" + t.attr("id")) :void 0) :void 0;
}, n);
};
}(), $B.Embedly = function() {
function e() {
this.apiKey = $S.conf.EMBEDLY_API_KEY;
}
return e.prototype.queryUrlForHtml = function(e) {
return $.ajax({
type:"GET",
url:"http://api.embed.ly/1/oembed",
data:{
key:this.apiKey,
url:e
},
dataType:"JSON"
});
}, e;
}(), $B.Prefetcher = function() {
function e(e) {
var t = this;
this.prepared = !1, this.url = e, this.nextPage = $("iframe.prefetch"), 0 === this.nextPage.length ? setTimeout(function() {
return t.nextPage = $("<iframe class='prefetch' src='" + e + "'></iframe>").load(function() {
return t.prepared = !0;
}), t.nextPage.hide().appendTo("body");
}, 1e3) :this.prepared = !0;
}
return e.prototype.getTitle = function() {
return this.nextPage[0].contentDocument.title;
}, e.prototype.expand = function() {
return $("body > *:not(.prefetch)").remove(), this.nextPage.css({
border:"0",
position:"fixed",
top:0,
bottom:0,
left:0,
right:0,
width:"100%",
height:"100%",
"z-index":9999999,
display:"block"
});
}, e;
}();
}.call(this);

var I18n = I18n || {};

I18n.defaultLocale = "en", I18n.fallbacks = !1, I18n.defaultSeparator = ".", I18n.locale = null, 
I18n.PLACEHOLDER = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm, I18n.isValidNode = function(e, t, n) {
return null !== e[t] && e[t] !== n;
}, I18n.lookup = function(e, t) {
var n, t = t || {}, i = e, r = this.prepareOptions(I18n.translations), o = r[t.locale || I18n.currentLocale()], t = this.prepareOptions(t);
if (o) {
for ("object" == typeof e && (e = e.join(this.defaultSeparator)), t.scope && (e = t.scope.toString() + this.defaultSeparator + e), 
e = e.split(this.defaultSeparator); e.length > 0; ) if (n = e.shift(), o = o[n], 
!o) {
I18n.fallbacks && !t.fallback && (o = I18n.lookup(i, this.prepareOptions({
locale:I18n.defaultLocale,
fallback:!0
}, t)));
break;
}
return !o && this.isValidNode(t, "defaultValue") && (o = t.defaultValue), o;
}
}, I18n.prepareOptions = function() {
for (var e, t = {}, n = arguments.length, i = 0; n > i; i++) if (e = arguments[i]) for (var r in e) this.isValidNode(t, r) || (t[r] = e[r]);
return t;
}, I18n.interpolate = function(e, t) {
t = this.prepareOptions(t);
var n, i, r, o = e.match(this.PLACEHOLDER);
if (!o) return e;
for (var a = 0; n = o[a]; a++) r = n.replace(this.PLACEHOLDER, "$1"), i = t[r], 
this.isValidNode(t, r) || (i = "[missing " + n + " value]"), regex = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), 
e = e.replace(regex, i);
return e;
}, I18n.translate = function(e, t) {
t = this.prepareOptions(t);
var n = this.lookup(e, t);
try {
return "object" == typeof n ? "number" == typeof t.count ? this.pluralize(t.count, e, t) :n :this.interpolate(n, t);
} catch (i) {
return this.missingTranslation(e);
}
}, I18n.localize = function(e, t) {
switch (e) {
case "currency":
return this.toCurrency(t);

case "number":
return e = this.lookup("number.format"), this.toNumber(t, e);

case "percentage":
return this.toPercentage(t);

default:
return e.match(/^(date|time)/) ? this.toTime(e, t) :t.toString();
}
}, I18n.parseDate = function(e) {
var t, n;
if ("object" == typeof e) return e;
if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)) {
for (var i = 1; 6 >= i; i++) t[i] = parseInt(t[i], 10) || 0;
t[2] -= 1, n = t[7] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6])) :new Date(t[1], t[2], t[3], t[4], t[5], t[6]);
} else "number" == typeof e ? (n = new Date(), n.setTime(e)) :e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (n = new Date(), 
n.setTime(Date.parse(e))) :(n = new Date(), n.setTime(Date.parse(e)));
return n;
}, I18n.toTime = function(e, t) {
var n = this.parseDate(t), i = this.lookup(e);
return n.toString().match(/invalid/i) ? n.toString() :i ? this.strftime(n, i) :n.toString();
}, I18n.strftime = function(e, t) {
var n = this.lookup("date");
if (!n) return e.toString();
n.meridian = n.meridian || [ "AM", "PM" ];
var i = e.getDay(), r = e.getDate(), o = e.getFullYear(), a = e.getMonth() + 1, s = e.getHours(), l = s, u = s > 11 ? 1 :0, d = e.getSeconds(), c = e.getMinutes(), p = e.getTimezoneOffset(), h = Math.floor(Math.abs(p / 60)), f = Math.abs(p) - 60 * h, m = (p > 0 ? "-" :"+") + (h.toString().length < 2 ? "0" + h :h) + (f.toString().length < 2 ? "0" + f :f);
l > 12 ? l -= 12 :0 === l && (l = 12);
var g = function(e) {
var t = "0" + e.toString();
return t.substr(t.length - 2);
}, _ = t;
return _ = _.replace("%a", n.abbr_day_names[i]), _ = _.replace("%A", n.day_names[i]), 
_ = _.replace("%b", n.abbr_month_names[a]), _ = _.replace("%B", n.month_names[a]), 
_ = _.replace("%d", g(r)), _ = _.replace("%e", r), _ = _.replace("%-d", r), _ = _.replace("%H", g(s)), 
_ = _.replace("%-H", s), _ = _.replace("%I", g(l)), _ = _.replace("%-I", l), _ = _.replace("%m", g(a)), 
_ = _.replace("%-m", a), _ = _.replace("%M", g(c)), _ = _.replace("%-M", c), _ = _.replace("%p", n.meridian[u]), 
_ = _.replace("%S", g(d)), _ = _.replace("%-S", d), _ = _.replace("%w", i), _ = _.replace("%y", g(o)), 
_ = _.replace("%-y", g(o).replace(/^0+/, "")), _ = _.replace("%Y", o), _ = _.replace("%z", m);
}, I18n.toNumber = function(e, t) {
t = this.prepareOptions(t, this.lookup("number.format"), {
precision:3,
separator:".",
delimiter:",",
strip_insignificant_zeros:!1
});
var n, i, r = 0 > e, o = Math.abs(e).toFixed(t.precision).toString(), a = o.split("."), s = [];
for (e = a[0], n = a[1]; e.length > 0; ) s.unshift(e.substr(Math.max(0, e.length - 3), 3)), 
e = e.substr(0, e.length - 3);
if (i = s.join(t.delimiter), t.precision > 0 && (i += t.separator + a[1]), r && (i = "-" + i), 
t.strip_insignificant_zeros) {
var l = {
separator:new RegExp(t.separator.replace(/\./, "\\.") + "$"),
zeros:/0+$/
};
i = i.replace(l.zeros, "").replace(l.separator, "");
}
return i;
}, I18n.toCurrency = function(e, t) {
return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), {
unit:"$",
precision:2,
format:"%u%n",
delimiter:",",
separator:"."
}), e = this.toNumber(e, t), e = t.format.replace("%u", t.unit).replace("%n", e);
}, I18n.toHumanSize = function(e, t) {
for (var n, i, r = 1024, o = e, a = 0; o >= r && 4 > a; ) o /= r, a += 1;
return 0 === a ? (n = this.t("number.human.storage_units.units.byte", {
count:o
}), i = 0) :(n = this.t("number.human.storage_units.units." + [ null, "kb", "mb", "gb", "tb" ][a]), 
i = o - Math.floor(o) === 0 ? 0 :1), t = this.prepareOptions(t, {
precision:i,
format:"%n%u",
delimiter:""
}), e = this.toNumber(o, t), e = t.format.replace("%u", n).replace("%n", e);
}, I18n.toPercentage = function(e, t) {
return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), {
precision:3,
separator:".",
delimiter:""
}), e = this.toNumber(e, t), e + "%";
}, I18n.pluralize = function(e, t, n) {
var i;
try {
i = this.lookup(t, n);
} catch (r) {}
if (!i) return this.missingTranslation(t);
var o;
switch (n = this.prepareOptions(n), n.count = e.toString(), Math.abs(e)) {
case 0:
o = this.isValidNode(i, "zero") ? i.zero :this.isValidNode(i, "none") ? i.none :this.isValidNode(i, "other") ? i.other :this.missingTranslation(t, "zero");
break;

case 1:
o = this.isValidNode(i, "one") ? i.one :this.missingTranslation(t, "one");
break;

default:
o = this.isValidNode(i, "other") ? i.other :this.missingTranslation(t, "other");
}
return this.interpolate(o, n);
}, I18n.missingTranslation = function() {
for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++) e += "." + arguments[n];
return e += '" translation]';
}, I18n.currentLocale = function() {
return I18n.locale || I18n.defaultLocale;
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize;

var I18n = I18n || {};

I18n.translations = {
en:{
js:{
pages:{
edit:{
confirm:{
delete_section:"Are you sure you want to delete this section? This action cannot be undone.",
unsaved_changes:"You have unsaved changes on this page. If you navigate away from this page you will lose those changes."
},
errors:{
save_error:"A problem occured while saving your page. Please try again.",
network_error:"Oops, a network issue occurred, please refresh and try again.",
upload_network_error:"Oops, a network issue prevents you from uploading, please refresh and try again.",
effects_network_error:"Oops, a network issue prevents you from adding effects, please refresh and try again.",
max_slides_reached:"You can only create {{max}} slides now. Use the feedback button below to let us know if you'd like to create more. Thanks!",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
google_maps:{
enter_location:"Please enter a location.",
view_larger_map:"View larger map"
},
ecwid:{
enter_store_id:"Please enter a Store ID."
},
shared:{
errors:null
},
soundcloud:{
errors:{
invalid_url:"Invalid URL! Please use a valid soundcloud.com URL."
}
},
slides:{
errors:{
invalid_url:"Invalid URL! Please use a valid slid.es URL."
}
}
},
domain_emails:{
confirm:{
delete_entry:"Are you sure you want to delete this entry?"
},
errors:{
limit_reached:"You can only create {{limit}} emails."
}
},
notice:{
mobile_notice:"Welcome to the Strikingly editor! It looks like you're using a mobile device. Websites that you build with Strikingly look awesome on all devices, but we recommend editing your site on a desktop or laptop."
}
},
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
}
},
invitations:{
"new":{
email_hint:"Enter a list of recipients' emails here, or import your contacts by clicking the button above.",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
html_editor:{
script_error:"The HTML you entered contains scripts that cannot be displayed in the editor. <br/><br/> Please preview your site to view your content."
},
subscriptions:{
"new":{
why_billing_info:"We ask for your credit card to prevent interruption of your Strikingly account if you choose to keep your account active after your free period expires. It also allows us to reduce fraud. <br/><br/> Your credit card will not be charged at any point during your free period. If you cancel during the free period, you will not be charged at any time. <br/><br/> We'll even send you an email three days before your free period is over to remind you it's about to expire.",
billing:{
heading:"{{free_period_full_string}} Free &mdash; Guaranteed",
coupon_applied_free_period_notice:"You won't be billed immediately. The first {{free_period_days}} days are free. Starting {{billing_start_date}}, you will be billed <strong class='dark'>${{discounted_price}} per {{period}}</strong> and <strong class='dark'>${{price}} per {{period}}</strong> after that.",
coupon_applied_no_free_period_notice:"You will be billed <strong class='dark'>${{discounted_price}} per {{period}}</strong> and <strong class='dark'>${{price}} per {{period}}</strong> after that.",
free_period_notice:"You won't be billed immediately. The first {{free_period_days}} days are free. Starting {{billing_start_date}}, you will be billed <strong class='dark'>${{price}} per {{period}}</strong>.",
no_free_period_notice:"You will be billed <strong class='dark'>${{price}} per {{period}}</strong>."
},
prices:{
pro_yearly:"$192/year",
pro_monthly:"$20/month",
starter_yearly:"$96/year",
starter_monthly:"$12/month"
},
coupon:{
wait:"Wait...",
invalid:"Invalid coupon code.",
applied:"{{percent}}% discount applied!",
applied_notice:"Coupon applied! The coupon is only valid for the first billing period!"
},
periods:{
month:"month",
year:"year"
},
errors:{
card_number:"Please enter a valid card number",
cvc:"Please enter a valid security code",
card_expiry:"Please enter a valid expiration"
}
},
edit:{
confirm:{
general:"Are you absolutely sure you wish to change your plan? If you're upgrading, your account will be billed accordingly.",
upgrade:"Are you absolutely sure you wish to upgrade? Your account will be billed on a pro-rated basis.",
downgrade:"Are you absolutely sure you wish to downgrade? Your account will have a credit for the amount you've already paid."
}
}
},
api:{
subscriptions:{
check_coupon:{
errors:{
invalid_coupon:"Coupon code is invalid.",
expired:"Coupon has expired."
}
},
plan:{
billed_monthly:"billed monthly",
billed_yearly:"billed yearly"
}
},
registrations:{
create:{
errors:{
missing_params:"Email and firstname required.",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
jobs:{
custom_domain_setup:{
success:{
connected:"Successfully disconnected custom domain.",
disconnected:"Successfully connected. It could take up to 48 hours to set up."
},
errors:{
exception:"Network timeout. Please retry. Our engineering team is looking into it now.",
invalid:"{{message}}"
}
}
},
pages:{
shared:{
errors:{
access_denied:"Not authorized to perform this operation.",
session_expired:"Session expired. Please login again to edit the page.",
record_not_found:"It looks like the page has changed its URL. Click ok to go to the dashboard and select the page you want to edit."
}
},
update:{
success:{
saved:"Page Saved."
},
errors:{
exeption:"There's some issue saving your content. Our engineering team is looking into it now.",
invalid:"{{message}}"
}
},
publish:{
success:{
published:"Page published."
}
},
custom_domain_update:{
errors:{
missing_params:"Something went wrong. Please try again. If the problem persists, use the support button to contact us.",
no_change:"Nothing changed.",
invalid:"{{message}}",
exception:"Network timeout. Please retry. Our engineering team is looking into it now."
},
success:{
saved:"Updated."
}
},
settings_update:{
errors:{
missing_params:"Something went wrong. Please try again. If the problem persists, use the support button to contact us.",
invalid:"{{message}}"
},
success:{
permalink_changed:"Page will refresh in few seconds. Click <a href='{{edit_page_http_url}}'>here</a> if it doesn't.",
saved:"Saved!"
}
}
},
generators:{
new_year_resolutions:{
errors:{
missing_user:"Missing user.",
invalid:"{{message}}",
exception:"Network timeout. Please retry. Our engineering team is looking into it now.",
oauth_exception:"Your Facebook session has timed out. Please login with Facebook again."
}
},
generate_from_facebook:{
errors:{
missing_user:"Missing user.",
invalid:"{{message}}",
exception:"Network timeout. Please retry. Our engineering team is looking into it now.",
oauth_exception:"Your Facebook session has timed out. Please login with Facebook again."
}
},
generate_from_linkedin:{
errors:{
missing_user:"Missing user.",
invalid:"{{message}}",
exception:"Network timeout. Please retry. Our engineering team is looking into it now.",
oauth_exception:"Your LinkedIn session has timed out. Please login with LinkedIn again."
}
},
share_on_linkedin:{
errors:{
exception:"Something went wrongs. Please retry. Our engineering team is looking into it now."
}
}
},
analytics:{
period_title:{
past_week:"Past week",
past_month:"Past month",
past_3_months:"Past 3 months",
past_year:"Past year",
past_24_hours:"Past 24 hours"
},
show:{
errors:{
exception:"There's some issue loading your page analytics. Our engineering team is looking into it now.",
record_not_found:"Page not found."
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"There's some issue loading the video. Our engineering team is looking into it now."
}
}
}
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal",
disqus:"Disqus"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!",
disqus:"Add a discussion board, help you build a community of active readers and commenters."
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
}
}
},
ja:{
js:{
subscriptions:{
"new":{
errors:{
card_expiry:"適切な有効期限を入力してください",
cvc:"有効なセキュリティコードを入力してください",
card_number:"有効なカード番号を入力してください"
},
coupon:{
invalid:"無効なクーポンコード。",
applied:"{{percent}}%の割引が適用されました!",
wait:"お待ちください...",
applied_notice:"クーポンが使用されました。クーポンは最初のお支払の請求周期にのみ適用されます。"
},
prices:{
starter_monthly:"月額12ドル",
pro_monthly:"月額20ドル",
starter_yearly:"年額96ドル",
pro_yearly:"年額192ドル"
},
periods:{
year:"年",
month:"月"
},
billing:{
coupon_applied_no_free_period_notice:"<strong class='dark'>{{period}}当たり{{discounted_price}}ドル</strong>が課金され、その後は<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。",
no_free_period_notice:"<strong class='dark'>{{period}}当たり${{price}}ドル </strong>が課金されます。",
heading:"{{free_period_full_string}}無料 — 保証します",
coupon_applied_free_period_notice:"お申し込みから{{free_period_days}}日間は無料ですので、すぐには課金されません。{{billing_start_date}}から、まずは<strong class='dark'>{{period}}当たり{{discounted_price}}ドル</strong>が課金され、その後は<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。",
free_period_notice:"お申し込みから{{free_period_days}}日間は無料ですので、すぐには課金されません。{{billing_start_date}}から、<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。"
},
why_billing_info:"無料期間終了後に継続利用をご希望の場合、お客様のStrikinglyアカウントをそのまま途切れることなくお使いいただけるよう、クレジットカード情報を提示いただいています。不正行為の軽減にも役立ちます。<br/><br/>無料期間中はクレジットカードへの請求は一切ありません。無料期間中にキャンセルした場合、請求は一切ありません。<br/><br/>無料期間終了の3日前に、終了期間が近づいたことをお知らせするメールを送信いたします。"
},
edit:{
confirm:{
general:"本当にプランを変更してよろしいですか？アップグレードした場合は設定価格に基いて請求されます。",
upgrade:"本当にアップグレードしてよろしいですか？Pro版の価格に基づいてアカウントに請求されます。",
downgrade:"本当にダウングレードしてもよろしいですか？既にお支払いいただいた金額はクレジットとしてアカウントに入れられます。"
}
}
},
html_editor:{
script_error:"入力されたHTMLにはエディタで表示できないスクリプトが含まれています。<br/><br/>コンテンツを表示するにはサイトをプレビューしてください。"
},
invitations:{
"new":{
email_hint:"宛先のメールアドレスのリストをここに入力してください!",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
pages:{
edit:{
confirm:{
delete_section:"このセクションを削除しますか?削除すると元には戻せません。",
unsaved_changes:"このページの変更を保存していません。このページから移動するとこれらの変更は失われます。"
},
errors:{
save_error:"ページの保存中に問題が起きました。もう一度お試しください。",
network_error:"ネットワークに問題が起きました。リフレッシュしてもう一度お試しください。",
upload_network_error:"ネットワークの問題のためアップロードすることができません。リフレッシュしてもう一度お試しください。",
effects_network_error:"ネットワークの問題のため効果を追加することができません。リフレッシュしてもう一度お試しください。",
max_slides_reached:"現在作成できるのは {{max}} スライドのみです。もっと作成したい場合は下のフィードバックボタンを使用してお知らせください。ありがとうございます！",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
google_maps:{
enter_location:"位置情報を入力してください。",
view_larger_map:"もっと大きいマップを見る"
},
ecwid:{
enter_store_id:"ストアID を入力してください。"
},
shared:{
errors:null
},
soundcloud:{
errors:{
invalid_url:"無効なURLです。Soundcloud.comの有効なURLを使用してください。"
}
},
slides:{
errors:{
invalid_url:"無効なURLです。slid.esの有効なURLを使用してください。"
}
}
},
domain_emails:{
confirm:{
delete_entry:"このエントリーを本当に削除しますか？"
},
errors:{
limit_reached:"作成できるメールは{{limit}}通までです。"
}
}
},
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
}
},
api:{
pages:{
shared:{
errors:{
session_expired:"セッションがタイムアウトしました。再度ログインしてページを編集してください。",
access_denied:"この操作の実行は許可されていません。",
record_not_found:"ページのURLが変更されているようです。「OK」をクリックしてダッシュボードへ行き、編集したいページを選択してください。"
}
},
custom_domain_update:{
errors:{
exception:"ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
invalid:"{{message}}",
missing_params:"問題が起きました。もう一度お試しください。問題が解消しない場合は、サポートボタンを使用してご連絡ください。",
no_change:"変更はありません。"
},
success:{
saved:"更新されました。"
}
},
update:{
success:{
saved:"ページを保存しました。"
},
errors:{
exeption:"コンテンツの保存中に問題が起きました。当社の技術チームが現在調査しております。",
invalid:"{{message}}"
}
},
settings_update:{
errors:{
invalid:"{{message}}",
missing_params:"問題が起きました。もう一度お試しください。問題が解消しない場合は、サポートボタンを使用してご連絡ください。"
},
success:{
permalink_changed:"ページは数秒以内にリフレッシュされます。 リフレッシュされない場合は<a href='{{edit_page_http_url}}'>ここ</a> をクリックしてください。",
saved:"保存しました！"
}
},
publish:{
success:{
published:"ページを公開しました。"
}
}
},
jobs:{
custom_domain_setup:{
success:{
disconnected:"接続しました。設定には最高で48時間かかる場合があります。",
connected:"カスタムドメインとの接続を切断しました。"
},
errors:{
exception:"ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
invalid:"{{message}}"
}
}
},
subscriptions:{
check_coupon:{
errors:{
invalid_coupon:"クーポンコードが無効です。",
expired:"クーポンの期限が切れました。"
}
},
plan:{
billed_monthly:"月額料金",
billed_yearly:"年額料金"
}
},
registrations:{
create:{
errors:{
missing_params:"メールアドレスと名前は必須です。",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
generators:{
new_year_resolutions:{
errors:{
missing_user:"ユーザーが存在しません。",
invalid:"{{message}}",
exception:"ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
oauth_exception:"Facebookのセッションがタイムアウトしました。Facebookにログインしなおしてください。"
}
},
generate_from_facebook:{
errors:{
missing_user:"ユーザーが存在しません。",
invalid:"{{message}}",
exception:"ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
oauth_exception:"Facebookのセッションがタイムアウトしました。Facebookに再度ログインしてください。"
}
},
generate_from_linkedin:{
errors:{
missing_user:"ユーザーが存在しません。",
invalid:"{{message}}",
exception:"ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
oauth_exception:"LinkedInのセッションがタイムアウトしました。LinkedInにログインしなおしてください。"
}
},
share_on_linkedin:{
errors:{
exception:"問題が起きました。もう一度お試しください。当社の技術チームが現在調査しております。"
}
}
},
analytics:{
period_title:{
past_week:"過去1週間",
past_month:"過去1ヶ月",
past_3_months:"過去3ヶ月",
past_year:"過去1年",
past_24_hours:"過去24時間"
},
show:{
errors:{
exception:"サイト解析ページのロード中に問題が生じました。当社の技術チームが現在調査しております。",
record_not_found:"ページが見つかりません。"
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"動画のロード中に問題が起きました。当社の技術チームが現在調査しております。"
}
}
}
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!"
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
}
}
},
"zh-TW":{
js:{
api:{
generators:{
new_year_resolutions:{
errors:{
missing_user:"找不到用戶。",
invalid:"{{message}}",
exception:"網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
oauth_exception:"您的Facebook階段作業已逾時，請再次登入Facebook。"
}
},
generate_from_facebook:{
errors:{
missing_user:"找不到用戶。",
invalid:"{{message}}",
exception:"網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
oauth_exception:"您的Facebook階段作業已逾時，請再次登入Facebook。"
}
},
generate_from_linkedin:{
errors:{
missing_user:"找不到用戶。",
invalid:"{{message}}",
exception:"網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
oauth_exception:"您的LinkedIn階段作業已逾時，請再次登入LinkedIn。"
}
},
share_on_linkedin:{
errors:{
exception:"發生錯誤，請再試一次。我們的工程部正積極跟進有關問題。"
}
}
},
analytics:{
period_title:{
past_week:"最近一週",
past_month:"最近一個月",
past_3_months:"最近 3 個月",
past_year:"最近 1 年",
past_24_hours:"最近 24 小時"
},
show:{
errors:{
exception:"載入網頁分析時出現了一些問題。我們的工程部正積極跟進。",
record_not_found:"找不到網頁。"
}
}
},
subscriptions:{
plan:{
billed_monthly:"月繳",
billed_yearly:"年繳"
},
check_coupon:{
errors:{
invalid_coupon:"優惠券編碼無效。",
expired:"優惠券已過期。"
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"載入影片時出現了一些問題。我們的工程部正積極跟進。"
}
}
},
registrations:{
create:{
errors:{
missing_params:"必須填寫電郵地址及名字。",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
jobs:{
custom_domain_setup:{
success:{
connected:"您已成功取消連結自訂網域。",
disconnected:"您已成功建立連接，有關設置將於48小時內完成。"
},
errors:{
exception:"網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
invalid:"{{message}}"
}
}
},
pages:{
shared:{
errors:{
access_denied:"您需要權限來執行此操作。",
session_expired:"您的使用期限已過。如欲編輯網頁，請再次登入。",
record_not_found:"您的網頁網址似乎已變更。請按一下「好的」以前往主控板，然後選擇您要編輯的網頁。"
}
},
update:{
success:{
saved:"已儲存網頁。"
},
errors:{
exeption:"儲存內容時出現了一些問題。我們的工程部正積極跟進。",
invalid:"{{message}}"
}
},
publish:{
success:{
published:"已發佈網頁。"
}
},
custom_domain_update:{
errors:{
missing_params:"發生錯誤，請再試一次。如果問題持續發生，請按「支援」按鈕與我們聯絡。",
no_change:"沒有任何變更。",
invalid:"{{message}}",
exception:"網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。"
},
success:{
saved:"已更新。"
}
},
settings_update:{
errors:{
missing_params:"發生錯誤，請再試一次。如果問題持續發生，請按「支援」按鈕與我們聯絡。",
invalid:"{{message}}"
},
success:{
permalink_changed:"網頁將會在幾秒鐘內刷新。如果沒有，請按<a href='{{edit_page_http_url}}'>此處</a>。",
saved:"已儲存！"
}
}
}
},
pages:{
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
},
edit:{
confirm:{
delete_section:"您確定要刪除此區塊嗎？此動作將無法還原。",
unsaved_changes:"您的網頁尚有未儲存的變更。如果您現在離開這一頁，那些變更將會遺失。"
},
errors:{
save_error:"儲存網頁時發生錯誤，請再試一次。",
network_error:"噢！網路連線發生問題，請刷新頁面後再重試。",
upload_network_error:"噢！網路連線發生問題以致無法進行上載，請刷新頁面後再重試。",
effects_network_error:"噢！網路連線發生問題以致無法加入特效，請刷新頁面後再重試。",
max_slides_reached:"您現在最多只能建立{{max}}張投影片。如需要建立更多投影片，請點擊下面的「意見回饋」按鈕告訴我們，謝謝！",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
shared:{
errors:null
},
google_maps:{
enter_location:"請輸入地點。",
view_larger_map:"使用較大的地圖"
},
ecwid:{
enter_store_id:"請輸入商店ID。"
},
soundcloud:{
errors:{
invalid_url:"網址無效！請使用正確的soundcloud.com網址。"
}
},
slides:{
errors:{
invalid_url:"網址無效！請使用正確的slid.es網址。"
}
}
},
domain_emails:{
confirm:{
delete_entry:"您確定要刪除此條目嗎？"
},
errors:{
limit_reached:"您最多只能建立{{limit}}個電郵帳戶。"
}
}
}
},
invitations:{
"new":{
email_hint:"請在這裡輸入電子郵件收件者清單！",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
html_editor:{
script_error:"您輸入的HTML含有網頁編輯器無法顯示的程式碼。<br/><br/>請預覽您的網頁以檢視內容。"
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!"
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
},
subscriptions:{
"new":{
why_billing_info:"我們索取您的信用卡資料是為了防止您的Strikingly帳戶受到干擾，尤其如果您希望帳戶在免費試用期結束後仍然生效。另一方面，此舉亦有助我們減少詐騙問題。<br/><br/>在免費試用期間，您的信用卡是不會進行任何付款的。如果您在試用期間提出終止要求，那麼您在任何時候也不會進行任何付款。<br/><br/>在試用期結束前三天，我們更會發電郵給您，提醒您試用期即將到期。",
billing:{
heading:"{{free_period_full_string}}保證費用全免",
coupon_applied_free_period_notice:"您將不會立即進行付款。首{{free_period_days}}天是免費的，之後從{{billing_start_date}}開始，您將會繳付<strong class='dark'>${{discounted_price}}一{{period}}</strong>及<strong class='dark'>${{price}}一{{period}}</strong>。",
coupon_applied_no_free_period_notice:"之後，您將會繳付<strong class='dark'>${{discounted_price}}一{{period}}</strong>及<strong class='dark'>${{price}}一{{period}}</strong>。",
free_period_notice:"您將不會立即進行付款。首{{free_period_days}}天是免費的，之後從{{billing_start_date}}開始，您將會繳付<strong class='dark'>${{discounted_price}}一{{period}}</strong>及<strong class='dark'>${{price}}一{{period}}</strong>。",
no_free_period_notice:"您將會繳付<strong class='dark'>${{price}}一{{period}}</strong>。"
},
prices:{
pro_yearly:"$192/年",
pro_monthly:"$20/月",
starter_yearly:"$96/年",
starter_monthly:"$12/月"
},
coupon:{
wait:"請稍等……",
invalid:"優惠券編碼無效。",
applied:"帳單已計入{{percent}}%折扣優惠！",
applied_notice:"已將優惠券用於帳單！優惠券只適用於首個繳費期。"
},
periods:{
month:"月",
year:"年"
},
errors:{
card_number:"請輸入正確的信用卡號碼。",
cvc:"請輸入正確的保安編碼。",
card_expiry:"請輸入正確的到期日。"
}
},
edit:{
confirm:{
general:"您真的確定要改變您的方案嗎？如果您正在進行升級，您的帳戶將會作出相應付款。",
upgrade:"您真的確定要進行升級嗎？您的帳戶將會以專業版繳費模式進行付款。",
downgrade:"您真的確定要進行降級嗎？您已繳付的費用將會變成餘額存於您的帳戶中。"
}
}
}
}
},
"zh-CN":{
js:{
api:{
generators:{
new_year_resolutions:{
errors:{
missing_user:"缺失的用户。",
invalid:"{{message}}",
exception:"网络超时。请重试。我们的工程团队正在调查。",
oauth_exception:"您的 Facebook 会话已超时。请用 Facebook 账户重新登录。"
}
},
generate_from_facebook:{
errors:{
missing_user:"缺失用户。",
invalid:"{{message}}",
exception:"网络超时。请重试。我们的工程团队正在调查。",
oauth_exception:"您的 Facebook 会话已超时。请用 Facebook 账户重新登录。"
}
},
generate_from_linkedin:{
errors:{
missing_user:"缺失用户。",
invalid:"{{message}}",
exception:"网络超时。请重试。我们的工程团队正在调查。",
oauth_exception:"您的 LinkedIn 会话已超时。请用 LinkedIn 账户重新登录。"
}
},
share_on_linkedin:{
errors:{
exception:"出现错误。请重试。我们的工程团队正在调查。"
}
}
},
analytics:{
period_title:{
past_week:"上一周",
past_month:"上个月",
past_3_months:"最近 3 个月",
past_year:"去年",
past_24_hours:"最近 24 小时"
},
show:{
errors:{
exception:"加载页面分析时出现问题。我们的工程团队正在调查。",
record_not_found:"找不到页面。"
}
}
},
subscriptions:{
plan:{
billed_monthly:"按月寄送账单",
billed_yearly:"按年寄送账单"
},
check_coupon:{
errors:{
invalid_coupon:"优惠券代码无效。",
expired:"优惠券已过期。"
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"加载视频时出现问题。我们的工程团队正在调查。"
}
}
},
registrations:{
create:{
errors:{
missing_params:"必须填写电子邮件和名字。",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
jobs:{
custom_domain_setup:{
success:{
connected:"成功断开与自定义域名的连接。",
disconnected:"连接成功。设置可能需 48 个小时。"
},
errors:{
exception:"网络超时。请重试。我们的工程团队正在调查。",
invalid:"{{message}}"
}
}
},
pages:{
shared:{
errors:{
access_denied:"无权执行此操作。",
session_expired:"会话超时。请重新登录以编辑此页面。",
record_not_found:"似乎该页面的 URL 发生了改变。点击“好”，前往 Dashboard，并选择要编辑的页面。"
}
},
update:{
success:{
saved:"页面已保存。"
},
errors:{
exeption:"保存您的内容时出现问题。我们的工程团队正在调查。",
invalid:"{{message}}"
}
},
publish:{
success:{
published:"页面已发布。"
}
},
custom_domain_update:{
errors:{
missing_params:"出现错误。请重试。如果问题依旧存在，请使用“支持”按钮联系我们。",
no_change:"无任何更改。",
invalid:"{{message}}",
exception:"网络超时。请重试。我们的工程团队正在调查。"
},
success:{
saved:"已更新。"
}
},
settings_update:{
errors:{
missing_params:"出现错误。请重试。如果问题依旧存在，请使用“支持”按钮联系我们。",
invalid:"{{message}}"
},
success:{
permalink_changed:"几秒钟后将刷新页面。如未刷新，请点击<a href='{{edit_page_http_url}}'>此处</a>。",
saved:"已保存！"
}
}
}
},
pages:{
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
},
edit:{
confirm:{
delete_section:"确定要删除此区块吗？此操作不可撤消。",
unsaved_changes:"本页面含有未保存的更改。如果离开本页面，这些更改将会丢失。"
},
errors:{
save_error:"保存您的页面时出现问题。请重试。",
network_error:"网络出现问题，请刷新并重试。",
upload_network_error:"网络出现问题，无法上传，请刷新并重试。",
effects_network_error:"网络出现问题，无法添加特效，请刷新并重试。",
max_slides_reached:"现在您只能创建 {{max}} 张幻灯片。如果想创建更多，请使用下方的“反馈”按钮告诉我们。谢谢！",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
shared:{
errors:null
},
google_maps:{
enter_location:"请输入一个地点。",
view_larger_map:"查看详细地图"
},
ecwid:{
enter_store_id:"请输入一个店铺 ID。"
},
soundcloud:{
errors:{
invalid_url:"URL 无效！请使用有效的 soundcloud.com URL。"
}
},
slides:{
errors:{
invalid_url:"URL 无效！请使用有效的 slid.es URL。"
}
}
},
domain_emails:{
confirm:{
delete_entry:"确定要删除此条目吗？"
},
errors:{
limit_reached:"您只能指定 {{limit}} 个接收转发邮件的邮箱地址。"
}
}
}
},
invitations:{
"new":{
email_hint:"在此处输入一系列接收人邮箱地址！",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
html_editor:{
script_error:"您输入的 HTML 中含有无法在编辑器中显示的脚本。<br/><br/>要查看内容，请预览您的站点。"
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!"
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
},
subscriptions:{
"new":{
why_billing_info:"我们要求您提供信用卡，目的是当您选择在免费期结束后继续保持账户活跃时，可以避免您的 Strikingly 账户中止。这样做也有利于我们降低欺诈风险。<br/><br/>在整个免费期内，您的信用卡不会被扣除任何费用。如果您在免费期内取消了账户，您的信用卡永远不会被扣除任何费用。<br/><br/>当免费期即将结束时，我们还会提前三天以电子邮件通知您。",
billing:{
heading:"{{free_period_full_string}} 免费&mdash;保质保量",
coupon_applied_free_period_notice:"您不会立即收到账单。最初的 {{free_period_days}} 天是免费的。从 {{billing_start_date}} 开始，您每 {{period}}</strong> 将会收到 <strong class='dark'>${{discounted_price}} 的账单，此后将变为每 {{period}}</strong> 收到 <strong class='dark'>${{price}} 的账单。",
coupon_applied_no_free_period_notice:"您每 {{period}}</strong> 将会收到 <strong class='dark'>${{discounted_price}} 的账单，此后将变为每 {{period}}</strong> 收到 <strong class='dark'>${{price}} 的账单。",
free_period_notice:"您不会立即收到账单。最初的 {{free_period_days}} 天是免费的。从 {{billing_start_date}} 开始，您每 {{period}}</strong> 将会收到 <strong class='dark'>${{price}} 的账单。",
no_free_period_notice:"您每 {{period}}</strong> 将会收到 <strong class='dark'>${{price}} 的账单。"
},
prices:{
pro_yearly:"$192/年",
pro_monthly:"$20/月",
starter_yearly:"$96/年",
starter_monthly:"$12/月"
},
coupon:{
wait:"请等待……",
invalid:"优惠券代码无效。",
applied:"已折价 {{percent}}%！",
applied_notice:"已使用优惠券！此优惠券仅可用于首个账单周期！"
},
periods:{
month:"月",
year:"年"
},
errors:{
card_number:"请输入有效的卡号",
cvc:"请输入有效的验证码",
card_expiry:"请输入有效的到期日"
}
},
edit:{
confirm:{
general:"您真的确定要更改计划吗？如果升级，您的账户将会收到相应的账单。",
upgrade:"您真的确定要升级吗？您的账户将会收到费用按比例计算的账单。",
downgrade:"您真的确定要降级吗？您的账户将会根据已支付金额充入积分。"
}
}
}
}
},
fr:{
js:{
api:{
generators:{
new_year_resolutions:{
errors:{
missing_user:"Utilisateur manquant.",
invalid:"{{message}}",
exception:"Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
oauth_exception:"Votre session Facebook a expiré. Veuillez vous reconnecter avec Facebook."
}
},
generate_from_facebook:{
errors:{
missing_user:"Utilisateur manquant.",
invalid:"{{message}}",
exception:"Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
oauth_exception:"Votre session Facebook a expiré. Veuillez vous reconnecter avec Facebook."
}
},
generate_from_linkedin:{
errors:{
missing_user:"Utilisateur manquant.",
invalid:"{{message}}",
exception:"Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
oauth_exception:"Votre session LinkedIn a expiré. Veuillez vous reconnecter avec LinkedIn."
}
},
share_on_linkedin:{
errors:{
exception:"Quelque chose s'est mal passé. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème."
}
}
},
analytics:{
period_title:{
past_week:"Semaine dernière",
past_month:"Mois dernier",
past_3_months:"3 derniers mois",
past_year:"Année dernière",
past_24_hours:"Dernières 24 heures"
},
show:{
errors:{
exception:"Erreur lors du chargement des analyses de votre page. Notre équipe informatique travaille actuellement sur ce problème.",
record_not_found:"Page introuvable."
}
}
},
subscriptions:{
plan:{
billed_monthly:"facturé mensuellement",
billed_yearly:"facturé annuellement"
},
check_coupon:{
errors:{
invalid_coupon:"Le code coupon n'est pas valide.",
expired:"Le coupon a expiré."
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"Impossible de charger la vidéo. Notre équipe informatique travaille actuellement sur ce problème."
}
}
},
registrations:{
create:{
errors:{
missing_params:"E-mail et prénom requis.",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
jobs:{
custom_domain_setup:{
success:{
connected:"Domaine personnalisé déconnecté avec succès.",
disconnected:"Connecté avec succès. Le paramétrage peut prendre jusqu'à 48 h."
},
errors:{
exception:"Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
invalid:"{{message}}"
}
}
},
pages:{
shared:{
errors:{
access_denied:"Non autorisé à effectuer cette opération.",
session_expired:"Session expirée. Veuillez vous reconnecter pour éditer la page.",
record_not_found:"Il semble que la page ait changé d'URL. Cliquez sur OK pour accéder au tableau de bord et sélectionnez la page à éditer."
}
},
update:{
success:{
saved:"Page enregistrée."
},
errors:{
exeption:"Erreur lors de l'enregistrement de votre contenu. Notre équipe informatique travaille actuellement sur ce problème.",
invalid:"{{message}}"
}
},
publish:{
success:{
published:"Page publiée."
}
},
custom_domain_update:{
errors:{
missing_params:"Quelque chose s'est mal passé. Veuillez réessayer. Si le problème persiste, utilisez le bouton Assistance pour nous contacter.",
no_change:"Aucun changement.",
invalid:"{{message}}",
exception:"Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème."
},
success:{
saved:"Mis à jour."
}
},
settings_update:{
errors:{
missing_params:"Quelque chose s'est mal passé. Veuillez réessayer. Si le problème persiste, utilisez le bouton Assistance pour nous contacter.",
invalid:"{{message}}"
},
success:{
permalink_changed:"La page se rafraîchira dans quelques secondes. Cliquez <a href='{{edit_page_http_url}}'>ici</a> sinon.",
saved:"Enregistré !"
}
}
}
},
pages:{
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
},
edit:{
confirm:{
delete_section:"Voulez-vous vraiment supprimer cette section ? Ceci est irréversible.",
unsaved_changes:"La page comporte des changements non enregistrés. Si vous quittez la page, les changements seront perdus."
},
errors:{
save_error:"Erreur lors de l'enregistrement de votre page. Veuillez réessayer.",
network_error:"Oups. Erreur réseau. Veuillez rafraîchir et réessayer.",
upload_network_error:"Oups. Une erreur réseau vous empêche de charger des fichiers. Veuillez rafraîchir et réessayer.",
effects_network_error:"Oups. Une erreur réseau vous empêche d'ajouter des effets. Veuillez rafraîchir et réessayer.",
max_slides_reached:"Vous ne pouvez créer que {{max}} diapositives pour l'instant. Utilisez le bouton de commentaires ci-dessous pour nous prévenir si vous désirez en créer plus. Merci !",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
shared:{
errors:null
},
google_maps:{
enter_location:"Veuillez saisir un lieu.",
view_larger_map:"Voir une carte plus grande"
},
ecwid:{
enter_store_id:"Veuillez saisir un ID de boutique."
},
soundcloud:{
errors:{
invalid_url:"URL non valide ! Veuillez utiliser une URL soundcloud.com valide."
}
},
slides:{
errors:{
invalid_url:"URL non valide ! Veuillez utiliser une URL slid.es valide."
}
}
},
domain_emails:{
confirm:{
delete_entry:"Voulez-vous vraiment supprimer cette entrée ?"
},
errors:{
limit_reached:"Vous ne pouvez créer que {{limit}} e-mails."
}
}
}
},
invitations:{
"new":{
email_hint:"Saisissez la liste des e-mails des destinataires ici !",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
html_editor:{
script_error:"Le code HTML que vous avez saisi contient des scripts qui ne peuvent pas être affichés dans l'éditeur.<br/><br/>Veuillez utiliser l'aperçu du site pour voir votre contenu."
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!"
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
},
subscriptions:{
"new":{
why_billing_info:"Nous demandons les informations de votre carte bancaire pour éviter l'interruption de votre compte Strikingly si vous décidez de garder votre compte actif à la fin de votre période d'essai. Ceci nous permet également d'éviter la fraude. <br/><br/> Votre carte bancaire ne sera facturée à aucun moment de votre période d'essai. Si vous annulez durant la période d'essai, vous ne serez jamais facturé.<br/><br/>Nous vous enverrons un e-mail trois jours avant la fin de votre période d'essai pour vous rappeler que celle-ci va bientôt expirer.",
billing:{
heading:"{{free_period_full_string}} Gratuit &mdash; Garanti",
coupon_applied_free_period_notice:"Vous ne serez pas facturé immédiatement. Les {{free_period_days}} premiers jours sont gratuits. À partir du {{billing_start_date}}, vous serez facturé <strong class='dark'>{{discounted_price}} $ par {{period}}</strong>, puis <strong class='dark'>{{price}} $ par {{period}}</strong>.",
coupon_applied_no_free_period_notice:"Vous serez facturé <strong class='dark'>{{discounted_price}} $ par {{period}}</strong>, puis <strong class='dark'>{{price}} $ par {{period}}</strong>.",
free_period_notice:"Vous ne serez pas facturé immédiatement. Les {{free_period_days}} premiers jours sont gratuits. À partir du {{billing_start_date}}, vous serez facturé <strong class='dark'>{{price}} $ par {{period}}</strong>.",
no_free_period_notice:"Vous serez facturé <strong class='dark'>{{price}} $ par {{period}}</strong>."
},
prices:{
pro_yearly:"192 $/an",
pro_monthly:"20 $/mois",
starter_yearly:"96 $/an",
starter_monthly:"12 $/mois"
},
coupon:{
wait:"Patientez...",
invalid:"Code coupon non valide.",
applied:"Réduction de {{percent}} % appliquée !",
applied_notice:"Coupon appliqué ! Le coupon n'est valide que pour la première période de facturation !"
},
periods:{
month:"mois",
year:"an"
},
errors:{
card_number:"Veuillez saisir un numéro de carte valide",
cvc:"Veuillez saisir un code de sécurité valide",
card_expiry:"Veuillez saisir une date d'expiration valide"
}
},
edit:{
confirm:{
general:"Voulez-vous vraiment changer de formule ? Si vous mettez à niveau, votre facturation sera modifiée en conséquence.",
upgrade:"Voulez-vous vraiment mettre à niveau ? Votre compte sera facturé sur une base de tarification Pro.",
downgrade:"Voulez-vous vraiment baisser de niveau ? Votre compte sera crédité de ce que vous avez déjà payé."
}
}
}
}
},
es:{
js:{
api:{
generators:{
new_year_resolutions:{
errors:{
missing_user:"Falta el usuario.",
invalid:"{{message}}",
exception:"Tiempo de red agotado. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema.",
oauth_exception:"Tu sesión de Facebook ha terminado. Vuelve a iniciar sesión en Facebook."
}
},
generate_from_facebook:{
errors:{
missing_user:"Falta el usuario.",
invalid:"{{message}}",
exception:"Tiempo de red agotado. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema.",
oauth_exception:"Tu sesión de Facebook ha terminado. Vuelve a iniciar sesión en Facebook."
}
},
generate_from_linkedin:{
errors:{
missing_user:"Falta el usuario.",
invalid:"{{message}}",
exception:"Tiempo de red agotado. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema.",
oauth_exception:"Tu sesión de Linkedln ha terminado. Vuelve a iniciar sesión en Linkedln."
}
},
share_on_linkedin:{
errors:{
exception:"Algo salió mal. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema."
}
}
},
analytics:{
period_title:{
past_week:"Última semana",
past_month:"Último mes",
past_3_months:"Últimos 3 meses",
past_year:"Último año",
past_24_hours:"Últimas 24 horas"
},
show:{
errors:{
exception:"Hubo un problema al cargar las estadísticas de la página. Nuestro equipo de ingenieros está trabajando en el problema.",
record_not_found:"No se encontró la página."
}
}
},
subscriptions:{
plan:{
billed_monthly:"facturación mensual",
billed_yearly:"facturación anual"
},
check_coupon:{
errors:{
invalid_coupon:"El código del cupón no es válido.",
expired:"El cupón ha vencido."
}
}
},
videos:{
create:{
errors:{
invalid:"{{message}}",
exception:"Hubo un problema al cargar el video. Nuestro equipo de ingenieros está trabajando en el problema."
}
}
},
registrations:{
create:{
errors:{
missing_params:"Se requieren el email y el nombre.",
invalid:"{{message}}"
},
success:{
saved:""
}
}
},
jobs:{
custom_domain_setup:{
success:{
connected:"Dominio personalizado desconectado con éxito.",
disconnected:"Conectado con éxito. Puede tardar hasta 48 horas en instalarse."
},
errors:{
exception:"Tiempo de red agotado. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema.",
invalid:"{{message}}"
}
}
},
pages:{
shared:{
errors:{
access_denied:"No tienes autorización para realizar esta operación.",
session_expired:"La sesión ha terminado. Vuelve a iniciar sesión para editar la página.",
record_not_found:"Parece que ha cambiado la URL de la página. Haz clic en Aceptar para ir al panel y seleccionar la página que deseas editar."
}
},
update:{
success:{
saved:"Página guardada."
},
errors:{
exeption:"Hubo un problema al cargar el video. Nuestro equipo de ingenieros está trabajando en el problema.",
invalid:"{{message}}"
}
},
publish:{
success:{
published:"Página publicada."
}
},
custom_domain_update:{
errors:{
missing_params:"Algo salió mal. Vuelve a intentarlo. Si el problema persiste, utiliza el botón de asistencia para contactarnos.",
no_change:"Nada cambió.",
invalid:"{{message}}",
exception:"Tiempo de red agotado. Vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema."
},
success:{
saved:"Actualizado."
}
},
settings_update:{
errors:{
missing_params:"Algo salió mal. Vuelve a intentarlo. Si el problema persiste, utiliza el botón de asistencia para contactarnos.",
invalid:"{{message}}"
},
success:{
permalink_changed:"La página volverá a cargar en unos segundos. Haz clic <a href='{{edit_page_http_url}}'>aquí</a> si no carga.",
saved:"¡Guardado!"
}
}
}
},
pages:{
dashboard:{
pub_quota:"You've hit your published site limit! You must unpublish another site before you can publish this one!",
quota_confirm:"OK, I understand",
unpub_confirm:"Confirm Unpublish",
pub_confirm:"Confirm Publish",
unpub_msg:'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.',
pub_msg:"This will make your site visible to the world!",
cancel:"Cancel",
confirm:"Confirm",
clone_msg:"Would you like to duplicate this site?",
clone_pub_msg:"Note that you have reached your publish site limit. You can clone more sites to try out, but you won't be able to publish them until you unpublish a site. Continue?"
},
edit:{
confirm:{
delete_section:"¿Seguro que quieres borrar esta sección? Esta acción no se puede deshacer.",
unsaved_changes:"Hay cambios no guardados en esta página. Si sales de ella, los perderás."
},
errors:{
save_error:"Ocurrió un problema al tratar de guardar la página. Vuelve a intentarlo.",
network_error:"¡Vaya! Parece que hubo un problema con la red. Vuelve a intentarlo.",
upload_network_error:"¡Vaya! Un problema con la red no permite que cargues. Vuelve a intentarlo.",
effects_network_error:"¡Vaya! Un problema con la red no permite que agregues efectos. Vuelve a intentarlo.",
max_slides_reached:"Ahora solo puedes crear {{max}} diapositivas. Usa el siguiente botón de comentarios para hacernos saber si deseas agregar más. ¡Gracias!",
api_error:"Oops, a network issue occurred. Our engineers have been notified and are looking into it!"
},
html_editor:{
shared:{
errors:null
},
google_maps:{
enter_location:"Indica una ubicación.",
view_larger_map:"Ver un mapa más grande"
},
ecwid:{
enter_store_id:"Indica un ID de tienda."
},
soundcloud:{
errors:{
invalid_url:"¡URL no válida! Utiliza un URL de soundcloud.com válido."
}
},
slides:{
errors:{
invalid_url:"¡URL no válida! Utiliza un URL de slid.es válido."
}
}
},
domain_emails:{
confirm:{
delete_entry:"¿Seguro que deseas borrar esta entrada?"
},
errors:{
limit_reached:"Solo puedes crear {{limit}} correos electrónicos."
}
}
}
},
invitations:{
"new":{
email_hint:"¡Indica un listado de destinatarios de correos electrónicos!",
invitation_sent:"Invitation sent! Remind your friends to sign up to claim your rewards.",
confirm:"OK",
claim_msg:"Unlock this reward! Are you sure?",
claim_confirm:"Yes, unlock!"
},
create:{
errors:{
missing:"{{message}}"
}
}
},
html_editor:{
script_error:"El HTML que Indicaste contiene scripts que no pueden mostrase en el editor. <br/><br/> Revisa tu sitio para ver el contenido."
},
traffic_guide:{
confirm_go_to_editor:"Go to the editor now to update the settings?"
},
select_template:{
info:{
no_site:"Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
},
confirm:{
ok:"  OK  "
}
},
app_store:{
names:{
html:"HTML",
google_maps:"Google Maps",
ecwid:"Ecwid",
wufoo:"Wufoo",
facebook_comments:"Facebook Comments",
soundcloud:"SoundCloud",
slides:"Slides",
celery:"Celery",
instagram:"Websta",
eventbrite:"Eventbrite",
google_form:"Google Form",
mailchimp:"MailChimp",
locu:"Locu",
slideshare:"SlideShare",
medium:"Medium",
scribd:"Scribd",
photobucket:"PhotoBucket",
pinterest:"Pinterest",
paypal:"PayPal"
},
descriptions:{
html:"Embed any third party service or write any code you want. A powerful tool for advanced users.",
google_maps:"Show your location!",
ecwid:"Full ecommerce functionality right on your website! Set up an online store, manage products, and receive payments.",
wufoo:"Build an amazing form or survey to collect data, feedback, and payments.",
facebook_comments:"Let your friends around the world leave their comments here.",
soundcloud:"Embed a track, album, artist, or collection from SoundCloud!",
slides:"Slides is a tool for creating, presenting and sharing presentations.",
celery:"If you're selling online, use Celery to accept preorders and charge later.",
instagram:"Use Websta to display your Instagram pics in a gallery on your site.",
eventbrite:"Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
google_form:"Give a quiz, run a survey, or collect other information with a simple online form.",
mailchimp:"Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
locu:"Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
slideshare:"Impress your visitors with a great presentation!",
medium:"Put medium profile, collection or blogs on your site.",
scribd:"Show Scribd documents or books on your site.",
photobucket:"Play a PhotoBucket slideshow on your site.",
pinterest:"Show Pinterest Pins, Profiles or Boards on your site.",
paypal:"Put a PayPal button on your site to receive payments!"
},
errors:{
load_app_config:"Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
init_app_config:"Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
create_app_config:"Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
save_app_config:"Failed to save app config. This is likely caused by a network issue; try refreshing the page."
}
},
subscriptions:{
"new":{
why_billing_info:"Pedimos tu tarjeta de crédito para no interrumpir tu cuenta de Strikingly si decides mantenerla activa después de finalizado tu periodo de prueba gratis. Nos permite reducir el fraude. <br/><br/>No se producirán cargos en tu tarjeta de crédito durante el periodo de prueba. Si cancelas durante el período gratuito, no se te cobrará nada en ningún momento. <br/><br/> Te enviaremos un correo electrónico tres días antes de que se termine tu periodo gratuito para recordártelo.",
billing:{
heading:"{{free_period_full_string}} Gratis &mdash; Garantizado",
coupon_applied_free_period_notice:"No se te facturará de inmediato. Los primeros {{free_period_days}} días son gratis. Después del {{billing_start_date}} se te facturará <strong class='dark'>${{discounted_price}} por {{period}}</strong> y <strong class='dark'> ${{price}} por {{period}}</strong> después de eso.",
coupon_applied_no_free_period_notice:"Se te facturará <strong class='dark'>${{discounted_price}} por {{period}}</strong> y <strong class='dark'>${{price}} por {{period}}</strong> después de eso.",
free_period_notice:"No se te facturará de inmediato. Los primeros {{free_period_days}} días son gratis. Desde el {{billing_start_date}} se te facturará <strong class='dark'>$ {{price}} por {{period}}</strong>.",
no_free_period_notice:"Se te facturará <strong class='dark'>${{price}} por {{period}}</strong>."
},
prices:{
pro_yearly:"192 $/año",
pro_monthly:"20 $/mes",
starter_yearly:"96 $/año",
starter_monthly:"12 $/mes"
},
coupon:{
wait:"Espera...",
invalid:"Código del cupón no válido.",
applied:"¡Se aplicó un descuento del {{percent}}%!",
applied_notice:"¡Se ha usado el cupón! ¡Solo es válido para el primer periodo de facturación!"
},
periods:{
month:"mes",
year:"año"
},
errors:{
card_number:"Indica un número de tarjeta válido.",
cvc:"Indica un código de seguridad válido",
card_expiry:"Indica una caducidad válida"
}
},
edit:{
confirm:{
general:"¿Absolutamente seguro que quieres cambiar tu plan? Si estás cambiando de plan, se te facturará lo que corresponda.",
upgrade:"¿Absolutamente seguro que quieres cambiar tu plan? Se te facturará prorrateado.",
downgrade:"¿Absolutamente seguro que quieres bajar de categoría? Tu cuenta recibirá una compensación por el valor que ya has pagado."
}
}
}
}
}
}, function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#s-header, .navigator",
FOOTER:"#footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
ASSET_LIB_DIALOG:"#asset-lib-dialog",
APP_STORE_DIALOG:"#app-store-dialog",
TRAFFIC_GUIDE_DIALOG:"#traffic-guide-dialog",
SHARE_DIALOG:"#sharing-options-dialog",
CATEGORY_DIALOG:"#category-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
UNPUBLISH_SITES_DIALOG:"#unpublish-sites-dialog",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
DOMAIN_FORM:".strikingly-custom-domain-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(e) {
return e.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(e) {
return e.find("img").attr("data-description") || "";
},
GALLERY:function(e) {
var t, n, i, r;
for (r = e.parent().find("a.item"), n = 0, i = r.length; i > n; n++) t = r[n], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(e) {
return e.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(e) {
return e.find(".gallery-editor-image");
}
};
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.UserAnalyticsEngine = function() {
function t(t, n, i) {
this.user_id = t, this.user_email = n, this.urlBase = i, this.save = e(this.save, this), 
this.track = e(this.track, this), this.trackWithoutExternalService = e(this.trackWithoutExternalService, this), 
null == this.urlBase && (this.urlBase = $S.global_conf.BOBCAT_ANALYTICS_POST_URL);
}
return t.prototype.trackWithoutExternalService = function(e) {
return this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.track = function(e, t) {
return "function" == typeof $B.log && $B.log("[TRACKING] " + e, t), window.analytics.track(e, t), 
this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.save = function(e, t) {
var n = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:e,
event:t
},
success:function(e) {
return "Editor - edit" === t ? _veroq.push([ "user", {
id:n.user_id,
edit_count:e.count
} ]) :void 0;
},
dataType:"json"
});
}, t;
}(), $B.PageAnalyticsEngine = function() {
function t(t) {
this.pageData = t, this.sendPbsConversion = e(this.sendPbsConversion, this), this.sendPbsImpression = e(this.sendPbsImpression, this), 
this.normalizedReferrer = e(this.normalizedReferrer, this), this.sendDataKeenIO = e(this.sendDataKeenIO, this), 
this.logSocialClicks = e(this.logSocialClicks, this), this.logPageView = e(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
userId:this.pageData.user_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return t.prototype.pingInterval = 1e4, t.prototype.setInternalTracking = function() {
var e, t;
return (t = $S.page_meta.strk_upvt) ? (e = {
thm:this.pageData.theme.name,
mem:this.pageData.membership,
brd:this.pageData.showStrikinglyLogo,
v:t
}, $("<iframe />", {
name:"strk-tracking",
id:"strk-tracking",
src:"//b.strikingly.com/ping.html?" + $.param(e)
}).appendTo("body")) :void 0;
}, t.prototype.gaPushUserSite = function(e) {
return _gaq.push(e), e[0] = "b." + e[0], _gaq.push(e);
}, t.prototype.trackPageEvent = function() {
var e, t = this;
return e = function(e, n) {
var i;
return i = t, function(t) {
var r, o, a;
return a = $(this), r = {
url:a.attr("href"),
target:a.attr("target"),
text:a.text()
}, window.edit_page.Event.publish(e, r), i.gaPushUserSite([ "_setCustomVar", 1, "url", r.url, 3 ]), 
i.gaPushUserSite([ "_setCustomVar", 2, "text", r.text, 3 ]), i.gaPushUserSite([ "_trackEvent", "Actions", n.gaEventName ]), 
o = "#" !== r.url[0], r.url && "_blank" !== r.target && o ? (t.preventDefault(), 
setTimeout(function() {
return window.location.href = r.url;
}, 500)) :void 0;
};
}, $("[data-component='button']").click(e("Site.button.click", {
gaEventName:"ButtonClick"
}));
}, t.prototype.logPageView = function() {
var e, t, n, i, r;
e = _.extend({
eventName:"PageView"
}, this.baseData), t = 1, r = this.baseData;
for (n in r) i = r[n], this.gaPushUserSite([ "_setCustomVar", t, n, i, 3 ]), ++t;
return this.gaPushUserSite([ "_trackEvent", "Page", e.eventName ]), this.sendDataKeenIO(this.baseData);
}, t.prototype.logSocialClicks = function(e) {
var t;
return t = _.extend({
eventName:"SocialClicks",
channel:e
}, this.baseData);
}, t.prototype.sendDataKeenIO = function(e) {
var t, n;
return n = e.referrer.split("/")[2], t = _.extend({
keen:{
addons:[ {
name:"keen:ip_to_geo",
input:{
ip:"ip_address"
},
output:"ip_geo_info"
}, {
name:"keen:ua_parser",
input:{
ua_string:"user_agent"
},
output:"parsed_user_agent"
} ]
},
ip_address:"${keen.ip}",
user_agent:"${keen.user_agent}",
host:document.location.host,
referrer_host:n,
normalized_referrer:this.normalizedReferrer(e.referrer)
}, e), Keen.addEvent($S.conf.keenio_collection, t);
}, t.prototype.normalizedReferrer = function(e) {
var t, n;
return t = new $B.ReferrerParser($B.referrers_source, e), (null != (n = t.referrer) ? n.name :void 0) || t.url || "Direct Traffic";
}, t.prototype.sendPbsImpression = function(e) {
return $B.log("[PBS] Impression", e), Keen.addEvent($S.conf.keenio_pbs_impression_collection, e);
}, t.prototype.sendPbsConversion = function(e) {
return $B.log("[PBS] Conversion", e), Keen.addEvent($S.conf.keenio_pbs_conversion_collection, e);
}, t.prototype.trackUserPageEvent = function(e, t) {
return $B.log("User Page Event Tracking", e, t), Keen.addEvent(e, t);
}, t;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
Bobcat.Notifier = function() {
function t(t) {
this.user = t, this.hideNotification = e(this.hideNotification, this), this.showNotification = e(this.showNotification, this), 
this.getNotification = e(this.getNotification, this), this.queryNotification = e(this.queryNotification, this), 
this.noteBtn = $("#strikingly-menu-container .notification-btn"), this.noteMsg = $("#strikingly-menu-container .notification-message"), 
this.customHandlers = {}, this.afterRenderHandlers = {};
}
return t.prototype.registerCustomHandler = function(e, t) {
return this.customHandlers[e] = t;
}, t.prototype.registerAfterRenderHandler = function(e, t) {
return this.afterRenderHandlers[e] = t;
}, t.prototype.init = function() {
return this.enableCloseButtons();
}, t.prototype.enableCloseButtons = function(e) {
return null == e && (e = ".strikingly-notification"), $(e).each(function() {
var e, t;
return e = $(this), t = e.attr("data-type"), e.find(".close-button a, .close-link").click(function() {
return e.is(":visible") && $B.ui.openCloseModal(e), window.edit_page.notifier.destroyNotification(t);
});
});
}, t.prototype.queryNotification = function(e) {
return $B.UserNotifications.getState(e);
}, t.prototype.getNotification = function(e, t) {
var n = this;
return this.queryNotification(e).done(function(i) {
return "new" === i.message.state ? (window.analytics.track("Editor - Notification - Show"), 
t ? n.showNotification(e) :n.alertNotification(e)) :void 0;
}).fail(function(e) {
return console.log(e);
});
}, t.prototype.reset = function(e) {
return null == e && (e = "LikeFacebookPage"), $B.UserNotifications.reset(e);
}, t.prototype.showNotification = function(e, t) {
var n, i = this;
return null == t && (t = {}), e || (e = this.noteBtn.attr("data-type")), window.analytics.track("Show - Notifications - Editor v1", {
type:e
}), null != this.customHandlers[e] ? (this.customHandlers[e](), this.destroyNotification(e)) :(n = $(".strikingly-notification[data-type='" + e + "']"), 
0 === n.length ? $.get("/a/t/notifications/" + e + ".html").success(function(r) {
var o, a;
return n = $(r), $("body").append(n), o = ".strikingly-notification[data-type='" + e + "']", 
i.enableCloseButtons(o), "function" == typeof (a = i.afterRenderHandlers)[e] && a[e](o), 
n.is(":visible") || $B.ui.openCloseModal(n, t), i.destroyNotification(e);
}) :(n.is(":visible") || $B.ui.openCloseModal(n, t), this.destroyNotification(e))), 
0 !== parseInt(this.noteBtn.css("bottom")) ? this.hideNotification() :void 0;
}, t.prototype.alertNotification = function(e) {
return this.noteBtn.animate({
bottom:50
}, 450, "easeInOutBack").attr("data-type", e), this.noteMsg.slideUp();
}, t.prototype.hideNotification = function() {
return this.noteBtn.animate({
bottom:0
}, 450);
}, t.prototype.destroyNotification = function(e) {
return $B.UserNotifications.markRead(e);
}, t;
}(), Bobcat.UserNotifications = {
getState:function(e) {
return $.ajax({
url:"/s/users/notifications/show.jsm",
type:"GET",
data:{
type:e
}
});
},
reset:function(e) {
return $.ajax({
url:"/s/users/notifications/reset.jsm",
type:"PUT",
data:{
type:e
}
});
},
markRead:function(e) {
return $.ajax({
url:"/s/users/notifications/destroy.jsm",
type:"DELETE",
data:{
type:e
},
success:function(e) {
return console.log(e);
},
error:function(e) {
return console.log(e);
}
});
}
};
}.call(this), function() {
$B.BaseAutomator = function() {
function e() {
this.urlCommander = new $B.UrlCommander();
}
return e.prototype.urlAutomate = function(e) {
var t, n, i;
return e = e || $.url().param("open"), null != e && (i = e.split(/:/), n = i[0], 
t = i.slice(1), this.urlCommander.execute(n, t)), this;
}, e.prototype.pageLoadRun = function(e) {
return this.urlAutomate(e);
}, e.prototype.execCommand = function(e, t) {
return this.urlCommander.execute(e, t);
}, e;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.AnalyticsAutomator = function(e) {
function n() {
n.__super__.constructor.call(this), this.urlCommander.registerCommand("traffic-guide", new $B.TrafficGuideExecutor());
}
return t(n, e), n.prototype.pageLoadRun = function() {
var e, t, i;
return i = window.location.href, e = /(?=open=).*$/.exec(i), e && e.length ? (t = e[0].replace(/^open=/, ""), 
n.__super__.pageLoadRun.call(this, t)) :void 0;
}, n;
}($B.BaseAutomator);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.EditorAutomator = function(e) {
function n() {
n.__super__.constructor.call(this), this.urlCommander.registerCommand("settings", new $B.SettingsDialogExecutor()), 
this.urlCommander.registerCommand("video-tutorial", new $B.VideoTutorialExecutor()), 
this.urlCommander.registerCommand("appstore", new $B.AppStoreExecutor()), this.urlCommander.registerCommand("assetlib", new $B.AssetLibExecutor()), 
this.urlCommander.registerCommand("locale_changed", new $B.LocaleChangedExecutor()), 
this.urlCommander.registerCommand("stylepanel", new $B.StylePanelExecutor()), this.urlCommander.registerCommand("publish", new $B.PublishExecutor());
}
return t(n, e), n.prototype.urlAutomate = function() {
return "1" === $.url().param("seochecklist") ? (setTimeout(function() {
return $B.ui.openCloseModal($($B.DOM.TRAFFIC_GUIDE_DIALOG));
}, 2e3), this) :n.__super__.urlAutomate.call(this);
}, n;
}($B.BaseAutomator);
}.call(this), function() {
$B.CmdExecutor = function() {
function e() {}
return e.prototype.exec = function(e) {
return $B.log("command executor", e);
}, e;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.AppStoreExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
var t, i;
return n.__super__.exec.call(this, e), t = $(".html-component"), t.length ? (t.closest(".slide")[0].scrollIntoView(), 
t.addClass("s-generic-highlight-bold"), setTimeout(function() {
return t.attr("title", "Click here to edit.").tooltip({
placement:"bottom"
}).tooltip("show");
}, 3e3)) :(i = !1, window.edit_page.Event.subscribe("Section.ScreenshotLoaded", function() {
var e;
return i ? void 0 :(i = !0, window.edit_page.template_manager.openDialog(), e = $(".new-section-content .apps-icon").closest(".section-button").addClass("s-generic-highlight-bold"), 
setTimeout(function() {
return e.attr("title", "Click here to add an App section.").tooltip({
placement:"right"
}).tooltip("show");
}, 1e3));
}));
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.AssetLibExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
return n.__super__.exec.call(this, e), setTimeout(function() {
var e, t, n, i;
return e = $(".bg-image-editor:eq(0)"), e.length ? (e[0].scrollIntoView(), e.find(".title").click(), 
i = e.find(".edit-btn.upload").data("open-iconlib-tab", 1), n = i.parent().addClass("s-generic-highlight-bold"), 
setTimeout(function() {
return n.attr("title", "Click here to edit this image with Asset Library.").tooltip({
placement:"left"
}).tooltip("show");
}, 1e3)) :(t = $(".media-component"), t.closest(".slide")[0].scrollIntoView(), t.addClass("s-generic-highlight-bold"), 
t.trigger("mouseenter").trigger("click"), n = t.find(".image-editor .upload").css("border", "2px solid transparent"), 
n.addClass("s-generic-highlight-bold-green"), setTimeout(function() {
return n.attr("title", "Click here to replace this image with Asset Library.").tooltip({
placement:"top"
}).tooltip("show"), n.click(function() {
return n.css("border", "none");
});
}, 1e3));
}, e[0] || 2e3);
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.TrafficGuideExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
var t, i;
return n.__super__.exec.call(this, e), i = parseInt(e[0]) || 0, i += 1, setTimeout(function() {
return $("#get-more-traffic").trigger("click");
}, 300), t = $("#traffic-guide-iframe")[0], $B.waitFor(function() {
return null != t.contentWindow.goToSlide;
}, function() {
return t.contentWindow.goToSlide(i);
});
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.LocaleChangedExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
return n.__super__.exec.call(this, e), "en" !== I18n.locale ? $B.ui.openCloseModal($(".locale-changed")) :void 0;
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.PublishExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
return n.__super__.exec.call(this, e), setTimeout(function() {
var e;
return e = $(".top-menu .orange").addClass("s-generic-highlight-bold").on("click", function() {
return e.removeClass("s-generic-highlight-bold");
}), setTimeout(function() {
return e.attr("title", "Click here to publish!").tooltip({
placement:"right"
}).tooltip("show");
}, 500);
}, 1e3);
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.SettingsDialogExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
var t, i, r, o, a, s, l;
n.__super__.exec.call(this, e), a = e[0], t = e[1], null == a && (a = 0);
try {
a = parseInt(a);
} catch (u) {
a = 0;
}
if (null != t) {
for (r = t.split(/,/), o = [], s = 0, l = r.length; l > s; s++) i = r[s], o.push("#" + i);
o = o.join(","), $(o).addClass("s-generic-highlight");
}
return window.edit_page.settingsDialog.click(a);
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.StylePanelExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
return n.__super__.exec.call(this, e), setTimeout(function() {
var e;
return e = $(".top-menu .blue").addClass("s-generic-highlight-bold").on("click", function() {
return e.removeClass("s-generic-highlight-bold");
}), setTimeout(function() {
return e.tooltip({
placement:"right"
}).tooltip("show");
}, 2e3);
}, 1e3);
}, n;
}($B.CmdExecutor);
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
$B.VideoTutorialExecutor = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.exec = function(e) {
var t, i;
return n.__super__.exec.call(this, e), i = "Start Editing", "1" === $.url().param("new") && (i = "Edit Your Brand New Website"), 
t = $(".fancybox-tutorial-video").fancybox({
openEffect:"fade",
closeEffect:"none",
closeBtn:!1,
helpers:{
media:{}
},
padding:5,
width:800,
height:450,
tpl:{
wrap:"          <div class='fancybox-wrap' tabIndex='-1'>            <div class='fancybox-skin video-fancybox'>              <div class='fancybox-outer'>                <div class='fancybox-inner'>                </div>                <div class='fancybox-bottom'>                  <button class='edit-btn bigger blue' onclick='javascript:parent.$.fancybox.close();'>                    <i class='fa fa-pencil'></i>                    " + i + "                  </button>                </div>              </div>            </div>          </div>"
}
}), setTimeout(function() {
return t.click();
}, 500);
}, n;
}($B.CmdExecutor);
}.call(this), function() {
$B.UrlCommander = function() {
function e() {
this.handlers = {};
}
return e.prototype.registerCommand = function(e, t) {
return null == this.handlers[e] && (this.handlers[e] = []), this.handlers[e].push(t);
}, e.prototype.execute = function(e, t) {
var n, i, r, o, a;
if (null != this.handlers[e]) {
for (o = this.handlers[e], a = [], i = 0, r = o.length; r > i; i++) n = o[i], window.analytics.track("Landing - Popups", {
open:e,
args:null != t ? t.join(":") :""
}), a.push(n.exec(t));
return a;
}
}, e;
}();
}.call(this), function(e) {
var t = 0, n = 0, i = 0, r = 10, o = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, u = !1, d = !1, c = !1, p = !1, h = !1, f = !1, m = "pointer", g = "pointer", _ = new Array(), y = new Array(), v = new Array(), b = new Array(), w = new Array(), k = new Array(), M = new Array(), L = new Array(), S = new Array(), T = new Array(), D = new Array(), x = new Array(), Y = new Array(), C = {
showScrollbar:function(t, n) {
t.scrollbarHide && e("." + n).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, n, i, o, a, s, l, u, d) {
if (e.scrollbar && e.scrollbarHide) for (var c = n; n + 25 > c; c++) t[t.length] = C.hideScrollbarIntervalTimer(r * c, i[n], (n + 24 - c) / 24, o, a, s, l, u, d, e);
},
hideScrollbarInterval:function(t, n, i, r, a, s, l, u, d) {
o = -1 * t / D[u] * (a - s - l - r), C.setSliderOffset("." + i, o), e("." + i).css({
opacity:d.scrollbarOpacity * n,
filter:"alpha(opacity:" + d.scrollbarOpacity * n * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, n, i, r, a, s, l, u, d, c, p, h, f, m, g, _, y, v, b) {
if (b.infiniteSlider) {
if (i <= -1 * D[_] || i <= -1 * x[_]) {
var w = e(t).width();
if (i <= -1 * x[_]) {
var k = -1 * p[0];
e(n).each(function(t) {
C.setSliderOffset(e(n)[t], k + y), t < h.length && (h[t] = -1 * k), k += g[t];
}), i += -1 * h[0], T[_] = -1 * h[0] + y, D[_] = T[_] + w - s, S[_] = 0;
}
for (;i <= -1 * D[_]; ) {
var Y = 0, E = C.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
C.getSliderOffset(this, "x") < E && (E = C.getSliderOffset(this, "x"), Y = e);
});
var A = T[_] + w;
C.setSliderOffset(e(n)[Y], A), T[_] = -1 * h[1] + y, D[_] = T[_] + w - s, h.splice(0, 1), 
h.splice(h.length, 0, -1 * A + y), S[_]++;
}
}
if (i >= -1 * T[_] || i >= 0) {
var w = e(t).width();
if (i > 0) {
var k = -1 * p[0];
for (e(n).each(function(t) {
C.setSliderOffset(e(n)[t], k + y), t < h.length && (h[t] = -1 * k), k += g[t];
}), i -= -1 * h[0], T[_] = -1 * h[0] + y, D[_] = T[_] + w - s, S[_] = m; -1 * h[0] - w + y > 0; ) {
var $ = 0, I = C.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
C.getSliderOffset(this, "x") > I && (I = C.getSliderOffset(this, "x"), $ = e);
});
var A = T[_] - g[$];
C.setSliderOffset(e(n)[$], A), h.splice(0, 0, -1 * A + y), h.splice(h.length - 1, 1), 
T[_] = -1 * h[0] + y, D[_] = T[_] + w - s, S[_]--, M[_]++;
}
}
for (;i > -1 * T[_]; ) {
var $ = 0, I = C.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
C.getSliderOffset(this, "x") > I && (I = C.getSliderOffset(this, "x"), $ = e);
});
var A = T[_] - g[$];
C.setSliderOffset(e(n)[$], A), h.splice(0, 0, -1 * A + y), h.splice(h.length - 1, 1), 
T[_] = -1 * h[0] + y, D[_] = T[_] + w - s, S[_]--;
}
}
}
var O = !1, F = C.calcActiveOffset(b, i, h, s, S[_], m, c, _), A = (F + S[_] + m) % m;
if (b.infiniteSlider ? A != L[_] && (O = !0) :F != M[_] && (O = !0), O) {
var B = new C.args("change", b, t, e(t).children(":eq(" + A + ")"), A, v);
e(t).parent().data("args", B), "" != b.onSlideChange && b.onSlideChange(B);
}
if (M[_] = F, L[_] = A, i = Math.floor(i), C.setSliderOffset(t, i), b.scrollbar) {
o = Math.floor((-1 * i - T[_] + y) / (D[_] - T[_] + y) * (l - u - a));
var j = a - d;
i >= -1 * T[_] + y ? (j = a - d - -1 * o, C.setSliderOffset(e("." + r), 0), e("." + r).css({
width:j + "px"
})) :i <= -1 * D[_] + 1 ? (j = l - u - d - o, C.setSliderOffset(e("." + r), o), 
e("." + r).css({
width:j + "px"
})) :(C.setSliderOffset(e("." + r), o), e("." + r).css({
width:j + "px"
}));
}
},
slowScrollHorizontal:function(t, n, i, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v, b, w, x) {
var Y = C.getSliderOffset(t, "x"), E = new Array(), A = new Array(), $ = 0, I = 25 / 1024 * u;
frictionCoefficient = x.frictionCoefficient, elasticFrictionCoefficient = x.elasticFrictionCoefficient, 
snapFrictionCoefficient = x.snapFrictionCoefficient, a > x.snapVelocityThreshold && x.snapToChildren && !b ? $ = 1 :a < -1 * x.snapVelocityThreshold && x.snapToChildren && !b && ($ = -1), 
-1 * I > a ? a = -1 * I :a > I && (a = I), e(t)[0] !== e(v)[0] && ($ = -1 * $, a = -2 * a);
var O = S[g];
if (x.infiniteSlider) var F = T[g], B = D[g];
for (var j = new Array(), P = new Array(), N = 0; N < f.length; N++) j[N] = f[N], 
N < n.length && (P[N] = C.getSliderOffset(e(n[N]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, Y += a, (Y > -1 * T[g] || Y < -1 * D[g]) && !x.infiniteSlider && (a *= elasticFrictionCoefficient, 
Y += a), x.infiniteSlider) {
if (-1 * B >= Y) {
for (var H = e(t).width(), z = 0, R = P[0], N = 0; N < P.length; N++) P[N] < R && (R = P[N], 
z = N);
var W = F + H;
P[z] = W, F = -1 * j[1] + w, B = F + H - u, j.splice(0, 1), j.splice(j.length, 0, -1 * W + w), 
O++;
}
if (Y >= -1 * F) {
for (var H = e(t).width(), U = 0, q = P[0], N = 0; N < P.length; N++) P[N] > q && (q = P[N], 
U = N);
var W = F - m[U];
P[U] = W, j.splice(0, 0, -1 * W + w), j.splice(j.length - 1, 1), F = -1 * j[0] + w, 
B = F + H - u, O--;
}
}
E[E.length] = Y, A[A.length] = a;
}
var V = !1, G = C.calcActiveOffset(x, Y, j, u, O, y, M[g], g), J = (G + O + y) % y;
if (x.snapToChildren && (x.infiniteSlider ? J != L[g] && (V = !0) :G != M[g] && (V = !0), 
0 > $ && !V ? (G++, G >= f.length && !x.infiniteSlider && (G = f.length - 1)) :$ > 0 && !V && (G--, 
0 > G && !x.infiniteSlider && (G = 0))), x.snapToChildren || (Y > -1 * T[g] || Y < -1 * D[g]) && !x.infiniteSlider) {
for ((Y > -1 * T[g] || Y < -1 * D[g]) && !x.infiniteSlider ? E.splice(0, E.length) :(E.splice(.1 * E.length, E.length), 
Y = E.length > 0 ? E[E.length - 1] :Y); Y < j[G] - .5 || Y > j[G] + .5; ) Y = (Y - j[G]) * snapFrictionCoefficient + j[G], 
E[E.length] = Y;
E[E.length] = j[G];
}
var K = 1;
E.length % 2 != 0 && (K = 0);
for (var Q = 0; Q < i.length; Q++) clearTimeout(i[Q]);
for (var X = (G + O + y) % y, Z = 0, Q = K; Q < E.length; Q += 2) (Q == K || Math.abs(E[Q] - Z) > 1 || Q >= E.length - 2) && (Z = E[Q], 
i[i.length] = C.slowScrollHorizontalIntervalTimer(r * Q, t, n, E[Q], o, l, u, d, c, p, G, h, f, _, y, m, g, w, X, x));
var V = !1, J = (G + S[g] + y) % y;
x.infiniteSlider ? J != L[g] && (V = !0) :G != M[g] && (V = !0), "" != x.onSlideComplete && E.length > 1 && (i[i.length] = C.onSlideCompleteTimer(r * (Q + 1), x, t, e(t).children(":eq(" + J + ")"), X, g)), 
i[i.length] = C.updateBackfaceVisibilityTimer(r * (Q + 1), n, g, y, x), k[g] = i, 
C.hideScrollbar(x, i, Q, E, o, l, u, c, p, g);
},
onSlideComplete:function(t, n, i, r, o) {
var a = (_[o] != r ? !0 :!1, new C.args("complete", t, e(n), i, r, r));
e(n).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
_[o] = r;
},
getSliderOffset:function(t, n) {
var i = 0;
if (n = "x" == n ? 4 :5, !u || d || c) i = parseInt(e(t).css("left"), 10); else {
for (var r, o = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < o.length; a++) if (void 0 != e(t).css(o[a]) && e(t).css(o[a]).length > 0) {
r = e(t).css(o[a]).split(",");
break;
}
i = void 0 == r[n] ? 0 :parseInt(r[n], 10);
}
return i;
},
setSliderOffset:function(t, n) {
n = parseInt(n, 10), !u || d || c ? e(t).css({
left:n + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + n + ",0)",
webkitTransform:"matrix(1,0,0,1," + n + ",0)",
MozTransform:"matrix(1,0,0,1," + n + ",0)",
transform:"matrix(1,0,0,1," + n + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, m = "-webkit-grab", g = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (f = !0, 
m = "move", g = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (d = !0, 
h = !0) :null != navigator.userAgent.match("MSIE 8") ? (c = !0, h = !0) :null != navigator.userAgent.match("MSIE 9") && (p = !0, 
h = !0);
},
has3DTransform:function() {
var t = !1, n = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == n.attr("style") ? t = !1 :f && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != n.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, n) {
return (e - S[t] + n) % n;
},
calcActiveOffset:function(e, t, n, i, r, o) {
var a, s = !1, l = new Array();
t > n[0] && (a = 0), t < n[n.length - 1] && (a = o - 1);
for (var u = 0; u < n.length; u++) n[u] <= t && n[u] > t - i && (s || n[u] == t || (l[l.length] = n[u - 1]), 
l[l.length] = n[u], s = !0);
0 == l.length && (l[0] = n[n.length - 1]);
for (var d = i, c = 0, u = 0; u < l.length; u++) {
var p = Math.abs(t - l[u]);
d > p && (c = l[u], d = p);
}
for (var u = 0; u < n.length; u++) c == n[u] && (a = u);
return a;
},
changeSlide:function(t, n, i, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v) {
C.autoSlidePause(m);
for (var b = 0; b < o.length; b++) clearTimeout(o[b]);
var w = Math.ceil(v.autoSlideTransTimer / 10) + 1, T = C.getSliderOffset(n, "x"), D = h[t], x = D - T, Y = t - (M[m] + S[m] + _) % _;
if (v.infiniteSlider) {
t = (t - S[m] + 2 * _) % _;
var E = !1;
0 == t && 2 == _ && (t = _, h[t] = h[t - 1] - e(i).eq(0).outerWidth(!0), E = !0), 
D = h[t], x = D - T;
var A = new Array(h[t] - e(n).width(), h[t] + e(n).width());
E && h.splice(h.length - 1, 1);
for (var $ = 0; $ < A.length; $++) Math.abs(A[$] - T) < Math.abs(x) && (x = A[$] - T);
}
0 > x && -1 == Y ? x += e(n).width() :x > 0 && 1 == Y && (x -= e(n).width());
var I, O, F = new Array();
C.showScrollbar(v, a);
for (var $ = 0; w >= $; $++) I = $, I /= w, I--, O = T + x * (Math.pow(I, 5) + 1), 
F[F.length] = O;
for (var B = (t + S[m] + _) % _, j = 0, $ = 0; $ < F.length; $++) if ((0 == $ || Math.abs(F[$] - j) > 1 || $ >= F.length - 2) && (j = F[$], 
o[$] = C.slowScrollHorizontalIntervalTimer(r * ($ + 1), n, i, F[$], a, s, l, u, d, c, t, p, h, g, _, f, m, y, B, v)), 
0 == $ && "" != v.onSlideStart) {
var P = (M[m] + S[m] + _) % _;
v.onSlideStart(new C.args("start", v, n, e(n).children(":eq(" + P + ")"), P, t));
}
var N = !1;
v.infiniteSlider ? B != L[m] && (N = !0) :t != M[m] && (N = !0), N && "" != v.onSlideComplete && (o[o.length] = C.onSlideCompleteTimer(r * ($ + 1), v, n, e(n).children(":eq(" + B + ")"), B, m)), 
k[m] = o, C.hideScrollbar(v, o, $, F, a, s, l, d, c, m), C.autoSlide(n, i, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v);
},
changeOffset:function(t, n, i, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v) {
C.autoSlidePause(m);
for (var b = 0; b < o.length; b++) clearTimeout(o[b]);
v.infiniteSlider || (t = t > -1 * T[m] + y ? -1 * T[m] + y :t, t = t < -1 * D[m] ? -1 * D[m] :t);
var w = Math.ceil(v.autoSlideTransTimer / 10) + 1, x = C.getSliderOffset(n, "x"), Y = (C.calcActiveOffset(v, t, h, l, S, _, M[m], m) + S[m] + _) % _, E = h.slice();
if (v.snapToChildren && !v.infiniteSlider) t = h[Y]; else if (v.infiniteSlider && v.snapToChildren) {
for (;t >= E[0]; ) E.splice(0, 0, E[_ - 1] + e(n).width()), E.splice(_, 1);
for (;t <= E[_ - 1]; ) E.splice(_, 0, E[0] - e(n).width()), E.splice(0, 1);
Y = C.calcActiveOffset(v, t, E, l, S, _, M[m], m), t = E[Y];
}
var A, $, I = t - x, O = new Array();
C.showScrollbar(v, a);
for (var F = 0; w >= F; F++) A = F, A /= w, A--, $ = x + I * (Math.pow(A, 5) + 1), 
O[O.length] = $;
for (var B = (Y + S[m] + _) % _, j = 0, F = 0; F < O.length; F++) if ((0 == F || Math.abs(O[F] - j) > 1 || F >= O.length - 2) && (j = O[F], 
o[F] = C.slowScrollHorizontalIntervalTimer(r * (F + 1), n, i, O[F], a, s, l, u, d, c, Y, p, h, g, _, f, m, y, B, v)), 
0 == F && "" != v.onSlideStart) {
var B = (M[m] + S[m] + _) % _;
v.onSlideStart(new C.args("start", v, n, e(n).children(":eq(" + B + ")"), B, Y));
}
var P = !1;
v.infiniteSlider ? B != L[m] && (P = !0) :Y != M[m] && (P = !0), P && "" != v.onSlideComplete && (o[o.length] = C.onSlideCompleteTimer(r * (F + 1), v, n, e(n).children(":eq(" + B + ")"), B, m)), 
k[m] = o, C.hideScrollbar(v, o, F, O, a, s, l, d, c, m), C.autoSlide(n, i, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v);
},
autoSlide:function(e, t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g) {
return b[p].autoSlide ? (C.autoSlidePause(p), y[p] = setTimeout(function() {
!g.infiniteSlider && M[p] > d.length - 1 && (M[p] = M[p] - f);
var _ = M[p] + S[p] + 1;
C.changeSlide(_, e, t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g), C.autoSlide(e, t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g);
}, g.autoSlideTimer + g.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(y[e]);
},
isUnselectable:function(t, n) {
return "" != n.unselectableSelector && 1 == e(t).closest(n.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v) {
var b = setTimeout(function() {
C.slowScrollHorizontalInterval(t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g, _, y, v);
}, e);
return b;
},
onSlideCompleteTimer:function(e, t, n, i, r, o) {
var a = setTimeout(function() {
C.onSlideComplete(t, n, i, r, o);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, n, i, r, o, a, s, l, u) {
var d = setTimeout(function() {
C.hideScrollbarInterval(t, n, i, r, o, a, s, l, u);
}, e);
return d;
},
updateBackfaceVisibilityTimer:function(e, t, n, i, r) {
var o = setTimeout(function() {
C.updateBackfaceVisibility(t, n, i, r);
}, e);
return o;
},
updateBackfaceVisibility:function(t, n, i, r) {
for (var o = (M[n] + S[n] + i) % i, a = Array(), s = 0; s < 2 * r.hardwareAccelBuffer; s++) {
var l = C.mod(o + s - r.hardwareAccelBuffer, i);
if ("visible" == e(t).eq(l).css("-webkit-backface-visibility")) {
a[a.length] = l;
var u = C.mod(l + 2 * r.hardwareAccelBuffer, i), d = C.mod(l - 2 * r.hardwareAccelBuffer, i);
e(t).eq(l).css("-webkit-backface-visibility", "hidden"), -1 == a.indexOf(d) && e(t).eq(d).css("-webkit-backface-visibility", ""), 
-1 == a.indexOf(u) && e(t).eq(u).css("-webkit-backface-visibility", "");
}
}
},
mod:function(e, t) {
var n = e % t;
return 0 > n ? n + t :n;
},
args:function(t, n, i, r, o, a) {
this.prevSlideNumber = void 0 == e(i).parent().data("args") ? void 0 :e(i).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(i).parent().data("args") ? void 0 :e(i).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(i).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(i).parent().data("args") ? n.startAtSlide :e(i).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(i).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(i).parent().data("args").slideChanged), 
this.settings = n, this.data = e(i).parent().data("iosslider"), this.sliderObject = i, 
this.sliderContainerObject = e(i).parent(), this.currentSlideObject = r, this.currentSlideNumber = o + 1, 
this.currentSliderOffset = -1 * C.getSliderOffset(i, "x");
},
preventDrag:function(e) {
e.preventDefault();
},
preventClick:function(e) {
return e.stopImmediatePropagation(), !1;
},
enableClick:function() {
return !0;
}
};
C.setBrowserInfo();
var E = {
init:function(r, l) {
u = C.has3DTransform();
var p = e.extend(!0, {
elasticPullResistance:.6,
frictionCoefficient:.92,
elasticFrictionCoefficient:.6,
snapFrictionCoefficient:.92,
snapToChildren:!1,
snapSlideCenter:!1,
startAtSlide:1,
scrollbar:!1,
scrollbarDrag:!1,
scrollbarHide:!0,
scrollbarPaging:!1,
scrollbarLocation:"top",
scrollbarContainer:"",
scrollbarOpacity:.4,
scrollbarHeight:"4px",
scrollbarBorder:"0",
scrollbarMargin:"5px",
scrollbarBackground:"#000",
scrollbarBorderRadius:"100px",
scrollbarShadow:"0 0 0 #000",
scrollbarElasticPullResistance:.9,
desktopClickDrag:!1,
keyboardControls:!1,
tabToAdvance:!1,
responsiveSlideContainer:!0,
responsiveSlides:!0,
navSlideSelector:"",
navPrevSelector:"",
navNextSelector:"",
autoSlideToggleSelector:"",
autoSlide:!1,
autoSlideTimer:5e3,
autoSlideTransTimer:750,
autoSlideHoverPause:!0,
infiniteSlider:!1,
snapVelocityThreshold:5,
slideStartVelocityThreshold:0,
horizontalSlideLockThreshold:5,
verticalSlideLockThreshold:3,
hardwareAccelBuffer:5,
stageCSS:{
position:"relative",
top:"0",
left:"0",
overflow:"hidden",
zIndex:1
},
unselectableSelector:"",
onSliderLoaded:"",
onSliderUpdate:"",
onSliderResize:"",
onSlideStart:"",
onSlideChange:"",
onSlideComplete:""
}, r);
return void 0 == l && (l = this), e(l).each(function(r) {
function l() {
C.autoSlidePause(u), gt = e(at).find("a"), _t = e(at).find("[onclick]"), yt = e(at).find("*"), 
e(X).css("width", ""), e(X).css("height", ""), e(at).css("width", ""), R = e(at).children().not("script").get(), 
W = new Array(), U = new Array(), p.responsiveSlides && e(R).css("width", ""), D[u] = 0, 
z = new Array(), O = e(X).parent().width(), B = e(X).outerWidth(!0), p.responsiveSlideContainer && (B = e(X).outerWidth(!0) > O ? O :e(X).width()), 
e(X).css({
position:p.stageCSS.position,
top:p.stageCSS.top,
left:p.stageCSS.left,
overflow:p.stageCSS.overflow,
zIndex:p.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:B
}), e(p.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < R.length; t++) {
W[t] = e(R[t]).width(), U[t] = e(R[t]).outerWidth(!0);
var n = U[t];
p.responsiveSlides && (U[t] > B ? (n = B + -1 * (U[t] - W[t]), W[t] = n, U[t] = B) :n = W[t], 
e(R[t]).css({
width:n
})), e(R[t]).css({
overflow:"hidden",
position:"absolute"
}), z[t] = -1 * D[u], D[u] = D[u] + n + (U[t] - W[t]);
}
p.snapSlideCenter && (Q = .5 * (B - U[0]), p.responsiveSlides && U[0] > B && (Q = 0)), 
x[u] = 2 * D[u];
for (var t = 0; t < R.length; t++) C.setSliderOffset(e(R[t]), -1 * z[t] + D[u] + Q), 
z[t] = z[t] - D[u];
if (!p.infiniteSlider && !p.snapSlideCenter) {
for (var i = 0; i < z.length && !(z[i] <= -1 * (2 * D[u] - B)); i++) ut = i;
z.splice(ut + 1, z.length), z[z.length] = -1 * (2 * D[u] - B);
}
for (var i = 0; i < z.length; i++) tt[i] = z[i];
if (Z && (b[u].startAtSlide = b[u].startAtSlide > z.length ? z.length :b[u].startAtSlide, 
p.infiniteSlider ? (b[u].startAtSlide = (b[u].startAtSlide - 1 + st) % st, M[u] = b[u].startAtSlide) :(b[u].startAtSlide = b[u].startAtSlide - 1 < 0 ? z.length - 1 :b[u].startAtSlide, 
M[u] = b[u].startAtSlide - 1), L[u] = M[u]), T[u] = D[u] + Q, e(at).css({
position:"relative",
cursor:m,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:D[u] + "px"
}), mt = D[u], D[u] = 2 * D[u] - B + 2 * Q, pt = B > mt + Q || 0 == B ? !0 :!1, 
pt && e(at).css({
cursor:"default"
}), F = e(X).parent().outerHeight(!0), j = e(X).height(), p.responsiveSlideContainer && (j = j > F ? F :j), 
e(X).css({
height:j
}), C.setSliderOffset(at, z[M[u]]), p.infiniteSlider && !pt) {
for (var r = C.getSliderOffset(e(at), "x"), o = (S[u] + st) % st * -1; 0 > o; ) {
var a = 0, s = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") < s && (s = C.getSliderOffset(this, "x"), a = e);
});
var l = T[u] + mt;
C.setSliderOffset(e(R)[a], l), T[u] = -1 * z[1] + Q, D[u] = T[u] + mt - B, z.splice(0, 1), 
z.splice(z.length, 0, -1 * l + Q), o++;
}
for (;-1 * z[0] - mt + Q > 0 && p.snapSlideCenter && Z; ) {
var d = 0, c = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") > c && (c = C.getSliderOffset(this, "x"), d = e);
});
var l = T[u] - U[d];
C.setSliderOffset(e(R)[d], l), z.splice(0, 0, -1 * l + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, D[u] = T[u] + mt - B, S[u]--, M[u]++;
}
for (;r <= -1 * D[u]; ) {
var a = 0, s = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") < s && (s = C.getSliderOffset(this, "x"), a = e);
});
var l = T[u] + mt;
C.setSliderOffset(e(R)[a], l), T[u] = -1 * z[1] + Q, D[u] = T[u] + mt - B, z.splice(0, 1), 
z.splice(z.length, 0, -1 * l + Q), S[u]++, M[u]--;
}
}
return C.setSliderOffset(at, z[M[u]]), C.updateBackfaceVisibility(R, u, st, p), 
p.desktopClickDrag || e(at).css({
cursor:"default"
}), p.scrollbar && (e("." + J).css({
margin:p.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + J + " ." + K).css({
border:p.scrollbarBorder
}), P = parseInt(e("." + J).css("marginLeft")) + parseInt(e("." + J).css("marginRight")), 
N = parseInt(e("." + J + " ." + K).css("borderLeftWidth"), 10) + parseInt(e("." + J + " ." + K).css("borderRightWidth"), 10), 
$ = "" != p.scrollbarContainer ? e(p.scrollbarContainer).width() :B, I = B / mt * ($ - P), 
p.scrollbarHide || (nt = p.scrollbarOpacity), e("." + J).css({
position:"absolute",
left:0,
width:$ - P + "px",
margin:p.scrollbarMargin
}), "top" == p.scrollbarLocation ? e("." + J).css("top", "0") :e("." + J).css("bottom", "0"), 
e("." + J + " ." + K).css({
borderRadius:p.scrollbarBorderRadius,
background:p.scrollbarBackground,
height:p.scrollbarHeight,
width:I - N + "px",
minWidth:p.scrollbarHeight,
border:p.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:nt,
filter:"alpha(opacity:" + 100 * nt + ")",
boxShadow:p.scrollbarShadow
}), C.setSliderOffset(e("." + J + " ." + K), Math.floor((-1 * z[M[u]] - T[u] + Q) / (D[u] - T[u] + Q) * ($ - P - I))), 
e("." + J).css({
display:"block"
}), y = e("." + J + " ." + K), A = e("." + J)), p.scrollbarDrag && !pt && e("." + J + " ." + K).css({
cursor:m
}), p.infiniteSlider && (q = (D[u] + B) / 3), "" != p.navSlideSelector && e(p.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(wt).bind(wt, function(n) {
"touchstart" == n.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = n.type + ".iosSliderEvent", C.changeSlide(t, at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p);
});
}), "" != p.navPrevSelector && (e(p.navPrevSelector).css({
cursor:"pointer"
}), e(p.navPrevSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent";
var n = (M[u] + S[u] + st) % st;
(n > 0 || p.infiniteSlider) && C.changeSlide(n - 1, at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p);
})), "" != p.navNextSelector && (e(p.navNextSelector).css({
cursor:"pointer"
}), e(p.navNextSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent";
var n = (M[u] + S[u] + st) % st;
(n < z.length - 1 || p.infiniteSlider) && C.changeSlide(n + 1, at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p);
})), p.autoSlide && !pt && "" != p.autoSlideToggleSelector && (e(p.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(p.autoSlideToggleSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent", ht ? (C.autoSlide(at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p), 
ht = !1, e(p.autoSlideToggleSelector).removeClass("on")) :(C.autoSlidePause(u), 
ht = !0, e(p.autoSlideToggleSelector).addClass("on"));
})), C.autoSlide(at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p), e(X).bind("mouseleave.iosSliderEvent", function() {
return ht ? !0 :(C.autoSlide(at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p), 
void 0);
}), e(X).bind("touchend.iosSliderEvent", function() {
return ht ? !0 :(C.autoSlide(at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p), 
void 0);
}), p.autoSlideHoverPause && e(X).bind("mouseenter.iosSliderEvent", function() {
C.autoSlidePause(u);
}), e(X).data("iosslider", {
obj:kt,
settings:p,
scrollerNode:at,
slideNodes:R,
numberOfSlides:st,
centeredSlideOffset:Q,
sliderNumber:u,
originalOffsets:tt,
childrenOffsets:z,
sliderMax:D[u],
scrollbarClass:K,
scrollbarWidth:I,
scrollbarStageWidth:$,
stageWidth:B,
scrollMargin:P,
scrollBorder:N,
infiniteSliderOffset:S[u],
infiniteSliderWidth:q,
slideNodeOuterWidths:U,
shortContent:pt
}), Z = !1, !0;
}
t++;
var u = t, f = new Array();
b[u] = e.extend({}, p), T[u] = 0, D[u] = 0;
var y, A, $, I, O, F, B, j, P, N, H, z, R, W, U, q, V = new Array(0, 0), G = new Array(0, 0), J = "scrollbarBlock" + t, K = "scrollbar" + t, Q = 0, X = e(this), Z = !0, et = -1, tt = (new Array(), 
new Array()), nt = 0, it = 0, rt = 0, ot = 0, at = e(this).children(":first-child"), st = e(at).children().not("script").length, lt = !1, ut = 0, dt = !1, ct = void 0;
S[u] = 0;
var pt = !1;
_[u] = -1;
var ht = !1;
v[u] = X, w[u] = !1;
var ft, mt, gt, _t, yt, vt = !1, bt = !1, wt = "touchstart.iosSliderEvent click.iosSliderEvent";
Y[u] = !1, k[u] = new Array(), p.scrollbarDrag && (p.scrollbar = !0, p.scrollbarHide = !1);
var kt = e(this), Mt = kt.data("iosslider");
if (void 0 != Mt) return !0;
for (var Lt = [ "d", "e", "m", "o", " ", "v", "e", "r", "s", "i", "o", "n" ], St = Math.floor(12317 * Math.random()), r = 0; r < Lt.length; r++) e(".i" + St).html(e(".i" + St).html() + Lt[r]);
if (parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), p.infiniteSlider && (p.scrollbar = !1), p.infiniteSlider && 1 == st && (p.infiniteSlider = !1), 
p.scrollbar && ("" != p.scrollbarContainer ? e(p.scrollbarContainer).append("<div class = '" + J + "'><div class = '" + K + "'></div></div>") :e(at).parent().append("<div class = '" + J + "'><div class = '" + K + "'></div></div>")), 
!l()) return !0;
e(this).find("a").bind("mousedown", C.preventDrag), e(this).find("[onclick]").bind("click", C.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var et = C.calcActiveOffset(p, C.getSliderOffset(e(at), "x"), z, B, S[u], st, void 0, u), Tt = (et + S[u] + st) % st, Dt = new C.args("load", p, at, e(at).children(":eq(" + Tt + ")"), Tt, Tt);
if (e(X).data("args", Dt), "" != p.onSliderLoaded && p.onSliderLoaded(Dt), _[u] = Tt, 
p.scrollbarPaging && p.scrollbar && !pt && (e(A).css("cursor", "pointer"), e(A).bind("click.iosSliderEvent", function(t) {
this == t.target && (t.pageX > e(y).offset().left ? E.nextPage(X) :E.prevPage(X));
})), b[u].responsiveSlides || b[u].responsiveSlideContainer) {
var xt = s ? "orientationchange" :"resize", Yt = $B.debounce(function() {
if (!l()) return !0;
var t = e(X).data("args");
"" != p.onSliderResize && p.onSliderResize(t);
}, 50);
e(window).bind(xt + ".iosSliderEvent-" + u, Yt);
}
if (!p.keyboardControls && !p.tabToAdvance || pt || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!d && !c) var e = e.originalEvent;
if (Y[u]) return !0;
if (37 == e.keyCode && p.keyboardControls) {
e.preventDefault();
var t = (M[u] + S[u] + st) % st;
(t > 0 || p.infiniteSlider) && C.changeSlide(t - 1, at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p);
} else if (39 == e.keyCode && p.keyboardControls || 9 == e.keyCode && p.tabToAdvance) {
e.preventDefault();
var t = (M[u] + S[u] + st) % st;
(t < z.length - 1 || p.infiniteSlider) && C.changeSlide(t + 1, at, R, f, K, I, B, $, P, N, tt, z, U, u, q, st, Q, p);
}
}), a || p.desktopClickDrag) {
var Ct = !1, Et = !1, At = e(at), $t = e(at), It = !1;
p.scrollbarDrag && (At = At.add(y), $t = $t.add(A)), e(At).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
Ct = !1;
}), Ct) return !0;
if (Ct = !0, Et = !1, "touchstart" == t.type ? e($t).unbind("mousedown.iosSliderEvent") :e($t).unbind("touchstart.iosSliderEvent"), 
Y[u] || pt) return Ct = !1, lt = !1, !0;
if (It = C.isUnselectable(t.target, p)) return Ct = !1, lt = !1, !0;
if (ft = e(this)[0] === e(y)[0] ? y :at, !d && !c) var t = t.originalEvent;
if (C.autoSlidePause(u), yt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (c) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, dt = !0, ct = at, e(this).css({
cursor:g
});
}
V = new Array(0, 0), G = new Array(0, 0), n = 0, lt = !1;
for (var i = 0; i < f.length; i++) clearTimeout(f[i]);
var r = C.getSliderOffset(at, "x");
r > -1 * T[u] + Q + mt ? (r = -1 * T[u] + Q + mt, C.setSliderOffset(e("." + K), r), 
e("." + K).css({
width:I - N + "px"
})) :r < -1 * D[u] && (r = -1 * D[u], C.setSliderOffset(e("." + K), $ - P - I), 
e("." + K).css({
width:I - N + "px"
}));
var o = e(this)[0] === e(y)[0] ? T[u] :0;
it = -1 * (C.getSliderOffset(this, "x") - eventX - o), rt = -1 * (C.getSliderOffset(this, "y") - eventY), 
V[1] = eventX, G[1] = eventY, bt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!d && !c) var t = t.originalEvent;
if (Y[u] || pt || It || !Ct) return !0;
var r = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (c) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !dt) return !0;
if (!h && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (V[0] = V[1], V[1] = eventX, n = (V[1] - V[0]) / 2, G[0] = G[1], G[1] = eventY, 
i = (G[1] - G[0]) / 2, !lt) {
var a = (M[u] + S[u] + st) % st, s = new C.args("start", p, at, e(at).children(":eq(" + a + ")"), a, void 0);
e(X).data("args", s), "" != p.onSlideStart && p.onSlideStart(s);
}
if ((i > p.verticalSlideLockThreshold || i < -1 * p.verticalSlideLockThreshold) && "touchmove" == t.type && !lt && (vt = !0), 
(n > p.horizontalSlideLockThreshold || n < -1 * p.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(n > p.slideStartVelocityThreshold || n < -1 * p.slideStartVelocityThreshold) && (lt = !0), 
lt && !vt) {
var l = C.getSliderOffset(at, "x"), f = e(ft)[0] === e(y)[0] ? T[u] :Q, m = e(ft)[0] === e(y)[0] ? (T[u] - D[u] - Q) / ($ - P - I) :1, g = e(ft)[0] === e(y)[0] ? p.scrollbarElasticPullResistance :p.elasticPullResistance, _ = p.snapSlideCenter && e(ft)[0] === e(y)[0] ? 0 :Q, v = p.snapSlideCenter && e(ft)[0] === e(y)[0] ? Q :0;
if ("touchmove" == t.type && (ot != t.touches.length && (it = -1 * l + eventX), 
ot = t.touches.length), p.infiniteSlider) {
if (l <= -1 * D[u]) {
var b = e(at).width();
if (l <= -1 * x[u]) {
var w = -1 * tt[0];
e(R).each(function(t) {
C.setSliderOffset(e(R)[t], w + Q), t < z.length && (z[t] = -1 * w), w += U[t];
}), it -= -1 * z[0], T[u] = -1 * z[0] + Q, D[u] = T[u] + b - B, S[u] = 0;
} else {
var k = 0, E = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") < E && (E = C.getSliderOffset(this, "x"), k = e);
});
var A = T[u] + b;
C.setSliderOffset(e(R)[k], A), T[u] = -1 * z[1] + Q, D[u] = T[u] + b - B, z.splice(0, 1), 
z.splice(z.length, 0, -1 * A + Q), S[u]++;
}
}
if (l >= -1 * T[u] || l >= 0) {
var b = e(at).width();
if (l >= 0) {
var w = -1 * tt[0];
for (e(R).each(function(t) {
C.setSliderOffset(e(R)[t], w + Q), t < z.length && (z[t] = -1 * w), w += U[t];
}), it += -1 * z[0], T[u] = -1 * z[0] + Q, D[u] = T[u] + b - B, S[u] = st; -1 * z[0] - b + Q > 0; ) {
var O = 0, F = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") > F && (F = C.getSliderOffset(this, "x"), O = e);
});
var A = T[u] - U[O];
C.setSliderOffset(e(R)[O], A), z.splice(0, 0, -1 * A + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, D[u] = T[u] + b - B, S[u]--, M[u]++;
}
} else {
var O = 0, F = C.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
C.getSliderOffset(this, "x") > F && (F = C.getSliderOffset(this, "x"), O = e);
});
var A = T[u] - U[O];
C.setSliderOffset(e(R)[O], A), z.splice(0, 0, -1 * A + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, D[u] = T[u] + b - B, S[u]--;
}
}
} else {
var b = e(at).width();
l > -1 * T[u] + Q && (r = (T[u] + -1 * (it - f - eventX + _) * m - f) * g * -1 / m), 
l < -1 * D[u] && (r = (D[u] + v + -1 * (it - f - eventX) * m - f) * g * -1 / m);
}
if (C.setSliderOffset(at, -1 * (it - f - eventX - r) * m - f + v), p.scrollbar) {
C.showScrollbar(p, K), o = Math.floor((it - eventX - r - T[u] + _) / (D[u] - T[u] + Q) * ($ - P - I) * m);
var j = I;
0 >= o ? (j = I - N - -1 * o, C.setSliderOffset(e("." + K), 0), e("." + K).css({
width:j + "px"
})) :o >= $ - P - N - I ? (j = $ - P - N - o, C.setSliderOffset(e("." + K), o), 
e("." + K).css({
width:j + "px"
})) :C.setSliderOffset(e("." + K), o);
}
"touchmove" == t.type && (H = t.touches[0].pageX);
var W = !1, q = C.calcActiveOffset(p, -1 * (it - eventX - r), z, B, S[u], st, void 0, u), J = (q + S[u] + st) % st;
if (p.infiniteSlider ? J != L[u] && (W = !0) :q != M[u] && (W = !0), W) {
M[u] = q, L[u] = J, bt = !0;
var s = new C.args("change", p, at, e(at).children(":eq(" + J + ")"), J, J);
e(X).data("args", s), "" != p.onSlideChange && p.onSlideChange(s), C.updateBackfaceVisibility(R, u, st, p);
}
}
});
var Ot = e(window);
if (c || d) var Ot = e(document);
e(At).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if (Et) return !1;
if (Et = !0, Y[u] || pt) return !0;
if (It) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == H && C.slowScrollHorizontal(at, R, f, K, n, i, I, B, $, P, N, tt, z, U, u, q, st, ft, bt, Q, p); else C.slowScrollHorizontal(at, R, f, K, n, i, I, B, $, P, N, tt, z, U, u, q, st, ft, bt, Q, p);
return vt = !1, Ct = !1, !0;
}), e(Ot).bind("mouseup.iosSliderEvent-" + u, function() {
if (lt ? gt.unbind("click.disableClick").bind("click.disableClick", C.preventClick) :gt.unbind("click.disableClick").bind("click.disableClick", C.enableClick), 
_t.each(function() {
this.onclick = function(t) {
return lt ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? yt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", C.preventClick);
var n = e._data(this, "events").click, i = n.pop();
n.splice(0, 0, i);
}
}) :parseFloat(e().jquery) >= 1.6 && yt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", C.preventClick);
var n = e(this).data("events").click, i = n.pop();
n.splice(0, 0, i);
}
}), !w[u]) {
if (pt) return !0;
if (p.desktopClickDrag && e(at).css({
cursor:m
}), p.scrollbarDrag && e(y).css({
cursor:m
}), dt = !1, void 0 == ct) return !0;
C.slowScrollHorizontal(ct, R, f, K, n, i, I, B, $, P, N, tt, z, U, u, q, st, ft, bt, Q, p), 
ct = void 0;
}
vt = !1, Ct = !1;
});
}
});
},
destroy:function(t, n) {
return void 0 == n && (n = this), e(n).each(function() {
var n = e(this), i = n.data("iosslider");
if (void 0 == i) return !1;
void 0 == t && (t = !0), C.autoSlidePause(i.sliderNumber), w[i.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + i.sliderNumber), e(document).unbind(".iosSliderEvent-" + i.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
e(i.settings.scrollbarBlockNode).unbind(".iosSliderEvent"), t && (e(this).attr("style", ""), 
e(this).children(":first-child").attr("style", ""), e(this).children(":first-child").children().attr("style", ""), 
e(i.settings.navSlideSelector).attr("style", ""), e(i.settings.navPrevSelector).attr("style", ""), 
e(i.settings.navNextSelector).attr("style", ""), e(i.settings.autoSlideToggleSelector).attr("style", ""), 
e(i.settings.unselectableSelector).attr("style", "")), i.settings.scrollbar && e(".scrollbarBlock" + i.sliderNumber).remove();
for (var r = k[i.sliderNumber], o = 0; o < r.length; o++) clearTimeout(r[o]);
n.removeData("iosslider"), n.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
n.settings.startAtSlide = t.data("args").currentSlideNumber, E.destroy(!1, this), 
1 != n.numberOfSlides && n.settings.infiniteSlider && (n.settings.startAtSlide = (M[n.sliderNumber] + 1 + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides), 
E.init(n.settings, this);
var i = new C.args("update", n.settings, n.scrollerNode, e(n.scrollerNode).children(":eq(" + (n.settings.startAtSlide - 1) + ")"), n.settings.startAtSlide - 1, n.settings.startAtSlide - 1);
e(n.stageNode).data("args", i), "" != n.settings.onSliderUpdate && n.settings.onSliderUpdate(i);
});
},
addSlide:function(t, n) {
return this.each(function() {
var i = e(this), r = i.data("iosslider");
return void 0 == r ? !1 :(0 == e(r.scrollerNode).children().length ? (e(r.scrollerNode).append(t), 
i.data("args").currentSlideNumber = 1) :r.settings.infiniteSlider ? (1 == n ? e(r.scrollerNode).children(":eq(0)").before(t) :e(r.scrollerNode).children(":eq(" + (n - 2) + ")").after(t), 
S[r.sliderNumber] < -1 && M[r.sliderNumber]--, i.data("args").currentSlideNumber >= n && M[r.sliderNumber]++) :(n <= r.numberOfSlides ? e(r.scrollerNode).children(":eq(" + (n - 1) + ")").before(t) :e(r.scrollerNode).children(":eq(" + (n - 2) + ")").after(t), 
i.data("args").currentSlideNumber >= n && i.data("args").currentSlideNumber++), 
i.data("iosslider").numberOfSlides++, E.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var n = e(this), i = n.data("iosslider");
return void 0 == i ? !1 :(e(i.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
M[i.sliderNumber] > t - 1 && M[i.sliderNumber]--, n.data("iosslider").numberOfSlides--, 
E.update(this), void 0);
});
},
goToSlide:function(t, n) {
return void 0 == n && (n = this), e(n).each(function() {
var n = e(this), i = n.data("iosslider");
return void 0 == i || i.shortContent ? !1 :(t = t > i.childrenOffsets.length ? i.childrenOffsets.length - 1 :t - 1, 
C.changeSlide(t, e(i.scrollerNode), e(i.slideNodes), k[i.sliderNumber], i.scrollbarClass, i.scrollbarWidth, i.stageWidth, i.scrollbarStageWidth, i.scrollMargin, i.scrollBorder, i.originalOffsets, i.childrenOffsets, i.slideNodeOuterWidths, i.sliderNumber, i.infiniteSliderWidth, i.numberOfSlides, i.centeredSlideOffset, i.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n || n.shortContent) return !1;
var i = (M[n.sliderNumber] + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides;
(i > 0 || n.settings.infiniteSlider) && C.changeSlide(i - 1, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
M[n.sliderNumber] = i;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n || n.shortContent) return !1;
var i = (M[n.sliderNumber] + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides;
(i < n.childrenOffsets.length - 1 || n.settings.infiniteSlider) && C.changeSlide(i + 1, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
M[n.sliderNumber] = i;
});
},
prevPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
var i = C.getSliderOffset(n.scrollerNode, "x") + n.stageWidth;
C.changeOffset(i, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings);
});
},
nextPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
var i = C.getSliderOffset(n.scrollerNode, "x") - n.stageWidth;
C.changeOffset(i, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings);
});
},
lock:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(e(n.scrollerNode).css({
cursor:"default"
}), Y[n.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(e(n.scrollerNode).css({
cursor:m
}), Y[n.sliderNumber] = !1, void 0);
});
},
getData:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :n;
});
},
autoSlidePause:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(b[n.sliderNumber].autoSlide = !1, C.autoSlidePause(n.sliderNumber), 
n);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(b[n.sliderNumber].autoSlide = !0, C.autoSlide(e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
n);
});
}
};
e.fn.iosSlider = function(t) {
return E[t] ? E[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :E.init.apply(this, arguments);
};
}(jQuery), function() {
var e;
e = angular.module("strikinglyDirectives", []), e.directive("sTooltip", function() {
return function(e, t, n) {
return t.tooltip({
animate:!1,
placement:n.sTooltip || "top",
title:function() {
return t.attr("title") || t.data("original-title");
}
}), e.$on("$locationChangeStart", function() {
return t.tooltip("hide");
});
};
}), e.directive("sScrolled", function() {
return function(e, t, n) {
var i, r, o;
return o = t[0], i = $B.debounce(function() {
return e.$apply(n.sScrolled);
}, 100), r = -1, t.bind("scroll", function(e) {
return r < o.scrollTop && o.scrollTop + o.offsetHeight + 50 >= o.scrollHeight && i(), 
e.stopPropagation(), r = o.scrollTop;
});
};
}), e.directive("sIsLink", function() {
return function(e, t, n) {
var i;
return i = n.sIsLink, t.bind("click", function(t) {
return e.$eval(i) ? void 0 :(e.$eval(n.sNonLinkHandler), t.preventDefault());
});
};
}), e.directive("sInit", [ "$parse", function(e) {
return {
restrict:"A",
link:function(t, n, i) {
return i.ngModel ? e(i.ngModel).assign(t, n.val()) :void 0;
}
};
} ]);
}.call(this), function() {
var e;
e = angular.module("strikinglyFilters", []), e.filter("dateFromNow", function() {
return function(e) {
var t;
return ("function" == typeof moment ? null != (t = moment(e)) ? "function" == typeof t.fromNow ? t.fromNow() :void 0 :void 0 :void 0) || e;
};
}), e.filter("fileSize", function() {
return function(e) {
return 1048576 > e ? parseInt(e / 1024) + "kb" :(e / 1024 / 1024).toFixed(1) + "MB";
};
}), e.filter("sum", function() {
return function(e, t) {
var n, i, r, o;
for (i = 0, r = 0, o = e.length; o > r; r++) n = e[r], i += n[t];
return i;
};
}), e.filter("map", function() {
return function(e, t) {
var n, i, r, o, a, s;
switch (i = [], typeof t) {
case "string":
for (r = 0, a = e.length; a > r; r++) n = e[r], i.push(n[t]);
break;

case "function":
for (o = 0, s = e.length; s > o; o++) n = e[o], i.push(t(n));
break;

default:
i = e;
}
return i;
};
}), e.filter("dateReadable", function() {
return function(e) {
var t;
return ("function" == typeof moment ? null != (t = moment(e)) ? "function" == typeof t.format ? t.format("M/D/YYYY, h:mm:ss a") :void 0 :void 0 :void 0) || e;
};
}), e.filter("shortUrl", function() {
return function(e) {
return e = e.replace("http://www.strikingly.com", "strikingly.com"), e = e.replace(/^http:\/\//i, ""), 
e.replace(/\/$/, "");
};
}), e.filter("getById", function() {
return function(e, t) {
var n, i, r;
for (i = 0, r = e.length; r > i; i++) if (n = e[i], +n.id === +t) return n;
return null;
};
}), e.filter("timeReadable", function() {
return function(e) {
var t, n, i, r;
return e || 0 === e ? (t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), 
r = e % 3600 % 60, i = r, n && (i = n + "m " + i), t && (i = t + "h " + i), i += n || t ? "s" :" seconds") :"";
};
});
}.call(this), function() {
var e, t, n, i;
t = function(e) {
return "/r/v1/" + e;
}, n = function(e) {
return "/i/v1/" + e;
}, e = function() {
var e;
return null != (e = $S.user_meta) ? e.id :void 0;
}, i = angular.module("strikinglyResources", [ "ngResource" ]), i.factory("User", [ "$resource", function(n) {
return n(t("users/:user_id/:action"), {}, {
domains:{
method:"GET",
params:{
user_id:e(),
action:"domains"
},
cache:!0
}
});
} ]), i.factory("User2", [ "$resource", function(e) {
return e(t("users/me/:action"), {}, {
summary:{
method:"GET",
params:{
action:"summary"
},
isArray:!1,
cache:!0
},
features:{
method:"GET",
params:{
action:"features"
},
isArray:!1,
cache:!0
}
});
} ]), i.factory("Page", [ "$resource", function(n) {
var i;
return i = n(t("pages/:page_id/:action"), {}, {
clone:{
method:"POST",
params:{
action:"clone",
page_id:"@page_id",
user_id:e()
}
},
formResponses:{
method:"GET",
params:{
action:"collected_emails",
page_id:"@page_id"
},
isArray:!0
},
get:{
method:"GET",
params:{
action:"",
page_id:"@page_id"
}
},
publish:{
method:"POST",
params:{
action:"publish",
page_id:"@page_id"
}
},
unpublish:{
method:"POST",
params:{
action:"unpublish",
page_id:"@page_id"
}
},
checkDomain:{
method:"GET",
params:{
action:"check_domain",
page_id:"@page_id"
}
}
}), i.screenshotUrl = function(e, n, i) {
return t("pages/" + e.id + "/screenshot_url?width=" + n + "&height=" + i);
}, i;
} ]), i.factory("Pages", [ "$resource", function(e) {
return e(t("pages"), {}, {
get:{
method:"GET",
cache:!0
}
});
} ]), i.factory("FormResponse", [ "$resource", function(e) {
return e(t("pages/:page_id/collected_emails/:id"), {}, {
index:{
method:"GET",
params:{
page_id:"@page_id"
}
},
update:{
method:"PUT",
params:{
id:"@id",
page_id:"@page_id"
}
},
"delete":{
method:"DELETE",
params:{
id:"@id",
page_id:"@page_id"
}
},
clearSpam:{
method:"POST",
params:{
page_id:"@page_id",
id:"clear_spam"
}
},
batchUpdate:{
method:"POST",
params:{
page_id:"@page_id",
id:"batch_update"
}
},
batchDelete:{
method:"POST",
params:{
page_id:"@page_id",
id:"batch_delete"
}
}
});
} ]), i.factory("Domain", [ "$resource", function(e) {
return e(t("domains/:id"), {}, {
show:{
method:"GET",
params:{
id:"@id"
}
},
update:{
method:"PUT",
params:{
id:"@id"
}
}
});
} ]), i.factory("Theme", [ "$resource", function(e) {
return e(t("theme_selections/"), {}, {
get:{
method:"GET",
params:{},
isArray:!0,
cache:!0
}
});
} ]), i.factory("StockAssets", [ "$resource", function(e) {
var n;
return n = e(t("stock_asset_sets"), {}, {
get:{
method:"GET",
params:{},
isArray:!1,
cache:!0
}
});
} ]), i.factory("FeaturedPage", [ "$resource", function(e) {
return e(t("featured_pages"), {}, {
get:{
method:"GET",
params:{},
isArray:!1,
cache:!0
}
});
} ]), i.factory("Rewards", [ "$resource", function(e) {
return e(t("rewards/:action"), {}, {
get:{
method:"GET",
params:{
action:""
}
},
claim:{
method:"POST",
params:{
reward_name:"@reward_name",
action:""
}
},
claimGift:{
method:"POST",
params:{
action:"gift",
name:"@name"
}
}
});
} ]).factory("Invitations", [ "$resource", function(e) {
return e(t("invitations"), {}, {
invite:{
method:"POST"
}
});
} ]), i.factory("Notifications", [ "$resource", function(e) {
return e(t("notifications/:id"), {}, {
get:{
method:"GET",
params:{
id:""
}
}
});
} ]);
}.call(this), function() {
var e, t;
e = $B.AngularModule = angular.module("strikingly", [ "ngRoute", "strikinglyResources", "strikinglyFilters", "strikinglyDirectives", "strikinglyServices" ]), 
t = function(e) {
return "/a/t/" + e;
}, e.config([ "$routeProvider", function(e) {
return e.when("/", {
templateUrl:t("pages/listing.html"),
controller:"PageListCtrl",
reloadOnSearch:!1
}).when("/select-template", {
templateUrl:t("pages/select_template.html"),
controller:"ThemeCtrl"
}).when("/analytics/:pageId", {
templateUrl:t("pages/analytics.html"),
controller:"AnalyticsCtrl",
reloadOnSearch:!1
}).when("/delete-site/:pageId", {
templateUrl:t("pages/delete_site.html"),
controller:"PageDeleteCtrl"
}).when("/form-responses/:pageId", {
templateUrl:t("pages/form_responses.html"),
controller:"FormResponsesCtrl"
}).when("/domains/", {
templateUrl:t("pages/domains.html"),
controller:"DomainsCtrl"
}).otherwise({
redirectTo:"/"
});
} ]);
}.call(this), function() {
var e;
e = angular.module("strikinglyServices", []), e.factory("modalDialog", [ "$window", function(e) {
return {
confirm:function(t) {
return e.confirm(t);
}
};
} ]), e.factory("errorHandler", [ "$window", function(e) {
return {
wrap:function(t, n) {
var i, r;
return null == n && (n = {}), r = this, i = $.extend({
bypassMessage:!1
}, n), function(n) {
var o, a, s, l, u;
return "undefined" != typeof $B && null !== $B && "function" == typeof $B.log && $B.log("[ErrorHandler]", n), 
401 === n.status ? (r.alertNotice("Your session has expired. Click OK to login again."), 
e.location = "/s/login", void 0) :(500 === n.status ? r.alertNotice("There's been a server issue. Our engineers are looking into it now!") :(o = "function" == typeof n.headers ? null != (a = n.headers()) ? a["error-message"] :void 0 :void 0) ? r.alertNotice("Error: " + o) :(o = (null != (s = n.data) ? null != (l = s.meta) ? null != (u = l.userMessage) ? u.plain :void 0 :void 0 :void 0) && !i.bypassMessage) ? r.alertNotice("Error: " + o) :"function" == typeof $B.log && $B.log("Error has occurred."), 
t ? t(n) :void 0);
};
},
alertNotice:function(e) {
return $B.log("errorHandler alert"), $B.customAlert(e);
}
};
} ]), e.factory("EditorEventHub", [ function() {
return {
pub:function(e, t) {
var n, i;
return null != (n = window.parent) ? null != (i = n.edit_page) ? i.Event.publish(e, t) :void 0 :void 0;
},
sub:function(e, t) {
var n, i;
return null != (n = window.parent) ? null != (i = n.edit_page) ? i.Event.subscribe(e, t) :void 0 :void 0;
}
};
} ]), e.factory("angularPoller", [ "$http", function(e) {
return {
poll:function(t, n, i) {
var r;
return null == n && (n = function() {}), null == i && (i = function() {}), r = !1, 
$B.pollHelper(function(o) {
var a;
return $B.log("Polling URL " + t), a = e.get(t), a.success(function(e, i, a, s) {
return r ? void 0 :e && "retry" !== e && "retry" !== e.html ? (n(e, i, a, s), $B.log("Poller success " + t)) :o();
}), a.error(i);
}), {
cancel:function() {
return r = !0;
}
};
}
};
} ]), e.factory("annieFactory", [ "$rootScope", "$http", "angularPoller", function(e, t, n) {
var i, r, o;
return i = "/s/api/analytics/show.json?v=1", r = function(e, t, n) {
return "Analytics|" + e + "|" + t + "|" + n;
}, o = {
getAnalyticsOptions:function(e, t) {
var n, i, r, o, a, s, l;
return null == t && (t = "week"), n = 864e5, "month" === t ? (l = 31 * n, r = "d") :"week" === t ? (l = 8 * n, 
r = "d") :"quarter" === t ? (l = 90 * n, r = "d") :"year" === t ? (l = 365 * n, 
r = "m") :(l = 1 * n, r = "h"), o = new Date(), s = o.getTime(), a = {
time_interval:r,
page_id:e,
v:1
}, i = function(e) {
return e.format("UTC:yyyymmddHHMM");
}, a.end_date = i(o), a.start_date = i(new Date(s - l)), a;
},
setupModules:function(e) {
var t, i, r, o;
r = {}, o = function(e) {
var i;
return i = r[e] = {
data:null,
loading:!0,
error:!1,
noData:!1,
pollerObject:void 0,
errorCallback:function() {
return this.error = !0;
},
successCallback:t,
poll:function(e, t) {
var i = this;
return this.loading = !0, this.pollerObject && this.pollerObject.cancel(), this.pollerObject = n.poll(e, function(e) {
var n, r;
return i.loading = !1, "keenio" === $S.user_meta.analytics_vendor && (n = null != e ? null != (r = e.message) ? r.result :void 0 :void 0), 
n ? (i.successCallback(n), $B.store.setHours(t, n, .15)) :i.noData = !0;
}, this.errorCallback);
}
};
};
for (i in e) t = e[i], o(i);
return r;
},
loadAnalytics:function(n, o, a) {
var s, l, u, d, c, p;
u = this.getAnalyticsOptions(n, o), c = [], p = function(t, i) {
var a, s;
return s = r(n, o, t), (a = $B.store.get(s)) ? (i.successCallback(a), i.loading = !1, 
e.$$phase ? void 0 :e.$apply()) :c.push(t);
};
for (l in a) s = a[l], p(l, s);
return c.length ? (u.modules = c.join(","), d = t.get(i, {
params:u
}), d.error(function(e) {
var t, n;
for (t = 0, n = c.length; n > t; t++) l = c[t], a[l].error = !0, a[l].loading = !1;
return $B.log("error", e);
}), d.success(function(e) {
var t, i, s;
for ($B.log("Got query URLs", e), s = [], t = 0, i = c.length; i > t; t++) l = c[t], 
s.push(a[l].poll("/s/tasks/" + e.message[l].type + "/" + e.message[l].id + ".jsm?v=1", r(n, o, l)));
return s;
})) :void 0;
}
};
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("AnalyticsCtrl", [ "$scope", "$http", "$timeout", "$routeParams", "$filter", "$location", "User2", "Page", "annieFactory", function(e, t, n, i, r, o, a, s, l) {
var u, d, c, p, h, f;
return e.error = !1, e.id = i.pageId, "1" === $.url().param("get_more_traffic") && $B.UserNotifications.getState("OpenGetMoreTraffic").success(function(e) {
return "new" === e.message.state ? setTimeout(function() {
return $("#get-more-traffic").trigger("mouseover");
}, 1e3) :void 0;
}), "2" === $.url().param("get_more_traffic") && setTimeout(function() {
return $B.ui.openCloseModal($($B.DOM.TRAFFIC_GUIDE_DIALOG));
}, 2e3), window.page_id = window.location.href.match(/\/analytics\/(\d+)/)[1], s.get({
page_id:e.id
}).$promise.then(function(t) {
return e.page = t.data.page, window.public_url = e.page.publicUrl;
}), a.features().$promise.then(function(t) {
return e.featureAnalytics = t.data.user.features.fullAnalytics;
}), u = "/s/api/analytics/show.json?v=1", window.analytics.track("Landing - Analytics v1"), 
e.selectedPeriod = "week", f = {
week:I18n.t("js.api.analytics.period_title.past_week"),
month:I18n.t("js.api.analytics.period_title.past_month"),
quarter:I18n.t("js.api.analytics.period_title.past_3_months"),
year:I18n.t("js.api.analytics.period_title.past_year"),
day:I18n.t("js.api.analytics.period_title.past_24_hours")
}, e.selectedPeriodTitle = f[e.selectedPeriod], $B.loadFacebookScript(), e.onMaintenance = $S.conf.rollout.analytics_maintenance, 
e.share = function() {
return $B.UserNotifications.markRead("OpenGetMoreTraffic"), window.analytics.track("Click More Traffic - Analytics v2"), 
$(window).width() >= 800 ? $B.ui.openCloseModal($($B.DOM.TRAFFIC_GUIDE_DIALOG)) :window.location.href = "/s/traffic_guide?page_id=" + window.page_id + "&public_url=" + window.public_url;
}, e.shareFB = function() {
return window.FB.ui({
method:"feed",
link:e.page.publicUrl
}, function(e) {
return e && e.post_id ? window.analytics.track("Shared on FB- Analytics v1") :void 0;
});
}, c = {
shadowSize:0,
lines:{
show:!0,
fill:!0,
align:"center",
barWidth:20
},
points:{
show:!1
},
grid:{
borderWidth:0,
autoHighlight:!0,
labelMargin:10,
hoverable:!0,
color:"#888",
backgroundColor:"rgba(255,255,255,0.3)",
mouseActiveRadius:80
},
yaxis:{
minTickSize:1,
min:0,
tickFormatter:function(e) {
return 0 === e ? "" :Math.floor(e);
}
},
xaxis:{
tickLength:0,
mode:"time",
timezone:"browser"
},
colors:[ "#aacc77" ]
}, h = {
pageViews:function(t) {
var n, i;
return $B.log("PAGEVIEW DATA", t), n = $(".flot"), n.length ? (n.first().text(""), 
i = $.extend(!0, {}, c), i.xaxis = "week" === e.selectedPeriod ? {
mode:"time",
minTickSize:[ 1, "day" ]
} :"month" === e.selectedPeriod ? {
mode:"time",
minTickSize:[ 3, "day" ]
} :"day" === e.selectedPeriod ? {
mode:"time",
minTickSize:[ 1, "hour" ],
timezone:"browser"
} :{
mode:"time",
minTickSize:[ 2, "day" ]
}, t = p(t), $.plot(n, [ t ], i), d(n, e.selectedPeriod)) :($B.log("FLOT CONTAINER NOT FOUND."), 
void 0);
},
totalVisits:function(t) {
return $B.log("TOTALVISITS DATA", t), "keenio" === $S.user_meta.analytics_vendor && (e.modules.totalVisits.data = t), 
e.selectedPeriodTitle = f[e.selectedPeriod];
},
visitsToday:function(t) {
return $B.log("VISITSTODAY DATA", t), "keenio" === $S.user_meta.analytics_vendor ? e.modules.visitsToday.data = t :void 0;
},
referrer:function(t) {
var n, i, r, o, a, s, l;
for ($B.log("REFERRER DATA", t), i = {}, r = [], s = 0, l = t.length; l > s; s++) o = t[s], 
"keenio" === $S.user_meta.analytics_vendor && (a = o.normalized_referrer, n = o.result, 
"0" !== a && (("(blank)" === a || null === a || void 0 === a || "" === a) && (a = "Direct Traffic"), 
r.push([ a, n ])));
return r.sort(function(e, t) {
return t[1] - e[1];
}), e.modules.referrer.data = r.slice(0, 10);
},
geography:function(t) {
var n, i, r, o, a, s, l, u, d, c;
for ($B.log("GEOGRAPHY DATA", t), o = [], d = 0, c = t.length; c > d; d++) a = t[d], 
"keenio" === $S.user_meta.analytics_vendor && (i = a["ip_geo_info.country"], n = a.result), 
o.push([ i, n ]);
return o.sort(function(e, t) {
return t[1] - e[1];
}), u = o.map(function(e) {
return e[1];
}).reduce(function(e, t) {
return e + t;
}, 0), l = o.slice(0, 10), s = o.slice(10).map(function(e) {
return e[1];
}).reduce(function(e, t) {
return e + t;
}, 0), r = l, r.push([ "Others", s ]), 0 !== u && (r = r.map(function(e) {
return [ e[0], e[1] / u * 100 ];
})), e.modules.geography.data = r;
}
}, e.modules = l.setupModules(h), e.loadAnalytics = function(t) {
return null == t && (t = "week"), e.featureAnalytics || "month" !== t && "quarter" !== t && "year" !== t ? (e.selectedPeriod = t, 
e.modules.pageViews.loading = !0, l.loadAnalytics(e.id, t, e.modules)) :($B.customAlert("Please <a href='/s/pricing?source=an' target='_blank'>upgrade to Limited or Pro</a>        to access analytics from further back!"), 
void 0);
}, d = function(e, t) {
return e.bind("plothover", function(e, n, i) {
var r, o, a;
return $("#flottip").remove(), i ? (o = i.datapoint[0], a = i.datapoint[1], r = "day" === t ? new Date(o).format("h:MM tt") + " - " + a + " views" :"year" === t ? new Date(o).format("mmm yyyy") + " - " + a + " views" :new Date(o).format("mmm d") + " - " + a + " views", 
$('<div id="flottip"></div>').html(r).css({
position:"absolute",
top:i.pageY - 15,
left:i.pageX + 15,
background:"rgba(0,0,0,0.8)",
color:"#fff",
padding:"7px 8px",
"font-size":"12",
"border-radius":"3px",
"pointer-events":"none"
}).appendTo("body")) :void 0;
});
}, p = function(e) {
var t, n, i, r, o, a;
for (i = [], o = 0, a = e.length; a > o; o++) n = e[o], "keenio" === $S.user_meta.analytics_vendor && (t = n.timeframe.start, 
r = Date.parse(t), r = r.getTime(), i.push([ r, n.value ]));
return i.sort(function(e, t) {
return e[0] - t[0];
}), i;
}, e.onMaintenance || e.loadAnalytics(), new $B.AnalyticsAutomator().pageLoadRun(), 
o.url(o.path()), $(window).width() < 960 ? $(".timespans").insertAfter($(".flot-container")).css("margin-bottom", 20) :void 0;
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("AnnouncementCtrl", [ "$scope", "Notifications", "$sce", function(e, t, n) {
var i, r, o;
return r = function() {
var e, t, n;
return t = $(".iosslider"), n = t.find(".slide"), e = 0, n.each(function() {
return e = Math.max(e, $(this).outerHeight());
}), n.css("min-height", "" + e + "px"), t.css("min-height", "" + e + "px"), t.iosSlider({
snapToChildren:!0,
navSlideSelector:t.find(".selector"),
autoSlide:!0,
autoSlideTimer:1e3,
infiniteSlider:!0,
onSlideChange:function(e) {
var n;
return n = e.currentSlideNumber, t.find(".selector").removeClass("selected"), t.find(".selector").eq(e.currentSlideNumber - 1).addClass("selected");
}
}), t.find(".selectors .selector:eq(0)").addClass("selected");
}, i = function() {
return t.get({
namespace:"dashboard"
}).$promise.then(function(t) {
var i, o, a, s;
for (e.notifications = t.data, s = e.notifications, o = 0, a = s.length; a > o; o++) i = s[o], 
i.renderedContent.text = n.trustAsHtml(i.renderedContent.text);
return $B.waitFor(function() {
var e;
return e = $(".announcement .slider .slide"), e.length > 0 && e.height() > 0;
}, r);
});
}, o = function() {}, i();
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("PageDeleteCtrl", [ "$scope", "$filter", "$routeParams", "$cacheFactory", "$location", "Page", "modalDialog", "errorHandler", function(e, t, n, i, r, o, a, s) {
return e.id = n.pageId, e.loading = !1, e.error = !1, o.get({
page_id:e.id
}).$promise.then(function(t) {
return e.page = t.data.page;
}), e["delete"] = function() {
return a.confirm("Are you absolutely sure you wish to delete the site titled " + e.page.name + "? This action is PERMANENT!") ? (e.loading = !0, 
o["delete"]({
page_id:e.id
}, function() {
return i.get("$http").removeAll(), r.path("/");
}, s.wrap())) :void 0;
};
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("DomainsCtrl", [ "$scope", "$filter", "$q", "User", "Domain", "modalDialog", "errorHandler", function(e, t, n, i, r, o, a) {
var s;
return e.loading = !0, e.domains = [], s = i.domains(), s.$promise.then(function() {
return e.domains = t("filter")(s.data.domains, function(e) {
return "waiting" !== e.state;
}), e.loading = !1;
}), e.toggle = function(e) {
return e.autoRenew = !e.autoRenew, e.loading = !0, r.update({
id:e.id
}, {
domain:{
auto_renew:e.autoRenew
}
}, function(t) {
return e.loading = !1, e.autoRenew = t.data.domain.autoRenew;
}, a.wrap());
}, e.openDomainPurchaseWindow = function(e) {
var t;
return t = window.open("/s/domains/" + e, "Purchase Domain", "scrollbars=1,width=760,height=563,menubar=no,toolbar=no,location=no"), 
t.focus();
};
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("EnagementChecklistCtrl", [ "$scope", function(e) {
var t, n, i, r, o, a, s;
for (e.progresses = $S.user_progress_checklist, t = 0, s = e.progresses, r = function(e) {
return e.actionUrl = function() {
return e.unlocked ? "" :e.url;
};
}, o = 0, a = s.length; a > o; o++) i = s[o], r(i), i.unlocked && (t += 1);
return n = t / parseFloat(e.progresses.length) * 100, e.progressWidth = {
width:"" + n + "%"
}, e.goto = function(e) {
var t;
return e.unlocked ? void 0 :(null != (t = window.analytics) && "function" == typeof t.track && t.track("Click Checklist Link - Dashboard v1", {
checklist_item:e.name
}), setTimeout(function() {
return location.href = e.actionUrl();
}, 300));
};
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.directive("sToggleResponse", function() {
return function(e, t) {
return t.click(function(e) {
var t;
return t = $(e.target).closest("tr"), $(window).width() >= 360 ? t.find("td.content, td.date").animate({
height:"toggle"
}) :t.find("td.email, td.content, td.date").animate({
height:"toggle"
});
});
};
}), e.controller("FormResponsesCtrl", [ "$scope", "$filter", "$routeParams", "$cacheFactory", "$q", "$location", "Page", "FormResponse", "modalDialog", "errorHandler", function(e, t, n, i, r, o, a, s, l, u) {
var d;
return e.PAGE_SIZE = 10, e.id = n.pageId, e.showSpam = !1, window.analytics.track("Landing - Form Responses v1"), 
a.get({
page_id:e.id
}).$promise.then(function(t) {
return e.page = t.data.page, e.exportUrl = "/s/pages/" + e.id + "/collected_emails/export.csv";
}), d = function(t, n) {
return s.index({
page_id:e.id,
page:t,
per_page:e.PAGE_SIZE,
is_spam:n
}).$promise;
}, e.cleanResponses = {
page:1,
data:[],
loading:!1,
pagination:{
totalPages:1
}
}, e.spamResponses = {
page:1,
data:[],
loading:!1,
pagination:{
totalPages:1
}
}, e.reloadClean = function(t) {
return null == t && (t = 0), e.cleanResponses.loading = !0, e.cleanResponses.page += t, 
e.cleanResponses.page = Math.max(1, e.cleanResponses.page), e.cleanResponses.page = Math.min(e.cleanResponses.pagination.totalPages, e.cleanResponses.page), 
d(e.cleanResponses.page, 0).then(function(t) {
var n;
return e.cleanResponses.loading = !1, e.cleanResponses.data = null != (n = t.data.collectedEmails) ? n :[], 
e.cleanResponses.pagination = t.data.paginationMeta;
});
}, e.reloadSpam = function(t) {
return null == t && (t = 0), e.spamResponses.loading = !0, e.spamResponses.page += t, 
e.spamResponses.page = Math.max(1, e.spamResponses.page), e.spamResponses.page = Math.min(e.spamResponses.pagination.totalPages, e.spamResponses.page), 
d(e.spamResponses.page, 1).then(function(t) {
var n;
return e.spamResponses.loading = !1, e.spamResponses.data = null != (n = t.data.collectedEmails) ? n :[], 
e.spamResponses.pagination = t.data.paginationMeta;
});
}, e.clearSpam = function() {
return l.confirm("Are you sure you wish to clear all spam?") ? (e.spamResponses.loading = !0, 
s.clearSpam({
page_id:e.id
}, function() {
return e.reloadSpam(-e.spamResponses.page);
}, u.wrap())) :void 0;
}, e.reloadClean(), e.reloadSpam(), e.markSelected = function(n) {
var r;
return r = n ? t("map")(t("filter")(e.cleanResponses.data, {
selected:!0
}), "id") :t("map")(t("filter")(e.spamResponses.data, {
selected:!0
}), "id"), r.length ? (e.spamResponses.loading = !0, e.cleanResponses.loading = !0, 
s.batchUpdate({
page_id:e.id
}, {
collectedEmailIds:r,
isSpam:n
}, function() {
return e.reloadSpam(), e.reloadClean();
}, u.wrap()), i.get("$http").removeAll()) :void 0;
}, e.deleteSelected = function(n) {
var r;
return r = n ? t("map")(t("filter")(e.spamResponses.data, {
selected:!0
}), "id") :t("map")(t("filter")(e.cleanResponses.data, {
selected:!0
}), "id"), r.length ? l.confirm("Are you sure you wish to delete these entries?") ? (n ? e.spamResponses.loading = !0 :e.cleanResponses.loading = !0, 
s.batchDelete({
page_id:e.id
}, {
collectedEmailIds:r
}, function() {
return n && e.reloadSpam(), n ? void 0 :e.reloadClean();
}, u.wrap()), i.get("$http").removeAll()) :void 0 :void 0;
};
} ]);
}.call(this), function() {
var e;
e = angular.module("invitationApp", [ "strikinglyFilters", "strikinglyDirectives", "strikinglyResources", "strikinglyServices" ]), 
e.controller("InvitationCtrl", [ "$scope", "$q", "$filter", "errorHandler", "Rewards", "Invitations", function(e, t, n, i, r, o) {
var a, s, l, u, d;
return $(".collapsed").hide(), $(".show-message-button").click(function() {
return $(this).hide(), $(".collapsed").slideDown();
}), e.rewards = {
canClaimCount:0
}, s = function() {
return e.loading = !0, r.get().$promise.then(function(t) {
var n, i, r, o;
for (e.rewards = t.data, e.rewardsMeta = {}, o = t.data.claimedRewards.concat(t.data.unclaimedRewards), 
i = 0, r = o.length; r > i; i++) n = o[i], e.rewardsMeta[n.name] = n;
return e.loading = !1, $("#g-reward-point").text(e.rewards.canClaimCount);
});
}, s(), u = function() {
return window.csPageOptions = {
domain_key:$S.conf.CLOUDSPONGE_DOMAIN_KEY,
textarea_id:"emails",
include:[ "email" ],
ignoreMultipleEmails:!0,
cache_contacts:!0,
displaySelectAllNone:!1,
skipSourceMenu:!0,
stylesheet:$S.conf.CLOUDSPONGE_CSS_URL,
afterLaunch:function() {
return analytics.track("Open import email - Invitation v2");
},
beforeImport:function(e) {
return analytics.track("Before import email - Invitation v2", {
import_source:e
});
},
afterSubmitContacts:function(t, n) {
return analytics.track("Import email - Invitation v2", {
import_source:n
}), e.emails = $("#emails").val(), e.$apply();
}
}, $(".import-btn").click(function() {
return cloudsponge.launch($(this).data("src"));
});
}, u(), d = $.url(), analytics.track("Landing - Invitation v2", {
p_source:d.param("source") || d.param("ref")
}), l = function(e) {
return $("html, body").stop().animate({
scrollTop:e.offset().top
}, 1200, "easeInOutQuart"), e.focus(), e.closest(".action-panel").effect("shake", {
distance:3
}, 600);
}, e.claim = function(t, n) {
return analytics.track("Unlock popup - Invitation v2", {
reward_name:t
}), 0 === e.rewards.canClaimCount ? (l($("#emails")), void 0) :$B.customAlert(I18n.t("js.invitations.new.claim_msg"), I18n.t("js.invitations.new.claim_confirm"), I18n.t("js.pages.dashboard.cancel")).done(function() {
return analytics.track("Unlock - Invitation v2", {
reward_name:t
}), e[n] = !0, r.claim(null, {
name:t
}, function() {
return e[n] = !1, s();
}, i.wrap(function(t) {
return e[n] = !1, setTimeout(function() {
return $B.customAlert(t.data.meta.userMessage.plain).always(function() {
return l($("#emails"));
});
}, 300);
}, {
bypassMessage:!0
}));
});
}, e.canClaim = function(t) {
var n;
return null == e.rewardsMeta ? !0 :(n = e.rewardsMeta[t], n.count < n.rewardMeta.maxLimit);
}, e.track = function(e) {
return analytics.track("Share - Invitation v2", {
type:e
});
}, e.emails = "", e.sendInvitation = function() {
return 0 !== e.emails.replace(/^\s*|\s*$/, "").length ? (e.sending = !0, o.invite(null, {
emails:e.emails,
invitation:{
first_name:e.firstName,
last_name:e.lastName,
message:e.message
}
}, function(t) {
return analytics.track("Sent - Invitation v2", {
valid_email_count:t.data.validEmails.length
}), $B.customAlert(I18n.t("js.invitations.new.invitation_sent"), I18n.t("js.invitations.new.confirm")), 
e.sending = !1, e.emails = "";
}, i.wrap(function(t) {
return e.sending = !1, $B.customAlert(t.data.meta.userMessage.plain);
}, {
bypassMessage:!0
}))) :void 0;
}, e.isTrue = function(e) {
return "true" === e;
}, $B.ui.openLinkInWindow($(".share-btn")), $(".share-copy").click(function() {
var t;
return t = $("#share-link")[0], t.setSelectionRange(0, t.value.length), e.$apply(function() {
return e.copied = !0;
});
}), $(window).width() >= 960 ? $(".share-copy").zclip({
path:$S.conf.ZERO_CLIPBOARD_SWF_URL,
copy:function() {
return $("#share-link").val();
}
}) :$(".share-copy.edit-btn").hide(), a = $.url().param("open"), -1 !== $.inArray(a, [ "first-anniversary", "second-anniversary" ]) && ($B.ui.openCloseModal($(".white-modal.anniversary")), 
r.claimGift(null, {
name:a
}, function() {
return e.haveGift = !0, s(), analytics.track("Claimed - Anniversary - Invitation v2", {
name:a
});
}, i.wrap(function() {
return e.haveGift = !1;
}, {
bypassMessage:!0
}))), e.unwrapPresent = function() {
return $B.ui.openCloseModal($(".white-modal.anniversary")), setTimeout(function() {
return $(".point-wrapper .desc").effect("bounce", {
distance:20,
times:5
}, 1600);
}, 300);
};
} ]);
}.call(this), function() {
var e, t, n, i;
t = $B.AngularModule, e = null != (n = $S.conf) ? null != (i = n.rollout) ? i.dashboard_v2 :void 0 :void 0, 
t.directive("pageListing", function() {
return {
replace:!0,
restrict:"A",
templateUrl:e ? "/page-list-v2.html" :"/page-list-v1.html",
scope:!0,
controller:[ "$scope", function(e) {
return e.stateFilter = function(t) {
return "unpublished" === e.targetState ? t.state === e.targetState || "new" === t.state :"published" === e.targetState ? t.state === e.targetState :!0;
}, e.setState = function(t) {
return e.targetState = t;
};
} ],
link:function(e, t, n) {
return e.setState(n.pageState);
}
};
}), t.controller("PageListCtrl", [ "$scope", "$cacheFactory", "$location", "$q", "$filter", "User2", "Pages", "Page", "annieFactory", "errorHandler", function(t, n, i, r, o, a, s, l, u, d) {
var c, p, h, f, m, g, _, y, v, b, w;
return t.loading = !0, t.error = !1, t.sidebar = "welcome", t.prefetchEntireEditor = null != (f = $S.conf) ? null != (m = f.rollout) ? m.prefetch_entire_editor :void 0 :void 0, 
t.unpublishPageActive = null != (g = $S.conf) ? null != (_ = g.rollout) ? _.unpublish_page :void 0 :void 0, 
t.pagesEndPoint = s.get(), t.featuresEndPoint = a.features(), t.summaryEndPoint = a.summary(), 
$B.loadFacebookScript(), c = new $B.TwitterLogin($S.conf), c.load(), null != (y = window.FB) && null != (v = y.XFBML) && "function" == typeof v.parse && v.parse(), 
null != (b = window.twttr) && null != (w = b.widgets) && "function" == typeof w.load && w.load(), 
window.analytics.track("Landing - Dashboard v1", {
rollout_dashboard_var:e ? "var2" :"var1"
}), window.analytics.trackLink($(".s-support-button"), "Click Support Button - Dashboard v1"), 
window.analytics.trackLink($(".s-gallery-button"), "Click Gallery Button - Dashboard v1"), 
window.fbAsyncInit = function() {
return FB.Event.subscribe("edge.create", function() {
return window.analytics.track("Like on Facebook - Dashboard v1");
});
}, t.orderGetter = function(e) {
return moment(e.createdAt).toDate();
}, r.all([ t.pagesEndPoint.$promise, t.featuresEndPoint.$promise, t.summaryEndPoint.$promise ]).then(function() {
var e, n, r, a, s, l, d;
for (t.pages = t.pagesEndPoint.data.pages, t.features = t.featuresEndPoint.data.user.features, 
t.summary = t.summaryEndPoint.data.user, t.loading = !1, t.plan = $S.user_meta.plan, 
n = "true" === $B.meta("a-minimum"), t.hitPubSiteLimit = function() {
var e, i;
return e = t.unpublishPageActive ? function(e) {
return "published" === e.state && !e.isGenerated;
} :function() {
return !0;
}, i = o("filter")(t.pages, e), i.length >= t.summary.entitledPublishedPageCount && !n;
}, t.hitTotalSiteLimit = function() {
var e;
return e = o("filter")(t.pages, function(e) {
return !e.isGenerated;
}), e.length >= t.summary.entitledTotalPageCount && !n;
}, t.prefetchEntireEditor && setTimeout(function() {
var e, n, r;
return e = $(".s-btn.edit:eq(0)"), r = e.attr("href"), null != r ? (n = new $B.Prefetcher(r), 
e.click(function(e) {
return window.analytics.track("Prefetched - Site Hit - Dashboard v1"), n.prepared ? (window.analytics.track("Prefetched - Editor Prepared - Dashboard v1"), 
n.expand(), i.search("edit-page-id", t.pages[0].id), e.preventDefault()) :void 0;
})) :void 0;
}, 2e3), t.hasUsedCustomDomain = !1, d = t.pages, a = function(e, n) {
var i;
return e.customDomain && (t.hasUsedCustomDomain = !0), -1 !== e.logoUrl.indexOf("default.png") && (e.logoUrl = "/assets/editor2/default-dashboard-icon.png"), 
i = e.screenshotUrls, e.screenshot = i[330196], $S.conf.rollout.analytics_maintenance ? e.showStatButton = !0 :n >= 10 ? e.showStatButton = !0 :(e.analytics = u.setupModules({
totalVisits:function(t) {
var n;
return e.totalVisits = "keenio" === $S.user_meta.analytics_vendor ? t || 0 :(null != (n = t[0]) ? n[3] :void 0) || 0;
}
}), u.loadAnalytics(e.id, "week", e.analytics));
}, e = s = 0, l = d.length; l > s; e = ++s) r = d[e], a(r, e);
return $B.log("[DASHBOARD] Ready"), setTimeout(function() {
return t.statsPreviewTracked ? void 0 :(window.analytics.trackLink($(".stats-button"), "Click Stats Preview - Dashboard v1"), 
t.statsPreviewTracked = !0);
}, 1);
}, d.wrap()), t.hasUnpublishedPage = function() {
var e, n, i, r;
if (null == t.pages) return !1;
for (r = t.pages, n = 0, i = r.length; i > n; n++) if (e = r[n], "published" !== e.state) return !0;
return !1;
}, t.clone = function(e) {
var r;
return r = t.hitPubSiteLimit() ? I18n.t("js.pages.dashboard.clone_pub_msg") :I18n.t("js.pages.dashboard.clone_msg"), 
p(r, I18n.t("js.pages.dashboard.confirm"), I18n.t("js.pages.dashboard.cancel")).done(function() {
return l.clone({
page_id:e
}, function() {
return n.get("$http").removeAll(), i.path("/ok");
}, d.wrap());
});
}, t.$on("$routeChangeStart", function() {
return $(".tooltip").hide();
}), t.showPromo = function(e) {
var n, i, r, o, a;
if ("april1" === e) {
if ("4" === moment().format("M") && ("1" === moment().format("D") || "2" === moment().format("D"))) return !0;
} else if ("subdomain" === e) {
for (i = !1, a = null != t.pages, r = 0, o = a.length; o > r; r++) if (n = a[r], 
!n.customDomain) {
i = !0;
break;
}
if (i && moment().unix() < moment("4/25/2014").unix()) return !0;
} else if ("downtime" === e && moment().unix() < moment("2014-08-10 3:30 -0400").unix()) return !0;
return !1;
}, t.toggleMoreActions = function(e) {
var n, i, r, o, a;
for (n = !e.moreActions, a = t.pages, r = 0, o = a.length; o > r; r++) i = a[r], 
i.moreActions = !1;
return e.moreActions = n;
}, h = function(e) {
return $B.customAlert(I18n.t("js.pages.dashboard.pub_quota", {
count:t.summary.entitledPublishedPageCount
}), e);
}, t.showPubLimitAlert = function() {
return $B.ui.openCloseModal($(".white-modal.pub-limit")), $(".white-modal.pub-limit a.close-modal").click(function() {
return $B.ui.closeModal($(".white-modal"));
});
}, t.pubLimitConfirmButton = function() {
var e;
return null != (e = window.analytics) && "function" == typeof e.track && e.track("Create Extra Site - Dashboard v1", {
page_count:t.pages.length
}), setTimeout(function() {
return location.href = "/s/select_template";
}, 300);
}, p = function(e, t, n) {
return $B.customAlert(e, t, n);
}, t.unpublish = function(e) {
var t;
return null != (t = window.analytics) && "function" == typeof t.track && t.track("Click Unpublish - Dashboard v1"), 
p(I18n.t("js.pages.dashboard.unpub_msg"), I18n.t("js.pages.dashboard.unpub_confirm"), I18n.t("js.pages.dashboard.cancel")).done(function() {
var t;
return e.loading = !0, t = function(t) {
return e.loading = !1, e.state = t.data.page.state, e.moreActions = !1;
}, l.unpublish({
page_id:e.id
}, t, d.wrap());
});
}, t.publish = function(e) {
var t;
return null != (t = window.analytics) && "function" == typeof t.track && t.track("Click Publish - Dashboard v1"), 
p(I18n.t("js.pages.dashboard.pub_msg"), I18n.t("js.pages.dashboard.pub_confirm"), I18n.t("js.pages.dashboard.cancel")).done(function() {
var t;
return e.loading = !0, t = function(t) {
var n;
return e.loading = !1, n = t.data.page.state, e.moreActions = !1, "published" !== n ? setTimeout(function() {
return h();
}, 300) :e.state = n;
}, l.publish({
page_id:e.id
}, t, d.wrap());
});
}, setTimeout(function() {
return $(".sticky").sticky({
topSpacing:30
});
}, 1e3);
} ]);
}.call(this), function() {
var e;
e = $B.AngularModule, e.controller("ThemeCtrl", [ "$scope", "Theme", function(e, t) {
return e.categories = [], e.themes = t.get(), e.themes.$promise.then(function() {
var t;
return t = function(e, t) {
var n, i, r, o;
for (o = [], i = 0, r = e.length; r > i; i++) n = e[i], -1 !== t.indexOf(n.name) && o.push(n);
return o;
}, e.categories = [ {
name:"all",
themes:e.themes
}, {
name:"business",
themes:t(e.themes, [ "fresh", "app", "onyx", "bright", "pitch_new" ])
}, {
name:"personal",
themes:t(e.themes, [ "persona", "profile", "fresh_personal" ])
}, {
name:"portfolio",
themes:t(e.themes, [ "perspective", "ion", "ivory" ])
} ];
}), e.selectedCategory = "all", e.selectCategory = function(t) {
return e.selectedCategory = t;
}, e.selectedClass = function(t) {
return e.selectedCategory === t ? {
blue:!0,
white:!1
} :{
blue:!1,
white:!0
};
};
} ]), e.directive("sSelectTemplateButton", function() {
return function(e, t, n) {
var i, r, o, a, s;
return i = n.sSelectTemplateButton, a = n.sButtonText, s = $B.meta("csrf-token"), 
r = $B.meta("csrf-param"), o = '<form action="/s/pages?data_page=' + i + '" class="button_to" method="post">      <input class="block s-btn big" type="submit" value="Start Editing!">      <input name="' + r + '" type="hidden" value="' + s + '">    </form>', 
t.html(o);
};
}), e.directive("sTemplateCategoryButton", function() {
return function(e, t, n) {
var i;
return i = n.sTemplateCategoryButton, t.bind("click", function() {
var t, n;
return e.selectCategory(i), e.$apply(), n = $(".template-gallery-viewport").width(), 
t = $(".template-gallery-container").index($(".template-gallery-container." + i)), 
$(".template-gallery-containers").stop().animate({
"margin-left":-n * t
}, 500, "easeInOutQuint");
});
};
});
}.call(this), function() {
$(function() {
var e, t, n, i, r, o, a, s;
return $(document).on("click", ".open-support-popup", function(e) {
return UserVoice ? (e.preventDefault(), UserVoice.push([ "show", {
mode:"contact"
} ]), null != window.edit_page ? $B.AE.track("Click Uservoice Button - Editor v1") :$B.AE.track("Click Uservoice Button - Dashboard v1")) :void 0;
}), n = function(e, t, n) {
var i, r;
return i = $(e), r = $(t), i.mouseenter(function() {
return $("[class*=-dropdown-menu]").removeClass("show"), n = !0, r.addClass("show"), 
i.addClass("hover");
}), r.mouseenter(function() {
return n = !0;
}), i.mouseleave(function() {
return n = !1;
}), r.mouseleave(function() {
return n = !1;
}), $("" + e + ", " + t).mouseleave(function() {
return setTimeout(function() {
return n ? void 0 :(r.removeClass("show"), i.removeClass("hover"));
}, 550);
});
}, o = e = !1, n(".user-dropdown-button", ".user-dropdown-menu", o), $(".locale-dropdown-button").click(function() {
return $(".locale-dropdown-menu").toggleClass("show");
}), $(document).click(function(e) {
return $(e.target).closest(".locale-dropdown-button").length ? void 0 :($(".locale-dropdown-menu").is(".show") && $(".locale-dropdown-menu").removeClass("show"), 
$(".s-dash-nav").hasClass("expanded") && !$(".s-dash-nav").is(":animated") ? r() :void 0);
}), $("a.locale-button").each(function() {
return window.analytics.trackLink(this, "Change Locale - Dashboard v1", {
target_locale:$(this).data("locale")
});
}), $(".highlight-top.beta").click(function(e) {
return e.preventDefault(), $B.ui.openCloseModal($(".locale-changed"));
}), t = $.url().param("open"), null != t && -1 !== t.split(":").indexOf("locale_changed") && "en" !== I18n.locale && $B.ui.openCloseModal($(".locale-changed")), 
$(".locale-dropdown-menu").length && $(".user-dropdown-menu").addClass("prev"), 
i = function() {
var e, t;
if (!$.cookie("__strk_domain_migration_notice")) return $.cookie("__strk_domain_migration_notice", "1", {
expires:moment().add("hours", 4).toDate(),
path:"/"
}), e = $(".domain-migration"), t = $(".domain-migration-tutorial"), 1 === $S.migration.pending_count ? (t.attr("href", $S.migration.pending_page_tutorial), 
e.find("#affected-domain-name").text($S.migration.pending_page_url), e.find(".if-single").show(), 
e.find(".if-multiple").hide()) :$S.migration.pending_count > 1 && (e.find(".if-single").hide(), 
e.find(".if-multiple").show()), $B.ui.openCloseModal(e), window.analytics.trackLink(t, "Click Tutorial Link - Domain Migration Notice v1", {
url:t.attr("href")
});
}, null != ("undefined" != typeof $S && null !== $S ? null != (a = $S.user_meta) ? a.id :void 0 :void 0) && ("undefined" != typeof $S && null !== $S ? null != (s = $S.migration) ? s.pending_count :void 0 :void 0) >= 1 && setTimeout(function() {
return i();
}), $(".s-dash-nav [rel=tooltip]").tooltip({
placement:"bottom"
}), moment.lang(I18n.locale), r = function() {
return $(".s-dash-nav").hasClass("expanded") ? $(".s-dash-nav").animate({
height:55
}, function() {
return $(".s-dash-nav").removeClass("expanded");
}) :($(".s-dash-nav").animate({
height:55 + $(".nav-menu").height() + 70
}), $(".s-dash-nav").addClass("expanded"));
}, $(".s-mobile-dropdown-button, .s-logo-link .transparent-link").click(function(e) {
return $(window).width() < 960 ? (e.preventDefault(), r()) :void 0;
});
});
}.call(this), function() {
var e, t = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
e = [], e.starter_monthly = 12, e.starter_yearly = 96, e.pro_monthly = 20, e.pro_yearly = 192, 
$B.Payment = function() {
function n() {
this.init = t(this.init, this);
}
return n.prototype.init = function() {
return this.setupNewSubscription(), this.setupInputValidators();
}, n.prototype.setupNewSubscription = function() {
var t, n, i, r, o, a, s, l, u, d, c, p, h, f, m, g;
return p = $("#starter"), u = $("#pro"), l = $("#monthly"), g = $("#yearly"), s = function() {
var t, n;
return n = a(), t = r(), e[n + "_" + t];
}, a = function() {
return p.hasClass("selected") ? "starter" :u.hasClass("selected") ? "pro" :"error";
}, r = function() {
return l.hasClass("selected") ? "monthly" :g.hasClass("selected") ? "yearly" :"error";
}, o = function() {
return l.hasClass("selected") ? I18n.t("js.subscriptions.new.periods.month") :g.hasClass("selected") ? I18n.t("js.subscriptions.new.periods.year") :"error";
}, c = function(e) {
var t, n, i, a, l, u, d, c, p;
return null == e && (e = 0), p = $B.meta("weeks-free"), i = $B.meta("days-free"), 
t = $B.meta("billing-start-date"), "false" === $B.meta("has-subscription") ? ("false" === $B.meta("has-free-period") && (c = new Date(), 
p = 2, i = 14, a = new Date(new Date().getTime() + 7 * p * 24 * 60 * 60 * 1e3), 
t = a.format("mmmm d")), l = "free_period_notice") :l = "no_free_period_notice", 
0 !== e && (l = "coupon_applied_" + l), n = {
free_period_days:i,
billing_start_date:t,
price:s(),
period:o(),
discounted_price:e
}, d = r(), $("#change-period").val(d), u = I18n.t("js.subscriptions.new.billing." + l, n), 
$("#billing-notice").html("<p>" + u + "</p>");
}, c(), t = function(e) {
var t, n, i;
return i = s(), n = (i * (100 - e) / 100).toFixed(2), t = $(".period-notice").text(), 
c(n), $("#coupon-notice-box").slideDown(), $("#coupon-notice").text(I18n.t("js.subscriptions.new.coupon.applied_notice")), 
$(".coupon-code").attr("disabled", "disabled").data("coupon-applied", "true").data("coupon-percentage", e), 
$(".coupon-code-hidden").val($(".coupon-code").val()), $(".apply-coupon").hide();
}, $(".coupon-code").blur(function() {
return $(".coupon-code-hidden").val($(".coupon-code").val());
}), $(".coupon-code").keypress(function(e) {
return $(".coupon-code-hidden").val($(".coupon-code").val()), 13 === e.keyCode ? (e.preventDefault(), 
$(".apply-coupon").click()) :void 0;
}), $(".apply-coupon").click(function() {
var e, n, i, r, o, a;
return a = $(this), r = $(this).parent().find(".error"), o = $(this).parent().find(".success"), 
n = $(".coupon-code").val(), i = {
coupon:n
}, "" !== n ? (e = a.text(), a.text(I18n.t("js.subscriptions.new.coupon.wait")), 
$.ajax({
url:"check_coupon.jsm",
data:i,
type:"GET",
dataType:"json"
}).success(function(n) {
var i;
return a.text(e), "ok" === n.status && n.message && n.message["percentage-off"] ? (i = n.message["percentage-off"], 
t(i), r.html(""), o.text(I18n.t("js.subscriptions.new.coupon.applied", {
percent:i
}))) :(r.html(I18n.t("js.subscriptions.new.coupon.invalid")), o.text(""));
}).error(function(t) {
var n;
return n = jQuery.parseJSON(t.responseText), a.text(e), r.html(I18n.t(n.html)), 
o.text("");
})) :void 0;
}), d = function() {
var e, t, n;
return t = a(), e = r(), n = t + "_" + e, $("#selected-price-display").html("(" + I18n.t("js.subscriptions.new.prices." + n) + ")"), 
$("#subscription_plan").val(n);
}, d(), $("#change-period").change(function() {
return $(".period-selection").removeClass("selected"), "monthly" === $(this).val() ? (l.addClass("selected"), 
$(".selected-period").text("MONTHLY")) :"yearly" === $(this).val() && (g.addClass("selected"), 
$(".selected-period").text("YEARLY")), d(), c(), "true" === $(".coupon-code").data("coupon-applied") ? t($(".coupon-code").data("coupon-percentage")) :void 0;
}), m = I18n.t("js.subscriptions.new.why_billing_info"), $(".why-billing").attr("title", m).tooltip({
animate:!1,
placement:"top",
html:!0
}), $("#days-later").length ? (h = new Date(), f = parseInt($B.meta("weeks-free"), 10), 
f || (f = 2), i = new Date(h.getTime() + 7 * f * 24 * 60 * 60 * 1e3), n = i.format("mmmm d"), 
$("#days-later").html(n)) :void 0;
}, n.prototype.setupEditSubscription = function() {
var e, t, n, i, r, o, a;
return o = $("#starter"), i = $("#pro"), n = $("#monthly"), a = $("#yearly"), t = function() {
return o.hasClass("selected") ? "starter" :i.hasClass("selected") ? "pro" :"error";
}, e = function() {
return n.hasClass("selected") ? "monthly" :a.hasClass("selected") ? "yearly" :"error";
}, r = function() {
var n, i, r;
return i = t(), n = e(), r = i + "_" + n, $("#selected-price-display").html(I18n.t("js.subscriptions.new.prices." + r)), 
$("#subscription_plan").val(r), $("#switch-to-plan-name").text($("#subscription_plan :selected").text()), 
r === $B.meta("current-plan") ? $("#submit-button").hide() :$("#submit-button").show();
}, r(), $("#submit-button").click(function(e) {
return e.preventDefault(), confirm(I18n.t("js.subscriptions.edit.confirm.general")) ? $(this).closest("form").submit() :void 0;
}), analytics.track("Pricing - Change Plan", {
current_plan:$("meta[name=current-plan]").attr("content")
});
}, n.prototype.setupInputValidators = function() {
var e, t, n;
return Stripe.setPublishableKey($B.meta("stripe-key")), e = function() {
return $(".card-number").attr("name", "card-number"), $(".card-cvc").attr("name", "card-cvc"), 
$(".card-expiry-year").attr("name", "card-expiry-year"), $(".card-address-zip").attr("name", "address-zip");
}, t = function() {
return $(".card-number").removeAttr("name"), $(".card-cvc").removeAttr("name"), 
$(".card-expiry-year").removeAttr("name"), $(".card-address-zip").removeAttr("name");
}, n = function(n) {
return t(), $(n["submit-button"]).attr("disabled", "disabled"), $(".edit-btn").addClass("nohover disabled").removeClass(""), 
Stripe.createToken({
number:$(".card-number").val(),
cvc:$(".card-cvc").val(),
exp_month:$(".card-expiry-month").val(),
exp_year:$(".card-expiry-year").val(),
address_zip:$(".card-address-zip").val()
}, function(t, i) {
var r, o;
return i.error ? ($(n["submit-button"]).removeAttr("disabled"), $(".edit-btn").removeClass("disabled nohover"), 
$(".edit-btn.selected").addClass("nohover"), $(".payment-errors").html(i.error.message), 
e()) :(o = i.id, r = $("<input name='stripeToken' value='" + o + "' style='display:none;' />"), 
n.appendChild(r[0]), n.submit());
}), !1;
}, jQuery.validator.addMethod("cardNumber", Stripe.validateCardNumber, I18n.t("js.subscriptions.new.errors.card_number")), 
jQuery.validator.addMethod("cardCVC", Stripe.validateCVC, I18n.t("js.subscriptions.new.errors.cvc")), 
jQuery.validator.addMethod("cardExpiry", function() {
return Stripe.validateExpiry($(".card-expiry-month").val(), $(".card-expiry-year").val());
}, I18n.t("js.subscriptions.new.errors.card_expiry")), $("#new_subscription, #edit_billing_info").validate({
submitHandler:n,
rules:{
"card-cvc":{
cardCVC:!0,
required:!0
},
"card-number":{
cardNumber:!0,
required:!0
},
"card-expiry-year":"cardExpiry"
}
}), e();
}, n;
}();
}.call(this), function() {
$B.Pricing = function() {
function e() {}
return e.prototype.init = function() {
return this.setupDom(), this.logEvent();
}, e.prototype.setupPlans = function(e) {
return $(".upgrade-button").addClass("hidden"), $(".upgrade-button." + e).removeClass("hidden"), 
"monthly" === e ? ($("#pro-price").text("20"), $("#starter-price").text("12"), $(".period-display").text(I18n.t("js.api.subscriptions.plan.billed_monthly")), 
$(".yearly-only").slideUp()) :($("#pro-price").text("16"), $("#starter-price").text("8"), 
$(".period-display").text(I18n.t("js.api.subscriptions.plan.billed_yearly")), $(".yearly-only").slideDown());
}, e.prototype.setupDom = function() {
var e, t;
return $('[rel="tooltip"]').tooltip({
animate:!1,
placement:"auto right",
offset:-10
}), e = "yearly", this.setupPlans(e), "domain" === this.pUrl().param("tip") && $(".white-modal.domain-tip").length && ($B.ui.openCloseModal($(".white-modal.domain-tip")), 
$("a.close-modal").click(function() {
return $B.ui.openCloseModal($(".white-modal.domain-tip"));
})), t = this, $(".time-selector .option").click(function() {
return $(".time-selector .option").removeClass("selected"), $(this).addClass("selected"), 
e = $(this).attr("data-period"), t.setupPlans(e), $(".tooltip").hide();
}), $(window).width() < 960 ? ($(".pricing-col h1").each(function() {
return $(this).data("height", $(this).closest(".pricing.box").height());
}), $(".pricing-col h1").click(function() {
return $(this).hasClass("collapsed") ? ($(this).removeClass("collapsed"), $(this).closest(".pricing.box").css({
height:$(this).data("height")
})) :($(this).addClass("collapsed"), $(this).closest(".pricing.box").css({
height:$(this).height() + parseInt($(this).css("margin-bottom"))
}));
}), $(".pricing-col h1").click(), $(".pricing-col.first").insertAfter(".pricing-col.last")) :void 0;
}, e.prototype.pUrl = function() {
return this._pUrl || (this._pUrl = $.url(window.location.href));
}, e.prototype.logEvent = function() {
var e, t, n, i, r, o;
return o = $("meta[name=current-user-present]").attr("content"), t = jQuery.parseJSON($("meta[name=params-data]").attr("content")), 
console.log(t), r = t.status, n = t.plan, i = t.source || t.ref, e = t.old_plan, 
"true" === o ? "CancelTrial" === r || "CancelSubscription" === r ? analytics.track("Pricing - Cancel Subscription", {
plan:n,
type:r,
isTrial:"CancelTrial" === r
}) :"Upgraded" === r ? analytics.track("Pricing - Upgrade Subscription", {
plan:n,
old_plan:e
}) :"Extended" === r ? analytics.track("Pricing - Extended Subscription") :"np" === i ? analytics.track("viewPricing", {
p_source:"NewPage"
}) :"cd" === i ? analytics.track("viewPricing", {
p_source:"CustomDomain"
}) :"rl" === i ? analytics.track("viewPricing", {
p_source:"RemoveLogo"
}) :"an" === i ? analytics.track("viewPricing", {
p_source:"Analytics"
}) :"pt" === i ? analytics.track("viewPricing", {
p_source:"PremiumThemes"
}) :"ps" === i ? analytics.track("viewPricing", {
p_source:"PremiumSlides"
}) :"apps" === i ? analytics.track("viewPricing", {
p_source:"PremiumApps"
}) :"pp" === i ? analytics.track("viewPricing", {
p_source:"PasswordProtection"
}) :"publish_domain" === i ? analytics.track("viewPricing", {
p_source:"PublishDomain"
}) :"style_panel" === i ? analytics.track("viewPricing", {
p_source:"StylePanel"
}) :"icon_lib" === i ? analytics.track("viewPricing", {
p_source:"IconLib"
}) :"prepub_domain" === i ? analytics.track("viewPricing", {
p_source:"PrepubDomain"
}) :"unpub" === i ? analytics.track("viewPricing", {
p_source:"PublishLimit"
}) :"domain" === this.pUrl().param("tip") ? analytics.track("viewPricing", {
p_source:"DomainRecommendation"
}) :null === i ? analytics.track("viewPricing", {
p_source:"None"
}) :analytics.track("viewPricing", {
p_source:i
}) :"domain" === this.pUrl().param("tip") ? analytics.track("viewPricing", {
p_source:"DomainRecommendation"
}) :null === i ? analytics.track("viewPricing", {
p_source:"None"
}) :analytics.track("viewPricing", {
p_source:i
});
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.SignIn = function() {
function t() {
this.init = e(this.init, this);
}
return t.prototype.init = function() {
var e;
return analytics.track("SignInHitPage"), $(".field").each(function() {
var e, t, n, i, r, o, a;
for (n = $(this).find(".label"), t = $(this).find(".input input"), t.focus(function() {
return n.hide();
}), t.blur(function() {
return "" === t.val() ? n.show() :void 0;
}), t.on("change", function() {
return t.val() ? n.hide() :n.show();
}), o = [ 100, 200, 300, 400, 500, 1e3 ], a = [], i = 0, r = o.length; r > i; i++) e = o[i], 
a.push(setTimeout(function() {
return t.change();
}, e));
return a;
}), e = function(e, t) {
return e.stop().animate({
"margin-top":10,
opacity:0
}, function() {
return $(this).hide(), t.show().css({
"margin-top":10,
opacity:0
}), t.animate({
"margin-top":0,
opacity:1
});
});
}, $(".view-sign-up-button").click(function() {
return e($(".sign-in-form"), $(".sign-up-form"));
}), $(".login-button").click(function() {
return e($(".sign-up-form"), $(".sign-in-form"));
}), $(".ref_url_field").val(document.referrer), $("input[name=authenticity_token]").val($("meta[name=csrf-token]").attr("content")), 
$(".lazy").lazyload({
effect:"fadeIn",
effect_speed:500,
threshold:$(window).height()
}), this.initFacebook();
}, t.prototype.initFacebook = function() {
var e, t, n, i = this;
return n = new $B.FacebookLogin($S.conf), n.loadFacebook({
connected:function() {
var e;
return e = $.get($S.auth.facebook_callback_path), e.success(function() {
return window.location = "/s/";
}), e.error(function() {
return alert("There was an error getting data from Facebook!");
});
},
notAuthorized:function() {
return i.fbLoginPopup();
},
others:function() {
return i.fbLoginPopup();
}
}), ("undefined" == typeof t || null === t) && (t = ".facebook-login"), e = $(t), 
e.click(function() {
return "undefined" == typeof FB || null === FB ? (alert("We have trouble loading Facebook Connect. Check your connection and try again."), 
void 0) :n.fbLoginPopup({
success:function() {
return console.log("success");
},
fail:function() {
return alert("To login with Facebook, please authorize access to your account.");
}
});
});
}, t;
}();
}.call(this), function() {
$B.Upgraded = function() {
function e() {}
return e.prototype.init = function() {
var e;
return this.logEvent(), $B.loadFacebookScript(), e = new $B.TwitterLogin($S.conf), 
e.load();
}, e.prototype.logEvent = function() {
var e, t, n, i;
return i = $.url(), n = i.param("status"), e = i.param("plan"), t = i.param("z"), 
"Paid" === n && analytics.track("Pricing - Subscription", {
plan:e,
label:e,
revenue:t
}), analytics.trackLink($(".return-to-editor"), "Click Return to Editor - Upgraded v1"), 
analytics.trackLink($(".return-to-dashboard"), "Click Return to Dashboard - Upgraded v1");
}, e;
}();
}.call(this), function() {
$(function() {
return $S.user_meta ? Bobcat.AE = new Bobcat.UserAnalyticsEngine($S.user_meta.id, $S.user_meta.email) :void 0;
});
}.call(this);