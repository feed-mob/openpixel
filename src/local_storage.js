var LocalStorage = {
  set(name, value, minutes, path = "/") {
    localStorage.setItem(name, value)
  },

  get(name) {
    return localStorage.getItem(name)
  },

  delete(name) {
    localStorage.removeItem(name)
  },

  exists(name) {
    return isset(this.get(name))
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
      this.set('utm', JSON.stringify(save));
    }
  },

  getUtm(name) {
    if (this.exists('utm')) {
      var utms = JSON.parse(this.get('utm'));
      return name in utms ? utms[name] : "";
    }
  },

  setFms() {
    var fmArray = ['fm_click_id','fm_publisher_id','fm_conversion_id'];
    var exists = false;
    for (var i = 0, l = fmArray.length; i < l; i++) {
      if (isset(Url.getParameterByName(fmArray[i]))) {
        exists = true;
        break;
      }
    }
    if (exists) {
      var val, save = {};
      for (var i = 0, l = fmArray.length; i < l; i++) {
        val = Url.getParameterByName(fmArray[i]);
        if (isset(val)) {
          save[fmArray[i]] = val;
        }
      }
      this.set('fm', JSON.stringify(save), 2*365*24*60);
    }
  },

  getFm(name) {
     if (this.exists('fm')) {
      var fms = JSON.parse(this.get('fm'));
      return name in fms ? fms[name] : "";
    }
  }
}
