function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

if (!isSupportCanvas()) {
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}

heatmapOverlay = new BMapLib.HeatmapOverlay({
    "maxOpacity": 1,
    "minOpacity": 0,
    "radius": 0.1
});
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({
                data: points,   //默认加载计算机学院数据
                max: 60
            });

// 更改heatmap数据
// 学院索引参考data_college.js
function setHeatmapData(n){
    if(n>pointsForCollege.length || n<1)
        alert("ERROR:setHeatmapData(n)->pointsForCollege[]索引:"+n+"不在数据集范围!")
    else{
        var p=pointsForCollege[n-1];
        //alert("set:pointsForCollege["+n+"]"+"   p.length:"+p.length);
        heatmapOverlay.setDataSet({
                data: p,  
                max: 35
            });
    }
}

// 更新点的半径
function setRadius(r) {
    heatmapOverlay.setOptions({
        "radius": r
    });
}
//更新点的透明度
function setOpacity(op){
    heatmapOverlay.setOptions({
        "maxOpacity": op
    });
}

//动画设置区域---------------------------------
var times=timer=15;  //动画帧数
var tempR=1,finalR=55;  //最终半径
var perTime=10;  //每帧的时间间隔
//---------------------------------------------
function looptimer(){  //一开始会闪一下大点？bug
    setRadius(tempR);
    tempR+=finalR/times;
    timer--;
    if(timer>0)
        setTimeout("looptimer()", perTime);
    //alert("time:"+timer);
}

//加载动画设置
function loadingAnimation(){
    //初始化动画参数
    tempR=1;
    timer=15;
    looptimer();
}

loadingAnimation();