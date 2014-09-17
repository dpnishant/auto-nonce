Settings = {
  'token_url': "get_token.php",
  'token_name': "csrf_token",
  'token_value': "default_value",
  'ajax_header_name': 'X-CSRF-Token',
  'post_only': true,
  'match_origin': true
};

function prepareToken() {
  var csrf_tag = document.createElement('input');
  csrf_tag.setAttribute('type', 'hidden');
  csrf_tag.setAttribute('id', Settings.token_name);
  csrf_tag.setAttribute('name', Settings.token_name);
  csrf_tag.setAttribute('value', Settings.token_value);
  return csrf_tag;
}

function injectFormTokens() {
  var host = location.href.replace(/^(http?.:\/\/)/gi,"").split("/")[0];
  var forms = document.getElementsByTagName('form');
  for(var i=0;i<forms.length;i++) {
    var token = prepareToken();
    if (Settings.post_only === true) {
      if (forms[i].method.toUpperCase() === 'POST') { forms[i].appendChild(token); } else { forms[i].removeChild(token); }
    } else { forms[i].appendChild(token); }

    if (Settings.match_origin === true) {
        var form_action = forms[i].action.replace(/^(http?.:\/\/)/gi,"").split("/")[0];
        if (form_action === host) { forms[i].appendChild(token); } else { forms[i].removeChild(token); }
    } else { forms[i].appendChild(token); }
  }
};

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
};

function csrf_init() {
  getToken();
  overloadXHR();
};

function overloadXHR() {
  var overloadedXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(a,b,c,d,e) {
    overloadedXHROpen.call(this,a,b,c,d);
    this.setRequestHeader(Settings.ajax_header_name, Settings.token_value);
    return;
}};

document.addEventListener("DOMContentLoaded", function(event) {
  injectFormTokens();    
});

csrf_init();
