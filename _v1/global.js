/*
	Copyright (c) 2004 Ampere Media AB
	Author: Emily Wood & Olof H�nell
*/

/*
	GLOBALA FUNKTIONER (Kan anv�ndas p� fler projekt)
*/


// Funktion f�r att visa g�mma divar med block tekniken utifr�n deras id
// href=javascript:fold('editClicheDiv');
function fold(id){
  var o = document.getElementById(id);
  o.style.display = (o.style.display == 'none')? 'block' : 'none';
}

// javascript:viewHide('divName',true); om man ska visa den
// javascript:viewHide('divName',false); om man ska d�lja den
// onMouseover="viewHide('divName',true)" onMouseout="viewHide('divName',false)"
function viewHide(divName,doDisplay){
  var o = document.getElementById(divName);
  o.style.display = (doDisplay)? 'block' : 'none';
}


// �ppna nytt f�ster centrerat p� sk�rmen
// anv�nd f�ljande i den l�nken du vill ska �ppna det nya f�nstret:
// <a href="javascript:newWindow('q1_imgs1.htm',popW,popH);">L�nk</a>
function newWindow(mypage, w, h, scr) {
    if(scr == null) scr = 'no';
  var winl = (screen.width - w) >> 1;
  var wint = (screen.height - h) >> 1;
  winprops = 'height=' + h + ',width='+w+',top='+wint+',left='+winl+',scrollbars='+scr+',resizable'
  win = window.open(mypage, '', winprops);
}

// �ndra bakgrundsf�rg p� tabellrader
// <tr onMouseover="trBg(this,true)" onMouseout="trBg(this,false)">
function trBg(tr,mark){
	if(mark){
	  tr.style.background = "#f2f2f2"
	}
	else{
	  tr.style.background = "none"
	}
}

// Script f�r InputFocus
// <input onfocus="onFocus(this);" onblur="onBlur(this);">
function onFocus(input){
	if (document.all){
		input.style.border="1 red solid";
		input.style.margin=0;
	}
}
function onBlur(input){
	if (document.all){
		input.style.border="1 #cccccc solid";
		input.style.margin=0;
	}
}

// senast uppdaterad
function lastModified(){
	document.write(document.lastModified);
}

// starta i fullsk�rm
function openApp(){
	window.open(href="file.asp",'',',type=fullWindow,fullscreen,width='+screen.availWidth+',height='+screen.availHeight+'scrollbars=no,left=0,top=0');
}

// definera relativa s�kv�gar utifr�n root katalog
function getRoot(magic){
  var url = document.location.href;
  var idx = url.indexOf(magic);
  var relPath = "";
  if(idx != -1){
    idx += magic.length;
    for(var i = idx, ch; i<url.length; i++){
      ch = url.charAt(i);
      if(ch == '/'){
        relPath = relPath + "../";
      }
    }
  }
  return relPath;
}

//denna del anv�nds ist�llet f�r onLoad i bodyn. exempel addStartCommand('alert("hej")');
var commandsToRun = new Array();
function addStartCommand(str){
  commandsToRun[commandsToRun.length] = str;
}
function fnSetPage(){
  for(var i = 0; i < commandsToRun.length; eval(commandsToRun[i++]) );
}

// definera cookies
function getCookie(name) {
  var cookies = document.cookie;
  var start = cookies.indexOf(name + '=');
  if (start == -1) return null;
  var len = start + name.length + 1;
  var end = cookies.indexOf(';',len);
  if (end == -1) end = cookies.length;
  return unescape(cookies.substring(len,end));
}
function setCookie(name, value) { 
  var path  = ';path=' + '/';
  document.cookie = name + '=' + escape(value) + path;
}




/*
	SPECIFIKA FUNKTIONER F�R DETTA PROJEKT
*/

root = "/v1/";

function getText(id){
  var currentLanguage = getCookie("lang");
  if(currentLanguage == null){
	setCookie("lang", "swe");
	currentLanguage = "swe";
  }
  for(var i=0; i<arrWords.length; i++){
	if(arrWords[i].tId == id){
	  var textValue = eval("arrWords[" + i + "]." + currentLanguage);
	  //                    arrWords[12].swe
	  document.write( textValue );
	  break;
	}
  }
}

function getImg(fileName,ext){
  var currentLanguage = getCookie("lang");
  if(currentLanguage == null){
	currentLanguage = "swe";
  }
  document.write('<img src="'+root+'imgs/' + fileName + '_' + currentLanguage + '.' + ext + '" border="0">');
}

function changeLanguage(newLanguage){
  setCookie("lang", newLanguage);
  document.location.replace(document.location.href);
}


var chapterChoice = [
	[null],
	[1000,"navOm","rubOm","om"],
	[2000,"navTj","rubTj","tj"],
	[3000,"navRef","rubRef","ref"]
];

function getNav(){
		document.write('<table cellpadding="0" cellspacing="0" border="0">');
		document.write(  '<tr>');
		document.write(    '<td width="65" class="tinyText" valign="bottom">');
		document.write(    '<a href="'+root+'index.html" style="color:black;text-decoration:none;">');
			getText(0);
		document.write(    '</a>');
		document.write(    '</td>');
	for(i=1; i<chapterChoice.length; i++){
		var status = "";
		if(chapterChoice[i][0] == chapterID){
			status = "_active";
		}
		document.write(    '<td class="navButton' + status + '">');
		document.write(    '<a href="'+root + chapterChoice[i][3] + '/index.html">');
			getImg(chapterChoice[i][1],'gif');
		document.write(    '</a>');
		document.write(    '</td>');
		}
		document.write(  '</tr>');
		document.write('</table>');
}

var subNav = [
	[1100,1200,1300],
	[2100,2200,2300,2400,2700],
	[3100,3200]
];

function getSubNav(){
	if(chapterID != null){
		var currentChapter = (chapterID/1000)-1;
		if(currentChapter<subNav.length){
			for(j=0; j<subNav[currentChapter].length; j++){
				document.write('<a href="' + subNav[currentChapter][j] + '.html" class="subNavbar">');
				getText(subNav[currentChapter][j]);
				document.write('</a>');
				if(j<subNav[currentChapter].length-1){
					document.write('&nbsp;&nbsp;|&nbsp;&nbsp;');
				}
			}
		}
		else{document.write('&nbsp;');}
	}
	else{document.write('&nbsp;');}
}

function getHeader(){
	for(i=1; i<chapterChoice.length; i++){
		if(chapterChoice[i][0] == chapterID){
			getImg(chapterChoice[i][2],'gif');
		}
		else{document.write('&nbsp;');}
	}
}