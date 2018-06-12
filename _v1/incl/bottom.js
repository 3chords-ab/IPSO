// JavaScript Document

document.write('<table border="0" cellpadding="0" cellspacing="0" width="100%">');
document.write(  '<tr>');
document.write(    '<td height="22" class="subNav" valign="top">');
// SUB NAV
	getSubNav();
document.write(    '</td>');
document.write(  '</tr>');
document.write(  '<tr>');
document.write(    '<td height="43" valign="top" class="nav">');
// NAV
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%">');
	document.write(  '<tr>');
	document.write(    '<td valign="top">');
getNav();
	document.write(    '</td>');
	document.write(    '<td width="113" class="tinyText" valign="middle" align="right"><a href="http://www.ipso.cc/"><img src="'+root+'imgs/url_faded.gif" width="110" height="13" border="0"></a></td>');
	document.write(  '</tr>');
	document.write('</table>');
document.write(    '</td>');
document.write(  '</tr>');
document.write(  '<tr>');
document.write(    '<td height="23" class="address" align="center" valign="top">');
// ADDRESS
	getText(1); getText(2); getText(3); getText(4);
document.write(    '</td>');
document.write(  '</tr>');
document.write('</table>');