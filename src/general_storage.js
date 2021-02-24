var GeneralStorage = {
  setUid() {
    var uid = Cookie.get('uid');
    if (isset(uid) === false) {
      uid = LocalStorage.get('uid');
    }

    if (isset(uid) === false) {
      uid = guid();
    }

    Cookie.set('uid', uid, 2*365*24*60);
    LocalStorage.set('uid', uid);
  },

  getUid() {
    var uid = Cookie.get('uid');

    return isset(uid) === false ? GeneralStorage.get('uid') : uid;
  },

  setUtms() {
    var utmArray = ['utm_source','utm_medium','utm_term','utm_content','utm_campaign'];

    Cookie.setUtms(utmArray);
    LocalStorage.setUtms(utmArray);
  },

  getUtm(name) {
    var utm = Cookie.getUtm(name);

    return isset(utm) === false ? LocalStorage.getUtm(name) : utm;
  },

  setFms() {
    var fmArray = ['fm_click_id','fm_publisher_id','fm_conversion_id'];

    Cookie.setFms(fmArray);
    LocalStorage.setFms(fmArray);
  },

  getFm(name) {
    var fm = Cookie.getFm(name);

    return isset(fm) === false ? LocalStorage.getFm(name) : fm;
  }
};
