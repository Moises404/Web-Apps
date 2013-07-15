// A $ (document).ready block
$(document).ready(function() {

	console.log("forced directed graph!");

	// CHeck if jQuery and jQueryUI have loaded
	if (jQuery) {  
		console.log("jQuery is loaded"); 
	} else {
		console.log("jQuery is not loaded");
	}

	if (jQuery.ui) {
		console.log("jQueryUI is loaded");
	} else {
		console.log("UI is not loaded");
	}

	// test
	var node1 = $(".node1");
	var node1_x = node1.css("top");
	var node1_y = node1.css("left");

	var node2 = $(".node2");
	var node2_x = node2.css("top");
	var node2_y = node2.css("left");


	var line1 = $(".line1");
	line1.attr({"x1": node1_x, "y1": node1_y, "x2": node2_x, "y2": node2_y});


		//draggable
		node1.draggable({
			drag: function () {
				line1.attr({"x1": node1.css("left"), "y1": node1.css("top")});
			}
		});

		node2.draggable({
			drag: function () {
				line1.attr({"x2": node2.css("left"), "y2": node2.css("top")});
			}
		});

		

	/////////////////////
	/// NODE REPELLER ///
	/////////////////////


	Math.Vector = function (x,y) {
	    this.x = x;
	    this.y = y;
	}
	Math.Vector.prototype = {
	    clone: function () {
	        return new Math.Vector(this.x, this.y);
	    },
	    negate: function () {
	        this.x = -this.x;
	        this.y = -this.y;
	        return this;
	    },
	    neg: function () {
	        return this.clone().negate();
	    },
	    addeq: function (v) {
	        this.x += v.x;
	        this.y += v.y;
	        return this;
	    },
	    subeq: function (v) {
	        return this.addeq(v.neg());
	    },
	    add: function (v) {
	        return this.clone().addeq(v);
	    },
	    sub: function (v) {
	        return this.clone().subeq(v);
	    },
	    multeq: function (c) {
	        this.x *= c;
	        this.y *= c;
	        return this;
	    },
	    diveq: function (c) {
	        this.x /= c;
	        this.y /= c;
	        return this;
	    },
	    mult: function (c) {
	        return this.clone().multeq(c);
	    },
	    div: function (c) {
	        return this.clone().diveq(c);
	    },

	    dot: function (v) {
	        return this.x * v.x + this.y * v.y;
	    },
	    length: function () {
	        return Math.sqrt(this.dot(this));
	    },
	    normal: function () {
	        return this.clone().diveq(this.length());
	    }
	};

	function evade(evt) {
	    var $this = $(this),
	        corner = $this.offset(),
	        center = {x: corner.left + $this.outerWidth() / 2, y: corner.top + $this.outerHeight() / 2},
	        dist = new Math.Vector(center.x - evt.pageX, center.y - evt.pageY),
	        closest = $this.outerWidth() / 2;
	    
	    // proximity test
	    if (dist.length() >= closest) {
	        return;
	    }

	    // calculate new position
	    var delta = dist.normal().multeq(closest).sub(dist),
	        newCorner = {left: corner.left + delta.x, top: corner.top + delta.y};

	    // bounds check
	    var padding = parseInt($this.css('padding-left'));
	    if (newCorner.left < -padding) {
	        newCorner.left = -padding;
	    } else if (newCorner.left + $this.outerWidth() - padding > $(document).width()) {
	        newCorner.left = $(document).width() - $this.outerWidth() + padding;
	    }
	    if (newCorner.top < -padding) {
	        newCorner.top = -padding;
	    } else if (newCorner.top + $this.outerHeight() - padding > $(document).height()) {
	        newCorner.top = $(document).height() - $this.outerHeight() + padding;
	    }

	    // move bumper
	    $this.offset(newCorner);
	}

	function beginEvade() {
	    $(this).bind('mousemove', evade);
	}

	function endEvade() {
	   $(this).unbind('mousemove', evade);
	}


	$(function () {
	    $('.circle').wrap('<span class="bumper" />')

	    $('.bumper').bind('mouseover', beginEvade);
	    $('.bumper').bind('mouseout', endEvade);
	});

});