Settings = {
	'token_url': "get_token.php",
	'token_name': "csrf_token",
	'token_value': "default_value",
  'ajax_header_name': 'X-CSRF-Token'
};


function injectFormTokens() {
  var forms = document.getElementsByTagName('form');
  var csrf_tag = document.createElement('input');
  csrf_tag.setAttribute('type', 'hidden');
  csrf_tag.setAttribute('id', Settings.token_name);
  csrf_tag.setAttribute('name', Settings.token_name);
  csrf_tag.setAttribute('value', Settings.token_value);
  for(var i=0;i<forms.length;i++) {
    if(forms[i]) {
      forms[i].appendChild(csrf_tag);
	}
  }}

function getToken() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
  	if (http.readyState==4 && http.status==200) {
      var resp = JSON.parse(http.responseText);
      Settings.token_name = resp.token_name;
      Settings.token_value = resp.token_value;
  	}
  };
  http.open('GET', Settings.token_url, false);
  http.send();
}

function csrf_init() {
  getToken();
  overloadXHR();
}

function overloadXHR() {
  var overloadedXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(a,b,c,d,e) {
    overloadedXHROpen.call(this,a,b,c,d);
    this.setRequestHeader(Settings.ajax_header_name, Settings.token_value);
    return;
}}

document.addEventListener("DOMContentLoaded", function(event) {
  injectFormTokens();    
});

csrf_init();
