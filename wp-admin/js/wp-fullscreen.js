var PubSub,fullscreen,wptitlehint;PubSub=function(){this.topics={}};PubSub.prototype.subscribe=function(a,b){if(!this.topics[a]){this.topics[a]=[]}this.topics[a].push(b);return b};PubSub.prototype.unsubscribe=function(b,e){var c,a,d=this.topics[b];if(!d){return e||[]}if(e){for(c=0,a=d.length;c<a;c++){if(e==d[c]){d.splice(c,1)}}return e}else{this.topics[b]=[];return d}};PubSub.prototype.publish=function(c,b){var d,a,e=this.topics[c];if(!e){return}b=b||[];for(d=0,a=e.length;d<a;d++){e[d].apply(null,b)}};(function(b){var a,d,c;fullscreen=a={};d=a.pubsub=new PubSub();a.timer=0;a.block=false;c=function(h,g,f){f=f||1250;if(a.block){return}a.block=true;setTimeout(function(){a.block=false},500);if(a.timer){clearTimeout(a.timer)}else{d.publish(h)}function e(){d.publish(g);a.timer=0}a.timer=setTimeout(e,f)};a.on=function(){if(!a.ui.element){a.ui.init()}if(!a.visible){a.ui.fade("show","showing","shown")}};a.off=function(){if(a.ui.element&&a.visible){a.ui.fade("hide","hiding","hidden")}};a.save=function(){b("#title").val(b("#wp-fullscreen-title").val());tinyMCE.execCommand("wpFullScreenSaveContent");b("#hiddenaction").val("wp-fullscreen-save-post");b.post(ajaxurl,b("form#post").serialize(),function(e){if(e.message){b("#wp-fullscreen-saved").html(e.message)}if(e.last_edited){b("#wp-fullscreen-last-edit").html(e.last_edited)}},"json")};set_title_hint=function(e){if(!e.val().length){e.siblings("label").css("visibility","")}else{e.siblings("label").css("visibility","hidden")}};d.subscribe("showToolbar",function(){a.fade.In(a.ui.topbar,600);b("#wp-fullscreen-body").addClass("wp-fullscreen-focus")});d.subscribe("hideToolbar",function(){a.fade.Out(a.ui.topbar,600);b("#wp-fullscreen-body").removeClass("wp-fullscreen-focus")});d.subscribe("show",function(){var e=b("#wp-fullscreen-title").val(b("#title").val());this.set_title_hint(e);b(document).bind("mousemove.fullscreen",function(f){c("showToolbar","hideToolbar",3000)})});d.subscribe("hide",function(){var e=b("#title").val(b("#wp-fullscreen-title").val());this.set_title_hint(e);tinyMCE.execCommand("wpFullScreenSave");b(document).unbind(".fullscreen")});d.subscribe("showing",function(){b("#wp-fullscreen-body").show();b(document.body).addClass("fullscreen-active");c("showToolbar","hideToolbar",3000);b("#wp-fullscreen-last-edit").html(b("#last-edit").html())});d.subscribe("hiding",function(){b("#wp-fullscreen-body").hide();b(document.body).removeClass("fullscreen-active");b("#last-edit").html(b("#wp-fullscreen-last-edit").html())});d.subscribe("shown",function(){a.visible=true});d.subscribe("hidden",function(){a.visible=false;b("#wp_mce_fullscreen").removeAttr("style");tinyMCE.execCommand("wpFullScreenClose")});a.b=function(){tinyMCE.execCommand("Bold")};a.i=function(){tinyMCE.execCommand("Italic")};a.ul=function(){tinyMCE.execCommand("InsertUnorderedList")};a.ol=function(){tinyMCE.execCommand("InsertOrderedList")};a.link=function(){tinyMCE.execCommand("WP_Link")};a.unlink=function(){tinyMCE.execCommand("unlink")};a.ui={init:function(){a.ui.element=b("#fullscreen-fader");a.ui.topbar=b("#fullscreen-topbar");if(wptitlehint){wptitlehint("wp-fullscreen-title")}},fade:function(f,e,g){if(f){d.publish(f)}a.fade.In(a.ui.element,600,function(){if(e){d.publish(e)}a.fade.Out(a.ui.element,600,function(){if(g){d.publish(g)}})})}};a.fade={transitionend:"transitionend webkitTransitionEnd oTransitionEnd",sensitivity:100,In:function(e,f,g){g=g||b.noop;f=f||400;if(a.fade.transitions){if(e.is(":visible")){e.addClass("fade-trigger");return e}e.show();e.one(this.transitionend,function(){g()});setTimeout(function(){e.addClass("fade-trigger")},this.sensitivity)}else{e.css("opacity",1).fadeIn(f,g)}return e},Out:function(e,f,g){g=g||b.noop;f=f||400;if(!e.is(":visible")){return e}if(a.fade.transitions){e.one(a.fade.transitionend,function(){if(e.hasClass("fade-trigger")){return}e.hide();g()});setTimeout(function(){e.removeClass("fade-trigger")},this.sensitivity)}else{e.fadeOut(f,g)}return e},transitions:(function(){var e=document.documentElement.style;return(typeof(e.WebkitTransition)=="string"||typeof(e.MozTransition)=="string"||typeof(e.OTransition)=="string"||typeof(e.transition)=="string")})()}})(jQuery);