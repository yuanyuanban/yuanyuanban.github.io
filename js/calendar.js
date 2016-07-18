window.onload = function() {
	var oMy_cl = document.getElementById('my_calendar');
	var oUl = document.createElement('ul');
	var oSpan = oMy_cl.getElementsByTagName('span')[0];
	oMy_cl.appendChild(oUl);
	var aLi = oUl.children;
	var now = 0;

	function updated() {
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + now);
		oSpan.innerHTML = oDate.getFullYear() + '年' + (oDate.getMonth() + 1) + '月';
		oUl.innerHTML = "";

		oDate.setDate(1);
		var m = oDate.getDay();
		if (m == 0) {
			m = 7;
		};
		m--;
		for (var i = 0; i < m; i++) {
			var oLi = document.createElement('li');
			oUl.appendChild(oLi);
		};

		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + now);
		oDate.setMonth(oDate.getMonth() + 1, 0);
		var n = oDate.getDate();
		for (var i = 0; i < n; i++) {
			var oLi = document.createElement('li');
			oLi.innerHTML = i + 1;
			oUl.appendChild(oLi);
		};

		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + now);
		var today = oDate.getDate()
		for (var i = 0; i < aLi.length; i++) {
			var d = parseInt(aLi[i].innerHTML);
			if (d < today) {
				aLi[i].className = "past";
			} else if (d == today) {
				aLi[i].className = "today";
				aLi[i].innerHTML = "今天";
			}
		};
	}
	updated();
	var oPrev = oMy_cl.getElementsByTagName('a')[0];
	var oNext = oMy_cl.getElementsByTagName('a')[1];
	oPrev.onclick = function() {
		now--;
		updated();
	}
	oNext.onclick = function() {
		now++;
		updated();
	}

}