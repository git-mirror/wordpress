var ajaxWidgets,ajaxPopulateWidgets,quickPressLoad;jQuery(document).ready(function(c){var d=c("#welcome-panel"),a=c("#wp_welcome_panel-hide"),b=function(e){c.post(ajaxurl,{action:"update-welcome-panel",visible:e,welcomepanelnonce:c("#welcomepanelnonce").val()})};if(d.hasClass("hidden")&&a.prop("checked")){d.removeClass("hidden")}c(".welcome-panel-close",d).click(function(){d.addClass("hidden");b(0);c("#wp_welcome_panel-hide").prop("checked",false)});a.click(function(){d.toggleClass("hidden",!this.checked);b(this.checked?1:0)});ajaxWidgets=["dashboard_incoming_links","dashboard_primary","dashboard_secondary","dashboard_plugins"];ajaxPopulateWidgets=function(f){function e(g,k){var j,h=c("#"+k+" div.inside:visible").find(".widget-loading");if(h.length){j=h.parent();setTimeout(function(){j.load(ajaxurl.replace("/admin-ajax.php","")+"/index-extra.php?jax="+k,"",function(){j.hide().slideDown("normal",function(){c(this).css("display","")})})},g*500)}}if(f){f=f.toString();if(c.inArray(f,ajaxWidgets)!=-1){e(0,f)}}else{c.each(ajaxWidgets,e)}};ajaxPopulateWidgets();postboxes.add_postbox_toggles(pagenow,{pbshow:ajaxPopulateWidgets});quickPressLoad=function(){var e=c("#quickpost-action"),f;f=c("#quick-press").submit(function(){c("#dashboard_quick_press #publishing-action img.waiting").css("visibility","visible");c('#quick-press .submit input[type="submit"], #quick-press .submit input[type="reset"]').prop("disabled",true);if("post"==e.val()){e.val("post-quickpress-publish")}c("#dashboard_quick_press div.inside").load(f.attr("action"),f.serializeArray(),function(){c("#dashboard_quick_press #publishing-action img.waiting").css("visibility","hidden");c('#quick-press .submit input[type="submit"], #quick-press .submit input[type="reset"]').prop("disabled",false);c("#dashboard_quick_press ul").next("p").remove();c("#dashboard_quick_press ul").find("li").each(function(){c("#dashboard_recent_drafts ul").prepend(this)}).end().remove();quickPressLoad()});return false});c("#publish").click(function(){e.val("post-quickpress-publish")})};quickPressLoad()});