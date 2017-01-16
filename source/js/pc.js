define([], function () {

	var hashString = function(str) {
		var hash = 0,
			len = str.length,
			i, chr;
		for(i = 0; i < len; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return Math.abs(hash);
	}

    var resetTags = function () {
        var tags = $(".tagcloud a");
        tags.css({"font-size": "12px"});
        for (var i = 0, len = tags.length; i < len; i++) {
            var num = hashString(tags.eq(i).html()) % 7 + 1;
            tags[i].className = "";
            tags.eq(i).addClass("color" + num);
        }
    }

    var bind = function () {
        var switchBtn = $("#myonoffswitch");
        var tagcloud = $(".second-part");
        var navDiv = $(".first-part");
        switchBtn.click(function () {
            if (switchBtn.hasClass("clicked")) {
                switchBtn.removeClass("clicked");
                tagcloud.removeClass("turn-left");
                navDiv.removeClass("turn-left");
            } else {
                switchBtn.addClass("clicked");
                tagcloud.addClass("turn-left");
                navDiv.addClass("turn-left");
                resetTags();
            }
        });
    }

    return {
        init: function () {
            resetTags();
            bind();
        }
    }
});
