<?php
$z[0]=Array("field","\$ID = @me; \$sql = \"SELECT * FROM `dede_arctype` WHERE id=\$ID\";\$query = mysql_query(\$sql);\$row=mysql_fetch_array(\$query); \$relID = \"\$row[reid]\"; if(\$relID == 0) {@me = \$row[typename];}else{\$sql = \"SELECT `typename` FROM `dede_arctype` WHERE id=\$relID\";\$query = mysql_query(\$sql);\$row=mysql_fetch_array(\$query); @me = \$row[typename];}",75,459);
$z[0][4]['name']="typeid";
$z[0][4]['runphp']="yes";
$z[1]=Array("channel","\r\n      <li sid='0001,0011'><a href='[field:typeurl/]'>[field:typename/]</a></li>\r\n      ",512,747);
$z[1][4]['type']="son";
$z[1][4]['currentstyle']="<li class='cur'><a href='~typelink~' class='thisclass'>~typename~</a></li>";
$z[2]=Array("global","",953,975);
$z[2][4]['name']="cfg_tel";
$z[3]=Array("arclist","\r\n<li><a href='[field:arcurl/]' title='[field:title/]'>[field:title/]</a></li>\r\n",1077,1217);
$z[3][4]['titlelen']="60";
$z[3][4]['row']="10";
$z[3][4]['typeid']="34";
$z[4]=Array("type","<a class=\"yan2\" href=\"[field:typelink /]\">联系我们</a>",1329,1422);
$z[4][4]['typeid']="44";
$z[5]=Array("global","",1616,1638);
$z[5][4]['name']="cfg_tel";
$z[6]=Array("global","",1674,1695);
$z[6][4]['name']="cfg_yx";
$z[7]=Array("global","",1730,1751);
$z[7][4]['name']="cfg_dz";

?>