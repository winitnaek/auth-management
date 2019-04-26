var macWsUtils = {
    checkBrowserSupport: function () {
        "use strict";

        var notSuppHtml = "bns.html";

        if (typeof Symbol == "undefined") {
            window.location = notSuppHtml;
        }

        try {
            eval("class Foo {}");
            eval("var bar = (x) => x+1");
        } catch (e) {
            window.location = notSuppHtml;
        }
    }
};
macWsUtils.checkBrowserSupport();