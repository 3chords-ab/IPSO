// definera root katalog
var root = getRoot("flykthuva15/");
// definera relativa sökvägar utifrån root katalog
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


// definera sidtyp
var pageType = new Array ()
	pageType[0] = "other";
	pageType[1] = "chapterStart";
	pageType[2] = "question";
	pageType[3] = "learnMore";

// definera kapitel och sektioner
var section = new Array();
	section[0] = new SectionObject("","","");
	// kapitel
	section[1] = new SectionObject("1","vaelkommen","Välkommen");
	section[2] = new SectionObject("2","introduktion","Introduktion");
	section[3] = new SectionObject("3","konstruktion","Konstruktion");
	section[4] = new SectionObject("4","handhavande","Handhavande");
	section[5] = new SectionObject("5","oevningar","Övningar");
	section[6] = new SectionObject("6","tillsyn","Tillsyn");
	section[7] = new SectionObject("7","oeversyn","Översyn");
	section[8] = new SectionObject("8","test","Test");
	section[9] = new SectionObject("9","dokument","Dokumentation");
	// övriga sektioner
	section[10] = new SectionObject("10","bildgalleri","Bildgalleri");
	section[11] = new SectionObject("11","sitemap","Site Map");
	section[12] = new SectionObject("13","help","Information om strukturen och hur du navigerar");
	section[13] = new SectionObject("12","start","Startsida");
	
// gör objektmall för section 
function SectionObject(sId, fName, sTitle){
	this.sectionId = sId;
	this.fileName = fName;
	this.title = sTitle;
}


// diverse definitioner
var organisation = "FMV"
var equipment = "Flykthuva 15"
var question = " "


// titelbar på tillämpningen
function title(){
	document.write('<title>')
	document.write('• ')
	document.write(organisation)
	document.write(' - ')
	document.write(equipment)
	document.write(' - ')
	document.write(pageSection.title)
	document.write('</title>')
}


// Huvudmenyn
function navbar(){
	document.write('<table cellpadding="0" cellspacing="0" border="0" class="menu" width="100%" height="100%">')
	document.write('<tr>')
		for (var i=2; i<10; i++){
		document.write('<td align="left"')
			if (section[i].fileName == pageSection.fileName){
			document.write('class="menuLinksActive menuLinks">')
			document.write('<div class="tabLeft">   ')
			document.write('<a href="../../../../project/fmv/flykthuva15/' + root)
			document.write('' + section[i].fileName + '/index.htm" class="menuLink menuLinkActive">' + section[i].title + '</a>')
			}
			else{
			document.write('class="menuLinks" onMouseOver="linkIn(this)" onMouseOut="linkOut(this)">')
			document.write('   <a href="../../../../project/fmv/flykthuva15/' + root)
			document.write('' + section[i].fileName + '/index.htm" class="menuLink">' + section[i].title + '</a>')
			}
		document.write('   </div></td>')
		document.write('<td></td>')
		}
		/*
		document.write('<td align="right" valign="middle" width="250">')
		document.write('<span class="menuIconDivider">')
		document.write('<a class="menuLink" href="../../../../project/fmv/flykthuva15/' + root + section[11].fileName + '/index.htm">')
		document.write('<img src="../../../../project/fmv/flykthuva15/' + root +'imgs/icon_' + section[11].fileName + '.gif" border="0" hspace="3" alt="' + section[11].title + '">')
		document.write('</a></span>')
		document.write('<span class="menuIconDivider">')
		document.write('<a class="menuLink" href="../../../../project/fmv/flykthuva15/' + root + section[13].fileName + '/index.htm">')
		document.write('<img src="../../../../project/fmv/flykthuva15/' + root +'imgs/icon_' + section[13].fileName + '.gif" border="0" hspace="3" alt="' + section[13].title + '">')
		document.write('</a></span>')
		document.write('</td>')
		*/
		document.write('<td align="right" valign="middle" width="250">')
		for (var i=11; i<13; i++){
		document.write('<span class="menuIconDivider">')
		document.write('<a class="menuLink" href="../../../../project/fmv/flykthuva15/' + root + section[i].fileName + '/index.htm">')
		document.write('<img src="../../../../project/fmv/flykthuva15/' + root +'imgs/icon_' + section[i].fileName + '.gif" border="0" hspace="3" alt="' + section[i].title + '">')
		document.write('</a></span>')
		}
		document.write('</td>')
	document.write('</tr>')
	document.write('</table>')
}


// changing style classes
function linkIn(column){
	column.className = "menuLinksOver"
	}
function linkOut(column){
	column.className = "menuLinks"
	}

// Kapitelbilder
function chapterImg(){
	document.write('<style>')
	document.write('#Content{')
	document.write('	background-image: url(')
	document.write(root)
	document.write('imgs/chapter_' + pageSection.fileName + '.jpg);')
	document.write('	background-position: left bottom;')
	document.write('	background-repeat: no-repeat;')
	document.write('}')
	document.write('</style>')
}

// Kapitel titel
function chapterTitle(){
	document.write('<img src="../../../../project/fmv/flykthuva15/')
	document.write(root)
	document.write('imgs/rubrik_' + pageSection.fileName + '.jpg" alt="')
	document.write(pageSection.title)
	document.write('">')
}

// monitor trail
function trail(){
	document.write('<span class="trail" id="trailSpan">')
	document.write('<font color="red">•</font> DU ÄR HÄR: ')
	document.write('<a class="trailLink" href="../../../../project/fmv/flykthuva15/' + root + 'index.htm">')
	document.write('Startsida')
	document.write('</a> > ')
		if (pageSection == section[1]){
			document.write(" ")
		}
		else {
		document.write('<a class="trailLink" href="../../../../project/fmv/flykthuva15/' + root + pageSection.fileName + '/index.htm">')
		document.write(pageSection.title)
		document.write('</a> ')
		}
	document.write('</span>')
}

// ta text från frågefält och lägg till på diverse ställen
function fnSetTrail(){
  if(currentPageType == pageType[2]){
    var spanObj = document.getElementById("trailSpan"); 
    var dispObj = document.getElementById("qDisplay");
    var txt = dispObj.innerHTML;
    
	//sätter stil på frågan där nere 
	dispObj.innerHTML = qID + '. <span class="qTitle">' + dispObj.innerHTML + '</span> <span class="qPage">(1/1)</span>';
	
	//denna del lägger till frågan längst upp i trailen
    var itxt = '> <a class="trailLink" href="../../../../project/fmv/flykthuva15/' + root + pageSection.fileName + '/q' + qID + '.htm">';
    itxt    += qID + '. ' + txt;
    itxt    += '</a>';
    spanObj.innerHTML += itxt;
  }
}
window.attachEvent("onload", fnSetTrail);

/*
// för skriv ut olika för netscape och IE
if(document.all){
	window.attachEvent("onload", fnSetTrail);
}
else{
	window.captureEvent(Event.ONLOAD);
	document.body.onload=fnSetTrail;
	//setTimeout('fnSetTrail()', 1000);
}
*/

/*
// Mening av fråga
function displayQ(){
	var qPage		= "(1/1)"
	document.write(qID + '. <span class="qTitle">' + qName + '</span>')
	document.write('  <span class="qPage">' + qPage + '</span>')
}
*/
