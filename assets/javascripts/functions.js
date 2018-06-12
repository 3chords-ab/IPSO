/*
	Copyright (c) 2012 Ampere Media AB
	Author: Emily Wood
*/

$(document).ready(function() {

  // Mark active link dynamically
  var topnav = location.pathname.split("/")[1];
  var subnav = location.pathname.substr(1).split('/', 2)[1] || '/';
  $('.top_navigation a[href^="/' + topnav + '"]').addClass('active');
  $('.sub_navigation a[href^="/' + topnav + '/' + subnav + '"]').addClass('active');

/*
  Anti spam mail function
  The following could be an "encoded" email anchor:
  <a class="email">myaddress at mydomain.com<a>
  Read more: http://www.bukisa.com/articles/145902_anti-spam-crawler-e-mail-jquery#ixzz1EpetFhMT
*/
  $('a.email').each(function(i) {
    var text = $(this).text();
    var address = text.replace(" at ", "@");
    $(this).attr('href', 'mailto:' + address);
    $(this).text(address);
  });

});

// Cookies
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

// Current language
var lang = "sv_SE" //en_US

// Write translations to the page
// Sample: get_i18n('nav_home','en_US');
function get_i18n(item, lang) {
  var current_language = getCookie("lang");
  if(current_language == null){
    setCookie("lang", "sv_SE");
    current_language = "sv_SE";
  }
  document.write(article[item][current_language]);
}

// Switch between language
function changeLanguage(newLanguage){
  setCookie("lang", newLanguage);
  document.location.replace(document.location.href);
}

// Write translated images
function get_localized_image(item, lang, ext) {
  var current_language = getCookie("lang");
  if(current_language == null){
    current_language = "sv_SE";
  }
  document.write('<img src="/assets/images/'+ item + '.' + current_language + '.' + ext + '" border="0">');
}