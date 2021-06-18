const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case '/charactercreator/new_char/': {
			title = 'Character Creator';
			attrs = {
				data: process.env.SWF_URL + '/cc.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', id: 'char_creator', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'm_mode': 'school', 'bs': 'adam', 'isLogin': 'Y', 'isEmbed': '0', 'ctc': 'go', 'tlang': 'en_US',
					'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'appCode': 'go', 'page': '', 'siteId': 'go', 
					'userId': '00EDZP3Cu0aw', 'themeId': 'family', 'ut': 30,
				},
				
				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc.swf', // 'http://localhost/cc.swf'
			};
			break;
		}
		
		case '/charactercreator/': {
			title = 'CC Browser';
			attrs = {
				data: process.env.SWF_URL + '/cc_browser.swf', // data: 'cc_browser.swf',
				type: 'application/x-shockwave-flash', id: 'ccbrowser', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'isEmbed': '0', 'ctc': 'go', 'tlang': 'en_US', 
					'storePath': process.env.STORE_URL + '/<store>', 
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'appCode': 'go', 'siteId': 'school', 'st': '', 
					'userId': '0DyHqK6Yj9dM', 'ut': 23, 'uisa': 0, 'themeId': 'business', 
					'u_info_school': 'OjI6d1lZakM3SVUxak5YVU9rQWlueURFZ3ZTT1EwakFJYjczcGVCMzJTMiszcFYzVERQRDByQktlUElUTDlaeUdsSzJyRTZFZldHMVRXR1BtOTNwWm5vS2JscTFXTzVodndrVnpaRG9XNVppRU9pSnRpR3pnSEljPQ==',
				},

				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc_browser.swf', // 'http://localhost/cc_browser.swf'
			};
			break;
		}
			
		case '/videomaker/full/': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Video Editor';
			attrs = {
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', id: 'Studio', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'movieId': '', 'loadas': 0, 'asId': '', 'originalId': '', 'apiserver': '/',
				        'storePath': process.env.STORE_URL + '/<store>',
				        'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
				        'animationPath': process.env.SWF_URL + '/', 'userId': '0cf4CMw1ZNCk', 'username': 'bakeryb40488', 
					'uemail': 'bakeryb40488@gmail.com',
				        'numContact': '0', 'ut': 23, 've': false, 'isEmbed': 0, 'nextUrl': '/videos/?movieId=<movieId>',
				        'bgload': process.env.SWF_URL + '/go_full.swf', 'lid': '1', 'ctc': 'go', 'themeColor': 'silver', 'tlang': 'en_US', 
					'siteId': '13',
				        'templateshow': 'false', 'forceshow': 'false', 'appCode': 'go', 'lang': 'en', 'tmcc': 4048901, 'fb_app_url': '/', 
					'is_published': '0',
				        'is_private_shared': '1', 'is_password_protected': false, 'upl': 1, 'hb': '1', 'pts': '1', 'msg_index': '', 'ad': 0, 
					'has_asset_bg': 1, 'presaveId': 'm-0',
				        'has_asset_char': 0, 'initcb': 'studioLoaded', 'retut': 0, 'featured_categories': null, 
				        's3base': 'https://josephcrosmanplays532.github.io/s3base', 'st': '', 'uisa': 0, 
				        'u_info': 'OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ',
				        'tm': 'FIN', 'tray': 'custom', 'isWide': 1, 'newusr': 1, 'goteam_draft_only':0},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}

		case '/videos/': {
			title = 'Video Player';
			attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
				quality: 'medium',
			};
			params = {
				flashvars: {
					'movieOwner': 'African+Vulture%E2%84%A2', 'movieOwnerId': '0uWOI2JiCdHU', 'movieId': '', 'movieLid': '0', 'movieTitle': 'Test',
					'movieDesc': 'This+video+is+ment+for+testing+out+this+video+player.', 'userId': '', 'username': '', 'uemail': '', 'ut': '-1',
					'numContact': '', 'apiserver': '/', 'duration': '92', 'playcount': '0', 
					'thumbnailURL': 'https://josephcrosmanplays532.github.io/img/demo.png', 'copyable': '0', 'isPublished': '0', 'ctc': 'go', 'tlang': 'en_US',
					'is_private_shared': '1', 'autostart': '0', 'appCode': 'go', 'is_slideshow': '0', 'originalId': '0zEt_fo4L-5k', 
					'is_emessage': '0', 'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
					'animationPath': process.env.SWF_URL + '/', 'isEmbed': '1', 'refuser': null, 'utm_source': null, 'uid': null, 'isTemplate': '0',
					'showButtons': '1', 'chain_mids': '', 'averageRating': 5, 'ratingCount': '48', 'fb_app_url': '/', 'ad': 0, 'endStyle': 0, 
					'isWide': 0, 'pwm': 1, 's3base': 'https://josephcrosmanplays532.github.io/s3base',
				},
				allowScriptAccess: 'always',
				allowFullScreen: 'true',
			};
			break;
		}

		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(`
	<head>
	     <script>document.title='${title}',flashvars=${JSON.stringify(
			params.flashvars
		)}</script>
<link href="https://josephcrosmanplays532.github.io/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/watermark.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/video.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/studio.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/video_export.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/vm5_alpha/banner.css.gz.css" rel="stylesheet" type="text/css">
<script>
var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
var user_role = 9;
</script>

<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/common_combined.js.gz.js"></script>
<script type="text/javascript" src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/../po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>

<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery-ui-1.9.2.custom-core-interactions.min.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery.tmpl.min.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/trial_upsell.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/lib/moment.min.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/sessionChecker.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/amplitude/go_amp.js.gz.js"></script>

<!-- Vyond Cookie Consent -->
<script>(function(v,y,o,n){v[n]=v[n]||[];
var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
d.type='text/javascript';d.async=true;d.src=
'https://ga.vyond.com/ajax/cookie_policy';
f.parentNode.insertBefore(d,f);
})(window,document,'script','_vyccq');</script>
<!-- End Vyond Cookie Consent -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');

dataLayer.push({"userId":"0Gpjt2-YIoGs","roleName":"Other","bl":"No"});
</script>
<!-- Google Tag Manager -->

<script>
    dataLayer.push({ 'useQualaroo': 1 });

</script>

<!-- Start of Zendesk Widget script -->
<script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("//assets.zendesk.com/embeddable_framework/main.js","goanimate.zendesk.com");/*]]>*/</script>
<!-- End of Zendesk Widget script -->
<script>
zE(function() {
    zE.identify({"name":"devorem248","email":"devorem248@brayy.com"});
    zE.hide();
});
</script>
</head>
<body style="margin:0px">
<div class="navbar site-nav site-nav--legacy" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/yourvideos" title="Vyond">
                      <img alt="Vyond" src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/img/vyond/vyond_logo_legacy.png">
                  </a>
            </div>

            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
<li class="dropdown">
    <a class="dropdown-toggle" href="https://support.vyond.com" data-toggle="dropdown">Help<span class="dropdown-caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-help">

        <li>
            <a href="#" onclick="zE.activate({hideOnClose: true});amplitudeTrackCtaHelp('quick_search');return false;">Quick Search</a>
        </li>
        <li>
            <a href="https://support.vyond.com" onclick="amplitudeTrackCtaHelp('help_center');" target="_blank">Help Center</a>
        </li>
        <li>
            <a href="https://josephcrosmanplays532.github.io/whatsnew" onclick="amplitudeTrackCtaHelp('whats_new');" target="_blank">What’s New</a>
        </li>
    </ul>
</li>

<script>
    $('.dropdown-menu-help').click(function(e) {
        e.stopPropagation();
    });
</script>
		    <li>
                        <a class="hidden-sm hidden-md hidden-lg" href="/videomaker">Make a Video</a>
                        <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/videomaker">Make a Video</a></span>
                    </li>
<li class="dropdown">
    <a class="dropdown-toggle" href="https://app.vyond.com/v2/profile" data-toggle="dropdown">
        <span class="hidden-sm hidden-md hidden-lg">Your Account</span>
        <div class="site-nav__profile-image">
            <div class="badge-circle">JA</div>
        </div><span class="dropdown-caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-user">
        <li class="dropdown-user-profile">
            <div class="dropdown-user-profile__display-name">
                Joseph Animate 2021 (Owner)            </div>
            <div class="dropdown-user-profile__status">
                Free trial | <a href="https://www.vyond.com/pricing">Upgrade now</a>            </div>
        </li>
        <li class="divider"></li>
        <li><a href="/profile/you.html">Profile Settings</a></li>
        <li><a href="https://app.vyond.com/v2/users/list">Users</a></li>
        <li><a href="https://app.vyond.com/v2/security">Security</a></li>
        <li><a href="https://app.vyond.com/v2/subscription">Subscription</a></li>
        <li class="divider"></li>
        <li><a href="https://app.vyond.com/video/list" onClick="amplitudeTrackSwitchVideoMaker('Go to Vyond Studio')">Go to Vyond Studio</a></li>
        <li class="divider"></li>
        <li><a class="gtm-logout" href="https://ga.vyond.com/logoff">Log Out</a></li>
    </ul>
</li>

<script>
    $('.dropdown-menu-user').click(function(e) {
        e.stopPropagation();
    });
</script>
                </ul>
            </div>
    </div>
</div>

<script>
    jQuery('.logout-link').click(function(){
        amplitudeTrackEvent(AMPLITUDE_EVENT.LOGOUT, null);
    });
    </script>
${toObjectString(attrs, params)}
</body>${stuff.pages[url.pathname] || ""}`
	);
	return true;
}
