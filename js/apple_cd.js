window.onload=function(){
	var oBox=document.getElementById('dock');
	var aImg=document.getElementsByTagName('img');
	document.onmousemove=function(ev){
		var oEvent=ev||event;
		for(var i=0; i<aImg.length; i++){
			var a=aImg[i].offsetWidth/2+aImg[i].offsetLeft-oEvent.clientX;
			var b=aImg[i].offsetHeight/2+aImg[i].offsetTop+oBox.offsetTop-oEvent.clientY;
			
			var c=Math.sqrt(a*a+b*b);
			var scale=1-c/500;
			scale<0.5 && (scale=0.5);
			
			aImg[i].style.width=scale*128+'px';
		}

	}
}