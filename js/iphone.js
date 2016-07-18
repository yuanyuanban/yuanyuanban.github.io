window.onload=function(){
	var oWrap=document.getElementById('wrap');
	var oUl=oWrap.children[0];
	var aLi=oUl.children;
	
	var iNow=0;
	
	oUl.onmousedown=function(ev){
		var oEvent=ev || event;
		var downX=oEvent.clientX;
		var disX=downX-oUl.offsetLeft;
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			
			oUl.style.left=oEvent.clientX-disX+'px';
		}
		document.onmouseup=function(ev){
			var oEvent=ev || event;
			document.onmousemove=null;
			document.onmouseup=null;	
			oUl.releaseCapture && oUl.releaseCapture();
			var upX=oEvent.clientX;
			if(Math.abs(upX-downX)>50){
				if(upX<downX){ //左
					iNow++;
					if(iNow==aLi.length)iNow=aLi.length-1;
					doMove(oUl,{left:-iNow*aLi[0].offsetWidth});	
				}else{
					iNow--;
					if(iNow==-1)iNow=0;
					doMove(oUl,{left:-iNow*aLi[0].offsetWidth});	
				}
				document.title=iNow;
			}else{
				doMove(oUl,{left:-iNow*aLi[0].offsetWidth});	
			}
		}
		oUl.setCapture && oUl.setCapture();
		return false;	
	}
};