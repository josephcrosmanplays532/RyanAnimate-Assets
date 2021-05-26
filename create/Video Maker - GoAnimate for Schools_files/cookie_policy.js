(function() {
    var isStringentPrivacyCountry = false,
        cookieImageUrl = '/img/gdpr/cookies.png',
        defaultOverflowY;

    if (isStringentPrivacyCountry && (getCookie('cookieConsent') !== '1')) {
        $(displayCookiePolicy);
    }

    function displayCookiePolicy() {
        appendStyles();

        defaultOverflowY = document.body.style.overflowY;

        document.body.style.overflowY = 'hidden';

        var overlay = document.createElement('div');
        var dialog = document.createElement('div');
        var dialogBottom = document.createElement('div');
        var img = document.createElement('img');
        var divider = document.createElement('hr');

        var paragraph = createText('We only use cookies for the core functionality of this website, like user login. No cookies from third-party services are used on Goanimate for Schools.', 'cookie-paragraph');
        var okButton = createButton('OK');
        var title = createText('Cookie Policy', 'cookie-title');

        img.src = cookieImageUrl;

        overlay.className = 'cookie-overlay';
        dialog.className = 'cookie-dialog';
        dialogBottom.className = 'cookie-dialog-bottom';
        img.className = 'cookie-image';
        divider.className = 'cookie-divider';

        dialogBottom.appendChild(okButton);
        dialog.appendChild(title);
        dialog.appendChild(img);
        dialog.appendChild(paragraph);
        dialog.appendChild(divider);
        dialog.appendChild(dialogBottom);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        okButton.onclick = function() {
            setCookie('cookieConsent', 1);

            document.body.style.overflowY = defaultOverflowY;
            overlay.parentNode.removeChild(overlay);
        };
    }

    function appendStyles() {
        var overlayStyle = document.createElement('style'),
            dialogStyle = document.createElement('style'),
            paragraphStyle = document.createElement('style'),
            buttonStyle = document.createElement('style'),
            titleStyle = document.createElement('style'),
            dividerStyle = document.createElement('style'),
            linkStyle = document.createElement('style'),
            imageStyle = document.createElement('style'),
            mediaQueryStyle = document.createElement('style'),
            styles = [
                overlayStyle,
                dialogStyle,
                paragraphStyle,
                buttonStyle,
                titleStyle,
                dividerStyle,
                linkStyle,
                imageStyle,
                mediaQueryStyle
            ];

        overlayStyle.innerHTML = '.cookie-overlay { position: fixed; top: 0; min-width: 100%; min-height:100%; z-index: 16777271; background-color: rgba(244,244,244,0.5) }';
        dialogStyle.innerHTML = '.cookie-dialog { display:flex; flex-direction: column; position: absolute; top: 50%; left: 50%; width: 500px; max-height: 80vh; background-color: #ffffff; transform: translate(-50%, -50%); box-shadow: 0 0 30px rgba(0,0,0,0.3); border-radius: 4px } .cookie-dialog-bottom { height: 72px; min-height: 72px }';
        paragraphStyle.innerHTML = '.cookie-paragraph { position: relative; margin: 16px; font-size: 14px; font-weight: 400; color: grey; line-height: 1.6 }';
        buttonStyle.innerHTML = '.cookie-button { position: relative; margin: 16px 16px 16px 0; font-size: 11px; font-weight: 600; color: #ffffff; border-radius: 3px; letter-spacing: 1.2px; padding: 12px 30px; cursor: pointer; text-align: center; text-transform: uppercase; background-color: #d85e27; float: right; outline: 0; } .cookie-button:hover { opacity: .65; background-color: #d85e27; }';
        titleStyle.innerHTML = '.cookie-title { position: relative; top: 0; left: 0; margin: 20px 16px; font-size: 18px; line-height: 20px; color: #d85e27; font-weight: 400 }';
        dividerStyle.innerHTML = '.cookie-divider { margin: 0; width: 100%; background-color: rgba(0,0,0,0.2); height: 1px; border: 0 }';
        linkStyle.innerHTML = '.cookie-link { position: relative; display: block; margin: 0 0 16px 16px; cursor: pointer; color: #5596e6; font-weight: 500; text-decoration: none }';
        imageStyle.innerHTML = '.cookie-image { height: 200px; display: block; margin: 0 auto }';
        mediaQueryStyle.innerHTML = '@media (max-width: 500px) { .cookie-image { height: 100px } .cookie-dialog { width: 300px } .cookie-button { margin: 16px 16px 10px 0 } }';

        styles.forEach(function(style) {
            document.body.appendChild(style);
        });
    }

    function createText(text, className) {
        var textContainer = document.createElement('div');
        var textNode = document.createTextNode(text);

        textContainer.className = className;

        textContainer.appendChild(textNode);

        return textContainer;
    }

    function createButton(text) {
        var button = document.createElement('button');
        var buttonText = document.createTextNode(text);

        button.appendChild(buttonText);
        button.className = 'cookie-button';

        return button;
    }

    function getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            c = c.replace(/^\s+|\s+$/gm, '');

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return null;
    }

    function setCookie(cname, cvalue) {
        var date = new Date();

        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + date.toUTCString();

        document.cookie = cname + '=' + escape(cvalue) + ';' + expires + ';path=/';
    }
})();


}
