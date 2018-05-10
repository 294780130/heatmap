var minNum=document.getElementById("min");
var maxNum=document.getElementById("max");
var centerPosition=document.getElementById("centerPosition");
var opacity1=document.getElementById("opacity1");
var opacity2=document.getElementById("opacity2");
var opacity3=document.getElementById("opacity3");

var area1=document.getElementById("area1");
var area2=document.getElementById("area2");
var area3=document.getElementById("area3");



opacity2.checked=true;
area1.checked=true;

//为提示框按钮添加事件监听
opacity1.addEventListener("click", changeOpacity,false);
opacity2.addEventListener("click", changeOpacity,false);
opacity3.addEventListener("click", changeOpacity,false);

area1.addEventListener("click", changeArea,false);
area2.addEventListener("click", changeArea,false);
area3.addEventListener("click", changeArea,false);
//手动修改Opacity
function changeOpacity(){
	if(opacity1.checked)
		setOpacity(0.3);
	else if(opacity2.checked)
		setOpacity(0.6);
	else 
		setOpacity(1);
}

//手动修改CENTER
function changeArea(){
	if(area1.checked)
		setMapCenterPoint(new BMap.Point(120.0, 30.5));
	else if(area2.checked)
		setMapCenterPoint(new BMap.Point(113.23, 23.16));
	else 
		setMapCenterPoint(new BMap.Point(116.46, 39.92));
}

//对应zoom的5-12级时，radius的值
var radiusList=[25,55,100,60,90,110,110,150];

function adaptRadius(){
	setRadius(radiusList[map.getZoom()-5]);
}

function adaptOpacity(){
	if(map.getZoom()>6){
		setOpacity(0.6);
		opacity2.checked=true;
	}
	else {
		setOpacity(0.6);
		opacity2.checked=true;
	}
}

function updateINFbox(){

}



//地图缩放监听器
map.addEventListener("zoomend", function(){
	updateINFbox();    //更新INFbox信息
	//adaptRadius();     //适配不同zoom下的Radius
	adaptOpacity();    //适配不同zoom下的Opacity透明度
	testZoomAndRadius();   //测试zoom和radius关系
});



//对tipBox中的数据进行更新
function putTipBox(event){
	var langNum=document.getElementById("langNum");
	var latNum=document.getElementById("latNum");
	var cityName=document.getElementById("cityName");
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
}

//将putTipBox(event)放入map的mousemove监听器中，监听鼠标移动
//优化加载动画流畅度，将函数延迟500ms启动
setTimeout(function(){
	map.addEventListener("mousemove", function(e){
		putTipBox(e);
	});
}, 500);

