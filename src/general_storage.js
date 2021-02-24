var GeneralStorage = {
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
