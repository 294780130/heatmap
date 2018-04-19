var map = new BMap.Map("container",{  
        minZoom : 5,  
        maxZoom : 12 
    } ); // 创建地图实例   minZoom:地图放到最大的大小  max:最精细的成度

map.disableDoubleClickZoom(); //禁用双击放大,便于监听滚轮操作实时改变数据。
map.setDefaultCursor("default");
var point = new BMap.Point(105.0, 33.0);   //设置中心点坐标
map.centerAndZoom(point, 6); // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 允许滚轮缩放
//水印隐藏操作在css文件中:#container .anchorBL {display: none;}