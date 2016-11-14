
//图片预览小图移动效果,页面加载时触发
$(function () {
    var moveNum = 5; //每次移动的数量
    var moveTime = 300; //移动速度,毫秒
    var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
    var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
    var totalCount = scrollItems.length; // 总个数
    var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
    var totalPage = Math.floor(scrollItems.length / moveNum); //总页数

    var page = 0;

    btnStyle();
    //下一张
    $(".spec-scroll .next").bind("click", function () {

        //当总个数<= 每次移动的数量
        if (totalCount <= moveNum) {
        }
        else {
            if (page < totalPage) { page++; scrollDiv.animate({ left: "-=" + moveLength + "px" }, moveTime); };
        }
        btnStyle();
    });
    //上一张
    $(".spec-scroll .prev").bind("click", function () {
        if (page > 0) { page--; scrollDiv.animate({ left: "+=" + moveLength + "px" }, moveTime); };
        btnStyle();
    });
    //左右按钮样式设置
    function btnStyle() {
        if (page == 0) { $('.prev').addClass('noscroll'); } else { $('.prev').removeClass('noscroll'); }
        if (page == totalPage) { $('.next').addClass('noscroll'); } else { $('.next').removeClass('noscroll'); }

        //当总个数<= 每次移动的数量
        if (totalCount <= moveNum) {
            $('.next').addClass('noscroll');
        }
    };

});
//鼠标经过预览图片函数
function preview(img) {
    $("#preview .jqzoom img").attr("src", $(img).attr("src"));
    $("#preview .jqzoom img").attr("jqimg", $(img).attr("bimg"));
}
