(function(root, elements, events) {

    root        = root      || document.body;
    elements    = elements  || ['*'],
    events      = events    || ['click']
        
    DELIMITER  = ' > ';

    var _log = function (mixed) {
        if (!window.console) {
            return;
        }
        console.log(mixed);
    }

    var _on = function (ele, type, handler) {
         if (ele.addEventListener) {
            ele.addEventListener (type, handler, false);
         }
         else if (ele.attachEvent) {
            ele.attachEvent ('on' + type, handler); 
         }
     }

     /**
      * Add Event Handlers
      */
     var _init = function () {
        for (var i=0, l=events.length; i<l; i++) {
            _on(root, events[i], _handler);
        }
     }

     var _handler = function(event) {

        var target      = event.target,
            tag         = target.tagName.toLowerCase(),
            dom         = [];
        
        while (null != target.parentNode && "body" !== tag) {
            dom.unshift([
                tag,
                (target.id          ? '#' + target.id         : ''),
                (target.className   ? '.' + target.className  : '')
            ].join(''));
            target = target.parentNode;
            tag = target.tagName.toLowerCase();
        }

        var params = params || {};
            params['dompath'] = dom.join(DELIMITER);

        window.setTimeout(function() {
            _log(params);

            return;

            var message = '/action-tracking/i/?payload=' + encodeURIComponent(_$.param(params)),
                img     = new Image();

                img.src = message;
                img.onload = function(event) {
                    img = null;
                }

            params = null;

        }, 10);
    };

    _init();

})();
