(function() {
window.optimizely = window.optimizely || [], $(function() {
var e;
return $(".submit").click(function() {
return window.optimizely.push([ "trackEvent", "click_sign_up_button" ]), $(this).addClass("disabled");
}), $(".facebook-login").click(function() {
return window.optimizely.push([ "trackEvent", "click_facebook_button" ]);
}), $(".linkedin-login").click(function() {
return window.optimizely.push([ "trackEvent", "click_linkedin_button" ]);
}), $(".new-user-form").bind("ajax:success", function(e, t) {
return "redirect" === t.status ? (window.optimizely.push([ "trackEvent", "registration_successful" ]), 
window.location = t.to) :void 0;
}).bind("ajax:error", function(e, t) {
var n, i;
return 500 === t.status ? n = "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions." :(i = jQuery.parseJSON(t.responseText), 
console.log(i), i.message && i.message.i18n ? (n = I18n.t(i.html, i.message.i18n), 
analytics.track("Registration - failed - Landing", {
error:n
})) :n = I18n.t(i.html)), $(".error.error-msg").html(n).slideDown(), $(".submit").removeClass("disabled");
}).submit(function() {
return window.optimizely.push([ "trackEvent", "submit_sign_up_form" ]);
}), $('.new-user-form input[type="text"], .new-user-form input[type="password"]').each(function() {
var e, t, n;
return n = $(this), t = n.parent().find("label.overlay"), e = function() {
return "" !== n.val() ? t.hide() :void 0;
}, t.click(function() {
return n.focus();
}), n.bind("focus", function() {
return e();
}), n.keyup(function() {
return e();
}), n.blur(function() {
return "" === n.val() ? t.show() :void 0;
}), setTimeout(function() {
return e();
}, 100);
}), e = function() {
try {
return $(":-webkit-autofill").each(function() {
return $(this).closest(".field").find("label, .label").hide();
});
} catch (e) {}
}, e(), setTimeout(function() {
return e();
}, 2e3), $(".signup-arrow").each(function() {
var e, t, n, i, r;
return r = $(this), e = !0, n = function() {
return r.animate({
left:"-55"
}, 600, "easeInSine", i);
}, i = function() {
var t;
return t = e ? n :null, r.animate({
left:"-45"
}, 600, "easeOutSine", t);
}, n(), t = r.parent().find("input"), t.focus(function() {
return e = !1, r.stop().fadeOut();
}), t.blur(function() {
return "" !== t.val() ? r.stop().fadeOut() :(r.stop().fadeIn(), n(), e = !0);
}), r.click(function() {
return $("#user_profile_attributes_first_name", r.parent()).focus();
});
}), $(".signup-with-email-button").click(function() {
return $(".row.both-signup").slideUp(), $(".row.email-signup").slideDown(), $(".facebook-login-container").slideDown(), 
$(".linkedin-login-container").slideDown();
});
});
}).call(this);