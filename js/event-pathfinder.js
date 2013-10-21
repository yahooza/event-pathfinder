(function(root, elements, events) {

    root        = root      || document.body;
    elements    = elements  || ['*'],
    events      = events    || ['click']
        
    var DELIMITER  = '->';

    /**
     * Pipe to the console.log
     */
    var _log = function (mixed) {
        if (!window.console) {
            return;
        }
        console.log(mixed);
    }

    /**
     * add an event listener a Dom element
     * @param {Dom ele} 
     * @param {string} the event type (click|keypress|blur)
     * @param {function} the event handler
     */
    var _on = function (ele, type, handler) {
         if (ele.addEventListener) {
            ele.addEventListener (type, handler, false);
         }
         else if (ele.attachEvent) {
            ele.attachEvent ('on' + type, handler); 
         }
    }

    /**
     * Async load a new script tag
     */
    var _load = function (url) {
      if (!url) {
        return false;
      }

      var ele = document.createElement('script');
          ele.src = url;
          document.body.appendChild(ele);

      return true;
    }

    /**
     * Return the the calcalated hash of the path.
     * @param {string} the DOM path
     */
    var _hash = function (str) {
        if (!(str && str.length > 0)) {
          return null;
        }
        return parseInt(window.CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex).substring(0, 13), 16);
    }

    /**
     * The everything event handler
     * @param {event}
     */
    var _handler = function(event) {

        var target      = event.target,
            tag         = target.tagName.toLowerCase(),
            dom         = [];
        
        while (null != target.parentNode && "body" !== tag) {
            dom.unshift([
                tag,
                (target.id          ? '#' + target.id : ''),
                (target.className   ? '.' + target.className.split(' ').join('.') : '')
            ].join(''));
            target = target.parentNode;
            tag = target.tagName.toLowerCase();
        }

        var params = params || {};
            params['dompath'] = dom.join(DELIMITER);

        window.setTimeout(function() {

            _log({
              'dom'     : params['dompath'],
              'dom_sk'  : _hash(params['dompath'])
            });
            return;

        }, 10);
    };

    /**
     * Start.
     * 1) Load Crypto lib
     * 2) Attach event handlers
     */
    var _init = function () {

        if (!(window.CryptoJS && CryptoJS.SHA256)) {
          _load('//crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js');
        }
        
        for (var i=0, l=events.length; i<l; i++) {
            _on(root, events[i], _handler);
        }
    }

    _init();

})();
