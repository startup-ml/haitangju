
var __SUBSITE_INFO="||";
//根据键名获取值
function getSubsiteInfo(key) {
    var rtnVal="";
    var ptn = "\\|\\|" + key + "\\$\\$[^||]*";
    var rgx = new RegExp(ptn);
    var mh = __SUBSITE_INFO.match(rgx);
    if (mh == null) {
        return "0";
    }
    var pos = mh[0].lastIndexOf("$$");
    var rtnVal = mh[0].substr(pos+2);
    return rtnVal;
}
