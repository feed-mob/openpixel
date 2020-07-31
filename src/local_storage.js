var LocalStorage = {
  set(name, value, minutes, path = "/") {
    localStorage.setItem(name, value)
  },
  get(name) {
    localStorage.getItem(name)
  },

  delete(name) {
    localStorage.removeItem(name)
  },

  exists(name) {
    return this.get(name)
  },

  setUtms() {
    var utmArray = ['utm_source','utm_medium','utm_term','utm_content','utm_campaign'];
    var exists = false;
    for (var i = 0, l = utmArray.length; i < l; i++) {
      if (isset(Url.getParameterByName(utmArray[i]))) {
        exists = true;
        break;
      }
    }
    if (exists) {
      var val, save = {};
      for (var i = 0, l = utmArray.length; i < l; i++) {
        val = Url.getParameterByName(utmArray[i]);
        if (isset(val)) {
          save[utmArray[i]] = val;
        }
      }
      localStorage.set('utm', JSON.stringify(save));
    }
  },

  getUtm(name) {
    if (localStorage.getItem('utm')) {
      var utms = JSON.parse(localStorage.getItem('utm'));
      return name in utms ? utms[name] : "";
    }
  }
}
