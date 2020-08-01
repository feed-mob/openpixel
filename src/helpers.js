// check if a variable is not undefined, null, or blank
var isset = function(variable) {
  return typeof(variable) !== 'undefined' && variable !== null && variable !== '';
}

var now = function() {
  return 1 * new Date;
}

var guid = function() {
  return Config.version + '-xxxxxxxx-'.replace(/[x]/g, function(c) {
      var r = Math.random()*36|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(36);
  }) + (1 * new Date()).toString(36);
}

var checkCookie = function (){
  // Quick test if browser has cookieEnabled host property
  if (navigator.cookieEnabled) return true;
  // Create cookie
  document.cookie = "cookietest=1";
  var ret = document.cookie.indexOf("cookietest=") != -1;
  // Delete cookie
  document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
  return ret;
}

var Storage = function () {
  if (checkCookie()) {
    return Cookie;
  }else{
    return LocalStorage;
  }
}

// reduces all optional data down to a string
var optionalData = function(data) {
  if (isset(data) === false) {
    return '';
  } else if (typeof data === 'object') {
    // runs optionalData again to reduce to string in case something else was returned
    return optionalData(JSON.stringify(data));
  } else if (typeof data === 'function') {
    // runs the function and calls optionalData again to reduce further if it isn't a string
    return optionalData(data());
  } else {
    return String(data);
  }
}
