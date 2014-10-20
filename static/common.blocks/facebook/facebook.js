/**
 * @module facebook
 * @description Provide Facebook (load if it does not exist).
 */

modules.define(
    'facebook',
    ['loader_type_js', 'facebook__config'],
    function(provide, loader, cfg) {

function doProvide(preserveGlobal) {

    if (!preserveGlobal) {
        window.fbAsyncInit = function() {
            FB.init({
                appId   : cfg.appId,
                xfbml   : true,
                version : 'v2.1'
            });
          }
    }

    provide(window.FB);
}

typeof window.FB !== 'undefined'?
    doProvide(true) :
    loader("//connect.facebook.net/en_US/sdk.js", doProvide);
});
