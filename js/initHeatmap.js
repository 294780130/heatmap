//判断浏览区是否支持canvas
function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

if (!isSupportCanvas()) {
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
//参数说明如下:
/* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *  {
            .2:'rgb(0, 255, 255)',
            .5:'rgb(0, 110, 255)',
            .8:'rgb(100, 0, 255)'
        }
        其中 key 表示插值的位置, 0~1. 
            value 为颜色值. 
     */
heatmapOverlay = new BMapLib.HeatmapOverlay({
    "maxOpacity": 1,
    "minOpacity": 0
});
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({
                data: points,
                max: 35
            });

// //是否显示热力图
// function openHeatmap() {
//     heatmapOverlay.show();
// }

// function closeHeatmap() {
//     heatmapOverlay.hide();
// }

// function setGradient() {
//     // 设置heatmap点的颜色以及渐变
//     var gradient = {
//             0:'rgb(102, 255, 0)',
//             .5:'rgb(255, 170, 0)',
//             1:'rgb(255, 0, 0)'
//     };
//     heatmapOverlay.setOptions({
//         "gradient": gradient
//     });
// }

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
var tempR=0,finalR=60;  //最终半径
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
    looptimer();
}

loadingAnimation();
freshMunberLine();

//获取points中的最大值最小值，将值放入提示板
function freshMunberLine(){
    var maxN=minN=points[0].count;
    for(var i=0;i<points.length;i++){
        if(points[i].count>maxN)
            maxN=points[i].count;
        if(points[i].count<minN)
            minN=points[i].count;
    }
    document.getElementById("minNum").innerHTML=minN;
    document.getElementById("maxNum").innerHTML=maxN;
}
