/******************************************************************************
* filename: Common.js
* Ajax Modul Scripting


*******************************************************************************/
/********************
* 初始化头部信息，如购物车产品总数，登录状态等
* 回应 : XML对象
********************/
function resrt(str)
{

    str=str.toLocaleString().replace("","");
     str=str.toLocaleString().replace( "& ", "&amp; ");
    str=str.toLocaleString().replace( " ' ", "&#39; ");
    str=str.toLocaleString().replace( "alert", "&#34; ");
    str = str.toLocaleString().replace("script", "&#34; ");
    str=str.toLocaleString().replace( " < ", "&lt");
    str=str.toLocaleString().replace( "> ", "&gt");
    str=str.toLocaleString().replace("where", "$1h&#101;re ");
    str=str.toLocaleString().replace("select", "$1el&#101;ct ");
    str=str.toLocaleString().replace("insert", "$1ns&#101;rt ");
    str=str.toLocaleString().replace("create", "$1r&#101;ate ");
    str=str.toLocaleString().replace("drop","$1ro&#112; ");
    str=str.toLocaleString().replace("alter", "$1lt&#101;r ");
    str=str.toLocaleString().replace("delete", "$1el&#101;te ");
    str=str.toLocaleString().replace("update", "$1p&#100;ate ");
    str = str.toLocaleString().replace("and", "$1h&#101;nd ");
    str = str.toLocaleString().replace("</title>", "$1h&#101;nd ");
    str = str.toLocaleString().replace("</head>", "$1h&#101;nd ");
    str = str.toLocaleString().replace("</body>", "$1h&#101;nd ");
   
}

function xuanze() {
    
    var xz =document.getElementById('seachkeywords').value;
   
    if (xz.length == 0) {
        xz = "";
    }
    window.location.href = '/Search/Index.aspx?objtype=product&kwd=' + xz;
}
function ShowNewPhotoId(id) {
    $.post("/ajax.ashx?action=ShowNewPhoto&t=" + Math.random(), {
        id: id
    }, function (msg) {
        var sMsg = gav(msg, "msg");
        var sta = gav(msg, "state");
        if (sta == 1) {
            $j("csscontent").html(sMsg);
        }

    });
}

 var flag=false; 
function DrawImage(ImgD,wcc,hcc,showcc){ 
  var image=new Image(); 
  image.src=ImgD.src; 
  if(image.width>0 && image.height>0){ 
    flag=true; 
    if(image.width/image.height>= wcc/hcc){ 
       if(image.width>wcc){
        ImgD.width=wcc; 
        ImgD.height=(image.height*wcc)/image.width; 
       }else{ 
        ImgD.width=image.width;
        ImgD.height=image.height; 
       } 
  // ImgD.alt=image.width+"x"+image.height; 
   if(showcc==1)
   {
       if(hcc>ImgD.height&&wcc>ImgD.width)
       {
       ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 "+(wcc-image.width)/2+"px";
       }
       else if(hcc>ImgD.height)
       {
        ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 0";
       }
       else if(wcc>ImgD.width)
       {
       ImgD.style.padding="0 0 0 "+(wcc-ImgD.width)/2+"px";
       }
    
   }
   
  // ImgD.style.padding-top=(185-image.height)/2+"px";
  } 
  else{ 
   if(image.height>hcc){
    ImgD.height=hcc; 
    ImgD.width=(image.width*hcc)/image.height; 
   }else{ 
    ImgD.width=image.width;
    ImgD.height=image.height; 
   } 
   //ImgD.alt=image.width+"x"+image.height; 
    if(showcc==1)
   {
    if(hcc>ImgD.height&&wcc>ImgD.width)
       {
       ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 "+(wcc-ImgD.width)/2+"px";
       }
       else if(hcc>ImgD.height)
       {
        ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 0";
       }
       else if(wcc>ImgD.width)
       {
       ImgD.style.padding="0 0 0 "+(wcc-ImgD.width)/2+"px";
       }
   }
  } 
 }
}




function initCommonHeader() {
    $.get("/ajax.ashx?action=initcommonheader&t=" + Math.random(), function(rsp) {
       // $j("headerCartCount").html(gav(rsp, "prod_count"));
        var IM = gav(rsp, "showIM");
        showIM(IM);
        var username = gav(rsp, "username");
        if (username.length > 0) {
            $j("commonHeaderGuest").hide();
            $j("commonHeaderUsername").html(username);
            $j("commonHeaderUser").fadeIn(80);
        }
    });
}


//是否显示在线客服
function showIM(res) {
    if ($("#bodd").html() != "") {
        if (res == "True") {
            $("#bodd").show();
            $("#kefubtn").hide();
            $("#divOranIm").show();
        }
        else {
            $("#bodd").hide();
            $("#kefubtn").show();
            $("#divOranIm").hide();
        }
    }
}


//初始化头部热门关键词
function initCommonHeaderKeywords(_s) {
    if (_s == "") _s = "6";
    $.post("/ajax.ashx?action=initcommonheaderkeywords&t=" + Math.random(), {
        s: _s
    }, function(msg) {
        $j("commonHeaderkeywords").html(msg);
    });
}
/********************
* 添加产品到购物车
* src : 触发事件的源对象
* _pid : 产品ID
* qutiElmId : 数量（重载：number购买数量、string数量的文本框元素ID）
* atts : 附加属性
* reloadCartPage : (可选)是否询问重新刷新购物车首页
* redirectUrl : (可选)当产品添加成功后，跳转到的页面（优先权高）
* 回应 : XML对象
********************/
function addToCart(src, _pid, qutiElmId, _atts,_pidlist, reloadCartPage, redirectUrl) {
    showProc(src);
    if (reloadCartPage == null) {
        reloadCartPage = false;
    }
    _atts = $j(_atts).html();
    _pidlist = $j(_pidlist).val();
    var _quti;
    if (qutiElmId == null) {
        _quti = 1;
    } else if (typeof (qutiElmId) == "number") {
        _quti = qutiElmId;
    } else {
        _quti = $tv(qutiElmId);
    }
    if (_atts == null) {
        _atts = "";
    }
    if (_pidlist==null)
    {
        _pidlist = "";
    }
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: _quti,
        atts: _atts,
        pidlist: _pidlist
    }, function(msg) {
        var sMsg = gav(msg, "msg");
        var sCount = gav(msg, "count");
        var sta = gav(msg, "state");
        if (redirectUrl != null) {
            location.href = redirectUrl;
            return;
        }
        if (sta != "1") {
            $a(sMsg);
            showProc(src, false);
            return;
        }
        $confirm(sMsg, { title: "去结算", toDo: "/paycenter/cart.aspx" }, { title: "再选购", toDo: function() {
            hideConfirm();
        }
        });
        $j("headerCartCount").html(sCount);
        if (reloadCartPage && (gav(msg, "state") == 1) && confirm("添加到购物车成功，是否马上刷新页面购物车页面？\r\n\r\n是 - 刷新本页面查看最新结果\r\n否 - 保留当前页面状态")) {
            location.href = "cart.aspx?t=" + Math.random();
            return;
        }
        showProc(src, false);
    });
}
/********************
* 清空购物车
* src : 触发事件的源对象
* 回应 : string
*       1 - 成功
*       0 - 失败
********************/
function emptyCart(src) {
    showBgProc();
    $.get("/ajax.ashx?action=emptycart&t=" + Math.random(), function(msg) {
        if (msg == "1") {
            $a("清空购物车成功，单击确认返回产品中心。", 1, false, null, "消息", function() {
                location.href = "/product";
            });
        } else {
            $a("清空购物车失败，请稍候重试。");
        }
        showBgProc(false);
    });
}
/********************
* 清空购物车
* src : 触发事件的源对象
* _pid : 产品ID
* 回应 : xml
********************/
function changeQuantity(src, _pid,_attrs) {
    var newVal = $(src).parent().find("input").attr("value");
    if (!/^\d+$/.test(newVal)) {
        $a("数量必须是一个整数。");
        return;
    }
    if (parseInt(newVal) == 0) {
        $a("数量必须大于0，若要删商品，请点操作中的‘删除’。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: newVal,
        atts: _attrs
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("数量修改成功，是否马上刷新页面查看购物车结果？\n\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            } else {
                showBgProc(false);
                $(src).hide();
            }
        } else {
            $a(msg);
            showBgProc(false);
        }
    });
}
function delCartProduct(src, _pid, _atts) {
    showBgProc();
    var _quti = 0;
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        atts: _atts
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("商品已删除，是否马上刷新页面查看结果？\n\n\r\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            }
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
/********************
* 清空购物车
* src : 触发事件的源对象
* _pid : 产品ID
* 回应 : xml
********************/
function changeQuantity(src, _pid) {
    var newVal = $(src).parent().find("input").attr("value");
    if (!/^\d+$/.test(newVal)) {
        $a("数量必须是一个整数。");
        return;
    }
    if (parseInt(newVal) == 0) {
        $a("数量必须大于0，若要删商品，请点操作中的‘删除’。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: newVal
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("数量修改成功，是否马上刷新页面查看购物车结果？\n\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            } else {
                showBgProc(false);
                $(src).hide();
            }
        } else {
            $a(msg);
            showBgProc(false);
        }
    });
}
function delCartProduct(src, _pid, _atts) {
    showBgProc();
    var _quti = 0;
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        atts: _atts
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("商品已删除，是否马上刷新页面查看结果？\n\n\r\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            }
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function cancelOrder(src, _orderNo) {
    showBgProc();
    $.post("/ajax.ashx?action=cancelorder&t=" + Math.random(), {
        no: _orderNo
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $(src).parent().parent().parent().find("td[name=orderstate]").html("已取消");
            $(src).hide();
        } else {
            $a("<p>取消订单操作失败。</p><p>非‘待审核’状态、已锁定等订单不可取消。</p>");
        }
        showBgProc(false);
    });
}
function delFavColumn(src, _oid) {
    showBgProc();
    $.post("/ajax.ashx?action=delfavfolumn&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $(src).parent().parent().fadeOut(80).remove();
        } else {
            $a("操作失败，请稍候重试。");
        }
        showBgProc(false);
    });
}
function delMyWish(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delMyWishs&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function delMyDownloads(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delMyDownloads&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function addFav(src, _title, _url, _cat_id) {
    if (_url == null) {
        _url = location.pathname;
    }
    if (_title == null) {
        _title = document.title;
    }
    $.post("/ajax.ashx?action=fav&t=" + Math.random(), {
        url: _url,
        ptitle: _title,
        column_id: _cat_id
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            closeTopLayer('div_fav_cntr');
        } else {
            top.$a(sMsg, "2");
            closeTopLayer('div_fav_cntr');
        }
    });
}
function delFav(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delfav&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
function hits(_oid, _mark) {
    $.post("/ajax.ashx?action=hits&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    })
}


function postComment(src, _oid, _mark) {
    showProc(src);
    var _content = $tv("txtCmtContent");
    var _verCode = $tv("txtCmtVerCode");
    if (_content == "") {
        $a("内容必填。");
        showProc(src, false);
        return;
    }
    if ($g("txtVerCode") != null && s_verCode == "") {
        $a("验证码不可空。");
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=postcomment&t=" + Math.random(), {
        content: _content,
        oid: _oid,
        verCode: _verCode,
        mark: _mark
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "") {
            $a(msg, -1);
        } else if (sta == "2") {
            $a(sMsg, 1);
            emptyText('tbCmt');
        } else if (sta == "1") {
            var sTime = gav(msg, "time");
            var sUsername = gav(msg, "username");
            var sIp = gav(msg, "ip");
            var sComment = gav(msg, "comment");
            var sfeedback = gav(msg, "feedback");
            var num = gav(msg, "num");

  var htmlFmt = "<dl>"
                        +"<dt><img src=\"/Skins/Default/Img/head2.jpg\" /></dt>" 
						+ "<dd class='con'><p><b>{$username$}</b>说：</p><span class=\"comms\">{$content$}</span><p class=\"time\">发表于：{$time$}<p></dd>"					
						+ "<dd class='huifus'><h5>管理员回复：</h5><div>{$feedback$}</div></dd>"
					+ "</dl>";
            var sHtml = htmlFmt
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$feedback$}", sfeedback)
                .replace("{$content$}", sComment);
            var oldComments=$j("divComments").html();
            if(oldComments=="暂无评论")
            {
                oldComments="";
            }
            $j("divComments").html(sHtml + oldComments);
            $j("spCommentCount").html(num);
            $a(sMsg, 1);
            emptyText('tbCmt')

        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
    
}
function writeComment(_oid, _mark) {
    $.post("/ajax.ashx?action=getcomment&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    }, function(msg) {
        var iCount = $(msg).find("count").text();
        $j("spCommentCount").html(iCount);
        var commtns = $(msg).find("comment");
        var sHtml = "";
        var htmlFmt = "<dl>"
						   +"<dt><img src=\"/Skins/Default/Img/head2.jpg\" /></dt>" 
						+ "<dd class='con'><p><b>{$username$}</b>说：</p><span class=\"comms\">{$content$}</span><p class=\"time\">发表于：{$time$}<p></dd>"					
						+ "<dd class='huifus'><h5>管理员回复：</h5><div>{$feedback$}</div></dd>"
					+ "</dl>";
        for (var i = 0; i < commtns.length; ++i) {
            var jCmt = $(commtns[i]);
            var sUsername = jCmt.find("username").text();
            var sContent = jCmt.find("content").text();
            var sIp = jCmt.find("ip").text();
            var sTime = jCmt.find("inputTime").text();
            var sfeedback = jCmt.find("feedback").text();
            sHtml += htmlFmt
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$content$}", sContent)
                 .replace("{$feedback$}", sfeedback);
        }
        if (sHtml.length > 0) {
            $j("divComments").html(sHtml);
        } else {
            $j("divComments").html("暂无评论");
        }
    });
}
function addHistory(_oid, _mark) {
    $.get("/ajax.ashx?action=addhistory&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    });
}
function getAd(_keyname, cntrElmId) {
    $.post("/ajax.ashx?action=getadd", {
        keyname: _keyname
    }, function(msg) {
        $j(cntrElmId).html(msg);
    });
}
function getVideo(_videoKey) {
    $.post("/ajax.ashx?action=getvideo", {
        videoKey: _videoKey
    }, function(msg) {
        var jDiv = $j("divVideo");
        if (msg.length == 0) {
            jDiv.slideUp(80);
        } else {
            jDiv.html(msg);
            $(".prod_attrs").toggleClass("prod_attrs").toggleClass("prod_attrs_b");
        }
    });
}
function getOrderAnns() {
    $.get("/ajax.ashx?action=getorderanns", function(msg) {
        $j("divOrderAnns").html(msg);
    });
}
function getEndingRemark() {
    $.get("/ajax.ashx?action=getendingremark", function(msg) {
        $j("divEndingRemark").html(msg);
    });
}
function getHistory(_mark) {
 
    $.post("/ajax.ashx?action=gethistory&t=" + Math.random(), {
        mark: _mark
    }, function(msg) {
        if (msg.length == 0) {
            msg = "<li>&nbsp;&nbsp;无浏览历史</li>";
        }
        $j("divHistoryCntr").html(msg+"<div class='clear'></div>");
    });
}
function getHits(_oid, _mark) {
    $.post("/ajax.ashx?action=gethits", {
        mark: _mark,
        oid: _oid
    }, function(msg) {
        $j("cntrHits").html(msg);
    });
}
function getHelpStatic(_oid) {
    $.post("/ajax.ashx?action=helpsatisfaction&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var arrI = [parseInt(gav(msg, "1")), parseInt(gav(msg, "2")), parseInt(gav(msg, "3"))];
        var total = arrI[0] + arrI[1] + arrI[2];
        if (total == 0) {
            total = 1;
        }
        var maxHeight = 100;
        for (var i = 0; i < arrI.length; ++i) {
            var percent = (arrI[i] / total).toFixed(2);
            var h = maxHeight * percent;
            if (h == 0) {
                h = 1;
            }
            var sHtml = "<div class='static_graph' style='height:" + h + "px;'></div><div class='static_w'>"
                    + (percent * 100).toFixed(2) + "%</div>";
            $j("cntrStatic_" + i).html(sHtml);
        }
    });
}
function submitHelpUse(src, _oid) {
    showProc(src);
    var _notice = $("input[name=use]:checked").val();
    $.post("/ajax.ashx?action=helpuseful&t=" + Math.random(), {
        oid: _oid,
        notion: _notice
    }, function(msg) {
        if (gav(msg, "state") == "0") {
            $a(gav(msg, "msg"));
        } else {
            $a(gav(msg, "msg"), 1);
            getHelpStatic(_oid);
        }
        showProc(src, false);
    });
}
function getSimilarArticle(_sid) {
    $.post("/ajax.ashx?action=getsmilararticle&t=" + Math.random(), {
        sid: _sid
    }, function(msg) {
        $j("cntrSimilarArticle").html(msg);
    });
}
function getLastArticle() {
    $.post("/ajax.ashx?action=getlastarticle", function(msg) {
        $j("cntrLastArticle").html(msg);
    });
}
function cleanHistory(_mark, key) {
    $.post("/ajax.ashx?action=cleanhistory", {
        mark: _mark
    }, function(msg) {
       // $j("divHistoryCntr").html("<h4 class=\"t05\"><a class=\"clr\" onclick=\"cleanHistory('product','__oran__product_history')\" href=\"javascript:void(0)\">清除</a>最近浏览过的产品</h4><div id=\"divHistoryItems\" class=\"t05_con\">无浏览历史<div class=\"clear\"/></div>");
        $j("divHistoryCntr").html("<li>&nbsp;&nbsp;无浏览历史</li>");
    });
}
function subscription(src, elmId) {
    if (elmId == null) {
        elmId = "txtSubscriptionEmail";
    }
    var _email = $.trim($j(elmId).val());
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length == 0) {
        $a("E-Mail 不可为空");
        $j(elmId).focus();
        return false;
    }
    if (!ptn.test(_email)) {
        $a("E-Mail 格式错误。");
        $j(elmId).focus();
        return false;
    }
    showProc(src);
    $.post("/ajax.ashx?action=subscription&t=" + Math.random(), {
        email: _email
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
function userFeedback(src) {
    var _title = $tv("txtFdTitle");
    var _shortDesc = $tv("txtFdShortDesc");
    if (_title.length == 0 || _shortDesc.length == 0) {
        $a("内容或标题不可为空。");
        return false;
    }

    showBgProc(true, "正在提交...");
    $.post("/ajax.ashx?action=userfeedback&t=" + Math.random(), {
        title: _title,
        shortDesc: _shortDesc
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage("<li>您的意见提交成功，感谢您的意见，有您的支持，我们会做得更好。</li>", 1, "/user/faq.aspx", "意见/反馈", "/user/faq.aspx");
            return;
        } else if (sMsg.length > 0) {
            $a(sMsg);
        } else {
            $a(msg);
        }
        showBgProc(false);
    });
}
function checkAuthority(_authIDs, _title) {
    $.post("/ajax.ashx?action=checkauthority&t=" + Math.random(), {
        authIDs: _authIDs
    }, function(msg) {
        if (msg == "1") {
            $j("div___________Perm").hide();
            document.oncontextmenu = function() { return true; };
            document.onselectstart = function() { return true; };
        } else {
            showMsgPage("您不具有查看 " + _title + " 的权限。");
            return;
        }
    });
}
function changeFavColumn(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=changefavcolumn&t=" + Math.random(), {
        ids: _ids,
        targetId: src.value
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            location.reload();
        } else {
            //alert(sMsg);
        }
    });
    showProc(src, false);
}
function getRecommentProductByHistory(_oid) {
    $.post("/ajax.ashx?action=GetRecommentProductByHistory&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

function getRecommentProjectByHistory(_oid) {
    $.post("/ajax.ashx?action=GetRecommentProjectByHistory&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}


function getRelevantSales(_oid) {
    $.post("/ajax.ashx?action=GetRelevantSales&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantSalesCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}
function getRelevantViewed(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewed&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}
//浏览服务的历史记录
function getRelevantViewedProject(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewedProject&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

//浏览下载的历史记录
function getRelevantViewedDownload(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewedDownload&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

function delInitationlog(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=DelInitationlog&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
function sendInvitation(src) {
    var jSrc = $j(src);
    var sEmail = $j("txtEmail").val();
    if (sEmail == null || sEmail.length == 0) {
        $a("电子邮箱地址不可为空。");
        return;
    }
    if (!PTN_EMAIL.test(sEmail)) {
        $a("电子邮箱地址格式不正确。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendInvitation&t=" + Math.random(), {
        _email: sEmail
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage(sMsg, 1, "/user/InviteUserList.aspx", "邀请函列表", "/user/InviteUserList.aspx");
        } else {
            $a(sMsg);
            showProc(src, false);
        }
    });
}
//填充报告分类
function fillReportCategories() {
    $.get("/ajax.ashx?action=GetReportCategories&t=" + Math.random(), function(msg) {
        var arrCat = msg.split("$$");
        var sOptHtml = "<option value=\"\">请选择...</option>";
        for (var i = 0; i < arrCat.length; ++i) {
            sOptHtml += "<option value=\"" + arrCat[i] + "\">" + arrCat[i] + "</option>";
        }
        $j("RPT_tdCats").html("<select id=\"RPT_cats\">" + sOptHtml + "</select>");
    });
}
//填充留言分类
function fillLeavewordCategories() {
    $.get("/ajax.ashx?action=GetLeavewordCategories&t=" + Math.random(), function(msg) {
        var arrCat = msg.split("$$");
        var sOptHtml = "<option value=\"\">请选择...</option>";
        for (var i = 0; i < arrCat.length; ++i) {
            sOptHtml += "<option value=\"" + arrCat[i] + "\">" + arrCat[i] + "</option>";
        }
        $j("LEAVEWORD_tdCats").html("<select id=\"LEAVEWORD_cats\">" + sOptHtml + "</select>");
    });
}
//发送留言
function sendLeaveword(src) {
    var sCat = $j("LEAVEWORD_cats").val();
    var sTitle = $v("LEAVEWORD_txtTitle");
    var sTel = $v("LEAVEWORD_txtTel");
    var sMobile = $v("LEAVEWORD_txtMobile");
    var sContact = $v("LEAVEWORD_txtContact");
    var sEmail = $v("LEAVEWORD_txtEmail");
    var sShortDesc = $v("LEAVEWORD_txtShortDesc");
    var err = "";
    if (sTitle == "") {
        err += "<li>标题不可为空</li>";
    }
    if (sContact == "") {
        err += "<li>联系人不可为空</li>";
    }
    if (sEmail == "") {
        err += "<li>电子邮箱地址不可为空</li>";
    }
    else if (!PTN_EMAIL.test(sEmail)) {
        err += "<li>电子邮箱地址格式错误</li>";
    }
    if (sCat == "") {
        err += "<li>留言类型必选</li>";
    }
    if (err.length > 0) {
        $a(err);
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendLeaveword&t=" + Math.random(), {
        title: sTitle,
        cat: sCat,
        contact: sContact,
        email: sEmail,
        shortDesc: sShortDesc,
        tel: sTel,
        mobile: sMobile

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
//发送报告
function sendReprots(src) {
    var sCat = $j("RPT_cats").val();
    var sTitle = document.title;
    var sUrl = document.URL;
    var sContact = $v("RPT_txtContact");
    var sEmail = $v("RPT_txtEmail");
    var sShortDesc = $v("RPT_txtShortDesc");
    if (sCat.length == 0) {
        $a("请选择报告分类。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendReports&t=" + Math.random(), {
        title: sTitle,
        url: sUrl,
        cat: sCat,
        contact: sContact,
        email: sEmail,
        shortDesc: sShortDesc

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
//提交直接付款
function directPay(src) {
    var sPayer = $v("DIR_PAY_txtPayer");
    var sEmail = $v("DIR_PAY_txtEmail");
    var sTel = $v("DIR_PAY_txtTel");
    var sMobile = $v("DIR_PAY_txtMobile");
    var sSalesMan = $v("DIR_PAY_txtSalesManName");
    var sMoney = $v("DIR_PAY_txtMoney");
    var sUse = $v("DIR_PAY_txtUse");
    var sPayment = $v("DIR_PAY_ddlPayment");
    var err = "";
    if (sPayer.length == 0) {
        err += "<li>付款人不可为空。</li>"
    }
    if (sEmail == "") {
        err += "<li>电子邮箱地址不可为空</li>";
    }
    else if (!PTN_EMAIL.test(sEmail)) {
        err += "<li>电子邮箱地址格式错误</li>";
    }
    if (sMoney.length == 0) {
        err += "<li>付款金额不可为空。</li>";
    }
    else if (!PTN_FLOAT.test(sMoney)) {
        err += "<li>付款金额必须为数字，如89.00。</li>";
    }
    if (sUse.length == 0) {
        err += "<li>款项用途不可为空。</li>";
    }
    if (sPayment.length == 0) {
        err += "<li>请选择付款方式。</li>";
    }
    if (err.length > 0) {
        $a(err);
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=DirectPay&t=" + Math.random(), {
        payer: sPayer,
        email: sEmail,
        tel: sTel,
        mobile: sMobile,
        salesMan: sSalesMan,
        _money: sMoney,
        _use: sUse,
        payment: sPayment

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            location.href = "/Paycenter/PayDirectConfirm.aspx";
            return;
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
function submitOrder(src, _oid) {
    showProc(src);
    var _contact = $j("txtContact").val();
    var _compName = $j("txtCompName").val();
    var _tel = $j("txtTel").val();
    var _mobile = $j("txtMobile").val();
    var _email = $j("txtEmail").val();
    var _addr = $j("txtAddr").val();
    var _content = $j("txtContent").val();
    var errorMsg = "";
    if (_contact.length == 0 || _contact == "请填写联系人") {
        errorMsg += "<p>联系人不可为空</p>";
    }
    if (_mobile.length == 0) {
        errorMsg += "<p>手机不可为空</p>";
    }
    
    var ptns = /^\d{11,13}$/;
    if (_mobile.length > 0 && !ptns.test(_mobile)) {
        errorMsg += "<p>手机格式错误</p>";
    }
    
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length > 0 && !ptn.test(_email)) {
        errorMsg += "<p>E-Mail格式错误</p>";
    }

    if (_content.length == 0 || _content == "请填写订购的产品数量和产品描述，方便我们进行统一备货") {
        errorMsg += "<p>采购意向描述不可为空</p>";
    }
    if (errorMsg.length > 0) {
        $a(errorMsg);
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=submitorder&t=" + Math.random(), {
        oid: _oid,
        contact: _contact,
        compName: _compName,
        tel: _tel,
        mobile: _mobile,
        email: _email,
        addr: _addr,
        content: _content
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
            emptyText('tbForm1');
        } else {
            $a(msg);
            emptyText('tbForm1');
        }
    });
    showProc(src, false);
}
/********************************************* 代理加盟:start *********************************/
function getAgentHelpStatic(_oid) {
    $.post("/ajax.ashx?action=agenthelpsatisfaction&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var arrI = [parseInt(gav(msg, "1")), parseInt(gav(msg, "2")), parseInt(gav(msg, "3"))];
        var total = arrI[0] + arrI[1] + arrI[2];
        if (total == 0) {
            total = 1;
        }
        var maxHeight = 100;
        for (var i = 0; i < arrI.length; ++i) {
            var percent = (arrI[i] / total).toFixed(2);
            var h = maxHeight * percent;
            if (h == 0) {
                h = 1;
            }
            var sHtml = "<div class='static_graph' style='height:" + h + "px;'></div><div class='static_w'>"
                    + (percent * 100).toFixed(2) + "%</div>";
            $j("cntrStatic_" + i).html(sHtml);
        }
    });
}
function submitAgentHelpUse(src, _oid) {
    showProc(src);
    var _notice = $("input[name=use]:checked").val();
    $.post("/ajax.ashx?action=agenthelpuseful&t=" + Math.random(), {
        oid: _oid,
        notion: _notice
    }, function(msg) {
        if (gav(msg, "state") == "0") {
            $a(gav(msg, "msg"));
        } else {
            $a(gav(msg, "msg"), 1);
            getAgentHelpStatic(_oid);
        }
        showProc(src, false);
    });
}
/********************************************* 代理加盟:end *********************************/
/*显示产品的简介（一排四个的显示模式）*/
function showProductInfo(src, _oid, _index) {
    var time1 = null;
    var time2 = null;
    var ID = null;
    var time = null;

    //鼠标移到图片上的事件
    $(src).hover(function() { time1 = new Date(); showTime(); }, function() { window.clearInterval(ID); });

    //js定时器
    function showTime() {
        ID = window.setInterval(function() {
            time2 = new Date();
            time = time2 - time1;

            //时间差，停留200毫秒时触发ajax请求
            if (time > 400) {
                if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40") {
                    if ($(src).parent().parent().next().is(":visible")) {
                        return;
                    }
                    else {
                        $(src).parent().parent().next().show();
                    }
                }
                else {
                    $.post("/ajax.ashx?action=showProductInfo&t=" + Math.random(), {
                        oid: _oid,
                        index: _index
                    }, function(msg) {
                        if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40") {
                            return;
                        }
                        else {
                            $(src).parent().parent().after(msg);
                            return;
                        }

                    });
                }
            }
        }, 450);
    }
}
/*显示产品的简介（竖排显示模式）*/
function showProductInfos(src, _oid) {

    var time1 = null;
    var time2 = null;
    var ID = null;
    var time = null;

    //鼠标移到图片上的事件
    $(src).hover(function() { time1 = new Date(); showTime(); }, function() { window.clearInterval(ID); });

    //js定时器
    function showTime() {
        ID = window.setInterval(function() {
            time2 = new Date();
            time = time2 - time1;

            //时间差，停留200毫秒时触发ajax请求
            if (time > 400) {
                if ($(src).parent().parent().next().attr("class") == "mesbook44") {
                    if ($(src).parent().parent().next().is(":visible")) {
                        return;
                    }
                    else {
                        $(src).parent().parent().next().show();
                    }
                }
                else {
                    $.post("/ajax.ashx?action=showProductInfos&t=" + Math.random(), {
                        oid: _oid
                    }, function(msg) {
                        if ($(src).parent().parent().next().attr("class") == "mesbook44") {
                            return;
                        }
                        else {
                            $(src).parent().parent().after(msg);
                            return;
                        }

                    });
                }
            }
        }, 450);
    }

}


//隐藏产品预览的层
function hideProductInfo(src) {

    if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40" || $(src).parent().parent().next().attr("class") == "mesbook44") {
            // $(src).parent().parent().next().hide();
            $(src).parent().parent().next().mouseover(function() {
            $(src).parent().parent().next().show();
                return;
            });

            $(src).parent().parent().next().mouseout(function() {
                $(src).parent().parent().next().hide();
                return;
            });
            $(src).parent().parent().next().hide();
        }
}
//显示购买小Tips
function showProductTips(oid) {
    var jLayer = $j("div_nsw_tips");
    if (jLayer.length == 0) {
        var sHtml = "<div class='mesbook5' id='div_nsw_tips'><h1><a href='javascript:void(0)' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_tips_bg')\"><img src='" + SKIN_PATH + "img/ico9_close.gif' /></a>产品预定</h1>"
	            +"<h4>告诉我该产品的好消息</h4>"
                +"<div class='con'>您需要等待该产品的上架吗？一旦该产品的价格降价之后，我们会第一时间把该商品的价格清单发送到您的电子邮件。</div>"
                +" <h5>如果打折则发送电子邮件给我</h5>"
                + "<div class='inp'><input id='rdoTip1' type='radio' name='rdoTips' value='0' checked='true' /><label for='rdoTip1'>仅仅当前该产品</label></div>"
                + "<div class='inp'><input id='rdoTip2' type='radio' name='rdoTips' value='1' /><label for='rdoTip2'>当前产品所属分类</label></div>"
                + "<div class='inp'><input  id='rdoTip3' type='radio' name='rdoTips' value='2' /><label for='rdoTip3'>所有打折清单</label></div>"
                + "<div class='inp'><span>Email:</span><input type='text' id='txtEmail' name='txtEmail'  class='text' /><input id='txtHide' name='txtHide' type='hidden' value='" + oid + "' /></div>"
                + "<div class='inp'><span>简述:</span><textarea id='txtContent' name='txtContent'class='textarea'></textarea></div>"
                +"<div class='mes_btn'>"
    	        + "<input type='button' class='b61' value='提  交' onclick=\"submitProductTips('txtHide','txtEmail','txtContent','rdoTips')\" />"
		        + "<input type='button' class='b62' value='取  消' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_tips_bg')\" />"
                +"</div></div>";
        $(document.body).append(sHtml);
    }
    setCM("div_nsw_tips");
    showFullBg("div_nsw_tips_bg");
    relocation("div_nsw_tips");
    
}


//购买产品小Tips
function submitProductTips(_oid, _email, _content, _rdoTips) {
    var _oid = $j("txtHide").val();
    var _email = $j("txtEmail").val();
    var _content = $j("txtContent").val();
    var _state = $("input[name=rdoTips]:checked").val();
    if (_content.length > 500) {
        $a('简述太长，不能超过500个字节，请填写简短描述');
    }
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length == 0) {
        $a('E-Mail 不可为空');
        return false;
    }
    if (!ptn.test(_email)) {
        $a('E-Mail 格式错误');
        return false;
    }
    $.post("/ajax.ashx?action=postProductTips&t=" + Math.random(), {
        oid: _oid,
        email: _email,
        content: _content,
        state: _state
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $a(gav(msg, "msg"),1);
        } else {
            $a(gav(msg, "msg"));
        }
    });
    $j("div_nsw_tips").hide();
    hideFullBg('div_nsw_tips_bg');
}


//产品预览（愿望夹）
function showMyWish(_oid) {
    var jLayer = $j("div_nsw_wishs");
    if (jLayer.length == 0) {
        var sHtml = "<div class=\"mesbook6\" id=\"div_nsw_wishs\"></div>";
        $(document.body).append(sHtml);
    }
    $.post("/ajax.ashx?action=showMyWish&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        $j("div_nsw_wishs").html(msg);
    });
    setCM("div_nsw_wishs");
    showFullBg("div_nsw_wishs_bg");
    relocation("div_nsw_wishs");
}

//保存数据到愿望夹
function submitProductWishs(_oid, _attr, _num) {
    var _oid = $j("txtHide").val();
    var _attr = $j("txtAttr").html();
    var _num = $j("txtNum").val();
    $.post("/ajax.ashx?action=postProductWishs&t=" + Math.random(), {
        oid: _oid,
        attr: _attr,
        num: _num
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $a(gav(msg, "msg"), 1);
        } else {
            $a(gav(msg, "msg"));
        }
    });
    $j("div_nsw_wishs").hide();
    hideFullBg('div_nsw_wishs_bg');
}

/*加盟商在线下单*/
function sendGetProductsNotify(src) {
    var _productColumn = $j("ddlProductsColumns").val();
    var _searchText = $j("txtSearch").val();
    if (_searchText == "关键词") { _searchText = ""; }
    //showProc(src);
    $.post("/ajax.ashx?action=sendGetProductsByColumn&t=" + Math.random(), {
        columnID: _productColumn,
        searchText: _searchText
    }, function(msg) {

        //创建下拉表单
        InitDropdownlist(document.getElementById("PackageSelectList"), "请选择关联资讯", "0", msg);
    });
}

//设置产品数据源
function InitDropdownlist(sel, defaulttext, defaultvalue, arry) {
    //1\清除所有的数据源
    var len = sel.options.length;
    for (i = 0; i < len; i++) {
        sel.remove(0);
    }

    //2\设置一个默认值
    //sel.add(new Option(defaulttext, defaultvalue));

    //3\制作数据源，键值对中间用$$分开，||作为键值对之间的分割符

    var ary = arry.split("||");
    len = ary.length;
    if (len) {
        for (i = 0; i < len-1; i++) {
            text_value = ary[i].split("$$");
            text = text_value[1];
            value = text_value[0];
            sel.add(new Option(text, value));
        }
    }
}


   /**定单提交
   ********************/

function userorder(src) {

    var s_name = $tv("txtname");
    var s_title = $tv("txttitle");
    var s_email = $tv("txtemail");
    var s_tel = $tv("txttel");
    var s_content = $tv("txtcontent");
    var s_address = $tv("txtaddress");
    var s_enddate = $tv("txtenddate");
    var s_IDList = $("#PackagePickList").val();
    
    //alert(s_IDList);
    if (s_title == "") {
        $a("定单名称不能为空", "txttitle");
        return;
    }
    if (s_name == "") {
        $a("下单人姓名不能为空", "txtname");
        return;
    }
    if (s_tel == "") {
        $a("联系电话不能为空", "txttel");
        return;
    }
    if (s_address == "") {
        $a("联系地址不能为空", "txtaddress");
        return;
    }
    if (s_enddate == "") {
        $a("到货时间不能为空", "txtenddate");
        return;
    }
    if (s_content == "" || s_content.length > 1000) {
        $a("详细描述不能为空或者大于1000字", "txtcontent");
        return;
    }
    else {
        var _email = $.trim($(src).attr("value"));
        var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!ptn.test(s_email)) {
            $a("E-Mail错误");
            return false;
        }
    }
    $.post("/ajax.ashx?action=agentorder&t=" + Math.random(), {
        s_name: s_name,
        s_title: s_title,
        s_email: s_email,
        s_tel: s_tel,
        s_content: s_content,
        s_address: s_address,
        s_enddate: s_enddate,
        s_IDList: s_IDList
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage("<li>定单提交成功，我们会尽快与您联系，谢谢！</li>", 1, "/User/UserOrder.aspx", "在线定单", "/User/UserOrder.aspx");
            return;
        } else if (sMsg.length > 0) {
            $a(sMsg);
        } else {
            $a(msg);
        }
    });
}


/*招商加盟:删除定单end*/
function delAgentOrder(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delAgentOrder&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
             $a(gav(msg, "msg"),1);
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

//填加友情连接
function AddApply(src) {
    var s_Type = document.getElementById("TxtType").selectedIndex;
    var s_Url = $tv("TxtUrl");
    var s_Name = $tv("TxtName");
    var s_PhotoPath = $tv("TxtPhotoPath");
    var s_Content = $tv("TxtMsg");
    var s_UserName = $tv("TxtUserName");
    var s_Phone = $tv("TxtTel");
    var s_Email = $tv("TxtEmail");
    var s_QQ = $tv("TxtQQ");

    if (s_Url == "" || s_Url == "http://") {
        $a("请输入网址！", "TxtUrl");
        return;
    }
    if (s_Name == "") {
        $a("请输入网站名称！", "TxtName");
        return;
    }
    if (s_Content.length > 400) {
        $a("网站简况不能大于400字！", "txtUsername");
        return;
    }
    $.post("/ajax.ashx?action=apply&t=" + Math.random(), {
        Type: s_Type,
        Url: s_Url,
        Name: s_Name,
        PhotoPath: s_PhotoPath,
        Content: s_Content,
        UserName: s_UserName,
        Phone: s_Phone,
        Email: s_Email,
        QQ: s_QQ
    },
       function(msg) {
           if (gav(msg, "state") == "1") {
               $a(gav(msg, "msg"));
               
           }
           else {
               $a(gav(msg, "msg"));
           }
           ;
       });
   }

//产品的对比车
   function AddCompare(src) {
       var _flag = false;
       if(src.checked)
       {
           _flag = true;
           $(src).next().next().next().show();
       }
       else
       {
           _flag = false;
           $(src).next().next().next().hide();
       }
       var _ids = $(src).val();

       $.post("/ajax.ashx?action=addCompare&t=" + Math.random(), {
           ids: _ids,
           flag: _flag
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               var newcookie = gav(msg, "newcookie");
               var arr = new Array();
               arr = newcookie.split(',');
                  if (arr.length > 0) {
                      for (var i = 0; i < arr.length; i++) {
                        if (i == arr.length-1)
                        {
                            $(".pro_main").find("input[id=" + arr[i] + "]").show();
                        }
                        else
                        {
                            $(".pro_main").find("input[id=" + arr[i] + "]").hide();
                        }
                      }
                  }
           }
       });

   }

   //产品对比车，移除该产品
   function DelOneCompare(src) {
       var _ids = $(src).attr("id");
       $.post("/ajax.ashx?action=delOneCompare&t=" + Math.random(), {
           ids: _ids
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               window.location = "/product/Compare.aspx";

           }
           else {
               showMsgPage("<li>产品对比车中不存在对比的产品记录，请选择需要对比的产品</li>", 0, "/", "首页", "/");
           }
       });
   }

   //产品对比车，移除该产品
   function DelAllCompare() {
       $.post("/ajax.ashx?action=delAllCompare&t=" + Math.random(), {
       }, function(msg) {
               showMsgPage("<li>产品对比车中所有产品已移除，您可以继续挑选产品进行比较</li>", 1, "/", "首页", "/");
       });
   }
   

//添加下载日志
function addDownload(oid,url)
{
    //提交数据到数据库记录那个用户下载了什么资料
       $.post("/ajax.ashx?action=addDownload&t=" + Math.random(), {
           oid: oid
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               window.location = url;
           }
           else {
               $a(gav(msg, "msg"));
           }
       });
}
   