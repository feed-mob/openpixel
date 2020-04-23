### Install Feedmob Tracking Pixel

> The PR https://github.com/feed-mob/tracking_admin/pull/8088 is an example of
> installing Feedmob Tracking Pixel

**1. Install base code on website**
- Update the placeholder `{CLIENT_UUID}` to the UUID of the given client.
    - The client UUID of Symantec is `66b63f29cc84475bb44fc244c518613e`
-  Copy and paste the pixel code into **the bottom of the header section** of
   your site, just above the `</head>` tag. Install the base code on every page
of your website.
```HTML
<!-- Start Feedmob Pixel Snippet -->
<script>
!function(e,t,n,s,a,p,c){e[s]||((a=e[s]=function(){a.process?a.process.apply(a,arguments):a.queue.push(arguments)}).queue=[],a.t=+new
Date,(p=t.createElement(n)).async=1,p.src="https://feedmob-cdn.s3.amazonaws.com/js/fmpixel.js?t="+864e5*Math.ceil(new
Date/864e5),(c=t.getElementsByTagName(n)[0]).parentNode.insertBefore(p,c))}(window,document,"script","fmpix"),fmpix("init","{CLIENT_UUID}"),fmpix("event","pageload");
</script>
<!-- End Feedmob Pixel Snippet -->
```

**2. Feedmob Tracking Pixel Standard Events**

- The Examples of Feedmob Pixel Events
```Javascript
// Purchase Event
fmpix('event', 'P', '{ "amount": 100 }')

// Install Event
fmpix('event', 'I')

// Registrantion Event
fmpix('event', 'REG')

// all_event_a
fmpix('event', 'AA')
```

- Event List
```
first_install: "I",
retained: "R",
tutorial: "T",
first_registration: "REG",
first_purchase: "P",
level: "L",
open: "O",
impression: "M",
all_purchase: "P",
all_event_a: "AA",
first_event_a: "FA",
all_event_b: "AB",
first_event_b: "FB"
```

**3. MMP Tracking Link Configuration**

- The example of MMP Tracking Link https://admin.feedmob.com/click_urls/11415
```
https://feedmob-cdn.s3.amazonaws.com/pages/pixel.html?utm_source=FeedMob_{FEEDMOBVENDORNAME}&utm_medium=Richard_Test_{FEEDMOBVENDORNAME}&utm_campaign=Richard_Test&fm_conversion_id={CONVERSION_ID}&fm_publisher_id={FEEDMOB_PUBLISHER_ID}&fm_click_id=11415
```

- The parameters below are supported in MMP Tracking Link.
   - :warning: `utm_source`, `fm_publisher_id`, `fm_conversion_id` are required parameters.
   - :warning: The value of `utm_source` must be started with `FeedMob`, such as `FeedMob_Test_ABC`
```
utm_source
utm_medium
utm_term
utm_content
utm_campaign
fm_click_id
fm_publisher_id
fm_conversion_id
```
