var minNum=document.getElementById("min");
var maxNum=document.getElementById("max");
var centerPosition=document.getElementById("centerPosition");
var colorLine=document.getElementById("colorLine");
var opacity1=document.getElementById("opacity1");
var opacity2=document.getElementById("opacity2");
var opacity3=document.getElementById("opacity3");

//为提示框按钮添加事件监听
opacity1.addEventListener("click", changeOpacity,false);
opacity2.addEventListener("click", changeOpacity,false);
opacity3.addEventListener("click", changeOpacity,false);
//手动修改Opacity
function changeOpacity(){
	if(opacity1.checked)
		setOpacity(0.3);
	else if(opacity2.checked)
		setOpacity(0.6);
	else 
		setOpacity(1);
}

//对应zoom的5-12级时，radius的值
var radiusList=[25,55,100,60,90,110,110,150];

function adaptRadius(){
	setRadius(radiusList[map.getZoom()-5]);
}

function adaptOpacity(){
	if(map.getZoom()>6){
		setOpacity(0.3);
		opacity1.checked=true;
	}
	else {
		setOpacity(1);
		opacity3.checked=true;
	}
}

function updateINFbox(){

}



//地图缩放监听器
map.addEventListener("zoomend", function(){
	updateINFbox();    //更新INFbox信息
	adaptRadius();     //适配不同zoom下的Radius
	adaptOpacity();    //适配不同zoom下的Opacity透明度
	testZoomAndRadius();   //测试zoom和radius关系
});


//获取当前坐标的人数
//  依据数据points中离当前点最近的数据
//  数据点和当前点至少为distance，否则人数显示为0
function getPointCount(point,distance){
	var d=99;
	var n=-1;
	var l;
	for(var i=0;i<points.length;i++){
		l=(Math.abs(points[i].lng-point.lng)+Math.abs(points[i].lat-point.lat));
        if(l < d){
        	d=l;
        	n=i;
        }
    }
    // alert("d:"+d+"  n:"+n);
    if(d<distance && n!=-1){	
    	return points[n].count;
    }
    else 
    	return 0;
}


//对tipBox中的数据进行更新
function putTipBox(event){
	var langNum=document.getElementById("langNum");
	var latNum=document.getElementById("latNum");
	var cityName=document.getElementById("cityName");
	var countNum=document.getElementById("countNum");
	var zoomlevel=map.getZoom();  //获取当前地图缩放级别
	//调用百度自带的地址解析器，解析鼠标位置信息
	var gc = new BMap.Geocoder(); 
	gc.getLocation(event.point, function(rs) {   
		var addComp = rs.addressComponents;
		if(zoomlevel>9)
			cityName.innerHTML=addComp.district;
		else if(zoomlevel>7)
      		cityName.innerHTML=addComp.city;
      	else
      		cityName.innerHTML=addComp.province;
	});
	langNum.innerHTML=event.point.lng.toFixed(2);
	latNum.innerHTML=event.point.lat.toFixed(2);
	countNum.innerHTML=getPointCount(event.point,2);
}

//将putTipBox(event)放入map的mousemove监听器中，监听鼠标移动
//优化加载动画流畅度，将函数延迟500ms启动
setTimeout(function(){
	map.addEventListener("mousemove", function(e){
		putTipBox(e);
	});
}, 500);

