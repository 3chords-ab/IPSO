// LabAPI
var currPage;
var currPageContainer;
var previousPage;
var vispage;
var globalPage;
var appFileRoot = "Foto";
var appId = "Foto";
var appName = "Foto";
var ext = ".php";
var ie = document.all ? true : false;
var nav = false;
function versionChecker() {
  var check = true;
  var agt = navigator.userAgent.toLowerCase();
  var appVer = navigator.appVersion.toLowerCase();
  var ver = parseFloat(navigator.appVersion);
  var app = navigator.appName;
  if (ie) {
    var pos = navigator.appVersion.indexOf("msie");
    ver = parseFloat(appVer.substring(pos + 5, appVer.indexOf(";",pos)));
  }
  else {
    if ((agt.indexOf("mozilla") != -1) || (agt.indeOf("netscape")))
      nav = true;
  }
  if (ie || nav) {
    if (ver < 5)
      check = false;
  }
  else
    check = false;
  if (!check)
    document.location.href = "../out..gen/OldBrowser.htm";
  if (navigator.platform.indexOf("Mac") != -1)
    ie = false;
}
function initPage() {
  versionChecker();
  if (ie) { document.body.scroll = "yes"; }
  currPage = document.getElementById("page");
  globalPage = document.getElementById("page");
  vispage = document.getElementById("page");
  if (currPage.childNodes.length > 0) {
    if ((ie) && (currPage.filters.length > 0)) {
      for (var i=0; i < currPage.filters.length; i++) {
        currPage.filters[i].apply();
        currPage.style.visibility = "visible";
        currPage.filters[i].play();
      }
    }
    else
      currPage.style.visibility = "visible";
  }
  var child = ie ? document.all : document.body.childNodes;
  for (var i = 0; i < child.length; i++) {
    var candidate = child[i];
    candidate.oldStyle = new oldStyle(candidate);
    candidate.resetStyle = getOldStyle;
    setObjectMethods(candidate);
    if (isMediaObject(candidate)) {
      setMediaObjectData(candidate);
      if (candidate.AutoPlay == "true")
        candidate.play();
    }
  }
  for (var i=0; i < vispage.childNodes.length; i++) {
    var child = vispage.childNodes[i];
    if (child.id) {
      if (ie) {
        if (child.className == "group") {
          for (var j=0; j < child.childNodes.length; j++) {
            var grandChild = child.childNodes[j];
            setObjectMethods(grandChild);
            if (isMediaObject(grandChild)) {
              setMediaObjectData(grandChild);
              if (grandChild.AutoPlay == "true")
                grandChild.play();
            }
            playTransition(grandChild);
          }
        }
        else
          playTransition(child);
      }
      else
        child.style.visibility = "visible";
    }
  }
  setPageHeight();
  currPage.autoStart.run();
}
function setPageHeight() {
  if (!parseInt(vispage.parentNode.style.height)) {
    var totHeight = window.screen.height;
    var child = ie ? vispage.all : vispage.childNodes;
    for (var i=0; i < child.length; i++) {
      var candidate = child[i];
      if (candidate.style) {
        var tmpHeight = parseInt(candidate.style.height) + parseInt(candidate.style.top);
        if (tmpHeight > totHeight)
          totHeight = tmpHeight;
      }
    }
    vispage.style.height = totHeight;
  }
}
function exitPage() {
  if (ie) {
    var child = document.all["page"].children;
    for (var i=0; i < child.length; i++) {
      var candidate = child[i];
      if (isMediaObject(candidate)) {
        candidate.AutoRewind   = null;
        candidate.PlayCount    = null;
        candidate.ShowControls = null;
        candidate.play = null;
        candidate.pause = null;
        candidate.stop = null;
        candidate.obj = null;
        candidate.incWidth = null;
        candidate.incHeight = null;
        candidate.incLeft = null;
        candidate.incTop = null;
        candidate.rescale = null;
        candidate.getAttr = null;
        candidate.setAttr = null;
      }
    }
  }
}
function getObject(id) {
  var ref = document.getElementById(id);
  if (ref)
    return ref;
  else
    return document;
}
function visObj(id) {
  var ref;
  var ret = false;
  try {
    return document.getElementById(id) ? true : false;
  }
  catch (e) {
    return false;
  }
}
function deleteObject(id) {
  var obj = getObject(id);
  clearMediaObject(obj);
  obj.removeNode(true);
}
function isSoundObject(obj) {
  if (obj.className == "media") {
    var mObj = getObject(obj.id + "Object");
    return (mObj.className == "soundObject");
  }
  return false;
}
function isMediaObject(obj) {
  return (obj.className == "media");
}
function setMediaObjectData(obj) {
  if ((obj.className == "media") && (ie)) {
    var mObj = getObject(obj.id + "Object");
    obj.AutoRewind   = mObj.AutoRewind;
    obj.PlayCount    = mObj.PlayCount;
    obj.ShowControls = mObj.ShowControls;
    obj.obj   = mObj;
    obj.play  = function Play() {
      try {
        if (ie ? (obj.obj.PlayState != 6) : (obj.obj.GetPlayState() != 6))
         obj.obj.Play();
      } catch (e) {}
    }
    obj.pause = function Pause() {
      try {
        if (ie ? (obj.obj.PlayState == 2) : (obj.obj.GetPlayState() == 2))
          obj.obj.Pause();
      } catch (e) {}
    }
    obj.stop  = function Stop() {
      try {
        obj.obj.Stop(); obj.obj.SelectionStart = 0;
      } catch (e) {}
    }
  }
  else {
    obj.play = function nofunc() {}
    obj.pause = function nofunc() {}
    obj.stop = function nofunc() {}
  }
}
function clearMediaObject(candidate) {
  if (isMediaObject(candidate)) {
    candidate.AutoRewind   = null;
    candidate.PlayCount    = null;
    candidate.ShowControls = null;
    candidate.SelectionStart = null;
    candidate.play = null;
    candidate.pause = null;
    candidate.stop = null;
    candidate.incWidth = null;
    candidate.incHeight = null;
    candidate.incLeft = null;
    candidate.incTop = null;
    candidate.rescale = null;
    candidate.getAttr = null;
    candidate.setAttr = null;
    candidate.obj = null;
  }
}
function renderHtmlOnPage(page,src) {
  var re = /ID=\W(\w{1,})\W/g;
  var res = re.exec(src);
  var flag = false;
  if ((res == null) || (!vispage[res[1]])) {
    if (ie)
      vispage.insertAdjacentHTML("beforeEnd",src);
    else {
      var range = document.createRange();
      range.setStartAfter(vispage.lastChild);
      var docFrag = range.createContextualFragment(src);
      vispage.appendChild(docFrag);
    }
    if (ie)
      playTransition(vispage.lastChild);
    else
      vispage.lastChild.style.visibility = "visible";
    flag = true;
    setObjectMethods(vispage.lastChild);
  }
  return flag;
}
function playTransition(obj) {
  try {
    var vis;
    if ((obj.style.visibility == "visible") && (obj.filters.length > 0))
      vis = "hidden";
    else
      vis = "visible";
    for (var i=0; i < obj.filters.length; i++) {
      if (obj.filters[i] != obj.filters["alpha"]) {
        obj.filters[i].apply();
        obj.style.visibility = vis;
        obj.filters[i].play();
      }
    }
  }
  catch (e) {}
}
function jumpToPage(page) {
  if (page == "FotoGalleri1av3")
    document.location.href = appFileRoot + ext;
  else
    document.location.href = appFileRoot + page + ext;
}
function historyBack() {
  history.go(-1);
}
function previousPage() {
  jumpToPage(appPreviousPage);
}
function nextPage() {
  jumpToPage(appNextPage);
}
function oldStyle(obj) {
  if (ie) {
    style = obj.style;
    this.cssText = style.cssText;
  }
}
function getOldStyle() {
  if (ie)
    this.style.cssText = this.oldStyle.cssText;
}
function autoStartObject() {
  this.lines = new Array();
  this.add = autoStartAdd;
  this.run = autoStartRun;
}
function autoStartRun() {
  for (var i=0; i < this.lines.length; i++)
    eval(this.lines[i]);
}
function autoStartAdd(line) {
  this.lines[this.lines.length] = line;
}
function setObjectMethods(obj) {
  if (obj.id) {
    obj.incWidth = methodIncWidth;
    obj.incHeight = methodIncHeight;
    obj.incLeft = methodIncLeft;
    obj.incTop = methodIncTop;
    obj.rescale = methodRescale;
    obj.getAttr = methodGetAttr;
    obj.setAttr = methodSetAttr;
  }
}
function methodIncWidth(w) {
  var w2 = parseInt(this.style.width) + w;
  if (w2 >= 0)
    this.style.width =  w2 + "px";
}
function methodIncHeight(h) {
  var h2 = parseInt(this.style.height) + h;
  if (h2 >= 0)
    this.style.height = h2 + "px";
}
function methodIncLeft(l) {
  var l2 = parseInt(this.style.left) + l;
  if (l2 >= -32768)
    this.style.left = l2 + "px";
}
function methodIncTop(t) {
  t2 = parseInt(this.style.top) + t;
  if (t2 >= -32768)
    this.style.top = t2 + "px";
}
function methodRescale(wh) {
  this.incWidth(wh*2);
  this.incHeight(wh*2);
  this.incLeft(-wh);
  this.incTop(-wh);
}
function methodGetAttr(attrName) {
  var attrVal;
  if (visObj(this.id)) {
    try {
      attrVal = eval("this.style." + attrName);
    } catch (e) {}
  }
  return attrVal;
}
function methodSetAttr(attrName, attrVal) {
  if (visObj(this.id)) {
    try {
      eval("this.style."+attrName+" = '"+attrVal+"';");
    } catch (e) {}
  }
}
function getSender() {
  try {
    return (ie ? window.event.srcElement : getObject(event.target));
  } catch (e) {  return null; }
}
function hideObject(object) {
  if ((visObj(object.id)) && (object.style.visibility != "hidden")) {
    if (isMediaObject(object))
      object.stop();
    if (ie) {
      if ((object.filters.length > 0)) {
        object.style.visibility="visible";
        playTransition(object);
      }
      else
        object.style.visibility="hidden";
    }
    else
      object.style.visibility="hidden";
  }
}
function showObject(object) {
  if (visObj(object.id)) {
    if (ie) {
      if ((object.filters.length > 0)) {
        object.style.visibility="hidden";
        object.style.display="block";
        playTransition(object);
      }
      object.style.visibility="visible";
    }
    else {
      object.style.visibility="visible";
      object.style.display="block";
    }
  }
}
function moveToTop(object) {
  if (visObj(object.id)) {
    var z = 0;
    for (var i=0; i < vispage.childNodes.length; i++) {
      try {
        var cZ = vispage.childNodes[i].getAttr("zIndex");
        if (cZ > z)
          z = cZ;
      }
      catch(e) {}
    }
    var zIndex = object.getAttr("zIndex");
    if (zIndex <= z) {
      object.setAttr("oldzIndex", zIndex);
      object.setAttr("zIndex", z + 1);
    }
  }
}
function removeObject(object) {
  try {
    if (visObj(object.id))
      deleteObject(object.id);
  } catch (e) {}
}
function newSize(object, width, height) {
  if (visObj(object.id)) {
    object.style.width = width + "px";
    object.style.height = height + "px";
  }
}
function newPos(object, left, top) {
  if (visObj(object.id)) {
    object.style.left = left + "px";
    object.style.top = top + "px";
  }
}
function redrawPage() {
  if (currPage.id != "page")
    jumpToPage(currPage.id);
  else
    document.location.href = document.location.href;
}
function resetObject(object) {
  if (visObj(object.id))
    object.resetStyle();
}
function changeTextColor(object, color) {
  if (visObj(object.id))
    object.style.color = color;
}
function changeBorderColor(object, color) {
  if (visObj(object.id))
    object.style.borderColor = color;
}
function changeBackgroundColor(object, color) {
  if (visObj(object.id))
    object.style.backgroundColor = color;
}
function changeOpacity(object, msopac, nsopac) {
  if (visObj(object.id)) {
    if (ie)
      object.style.filter += "alpha(opacity=" + msopac + ")";
    else
      object.style.opacity = nsopac;
  }
}
function changeVolume(object, volume) {
  if (isMediaObject(object)) {
    var vol = object.obj.volume;
    vol += volume;
    if ((vol >= -10000) && (vol <= 0))
      object.obj.volume = vol;
  }
}
function changeBalance(object, balance) {
  if (isMediaObject(object)) {
    var bal = object.obj.balance;
    bal += balance;
    if ((bal >= -10000) && (bal <= 10000))
      object.obj.balance = bal;
  }
}
function setVolume(object, volume) {
  if (isMediaObject(object))
    object.obj.volume = volume;
}
function setBalance(object) {
  if (isMediaObject(object))
    object.obj.balance = balance;
}
var pImageList = new Array();
function preloadImage(file) {
  var cnt = pImageList.length;
  pImageList[cnt] = new Image();
  pImageList[cnt].src = file;
}
