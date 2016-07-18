window.onload=function(){
	var oBox=document.getElementById('box');
	var oUl=oBox.getElementsByTagName('ul')[0];
	var oLeft=document.getElementById('left');
	var oRight=document.getElementById('right');
	var aLi=oUl.children;
	
	//复制一份内容
	//oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;
	oUl.innerHTML+=oUl.innerHTML;
	//算ul的宽度
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	var W=oUl.offsetWidth/2;
	var timer=null;
	
	var left=0;
	function toRight(){
		clearInterval(timer);
		timer=setInterval(function(){
			left+=10;
			if(left<0){
				oUl.style.left=left%W+'px';	
			}else{
				oUl.style.left=(left%W-W)%W+'px';	
			}
		},100);	
	}
	function toLeft(){
		clearInterval(timer);
		timer=setInterval(function(){
			left-=10;
			if(left<0){
				oUl.style.left=left%W+'px';	
			}else{
				oUl.style.left=(left%W-W)%W+'px';	
			}
		},100);	
	}
	toRight();
	//
	oLeft.onmouseover=function(){
		toLeft();
	};
	oRight.onmouseover=function(){
		toRight();
	};
	
};