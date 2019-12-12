//警告语的设置
var ps = document.getElementsByTagName('p')[0];
var titles = document.getElementsByClassName('title')[0];
var lefts = getStyle(ps,'margin-left');
var t = setInterval(function(){
	var left = parseInt(getStyle(ps,'margin-left'));
	ps.style.marginLeft = left - 1 + "px";
	if(left == 0){
		titles.style.overflow = 'hidden';
	}
	else if(left == parseInt(getStyle(ps,'width'))*-1){
		ps.style.marginLeft = parseInt(lefts)+parseInt(getStyle(ps,'width'))+"px";
	}
},25);

//图片轮播
var middle = document.getElementsByClassName("middle")[0];
var imgs = document.getElementsByClassName("imgs")[0];
var dots = document.getElementsByClassName("dots")[0].children;
var isMoving = false;
var index = 1;

function set(){
	if(!isMoving){
		isMoving = true;
		index++;
		dotsMove();
		//图的变化
		animate(imgs,{left:-1200*index},function(){
			if(index == 6){
				imgs.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
}
var timer = setInterval(set,3000);

var left = document.getElementsByClassName('left')[0];
var right = document.getElementsByClassName('right')[0];

//鼠标划上
middle.onmouseover=function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出
middle.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(set,3000);
}
//鼠标点击左按钮
left.onclick = function(){
	if(!isMoving){
		isMoving = true;
		index--;
		dotsMove();
		animate(imgs,{left:-1200*index},function(){
			if(index == 0){
				index = 5;
				imgs.style.left = "-6000px";
			}
			isMoving = false;
		});		
	}	
}
//鼠标点击右按钮
right.onclick = set;
//小圆点点击
for(var i=0;i<dots.length;i++){
	dots[i].num = i+1;
	dots[i].onclick = function(){
		index = this.num;
		dotsMove();
		animate(imgs,{left:-1200*index});	
	}
}
//小圆点移动
function dotsMove(){
	for(var i=0;i<dots.length;i++){
		dots[i].className = '';
	}
	if(index == 6){
		dots[0].className = "active";
	}
	else if(index == 0){
		dots[4].className = "active";
	}
	else{
		dots[index-1].className = "active";
	}	
}