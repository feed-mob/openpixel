class Pixel {
  constructor(event, timestamp, optional) {
    this.params = [];
    this.event = event;
    this.timestamp = timestamp;
    this.optional = optionalData(optional);
    this.buildParams();
    this.send();
  }

  buildParams() {
    const attr = this.getAttribute();
    for (var index in attr) {
      if (attr.hasOwnProperty(index)) {
        this.setParam(index, attr[index](index));
      }
    }
  }

  getAttribute() {
    var rl_params = this.getRlParams();
    return {
      id:           () => Config.id, // website Id
      uid:          () => GeneralStorage.getUid(), // user Id
      ev:           () => this.event, // event being triggered
      ed:           () => this.optional, // any event data to pass along
      v:            () => Config.version, // openpixel.js version
      dl:           () => window.location.href, // document location
      rl:           () => document.referrer, // referrer location
      ts:           () => this.timestamp, // timestamp when event was triggered
      de:           () => document.characterSet, // document encoding
      sr:           () => window.screen.width + 'x' + window.screen.height, // screen resolution
      vp:           () => window.innerWidth + 'x' + window.innerHeight, // viewport size
      cd:           () => window.screen.colorDepth, // color depth
      dt:           () => document.title, // document title
      bn:           () => Browser.nameAndVersion(), // browser name and version number
      md:           () => Browser.isMobile(), // is a mobile device?
      ua:           () => Browser.userAgent(), // user agent
      tz:           () => (new Date()).getTimezoneOffset(), // timezone
      utm_source:   key => this.getUtmParams(key, rl_params), // get the utm source
      utm_medium:   key => this.getUtmParams(key, rl_params), // get the utm medium
      utm_term:     key => this.getUtmParams(key, rl_params), // get the utm term
      utm_content:  key => this.getUtmParams(key, rl_params), // get the utm content
      utm_campaign: key => this.getUtmParams(key, rl_params), // get the utm campaign
      utm_partner: key => this.getUtmParams(key, rl_params), // get the utm partner
      fm_click_id:     key => this.getFmParams(key, rl_params), // get the Feedmob Click Id
      fm_publisher_id: key => this.getFmParams(key, rl_params), // get the Feedmob Publisher Id
      fm_conversion_id: key => this.getFmParams(key, rl_params), // get the Feedmob Conversion Id
    }
  }

  getRlParams() {
    var rl_params = {};
    if(document.referrer && document.referrer.length > 0) {
      var rl_query = new URL(document.referrer).searchParams;
      rl_query.forEach((value, key) => {
        rl_params[key] = value;
      });
    }
    return rl_params;
  }

  getUtmParams(key, rl_params) {
    var local_params = GeneralStorage.getUtm(key)
    if (!local_params || local_params.length == 0) {
      local_params = rl_params[key]
    }
    return local_params;
  }

  getFmParams(key, rl_params) {
    var local_params = GeneralStorage.getFm(key)
    if (!local_params || local_params.length == 0) {
      local_params = rl_params[key]
    }
    return local_params;
  }

  setParam(key, val) {
    if (isset(val)) {
      this.params.push(`${key}=${encodeURIComponent(val)}`);
    } else {
      this.params.push(`${key}=`);
    }
  }

  send() {
    this.sendImage();
  }

  sendBeacon() {
    window.navigator.sendBeacon(this.getSourceUrl());
  }

  sendImage() {
    this.img = document.createElement('img');
    this.img.src = this.getSourceUrl();
    this.img.style.display = 'none';
    this.img.width = '1';
    this.img.height = '1';
    this.img.alt = ' ';
    document.getElementsByTagName('body')[0].appendChild(this.img);
  }

  getSourceUrl() {
    return `${pixelEndpoint}?${this.params.join('&')}`;
  }
}
