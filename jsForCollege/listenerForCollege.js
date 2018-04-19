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

//对应zoom的5-12级时，radius的值
var radiusList=[25,55,100,60,90,110,110,150];

function adaptRadius(){
	setRadius(radiusList[map.getZoom()-5]);
}

//地图缩放监听器
map.addEventListener("zoomend", function(){
	adaptRadius();     //适配不同zoom下的Radius
	adaptOpacity();    //适配不同zoom下的Opacity透明度
});


//改变学院+加载动画效果
function changeCollegeData(n,elemt){
	setHeatmapData(n);
	loadingAnimation();
	document.getElementById("collegeName").innerHTML=elemt.innerHTML;
	changeSortData(n);
}

//更新sortdata
function changeSortData(n){
	var ZJs=window["sort_ZJ"+n];
	var PROVs=window["sort_Province"+n];
	for(var j=0;j<10;j++){
		let i=j+1;
		document.getElementById("ZJName"+i).innerHTML=ZJs[j].place;
		document.getElementById("ZJCount"+i).innerHTML=ZJs[j].number;
		document.getElementById("provName"+i).innerHTML=PROVs[j].place;
		document.getElementById("provCount"+i).innerHTML=PROVs[j].number;
	}
}

