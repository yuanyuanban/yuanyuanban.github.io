window.onload = function() {
	var oTop = document.getElementById('top');
	var oOl = oTop.getElementsByTagName('ol')[0];
	var aBtn = oOl.children;
	var oUl = oTop.getElementsByTagName('ul')[0];
	var aLi = oUl.children;
	var iNow = 0;
	var timer = null;
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;
		(function(index) {
			aBtn[i].onmouseover = function() {
				iNow = this.index;
				tab();
			}
		})(i);
	};

	function tab() {
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].className = '';
			move(aLi[i], {
				'opacity': 0,
				"time": 700
			});
		};
		aBtn[iNow].className = 'active';
		move(aLi[iNow], {
			'opacity': 1,
			"time": 700
		});
	}

	function next() {
		iNow++;
		if (iNow == aLi.length) {
			iNow = 0;
		};
		tab();
	}

	next();
	setInterval(next, 2000);

	//content
	var oBox = document.getElementById('con_box');
	var oBar_con = document.getElementById('bar_con');
	var oBar_ul = document.getElementById('bar_ul');
	var oUl_b = oBar_ul.getElementsByTagName('ul')[0];
	var aLi_img = oUl_b.children;
	var oBar_box = document.getElementById('test');
	var oBar = oBox.getElementsByTagName('span')[0];
	var disX;

	// oUl_b.style.width=(aLi_img[0].offsetWidth+aLi_img.marginRight)*aLi_img.length+'px';
	oUl_b.style.width = aLi_img[0].offsetWidth * aLi_img.length + 'px';
	oBar.onmousedown = function(ev) {
			var oEvent = ev || event;
			disX = oEvent.clientX - oBar.offsetLeft;
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				if (l < 0) {
					l = 0;
				} else if (l > oBar_box.offsetWidth - oBar.offsetWidth) {
					l = oBar_box.offsetWidth - oBar.offsetWidth;
				}
				oBar.style.left = l + 'px';

				var scal = l / (oBar_box.offsetWidth - oBar.offsetWidth);
				oBar_ul.style.left = -scal * (oBar_ul.offsetWidth - oBar_con.offsetWidth-60) + 'px';
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				oBar.releaseCapture && oBar.releaseCapture();
			}
			oBar.setCapture && oBar.setCapture();
			return false;
		}
		//鼠标跟随效果
	function hoverDir(obj, ev) {
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		var x = obj.offsetLeft + w / 2 - ev.clientX;
		var y = obj.offsetTop + h / 2 - ev.clientY;
		return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
	}

	var oUl = document.getElementById('ul1');
	var aLi_con = oUl.children;
	var aSpan = oUl.getElementsByTagName('span');
	for (var i = 0; i < aLi_con.length; i++) {
		aLi_con[i].index = i;
		aLi_con[i].onmouseover = function(ev) {
			var oEvent = ev || event;
			var from = oEvent.fromElement || oEvent.relatedTarget;
			if (this.contains(from)) {
				return
			};
			var n = hoverDir(this, oEvent);
			var oSpan = aSpan[this.index];
			switch (n) {
				case 0:
					oSpan.style.left = '200px';
					oSpan.style.top = 0;
					break;

				case 1:
					oSpan.style.left = 0;
					oSpan.style.top = '200px';
					break;

				case 2:
					oSpan.style.left = '-200px';
					oSpan.style.top = 0;
					break;

				case 3:
					oSpan.style.left = 0;
					oSpan.style.top = '-200px';
					break;
			}
			move(oSpan, {
				"left": 0,
				"top": 0
			});
		}
		aLi_con[i].onmouseout = function(ev) {
			var oEvent = ev || event;
			var from = oEvent.toElement || oEvent.relatedTarget;
			if (this.contains(from)) {
				return
			};
			var n = hoverDir(this, oEvent);
			var oSpan = aSpan[this.index];
			switch (n) {
				case 0:
					move(oSpan, {
						"left": 200,
						"top": 0
					});
					break;

				case 1:
					move(oSpan, {
						"left": 0,
						"top": 200
					});
					break;

				case 2:
					move(oSpan, {
						"left": -200,
						"top": 0
					});
					break;

				case 3:
					move(oSpan, {
						"left": 0,
						"top": -200
					});
					break;
			}
		}
	};

	// //回到顶部
	// var oCome_back = document.getElementById('come_back');
	// var timers = null;
	// var bSys = false; //是否是系统滚动
	// window.onscroll = function() {
	// 	if (bSys == true) {
	// 		clearInterval(timers);
	// 	}
	// 	bSys = true;
	// 	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;

	// 	if (scrollT > 0) {
	// 		oCome_back.style.display = 'block';
	// 	} else {
	// 		oCome_back.style.display = 'none';
	// 	}
	// };

	// //回到顶部

	// oCome_back.onclick = function() {
	// 	clearInterval(timers);
	// 	var count = Math.floor(1000 / 30);
	// 	var start = document.documentElement.scrollTop || document.body.scrollTop;
	// 	var dis = 0 - start;
	// 	var n = 0;
	// 	timers = setInterval(function() {
	// 		bSys = false;
	// 		n++;

	// 		var a = 1 - n / count;
	// 		var cur = start + dis * (1 - Math.pow(a, 3));

	// 		document.documentElement.scrollTop = document.body.scrollTop = cur;

	// 		if (n == count) {
	// 			clearInterval(timers);
	// 		}
	// 	}, 30);
	// };

	//导航
	var oNav = document.getElementById('nav_ul').children;
	for (var i = 0; i < oNav.length; i++) {
		oNav[i].onmouseover = function() {
			var oEm = this.getElementsByTagName('em')[0];
			move(oEm, {
				"height": 55,
				"time": 200
			});
			// move(oEm,'height',36,200);
		};
		oNav[i].onmouseout = function() {
			var oEm = this.getElementsByTagName('em')[0];
			move(oEm, {
				"height": 0,
				"time": 200
			});
			// move(oEm,'height',0,200);
		};
	}
	var oUpIcon=document.getElementById('upIcon');
	var oFooter=document.getElementById('footer');
	oUpIcon.onclick=function(){
		if (oFooter.offsetHeight == 200) {
			doMove(oFooter, {
				"height": 0
			});
		} else {
			doMove(oFooter, {
				"height": 200
			});
		}
	}


	//打字效果
	var aTime=null;
	var oPal=document.getElementById('personal');
	var oP=oPal.getElementsByTagName('p')[0];
	var str="本人是一个性格开朗活泼的女生，大方乐观，踏实真诚，积极进取，团体协作精神，具有吃苦耐劳的精神。\
我一直认为用心、踏实是做好每一件是的基础，是取得成功必不可少的条件，而热情、真诚是待人必不可少的条件，也是取得良好人际关系的必要条件。我相信世上无难事只怕有心人，积极乐观、自信细心的性格让我在学生会工作中表现突出，让我以更踏实地心态去完成好每一件工作`(*∩_∩*)′。。。"
	for (var i = 0; i < str.length; i++) {
		var oSpan_c=document.createElement('span');
		oSpan_c.innerHTML=str.charAt(i);
		oP.appendChild(oSpan_c);
	};
	var aSpan_c=oP.children;
	var i=0;
	aTime=setInterval(function(){
		aSpan_c[i].style.display='inline-block';
		i++;
		if (i==aSpan_c.length) {
			clearInterval(aTime);
		};
	},100);

	//滑动
	var oNav_sd=document.getElementById('nav_ul');
	var oNav_li=oNav_sd.children;
	var oWapBox=document.getElementById('wrap_box');
	var aWapDiv=oWapBox.children;
	var clientH=document.documentElement.clientHeight;
	var iNow_d=0;
	for (var i = 1; i < aWapDiv.length; i++) {
		aWapDiv[i].style.top=clientH+'px';
	};
	for (var i = 0; i < oNav_li.length; i++) {
			oNav_li[i].index=i;
			oNav_li[i].onclick=function(){
				move(aWapDiv[iNow_d],{"top":-clientH});
				aWapDiv[this.index].style.top=clientH+'px'
				iNow_d=this.index;
				move(aWapDiv[iNow_d],{"top":0});
			}	
	};



	//创建日历
	

};
