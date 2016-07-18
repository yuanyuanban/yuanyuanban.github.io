window.onload = function() {
		var oUl = document.getElementById('ul1');
		var oBtn=document.getElementById('btn');
		var oBack=document.getElementById('back_top');
		var aLi = oUl.children;
		var zIndex = 1000;
		var aPos = [];

		oBtn.onclick=function(){
			aPos.sort(function(){
				return Math.random()-0.5;
			})
			for (var i = 0; i < aLi.length; i++) {
				move(aLi[i],aPos[aLi[i].index]);
			};
		}
		for (var i = 0; i < aLi.length; i++) {
			aPos[i] = {
				"left": aLi[i].offsetLeft,
				"top": aLi[i].offsetTop
			}
		};
		for (var i = 0; i < aLi.length; i++) {
			drag(aLi[i]);
			aLi[i].index = i;
		};
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0
		};
		function drag(obj) {
				obj.onmousedown = function(ev) {
					var oEvent = ev || event;
					var disX = oEvent.clientX - obj.offsetLeft;
					var disY = oEvent.clientY - obj.offsetTop;
					obj.style.zIndex = zIndex++;
					clearInterval(obj.timer);
					document.onmousemove = function(ev) {
						var oEvent = ev || event;
						obj.style.left = oEvent.clientX - disX + 'px';
						obj.style.top = oEvent.clientY - disY + 'px';

						for (var i = 0; i < aLi.length; i++) {
							aLi[i].className = "";
						};
						var oNear = findNearest(obj);
						if (oNear) {
							oNear.className = 'box';
						};
					}
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null;
						obj.releaseCapture && obj.releaseCapture();

						var oNear = findNearest(obj);
						if (oNear) {
							move(obj, aPos[oNear.index]);
							move(oNear, aPos[obj.index]);
							oNear.className = '';
							var tmp;
							tmp = oNear.index;
							oNear.index = obj.index;
							obj.index = tmp;
						} else {
							move(obj, aPos[obj.index]);
						}
					}
					obj.setCapture && obj.setCapture();
					return false;
				}
			}
			//找最近的
		function findNearest(obj) {
				var iMin = new Date().getTime();
				var iMinIndex = -1;
				for (var i = 0; i < aLi.length; i++) {
					if (obj == aLi[i]) {
						continue
					};
					if (collTest(obj, aLi[i])) {
						var dis = getDis(obj, aLi[i]);
						if (dis < iMin) {
							iMin = dis;
							iMinIndex = i;
						};
					};
				};
				if (iMinIndex == -1) {
					return null;
				} else {
					return aLi[iMinIndex];
				}
			}
			//碰撞检测函数
		function collTest(obj, obj2) {
				var l1 = obj.offsetLeft;
				var r1 = obj.offsetLeft + obj.offsetWidth;
				var t1 = obj.offsetTop;
				var b1 = obj.offsetTop + obj.offsetHeight;

				var l2 = obj2.offsetLeft;
				var r2 = obj2.offsetLeft + obj2.offsetWidth;
				var t2 = obj2.offsetTop;
				var b2 = obj2.offsetTop + obj2.offsetHeight;

				if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
					return false;
				} else {
					return true;
				}
			}
			//求距离
		function getDis(obj, obj2) {
			var a = obj2.offsetLeft - obj.offsetLeft;
			var b = obj2.offsetTop - obj.offsetTop;
			return Math.sqrt(a * a + b * b);
		}

		var timer=null;
		var bSys=false;
		window.onscroll=function(){
			if (bSys==true) {
				clearInterval(timer);
			};
			bSys=true;
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			if (scrollT>0) {
				oBack.style.display='block';
			}else{
				oBack.style.display='none';
			}
		}

	}