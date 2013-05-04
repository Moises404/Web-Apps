/*
   ========================================================
        script: image3D engine
        author: Gerard Ferrandez - [Ge1doot]
          date: April 16, 2008
          site: http://www.dhteumeuleu.com
       license: CC-BY-NC - do not remove this notice
   ========================================================
*/

var i3D = function() {
	/* ==== private variables and methods ==== */
	var O   = new Array(100);
	var N   = 0;
	var scr = false;
	var xm  = 0;
	var ym  = 0;
	var cx  = 0;
	var cy  = -2000;
	var cz  = 0;
	var zm  = 0;
	var cr  = 0;
	var nx  = 0;
	var ny  = 0;
	var nw  = 0;
	var nh  = 0;
	var cg  = false;
	var mo  = false;
	var refinterval = null;
	var path, FL, FS, Z, omob, hlb;
	/* ===== crossbrowsers events ==== */
	function addEvent (o, e, f) {
		var r = false;
		if (window.addEventListener) { o.addEventListener(e, f, false); r = true; }
		else if (window.attachEvent) { r = o.attachEvent('on' + e, f); }
		return r;
	}
	/* ===== append HTML Element ==== */
	function Append (tag, att, css) {
		var object = document.createElement(tag);
		for( var i in att) object[i] = att[i];
		for( var i in css) object.style[i] = css[i];
		this.appendChild(object);
		return object;
	}
	/* ===== window resize ==== */
	function resize () {
		var o = scr;
		for (nx = 0, ny = 0; o != null; o = o.offsetParent) {
			nx += o.offsetLeft;
			ny += o.offsetTop;
		}
		nw = scr.offsetWidth;
		nh = scr.offsetHeight - (scr.offsetHeight / 1.3);
	}
	/* ==== cache xbrowser opacity ==== */
	function initOpacity (o) {
		if (o.filters && o.filters.alpha) {
			o.alpha = o.filters.alpha;
			o.opacity = function (alpha) { this.alpha.opacity = Math.round(alpha); }
		} else {
			o.alpha = o.style;
			o.opacity = function (alpha) { this.alpha.opacity = alpha / 100; }
		}
	}
	/* ==== Image3D Constructor ==== */
	function Image3D (param) {
		var options = param[4] || {};
		/* ---- image Element ---- */
		this.img = scr.append('img', {
				'src' : path + param[0],
				'onclick' : this.click,
    			'ondblclick' : this.dblclick,
				'onmouseover' : this.mover,
				'parent' : this
			}
		);
		this.loaded = false;
		this.X      = param[1];
		this.Y      = -param[2];
		this.Z      = param[3];
		this.SX     = options['zx'] || 1;
		this.SY     = options['zy'] || this.SX;
		this.xb     = 0;
		this.yb     = 0;
		this.zb     = 0;
		this.ab     = 0;
		this.w2D    = 0;
		this.h2D    = 0;
		this.x2D    = 0;
		this.y2D    = 0;
		this.r      = 0;
		this.data   = false;
		/* ---- link ---- */
		this.url = options['url'] || false;
		var txt  = options['txt'] || '';
		var serie = options['serie'] || '';
		if (this.url) {
			/*txt += '<br><span class="texturl">'
				+ this.url.replace('http://','')
				+ '</span>';*/
			this.img.style.cursor = 'pointer';
		}
		this.icss = this.img.style;
		initOpacity(this.img);
		/* ---- text element ---- */
		if (txt) {
			this.txt = scr.append('div', {
					'innerHTML' : txt,
					'onclick' : this.click,
					'parent' : this
				},
				{'width' : '1000px'}
			);
			this.tp   = -10000;
			this.tf   = true;
			this.tcss = this.txt.style;
			initOpacity(this.txt);
		}
		/* ---- serie element ---- */
		if (serie) {
		    this.img.setAttribute('serie', serie);		
		}
		
		O[N++] = this;
	}
	/* ==== prototype images functions ==== */
	Image3D.prototype = {
		/* ---- hide non moving images ---- */
		hide : function () {
			if (this.visible) {
				this.visible = false;
				this.img.style.width = '0px';
				if ($(this.img).hasClass("select")) {
				  this.data = true; 
				  $(this.img).removeClass("select");
				}
				this.tp = -10000;
			}
		},
		/* ---- hide text ---- */
		txthide : function () {
			if (this.txtvisible) {
				this.txtvisible = false;
				this.txt.style.top = '-10000px';
				this.tp = -10000;
				this.tf = true;
			}
		},
		/* ---- images onmouseover ---- */
		mover : function () {
			var that = this.parent;
			/* ---- hover ---- */
			if (mo != this) {
				//if (mo) mo.style.border = "";
				mo = this;
				//this.style.border = that.url ? hlb : omob;
			}
			/* ---- start animation text ---- */
			if (that.tf && Math.abs(zm - cz) < 50) {
				that.tp = 0;
				that.tf = false;
				that.tcss.fontSize = (that.r * nh / FS) + 'px'
			}
			return false;
		},
		/* ---- images onclick ---- */
		click : function() {
			var that = this.parent;
			if (that.url) {
				/* ---- jump to hyperlink ---- */
                params  = 'width='+screen.availWidth;
                params += ', height='+screen.availHeight;
                params += ', top=0, left=0, scrollbars=1';
                params += ', fullscreen=yes';
                pleft = 'top=10, left='+(screen.availWidth--) + ', height='+(screen.availHeight-100);
                //newwin=window.open(that.url,'_blank', params);
                newwin = window.open(that.url, '_blank', 'scrollbars=1, resizable=1, titlebar=0, location=0, width=550,' + pleft);
                if (window.focus) {newwin.focus()}
				//window.location.href = that.url; //window.open(that.url,'_blank'); //
			}
			/* ---- go to image ---- */
			zm = that.Z - 450;
			cg = true;
			return false;
		},
		/* ---- images ondblclick ---- */
		dblclick : function() {
			var that = this.parent;
			/* ---- go to image ---- */
			zm = that.Z - 450;
			cg = true;
			return false;
		},
		/* ==== main rendering function ==== */
		display : function () {
			if (this.loaded) {
				/* ---- 3D coordinates ---- */
				var x = this.X - cx;
				var y = this.Y - cy;
				var z = this.Z - cz;
				/* ---- animate text ---- */
				if(this.tp > -200) {
					this.txtvisible = true;
					this.tp         -= 2;
					this.tcss.left   = Math.round(this.x2D + this.w2D * .5 - 500) + 'px';
					this.tcss.top    = (this.y2D + this.tp + this.h2D * .5) + 'px';
					this.tcss.zIndex = Math.round(10000 - z);
					this.txt.opacity(200 + this.tp);
				} else this.txthide();
				/* ---- image visible ---- */
				if (z > 0) {
					/* ---- 3D to 2D transform ---- */
					this.r = FL / (FL + (z * Z));
					this.w2D = this.W * this.r * Z * this.SX;
					this.h2D = this.H * this.r * Z * this.SY;
					this.x2D = Math.floor((nw * .5) + (x * this.r * Z) - (this.w2D * .5));
					this.y2D = Math.floor((nh * .5) + (y * this.r * Z) - this.h2D);
					/* ---- image in screen ---- */
					if (this.x2D + this.w2D > 0 && this.x2D < nw) {
						this.visible = true;
						if (this.data){
						    $(this.img).addClass("select");
						    this.data = false;
						}
						/* ---- image is moving ---- */
						if (this.x2D != this.xb || this.y2D != this.yb || z != this.zb) {
							this.xb    = this.x2D;
							this.yb    = this.y2D;
							this.zb    = z;							
							/* ---- html rendering ---- */
							this.icss.left   = this.x2D + 'px';
							this.icss.top    = this.y2D + 'px';
							this.icss.width  = Math.ceil(this.w2D)  + 'px';
							this.icss.height = Math.ceil(this.h2D)  + 'px';
							this.icss.zIndex = Math.round(10000 - z);
							/* ---- fade in/out ---- */
							var a = Math.max(0, Math.min(100, z));
							if (a != this.ab) {
								this.ab = a;
								this.img.opacity(a);
							}
						}
					} else this.hide();
				} else this.hide();
			} else {
				/* ==== image onload ==== */
				if (this.img.complete && this.img.width) {
					/* ---- get size image ---- */
					this.W      = this.img.width;
					this.H      = this.img.height;
					this.loaded = true;
					this.img.style.visibility = 'visible';
				}
			}
		}
	}
	/* ==== public methods ==== */
	return {
		/* ---- initialize script ---- */
		init : function (container, imagepath, focalLength, zoom, fontSize, onmouseover_border, hyperlink_border, structure) {
			/* ---- container ---- */
			scr = document.getElementById(container);
			scr.append = Append;
			if (!scr) return false;
			/* ---- init ---- */
			resize();
			path = imagepath;
			FL   = focalLength;
			FS   = fontSize;
			Z    = zoom;
			omob = onmouseover_border;
			hlb  = hyperlink_border;
			xm   = nx - (document.body.offsetWidth) + nw;
			ym   = -ny - nh * 2;//-ny - nh * .5;
			/* ---- camera xy position ---- */
/* No camera move
			addEvent(window.document, 'mousemove', function(e) {
				e = e || window.event;
				xm = nx - (e.clientX * 2) + nw;
				ym = -ny + (e.clientY * 2) - nh * 2;
				return false;
			});
*/
			/* ---- image onclick ---- */
			addEvent(scr, 'click', function() {
				if (!cg) zm = 0;
				cg = false;
				return false;
			});
			/* ---- window resize ---- */
			addEvent(window, 'resize', resize);
			/* ---- mouse wheel - camera z position ---- */
			if (window.addEventListener) scr.addEventListener('DOMMouseScroll', function(e) {
				zm += (e.detail * 40);
				return false;
			}, false);
			scr.onmousewheel = function () {
				zm += (-event.wheelDelta);
				return false;
			}
			/* ---- create objects ---- */
			for (var i = 0, n = structure.length; i < n; i++)  {
				var s = structure[i];
				var options = s[4];
				/* ---- repeat ---- */
				var r = options ? options['repeat'] : false;
				if (r) {
					for (var j = 0, m = r[1]; j < m; j++) {
						var ok = new Image3D(s);
						s[r[0]] += r[2];
					}
				}  else var ok = new Image3D(s);
			}
			/* ---- launch script ---- */
			setInterval(i3D.run, 16);
		},
		/* ---- main loop ---- */
		run : function () {
			/* ---- camera ease ---- */
			cx -= Math.round((xm + cx) * .1);
			cy += Math.round((ym - cy) * .1);
			cz += Math.round((zm - cz) * .1);
			/* ---- display loop ---- */
			var i = N;
			while (i--)	O[i].display();
		},
		moveback : function() {
		    zm += 1000;
		},
		movetop: function() {
		    zm -= 1000;
		}
	}
}();