/******************************************************************************
* filename: Common.js
* Common Modul Scripting(Basic, Utilities)


*******************************************************************************/
var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var PTN_FLOAT = /\d+(\.\d+)?/;
function $nsw() { }
/********************
* 根据ID获取jQuery对象
* elmId : 元素ID
********************/
function $j(elmId) { return $("#" + elmId); }
/********************
* 根据ID获取文本框内容
* 重载1: 如果传递val参数，则修改文本框内容
* elmId : 元素ID
* val : 新的文本框内容
********************/
function $v(elmId, val) {
    if (val == null) {
        var o = $j(elmId).attr("value");
        if (o == null || o == undefined){
            return "";
        }
        return o;
    } else {
        return $j(elmId).attr("value", val);
    }
}
/********************
* 根据ID获取文本框内容并去除两边空格
* elmId : 元素ID
********************/
function $tv(elmId) { return $.trim($v(elmId)); };
/********************
* 获取元素选中状态（复选框、单选框）
* elmId : 元素ID
********************/
function getChecked(elmId) { return $("#" + elmId).attr("checked"); };
/********************
* 从容器查找单选框，当value与val相等则选中之
* val : 值
* cntrId : 容器ID
********************/
function checkRadio(val, cntrId) {
    var rdos;
    if (cntrId == null){
        rdos = $(document.body).find("input[type=radio]");
    }else{
        rdos = $j(cntrId).find("input[type=radio]");
    }
    rdos.each(function(i) {
        var jT = $(this);
        jT.attr("checked", jT.attr("value") == val);
    });
}
function getSelectedText(ddlElmId) {
    var opts = $("#" + ddlElmId + ">option");
    var rtnVal = "";
    opts.each(function(i) {
        if (this.selected) {
            rtnVal = this.text;
        }
    });
    return rtnVal;
}
/********************
* 隐藏下拉框函数
* 重载1 : 如果不传递cntrId，则以body为容器
* cntrId : 容器ID
********************/
function hideDdl(cntrId) {
var arrTags = ["select", "iframe", "applet", "object"];
    var jCntr;
    if (cntrId != null){
        jCntr = $j(cntrId);
    }else{
        jCntr = $(document.body);
    }
    for (var i = 0; i < arrTags.length; ++i) {
        jCntr.find(arrTags[i]).css("visibility", "hidden");
    } 
    //    if (behavior != null) {
    //        behavior();
    //    }
}
/********************
* 隐藏下拉框函数
********************/
function showDdl() {
    var arrTags = ["select", "iframe", "applet", "object"];
    for (var i = 0; i < arrTags.length; ++i) {
        $(arrTags[i]).css("visibility", "visible");
    }
}
/********************
* 重置一个层为绝对居中于窗口的位置
* elmId : 元素ID或元素
********************/
function relocation(elmId) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (jElm.length == 0) {
        return;
    }

    var dd = document.documentElement;
    var t = (dd.scrollTop - (jElm.height() / 2) + "px");
    jElm.css({ "margin-top": t/*, "left": l */ });
}
/********************
* 缩放窗口或拖动滚动条时，保持弹出层消息框于窗口居中
********************/
$(function() {
    //--
    $(window).resize(function() {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    $(window).scroll(function() {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    //--
});
/********************
* 对应$a(...)，用于在服务端显示弹出层消息框，针对IE的补丁
********************/
function oran_msg(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    window.onload = function() {
        $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior);
    }
}
/********************
* 提示选择对话框
* msg : 消息内容（必传递参数）
* obj : 对话框属性
********************/
function $confirm(sMsg, yesObj, noObj) {
    hideDdl();
    var sTitle = "消息对话框";
    var jMesbook1 = $j("mesbook1_c");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1_c'>"
				+ "<div><img onclick='hideMsg()' id='mesbook1_cImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam' /><span id='mesbook1_cTitle'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1_cIcon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title=''  /></dt>"
					+ "<dd class='l_25' id='mesbook1_cMsg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1_cAutoClose'>此窗口<span id='mesbook1_cDelay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>"
					+ "<dd id='mesbook1_cBtns'>"
						+ "<input type='button' class='b15' value='确 定' />"
						+ "<input type='button' class='b15' value='取 消' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1_c");
    var jMesbook1ImgClose = $j("mesbook1_cImgClose");
    var jMesbook1Icon = $j("mesbook1_cIcon");
    var jMesbook1Msg = $j("mesbook1_cMsg");
    var jMesbook1AutoClose = $j("mesbook1_cAutoClose");
    var jMesbook1Delay = $j("mesbook1_cDelay");
    var jMesbook1Title = $j("mesbook1_cTitle");
    var jMesbook1Btns = $j("mesbook1_cBtns");

    jMesbook1Title.html(sTitle);
    //消息内容
    jMesbook1Msg.html(sMsg);
    //图标
    var iconPath = SKIN_PATH + "Img/ico_ques.gif";
    jMesbook1Icon.attr("src", iconPath);

    //关闭按钮
    var yesBtn = jMesbook1Btns.find("input:eq(0)");
    var noBtn = jMesbook1Btns.find("input:eq(1)");
    yesBtn.removeAttr("onclick");
    noBtn.removeAttr("onclick");
    //yes
    if (yesObj.title != null) {
        yesBtn.val(yesObj.title);
    }
    if (typeof (yesObj.toDo) == "string") {
        yesBtn.click(function() {
            location.href = yesObj.toDo;
        });
    } else {
        yesBtn.click(function() {
            yesObj.toDo();
        })
    }
    //no
    if (noObj.title != null) {
        noBtn.val(noObj.title);
    }

    if (typeof (noObj.toDo) == "string") {
        noBtn.click(function() {
            location.href = noObj.toDo;
        });
    } else {
        noBtn.click(function() {
            noObj.toDo();
        })
    }
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function() {
        hideConfirm();
    });

    //显示
    showFullBg();
    setCM("mesbook1_c");
   // relocation("mesbook1_c");
    jMesbook1.fadeIn(80);
}
/********************
* 隐藏消息提示层
********************/
function hideConfirm() {
    showDdl();
    var jShadow = $j("mesbook1_c");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* 显示消息提示层
* sMsg : 消息内容（必传递参数）
* boxType : 消息框类型（ok - 确认，info - 消息提示，yesno - 确定或取消对话框，error - 错误警告 ）
* autoClose : 自动关闭消息框延时(秒)，传递null表示不自动关闭
* focusElmId : 关闭消息框后将获得焦点的元素的ID，传递null则取消该操作
* sTitle : 消息框标题
* behavior : 传递一个 Function 对象，当关闭消息框后调用该函数
********************/
function $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    if (boxType == null) {
        boxType = 2;
    }
    if (autoClose == null) {
        autoClose = -1;
    }
    //标题
    if (sTitle == null) {
        sTitle = "消息提示";
    }

    hideDdl();
    var jMesbook1 = $j("mesbook1");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1'>"
				+ "<div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1Icon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title='' /></dt>"
					+ "<dd class='l_25' id='mesbook1Msg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1AutoClose'>此窗口<span id='mesbook1Delay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>"
					+ "<dd id='mesbook1Btns'>"
					+ "<input type='button' class='b15' value='关 闭' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1");
    var jMesbook1ImgClose = $j("mesbook1ImgClose");
    var jMesbook1Icon = $j("mesbook1Icon");
    var jMesbook1Msg = $j("mesbook1Msg");
    var jMesbook1AutoClose = $j("mesbook1AutoClose");
    var jMesbook1Delay = $j("mesbook1Delay");
    var jMesbook1Title = $j("mesbook1Title");
    var jMesbook1Btns = $j("mesbook1Btns");

    jMesbook1Title.html(sTitle);
    //消息内容
    jMesbook1Msg.html(sMsg);
    //图标
    var iconPath = SKIN_PATH + "Img/";
    switch (boxType) {
        case 1: iconPath += "ico_ok.gif"; break;
        case 2: iconPath += "ico_info.gif"; break;
        case 3: iconPath += "ioc_ques.gif"; break;
        case -1: iconPath += "ico_error.gif"; break;
        default: iconPath += "ico_normal.gif"; break;
    }
    jMesbook1Icon.attr("src", iconPath);

    //关闭按钮
    var okBtn = jMesbook1Btns.find("input");
    okBtn.removeAttr("onclick");
    okBtn.click(function() {
        hideMsg();
        if (focusElmId != null){
            $j(focusElmId).focus();
        }
        if (behavior != null) {
            behavior();
        }
    });
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function() {
        hideMsg();
        if (focusElmId != null){
            $j(focusElmId).focus();
        }
        if (behavior != null) {
            behavior();
        }
    });
    okBtn.focus();

    //显示
    showFullBg();
    setCM("mesbook1");
    //relocation("mesbook1");
    jMesbook1.fadeIn(80);
}

function showMsgPage(msg, msgType, btnHref, btnTitle, defaultHref, delay) {
    if (msgType == null) {
        msgType = "Information";
    } else {
        switch (msgType) {
            case 1: msgType = "Successful"; break;
            case 2: msgType = "Information"; break;
            case 3: msgType = "Question"; break;
            case -1: msgType = "Failed"; break;
            default: msgType = "Information"; break;
        }
    }
    if (btnHref == null) {
        btnHref = "/";
    }
    if (btnTitle == null) {
        btnTitle = "首页";
    }
    if (defaultHref == null) {
        defaultHref = "/";
    }
    if (delay == null) {
        delay = 9;
    }
    var url = "/Tools/Message.aspx?result=" + msgType
    + "&btntitle=" + encodeURI(btnTitle) + "&btnhref=" + encodeURI(btnHref) + "&defaulthref=" + encodeURI(defaultHref)
    + "&delay=" + delay + "&msg=" + encodeURI(msg);
    location.href = url;
}
/********************
* 隐藏消息提示层
********************/
function hideMsg() {
    showDdl();
    var jShadow = $j("mesbook1");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* 设置层绝对居中（水平，垂直）setCenterMiddle
* elmId : 元素ID或元素
* speed : (可选)渐变进入的速度
********************/
function setCM(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
   	var $w = $(window);
   	var top = $w.height()/2+$w.scrollTop();
    //jElm.css({ "top": top+"px", "margin-top" : "0px !important", "left": "50%", "margin-left": "-" + w + "px" });
    jElm.css({ top: top+"px", marginTop : "0px", left: "50%", marginLeft: (-w) + "px" });
    var isIE=navigator.userAgent.toUpperCase().indexOf("MSIE")==-1?false:true;
		
		$w.scroll(function(){
			var top = $w.height()/2+$w.scrollTop();
			jElm.css({'top':top+'px'});
		});
    //if(isIE){
        jElm.css({ "position": "absolute", "z-index": "999" });
//    }else{
//        jElm.css({ "position": "fixed", "z-index": "999"});
//    }
    jElm.fadeIn(speed);
}

function setCMS(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    var height=document.documentElement.scrollTop;
    if(height>100)
    {
        jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    }
    else
    {
        h=200;
        jElm.css({ "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    }

    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}

/********************
* 显示一个全屏灰度背景
* elmId : 元素ID或元素
********************/
function showFullBg(elmId, isHideDdl, opacity, bgColor, zIndex, speed, behavior) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $j(elmId);
    if (jElm.length == 0) {
        var sHtml = "<div style='position:absolute;top:0;left:0;display:none;' id='" + elmId + "'></div>";
        $(document.body).append(sHtml);
    }
    if (opacity == null) {
        opacity = 0.75;
    }
    if (bgColor == null) {
        bgColor = "#777";
    }
    if (zIndex == null) {
        zIndex = "9";
    }
    if (speed == null) {
        speed = 80;
    }
    if (isHideDdl == null) {
        isHideDdl = true;
    }
    var jElm = $j(elmId);
    var dd = document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH){
        sHeight = cH;
     }
    if (sWidth < cW){
        sWidth = cW;
    }
    jElm.css({ "z-index": zIndex, "background": bgColor, "opacity": opacity, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity * 100 + ")" });
    jElm.css({ "height": sHeight, "width": sWidth });
    if (isHideDdl) {
        hideDdl(null, behavior);
    }
    jElm.fadeIn(speed);
    if (behavior != null) {
        behavior();
    }
}
/********************
* 隐藏全屏灰度背景
* speed : (可选)渐变消退的速度
********************/
function hideFullBg(elmId, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    if (speed == null) {
        speed = 80;
    }
    var jElm = $j(elmId);
    jElm.fadeOut(speed);
    showDdl();
}
//关闭层
//cntrId : 层ID
//bgId : 背景层ID
function $closeLayer(cntrId, bgId) {
    $j(cntrId).fadeOut(80, function() { hideFullBg(bgId); });
}
/********************
* 限制文本框字符长度，一个中文占两个长度（该函数一般用于多行文本框）
* src : 触发事件的源元素
* 使用方法如 <textarea max="100" onkeyup="limitLength(this)"></textarea>
********************/
function limitLength(src) {
    var value = src.value;
    var byteLength = parseInt($(src).attr("max"));
    var attribute = src.id;
    var newvalue = value.replace(/[^\x00-\xff]/g, "**");
    var length = newvalue.length;

    //当填写的字节数小于设置的字节数
    if (length * 1 <= byteLength * 1) {
        return;
    }
    var limitDate = newvalue.substr(0, byteLength);
    var count = 0;
    var limitvalue = "";
    for (var i = 0; i < limitDate.length; i++) {
        var flat = limitDate.substr(i, 1);
        if (flat == "*") {
            count++;
        }
    }
    var size = 0;
    var istar = newvalue.substr(byteLength * 1 - 1, 1); //校验点是否为“×”

    //if 基点是×; 判断在基点内有×为偶数还是奇数 
    if (count % 2 == 0) {
        //当为偶数时
        size = count / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    } else {
        //当为奇数时
        size = (count - 1) / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    }
    alert("最大输入" + byteLength + "个字节（相当于" + byteLength / 2 + "个汉字）！");
    document.getElementById(attribute).value = limitvalue;
    return;
}
/********************
* 根据元素ID获取元素对象(document.getElementById)
* elmId : 元素ID
********************/
function $g(elmId) { return document.getElementById(elmId); };
/********************
* 根据元素名称获取元素对象集(document.getElementsByName)
* nm : 元素name
********************/
function $name(nm) { return document.getElementsByName(nm); };
/********************
* 根据元素标签从指定容器获取元素对象集(document.getElementsByTagName)
* cntr : 容器，可以是元素对象、元素ID
* tagName : 标签名称
********************/
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object){ o = $g(cntr);}
    return o.getElementsByTagName(tagName);
}
/********************
* 限制文本框只能输入数字(数字键)
* e : event
********************/
function digiKeyOnly(e) {
    var key = window.event ? event.keyCode : e.which;
    if (key < 27 || key > 128){
        return true;
    }else if (key >= 48 && key <= 57){
        return true;
    }else{
        return false;
    }
}
/********************
* 限制文本框只能输入数字
* src : 触发事件的源元素
* 使用方法如 <input onkeyup="digiOnly(this)" />
********************/
function digiOnly(src) {
    src.value = src.value.replace(/[^0-9]/g, '');
}
/********************
* 打开窗口
* url : URL
* w : 窗口宽度（不传递则默认为300px）
* h : 窗口高度（不传递则默认为300px）
* features : 关于窗口的更多属性（可先，不传递该参数或传递null则默认为无工具栏、无菜单栏、可拖放、有滚动条、纵横坐标为0）
********************/
function $o(url, w, h, features) {
    if (url == null || url == ""){
        return;
    }
    if (w == null){
        w = "300";
    }
    if (h == null){
        h = "300";
    }
    if (features == null){
        features = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0;top=0,left=0";
    }
    if (w){
        features += ",width=" + w;
    }
    if (h){
        features += ",height=" + h;
    }
    window.open(url, "", features, false);
}
/********************
* 清空文本框内容
* cntrId : 容器ID，不传递则以body为容器
********************/
function emptyText(cntrId) {
    var jTxts;
    if (cntrId == null){
        jTxts = $("body").find("input[type=text]");
    }else{
        jTxts = $j(cntrId).find("input[type=text]");
    }
    var jTxtss;
    if (cntrId == null){
        jTxtss = $("body").find("input[type=password]");
    }else{
        jTxtss = $j(cntrId).find("input[type=password]");
    }
    jTxts.each(function() {
        $(this).attr("value", "");
    });
    jTxtss.each(function() {
        $(this).attr("value", "");
    });
    if (cntrId == null)
        jTxts = $("body").find("textarea");
    else
        jTxts = $j(cntrId).find("textarea");
    jTxts.each(function() {
        $(this).attr("value", "");
    });
}
/********************
* COOKIE操作
* 重载1 只传递name : 根据键名获取cookie值
* 重载2 传递name, value : 设置cookie,默认过期时间为9986400000
* 重载3 传递name, value, expire : 设置cookie并指定过期时间
* 重载4 传递name, value(bool) : 根据键名删除cookie
* name : cookie 键名 : 
* val : cookie值
* expire : cookie过期时间
********************/
$cookie = function(name, val, expire) {
    if (val == null && expire == null) {
        var search = name + "=";
        begin = document.cookie.indexOf(search);
        if (begin != -1) {
            begin += search.length;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return document.cookie.substring(begin, end);
        }
        return null;
    } else if (typeof (val) == "boolean") {
        $cookie(name, "", -999999);

    } else {
        if (expire == null){ expire = 9986400000;}
        var today = new Date();
        var expireDay = new Date();
        var msPerMonth = expire;
        expireDay.setTime(today.getTime() + msPerMonth);
        document.cookie = name + "=" + val + ";expires=" + expireDay.toGMTString();
    }
};
/********************
* 查询URL参数（查询失败则返回空字符串）
* paraNm : 参数名
********************/
function $qs(paraNm) {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; ++i) {
        var pos = pairs[i].indexOf('=');
        if (!pos) continue;
        var paraNm2 = pairs[i].substring(0, pos);
        var vlu = pairs[i].substring(pos + 1);
        vlu = decodeURIComponent(vlu);
        args[paraNm2] = vlu;
    }
    return args[paraNm] == null ? "" : args[paraNm];
}
/********************
* 全选复选框或取消全选（根据触发事件的源对象的选中状态而定）
* src : 触发事件的源对象
* cntrId : 容器ID
********************/
function selectAll(src, cntrId) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        chks[i].checked = src.checked;
    }
}
/********************
* 反选复选框
* cntrId : 容器ID
********************/
function invertSelect(cntrId) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        chks[i].checked = !chks[i].checked;
    }
}
function getPageFilename() {
    var path = location.pathname;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    return filename;
}
function getRawUrl() {
    var path = location.href;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    pos = filename.lastIndexOf('#');
    filename = filename.substring(0, pos);
    return filename;
}
function getIntactRawUrl() {
    var path = location.href;
    var pos;
    pos = path.lastIndexOf('#');
    path = path.substring(0, pos);
    return path;
}
/********************
* 附加参数到现URl
* name : 参数名
* val : 参数值
********************/
function toggleArg(name, val) {
    var url = $$.intactRawUrl();
    var pos = url.indexOf('?');
    if (pos == -1) {
        return url + "?" + name + "=" + val;
    } else {
        var args = url.substring(pos);
        var path = url.substring(0, pos);
        var patten = new RegExp("&?" + name + "=?\\w*\\[?\\w*\\]?\\|?\\d?", "i");
        args = args.replace(patten, "");
        if (args.length == 1) {//没有任何参数，只有?
            args += name + "=" + val;
        } else {
            args += "&" + name + "=" + val;
        }
        return path + args;
    }
};
/********************
* 渐大/小，渐出/入一个元素
* elmId : 元素ID
* visibility : 显现或隐藏
********************/
function increase(elmId, visibility) {
    if (visibility == null){
        visibility = "show";
     }
    var jO = $j(elmId);
    jO.animate({
        height: visibility,
        width: visibility,
        opacity: visibility
    }, "fast");
}
/********************
* 渐出/入一个元素(当元素可见则入，反之则出)
* elmId : 元素ID
* speed : 速度
********************/
function fadeToggle(elmId, speed) {
    if (speed == null) {speed = "fast"};
    if ($("#" + elmId).is(":visible")){ $("#" + elmId).fadeOut(speed)}
    else{ $("#" + elmId).fadeIn(speed)};
}
/********************
* 当元素获得焦点时，高亮显示
* cntrId : 容器ID
* focusClass : 高亮时的样式我
********************/
function clearAllElms(cntrId, focusClass) {
    clearDdls(cntrId, focusClass);
    clearTextBoxes(cntrId, focusClass);
    clearRdos(cntrId, focusClass);
    clearChks(cntrId, focusClass);
}
function clearRdos(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=radio]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearChks(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=checkbox]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearDdls(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("select");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearTextBoxes(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=text]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
    var txts = $j(cntrId).find("input[type=password]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
    txts = $j(cntrId).find("textarea");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
/********************
* 增加书签
* url : URL
* title : 收藏项目的标题
********************/
function addBookmark(url, title) {
    if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else if (document.all) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
}

function addBookmark() {
    var title = document.title;
    var url = document.URL;
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}


//加入收藏
function BookMarkit() {
    var url = "http://" + window.location.host;
    var title = document.title;
    if (document.all) {
        window.external.addFavorite(url, title);
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
}

/********************
* 根据值选中下拉列表项
* ddlId : 下拉列表元素ID
* val : 值
********************/
function setSelectByValue(ddlId, val) {
    var ddl = $g(ddlId);
    for (var i = 0; i < ddl.options.length; ++i) {
        var opt = ddl.options[i];
        opt.selected = (opt.value == val);
    }
}
/********************
* 显示验证码
********************/
function showVerifyCode(elmId, msgElmId, imgId, chgLnkId) {
    if (elmId == null){
        elmId = "spVerCode";
     }
    if (msgElmId == null){
        msgElmId = "spVerCodeMsg";
     }
    if (imgId == null){
        imgId = "imgVerCode";
    }
    if (chgLnkId == null){
        chgLnkId = "spChgVerCode";
     }
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    var jChgLnk = $j(chgLnkId);
    if (jImg.html() == "") {
        jMsg.html("正在加载验证码...");
        jMsg.show();
        jImg.html("<img src='/Tools/ValidCode.aspx' style='display:none;' id='" + imgId + "' alt='验证码' />");
    }
    var jVerCode = $j(imgId);
    jVerCode.load(function() {
        jMsg.hide();
        jVerCode.show();
        jChgLnk.show();
    });
}
/********************
* 更换验证码
********************/
function changeVerCode(elmId, msgElmId) {
    if (elmId == null){
        elmId = "imgVerCode";
    }
    if (msgElmId == null){
        msgElmId = "spVerCodeMsg";
    }
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    jMsg.html("正在刷新验证码...").show();
    jImg.attr({ src: "/Tools/ValidCode.aspx?x=" + Math.random(), alt: "验证码" });
    jImg.hide();
    jImg.load(function() {
        jMsg.hide();
        jImg.show();
    });
}
/********************
* 显示正在处理的图标
* src : 触发事件的源对象
* show : 显示/隐藏
********************/
function showProc(src, show) {
    var oImg = $j("imgProc");
    if (show == null){
        show = true;
     }
    if (show) {
        $(src).hide();
        if (oImg.length > 0){
            oImg.remove();
        }
        $("<img src='" + SKIN_PATH + "img/processing.gif' id='imgProc' alt='正在处理' />").insertAfter(src);
    } else {
        $(src).show();
        oImg.remove();
    }
}
/********************
* 放大字体
* el : 放大/缩小
********************/
function enlarge(el, elmId) {
    if (el == null){
        el = true;
    }
    if (elmId == null) {
        elmId = "Content";
    }
    var o = $j(elmId);
    var fontSize = parseInt(o.css("font-size"));
    var newFontSize = (el ? fontSize * 1.2 : fontSize / 1.2);
    o.css("font-size", newFontSize + "px");
}
/********************
* 奇偶行变色
* el : 放大/缩小
* escapeRows : 忽略最首行数
* tabName : 表ID
* odd : 奇行的样式或样式类名
* even : 偶行的样式或样式类名
********************/
function altRow(escapeRows, tabName, odd, even) {
    var rows = $tag(tabName, "tr");
    for (var i = escapeRows; i < rows.length; ++i) {
        var argSty;
        if (i % 2 == 0) argSty = even;
        else argSty = odd;
        if (typeof (argSty) == "object") {
            for (var sty in argSty) {
                rows[i].style[sty] = argSty[sty];
            }
        } else {
            rows[i].className = argSty;
        }
    }
}
/********************
* 获取容器里已选中复选/单选按钮的值
* cntrId : 容器ID
* escapeRows : 忽略最首行数
********************/
function getCheckedVal(cntrId, escapeRows) {
    if (escapeRows == null) {
        escapeRows = -1;
    }
    var chks = $j(cntrId).find("input:checked");
    var rtnVal = "";
    var flag = false;
    chks.each(function(i) {
        if (i > escapeRows) {
            if (flag) {
                rtnVal += ",";
            }
            rtnVal += $(this).val();
            flag = true;
        }
    });
    return rtnVal;
}
function checkAll(src, cntrId) {
    var chks = $j(cntrId).find("input[type=checkbox]");
    chks.each(function(i) {
        this.checked = src.checked;
    });
}
//根据字段列表获取查询页面路径字符串
//FieldList格式：控件ID名称,查询字段名称|控件ID名称1,查询字段名称1|.. 
function GetSearchURL(FieldList, URL) {
    //1\定义变量
    if (URL == null) {
        URL = getIntactRawUrl();
    }

    //2\循环把变量列表取出来,组合成URL
    var TempFieldList = FieldList.split("|");
    for (var i = 0; i < TempFieldList.length; i++) {
        //1>寻找控件
        var control1 = TempFieldList[i].split(",");
        var controlname;
        var control = document.getElementById(control1[0]);
        if (control1.length == 2) { controlname = control1[1]; } else { controlname = control1[0]; }
        if (control != null) {
            //2>取出控件的值
            var controlvalue = control.value;
            //3>设置URL
            if (controlvalue != null) {
                URL += "&" + controlname + "=" + encodeURIComponent(controlvalue);
            }
        }
    }
    return URL;
}
function SearchObjectByGet(FieldList, url, getUrlOnly) {
    if (getUrlOnly == null) {
        getUrlOnly = false;
    }
    var newUrl = GetSearchURL(FieldList, url);
    if (getUrlOnly) {
        return newUrl;
    }
    window.location.href = newUrl;
}


function SearchObjects(kwd, objtype) {
    if(kwd=="请填写关键词"||kwd=="请输入关键词")
    {
        $a("您还没有输入关键词，请填写后查询。");
        return;
    }
    if (objtype == "product") {
        var URL = "/Search/Index.aspx?objtype=product&kwd=" + escape(kwd);
        window.location.href = URL;
    }
    else {
        var URL = "/Search/News.aspx?objtype=news&kwd=" + escape(kwd);
        window.location.href = URL;
    }

}

//跳转到某页
//参数：参训参数
//		参数值
function GoToURL(FieldName, FieldValue) {
    var URL;
    URL = SetURLField(URL, FieldName, FieldValue);
    location.href = URL;
}
//跳转到某页
//参数：参训参数
//		参数值
function GoToURLByGet(FieldName, FieldValue) {
    //1\定义变量
    var URL;
    URL = location.href;

    //2\获取地址参数
    URL = SetURLField(URL, "page", "1");
    URL = SetURLField(URL, FieldName, FieldValue);

    //3\递交数据
}
//设置地址栏的参数
function SetURLField(URL, FieldName, FieldValue) {
    //1\把当前的超链接地址取出来
    var FindPlace;
    //2\如果？号后面没有字符串,则在?后面添加查询的字段 
    FindPlace = URL.indexOf("?");

    if (FindPlace == -1) {
        URL += "?" + FieldName + "=" + FieldValue;
    }
    else {
        //3\如果?后面有查询字符串,则检测有没有该字段，如果有，则重新付值
        var search = FieldName + "=";
        var offset = URL.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = URL.indexOf("&", offset);
            if (end == -1) {
                URL = URL.substring(0, offset) + FieldValue;
            }
            else {
                URL = URL.substring(0, offset) + FieldValue + URL.substring(end);
            }
        }
        else {
            URL = URL + "&" + FieldName + "=" + FieldValue;
        }
    }
    return URL;

}

//读取地址栏的参数值
//参数：参数名称
function readURLParameter(FieldName) {
    var search = FieldName + "=";
    var FieldValue = "";
    var URL = location.href;
    var offset = URL.indexOf(search);
    if (offset != -1) {
        offset += search.length;
        end = URL.indexOf("&", offset);
        if (end == -1) {
            FieldValue = URL.substring(offset);
        }
        else {
            FieldValue = URL.substring(offset, end);
        }
    }
    return FieldValue;
}
/********************
* 当一个文本框第一次获得焦点时清空自己的文本，该文本框默认有一个属性和事件：hadfocused="0" onfocus="focusToRemoveText(this)"
* src : 触发事件的源元素
********************/
function focusToRemoveText(src) {
    var jSrc = $(src);
    var hadFocused = (jSrc.attr("hadfocused") == "1");
    if (!hadFocused) {
        jSrc.val("");
        jSrc.attr("hadfocused", "1");
    }
}
//输出动态表单
//surObj : 投票对象
function SUR_ShowTable(surObj) {
    var sHtml = "";
    //投票模式（单选/复选）
    var inputType;
    switch (surObj.SelectionMode) {
        case 1: inputType = "radio"; break;
        case 2: inputType = "checkbox"; break;
    }
    //输出内容
    switch (surObj.ShowMode) {
        case 1:
            sHtml = "<div class=\"survey_1\" style=\"width:" + surObj.Width + "px;\">"
                + "<div class=\"sur_tit\" style=\"width:" + (surObj.Width - 2) + "px;\">" + surObj.Title + "</div>"
                + "<table class=\"sur_tab\" id=\"SUR_itemTab_" + surObj.SubjectId + "\">";
            for (var i = 0; i < surObj.Items.length; ++i) {
                var obj = surObj.Items[i];
                var inputId = "SUR_item_" + surObj.SubjectId + i;
                sHtml += "<tr>"
                + "<td><input name=\"SUR_item" + surObj.SubjectId + "\" type=\"" + inputType + "\" value=\"" + obj.id + "\" id=\"" + inputId + "\" /></td>"
                + "<td><label for=\"" + inputId + "\">" + obj.title + "</label></td>"
                + "</tr>";
            } // end for
            sHtml += "</table>"
                + "<div class=\"bot_btn2\">"
                + "<input type=\"button\" value=\"提交\" class=\"b15\" onclick=\"SUR_senddata(this," + surObj.ObjectName + ")\" />"
                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"查看\" class=\"b16\" />"
                + "</div>"
                + "</div>";
            break;
    } // end switch
    document.write(sHtml);
}

//提交投票
//参数：src : 触发方法的源对象
//surObj : 投票对象
function SUR_senddata(src, subObj) {
    var msgElmId = "SUR_post_msg_" + subObj.SubjectId;
    var s = "<span id='" + msgElmId + "'>正在提交,请稍后...</span>";
    var url = "/ajax.ashx?action=Survey&t=" + Math.random();
    var checkedVla = getCheckedVal("SUR_itemTab_" + subObj.SubjectId);
    if (checkedVla == null || checkedVla.length == 0) {
        $a("您至少需要选中一个投票项。");
        return;
    }
    $(src).after(s).hide();
    $.post(url, {
        _SUR_SubjectID: subObj.SubjectId,
        _CheckedItems: checkedVla
    }, function(rsp) {
        var sta = gav(rsp, "state");
        var sMsg = gav(rsp, "msg");
        if (sta == "1") {
            $confirm("投票成功，感谢您的参与。", { title: "确定", toDo: function() { hideConfirm(); } }, { title: "查看结果", toDo: function() { window.open("/tools/survey.aspx?oid=" + subObj.SubjectId); hideConfirm(); } });
        } else {
            $a(sMsg);
        }
        $j(msgElmId).remove();
        $(src).show();
    });
}
//输出留言表单
//surObj : 对象ID
function LEW_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"LEAVEWORD_cntr\" style=\"margin:0 auto 10px auto;\">"
            + "<h1>留言</h1>"
            + "<table id=\"LEAVEWORD_tab\">"
            + "<tr>"
            + "<th>* 标题：</th>"
            + "<td><input type=\"text\" size=\"40\" id=\"LEAVEWORD_txtTitle\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 联系人：</th>"
            + "<td><input type=\"text\" size=\"10\" id=\"LEAVEWORD_txtContact\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>联系电话：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtTel\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>手机号码：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtMobile\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 电子邮箱地址：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtEmail\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 留言分类：</th>"
            + "<td id=\"LEAVEWORD_tdCats\"></td>"
            + "</tr>"
            + "<tr>"
            + "<th>留言内容：</th>"
            + "<td><textarea style=\"width:230px;height:80px;\" id=\"LEAVEWORD_txtShortDesc\"></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<th>&nbsp;</th>"
            + "<td>"
            + "<input type=\"button\"  value=\"提交\" class=\"b15\" onclick=\"sendLeaveword(this)\" /> "
            + "</td>"
            + "</tr>"
            + "</table>"
            + "</div>";
    document.write(sHtml);
    fillLeavewordCategories();
    //    //输出内容
    //    switch (surObj.ShowMode) {
    //        case 1:
    //            sHtml = "<div class=\"survey_1\" style=\"width:" + surObj.Width + "px;\">"
    //                + "<div class=\"sur_tit\" style=\"width:" + (surObj.Width - 2) + "px;\">" + surObj.Title + "</div>"
    //                + "<table class=\"sur_tab\" id=\"SUR_itemTab_" + surObj.SubjectId + "\">";
    //                + LEW_GetFields(surObj.Fields)
    //                + "</table>"
    //                + "<div class=\"bot_btn2\">"
    //                + "<input type=\"button\"  value=\"关闭\" class=\"b18 fr\" onclick=\"$('#LEAVEWORD_cntr>h1>a').click()\" /> "
    //                + "<input type=\"button\" value=\"提交\" class=\"b15\" onclick=\"sendLeaveword(this," + surObj.ObjectName + ")\" />"
    //                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"查看\" class=\"b16\" />"
    //                + "</div>"
    //                + "</div>";
    //            break;
    //    } // end switch
}
////获取留言HTML
//function LEW_GetFields(fieldStr) {
//    var template = "<tr>"
//                + "<td>{$item_name$}：</td>"
//                + "<td><input type=\"" + inputType + "\" id=\"" + inputId + "\" /></td>"
//                + "</tr>";
//    var rtnVal = "";
//    var fieldsCrumb = fieldStr.split("||");
//    for (var i = 0; i < fieldsCrumb.length; ++i) {
//        var itemNameCrumb = fieldsCrumb[i].spalit("$$");
//        var itemName;
//        var itemReName;
//        if (itemNameCrumb.length == 2) {
//            itemName = itemNameCrumb[0];
//            itemReName = itemNameCrumb[1];
//        } else {
//            itemName = itemNameCrumb[0];
//            itemReName = itemNameCrumb[0];
//        } // end if
//        if (itemName != "留言内容" && itemName != "留言分类") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td><input size=\"30\" type=\"text\" id=\"" + LEW_GetFieldId(itemName) + "\" /></td>"
//                + "</tr>";
//        } else if (itemName == "留言内容") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td><textarea style=\"width:230px;height:80px;\" id=\"" + LEW_GetFieldId(itemName) + "\"></textarea></td>"
//                + "</tr>";
//        } else if (itemName == "留言分类") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td id=\"LEAVEWORD_tdCats\"></td>"
//                + "</tr>";
//        } // end if
//    } // end for
//}
////根据留言字段名称获取元素ID
//function LEW_GetFieldId(itemName) {
//    var rtnVal = "";
//    var prefix = "LEAVEWORD_";
//    switch (itemName) {
//        case "标题": rtnVal = prefix + "txtTitle"; break;
//        case "联系人": rtnVal = prefix + "txtContact"; break;
//        case "联系电话": rtnVal = prefix + "txtTel"; break;
//        case "手机号码": rtnVal = prefix + "txtMobile"; break;
//        case "电子邮箱地址": rtnVal = prefix + "txtEmail"; break;
//        case "留言分类": rtnVal = prefix + "ddlCats"; break;
//        case "留言内容": rtnVal = prefix + "txtShortDesc"; break;
//    }
//    return rtnVal;
//}
//输出留言表单
//surObj : 对象ID
function PAY_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"DIR_PAY_cntr\" style=\"margin:0 auto 10px auto;\">"
        + "<h1>付款</h1>"
        + "<table id=\"DIR_PAY_tab\" style=\"background:url(" + SKIN_PATH + "img/Pay_ico.gif) no-repeat right top;width:400px;\">"
        + "<tr>"
        + "<tr>"
        + "<th>* 付款方式：</th>"
        + "<td><select id=\"DIR_PAY_ddlPayment\"><option value=\"\">请选择</option>"
        + "<option value=\"alipay\">支付宝</option>"
        + "<option value=\"99bill\">快钱</option>"
        + "</select>"
        + "</td>"
        + "</tr>"
        + "<th>* 付款人：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtPayer\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 电子邮箱地址：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtEmail\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>联系电话：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtTel\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>手机号码：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtMobile\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>我公司业务员姓名：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtSalesManName\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 付款金额：</th>"
        + "<td><input type=\"text\" size=\"10\" id=\"DIR_PAY_txtMoney\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 款项用途：</th>"
        + "<td><input type=\"text\" size=\"40\" id=\"DIR_PAY_txtUse\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>&nbsp;</th>"
        + "<td>"
        + "<input type=\"button\"  value=\"提交\" class=\"b15\" onclick=\"directPay(this)\" /> "
        + "</td>"
        + "</tr>"
        + "</table>"
        + "</div>";
    document.write(sHtml);
}

//用户登陆
function LoginCheck(_username, _password) {

    var url = window.location;
    if (_username == undefined || _username.length == 0) {
        $a("请输入用户名", "错误提示", "txtUsername");
        return;
    }
    if (_password == undefined || _password.length == 0) {
        $a("请输入密码", "错误提示", "txtPassword");
        return;
    }
    $.post("/ajax.ashx?action=logincheck&t=" + Math.random(), {
        username: _username,
        password: _password
    },
       function(msg) {
           if (gav(msg, "state") == "1") {
               $a(gav(msg, "msg"));
               window.location.href = url;
           }
           else {
               $a(gav(msg, "msg"));
           }
           ;
       });
}
