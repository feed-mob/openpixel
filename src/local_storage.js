var LocalStorage = {
  prefix() {
    return  '__' + pixelFuncName + '_';
  },

  set(name, value) {
    document.localStorage.setItem(this.prefix() + name, value);
  },

  get(name) {
    return document.localStorage.getItem(this.prefix() + name);
  },

  delete(name) {
    document.localStorage.removeItem(this.prefix() + name);
  },

  exists(name) {
    return isset(this.get(this.prefix() + name));
  },

  setUtms(utmArray) {
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

  setFms(fmArray) {
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
