function getStyle(obj, name) {
	return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
}

function move(obj, json, options) {
	var start = {};
	var dis = {};
	options = options || {};
	options.time = options.time || 700;
	options.type = options.type || 'ease-out';
	for (var name in json) {
		if (name == "opacity") {
			start[name] = parseFloat(getStyle(obj, name));
		} else {
			start[name] = parseInt(getStyle(obj, name));
		}
		dis[name] = json[name] - start[name];
	}
	var count = Math.round(options.time / 30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		n++;
		for (var name in json) {
			switch (options.type) {
				case 'linear':
					var cur = start[name] + dis[name] * n / count;
					break;

				case 'ease-in':
					var a = n / count;
					var cur = start[name] + dis[name] * a * a * a;
					break;

				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - a * a * a);
					break;
			}
			// var cur = start[name] + dis[name] * n/ count ;
			if (name == "opacity") {
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:" + cur * 100 + ")";
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if (n == count) {
			clearInterval(obj.timer);
			options.fn && options.fn();
		};
	}, 30)
}