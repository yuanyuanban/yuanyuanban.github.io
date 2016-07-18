window.onload=function(){
	var temp=[{'src':'title':'淡淡的忧桑。。。'},
			  {'src':'1.jpg','title':'稀有萌物'},
			  {'src':'2.jpg','title':'主人，我饿啦。。。'},
			  {'src':'3.jpg','title':'小可怜~~'},
			  {'src':'4.jpg','title':'嗨！大家好~'},
			  {'src':'5.jpg','title':'你们怎么是反的'},
			  {'src':'6.jpg','title':'水汪汪的大眼睛'},
			  {'src':'7.jpg','title':'狂拽帅气吊炸天。。'},
			  {'src':'8.jpg','title':'让我静一会儿。'},
			  {'src':'9.jpg','title':'圆圆的小脑袋。'},
			  {'src':'10.jpg','title':'你们找不到我。。'}];	
	waterfall(temp.sort(function(){
			return Math.random()-0.5;	
	}));
	function waterfall(data){
		var aUl=document.getElementsByTagName('ul');
		for(var i=0; i <data.length; i++){
			(function(index){
				var oImg=new Image();
				oImg.onload=function (){
					var oLi=document.createElement('li');
					oLi.innerHTML='<div class="info"><div class="pic" ><img style="height:'+oImg.height*260/oImg.width+'px;" src="img/'+data[index].src+'"/></div><div class="desc"><a href="#">'+data[index].title+'</a></div></div>';
					
					var arr=[];
					for(var j=0; j<aUl.length; j++){
						arr[j]=aUl[j];
					}
					arr.sort(function (ul1, ul2){
						return ul1.offsetHeight-ul2.offsetHeight;
					});
					
					arr[0].appendChild(oLi);		
				};
				oImg.src='img/'+data[i].src;
			})(i);
		}		
	}
	var timer=null;
	window.onscroll=window.onresize=function(){
		clearTimeout(timer);
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>=document.body.scrollHeight-document.documentElement.clientHeight){
			timer=setTimeout(function(){
				waterfall(temp.sort(function(){
					return Math.random()-0.5;	
				}));
			},30);
			
		}
	};
}
