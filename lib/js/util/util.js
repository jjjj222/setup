
function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

export function getWindowBBox() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {
        "width": x,
        "height": y
    }
}

export function fitInWindow(orig, length, max_length) {
    let result = orig;
    const diff = result + length - max_length;
    if (diff > 0) {
        result -= diff;
    }
    return Math.max(0, result);
}

export function brewserDetection() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    var sBrowser, sUsrAg = navigator.userAgent;

    if(sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
        sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
        sBrowser = "Microsoft Internet Explorer";
    }

//alert("You are using: " + sBrowser);
}

//------------------------------------------------------------------------------
export function isChrome() {
    const is_chrome = !!window.chrome && !!window.chrome.webstore;

    const sUsrAg = navigator.userAgent;
    if(sUsrAg.indexOf("Chrome") > -1 && is_chrome) {
        return true;
    }

    return false;
}

//------------------------------------------------------------------------------
export function set_super(obj, function_names) {
    const prototype = obj.__proto__.__proto__;
    obj.super = {};

    if (! function_names) {
        function_names = Object.keys(prototype);
    }

    function_names.forEach(key => {
        obj.super[key] = prototype[key].bind(obj);
    })
}

//------------------------------------------------------------------------------
export function on(event_name, callback) {
    this.root.addEventListener(event_name, (event) => {
        callback(event, this);
    });
}

//------------------------------------------------------------------------------
export function pad(d) {
    if (d < 10) {
        return '0' + d;
    } else {
        return d;
    }
}

//------------------------------------------------------------------------------
export function merge_bbox(bboxs) {
    let x_min = bboxs[0].x;
    let x_max = bboxs[0].x + bboxs[0].width;
    let y_min = bboxs[0].y;
    let y_max = bboxs[0].y + bboxs[0].height;

    for (let i = 1; i < bboxs.length; ++i) {
        const bbox = bboxs[i];
        x_min = Math.min(x_min, bbox.x);
        x_max = Math.max(x_max, bbox.x + bbox.width);
        y_min = Math.min(y_min, bbox.y);
        y_max = Math.max(y_max, bbox.y + bbox.height);
    }

    return {
        x: x_min,
        y: y_min,
        width: x_max - x_min,
        height: y_max - y_min
    }
}
